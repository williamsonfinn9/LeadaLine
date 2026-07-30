# -*- coding: utf-8 -*-
"""Synthesized music beds + SFX for the three LeadaLine reels (31s each @30fps)."""
import numpy as np, subprocess, os

SR = 48000
DUR = 31.0
FF = "/home/user/LeadaLine/leadaline-remotion/node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
OUT = "/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad/audio"
os.makedirs(OUT, exist_ok=True)

def t_axis(dur=DUR):
    return np.arange(int(SR * dur)) / SR

def note(freq, dur, amp=1.0, attack=0.02, release=0.3, shape="sine", detune=0.0):
    t = t_axis(dur)
    if shape == "sine":
        w = np.sin(2 * np.pi * freq * t)
        if detune:
            w = 0.6 * w + 0.4 * np.sin(2 * np.pi * freq * (1 + detune) * t)
    elif shape == "saw":
        w = 2 * ((freq * t) % 1) - 1
        w = np.tanh(1.5 * w)
    elif shape == "tri":
        w = 2 * np.abs(2 * ((freq * t) % 1) - 1) - 1
    n = len(t)
    env = np.ones(n)
    a = int(attack * SR); r = int(release * SR)
    if a > 0: env[:a] = np.linspace(0, 1, a)
    if r > 0 and r < n: env[-r:] *= np.linspace(1, 0, r)
    return w * env * amp

def place(buf, sig, at):
    i = int(at * SR)
    j = min(len(buf), i + len(sig))
    if i < len(buf):
        buf[i:j] += sig[: j - i]

def lowpass(x, alpha):
    y = np.empty_like(x); acc = 0.0
    for k in range(len(x)):
        acc += alpha * (x[k] - acc); y[k] = acc
    return y

def one_pole(x, cutoff):
    alpha = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    # to keep this fast, decimate the loop with numpy trick: use scipy-like recursive filter via lfilter equivalent
    # simple loop is too slow for 1.5M samples in pure python; use cumulative trick:
    # y[n] = alpha*x[n] + (1-alpha)*y[n-1]  ->  IIR; approximate with FFT lowpass instead
    X = np.fft.rfft(x)
    freqs = np.fft.rfftfreq(len(x), 1 / SR)
    H = 1 / np.sqrt(1 + (freqs / cutoff) ** 2)
    return np.fft.irfft(X * H, n=len(x))

def noise(dur):
    return np.random.default_rng(7).standard_normal(int(SR * dur))

# ---------------- SFX ----------------
def sfx_ring_buzz(dur=0.55):
    """Phone vibration buzz."""
    t = t_axis(dur)
    car = np.sin(2 * np.pi * 180 * t) * (0.55 + 0.45 * np.sin(2 * np.pi * 28 * t))
    env = np.minimum(1, t / 0.01) * np.exp(-t * 2.2)
    return car * env * 0.5

def sfx_whoosh(dur=0.6, rise=True):
    n = noise(dur)
    x = one_pole(n, 1200)
    t = t_axis(dur)
    env = np.sin(np.pi * np.minimum(t / dur, 1)) ** 2
    sweep = np.exp((t / dur) * (2.2 if rise else -2.2))
    return x * env * sweep * 0.16

def sfx_pop(freq=520, dur=0.16):
    t = t_axis(dur)
    w = np.sin(2 * np.pi * freq * t * (1 + 0.4 * np.exp(-t * 30)))
    return w * np.exp(-t * 26) * 0.5

def sfx_tick(dur=0.06):
    n = noise(dur)
    return one_pole(n, 5000) * np.exp(-t_axis(dur) * 90) * 0.5

def sfx_ding(freq=1244, dur=0.9):
    t = t_axis(dur)
    w = np.sin(2 * np.pi * freq * t) + 0.4 * np.sin(2 * np.pi * freq * 2.01 * t)
    return w * np.exp(-t * 5.5) * 0.32

