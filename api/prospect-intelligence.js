/*
  Prospect Intelligence — LeadaLine internal sales-prep tool
  ----------------------------------------------------------
  POST /api/prospect-intelligence
  Body: { businessName, websiteUrl, phone? }

  Uses the Anthropic Messages API (claude-opus-4-8) with the web_search and
  web_fetch server tools to gather PUBLICLY AVAILABLE information about a UK
  service business, then returns a structured commercial sales briefing.

  Requires env var: ANTHROPIC_API_KEY

  No npm dependencies — calls the API over native fetch so it deploys even
  without a build/install step.
*/

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-opus-4-8';

const SYSTEM_PROMPT = `You are a senior commercial sales consultant preparing a LeadaLine founder for a cold call, outreach or meeting with a UK service business (e.g. electricians, plumbers, roofers, HVAC, landscapers, cleaners, dental, veterinary, garages, law firms).

LeadaLine sells an "AI Office Team" — an AI receptionist / lead-response system that answers every call and enquiry 24/7, replies instantly to web forms, sends missed-call text-backs, books jobs, qualifies leads, chases quotes and generates reviews. Your job is to find where LeadaLine could GENUINELY improve this business and help the founder win the customer.

RULES — these are absolute:
- NEVER invent information. If a fact cannot be found from public sources, use exactly "Not publicly available." for that value.
- Do not hallucinate ratings, review counts, hours, phone numbers or services. Only report what you can verify from the website, Google Business Profile, or other public sources.
- Think commercially at all times. Every observation should ladder up to a sales opportunity.
- Output SHORT, DETAILED bullet points — never long paragraphs. Bullets should be 2–7 words where possible (e.g. "EV Charger Installation", "Office closes 5pm weekdays").
- Be specific to THIS business. Generic filler is worthless.

RESEARCH:
- Fetch the provided website URL and read the key pages (home, services, contact, about).
- Search Google for the business name + location to find the Google Business Profile (rating, review count, hours, recent reviews) and any social profiles.
- Note the actual source URLs you relied on.

OUTPUT FORMAT:
Respond with a SINGLE valid JSON object and NOTHING else — no markdown, no code fences, no commentary before or after. Use this exact shape (omit nothing; use "Not publicly available." or empty arrays where data is missing):

{
  "quickSummary": {
    "businessName": string,
    "prospectStars": integer (1-5, how strong a LeadaLine prospect),
    "primaryPainPoint": string (one sentence),
    "recommendedDemo": string (one sentence),
    "openingLine": string (one sentence, genuine, no invented facts),
    "estimatedValue": string (one sentence, e.g. "£X–£Y/mo in recovered enquiries")
  },
  "businessOverview": {
    "companyName": string,
    "industry": string,
    "yearsTrading": string,
    "companySizeEstimate": string,
    "serviceAreas": [string],
    "employeesEstimate": string,
    "primaryServices": [string],
    "emergencyServices": string ("Yes" / "No" / "Not publicly available."),
    "commercial": string,
    "domestic": string,
    "contactNumbers": [string],
    "email": string,
    "website": string,
    "socialLinks": [{ "platform": string, "url": string }]
  },
  "onlinePresence": {
    "websiteScore": integer (0-10),
    "items": [{ "label": string, "value": string, "status": "good"|"warn"|"bad"|"unknown" }]
      // include: Mobile Friendly, Modern Design, Speed, Trust Signals, Calls to Action,
      // Easy Contact, Booking System, Live Chat, Forms, Reviews Shown, Images, Branding
  },
  "googleBusiness": {
    "rating": string,
    "totalReviews": string,
    "latestReviewSummary": [string],
    "openingHours": [string],
    "busyTimes": string,
    "photos": string,
    "commonComplaints": [string],
    "commonPraise": [string]
  },
  "leadCapture": {
    "score": integer (0-10),
    "channels": [{ "label": string, "present": true|false|null, "note": string }]
      // include: Phone Number, Contact Form, Email, WhatsApp, Live Chat, Messenger,
      // Booking Calendar, Quote Form, AI Chatbot, Missed Call Text Back
  },
  "customerExperience": {
    "score": integer (0-10),
    "findPhone": string,
    "requestQuote": string,
    "bookWork": string,
    "askQuestions": string,
    "responseSpeed": string,
    "notes": [string]
  },
  "salesOpportunities": [
    { "stars": integer (1-5), "title": string, "issue": string, "solution": string, "benefit": string }
    // ranked by potential impact, highest first. 3-6 opportunities.
  ],
  "recommendedAngle": {
    "headline": string (one primary angle only, one sentence),
    "problem": string,
    "impact": string,
    "suggestedDemo": string,
    "likelyRoi": string
  },
  "discoveryQuestions": [string],   // exactly 10, natural, personalised
  "objections": [{ "objection": string, "response": string }],  // 3-5 likely objections
  "iceBreaker": string,             // one genuine sentence, never invent facts
  "fitScore": { "grade": "A+"|"A"|"B"|"C"|"D", "explanation": string },
  "sources": [{ "title": string, "url": string }]
}`;

