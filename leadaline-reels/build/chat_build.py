# -*- coding: utf-8 -*-
import os, shutil, sys
sys.path.insert(0,"/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad")
import sfxlib

SRC="/home/user/OpenMontage/projects/leadaline-reelA1-afterhours-chat/hyperframes"  # fonts+gsap
ROOT="/home/user/OpenMontage/projects"

CSS=open(os.path.join(SRC,"index.html")).read()
CSS=CSS[CSS.index("<style>")+7:CSS.index("</style>")]  # reuse exact pilot CSS

CHECK='<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
SEND='<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
AVATAR='<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="lgc" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#18D7FF"/><stop offset=".5" stop-color="#2563FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs><rect x="16" y="10" width="11" height="40" rx="5.5" fill="url(#lgc)"/><rect x="16" y="39" width="31" height="11" rx="5.5" fill="url(#lgc)"/><rect x="31" y="14" width="9" height="22" rx="4.5" fill="#18D7FF"/></svg>'
LMARK='<svg class="mark" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="lge" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#18D7FF"/><stop offset=".5" stop-color="#2563FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs><rect x="13" y="7" width="14" height="50" rx="7" fill="url(#lge)"/><rect x="13" y="43" width="40" height="14" rx="7" fill="url(#lge)"/><rect x="33" y="7" width="11" height="28" rx="5.5" fill="#18D7FF"/></svg>'

def schedule(msgs):
    """returns list of dicts with times + js + sfx cues; start 1.5."""
    t=1.5; rows=[]; sfx=[('buzz',0.0)]
    for i,m in enumerate(msgs):
        k="m%d"%(i+1); side=m[0]
        if side=='in':
            rows.append(dict(k=k,side=side,t=t,kind='in'))
            sfx.append(('pop',round(t,2))); t+=1.15
        elif side=='out':
            ts_send=t+0.78
            rows.append(dict(k=k,side=side,t=t,tsend=ts_send,kind='out'))
            sfx.append(('tick',round(t+0.1,2))); sfx.append(('pop',round(ts_send,2))); t=ts_send+0.72
        else: # sys
            rows.append(dict(k=k,side='sys',t=t,kind='sys'))
            sfx.append(('capture',round(t,2))); t+=1.0
    endstart=round(t+0.6,2)
    sfx.append(('chime',round(endstart+0.45,2)))
    dur=round(endstart+3.0)
    return rows, endstart, dur, sfx

def msg_html(msgs):
    out=[]
    for i,m in enumerate(msgs):
        k="m%d"%(i+1); side=m[0]
        if side=='in':
            out.append('<div class="row in %s"><div class="bub"><span class="txt">%s</span></div><div class="ts">%s</div></div>'%(k,m[1],m[2]))
        elif side=='out':
            out.append('<div class="row out %s"><div class="bub"><span class="dots"><b></b><b></b><b></b></span><span class="txt">%s</span></div><div class="ts">%s</div></div>'%(k,m[1],m[2]))
        else:
            out.append('<div class="row sysrow %s"><div class="sys"><span class="chk">%s</span>%s</div></div>'%(k,CHECK,m[1]))
    return "\n       ".join(out)

def msg_js(rows):
    js=[]
    for r in rows:
        s="#rc .%s"%r['k']
        if r['kind']=='in':
            js.append('tl.from("%s",{y:24,scale:0.9,opacity:0,duration:0.4,ease:POP,transformOrigin:"left bottom"},%s);'%(s,r['t']))
            js.append('tl.from("%s .ts",{opacity:0,duration:0.3},%s);'%(s,round(r['t']+0.2,2)))
        elif r['kind']=='out':
            t=r['t']; ts=r['tsend']
            js.append('tl.from("%s",{y:24,scale:0.9,opacity:0,duration:0.4,ease:POP,transformOrigin:"right bottom"},%s);'%(s,t))
            js.append('tl.set("%s .txt",{opacity:0},%s);'%(s,t))
            js.append('tl.to("%s .dots b",{y:-7,duration:0.22,ease:"sine.inOut",stagger:0.1,yoyo:true,repeat:2},%s);'%(s,round(t+0.12,2)))
            js.append('tl.to("%s .dots",{opacity:0,duration:0.18},%s);'%(s,ts))
            js.append('tl.to("%s .txt",{opacity:1,duration:0.28,ease:SMOOTH},%s);'%(s,ts))
            js.append('tl.from("%s .ts",{opacity:0,duration:0.3},%s);'%(s,round(ts+0.1,2)))
        else:
            js.append('tl.from("%s",{y:20,scale:0.85,opacity:0,duration:0.45,ease:POP},%s);'%(s,r['t']))
            js.append('tl.from("%s .chk",{scale:0,opacity:0,duration:0.4,ease:"back.out(2.4)"},%s);'%(s,round(r['t']+0.2,2)))
    return "\n  ".join(js)

