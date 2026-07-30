# -*- coding: utf-8 -*-
import os, shutil, sys
ROOT="/home/user/OpenMontage/projects/leadaline-editorial"; SH=os.path.join(ROOT,"shared")

FONTS="".join("@font-face{font-family:'%s';font-weight:%s;font-style:%s;font-display:block;src:url('fonts/%s') format('woff2');}"%(f,w,st,fn) for f,w,st,fn in [
 ('DM Sans',400,'normal','DMSans-400.woff2'),('DM Sans',500,'normal','DMSans-500.woff2'),('DM Sans',600,'normal','DMSans-600.woff2'),('DM Sans',700,'normal','DMSans-700.woff2'),
 ('DM Mono',500,'normal','DMMono-500.woff2'),
 ('Fraunces',600,'normal','Fraunces-600-normal.woff2'),('Fraunces',500,'normal','Fraunces-500-normal.woff2'),
 ('Fraunces',600,'italic','Fraunces-600-italic.woff2'),('Fraunces',500,'italic','Fraunces-500-italic.woff2')])

CSS=r"""
 *{margin:0;padding:0;box-sizing:border-box;}
 #e{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'DM Sans',system-ui,sans-serif;
    --cream:#F4EEE3;--ink:#132530;--ink2:#5B7180;--acc-d:#54D2E2;--acc-l:#12869B;--line:rgba(255,255,255,.14);}
 #e.dark{color:#F3EEE3;background:radial-gradient(125% 95% at 28% 16%,#123840 0%,#0C2530 42%,#07171F 82%);}
 #e.light{color:var(--ink);background:radial-gradient(120% 100% at 20% 0%,#FBF7EF 0%,#F3ECE0 55%,#ECE3D4 100%);}
 #e .blob{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
 #e.dark .ba{width:640px;height:640px;left:-160px;top:-140px;background:radial-gradient(circle,rgba(45,180,190,.32),rgba(45,180,190,0) 70%);}
 #e.dark .bb{width:620px;height:620px;right:-180px;bottom:-160px;background:radial-gradient(circle,rgba(60,110,200,.28),rgba(60,110,200,0) 70%);}
 #e .grain{position:absolute;inset:0;opacity:.05;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
 #e .wrap{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;padding:70px 66px 60px;}
 #e .top{display:flex;align-items:center;justify-content:space-between;}
 #e .brand{display:flex;align-items:center;gap:13px;} #e .brand .mk{width:38px;height:38px;} #e .brand .wm{font-size:31px;font-weight:600;letter-spacing:-.3px;}
 #e.light .brand .wm{color:var(--ink);} #e.dark .brand .wm{color:#EAF3F2;}
 #e .tag{font-size:23px;font-weight:600;letter-spacing:.2px;border-radius:100px;padding:9px 20px;}
 #e.dark .tag{color:#BFEAF0;border:1px solid rgba(120,220,230,.35);background:rgba(80,200,215,.08);}
 #e.light .tag{color:#3C5560;border:1px solid rgba(19,37,48,.2);background:rgba(19,37,48,.03);}
 #e .mid{flex:1;display:flex;flex-direction:column;min-height:0;}
 #e .lbl{font-family:'DM Mono',monospace;font-size:22px;letter-spacing:1px;text-transform:uppercase;}
 #e.dark .lbl{color:#7FB8C0;} #e.light .lbl{color:#9A8F7C;}
 #e .h{font-family:'Fraunces',serif;font-weight:600;font-size:92px;line-height:1.04;letter-spacing:-1px;}
 #e .h em{font-style:italic;} #e.dark .h em{color:var(--acc-d);} #e.light .h em{color:var(--acc-l);}
 #e .sub{font-size:32px;line-height:1.4;font-weight:500;max-width:840px;}
 #e.dark .sub{color:#C4D6D8;} #e.light .sub{color:#54697A;}
 #e .foot{display:flex;align-items:center;justify-content:space-between;}
 #e .web{font-size:25px;font-weight:600;} #e.dark .web{color:#9FBEC2;} #e.light .web{color:#7A8A96;}
 #e .arrow{display:flex;align-items:center;gap:14px;font-size:24px;font-weight:600;}
 #e .arrow .c{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;}
 #e.dark .arrow .c{background:linear-gradient(135deg,#2FC7D6,#2C7CE6);} #e.light .arrow .c{background:var(--ink);}
 #e .arrow .c svg{width:26px;height:26px;stroke:#fff;fill:none;stroke-width:2.4;}
 @@SLOT@@
"""

