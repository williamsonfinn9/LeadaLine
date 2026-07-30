/* ============================================================
   LeadaLine Contractor Enquiry Audit — serverless API
   ------------------------------------------------------------
   Single Vercel function, action-routed (keeps the project
   within serverless function limits, mirrors the existing
   zero-dependency convention).

   POST /api/contractor-audit          { action, ...payload }
   GET  /api/contractor-audit?action=report&t=...
   GET  /api/contractor-audit?action=unsubscribe&lead=...&token=...

   Actions:
     submit        — validate + store lead, answers, create job
     process       — run analysis/scoring/report generation (idempotent)
     status        — poll job status
     report        — fetch a report by secure token (public-safe fields only)
     track         — funnel/analytics events + booking records
     adjust        — recalculate + store adjusted opportunity estimate
     unsubscribe   — marketing opt-out (signed link)
     admin_leads   — internal CRM list   (Supabase auth + admin allowlist)
     admin_lead    — internal CRM detail (Supabase auth + admin allowlist)
   ============================================================ */

import { AUDIT_CONFIG, QUESTIONS, answerLabel, tradeLabel } from '../lib/audit/config.js';
import { validateBusinessDetails, validateQuestionnaire, cleanAttribution } from '../lib/audit/validate.js';
import { analyseWebsite } from '../lib/audit/crawl.js';
import { scoreAudit } from '../lib/audit/scoring.js';
import { calculateOpportunity, opportunityInputsFromAnswers } from '../lib/audit/opportunity.js';
import { recommendComponents, buildWorkflow, buildGapCards, buildUnknownItems } from '../lib/audit/recommend.js';
import { scoreFit } from '../lib/audit/fit.js';
import { generateNarrative } from '../lib/audit/ai.js';
import { generateReportToken, generateStatusToken, safeEqual, unsubscribeToken, verifyUnsubscribeToken } from '../lib/audit/tokens.js';
import * as db from '../lib/audit/db.js';
import { emailTemplates } from '../lib/audit/emails.js';
import { sendEmail } from '../lib/audit/email.js';
import { sendWebhook } from '../lib/audit/webhook.js';

/* ---------- helpers ---------- */

const siteUrl = () => (process.env.PUBLIC_SITE_URL || 'https://www.leadaline.com').replace(/\/$/, '');
const bookingUrl = () => process.env.PUBLIC_BOOKING_URL || AUDIT_CONFIG.bookingUrl;
const reportUrlFor = (token) => `${siteUrl()}/contractor-audit/report/${token}`;

function ok(res, data) { return res.status(200).json({ success: true, ...data }); }
function bad(res, status, error, extra = {}) { return res.status(status).json({ success: false, error, ...extra }); }

