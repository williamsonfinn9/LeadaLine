/* Contractor Enquiry Audit — unit tests (node --test tests/) */
import test from 'node:test';
import assert from 'node:assert/strict';

import { normaliseWebsiteUrl, normalisedDomain, validateBusinessDetails, validateQuestionnaire, cleanAttribution } from '../lib/audit/validate.js';
import { isPrivateAddress, assertPublicUrl } from '../lib/audit/urlsafety.js';
import { scoreAudit, scoreCategory } from '../lib/audit/scoring.js';
import { calculateOpportunity, opportunityInputsFromAnswers, exposureBand } from '../lib/audit/opportunity.js';
import { scoreFit } from '../lib/audit/fit.js';
import { recommendComponents, buildWorkflow, buildGapCards, buildUnknownItems, gapCard } from '../lib/audit/recommend.js';
import { generateReportToken, safeEqual, unsubscribeToken, verifyUnsubscribeToken } from '../lib/audit/tokens.js';
import { emailTemplates } from '../lib/audit/emails.js';
import { fallbackNarrative } from '../lib/audit/ai.js';
import { QUESTIONS, scoreLabel } from '../lib/audit/config.js';

/* ---------- URL normalisation ---------- */
test('normaliseWebsiteUrl accepts bare domains and adds https', () => {
  assert.equal(normaliseWebsiteUrl('example.co.uk'), 'https://example.co.uk/');
  assert.equal(normaliseWebsiteUrl('  WWW.Example.com/path?q=1#x '), 'https://www.example.com/path');
});

test('normaliseWebsiteUrl rejects junk', () => {
  assert.equal(normaliseWebsiteUrl('not a url'), null);
  assert.equal(normaliseWebsiteUrl('ftp://example.com'), null);
  assert.equal(normaliseWebsiteUrl('http://user:pass@example.com'), null);
  assert.equal(normaliseWebsiteUrl('http://example.com:8080'), null);
  assert.equal(normaliseWebsiteUrl(''), null);
  assert.equal(normaliseWebsiteUrl('nodots'), null);
});

test('normalisedDomain strips www', () => {
  assert.equal(normalisedDomain('https://www.example.co.uk/x'), 'example.co.uk');
});

/* ---------- SSRF safety ---------- */
test('isPrivateAddress catches private/loopback/metadata ranges', () => {
  for (const ip of ['127.0.0.1', '10.0.0.5', '172.16.9.1', '192.168.1.1', '169.254.169.254', '0.0.0.0', '100.64.1.1', '::1', 'fd00::1', 'fe80::1', '::ffff:192.168.0.1']) {
    assert.equal(isPrivateAddress(ip), true, ip);
  }
  for (const ip of ['8.8.8.8', '151.101.1.1', '2606:4700::1111']) {
    assert.equal(isPrivateAddress(ip), false, ip);
  }
});

test('assertPublicUrl blocks localhost, file and internal hosts', async () => {
  for (const bad of ['http://localhost/', 'http://127.0.0.1/', 'http://169.254.169.254/latest/meta-data/', 'file:///etc/passwd', 'http://foo.internal/', 'http://[::1]/']) {
    await assert.rejects(() => assertPublicUrl(bad), (e) => e.code === 'unsafe_url' || e.code === 'dns_failure', bad);
  }
});

/* ---------- fixtures ---------- */
const GOOD_OBS = Object.fromEntries([
  'phone_visible', 'email_visible', 'click_to_call', 'enquiry_form_exists',
  'form_asks_phone', 'form_asks_service', 'form_asks_location', 'form_asks_urgency',
  'clear_cta', 'opening_hours_visible', 'out_of_hours_guidance', 'live_chat_or_assistant',
  'response_expectation_set', 'whatsapp_contact',
].map((k) => [k, { value: true }]));