MK='<svg class="mk" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="lg@@GID@@" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#18D7FF"/><stop offset=".5" stop-color="#2563FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs><rect x="13" y="7" width="14" height="50" rx="7" fill="url(#lg@@GID@@)"/><rect x="13" y="43" width="40" height="14" rx="7" fill="url(#lg@@GID@@)"/><rect x="33" y="7" width="11" height="28" rx="5.5" fill="#18D7FF"/></svg>'
ARR='<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round"/><polyline points="13 6 19 12 13 18" stroke-linecap="round" stroke-linejoin="round"/></svg>'
def TOP(tag): return '<div class="top"><div class="brand">'+MK+'<div class="wm">LeadaLine</div></div><div class="tag">'+tag+'</div></div>'
def FOOT(web,label): return '<div class="foot"><div class="web">'+web+'</div><div class="arrow">'+label+'<span class="c">'+ARR+'</span></div></div>'

PAGE='<!DOCTYPE html><html><head><meta charset="utf-8"/><style>@@FONTS@@'+CSS+'</style></head><body><div id="e" class="@@THEME@@" data-composition-id="ed" data-start="0" data-duration="1" data-width="1080" data-height="1350"><div class="blob ba"></div><div class="blob bb"></div>@@BODY@@<div class="grain"></div><script src="./gsap.min.js"></script><script>window.__timelines=window.__timelines||{};const tl=gsap.timeline({paused:true});tl.from("#e .wrap",{opacity:0,duration:0.3});window.__timelines["ed"]=tl;</script></div></body></html>'

# icons for formation
IC={'rec':'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h2l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 4 5z"/></svg>',
 'sales':'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v3H9zM7 6h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M9 12h6M9 16h6"/></svg>',
 'book':'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
 'admin':'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
 'follow':'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.3"/><polyline points="21 4 21 10 15 10"/></svg>',
 'report':'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 19h16M8 16l3-4 3 2 4-6"/></svg>'}

SLIDES=[]

# ---- Slide 1 : dark editorial reintroduction ----
SLIDES.append(dict(id="s1_intro", theme="dark", slot="", body=(
 '<div class="wrap">'+TOP("Reintroduction")+
 '<div class="mid" style="justify-content:flex-end;gap:30px;padding-bottom:26px">'
 '<h1 class="h">We’re LeadaLine. And we’ve been <em>quietly winning you work.</em></h1>'
 '<p class="sub">For two years we’ve helped busy UK service businesses capture every enquiry — and turn it into booked work, automatically.</p>'
 '</div>'+FOOT("leadaline.com","Swipe")+'</div>')))

# ---- Slide 2 : dark team-sheet formation ----
def node(cls,ic,name,pos,color,x,y):
    return ('<div class="nd %s" style="left:%s%%;top:%s%%">'
            '<div class="dot" style="background:%s"><span class="ni">%s</span></div>'
            '<div class="nm">%s</div><div class="po">%s</div></div>'%(cls,x,y,color,ic,name,pos))
NODES=(node("",IC['report'],"Reporting","Striker","#E7B24E",50,9)+
       node("",IC['admin'],"Admin","Left mid","#46C99A",26,33)+
       node("",IC['follow'],"Follow-Up","Right mid","#E88AB0",74,33)+
       node("",IC['sales'],"Sales","Left back","#4B7BE6",26,62)+
       node("",IC['book'],"Booking","Right back","#8B7BE0",74,62)+
       node("",IC['rec'],"Receptionist","Keeper","#35C0D6",50,87))
