# -*- coding: utf-8 -*-
import os, base64, subprocess
OUT="/home/user/LeadaLine/leadaline-instagram-9x16"; os.makedirs(OUT,exist_ok=True)
HERE=os.path.dirname(os.path.abspath(__file__))
FB=os.path.join(HERE,"fonts")
LOGO="/home/user/LeadaLine/leadaline-slides-demo/public/logo.png"
CHROME="/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
def b64(p,m):
    return f"data:{m};base64,"+base64.b64encode(open(p,"rb").read()).decode()
LG=b64(LOGO,"image/png"); MAN=b64(FB+"/Manrope-700.woff2","font/woff2"); SG=b64(FB+"/SpaceGrotesk-700.woff2","font/woff2")

BASE="""<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:'Manrope';src:url('%s') format('woff2');font-weight:100 900;}}
@font-face{{font-family:'Space Grotesk';src:url('%s') format('woff2');font-weight:300 700;}}
*{{margin:0;padding:0;box-sizing:border-box;}}
#p{{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:'Manrope',sans-serif;
 --ink:#0B1220;--ink2:#5A6B86;--ink3:#8A97AB;--blue:#2F6BFF;--purple:#7A3FF0;--green:#22C55E;--amber:#F5B301;
 --line:#E4E8F3;--grad:linear-gradient(135deg,#2F6BFF,#7A3FF0);
 background:radial-gradient(120% 80% at 50% 0%,#F5F7FE 0%,#EAEFFF 52%,#ECE9FF 100%);color:var(--ink);}}
.blob{{position:absolute;border-radius:50%;filter:blur(120px);}}
.b1{{width:760px;height:760px;left:-16%;top:-8%;background:radial-gradient(circle,rgba(47,107,255,.22),transparent 66%);}}
.b2{{width:820px;height:820px;right:-18%;bottom:-6%;background:radial-gradient(circle,rgba(122,63,240,.22),transparent 66%);}}
.wrap{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding:96px 84px 96px;}}
.logo{{width:330px;height:auto;margin-bottom:40px;}}
.kick{{font-weight:700;font-size:30px;letter-spacing:4px;text-transform:uppercase;color:var(--blue);margin-bottom:22px;text-align:center;}}
.h{{font-family:'Space Grotesk';font-weight:700;font-size:82px;line-height:1.04;letter-spacing:-2px;text-align:center;}}
.h .g{{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}}
.sub{{font-size:34px;font-weight:500;color:var(--ink2);text-align:center;margin-top:26px;max-width:820px;line-height:1.42;}}
.hero{{margin-top:auto;margin-bottom:auto;width:100%;display:flex;flex-direction:column;align-items:center;}}
.foot{{position:absolute;left:0;right:0;bottom:52px;text-align:center;font-size:26px;font-weight:600;color:var(--ink3);letter-spacing:.5px;}}
/* phone */
.phone{{width:560px;border-radius:66px;background:linear-gradient(150deg,#2A2E36,#14171D 42%,#0C0E13);padding:16px;position:relative;
 box-shadow:0 50px 110px rgba(30,45,95,.32),inset 0 0 0 2px rgba(255,255,255,.06);}}
.phone .isl{{position:absolute;left:50%;top:26px;transform:translateX(-50%);width:150px;height:40px;background:#000;border-radius:24px;z-index:5;}}
.screen{{border-radius:52px;overflow:hidden;background:#fff;position:relative;}}
.sbar{{height:70px;display:flex;align-items:center;justify-content:space-between;padding:26px 40px 0;font-size:24px;font-weight:700;color:#0B1220;}}
/* generic card */
.card{{background:#fff;border:1px solid var(--line);border-radius:30px;box-shadow:0 26px 60px rgba(30,45,95,.12);}}
.chip{{display:inline-flex;align-items:center;gap:14px;font-size:30px;font-weight:600;color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:100px;padding:18px 30px;box-shadow:0 10px 26px rgba(30,45,95,.08);}}
.chip .d{{width:14px;height:14px;border-radius:50%;background:var(--grad);}}
.svg{{width:40px;height:40px;stroke:#2F6BFF;fill:none;stroke-width:2;}}
.tile{{background:#fff;border:1px solid var(--line);border-radius:26px;box-shadow:0 16px 40px rgba(30,45,95,.10);display:flex;flex-direction:column;align-items:center;gap:16px;padding:34px 18px;}}
.tile .ic{{width:96px;height:96px;border-radius:26px;background:var(--grad);display:flex;align-items:center;justify-content:center;box-shadow:0 14px 30px rgba(47,107,255,.34);}}
.tile .ic svg{{width:50px;height:50px;stroke:#fff;fill:none;stroke-width:2;}}
.tile .t{{font-size:30px;font-weight:700;color:var(--ink);text-align:center;}}
.tile .s{{font-size:23px;font-weight:500;color:var(--ink2);text-align:center;}}
.pageno{{position:absolute;left:84px;top:96px;font-family:'Space Grotesk';font-weight:700;font-size:30px;color:var(--blue);}}
</style></head><body><div id="p"><div class="blob b1"></div><div class="blob b2"></div>
<div class="wrap">%s</div><div class="foot">LeadaLine · Your AI Office Team · leadaline.com</div></div></body></html>"""

