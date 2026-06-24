#!/usr/bin/env node
/**
 * narrate.js — Generate AI voiceover audio for Instagram Reels using ElevenLabs.
 *
 * Reads a manifest of reels (each with a narration script) and produces one MP3
 * voiceover per reel via the ElevenLabs text-to-speech API. The MP3s can then be
 * muxed onto the corresponding .mp4 reels with ffmpeg (see README.md).
 *
 * Auth: set ELEVENLABS_API_KEY in the environment (never commit the key).
 *
 * Usage:
 *   ELEVENLABS_API_KEY=xxx node narration/narrate.js                 # process reels.json
 *   ELEVENLABS_API_KEY=xxx node narration/narrate.js path/to.json    # custom manifest
 *   ELEVENLABS_API_KEY=xxx node narration/narrate.js --text "Hi" --out out.mp3
 *
 * Manifest format (reels.json):
 *   {
 *     "defaults": { "voiceId": "CwhRBWXzGAHq8TQ4Fs17", "modelId": "eleven_multilingual_v2" },
 *     "reels": [
 *       { "id": "reel-01", "scriptFile": "scripts/reel-01.txt" },
 *       { "id": "reel-02", "text": "Inline narration text...", "voiceId": "..." }
 *     ]
 *   }
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'https://api.elevenlabs.io/v1';
const HERE = __dirname;

// Sensible defaults — "Roger" is a premade conversational voice. Override per-reel
// or via the manifest's "defaults" block.
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'CwhRBWXzGAHq8TQ4Fs17';
const DEFAULT_MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
const DEFAULT_FORMAT = process.env.ELEVENLABS_OUTPUT_FORMAT || 'mp3_44100_128';

function getApiKey() {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    console.error('ERROR: ELEVENLABS_API_KEY is not set. Export it before running:');
    console.error('  export ELEVENLABS_API_KEY=your_key_here');
    process.exit(1);
  }
  return key;
}

async function synthesize({ text, voiceId, modelId, outputFormat, outPath }) {
  const apiKey = getApiKey();
  const url = `${API_BASE}/text-to-speech/${voiceId}?output_format=${encodeURIComponent(outputFormat)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`ElevenLabs API ${res.status} ${res.statusText}: ${detail}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

function resolveText(reel, manifestDir) {
  if (reel.text && reel.text.trim()) return reel.text.trim();
  if (reel.scriptFile) {
    const p = path.isAbsolute(reel.scriptFile) ? reel.scriptFile : path.join(manifestDir, reel.scriptFile);
    return fs.readFileSync(p, 'utf8').trim();
  }
  throw new Error(`Reel "${reel.id}" has neither "text" nor "scriptFile".`);
}

async function runManifest(manifestPath) {
  const manifestDir = path.dirname(manifestPath);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const defaults = manifest.defaults || {};
  const reels = manifest.reels || [];
  const outDir = path.join(manifestDir, manifest.outputDir || 'output');

  if (reels.length === 0) {
    console.warn('No reels found in manifest. Nothing to do.');
    return;
  }

  console.log(`Generating narration for ${reels.length} reel(s)...\n`);
  let ok = 0;
  for (const reel of reels) {
    const text = resolveText(reel, manifestDir);
    const voiceId = reel.voiceId || defaults.voiceId || DEFAULT_VOICE_ID;
    const modelId = reel.modelId || defaults.modelId || DEFAULT_MODEL_ID;
    const outputFormat = reel.outputFormat || defaults.outputFormat || DEFAULT_FORMAT;
    const outPath = reel.out
      ? (path.isAbsolute(reel.out) ? reel.out : path.join(manifestDir, reel.out))
      : path.join(outDir, `${reel.id}.mp3`);

    process.stdout.write(`  • ${reel.id} (${text.length} chars, voice ${voiceId}) ... `);
    try {
      const bytes = await synthesize({ text, voiceId, modelId, outputFormat, outPath });
      console.log(`ok → ${path.relative(process.cwd(), outPath)} (${(bytes / 1024).toFixed(1)} KB)`);
      ok++;
    } catch (err) {
      console.log('FAILED');
      console.error(`    ${err.message}`);
    }
  }
  console.log(`\nDone: ${ok}/${reels.length} narration tracks generated.`);
  if (ok < reels.length) process.exitCode = 1;
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--text') args.text = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--voice') args.voice = argv[++i];
    else if (a === '--model') args.model = argv[++i];
    else args._.push(a);
  }
  return args;
}

async function verify() {
  const apiKey = getApiKey();
  const res = await fetch(`${API_BASE}/user`, { headers: { 'xi-api-key': apiKey } });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Auth check failed: ${res.status} ${res.statusText}: ${detail}`);
  }
  const user = await res.json();
  const sub = user.subscription || {};
  console.log('ElevenLabs auth OK.');
  console.log(`  account:    ${user.first_name || '(unknown)'}`);
  console.log(`  tier:       ${sub.tier}`);
  console.log(`  characters: ${sub.character_count}/${sub.character_limit}`);
  if (sub.tier === 'free') {
    console.log('\n  NOTE: Free tier blocks TTS generation from proxy/VPN IPs');
    console.log('  (error "detected_unusual_activity"). Run from a non-proxied');
    console.log('  machine or upgrade to a paid plan to generate narration.');
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args._.includes('--verify')) {
    await verify();
    return;
  }

  if (args.text) {
    const outPath = path.resolve(args.out || path.join(HERE, 'output', 'narration.mp3'));
    const bytes = await synthesize({
      text: args.text,
      voiceId: args.voice || DEFAULT_VOICE_ID,
      modelId: args.model || DEFAULT_MODEL_ID,
      outputFormat: DEFAULT_FORMAT,
      outPath,
    });
    console.log(`ok → ${outPath} (${(bytes / 1024).toFixed(1)} KB)`);
    return;
  }

  const manifestPath = path.resolve(args._[0] || path.join(HERE, 'reels.json'));
  if (!fs.existsSync(manifestPath)) {
    console.error(`Manifest not found: ${manifestPath}`);
    process.exit(1);
  }
  await runManifest(manifestPath);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
