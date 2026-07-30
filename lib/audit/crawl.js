/* ============================================================
   Contractor Enquiry Audit — safe website analysis
   ------------------------------------------------------------
   SERVER ONLY. Fetches a small number of same-domain public
   pages (homepage + contact/services/about/privacy candidates),
   extracts structured observations with conservative heuristics,
   and never claims anything it cannot support.

   Hard limits: max pages, max bytes per page, max total time,
   redirect hops re-validated against SSRF rules, http(s) only.
   No bot-protection bypassing: a 403/429 simply means
   "could not analyse".
   ============================================================ */

import { assertPublicUrl } from './urlsafety.js';

const LIMITS = {
  maxPages: 6,
  maxBytesPerPage: 800 * 1024,
  perRequestTimeoutMs: 10_000,
  totalBudgetMs: 28_000,
  maxRedirects: 3,
};

const USER_AGENT =
  'LeadaLineAuditBot/1.0 (+https://www.leadaline.com/contractor-audit; enquiry-audit; contact hello@leadaline.com)';

/** Fetch one URL with SSRF re-validation on every redirect hop. */
async function safeFetch(rawUrl, deadline) {
  let current = rawUrl;
  for (let hop = 0; hop <= LIMITS.maxRedirects; hop++) {
    const { url } = await assertPublicUrl(current);
    const remaining = deadline - Date.now();
    if (remaining <= 500) { const e = new Error('Analysis time budget exhausted'); e.code = 'timeout'; throw e; }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.min(LIMITS.perRequestTimeoutMs, remaining));
    let res;
    try {
      res = await fetch(url.toString(), {
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml' },
      });
    } finally {
      clearTimeout(timer);
    }

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location');
      if (!loc) { const e = new Error('Redirect without location'); e.code = 'fetch_failed'; throw e; }
      current = new URL(loc, url).toString();
      continue;
    }
    if (!res.ok) { const e = new Error(`HTTP ${res.status}`); e.code = res.status === 403 || res.status === 429 ? 'blocked' : 'fetch_failed'; e.status = res.status; throw e; }

    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('text/html') && !type.includes('xhtml') && type !== '') {
      const e = new Error('Not an HTML page'); e.code = 'not_html'; throw e;
    }

    // Stream with byte cap
    const reader = res.body.getReader();
    const chunks = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      chunks.push(value);
      if (received >= LIMITS.maxBytesPerPage) { reader.cancel().catch(() => {}); break; }
    }
    const buf = new Uint8Array(received);
    let off = 0;
    for (const c of chunks) { buf.set(c.subarray(0, buf.length - off), off); off += c.byteLength; }
    return { finalUrl: current, https: current.startsWith('https:'), html: new TextDecoder('utf-8', { fatal: false }).decode(buf) };
  }
  const e = new Error('Too many redirects'); e.code = 'too_many_redirects'; throw e;
}

/* ------------------------------------------------------------
   HTML heuristics (regex-based; deliberately conservative)
   ------------------------------------------------------------ */
function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

const UK_PHONE_TEXT_RE = /(?:\+44\s?\d{2,4}|\(?0\d{2,4}\)?)[\s-]?\d{3,4}[\s-]?\d{3,4}/;
const EMAIL_TEXT_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;

function extractLinks(html, baseUrl) {
  const links = [];
  const re = /<a\b[^>]*href\s*=\s*["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) && links.length < 400) {
    try {
      const abs = new URL(m[1], baseUrl);
      links.push({ href: abs.toString(), raw: m[1], text: stripTags(m[2]).trim().toLowerCase().slice(0, 80) });
    } catch { /* ignore malformed */ }
  }
  return links;
}

