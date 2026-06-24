# Reel Narration (OpenAI TTS)

AI voiceover generation for LeadaLine Instagram Reels using the OpenAI
text-to-speech API (`gpt-4o-mini-tts`).

The tool reads a manifest of reels (each with a narration script), calls OpenAI,
and writes one audio file per reel into `output/`. You then mix each track
**underneath** its `.mp4` reel with ffmpeg, with the background music ducked
behind the voice (below).

**Voice direction:** confident UK British business voice, premium SaaS-advert
feel — clear, sharp, calm, not cheesy, not robotic. "LeadaLine" is always spoken
as **"Leader Line"** (handled automatically by a pronunciation map in
`narrate.js`, so script files keep the normal brand spelling).

## Setup

Requires Node 18+ (uses the built-in `fetch`). No npm install needed.

Set your API key in the environment — **never commit it**:

```bash
export OPENAI_API_KEY=sk-...
```

## Verify the key

```bash
node narrate.js --verify
```

## Generate narration

Single line of text:

```bash
node narrate.js --text "Your narration here" --out output/test.mp3
```

Batch from the manifest (`reels.json`):

```bash
node narrate.js            # uses reels.json in this folder
node narrate.js my.json    # custom manifest
```

### Manifest format (`reels.json`)

```jsonc
{
  "defaults": {
    "voice": "ash",                 // OpenAI voice (ash/onyx = confident male; sage/ballad also good)
    "model": "gpt-4o-mini-tts",
    "format": "mp3",                // mp3 | wav | opus | aac | flac
    "instructions": "Confident UK British business voiceover ..."
  },
  "outputDir": "output",
  "reels": [
    { "id": "reel-01", "scriptFile": "scripts/reel-01.txt" },   // script from a file
    { "id": "reel-02", "text": "Inline narration text" }        // or inline
  ]
}
```

Per-reel `voice` / `model` / `format` / `instructions` / `out` override the
defaults. OpenAI voices to try for a UK business read: `ash`, `onyx`, `sage`,
`ballad`, `verse`.

## Mixing the voiceover under a reel (ffmpeg)

`narrate.js` produces audio only. To lay the voiceover over a video reel with
the original music ducked behind the voice:

```bash
ffmpeg -i reel-01.mp4 -i output/reel-01.mp3 \
  -filter_complex "[1:a]adelay=450|450,volume=2.0[vo];[0:a]volume=0.3[bg];[bg][vo]amix=inputs=2:duration=first:dropout_transition=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest reel-01-narrated.mp4
```

- `adelay=450|450` starts the voice ~0.45s in (after the headline lands).
- `[0:a]volume=0.3` ducks the original music to 30% behind the voice.
- `[1:a]volume=2.0` lifts the voiceover so it sits clearly on top.

Tune the delay/volumes per reel to taste.
