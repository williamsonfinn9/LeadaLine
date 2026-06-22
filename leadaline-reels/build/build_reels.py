# -*- coding: utf-8 -*-
import os, shutil, sys
sys.path.insert(0, os.path.dirname(__file__))
import sfxlib

ROOT="/home/user/OpenMontage/projects"
SRC_HF="/home/user/OpenMontage/projects/leadaline-reel-01-missed-call/hyperframes"  # fonts + gsap source

FONTFACE="""
  @font-face{font-family:'Archivo';font-weight:800;font-display:block;src:url('fonts/Archivo-800.woff2') format('woff2');}
  @font-face{font-family:'Archivo';font-weight:900;font-display:block;src:url('fonts/Archivo-900.woff2') format('woff2');}
  @font-face{font-family:'DM Sans';font-weight:400;font-display:block;src:url('fonts/DMSans-400.woff2') format('woff2');}
  @font-face{font-family:'DM Sans';font-weight:500;font-display:block;src:url('fonts/DMSans-500.woff2') format('woff2');}
  @font-face{font-family:'DM Sans';font-weight:600;font-display:block;src:url('fonts/DMSans-600.woff2') format('woff2');}
  @font-face{font-family:'DM Sans';font-weight:700;font-display:block;src:url('fonts/DMSans-700.woff2') format('woff2');}
  @font-face{font-family:'DM Mono';font-weight:400;font-display:block;src:url('fonts/DMMono-400.woff2') format('woff2');}
  @font-face{font-family:'DM Mono';font-weight:500;font-display:block;src:url('fonts/DMMono-500.woff2') format('woff2');}
"""