const WEAK_OBS = Object.fromEntries([
  ['phone_visible', { value: true }],
  ['email_visible', { value: false }],
  ['click_to_call', { value: false }],
  ['enquiry_form_exists', { value: false }],
  ['form_asks_phone', { value: false }],
  ['form_asks_service', { value: false }],
  ['form_asks_location', { value: false }],
  ['form_asks_urgency', { value: false }],
  ['clear_cta', { value: false }],
  ['opening_hours_visible', { value: false }],
  ['live_chat_or_assistant', { value: false }],
  ['whatsapp_contact', { value: false }],
]);

const STRONG_ANSWERS = {
  monthly_enquiries: '26-50', average_job_value: '1000-2500',
  missed_call_handling: 'answered_externally', website_response_speed: 'immediately',
  quote_follow_up: 'automated', lead_tracking: 'crm', out_of_hours: 'yes_response',
  biggest_concern: 'visibility',
};

const WEAK_ANSWERS = {
  monthly_enquiries: '11-25', average_job_value: '500-1000',
  missed_call_handling: 'voicemail', website_response_speed: 'over_24h',
  quote_follow_up: 'no_process', lead_tracking: 'multiple', out_of_hours: 'no',
  biggest_concern: 'missed_calls',
};

/* ---------- scoring ---------- */
test('strong business scores high, weak business scores low', () => {
  const strong = scoreAudit(GOOD_OBS, STRONG_ANSWERS);
  const weak = scoreAudit(WEAK_OBS, WEAK_ANSWERS);
  assert.ok(strong.overall >= 85, `strong=${strong.overall}`);
  assert.ok(weak.overall <= 40, `weak=${weak.overall}`);
  assert.ok(strong.overall <= 100 && weak.overall >= 0);
});

test('unknowns are not punished as failures', () => {
  // Same weak observations; one set answers "not sure" everywhere possible
  const notSure = {
    monthly_enquiries: 'not_sure', average_job_value: 'not_sure',
    missed_call_handling: 'not_sure', website_response_speed: 'not_sure',
    quote_follow_up: 'not_sure', lead_tracking: 'crm', out_of_hours: 'not_sure',
    biggest_concern: 'all',
  };
  const allBad = scoreAudit({}, WEAK_ANSWERS);
  const unknown = scoreAudit({}, notSure);
  assert.ok(unknown.overall > allBad.overall, `unknown=${unknown.overall} vs bad=${allBad.overall}`);
  assert.ok(['low', 'medium'].includes(unknown.confidence));
  assert.ok(unknown.unknowns.length > 0);
});

test('category scores stay within 0..20 and carry confidence', () => {
  for (const key of ['enquiry_capture', 'response_availability', 'lead_qualification', 'follow_up', 'visibility']) {
    const c = scoreCategory(key, GOOD_OBS, STRONG_ANSWERS);
    assert.ok(c.score >= 0 && c.score <= 20, key);
    assert.ok(['high', 'medium', 'low'].includes(c.confidence));
  }
});

test('score labels map correctly', () => {
  assert.equal(scoreLabel(95), 'Highly organised enquiry process');
  assert.equal(scoreLabel(80), 'Strong process with some improvement opportunities');
  assert.equal(scoreLabel(65), 'Good foundations, but important gaps remain');
  assert.equal(scoreLabel(45), 'Several opportunities to improve');
  assert.equal(scoreLabel(10), 'Significant gaps');
});

/* ---------- opportunity ---------- */
test('opportunity calculation is transparent and bounded', () => {
  const est = calculateOpportunity({ monthlyEnquiries: [11, 25], jobValue: [500, 1000], gapCount: 5 });
  assert.equal(est.exposure_band, 'medium');
  assert.ok(est.jobs_recovered_low >= 0);
  assert.ok(est.jobs_recovered_high >= est.jobs_recovered_low);
  assert.ok(est.value_high >= est.value_low);
  assert.ok(est.disclaimer.includes('not a revenue guarantee'));
  // hand check: high = 25 * 0.25 * 0.30 = 1.875 jobs
  assert.ok(Math.abs(est.jobs_recovered_high - 1.9) < 0.11);
});

test('not-sure answers use labelled default assumptions', () => {
  const inputs = opportunityInputsFromAnswers({ monthly_enquiries: 'not_sure', average_job_value: 'not_sure' }, 2);
  assert.equal(inputs.monthlyEnquiries, null);
  const est = calculateOpportunity(inputs);
  assert.ok(est.assumptions.some((a) => a.includes('assumed')));
});

