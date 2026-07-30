/* ============================================================
   LeadaLine Contractor Enquiry Audit — central configuration
   ------------------------------------------------------------
   Pure ESM, no Node/browser dependencies. This module is the
   single source of truth for product naming, routes, trades,
   questionnaire definitions, LeadaLine components, scoring
   labels and opportunity assumptions. It is imported by the
   serverless API, by the browser pages (<script type="module">)
   and by the test suite.

   Secrets NEVER belong in this file. Server-side secrets come
   from environment variables (see .env.example).
   ============================================================ */

export const AUDIT_CONFIG = {
  productName: 'Contractor Enquiry Audit',
  scoringVersion: '1.0.0',
  processingVersion: '1.0.0',

  routes: {
    landing: '/contractor-audit',
    start: '/contractor-audit/start',
    report: '/contractor-audit/report', // + /:token (rewritten to ?t=)
    api: '/api/contractor-audit',
  },

  // Booking page. Can be overridden with PUBLIC_BOOKING_URL at
  // render time (the API returns the effective value to pages).
  bookingUrl: '/book-a-demo.html',

  contact: {
    email: 'hello@leadaline.com',
    adminEmail: 'admin@leadaline.com',
  },

  // Feature flags — safe defaults for MVP.
  features: {
    showPricing: false,       // never hardcode pricing in the audit
    pdfExport: false,         // web report first; PDF is post-MVP
    emailDelivery: true,      // no-ops safely when no provider key
    webhooks: true,           // no-ops safely when no webhook URL
  },

  // How long a report link stays valid (days). 0 = never expires.
  reportExpiryDays: 90,
  retentionDays: 730,
};

/* ------------------------------------------------------------
   Trades
   ------------------------------------------------------------ */
export const TRADES = [
  { key: 'electrical',     label: 'Electrical contractor' },
  { key: 'plumbing',       label: 'Plumbing and heating' },
  { key: 'roofing',        label: 'Roofing' },
  { key: 'building',       label: 'Building and construction' },
  { key: 'maintenance',    label: 'Property maintenance' },
  { key: 'waste',          label: 'Waste removal' },
  { key: 'landscaping',    label: 'Landscaping' },
  { key: 'hvac',           label: 'HVAC' },
  { key: 'facilities',     label: 'Facilities management' },
  { key: 'security',       label: 'Security and alarms' },
  { key: 'fire_safety',    label: 'Fire and safety' },
  { key: 'cleaning',       label: 'Cleaning' },
  { key: 'other',          label: 'Other service business' },
];

/* ------------------------------------------------------------
   Business-details optional selects
   ------------------------------------------------------------ */
export const EMPLOYEE_RANGES = ['Just me', '2–5', '6–10', '11–25', '26–50', '50+'];

/* ------------------------------------------------------------
   Questionnaire — single source of truth.
   answer `signal` values are consumed by scoring.js / fit.js.
   ------------------------------------------------------------ */
