# -*- coding: utf-8 -*-
# 4:5 (1080x1350) variant of the LeadaLine Instagram carousel.
# Reuses the exact slide content (BODIES/BASE) from the 9:16 generator and
# re-fits each slide for the shorter canvas with a per-slide hero scale.
import os, sys, subprocess
HERE=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "leadaline-instagram-9x16"))
import generate as PV          # the 9:16 generator (defines BASE, BODIES, MAN, SG, CHROME)
from PIL import Image

OUT=HERE; CHROME=PV.CHROME

# per-slide hero scale (phones need more shrink than flat cards/grids)
K={1:0.92, 2:0.74, 3:0.94, 4:0.74, 5:0.86, 6:0.80, 7:0.78, 8:0.80, 9:0.92, 10:0.90}
# extra upward shift (pre-scale px) for phone+chips slides so chips clear the footer
TY={2:-150, 4:-150}

# compact-header + shorter-canvas overrides, injected before </style>
OVER="""
#p{{height:1350px;--k:{k};--ty:{ty}px;}}
.wrap{{padding:52px 84px;}}
.logo{{margin-bottom:20px;}}
.kick{{font-size:26px;margin-bottom:12px;}}
.h{{font-size:60px;letter-spacing:-1.5px;}}
.sub{{font-size:27px;margin-top:16px;max-width:780px;line-height:1.36;}}
.foot{{bottom:34px;font-size:22px;}}
.hero{{transform:translateY(var(--ty)) scale(var(--k));transform-origin:center center;}}
"""

def build(n):
    tpl=PV.BASE.replace("{{","{").replace("}}","}")
    html=tpl.replace("%s",PV.MAN,1).replace("%s",PV.SG,1).replace("%s",PV.BODIES[n],1)
    html=html.replace("width:440px","width:360px")   # smaller big-logo for 4:5
    html=html.replace("</style>", OVER.format(k=K[n],ty=TY.get(n,0))+"</style>")
    return html

if __name__=="__main__":
    for n in range(1,11):
        hp="/tmp/p45_%d.html"%n; open(hp,"w").write(build(n))
        raw="/tmp/_raw45_%d.png"%n
        outp=os.path.join(OUT,"leadaline-ig-4x5-%02d.png"%n)
        subprocess.run([CHROME,"--headless=new","--no-sandbox","--disable-gpu","--hide-scrollbars",
          "--force-device-scale-factor=1","--window-size=1080,1434","--virtual-time-budget=3000",
          "--screenshot="+raw,"file://"+hp],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=90)
        Image.open(raw).convert("RGB").crop((0,0,1080,1350)).save(outp)
        print("wrote",n,os.path.exists(outp))
    print("DONE")