// Simple per-instance rate limiter (best effort on serverless; the
// email/domain dedupe below is the durable guard).
const rateBucket = new Map();
function rateLimited(ip, max = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (rateBucket.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  rateBucket.set(ip, arr);
  if (rateBucket.size > 5000) rateBucket.clear();
  return arr.length > max;
}

function clientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

const TRACKED_EVENTS = new Set([
  'report_opened', 'score_section_viewed', 'calculator_adjusted',
  'recommendation_viewed', 'booking_cta_clicked', 'booking_started',
  'booking_completed', 'report_shared',
]);

async function logEvent(leadId, reportId, name, metadata, sessionId) {
  try {
    await db.insert('audit_events', {
      audit_lead_id: leadId, report_id: reportId || null, event_name: name,
      event_metadata: metadata || {}, session_id: sessionId || null,
    });
  } catch (e) { console.error('event log failed:', e.message); }
}

/* ---------- action: submit ---------- */

async function actionSubmit(req, res, body) {
  // Bot honeypot: hidden field must stay empty.
  if (body.company_website) return ok(res, { lead_id: null, job_id: null, status_token: null }); // silently accept

  if (rateLimited(clientIp(req))) return bad(res, 429, 'Too many requests. Please try again shortly.');

  const details = validateBusinessDetails(body.details || {});
  if (!details.ok) return bad(res, 400, 'Please check the highlighted fields.', { fields: details.errors });

  const questionnaire = validateQuestionnaire(body.answers || {});
  if (!questionnaire.ok) return bad(res, 400, 'Please answer all questions.', { fields: questionnaire.errors });

  const attribution = cleanAttribution(body.attribution || {});
  const d = details.data;

  // Duplicate guard: same email + domain in the last 24h → return the
  // existing audit instead of generating a new one.
  const dayAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const existing = await db.selectOne(
    'audit_leads',
    `email=eq.${encodeURIComponent(d.email)}&normalised_domain=eq.${encodeURIComponent(d.normalised_domain)}&created_at=gte.${dayAgo}&select=id&order=created_at.desc&limit=1`,
  );
  if (existing) {
    const job = await db.selectOne('audit_jobs', `audit_lead_id=eq.${existing.id}&select=id,status,status_token&order=created_at.desc&limit=1`);
    if (job) return ok(res, { lead_id: existing.id, job_id: job.id, status_token: job.status_token, duplicate: true });
  }

  const lead = await db.insert('audit_leads', {
    first_name: d.first_name,
    business_name: d.business_name,
    email: d.email,
    phone: d.phone,
    website_url: d.website_url,
    normalised_domain: d.normalised_domain,
    trade: d.trade,
    other_trade: d.other_trade,
    service_area: d.service_area,
    employee_range: d.employee_range,
    monthly_enquiry_range: answerLabel('monthly_enquiries', questionnaire.data.monthly_enquiries),
    average_job_value_range: answerLabel('average_job_value', questionnaire.data.average_job_value),
    current_crm: d.current_crm,
    booking_system: d.booking_system,
    referral_source: d.referral_source,
    marketing_consent: d.marketing_consent,
    privacy_consent_timestamp: new Date().toISOString(),
    lead_status: 'new',
    ...attribution,
  });

  await db.insertMany(
    'audit_responses',
    Object.entries(questionnaire.data).map(([question_key, answer_value]) => ({
      audit_lead_id: lead.id,
      question_key,
      answer_value,
      answer_label: answerLabel(question_key, answer_value),
    })),
  );

  await db.insert('email_preferences', {
    audit_lead_id: lead.id,
    transactional_allowed: true,
    marketing_allowed: d.marketing_consent,
  });

  const job = await db.insert('audit_jobs', {
    audit_lead_id: lead.id,
    status: 'queued',
    status_token: generateStatusToken(),
    processing_version: AUDIT_CONFIG.processingVersion,
  });

  return ok(res, { lead_id: lead.id, job_id: job.id, status_token: job.status_token });
}

/* ---------- action: process ---------- */

async function actionProcess(req, res, body) {
  const { job_id, status_token } = body || {};
  if (!job_id || !status_token) return bad(res, 400, 'Missing job reference.');

  const job = await db.selectOne('audit_jobs', `id=eq.${encodeURIComponent(job_id)}&select=*`);
  if (!job || !safeEqual(job.status_token, String(status_token))) return bad(res, 404, 'Audit job not found.');

  if (job.status === 'complete') {
    const report = await db.selectOne('audit_reports', `audit_lead_id=eq.${job.audit_lead_id}&select=public_report_token&order=generated_at.desc&limit=1`);
    return ok(res, { status: 'complete', report_token: report?.public_report_token || null });
  }
  if (job.status === 'running') return ok(res, { status: 'running' });

  // Claim the job: queued|failed -> running (retry allowed on failed).
  const claimed = await db.update(
    'audit_jobs',
    `id=eq.${job.id}&status=in.(queued,failed)`,
    { status: 'running', started_at: new Date().toISOString(), retry_count: (job.retry_count || 0) + (job.status === 'failed' ? 1 : 0) },
  );
  if (!claimed || claimed.length === 0) return ok(res, { status: 'running' });

  try {
    const lead = await db.selectOne('audit_leads', `id=eq.${job.audit_lead_id}&select=*`);
    const responses = await db.select('audit_responses', `audit_lead_id=eq.${lead.id}&select=question_key,answer_value`);
    const answers = Object.fromEntries(responses.map((r) => [r.question_key, r.answer_value]));

    // 1) Website analysis (never fatal)
    const analysis = await analyseWebsite(lead.website_url);
    try {
      const obsRows = Object.entries(analysis.observations).map(([key, o]) => ({
        audit_lead_id: lead.id,
        observation_key: key,
        value: String(o.value),
        evidence: o.evidence || null,
        source_url: o.source_url || null,
        confidence: analysis.ok ? 'observed' : 'unavailable',
      }));
      await db.insertMany('website_observations', obsRows);
    } catch (e) { console.error('observation store failed:', e.message); }

    // 2) Deterministic scoring + opportunity + recommendations + fit
    const scoring = scoreAudit(analysis.ok ? analysis.observations : {}, answers);
    const opportunity = calculateOpportunity(opportunityInputsFromAnswers(answers, scoring.gaps.length));
    const recommendations = recommendComponents(scoring, answers);
    const workflow = buildWorkflow(scoring, answers);
    const gapCards = buildGapCards(scoring);
    const unknownItems = buildUnknownItems(scoring);
    const fit = scoreFit({ answers, scoring, trade: lead.trade, employeeRange: lead.employee_range });

    // 3) AI narrative (falls back to deterministic template)
    const narrative = await generateNarrative({
      lead, answers, scoring, recommendations, opportunity, websiteOk: analysis.ok,
    });

    // 4) Persist report + estimate
    const token = generateReportToken();
    const report = await db.insert('audit_reports', {
      audit_lead_id: lead.id,
      public_report_token: token,
      overall_score: scoring.overall,
      enquiry_capture_score: scoring.categories.find((c) => c.key === 'enquiry_capture').score,
      response_availability_score: scoring.categories.find((c) => c.key === 'response_availability').score,
      lead_qualification_score: scoring.categories.find((c) => c.key === 'lead_qualification').score,
      follow_up_score: scoring.categories.find((c) => c.key === 'follow_up').score,
      visibility_score: scoring.categories.find((c) => c.key === 'visibility').score,
      overall_confidence: scoring.confidence,
      executive_summary: narrative.executive_summary,
      positives_json: { items: narrative.working_well, raw: scoring.positives },
      gaps_json: { cards: gapCards },
      unknowns_json: { items: unknownItems },
      recommendations_json: { items: recommendations, narrative_by: narrative.generated_by },
      workflow_json: workflow,
      website_analysed: analysis.ok,
      methodology_version: AUDIT_CONFIG.scoringVersion,
    });

    await db.insert('opportunity_estimates', {
      audit_lead_id: lead.id,
      monthly_enquiries_low: opportunity.inputs.monthly_enquiries_low,
      monthly_enquiries_high: opportunity.inputs.monthly_enquiries_high,
      average_job_value_low: opportunity.inputs.average_job_value_low,
      average_job_value_high: opportunity.inputs.average_job_value_high,
      exposure_rate_low: opportunity.exposure_rate_low,
      exposure_rate_high: opportunity.exposure_rate_high,
      recovery_rate_low: opportunity.recovery_rate_low,
      recovery_rate_high: opportunity.recovery_rate_high,
      jobs_recovered_low: opportunity.jobs_recovered_low,
      jobs_recovered_high: opportunity.jobs_recovered_high,
      value_low: opportunity.value_low,
      value_high: opportunity.value_high,
      assumptions_json: { assumptions: opportunity.assumptions, disclaimer: opportunity.disclaimer, exposure_band: opportunity.exposure_band },
      user_adjusted: false,
    });

    // 5) Internal qualification on the lead row
    await db.update('audit_leads', `id=eq.${lead.id}`, {
      lead_status: 'report_ready',
      internal_fit_score: fit.score,
      internal_fit_label: fit.label,
      main_pain_point: fit.main_pain_point,
      recommended_sales_angle: fit.recommended_sales_angle,
      internal_fit_json: fit,
      audit_score: scoring.overall,
    });

    await db.update('audit_jobs', `id=eq.${job.id}`, {
      status: 'complete', completed_at: new Date().toISOString(), error_code: null, error_message: null,
    });

    // 6) Notifications + report email (all non-fatal)
    const reportUrl = reportUrlFor(token);
    await sendWebhook('audit.completed', { lead, fit, scoring, reportUrl });
    if (fit.label === 'High fit') await sendWebhook('audit.high_fit', { lead, fit, scoring, reportUrl });

    try {
      const secret = process.env.AUDIT_REPORT_SECRET;
      const templates = emailTemplates({
        businessName: lead.business_name,
        firstName: lead.first_name,
        score: scoring.overall,
        label: scoring.label,
        mainGap: gapCards[0]?.title || null,
        reportUrl,
        bookingUrl: bookingUrl().startsWith('http') ? bookingUrl() : siteUrl() + bookingUrl(),
        unsubscribeUrl: secret ? `${siteUrl()}/api/contractor-audit?action=unsubscribe&lead=${lead.id}&token=${unsubscribeToken(lead.id, secret)}` : null,
      });
      await sendEmail({ to: lead.email, subject: templates.report_ready.subject, html: templates.report_ready.html });
    } catch (e) { console.error('report email failed:', e.message); }

    await logEvent(lead.id, report.id, 'audit_processing_completed', { website_analysed: analysis.ok, pages: analysis.pagesAnalysed });

    return ok(res, { status: 'complete', report_token: token, website_analysed: analysis.ok });
  } catch (err) {
    console.error('audit processing failed:', err);
    await db.update('audit_jobs', `id=eq.${job.id}`, {
      status: 'failed', error_code: err.code || 'processing_error', error_message: String(err.message).slice(0, 500),
    }).catch(() => {});
    await logEvent(job.audit_lead_id, null, 'audit_processing_failed', { code: err.code || 'processing_error' });
    return bad(res, 500, 'We could not complete the audit just now. Your details are saved — please retry in a moment.', { retriable: true });
  }
}

/* ---------- action: status ---------- */

async function actionStatus(req, res, body) {
  const { job_id, status_token } = body || {};
  if (!job_id || !status_token) return bad(res, 400, 'Missing job reference.');
  const job = await db.selectOne('audit_jobs', `id=eq.${encodeURIComponent(job_id)}&select=*`);
  if (!job || !safeEqual(job.status_token, String(status_token))) return bad(res, 404, 'Audit job not found.');
  let report_token = null;
  if (job.status === 'complete') {
    const report = await db.selectOne('audit_reports', `audit_lead_id=eq.${job.audit_lead_id}&select=public_report_token&order=generated_at.desc&limit=1`);
    report_token = report?.public_report_token || null;
  }
  return ok(res, { status: job.status, report_token, error_code: job.error_code || null });
}

/* ---------- action: report (public, token-gated) ---------- */

async function loadReportByToken(token) {
  if (!token || typeof token !== 'string' || token.length < 20) return null;
  return db.selectOne('audit_reports', `public_report_token=eq.${encodeURIComponent(token)}&select=*`);
}

function reportExpired(report) {
  const days = AUDIT_CONFIG.reportExpiryDays;
  if (!days) return false;
  return Date.now() - new Date(report.generated_at).getTime() > days * 24 * 3600 * 1000;
}

async function actionReport(req, res, body) {
  const token = body.t || body.token;
  const report = await loadReportByToken(token);
  if (!report) return bad(res, 404, 'This report link is not valid.');
  if (reportExpired(report)) return bad(res, 410, 'This report link has expired. Contact hello@leadaline.com for a refreshed copy.');

  const lead = await db.selectOne('audit_leads', `id=eq.${report.audit_lead_id}&select=id,first_name,business_name,email,phone,website_url,trade,other_trade,service_area`);
  const estimate = await db.selectOne('opportunity_estimates', `audit_lead_id=eq.${report.audit_lead_id}&select=*&order=created_at.desc&limit=1`);
  const answers = await db.select('audit_responses', `audit_lead_id=eq.${report.audit_lead_id}&select=question_key,answer_value,answer_label`);

  // View tracking + webhooks
  const prior = await db.select('audit_events', `audit_lead_id=eq.${lead.id}&event_name=eq.report_opened&select=id&limit=2`);
  const first = prior.length === 0;
  await logEvent(lead.id, report.id, first ? 'report_opened' : 'report_reopened', {}, body.session_id);
  const fitCtx = { lead, reportUrl: reportUrlFor(token) };
  await sendWebhook(first ? 'report.first_view' : 'report.repeat_view', fitCtx);
  if (first) await db.update('audit_leads', `id=eq.${lead.id}&lead_status=in.(new,report_ready)`, { lead_status: 'report_viewed' }).catch(() => {});

  // Public-safe payload: NO internal fit / sales angle here.
  return ok(res, {
    report: {
      business: {
        name: lead.business_name,
        first_name: lead.first_name,
        website: lead.website_url,
        trade: lead.trade,
        trade_label: tradeLabel(lead.trade) + (lead.other_trade ? ` — ${lead.other_trade}` : ''),
        service_area: lead.service_area,
        email: lead.email,
        phone: lead.phone,
      },
      generated_at: report.generated_at,
      website_analysed: report.website_analysed,
      overall_score: report.overall_score,
      overall_confidence: report.overall_confidence,
      category_scores: {
        enquiry_capture: report.enquiry_capture_score,
        response_availability: report.response_availability_score,
        lead_qualification: report.lead_qualification_score,
        follow_up: report.follow_up_score,
        visibility: report.visibility_score,
      },
      executive_summary: report.executive_summary,
      positives: report.positives_json,
      gaps: report.gaps_json,
      unknowns: report.unknowns_json,
      recommendations: report.recommendations_json,
      workflow: report.workflow_json,
      estimate,
      answers,
      booking_url: bookingUrl(),
      methodology_version: report.methodology_version,
    },
  });
}

/* ---------- action: track ---------- */

async function actionTrack(req, res, body) {
  const token = body.t || body.token;
  const event = String(body.event || '');
  if (!TRACKED_EVENTS.has(event)) return bad(res, 400, 'Unknown event.');
  const report = await loadReportByToken(token);
  if (!report) return bad(res, 404, 'Invalid report reference.');

  const lead = await db.selectOne('audit_leads', `id=eq.${report.audit_lead_id}&select=*`);
  const metadata = typeof body.metadata === 'object' && body.metadata ? JSON.parse(JSON.stringify(body.metadata).slice(0, 2000)) : {};
  await logEvent(lead.id, report.id, event, metadata, body.session_id);

  const reportUrl = reportUrlFor(token);
  if (event === 'booking_cta_clicked') {
    await sendWebhook('report.cta_clicked', { lead, reportUrl });
    await db.update('audit_leads', `id=eq.${lead.id}&lead_status=in.(new,report_ready,report_viewed)`, { lead_status: 'engaged' }).catch(() => {});
  }
  if (event === 'booking_started') {
    await sendWebhook('demo.booking_started', { lead, reportUrl });
    await db.insert('audit_bookings', {
      audit_lead_id: lead.id, report_id: report.id, booking_provider: metadata.provider || 'leadaline',
      booking_status: 'started',
    }).catch(() => {});
  }
  if (event === 'booking_completed') {
    await sendWebhook('demo.booking_completed', { lead, reportUrl });
    await db.insert('audit_bookings', {
      audit_lead_id: lead.id, report_id: report.id, booking_provider: metadata.provider || 'leadaline',
      booking_reference: metadata.reference || null, booking_status: 'booked',
      scheduled_at: metadata.scheduled_at || null,
    }).catch(() => {});
    await db.update('audit_leads', `id=eq.${lead.id}`, { lead_status: 'demo_booked' }).catch(() => {});
  }
  return ok(res, {});
}

/* ---------- action: adjust (opportunity recalculation) ---------- */

function cleanRange(r, min, max) {
  if (!Array.isArray(r) || r.length !== 2) return null;
  const lo = Number(r[0]); const hi = Number(r[1]);
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || lo < min || hi > max || lo > hi) return null;
  return [lo, hi];
}

