# -*- coding: utf-8 -*-
import os, shutil, sys
ROOT="/home/user/OpenMontage/projects/leadaline-posts"
SH=os.path.join(ROOT,"shared")

FF="""
  @font-face{font-family:'DM Sans';font-weight:400;font-display:block;src:url('fonts/DMSans-400.woff2') format('woff2');}
  @font-face{font-family:'DM Sans';font-weight:500;font-display:block;src:url('fonts/DMSans-500.woff2') format('woff2');}
  @font-face{font-family:'DM Sans';font-weight:600;font-display:block;src:url('fonts/DMSans-600.woff2') format('woff2');}
  @font-face{font-family:'DM Sans';font-weight:700;font-display:block;src:url('fonts/DMSans-700.woff2') format('woff2');}
  @font-face{font-family:'Fraunces';font-weight:500;font-style:normal;font-display:block;src:url('fonts/Fraunces-500-normal.woff2') format('woff2');}
  @font-face{font-family:'Fraunces';font-weight:600;font-style:normal;font-display:block;src:url('fonts/Fraunces-600-normal.woff2') format('woff2');}
  @font-face{font-family:'Fraunces';font-weight:500;font-style:italic;font-display:block;src:url('fonts/Fraunces-500-italic.woff2') format('woff2');}
"""

TPL="""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>__FONTS__
  *{margin:0;padding:0;box-sizing:border-box;}
  #p{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'DM Sans',system-ui,sans-serif;
     --ink:#1B2A44;--ink2:#5A6B86;--ac:ACCENT;
     background:linear-gradient(160deg,#FDF8F2 0%,#FBF3EA 45%,#F1F2FC 100%);}
  #p .blob{position:absolute;border-radius:50%;filter:blur(62px);pointer-events:none;}
  #p .b1{width:520px;height:520px;left:-150px;top:-120px;background:radial-gradient(circle,rgba(255,176,130,.5),rgba(255,176,130,0) 70%);}
  #p .b2{width:560px;height:560px;right:-180px;bottom:-160px;background:radial-gradient(circle,rgba(150,180,255,.55),rgba(150,180,255,0) 70%);}
  #p .b3{width:300px;height:300px;right:60px;top:80px;background:radial-gradient(circle,rgba(170,150,255,.3),rgba(170,150,255,0) 70%);}
  #p .grain{position:absolute;inset:0;opacity:.04;mix-blend-mode:multiply;pointer-events:none;
     background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
  #p .card{position:absolute;inset:60px;border-radius:48px;background:rgba(255,255,255,.80);
     border:1px solid rgba(255,255,255,.9);box-shadow:0 40px 90px rgba(90,80,120,.14),inset 0 1px 0 rgba(255,255,255,.7);
     padding:74px 72px;display:flex;flex-direction:column;}
  #p .top{display:flex;align-items:center;justify-content:space-between;}
  #p .brand{display:flex;align-items:center;gap:14px;}
  #p .brand .mk{width:46px;height:46px;}
  #p .brand .wm{font-size:38px;font-weight:600;color:var(--ink);letter-spacing:-.3px;}
  #p .pill{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:30px;color:#5b53b8;
     background:linear-gradient(120deg,#ECE7FF,#E5EEFF);border:1px solid rgba(124,92,255,.3);border-radius:100px;padding:12px 26px;}
  #p .mid{flex:1;display:flex;flex-direction:column;justify-content:center;}
  #p .stat{position:relative;display:inline-block;align-self:flex-start;}
  #p .num{font-family:'DM Sans',sans-serif;font-weight:700;font-size:NUMSIZEpx;line-height:.9;letter-spacing:-5px;
     background:linear-gradient(125deg,#18D7FF 0%,#2563FF 48%,#7C5CFF 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}
  #p .uline{display:block;margin-top:2px;width:100%;height:24px;}
  #p .say{font-family:'Fraunces',serif;font-weight:600;font-size:62px;line-height:1.13;color:var(--ink);margin-top:30px;max-width:800px;letter-spacing:-.5px;}
  #p .say .hl{color:var(--ac);}
  #p .human{font-size:33px;line-height:1.5;color:var(--ink2);margin-top:28px;max-width:770px;font-weight:500;}
  #p .foot{display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(27,42,68,.1);padding-top:30px;}
  #p .cta{display:flex;align-items:center;gap:14px;font-size:30px;font-weight:700;color:var(--ink);}
  #p .cta .dot{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,#2563FF,#7C5CFF);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 18px rgba(37,99,255,.28);}
  #p .cta .dot svg{width:24px;height:24px;stroke:#fff;}
  #p .web{font-size:28px;color:var(--ink2);font-weight:600;text-align:right;}
  #p .src{font-size:21px;color:#9AA7BC;margin-top:4px;text-align:right;}
</style></head>
<body>
<div id="p" data-composition-id="post" data-start="0" data-duration="1" data-width="1080" data-height="1350">
  <div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
  <div class="card">
    <div class="top">
      <div class="brand">
        <svg class="mk" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="lg" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#18D7FF"/><stop offset=".5" stop-color="#2563FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs><rect x="13" y="7" width="14" height="50" rx="7" fill="url(#lg)"/><rect x="13" y="43" width="40" height="14" rx="7" fill="url(#lg)"/><rect x="33" y="7" width="11" height="28" rx="5.5" fill="#18D7FF"/></svg>
        <div class="wm">LeadaLine</div>
      </div>
      <div class="pill">PILL</div>
    </div>
    <div class="mid">
      <div class="stat">
        <div class="num">NUM</div>
        <svg class="uline" viewBox="0 0 430 24" preserveAspectRatio="none" fill="none"><path d="M6 17 C 110 6, 230 6, 424 13" stroke="ACCENT" stroke-width="8" stroke-linecap="round"/></svg>
      </div>
      <div class="say">SAY</div>
      <div class="human">HUMAN</div>
    </div>
    <div class="foot">
      <div class="cta"><span class="dot"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/></svg></span>Book your free demo</div>
      <div><div class="web">leadaline.com</div><div class="src">Industry insight</div></div>
    </div>
  </div>
  <div class="grain"></div>
  <script src="./gsap.min.js"></script>
  <script>window.__timelines=window.__timelines||{};const tl=gsap.timeline({paused:true});tl.from("#p .card",{opacity:0,duration:0.3});window.__timelines["post"]=tl;</script>
</div></body></html>"""