def IC(d): return f'<svg viewBox="0 0 24 24"><path d="{d}"/></svg>'
# assistant icons
I_REC='<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 16 0v6a2 2 0 0 1-2 2h-2v-6h3M4 12v6a2 2 0 0 0 2 2h2v-6H5"/></svg>'
I_SALES='<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M21 7v5h-5"/></svg>'
I_BOOK='<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>'
I_FUP='<svg viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>'
I_ADMIN='<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'
I_REP='<svg viewBox="0 0 24 24"><path d="M5 20V9M12 20V4M19 20v-7"/></svg>'

def logo_hdr(pageno=None, big=False):
    pn=f'<div class="pageno">{pageno}</div>' if pageno else ''
    return pn+f'<img class="logo" src="{LG}" style="width:{"440" if big else "330"}px"/>'

def head(kick,h,sub=None):
    s=f'<div class="sub">{sub}</div>' if sub else ''
    return f'<div class="kick">{kick}</div><h1 class="h">{h}</h1>{s}'

# ---- HERO builders ----
def phone(inner,h=1000):
    return f'<div class="phone"><div class="isl"></div><div class="screen" style="height:{h}px"><div class="sbar"><span>9:41</span><span>5G ▪▪</span></div>{inner}</div></div>'

def locknote(title,sub,body,icon_grad=True):
    ig='var(--grad)' if icon_grad else 'linear-gradient(135deg,#FF6B6B,#E23B5B)'
    return f'''<div style="position:absolute;inset:0;background:linear-gradient(180deg,#DCE6F7,#C9D6F0)">
      <div style="text-align:center;color:#12203A;margin-top:70px"><div style="font-size:30px;font-weight:600">Thursday 19 June</div>
      <div style="font-family:'Space Grotesk';font-weight:600;font-size:150px;letter-spacing:-3px;line-height:1">9:41</div></div>
      <div style="position:absolute;left:34px;right:34px;top:430px;background:rgba(255,255,255,.82);border-radius:38px;padding:34px;display:flex;gap:22px;box-shadow:0 20px 50px rgba(20,30,70,.18)">
        <div style="width:74px;height:74px;flex:0 0 74px;border-radius:20px;background:{ig};display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" style="width:40px;height:40px;stroke:#fff;fill:none;stroke-width:2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 8l9 6 9-6"/></svg></div>
        <div><div style="font-size:28px;font-weight:800;color:#0B1220;display:flex;justify-content:space-between">{title}<span style="font-weight:500;color:#5A6B86;font-size:24px">now</span></div>
        <div style="font-size:30px;font-weight:800;color:#0B1220;margin-top:8px">{sub}</div>
        <div style="font-size:26px;color:#3A4A63;margin-top:6px">{body}</div></div></div></div>'''