SLIDES.append(dict(id="s2_teamsheet", theme="dark",
 slot="""
  #e .pitch{position:relative;flex:1;margin:26px 0 22px;border-radius:26px;border:1px solid rgba(255,255,255,.1);
     background:linear-gradient(160deg,rgba(255,255,255,.035),rgba(255,255,255,.01));overflow:hidden;}
  #e .pitch .mkline{position:absolute;left:8%;right:8%;top:50%;height:1px;background:rgba(255,255,255,.09);}
  #e .pitch .mkcirc{position:absolute;left:50%;top:50%;width:150px;height:150px;border-radius:50%;border:1px solid rgba(255,255,255,.09);transform:translate(-50%,-50%);}
  #e .nd{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;width:190px;}
  #e .nd .dot{width:96px;height:96px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 26px rgba(0,0,0,.4),0 0 0 6px rgba(255,255,255,.04);}
  #e .nd .dot svg{width:44px;height:44px;}
  #e .nd .nm{font-size:26px;font-weight:700;margin-top:12px;color:#EFF6F5;}
  #e .nd .po{font-family:'DM Mono',monospace;font-size:18px;color:#7FB8C0;margin-top:2px;}
 """,
 body=('<div class="wrap">'+TOP("Team sheet")+
   '<div class="mid">'
   '<div class="lbl">LeadaLine FC · your AI office team</div>'
   '<h1 class="h" style="font-size:70px;margin-top:14px">Your AI office team, <em>in one line-up.</em></h1>'
   '<div class="pitch"><div class="mkline"></div><div class="mkcirc"></div>'+NODES+'</div>'
   '</div>'+FOOT("The operating system for your business.","See it")+'</div>')))

# ---- Slide 3 : light dot-matrix stat ----
COLS,ROWS=20,7
dots=""
for i in range(COLS*ROWS):
    miss = (i%4==2)   # ~1 in 4 hollow
    dots+='<span class="d %s"></span>'%("m" if miss else "")
SLIDES.append(dict(id="s3_dotmatrix", theme="light",
 slot="""
  #e .grid{display:grid;grid-template-columns:repeat(20,1fr);gap:15px 0;margin:8px 0 10px;}
  #e .grid .d{width:20px;height:20px;border-radius:50%;background:#16303C;justify-self:center;}
  #e .grid .d.m{background:transparent;border:2.5px solid rgba(19,37,48,.28);}
  #e .legend{display:flex;gap:28px;font-size:22px;color:#5B6B76;font-weight:600;margin-bottom:8px;}
  #e .legend i{display:inline-block;width:18px;height:18px;border-radius:50%;margin-right:9px;vertical-align:-2px;}
  #e .legend .f{background:#16303C;} #e .legend .h{background:transparent;border:2.5px solid rgba(19,37,48,.32);}
  #e .big{font-family:'Fraunces',serif;font-weight:600;font-size:150px;line-height:.92;letter-spacing:-2px;color:var(--ink);margin-top:18px;}
  #e .big em{font-style:italic;color:var(--acc-l);}
  #e .cap{font-size:31px;line-height:1.42;color:#54697A;font-weight:500;max-width:820px;margin-top:16px;}
  #e .cap b{color:var(--ink);font-weight:700;}
 """,
 body=('<div class="wrap">'+TOP("By the numbers")+
   '<div class="mid" style="gap:6px">'
   '<div class="lbl">Before LeadaLine — the missed calls</div>'
   '<div class="grid">'+dots+'</div>'
   '<div class="legend"><span><i class="f"></i>Answered</span><span><i class="h"></i>Missed</span></div>'
   '<div class="big">1 in 4</div>'
   '<div class="cap">calls to UK trades go unanswered — and <b>most callers never ring back.</b> LeadaLine answers the moment you can’t.</div>'
   '</div>'+FOOT("leadaline.com","Swipe")+'</div>')))

