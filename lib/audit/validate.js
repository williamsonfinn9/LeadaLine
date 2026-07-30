/* ============================================================
   Contractor Enquiry Audit — input validation & normalisation
   Pure ESM, shared by server, browser and tests.
   ============================================================ */

import { TRADES, QUESTIONS, EMPLOYEE_RANGES } from './config.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UK_PHONE_RE = /^(\+?44|0)[\d\s()-]{8,13}$/;

/** Normalise a user-supplied website URL. Returns null if unusable. */
export function normaliseWebsiteUrl(input) {
  if (!input || typeof input !== 'string') return null;
  let raw = input.trim().toLowerCase();
  if (!raw) return null;
  // Strip common copy/paste noise
  raw = raw.replace(/\s+/g, '');
  if (!/^[a-z][a-z0-9+.-]*:\/\//.test(raw)) raw = 'https://' + raw;
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  if (!url.hostname || !url.hostname.includes('.')) return null;
  // Reject credentials-in-URL and ports other than 80/443
  if (url.username || url.password) return null;
  if (url.port && url.port !== '80' && url.port !== '443') return null;
  url.hash = '';
  url.search = '';
  return url.toString();
}

/** Extract a normalised registrable-ish domain for dedupe purposes. */
export function normalisedDomain(websiteUrl) {
  try {
    const host = new URL(websiteUrl).hostname.toLowerCase();
    return host.startsWith('www.') ? host.slice(4) : host;
  } catch {
    return null;
  }
}

export function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_RE.test(email.trim()) && email.length <= 254;
}

export function isValidPhone(phone) {
  if (typeof phone !== 'string') return false;
  const cleaned = phone.trim();
  return UK_PHONE_RE.test(cleaned) && cleaned.replace(/\D/g, '').length >= 10;
}

function cleanText(value, max = 200) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

const TRADE_KEYS = new Set(TRADES.map((t) => t.key));

/**
 * Validate the business-details step.
 * Returns { ok, errors: {field: message}, data } — data is cleaned.
 */
export function validateBusinessDetails(input = {}) {
  const errors = {};
  const data = {};

  data.business_name = cleanText(input.business_name, 120);
  if (data.business_name.length < 2) errors.business_name = 'Please enter your business name.';

  const url = normaliseWebsiteUrl(input.website_url);
  if (!url) errors.website_url = 'Please enter a valid website address, e.g. yourbusiness.co.uk';
  data.website_url = url;
  data.normalised_domain = url ? normalisedDomain(url) : null;

  data.first_name = cleanText(input.first_name, 60);
  if (data.first_name.length < 2) errors.first_name = 'Please enter your first name.';

  data.email = cleanText(input.email, 254).toLowerCase();
  if (!isValidEmail(data.email)) errors.email = 'Please enter a valid work email address.';

  data.phone = cleanText(input.phone, 20);
  if (!isValidPhone(data.phone)) errors.phone = 'Please enter a valid UK mobile number.';

  data.trade = cleanText(input.trade, 40);
  if (!TRADE_KEYS.has(data.trade)) errors.trade = 'Please choose your trade or service.';

  data.other_trade = data.trade === 'other' ? cleanText(input.other_trade, 80) : null;
  if (data.trade === 'other' && !data.other_trade) {
    errors.other_trade = 'Please describe your service.';
  }

  data.service_area = cleanText(input.service_area, 120);
  if (data.service_area.length < 2) errors.service_area = 'Please enter your main service area or postcode.';

  // Optional fields
  data.employee_range = EMPLOYEE_RANGES.includes(input.employee_range) ? input.employee_range : null;
  data.current_crm = cleanText(input.current_crm, 80) || null;
  data.booking_system = cleanText(input.booking_system, 80) || null;
  data.referral_source = cleanText(input.referral_source, 120) || null;

  // Consent — privacy consent (processing to produce the audit) is required;
  // marketing consent is optional and must never be pre-ticked.
  data.privacy_consent = input.privacy_consent === true;
  if (!data.privacy_consent) errors.privacy_consent = 'We need your permission to process this information to produce your audit.';
  data.marketing_consent = input.marketing_consent === true;

  return { ok: Object.keys(errors).length === 0, errors, data };
}

const QUESTION_MAP = new Map(QUESTIONS.map((q) => [q.key, new Set(q.options.map((o) => o.value))]));

/**
 * Validate questionnaire answers: { question_key: value }.
 * All questions are required (each has a "not sure"/catch-all option).
 */
export function validateQuestionnaire(answers = {}) {
  const errors = {};
  const data = {};
  for (const q of QUESTIONS) {
    const value = answers[q.key];
    if (!QUESTION_MAP.get(q.key).has(value)) {
      errors[q.key] = 'Please choose an answer.';
    } else {
      data[q.key] = value;
    }
  }
  return { ok: Object.keys(errors).length === 0, errors, data };
}

/** Sanitise UTM/attribution params. */
export function cleanAttribution(input = {}) {
  const pick = (k, max = 120) => cleanText(input[k], max) || null;
  return {
    utm_source: pick('utm_source'),
    utm_medium: pick('utm_medium'),
    utm_campaign: pick('utm_campaign'),
    utm_content: pick('utm_content'),
    utm_term: pick('utm_term'),
    referral_code: pick('referral_code', 60),
    landing_page: pick('landing_page', 300),
  };
}
