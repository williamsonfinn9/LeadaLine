# -*- coding: utf-8 -*-
# Subtle, premium ambient pad bed (royalty-free, synthesized). Warm major pad, slow swells.
import numpy as np, wave
SR=48000
def _lp(x,c):
    a=np.exp(-2*np.pi*c/SR); y=np.zeros_like(x); p=0.0
    for i in range(len(x)): p=(1-a)*x[i]+a*p; y[i]=p
    return y
def pad(dur, out, gain=0.12):
    n=int(dur*SR); t=np.arange(n)/SR
    # I - IV - vi - V feel in A major, calm; 4 chords cycling over the whole piece
    chords=[(220.0,277.18,329.63),   # A  (A C# E)
            (293.66,369.99,440.0),   # D  (D F# A)
            (246.94,329.63,392.0),   # Bm-ish (B E G) -> gentle
            (277.18,329.63,415.30)]  # C#m/E (C# E G#)
    seg=dur/len(chords)
    left=np.zeros(n); right=np.zeros(n)
    for i,ch in enumerate(chords):
        s=int(i*seg*SR); e=int(min(dur,(i+1)*seg+1.4)*SR)  # overlap for crossfade
        idx=np.arange(s,e); tt=(idx-s)/SR
        env=np.minimum(1.0,tt/1.2)*np.minimum(1.0,(e-s)/SR-tt+0.0)  # attack
        env=np.clip(env,0,1);
        # release tail
        rel=np.clip((seg+1.4-tt)/1.4,0,1); env=env*np.clip(rel,0,1)
        for k,f in enumerate(ch):
            detune=1+0.0025*(k-1)
            w=np.sin(2*np.pi*f*detune*(idx/SR))+0.5*np.sin(2*np.pi*f*2*(idx/SR))*0.3
            pan=0.5+0.18*(k-1)
            left[s:e]+=w*env*(1-pan)
            right[s:e]+=w*env*pan
        # sub root
        left[s:e]+=0.4*np.sin(2*np.pi*ch[0]/2*(idx/SR))*env
        right[s:e]+=0.4*np.sin(2*np.pi*ch[0]/2*(idx/SR))*env
    # gentle tremolo + lowpass warmth
    trem=0.88+0.12*np.sin(2*np.pi*0.12*t)
    left*=trem; right*=trem
    left=_lp(left,2600); right=_lp(right,2600)
    # high shimmer very low
    shimmer=0.04*np.sin(2*np.pi*1320*t)*(0.5+0.5*np.sin(2*np.pi*0.07*t))
    left+=shimmer; right+=shimmer
    st=np.stack([left,right],1)
    pk=np.max(np.abs(st));
    if pk>0: st=st/pk*gain
    # global fade in/out
    fi=int(1.5*SR); fo=int(2.0*SR)
    st[:fi]*=np.linspace(0,1,fi)[:,None]; st[-fo:]*=np.linspace(1,0,fo)[:,None]
    pcm=(np.clip(st,-1,1)*32767).astype('<i2')
    with wave.open(out,'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    return out
if __name__=="__main__":
    pad(55.0,"/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad/pad_test.wav")
    print("ok")
