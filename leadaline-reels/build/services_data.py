# -*- coding: utf-8 -*-
C='<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
USER='<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'
SERVICES=[]

# ---------- s01 AI Lead Engine : vertical 6-step pipeline ----------
_steps=[("1","Capture enquiry","t-cy"),("2","Respond instantly","t-bl"),("3","Qualify the lead","t-vi"),
        ("4","Book the job","t-cy"),("5","Notify the owner","t-bl"),("6","Track performance","t-vi")]
SERVICES.append(dict(n=1, slug='leadaline-svc01-lead-engine', dur=9.5, outro=7.0,
 badge='AI LEAD ENGINE', hl='Every enquiry, <span class="ac">handled end to end.</span>',
 outcome='Capture, qualify and convert — <span class="ac">automatically.</span>',
 stage_css="""
  RID .pipe{position:relative;width:600px;margin:0 auto;}
  RID .pbeam{position:absolute;left:48px;top:24px;bottom:46px;width:4px;border-radius:3px;background:linear-gradient(180deg,#18D7FF,#2563FF,#7C5CFF);transform:scaleY(0);transform-origin:top;box-shadow:0 0 18px rgba(37,99,255,.6);z-index:0;}
  RID .pdot{position:absolute;left:42px;top:14px;width:16px;height:16px;border-radius:50%;background:#dffaff;box-shadow:0 0 20px 6px rgba(24,215,255,.9);opacity:0;z-index:3;}
  RID .pstep{position:relative;z-index:2;display:flex;align-items:center;gap:22px;margin:0 0 16px;padding:16px 22px;border-radius:18px;background:linear-gradient(165deg,rgba(22,38,68,.72),rgba(11,21,44,.82));border:1px solid rgba(120,160,220,.16);box-shadow:0 16px 40px rgba(0,0,0,.32);}
  RID .pstep .pn{width:54px;height:54px;flex:0 0 54px;border-radius:14px;font-family:'DM Mono',monospace;font-size:26px;font-weight:600;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(0,0,0,.3);}
  RID .pstep .pl{font-size:31px;font-weight:600;}
 """,
 stage_html='<div class="pipe"><div class="pbeam"></div><div class="pdot"></div>'+
   "".join('<div class="pstep"><div class="pn %s">%s</div><div class="pl">%s</div></div>'%(c,n,l) for n,l,c in _steps)+
   '</div>',
 stage_js="""
  tl.from(S(".pstep"),{x:-34,opacity:0,duration:0.42,ease:SOFT,stagger:0.34},1.5);
  tl.from(S(".pstep .pn"),{scale:0,opacity:0,duration:0.4,ease:POP,stagger:0.34},1.62);
  tl.fromTo(S(".pbeam"),{scaleY:0},{scaleY:1,duration:2.0,ease:"power1.inOut"},1.7);
  tl.fromTo(S(".pdot"),{y:0,opacity:1},{y:486,duration:2.0,ease:"power1.inOut"},1.7);
  tl.to(S(".pdot"),{opacity:0,duration:0.3},3.8);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('transfer',1.7),('tick',1.7),('tick',2.4),('tick',3.1),('capture',3.9),('chime',7.4)]))

# ---------- s02 AI Receptionist : 24/7 clock ring ----------
SERVICES.append(dict(n=2, slug='leadaline-svc02-receptionist', dur=9.0,
 badge='AI RECEPTIONIST', hl='Every enquiry answered. <span class="ac">Even at 2am.</span>',
 outcome='Always on. <span class="ac">Never miss an enquiry again.</span>',
 stage_css="""
  RID .cw{position:relative;width:540px;height:540px;margin:0 auto;}
  RID .cw .ring{position:absolute;inset:0;}
  RID .cc{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
  RID .cc .big{font-family:'Archivo',sans-serif;font-weight:900;font-size:118px;line-height:1;background:linear-gradient(135deg,#18D7FF,#2563FF 60%,#7C5CFF);-webkit-background-clip:text;background-clip:text;color:transparent;}
  RID .cc .sm{font-size:27px;color:#bcd0ea;margin-top:6px;}
  RID .ping{position:absolute;display:flex;align-items:center;gap:11px;background:linear-gradient(165deg,rgba(22,38,68,.94),rgba(11,21,44,.96));border:1px solid rgba(120,180,255,.32);border-radius:14px;padding:11px 16px;font-size:22px;font-weight:600;font-family:'DM Mono',monospace;box-shadow:0 12px 28px rgba(0,0,0,.45);}
  RID .ping .pc{width:30px;height:30px;flex:0 0 30px;} RID .ping .pc svg{width:18px;height:18px;}
  RID .p1{top:-14px;left:50%;transform:translateX(-50%);} RID .p2{top:44%;right:-40px;}
  RID .p3{bottom:-14px;left:50%;transform:translateX(-50%);} RID .p4{top:44%;left:-40px;}
 """,
 stage_html="""<div class="cw">
   <svg class="ring" viewBox="0 0 540 540"><defs><linearGradient id="rgGID" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#18D7FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs>
     <circle cx="270" cy="270" r="244" fill="none" stroke="rgba(120,160,220,.16)" stroke-width="14"/>
     <circle class="prog" cx="270" cy="270" r="244" fill="none" stroke="url(#rgGID)" stroke-width="14" stroke-linecap="round" transform="rotate(-90 270 270)" style="stroke-dasharray:1533;stroke-dashoffset:1533"/>
   </svg>
   <div class="cc"><div class="big">24/7</div><div class="sm">Always answered</div></div>
   <div class="ping p1"><span class="pc chk">"""+C+"""</span>2:14 AM</div>
   <div class="ping p2"><span class="pc chk">"""+C+"""</span>7:40 AM</div>
   <div class="ping p3"><span class="pc chk">"""+C+"""</span>1:05 PM</div>
   <div class="ping p4"><span class="pc chk">"""+C+"""</span>11:32 PM</div>
 </div>""",
 stage_js="""
  tl.from(S(".cc .big"),{scale:0.6,opacity:0,duration:0.6,ease:"back.out(2)"},1.5);
  tl.from(S(".cc .sm"),{opacity:0,y:10,duration:0.4},1.9);
  tl.to(S(".prog"),{strokeDashoffset:0,duration:2.6,ease:"power2.inOut"},1.7);
  ["p1","p2","p3","p4"].forEach((p,i)=>{ tl.from(S("."+p),{scale:0,opacity:0,duration:0.4,ease:POP},2.1+i*0.5);
     tl.from(S("."+p+" .pc"),{scale:0,opacity:0,duration:0.34,ease:"back.out(2.4)"},2.25+i*0.5); });
 """,
 sfx=[('buzz',0),('whoosh',0.30),('transfer',1.7,0.5),('tick',2.1),('tick',2.6),('tick',3.1),('tick',3.6),('chime',7.2)]))

# ---------- s03 AI Sales Assistant : funnel + scoring ----------
SERVICES.append(dict(n=3, slug='leadaline-svc03-sales-assistant', dur=9.0,
 badge='AI SALES ASSISTANT', hl='Spot the serious buyers. <span class="ac">Skip the tyre-kickers.</span>',
 outcome='Your time on <span class="ac">real opportunities</span> only.',
 stage_css="""
  RID .funnel{width:640px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:24px;}
  RID .leadsrow{display:flex;gap:14px;}
  RID .lchip{display:flex;align-items:center;gap:10px;background:linear-gradient(165deg,rgba(22,38,68,.8),rgba(11,21,44,.86));border:1px solid rgba(120,160,220,.16);border-radius:13px;padding:11px 15px;font-size:21px;font-weight:600;}
  RID .lchip .ti{width:32px;height:32px;border-radius:9px;flex:0 0 32px;} RID .lchip .ti svg{width:18px;height:18px;}
  RID .fbody{position:relative;width:380px;height:128px;}
  RID .fsh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(37,99,255,.3),rgba(24,215,255,.12));clip-path:polygon(0 0,100% 0,66% 100%,34% 100%);border:1px solid rgba(120,180,255,.3);}
  RID .flab{position:absolute;top:46%;left:50%;transform:translate(-50%,-50%);font-size:24px;font-weight:700;color:#EAF4FF;letter-spacing:.5px;}
  RID .prio{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;}
  RID .pcard{display:flex;align-items:center;gap:12px;border-radius:16px;padding:15px 20px;font-size:24px;font-weight:600;background:linear-gradient(120deg,rgba(37,99,255,.22),rgba(24,215,255,.09));border:1px solid rgba(37,99,255,.45);box-shadow:0 12px 30px rgba(37,99,255,.2);}
  RID .pcard .sc{font-family:'DM Mono',monospace;color:var(--cy);font-weight:700;}
  RID .pcard.lo{background:rgba(255,255,255,.03);border:1px solid rgba(148,163,184,.16);color:#7e8da3;box-shadow:none;}
 """,
 stage_html="""<div class="funnel">
   <div class="leadsrow">
     <div class="lchip l1"><span class="ti t-cy">"""+USER+"""</span>Lead</div>
     <div class="lchip l2"><span class="ti t-bl">"""+USER+"""</span>Lead</div>
     <div class="lchip l3"><span class="ti t-vi">"""+USER+"""</span>Lead</div>
     <div class="lchip l4"><span class="ti t-gy">"""+USER+"""</span>Lead</div>
   </div>
   <div class="fbody"><div class="fsh"></div><div class="flab">Qualifying…</div></div>
   <div class="prio">
     <div class="pcard h1">High intent <span class="sc">92%</span></div>
     <div class="pcard h2">High intent <span class="sc">87%</span></div>
     <div class="pcard lo">Low intent · filtered</div>
   </div>
 </div>""",
 stage_js="""
  tl.from(S(".leadsrow .lchip"),{y:-26,opacity:0,duration:0.4,ease:POP,stagger:0.12},1.5);
  tl.from(S(".fbody"),{scale:0.85,opacity:0,duration:0.5,ease:SOFT},2.1);
  tl.from(S(".flab"),{opacity:0,duration:0.4},2.4);
  tl.from(S(".pcard.h1"),{y:24,opacity:0,duration:0.45,ease:POP},3.0);
  tl.from(S(".pcard.h2"),{y:24,opacity:0,duration:0.45,ease:POP},3.25);
  tl.fromTo(S(".pcard.lo"),{y:24,opacity:0},{y:0,opacity:0.55,duration:0.5,ease:SMOOTH},3.55);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('tick',1.5),('tick',1.62),('tick',1.74),('transfer',2.1),('pop',3.0),('pop',3.25),('chime',7.2)]))

# ---------- s04 AI Booking Assistant : calendar fills ----------
def _cell(cls=""): return '<div class="cell %s"></div>'%cls
def _appt(t,lab,c): return '<div class="appt %s"><div class="at">%s</div>%s</div>'%(c,t,lab)
SERVICES.append(dict(n=4, slug='leadaline-svc04-booking-assistant', dur=9.0,
 badge='AI BOOKING ASSISTANT', hl='Your diary fills itself. <span class="ac">No back-and-forth.</span>',
 outcome='Less admin. <span class="ac">More booked work.</span>',
 stage_css="""
  RID .calc{width:780px;margin:0 auto;padding:28px 26px;}
  RID .calh{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
  RID .calh .ct{font-size:31px;font-weight:700;} RID .calh .cb{display:flex;align-items:center;gap:10px;font-size:23px;color:var(--cy);font-weight:700;}
  RID .calh .cb .cbk{width:30px;height:30px;flex:0 0 30px;} RID .calh .cb .cbk svg{width:18px;height:18px;}
  RID .cg{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
  RID .cg .dh{text-align:center;font-size:19px;color:#8294ad;font-weight:600;}
  RID .cell{height:96px;border-radius:13px;background:rgba(255,255,255,.03);border:1px dashed rgba(148,163,184,.2);}
  RID .appt{height:96px;border-radius:13px;padding:12px 13px;display:flex;flex-direction:column;justify-content:center;gap:6px;color:#fff;font-weight:700;font-size:20px;box-shadow:0 8px 20px rgba(0,0,0,.32);}
  RID .appt .at{font-size:17px;font-family:'DM Mono',monospace;opacity:.92;font-weight:500;}
 """,
 stage_html="""<div class="card calc">
   <div class="calh"><div class="ct">This week</div><div class="cb"><span class="cbk chk">"""+C+"""</span>12 booked</div></div>
   <div class="cg">
     <div class="dh">Mon</div><div class="dh">Tue</div><div class="dh">Wed</div><div class="dh">Thu</div><div class="dh">Fri</div>
     """+_appt("09:00","Site visit","t-cy")+_cell()+_appt("11:30","Consult","t-bl")+_cell()+_appt("16:00","Service","t-vi")+
     _cell()+_appt("10:15","Quote","t-bl")+_cell()+_cell()+_appt("14:00","Consult","t-cy")+
   """</div>
 </div>""",
 stage_js="""
  tl.from(S(".calc"),{y:40,scale:0.96,opacity:0,duration:0.5,ease:SOFT},1.5);
  tl.from(S(".calh"),{opacity:0,y:-12,duration:0.4},1.8);
  tl.from(S(".cg .dh"),{opacity:0,y:-8,duration:0.3,stagger:0.05},1.9);
  tl.from(S(".cell"),{opacity:0,scale:0.9,duration:0.3,stagger:0.04},2.1);
  tl.from(S(".appt"),{scale:0.4,opacity:0,duration:0.42,ease:POP,stagger:0.22},2.5);
  tl.from(S(".calh .cb"),{scale:0,opacity:0,duration:0.4,ease:"back.out(2.2)"},4.0);
 """,
 sfx=[('buzz',0),('whoosh',0.30),('transfer',1.5),('pop',2.5),('pop',2.72),('pop',2.94),('pop',3.16),('capture',4.0),('chime',7.2)]))

from services_data2 import MORE
SERVICES.extend(MORE)
