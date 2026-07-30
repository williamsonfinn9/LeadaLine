/* ============================================================
   Contractor Enquiry Audit — scoring engine
   ------------------------------------------------------------
   Deterministic, documented, fully unit-tested. Pure ESM.

   Inputs:
     observations — { key: { value: true|false|'unknown', evidence?, source_url? } }
       produced by the website analyser (lib/audit/crawl.js) or
       empty when the site could not be analysed.
     answers      — validated questionnaire answers (validate.js)

   Model:
     5 categories × 20 points. Each category is a set of weighted
     checks. Each check resolves to earned ∈ [0..weight] or
     'unknown'. Unknown checks are removed from the denominator
     (down to a floor of 50% of the category weight) so missing
     information does not automatically read as failure. Each
     category also carries a confidence level driven by how much
     of its weight was actually known.
   ============================================================ */

import { CATEGORY_META, scoreLabel } from './config.js';

const UNKNOWN = 'unknown';

/** Resolve a boolean/unknown observation. */
function obs(observations, key) {
  const o = observations && observations[key];
  if (!o || o.value === UNKNOWN || o.value === null || o.value === undefined) return UNKNOWN;
  return !!o.value;
}

/** Map a questionnaire signal (good/partial/weak/unknown) to a fraction. */
function signalFraction(answers, questionKey, signalMap) {
  const value = answers ? answers[questionKey] : undefined;
  if (!value) return UNKNOWN;
  const frac = signalMap[value];
  return frac === undefined ? UNKNOWN : frac;
}

/* Per-question fractions used by checks below. */
const MISSED_CALL_FRACTION = {
  voicemail: 0.2, customer_retries: 0, manual_callback: 0.5,
  auto_message: 1, answered_externally: 1, not_sure: UNKNOWN,
};
const WEB_RESPONSE_FRACTION = {
  immediately: 1, within_hour: 0.9, same_day: 0.6,
  within_24h: 0.3, over_24h: 0.1, varies: 0.3, not_sure: UNKNOWN,
};
const FOLLOW_UP_FRACTION = {
  automated: 1, reminders: 0.6, manual: 0.25, no_process: 0, not_sure: UNKNOWN,
};
const TRACKING_FRACTION = {
  crm: 1, job_platform: 1, spreadsheet: 0.55, inbox: 0.25,
  whatsapp: 0.25, paper: 0.1, multiple: 0.2, nowhere: 0,
};
const OOH_FRACTION = {
  yes_response: 1, yes_waits: 0.5, voicemail_email: 0.25, no: 0, not_sure: UNKNOWN,
};

/**
 * Category check definitions. Each check:
 *   { key, weight, resolve(observations, answers) -> fraction|UNKNOWN, label }
 */
