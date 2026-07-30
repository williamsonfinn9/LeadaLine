# LeadaLine Contractor Enquiry Audit

An automated customer-acquisition system: a UK contractor enters their website
and business details, LeadaLine analyses their public website and enquiry
journey, they answer 8 practical questions, and the system generates a
personalised lead-response audit with a transparent score, a commercial
opportunity range, and a recommended LeadaLine AI Office Team — driving them
towards a booked demo. Every lead, answer, observation and interaction is
stored in the LeadaLine Supabase acquisition CRM.

---

## 1. Customer journey

1. `/contractor-audit` — landing page (what it checks, trust, FAQ)
2. `/contractor-audit/start` — business details → 8-question questionnaire → analysing screen
3. Server: safe website crawl → deterministic scoring → opportunity range →
   component recommendation → internal fit scoring → AI narrative (with fallback)
4. `/contractor-audit/report/<token>` — personalised report with adjustable
   opportunity calculator and demo CTAs (pre-populated booking link)
5. `/contractor-audit/admin` — internal CRM for Cam & Finn (Supabase auth)

## 2. Architecture

Static HTML pages + one Vercel serverless function, zero npm dependencies
(native `fetch` throughout — same convention as `api/prospect-intelligence.js`).

```
contractor-audit.html          landing page
contractor-audit-start.html    form + questionnaire + analysing screen
contractor-audit-report.html   secure report renderer
contractor-audit-admin.html    internal acquisition CRM (Supabase auth)
api/contractor-audit.js        single action-routed serverless function
lib/audit/
  config.js       central config: product name, routes, trades, questions,
                  components, score labels, opportunity assumptions (pure ESM,
                  shared by server AND browser pages)
  validate.js     input validation, URL normalisation, questionnaire mapping
  urlsafety.js    SSRF protection (DNS + IP-range checks, per redirect hop)
  crawl.js        bounded same-domain crawl (≤6 pages, ≤800KB/page, ≤28s)
                  + heuristic observation extraction
  scoring.js      deterministic 5×20-point scoring with confidence model
  opportunity.js  transparent range calculator (also runs in the browser)
  recommend.js    component selection, gap cards, workflow builder
  fit.js          INTERNAL fit scoring + sales angles (never shown to prospects)
  ai.js           Anthropic narrative generation + deterministic fallback
  tokens.js       secure report tokens, HMAC signing, unsubscribe tokens
  db.js           Supabase PostgREST helper (service role, server only)
  emails.js       4 email templates (1 transactional + 3 marketing)
  email.js        provider abstraction (Resend; no-op when unconfigured)
  webhook.js      Make.com webhook sender with HMAC signature
supabase/migrations/20260730_contractor_audit.sql
tests/audit-core.test.mjs
```

Routes are wired in `vercel.json` (`rewrites`). API actions:
`submit`, `process`, `status`, `report`, `track`, `adjust`, `unsubscribe`,
`admin_leads`, `admin_lead`, `admin_update_lead`.

> **Note on the repository:** most pre-existing files in this repo have
> mismatched names/contents (e.g. `netlify.toml` contains an HTML page). The
> audit was therefore built fully self-contained and touches no existing file
> except `vercel.json`. See the handover doc.

## 3. Database tables

All in Supabase project `leadaline-crm` (`icshqgpsehddcqwydjxc`), migration
`supabase/migrations/20260730_contractor_audit.sql` (already applied):

| Table | Purpose |
|---|---|
| `audit_leads` | Prospect + business details, consent, attribution, status, internal fit |
| `audit_responses` | Questionnaire answers (one row per question) |
| `audit_jobs` | Processing jobs: queued → running → complete/failed, retry-safe |
| `website_observations` | Individual website findings with evidence + source URL |
| `audit_reports` | Generated reports, keyed by 256-bit `public_report_token` |
| `opportunity_estimates` | Original + prospect-adjusted opportunity ranges |
| `audit_events` | Funnel + engagement events (views, CTA clicks, calculator) |
| `audit_bookings` | Demo booking records |
| `email_preferences` | Transactional/marketing consent + unsubscribes |

**Security model:** every table has RLS enabled with **no policies** — anon and
authenticated roles can read nothing. All access flows through the serverless
function using the service-role key. Reports are only reachable via their
random token (90-day expiry, configurable in `lib/audit/config.js`). Internal
data (fit score, sales angle) is never included in the public `report` action.

## 4. Website analysis

- Only `http(s)`; URL is validated against SSRF (private/loopback/link-local/
  CGNAT/metadata IPs, internal TLDs, credential URLs, non-standard ports),
  re-checked on **every redirect hop**, with DNS resolution checks.