COMMON_CSS = r"""
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#050B1A; }
  RID { position:relative; width:1080px; height:1920px; overflow:hidden;
    background: radial-gradient(135% 100% at 50% 12%, #0E2240 0%, #091833 40%, #050B1A 78%);
    font-family:'DM Sans',system-ui,sans-serif; color:#F8FAFC;
    --cy:#18D7FF; --bl:#2563FF; --vi:#7C5CFF; --sl:#94A3B8; --gr:#34D399; --rd:#EF4444; --am:#F59E0B; }
  RID .world { position:absolute; inset:0; transform-origin:50% 42%; }
  RID .orb { position:absolute; border-radius:50%; filter:blur(70px); z-index:0; opacity:0; pointer-events:none; }
  RID .orb.a { width:720px; height:720px; left:-180px; top:480px; background:radial-gradient(circle,rgba(37,99,255,.30),rgba(37,99,255,0) 68%); }
  RID .orb.b { width:640px; height:640px; right:-200px; top:880px; background:radial-gradient(circle,rgba(124,92,255,.26),rgba(124,92,255,0) 68%); }
  RID .orb.c { width:520px; height:520px; left:50%; top:1280px; transform:translateX(-50%); background:radial-gradient(circle,rgba(24,215,255,.20),rgba(24,215,255,0) 68%); }
  RID .flash { position:absolute; inset:0; z-index:2; opacity:0; pointer-events:none;
    background:radial-gradient(120% 80% at 50% 26%, rgba(239,68,68,.55), rgba(239,68,68,0) 60%); }
  RID .snap { position:absolute; inset:0; z-index:7; opacity:0; pointer-events:none; background:#EAF4FF; }
  RID .sweep { position:absolute; top:-10%; left:-60%; width:55%; height:120%; z-index:1; opacity:0; pointer-events:none;
    background:linear-gradient(105deg, transparent, rgba(120,180,255,.10) 45%, rgba(190,225,255,.20) 50%, rgba(120,180,255,.10) 55%, transparent);
    transform:skewX(-12deg); filter:blur(8px); }
  RID .grain { position:absolute; inset:0; z-index:6; opacity:.035; mix-blend-mode:overlay; pointer-events:none;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"); }
  RID .vignette { position:absolute; inset:0; z-index:5; pointer-events:none;
    background:radial-gradient(125% 85% at 50% 40%, transparent 58%, rgba(2,6,16,.5) 100%); }
  RID .content { position:absolute; inset:0; z-index:3; display:flex; flex-direction:column; align-items:center; padding:150px 96px 104px; }
  RID.logotop .content { padding-top:120px; }

  RID .headline { font-family:'Archivo',sans-serif; font-weight:900; text-transform:uppercase; text-align:center;
    font-size:108px; line-height:.98; letter-spacing:-2.5px; text-shadow:0 0 60px rgba(37,99,255,.22); }
  RID .headline > span { display:block; white-space:nowrap; }
  RID .headline .accent { color:var(--cy); text-shadow:0 0 44px rgba(24,215,255,.5); }
  RID .divider { position:relative; margin:34px 0 28px; height:1.5px; width:190px; }
  RID .divider .line { position:absolute; inset:0; border-radius:2px; transform:scaleX(0); background:linear-gradient(90deg,transparent,var(--cy),transparent); }
  RID .divider .node { position:absolute; left:50%; top:50%; width:8px; height:8px; border-radius:50%; transform:translate(-50%,-50%); background:#d6f3ff; box-shadow:0 0 20px 5px rgba(24,215,255,.85); opacity:0; }
  RID .tagline { text-align:center; font-size:42px; font-weight:500; line-height:1.3; color:#BFD0E6; max-width:780px; letter-spacing:.2px; }
  RID .tagline.caps { font-weight:700; text-transform:uppercase; letter-spacing:1px; font-size:36px; }
  RID .tagline .accent { color:var(--cy); }
  RID .bottomsub { text-align:center; font-size:40px; font-weight:500; line-height:1.28; color:#C3D2E6; max-width:780px; margin-top:10px; }
  RID .bottomsub.caps { font-weight:800; text-transform:uppercase; letter-spacing:1px; }
  RID .bottomsub .accent { color:var(--cy); }
  RID .bottomsub .sep { color:var(--cy); }

  RID .stage { position:relative; width:100%; flex:1; margin-top:48px; min-height:680px; }

  /* glass panel + list */
  RID .panel { position:relative; border-radius:32px; padding:32px 28px;
    background:linear-gradient(165deg,rgba(28,48,84,.84),rgba(12,24,50,.9)); border:1px solid rgba(120,180,255,.32);
    box-shadow:0 50px 110px rgba(2,8,24,.6),0 0 70px rgba(37,99,255,.22),inset 0 1px 0 rgba(255,255,255,.09); }
  RID .panel .gloss { position:absolute; inset:0; border-radius:32px; pointer-events:none; background:linear-gradient(160deg,rgba(255,255,255,.10),rgba(255,255,255,0) 32%); }
  RID .panel .pt { font-size:36px; font-weight:700; line-height:1.05; position:relative; }
  RID .panel .pt .accent { color:var(--cy); display:block; }
  RID .cap { display:flex; align-items:center; gap:16px; margin-top:24px; position:relative;
    background:linear-gradient(120deg,rgba(37,99,255,.2),rgba(24,215,255,.09)); border:1px solid rgba(37,99,255,.42); border-radius:18px; padding:16px 18px; }
  RID .cap .chk { width:46px; height:46px; flex:0 0 46px; border-radius:50%; background:linear-gradient(135deg,var(--cy),var(--bl)); display:flex; align-items:center; justify-content:center; box-shadow:0 0 20px rgba(24,215,255,.55); }
  RID .cap .chk svg { width:24px; height:24px; stroke:#fff; }
  RID .cap .ct { font-size:23px; font-weight:600; }
  RID .cap .cs { font-family:'DM Mono',monospace; font-size:18px; color:var(--cy); margin-top:2px; }

  RID .listrow { display:flex; align-items:center; gap:15px; background:rgba(255,255,255,.04); border:1px solid rgba(148,163,184,.12); border-radius:15px; padding:14px 15px; margin-top:13px; position:relative; }
  RID .listrow .tile { width:44px; height:44px; flex:0 0 44px; border-radius:12px; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(0,0,0,.3); }
  RID .listrow .tile svg { width:23px; height:23px; stroke:#fff; }
  RID .listrow .lb { flex:1; display:flex; flex-direction:column; gap:8px; min-width:0; }
  RID .listrow .lb i { height:8px; border-radius:5px; background:linear-gradient(90deg,rgba(150,180,235,.55),rgba(150,180,235,.15)); display:block; }
  RID .listrow .lb i.short { width:56%; }
  RID .listrow .nm { font-size:23px; font-weight:600; color:#EAF1FB; }
  RID .listrow .meta { font-size:19px; color:#93a6c2; margin-top:4px; font-family:'DM Mono',monospace; }
  RID .listrow .badge { font-size:18px; font-weight:600; color:var(--cy); border:1px solid rgba(24,215,255,.5); border-radius:9px; padding:5px 12px; }
  RID .listrow .dot { width:14px; height:14px; border-radius:50%; flex:0 0 14px; background:var(--cy); box-shadow:0 0 12px var(--cy); }

  RID .t-cy { background:linear-gradient(135deg,#29D8F6,#1597D6); }
  RID .t-bl { background:linear-gradient(135deg,#3B7BFF,#1E47D6); }
  RID .t-vi { background:linear-gradient(135deg,#8E73FF,#6A45E6); }
  RID .t-gr { background:linear-gradient(135deg,#34D399,#10b981); }
  RID .t-rd { background:linear-gradient(135deg,#FF6B6B,#E23B3B); }
  RID .t-wa { background:linear-gradient(135deg,#25D366,#12a347); }

  RID .deliver { position:absolute; left:32px; right:32px; bottom:30px; display:flex; align-items:center; justify-content:space-between;
    background:linear-gradient(120deg,var(--bl),#1b4fd6); border-radius:18px; padding:18px 22px; box-shadow:0 14px 34px rgba(37,99,255,.42); }
  RID .deliver .dt { font-size:23px; font-weight:700; }
  RID .deliver .chk { width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,.22); display:flex; align-items:center; justify-content:center; }
  RID .deliver .chk svg { width:22px; height:22px; stroke:#fff; }

  /* connector beam */
  RID .arrowx { position:absolute; opacity:0; height:30px; }
  RID .arrowx .beam { position:absolute; left:0; top:50%; transform:translateY(-50%) scaleX(0); transform-origin:left center; height:5px; width:100%; border-radius:5px; background:linear-gradient(90deg,rgba(24,215,255,0),var(--cy) 35%,var(--bl)); box-shadow:0 0 26px rgba(24,215,255,.8); }
  RID .arrowx .head { position:absolute; right:-2px; top:50%; transform:translateY(-50%) rotate(45deg); width:22px; height:22px; border-top:5px solid var(--bl); border-right:5px solid var(--bl); border-radius:3px; box-shadow:0 0 18px rgba(37,99,255,.7); }
  RID .arrowx .packet { position:absolute; left:0; top:50%; width:28px; height:11px; transform:translateY(-50%); border-radius:8px; background:radial-gradient(circle,rgba(230,250,255,1),rgba(24,215,255,0) 70%); }

  /* chips column */
  RID .chip { display:flex; align-items:center; gap:14px; background:linear-gradient(165deg,rgba(20,34,60,.82),rgba(11,21,44,.86)); border:1px solid rgba(120,160,220,.16); border-radius:18px; padding:15px 16px; box-shadow:0 16px 40px rgba(0,0,0,.4); }
  RID .chip .ico { width:48px; height:48px; flex:0 0 48px; border-radius:13px; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(0,0,0,.3); }
  RID .chip .ico svg { width:25px; height:25px; stroke:#fff; }
  RID .chip .txt { flex:1; min-width:0; }
  RID .chip .cn { font-size:23px; font-weight:600; color:#EAF1FB; white-space:nowrap; }
  RID .chip .cm { font-size:18px; color:#90a3bf; margin-top:4px; font-family:'DM Mono',monospace; }
  RID .chip .cbar { height:7px; width:72%; border-radius:5px; margin-top:9px; background:linear-gradient(90deg,rgba(140,170,225,.45),rgba(140,170,225,.12)); }

  /* step card */
  RID .step { position:relative; border-radius:22px; padding:24px 20px; background:linear-gradient(165deg,rgba(20,36,64,.74),rgba(11,21,44,.82)); border:1px solid rgba(120,180,255,.28); box-shadow:0 20px 50px rgba(0,0,0,.4),0 0 30px rgba(37,99,255,.18); }
  RID .step .num { font-family:'DM Mono',monospace; font-size:30px; font-weight:500; color:var(--cy); }
  RID .step .stl { font-size:25px; font-weight:600; margin-top:10px; line-height:1.16; }
  RID .step .sln { height:1px; background:rgba(120,160,220,.25); margin:14px 0 12px; }
  RID .step .sbar { height:7px; width:62%; border-radius:5px; background:linear-gradient(90deg,rgba(37,99,255,.5),rgba(37,99,255,.12)); }

  /* field row (summary) */
  RID .field { display:flex; align-items:baseline; gap:14px; padding:16px 0; border-bottom:1px solid rgba(120,160,220,.14); }
  RID .field:last-child { border-bottom:none; }
  RID .field .fl { font-size:24px; color:#9fb2cc; width:230px; flex:0 0 230px; display:flex; align-items:center; }
  RID .field .fl b { display:inline-block; width:4px; height:22px; border-radius:2px; background:var(--cy); margin-right:14px; }
  RID .field .fv { font-size:27px; font-weight:600; color:#F1F6FF; }
  RID .field .fv.hi { color:var(--cy); font-weight:700; }

  /* stat tile */
  RID .statile { background:rgba(255,255,255,.045); border:1px solid rgba(120,160,220,.16); border-radius:18px; padding:18px 18px; }
  RID .statile .sl { font-size:21px; color:#9fb2cc; }
  RID .statile .sv { font-size:48px; font-weight:800; letter-spacing:-1.5px; margin-top:6px; font-variant-numeric:tabular-nums; }
  RID .statile .sd { font-size:19px; color:var(--gr); margin-top:4px; font-weight:600; }
  RID .chart { margin-top:18px; background:rgba(255,255,255,.03); border:1px solid rgba(120,160,220,.14); border-radius:18px; padding:18px; }
  RID .chart .clab { font-size:22px; font-weight:600; }

  /* clock chip */
  RID .clock { display:inline-flex; align-items:center; gap:14px; background:linear-gradient(120deg,rgba(37,99,255,.18),rgba(24,215,255,.08)); border:1px solid rgba(37,99,255,.4); border-radius:16px; padding:14px 24px; font-family:'DM Mono',monospace; font-size:34px; color:#EAF4FF; }
  RID .clock svg { width:30px; height:30px; stroke:var(--cy); }

  /* calendar */
  RID .cal { border-radius:24px; padding:22px 20px; background:linear-gradient(165deg,rgba(20,34,60,.74),rgba(11,21,44,.82)); border:1px solid rgba(120,160,220,.16); box-shadow:0 30px 70px rgba(0,0,0,.4); }
  RID .cal h4 { font-size:26px; font-weight:700; margin-bottom:14px; }
  RID .calgrid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px 2px; }
  RID .calgrid span { font-size:21px; text-align:center; color:#cdd8e8; padding:7px 0; position:relative; }
  RID .calgrid .hd { color:#7e8da3; font-size:15px; font-weight:600; }
  RID .calgrid .strk { position:absolute; left:12%; right:12%; top:52%; height:3px; border-radius:2px; background:var(--cy); box-shadow:0 0 10px var(--cy); transform:scaleX(0); transform-origin:left center; }

  /* CTA box */
  RID .cta { border-radius:22px; padding:26px 30px; text-align:center; background:linear-gradient(120deg,rgba(37,99,255,.16),rgba(24,215,255,.07)); border:1px solid rgba(37,99,255,.45); box-shadow:0 0 50px rgba(37,99,255,.3); }
  RID .cta .c1 { font-size:34px; font-weight:600; color:#EAF1FB; }
  RID .cta .c1 .accent { color:var(--cy); font-weight:700; }
  RID .cta .cln { height:1px; background:rgba(120,160,220,.3); margin:16px auto; width:80%; }
  RID .cta .c2 { font-size:30px; color:#C3D2E6; }
  RID .cta .c2 .accent { color:var(--cy); font-weight:700; font-family:'DM Mono',monospace; }

  /* logo */
  RID .logo { display:flex; align-items:center; gap:20px; position:relative; }
  RID.logotop .logo { margin:0 0 30px; }
  RID:not(.logotop) .logo { margin-top:auto; }
  RID .logo .ring2 { position:absolute; left:8px; top:50%; width:70px; height:70px; border-radius:50%; transform:translate(-10%,-50%) scale(0.4); border:2px solid rgba(24,215,255,.7); opacity:0; pointer-events:none; }
  RID .logo .mark { width:62px; height:62px; filter:drop-shadow(0 6px 18px rgba(37,99,255,.45)); }
  RID .logo .wm { font-size:54px; font-weight:600; letter-spacing:-.5px; color:#F4F8FF; }
"""