const CATEGORIES = {
  enquiry_capture: [
    { key: 'phone_visible', weight: 4, label: 'Telephone number visible on website',
      resolve: (o) => bool01(obs(o, 'phone_visible')) },
    { key: 'enquiry_form', weight: 4, label: 'Enquiry form available',
      resolve: (o) => bool01(obs(o, 'enquiry_form_exists')) },
    { key: 'form_useful_fields', weight: 3, label: 'Form requests useful information',
      resolve: (o) => {
        const parts = ['form_asks_phone', 'form_asks_service', 'form_asks_location'];
        const vals = parts.map((k) => obs(o, k));
        if (vals.every((v) => v === UNKNOWN)) return UNKNOWN;
        return vals.filter((v) => v === true).length / parts.length;
      } },
    { key: 'click_to_call', weight: 3, label: 'Mobile click-to-call available',
      resolve: (o) => bool01(obs(o, 'click_to_call')) },
    { key: 'clear_cta', weight: 3, label: 'Clear quote or enquiry call to action',
      resolve: (o) => bool01(obs(o, 'clear_cta')) },
    { key: 'multiple_routes', weight: 3, label: 'More than one practical contact route',
      resolve: (o) => {
        const routes = ['phone_visible', 'enquiry_form_exists', 'email_visible', 'whatsapp_contact'];
        const vals = routes.map((k) => obs(o, k));
        if (vals.every((v) => v === UNKNOWN)) return UNKNOWN;
        return vals.filter((v) => v === true).length >= 2 ? 1 : 0;
      } },
  ],

  response_availability: [
    { key: 'out_of_hours', weight: 6, label: 'Out-of-hours contact route',
      resolve: (o, a) => {
        const q = signalFraction(a, 'out_of_hours', OOH_FRACTION);
        if (q !== UNKNOWN) return q;
        return bool01(obs(o, 'out_of_hours_guidance'));
      } },
    { key: 'immediate_ack', weight: 5, label: 'Customers receive an immediate acknowledgement',
      resolve: (o, a) => {
        const q = signalFraction(a, 'website_response_speed', WEB_RESPONSE_FRACTION);
        if (q !== UNKNOWN) return q;
        return bool01(obs(o, 'response_expectation_set'));
      } },
    { key: 'opening_hours', weight: 3, label: 'Opening hours visible',
      resolve: (o) => bool01(obs(o, 'opening_hours_visible')) },
    { key: 'missed_call_process', weight: 4, label: 'Missed-call process exists',
      resolve: (o, a) => signalFraction(a, 'missed_call_handling', MISSED_CALL_FRACTION) },
    { key: 'assistant_route', weight: 2, label: 'Website assistant, live chat or automated response route',
      resolve: (o) => bool01(obs(o, 'live_chat_or_assistant')) },
  ],

  lead_qualification: [
    { key: 'captures_service', weight: 5, label: 'Service required is captured',
      resolve: (o) => bool01(obs(o, 'form_asks_service')) },
    { key: 'captures_contact', weight: 4, label: 'Contact details are captured',
      resolve: (o) => bool01(obs(o, 'form_asks_phone')) },
    { key: 'captures_location', weight: 4, label: 'Location or postcode is captured',
      resolve: (o) => bool01(obs(o, 'form_asks_location')) },
    { key: 'captures_urgency', weight: 3, label: 'Urgency is captured',
      resolve: (o) => bool01(obs(o, 'form_asks_urgency')) },
    { key: 'structured_handoff', weight: 4, label: 'Leads are structured before handoff',
      resolve: (o, a) => signalFraction(a, 'lead_tracking', TRACKING_FRACTION) },
  ],

  follow_up: [
    { key: 'quote_follow_up', weight: 8, label: 'Quote follow-up is structured',
      resolve: (o, a) => signalFraction(a, 'quote_follow_up', FOLLOW_UP_FRACTION) },
    { key: 'response_expectations', weight: 4, label: 'Response expectations are defined',
      resolve: (o, a) => {
        const q = signalFraction(a, 'website_response_speed', WEB_RESPONSE_FRACTION);
        if (q !== UNKNOWN) return q >= 0.6 ? 1 : q > 0.2 ? 0.5 : 0;
        return bool01(obs(o, 'response_expectation_set'));
      } },
    { key: 'not_memory_dependent', weight: 8, label: 'Follow-up does not depend entirely on memory',
      resolve: (o, a) => {
        const f = signalFraction(a, 'quote_follow_up', FOLLOW_UP_FRACTION);
        const t = signalFraction(a, 'lead_tracking', TRACKING_FRACTION);
        if (f === UNKNOWN && t === UNKNOWN) return UNKNOWN;
        const known = [f, t].filter((v) => v !== UNKNOWN);
        return known.reduce((s, v) => s + v, 0) / known.length;
      } },
  ],

  visibility: [
    { key: 'central_store', weight: 7, label: 'Leads are stored centrally',
      resolve: (o, a) => signalFraction(a, 'lead_tracking', TRACKING_FRACTION) },
    { key: 'status_tracking', weight: 5, label: 'Lead statuses can be tracked',
      resolve: (o, a) => {
        const t = signalFraction(a, 'lead_tracking', TRACKING_FRACTION);
        if (t === UNKNOWN) return UNKNOWN;
        return t >= 0.9 ? 1 : t >= 0.5 ? 0.5 : 0;
      } },
    { key: 'owner_visibility', weight: 4, label: 'Owner can see enquiry performance',
      resolve: (o, a) => {
        const t = signalFraction(a, 'lead_tracking', TRACKING_FRACTION);
        if (t === UNKNOWN) return UNKNOWN;
        return t >= 0.9 ? 1 : 0;
      } },
    { key: 'source_capture', weight: 4, label: 'Lead source is captured / reporting exists',
      resolve: (o, a) => {
        const t = signalFraction(a, 'lead_tracking', TRACKING_FRACTION);
        if (t === UNKNOWN) return UNKNOWN;
        return t >= 0.9 ? 0.75 : 0;
      } },
  ],
};

