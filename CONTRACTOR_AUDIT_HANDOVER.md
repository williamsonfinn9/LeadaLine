# Contractor Enquiry Audit — Handover for Cam & Finn

Plain-language guide to what was built, what's left, and how to run it.
Technical detail lives in `CONTRACTOR_AUDIT.md`.

---

## What's done and working

- **Landing page** at `/contractor-audit` — explains the audit, honest about
  what it can and can't know, strong CTAs, FAQ.
- **The audit journey** at `/contractor-audit/start` — business details form
  (with proper validation and un-ticked consent boxes), 8 quick questions, a
  live "analysing" screen.
- **Real website analysis** — we safely read up to 6 public pages of the
  prospect's site and record ~30 findings (phone visible? form? click-to-call?
  out-of-hours info? reviews? etc.). If their site blocks us or is down, the
  audit still completes from their answers.
- **Scoring** — 5 categories × 20 points, with confidence levels. "We don't
  know" never counts as a failure.
- **Personalised report** at a private link — score dial, executive summary,
  what's working, gap cards (observation → why it matters → recommendation →
  which LeadaLine assistant fixes it), an adjustable opportunity calculator
  with visible assumptions and a clear "not a guarantee" disclaimer, the
  recommended AI Office Team (max 3, prioritised), a future enquiry workflow
  tailored to their biggest pain, and demo CTAs that pre-fill their details.
- **Internal CRM** at `/contractor-audit/admin` — sign in with your Supabase
  account. Every lead with audit score, **internal fit score**, main pain
  point, a recommended sales angle ("lead with missed-call recovery, don't
  lead with website redesign"), the demo route, a discovery question, the
  objection to expect, report views, CTA clicks, status + notes.
- **Database** — 9 new tables in your `leadaline-crm` Supabase project
  (migration already applied), all locked down; prospects can only see their
  own report via its private link.
- **Emails** — the "your report is ready" email plus 3 follow-up templates.
- **Webhooks to Make** — 7 events (audit completed, high-fit lead, report
  viewed, CTA clicked, booking started/completed) ready to plug in.
- **Tests** — 27 automated tests over the scoring, calculator, fit scoring,
  validation, tokens and templates: `node --test tests/audit-core.test.mjs`.

## ⚠️ One thing you must know about this repo

Most of the older files in this repository have the **wrong names** — e.g.
`netlify.toml` actually contains the client-login page, `calculator.js`
contains the site stylesheet, `logo-icon.svg` contains `config.js`. The live
site clearly deploys from a correctly-structured source. Everything new for
the audit is self-contained and doesn't depend on those files, and we only
edited `vercel.json` (a real file). **Worth fixing the repo scramble when you
get a chance** — say the word and it can be untangled.

Also: Supabase flagged two of your **existing** tables with security disabled
(`_leads_backup_20260702` and `api_probe`) — anyone with your public key can
read them. We didn't touch them; review whether they should be locked:
`ALTER TABLE public._leads_backup_20260702 ENABLE ROW LEVEL SECURITY;` (same
for `api_probe`) — but note that will block all client access to them.

## What you need to add (credentials)

In Vercel → Project → Settings → Environment Variables:

| Variable | What / where to get it |
|---|---|
| `AUDIT_REPORT_SECRET` | Any long random string (`openssl rand -hex 32`). Signs unsubscribe links. |
| `PUBLIC_SITE_URL` | `https://www.leadaline.com` |
| `EMAIL_PROVIDER_API_KEY` | Resend.com → API key (free tier is fine to start). Skip = no emails, audit still works. |
| `EMAIL_FROM_ADDRESS` | e.g. `LeadaLine <hello@leadaline.com>` (verify the domain in Resend) |
| `MAKE_WEBHOOK_URL` | Make → new scenario → Custom Webhook → copy URL |
| `MAKE_WEBHOOK_SECRET` | Another random string; verify it in Make if you want |
| `ADMIN_EMAILS` | Your two Supabase login emails, comma-separated |

Already set from the existing site: `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`.

## What needs a human eye before you send traffic

1. **Privacy & consent wording** on the start page and the FAQ — read it,
   make sure you're happy it matches how you'll actually use the data. The
   technical controls exist, but that's not legal compliance by itself.
2. Add a line about the audit to `/privacy.html`.
3. Skim 2–3 generated reports for tone before pointing ads at it.

## How to test the journey (5 minutes)

1. Go to `yoursite.com/contractor-audit` → "Run My Free Audit".
2. Use your own details and any real trade website. Answer the questions.
3. You should reach a report link within ~30–60 seconds.
4. Move the calculator sliders, click "Book My Personalised Demo".
5. Open `/contractor-audit/admin`, sign in — your test lead should be there
   with a fit score and a sales angle. Set its status to `invalid`.
6. Repeat once with a nonsense website (`no-such-site-xyz.co.uk`) — the report
   must still generate, with a note that the site couldn't be analysed.

## How to change things

- **Copy on the pages** → edit `contractor-audit.html` /
  `contractor-audit-start.html` / `contractor-audit-report.html` directly.
- **Questions & answer options** → `lib/audit/QUESTIONS` in
  `lib/audit/config.js`. (If you add a question, also decide how it scores in
  `lib/audit/scoring.js` — or it will simply be stored but unscored.)
- **Trades list** → `TRADES` in `lib/audit/config.js`.
- **Scoring weights / thresholds** → `lib/audit/scoring.js` (run the tests after).
- **Gap card wording / sales angles** → `lib/audit/recommend.js` and
  `lib/audit/fit.js`.
- **Opportunity assumptions** → `OPPORTUNITY_ASSUMPTIONS` in `config.js`.
- **Email wording** → `lib/audit/emails.js`.
- **Booking destination** → `PUBLIC_BOOKING_URL` env var (no code change).

## How to see your leads

`/contractor-audit/admin` (sign in with Supabase). Filter by fit, status,
trade, date. Click a row for the full picture: answers, website findings,
the customer's actual report, activity timeline, notes. Or query the
`audit_leads` table directly in Supabase.

## Connecting Make (10 minutes)

1. Make → Create scenario → trigger "Webhooks → Custom webhook" → copy URL.
2. Paste into `MAKE_WEBHOOK_URL` in Vercel, add `MAKE_WEBHOOK_SECRET`, redeploy.
3. Run a test audit — the scenario receives `audit.completed` (and
   `audit.high_fit` for strong leads) with everything you need: contact
   details, score, pain point, sales angle, report URL.
4. Suggested first automation: high-fit lead → WhatsApp/SMS to you both +
   a row in your pipeline sheet.

## Deploying safely

Push to the branch Vercel watches; there's no build step. The audit only added
new files plus route rewrites in `vercel.json`, so existing pages are
untouched. If anything looks wrong after deploy, Vercel → Deployments →
"Instant Rollback".

## What's not done yet (deliberately)

- Nurture emails 2–4 are written but not on a schedule (trigger them from
  Make when you're ready).
- PDF export (the web report prints fine; PDF is a post-MVP add).
- True "demo booked" confirmation needs your booking tool's webhook — until
  then we record CTA clicks and booking starts.
- Turnstile bot protection is pre-wired in config but off — turn it on if
  spam submissions appear.

## Recommended next improvement after launch

Wire the **booking completion loop**: when a demo is actually booked in your
calendar tool, have Make call the audit API's `track` action with
`event: 'booking_completed'` and the report token. That closes the funnel
(landing → audit → report → booked call) so you can see cost-per-booked-call
per campaign in one query — which is the number that decides where the ad
budget goes.
