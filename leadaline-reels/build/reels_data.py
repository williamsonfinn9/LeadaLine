# -*- coding: utf-8 -*-
IC = {
 'phone':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
 'phonex':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/><line x1="15" y1="4" x2="21" y2="10"/><line x1="21" y1="4" x2="15" y2="10"/></svg>',
 'mail':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
 'user':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 'doc':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
 'chat':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/></svg>',
 'check':'<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
 'clock':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>',
 'bell':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
 'mic':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="21"/></svg>',
 'spark':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/></svg>',
 'chart':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 19h16M8 16l3-4 3 2 4-6"/></svg>',
}
def lr(tile, ico, bars=True, nm=None, meta=None, badge=None, dot=False):
    inner='<div class="dot"></div>' if dot else '<div class="tile %s">%s</div>'%(tile, ico)
    if nm: mid='<div class="lb"><div class="nm">%s</div>%s</div>'%(nm, ('<div class="meta">%s</div>'%meta) if meta else '')
    else: mid='<div class="lb"><i></i><i class="short"></i></div>'
    bd='<div class="badge">%s</div>'%badge if badge else ''
    return '<div class="listrow">%s%s%s</div>'%(inner,mid,bd)
def chip(ico_cls, ico, name, meta=None, bars=True):
    m='<div class="cm">%s</div>'%meta if meta else ''
    b='<div class="cbar"></div>' if bars else ''
    return '<div class="chip"><div class="ico %s">%s</div><div class="txt"><div class="cn">%s</div>%s%s</div></div>'%(ico_cls,ico,name,m,b)
def step(num, title):
    return '<div class="step"><div class="num">%s</div><div class="stl">%s</div><div class="sln"></div><div class="sbar"></div></div>'%(num,title)
def field(label, val, hi=False):
    return '<div class="field"><div class="fl"><b></b>%s</div><div class="fv %s">%s</div></div>'%(label,'hi' if hi else '',val)

ARROW='<div class="beam"></div><div class="packet"></div><div class="head"></div>'

REELS=[]

