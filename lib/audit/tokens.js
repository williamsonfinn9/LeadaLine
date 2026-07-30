/* ============================================================
   Contractor Enquiry Audit — secure tokens (SERVER ONLY)
   ============================================================ */

import crypto from 'node:crypto';

/** URL-safe random token, default 256 bits. Used for report links. */
export function generateReportToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64url');
}

/** Short random id for job/status correlation. */
export function generateStatusToken() {
  return crypto.randomBytes(16).toString('base64url');
}

/** Constant-time string comparison. */
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/** HMAC-SHA256 signature (hex) — used for webhook signing + unsubscribe links. */
export function hmacSign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

/** Signed unsubscribe token for a lead id. */
export function unsubscribeToken(leadId, secret) {
  return hmacSign(`unsub:${leadId}`, secret).slice(0, 32);
}

export function verifyUnsubscribeToken(leadId, token, secret) {
  return safeEqual(unsubscribeToken(leadId, secret), String(token || ''));
}
