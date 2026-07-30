# -*- coding: utf-8 -*-
# LeadaLine branding / intro post — a pinned "who we are & what we do" card.
# Rendered in three aspect ratios: 1:1 (1080x1080), 4:5 (1080x1350), 9:16 (1080x1920).
import os, sys, subprocess
HERE=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "leadaline-instagram-9x16"))
import generate as G          # shares BASE, LG, MAN, SG, CHROME
from PIL import Image

OUT=HERE; CHROME=G.CHROME

STAR='<svg viewBox="0 0 24 24"><path d="M12 3l2.9 6 6.6.6-5 4.4 1.5 6.4L12 17.5 5.5 20.8 7 14.4 2 10l6.6-.6z"/></svg>'

# six capability tiles: (icon, title, sub)
CAPS=[
 (G.I_REC,   "Answers",   "every call, 24/7"),
 (G.I_SALES, "Qualifies", "scores each lead"),
 (G.I_BOOK,  "Books",     "straight to diary"),
 (G.I_FUP,   "Follows up","chases quiet quotes"),
 (STAR,      "Reviews",   "wins 5★ feedback"),
 (G.I_REP,   "Reports",   "one weekly summary"),
]
grid="".join(
 f'<div class="tile"><div class="ic">{ic}</div><div class="t">{t}</div><div class="s">{s}</div></div>'
 for ic,t,s in CAPS)

# CTA band
CTA=('<div style="margin-top:44px;background:var(--grad);color:#fff;border-radius:100px;'
     'padding:26px 46px;font-size:34px;font-weight:800;display:inline-flex;align-items:center;gap:16px;'
     'box-shadow:0 22px 50px rgba(47,107,255,.4)">📅 Book a free 15-min demo · leadaline.com</div>')

BODY=(
 f'<img class="logo" src="{G.LG}" style="width:460px"/>'
 '<div class="kick">Welcome to LeadaLine</div>'
 '<h1 class="h">Your <span class="g">AI Office Team.</span></h1>'
 '<div class="sub">We help busy UK trades — electricians, plumbers, roofers &amp; EV installers — '
 'never miss another enquiry. Our AI answers, qualifies, books and follows up on every call, chat '
 'and message, <b>24/7</b> — so no job ever slips away.</div>'
 f'<div class="hero"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;width:100%;max-width:900px">{grid}</div>{CTA}</div>'
)

# per-aspect: canvas height, hero scale, header override css
ASPECTS={
 "1x1":  (1080, 0.72, ".logo{{width:330px !important;margin-bottom:14px}}.kick{{font-size:25px;margin-bottom:8px}}.h{{font-size:64px}}.sub{{font-size:26px;margin-top:12px;max-width:820px;line-height:1.32}}.foot{{bottom:28px;font-size:20px}}.wrap{{padding:44px 84px}}"),
 "4x5":  (1350, 0.94, ".logo{{width:400px !important;margin-bottom:20px}}.kick{{font-size:27px;margin-bottom:12px}}.h{{font-size:74px}}.sub{{font-size:29px;margin-top:18px;max-width:840px;line-height:1.36}}.foot{{bottom:34px;font-size:22px}}.wrap{{padding:56px 84px}}"),
 "9x16": (1920, 1.0,  ".sub{{max-width:860px}}"),
}

def build(css_over, k):
    tpl=G.BASE.replace("{{","{").replace("}}","}")
    html=tpl.replace("%s",G.MAN,1).replace("%s",G.SG,1).replace("%s",BODY,1)
    over=("\n#p{--k:%s;}\n.hero{transform:scale(var(--k));transform-origin:center center;}\n"%k)+css_over.replace("{{","{").replace("}}","}")
    return html.replace("</style>", over+"</style>")

if __name__=="__main__":
    for name,(H,k,css) in ASPECTS.items():
        html=build(css, k).replace("height:1350px","height:%dpx"%H).replace(
            # BASE default #p height is 1920; force per aspect
            "height:1920px","height:%dpx"%H)
        hp="/tmp/brand_%s.html"%name; open(hp,"w").write(html)
        raw="/tmp/_brandraw_%s.png"%name
        outp=os.path.join(OUT,"leadaline-brand-%s.png"%name)
        subprocess.run([CHROME,"--headless=new","--no-sandbox","--disable-gpu","--hide-scrollbars",
          "--force-device-scale-factor=1","--window-size=1080,%d"%(H+84),"--virtual-time-budget=3000",
          "--screenshot="+raw,"file://"+hp],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=90)
        Image.open(raw).convert("RGB").crop((0,0,1080,H)).save(outp)
        print("wrote",name,os.path.exists(outp))
    print("DONE")
