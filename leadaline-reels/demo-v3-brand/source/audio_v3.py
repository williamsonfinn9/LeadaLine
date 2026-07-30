# -*- coding: utf-8 -*-
import os, sys, subprocess, numpy as np, wave
sys.path.insert(0,"/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad")
import sfxlib
SCR="/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad"
VO="/home/user/OpenMontage/projects/leadaline-demo-v3/assets/vo"
SR=48000

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
# Cinematic Premium bed (Option 3 style): slow deep swells, sub drone, airy bells
A=[220,277.18,329.63]; E=[164.81,207.65,246.94]; Fsm=[185,220,277.18]; D=[146.83,220,293.66,369.99]
def cinematic(dur,out,gain=0.13):
    n=int(dur*SR); L=np.zeros(n); R=np.zeros(n)
    prog=[Fsm,D,A,E,Fsm,D,A,E]; seg=dur/len(prog)
    for i,ch in enumerate(prog):
        s=int(i*seg*SR); e=int(min(dur,(i+1)*seg+1.5)*SR); idx=np.arange(s,e); tt=idx/SR
        eg=env(len(idx),1.3,1.5)
        for k,f in enumerate(ch):
            det=1+0.002*(k-1)
            w=sine(f*det,tt)+0.09*sine(f*2,tt)
            pan=0.5+0.14*(k-1)/max(1,len(ch)-1)
            L[s:e]+=w*eg*(1-pan); R[s:e]+=w*eg*pan
        L[s:e]+=0.42*sine(ch[0]/2,tt)*eg; R[s:e]+=0.42*sine(ch[0]/2,tt)*eg
    L=lp(L,2000); R=lp(R,2000)
    tt=np.arange(n)/SR
    sub=0.16*np.sin(2*np.pi*55*tt)*(0.6+0.4*np.sin(2*np.pi*0.09*tt)); L+=sub; R+=sub
    # airy bells at scene accents
    def bell(f,t0,dur2,g,dec=1.0):
        m=int(dur2*SR); u=np.arange(m)/SR
        w=(sine(f,u)+0.6*sine(f*2.01,u)*np.exp(-u/0.3))*np.exp(-u/dec)*g
        st=int(t0*SR); en=min(st+m,n)
        if st<n: L[st:en]+=w[:en-st]; R[st:en]+=w[:en-st]
    for f,t0 in [(880,12.7),(1108,26.3),(659,38.3),(988,47.6)]: bell(f,t0,3,0.09)
    st=np.stack([L,R],1); pk=np.max(np.abs(st))
    if pk>0: st=st/pk*gain
    fi=int(1.4*SR); fo=int(2.0*SR)
    st[:fi]*=np.linspace(0,1,fi)[:,None]; st[-fo:]*=np.linspace(1,0,fo)[:,None]
    pcm=(np.clip(st,-1,1)*32767).astype('<i2')
    with wave.open(out,'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

DUR=55.0
mus=SCR+"/v3_music.wav"; cinematic(DUR,mus,gain=0.135)
# SFX synced to v3 transitions
sfx=[("whoosh",0.1,0.55),("pop",1.25),                       # hook + notification
 ("whoosh",4.7,0.4),("pop",5.5),("pop",5.66),("pop",5.82),   # S2 problem points
 ("whoosh",12.32,0.4),("chime",12.7),                        # S3
 ("whoosh",17.82,0.4),("pop",18.4),("tick",18.7),("tick",19.3),("capture",20.3),("chime",23.3), # S4
 ("whoosh",25.82,0.4),("chime",26.85),                       # S5
 ("whoosh",31.65,0.45),("pop",32.35),("pop",33.1),           # S6 device swap
 ("whoosh",37.85,0.4),("pop",38.9),("chime",42.6),           # S7 + review
 ("whoosh",47.15,0.45),("chime",48.45),("whoosh",50.4,0.5)]  # S8
sfxw=SCR+"/v3_sfx.wav"; sfxlib.build_master(sfx,DUR,sfxw)

vo=[("h1",0.3),("h2",5.1),("h3",12.7),("h4",18.2),("h5",26.3),("h6",32.0),("h7",38.3),("h8",47.6)]
inputs=[]; filt=[]; labels=[]
for i,(sid,t) in enumerate(vo):
    inputs+=["-i",os.path.join(VO,sid+".mp3")]
    filt.append(f"[{i}:a]adelay={int(t*1000)}|{int(t*1000)},apad=whole_dur={DUR}[v{i}]")
    labels.append(f"[v{i}]")
mi=len(vo); inputs+=["-i",mus]; si=len(vo)+1; inputs+=["-i",sfxw]
vomix="".join(labels)+f"amix=inputs={len(vo)}:normalize=0[vo]"
final=f"[{mi}:a]volume=1.0[mus];[{si}:a]volume=0.3[sfxl];[vo][mus][sfxl]amix=inputs=3:normalize=0,alimiter=limit=0.95,aresample=48000[aout]"
fc=";".join(filt)+";"+vomix+";"+final
out=SCR+"/hero_audio_v3.m4a"
r=subprocess.run(["ffmpeg","-y"]+inputs+["-filter_complex",fc,"-map","[aout]","-c:a","aac","-b:a","192k","-t",str(DUR),out],capture_output=True,text=True)
print("audio rc",r.returncode, out if r.returncode==0 else r.stderr[-800:])