LOGO = """<div class="logo">
        <div class="ring2"></div>
        <svg class="mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs><linearGradient id="lgRIDBARE" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
            <stop stop-color="#18D7FF"/><stop offset="0.5" stop-color="#2563FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs>
          <rect x="13" y="7" width="14" height="50" rx="7" fill="url(#lgRIDBARE)"/>
          <rect x="13" y="43" width="40" height="14" rx="7" fill="url(#lgRIDBARE)"/>
          <rect x="33" y="7" width="11" height="28" rx="5.5" fill="#18D7FF" opacity="0.95"/></svg>
        <div class="wm">LeadaLine</div>
      </div>"""

# reusable svg icon snippets
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
 'spark':'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
}

JS_TEMPLATE = r"""
    window.__timelines = window.__timelines || {};
    const __R = "RID";
    const tl = gsap.timeline({ paused:true });
    const S = (q)=> __R+" "+q;
    const SNAP="back.out(1.7)", SOFT="power3.out", SMOOTH="power2.out", POP="back.out(2.2)";
    function intro(){
      tl.to(S(".orb.a"),{opacity:1,duration:1.0,ease:"sine.out"},0);
      tl.to(S(".orb.b"),{opacity:1,duration:1.1,ease:"sine.out"},0.1);
      tl.to(S(".orb.c"),{opacity:1,duration:1.1,ease:"sine.out"},0.2);
      tl.fromTo(S(".flash"),{opacity:0},{opacity:0.9,duration:0.10,ease:"power2.out"},0.0);
      tl.to(S(".flash"),{opacity:0,duration:0.42,ease:"power2.in"},0.12);
      tl.from(S(".world"),{scale:1.07,duration:0.62,ease:"power3.out",transformOrigin:"50% 42%"},0.0);
      tl.to(S(".content"),{keyframes:{x:[0,-9,7,-5,3,0],y:[0,5,-4,2,-1,0]},duration:0.30,ease:"none"},0.02);
      tl.fromTo(S(".snap"),{opacity:0},{opacity:0.42,duration:0.06},0.26);
      tl.to(S(".snap"),{opacity:0,duration:0.18},0.32);
      document.querySelectorAll(S(".headline > span")).forEach((el,i)=>{
        tl.from(el,{y:36,scale:0.93,opacity:0,duration:0.30,ease:SNAP},0.28+i*0.12);
      });
      tl.fromTo(S(".sweep"),{x:0,opacity:0},{opacity:1,duration:0.25,ease:"sine.out"},0.55);
      tl.to(S(".sweep"),{x:2200,duration:1.15,ease:"power1.inOut"},0.55);
      tl.to(S(".sweep"),{opacity:0,duration:0.3,ease:"sine.in"},1.5);
      tl.to(S(".divider .line"),{scaleX:1,duration:0.34,ease:"power2.inOut"},0.72);
      tl.to(S(".divider .node"),{opacity:1,duration:0.3,ease:"sine.out"},0.98);
      if(document.querySelector(S(".tagline"))) tl.from(S(".tagline"),{y:18,opacity:0,duration:0.34,ease:SMOOTH},0.86);
    }
    function outro(t){
      var top=document.querySelector(__R).classList.contains('logotop');
      var lt = top? 0.40 : t;
      if(document.querySelector(S(".bottomsub"))) tl.from(S(".bottomsub"),{y:18,opacity:0,duration:0.4,ease:SMOOTH},t-0.25);
      tl.from(S(".logo .mark"),{scale:0.55,opacity:0,duration:0.5,ease:"back.out(2)"},lt);
      tl.from(S(".logo .wm"),{x:-22,opacity:0,duration:0.5,ease:SOFT},lt+0.15);
      tl.fromTo(S(".logo .ring2"),{scale:0.4,opacity:0.9},{scale:1.8,opacity:0,duration:0.8,ease:"power2.out",immediateRender:false},lt+0.15);
      tl.fromTo(S(".logo .mark"),{filter:"drop-shadow(0 6px 18px rgba(37,99,255,.45))"},{filter:"drop-shadow(0 6px 30px rgba(24,215,255,.95))",duration:0.5,ease:"sine.out"},t+0.35);
      tl.to(S(".logo .wm"),{textShadow:"0 0 26px rgba(120,180,255,.6)",duration:0.5,ease:"sine.out"},t+0.35);
      tl.to(S(".stage"),{y:-8,duration:2.0,ease:"sine.inOut",yoyo:true,repeat:1},t+0.4);
      tl.fromTo(S(".sweep"),{x:0,opacity:0},{opacity:0.7,duration:0.3,ease:"sine.out"},t+0.8);
      tl.to(S(".sweep"),{x:2200,duration:1.4,ease:"power1.inOut"},t+0.8);
      tl.to(S(".sweep"),{opacity:0,duration:0.4,ease:"sine.in"},t+1.9);
    }
    intro();
/*STAGE*/
    outro(LOGOT);
    window.__timelines["CID"] = tl;
"""