function buildUserMessage({ businessName, websiteUrl, phone }) {
  let msg = `Prepare a Prospect Intelligence briefing for this UK service business.\n\n`;
  msg += `Business Name: ${businessName}\n`;
  msg += `Website URL: ${websiteUrl}\n`;
  if (phone) msg += `Phone Number: ${phone}\n`;
  msg += `\nFetch the website, find the Google Business Profile and public sources, then return the JSON briefing exactly as specified. Remember: never invent data — use "Not publicly available." when a fact cannot be verified.`;
  return msg;
}

function extractJson(text) {
  if (!text) return null;
  // Strip code fences if present
  let t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  // Grab the outermost JSON object
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  const candidate = t.slice(start, end + 1);
  try {
    return JSON.parse(candidate);
  } catch (_) {
    return null;
  }
}

function collectText(content) {
  if (!Array.isArray(content)) return '';
  return content
    .filter((b) => b && b.type === 'text' && typeof b.text === 'string')
    .map((b) => b.text)
    .join('\n');
}

async function callAnthropic(body, apiKey) {
  const resp = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  const data = await resp.json().catch(() => null);
  if (!resp.ok) {
    const detail = data && data.error ? data.error.message : `HTTP ${resp.status}`;
    throw new Error(`Anthropic API error: ${detail}`);
  }
  return data;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Server not configured. Set the ANTHROPIC_API_KEY environment variable.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    let { businessName, websiteUrl, phone } = body;

    businessName = (businessName || '').trim();
    websiteUrl = (websiteUrl || '').trim();
    phone = (phone || '').trim();

    if (!businessName || !websiteUrl) {
      return res.status(400).json({ error: 'businessName and websiteUrl are required.' });
    }
    if (!/^https?:\/\//i.test(websiteUrl)) websiteUrl = 'https://' + websiteUrl;

    const tools = [
      { type: 'web_search_20260209', name: 'web_search', max_uses: 6 },
      { type: 'web_fetch_20260209', name: 'web_fetch', max_uses: 4 },
    ];

    const messages = [
      { role: 'user', content: buildUserMessage({ businessName, websiteUrl, phone }) },
    ];

    // Server-side tool loop: resume on pause_turn.
    let data;
    let text = '';
    const MAX_TURNS = 5;
    for (let turn = 0; turn < MAX_TURNS; turn++) {
      data = await callAnthropic(
        {
          model: MODEL,
          max_tokens: 20000,
          thinking: { type: 'adaptive' },
          output_config: { effort: 'medium' },
          system: SYSTEM_PROMPT,
          tools,
          messages,
        },
        apiKey
      );

      text = collectText(data.content);

      if (data.stop_reason === 'pause_turn') {
        // Continue the server-side tool run.
        messages.push({ role: 'assistant', content: data.content });
        continue;
      }
      break;
    }

    const report = extractJson(text);
    if (!report) {
      return res.status(502).json({
        error: 'The analysis could not be parsed. Please try again.',
        raw: text ? text.slice(0, 2000) : null,
      });
    }

    report.meta = {
      generatedAt: new Date().toISOString(),
      input: { businessName, websiteUrl, phone: phone || null },
    };

    return res.status(200).json({ success: true, report });
  } catch (err) {
    console.error('prospect-intelligence error:', err);
    return res.status(500).json({ error: err.message || 'Unexpected server error.' });
  }
}