# ===== Reel 2 — Too Many Enquiries =====
REELS.append(dict(n=2, slug='leadaline-reel-02-too-many-enquiries', dur=8,
 lines=['TOO MANY','<span class="accent">ENQUIRIES,</span>','NO CLEAR SYSTEM'],
 bottom='All your enquiries. <span class="sep">One clear system.</span>',
 stage_css="""
  RID .chips{position:absolute;left:0;top:64px;width:316px;display:flex;flex-direction:column;gap:16px;}
  RID .col-r{position:absolute;right:0;top:108px;width:466px;}
  RID .arrowx.a2{left:320px;top:300px;width:96px;}
 """,
 stage_html="""
  <div class="chips">
   %s%s%s%s
  </div>
  <div class="arrowx a2">%s</div>
  <div class="panel col-r"><div class="gloss"></div><div class="pt">Leads</div>
   %s%s%s
  </div>
 """%(chip('t-wa',IC['chat'],'WhatsApp Message'),chip('t-rd',IC['phonex'],'Missed Call'),
      chip('t-bl',IC['mail'],'Email'),chip('t-vi',IC['doc'],'Quote Request'), ARROW,
      lr('t-cy',IC['user'],badge='New'),lr('t-bl',IC['user'],badge='New'),lr('t-vi',IC['user'],badge='New')),
 stage_js="""
    tl.from(S(".chips .chip"),{x:-50,opacity:0,duration:0.42,ease:SOFT,stagger:0.12},1.5);
    tl.fromTo(S(".arrowx.a2"),{opacity:0},{opacity:1,duration:0.2},2.35);
    tl.fromTo(S(".arrowx.a2 .beam"),{scaleX:0},{scaleX:1,duration:0.45,ease:SMOOTH},2.4);
    tl.fromTo(S(".arrowx.a2 .packet"),{x:0,opacity:1},{x:80,opacity:0,duration:0.5,ease:"power1.in"},2.5);
    tl.from(S(".col-r"),{y:50,scale:0.94,opacity:0,duration:0.5,ease:SOFT},2.85);
    tl.from(S(".col-r .pt"),{y:16,opacity:0,duration:0.34},3.1);
    tl.from(S(".col-r .listrow"),{x:24,opacity:0,duration:0.36,ease:SOFT,stagger:0.18},3.3);
    tl.from(S(".col-r .badge"),{scale:0,opacity:0,duration:0.34,ease:POP,stagger:0.18},3.5);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('whoosh',1.5,0.26),('transfer',2.4),('capture',3.3),('tick',3.66),('tick',3.84),('chime',5.55)]))

# ===== Reel 3 — Customer Who Went Elsewhere =====
REELS.append(dict(n=3, slug='leadaline-reel-03-went-elsewhere', dur=8,
 lines=['THE CUSTOMER','<span class="accent">WHO WENT ELSEWHERE</span>'],
 bottom='Customers book with the one <span class="sep">who replies first.</span>',
 stage_css="""
  RID .headline{font-size:86px;}
  RID .waitc{position:absolute;left:0;top:78px;width:356px;}
  RID .panel.dim{background:linear-gradient(165deg,rgba(18,28,48,.72),rgba(10,18,36,.8));border:1px solid rgba(148,163,184,.14);box-shadow:0 30px 70px rgba(0,0,0,.45);}
  RID .panel.dim .pt{color:#AEBCCF;}
  RID .t-gy{background:linear-gradient(135deg,#3a4658,#2a3343);}
  RID .rightc{position:absolute;right:0;top:54px;width:440px;}
  RID .arrowx.a3{left:362px;top:300px;width:72px;}
  RID .nrep{margin-top:16px;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid rgba(148,163,184,.14);border-radius:14px;padding:15px 16px;color:#90a3bf;font-size:21px;font-weight:600;}
  RID .nrep svg{width:24px;height:24px;stroke:#90a3bf;}
 """,
 stage_html="""
  <div class="panel dim waitc"><div class="pt">Still waiting…</div>
   %s%s%s
   <div class="nrep">No Reply Yet %s</div>
  </div>
  <div class="arrowx a3">%s</div>
  <div class="panel rightc"><div class="gloss"></div>
   <div class="pt">They replied<span class="accent">instantly!</span></div>
   <div class="cap"><div class="chk">%s</div><div><div class="ct">New Enquiry Captured</div><div class="cs">10:42 AM</div></div></div>
   %s%s
   <div class="deliver"><div class="dt">Reply Sent</div><div class="chk">%s</div></div>
  </div>
 """%(lr('t-gy',IC['clock']),lr('t-gy',IC['user']),lr('t-gy',IC['phone']),IC['clock'],ARROW,
      IC['check'], lr('t-cy',IC['user']),lr('t-bl',IC['phone']), IC['check']),
 stage_js="""
    tl.from(S(".waitc"),{y:46,scale:0.95,opacity:0,duration:0.5,ease:SOFT},1.5);
    tl.from(S(".waitc .listrow"),{x:-18,opacity:0,duration:0.3,stagger:0.1},1.8);
    tl.from(S(".waitc .nrep"),{opacity:0,duration:0.34},2.2);
    tl.fromTo(S(".arrowx.a3"),{opacity:0},{opacity:1,duration:0.2},2.4);
    tl.fromTo(S(".arrowx.a3 .beam"),{scaleX:0},{scaleX:1,duration:0.45,ease:SMOOTH},2.45);
    tl.fromTo(S(".arrowx.a3 .packet"),{x:0,opacity:1},{x:56,opacity:0,duration:0.5,ease:"power1.in"},2.55);
    tl.from(S(".rightc"),{y:52,scale:0.93,opacity:0,duration:0.5,ease:SOFT},2.95);
    tl.fromTo(S(".rightc"),{boxShadow:"0 50px 110px rgba(2,8,24,.6),0 0 40px rgba(37,99,255,.2),inset 0 1px 0 rgba(255,255,255,.09)"},{boxShadow:"0 50px 110px rgba(2,8,24,.6),0 0 120px rgba(37,99,255,.6),inset 0 1px 0 rgba(255,255,255,.12)",duration:0.45,ease:"sine.out"},3.0);
    tl.from(S(".rightc .pt"),{y:16,opacity:0,duration:0.32},3.2);
    tl.from(S(".rightc .cap"),{y:16,opacity:0,duration:0.34,ease:SOFT},3.45);
    tl.from(S(".rightc .cap .chk"),{scale:0,opacity:0,duration:0.34,ease:POP},3.6);
    tl.from(S(".rightc .listrow"),{x:22,opacity:0,duration:0.32,stagger:0.16},3.8);
    tl.from(S(".rightc .deliver"),{y:24,opacity:0,duration:0.4,ease:SOFT},4.4);
    tl.from(S(".rightc .deliver .chk"),{scale:0,opacity:0,duration:0.38,ease:POP},4.62);
    tl.fromTo(S(".rightc .deliver"),{boxShadow:"0 14px 34px rgba(37,99,255,.42)"},{boxShadow:"0 14px 52px rgba(37,99,255,.85)",duration:0.4,ease:"sine.inOut",yoyo:true,repeat:1},4.62);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('whoosh',1.5,0.26),('transfer',2.45),('capture',3.6),('tick',3.95),('tick',4.62),('chime',5.55)]))

# ===== Reel 4 — Owner Summary Arrives Instantly =====
REELS.append(dict(n=4, slug='leadaline-reel-04-owner-summary', dur=8,
 lines=['OWNER SUMMARY','ARRIVES','<span class="accent">INSTANTLY</span>'],
 bottom='CLEAR.&nbsp;&nbsp; <span class="sep">INSTANT.</span>&nbsp;&nbsp; ACTIONABLE.', botclass='caps',
 stage_css="""
  RID .headline{font-size:96px;}
  RID .sumcard{position:absolute;left:50%;top:30px;transform:translateX(-50%);width:680px;}
 """,
 stage_html="""
  <div class="panel sumcard"><div class="gloss"></div>
   <div class="pt">New Lead Summary</div>
   <div style="margin-top:18px">
   %s%s%s%s%s%s
   </div>
  </div>
 """%(field('Name:','John Smith'),field('Service:','Electrical Fault'),field('Urgency:','High',hi=True),
      field('Location:','Manchester'),field('Phone:','07712 345678'),field('Next Step:','Call ASAP',hi=True)),
 stage_js="""
    tl.from(S(".sumcard"),{y:54,scale:0.94,opacity:0,duration:0.55,ease:SOFT},1.5);
    tl.fromTo(S(".sumcard"),{boxShadow:"0 50px 110px rgba(2,8,24,.6),0 0 40px rgba(37,99,255,.2),inset 0 1px 0 rgba(255,255,255,.09)"},{boxShadow:"0 50px 110px rgba(2,8,24,.6),0 0 120px rgba(37,99,255,.55),inset 0 1px 0 rgba(255,255,255,.12)",duration:0.5,ease:"sine.out"},1.75);
    tl.from(S(".sumcard .pt"),{y:16,opacity:0,duration:0.34},1.9);
    tl.from(S(".sumcard .field"),{x:26,opacity:0,duration:0.34,ease:SOFT,stagger:0.16},2.2);
    tl.from(S(".sumcard .fv.hi"),{color:"#F1F6FF",duration:0.01},3.0);
    tl.fromTo(S(".sumcard .field .fl b"),{scaleY:0},{scaleY:1,duration:0.3,ease:POP,stagger:0.16,transformOrigin:"top center"},2.25);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('capture',1.9),('tick',2.3),('tick',2.62),('tick',2.94),('chime',5.55)]))

# ===== Reel 5 — After-Hours Enquiry =====
REELS.append(dict(n=5, slug='leadaline-reel-05-after-hours', dur=8,
 lines=['AFTER-HOURS','ENQUIRY?','<span class="accent">WE’VE GOT IT.</span>'],
 bottom='We capture, qualify and alert <span class="sep">instantly.</span>',
 stage_css="""
  RID .headline{font-size:100px;}
  RID .clockwrap{text-align:center;margin-top:6px;}
  RID .steps{position:absolute;left:0;right:0;top:150px;display:flex;gap:18px;align-items:stretch;}
  RID .steps .step{flex:1;}
  RID .connector{position:absolute;left:60px;right:60px;top:248px;height:4px;border-radius:3px;background:linear-gradient(90deg,rgba(24,215,255,.1),rgba(37,99,255,.6),rgba(24,215,255,.1));transform:scaleX(0);transform-origin:left center;box-shadow:0 0 20px rgba(37,99,255,.5);}
 """,
 stage_html="""
  <div class="clockwrap"><div class="clock">%s 10:42 PM</div></div>
  <div class="connector"></div>
  <div class="steps">%s%s%s</div>
 """%(IC['clock'], step('01','Enquiry captured'),step('02','Details qualified'),step('03','Owner alerted')),
 stage_js="""
    tl.from(S(".clock"),{y:24,scale:0.9,opacity:0,duration:0.45,ease:POP},1.5);
    tl.fromTo(S(".connector"),{scaleX:0},{scaleX:1,duration:0.7,ease:"power2.inOut"},2.0);
    tl.from(S(".steps .step"),{y:40,opacity:0,duration:0.45,ease:SOFT,stagger:0.28},2.2);
    tl.from(S(".steps .num"),{scale:0,opacity:0,duration:0.4,ease:POP,stagger:0.28},2.35);
    tl.fromTo(S(".steps .sbar"),{scaleX:0},{scaleX:1,duration:0.4,ease:SMOOTH,stagger:0.28,transformOrigin:"left center"},2.55);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('capture',1.5),('transfer',2.0),('tick',2.3),('tick',2.58),('tick',2.86),('chime',5.55)]))

# ===== Reel 6 — AI Receptionist for Contractors =====
REELS.append(dict(n=6, slug='leadaline-reel-06-ai-receptionist', dur=8,
 lines=['AI RECEPTIONIST','<span class="accent">FOR CONTRACTORS</span>'],
 tagline='WORK LESS. <span class="accent">CAPTURE MORE.</span> GROW FASTER.', tagclass='caps',
 bottom='Never misses the important details.',
 stage_css="""
  RID .headline{font-size:100px;}
  RID .reccard{position:absolute;left:50%;top:24px;transform:translateX(-50%);width:640px;}
  RID .reccard .rh{display:flex;align-items:center;gap:16px;font-size:32px;font-weight:700;}
  RID .reccard .rh .ic{width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--cy),var(--bl));box-shadow:0 0 20px rgba(24,215,255,.5);}
  RID .reccard .rh .ic svg{width:26px;height:26px;stroke:#fff;}
  RID .reccard .rln{height:1px;background:rgba(120,160,220,.2);margin:18px 0 6px;}
  RID .rrow{display:flex;align-items:center;gap:18px;margin-top:16px;background:rgba(255,255,255,.04);border:1px solid rgba(148,163,184,.12);border-radius:16px;padding:16px 18px;}
  RID .rrow .rn{font-family:'DM Mono',monospace;font-size:30px;color:var(--cy);width:46px;flex:0 0 46px;}
  RID .rrow .rt{font-size:27px;font-weight:600;}
  RID .rrow .rbar{flex:1;height:8px;border-radius:5px;background:linear-gradient(90deg,rgba(140,170,225,.5),rgba(140,170,225,.14));}
 """,
 stage_html="""
  <div class="panel reccard"><div class="gloss"></div>
   <div class="rh"><div class="ic">%s</div>AI Receptionist</div>
   <div class="rln"></div>
   <div class="rrow"><div class="rn">01</div><div class="rt">Service needed</div><div class="rbar"></div></div>
   <div class="rrow"><div class="rn">02</div><div class="rt">Contact details</div><div class="rbar"></div></div>
   <div class="rrow"><div class="rn">03</div><div class="rt">Urgency</div><div class="rbar"></div></div>
   <div class="rrow"><div class="rn">04</div><div class="rt">Best time to call</div><div class="rbar"></div></div>
  </div>
 """%(IC['mic']),
 stage_js="""
    tl.from(S(".reccard"),{y:54,scale:0.94,opacity:0,duration:0.55,ease:SOFT},1.6);
    tl.fromTo(S(".reccard"),{boxShadow:"0 50px 110px rgba(2,8,24,.6),0 0 40px rgba(37,99,255,.2),inset 0 1px 0 rgba(255,255,255,.09)"},{boxShadow:"0 50px 110px rgba(2,8,24,.6),0 0 120px rgba(37,99,255,.55),inset 0 1px 0 rgba(255,255,255,.12)",duration:0.5,ease:"sine.out"},1.85);
    tl.from(S(".reccard .rh"),{y:16,opacity:0,duration:0.34},1.95);
    tl.from(S(".reccard .rh .ic"),{scale:0,opacity:0,duration:0.4,ease:POP},2.05);
    tl.from(S(".rrow"),{x:26,opacity:0,duration:0.34,ease:SOFT,stagger:0.18},2.3);
    tl.from(S(".rrow .rn"),{scale:0,opacity:0,duration:0.34,ease:POP,stagger:0.18},2.42);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('capture',1.95),('tick',2.4),('tick',2.58),('tick',2.76),('tick',2.94),('chime',5.55)]))

# ===== Reel 7 — Quote Follow-Up Problem =====
REELS.append(dict(n=7, slug='leadaline-reel-07-quote-followup', dur=8,
 lines=['THE QUOTE','FOLLOW-UP','<span class="accent">PROBLEM</span>'],
 bottom='Don’t let follow-ups slip. <span class="sep">Let LeadaLine win.</span>',
 stage_css="""
  RID .calwrap{position:absolute;left:0;top:62px;width:386px;}
  RID .col-r{position:absolute;right:0;top:96px;width:430px;}
  RID .arrowx.a7{left:392px;top:288px;width:66px;}
 """,
 stage_html="""
  <div class="cal calwrap"><h4>May 2025</h4>
   <div class="calgrid">
    <span class="hd">S</span><span class="hd">M</span><span class="hd">T</span><span class="hd">W</span><span class="hd">T</span><span class="hd">F</span><span class="hd">S</span>
    %s
   </div>
  </div>
  <div class="arrowx a7">%s</div>
  <div class="panel col-r"><div class="gloss"></div><div class="pt">Warm Leads<span class="accent">to Follow Up</span></div>
   %s%s%s
  </div>
 """%(
   "".join('<span>%d%s</span>'%(d, ('<i class="strk"></i>' if d in (1,6,8,13,15,20,22,27,29) else '')) for d in range(1,32)),
   ARROW,
   lr(None,None,dot=True,nm='Quote Sent',meta='2 days ago'),
   lr(None,None,dot=True,nm='Quote Sent',meta='5 days ago'),
   lr(None,None,dot=True,nm='Quote Sent',meta='7 days ago')),
 stage_js="""
    tl.from(S(".calwrap"),{y:46,scale:0.95,opacity:0,duration:0.5,ease:SOFT},1.5);
    tl.from(S(".calgrid span"),{opacity:0,duration:0.02,stagger:0.006},1.7);
    tl.fromTo(S(".calgrid .strk"),{scaleX:0},{scaleX:1,duration:0.3,ease:SMOOTH,stagger:0.07},2.0);
    tl.fromTo(S(".arrowx.a7"),{opacity:0},{opacity:1,duration:0.2},2.7);
    tl.fromTo(S(".arrowx.a7 .beam"),{scaleX:0},{scaleX:1,duration:0.4,ease:SMOOTH},2.75);
    tl.fromTo(S(".arrowx.a7 .packet"),{x:0,opacity:1},{x:50,opacity:0,duration:0.45,ease:"power1.in"},2.85);
    tl.from(S(".col-r"),{y:50,scale:0.94,opacity:0,duration:0.5,ease:SOFT},3.1);
    tl.from(S(".col-r .pt"),{y:16,opacity:0,duration:0.32},3.3);
    tl.from(S(".col-r .listrow"),{x:24,opacity:0,duration:0.34,ease:SOFT,stagger:0.18},3.5);
    tl.from(S(".col-r .dot"),{scale:0,opacity:0,duration:0.34,ease:POP,stagger:0.18},3.6);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('whoosh',1.5,0.26),('tick',2.05),('tick',2.2),('tick',2.35),('transfer',2.75),('capture',3.5),('chime',5.55)]))

# ===== Reel 8 — See Everything, Grow Faster =====
REELS.append(dict(n=8, slug='leadaline-reel-08-see-everything', dur=8.5,
 lines=['SEE EVERYTHING.','<span class="accent">GROW FASTER.</span>'],
 bottom='Data that helps you <span class="sep">make more money.</span>',
 stage_css="""
  RID .headline{font-size:104px;}
  RID .dash{position:absolute;left:0;right:0;top:40px;}
  RID .grid4{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  RID .chartbox .axis{display:flex;justify-content:space-between;font-size:16px;color:#7e8da3;margin-top:8px;font-family:'DM Mono',monospace;}
 """,
 stage_html="""
  <div class="panel dash"><div class="gloss"></div>
   <div class="grid4">
    <div class="statile"><div class="sl">Total Leads</div><div class="sv" id="s1">0</div><div class="sd">&#8599; 28.6%%</div></div>
    <div class="statile"><div class="sl">Qualified Leads</div><div class="sv" id="s2">0</div><div class="sd">&#8599; 32.4%%</div></div>
    <div class="statile"><div class="sl">Response Time</div><div class="sv" id="s3">0m</div><div class="sd">&#8600; 24.7%%</div></div>
    <div class="statile"><div class="sl">Conversion Rate</div><div class="sv" id="s4">0%%</div><div class="sd">&#8599; 36.1%%</div></div>
   </div>
   <div class="chart chartbox"><div class="clab">Performance Trend</div>
    <svg viewBox="0 0 420 170" style="width:100%%;height:170px;margin-top:8px" fill="none">
     <polyline id="ln1" points="10,150 70,138 130,120 190,96 250,78 310,52 380,26" stroke="#2563FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:1400;stroke-dashoffset:1400"/>
     <polyline id="ln2" points="10,158 70,150 130,140 190,128 250,116 310,98 380,84" stroke="#18D7FF" stroke-width="3.5" stroke-dasharray="2,8" stroke-linecap="round" stroke-linejoin="round" style="stroke-dashoffset:0;opacity:0"/>
    </svg>
    <div class="axis"><span>Apr 7</span><span>Apr 21</span><span>May 5</span><span>May 12</span></div>
   </div>
  </div>
 """,
 stage_js="""
    tl.from(S(".dash"),{y:54,scale:0.95,opacity:0,duration:0.55,ease:SOFT},1.5);
    tl.from(S(".statile"),{y:24,opacity:0,duration:0.4,ease:SOFT,stagger:0.12},1.85);
    function cu(id,end,fmt,t){var o={v:0};tl.to(o,{v:end,duration:1.0,ease:"power2.out",onUpdate:function(){document.querySelector(S(id)).textContent=fmt(o.v);}},t);}
    cu("#s1",2842,function(v){return Math.round(v).toLocaleString();},2.1);
    cu("#s2",1387,function(v){return Math.round(v).toLocaleString();},2.25);
    cu("#s3",18,function(v){return Math.round(v)+"m";},2.4);
    cu("#s4",24.6,function(v){return v.toFixed(1)+"%";},2.55);
    tl.from(S(".chartbox"),{y:24,opacity:0,duration:0.4,ease:SOFT},2.9);
    tl.to(S("#ln1"),{strokeDashoffset:0,duration:1.1,ease:"power2.inOut"},3.2);
    tl.to(S("#ln2"),{opacity:1,duration:0.6,ease:"sine.out"},3.6);
 """,
 logo_t=6.1,
 sfx=[('buzz',0),('whoosh',0.30),('capture',1.9),('tick',2.1),('tick',2.3),('tick',2.5),('transfer',3.2,0.5),('chime',6.05)]))

# ===== Reel 9 — Morning Rush =====
REELS.append(dict(n=9, slug='leadaline-reel-09-morning-rush', dur=8,
 lines=['MORNING RUSH?','<span class="accent">LET US HANDLE</span>','THE LEADS.'],
 bottom='While you get on with the work.',
 stage_css="""
  RID .enq{position:absolute;left:0;top:60px;width:316px;display:flex;flex-direction:column;gap:14px;}
  RID .col-r{position:absolute;right:0;top:84px;width:466px;}
  RID .arrowx.a9{left:320px;top:296px;width:96px;}
 """,
 stage_html="""
  <div class="enq">
   %s%s%s%s
  </div>
  <div class="arrowx a9">%s</div>
  <div class="panel col-r"><div class="gloss"></div><div class="pt">Lead Summary<span class="accent">In Progress</span></div>
   %s%s%s
   <div class="deliver"><div class="dt">Leads Organised</div><div class="chk">%s</div></div>
  </div>
 """%(chip('t-cy',IC['bell'],'New Enquiry','07:48 AM',bars=False),
      chip('t-bl',IC['bell'],'New Enquiry','07:49 AM',bars=False),
      chip('t-vi',IC['bell'],'New Enquiry','07:50 AM',bars=False),
      chip('t-cy',IC['bell'],'New Enquiry','07:51 AM',bars=False), ARROW,
      lr('t-cy',IC['user']),lr('t-bl',IC['phone']),lr('t-vi',IC['mail']), IC['check']),
 stage_js="""
    tl.from(S(".enq .chip"),{x:-60,opacity:0,duration:0.36,ease:SOFT,stagger:0.13},1.45);
    tl.fromTo(S(".arrowx.a9"),{opacity:0},{opacity:1,duration:0.2},2.35);
    tl.fromTo(S(".arrowx.a9 .beam"),{scaleX:0},{scaleX:1,duration:0.45,ease:SMOOTH},2.4);
    tl.fromTo(S(".arrowx.a9 .packet"),{x:0,opacity:1},{x:80,opacity:0,duration:0.5,ease:"power1.in"},2.5);
    tl.from(S(".col-r"),{y:50,scale:0.94,opacity:0,duration:0.5,ease:SOFT},2.85);
    tl.from(S(".col-r .pt"),{y:16,opacity:0,duration:0.34},3.1);
    tl.from(S(".col-r .listrow"),{x:24,opacity:0,duration:0.34,ease:SOFT,stagger:0.16},3.35);
    tl.from(S(".col-r .deliver"),{y:24,opacity:0,duration:0.4,ease:SOFT},4.2);
    tl.from(S(".col-r .deliver .chk"),{scale:0,opacity:0,duration:0.38,ease:POP},4.42);
    tl.fromTo(S(".col-r .deliver"),{boxShadow:"0 14px 34px rgba(37,99,255,.42)"},{boxShadow:"0 14px 52px rgba(37,99,255,.85)",duration:0.4,ease:"sine.inOut",yoyo:true,repeat:1},4.42);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('tick',1.45),('tick',1.58),('tick',1.71),('tick',1.84),('transfer',2.4),('capture',3.4),('chime',5.55)]))

# ===== Reel 10 — Free Tailored Demo =====
REELS.append(dict(n=10, slug='leadaline-reel-10-free-demo', dur=8.5, logotop=True,
 lines=['WE’LL BUILD YOU','<span class="accent">A FREE DEMO</span>','TAILORED TO','YOUR BUSINESS.'],
 stage_css="""
  RID .headline{font-size:82px;}
  RID .steps{position:absolute;left:0;right:0;top:20px;display:flex;gap:12px;}
  RID .steps .step{flex:1;padding:20px 14px;}
  RID .steps .stl{font-size:21px;}
  RID .steps .num{font-size:34px;}
  RID .connector{position:absolute;left:50px;right:50px;top:96px;height:4px;border-radius:3px;background:linear-gradient(90deg,rgba(24,215,255,.1),rgba(37,99,255,.6),rgba(24,215,255,.1));transform:scaleX(0);transform-origin:left center;box-shadow:0 0 20px rgba(37,99,255,.5);}
  RID .cta{position:absolute;left:0;right:0;bottom:6px;}
 """,
 stage_html="""
  <div class="connector"></div>
  <div class="steps">%s%s%s%s</div>
  <div class="cta">
   <div class="c1"><span class="accent">DM &lsquo;DEMO&rsquo;</span> for your free tailored demo</div>
   <div class="cln"></div>
   <div class="c2">or call <span class="accent">07484 657654</span></div>
  </div>
 """%(step('1','Enquiry Submitted'),step('2','AI Qualifies The Lead'),step('3','Owner Gets Summary'),step('4','Lead Appears In Portal')),
 stage_js="""
    tl.fromTo(S(".connector"),{scaleX:0},{scaleX:1,duration:0.7,ease:"power2.inOut"},2.2);
    tl.from(S(".steps .step"),{y:40,opacity:0,duration:0.42,ease:SOFT,stagger:0.2},2.35);
    tl.from(S(".steps .num"),{scale:0,opacity:0,duration:0.4,ease:POP,stagger:0.2},2.5);
    tl.fromTo(S(".steps .sbar"),{scaleX:0},{scaleX:1,duration:0.4,ease:SMOOTH,stagger:0.2,transformOrigin:"left center"},2.7);
    tl.from(S(".cta"),{y:34,opacity:0,duration:0.5,ease:SOFT},4.2);
    tl.fromTo(S(".cta"),{boxShadow:"0 0 30px rgba(37,99,255,.2)"},{boxShadow:"0 0 60px rgba(37,99,255,.6)",duration:0.5,ease:"sine.inOut",yoyo:true,repeat:1},4.6);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('transfer',2.2),('tick',2.5),('tick',2.7),('tick',2.9),('tick',3.1),('capture',4.2),('chime',6.05)]))
