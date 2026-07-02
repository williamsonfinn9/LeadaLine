# -*- coding: utf-8 -*-
import os, json, base64, subprocess, urllib.request, urllib.error
ROOT="/home/user/OpenMontage/projects/leadaline-editorial"
SH=os.path.join(ROOT,"s1_intro")  # fonts+gsap source
OUT=os.path.join(ROOT,"out"); GEN=os.path.join(ROOT,"gen")
CHROME="/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
KEY=open("/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad/secret/oai.key").read().strip()
os.makedirs(OUT,exist_ok=True); os.makedirs(GEN,exist_ok=True)

def gen_image(iid, prompt):
    raw=os.path.join(GEN,iid+"_raw.png")
    if not os.path.exists(raw):
        body=json.dumps({"model":"gpt-image-1","prompt":prompt,"size":"1024x1536","quality":"medium","n":1}).encode()
        req=urllib.request.Request("https://api.openai.com/v1/images/generations",data=body,
            headers={"Authorization":"Bearer "+KEY,"Content-Type":"application/json"})
        d=json.load(urllib.request.urlopen(req,timeout=240))
        open(raw,"wb").write(base64.b64decode(d["data"][0]["b64_json"]))
        print("  gen",iid)
    crop=os.path.join(GEN,iid+".jpg")
    subprocess.run(["ffmpeg","-y","-i",raw,"-vf","scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350","-q:v","4",crop],
                   stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    return crop

FONTS="""
 @font-face{font-family:'DM Sans';font-weight:600;src:url('fonts/DMSans-600.woff2') format('woff2');}
 @font-face{font-family:'DM Sans';font-weight:500;src:url('fonts/DMSans-500.woff2') format('woff2');}
 @font-face{font-family:'DM Mono';font-weight:500;src:url('fonts/DMMono-500.woff2') format('woff2');}
 @font-face{font-family:'Fraunces';font-weight:600;font-style:normal;src:url('fonts/Fraunces-600-normal.woff2') format('woff2');}
 @font-face{font-family:'Fraunces';font-weight:600;font-style:italic;src:url('fonts/Fraunces-600-italic.woff2') format('woff2');}
"""
MK='<svg class="mk" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="lg" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#18D7FF"/><stop offset=".5" stop-color="#2563FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs><rect x="13" y="7" width="14" height="50" rx="7" fill="url(#lg)"/><rect x="13" y="43" width="40" height="14" rx="7" fill="url(#lg)"/><rect x="33" y="7" width="11" height="28" rx="5.5" fill="#18D7FF"/></svg>'
ARR='<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round"/><polyline points="13 6 19 12 13 18" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def TPL(tag,label,h,sub,foot,cta=False):
    footer=('<div class="cta">'+foot+'<span class="c">'+ARR+'</span></div>') if cta else \
           ('<div class="foot"><div class="web">leadaline.com</div><div class="arrow">'+foot+'<span class="c">'+ARR+'</span></div></div>')
    return """<!DOCTYPE html><html><head><meta charset="utf-8"/><style>"""+FONTS+"""
 *{margin:0;padding:0;box-sizing:border-box;}
 #e{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'DM Sans',sans-serif;color:#F4EEE3;}
 #e .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
 #e .tint{position:absolute;inset:0;background:#0C2530;opacity:.24;mix-blend-mode:multiply;}
 #e .scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,22,28,.62) 0%,rgba(8,22,28,.04) 26%,rgba(7,18,24,.32) 56%,rgba(6,15,21,.94) 100%);}
 #e .wrap{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;padding:66px 66px 78px;}
 #e .top{display:flex;align-items:center;justify-content:space-between;}
 #e .brand{display:flex;align-items:center;gap:13px;} #e .brand .mk{width:38px;height:38px;} #e .brand .wm{font-size:31px;font-weight:600;color:#fff;}
 #e .tag{font-size:23px;font-weight:600;color:#EAF6F5;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.10);border-radius:100px;padding:9px 20px;}
 #e .mid{flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:20px;padding-bottom:26px;}
 #e .lbl{font-family:'DM Mono',monospace;font-size:22px;letter-spacing:1px;text-transform:uppercase;color:#9FD6DA;}
 #e .h{font-family:'Fraunces',serif;font-weight:600;font-size:76px;line-height:1.06;letter-spacing:-1px;text-shadow:0 2px 30px rgba(0,0,0,.4);}
 #e .h em{font-style:italic;color:#5FD6E4;}
 #e .sub{font-size:31px;line-height:1.4;font-weight:500;color:#DEEAEA;max-width:830px;text-shadow:0 2px 20px rgba(0,0,0,.3);}
 #e .foot{display:flex;align-items:center;justify-content:space-between;}
 #e .web{font-size:25px;font-weight:600;color:#C8DBDC;}
 #e .arrow,#e .cta{display:flex;align-items:center;gap:14px;font-size:24px;font-weight:700;color:#fff;}
 #e .cta{justify-content:center;background:linear-gradient(135deg,#2FC7D6,#2C7CE6);padding:20px 34px;border-radius:16px;align-self:flex-start;font-size:28px;}
 #e .arrow .c,#e .cta .c{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#2FC7D6,#2C7CE6);display:flex;align-items:center;justify-content:center;flex:0 0 58px;}
 #e .cta .c{width:44px;height:44px;flex:0 0 44px;background:rgba(255,255,255,.25);}
 #e .arrow .c svg,#e .cta .c svg{width:26px;height:26px;stroke:#fff;fill:none;stroke-width:2.4;}
</style></head><body>
<div id="e"><img class="bg" src="./bg.jpg"/><div class="tint"></div><div class="scrim"></div>
 <div class="wrap">
   <div class="top"><div class="brand">"""+MK+"""<div class="wm">LeadaLine</div></div><div class="tag">"""+tag+"""</div></div>
   <div class="mid"><div class="lbl">"""+label+"""</div><h1 class="h">"""+h+"""</h1><p class="sub">"""+sub+"""</p></div>
   """+footer+"""
 </div>
</div></body></html>"""

def shot(sid, html, bg):
    d=os.path.join(ROOT,sid); os.makedirs(d,exist_ok=True)
    if not os.path.exists(os.path.join(d,"fonts")): subprocess.run(["cp","-r",os.path.join(SH,"fonts"),os.path.join(d,"fonts")])
    subprocess.run(["cp",bg,os.path.join(d,"bg.jpg")])
    open(os.path.join(d,"index.html"),"w").write(html)
    outp=os.path.join(OUT,sid+".png")
    subprocess.run([CHROME,"--headless=new","--no-sandbox","--disable-gpu","--hide-scrollbars",
      "--force-device-scale-factor=1","--window-size=1080,1350","--virtual-time-budget=6000",
      "--screenshot="+outp,"file://"+os.path.join(d,"index.html")],
      stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=120)
    print("  shot",sid, os.path.exists(outp))

IMAGES={
 "cover":"Editorial documentary photograph of a friendly UK electrician in a clean dark navy work polo shirt, checking a smartphone while standing beside a modern consumer unit (fuse board) in a bright home, warm natural window light, calm premium mood, muted deep teal and navy colour grade, cinematic, shallow depth of field, high-end brand photography, realistic, no text, no logos.",
 "portrait":"Editorial portrait of a confident friendly UK female electrician in a dark navy work polo, arms relaxed, standing in a softly blurred modern workshop, warm natural light, muted deep teal and navy cinematic colour grade, premium brand photography, realistic, no text, no logos.",
 "board":"Close-up editorial photograph of skilled hands wiring a modern domestic consumer unit / fuse board, neat cabling, shallow depth of field, warm focused light, muted deep teal and navy cinematic grade, premium brand photography, realistic, no text.",
 "van":"Editorial photograph of a clean plain white tradesman van parked on a quiet UK residential street at golden hour, professional and tidy, muted deep teal and navy cinematic colour grade, premium brand photography, realistic, no text, no logos, no branding.",
}
SLIDES=[
 dict(sid="p1_cover", img="cover", tag="Field notes", label="For electrical contractors",
      h='The electrician who <em>never misses a call.</em>', sub='How LeadaLine answers, qualifies and books your enquiries — even when you’re up a ladder.', foot="Swipe"),
 dict(sid="p2_builtfor", img="portrait", tag="Who it's for", label="One-van sparkies to growing teams",
      h='Built for real <em>electrical businesses.</em>', sub='Whether it’s just you or a team of ten — every enquiry gets answered, qualified and booked.', foot="Swipe"),
 dict(sid="p3_craft", img="board", tag="The split", label="You + LeadaLine",
      h='You do the skilled work. <em>We handle the phone.</em>', sub='While you’re elbow-deep in a board, LeadaLine is capturing the next job — and the one after that.', foot="Swipe"),
 dict(sid="p4_cta", img="van", tag="Get started", label="Free, no obligation",
      h='See LeadaLine for <em>your electrical business.</em>', sub='We’ll set up a free, tailored demo around the jobs you actually do.', foot="Book a free demo", cta=True),
]

if __name__=="__main__":
    imgs={}
    for iid,pr in IMAGES.items():
        print("image:",iid); imgs[iid]=gen_image(iid,pr)
    for s in SLIDES:
        html=TPL(s["tag"],s["label"],s["h"],s["sub"],s["foot"],s.get("cta",False))
        shot(s["sid"], html, imgs[s["img"]])
    print("DONE")
