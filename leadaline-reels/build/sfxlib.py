import numpy as np, wave
SR=48000
def _env(n,tau): t=np.arange(n)/SR; return np.exp(-t/tau)
def _fade(s,fi=0.005,fo=0.02):
    n=len(s); a=int(fi*SR); b=int(fo*SR)
    if a>0: s[:a]*=np.linspace(0,1,a)
    if b>0: s[-b:]*=np.linspace(1,0,b)
    return s
def _tone(f,d,k='sine'):
    t=np.arange(int(d*SR))/SR
    return np.sign(np.sin(2*np.pi*f*t)) if k=='square' else np.sin(2*np.pi*f*t)
def _noise(d): return np.random.uniform(-1,1,int(d*SR))
def _lp(x,c):
    a=np.exp(-2*np.pi*c/SR); y=np.zeros_like(x); p=0.0
    for i in range(len(x)): p=(1-a)*x[i]+a*p; y[i]=p
    return y
def _hp(x,c): return x-_lp(x,c)

def buzz():
    seg=[]
    for _ in range(2):
        d=0.085; b=0.6*_tone(82,d,'square')+0.4*_tone(123,d)
        b=_lp(b,900); tr=0.5+0.5*np.sin(2*np.pi*58*np.arange(len(b))/SR)
        seg.append(_fade(b*tr*_env(len(b),0.07),0.004,0.02)); seg.append(np.zeros(int(0.045*SR)))
    return np.concatenate(seg)*0.5
def whoosh(d=0.32):
    nz=_hp(_lp(_noise(d),4200),500); t=np.linspace(0,1,len(nz))
    return _fade(nz*np.sin(np.pi*np.clip(t,0,1))**1.5,0.01,0.04)*0.32
def transfer(d=0.45):
    t=np.arange(int(d*SR))/SR; f=400*(4.0**(t/d))
    sw=np.sin(2*np.pi*np.cumsum(f)/SR); nz=_hp(_noise(d),1200)*0.4
    return _fade((0.7*sw+nz)*np.sin(np.pi*np.clip(t/d,0,1))**1.2,0.008,0.05)*0.3
def capture():
    seg=[]
    for f in (1180,1560):
        d=0.055; seg.append(_fade(_tone(f,d)*_env(int(d*SR),0.018),0.002,0.01)); seg.append(np.zeros(int(0.012*SR)))
    return np.concatenate(seg)*0.34
def tick():
    d=0.05; return _fade((_tone(1900,d)*0.6+_hp(_noise(d),3000)*0.3)*_env(int(d*SR),0.012),0.001,0.012)*0.3
def pop():
    d=0.07; return _fade((_tone(660,d)*0.5+_tone(990,d)*0.3)*_env(int(d*SR),0.03),0.002,0.02)*0.3
def chime():
    notes=[(659.25,0.0),(830.61,0.10),(987.77,0.20),(1318.51,0.32)]
    tot=int(1.5*SR); out=np.zeros(tot)
    for f,off in notes:
        d=1.2; s=(0.7*_tone(f,d)+0.3*_tone(2*f,d))*_env(int(d*SR),0.35)
        i=int(off*SR); n=min(len(s),tot-i); out[i:i+n]+=s[:n]
    rev=out.copy()
    for dl,g in [(0.045,0.4),(0.09,0.25),(0.16,0.15)]:
        d=int(dl*SR); rev=rev+g*np.concatenate([np.zeros(d),out])[:len(rev)]
    out=out*0.7+rev*0.3; out=out/(np.max(np.abs(out))+1e-9)
    return _fade(out,0.005,0.25)*0.34

GEN={'buzz':buzz,'whoosh':whoosh,'transfer':transfer,'capture':capture,'tick':tick,'pop':pop,'chime':chime}

def build_master(cues, dur, outpath):
    """cues: list of (name, time[, dur]). writes 48k stereo wav."""
    master=np.zeros(int(dur*SR))
    for c in cues:
        name=c[0]; t=c[1]
        sig=GEN[name](c[2]) if len(c)>2 and name in ('whoosh','transfer') else GEN[name]()
        i=int(t*SR); n=min(len(sig),len(master)-i)
        if n>0: master[i:i+n]+=sig[:n]
    pk=np.max(np.abs(master))
    if pk>0.9: master*=0.9/pk
    st=np.stack([master,master],1); pcm=(np.clip(st,-1,1)*32767).astype('<i2')
    with wave.open(outpath,'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    return float(pk)
