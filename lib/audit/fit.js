/* ============================================================
   Contractor Enquiry Audit — internal LeadaLine fit scoring
   ------------------------------------------------------------
   INTERNAL ONLY. Never rendered on the customer-facing report
   or returned by the public report API action.

   Produces: fit score (0–100), fit label, main pain point,
   recommended sales angle and demo-prep notes for Cam and Finn.
   Pure ESM, deterministic, unit-tested.
   ============================================================ */

import { tradeLabel, answerLabel } from './config.js';

const HIGH_VALUE_TRADES = new Set([
  'electrical', 'plumbing', 'roofing', 'building', 'hvac',
  'maintenance', 'facilities', 'security', 'fire_safety',
]);

const CONCERN_LABELS = {
  missed_calls: 'Missed calls',
  slow_website: 'Slow website responses',
  qualification: 'Inconsistent lead qualification',
  quote_followup: 'Quote follow-up',
  booking: 'Booking appointments',
  admin: 'Admin and CRM updates',
  visibility: 'Lack of visibility',
  all: 'Multiple gaps across the enquiry journey',
};

const SALES_ANGLES = {
  missed_calls: {
    angle: 'Lead with missed-call recovery and after-hours capture. Do not lead with website changes.',
    demo: 'Live missed-call text-back demo: call the demo number, hang up, show the instant SMS and owner summary.',
    emphasise: ['AI Receptionist', 'Missed-call recovery', 'Owner SMS summaries'],
    avoid: ['Website redesign talk', 'Reporting dashboards on the first call'],
    discovery: 'Roughly how many calls a week ring out while the team is on the tools?',
    objection: '"We always call people back" — ask how long that takes on a busy day, and what happens after 6pm.',
  },
  slow_website: {
    angle: 'Lead with instant website enquiry acknowledgement and qualification.',
    demo: 'Submit a live enquiry on the demo site and show the immediate AI response and qualified summary.',
    emphasise: ['AI Receptionist', 'AI Sales Assistant', 'Instant acknowledgement'],
    avoid: ['CRM migration talk'],
    discovery: 'When a website enquiry lands on a Friday afternoon, when does the customer actually hear back?',
    objection: '"Customers don’t mind waiting" — response-speed expectations have changed; the first responder usually wins the job.',
  },
  qualification: {
    angle: 'Lead with structured qualification: every enquiry arrives with service, location and urgency attached.',
    demo: 'Show an AI qualification conversation and the clean structured lead it produces.',
    emphasise: ['AI Sales Assistant', 'Structured lead summaries'],
    avoid: ['Overloading with every feature'],
    discovery: 'How many enquiries turn out to be outside your area or not your kind of work — and how much time do they take to find out?',
    objection: '"We like to speak to everyone" — qualification means the right people get the call first, not that nobody gets a call.',
  },
  quote_followup: {
    angle: 'Lead with automated quote follow-up: quoted work is won or lost on the chase.',
    demo: 'Show a quote follow-up sequence and the owner alert when the customer replies.',
    emphasise: ['AI Follow-Up Assistant', 'Quote chase sequences'],
    avoid: ['Missed-call talk if calls are not the pain'],
    discovery: 'Of the quotes sent last month, how many got a second touch after day three?',
    objection: '"Chasing feels pushy" — a polite, well-timed follow-up reads as professional, and it can be toned to match the business.',
  },
  booking: {
    angle: 'Lead with booking automation: surveys and quote visits booked without phone tennis.',
    demo: 'Book an appointment end-to-end through the AI Booking Assistant, including the reminder flow.',
    emphasise: ['AI Booking Assistant', 'Reminders and confirmations'],
    avoid: ['Reporting depth on the first call'],
    discovery: 'How many back-and-forth messages does it take to get an average survey booked in?',
    objection: '"Our diary is complicated" — the assistant works from availability rules the business defines.',
  },
  admin: {
    angle: 'Lead with admin relief: enquiries structured and CRM updated without anyone typing.',
    demo: 'Show an enquiry flowing to a structured CRM record and the owner’s daily summary.',
    emphasise: ['AI Admin Assistant', 'Automatic CRM updates', 'Owner summaries'],
    avoid: ['Front-end capture talk if capture is already strong'],
    discovery: 'How many hours a week go into retyping enquiry details into the system?',
    objection: '"We’ve tried CRMs before" — this removes the data entry that makes CRMs fail, rather than adding another one.',
  },
  visibility: {
    angle: 'Lead with visibility: one pipeline, clear statuses, and a weekly performance summary.',
    demo: 'Show the pipeline view and a weekly reporting summary for a similar trade.',
    emphasise: ['AI Reporting Assistant', 'AI Admin Assistant', 'Pipeline visibility'],
    avoid: ['Capture-focused features'],
    discovery: 'If I asked how many enquiries came in last month and how many turned into work, how long would that take to answer?',
    objection: '"We’re too small for reporting" — it is one summary a week, not a BI project.',
  },
};