async function actionAdjust(req, res, body) {
  const report = await loadReportByToken(body.t || body.token);
  if (!report) return bad(res, 404, 'Invalid report reference.');

  const enquiries = cleanRange(body.monthly_enquiries, 0, 2000);
  const value = cleanRange(body.job_value, 0, 100000);
  if (!enquiries || !value) return bad(res, 400, 'Invalid calculator inputs.');

  const gapCount = (report.gaps_json?.cards || []).length;
  const estimate = calculateOpportunity({ monthlyEnquiries: enquiries, jobValue: value, gapCount });

  await db.insert('opportunity_estimates', {
    audit_lead_id: report.audit_lead_id,
    monthly_enquiries_low: estimate.inputs.monthly_enquiries_low,
    monthly_enquiries_high: estimate.inputs.monthly_enquiries_high,
    average_job_value_low: estimate.inputs.average_job_value_low,
    average_job_value_high: estimate.inputs.average_job_value_high,
    exposure_rate_low: estimate.exposure_rate_low,
    exposure_rate_high: estimate.exposure_rate_high,
    recovery_rate_low: estimate.recovery_rate_low,
    recovery_rate_high: estimate.recovery_rate_high,
    jobs_recovered_low: estimate.jobs_recovered_low,
    jobs_recovered_high: estimate.jobs_recovered_high,
    value_low: estimate.value_low,
    value_high: estimate.value_high,
    assumptions_json: { assumptions: estimate.assumptions, disclaimer: estimate.disclaimer, exposure_band: estimate.exposure_band },
    user_adjusted: true,
  }).catch((e) => console.error('adjusted estimate store failed:', e.message));

  await logEvent(report.audit_lead_id, report.id, 'calculator_adjusted', { enquiries, value });
  return ok(res, { estimate });
}

