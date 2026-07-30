/* ============================================================
   Contractor Enquiry Audit — AI narrative generation
   ------------------------------------------------------------
   SERVER ONLY. AI is used ONLY for narrative personalisation
   (executive summary, positives phrasing, demo-prep note).
   Scores, calculations, recommendations and access control are
   deterministic code — never the model.

   Uses the Anthropic Messages API over native fetch (matching
   this project's zero-dependency serverless convention) with a
   structured-output JSON schema, strict validation of the
   result, and a deterministic fallback template so the audit
   always works without AI.
   ============================================================ */

import { tradeLabel, answerLabel, COMPONENTS } from './config.js';

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const MODEL = () => process.env.AI_MODEL || 'claude-opus-5';

const OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['executive_summary', 'working_well', 'demo_prep_note'],
  properties: {
    executive_summary: {
      type: 'string',
      description: '2–4 sentences, plain UK business English, specific to this business. No invented facts.',
    },
    working_well: {
      type: 'array',
      items: { type: 'string' },
      description: '2–4 short bullet sentences describing genuine positives from the supplied findings only.',
    },
    demo_prep_note: {
      type: 'string',
      description: 'INTERNAL: 2–3 sentences for the LeadaLine team preparing the demo call.',
    },
  },
};

const SYSTEM_PROMPT = `You write short, factual narrative sections for a LeadaLine "Contractor Enquiry Audit" report for a UK service business.

LeadaLine installs an AI Office Team that captures, qualifies and responds to customer enquiries automatically (AI receptionist, sales assistant, booking assistant, follow-up assistant, admin assistant, reporting assistant).

ABSOLUTE RULES:
- Use ONLY the facts provided in the input. Do not invent observations, statistics, review scores or internal business facts.
- Facts from the website analysis are "observations"; facts the business told us are "based on the information provided"; everything else is a recommendation. Keep these separate and phrased accordingly.
- Never claim guaranteed lost revenue, guaranteed results, or state opinions as facts.
- Never shame or alarm the business. Be constructive and specific.
- Plain UK business English. No jargon ("digital transformation", "AI ecosystem"), no hype.
- Do not mention any AI provider or how this report was produced.
- Only reference LeadaLine components that appear in the recommendation input.
- Keep it tight: the executive summary is 2–4 sentences.`;

function buildInput({ lead, answers, scoring, recommendations, opportunity, websiteOk }) {
  return {
    business: {
      name: lead.business_name,
      trade: tradeLabel(lead.trade) + (lead.other_trade ? ` (${lead.other_trade})` : ''),
      service_area: lead.service_area,
      website: lead.website_url,
      website_analysed: websiteOk,
    },
    questionnaire: Object.fromEntries(
      Object.entries(answers).map(([k, v]) => [k, answerLabel(k, v) || v]),
    ),
    audit: {
      overall_score: scoring.overall,
      label: scoring.label,
      confidence: scoring.confidence,
      categories: scoring.categories.map((c) => ({ name: c.name, score: c.score, of: 20, confidence: c.confidence })),
      positives: scoring.positives.map((p) => p.label),
      gaps: scoring.gaps.map((g) => g.label),
    },
    recommended_components: recommendations.map((r) => ({ priority: r.priority, name: r.component.name })),
    opportunity_summary: `Approximately ${opportunity.jobs_recovered_low}–${opportunity.jobs_recovered_high} additional jobs in a typical month may be recoverable (indicative estimate, not a guarantee).`,
  };
}

/**
 * Deterministic fallback narrative — always available, no AI needed.
 */
export function fallbackNarrative({ lead, scoring, recommendations, websiteOk }) {
  const positives = scoring.positives.slice(0, 3).map((p) => p.label.toLowerCase());
  const mainGap = scoring.gaps[0];
  const rec1 = recommendations[0]?.component?.name;

  const parts = [];
  parts.push(`${lead.business_name} scored ${scoring.overall}/100 — ${scoring.label.toLowerCase()}.`);
  if (positives.length) {
    parts.push(`Good foundations are in place, including ${positives.join(', ')}.`);
  }
  if (mainGap) {
    parts.push(`The largest opportunity appears to be around ${mainGap.label.toLowerCase()}.`);
  }
  if (!websiteOk) {
    parts.push('We could not fully analyse the public website, so this audit is based mainly on the information you supplied.');
  }
  if (rec1) {
    parts.push(`Based on these findings we would start with the ${rec1}.`);
  }

  return {
    executive_summary: parts.join(' '),
    working_well: scoring.positives.slice(0, 4).map((p) => p.label),
    demo_prep_note: mainGap
      ? `Focus the demo on ${mainGap.label.toLowerCase()}. Recommended starting component: ${rec1 || 'AI Receptionist'}.`
      : `No major gaps found — position around admin and reporting automation. Recommended component: ${rec1 || 'AI Reporting Assistant'}.`,
    generated_by: 'fallback',
  };
}

function validateNarrative(n) {
  if (!n || typeof n !== 'object') return false;
  if (typeof n.executive_summary !== 'string' || n.executive_summary.length < 40 || n.executive_summary.length > 1500) return false;
  if (!Array.isArray(n.working_well) || n.working_well.some((s) => typeof s !== 'string' || s.length > 300)) return false;
  if (typeof n.demo_prep_note !== 'string' || n.demo_prep_note.length > 1000) return false;
  // Basic safety: reject anything that smells like markup injection.
  const all = [n.executive_summary, ...n.working_well, n.demo_prep_note].join(' ');
  if (/<\s*script|<\s*iframe|javascript:/i.test(all)) return false;
  return true;
}

/**
 * Generate the narrative. Never throws: falls back to the template.
 */
export async function generateNarrative(context) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fallbackNarrative(context);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25_000);
    let res;
    try {
      res = await fetch(ANTHROPIC_API, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: MODEL(),
          max_tokens: 2000,
          output_config: {
            effort: 'low',
            format: { type: 'json_schema', schema: OUTPUT_SCHEMA },
          },
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content:
                'Write the narrative sections for this audit. Input data (the ONLY facts you may use):\n\n' +
                JSON.stringify(buildInput(context), null, 2),
            },
          ],
        }),
      });
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) throw new Error(`AI HTTP ${res.status}`);
    const data = await res.json();
    if (data.stop_reason === 'refusal') throw new Error('AI declined');
    const text = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');
    const parsed = JSON.parse(text);
    if (!validateNarrative(parsed)) throw new Error('AI output failed validation');
    return { ...parsed, generated_by: 'ai' };
  } catch (err) {
    console.error('audit ai fallback:', err.message);
    return fallbackNarrative(context);
  }
}
