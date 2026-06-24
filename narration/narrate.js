#!/usr/bin/env node
/**
 * narrate.js — Generate AI voiceover audio for LeadaLine reels using OpenAI TTS.
 *
 * Reads a manifest of reels (each with a narration script) and produces one
 * audio file per reel via the OpenAI text-to-speech API (model gpt-4o-mini-tts,
 * which supports steerable voice "instructions"). The audio can then be mixed
 * underneath each .mp4 reel with ffmpeg, background music ducked (see README.md).
 *
 * Voice direction: a confident UK business voice with a premium SaaS-advert feel
 * — clear, sharp, calm, never cheesy or robotic. "LeadaLine" is always spoken as
 * "Leader Line" (handled automatically via the pronunciation map below).
 *
 * Auth: set OPENAI_API_KEY in the environment (never commit the key).
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node narration/narrate.js                 # process reels.json
 *   OPENAI_API_KEY=sk-... node narration/narrate.js path/to.json    # custom manifest
 *   OPENAI_API_KEY=sk-... node narration/narrate.js --text "Hi" --out out.mp3
 *   OPENAI_API_KEY=sk-... node narration/narrate.js --verify        # auth check
 */

const fs = require('fs');
const path = require('path');

const API_URL = 'https://api.openai.com/v1/audio/speech';
const HERE = __dirname;

// Defaults — overridable per-reel, via the manifest "defaults" block, or env vars.
const DEFAULT_VOICE = process.env.OPENAI_TTS_VOICE || 'ash';
const DEFAULT_MODEL = process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts';
const DEFAULT_FORMAT = process.env.OPENAI_TTS_FORMAT || 'mp3'; // mp3 | wav | opus | aac | flac | pcm
const DEFAULT_INSTRUCTIONS =
  'Confident UK British business voiceover for a premium SaaS advert. ' +
  'Received Pronunciation (UK English) accent. Clear, sharp, calm and composed, ' +
  'with quiet authority. Measured, unhurried pace and natural emphasis. ' +
  'Polished and trustworthy — never cheesy, never salesy, never robotic.';

// Brand pronunciation: "LeadaLine" must be spoken as "Leader Line".
function applyPronunciation(text) {
  return text.replace(/lead[\s-]?a[\s-]?line/gi, 'Leader Line');
}

function getApiKey() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.error('ERROR: OPENAI_API_KEY is not set. Export it before running:');
    console.error('  export OPENAI_API_KEY=sk-...');
    process.exit(1);
  }
  return key;
}

async function synthesize({ text, voice, model, format, instructions, outPath }) {
  const apiKey = getApiKey();
  const spoken = applyPronunciation(text);

  const body = { model, input: spoken, voice, response_format: format };
  // The "instructions" field steers tone/accent and is supported by gpt-4o-mini-tts.
  if (instructions && /gpt-4o/.test(model)) body.instructions = instructions;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`OpenAI TTS ${res.status} ${res.statusText}: ${detail}`);
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
    const voice = reel.voice || defaults.voice || DEFAULT_VOICE;
    const model = reel.model || defaults.model || DEFAULT_MODEL;
    const format = reel.format || defaults.format || DEFAULT_FORMAT;
    const instructions = reel.instructions || defaults.instructions || DEFAULT_INSTRUCTIONS;
    const ext = format === 'pcm' ? 'pcm' : format;
    const outPath = reel.out
      ? (path.isAbsolute(reel.out) ? reel.out : path.join(manifestDir, reel.out))
      : path.join(outDir, `${reel.id}.${ext}`);

    process.stdout.write(`  • ${reel.id} (${text.length} chars, voice ${voice}) ... `);
    try {
      const bytes = await synthesize({ text, voice, model, format, instructions, outPath });
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

async function verify() {
  const apiKey = getApiKey();
  const res = await fetch('https://api.openai.com/v1/models', {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Auth check failed: ${res.status} ${res.statusText}: ${detail}`);
  }
  const data = await res.json();
  const hasTts = (data.data || []).some((m) => /gpt-4o-mini-tts|tts-1/.test(m.id));
  console.log('OpenAI auth OK.');
  console.log(`  models visible: ${(data.data || []).length}`);
  console.log(`  TTS model available: ${hasTts ? 'yes' : 'not listed (may still work)'}`);
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

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args._.includes('--verify')) {
    await verify();
    return;
  }

  if (args.text) {
    const format = DEFAULT_FORMAT;
    const outPath = path.resolve(args.out || path.join(HERE, 'output', `narration.${format}`));
    const bytes = await synthesize({
      text: args.text,
      voice: args.voice || DEFAULT_VOICE,
      model: args.model || DEFAULT_MODEL,
      format,
      instructions: DEFAULT_INSTRUCTIONS,
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