/* ---------- action: unsubscribe ---------- */

async function actionUnsubscribe(req, res, body) {
  const secret = process.env.AUDIT_REPORT_SECRET;
  const leadId = body.lead;
  if (!secret || !leadId || !verifyUnsubscribeToken(leadId, body.token, secret)) {
    return bad(res, 400, 'Invalid unsubscribe link.');
  }
  await db.update('email_preferences', `audit_lead_id=eq.${encodeURIComponent(leadId)}`, {
    marketing_allowed: false, unsubscribed_at: new Date().toISOString(),
  });
  await db.update('audit_leads', `id=eq.${encodeURIComponent(leadId)}`, { marketing_consent: false }).catch(() => {});
  res.setHeader('content-type', 'text/html; charset=utf-8');
  return res.status(200).send('<!doctype html><body style="font-family:sans-serif;padding:40px;"><h2>You\'re unsubscribed</h2><p>You will not receive further follow-up emails from LeadaLine about this audit. Your report link continues to work.</p></body>');
}

/* ---------- admin actions (internal CRM) ---------- */

async function requireAdmin(req) {
  const auth = req.headers.authorization || '';
  const jwt = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const user = await db.verifyUserJwt(jwt);
  if (!user || !user.email) return null;
  const allow = (process.env.ADMIN_EMAILS || 'hello@leadaline.com,admin@leadaline.com')
    .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  return allow.includes(user.email.toLowerCase()) ? user : null;
}