TEMPLATE="""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>CSSBLOCK</style></head>
<body>
<div id="rc" data-composition-id="chat" data-start="0" data-duration="DUR" data-width="1080" data-height="1920">
 <div class="world">
  <div class="orb a"></div><div class="orb b"></div>
  <div class="flash"></div><div class="sweep"></div>
  <div class="content">
   <h1 class="hook"><span>HOOK1</span><span class="ac">HOOK2</span></h1>
   <div class="chat">
     <div class="chead">
       <div class="av">AVATAR</div>
       <div class="cinfo"><div class="cn">LeadaLine</div><div class="cs"><span class="gd"></span>Online · replies instantly</div></div>
     </div>
     <div class="msgs">
       MSGS
     </div>
     <div class="inputbar"><div class="fld">Message…</div><div class="snd">SEND</div></div>
   </div>
  </div>
  <div class="dim"></div>
  <div class="endcard">
    <div class="stat"><div class="big">BIG</div><div class="stxt">STXT</div></div>
    <div class="cta">Book your free demo</div>
    <div class="logo"><div class="ring2"></div>LMARK<div class="wm">LeadaLine</div></div>
  </div>
  <div class="vignette"></div><div class="grain"></div>
 </div>
 <script src="./gsap.min.js"></script>
 <script>
  window.__timelines=window.__timelines||{};
  const tl=gsap.timeline({paused:true}); const S=(q)=>"#rc "+q;
  const SOFT="power3.out",SMOOTH="power2.out",POP="back.out(1.8)";
  tl.to(S(".orb.a"),{opacity:1,duration:1.2,ease:"sine.out"},0);
  tl.to(S(".orb.b"),{opacity:1,duration:1.3,ease:"sine.out"},0.15);
  tl.fromTo(S(".flash"),{opacity:0},{opacity:0.85,duration:0.1,ease:"power2.out"},0);
  tl.to(S(".flash"),{opacity:0,duration:0.45,ease:"power2.in"},0.12);
  tl.from(S(".world"),{scale:1.06,duration:0.6,ease:"power3.out",transformOrigin:"50% 40%"},0);
  tl.from(S(".hook span"),{y:34,opacity:0,duration:0.34,ease:POP,stagger:0.12},0.25);
  tl.from(S(".chat"),{y:80,opacity:0,duration:0.6,ease:SOFT},0.7);
  tl.from(S(".chead"),{y:-16,opacity:0,duration:0.4,ease:SMOOTH},0.95);
  tl.from(S(".inputbar"),{y:16,opacity:0,duration:0.4,ease:SMOOTH},1.0);
  tl.fromTo(S(".sweep"),{x:0,opacity:0},{opacity:1,duration:0.3,ease:"sine.out"},1.2);
  tl.to(S(".sweep"),{x:2200,duration:1.3,ease:"power1.inOut"},1.2);
  tl.to(S(".sweep"),{opacity:0,duration:0.4},2.5);
  MSGJS
  // end card
  tl.to(S(".dim"),{opacity:1,duration:0.5,ease:"sine.inOut"},ENDS);
  tl.to(S(".chat"),{scale:0.96,opacity:0.5,duration:0.6,ease:SMOOTH},ENDS);
  tl.to(S(".hook"),{opacity:0.25,duration:0.5},ENDS);
  tl.fromTo(S(".endcard"),{opacity:0},{opacity:1,duration:0.5,ease:"sine.out"},ENDS+0.3);
  tl.from(S(".endcard .big"),{scale:0.6,opacity:0,duration:0.6,ease:"back.out(2)"},ENDS+0.45);
  tl.from(S(".endcard .stxt"),{y:24,opacity:0,duration:0.5,ease:SOFT},ENDS+0.8);
  tl.from(S(".endcard .cta"),{y:24,opacity:0,duration:0.5,ease:POP},ENDS+1.15);
  tl.fromTo(S(".endcard .cta"),{boxShadow:"0 0 30px rgba(37,99,255,.3)"},{boxShadow:"0 0 64px rgba(37,99,255,.7)",duration:0.6,ease:"sine.inOut",yoyo:true,repeat:1},ENDS+1.6);
  tl.from(S(".endcard .logo .mark"),{scale:0.5,opacity:0,duration:0.5,ease:"back.out(2)"},ENDS+1.5);
  tl.from(S(".endcard .logo .wm"),{x:-20,opacity:0,duration:0.5,ease:SOFT},ENDS+1.65);
  tl.fromTo(S(".endcard .logo .ring2"),{scale:0.4,opacity:0.9},{scale:1.8,opacity:0,duration:0.8,ease:"power2.out",immediateRender:false},ENDS+1.65);
  window.__timelines["chat"]=tl;
 </script>
</div></body></html>
"""

