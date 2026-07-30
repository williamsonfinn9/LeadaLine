/* ============================================================
   Contractor Enquiry Audit — opportunity range calculator
   ------------------------------------------------------------
   Deterministic and transparent. Never presents guaranteed
   revenue: everything is a range with explicit assumptions.
   Pure ESM, shared server + browser (report page recalculates
   live when the prospect adjusts inputs).
   ============================================================ */

import { OPPORTUNITY_ASSUMPTIONS, questionByKey } from './config.js';

function rangeForAnswer(questionKey, value) {
  const q = questionByKey(questionKey);
  if (!q) return null;
  const opt = q.options.find((o) => o.value === value);
  return opt && opt.range ? opt.range : null;
}

/** Map a gap count from scoring into an exposure band. */
export function exposureBand(gapCount) {
  if (gapCount >= 6) return 'high';
  if (gapCount >= 3) return 'medium';
  return 'low';
}

/**
 * Calculate the opportunity estimate.
 *
 * @param {object} input
 *   monthlyEnquiries  — [low, high] or null (uses defaults, flagged)
 *   jobValue          — [low, high] or null (uses defaults, flagged)
 *   gapCount          — number of gaps identified by scoring
 * @returns transparent estimate object
 */
export function calculateOpportunity({ monthlyEnquiries, jobValue, gapCount = 0 }) {
  const A = OPPORTUNITY_ASSUMPTIONS;
  const assumptions = [];

  let enquiries = monthlyEnquiries;
  if (!enquiries) {
    enquiries = A.defaultMonthlyEnquiries;
    assumptions.push('Monthly enquiry volume was not provided, so a typical range for a UK service business has been assumed.');
  }
  let value = jobValue;
  if (!value) {
    value = A.defaultJobValue;
    assumptions.push('Average job value was not provided, so a typical range has been assumed.');
  }

  const band = exposureBand(gapCount);
  const exposure = A.exposureByWeakness[band];
  const recovery = A.recoveryRate;

  assumptions.push(
    `Based on the gaps identified, an estimated ${pct(exposure[0])}–${pct(exposure[1])} of enquiries may be exposed to slow response or inconsistent follow-up.`,
    `A conservative ${pct(recovery[0])}–${pct(recovery[1])} of those exposed enquiries is assumed to be recoverable with better response and follow-up.`,
  );

  const jobsLowRaw = enquiries[0] * exposure[0] * recovery[0];
  const jobsHighRaw = enquiries[1] * exposure[1] * recovery[1];

  // Round sensibly: at least "up to 1" when high >= 0.5.
  const jobsLow = Math.floor(jobsLowRaw * 10) / 10;
  const jobsHigh = Math.max(jobsLow, Math.round(jobsHighRaw * 10) / 10);

  const valueLow = Math.round(jobsLowRaw * value[0]);
  const valueHigh = Math.round(jobsHighRaw * value[1]);

  return {
    inputs: {
      monthly_enquiries_low: enquiries[0],
      monthly_enquiries_high: enquiries[1],
      average_job_value_low: value[0],
      average_job_value_high: value[1],
      gap_count: gapCount,
    },
    exposure_rate_low: exposure[0],
    exposure_rate_high: exposure[1],
    recovery_rate_low: recovery[0],
    recovery_rate_high: recovery[1],
    jobs_recovered_low: jobsLow,
    jobs_recovered_high: jobsHigh,
    value_low: valueLow,
    value_high: valueHigh,
    exposure_band: band,
    assumptions,
    disclaimer: A.disclaimer,
  };
}

/** Build calculator inputs from validated questionnaire answers. */
export function opportunityInputsFromAnswers(answers, gapCount) {
  return {
    monthlyEnquiries: rangeForAnswer('monthly_enquiries', answers?.monthly_enquiries),
    jobValue: rangeForAnswer('average_job_value', answers?.average_job_value),
    gapCount,
  };
}

export function formatGBP(n) {
  return '£' + Math.round(n).toLocaleString('en-GB');
}

function pct(f) {
  return Math.round(f * 100) + '%';
}
