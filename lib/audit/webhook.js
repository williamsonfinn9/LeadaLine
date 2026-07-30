/* ============================================================
   Contractor Enquiry Audit — Make.com webhook notifications
   ------------------------------------------------------------
   SERVER ONLY. Outbound events for Cam & Finn's automations.
   Signed with HMAC-SHA256 when MAKE_WEBHOOK_SECRET is set
   (header: x-leadaline-signature = hex hmac of the raw body).
   No-ops safely when MAKE_WEBHOOK_URL is unset. Never throws.
   ============================================================ */

import { hmacSign } from './tokens.js';

export const WEBHOOK_EVENTS = [
  'audit.completed',
  'audit.high_fit',
  'report.first_view',
  'report.repeat_view',
  'report.cta_clicked',
  'demo.booking_started',
  'demo.booking_completed',
];

/**
 * Build the standard payload for an event.
 */
export function buildWebhookPayload(event, { lead, fit, scoring, reportUrl }) {
  return {
    event,
    timestamp: new Date().toISOString(),
    lead_id: lead.id,
    business_name: lead.business_name,
    contact_name: lead.first_name,
    email: lead.email,
    phone: lead.phone,
    website: lead.website_url,
    trade: lead.trade,
    audit_score: scoring ? scoring.overall : lead.audit_score ?? null,
    internal_fit_score: fit ? fit.score : lead.internal_fit_score ?? null,
    internal_fit_label: fit ? fit.label : lead.internal_fit_label ?? null,
    main_pain_point: fit ? fit.main_pain_point : lead.main_pain_point ?? null,
    recommended_sales_angle: fit ? fit.recommended_sales_angle : lead.recommended_sales_angle ?? null,
    report_url: reportUrl || null,
    lead_source: lead.utm_source || lead.referral_source || 'direct',
  };
}

/** Fire a webhook. Returns { sent, error? }. Never throws. */
export async function sendWebhook(event, context) {
  const url = process.env.MAKE_WEBHOOK_URL;
  if (!url) {
    console.log(`[webhook:noop] ${event} (MAKE_WEBHOOK_URL not configured)`);
    return { sent: false };
  }
  try {
    const body = JSON.stringify(buildWebhookPayload(event, context));
    const headers = { 'content-type': 'application/json' };
    const secret = process.env.MAKE_WEBHOOK_SECRET;
    if (secret) headers['x-leadaline-signature'] = hmacSign(body, secret);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(url, { method: 'POST', headers, body, signal: controller.signal });
      if (!res.ok) return { sent: false, error: `HTTP ${res.status}` };
      return { sent: true };
    } finally {
      clearTimeout(timer);
    }
  } catch (err) {
    console.error('[webhook:error]', event, err.message);
    return { sent: false, error: err.message };
  }
}
