# -*- coding: utf-8 -*-
# Waves 2 & 3 (s05-s12). Imported and appended by services_data.py
C='<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
I={
 'user':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 'phone':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
 'phonex':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/><line x1="15" y1="4" x2="21" y2="10"/><line x1="21" y1="4" x2="15" y2="10"/></svg>',
 'mail':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
 'chat':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/></svg>',
 'clock':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>',
 'cal':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
 'filter':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 4 21 4 14 13 14 20 10 20 10 13 3 4"/></svg>',
 'bell':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
 'chart':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 19h16M8 16l3-4 3 2 4-6"/></svg>',
 'mic':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="21"/></svg>',
}
MORE=[]

# ---- s05 Follow-Up : temperature re-warm ----
def fcard(nm,meta): return '<div class="fcard"><div><div class="fn">%s</div><div class="fmeta">%s</div></div><div class="tbar"><i></i></div><div class="ftag">Re-engaged</div></div>'%(nm,meta)
MORE.append(dict(n=5, slug='leadaline-svc05-followup-assistant', dur=9.0,
 badge='AI FOLLOW-UP ASSISTANT', hl='Quiet leads aren’t dead leads. <span class="ac">We bring them back.</span>',
 outcome='More enquiries <span class="ac">turn into customers.</span>',
 stage_css="""
  RID .seq{display:flex;align-items:center;justify-content:center;margin-bottom:34px;}
  RID .snode{display:flex;flex-direction:column;align-items:center;gap:9px;}
  RID .snode .sd{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--cy),var(--bl));box-shadow:0 0 14px rgba(24,215,255,.6);}
  RID .snode .sl{font-size:20px;color:#bcd0ea;font-weight:600;}
  RID .sline{width:130px;height:3px;border-radius:2px;background:linear-gradient(90deg,var(--cy),var(--bl));margin:0 8px 30px;transform:scaleX(0);transform-origin:left center;}
  RID .fcards{display:flex;flex-direction:column;gap:16px;width:660px;margin:0 auto;}
  RID .fcard{display:flex;align-items:center;gap:20px;padding:16px 22px;border-radius:16px;background:linear-gradient(165deg,rgba(22,38,68,.74),rgba(11,21,44,.82));border:1px solid rgba(120,160,220,.16);}
  RID .fcard .fn{font-size:24px;font-weight:600;} RID .fcard .fmeta{font-size:18px;color:#90a3bf;margin-top:3px;font-family:'DM Mono',monospace;}
  RID .fcard>div:first-child{flex:1;}
  RID .tbar{width:190px;height:13px;border-radius:8px;background:rgba(255,255,255,.07);overflow:hidden;flex:0 0 190px;}
  RID .tbar i{display:block;height:100%;width:100%;border-radius:8px;background:#18D7FF;transform-origin:left center;}
  RID .ftag{font-size:18px;font-weight:700;color:var(--cy);opacity:0;flex:0 0 auto;}
 """,
 stage_html='<div class="seq"><div class="snode"><div class="sd"></div><div class="sl">Day 1</div></div><div class="sline"></div><div class="snode"><div class="sd"></div><div class="sl">Day 3</div></div><div class="sline"></div><div class="snode"><div class="sd"></div><div class="sl">Day 7</div></div></div>'+
   '<div class="fcards">'+fcard('Quote — extension','Sent 5 days ago')+fcard('Quote — rewire','Sent 6 days ago')+fcard('Quote — boiler','Sent 8 days ago')+'</div>',
 stage_js="""
  tl.from(S(".fcards .fcard"),{y:24,opacity:0,duration:0.4,ease:SOFT,stagger:0.12},1.4);
  tl.to(S(".tbar i"),{scaleX:0.2,backgroundColor:"#46566b",duration:0.7,ease:SMOOTH,stagger:0.1},1.9);
  tl.from(S(".seq .snode"),{scale:0,opacity:0,duration:0.4,ease:POP,stagger:0.3},2.7);
  tl.fromTo(S(".sline"),{scaleX:0},{scaleX:1,duration:0.4,ease:SMOOTH,stagger:0.3},2.9);
  tl.to(S(".tbar i"),{scaleX:0.92,backgroundColor:"#18D7FF",duration:0.7,ease:SOFT,stagger:0.12},4.0);
  tl.to(S(".ftag"),{opacity:1,duration:0.34,ease:POP,stagger:0.12},4.6);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('tick',1.9),('transfer',2.9),('pop',4.0),('pop',4.2),('pop',4.4),('chime',7.2)]))

# ---- s06 Calling : waveform + summary ----
MORE.append(dict(n=6, slug='leadaline-svc06-calling-assistant', dur=9.0,
 badge='AI CALLING ASSISTANT', hl='A warm lead just came in. <span class="ac">We call within minutes.</span>',
 outcome='Faster response. <span class="ac">Higher conversion.</span>',
 stage_css="""
  RID .callwrap{display:flex;gap:22px;align-items:stretch;width:840px;margin:0 auto;}
  RID .callp{flex:0 0 320px;padding:28px 24px;display:flex;flex-direction:column;align-items:center;gap:20px;justify-content:center;}
  RID .cav{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,#0E2240,#0A1830);border:1px solid rgba(120,180,255,.32);display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(37,99,255,.35);} RID .cav svg{width:46px;height:46px;stroke:var(--cy);}
  RID .cst{font-size:25px;font-weight:600;color:#EAF4FF;}
  RID .wave{display:flex;align-items:center;gap:7px;height:64px;}
  RID .wave b{width:8px;height:22px;border-radius:5px;background:linear-gradient(180deg,#18D7FF,#2563FF);display:block;transform-origin:center;}
  RID .sumc{flex:1;padding:26px;} RID .sumc .sct{font-size:27px;font-weight:700;margin-bottom:14px;}
  RID .srow{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid rgba(120,160,220,.14);font-size:23px;}
  RID .srow:last-child{border-bottom:none;} RID .srow .sk{color:#9fb2cc;} RID .srow .sv{font-weight:600;} RID .srow .sv.hi{color:var(--cy);}
  RID .note{margin-top:22px;text-align:center;font-size:23px;color:#9fb2cc;} RID .note b{color:var(--cy);font-weight:700;}
 """,
 stage_html='<div class="callwrap"><div class="card callp"><div class="cav">'+I['phone']+'</div><div class="cst">Calling…</div><div class="wave">'+("<b></b>"*9)+'</div></div>'+
   '<div class="card sumc"><div class="sct">Call summary</div>'+
   '<div class="srow"><span class="sk">Name</span><span class="sv">Sarah P.</span></div>'+
   '<div class="srow"><span class="sk">Service</span><span class="sv">Roof repair</span></div>'+
   '<div class="srow"><span class="sk">Status</span><span class="sv hi">Qualified</span></div>'+
   '<div class="srow"><span class="sk">Outcome</span><span class="sv hi">Booked</span></div>'+
   '</div></div><div class="note">Warm inbound only · <b>never cold calling</b></div>',
 stage_js="""
  tl.from(S(".callp"),{x:-30,opacity:0,duration:0.5,ease:SOFT},1.4);
  tl.from(S(".cav"),{scale:0,opacity:0,duration:0.45,ease:POP},1.7);
  tl.to(S(".wave b"),{scaleY:2.6,duration:0.32,ease:"sine.inOut",stagger:{each:0.07,from:"center",yoyo:true,repeat:7}},1.95);
  tl.from(S(".sumc"),{x:30,opacity:0,duration:0.5,ease:SOFT},2.4);
  tl.from(S(".sumc .sct"),{y:14,opacity:0,duration:0.34},2.7);
  tl.from(S(".srow"),{x:20,opacity:0,duration:0.34,ease:SOFT,stagger:0.18},3.0);
  tl.from(S(".note"),{opacity:0,y:12,duration:0.4},4.4);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('transfer',1.7,0.5),('tick',3.0),('tick',3.18),('capture',3.6),('chime',7.2)]))

# ---- s07 Admin : chaos -> tidy checklist ----
def arow(lab): return '<div class="arow"><div class="ack">'+C+'</div><div class="atx">'+lab+'</div></div>'
MORE.append(dict(n=7, slug='leadaline-svc07-admin-assistant', dur=9.0,
 badge='AI ADMIN ASSISTANT', hl='The admin pile, <span class="ac">handled for you.</span>',
 outcome='Less paperwork. <span class="ac">More time on the tools.</span>',
 stage_css="""
  RID .admin{width:700px;margin:0 auto;padding:30px 28px;}
  RID .ah{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;}
  RID .ah .at{font-size:31px;font-weight:700;} RID .ah .ac2{font-size:23px;color:var(--cy);font-weight:700;font-family:'DM Mono',monospace;}
  RID .arow{display:flex;align-items:center;gap:18px;padding:16px 20px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(148,163,184,.12);margin-top:14px;}
  RID .arow .ack{width:40px;height:40px;flex:0 0 40px;border-radius:11px;border:2px solid rgba(120,160,220,.4);display:flex;align-items:center;justify-content:center;background:rgba(120,160,220,0);}
  RID .arow .ack svg{width:22px;height:22px;stroke:#fff;opacity:0;}
  RID .arow .atx{font-size:25px;font-weight:600;}
 """,
 stage_html='<div class="card admin"><div class="ah"><div class="at">Office admin</div><div class="ac2">6 hrs saved / wk</div></div>'+
   arow('Log the new enquiry')+arow('Update customer record')+arow('Notify the team')+arow('Organise &amp; tag leads')+'</div>',
 stage_js="""
  tl.from(S(".admin"),{y:40,scale:0.96,opacity:0,duration:0.5,ease:SOFT},1.4);
  tl.from(S(".ah .at"),{opacity:0,y:-10,duration:0.34},1.7);
  tl.from(S(".arow"),{x:-30,rotation:-3,opacity:0,duration:0.4,ease:SOFT,stagger:0.28},1.9);
  tl.to(S(".arow .ack"),{backgroundColor:"#1f9fe0",borderColor:"rgba(0,0,0,0)",duration:0.3,stagger:0.28},2.4);
  tl.to(S(".arow .ack svg"),{opacity:1,duration:0.3,ease:POP,stagger:0.28},2.5);
  var o={v:0};tl.to(S(".ah .ac2"),{duration:0.01},2.0);
  tl.from(S(".ah .ac2"),{scale:0,opacity:0,duration:0.4,ease:"back.out(2.2)"},3.8);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('pop',2.5),('pop',2.78),('pop',3.06),('pop',3.34),('capture',3.8),('chime',7.2)]))

# ---- s08 Reporting : report assembles ----
MORE.append(dict(n=8, slug='leadaline-svc08-reporting-assistant', dur=9.0,
 badge='AI REPORTING ASSISTANT', hl='Know exactly how your leads <span class="ac">are performing.</span>',
 outcome='Clear reports, <span class="ac">straight to your inbox.</span>',
 stage_css="""
  RID .rep{width:720px;margin:0 auto;padding:28px;}
  RID .rh{display:flex;justify-content:space-between;align-items:center;}
  RID .rh .rt{font-size:30px;font-weight:700;}
  RID .rtoggle{display:flex;gap:6px;background:rgba(255,255,255,.05);border-radius:11px;padding:5px;}
  RID .rtoggle span{font-size:19px;padding:8px 15px;border-radius:8px;color:#9fb2cc;font-weight:600;} RID .rtoggle .on{background:linear-gradient(135deg,var(--cy),var(--bl));color:#fff;}
  RID .rsub{font-size:20px;color:#8294ad;margin:4px 0 20px;}
  RID .kpis{display:flex;gap:14px;margin-bottom:22px;}
  RID .kpi{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(120,160,220,.14);border-radius:14px;padding:16px;}
  RID .kpi .kl{font-size:19px;color:#9fb2cc;} RID .kpi .kv{font-size:44px;font-weight:800;letter-spacing:-1px;margin-top:4px;font-variant-numeric:tabular-nums;}
  RID .rchart{display:flex;align-items:flex-end;gap:14px;height:150px;padding:0 4px;}
  RID .rchart b{flex:1;border-radius:8px 8px 0 0;background:linear-gradient(180deg,#2563FF,#18D7FF);transform-origin:bottom;transform:scaleY(0);display:block;}
 """,
 stage_html="""<div class="card rep">
   <div class="rh"><div class="rt">Weekly report</div><div class="rtoggle"><span class="on">Weekly</span><span>Monthly</span></div></div>
   <div class="rsub">Mon–Sun performance</div>
   <div class="kpis">
     <div class="kpi"><div class="kl">Leads</div><div class="kv" id="k1">0</div></div>
     <div class="kpi"><div class="kl">Booked</div><div class="kv" id="k2">0</div></div>
     <div class="kpi"><div class="kl">Conversion</div><div class="kv" id="k3">0%</div></div>
   </div>
   <div class="rchart"><b style="--h:.45"></b><b style="--h:.6"></b><b style="--h:.5"></b><b style="--h:.78"></b><b style="--h:.9"></b><b style="--h:1"></b></div>
 </div>""",
 stage_js="""
  tl.from(S(".rep"),{y:42,scale:0.96,opacity:0,duration:0.5,ease:SOFT},1.4);
  tl.from(S(".rh"),{opacity:0,y:-12,duration:0.4},1.7);
  tl.from(S(".rsub"),{opacity:0,duration:0.34},1.85);
  tl.from(S(".kpi"),{y:20,opacity:0,duration:0.4,ease:SOFT,stagger:0.12},2.0);
  function cu(id,end,fmt,t){var o={v:0};tl.to(o,{v:end,duration:1.0,ease:"power2.out",onUpdate:function(){document.querySelector(S(id)).textContent=fmt(o.v);}},t);}
  cu("#k1",48,function(v){return Math.round(v);},2.2);
  cu("#k2",19,function(v){return Math.round(v);},2.35);
  cu("#k3",40,function(v){return Math.round(v)+"%";},2.5);
  tl.to(S(".rchart b"),{scaleY:function(i,el){return parseFloat(el.style.getPropertyValue("--h"));},duration:0.6,ease:"power2.out",stagger:0.08},2.9);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('capture',1.7),('tick',2.2),('tick',2.4),('tick',2.6),('transfer',2.9,0.5),('chime',7.2)]))

# ---- s09 Missed Call Recovery : phone + SMS ----
MORE.append(dict(n=9, slug='leadaline-svc09-missed-call-recovery', dur=8.5,
 badge='MISSED CALL RECOVERY', hl='Missed their call? <span class="ac">We text back instantly.</span>',
 outcome='Turn missed calls into <span class="ac">booked jobs.</span>',
 stage_css="""
  RID .ph{width:420px;margin:0 auto;border-radius:40px;padding:28px 24px;min-height:480px;display:flex;flex-direction:column;gap:18px;}
  RID .mc{display:flex;align-items:center;gap:14px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);border-radius:16px;padding:16px;}
  RID .mc .mi{width:48px;height:48px;flex:0 0 48px;border-radius:12px;background:linear-gradient(135deg,#FF6B6B,#E23B3B);display:flex;align-items:center;justify-content:center;} RID .mc .mi svg{width:24px;height:24px;stroke:#fff;}
  RID .mc .mt{font-size:24px;font-weight:600;} RID .mc .ms{font-size:18px;color:#c69;font-family:'DM Mono',monospace;margin-top:3px;}
  RID .smsb{align-self:flex-start;max-width:92%;background:linear-gradient(135deg,#2D6BFF,#18C8F2);color:#fff;border-radius:22px 22px 22px 6px;padding:17px 21px;font-size:24px;font-weight:500;box-shadow:0 10px 26px rgba(0,0,0,.28);}
  RID .capd{margin-top:auto;display:flex;align-items:center;gap:13px;background:linear-gradient(120deg,rgba(37,99,255,.2),rgba(24,215,255,.08));border:1px solid rgba(37,99,255,.4);border-radius:14px;padding:15px 18px;font-size:23px;font-weight:600;}
  RID .capd .cc{width:36px;height:36px;flex:0 0 36px;} RID .capd .cc svg{width:20px;height:20px;}
 """,
 stage_html='<div class="card ph"><div class="mc"><div class="mi">'+I['phonex']+'</div><div><div class="mt">Missed Call</div><div class="ms">2:14 PM</div></div></div>'+
   '<div class="smsb">Hi, sorry we missed your call! How can we help?</div>'+
   '<div class="capd"><span class="cc chk">'+C+'</span>Lead captured · owner notified</div></div>',
 stage_js="""
  tl.from(S(".ph"),{y:50,scale:0.95,opacity:0,duration:0.5,ease:SOFT},1.4);
  tl.from(S(".mc"),{x:-20,opacity:0,duration:0.4,ease:POP},1.8);
  tl.to(S(".mc"),{keyframes:{x:[0,-6,5,-3,0]},duration:0.3,ease:"none"},2.1);
  tl.from(S(".smsb"),{y:24,scale:0.9,opacity:0,duration:0.45,ease:POP,transformOrigin:"left bottom"},2.7);
  tl.from(S(".capd"),{y:20,opacity:0,duration:0.45,ease:POP},3.6);
  tl.from(S(".capd .cc"),{scale:0,opacity:0,duration:0.4,ease:"back.out(2.4)"},3.85);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('pop',2.7),('capture',3.6),('chime',6.7)]))

# ---- s10 Website Lead Capture : browser + form ----
def fld(ph,val): return '<div class="fld2"><span class="ph2">%s</span><span class="val">%s</span></div>'%(ph,val)
MORE.append(dict(n=10, slug='leadaline-svc10-website-capture', dur=9.0,
 badge='WEBSITE LEAD CAPTURE', hl='Turn website visitors into <span class="ac">qualified enquiries.</span>',
 outcome='More conversions <span class="ac">from the same traffic.</span>',
 stage_css="""
  RID .br{width:760px;margin:0 auto;border-radius:18px;overflow:hidden;}
  RID .brbar{display:flex;align-items:center;gap:9px;padding:16px 20px;background:rgba(255,255,255,.05);border-bottom:1px solid rgba(120,160,220,.14);}
  RID .brbar .d{width:13px;height:13px;border-radius:50%;background:#46566b;}
  RID .brurl{flex:1;margin-left:12px;height:40px;border-radius:20px;background:rgba(255,255,255,.06);display:flex;align-items:center;padding:0 18px;font-size:20px;color:#9fb2cc;font-family:'DM Mono',monospace;}
  RID .brbody{padding:30px;}
  RID .formt{font-size:30px;font-weight:700;margin-bottom:20px;}
  RID .fld2{height:60px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(148,163,184,.16);display:flex;align-items:center;padding:0 18px;font-size:23px;margin-bottom:14px;position:relative;}
  RID .fld2 .ph2{color:#7e8da3;} RID .fld2 .val{position:absolute;left:18px;color:#EAF1FB;font-weight:600;opacity:0;}
  RID .subm{height:60px;border-radius:12px;background:linear-gradient(135deg,#29D8F6,#2C7CFF);color:#06101F;font-size:24px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:4px;}
  RID .qlead{margin-top:16px;display:flex;align-items:center;justify-content:center;gap:12px;font-size:23px;font-weight:700;color:var(--cy);opacity:0;}
  RID .qlead .qc{width:34px;height:34px;} RID .qlead .qc svg{width:20px;height:20px;}
 """,
 stage_html='<div class="card br"><div class="brbar"><span class="d"></span><span class="d"></span><span class="d"></span><div class="brurl">yourbusiness.co.uk</div></div>'+
   '<div class="brbody"><div class="formt">Get a free quote</div>'+fld('Name','John D.')+fld('Service needed','Boiler repair')+fld('Postcode','M20')+
   '<div class="subm">Send enquiry</div></div></div>'+
   '<div class="qlead"><span class="qc chk">'+C+'</span>Qualified lead sent to owner</div>',
 stage_js="""
  tl.from(S(".br"),{y:42,scale:0.96,opacity:0,duration:0.5,ease:SOFT},1.4);
  tl.from(S(".brbar .d"),{scale:0,duration:0.3,stagger:0.06,ease:POP},1.7);
  tl.from(S(".formt"),{y:14,opacity:0,duration:0.34},1.9);
  tl.from(S(".fld2"),{y:16,opacity:0,duration:0.34,ease:SOFT,stagger:0.18},2.1);
  tl.to(S(".fld2 .ph2"),{opacity:0,duration:0.2,stagger:0.4},2.7);
  tl.to(S(".fld2 .val"),{opacity:1,duration:0.3,stagger:0.4},2.75);
  tl.from(S(".subm"),{y:14,opacity:0,duration:0.34},4.1);
  tl.fromTo(S(".subm"),{boxShadow:"0 0 0 rgba(37,99,255,0)"},{boxShadow:"0 0 40px rgba(37,99,255,.7)",duration:0.4,ease:"sine.inOut",yoyo:true,repeat:1},4.4);
  tl.from(S(".qlead"),{y:16,opacity:0,duration:0.4,ease:POP},4.9);
  tl.from(S(".qlead .qc"),{scale:0,opacity:0,duration:0.36,ease:"back.out(2.4)"},5.1);
 """,
 outro=7.6,
 sfx=[('buzz',0),('whoosh',0.30),('tick',2.75),('tick',3.15),('tick',3.55),('pop',4.4),('capture',4.9),('chime',8.0)]))

# ---- s11 CRM & Lead Tracking : kanban ----
def kcard(c): return '<div class="kcard"><div class="kd %s"></div>Lead</div>'%c
MORE.append(dict(n=11, slug='leadaline-svc11-crm-tracking', dur=9.0,
 badge='CRM & LEAD TRACKING', hl='Every enquiry tracked. <span class="ac">Nothing forgotten.</span>',
 outcome='Complete visibility, <span class="ac">start to finish.</span>',
 stage_css="""
  RID .kb{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;width:880px;margin:0 auto;}
  RID .col{background:rgba(255,255,255,.03);border:1px solid rgba(120,160,220,.12);border-radius:16px;padding:14px 12px;min-height:380px;}
  RID .colh{font-size:21px;font-weight:700;text-align:center;margin-bottom:14px;color:#cdd8e8;}
  RID .col.won .colh{color:var(--cy);}
  RID .kcard{background:linear-gradient(165deg,rgba(24,42,74,.85),rgba(11,22,46,.9));border:1px solid rgba(120,180,255,.22);border-radius:12px;padding:13px;margin-bottom:11px;display:flex;align-items:center;gap:11px;font-size:20px;font-weight:600;box-shadow:0 8px 20px rgba(0,0,0,.3);}
  RID .kcard .kd{width:28px;height:28px;border-radius:8px;flex:0 0 28px;}
 """,
 stage_html='<div class="kb">'+
   '<div class="col"><div class="colh">New</div>'+kcard('t-cy')+kcard('t-bl')+'</div>'+
   '<div class="col"><div class="colh">Qualified</div>'+kcard('t-vi')+kcard('t-cy')+'</div>'+
   '<div class="col"><div class="colh">Booked</div>'+kcard('t-bl')+'</div>'+
   '<div class="col won"><div class="colh">Won</div>'+kcard('t-gr')+kcard('t-cy')+'</div>'+
   '</div>',
 stage_js="""
  tl.from(S(".col"),{y:30,opacity:0,duration:0.42,ease:SOFT,stagger:0.14},1.4);
  tl.from(S(".col .colh"),{opacity:0,y:-8,duration:0.3,stagger:0.14},1.6);
  var cards=gsap.utils.toArray(S(".kcard"));
  cards.forEach((el,i)=>{ tl.from(el,{x:-40,opacity:0,scale:0.9,duration:0.4,ease:POP},2.2+i*0.32); });
 """,
 sfx=[('buzz',0),('whoosh',0.30),('pop',2.2),('pop',2.52),('pop',2.84),('pop',3.16),('pop',3.48),('capture',3.8),('chime',7.2)]))

# ---- s12 Full AI Office Team : system assembly ----
def mod(cls,ic,lab,tile): return '<div class="mod %s"><div class="mi %s">%s</div><div class="ml">%s</div></div>'%(cls,tile,ic,lab)
MORE.append(dict(n=12, slug='leadaline-svc12-office-team', dur=10.0, outro=7.6,
 badge='FULL AI OFFICE TEAM', hl='Your entire front office, <span class="ac">powered by AI.</span>',
 outcome='Capture and convert more — <span class="ac">with less admin.</span>',
 stage_css="""
  RID .sys{position:relative;width:700px;height:540px;margin:0 auto;}
  RID .beams{position:absolute;inset:0;z-index:1;}
  RID .beams line{stroke:url(#bgGID);stroke-width:3;stroke-linecap:round;stroke-dasharray:600;stroke-dashoffset:600;}
  RID .hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:140px;height:140px;border-radius:50%;background:linear-gradient(135deg,#0E2240,#0A1830);border:2px solid rgba(24,215,255,.55);display:flex;align-items:center;justify-content:center;box-shadow:0 0 50px rgba(37,99,255,.5);z-index:3;}
  RID .hub svg{width:78px;height:78px;}
  RID .mod{position:absolute;display:flex;flex-direction:column;align-items:center;gap:9px;width:150px;z-index:2;}
  RID .mod .mi{width:66px;height:66px;border-radius:17px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(0,0,0,.35);} RID .mod .mi svg{width:32px;height:32px;stroke:#fff;}
  RID .mod .ml{font-size:21px;font-weight:600;text-align:center;}
  RID .m1{left:25px;top:0;} RID .m2{right:25px;top:0;}
  RID .m3{left:-16px;top:50%;transform:translateY(-50%);} RID .m4{right:-16px;top:50%;transform:translateY(-50%);}
  RID .m5{left:70px;bottom:0;} RID .m6{right:70px;bottom:0;}
 """,
 stage_html="""<div class="sys">
   <svg class="beams" viewBox="0 0 700 540"><defs><linearGradient id="bgGID" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#18D7FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs>
     <line x1="350" y1="270" x2="110" y2="60"/><line x1="350" y1="270" x2="590" y2="60"/>
     <line x1="350" y1="270" x2="70" y2="270"/><line x1="350" y1="270" x2="630" y2="270"/>
     <line x1="350" y1="270" x2="145" y2="480"/><line x1="350" y1="270" x2="555" y2="480"/>
   </svg>
   <div class="hub"><svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="hgGID" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#18D7FF"/><stop offset=".5" stop-color="#2563FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs><rect x="13" y="7" width="14" height="50" rx="7" fill="url(#hgGID)"/><rect x="13" y="43" width="40" height="14" rx="7" fill="url(#hgGID)"/><rect x="33" y="7" width="11" height="28" rx="5.5" fill="#18D7FF"/></svg></div>
   """+mod('m1',I['chat'],'Receptionist','t-cy')+mod('m2',I['filter'],'Sales','t-bl')+mod('m3',I['cal'],'Booking','t-vi')+mod('m4',I['bell'],'Follow-Up','t-cy')+mod('m5',I['phone'],'Calling','t-bl')+mod('m6',I['chart'],'Reporting','t-vi')+"""
 </div>""",
 stage_js="""
  tl.from(S(".hub"),{scale:0,opacity:0,duration:0.55,ease:"back.out(1.9)"},1.5);
  ["m1","m2","m3","m4","m5","m6"].forEach((m,i)=>{ tl.from(S("."+m),{scale:0.3,opacity:0,duration:0.42,ease:POP},1.9+i*0.26);
     tl.from(S("."+m+" .mi"),{rotation:-20,duration:0.4,ease:SOFT},1.95+i*0.26); });
  tl.to(S(".beams line"),{strokeDashoffset:0,duration:0.7,ease:"power2.out",stagger:0.22},2.2);
  tl.fromTo(S(".hub"),{boxShadow:"0 0 30px rgba(37,99,255,.4)"},{boxShadow:"0 0 70px rgba(37,99,255,.75)",duration:0.7,ease:"sine.inOut",yoyo:true,repeat:2},3.8);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('pop',1.9),('pop',2.16),('pop',2.42),('pop',2.68),('transfer',2.2),('capture',3.8),('chime',8.0)]))