def sfx_thud(dur=0.4):
    t = t_axis(dur)
    w = np.sin(2 * np.pi * 78 * t * (1 - 0.35 * t))
    return w * np.exp(-t * 12) * 0.75

def sfx_success(dur=1.0):
    """Two-note rising chime."""
    s = np.zeros(int(SR * dur))
    place(s, sfx_ding(932, 0.5) * 0.8, 0.0)
    place(s, sfx_ding(1244, 0.7) * 0.9, 0.14)
    return s

# ---------------- music ----------------
def chord(freqs, dur, amp=0.5, shape="sine", cutoff=None, detune=0.004):
    out = np.zeros(int(SR * dur))
    for f in freqs:
        out += note(f, dur, amp / len(freqs), attack=0.4, release=min(1.2, dur * 0.5), shape=shape, detune=detune)
    if cutoff:
        out = one_pole(out, cutoff)
    return out

N = {  # note frequencies
    'C2': 65.41, 'D2': 73.42, 'Eb2': 77.78, 'F2': 87.31, 'G2': 98.0, 'Ab2': 103.83, 'Bb2': 116.54,
    'C3': 130.81, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'G3': 196.0, 'Ab3': 207.65, 'A3': 220.0, 'Bb3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'G4': 392.0, 'Ab4': 415.3, 'A4': 440.0, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.26, 'G5': 783.99,
}