PAGE = """<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><style>
FONTFACE
COMMON
STAGECSS
</style></head><body>
<div id="RIDBARE" class="ROOTCLS" data-composition-id="CID" data-start="0" data-duration="DUR" data-width="1080" data-height="1920">
  <div class="world">
    <div class="orb a"></div><div class="orb b"></div><div class="orb c"></div>
    <div class="flash"></div><div class="sweep"></div>
    <div class="content">
TOPLOGO
      <h1 class="headline">HEADLINE</h1>
      <div class="divider"><div class="line"></div><div class="node"></div></div>
TAGLINE
      <div class="stage">
STAGEHTML
      </div>
BOTTOMSUB
BOTLOGO
    </div>
    <div class="vignette"></div><div class="snap"></div><div class="grain"></div>
  </div>
  <script src="./gsap.min.js"></script>
  <script>JS</script>
</div></body></html>
"""

def build(reel):
    rid="r%02d"%reel['n']; cid="reel%02d"%reel['n']; RID="#"+rid
    slug=reel['slug']; proj=os.path.join(ROOT, slug); hf=os.path.join(proj,"hyperframes")
    os.makedirs(hf, exist_ok=True); os.makedirs(os.path.join(proj,"assets","audio"), exist_ok=True)
    # fonts + gsap
    if not os.path.exists(os.path.join(hf,"gsap.min.js")): shutil.copy(os.path.join(SRC_HF,"gsap.min.js"), hf)
    if not os.path.exists(os.path.join(hf,"fonts")): shutil.copytree(os.path.join(SRC_HF,"fonts"), os.path.join(hf,"fonts"))
    headline="".join("<span>%s</span>"%l for l in reel['lines'])
    tagline=('<p class="tagline %s">%s</p>'%(reel.get('tagclass',''),reel['tagline'])) if reel.get('tagline') else ""
    bottomsub=('<p class="bottomsub %s">%s</p>'%(reel.get('botclass',''),reel['bottom'])) if reel.get('bottom') else ""
    toplogo=LOGO if reel.get('logotop') else ""
    botlogo="" if reel.get('logotop') else LOGO
    js=JS_TEMPLATE.replace("/*STAGE*/", reel['stage_js']).replace("LOGOT", str(reel.get('logo_t', reel['dur']-2.4))).replace("CID",cid).replace("RID",RID)
    html=(PAGE.replace("FONTFACE",FONTFACE).replace("COMMON",COMMON_CSS).replace("STAGECSS",reel.get('stage_css','').replace("RID",RID))
          .replace("ROOTCLS","logotop" if reel.get('logotop') else "")
          .replace("TOPLOGO",toplogo).replace("BOTLOGO",botlogo)
          .replace("HEADLINE",headline).replace("TAGLINE",tagline).replace("BOTTOMSUB",bottomsub)
          .replace("STAGEHTML",reel['stage_html']).replace("JS",js)
          .replace("DUR",str(reel['dur'])).replace("CID",cid).replace("RIDBARE",rid))
    html=html.replace("RID",RID)  # common css tokens
    open(os.path.join(hf,"index.html"),"w").write(html)
    open(os.path.join(hf,"hyperframes.json"),"w").write('{"compositions":["index.html"]}')
    pk=sfxlib.build_master(reel['sfx'], reel['dur'], os.path.join(proj,"assets","audio","sfx_master.wav"))
    print("built %-44s dur=%s sfxpeak=%.2f"%(slug, reel['dur'], pk))

from reels_data import REELS
if __name__=="__main__":
    sel = sys.argv[1:]
    for r in REELS:
        if sel and ("r%02d"%r['n']) not in sel and r['slug'] not in sel: continue
        build(r)
