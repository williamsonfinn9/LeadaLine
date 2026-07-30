# LeadaLine — Instagram 4:5 Carousel

**4:5 (1080×1350)** versions of the 10-slide "AI Office Team" carousel — the
aspect ratio that takes up the most vertical space in the Instagram feed.

Same content as the 9:16 set (`../leadaline-instagram-9x16`), re-fitted for the
shorter canvas: each slide's phone/widget is scaled to sit comfortably between a
compacted header and the footer.

## Files
- `leadaline-ig-4x5-01.png` … `leadaline-ig-4x5-10.png` — the posts, in carousel order.
- `captions.md` — a bespoke, value-led caption for every post (UK trades audience).

## Regenerate
```bash
python3 generate.py
```
Imports the shared slide content from `../leadaline-instagram-9x16/generate.py`,
applies the 4:5 layout overrides, renders each post via headless Chromium at
1080×1434 and crops to a pixel-exact 1080×1350.

Per-slide fit is controlled by the `K` (hero scale) and `TY` (upward nudge for the
phone+chips slides) maps at the top of `generate.py`.