BODIES={}
# 1 Opening
tiles=[('AI Receptionist',I_REC),('AI Sales',I_SALES),('AI Booking',I_BOOK),('AI Follow-Up',I_FUP),('AI Admin',I_ADMIN),('AI Reporting',I_REP)]
grid=''.join(f'<div class="tile"><div class="ic">{ic}</div><div class="t">{t}</div></div>' for t,ic in tiles)
BODIES[1]=logo_hdr(big=True)+head('Your AI Office Team','Meet your <span class="g">AI Office Team</span>','Six AI teammates that answer, qualify, book and follow up — so no enquiry is ever missed.')+f'<div class="hero"><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:26px;width:100%;max-width:820px">{grid}</div></div>'

# 2 Receptionist
recscreen='''<div style="position:absolute;inset:0;background:linear-gradient(180deg,#E9F0FB,#DCE6F7);display:flex;flex-direction:column;align-items:center;padding-top:120px">
 <div style="width:150px;height:150px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 16px 40px rgba(20,30,70,.15)"><svg viewBox="0 0 24 24" style="width:80px;height:80px;stroke:#2F6BFF;fill:none;stroke-width:1.8"><path d="M4 12a8 8 0 0 1 16 0v6a2 2 0 0 1-2 2h-2v-6h3M4 12v6a2 2 0 0 0 2 2h2v-6H5"/></svg></div>
 <div style="font-family:'Space Grotesk';font-weight:700;font-size:44px;margin-top:30px;color:#0B1220">New customer</div>
 <div style="font-size:28px;color:#5A6B86;margin-top:8px">Answered by your AI</div>
 <div style="margin-top:20px;font-size:26px;font-weight:700;color:#2F6BFF;display:flex;align-items:center;gap:10px"><span style="width:14px;height:14px;border-radius:50%;background:#2F6BFF"></span>LIVE</div>
 <div style="margin:44px 40px 0;background:#fff;border-radius:34px;padding:34px;font-size:32px;font-weight:600;color:#1F3B78;text-align:center;line-height:1.4;box-shadow:0 16px 40px rgba(20,30,70,.12)">"Hi, I'd like a quote for an EV charger install at my home."</div></div>'''
chips2='<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin-top:44px">'+''.join(f'<span class="chip"><span class="d"></span>{c}</span>' for c in ['Calls','Website','WhatsApp','Forms'])+'</div>'
BODIES[2]=logo_hdr('02 / 10')+head('AI Receptionist','Answers every <span class="g">enquiry</span>','Across phone, website, WhatsApp and forms — every enquiry answered instantly, 24/7.')+f'<div class="hero">{phone(recscreen,980)}{chips2}</div>'

# 3 Qualify
rows3=[('Customer','Jamie R.'),('Service','EV Charger Install'),('Product','7kW Zappi'),('Area','Eltham · SE9'),('Callback','After 5pm')]
rowhtml=''.join(f'<div style="display:flex;justify-content:space-between;align-items:center;padding:30px 0;border-top:1px solid var(--line)"><span style="font-size:32px;color:var(--ink2);font-weight:600">{k}</span><span style="font-size:34px;font-weight:700">{v}</span></div>' for k,v in rows3)
val3='<div style="display:flex;justify-content:space-between;align-items:center;padding:30px 0;border-top:1px solid var(--line)"><span style="font-size:32px;color:var(--ink2);font-weight:600">Est. value</span><span style="font-family:\'Space Grotesk\';font-size:40px;font-weight:700;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent">£800 – £1,400</span></div>'
BODIES[3]=logo_hdr('03 / 10')+head('AI Sales Assistant','Scored &amp; scoped — <span class="g">before you\'ve seen it.</span>')+f'''<div class="hero"><div class="card" style="width:100%;max-width:840px;padding:20px 48px 40px">
 <div style="display:flex;align-items:center;gap:20px;padding:34px 0 8px"><div style="width:80px;height:80px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Space Grotesk';font-weight:700;font-size:32px">JR</div>
 <div><div style="font-size:38px;font-weight:800">Collected Information</div><div style="font-size:27px;color:#22C55E;font-weight:700;margin-top:2px">● High quality lead</div></div></div>
 {rowhtml}{val3}</div></div>'''

