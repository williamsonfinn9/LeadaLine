# -*- coding: utf-8 -*-
"""UK female voiceover (piper en_GB-cori-high) for the three reels:
synthesize per-beat segments, fit each into its beat window, mix over
ducked music + SFX, and encode the final audio tracks."""
import numpy as np, subprocess, os, wave, sys

S = "/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad"
sys.path.insert(0, S)
from reel_audio import SR, DUR, FF, place, write_wav, build_tracks

MODEL = f"{S}/piper/en_GB-cori-high.onnx"
VODIR = f"{S}/vo"
OUT = f"{S}/audio"
os.makedirs(VODIR, exist_ok=True)

# Per-reel VO segments: (start_sec, window_end_sec, text)
SCRIPTS = {
    "ReelMissedCall": [
        (0.5, 5.0,  "You're up a ladder. And the phone's ringing."),
        (5.6, 10.0, "Most callers won't leave a voicemail."),
        (10.2, 14.4, "They just ring the next electrician on Google."),
        (14.9, 21.5, "LeadaLine answers in one ring. Every call, web form and WhatsApp. Day and night."),
        (21.9, 26.2, "It captures the job, and sends the lead straight to your pocket."),
        (26.7, 30.6, "Never miss another call. Leada Line dot com."),
    ],
    "ReelQuietQuote": [
        (0.6, 5.0,  "You quoted fourteen hundred pounds on Tuesday."),
        (5.5, 10.8, "Then, nothing. And most firms only chase once."),
        (11.4, 18.8, "So LeadaLine chases it for you. Politely. Persistently. In your tone. Until you get an answer."),
        (19.4, 25.6, "That's fourteen hundred pounds you nearly lost."),
        (26.2, 30.6, "Stop losing quoted work. Leada Line dot com."),
    ],
    "ReelAfterHours": [
        (0.6, 5.4,  "Quarter to ten at night. Your office closed hours ago."),
        (5.8, 10.8, "Most firms will reply tomorrow. Some never do."),
        (11.4, 19.2, "Your AI answers in seconds. It qualifies the job, reassures the customer, and books the morning slot."),
        (19.8, 25.6, "So you wake up to booked work."),
        (26.2, 30.6, "Every enquiry. Day and night. Leada Line dot com."),
    ],
}

def synth(text, path):
    subprocess.run(
        ["python3", "-m", "piper", "--model", MODEL, "--output_file", path],
        input=text.encode(), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def load_resampled(path, tempo=1.0):
    """Load piper wav -> 48k float mono, optional tempo via ffmpeg atempo."""
    tmp = path.replace(".wav", ".48k.wav")
    af = f"atempo={tempo:.3f}," if abs(tempo - 1.0) > 0.005 else ""
    env = dict(os.environ, LD_LIBRARY_PATH=os.path.dirname(FF))
    subprocess.run([FF, "-y", "-i", path, "-af", f"{af}aresample={SR}", "-ac", "1", tmp],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True, env=env)
    w = wave.open(tmp)
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    w.close()
    return x

def wav_dur(path):
    w = wave.open(path); d = w.getnframes() / w.getframerate(); w.close(); return d

env = dict(os.environ, LD_LIBRARY_PATH=os.path.dirname(FF))
for name, segs in SCRIPTS.items():
    vo = np.zeros(int(SR * DUR))
    duck = np.ones(int(SR * DUR))
    for i, (at, wend, text) in enumerate(segs):
        raw = f"{VODIR}/{name}_{i}.wav"
        synth(text, raw)
        d = wav_dur(raw)
        window = wend - at
        # speed up slightly if the take overflows its window (cap 1.18x)
        tempo = min(1.18, max(1.0, d / window))
        x = load_resampled(raw, tempo)
        # normalize segment to consistent level
        peak = np.abs(x).max() + 1e-9
        x = x / peak * 0.85
        # micro fade edges
        f = int(0.012 * SR)
        x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f)
        place(vo, x, at)
        # duck window (with 0.25s ramps around the segment)
        a = max(0, int((at - 0.25) * SR)); b = min(len(duck), int((at + len(x) / SR + 0.25) * SR))
        r = int(0.25 * SR)
        seg = np.full(b - a, 0.38)
        seg[:r] = np.linspace(1, 0.38, r)
        seg[-r:] = np.linspace(0.38, 1, r)
        duck[a:b] = np.minimum(duck[a:b], seg)
        print(f"{name} seg{i}: {d:.2f}s -> window {window:.2f}s tempo {tempo:.2f}")
    music, sfx = build_tracks(name)
    mix = music * 0.7 * duck + sfx * 0.75 + vo * 1.0
    mix = np.tanh(mix * 1.2) * 0.92
    wavp = f"{OUT}/{name}_vo.wav"
    write_wav(wavp, mix)
    m4a = f"{OUT}/{name}_vo.m4a"
    subprocess.run([FF, "-y", "-i", wavp, "-c:a", "aac", "-b:a", "192k", "-f", "mp4", m4a],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True, env=env)
    print("mixed:", m4a, os.path.getsize(m4a))
print("VO MIX DONE")
