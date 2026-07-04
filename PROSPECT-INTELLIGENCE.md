# Prospect Intelligence

An internal LeadaLine AI sales-preparation tool. It gathers **publicly available**
information about a UK service business (website + Google Business Profile + other
public sources) and turns it into a commercial sales briefing a founder can scan in
under 30 seconds before a cold call, outreach or meeting.

This is **not** a lead scraper. Its objective is to help LeadaLine win the customer
by identifying where the AI Office Team could genuinely add value.

## What it produces

A single, scannable page of expandable cards:

1. Business Overview
2. Online Presence (website quality score / 10)
3. Google Business Profile (rating, reviews, praise, complaints)
4. Lead Capture Review (scored channel checklist)
5. Customer Experience (scored)
6. Sales Opportunities (ranked by impact)
7. Recommended Sales Angle (one primary angle)
8. 10 personalised Discovery Questions
9. Likely Objections + best responses
10. Ice Breaker
11. LeadaLine Fit Score (A+ → D)
12. Quick Summary card

If a fact cannot be verified it is shown as **"Not publicly available."** — the tool
is instructed never to invent data.

## Files

| File | Purpose |
|------|---------|
| `prospect-intelligence.html` | The premium dark-mode UI (self-contained). Open at `/prospect-intelligence.html`. |
| `api/prospect-intelligence.js` | Serverless function (Vercel `api/` convention) that runs the analysis. Reachable at `/api/prospect-intelligence`. |

## Setup

The function calls the Anthropic Messages API (`claude-opus-4-8`) using the
`web_search` and `web_fetch` server tools. It has **no npm dependencies** — it uses
native `fetch` — so it deploys without a build step.

Set one environment variable in your hosting provider (Vercel/Netlify):

```
ANTHROPIC_API_KEY=sk-ant-...
```

That's it. Visit `/prospect-intelligence.html`, enter a business name and website
(phone optional), and click **Analyse Prospect**.

## Notes

- Analysis typically takes **20–60 seconds** (live web research + synthesis).
- `vercel.json` sets `maxDuration: 60` for API functions. On Vercel Pro you can
  raise this for extra headroom on large/slow websites.
- The tool only reads public information (business website, Google Business Profile,
  public social/review pages). No private data or scraping of gated content.
