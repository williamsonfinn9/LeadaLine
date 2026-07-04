# -*- coding: utf-8 -*-
# Four distinct royalty-free synthesized music beds (premium SaaS demo).
import numpy as np, wave, subprocess, os
SR=48000
OUT="/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad/musicopts"
os.makedirs(OUT,exist_ok=True)

def lp(x,c):
    a=np.exp(-2*np.pi*c/SR); y=np.zeros_like(x); p=0.0
    for i in range(len(x)): p=(1-a)*x[i]+a*p; y[i]=p
    return y
def sine(f,t): return np.sin(2*np.pi*f*t)
def env(n,a,d):
    e=np.ones(n); ai=int(a*SR); di=int(d*SR)
    if ai>0: e[:ai]=np.linspace(0,1,ai)
    if di>0: e[-di:]=np.linspace(1,0,di)
    return e

# chords (Hz) — A major family
A=[220,277.18,329.63]; E=[164.81,207.65,246.94]; Fsm=[185,220,277.18]; D=[146.83,220,293.66,369.99]
def pad_layer(dur, prog, gain, cutoff=2600, bright=0.3):
    n=int(dur*SR); L=np.zeros(n); R=np.zeros(n); seg=dur/len(prog)
    for i,ch in enumerate(prog):
        s=int(i*seg*SR); e=int(min(dur,(i+1)*seg+1.2)*SR); idx=np.arange(s,e); tt=idx/SR
        eg=env(len(idx),1.0,1.2)
        for k,f in enumerate(ch):
            det=1+0.0022*(k-1)
            w=sine(f*det,tt)+bright*0.3*sine(f*2,tt)
            pan=0.5+0.16*(k-1)/max(1,len(ch)-1)
            L[s:e]+=w*eg*(1-pan); R[s:e]+=w*eg*pan
        L[s:e]+=0.4*sine(ch[0]/2,tt)*eg; R[s:e]+=0.4*sine(ch[0]/2,tt)*eg
    L=lp(L,cutoff); R=lp(R,cutoff)
    st=np.stack([L,R],1); pk=np.max(np.abs(st));
    return st/pk*gain if pk>0 else st

def pluck(f,t0,dur,gain,dec=0.35):
    n=int(dur*SR); idx=np.arange(n); tt=idx/SR
    w=sine(f,tt)+0.5*sine(f*2,tt)+0.25*sine(f*3,tt)
    w*=np.exp(-tt/dec); return int(t0*SR), w*gain

def bell(f,t0,dur,gain,dec=0.9):
    n=int(dur*SR); tt=np.arange(n)/SR
    w=sine(f,tt)+0.6*sine(f*2.01,tt)*np.exp(-tt/0.3)
    w*=np.exp(-tt/dec); return int(t0*SR), w*gain

def kick(t0,gain=0.5):
    n=int(0.18*SR); tt=np.arange(n)/SR
    f=110*np.exp(-tt/0.03)+45
    w=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt/0.12)
    return int(t0*SR), w*gain

def tick(t0,gain=0.12):
    n=int(0.05*SR); noise=np.random.uniform(-1,1,n)*np.exp(-np.arange(n)/SR/0.012)
    return int(t0*SR), noise*gain

def mix_events(base, events):
    L=base[:,0].copy(); R=base[:,1].copy()
    for i,w in events:
        e=min(i+len(w),len(L));
        if i<len(L): L[i:e]+=w[:e-i]; R[i:e]+=w[:e-i]
    return np.stack([L,R],1)

def finish(st,dur,out,gain=1.0):
    st=st*gain
    pk=np.max(np.abs(st));
    if pk>0.98: st=st/pk*0.98
    fi=int(0.8*SR); fo=int(1.2*SR)
    st[:fi]*=np.linspace(0,1,fi)[:,None]; st[-fo:]*=np.linspace(1,0,fo)[:,None]
    pcm=(np.clip(st,-1,1)*32767).astype('<i2')
    with wave.open(out,'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

DUR=20.0
prog=[A,E,Fsm,D]

# 1) WARM SIGNATURE — soft pad, calm/premium (close to current)
st=pad_layer(DUR,prog,0.5,cutoff=2400)
finish(st,DUR,f"{OUT}/opt1_warm.wav",gain=0.9)

# 2) UPLIFTING CORPORATE — pad + bright plucky arpeggio, optimistic forward motion
st=pad_layer(DUR,prog,0.34,cutoff=3200,bright=0.6)
ev=[]
arp={0:[440,554,659],1:[330,415,494],2:[370,440,554],3:[294,440,554]}  # per-bar arps
step=0.30
for bar in range(4):
    notes=arp[bar]; t0=bar*5.0
    for j in range(16):
        f=notes[j%3]*(2 if j%6>=3 else 1)
        ev.append(pluck(f,t0+j*step,0.5,0.16,dec=0.22))
st=mix_events(st,ev); finish(st,DUR,f"{OUT}/opt2_uplifting.wav",gain=0.95)

# 3) CINEMATIC PREMIUM — slow deep swells + airy highs + soft bells (Apple-keynote)
prog2=[Fsm,D,A,E]
st=pad_layer(DUR,prog2,0.46,cutoff=2000,bright=0.15)
# sub drone A
n=int(DUR*SR); tt=np.arange(n)/SR
sub=0.18*np.sin(2*np.pi*55*tt)*(0.6+0.4*np.sin(2*np.pi*0.1*tt))
st[:,0]+=sub; st[:,1]+=sub
ev=[bell(880,2.0,3,0.10),bell(1108,7.0,3,0.09),bell(659,12.0,3,0.10),bell(988,17.0,2.5,0.08)]
st=mix_events(st,ev); finish(st,DUR,f"{OUT}/opt3_cinematic.wav",gain=0.95)

# 4) MODERN TECH PULSE — subtle heartbeat pulse + filtered pluck, energetic but tasteful
st=pad_layer(DUR,prog,0.3,cutoff=2800,bright=0.4)
ev=[]; bpm=100; beat=60.0/bpm
for b in range(int(DUR/beat)):
    t0=b*beat
    ev.append(kick(t0,0.32))
    ev.append(tick(t0+beat*0.5,0.09))
    if b%2==0: ev.append(tick(t0+beat*0.25,0.05))
# gentle offbeat pluck riff
riff={0:440,1:329.63,2:369.99,3:293.66}
for bar in range(4):
    for j in range(8):
        ev.append(pluck(riff[bar]*(1.5 if j%4==2 else 1),bar*5.0+j*0.625+0.31,0.4,0.10,dec=0.18))
st=mix_events(st,ev); finish(st,DUR,f"{OUT}/opt4_pulse.wav",gain=0.95)

# encode all to mp3
for f in ["opt1_warm","opt2_uplifting","opt3_cinematic","opt4_pulse"]:
    subprocess.run(["ffmpeg","-y","-i",f"{OUT}/{f}.wav","-c:a","libmp3lame","-b:a","192k",f"{OUT}/{f}.mp3"],
                   stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    print("built",f)
print("DONE")