- Homepage + up to 5 same-domain candidate pages (contact/quote/services/
  about/privacy/booking), 800KB/page cap, 10s/request, 28s total budget,
  honest bot user-agent, no bypassing of bot protections (403/429 = "could not
  analyse").
- Regex-based heuristics extract ~30 observations (phone visibility, forms and
  their fields, CTAs, opening hours, out-of-hours guidance, chat widgets,
  reviews, accreditations, privacy/terms, viewport/meta).
- **Failure is graceful**: if the site can't be analysed, the audit is built
  from questionnaire data alone and the report says so explicitly.
- Future providers (e.g. Firecrawl, PageSpeed) can be added behind
  `analyseWebsite()` without touching anything downstream.

## 5. Scoring methodology (v1.0.0)

Five categories × 20 points: Enquiry Capture, Response Availability, Lead
Qualification, Follow-Up Process, Visibility & Organisation. Each category is
a set of weighted checks resolved from website observations and/or
questionnaire signals to a fraction 0–1, or `unknown`.

- **Unknowns shrink the denominator** (floored at 50% of category weight)
  instead of counting as failures.
- Each category carries a **confidence level** (high ≥80% of weight known,
  medium ≥50%, low otherwise); overall confidence is derived from these.
- Checks scoring ≥0.9 become **positives**; ≤0.35 become **gaps** (each gap has
  a hand-written customer-facing card in `recommend.js`); unknown checks feed
  "items worth confirming".

Change scoring by editing `lib/audit/scoring.js` (and bump
`scoringVersion` in `config.js`); tests in `tests/audit-core.test.mjs`.

## 6. Opportunity calculation

Deterministic and fully disclosed on the report:

```
exposed  = monthly_enquiries × exposure_rate      (5–15% / 10–25% / 20–40%
                                                   by gap count: <3 / 3–5 / 6+)
recovered = exposed × recovery_rate               (10–30%, fixed conservative)
value     = recovered × average_job_value
```

Inputs come from the questionnaire bands; "Not sure" uses labelled default
assumptions. Everything is a low–high range with an explicit non-guarantee
disclaimer. The prospect can adjust inputs on the report; recalculation runs
the **same module in the browser** and the adjusted estimate is stored
(`user_adjusted = true`) alongside the original.

## 7. Internal lead scoring (never customer-facing)

`lib/audit/fit.js` produces a 0–100 fit score: trade fit + enquiry volume +
job value + **weakness-as-opportunity** points (weak missed-call handling,
slow response, no follow-up process, scattered tracking) + team size; strong
existing processes get a small admin/reporting-angle floor. Labels: High fit
(≥65), Medium (≥45), Low (≥25), Not enough information. Each lead also gets a
recommended sales angle, best demo route, features to emphasise/avoid, a key
discovery question and an expected objection — visible in the admin CRM and
sent in webhooks.

## 8. AI usage

AI (Anthropic API, `AI_MODEL`, default `claude-opus-5`) writes **only** the
executive summary, "working well" phrasing and an internal demo-prep note —
via a structured-output JSON schema, validated before storage, with strict
factuality rules in the system prompt (no invented observations, no guaranteed
revenue, no provider mentions). Scores, calculations, recommendations and
access control are deterministic code. If the API key is missing, the call
fails, or validation fails, a deterministic fallback template is used — the
audit always works without AI.

## 9. Environment variables

See `.env.example`. Summary:

| Variable | Required | Purpose |
|---|---|---|
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Data storage (already set for existing functions) |
| `PUBLIC_SITE_URL` | Recommended | Absolute links in emails/webhooks |
| `PUBLIC_BOOKING_URL` | No | Demo CTA destination (default `/book-a-demo.html`) |
| `ANTHROPIC_API_KEY` / `AI_MODEL` | No | AI narrative (falls back cleanly) |
| `EMAIL_PROVIDER_API_KEY` / `EMAIL_FROM_ADDRESS` | No | Resend email delivery |
| `MAKE_WEBHOOK_URL` / `MAKE_WEBHOOK_SECRET` | No | Owner notifications |
| `AUDIT_REPORT_SECRET` | Recommended | Signs unsubscribe links |
| `ADMIN_EMAILS` | Recommended | CRM allowlist (default hello@/admin@leadaline.com) |

## 10. Webhooks (Make)

Events: `audit.completed`, `audit.high_fit`, `report.first_view`,
`report.repeat_view`, `report.cta_clicked`, `demo.booking_started`,
`demo.booking_completed`. Payload includes lead/contact details, scores, pain
point, sales angle and report URL. When `MAKE_WEBHOOK_SECRET` is set, the raw
JSON body is HMAC-SHA256 signed into header `x-leadaline-signature` — verify
in Make by computing sha256-hmac of the body with the shared secret.

**To connect:** create a Make scenario with a Custom Webhook trigger, copy its
URL into `MAKE_WEBHOOK_URL` in Vercel, set a random `MAKE_WEBHOOK_SECRET`,
redeploy, run a test audit.

## 11. Email delivery

Provider abstraction in `lib/audit/email.js` (Resend). Email 1 (report ready)
is transactional — it delivers the report the prospect requested. Emails 2–4
(follow-up, workflow preview, reminder) are **marketing**: only send them to
leads with `marketing_allowed = true`, and always include the unsubscribe link
(`emails.js` builds it in). The MVP sends Email 1 automatically on completion;
Emails 2–4 are templated and ready — schedule them from Make (recommended) by
querying `email_preferences` + `audit_events`, or add a cron function later.

## 12. Analytics & funnel

All funnel events land in `audit_events` (pre-submission events are buffered
in `sessionStorage`; post-report events are tracked live: `report_opened`,
`report_reopened`, `score_section_viewed`, `calculator_adjusted`,
`recommendation_viewed`, `booking_cta_clicked`, `booking_started`,
`booking_completed`). Example funnel queries (Supabase SQL editor):

```sql
-- Report open rate & booking rate by campaign
select l.utm_campaign,
       count(*) as audits,
       count(*) filter (where exists (select 1 from audit_events e
         where e.audit_lead_id = l.id and e.event_name = 'report_opened')) as opened,
       count(*) filter (where l.lead_status = 'demo_booked') as booked
from audit_leads l group by 1 order by 2 desc;

-- High-fit rate by trade
select trade, count(*) total,
       count(*) filter (where internal_fit_label = 'High fit') as high_fit
from audit_leads group by 1 order by 2 desc;
```

## 13. Local setup & testing

```bash
# Unit tests (no network/db needed) — 27 tests
node --test tests/audit-core.test.mjs

# Static preview of the pages
python3 -m http.server 8123   # then open localhost:8123/contractor-audit.html

# Full stack locally (needs env vars in .env)
npm i -g vercel && vercel dev
```

Manual test script (production or `vercel dev`):
1. Open `/contractor-audit` → Run My Free Audit.
2. Enter real-ish details + any website; complete the 8 questions.
3. Watch the analysing screen; you should land on `/contractor-audit/report/<token>`.
4. Adjust the calculator sliders; click a demo CTA.
5. Open `/contractor-audit/admin`, sign in with a Supabase user whose email is
   in `ADMIN_EMAILS`, confirm the lead appears with fit score + sales angle.
6. Try a website that doesn't exist (e.g. `no-such-site-xyz123.co.uk`) — the
   audit must still complete with the "could not fully analyse" note.
7. Re-submit the same email+domain within 24h — you get the same audit back
   (duplicate guard), not a second one.

## 14. Deployment

The site deploys on Vercel with no build step. Push to `main` (or the
connected branch) → Vercel deploys. Before first production use:

1. Set env vars in Vercel (section 9). `SUPABASE_*` and `ANTHROPIC_API_KEY`
   already exist for the current functions.
2. The DB migration is already applied to `leadaline-crm`. For a fresh
   project, run `supabase/migrations/20260730_contractor_audit.sql` in the SQL
   editor.
3. Visit `/contractor-audit` and run the manual test script above.

## 15. Known limitations

- Website analysis is heuristic (regex over HTML). JS-rendered SPAs may show
  fewer observations; scoring compensates via the unknown/confidence model.
- One serverless invocation does the whole analysis (≤60s). Very slow sites
  fall back to questionnaire-only.
- Nurture emails 2–4 are templated but not scheduled (see §11).
- PDF export is deferred post-MVP (feature-flagged off in config; the report
  prints acceptably via the browser).
- In-memory rate limiting is per-instance; the durable guard is the
  email+domain duplicate check. Add Turnstile if spam appears (env vars are
  reserved).
- The `booking_started`/`booking_completed` distinction is approximated:
  clicking a demo CTA records `booking_cta_clicked` + `booking_started`.
  True completion tracking needs the booking provider's webhook → call the
  `track` action with `event: 'booking_completed'`.

## 16. Security considerations

No secrets in frontend code; service role used only server-side; RLS deny-all;
256-bit report tokens with expiry; SSRF-hardened crawler; input validation and
HTML-escaping on every render; honeypot + rate limiting + duplicate guard;
constant-time token comparison; HMAC-signed webhooks; internal fit data
excluded from public API responses; stack traces never returned to users.

**Needs human review before launch (not a legal sign-off):** the privacy/
consent wording on the start page, the audit-specific privacy notice, retention
period (default 24 months, delete via cascading `delete from audit_leads`),
and the marketing email cadence.

## 17. Pre-launch checklist

- [ ] Env vars set in Vercel (incl. `AUDIT_REPORT_SECRET`)
- [ ] Test audit run end-to-end on production URL
- [ ] Failed-website fallback tested
- [ ] Admin CRM sign-in works for Cam & Finn
- [ ] Make webhook connected and firing (or consciously deferred)
- [ ] Resend connected and Email 1 arriving (or consciously deferred)
- [ ] Privacy/consent copy reviewed by a human
- [ ] `/privacy.html` mentions the audit data processing
- [ ] Existing pages still work (audit touches only `vercel.json`)
- [ ] `node --test tests/audit-core.test.mjs` green
