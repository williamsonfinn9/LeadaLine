# Reel Narration (ElevenLabs)

AI voiceover generation for LeadaLine Instagram Reels using the ElevenLabs
text-to-speech API.

The tool reads a manifest of reels (each with a narration script), calls
ElevenLabs, and writes one MP3 voiceover per reel into `output/`. You then mux
each MP3 onto its `.mp4` reel with ffmpeg (below).

## Setup

Requires Node 18+ (uses the built-in `fetch`). No npm install needed.

Set your API key in the environment — **never commit it**:

```bash
export ELEVENLABS_API_KEY=your_key_here
```

## Verify the key

Confirms auth and prints account/tier/usage. Spends zero characters:

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
    "voiceId": "CwhRBWXzGAHq8TQ4Fs17",      // "Roger" — premade conversational voice
    "modelId": "eleven_multilingual_v2",
    "outputFormat": "mp3_44100_128"
  },
  "outputDir": "output",
  "reels": [
    { "id": "reel-01", "scriptFile": "scripts/reel-01.txt" },   // script from a file
    { "id": "reel-02", "text": "Inline narration text" }        // or inline
  ]
}
```

Per-reel `voiceId` / `modelId` / `out` override the defaults. List your
account's voices with:

```bash
curl -s https://api.elevenlabs.io/v1/voices -H "xi-api-key: $ELEVENLABS_API_KEY"
```

## Muxing the voiceover onto a reel (ffmpeg)

`narrate.js` produces audio only. To lay the voiceover over a video reel:

```bash
# Replace the reel's audio with the generated narration
ffmpeg -i reel-01.mp4 -i output/reel-01.mp3 \
  -map 0:v -map 1:a -c:v copy -c:a aac -shortest reel-01-narrated.mp4

# Or mix narration over the reel's existing audio (e.g. background music)
ffmpeg -i reel-01.mp4 -i output/reel-01.mp3 \
  -filter_complex "[0:a][1:a]amix=inputs=2:duration=shortest[a]" \
  -map 0:v -map "[a]" -c:v copy reel-01-narrated.mp4
```

## Known limitation: free tier + proxy

On a **free** ElevenLabs tier, TTS generation fails from proxy/VPN IP addresses
with:

```
401 detected_unusual_activity — Free Tier access has been disabled.
```

The key and read endpoints still work; only generation is blocked. Run the
script from a **non-proxied machine**, or upgrade to a **paid** plan. (This
matters for cloud/CI environments that route through a proxy.)
