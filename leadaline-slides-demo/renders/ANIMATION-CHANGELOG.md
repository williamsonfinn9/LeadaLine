# Animation upgrade — changelog

Goal: turn the flat-slide slideshow into a premium SaaS motion piece. The 10
approved slides are unchanged; all motion is layered **on top** with overlays,
masks, glows and recreated UI accents. Total stays 60.0s.

## Global systems added
- **Varied premium transitions** (no plain fades): clip-wipe reveal (→ / ↑),
  zoom-through, blur+scale dissolve, centre scale — one per scene, alternating.
- **Travelling light sheen** across every cut (hides the wipe edge, adds flair).
- **Continuous background motion:** slow Ken-Burns push/drift on every slide +
  a slow-drifting soft blue/purple glow (screen blend) per scene.
- **Depth vignette** for subtle foreground/background separation.
- Match-cut style exits (scale-up + blur) so scenes flow into each other.
- Easing throughout is `cubic-bezier(0.16,1,0.3,1)` / spring — no linear moves.

## Per-scene widget animation
1. **Opening** — logo glow-in; the six AI-team icons pulse in, staggered; centre scale reveal.
2. **AI Receptionist** — incoming-call **expanding rings** on the caller avatar; phone screen glow; the four channel icons (Calls/Website/WhatsApp/Forms) pop in; a capture **transfer pulse** runs from the data table to the phone.
3. **Qualify** — the six "Collected Information" rows **highlight in sequence** (ring sweep); transfer pulse into the panel; a soft glow settles on "Recommended next action".
4. **Owner Summary** — a **data-transfer pulse** carries the lead from the left into the phone; the notification card **pops in like an alert** with a blue glow; the three benefit cards stagger-highlight.
5. **CRM dashboard** — the four KPI cards **glow-pop in sequence** with ring highlights; the Jamie R. row highlights and pulses; soft purple glow over the record panel.
6. **Booking** — a **spring checkmark** lands on the connector; a data pulse runs into the diary; the **"16:30 Survey — Jamie R. · Booked"** slot highlights with a green pulse — it feels just placed.
7. **Follow-Up** — the iMessage bubbles **pop in one at a time** with spring; **typing dots** appear before the final LeadaLine reply; the "booked for Thursday" bubble gets a soft blue glow.
8. **AI Review** — the 5-star review notification **pops in** with a blue glow; a tasteful **sparkle** on the star and the headline.
9. **AI Reporting** — the four weekly **bars grow left-to-right**; the three stats **count up** (~11 hrs, 92%, 6 jobs) and settle with a pop; soft glow around the stats.
10. **Closing CTA** — logo glow-in; **"Book a 15-minute demo call"** highlighted with a pulsing ring; the **Schedule Call** button **glows/pulses**; confident hold to the end.

## Limitations from flat slide images
- The slides are baked PNGs, so animations are **overlays positioned by coordinate**
  over the existing UI (not true vector re-animation). Count-ups and the bar-grow
  cover the baked values with a background-matched mask, then animate; coordinates
  were tuned per slide.
- No genuine 3D parallax between real UI layers (the image is flat) — depth is
  faked with Ken-Burns + drifting glow + vignette.
- If any slide's exported artwork changes position/size, the overlay coordinates in
  `src/scenes/overlays.tsx` need a small nudge.

## Recommended next improvements
- Re-export the slides as **layered/transparent assets** (phone, cards, bars as
  separate PNGs) → real parallax, true per-element motion, and count-ups without masks.
- Optional light **whoosh/click** SFX on transitions and notification pops (currently
  music + voiceover only; tasteful SFX bed can be added).
- A 9:16 vertical recut for social.