test('exposure band thresholds', () => {
  assert.equal(exposureBand(0), 'low');
  assert.equal(exposureBand(3), 'medium');
  assert.equal(exposureBand(7), 'high');
});

/* ---------- fit ---------- */
test('weak process + real demand = high fit; tiny volume = low fit', () => {
  const scoring = scoreAudit(WEAK_OBS, WEAK_ANSWERS);
  const high = scoreFit({ answers: WEAK_ANSWERS, scoring, trade: 'electrical', employeeRange: '2–5' });
  assert.equal(high.label, 'High fit');
  assert.ok(high.recommended_sales_angle.toLowerCase().includes('missed-call'));

  const low = scoreFit({
    answers: { ...STRONG_ANSWERS, monthly_enquiries: '0-10', average_job_value: 'under-250' },
    scoring: scoreAudit(GOOD_OBS, STRONG_ANSWERS), trade: 'cleaning', employeeRange: 'Just me',
  });
  assert.ok(low.score < high.score);
});

test('strong business is still a viable admin/reporting opportunity', () => {
  const scoring = scoreAudit(GOOD_OBS, STRONG_ANSWERS);
  const fit = scoreFit({ answers: STRONG_ANSWERS, scoring, trade: 'roofing', employeeRange: '6–10' });
  assert.ok(fit.reasons.some((r) => r.includes('Strong process')));
  assert.ok(fit.main_pain_point);
  assert.ok(fit.key_discovery_question.length > 10);
});

/* ---------- recommendations ---------- */
test('recommendations are ranked, limited to 3, and match the concern', () => {
  const scoring = scoreAudit(WEAK_OBS, WEAK_ANSWERS);
  const recs = recommendComponents(scoring, WEAK_ANSWERS);
  assert.ok(recs.length >= 1 && recs.length <= 3);
  assert.equal(recs[0].priority, 1);
  assert.equal(recs[0].component.key, 'receptionist'); // missed calls concern
});

test('strong business gets reporting/admin, not the rescue package', () => {
  const scoring = scoreAudit(GOOD_OBS, STRONG_ANSWERS);
  const recs = recommendComponents(scoring, STRONG_ANSWERS);
  assert.ok(recs.some((r) => ['reporting', 'admin'].includes(r.component.key)));
});

test('workflow adapts to the main concern', () => {
  const scoring = scoreAudit(WEAK_OBS, WEAK_ANSWERS);
  assert.equal(buildWorkflow(scoring, WEAK_ANSWERS).theme, 'missed_calls');
  assert.equal(buildWorkflow(scoring, { biggest_concern: 'quote_followup' }).theme, 'quote_followup');
  const w = buildWorkflow(scoring, { biggest_concern: 'all' });
  assert.ok(w.steps.length >= 5);
});

test('gap cards carry the required fields and every scoring gap key has a card', () => {
  const scoring = scoreAudit(WEAK_OBS, WEAK_ANSWERS);
  const cards = buildGapCards(scoring);
  assert.ok(cards.length > 0 && cards.length <= 6);
  for (const c of cards) {
    assert.ok(c.title && c.observation && c.why && c.recommendation, c.key);
  }
  for (const gap of scoring.gaps) {
    assert.ok(gapCard(gap.key), `missing gap card for ${gap.key}`);
  }
});

test('unknown items list is produced for sparse data', () => {
  const items = buildUnknownItems(scoreAudit({}, { biggest_concern: 'all', lead_tracking: 'crm', monthly_enquiries: 'not_sure', average_job_value: 'not_sure', missed_call_handling: 'not_sure', website_response_speed: 'not_sure', quote_follow_up: 'not_sure', out_of_hours: 'not_sure' }));
  assert.ok(items.length > 0);
});

