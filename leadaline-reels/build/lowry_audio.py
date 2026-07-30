# -*- coding: utf-8 -*-
"""Music bed, SFX and UK female VO for the Lowry Lighting Solutions demo (25s @30fps)."""
import numpy as np, subprocess, os, sys, wave

S = "/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad"
sys.path.insert(0, S)
import reel_audio as RA
from reel_audio import SR, FF, place, write_wav, note, chord, one_pole, N, sfx_whoosh, sfx_pop, sfx_tick, sfx_ding, sfx_success

DUR = 25.0
MODEL = f"{S}/piper/en_GB-cori-high.onnx"
VODIR = f"{S}/vo_lowry"
OUT = f"{S}/audio"
os.makedirs(VODIR, exist_ok=True)
ENV = dict(os.environ, LD_LIBRARY_PATH=os.path.dirname(FF))

def t_axis(dur):
    return np.arange(int(SR * dur)) / SR

# ---- music: confident, corporate, builds. Lowry indigo/purple = warm minor to major.
def bed():
    buf = np.zeros(int(SR * DUR))
    bpm = 100
    beat = 60 / bpm
    bar = beat * 4
    # A minor feel opening, resolving brighter from the "system" reveal onward
    dark = [('A3', 'C4', 'E4'), ('F3', 'A3', 'C4')]
    bright = [('C3', 'E3', 'G3', 'B3'), ('F3', 'A3', 'C4', 'E4'), ('G3', 'B3', 'D4'), ('A3', 'C4', 'E4', 'G4')]
    flip = 4.7
    tt, bi = 0.0, 0
    while tt < DUR - 0.3:
        d = tt < flip
        prog = dark if d else bright
        ch = prog[bi % len(prog)]
        place(buf, chord([N[x] for x in ch], bar * 1.05, amp=0.32 if d else 0.36, shape="saw", cutoff=780 if d else 1700), tt)
        bi += 1
        tt += bar
    # bass
    tt, k = 0.0, 0
    while tt < DUR - 0.2:
        d = tt < flip
        prog = dark if d else bright
        root = prog[(int(tt // bar)) % len(prog)][0]
        place(buf, note(N[root] / 2, beat * 0.46, amp=0.30 if d else 0.36, attack=0.004, release=0.12), tt)
        k += 1
        tt += beat / 2
    # shimmer after flip
    t = t_axis(DUR)
    mask = np.clip((t - flip) / 2.5, 0, 1)
    sh = (np.sin(2 * np.pi * N['E5'] * t) * 0.5 + np.sin(2 * np.pi * N['G5'] * t + 1.1) * 0.4) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.22 * t))
    buf += one_pole(sh, 2500) * 0.05 * mask
    # pump + fades
    buf *= 1 - 0.15 * (np.sin(2 * np.pi * (1 / beat) * t * 0.5) * 0.5 + 0.5)
    fade = np.ones(len(buf))
    fade[: int(0.4 * SR)] = np.linspace(0, 1, int(0.4 * SR))
    fade[-int(1.5 * SR):] = np.linspace(1, 0, int(1.5 * SR))
    return buf * fade

SFX = [
    ("whoosh", 4.55),   # into director's view
    ("pop", 4.9),
    ("tick", 5.6), ("tick", 6.1), ("tick", 6.6),   # KPI tiles
    ("whoosh", 9.75),   # into jobs
    ("tick", 10.4), ("tick", 10.9), ("tick", 11.4),
    ("whoosh", 14.1),   # into whatsapp
    ("pop", 14.9), ("pop", 16.2),
    ("whoosh", 18.6),   # into "we run it"
    ("ding", 19.2),
    ("whoosh", 21.4),   # into price
    ("pop", 21.9), ("pop", 22.5),
    ("success", 23.3),  # CTA
]
FN = {"whoosh": sfx_whoosh, "pop": sfx_pop, "tick": sfx_tick, "ding": sfx_ding, "success": sfx_success}

# ---- voiceover
SCRIPT = [
    (0.5, 4.4,  "The work stops at five. The admin does not."),
    (5.1, 9.6,  "So this is your whole business, live, in one view."),
    (10.2, 13.9, "Every job and visit, already scheduled."),
    (14.6, 18.4, "Engineers message from site, and it writes itself in."),
    (19.0, 21.2, "We answer the phone. We do the admin."),
    (21.6, 24.6, "Two thousand to set up. One thousand a month."),
]

def synth(text, path):
    subprocess.run(["python3", "-m", "piper", "--model", MODEL, "--output_file", path],
                   input=text.encode(), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def load(path, tempo=1.0):
    tmp = path.replace(".wav", ".48k.wav")
    af = f"atempo={tempo:.3f}," if abs(tempo - 1) > 0.005 else ""
    subprocess.run([FF, "-y", "-i", path, "-af", f"{af}aresample={SR}", "-ac", "1", tmp],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True, env=ENV)
    w = wave.open(tmp)
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    w.close()
    return x

def wdur(p):
    w = wave.open(p); d = w.getnframes() / w.getframerate(); w.close(); return d

vo = np.zeros(int(SR * DUR))
duck = np.ones(int(SR * DUR))
for i, (at, wend, text) in enumerate(SCRIPT):
    raw = f"{VODIR}/{i}.wav"
    synth(text, raw)
    d = wdur(raw)
    win = wend - at
    tempo = min(1.16, max(1.0, d / win))
    x = load(raw, tempo)
    x = x / (np.abs(x).max() + 1e-9) * 0.85
    f = int(0.012 * SR)
    x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f)
    place(vo, x, at)
    a = max(0, int((at - 0.25) * SR)); b = min(len(duck), int((at + len(x) / SR + 0.25) * SR))
    r = int(0.25 * SR)
    seg = np.full(b - a, 0.36)
    seg[:r] = np.linspace(1, 0.36, r); seg[-r:] = np.linspace(0.36, 1, r)
    duck[a:b] = np.minimum(duck[a:b], seg)
    print(f"seg{i}: {d:.2f}s -> {win:.2f}s window, tempo {tempo:.2f}")

music = bed()
sfx = np.zeros(int(SR * DUR))
for kind, at in SFX:
    place(sfx, FN[kind](), at)

mix = music * 0.66 * duck + sfx * 0.7 + vo * 1.0
mix = np.tanh(mix * 1.2) * 0.92
wavp = f"{OUT}/LowryDemo.wav"
write_wav(wavp, mix)
m4a = f"{OUT}/LowryDemo.m4a"
subprocess.run([FF, "-y", "-i", wavp, "-c:a", "aac", "-b:a", "192k", "-f", "mp4", m4a],
               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True, env=ENV)
print("audio:", m4a, os.path.getsize(m4a))