function bool01(v) {
  if (v === UNKNOWN) return UNKNOWN;
  return v ? 1 : 0;
}

function confidenceFor(knownWeight, totalWeight) {
  const ratio = totalWeight === 0 ? 0 : knownWeight / totalWeight;
  if (ratio >= 0.8) return 'high';
  if (ratio >= 0.5) return 'medium';
  return 'low';
}

/**
 * Score one category. Returns:
 * { key, name, score (0–20), confidence, checks: [...], unknowns: [...] }
 */
export function scoreCategory(categoryKey, observations, answers) {
  const defs = CATEGORIES[categoryKey];
  if (!defs) throw new Error(`Unknown category: ${categoryKey}`);
  const meta = CATEGORY_META.find((c) => c.key === categoryKey);

  const totalWeight = defs.reduce((s, d) => s + d.weight, 0);
  let earned = 0;
  let knownWeight = 0;
  const checks = [];
  const unknowns = [];

  for (const def of defs) {
    const fraction = def.resolve(observations || {}, answers || {});
    if (fraction === UNKNOWN) {
      unknowns.push({ key: def.key, label: def.label });
      checks.push({ key: def.key, label: def.label, weight: def.weight, result: UNKNOWN });
    } else {
      const f = Math.max(0, Math.min(1, fraction));
      earned += f * def.weight;
      knownWeight += def.weight;
      checks.push({ key: def.key, label: def.label, weight: def.weight, result: f });
    }
  }

  // Unknowns shrink the denominator, floored at 50% of total weight,
  // so a category is never scored on almost no information.
  const denominator = Math.max(knownWeight, totalWeight * 0.5);
  const score = denominator === 0 ? 0 : Math.round((earned / denominator) * 20);

  return {
    key: categoryKey,
    name: meta ? meta.name : categoryKey,
    score: Math.max(0, Math.min(20, score)),
    confidence: confidenceFor(knownWeight, totalWeight),
    checks,
    unknowns,
  };
}

/**
 * Full audit score.
 * Returns { overall, label, confidence, categories, positives, gaps, unknowns }
 */
export function scoreAudit(observations, answers) {
  const categories = CATEGORY_META.map((c) => scoreCategory(c.key, observations, answers));
  const overall = Math.max(0, Math.min(100, categories.reduce((s, c) => s + c.score, 0)));

  const confidences = categories.map((c) => c.confidence);
  const overallConfidence = confidences.includes('low')
    ? (confidences.filter((c) => c === 'low').length >= 3 ? 'low' : 'medium')
    : (confidences.every((c) => c === 'high') ? 'high' : 'medium');

  const positives = [];
  const gaps = [];
  const unknowns = [];
  for (const cat of categories) {
    for (const check of cat.checks) {
      if (check.result === UNKNOWN) continue;
      if (check.result >= 0.9) positives.push({ category: cat.key, key: check.key, label: check.label });
      else if (check.result <= 0.35) gaps.push({ category: cat.key, categoryName: cat.name, key: check.key, label: check.label, confidence: cat.confidence });
    }
    for (const u of cat.unknowns) unknowns.push({ category: cat.key, key: u.key, label: u.label });
  }

  return {
    overall,
    label: scoreLabel(overall),
    confidence: overallConfidence,
    categories,
    positives,
    gaps,
    unknowns,
  };
}