V="#7C5CFF"; B="#2563FF"; CY="#1597D6"; IN="#5468FF"
POSTS=[
 ("post01","78%",330,"of customers hire the business that <span class='hl'>replies first.</span>","You can’t catch every call — and that’s okay. LeadaLine answers for you in seconds, warmly and professionally.",V,"Did you know?"),
 ("post02","85%",330,"of missed callers <span class='hl'>won’t call back.</span>","Miss a call and the job often goes quiet. LeadaLine texts back instantly, so the conversation never drops.",B,"Worth knowing"),
 ("post03","1 in 4",210,"calls go unanswered while you’re <span class='hl'>on the job.</span>","You’re busy doing great work — not sat by the phone. LeadaLine picks up every enquiry for you.",CY,"The reality"),
 ("post04","5 min",230,"reply this fast and you’re far more likely to <span class='hl'>win the work.</span>","The first few minutes matter most. LeadaLine replies the moment an enquiry lands — every time.",IN,"Quick fact"),
 ("post05","60%",330,"of jobs are won on the <span class='hl'>follow-up.</span>","Most people never chase a quote. LeadaLine follows up for you — gently and on time — so more turn into work.",V,"Did you know?"),
 ("post06","3 in 5",210,"enquiries now arrive <span class='hl'>outside 9–5.</span>","Evenings and weekends are when people reach out. LeadaLine is awake even when you’re not.",B,"Worth knowing"),
 ("post07","70%",330,"would rather message a business than <span class='hl'>call it.</span>","Customers love a quick reply on their terms. LeadaLine meets them where they are, instantly.",CY,"The shift"),
 ("post08","#1",300,"reason customers go elsewhere? <span class='hl'>A slow reply.</span>","It’s rarely about price — people go with whoever gets back to them. LeadaLine makes sure that’s you.",IN,"Food for thought"),
 ("post09","2×",330,"fast responders can convert up to <span class='hl'>twice the leads.</span>","Same enquiries, more booked jobs — simply from replying quickly. LeadaLine does it automatically.",V,"Did you know?"),
 ("post10","£1,000s",170,"lost each year to just <span class='hl'>one missed call a day.</span>","Each missed enquiry is money walking away. LeadaLine helps you hold on to it — kindly and reliably.",B,"The cost"),
]

def build(slug,num,numsize,say,human,ac,pill):
    d=os.path.join(ROOT,slug); os.makedirs(d,exist_ok=True)
    if not os.path.exists(os.path.join(d,"gsap.min.js")): shutil.copy(os.path.join(SH,"gsap.min.js"),d)
    if not os.path.exists(os.path.join(d,"fonts")): shutil.copytree(os.path.join(SH,"fonts"),os.path.join(d,"fonts"))
    html=(TPL.replace("__FONTS__",FF).replace("NUMSIZE",str(numsize)).replace("NUM",num)
          .replace("SAY",say).replace("HUMAN",human).replace("PILL",pill).replace("ACCENT",ac))
    open(os.path.join(d,"index.html"),"w").write(html)
    open(os.path.join(d,"hyperframes.json"),"w").write('{"compositions":["index.html"]}')
    print("built",slug)

if __name__=="__main__":
    for p in POSTS: build(*p)
