# -*- coding: utf-8 -*-
import os, subprocess, sys
sys.path.insert(0,"/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad")
import sfxlib
SCR="/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad"
VO="/home/user/OpenMontage/projects/leadaline-demo60/assets/vo"
OUTA=os.path.join(SCR,"demo60_audio.m4a")
DUR=70.0

# subtle SFX synced to transitions/moments
cues=[
 ("whoosh",0.15,0.5),   # phone entrance
 ("whoosh",11.05,0.32), # scene2 spin
 ("transfer",19.0,0.4), # scene3 in
 ("whoosh",26.35,0.30), # -> lead card
 ("capture",28.1),      # value pop
 ("whoosh",33.85,0.30), # scene4 in
 ("chime",34.6),        # notification
 ("whoosh",39.95,0.30), # -> calendar
 ("pop",41.4),          # booking snap
 ("whoosh",46.25,0.30), # scene5 in
 ("tick",46.9),("tick",48.0),("tick",49.1), # chat bubbles
 ("whoosh",53.35,0.30), # -> review
 ("chime",54.2),        # stars
 ("whoosh",59.85,0.35), # scene6 in
 ("chime",61.1),        # CTA
]
sfxwav=os.path.join(SCR,"demo60_sfx.wav")
pk=sfxlib.build_master(cues,DUR,sfxwav)
print("sfx peak",round(pk,3))

# VO placement (seconds)
vo=[("s1",0.6),("s2",11.9),("s3",19.6),("s4",34.3),("s5",46.7),("s6",60.3)]
inputs=[]; filt=[]; labels=[]
for i,(sid,t) in enumerate(vo):
    inputs+=["-i",os.path.join(VO,sid+".mp3")]
    filt.append(f"[{i}:a]adelay={int(t*1000)}|{int(t*1000)},apad=whole_dur={DUR}[v{i}]")
    labels.append(f"[v{i}]")
# sfx as last input
sfx_idx=len(vo)
inputs+=["-i",sfxwav]
# mix all VO
vo_mix="".join(labels)+f"amix=inputs={len(vo)}:normalize=0[vomix]"
# lower sfx, mix with vo
final=(f"[{sfx_idx}:a]volume=0.34[sfxl];[vomix][sfxl]amix=inputs=2:normalize=0,"
       f"alimiter=limit=0.95,aresample=48000[aout]")
fc=";".join(filt)+";"+vo_mix+";"+final
cmd=["ffmpeg","-y"]+inputs+["-filter_complex",fc,"-map","[aout]",
     "-c:a","aac","-b:a","192k","-t",str(DUR),OUTA]
r=subprocess.run(cmd,capture_output=True,text=True)
print("audio build rc",r.returncode)
if r.returncode: print(r.stderr[-1500:])
else: print("wrote",OUTA)