def build(reel):
    rows,ends,dur,sfx=schedule(reel['msgs'])
    proj=os.path.join(ROOT,reel['slug']); hf=os.path.join(proj,"hyperframes")
    os.makedirs(hf,exist_ok=True); os.makedirs(os.path.join(proj,"assets","audio"),exist_ok=True)
    if not os.path.exists(os.path.join(hf,"gsap.min.js")): shutil.copy(os.path.join(SRC,"gsap.min.js"),hf)
    if not os.path.exists(os.path.join(hf,"fonts")): shutil.copytree(os.path.join(SRC,"fonts"),os.path.join(hf,"fonts"))
    html=TEMPLATE.replace("CSSBLOCK",CSS).replace("DUR",str(dur)).replace("HOOK1",reel['hook'][0]).replace("HOOK2",reel['hook'][1])
    html=html.replace("AVATAR",AVATAR).replace("SEND",SEND).replace("LMARK",LMARK)
    html=html.replace("MSGS",msg_html(reel['msgs'])).replace("MSGJS",msg_js(rows))
    html=html.replace("BIG",reel['big']).replace("STXT",reel['stxt'])
    html=html.replace("ENDS",str(ends))
    open(os.path.join(hf,"index.html"),"w").write(html)
    open(os.path.join(hf,"hyperframes.json"),"w").write('{"compositions":["index.html"]}')
    pk=sfxlib.build_master(sfx,dur,os.path.join(proj,"assets","audio","sfx_master.wav"))
    print("built %-40s dur=%s rows=%d sfxpk=%.2f"%(reel['slug'],dur,len(rows),pk))

REELS=[
 dict(slug='leadaline-reelA2-missed-call-textback',
   hook=('YOU MISSED THE CALL.','WE TEXT BACK.'),
   msgs=[('sys','Missed call · 2:14 PM'),
         ('out','Hi, sorry we missed your call! How can we help?','2:14 PM'),
         ('in','Leaking tap, need it sorted today.','2:14 PM'),
         ('out','No problem — booked you in for 4pm. Details sent to your team.','2:15 PM'),
         ('sys','Lead captured · owner notified')],
   big='85%', stxt='of missed callers <span class="ac">never call back.</span>'),
 dict(slug='leadaline-reelA3-first-to-reply',
   hook=('TWO TRADESMEN.','ONE CUSTOMER.'),
   msgs=[('in','Hi, free for a rewire quote this week?','10:02 AM'),
         ('out','Yes — I can pop you in Thursday AM. What’s the address?','10:02 AM'),
         ('in','Honestly, you’re the only one who got back to me.','10:05 AM'),
         ('out','Happy to help — booked you in for Thursday 9am.','10:05 AM'),
         ('sys','Lead won · owner notified')],
   big='1ST', stxt='to reply usually <span class="ac">wins the job.</span>'),
 dict(slug='leadaline-reelA4-quote-followup',
   hook=('QUOTE SENT.','THEN SILENCE?'),
   msgs=[('sys','Quote sent · 5 days ago'),
         ('out','Hi John, following up on your extension quote — still keen to go ahead?','9:10 AM'),
         ('in','Oh, thanks for chasing — yes, I’d forgotten!','9:18 AM'),
         ('out','Great, I’ll get you booked in. Sending details to the team.','9:18 AM'),
         ('sys','Lead re-engaged · owner notified')],
   big='60%', stxt='of jobs are won on the <span class="ac">follow-up.</span>'),
 dict(slug='leadaline-reelA5-smart-qualifying',
   hook=('EVERY ENQUIRY,','FULLY QUALIFIED.'),
   msgs=[('in','Do you do full bathroom refits?','11:30 AM'),
         ('out','We do! Where are you based, and how soon?','11:30 AM'),
         ('in','Stockport, ideally next month.','11:31 AM'),
         ('out','Perfect — sending a qualified lead to the team now.','11:31 AM'),
         ('sys','Qualified: refit · Stockport · next month')],
   big='100%', stxt='qualified before it <span class="ac">reaches you.</span>'),
]

if __name__=="__main__":
    sel=sys.argv[1:]
    for r in REELS:
        if sel and r['slug'] not in sel: continue
        build(r)
