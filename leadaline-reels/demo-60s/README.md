# LeadaLine — 60s Showcase Demo

A ~70-second landscape (1920×1080) product demo for automated outbound / onboarding emails.

**Deliverable:** `renders/LeadaLine_Showcase_Demo_60s.mp4` (60fps H.264 + AAC, British AI voiceover + subtle sound design)

## Look & feel
- Active blue→purple **aurora mesh** background with a moving **3D perspective floor grid** (forward motion / depth)
- A persistent iPhone anchored right; its screen changes per scene
- Kinetic Archivo typography in the left column, plus mid-line **kinetic-typography overlays** (ALWAYS ON / QUALIFIED / £1,150 JOB / BOOKED IN)
- Dark glassmorphic cards with high-glow blue→purple buttons; snappy 0.3s expo-out transitions, spring pops + haptic screen-shake
- Brand system: cyan `#18D7FF` → blue `#2563FF` → violet `#7C5CFF`

## "Power Demo" velocity pass
- **60fps** throughout for Apple-standard smoothness; a visual change lands at least every ~1.5s
- **Hook:** £41,000 counts up from £0 with a motion-blur spin in the first ~3s
- **Capture:** vibrant, reactive waveform that hue-shifts blue→purple ("the AI's brain")
- **Qualify:** the lead summary types in with a high-speed digital typing effect + caret
- **Booking:** a Z-axis camera dive into the screen, then a 0.5s fluid calendar sweep (no hard cut)
- **Follow-up:** three WhatsApp bubbles pop in a rapid 0.2s staccato (automatic chasing)

## Narrative (6 scenes)
| # | Beat | Phone | Voiceover gist |
|---|------|-------|----------------|
| 1 | Hook | Idle phone, pulsing logo, "Incoming call…" | Missed calls cost UK trades £41k+/yr |
| 2 | Reveal | App home — 6 assistants bloom in | Meet LeadaLine, your AI office team, 24/7 |
| 3 | Capture & Qualify | Call waveform → qualified lead card (Jamie R., £1,150) | Answers instantly, scores the job |
| 4 | Admin & Booking | Lock-screen notification → calendar slot snaps in | Summary in your pocket, booked automatically |
| 5 | Follow-up & Reviews | WhatsApp auto-chase → 5★ review + metrics (11 hrs / 92%) | Chased, reviewed, proven |
| 6 | Finale & CTA | "Your phone, working while you do." + Book a 15-min call | Book your 15-minute demo now |

## Audio
- Voiceover: 6 British-English segments (`vo/s1–s6.mp3`), generated via OpenAI `gpt-4o-mini-tts` (voice "ash").
- Sound design: synthesised whoosh / chime / pop / tick cues under the VO. Background music is intentionally left out so it can be dropped in manually.

## Rebuild
1. `vo/*.mp3` — regenerate with `source/vo_demo60.py` (needs an OpenAI key on disk).
2. `source/index.html` — the HyperFrames composition. Render:
   `npx hyperframes render . -o renders/demo60_silent.mp4 --fps 30 --quality high`
3. `source/audio_demo60.py` — lays VO at scene times, mixes the SFX bed → `demo60_audio.m4a`.
4. Mux: `ffmpeg -i demo60_silent.mp4 -i demo60_audio.m4a -map 0:v -map 1:a -c:v copy -c:a aac -shortest LeadaLine_Showcase_Demo_60s.mp4`

## Note on the logo
The video uses the vector LeadaLine mark (gradient "L") already used across the reel set. The exact PNG/SVG logo files sent in chat weren't saved to disk, so drop the official asset into the composition for a pixel-exact swap if needed.
