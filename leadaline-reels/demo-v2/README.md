# LeadaLine — Demo v2 (premium rebuild)

A clearer, more premium rebuild of the showcase demo for outbound / onboarding.
Two cuts share one design system (clean light background, blue→purple gradient
accents, glass cards, big readable UI).

## Deliverables
- **Hero (16:9, ~55s)** — `renders/LeadaLine_Demo_Hero_50s.mp4` (full quality)
  · `renders/LeadaLine_Demo_Hero_50s_web.mp4` (web-optimised, faststart, ~4 MB)
- **Vertical (9:16, ~28s)** — `renders/LeadaLine_Demo_Vertical_22s.mp4` (+ `_web.mp4`)

Both carry a British AI voiceover, a subtle synthesised music bed, and light
sound design (notification pops + whooshes). They also read fully **without
sound** — every scene is captioned on-screen.

## Hero storyboard (8 scenes, strong layout variety)
1. **Hook** (centered) — "Stop missing jobs while you're on the tools." + missed-call card
2. **The problem** (3-card row) — Missed call · Website enquiry · Quote follow-up
3. **Introduce** (logo + module grid) — the AI Office Team: Receptionist, Sales, Booking, Admin, Follow-up, Reporting
4. **Live journey** (phone + lead build) — James Smith · EV charger install · Manchester · this week · **£1,150**
5. **Owner summary** (large readable card) — new qualified lead, next step: call today
6. **Dashboard / portal** (desktop browser) — kanban New Lead → Qualified → Booked → Followed Up, lead card moving across
7. **Follow-up & proof** (3-card row) — warm follow-up, 5★ review request, monthly report (38 captured / 12 booked)
8. **CTA** — "Your AI Office Team, built around your business." · Book a 15-minute demo · LeadaLine.com

## What changed vs the first demo
- Tighter pacing; broke the repetitive text-left / phone-right layout
- Every screen readable within ~2s (bigger type + bigger UI)
- A clear end-to-end customer journey
- Finance grounded in a concrete **£1,150 job** rather than a random headline stat
- Added a real **desktop dashboard** so it reads as a business system, not just phone animation
- Sharper, more direct CTA

## Rebuild
- `source/hero/index.html` — HyperFrames/GSAP composition (16:9, `data-duration=55`)
- `source/vertical/index.html` — 9:16 composition (`data-duration=28`)
- `source/vo_v2.py` — regenerates the British VO segments (OpenAI TTS; needs a key on disk)
- `source/musicbed.py` — synthesises the royalty-free ambient pad
- `source/audio_v2.py` — lays VO at scene times, mixes pad + SFX → `*_audio.m4a`
- Render: `hyperframes render source/hero -o hero_silent.mp4 --fps 30 --quality high`
- Mux: `ffmpeg -i hero_silent.mp4 -i hero_audio.m4a -map 0:v -map 1:a -c:v copy -c:a aac -shortest out.mp4`

## Notes
- Music is a soft synthesised pad — swap for a licensed track any time.
- The vector LeadaLine mark is used; drop in the official logo asset for a pixel-exact swap.
