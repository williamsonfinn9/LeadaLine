/* ============================================================
   Contractor Enquiry Audit — LeadaLine recommendation rules
   ------------------------------------------------------------
   Deterministic selection of the most relevant AI Office Team
   components (never "everything for everyone"), priority tiers,
   gap cards and the personalised future workflow. Pure ESM.
   ============================================================ */

import { COMPONENTS } from './config.js';

/* ------------------------------------------------------------
   Gap cards — customer-facing explanations per scoring gap key.
   Wording deliberately uses hedged, evidence-based language.
   ------------------------------------------------------------ */
const GAP_CARDS = {
  phone_visible: {
    title: 'Telephone number is hard to find',
    observation: 'We could not find a clearly visible telephone number on the pages we reviewed.',
    why: 'Customers who cannot find a number quickly will often try the next contractor in their search results.',
    recommendation: 'Display the telephone number prominently on every page, especially on mobile.',
    component: 'receptionist',
  },
  enquiry_form: {
    title: 'No enquiry form identified',
    observation: 'We could not find an enquiry form on the public website.',
    why: 'Many customers — especially outside working hours — prefer to send details rather than call.',
    recommendation: 'Add a short enquiry form that captures the job, location and contact details.',
    component: 'receptionist',
  },
  form_useful_fields: {
    title: 'Enquiry form captures limited information',
    observation: 'The enquiry form appears to ask for limited information about the job.',
    why: 'Thin enquiries force a back-and-forth before anyone can quote, which slows response and loses momentum.',
    recommendation: 'Capture the service required, location and a contact number before handoff.',
    component: 'sales',
  },
  click_to_call: {
    title: 'No mobile click-to-call identified',
    observation: 'We could not find a tap-to-call link for mobile visitors.',
    why: 'Most contractor websites are viewed on phones; a tap-to-call link removes friction at the exact moment of intent.',
    recommendation: 'Make the phone number a tap-to-call link on mobile.',
    component: null,
  },
  clear_cta: {
    title: 'No clear call to action identified',
    observation: 'We could not find a clear "get a quote" or "book" call to action on the pages we reviewed.',
    why: 'Visitors who are ready to buy need an obvious next step, or they drift away.',
    recommendation: 'Add one primary call to action — request a quote or book a callback — visible on every page.',
    component: 'booking',
  },
  multiple_routes: {
    title: 'Limited contact routes',
    observation: 'The website appears to offer only one practical way to get in touch.',
    why: 'Different customers prefer different routes — phone, form, email or WhatsApp. One route means missed preferences.',
    recommendation: 'Offer at least two working contact routes and make sure each one is monitored.',
    component: 'receptionist',
  },
  out_of_hours: {
    title: 'No immediate out-of-hours response identified',
    observation: 'Based on the information provided, customers contacting the business outside normal opening hours may not receive an immediate response.',
    why: 'A customer requesting urgent work may continue contacting other contractors while waiting.',
    recommendation: 'Provide an immediate acknowledgement, capture the job details and alert the correct person.',
    component: 'receptionist',
  },
  immediate_ack: {
    title: 'Website enquiries may wait for a reply',
    observation: 'Based on the information provided, website enquiries are not always answered quickly.',
    why: 'Response speed is one of the strongest predictors of winning the job — enquiries go cold fast.',
    recommendation: 'Acknowledge every enquiry immediately, qualify it, and route urgent work to the right person.',
    component: 'receptionist',
  },
  opening_hours: {
    title: 'Opening hours not visible',
    observation: 'We could not find opening hours on the public website.',
    why: 'Customers who do not know when you are available may assume the worst and move on.',
    recommendation: 'Publish opening hours and what happens outside them.',
    component: null,
  },
  missed_call_process: {
    title: 'Missed calls may be going unrecovered',
    observation: 'Based on the information provided, there is no reliable process when nobody answers the phone.',
    why: 'Missed calls are usually live jobs. Voicemail alone recovers very few of them.',
    recommendation: 'Send an instant text-back to missed calls, capture the job details and log the lead automatically.',
    component: 'receptionist',
  },
  assistant_route: {
    title: 'No website assistant or instant-response route identified',
    observation: 'We could not find a live chat, assistant or automated response option on the website.',
    why: 'An instant response route captures customers who will not fill in a form or wait for a callback.',
    recommendation: 'Add an assistant that responds immediately, qualifies the enquiry and books the next step.',
    component: 'receptionist',
  },
  captures_service: {
    title: 'Service required is not captured up front',
    observation: 'The enquiry journey does not appear to capture which service the customer needs.',
    why: 'Without the service, every enquiry needs a manual conversation before it can be qualified or priced.',
    recommendation: 'Ask for the service required as part of every enquiry.',
    component: 'sales',
  },
  captures_contact: {
    title: 'Contact details may be incomplete',
    observation: 'The enquiry journey does not appear to reliably capture a phone number.',
    why: 'An enquiry without a phone number is much harder to convert quickly.',
    recommendation: 'Always capture a phone number and preferred contact time.',
    component: 'sales',
  },
  captures_location: {
    title: 'Location is not captured up front',
    observation: 'The enquiry journey does not appear to capture the customer’s location or postcode.',
    why: 'Location decides whether a job is viable — finding out late wastes everyone’s time.',
    recommendation: 'Capture the postcode or area with every enquiry.',
    component: 'sales',
  },
  captures_urgency: {
    title: 'Urgency is not captured',
    observation: 'The enquiry journey does not appear to ask how urgent the work is.',
    why: 'Urgent jobs need a different response speed — without knowing, hot leads queue behind cold ones.',
    recommendation: 'Ask how soon the work is needed and prioritise accordingly.',
    component: 'sales',
  },
  structured_handoff: {
    title: 'Enquiries are not structured before handoff',
    observation: 'Based on the information provided, enquiries arrive in different shapes and places before anyone acts on them.',
    why: 'Unstructured enquiries create manual admin and make consistent follow-up nearly impossible.',
    recommendation: 'Standardise what every enquiry captures and where it lands.',
    component: 'admin',
  },
  quote_follow_up: {
    title: 'Quote follow-up is not consistent',
    observation: 'Based on the information provided, quotes and warm enquiries are not followed up on a consistent schedule.',
    why: 'A large share of quoted work is won or lost purely on who follows up. Unchased quotes quietly expire.',
    recommendation: 'Follow up every quote automatically on a sensible schedule, and flag responses to the owner.',
    component: 'followup',
  },
  response_expectations: {
    title: 'Response expectations are undefined',
    observation: 'Customers are not told when to expect a reply, and internal response times appear to vary.',
    why: 'Uncertainty pushes customers to keep shopping while they wait.',
    recommendation: 'Set a clear response promise and back it with an automatic acknowledgement.',
    component: 'receptionist',
  },
  not_memory_dependent: {
    title: 'Follow-up depends on memory',
    observation: 'Based on the information provided, follow-up currently depends on individuals remembering.',
    why: 'Busy weeks are exactly when follow-up slips — and busy weeks are when the most enquiries arrive.',
    recommendation: 'Move follow-up onto an automatic schedule that does not rely on anyone remembering.',
    component: 'followup',
  },
  central_store: {
    title: 'Enquiries are not stored centrally',
    observation: 'Based on the information provided, enquiries live in several disconnected places.',
    why: 'Leads scattered across inboxes, phones and notes are easy to lose and impossible to report on.',
    recommendation: 'Land every enquiry in one central place with a status.',
    component: 'admin',
  },
  status_tracking: {
    title: 'Lead statuses are hard to track',
    observation: 'Based on the information provided, it is difficult to see the status of each enquiry.',
    why: 'Without statuses, nobody can see which leads are waiting on the business versus the customer.',
    recommendation: 'Track every enquiry through a simple pipeline: new, contacted, quoted, won or lost.',
    component: 'admin',
  },
  owner_visibility: {
    title: 'Limited visibility of enquiry performance',
    observation: 'Based on the information provided, the owner cannot easily see enquiry volumes and outcomes.',
    why: 'You cannot improve what you cannot see — and quiet leaks stay invisible.',
    recommendation: 'Get a simple regular summary of enquiries, response times and outcomes.',
    component: 'reporting',
  },
  source_capture: {
    title: 'Lead source is not captured',
    observation: 'Based on the information provided, it is unclear where each enquiry originally came from.',
    why: 'Knowing which sources produce paying work tells you where marketing money is earned or wasted.',
    recommendation: 'Record the source of every enquiry automatically.',
    component: 'reporting',
  },
};

