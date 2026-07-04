# -*- coding: utf-8 -*-
import os, sys, subprocess
sys.path.insert(0,"/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad")
import sfxlib, musicbed
SCR="/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad"

def build(vo_dir, vo_list, sfx_cues, dur, out, pad_gain=0.11):
    # music pad
    padw=out+".pad.wav"; musicbed.pad(dur,padw,gain=pad_gain)
    # sfx
    sfxw=out+".sfx.wav"; sfxlib.build_master(sfx_cues,dur,sfxw)
    # inputs: VO segments, then pad, then sfx
    inputs=[]; filt=[]; labels=[]
    for i,(sid,t) in enumerate(vo_list):
        inputs+=["-i",os.path.join(vo_dir,sid+".mp3")]
        filt.append(f"[{i}:a]adelay={int(t*1000)}|{int(t*1000)},apad=whole_dur={dur}[v{i}]")
        labels.append(f"[v{i}]")
    pad_idx=len(vo_list); inputs+=["-i",padw]
    sfx_idx=len(vo_list)+1; inputs+=["-i",sfxw]
    vo_mix="".join(labels)+f"amix=inputs={len(vo_list)}:normalize=0[vo]"
    final=(f"[{pad_idx}:a]volume=1.0[pad];[{sfx_idx}:a]volume=0.32[sfxl];"
           f"[vo][pad][sfxl]amix=inputs=3:normalize=0,alimiter=limit=0.95,aresample=48000[aout]")
    fc=";".join(filt)+";"+vo_mix+";"+final
    cmd=["ffmpeg","-y"]+inputs+["-filter_complex",fc,"-map","[aout]","-c:a","aac","-b:a","192k","-t",str(dur),out]
    r=subprocess.run(cmd,capture_output=True,text=True)
    print("audio",os.path.basename(out),"rc",r.returncode)
    if r.returncode: print(r.stderr[-1200:])
    for f in (padw,sfxw):
        try: os.remove(f)
        except: pass

# ---------------- HERO ----------------
HERO_VO="/home/user/OpenMontage/projects/leadaline-demo-v2/assets/vo"
hero_vo=[("h1",0.3),("h2",5.1),("h3",12.7),("h4",18.2),("h5",26.3),("h6",32.0),("h7",38.3),("h8",47.6)]
hero_sfx=[
 ("whoosh",0.1,0.5),("pop",1.95),                      # hook + card
 ("whoosh",4.85,0.4),("pop",5.85),("pop",6.0),("pop",6.16), # problem cards
 ("whoosh",12.45,0.4),("chime",12.7),                  # intro
 ("whoosh",17.9,0.4),("pop",18.9),("tick",19.5),("tick",20.1),("capture",23.1), # journey + value
 ("whoosh",25.95,0.4),("chime",26.9),                  # summary notification
 ("whoosh",31.65,0.4),("tick",34.4),("tick",35.4),("tick",36.4),("pop",36.9), # kanban moves
 ("whoosh",37.9,0.4),("pop",39.5),("chime",40.4),      # proof
 ("whoosh",47.2,0.45),("chime",48.9),                  # cta
]
build(HERO_VO,hero_vo,hero_sfx,55.0,os.path.join(SCR,"hero_audio.m4a"),pad_gain=0.11)

# ---------------- VERTICAL ----------------
VERT_VO="/home/user/OpenMontage/projects/leadaline-demo-v2-vertical/assets/vo"
# timing set later to match vertical comp; placeholders here recomputed in vertical step
vert_vo=[("v1",0.3),("v2",5.6),("v3",15.6),("v4",21.2)]
vert_sfx=[
 ("whoosh",0.1,0.45),("pop",1.6),
 ("whoosh",5.4,0.4),("chime",5.7),("pop",8.5),
 ("whoosh",15.4,0.4),("capture",16.2),("chime",17.5),
 ("whoosh",21.0,0.4),("chime",22.6),
]
build(VERT_VO,vert_vo,vert_sfx,28.0,os.path.join(SCR,"vert_audio.m4a"),pad_gain=0.12)
print("DONE")
