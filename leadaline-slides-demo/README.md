# LeadaLine — 60s AI Office Team Demo (image-driven, Remotion)

Turns the 10 approved LeadaLine slides into a premium 60-second SaaS demo:
1920×1080 · 60fps · UK-female voiceover · subtle premium music. Each slide is
**animated** (Ken-Burns zoom/drift + premium transitions), never a static cut.

## Structure
```
slides/            the 10 slide images (slide-01..slide-10.png)
audio/             vo/ (per-line VO) + master.m4a (VO + music + SFX)
src/scenes/        SlideScene — Ken-Burns + entrance/exit per slide
src/transitions/   reusable entrances, sheen Sweep, CTA GlowPulse
src/lib/slides.ts  the slide sequence, timing windows and Ken-Burns params
renders/           output + timing-plan.json + voiceover-script.md + NOTES.md
```

## Use your real artwork
Replace `slides/slide-01.png … slide-09.png` with the approved PNGs (same names,
1920×1080), then:
```
npm install     # first time (a Chrome Headless Shell is required to render)
npm start       # preview + scrub in Remotion Studio
npm run render  # -> renders/leadaline-ai-office-team-demo-60s.mp4
```

## Data-driven timing
All scene windows, Ken-Burns direction/zoom and transition types live in
`src/lib/slides.ts`; the voiceover mix is in `audio/master.m4a`. See
`renders/timing-plan.json` for the full plan and `renders/NOTES.md` for asset notes.