export function gapCard(gapKey) {
  return GAP_CARDS[gapKey] || null;
}

/* ------------------------------------------------------------
   Component recommendation
   ------------------------------------------------------------ */
const CONCERN_COMPONENT = {
  missed_calls: 'receptionist',
  slow_website: 'receptionist',
  qualification: 'sales',
  quote_followup: 'followup',
  booking: 'booking',
  admin: 'admin',
  visibility: 'reporting',
  all: 'receptionist',
};

/**
 * Choose priority-ranked components from scoring output + answers.
 * Returns [{ priority, component: {key,name,description}, reason }]
 * — always 3 tiers, never the full menu.
 */
export function recommendComponents(scoring, answers = {}) {
  const votes = new Map(); // componentKey -> weight

  const add = (key, w, reason) => {
    if (!key || !COMPONENTS[key]) return;
    const cur = votes.get(key) || { weight: 0, reasons: [] };
    cur.weight += w;
    if (reason) cur.reasons.push(reason);
    votes.set(key, cur);
  };

  // Gaps vote for the component that addresses them.
  for (const gap of scoring.gaps) {
    const card = GAP_CARDS[gap.key];
    if (card && card.component) add(card.component, 2, card.title);
  }

  // Stated biggest concern gets a strong vote.
  const concernComponent = CONCERN_COMPONENT[answers.biggest_concern];
  if (concernComponent) add(concernComponent, 4, 'This matches the concern you told us about.');

  // Category-level nudges.
  for (const cat of scoring.categories) {
    if (cat.score > 12) continue;
    if (cat.key === 'response_availability' || cat.key === 'enquiry_capture') add('receptionist', 2);
    if (cat.key === 'lead_qualification') add('sales', 2);
    if (cat.key === 'follow_up') add('followup', 2);
    if (cat.key === 'visibility') { add('admin', 1); add('reporting', 1); }
  }

  // Admin assistant rides along whenever anything else is recommended —
  // it is what keeps the CRM updated — but never outranks the top fix.
  if (votes.size > 0) add('admin', 1);

  const ranked = [...votes.entries()]
    .sort((a, b) => b[1].weight - a[1].weight)
    .map(([key, v]) => ({ component: COMPONENTS[key], weight: v.weight, reasons: v.reasons }));

  // Sensible default when nothing at all is weak (strong businesses):
  if (ranked.length === 0) {
    ranked.push(
      { component: COMPONENTS.reporting, weight: 1, reasons: ['Even strong processes benefit from automatic reporting.'] },
      { component: COMPONENTS.admin, weight: 1, reasons: ['Reduce manual data entry.'] },
    );
  }

  return ranked.slice(0, 3).map((r, i) => ({
    priority: i + 1,
    component: r.component,
    reason: r.reasons[0] || null,
  }));
}

