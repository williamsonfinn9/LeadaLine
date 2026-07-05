# Build notes — LeadaLine 60s slide demo

## ⚠️ Important: original slide artwork needed for the final
The 10 approved slides were **pasted inline in chat**, which does not reach the
build as image files. The whole filesystem was searched — only older uploads exist.
So this render uses **clean branded PREVIEW frames** (`/slides/slide-01…10.png`) that
carry each slide's title, purely so you can review the **motion, pacing and the final
UK-female voiceover in sync**.

**To produce the pixel-exact final:** drop your 10 original PNGs into `/slides/`
using the same filenames (`slide-01.png` … `slide-09.png`, mapped to the order in
`timing-plan.json`) and run `npm run render`. No code changes needed — the Ken-Burns
scenes, transitions, voiceover and music are already wired.

Recommended export size for the source slides: **1920×1080** (they’ll be scaled to
cover; keep key content within a ~5% safe margin so the slow zoom never crops it).

## Slide → scene mapping (your 9-scene plan)
1 Opening · 2 AI Receptionist · 3 Qualify · 4 Owner Summary · 5 Booking ·
6 Follow-Up · 7 Review · 8 Reporting · 9 CTA (held to 1:00 = the “Slide 10” hold).

## The 10th image (CRM Tracking · “Every lead in one place”)
You sent this as well, but it isn’t in the 9-scene voiceover/timing plan you specified
(your Slide 5 = Booking). It’s saved as `slide-10.png` and **left out of this cut**.
Say the word and I’ll insert it (e.g. between Owner Summary and Booking) — it needs a
short extra VO line and a re-time to stay under 60s.

## Voiceover
- UK female, warm/confident/modern (OpenAI `gpt-4o-mini-tts`, voice “coral”).
- Raw read was ~68s; paced at 1.2× to fit under 60s (brief permitted this). Wording
  kept faithful; three long lines lightly tightened. See `voiceover-script.md`.
- Segments in `/audio/vo/`, mixed master in `/audio/master.m4a`.

## Music
- Subtle synthesised premium bed (low, non-distracting), baked into `master.m4a`.
  Swap for a licensed track any time by replacing the music in `assemble_slides_audio.py`.

## Captions
- Intentionally **not** burned in — the slides already carry on-screen text, so
  subtitles would clutter. Can add tasteful lower-third captions if you want them.

## Motion
Per-slide Ken-Burns zoom + drift, premium entrances (dolly / slide / rise), motion-blur
match-cuts, sheen sweep on each transition, depth vignette, and a glow pulse on the CTA.
Reusable transition helpers live in `/src/transitions`.