async function actionAdminLeads(req, res, body) {
  const user = await requireAdmin(req);
  if (!user) return bad(res, 401, 'Not authorised.');

  const filters = [];
  if (body.fit) filters.push(`internal_fit_label=eq.${encodeURIComponent(body.fit)}`);
  if (body.status) filters.push(`lead_status=eq.${encodeURIComponent(body.status)}`);
  if (body.trade) filters.push(`trade=eq.${encodeURIComponent(body.trade)}`);
  if (body.campaign) filters.push(`utm_campaign=eq.${encodeURIComponent(body.campaign)}`);
  if (body.from) filters.push(`created_at=gte.${encodeURIComponent(body.from)}`);
  if (body.to) filters.push(`created_at=lte.${encodeURIComponent(body.to)}`);
  const q = filters.concat([
    'select=id,created_at,business_name,first_name,email,phone,website_url,trade,service_area,audit_score,internal_fit_score,internal_fit_label,main_pain_point,recommended_sales_angle,lead_status,utm_source,utm_campaign,referral_source',
    'order=created_at.desc', 'limit=200',
  ]).join('&');
  const leads = await db.select('audit_leads', q);

  // Engagement counts per lead (single query, aggregated client-side)
  const ids = leads.map((l) => l.id);
  let events = [];
  if (ids.length) {
    events = await db.select('audit_events', `audit_lead_id=in.(${ids.join(',')})&select=audit_lead_id,event_name&limit=5000`);
  }
  const stats = {};
  for (const e of events) {
    const s = stats[e.audit_lead_id] || (stats[e.audit_lead_id] = { views: 0, cta: 0, last: null });
    if (e.event_name === 'report_opened' || e.event_name === 'report_reopened') s.views++;
    if (e.event_name === 'booking_cta_clicked') s.cta++;
  }
  return ok(res, { leads: leads.map((l) => ({ ...l, engagement: stats[l.id] || { views: 0, cta: 0 } })) });
}