export const QUESTIONS = [
  {
    key: 'monthly_enquiries',
    title: 'Approximately how many new enquiries do you receive in a typical month?',
    options: [
      { value: '0-10',   label: '0–10',    range: [0, 10] },
      { value: '11-25',  label: '11–25',   range: [11, 25] },
      { value: '26-50',  label: '26–50',   range: [26, 50] },
      { value: '51-100', label: '51–100',  range: [51, 100] },
      { value: '100+',   label: '100+',    range: [100, 160] },
      { value: 'not_sure', label: 'Not sure', range: null },
    ],
  },
  {
    key: 'average_job_value',
    title: 'What is an average new customer or job worth?',
    options: [
      { value: 'under-250',  label: 'Under £250',      range: [100, 250] },
      { value: '250-500',    label: '£250–£500',       range: [250, 500] },
      { value: '500-1000',   label: '£500–£1,000',     range: [500, 1000] },
      { value: '1000-2500',  label: '£1,000–£2,500',   range: [1000, 2500] },
      { value: '2500+',      label: '£2,500+',         range: [2500, 5000] },
      { value: 'not_sure',   label: 'Not sure',        range: null },
    ],
  },
  {
    key: 'missed_call_handling',
    title: 'What normally happens when nobody answers the phone?',
    options: [
      { value: 'voicemail',        label: 'Voicemail',                          signal: 'weak' },
      { value: 'customer_retries', label: 'Customer calls back later',          signal: 'weak' },
      { value: 'manual_callback',  label: 'We manually call them back',         signal: 'partial' },
      { value: 'auto_message',     label: 'They receive an automatic message',  signal: 'good' },
      { value: 'answered_externally', label: 'Calls are answered externally',   signal: 'good' },
      { value: 'not_sure',         label: 'Not sure',                           signal: 'unknown' },
    ],
  },
  {
    key: 'website_response_speed',
    title: 'How quickly are website enquiries normally answered?',
    options: [
      { value: 'immediately',   label: 'Immediately',            signal: 'good' },
      { value: 'within_hour',   label: 'Within one hour',        signal: 'good' },
      { value: 'same_day',      label: 'Same working day',       signal: 'partial' },
      { value: 'within_24h',    label: 'Within 24 hours',        signal: 'weak' },
      { value: 'over_24h',      label: 'Longer than 24 hours',   signal: 'weak' },
      { value: 'varies',        label: 'It varies',              signal: 'weak' },
      { value: 'not_sure',      label: 'Not sure',               signal: 'unknown' },
    ],
  },
  {
    key: 'quote_follow_up',
    title: 'How do you currently follow up quotes or warm enquiries?',
    options: [
      { value: 'automated',    label: 'Structured automated process',       signal: 'good' },
      { value: 'reminders',    label: 'Team members use reminders',         signal: 'partial' },
      { value: 'manual',       label: 'Manually when there is time',        signal: 'weak' },
      { value: 'no_process',   label: 'We do not have a consistent process', signal: 'weak' },
      { value: 'not_sure',     label: 'Not sure',                           signal: 'unknown' },
    ],
  },
  {
    key: 'lead_tracking',
    title: 'Where are new enquiries currently tracked?',
    options: [
      { value: 'crm',          label: 'CRM',                          signal: 'good' },
      { value: 'job_platform', label: 'Job-management platform',      signal: 'good' },
      { value: 'spreadsheet',  label: 'Spreadsheet',                  signal: 'partial' },
      { value: 'inbox',        label: 'Email inbox',                  signal: 'weak' },
      { value: 'whatsapp',     label: 'WhatsApp / messages',          signal: 'weak' },
      { value: 'paper',        label: 'Paper or personal notes',      signal: 'weak' },
      { value: 'multiple',     label: 'Multiple disconnected places', signal: 'weak' },
      { value: 'nowhere',      label: 'Nowhere consistently',         signal: 'weak' },
    ],
  },
  {
    key: 'out_of_hours',
    title: 'Can customers contact the business outside normal opening hours?',
    options: [
      { value: 'yes_response',   label: 'Yes, and they receive a response',            signal: 'good' },
      { value: 'yes_waits',      label: 'Yes, but the response waits until opening',   signal: 'partial' },
      { value: 'voicemail_email', label: 'Only through voicemail or email',            signal: 'weak' },
      { value: 'no',             label: 'No',                                          signal: 'weak' },
      { value: 'not_sure',       label: 'Not sure',                                    signal: 'unknown' },
    ],
  },
  {
    key: 'biggest_concern',
    title: 'What is the biggest concern?',
    options: [
      { value: 'missed_calls',   label: 'Missed calls' },
      { value: 'slow_website',   label: 'Slow website responses' },
      { value: 'qualification',  label: 'Inconsistent lead qualification' },
      { value: 'quote_followup', label: 'Quote follow-up' },
      { value: 'booking',        label: 'Booking appointments' },
      { value: 'admin',          label: 'Admin and CRM updates' },
      { value: 'visibility',     label: 'Lack of visibility' },
      { value: 'all',            label: 'All of the above' },
    ],
  },
];

