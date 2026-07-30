# LeadaLine — Instagram Reels (9:16 motion graphics)

Premium SaaS-style vertical reels (1080×1920) built with **HyperFrames** (HTML/CSS/GSAP),
rendered locally with headless Chrome + FFmpeg. No humans, characters, or stock footage —
pure kinetic typography + glowing UI on the LeadaLine dark-navy brand.

## Contents

```
leadaline-reels/
├── reels/<reel>/            ← self-contained, directly renderable
│   ├── index.html           ← the composition (edit this to tweak a reel)
│   ├── hyperframes.json
│   ├── fonts/               ← DM Sans, DM Mono, Archivo (woff2, vendored)
│   ├── gsap.min.js          ← vendored (CDN is blocked by egress policy)
│   └── sfx_master.wav       ← synthesized sound design for this reel
├── renders/                 ← final delivered MP4s (silent VO slot, SFX baked)
└── build/                   ← bulk generator (regenerate all reels from data)
    ├── reels_data.py        ← per-reel content + timeline (source of truth for 2–10)
    ├── build_reels.py       ← writes index.html + sfx for each reel
    └── sfxlib.py            ← numpy SFX synthesis (buzz/whoosh/transfer/capture/chime)
```

Reel 01 is hand-authored (`reels/leadaline-reel-01-missed-call/index.html`).
Reels 02–10 are generated from `build/reels_data.py`.

## Brand system (locked)

- **Backgrounds:** `#050B1A` `#0A1628` `#0F1F36` (navy radial)
- **Accents:** cyan `#18D7FF`, blue `#2563FF`, violet `#7C5CFF`
- **Gradient:** `135deg #18D7FF → #2563FF → #7C5CFF`
- **Text:** white `#F8FAFC`, slate `#94A3B8`
- **Fonts:** Archivo 900 (headlines), DM Sans (body), DM Mono (labels/figures)
- **Motion:** warning-hit hook → snap headline → light sweep → glass cards / transfer beams → bright logo finish (~8s)

## Render a single reel

Requires Node ≥ 22, FFmpeg, and Chrome headless (`npx hyperframes browser ensure`).

```bash
cd reels/leadaline-reel-05-after-hours
npx hyperframes lint
npx hyperframes render --output renders/video.mp4 --quality high --fps 30
# mux the sound design:
ffmpeg -y -i renders/video.mp4 -i sfx_master.wav -c:v copy -c:a aac -b:a 192k -shortest final.mp4
```

## Regenerate all reels (after editing build/reels_data.py)

`build_reels.py` writes into an OpenMontage `projects/` tree by default; point it at this
folder by editing `ROOT`/`SRC_HF` at the top, or copy the generated `index.html` back into
the matching `reels/<reel>/` dir. Each reel dir is otherwise self-contained.

## Adding the UK voiceover (next step)

VO is **not yet baked in**. Plan: calm/premium **UK female** ElevenLabs voice.

1. Add `api.elevenlabs.io` to the environment's **network egress allowlist** and set
   `ELEVENLABS_API_KEY` (a key alone won't work — the host is blocked by policy).
2. Generate VO per reel (ElevenLabs TTS), measure its duration.
3. Retime the GSAP timeline holds to the VO, add an `<audio>` VO track (or mux post-render),
   duck the SFX/music under the voice.

The reels currently run ~8s with SFX mixed at ≈ −9 dBFS, leaving headroom for music + VO.

## Notes

- Music + SFX: SFX are synthesized (`sfxlib.py`); music is added manually by LeadaLine.
- All copy is English, verbatim from the approved poster designs (incl. demo CTA
  `DM 'DEMO'` and phone `07484 657654`). Nothing invented or translated.
- Logo mark is a faithful CSS/SVG rebuild of the LeadaLine gradient "L" + wordmark
  (swap in the official asset when available for pixel-exact branding).