/* ------------------------------------------------------------
   Personalised future workflow
   ------------------------------------------------------------ */
const WORKFLOW_LIBRARY = {
  missed_calls: [
    'Customer calls while you are on the tools',
    'Missed call triggers an instant text-back within seconds',
    'AI captures the job, location and urgency by message',
    'You receive a clean summary by SMS or WhatsApp',
    'Lead lands in your pipeline with a status',
    'Warm lead is followed up automatically if they go quiet',
  ],
  slow_website: [
    'Customer submits a website enquiry',
    'AI acknowledges it immediately — day or night',
    'Service, location and urgency are captured',
    'Qualified lead is summarised to the owner',
    'A callback or appointment is offered straight away',
    'Performance appears in your reporting',
  ],
  qualification: [
    'Customer calls or submits an enquiry',
    'AI asks the right qualification questions',
    'Service, location, urgency and intent are captured',
    'Good-fit jobs are prioritised for a fast response',
    'Owner receives a clean, structured summary',
    'Lead appears in the CRM ready to quote',
  ],
  quote_followup: [
    'You send a quote as normal',
    'AI schedules a polite follow-up sequence',
    'Customer replies are flagged to you immediately',
    'Quiet quotes are nudged again at sensible intervals',
    'Outcomes are recorded against each quote',
    'You see win rates in your reporting',
  ],
  booking: [
    'Customer asks for a visit, survey or quote',
    'AI offers available slots and books it in',
    'Confirmations and reminders go out automatically',
    'Cancellations trigger an instant re-offer',
    'Your calendar and CRM stay in sync',
    'No-shows drop, admin time drops with them',
  ],
  admin: [
    'Enquiries arrive by phone, form or WhatsApp',
    'AI structures every enquiry the same way',
    'CRM is updated automatically — no typing',
    'Owner receives a daily summary of activity',
    'Nothing lives only in someone’s inbox or head',
    'Reporting shows exactly what came in and what happened next',
  ],
  visibility: [
    'Every enquiry lands in one pipeline',
    'Source, status and value are recorded automatically',
    'AI highlights leads that need attention today',
    'You get a weekly performance summary',
    'You can see response times and win rates by source',
    'Decisions are based on numbers, not gut feel',
  ],
};