async function actionAdminLead(req, res, body) {
  const user = await requireAdmin(req);
  if (!user) return bad(res, 401, 'Not authorised.');
  const id = body.id;
  if (!id) return bad(res, 400, 'Missing lead id.');
  const enc = encodeURIComponent(id);

  const [lead, responses, observations, reports, estimates, events, bookings, prefs, jobs] = await Promise.all([
    db.selectOne('audit_leads', `id=eq.${enc}&select=*`),
    db.select('audit_responses', `audit_lead_id=eq.${enc}&select=*&order=created_at.asc`),
    db.select('website_observations', `audit_lead_id=eq.${enc}&select=*&limit=100`),
    db.select('audit_reports', `audit_lead_id=eq.${enc}&select=*&order=generated_at.desc&limit=3`),
    db.select('opportunity_estimates', `audit_lead_id=eq.${enc}&select=*&order=created_at.desc&limit=5`),
    db.select('audit_events', `audit_lead_id=eq.${enc}&select=*&order=created_at.desc&limit=200`),
    db.select('audit_bookings', `audit_lead_id=eq.${enc}&select=*&order=created_at.desc`),
    db.selectOne('email_preferences', `audit_lead_id=eq.${enc}&select=*`),
    db.select('audit_jobs', `audit_lead_id=eq.${enc}&select=id,status,started_at,completed_at,error_code,error_message,retry_count&order=created_at.desc`),
  ]);
  if (!lead) return bad(res, 404, 'Lead not found.');
  return ok(res, { lead, responses, observations, reports, estimates, events, bookings, email_preferences: prefs, jobs });
}

