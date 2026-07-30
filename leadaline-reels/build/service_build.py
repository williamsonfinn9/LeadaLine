# -*- coding: utf-8 -*-
import os, shutil, sys
sys.path.insert(0,"/tmp/claude-0/-home-user-LeadaLine/7abd6193-0fbb-5366-baa6-d7993f9c5f48/scratchpad")
import sfxlib
SRC="/home/user/OpenMontage/projects/leadaline-reel-01-missed-call/hyperframes"
ROOT="/home/user/OpenMontage/projects"

FF="".join("@font-face{font-family:'%s';font-weight:%s;font-display:block;src:url('fonts/%s') format('woff2');}\n"%(f,w,fn) for f,w,fn in [
 ('Archivo',800,'Archivo-800.woff2'),('Archivo',900,'Archivo-900.woff2'),
 ('DM Sans',400,'DMSans-400.woff2'),('DM Sans',500,'DMSans-500.woff2'),('DM Sans',600,'DMSans-600.woff2'),('DM Sans',700,'DMSans-700.woff2'),
 ('DM Mono',500,'DMMono-500.woff2')])

SHELL_CSS = FF + r"""
  *{margin:0;padding:0;box-sizing:border-box;} body{background:#050B1A;}
  RID{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:'DM Sans',system-ui,sans-serif;color:#F8FAFC;
    background:radial-gradient(135% 100% at 50% 12%,#0E2240 0%,#091833 40%,#050B1A 78%);
    --cy:#18D7FF;--bl:#2563FF;--vi:#7C5CFF;--gr:#34D399;--am:#F59E0B;--rd:#EF4444;--sl:#94A3B8;}
  RID .world{position:absolute;inset:0;transform-origin:50% 42%;}
  RID .orb{position:absolute;border-radius:50%;filter:blur(70px);z-index:0;opacity:0;pointer-events:none;}
  RID .orb.a{width:720px;height:720px;left:-180px;top:440px;background:radial-gradient(circle,rgba(37,99,255,.28),rgba(37,99,255,0) 68%);}
  RID .orb.b{width:620px;height:620px;right:-200px;top:980px;background:radial-gradient(circle,rgba(124,92,255,.24),rgba(124,92,255,0) 68%);}
  RID .orb.c{width:520px;height:520px;left:50%;top:1320px;transform:translateX(-50%);background:radial-gradient(circle,rgba(24,215,255,.18),rgba(24,215,255,0) 68%);}
  RID .flash{position:absolute;inset:0;z-index:2;opacity:0;pointer-events:none;background:radial-gradient(120% 75% at 50% 24%,rgba(37,99,255,.4),rgba(37,99,255,0) 60%);}
  RID .sweep{position:absolute;top:-10%;left:-60%;width:55%;height:120%;z-index:4;opacity:0;pointer-events:none;background:linear-gradient(105deg,transparent,rgba(120,180,255,.10) 45%,rgba(190,225,255,.18) 50%,rgba(120,180,255,.10) 55%,transparent);transform:skewX(-12deg);filter:blur(8px);}
  RID .grain{position:absolute;inset:0;z-index:6;opacity:.035;mix-blend-mode:overlay;pointer-events:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
  RID .vignette{position:absolute;inset:0;z-index:5;pointer-events:none;background:radial-gradient(125% 85% at 50% 42%,transparent 58%,rgba(2,6,16,.5) 100%);}
  RID .content{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;padding:128px 80px 92px;}

  RID .badge{display:inline-flex;align-items:center;gap:12px;border:1px solid rgba(24,215,255,.45);border-radius:100px;padding:11px 22px;font-size:25px;font-weight:600;letter-spacing:.5px;color:#CFE8FF;background:rgba(24,215,255,.06);}
  RID .badge .gd{width:11px;height:11px;border-radius:50%;background:var(--cy);box-shadow:0 0 12px var(--cy);}
  RID .hl{font-family:'DM Sans',sans-serif;font-weight:700;text-align:center;font-size:58px;line-height:1.06;letter-spacing:-1px;margin-top:24px;max-width:880px;}
  RID .hl .ac{color:var(--cy);}
  RID .divider{position:relative;margin:26px 0 8px;height:1.5px;width:170px;}
  RID .divider .line{position:absolute;inset:0;border-radius:2px;transform:scaleX(0);background:linear-gradient(90deg,transparent,var(--cy),transparent);}
  RID .divider .node{position:absolute;left:50%;top:50%;width:8px;height:8px;border-radius:50%;transform:translate(-50%,-50%);background:#d6f3ff;box-shadow:0 0 20px 5px rgba(24,215,255,.85);opacity:0;}

  RID .stage{position:relative;width:100%;flex:1;margin-top:30px;display:flex;align-items:center;justify-content:center;}
  RID .stagei{position:relative;width:100%;}

  RID .outcome{text-align:center;font-size:37px;font-weight:600;line-height:1.25;color:#D7E4F4;max-width:820px;margin-top:14px;}
  RID .outcome .ac{color:var(--cy);}
  RID .foot{display:flex;flex-direction:column;align-items:center;gap:22px;margin-top:22px;}
  RID .cta{font-size:32px;font-weight:700;color:#06101F;background:linear-gradient(135deg,#29D8F6,#2C7CFF);padding:18px 40px;border-radius:16px;box-shadow:0 0 44px rgba(37,99,255,.45);}
  RID .logo{display:flex;align-items:center;gap:16px;position:relative;}
  RID .logo .ring2{position:absolute;left:6px;top:50%;width:60px;height:60px;border-radius:50%;transform:translate(-10%,-50%) scale(.4);border:2px solid rgba(24,215,255,.7);opacity:0;}
  RID .logo .mark{width:52px;height:52px;filter:drop-shadow(0 6px 18px rgba(37,99,255,.45));}
  RID .logo .wm{font-size:46px;font-weight:600;color:#F4F8FF;}

  /* shared centerpiece primitives */
  RID .card{position:relative;border-radius:22px;background:linear-gradient(165deg,rgba(24,42,74,.8),rgba(11,22,46,.88));border:1px solid rgba(120,180,255,.26);box-shadow:0 30px 70px rgba(2,8,24,.5),inset 0 1px 0 rgba(255,255,255,.07);}
  RID .tile{display:flex;align-items:center;justify-content:center;border-radius:13px;box-shadow:0 6px 16px rgba(0,0,0,.3);}
  RID .tile svg{stroke:#fff;}
  RID .t-cy{background:linear-gradient(135deg,#29D8F6,#1597D6);} RID .t-bl{background:linear-gradient(135deg,#3B7BFF,#1E47D6);}
  RID .t-vi{background:linear-gradient(135deg,#8E73FF,#6A45E6);} RID .t-gr{background:linear-gradient(135deg,#34D399,#10b981);}
  RID .t-am{background:linear-gradient(135deg,#FFC24B,#F59E0B);} RID .t-gy{background:linear-gradient(135deg,#3a4658,#2a3343);}
  RID .chk{border-radius:50%;background:linear-gradient(135deg,var(--cy),var(--bl));display:flex;align-items:center;justify-content:center;box-shadow:0 0 16px rgba(24,215,255,.5);}
  RID .chk svg{stroke:#fff;}
"""