# 4 Owner Summary
chips4='<div style="display:flex;gap:20px;justify-content:center;margin-top:44px">'+''.join(f'<span class="chip">{c}</span>' for c in ['SMS','WhatsApp','Email'])+'</div>'
BODIES[4]=logo_hdr('04 / 10')+head('Owner Summary','The whole lead, <span class="g">in your pocket.</span>','The moment the call ends, the full summary lands on your phone — your choice of SMS, WhatsApp or email.')+f'<div class="hero">{phone(locknote("LeadaLine · New Lead","Jamie R. — 7kW Zappi install","Eltham · SE9 · High · £800–1,400"),980)}{chips4}</div>'

# 5 CRM
kpis=[('14','Leads / wk'),('11','Qualified'),('6','Booked'),('92%','Answered')]
kpihtml=''.join(f'<div class="card" style="padding:40px 30px;text-align:center"><div style="font-family:\'Space Grotesk\';font-weight:700;font-size:88px;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1">{v}</div><div style="font-size:28px;color:var(--ink2);font-weight:600;margin-top:8px">{l}</div></div>' for v,l in kpis)
leads=[('Jamie R.','7kW Zappi','New','#2F6BFF'),('S. Okafor','Solar + battery','Booked','#22C55E'),('M. Whitfield','Commercial EICR','Quoted','#7A3FF0')]
leadhtml=''.join(f'<div style="display:flex;align-items:center;justify-content:space-between;padding:26px 0;border-top:1px solid var(--line)"><div><div style="font-size:32px;font-weight:700">{n}</div><div style="font-size:25px;color:var(--ink2)">{j}</div></div><span style="font-size:25px;font-weight:700;color:{c};background:{c}18;border-radius:100px;padding:10px 22px">{s}</span></div>' for n,j,s,c in leads)
BODIES[5]=logo_hdr('05 / 10')+head('CRM Tracking','Every lead <span class="g">in one place.</span>','A clean dashboard — new leads, status and live performance. Nothing gets forgotten.')+f'<div class="hero"><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;width:100%;max-width:840px">{kpihtml}</div><div class="card" style="width:100%;max-width:840px;margin-top:26px;padding:16px 44px 34px"><div style="font-size:30px;font-weight:800;padding:28px 0 6px">Recent leads</div>{leadhtml}</div></div>'

# 6 Booking
cal='''<div style="position:absolute;inset:0;background:#fff;padding:20px 30px">
 <div style="text-align:center;font-family:'Space Grotesk';font-weight:700;font-size:44px;margin-top:12px">June 2026</div>
 <div style="text-align:center;font-size:26px;color:#2F6BFF;font-weight:600;margin-bottom:26px">LeadaLine · Calendar</div>
 <div style="display:flex;flex-direction:column;gap:20px">
  <div style="background:#EEF1FB;border-radius:22px;padding:28px 30px"><div style="font-size:30px;font-weight:700">09:00 · EV install · Bromley</div></div>
  <div style="background:#EEF1FB;border-radius:22px;padding:28px 30px"><div style="font-size:30px;font-weight:700">12:30 · EICR · Dartford</div></div>
  <div style="background:#E7F8EE;border:2px solid #22C55E;border-radius:22px;padding:28px 30px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:32px;font-weight:800">16:30 · Survey — Jamie R.</div><div style="font-size:25px;color:#5A6B86;margin-top:4px">60 min</div></div><span style="font-size:26px;font-weight:800;color:#fff;background:#22C55E;border-radius:100px;padding:12px 26px">Booked ✓</span></div>
 </div></div>'''