async function actionAdminUpdateLead(req, res, body) {
  const user = await requireAdmin(req);
  if (!user) return bad(res, 401, 'Not authorised.');
  const id = body.id;
  const allowed = {};
  const STATUSES = ['new', 'audit_processing', 'report_ready', 'report_viewed', 'engaged', 'demo_booked', 'qualified', 'proposal', 'won', 'lost', 'nurture', 'invalid'];
  if (body.lead_status && STATUSES.includes(body.lead_status)) allowed.lead_status = body.lead_status;
  if (typeof body.notes === 'string') allowed.notes = body.notes.slice(0, 5000);
  if (!id || Object.keys(allowed).length === 0) return bad(res, 400, 'Nothing to update.');
  const rows = await db.update('audit_leads', `id=eq.${encodeURIComponent(id)}`, allowed);
  return ok(res, { lead: rows[0] || null });
}

/* ---------- router ---------- */

const ACTIONS = {
  submit: actionSubmit,
  process: actionProcess,
  status: actionStatus,
  report: actionReport,
  track: actionTrack,
  adjust: actionAdjust,
  unsubscribe: actionUnsubscribe,
  admin_leads: actionAdminLeads,
  admin_lead: actionAdminLead,
  admin_update_lead: actionAdminUpdateLead,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let body = {};
    if (req.method === 'POST') {
      body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    }
    // GET params merge (report/unsubscribe links)
    body = { ...(req.query || {}), ...body };
    const action = body.action;
    const fn = ACTIONS[action];
    if (!fn) return bad(res, 400, 'Unknown action.');
    return await fn(req, res, body);
  } catch (err) {
    console.error('contractor-audit error:', err);
    if (err.code === 'config') return bad(res, 500, 'The audit service is not fully configured yet. Please try again later.');
    return bad(res, 500, 'Something went wrong on our side. Please try again.');
  }
}
