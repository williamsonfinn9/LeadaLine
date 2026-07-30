# LeadaLine — Instagram 9:16 Carousel

Vertical **1080×1920** versions of the 10-slide "AI Office Team" deck, re-composed
for portrait so they post cleanly as an Instagram carousel / story set.

Rather than crop the 16:9 slides (their backgrounds vary per slide, so a crop would
seam), each post is rebuilt natively in portrait — headline up top, the phone /
widget large below — on the LeadaLine brand background, with real logo, Manrope +
Space Grotesk type, and page numbers (02/10 … 09/10).

## Files
- `leadaline-ig-01.png` … `leadaline-ig-10.png` — the posts, in carousel order.

| # | Post |
|---|------|
| 01 | Meet your AI Office Team (six teammates) |
| 02 | AI Receptionist — answers every enquiry |
| 03 | AI Sales — scored & scoped lead |
| 04 | Owner Summary — the lead in your pocket |
| 05 | CRM Tracking — every lead in one place |
| 06 | AI Booking — books the next step |
| 07 | AI Follow-Up — quiet quotes get chased |
| 08 | AI Review — every install → a 5-star review |
| 09 | AI Reporting — you see what it brings in |
| 10 | CTA — book a demo call |

## Regenerate
```bash
python3 generate.py
```
Renders each post via headless Chromium at 1080×2010 and crops to a pixel-exact
1080×1920 (headless paints ~84px short of the window height). Fonts are bundled in
`fonts/`; the logo is read from `../leadaline-slides-demo/public/logo.png`.