function analysePage(html, pageUrl) {
  const text = stripTags(html).toLowerCase();
  const rawLower = html.toLowerCase();
  const links = extractLinks(html, pageUrl);

  const forms = [...html.matchAll(/<form[\s\S]*?<\/form>/gi)].map((m) => m[0].toLowerCase());
  const formHtml = forms.join(' ');
  const inputCount = (formHtml.match(/<(?:input|select|textarea)\b/g) || []).length;
  const requiredCount = (formHtml.match(/\brequired\b/g) || []).length;
  // A real enquiry form has at least one visible text-like field.
  const hasForm = forms.some((f) => /type=["']?(?:text|email|tel)|<textarea/.test(f));

  const askIn = (re) => forms.some((f) => re.test(f));

  return {
    text,
    links,
    signals: {
      phone_visible: UK_PHONE_TEXT_RE.test(text) || rawLower.includes('href="tel:'),
      email_visible: EMAIL_TEXT_RE.test(text) || rawLower.includes('href="mailto:'),
      click_to_call: rawLower.includes('href="tel:') || rawLower.includes("href='tel:"),
      whatsapp_contact: rawLower.includes('wa.me/') || rawLower.includes('api.whatsapp.com'),
      enquiry_form_exists: hasForm,
      form_field_count: inputCount,
      form_required_count: requiredCount,
      form_asks_phone: askIn(/type=["']?tel|name=["']?[^"']*(phone|mobile|tel)/),
      form_asks_service: askIn(/name=["']?[^"']*(service|job|work|trade|type)|<select/),
      form_asks_location: askIn(/name=["']?[^"']*(postcode|post_code|location|address|area|city|town)/),
      form_asks_urgency: askIn(/name=["']?[^"']*(urgen|when|timeframe|timescale)|urgent/),
      clear_cta: /(get a quote|request a quote|free quote|book (a|an|now)|request a callback|call ?back|get in touch|contact us today|enquire now|get started)/.test(text),
      quote_route: /(get a quote|request a quote|free quote|quote request|estimate)/.test(text),
      booking_route: /(book online|book now|book a|schedule|appointment)/.test(text),
      opening_hours_visible: /(opening hours|open (mon|monday)|mon(day)?\s*[-–]\s*fri|24\/7|24 hours|9am|8am|monday to friday)/.test(text),
      emergency_route: /(emergency|urgent call ?out|24\/7|24 hour|same day)/.test(text),
      out_of_hours_guidance: /(out of hours|after hours|24\/7|24 hour|emergency line|evenings and weekends)/.test(text),
      live_chat_or_assistant: /(livechat|live chat|tawk\.to|intercom|crisp\.chat|drift\.com|chat with us|chatbot|tidio|hubspot.*chat)/.test(rawLower),
      response_expectation_set: /(we (aim|will) (to )?(respond|reply|get back)|within \d+ (minutes|hours)|same.day response|respond within)/.test(text),
      reviews_present: /(reviews?|testimonials?|checkatrade|trustpilot|rated people|google rating|★|5.star)/.test(text),
      accreditations_visible: /(niceic|napit|gas safe|trustmark|federation of master builders|fmb|city\s*&\s*guilds|iso ?9001|chas|constructionline|safecontractor|certified|accredit)/.test(text),
      case_studies_visible: /(case stud|our work|recent (work|projects)|gallery|portfolio|completed projects)/.test(text),
      privacy_policy_present: links.some((l) => /privacy/.test(l.href.toLowerCase()) || /privacy/.test(l.text)),
      terms_present: links.some((l) => /terms/.test(l.href.toLowerCase()) || /terms/.test(l.text)),
      company_details_visible: /(company (no|number|registration)|registered in england|vat (no|number|reg))/.test(text),
      viewport_configured: /<meta[^>]+name=["']?viewport/.test(rawLower),
      title_present: /<title[^>]*>\s*\S/.test(rawLower),
      meta_description_present: /<meta[^>]+name=["']?description["']?[^>]+content=["'][^"']+/.test(rawLower),
    },
  };
}

/** Pick up to N interesting same-domain pages from homepage links. */
function pickCandidatePages(links, baseUrl, max) {
  const base = new URL(baseUrl);
  const wanted = [
    /contact/, /quote/, /enquir/, /services?/, /about/, /privacy/, /book/,
  ];
  const seen = new Set([normalisePath(baseUrl)]);
  const picks = [];
  for (const re of wanted) {
    for (const l of links) {
      if (picks.length >= max) return picks;
      let u;
      try { u = new URL(l.href); } catch { continue; }
      if (u.hostname.replace(/^www\./, '') !== base.hostname.replace(/^www\./, '')) continue;
      if (!/^https?:$/.test(u.protocol)) continue;
      if (/\.(pdf|jpg|jpeg|png|gif|svg|zip|docx?|xlsx?)$/i.test(u.pathname)) continue;
      const key = normalisePath(u.toString());
      if (seen.has(key)) continue;
      if (re.test(u.pathname.toLowerCase()) || re.test(l.text)) {
        seen.add(key);
        picks.push(u.toString());
      }
    }
  }
  return picks;
}

function normalisePath(u) {
  try {
    const url = new URL(u);
    return url.hostname.replace(/^www\./, '') + url.pathname.replace(/\/$/, '');
  } catch { return u; }
}

/**
 * Analyse a website. Never throws for ordinary failures — returns
 * { ok, reason?, observations, pagesAnalysed, sourceUrls }.
 * observations: { key: { value, evidence?, source_url? } }
 */
export async function analyseWebsite(websiteUrl) {
  const deadline = Date.now() + LIMITS.totalBudgetMs;
  const observations = {};
  const sourceUrls = [];

  const record = (key, value, sourceUrl, evidence) => {
    // once true, stays true; unknown never overwrites a known value
    const existing = observations[key];
    if (existing && existing.value === true) return;
    if (existing && value === 'unknown') return;
    observations[key] = { value, source_url: sourceUrl, evidence: evidence || null };
  };

  let home;
  try {
    home = await safeFetch(websiteUrl, deadline);
  } catch (err) {
    return {
      ok: false,
      reason: err.code || 'fetch_failed',
      message: err.message,
      observations: { website_loads: { value: false, evidence: err.message } },
      pagesAnalysed: 0,
      sourceUrls: [],
    };
  }

  record('website_loads', true, home.finalUrl);
  record('https_present', home.https, home.finalUrl);

  const pages = [{ url: home.finalUrl, html: home.html }];
  sourceUrls.push(home.finalUrl);

  const homeAnalysis = analysePage(home.html, home.finalUrl);
  const candidates = pickCandidatePages(homeAnalysis.links, home.finalUrl, LIMITS.maxPages - 1);

  for (const c of candidates) {
    if (Date.now() > deadline - 2000) break;
    try {
      const page = await safeFetch(c, deadline);
      pages.push({ url: page.finalUrl, html: page.html });
      sourceUrls.push(page.finalUrl);
    } catch { /* skip broken candidate pages */ }
  }

  // Merge boolean signals across pages: true wins.
  const boolKeys = Object.keys(homeAnalysis.signals).filter((k) => typeof homeAnalysis.signals[k] === 'boolean');
  for (const page of pages) {
    const a = page.url === home.finalUrl ? homeAnalysis : analysePage(page.html, page.url);
    for (const k of boolKeys) {
      if (a.signals[k]) record(k, true, page.url);
    }
    if (a.signals.enquiry_form_exists) {
      record('form_field_count', a.signals.form_field_count, page.url);
      record('form_required_count', a.signals.form_required_count, page.url);
    }
  }
  // Anything not observed as true becomes explicit false-or-unknown:
  // structural facts we searched all pages for → false; everything that
  // depends on judgement stays 'unknown' rather than punished.
  const observableAsFalse = new Set([
    'phone_visible', 'email_visible', 'click_to_call', 'whatsapp_contact',
    'enquiry_form_exists', 'clear_cta', 'opening_hours_visible',
    'privacy_policy_present', 'terms_present', 'viewport_configured',
    'live_chat_or_assistant', 'reviews_present', 'accreditations_visible',
  ]);
  for (const k of boolKeys) {
    if (!observations[k]) {
      record(k, observableAsFalse.has(k) ? false : 'unknown', home.finalUrl);
    }
  }
  // Form-detail signals only meaningful when a form exists.
  if (observations.enquiry_form_exists && observations.enquiry_form_exists.value !== true) {
    for (const k of ['form_asks_phone', 'form_asks_service', 'form_asks_location', 'form_asks_urgency']) {
      observations[k] = { value: false, source_url: home.finalUrl, evidence: 'No enquiry form found' };
    }
  } else {
    for (const k of ['form_asks_phone', 'form_asks_service', 'form_asks_location', 'form_asks_urgency']) {
      if (observations[k] && observations[k].value === 'unknown') {
        observations[k] = { value: false, source_url: home.finalUrl, evidence: 'Not detected in the enquiry form' };
      }
    }
  }

  return { ok: true, observations, pagesAnalysed: pages.length, sourceUrls };
}

export const CRAWL_LIMITS = LIMITS;
