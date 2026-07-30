# 3 New Pain-Point Reels (Remotion, with real website visuals)

Three fresh 9:16 reels (1080×1920 @30fps, ~31s each) targeting the core pain
points LeadaLine solves, aligned to the live website's positioning
("AI office teams for electrical businesses") and featuring **real captures of
www.leadaline.com** inside the phone mockups.

| File (in `renders/`) | Story |
|---|---|
| `leadaline-reel-missed-call.mp4` | You're up a ladder → the call rings out → "they ring the next electrician" → LeadaLine answers in one ring, captures service/location/urgency, lead lands in your pocket |
| `leadaline-reel-quiet-quote.mp4` | £1,400 quote sent Tuesday → silence, days tick past → LeadaLine chases politely until "yes — let's go ahead" → CRM flips to WON |
| `leadaline-reel-after-hours.mp4` | 21:47 enquiry, every firm closed → your AI answers in 6 seconds, qualifies, books 08:30 → you wake up to booked work |

Each ends on the real site (the booking page / "one connected system" offer page)
scrolling in a phone, with a **Book a free demo → leadaline.com** CTA.

- Captions: `captions-new-reels.md`
- Source: `../leadaline-remotion/src/reels/` (compositions `ReelMissedCall`,
  `ReelQuietQuote`, `ReelAfterHours` in `src/Root.tsx`)
- Site captures: `site-shots/` (taken from the live site with reveal-on-scroll
  triggered via `../leadaline-remotion/shoot_site.mjs`)
- Audio: synthesized music beds + SFX (`scratchpad/reel_audio.py` recipe — dark
  pulse before each narrative flip, warm/bright after; ring buzz, whoosh, ticks,
  notification dings, success chime). No voiceover by design — these are
  caption-driven, muted-autoplay-first reels; a VO pass can be added later.

## Rebuild
```bash
cd ../leadaline-remotion
npx remotion render ReelMissedCall out.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
# then mux with the matching audio track (see scratchpad/mux_reels.sh recipe)
```