/* ---------- validation ---------- */
test('validateBusinessDetails enforces required fields and consent', () => {
  const bad = validateBusinessDetails({});
  assert.equal(bad.ok, false);
  assert.ok(bad.errors.privacy_consent);

  const good = validateBusinessDetails({
    business_name: 'BJC Electrical', website_url: 'bjc-electrical.co.uk',
    first_name: 'Ben', email: 'ben@bjc.co.uk', phone: '07700 900123',
    trade: 'electrical', service_area: 'Leeds', privacy_consent: true,
  });
  assert.equal(good.ok, true, JSON.stringify(good.errors));
  assert.equal(good.data.normalised_domain, 'bjc-electrical.co.uk');
  assert.equal(good.data.marketing_consent, false); // never defaults on
});

test('other trade requires a description', () => {
  const r = validateBusinessDetails({
    business_name: 'X Ltd', website_url: 'x.com', first_name: 'Al',
    email: 'a@x.com', phone: '07700900123', trade: 'other', service_area: 'York',
    privacy_consent: true,
  });
  assert.equal(r.ok, false);
  assert.ok(r.errors.other_trade);
});

test('questionnaire validation requires every question', () => {
  const partial = validateQuestionnaire({ monthly_enquiries: '11-25' });
  assert.equal(partial.ok, false);
  const full = validateQuestionnaire(WEAK_ANSWERS);
  assert.equal(full.ok, true);
  assert.equal(Object.keys(full.data).length, QUESTIONS.length);
});

test('attribution is sanitised', () => {
  const a = cleanAttribution({ utm_source: '  google  ', utm_campaign: 'x'.repeat(500), nonsense: 'y' });
  assert.equal(a.utm_source, 'google');
  assert.ok(a.utm_campaign.length <= 120);
  assert.equal(a.referral_code, null);
});

/* ---------- tokens ---------- */
test('report tokens are long, url-safe and unique', () => {
  const t1 = generateReportToken();
  const t2 = generateReportToken();
  assert.notEqual(t1, t2);
  assert.ok(t1.length >= 40);
  assert.ok(/^[A-Za-z0-9_-]+$/.test(t1));
});

test('safeEqual and unsubscribe token round-trip', () => {
  assert.equal(safeEqual('abc', 'abc'), true);
  assert.equal(safeEqual('abc', 'abd'), false);
  assert.equal(safeEqual('abc', 'abcd'), false);
  const tok = unsubscribeToken('lead-1', 'secret');
  assert.equal(verifyUnsubscribeToken('lead-1', tok, 'secret'), true);
  assert.equal(verifyUnsubscribeToken('lead-2', tok, 'secret'), false);
  assert.equal(verifyUnsubscribeToken('lead-1', tok, 'other'), false);
});

/* ---------- emails ---------- */
test('email templates escape content and separate marketing from transactional', () => {
  const t = emailTemplates({
    businessName: 'A<script>alert(1)</script>Co', firstName: 'Sam', score: 62,
    label: 'Good foundations, but important gaps remain', mainGap: 'Quote follow-up is not consistent',
    reportUrl: 'https://example.com/r/abc', bookingUrl: 'https://example.com/book',
    unsubscribeUrl: 'https://example.com/unsub',
  });
  assert.equal(t.report_ready.kind, 'transactional');
  assert.ok(!t.report_ready.html.includes('<script>alert'));
  for (const k of ['useful_followup', 'workflow_preview', 'final_reminder']) {
    assert.equal(t[k].kind, 'marketing');
    assert.ok(t[k].html.includes('unsub'), k);
  }
});

/* ---------- AI fallback ---------- */
test('fallback narrative works without AI and mentions the score', () => {
  const scoring = scoreAudit(WEAK_OBS, WEAK_ANSWERS);
  const recs = recommendComponents(scoring, WEAK_ANSWERS);
  const n = fallbackNarrative({
    lead: { business_name: 'BJC Electrical' }, scoring, recommendations: recs, websiteOk: false,
  });
  assert.ok(n.executive_summary.includes('BJC Electrical'));
  assert.ok(n.executive_summary.includes(String(scoring.overall)));
  assert.ok(n.executive_summary.includes('could not fully analyse'));
  assert.equal(n.generated_by, 'fallback');
});