IC={
 'check':'<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
 'phone':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
 'phonex':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/><line x1="15" y1="4" x2="21" y2="10"/><line x1="21" y1="4" x2="15" y2="10"/></svg>',
 'mail':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
 'user':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 'chat':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/></svg>',
 'clock':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>',
 'cal':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
 'bolt':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2"/></svg>',
 'filter':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 4 21 4 14 13 14 20 10 20 10 13 3 4"/></svg>',
 'bell':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
}
LMARK='<svg class="mark" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="lgGID" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#18D7FF"/><stop offset=".5" stop-color="#2563FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs><rect x="13" y="7" width="14" height="50" rx="7" fill="url(#lgGID)"/><rect x="13" y="43" width="40" height="14" rx="7" fill="url(#lgGID)"/><rect x="33" y="7" width="11" height="28" rx="5.5" fill="#18D7FF"/></svg>'

SHELL_JS = r"""
  window.__timelines=window.__timelines||{};
  const tl=gsap.timeline({paused:true}); const S=(q)=>"RID "+q;
  const SOFT="power3.out",SMOOTH="power2.out",POP="back.out(1.8)";
  tl.to(S(".orb.a"),{opacity:1,duration:1.0,ease:"sine.out"},0);
  tl.to(S(".orb.b"),{opacity:1,duration:1.1,ease:"sine.out"},0.1);
  tl.to(S(".orb.c"),{opacity:1,duration:1.1,ease:"sine.out"},0.2);
  tl.fromTo(S(".flash"),{opacity:0},{opacity:0.85,duration:0.1},0);
  tl.to(S(".flash"),{opacity:0,duration:0.45,ease:"power2.in"},0.12);
  tl.from(S(".world"),{scale:1.05,duration:0.6,ease:SOFT,transformOrigin:"50% 40%"},0);
  tl.from(S(".badge"),{y:-18,scale:0.85,opacity:0,duration:0.4,ease:POP},0.2);
  tl.from(S(".hl"),{y:30,opacity:0,duration:0.45,ease:SOFT},0.4);
  tl.to(S(".divider .line"),{scaleX:1,duration:0.34,ease:"power2.inOut"},0.85);
  tl.to(S(".divider .node"),{opacity:1,duration:0.3},1.08);
  tl.fromTo(S(".sweep"),{x:0,opacity:0},{opacity:1,duration:0.25,ease:"sine.out"},0.7);
  tl.to(S(".sweep"),{x:2200,duration:1.2,ease:"power1.inOut"},0.7);
  tl.to(S(".sweep"),{opacity:0,duration:0.3},1.6);
  function outro(t){
    tl.from(S(".outcome"),{y:20,opacity:0,duration:0.45,ease:SOFT},t);
    tl.from(S(".cta"),{y:20,opacity:0,duration:0.45,ease:POP},t+0.25);
    tl.fromTo(S(".cta"),{boxShadow:"0 0 30px rgba(37,99,255,.3)"},{boxShadow:"0 0 60px rgba(37,99,255,.65)",duration:0.6,ease:"sine.inOut",yoyo:true,repeat:1},t+0.6);
    tl.from(S(".logo .mark"),{scale:0.5,opacity:0,duration:0.45,ease:"back.out(2)"},t+0.4);
    tl.from(S(".logo .wm"),{x:-18,opacity:0,duration:0.45,ease:SOFT},t+0.52);
    tl.fromTo(S(".logo .ring2"),{scale:0.4,opacity:0.9},{scale:1.8,opacity:0,duration:0.8,ease:"power2.out",immediateRender:false},t+0.52);
    tl.to(S(".stage"),{y:-6,duration:1.8,ease:"sine.inOut",yoyo:true,repeat:1},t+0.3);
  }
/*STAGE*/
  outro(OUTRO);
  window.__timelines["CID"]=tl;
"""