BODIES[6]=logo_hdr('06 / 10')+head('AI Booking Assistant','It books the <span class="g">next step.</span>','No phone tag. The customer picks a slot and it drops straight into your diary.')+f'<div class="hero">{phone(cal,980)}</div>'

# 7 Follow-up
thread='''<div style="position:absolute;inset:0;background:#fff;display:flex;flex-direction:column">
 <div style="padding:24px 0 20px;text-align:center;border-bottom:1px solid #EEF0F5"><div style="width:84px;height:84px;border-radius:50%;background:var(--grad);margin:0 auto;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:34px">LL</div><div style="font-size:30px;font-weight:700;margin-top:10px">LeadaLine</div></div>
 <div style="flex:1;display:flex;flex-direction:column;gap:22px;padding:36px 30px;justify-content:flex-end">
  <div style="align-self:flex-end;max-width:78%;background:#2F6BFF;color:#fff;border-radius:34px 34px 10px 34px;padding:26px 30px;font-size:30px;line-height:1.36">Hi Jamie, still like to go ahead with your EV charger quote? Thursday 4:30pm or Saturday 9am?</div>
  <div style="align-self:flex-start;max-width:78%;background:#EAECF1;color:#0B1220;border-radius:34px 34px 34px 10px;padding:26px 30px;font-size:30px">Thursday works great, thanks!</div>
  <div style="align-self:flex-end;max-width:78%;background:#2F6BFF;color:#fff;border-radius:34px 34px 10px 34px;padding:26px 30px;font-size:30px;line-height:1.36;box-shadow:0 0 40px rgba(47,107,255,.4)">Perfect — booked for Thursday 4:30pm. We'll remind you on the day. 👍</div>
 </div></div>'''
BODIES[7]=logo_hdr('07 / 10')+head('AI Follow-Up Assistant','Quiet quotes get <span class="g">chased.</span>','The follow-ups you never get to happen on their own — so warm quotes turn into booked work.')+f'<div class="hero">{phone(thread,1000)}</div>'

# 8 Review
revnote='''<div style="position:absolute;inset:0;background:linear-gradient(180deg,#DCE6F7,#C9D6F0)">
 <div style="text-align:center;color:#12203A;margin-top:70px"><div style="font-size:30px;font-weight:600">Thursday 19 June</div><div style="font-family:'Space Grotesk';font-weight:600;font-size:150px;letter-spacing:-3px;line-height:1">9:41</div></div>
 <div style="position:absolute;left:34px;right:34px;top:440px;background:rgba(255,255,255,.86);border-radius:38px;padding:36px;box-shadow:0 20px 50px rgba(20,30,70,.18)">
  <div style="display:flex;align-items:center;gap:18px"><div style="width:64px;height:64px;border-radius:16px;background:var(--grad)"></div><div style="font-size:26px;font-weight:800;letter-spacing:1px;color:#0B1220">LEADALINE REVIEWS<span style="font-weight:500;color:#5A6B86;font-size:22px;margin-left:14px">now</span></div></div>
  <div style="font-size:34px;font-weight:800;margin-top:22px;color:#0B1220">New 5-star review ⭐</div>
  <div style="font-size:30px;color:#3A4A63;margin-top:10px;line-height:1.4">"Quick, tidy, professional install — highly recommended."</div>
  <div style="display:flex;gap:8px;margin-top:20px">'''+('<svg viewBox="0 0 24 24" style="width:44px;height:44px;fill:#F5B301"><path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.6z"/></svg>'*5)+'</div></div></div>'
BODIES[8]=logo_hdr('08 / 10')+head('AI Review Assistant','Every happy install → a <span class="g">5-star review.</span>','Once the job\'s complete, we ask for feedback at the right moment — building your local ranking.')+f'<div class="hero">{phone(revnote,980)}</div>'

