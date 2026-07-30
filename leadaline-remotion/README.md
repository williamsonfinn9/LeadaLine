# LeadaLine — Remotion Motion-Code Demo

A premium SaaS product demo for LeadaLine, built as reusable **React / Remotion**
scenes. 1920×1080 · 60fps · ~52s · fully data-driven.

## Journey (unchanged brand + flow)
Hook → **AI Receptionist** → **lead qualification** → **owner summary** →
**dashboard logging** (lead moves through the pipeline) → **booking / follow-up** →
**job completed** → **5-star review request** → **review logged into dashboard** → **CTA**.

## Structure
```
src/
  components/   Background, Chrome (logo + step bar), Phone (persistent iMessage phone
                + lockscreen / thread / summary / booking / completed / review screens),
                Dashboard (pipeline + KPIs + review logging), ui (GlassCard, Kinetic,
                Sweep, Stars, Kicker)
  scenes/       LeftStage — every left-column panel + dashboard captions + CTA
  data/         config.ts  ← change the whole video from here
  lib/          theme (brand tokens), anim (easing/springs/reveal), timing (scene map),
                fonts (loads Manrope + Space Grotesk)
  Root.tsx      the <Composition>
  Video.tsx     assembles background, phone, dashboard, panels, chrome, sweeps, audio
public/         logo.png, fonts/, music.m4a
renders/        output
```

## Data-driven
Everything visible is driven by `src/data/config.ts` — change the **industry,
customer name, service, location, estimated value, review text**, pipeline stage
names, metrics, CTA copy, and the on-phone conversation. No motion code needs editing.

## Develop / render
```
npm install
npm start                      # open Remotion Studio to preview + scrub
npm run render                 # renders renders/LeadaLine_Demo.mp4 (h264, with music)
```
Render needs a Chrome Headless Shell. In restricted environments pass an existing one:
`npx remotion render src/index.ts LeadaLineDemo renders/out.mp4 --browser-executable=<path-to-chrome-headless-shell>`

## Motion
Smooth bezier easing + springs, blur-to-sharp reveals (subtle motion-blur feel),
card fly-ins, sheen-sweep transitions, phone↔dashboard device-swap, lead-card
movement through the pipeline, glass UI, glow/depth, and a pulsing CTA.
Brand: dark theme, `#3B9CF5 → #7A3FF0` gradient, Space Grotesk + Manrope.

> Note: this project must not sit under a folder whose parent contains an invalid
> `package.json`. The repo root `package.json` is currently JavaScript, not JSON,
> which breaks the bundler — see the note delivered with this project.