PAGE="""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>SHELLCSS
STAGECSS</style></head><body>
<div id="RIDBARE" data-composition-id="CID" data-start="0" data-duration="DUR" data-width="1080" data-height="1920">
 <div class="world">
  <div class="orb a"></div><div class="orb b"></div><div class="orb c"></div>
  <div class="flash"></div><div class="sweep"></div>
  <div class="content">
    <div class="badge"><span class="gd"></span>BADGE</div>
    <h1 class="hl">HL</h1>
    <div class="divider"><div class="line"></div><div class="node"></div></div>
    <div class="stage"><div class="stagei">STAGEHTML</div></div>
    <p class="outcome">OUTCOME</p>
    <div class="foot"><div class="cta">Book your free demo</div>
      <div class="logo"><div class="ring2"></div>LMARK<div class="wm">LeadaLine</div></div>
    </div>
  </div>
  <div class="vignette"></div><div class="grain"></div>
 </div>
 <script src="./gsap.min.js"></script>
 <script>JS</script>
</div></body></html>"""

def build(r):
    rid="s%02d"%r['n']; RID="#"+rid; cid="svc%02d"%r['n']
    proj=os.path.join(ROOT,r['slug']); hf=os.path.join(proj,"hyperframes")
    os.makedirs(hf,exist_ok=True); os.makedirs(os.path.join(proj,"assets","audio"),exist_ok=True)
    if not os.path.exists(os.path.join(hf,"gsap.min.js")): shutil.copy(os.path.join(SRC,"gsap.min.js"),hf)
    if not os.path.exists(os.path.join(hf,"fonts")): shutil.copytree(os.path.join(SRC,"fonts"),os.path.join(hf,"fonts"))
    outro_t=r.get('outro', r['dur']-2.2)
    js=SHELL_JS.replace("/*STAGE*/", r['stage_js']).replace("OUTRO",str(outro_t)).replace("CID",cid)
    html=PAGE.replace("SHELLCSS",SHELL_CSS).replace("STAGECSS",r.get('stage_css',''))
    html=html.replace("BADGE",r['badge']).replace("HL",r['hl']).replace("OUTCOME",r['outcome'])
    html=html.replace("STAGEHTML",r['stage_html']).replace("LMARK",LMARK).replace("JS",js)
    html=html.replace("DUR",str(r['dur'])).replace("CID",cid).replace("RIDBARE",rid).replace("GID",rid)
    html=html.replace("RID",RID)
    open(os.path.join(hf,"index.html"),"w").write(html)
    open(os.path.join(hf,"hyperframes.json"),"w").write('{"compositions":["index.html"]}')
    pk=sfxlib.build_master(r['sfx'], r['dur'], os.path.join(proj,"assets","audio","sfx_master.wav"))
    print("built %-44s dur=%s sfx=%.2f"%(r['slug'],r['dur'],pk))

from services_data import SERVICES
if __name__=="__main__":
    sel=sys.argv[1:]
    for r in SERVICES:
        if sel and ("s%02d"%r['n']) not in sel and r['slug'] not in sel: continue
        build(r)