# 9 Reporting
weeks=[('Week 1',9,58),('Week 2',12,78),('Week 3',11,72),('Week 4',14,92)]
bars=''.join(f'<div style="display:flex;align-items:center;gap:24px;margin:18px 0"><div style="width:170px;font-size:30px;font-weight:600;color:var(--ink2)">{w}</div><div style="flex:1;height:26px;border-radius:14px;background:#ECEEF5;overflow:hidden"><div style="width:{p}%;height:100%;background:var(--grad);border-radius:14px"></div></div><div style="width:60px;font-size:32px;font-weight:700;text-align:right">{v}</div></div>' for w,v,p in weeks)
stats=[('~11','hrs saved / week'),('92%','answer rate'),('6','jobs booked')]
stathtml=''.join(f'<div style="text-align:center"><div style="font-family:\'Space Grotesk\';font-weight:700;font-size:88px;color:#2F6BFF;line-height:1">{v}</div><div style="font-size:27px;color:var(--ink2);font-weight:600;margin-top:6px">{l}</div></div>' for v,l in stats)
BODIES[9]=logo_hdr('09 / 10')+head('AI Reporting Assistant','You see exactly <span class="g">what it brings in.</span>','One weekly summary — leads, bookings, response time and hours saved. Proof, not guesswork.')+f'<div class="hero"><div class="card" style="width:100%;max-width:860px;padding:44px 50px">{bars}</div><div style="display:flex;justify-content:space-between;width:100%;max-width:820px;margin-top:52px">{stathtml}</div></div>'

# 10 CTA
times='<div style="display:flex;flex-direction:column;gap:16px">'+''.join(f'<div style="border:2px solid {"#2F6BFF" if t=="10:30 AM" else "var(--line)"};background:{"var(--grad)" if t=="10:30 AM" else "#fff"};color:{"#fff" if t=="10:30 AM" else "#2F6BFF"};border-radius:18px;padding:22px 0;text-align:center;font-size:30px;font-weight:700">{t}</div>' for t in ['9:00 AM','10:30 AM','1:00 PM','2:30 PM'])+'</div>'
BODIES[10]=logo_hdr(big=True)+head('','Book a <span class="g">Demo Call Today</span>','See how LeadaLine can capture, qualify and convert your enquiries.')+f'''<div class="hero"><div class="card" style="width:100%;max-width:860px;padding:52px 56px">
 <div style="font-family:'Space Grotesk';font-weight:700;font-size:52px;text-align:center;margin-bottom:8px">Book a 15-minute demo call</div>
 <div style="display:flex;gap:20px;justify-content:center;margin:26px 0 40px;flex-wrap:wrap">'''+''.join(f'<span class="chip" style="font-size:27px;padding:14px 24px"><span class="d"></span>{c}</span>' for c in ['See it in action','Key features','Q&amp;A'])+f'''</div>{times}
 <div style="margin-top:40px;background:var(--grad);color:#fff;border-radius:22px;padding:32px 0;text-align:center;font-size:40px;font-weight:800;box-shadow:0 24px 54px rgba(47,107,255,.4)">Schedule Call →</div></div></div>'''

if __name__=="__main__":
    tpl=BASE.replace("{{","{").replace("}}","}")
    for n in range(1,11):
        html=tpl.replace("%s",MAN,1).replace("%s",SG,1).replace("%s",BODIES[n],1)
        hp=f"/tmp/post{n}.html"; open(hp,"w").write(html)
        outp=os.path.join(OUT,f"leadaline-ig-{n:02d}.png")
        raw="/tmp/_raw%d.png"%n
        subprocess.run([CHROME,"--headless=new","--no-sandbox","--disable-gpu","--hide-scrollbars",
          "--force-device-scale-factor=1","--window-size=1080,2010","--virtual-time-budget=3000",
          "--screenshot="+raw,"file://"+hp],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=90)
        from PIL import Image
        Image.open(raw).convert("RGB").crop((0,0,1080,1920)).save(outp)
        print("wrote",n,os.path.exists(outp))
    print("DONE")
