# -*- coding: utf-8 -*-
import os, sys, subprocess
sys.path.insert(0,"/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad")
import sfxlib
SCR="/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad"
DUR=8.0

# per-reel SFX cues (name,time[,dur])
CUES={
 "N1":[("buzz",0.0),("tick",1.5),("tick",2.2),("tick",2.9),("transfer",4.55,0.45),
       ("capture",4.7),("pop",5.1),("chime",6.3)],
 "N2":[("whoosh",0.05,0.5),("pop",2.25),("tick",2.35),("pop",3.55),("tick",3.65),
       ("pop",4.85),("tick",4.95),("chime",5.5),("chime",6.4)],
 "N3":[("whoosh",0.05,0.45),("pop",1.75),("pop",2.55),("pop",3.35),("tick",4.15),
       ("pop",5.0),("chime",5.85),("chime",6.5)],
}
OUT={
 "N1":"/home/user/OpenMontage/projects/leadaline-reelN1-cost-of-missed-calls/hyperframes/renders",
 "N2":"/home/user/OpenMontage/projects/leadaline-reelN2-live-in-48-hours/hyperframes/renders",
 "N3":"/home/user/OpenMontage/projects/leadaline-reelN3-sounds-like-you/hyperframes/renders",
}

if __name__=="__main__":
    for k,cues in CUES.items():
        os.makedirs(OUT[k],exist_ok=True)
        wav=os.path.join(SCR,f"sfx_{k}.wav")
        pk=sfxlib.build_master(cues,DUR,wav)
        m4a=os.path.join(SCR,f"sfx_{k}.m4a")
        subprocess.run(["ffmpeg","-y","-i",wav,"-c:a","aac","-b:a","160k",m4a],
                       stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        print(f"{k}: sfx peak {pk:.2f} -> {m4a}")
    print("SFX DONE")