/**
 * Build the personalised future workflow for the report.
 * Driven by the biggest concern, falling back to the largest gap area.
 */
export function buildWorkflow(scoring, answers = {}) {
  let key = answers.biggest_concern;
  if (!key || key === 'all' || !WORKFLOW_LIBRARY[key]) {
    // Choose the weakest category and map to a workflow theme.
    const weakest = [...scoring.categories].sort((a, b) => a.score - b.score)[0];
    key = {
      enquiry_capture: 'slow_website',
      response_availability: 'missed_calls',
      lead_qualification: 'qualification',
      follow_up: 'quote_followup',
      visibility: 'visibility',
    }[weakest?.key] || 'slow_website';
  }
  return { theme: key, steps: WORKFLOW_LIBRARY[key] };
}

/** Build customer-facing gap cards from scoring gaps (max 6, worst first). */
export function buildGapCards(scoring) {
  const seen = new Set();
  const cards = [];
  for (const gap of scoring.gaps) {
    const card = GAP_CARDS[gap.key];
    if (!card || seen.has(gap.key)) continue;
    seen.add(gap.key);
    cards.push({
      key: gap.key,
      category: gap.categoryName,
      confidence: gap.confidence,
      title: card.title,
      observation: card.observation,
      why: card.why,
      recommendation: card.recommendation,
      leadaline_solution: card.component ? COMPONENTS[card.component].name : null,
    });
    if (cards.length >= 6) break;
  }
  return cards;
}

/* Items worth confirming — friendly labels for unknown checks. */
const UNKNOWN_LABELS = {
  missed_call_process: 'Missed-call callback process',
  immediate_ack: 'Average first-response time',
  quote_follow_up: 'Quote follow-up frequency',
  not_memory_dependent: 'Who owns each lead once it arrives',
  structured_handoff: 'How enquiries are structured before handoff',
  central_store: 'Where enquiries are recorded',
  status_tracking: 'How lead statuses are tracked',
  owner_visibility: 'Conversion and performance tracking',
  source_capture: 'Lead source tracking',
  out_of_hours: 'What happens to out-of-hours enquiries',
};

export function buildUnknownItems(scoring) {
  const seen = new Set();
  const items = [];
  for (const u of scoring.unknowns) {
    const label = UNKNOWN_LABELS[u.key] || u.label;
    if (seen.has(label)) continue;
    seen.add(label);
    items.push(label);
    if (items.length >= 8) break;
  }
  return items;
}