def bed(progression, flip_at, bpm=96, dark_gain=0.9, bright_gain=1.0):
    """A pulsing synth bed: dark minimal until flip_at, brighter/warmer after."""
    buf = np.zeros(int(SR * DUR))
    beat = 60 / bpm
    bar = beat * 4
    # pads: one chord per bar, cycling progression
    tt = 0.0; bi = 0
    while tt < DUR - 0.3:
        dark = tt < flip_at
        prog = progression['dark'] if dark else progression['bright']
        ch = prog[bi % len(prog)]
        g = dark_gain if dark else bright_gain
        cut = 700 if dark else 1600
        place(buf, chord([N[x] for x in ch], bar * 1.05, amp=0.34 * g, shape="saw", cutoff=cut), tt)
        bi += 1
        tt += bar
    # bass pulse on eighth notes
    tt = 0.0; k = 0
    while tt < DUR - 0.2:
        dark = tt < flip_at
        prog = progression['dark'] if dark else progression['bright']
        root = prog[(int(tt // bar)) % len(prog)][0]
        f = N[root] / 2
        if k % 2 == 0 or not dark:
            place(buf, note(f, beat * 0.48, amp=0.30 if dark else 0.36, attack=0.004, release=0.12, shape="sine"), tt)
        k += 1
        tt += beat / 2
    # airy shimmer after flip
    t = t_axis()
    mask = np.clip((t - flip_at) / 2.5, 0, 1)
    shimmer = (np.sin(2 * np.pi * N['E5'] * t) * 0.5 + np.sin(2 * np.pi * N['G5'] * t + 1.2) * 0.4) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.25 * t))
    buf += one_pole(shimmer, 2500) * 0.05 * mask
    # gentle sidechain-ish pump
    pump = 1 - 0.16 * (np.sin(2 * np.pi * (1 / beat) * t * 0.5) * 0.5 + 0.5)
    buf *= pump
    # ending fade
    fade = np.ones(len(buf))
    fout = int(1.6 * SR)
    fade[-fout:] = np.linspace(1, 0, fout)
    fin = int(0.4 * SR)
    fade[:fin] = np.linspace(0, 1, fin)
    return buf * fade

# per-reel definitions -----------------------------------------------------
REELS = {
    "ReelMissedCall": {
        "prog": {"dark": [('C3', 'Eb3', 'G3'), ('Ab2', 'C3', 'Eb3')],
                 "bright": [('C3', 'E3', 'G3', 'B3'), ('F3', 'A3', 'C4', 'E4'), ('G3', 'B3', 'D4'), ('A3', 'C4', 'E4', 'G4')]},
        "flip": 14.5, "bpm": 96,
        "sfx": [
            ("ring", 0.6), ("ring", 1.7), ("ring", 2.8), ("ring", 3.9),
            ("thud", 5.1),                       # missed call
            ("tick", 10.9), ("tick", 11.4), ("tick", 11.9),   # search rows
            ("whoosh", 14.4),                    # flip
            ("pop", 15.2),                       # AI answers
            ("tick", 16.2), ("tick", 17.2), ("tick", 18.2),   # chips
            ("ding", 22.6),                      # lead lands
            ("whoosh", 26.3), ("success", 27.6),  # end card
        ],
    },
    "ReelQuietQuote": {
        "prog": {"dark": [('D3', 'F3', 'A3'), ('Bb2', 'D3', 'F3')],
                 "bright": [('D3', 'F3', 'A3', 'C4'), ('G3', 'Bb3', 'D4'), ('Bb2', 'D3', 'F3', 'A3'), ('C3', 'E3', 'G3')]},
        "flip": 11.0, "bpm": 92,
        "sfx": [
            ("pop", 0.9),                        # quote sent
            ("tick", 5.9), ("tick", 6.8), ("tick", 7.7), ("tick", 8.6),  # days tick
            ("whoosh", 10.9),                    # flip
            ("pop", 11.7), ("pop", 13.8),        # nudges
            ("ding", 16.4),                      # customer replies yes
            ("success", 21.1),                   # WON flip
            ("whoosh", 25.9), ("success", 27.4),  # end card
        ],
    },
    "ReelAfterHours": {
        "prog": {"dark": [('A3', 'C4', 'E4'), ('F3', 'A3', 'C4')],
                 "bright": [('A3', 'C4', 'E4'), ('F3', 'A3', 'C4', 'E4'), ('C3', 'E3', 'G3'), ('G3', 'B3', 'D4')]},
        "flip": 11.0, "bpm": 88,
        "sfx": [
            ("pop", 1.9),                        # enquiry arrives
            ("tick", 7.1), ("tick", 7.8), ("tick", 8.5),  # closed rows
            ("whoosh", 10.9),                    # flip
            ("pop", 11.5), ("pop", 13.4), ("pop", 15.6), ("pop", 17.4),  # thread
            ("ding", 20.4),                      # morning notify 1
            ("ding", 21.7),                      # morning notify 2 (diary)
            ("whoosh", 25.9), ("success", 27.4),  # end card
        ],
    },
}

SFX_FN = {
    "ring": sfx_ring_buzz, "whoosh": sfx_whoosh, "pop": sfx_pop,
    "tick": sfx_tick, "ding": sfx_ding, "thud": sfx_thud, "success": sfx_success,
}

def write_wav(path, x):
    x = np.clip(x, -1, 1)
    pcm = (x * 32767).astype(np.int16)
    import wave
    w = wave.open(path, "wb")
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(pcm.tobytes()); w.close()

def build_tracks(name):
    """Return (music, sfx) stems for a reel, un-mixed."""
    cfg = REELS[name]
    music = bed({"dark": cfg["prog"]["dark"], "bright": cfg["prog"]["bright"]}, cfg["flip"], bpm=cfg["bpm"])
    sfx = np.zeros(int(SR * DUR))
    for kind, at in cfg["sfx"]:
        place(sfx, SFX_FN[kind](), at)
    return music, sfx

if __name__ == "__main__":
    for name in REELS:
        music, sfx = build_tracks(name)
        mix = music * 0.7 + sfx * 0.9
        mix = np.tanh(mix * 1.25) * 0.92
        wav = os.path.join(OUT, f"{name}.wav")
        write_wav(wav, mix)
        m4a = os.path.join(OUT, f"{name}.m4a")
        subprocess.run([FF, "-y", "-i", wav, "-c:a", "aac", "-b:a", "192k", "-f", "mp4", m4a],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        print("audio:", name, os.path.getsize(m4a))
    print("AUDIO DONE")
