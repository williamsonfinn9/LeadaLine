# LeadaLine — Pinned Brand / Intro Post

A single "who we are & what we do" card, designed to be **pinned at the top of the
Instagram profile** so new visitors instantly see the name, the promise and the
six things LeadaLine does.

Rendered in three aspect ratios so it works wherever it's used:

| File | Size | Best for |
|------|------|----------|
| `leadaline-brand-1x1.png`  | 1080×1080 | The pinned **grid tile** (square is how the profile grid crops it) |
| `leadaline-brand-4x5.png`  | 1080×1350 | Posting to the **feed** (tallest allowed feed ratio) |
| `leadaline-brand-9x16.png` | 1080×1920 | **Stories / Reels cover** |

`caption.md` — copy-paste caption for the post.

## Regenerate
```bash
python3 generate.py
```
Imports the shared brand styling (BASE/logo/fonts) from
`../leadaline-instagram-9x16/generate.py`, then renders each aspect and crops to
an exact size. Per-aspect fit is controlled by the `ASPECTS` map at the bottom of
`generate.py` (canvas height, hero scale, header overrides).