/* ------------------------------------------------------------
   LeadaLine AI Office Team components
   ------------------------------------------------------------ */
export const COMPONENTS = {
  receptionist: {
    key: 'receptionist',
    name: 'AI Receptionist',
    description: 'Answers initial enquiries from calls or the website, captures customer information and supports out-of-hours response.',
  },
  sales: {
    key: 'sales',
    name: 'AI Sales Assistant',
    description: 'Asks qualification questions, identifies service, location, urgency and intent, and recommends the next action.',
  },
  booking: {
    key: 'booking',
    name: 'AI Booking Assistant',
    description: 'Books calls, surveys, appointments or quote visits, and sends confirmations and reminders.',
  },
  followup: {
    key: 'followup',
    name: 'AI Follow-Up Assistant',
    description: 'Follows up warm enquiries, chases quotes appropriately and re-engages customers who have not responded.',
  },
  admin: {
    key: 'admin',
    name: 'AI Admin Assistant',
    description: 'Updates the CRM, structures lead information, sends owner summaries and reduces manual data entry.',
  },
  reporting: {
    key: 'reporting',
    name: 'AI Reporting Assistant',
    description: 'Summarises lead activity, reports enquiry volumes and performance, and highlights follow-up requirements.',
  },
};

/* ------------------------------------------------------------
   Score labels (customer-facing, deliberately non-alarmist)
   ------------------------------------------------------------ */
export const SCORE_LABELS = [
  { min: 90, label: 'Highly organised enquiry process' },
  { min: 75, label: 'Strong process with some improvement opportunities' },
  { min: 60, label: 'Good foundations, but important gaps remain' },
  { min: 40, label: 'Several opportunities to improve' },
  { min: 0,  label: 'Significant gaps' },
];

export function scoreLabel(score) {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  return SCORE_LABELS.find((l) => s >= l.min).label;
}

/* ------------------------------------------------------------
   Opportunity calculator assumptions (documented, conservative)
   ------------------------------------------------------------ */
export const OPPORTUNITY_ASSUMPTIONS = {
  // Defaults used when the prospect answered "Not sure" — always
  // labelled as assumptions in the UI.
  defaultMonthlyEnquiries: [10, 30],
  defaultJobValue: [300, 800],
  // Share of enquiries exposed to slow response / inconsistent
  // follow-up, scaled by how many weaknesses were identified.
  exposureByWeakness: {
    low:    [0.05, 0.15],
    medium: [0.10, 0.25],
    high:   [0.20, 0.40],
  },
  // Conservative share of exposed enquiries that better response
  // and follow-up could realistically recover.
  recoveryRate: [0.10, 0.30],
  disclaimer:
    'This is an indicative commercial estimate, not a revenue guarantee. Actual results depend on enquiry quality, capacity, pricing, sales process and customer demand.',
};

export const CATEGORY_META = [
  { key: 'enquiry_capture',       name: 'Enquiry Capture' },
  { key: 'response_availability', name: 'Response Availability' },
  { key: 'lead_qualification',    name: 'Lead Qualification' },
  { key: 'follow_up',             name: 'Follow-Up Process' },
  { key: 'visibility',            name: 'Visibility and Organisation' },
];

export function questionByKey(key) {
  return QUESTIONS.find((q) => q.key === key) || null;
}

export function answerLabel(questionKey, value) {
  const q = questionByKey(questionKey);
  if (!q) return null;
  const opt = q.options.find((o) => o.value === value);
  return opt ? opt.label : null;
}

export function tradeLabel(key) {
  const t = TRADES.find((t) => t.key === key);
  return t ? t.label : key;
}