# ---- Slide 4 : dark after-hours emergency editorial ----
SLIDES.append(dict(id="s4_afterhours", theme="dark", slot="", body=(
 '<div class="wrap">'+TOP("After hours")+
 '<div class="mid" style="justify-content:flex-end;gap:26px;padding-bottom:24px">'
 '<div class="lbl">The 9pm call-out</div>'
 '<h1 class="h">It’s 9pm. The power’s out. They’re calling <em>someone.</em></h1>'
 '<p class="sub">LeadaLine answers, captures the fault, and books you in — while the other sparkies are asleep.</p>'
 '</div>'+FOOT("leadaline.com","Swipe")+'</div>')))

# ---- Slide 5 : light UI-mock, fault call -> booked job ----
_ph='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h2l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 4 5z"/></svg>'
_ck='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
SLIDES.append(dict(id="s5_bookedjob", theme="light",
 slot="""
  #e .mock{position:relative;flex:1;margin-top:34px;}
  #e .mcard{position:absolute;background:#fff;border:1px solid rgba(19,37,48,.08);border-radius:24px;box-shadow:0 26px 60px rgba(40,60,80,.16);padding:28px 30px;}
  #e .mcard .mh{display:flex;align-items:center;gap:14px;font-size:24px;font-weight:700;color:var(--ink);}
  #e .mcard .mh .ic{width:48px;height:48px;flex:0 0 48px;border-radius:13px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 18px rgba(0,0,0,.14);}
  #e .mcard .mh .ic svg{width:25px;height:25px;}
  #e .mcard .mt{font-size:29px;color:#2C3E49;margin-top:16px;line-height:1.34;font-weight:500;}
  #e .mcard .mmeta{font-family:'DM Mono',monospace;font-size:20px;color:#8A97A2;margin-top:12px;}
  #e .c1{left:0;top:8px;width:600px;}
  #e .c2{right:0;bottom:34px;width:620px;}
  #e .mconn{position:absolute;left:300px;top:230px;width:280px;height:2px;background:linear-gradient(90deg,rgba(19,37,48,.1),rgba(18,134,155,.6));transform:rotate(34deg);transform-origin:left center;}
 """,
 body=('<div class="wrap">'+TOP("In practice")+
   '<div class="mid">'
   '<h1 class="h" style="font-size:74px">A fault call becomes <em>a booked job.</em></h1>'
   '<div class="mock">'
   '<div class="mconn"></div>'
   '<div class="mcard c1"><div class="mh"><span class="ic" style="background:linear-gradient(135deg,#F2705E,#E1483A)">'+_ph+'</span>New enquiry · 9:12pm</div><div class="mt">“No power — kitchen sockets keep tripping.”</div><div class="mmeta">Captured automatically</div></div>'
   '<div class="mcard c2"><div class="mh"><span class="ic" style="background:linear-gradient(135deg,#2FB6A8,#12869B)">'+_ck+'</span>Booked · tomorrow, 8:00am</div><div class="mt">Job details sent to your phone. Customer confirmed.</div><div class="mmeta">Owner notified · SMS + email</div></div>'
   '</div>'
   '</div>'+FOOT("leadaline.com","Swipe")+'</div>')))

def build(s):
    d=os.path.join(ROOT,s["id"]); os.makedirs(d,exist_ok=True)
    if not os.path.exists(os.path.join(d,"gsap.min.js")): shutil.copy(os.path.join(SH,"gsap.min.js"),d)
    if not os.path.exists(os.path.join(d,"fonts")): shutil.copytree(os.path.join(SH,"fonts"),os.path.join(d,"fonts"))
    html=PAGE.replace("@@FONTS@@",FONTS).replace("@@SLOT@@",s.get("slot","")).replace("@@THEME@@",s["theme"]).replace("@@BODY@@",s["body"]).replace("@@GID@@",s["id"])
    open(os.path.join(d,"index.html"),"w").write(html)
    open(os.path.join(d,"hyperframes.json"),"w").write('{"compositions":["index.html"]}')
    print("built",s["id"])

if __name__=="__main__":
    for s in SLIDES: build(s)