function volumeScore(answers) {
  switch (answers.monthly_enquiries) {
    case '0-10': return 4;
    case '11-25': return 12;
    case '26-50': return 16;
    case '51-100': return 18;
    case '100+': return 18;
    default: return 8; // not sure — neutral-ish
  }
}

function valueScore(answers) {
  switch (answers.average_job_value) {
    case 'under-250': return 4;
    case '250-500': return 8;
    case '500-1000': return 12;
    case '1000-2500': return 14;
    case '2500+': return 14;
    default: return 7;
  }
}

/**
 * Internal fit score.
 * @param {object} params — { answers, scoring, trade, employeeRange }
 * @returns {object} internal qualification pack
 */
export function scoreFit({ answers = {}, scoring, trade, employeeRange }) {
  let score = 0;
  const reasons = [];

  // Trade fit (0–14)
  if (HIGH_VALUE_TRADES.has(trade)) { score += 14; reasons.push('Core target trade'); }
  else if (trade && trade !== 'other') { score += 9; reasons.push('Adjacent service trade'); }
  else { score += 6; }

  // Demand (0–18): businesses with real enquiry volume benefit most.
  const vol = volumeScore(answers);
  score += vol;
  if (vol <= 4) reasons.push('Very low enquiry volume — limited immediate value');
  if (vol >= 16) reasons.push('Strong enquiry volume');

  // Job value (0–14)
  score += valueScore(answers);

  // Weakness = opportunity (0–36). A weak process with real demand is the
  // ideal LeadaLine customer, so gaps ADD fit points.
  const weaknessPoints = { missed_call_handling: 8, website_response_speed: 8, quote_follow_up: 10, lead_tracking: 6, out_of_hours: 4 };
  const weakValues = {
    missed_call_handling: ['voicemail', 'customer_retries'],
    website_response_speed: ['within_24h', 'over_24h', 'varies'],
    quote_follow_up: ['manual', 'no_process'],
    lead_tracking: ['inbox', 'whatsapp', 'paper', 'multiple', 'nowhere'],
    out_of_hours: ['voicemail_email', 'no'],
  };
  for (const [q, pts] of Object.entries(weaknessPoints)) {
    if (weakValues[q].includes(answers[q])) {
      score += pts;
      reasons.push(`Weak ${q.replace(/_/g, ' ')}`);
    }
  }

  // Strong existing systems still have admin/reporting value (small floor).
  if (scoring && scoring.overall >= 75) {
    score += 4;
    reasons.push('Strong process — angle is admin/reporting automation, not rescue');
  }

  // Team size: owner-led with a small team is the sweet spot.
  if (employeeRange && ['2–5', '6–10', '11–25'].includes(employeeRange)) score += 4;

  score = Math.max(0, Math.min(100, score));

  const label =
    score >= 65 ? 'High fit' :
    score >= 45 ? 'Medium fit' :
    score >= 25 ? 'Low fit' : 'Not enough information';

  // Main pain: stated concern wins; otherwise weakest category.
  let painKey = answers.biggest_concern && answers.biggest_concern !== 'all'
    ? answers.biggest_concern
    : null;
  if (!painKey && scoring) {
    const weakest = [...scoring.categories].sort((a, b) => a.score - b.score)[0];
    painKey = {
      enquiry_capture: 'slow_website',
      response_availability: 'missed_calls',
      lead_qualification: 'qualification',
      follow_up: 'quote_followup',
      visibility: 'visibility',
    }[weakest?.key];
  }
  painKey = painKey && SALES_ANGLES[painKey] ? painKey : 'slow_website';
  const angle = SALES_ANGLES[painKey];

  return {
    score,
    label,
    main_pain_point: CONCERN_LABELS[answers.biggest_concern] || CONCERN_LABELS[painKey] || 'Unclear',
    recommended_sales_angle: angle.angle,
    best_demo_route: angle.demo,
    emphasise: angle.emphasise,
    avoid: angle.avoid,
    key_discovery_question: angle.discovery,
    expected_objection: angle.objection,
    estimated_package_fit: score >= 65 ? 'Core AI Office Team' : score >= 45 ? 'Starter (Receptionist-led)' : 'Assess on call',
    reasons,
    context: {
      trade: tradeLabel(trade),
      monthly_enquiries: answerLabel('monthly_enquiries', answers.monthly_enquiries),
      average_job_value: answerLabel('average_job_value', answers.average_job_value),
    },
  };
}
