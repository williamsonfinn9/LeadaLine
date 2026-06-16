/* ============================================================
   LeadaLine — Design System
   ============================================================ */

/* Custom Properties */
:root {
  --bg-primary:    #F8FBFF;
  --bg-surface:    #F3F7FF;
  --bg-card:       rgba(255,255,255,0.90);
  --bg-card-hover: #FAFCFF;
  --border:        rgba(148,163,184,0.20);
  --border-accent: rgba(37,99,235,0.30);
  --accent:        #2563EB;
  --accent-cyan:   #18D7FF;
  --accent-blue:   #1d4ed8;
  --accent-violet: #7C5CFF;
  --accent-purple: #7c3aed;
  --accent-glow:   rgba(37,99,235,0.08);
  --accent-dark:   rgba(37,99,235,0.05);
  --text-primary:  #07142F;
  --text-secondary:#334155;
  --text-muted:    #64748B;
  --success:       #22c55e;
  --warning:       #f59e0b;
  --error:         #ef4444;
  --radius-sm:     6px;
  --radius-md:     10px;
  --radius-lg:     16px;
  --radius-xl:     24px;
  --shadow-card:   0 2px 8px rgba(15,23,42,0.05), 0 20px 60px rgba(15,23,42,0.06);
  --shadow-glow:   0 0 40px rgba(37,99,235,0.12);
  --transition:    200ms ease;
  --font:          'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --nav-height:    76px;
  /* Gradient — cyan → blue → violet, matches reference */
  --grad-primary:  linear-gradient(135deg, #18D7FF 0%, #2563EB 50%, #7C5CFF 100%);
  --grad-glow:     0 0 40px rgba(37,99,235,0.18), 0 0 80px rgba(124,92,255,0.10);
}

/* Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
/* ── Atmospheric glow — the dominant background element (like the reference) */
body::before {
  content: '';
  position: fixed;
  top: -30vh;
  left: 50%;
  transform: translateX(-50%);
  width: 160vw;
  height: 110vh;
  background:
    radial-gradient(ellipse 70% 60% at 90% 0%, rgba(24,215,255,0.08) 0%, transparent 55%),
    radial-gradient(ellipse 60% 50% at 10% 100%, rgba(124,92,255,0.06) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 50% 0%, rgba(37,99,235,0.05) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}
img, video { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }
input, textarea, select { font-family: inherit; }

/* Layout */
.container    { width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 24px; }
.container-sm { width: 100%; max-width: 780px;  margin: 0 auto; padding: 0 24px; }

/* Page */
.page-wrapper { padding-top: var(--nav-height); position: relative; overflow-x: hidden; }

/* ── BACKGROUND DECORATION SYSTEM ──────────────────────────── */

/* Global dot matrix — very subtle, sits above atmospheric glow */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(37,99,235,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  z-index: 0;
}
/* Ensure all content sits above the body::after dot layer */
.nav, .page-wrapper { position: relative; z-index: 1; }

/* Page decoration container */
.page-decor {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
/* Push section content above decoration layer */
.page-decor ~ section > .container,
.page-decor ~ section > .container-sm,
.page-decor ~ div > .container,
.page-decor ~ div > .container-sm { position: relative; z-index: 1; }

/* Orb elements */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.orb-cyan   { background: radial-gradient(circle at center, rgba(37,99,235,0.10) 0%, transparent 68%); }
.orb-blue   { background: radial-gradient(circle at center, rgba(37,99,235,0.08) 0%, transparent 68%); }
.orb-purple { background: radial-gradient(circle at center, rgba(124,58,237,0.08) 0%, transparent 68%); }
.orb-green  { background: radial-gradient(circle at center, rgba(34,197,94,0.08) 0%, transparent 68%); }
.orb-xl { width: 800px; height: 800px; }
.orb-lg { width: 560px; height: 560px; }
.orb-md { width: 360px; height: 360px; }
.orb-sm { width: 220px; height: 220px; }

@keyframes orb-float   { 0%,100%{transform:translate(0,0);} 33%{transform:translate(28px,-18px);} 66%{transform:translate(-18px,22px);} }
@keyframes orb-float-2 { 0%,100%{transform:translate(0,0);} 33%{transform:translate(-22px,16px);} 66%{transform:translate(20px,-24px);} }
@keyframes orb-float-3 { 0%,100%{transform:translate(0,0);} 40%{transform:translate(16px,20px);} 75%{transform:translate(-20px,-14px);} }
.orb-f1 { animation: orb-float   28s ease-in-out infinite; }
.orb-f2 { animation: orb-float-2 22s ease-in-out infinite; animation-delay:-9s; }
.orb-f3 { animation: orb-float-3 34s ease-in-out infinite; animation-delay:-17s; }

/* SVG pattern layer */
.bg-svg { position: absolute; pointer-events: none; }

/* Sections */
.section    { padding: 96px 0; }
.section-sm { padding: 64px 0; }

.section-header {
  max-width: 640px;
  margin: 0 auto 64px;
  text-align: center;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, rgba(37,99,235,0.06), rgba(124,58,237,0.06));
  border: 1px solid transparent;
  /* Gradient border via background-clip trick */
  box-shadow: inset 0 0 0 1px rgba(37,99,235,0.2);
  border-radius: 100px;
  padding: 6px 14px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  /* Gradient text */
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin-bottom: 20px;
  /* Keep the pill background — override text-clip for background via wrapper pseudo */
  position: relative;
  isolation: isolate;
}
.section-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 100px;
  padding: 1px;
  background: var(--grad-primary);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.5;
}
.section-badge::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 100px;
  background: linear-gradient(135deg, rgba(37,99,235,0.07), rgba(67,120,230,0.07), rgba(124,58,237,0.07));
  z-index: -1;
}

.section-title    { font-size: clamp(1.6rem,3.5vw,2.5rem); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 16px; }
.section-subtitle { color: var(--text-secondary); font-size: 1.125rem; line-height: 1.7; }

/* Typography helpers */
.text-accent    { color: var(--accent); }
.text-muted     { color: var(--text-muted); }
.text-secondary { color: var(--text-secondary); }
.text-center    { text-align: center; }
.text-success   { color: var(--success); }

/* Gradient text — consistent across site, matches logo gradient */
.text-gradient {
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font);
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1;
  border-radius: var(--radius-md);
  padding: 14px 24px;
  transition: all var(--transition);
  cursor: pointer;
  white-space: nowrap;
  border: 1.5px solid transparent;
  text-decoration: none;
}
.btn-primary  {
  background: var(--grad-primary);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 2px 20px rgba(67,120,230,0.2);
  position: relative;
}
.btn-primary:hover  {
  box-shadow: var(--grad-glow), 0 4px 32px rgba(124,58,237,0.2);
  transform: translateY(-2px);
  filter: brightness(1.08);
}
.btn-outline  {
  background: transparent;
  color: var(--accent);
  border-color: rgba(37,99,235,0.35);
  box-shadow: inset 0 0 0 0 var(--accent-dark);
}
.btn-outline:hover  {
  background: rgba(37,99,235,0.06);
  border-color: rgba(37,99,235,0.45);
  color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(37,99,235,0.10);
}
.btn-ghost    { background: rgba(0,0,0,0.03); color: var(--text-secondary); border-color: var(--border); }
.btn-ghost:hover    { background: rgba(0,0,0,0.05); color: var(--text-primary); border-color: rgba(255,255,255,0.12); }
.btn-lg   { font-size: 1rem; padding: 17px 32px; }
.btn-sm   { font-size: 0.875rem; padding: 10px 18px; }
.btn-full { width: 100%; }
.btn-group { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }

/* Navigation */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  height: var(--nav-height);
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(148,163,184,0.16);
  transition: all var(--transition);
}
.nav.scrolled { background: rgba(255,255,255,0.99); box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
.nav-inner {
  height: var(--nav-height);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--ll-nav-gap, 20px);
}
.nav-logo { justify-self: start; }
.nav-ctas { margin-left: 40px; }
.nav-links { transform: translateX(var(--ll-nav-x, 0px)); transition: transform 200ms ease; }
/* Nav uses a fluid container so the logo can sit close to the corner */
.nav .container { max-width: none; padding-left: 16px; padding-right: 100px; }
.nav-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
}
.nav-logo-img {
  height: var(--ll-logo-h, 48px);
  width: auto;
  flex-shrink: 0;
  display: block;
  filter: drop-shadow(0 0 14px rgba(37,99,235,0.20));
}
/* Fallback: keep logo-mark in case SVG fails to load */
.logo-mark {
  width: 32px; height: 32px;
  background: var(--accent);
  color: #f0f4ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 900;
  flex-shrink: 0;
}
/* Footer logo slightly smaller */
.footer-brand .nav-logo-img { height: 36px; filter: drop-shadow(0 0 10px rgba(37,99,235,0.18)); }
.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1;
  min-width: 0;
}
.nav-links a {
  padding: 8px 11px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--transition);
  white-space: nowrap;
}
.nav-links a:hover, .nav-links a.active { color: var(--text-primary); background: rgba(0,0,0,0.05); }
.nav-ctas { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  margin-left: auto;
}
.nav-toggle span { display: block; width: 22px; height: 2px; background: var(--text-primary); border-radius: 2px; transition: all var(--transition); }
.nav-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.nav-mobile {
  display: none;
  position: fixed;
  top: var(--nav-height);
  left: 0; right: 0;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  padding: 16px 20px;
  z-index: 199;
  box-shadow: 0 16px 48px rgba(0,0,0,0.10);
}
.nav-mobile.open { display: block; }
.nav-mobile-links { display: flex; flex-direction: column; gap: 2px; margin-bottom: 16px; }
.nav-mobile-links a { display: block; padding: 12px 16px; font-size: 1rem; font-weight: 500; color: var(--text-secondary); border-radius: var(--radius-md); transition: all var(--transition); }
.nav-mobile-links a:hover { background: rgba(0,0,0,0.04); color: var(--text-primary); }
.nav-mobile-ctas { display: flex; flex-direction: column; gap: 8px; padding-top: 16px; border-top: 1px solid var(--border); }

/* Cards */
.card {
  background: rgba(255,255,255,0.82);
  border: 1px solid rgba(148,163,184,0.18);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: 0 2px 8px rgba(15,23,42,0.04), 0 20px 60px rgba(15,23,42,0.05);
  transition: all 250ms ease;
  backdrop-filter: blur(8px);
}
.card-hover:hover { border-color: rgba(37,99,235,0.25); box-shadow: 0 4px 32px rgba(37,99,235,0.10), 0 20px 60px rgba(15,23,42,0.07); transform: translateY(-3px); }
.card-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
.card-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.card-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
.card-icon {
  width: 44px; height: 44px;
  background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(67,120,230,0.1), rgba(124,58,237,0.08));
  border: 1px solid rgba(67,120,230,0.25);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  font-size: 1.25rem;
}
.card-title { font-size: 1.0625rem; font-weight: 700; margin-bottom: 8px; }
.card-text  { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.7; }

/* Pulse dot */
.pulse-dot {
  width: 7px; height: 7px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.75); } }

/* Hero */
.hero {
  padding: 100px 0 80px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content:'';
  position:absolute; top:-200px; left:50%; transform:translateX(-50%);
  width:1400px; height:900px;
  background:radial-gradient(ellipse at 50% 42%,
    rgba(37,99,235,0.09) 0%,
    rgba(124,58,237,0.05) 35%,
    transparent 65%);
  pointer-events:none;
  z-index: 0;
}
.hero-inner { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
.hero-badge {
  display:inline-flex; align-items:center; gap:8px;
  background: linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.05));
  border:1px solid rgba(37,99,235,0.2);
  border-radius:100px; padding:8px 16px;
  font-size:0.8125rem; font-weight:600;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin-bottom:24px;
  position: relative;
  isolation: isolate;
}
.hero-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 100px;
  background: linear-gradient(135deg,rgba(37,99,235,0.07),rgba(67,120,230,0.07),rgba(124,58,237,0.05));
  border: 1px solid rgba(67,120,230,0.3);
  z-index: -1;
}
.hero-title {
  font-size: clamp(2.1rem,4.5vw,3.25rem);
  font-weight: 850;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 22px;
}
.hero-title .highlight {
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 36px;
  max-width: 500px;
}

/* Dashboard visual */
.dashboard-visual { position:relative; }
.dashboard-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 0 40px rgba(37,99,235,0.06);
}
.dash-titlebar {
  background: var(--bg-card);
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--border);
}
.dash-dots { display:flex; gap:6px; }
.dash-dot { width:10px; height:10px; border-radius:50%; }
.dash-dot-r { background:#ef4444; }
.dash-dot-y { background:#f59e0b; }
.dash-dot-g { background:#22c55e; }
.dash-titlebar-label { flex:1; text-align:center; font-size:0.8125rem; font-weight:600; color:var(--text-muted); }
.dash-live {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.6875rem; font-weight: 700; color: var(--success);
  background: rgba(34,197,94,0.1);
  border: 1px solid rgba(34,197,94,0.25);
  border-radius: 100px;
  padding: 2px 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.dash-live-dot {
  width: 6px; height: 6px;
  background: var(--success); border-radius: 50%;
  box-shadow: 0 0 6px var(--success);
  animation: pulse 2s infinite;
}
.dash-body { padding:18px; display:flex; flex-direction:column; gap:14px; }

/* ── Stat tiles ────────────────────────────────────────────── */
.dash-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.dash-stat {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 13px 14px 10px;
  overflow: hidden;
}
.dash-stat-join {
  background: linear-gradient(135deg, rgba(37,99,235,0.07), rgba(67,120,230,0.04));
  border-color: rgba(67,120,230,0.25);
}
.dash-stat-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.dash-stat-row {
  display: flex; align-items: baseline; gap: 8px;
}
.dash-stat-num {
  font-size: 1.625rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--text-primary);
}
.dash-stat-delta {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: 0.6875rem; font-weight: 700;
  padding: 2px 6px;
  border-radius: 100px;
}
.dash-stat-delta.up {
  color: var(--success);
  background: rgba(34,197,94,0.08);
}
.dash-stat-sub {
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin-top: 6px;
}
.dash-sparkline {
  width: 100%; height: 22px;
  display: block;
  margin-top: 4px;
}

/* ── Pipeline ──────────────────────────────────────────────── */
.pipeline-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 13px 14px;
}
.pipeline-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px;
}
.pipeline-title {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-muted);
}
.pipeline-total {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;
}
.pipeline-bar {
  display: flex;
  height: 10px;
  border-radius: 100px;
  overflow: hidden;
  background: rgba(0,0,0,0.03);
  margin-bottom: 10px;
}
.pipe-seg { display: block; height: 100%; transition: flex-grow 400ms ease; }
.pipe-seg + .pipe-seg { box-shadow: -1px 0 0 rgba(255,255,255,0.45); }
.p-new       { background: linear-gradient(90deg,#2563eb,#4f8ef7); }
.p-contacted { background: linear-gradient(90deg,#4f8ef7,#7c3aed); }
.p-quoted    { background: linear-gradient(90deg,#f59e0b,#fbbf24); }
.p-booked    { background: linear-gradient(90deg,#16a34a,#22c55e); }
.p-lost      { background: linear-gradient(90deg,#475569,#64748b); }

.pipeline-legend {
  display: flex; flex-wrap: wrap; gap: 12px 16px;
  font-size: 0.6875rem; color: var(--text-muted);
}
.pipeline-legend span { display: inline-flex; align-items: center; gap: 5px; }
.pipeline-legend b { color: var(--text-primary); font-weight: 700; margin-left: 2px; }
.leg-dot {
  width: 8px; height: 8px; border-radius: 2px; display: inline-block;
}
.l-new       { background: #2563eb; }
.l-contacted { background: #4f8ef7; }
.l-quoted    { background: #f59e0b; }
.l-booked    { background: #22c55e; }

/* ── Airtable-style mini table ─────────────────────────────── */
.at-table {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-card);
}
.at-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 9px 12px;
  border-bottom: 1px solid var(--border);
  font-size: 0.8125rem;
  color: var(--text-primary);
}
.at-row:last-child { border-bottom: none; }
.at-head {
  background: rgba(0,0,0,0.02);
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  font-weight: 700;
  padding: 7px 12px;
}
.at-cell { display: flex; align-items: center; gap: 8px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.at-c-name { font-weight: 600; }
.at-c-svc  { color: var(--text-secondary); font-size: 0.75rem; }
.at-c-status { justify-self: end; }
.at-c-name .lead-avatar { width: 22px; height: 22px; font-size: 0.625rem; }
.lead-row {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 13px 15px;
  display: flex;
  align-items: center;
  gap: 11px;
  transition: border-color 0.3s;
}
.lead-row.highlight { border-color: var(--border-accent); box-shadow: 0 0 18px var(--accent-glow); }
.lead-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8125rem; font-weight: 700; color: #f0f4ff;
  flex-shrink: 0;
}
.av-1 { background: linear-gradient(135deg,#4f8ef7,#2563eb); }
.av-2 { background: linear-gradient(135deg,#22c55e,#2563eb); }
.av-3 { background: linear-gradient(135deg,#f59e0b,#ef4444); }
.lead-info { flex:1; min-width:0; }
.lead-name    { font-size:0.8125rem; font-weight:600; line-height:1.2; }
.lead-service { font-size:0.75rem; color:var(--text-muted); }
.lead-status {
  display:inline-flex; align-items:center; gap:4px;
  padding:3px 9px; border-radius:100px;
  font-size:0.6875rem; font-weight:700; flex-shrink:0;
}
.s-new       { background:rgba(37,99,235,0.1);  color:var(--accent);   border:1px solid rgba(37,99,235,0.2); }
.s-qualify   { background:rgba(245,158,11,0.1); color:#f59e0b; border:1px solid rgba(245,158,11,0.2); }
.s-contacted { background:rgba(67,120,230,0.1); color:#4f8ef7; border:1px solid rgba(67,120,230,0.2); }
.s-booked    { background:rgba(34,197,94,0.1);  color:#22c55e; border:1px solid rgba(34,197,94,0.2); }
.alert-row {
  background: rgba(37,99,235,0.05);
  border: 1px solid rgba(37,99,235,0.13);
  border-radius: var(--radius-md);
  padding: 11px 15px;
  display: flex; align-items: center; gap: 10px;
}
.alert-icon-wrap {
  width:30px; height:30px;
  background: rgba(37,99,235,0.1); border-radius:7px;
  display:flex; align-items:center; justify-content:center;
  font-size:0.875rem; flex-shrink:0;
}
.alert-label { font-size:0.6875rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:0.06em; }
.alert-msg   { font-size:0.8125rem; color:var(--text-secondary); }
.ai-row {
  display:flex; align-items:center; gap:8px;
  padding:10px 15px;
  background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md);
}
.ai-spinner {
  width:14px; height:14px;
  border:2px solid rgba(37,99,235,0.25); border-top-color:var(--accent);
  border-radius:50%;
  animation:spin 0.8s linear infinite;
  flex-shrink:0;
}
@keyframes spin { to { transform:rotate(360deg); } }
.ai-label { font-size:0.8125rem; color:var(--accent); font-weight:600; }

/* Credibility strip */
.cred-strip {
  padding: 22px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.cred-inner { display:flex; align-items:center; justify-content:center; gap:36px; flex-wrap:wrap; }
.cred-item  { display:flex; align-items:center; gap:7px; font-size:0.875rem; font-weight:500; color:var(--text-secondary); white-space:nowrap; }
.cred-dot   { width:6px; height:6px; background:var(--accent); border-radius:50%; flex-shrink:0; }

/* Pain cards */
.pain-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; }
.pain-card {
  background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:22px 18px; text-align:center; transition:all 250ms ease;
}
.pain-card:hover { border-color:rgba(239,68,68,0.28); box-shadow:0 0 20px rgba(239,68,68,0.05); }
.pain-emoji { font-size:1.75rem; margin-bottom:10px; display:block; }
.pain-text  { font-size:0.9375rem; font-weight:600; color:var(--text-secondary); }

/* Step cards */
.steps-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; }
.step-card  { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-lg); padding:28px; transition:all 250ms ease; }
.step-card:hover { border-color:var(--border-accent); box-shadow:var(--shadow-glow); transform:translateY(-2px); }
.step-num {
  width:36px; height:36px;
  background: var(--grad-primary); color:#fff;
  border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-size:0.9375rem; font-weight:800; margin-bottom:20px;
}
.step-title { font-size:1.0625rem; font-weight:700; margin-bottom:8px; }
.step-text  { font-size:0.9375rem; color:var(--text-secondary); line-height:1.7; }

/* Industry pills */
.industry-grid { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; }
.industry-pill {
  display:flex; align-items:center; gap:7px;
  background:var(--bg-card); border:1px solid var(--border); border-radius:100px;
  padding:10px 18px; font-size:0.9375rem; font-weight:500; color:var(--text-secondary);
  transition:all var(--transition);
}
.industry-pill:hover { border-color:var(--border-accent); color:var(--text-primary); background:var(--accent-dark); }

/* Comparison */
.comparison-wrap { overflow-x:auto; border-radius:var(--radius-lg); border:1px solid var(--border); }
.comparison-table { width:100%; border-collapse:collapse; }
.comparison-table th {
  background:var(--bg-card); padding:18px 24px;
  font-size:0.9375rem; font-weight:700; text-align:left;
  border-bottom:1px solid var(--border); color:var(--text-primary);
  white-space:nowrap;
}
.comparison-table th.col-ll { background:rgba(37,99,235,0.06); color:var(--accent); border-bottom-color:rgba(37,99,235,0.2); }
.comparison-table td {
  padding:15px 24px; font-size:0.9375rem;
  border-bottom:1px solid var(--border); color:var(--text-secondary);
  background:var(--bg-surface); vertical-align:top; line-height:1.6;
}
.comparison-table td.col-ll { background:rgba(37,99,235,0.025); color:var(--text-primary); border-left:1px solid rgba(37,99,235,0.12); border-right:1px solid rgba(37,99,235,0.12); }
.comparison-table td.row-label { font-weight:600; color:var(--text-primary); background:var(--bg-card); white-space:nowrap; }
.comparison-table tr:last-child td { border-bottom:none; }

/* How It Works — flow stages */
.flow-stages { display:flex; flex-direction:column; }
.flow-stage {
  display:grid; grid-template-columns:72px 1fr; gap:32px;
  padding:40px 0; border-bottom:1px solid var(--border); align-items:start;
}
.flow-stage:last-child { border-bottom:none; }
.stage-indicator { display:flex; flex-direction:column; align-items:center; }
.stage-num {
  width:52px; height:52px;
  background: var(--grad-primary); color:#fff;
  border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-size:1.125rem; font-weight:800; flex-shrink:0; position:relative; z-index:1;
  box-shadow: 0 0 24px rgba(67,120,230,0.3);
}
.stage-line { width:2px; height:50px; background:linear-gradient(to bottom,rgba(37,99,235,0.3),transparent); margin-top:8px; }
.flow-stage:last-child .stage-line { display:none; }
.stage-tag   { font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--accent); margin-bottom:8px; }
.stage-title { font-size:1.375rem; font-weight:700; margin-bottom:12px; }
.stage-desc  { font-size:0.9375rem; color:var(--text-secondary); line-height:1.75; margin-bottom:16px; }
.stage-why   { font-size:0.9375rem; color:var(--text-secondary); margin-bottom:20px; }
.stage-why strong { color:var(--text-primary); }
.stage-example {
  background:var(--bg-card); border:1px solid var(--border);
  border-left:3px solid var(--accent); border-radius:var(--radius-md);
  padding:14px 18px;
}
.stage-example-tag  { font-size:0.6875rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted); margin-bottom:5px; }
.stage-example-text { font-size:0.9375rem; color:var(--text-secondary); font-style:italic; }

/* What You Get — benefit cards */
.benefit-card {
  background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-lg);
  padding:30px; transition:all 250ms ease; display:flex; flex-direction:column; gap:14px;
}
.benefit-card:hover { border-color:var(--border-accent); box-shadow:var(--shadow-glow); transform:translateY(-2px); }
.benefit-icon { width:48px; height:48px; background:linear-gradient(135deg,rgba(37,99,235,0.1),rgba(67,120,230,0.1),rgba(124,58,237,0.08)); border:1px solid rgba(67,120,230,0.25); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:1.5rem; }
.benefit-name { font-size:1.125rem; font-weight:700; }
.benefit-meta { display:flex; flex-direction:column; gap:10px; }
.benefit-meta-label { font-size:0.6875rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent); margin-bottom:2px; }
.benefit-meta-text  { font-size:0.9375rem; color:var(--text-secondary); line-height:1.6; }
.benefit-outcome {
  margin-top:auto; background:rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.15);
  border-radius:var(--radius-sm); padding:9px 13px;
  font-size:0.875rem; font-weight:600; color:var(--success);
  display:flex; align-items:center; gap:6px;
}

/* Pricing */
.pricing-layout { display:grid; grid-template-columns:1fr 360px; gap:48px; align-items:start; }
.pricing-card {
  background:var(--bg-card); border:1px solid var(--border-accent); border-radius:var(--radius-xl);
  padding:40px; box-shadow:0 0 60px rgba(37,99,235,0.07);
}
.pricing-badge { display:inline-flex; align-items:center; background:var(--grad-primary); color:#fff; border-radius:100px; padding:4px 14px; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:24px; }
.pricing-name  { font-size:1.5rem; font-weight:700; margin-bottom:6px; }
.pricing-price { margin-bottom:6px; }
.pricing-amount {
  font-size:3rem; font-weight:800; letter-spacing:-0.04em; line-height:1;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
.pricing-period { font-size:1rem; color:var(--text-muted); font-weight:500; }
.pricing-duration { font-size:0.9375rem; color:var(--text-secondary); margin-bottom:28px; }
.pricing-divider { height:1px; background:var(--border); margin:24px 0; }
.pricing-includes-title { font-size:0.6875rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted); margin-bottom:14px; }
.pricing-features { display:flex; flex-direction:column; gap:11px; margin-bottom:28px; }
.pricing-feature { display:flex; align-items:flex-start; gap:10px; font-size:0.9375rem; color:var(--text-secondary); }
.check-circle {
  width:18px; height:18px;
  background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.2);
  border-radius:50%; display:flex; align-items:center; justify-content:center;
  flex-shrink:0; font-size:0.625rem; color:var(--success); margin-top:2px;
}
.pricing-note {
  background:var(--bg-surface); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:14px 18px; font-size:0.875rem; color:var(--text-muted); line-height:1.7; margin-top:20px;
}
.pricing-side { display:flex; flex-direction:column; gap:20px; }

/* Pricing add-on card — website build */
.addon-card {
  position: relative;
  background: linear-gradient(155deg, rgba(15,26,48,0.95) 0%, rgba(10,18,34,0.95) 100%);
  border: 1px solid rgba(67,120,230,0.32);
  border-radius: var(--radius-lg);
  padding: 22px 22px 18px;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 12px 32px rgba(0,0,0,0.35), 0 0 32px rgba(67,120,230,0.06);
}
.addon-card::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 160px; height: 160px;
  background: radial-gradient(circle at top right, rgba(124,58,237,0.18), transparent 65%);
  pointer-events: none;
  z-index: -1;
}
.addon-tag {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(37,99,235,0.08);
  border: 1px solid rgba(37,99,235,0.22);
  border-radius: 100px;
  padding: 4px 11px;
  font-size: 0.6875rem; font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}
.addon-tag-dot {
  width: 6px; height: 6px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent);
}
.addon-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.addon-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 14px;
}
.addon-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px dashed rgba(67,120,230,0.18);
}
.addon-plus {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  margin-right: 2px;
}
.addon-amount {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  line-height: 1;
}
.addon-period {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 500;
}
.addon-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 14px;
}
.addon-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}
.addon-tick {
  color: var(--success);
  font-size: 0.75rem;
  margin-top: 2px;
  flex-shrink: 0;
}
.addon-footnote {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.55;
  font-style: italic;
}
.roi-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-lg); padding:28px; }
.roi-title { font-size:1.0625rem; font-weight:700; margin-bottom:10px; }
.roi-text  { font-size:0.9375rem; color:var(--text-secondary); line-height:1.7; }

/* FAQ */
.faq-list { display:flex; flex-direction:column; gap:8px; }
.faq-item { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden; transition:border-color var(--transition); }
.faq-item.open { border-color:var(--border-accent); }
.faq-q {
  width:100%; text-align:left; padding:20px 24px;
  font-size:1rem; font-weight:600; color:var(--text-primary);
  background:none; border:none; cursor:pointer;
  display:flex; align-items:center; justify-content:space-between; gap:16px;
  transition:color var(--transition);
}
.faq-q:hover { color:var(--accent); }
.faq-chevron { width:18px; height:18px; flex-shrink:0; transition:transform var(--transition); color:var(--text-muted); }
.faq-item.open .faq-chevron { transform:rotate(180deg); color:var(--accent); }
.faq-a { max-height:0; overflow:hidden; transition:max-height 320ms ease; }
.faq-a-inner { padding:0 24px 20px; font-size:0.9375rem; color:var(--text-secondary); line-height:1.8; }
.faq-item.open .faq-a { max-height:600px; }

/* Forms */
.form-grid   { display:grid; gap:20px; }
.form-grid-2 { grid-template-columns:1fr 1fr; }
.form-group  { display:flex; flex-direction:column; gap:7px; }
.form-label  { font-size:0.875rem; font-weight:600; color:var(--text-secondary); }
.form-label .req { color:var(--accent); margin-left:2px; }
.form-input, .form-textarea, .form-select {
  width:100%; background:var(--bg-card); border:1.5px solid var(--border); border-radius:var(--radius-md);
  padding:12px 16px; font-size:0.9375rem; color:var(--text-primary);
  transition:all var(--transition); outline:none; appearance:none; -webkit-appearance:none;
}
.form-input::placeholder, .form-textarea::placeholder { color:var(--text-muted); }
.form-input:focus, .form-textarea:focus, .form-select:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(37,99,235,0.09); }
.form-input.invalid, .form-textarea.invalid, .form-select.invalid { border-color:var(--error); box-shadow:0 0 0 3px rgba(239,68,68,0.09); }
.form-error { font-size:0.8125rem; color:var(--error); display:none; }
.form-error.show { display:block; }
.form-textarea { min-height:120px; resize:vertical; }
.form-select {
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 12px center; background-size:16px;
  padding-right:40px; cursor:pointer;
}
.form-select option { background:var(--bg-card); color:var(--text-primary); }

/* Book a demo layout */
.book-layout { display:grid; grid-template-columns:1fr 340px; gap:48px; align-items:start; }
.book-form-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-xl); padding:40px; }
.book-side { display:flex; flex-direction:column; gap:20px; position:sticky; top:calc(var(--nav-height) + 24px); }
.review-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-lg); padding:26px; }
.review-card-title { font-size:0.875rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:18px; }
.review-steps { display:flex; flex-direction:column; gap:13px; }
.review-step { display:flex; align-items:flex-start; gap:11px; }
.review-step-num {
  width:22px; height:22px; flex-shrink:0;
  background: var(--grad-primary);
  border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-size:0.6875rem; font-weight:700; color:#fff; margin-top:1px;
  flex-shrink: 0;
}
.review-step-text { font-size:0.9rem; color:var(--text-secondary); line-height:1.5; }
.reassure-card { background:rgba(37,99,235,0.04); border:1px solid rgba(37,99,235,0.15); border-radius:var(--radius-lg); padding:22px; }
.reassure-title { font-size:0.9375rem; font-weight:700; margin-bottom:8px; }
.reassure-text  { font-size:0.875rem; color:var(--text-secondary); line-height:1.65; }

/* Direct-contact card on Book-a-Demo sidebar */
.contact-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.contact-card-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.contact-line {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  transition: all var(--transition);
}
.contact-line:hover {
  border-color: var(--border-accent);
  background: var(--accent-dark);
  color: var(--accent);
  transform: translateY(-1px);
}
.contact-icon {
  width: 26px; height: 26px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg,rgba(37,99,235,0.12),rgba(67,120,230,0.12));
  border: 1px solid rgba(67,120,230,0.25);
  color: var(--accent);
  font-size: 0.8125rem;
  flex-shrink: 0;
}

/* Success state */
.success-state { display:none; text-align:center; padding:52px 32px; }
.success-state.show { display:block; }
.success-icon { width:72px; height:72px; background:rgba(34,197,94,0.1); border:2px solid rgba(34,197,94,0.3); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 24px; }
.success-title { font-size:1.5rem; font-weight:700; color:var(--success); margin-bottom:12px; }
.success-text  { color:var(--text-secondary); font-size:1rem; line-height:1.7; }

/* Loading spinner */
.spinner { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:#f0f4ff; border-radius:50%; animation:spin 0.7s linear infinite; }

/* Demo page */
.demo-layout { display:grid; grid-template-columns:1fr 380px; gap:36px; align-items:start; }
.assistant-card { background:var(--bg-card); border:1px solid var(--border-accent); border-radius:var(--radius-xl); overflow:hidden; box-shadow:0 0 60px rgba(37,99,235,0.06); }
.assistant-header { background:var(--bg-surface); padding:18px 22px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:12px; }
.assistant-avatar { width:40px; height:40px; background:linear-gradient(135deg,#4f8ef7,#2563eb); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.25rem; flex-shrink:0; }
.assistant-name   { font-size:0.9375rem; font-weight:700; }
.assistant-status { font-size:0.8125rem; color:var(--accent); display:flex; align-items:center; gap:5px; }
.assistant-body   { padding:32px 22px; min-height:260px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:18px; }
.call-btn {
  width:80px; height:80px; border-radius:50%;
  background: var(--grad-primary); border:none; cursor:pointer;
  font-size:2rem; display:flex; align-items:center; justify-content:center;
  transition:all 250ms ease; box-shadow: 0 0 32px rgba(67,120,230,0.3), 0 0 60px rgba(37,99,235,0.15);
}
.call-btn:hover    { transform:scale(1.07); box-shadow: var(--grad-glow); filter: brightness(1.1); }
.call-btn.active   { background:var(--error); box-shadow:0 0 32px rgba(239,68,68,0.3); animation:ring-pulse 1.5s infinite; }
@keyframes ring-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4);} 50%{box-shadow:0 0 0 14px rgba(239,68,68,0);} }
.call-label { font-size:0.9375rem; font-weight:600; color:var(--text-secondary); }
.call-sub   { font-size:0.8125rem; color:var(--text-muted); }

.sq-panel { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-xl); padding:24px; }
.sq-title { font-size:0.8125rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted); margin-bottom:12px; }
.sq-buttons { display:flex; flex-direction:column; gap:6px; }
.sq-btn {
  width:100%; text-align:left; background:var(--bg-surface);
  border:1px solid var(--border); border-radius:var(--radius-md);
  padding:11px 15px; font-size:0.875rem; color:var(--text-secondary);
  cursor:pointer; transition:all var(--transition); font-family:var(--font);
}
.sq-btn:hover { background:var(--accent-dark); border-color:var(--border-accent); color:var(--text-primary); }

.workflow-visual {
  display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  justify-content:center; padding:28px; background:var(--bg-card);
  border:1px solid var(--border); border-radius:var(--radius-xl);
  margin-top:36px;
}
.wf-step { display:flex; flex-direction:column; align-items:center; gap:7px; text-align:center; flex:1; min-width:70px; }
.wf-icon { width:48px; height:48px; background:linear-gradient(135deg,rgba(37,99,235,0.1),rgba(67,120,230,0.1),rgba(124,58,237,0.08)); border:1px solid rgba(67,120,230,0.25); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:1.2rem; }
.wf-label { font-size:0.6875rem; font-weight:600; color:var(--text-muted); line-height:1.3; }
.wf-arrow { color:var(--accent); font-size:1.1rem; opacity:0.45; flex-shrink:0; }
.wf-caption { width:100%; text-align:center; font-size:0.8125rem; color:var(--text-muted); padding-top:8px; border-top:1px solid var(--border); margin-top:4px; }

/* CTA section */
.cta-section {
  background:var(--bg-surface); border-top:1px solid var(--border);
  padding:96px 0; text-align:center; position:relative; overflow:hidden;
}
.cta-section::before {
  content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:1000px; height:500px;
  background:radial-gradient(ellipse at center,
    rgba(37,99,235,0.08) 0%,
    rgba(124,58,237,0.05) 40%,
    transparent 70%);
  pointer-events:none;
}
.cta-section .container { position:relative; z-index:1; }
.cta-title { font-size:clamp(1.75rem,3.5vw,2.5rem); font-weight:700; letter-spacing:-0.025em; margin-bottom:16px; }
.cta-sub   { font-size:1.0625rem; color:var(--text-secondary); max-width:520px; margin:0 auto 36px; line-height:1.7; }

/* Footer */
.footer { background:var(--bg-surface); border-top:1px solid var(--border); padding:60px 0 32px; }
.footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:48px; }
.footer-brand .nav-logo { font-size:1.125rem; margin-bottom:14px; display:inline-flex; }
.footer-tagline { font-size:0.9375rem; color:var(--text-muted); line-height:1.7; max-width:300px; }
.footer-links-col h4 { font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted); margin-bottom:14px; }
.footer-links-col ul { display:flex; flex-direction:column; gap:9px; }
.footer-links-col a { font-size:0.9375rem; color:var(--text-secondary); transition:color var(--transition); }
.footer-links-col a:hover { color:var(--accent); }
.footer-contact a { font-variant-numeric: tabular-nums; }
.footer-bottom { border-top:1px solid var(--border); padding-top:24px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
.footer-bottom p { font-size:0.875rem; color:var(--text-muted); }

/* Bg helpers */
.bg-surface { background:var(--bg-surface); }
.bg-grid {
  background-image:linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px);
  background-size:56px 56px;
}

/* Animations */
@keyframes fadeInUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
.fade-up { animation:fadeInUp 0.6s ease forwards; }

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1024px) {
  .hero-inner       { grid-template-columns:1fr; gap:48px; }
  .pricing-layout   { grid-template-columns:1fr; }
  .book-layout      { grid-template-columns:1fr; }
  .book-side        { position:static; order:-1; }
  .demo-layout      { grid-template-columns:1fr; }
  .footer-grid      { grid-template-columns:repeat(3,1fr); gap:32px; }
  .footer-brand     { grid-column:1/-1; }
}
/* Desktop nav has too much content to fit below ~1200px — collapse to the
   hamburger before the bar overflows (keeps the prominent logo room). */
@media (max-width:1200px) {
  .nav-links, .nav-ctas { display:none; }
  .nav-toggle           { display:flex; }
}
@media (max-width:768px) {
  .nav-links, .nav-ctas { display:none; }
  .nav-toggle            { display:flex; }
  .card-grid-2, .card-grid-3, .card-grid-4 { grid-template-columns:1fr; }
  .form-grid-2 { grid-template-columns:1fr; }
  .hero { padding:60px 0 40px; }
  .section { padding:64px 0; }
  .flow-stage { grid-template-columns:52px 1fr; gap:18px; }
  .footer-grid { grid-template-columns:1fr; }
  .footer-bottom { flex-direction:column; text-align:center; }
  .workflow-visual { flex-wrap:wrap; }
  .wf-arrow { display:none; }
  .btn-group { flex-direction:column; align-items:flex-start; }
  .cred-inner { gap:18px; }
  .pain-grid { grid-template-columns:repeat(2,1fr); }
  .comparison-table th, .comparison-table td { padding:12px 14px; font-size:0.875rem; }
}
@media (max-width:480px) {
  .container { padding:0 16px; }
  .pricing-card { padding:28px 22px; }
  .book-form-card { padding:24px 18px; }
  .btn-group .btn { width:100%; }
  .pain-grid { grid-template-columns:1fr; }
}

/* ─────────────────────────────────────────────────────────────
   Missed-call revenue calculator
   ───────────────────────────────────────────────────────────── */
.calc-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: grid;
  grid-template-columns: 1.05fr 1fr;
}
.calc-inputs {
  padding: 36px 36px 32px;
  border-right: 1px solid var(--border);
}
.calc-output {
  padding: 36px;
  background:
    radial-gradient(120% 80% at 100% 0%, rgba(37,99,235,0.10), transparent 60%),
    linear-gradient(180deg, rgba(37,99,235,0.04), rgba(67,120,230,0.03));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  position: relative;
}
.calc-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.calc-eyebrow::before {
  content: "";
  width: 6px; height: 6px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent);
}
.calc-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}
.calc-sub {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 28px;
  line-height: 1.55;
}
.calc-fields { display:flex; flex-direction:column; gap: 26px; }
.calc-field { display:flex; flex-direction:column; gap: 10px; }
.calc-field-head {
  display:flex; align-items:baseline; justify-content:space-between; gap: 12px;
}
.calc-field-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}
.calc-field-value {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 1.0625rem;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 4px 10px;
  min-width: 86px;
  text-align: right;
}
.calc-field-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* Sliders */
.calc-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: transparent;
  cursor: pointer;
  padding: 8px 0;
  margin: 0;
}
.calc-slider::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--accent) 0%,
    var(--accent) var(--fill,40%),
    rgba(255,255,255,0.07) var(--fill,40%),
    rgba(255,255,255,0.07) 100%
  );
}
.calc-slider::-moz-range-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.07);
}
.calc-slider::-moz-range-progress {
  height: 6px;
  border-radius: 999px;
  background: var(--accent);
}
.calc-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--accent);
  margin-top: -7px;
  box-shadow: 0 2px 10px rgba(37,99,235,0.45), 0 0 0 4px rgba(37,99,235,0.10);
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.calc-slider::-moz-range-thumb {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--accent);
  box-shadow: 0 2px 10px rgba(37,99,235,0.45), 0 0 0 4px rgba(37,99,235,0.10);
}
.calc-slider:hover::-webkit-slider-thumb { transform: scale(1.08); }
.calc-slider:active::-webkit-slider-thumb {
  box-shadow: 0 2px 14px rgba(37,99,235,0.7), 0 0 0 6px rgba(37,99,235,0.15);
}

/* Output panel */
.calc-result-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.calc-result-big {
  font-size: clamp(2.6rem, 5.5vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, #ffffff 0%, #2563eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
  transition: filter 200ms ease;
}
.calc-result-big.pulse { animation: calcPulse 280ms ease; }
@keyframes calcPulse {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.4); }
  100% { filter: brightness(1); }
}
.calc-result-period {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
.calc-breakdown {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 22px;
}
.calc-breakdown-cell {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 12px 14px;
}
.calc-breakdown-period {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.calc-breakdown-value {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}
.calc-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
  margin-bottom: 22px;
}
.calc-meta-row {
  display: flex; justify-content: space-between; gap: 12px;
  font-size: 0.8125rem;
}
.calc-meta-label { color: var(--text-muted); }
.calc-meta-value { color: var(--text-secondary); font-weight: 600; font-variant-numeric: tabular-nums; }
.calc-cta { display:flex; flex-direction: column; gap: 8px; }
.calc-cta .btn { width: 100%; }
.calc-disclaimer {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-top: 4px;
}

@media (max-width: 880px) {
  .calc-card { grid-template-columns: 1fr; }
  .calc-inputs { border-right: none; border-bottom: 1px solid var(--border); padding: 28px 24px; }
  .calc-output { padding: 28px 24px; }
}

/* ─── Trade presets ─── */
.calc-presets {
  display: flex; flex-wrap: wrap; gap: 8px;
  margin-bottom: 24px;
}
.calc-presets-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  width: 100%;
  margin-bottom: -2px;
}
.calc-preset {
  appearance: none;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 7px 13px;
  border-radius: 999px;
  cursor: pointer;
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.calc-preset:hover {
  border-color: rgba(37,99,235,0.4);
  color: var(--text-primary);
  background: rgba(37,99,235,0.04);
}
.calc-preset[aria-pressed="true"] {
  background: rgba(37,99,235,0.12);
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 0 0 1px rgba(37,99,235,0.4) inset;
}
.calc-preset .ll-icon { width: 13px; height: 13px; }

/* ─── Calculator email-capture ─── */
.calc-email {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}
.calc-email-head {
  display: flex; align-items: center; gap: 9px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.calc-email-head .ll-icon {
  width: 16px; height: 16px;
  color: var(--accent);
}
.calc-email-sub {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin-bottom: 12px;
}
.calc-email-form {
  display: flex; gap: 8px;
  margin-bottom: 8px;
}
.calc-email-form input[type="email"] {
  flex: 1;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  font-size: 0.875rem;
  color: var(--text-primary);
  outline: none;
  transition: all var(--transition);
}
.calc-email-form input[type="email"]::placeholder { color: var(--text-muted); }
.calc-email-form input[type="email"]:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(37,99,235,0.10);
}
.calc-email-form input[type="email"].invalid {
  border-color: var(--error);
  box-shadow: 0 0 0 3px rgba(239,68,68,0.10);
}
.calc-email-form button {
  appearance: none;
  background: var(--accent);
  color: #050a15;
  border: none;
  border-radius: var(--radius-md);
  padding: 10px 18px;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition);
}
.calc-email-form button:hover { filter: brightness(1.1); box-shadow: 0 0 18px rgba(37,99,235,0.3); }
.calc-email-form button:disabled { opacity: 0.6; cursor: progress; }
.calc-email-disclaimer {
  font-size: 0.6875rem;
  color: var(--text-muted);
  line-height: 1.5;
}
.calc-email-success {
  display: none;
  margin-top: 18px;
  padding: 14px 16px;
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.3);
  border-radius: var(--radius-md);
  color: #15803d;
  font-size: 0.875rem;
  font-weight: 600;
  display: none;
  align-items: center;
  gap: 9px;
}
.calc-email-success.show { display: flex; }
.calc-email-success .ll-icon { width: 18px; height: 18px; flex-shrink: 0; }

/* ─────────────────────────────────────────────────────────────
   Sticky mobile CTA bar (injected by main.js)
   ───────────────────────────────────────────────────────────── */
.mobile-cta {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 180;
  display: none;
  align-items: center;
  gap: 10px;
  padding: 12px 14px calc(12px + env(safe-area-inset-bottom, 0px));
  background: rgba(10, 18, 34, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 -8px 28px rgba(0,0,0,0.45);
  transform: translateY(100%);
  transition: transform 280ms ease;
}
.mobile-cta.show { transform: translateY(0); }
.mobile-cta .mc-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: all var(--transition);
}
.mobile-cta .mc-btn-primary {
  background: var(--accent);
  color: #050a15;
  box-shadow: 0 4px 18px rgba(37,99,235,0.35);
}
.mobile-cta .mc-btn-primary:active { filter: brightness(0.95); }
.mobile-cta .mc-btn-secondary {
  flex: 0 0 auto;
  width: 48px;
  background: rgba(0,0,0,0.04);
  color: var(--accent);
  border: 1px solid var(--border);
}
.mobile-cta .mc-btn-secondary:hover { background: rgba(255,255,255,0.10); }
.mobile-cta .ll-icon { width: 18px; height: 18px; }
/* Only show on mobile */
@media (max-width: 768px) {
  .mobile-cta { display: flex; }
  /* Ensure footer + content has space so the bar doesn't cover content */
  body.has-mobile-cta .footer { padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px)); }
}

/* ─────────────────────────────────────────────────────────────
   "Early Client Access" emphasis (pricing page)
   ───────────────────────────────────────────────────────────── */

/* Animated red banner above the hero */
.early-access-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px;
  background: linear-gradient(90deg,
    rgba(239,68,68,0.10) 0%,
    rgba(239,68,68,0.18) 50%,
    rgba(239,68,68,0.10) 100%);
  border-bottom: 1px solid rgba(239,68,68,0.25);
  color: #fecaca;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.early-access-banner::before,
.early-access-banner::after {
  content: "";
  width: 8px; height: 8px;
  background: #ef4444;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(239,68,68,0.9);
  animation: navAlertPulse 1.6s ease-in-out infinite;
}
.early-access-banner strong { color: #ffffff; font-weight: 700; }

/* Big diagonal corner ribbon on the pricing card */
.pricing-card { position: relative; overflow: hidden; }
.pricing-ribbon {
  position: absolute;
  top: 22px; right: -56px;
  transform: rotate(35deg);
  background: linear-gradient(90deg, #ef4444, #b91c1c);
  color: #ffffff;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 7px 60px;
  box-shadow: 0 6px 18px rgba(239,68,68,0.35);
  z-index: 2;
  pointer-events: none;
}

/* Spots-remaining indicator */
.spots-card {
  margin-top: 18px;
  margin-bottom: 24px;
  padding: 16px 18px;
  background: rgba(239,68,68,0.06);
  border: 1px solid rgba(239,68,68,0.28);
  border-radius: var(--radius-md);
}
.spots-head {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fecaca;
  margin-bottom: 10px;
}
.spots-head::before {
  content: "";
  width: 7px; height: 7px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(239,68,68,0.9);
  animation: navAlertPulse 1.6s ease-in-out infinite;
}
.spots-row {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 8px;
  gap: 12px;
}
.spots-count {
  font-size: 1.125rem;
  font-weight: 800;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
}
.spots-count em { font-style: normal; color: var(--text-muted); font-weight: 600; }
.spots-meta {
  font-size: 0.75rem;
  color: var(--text-secondary);
}
.spots-bar {
  height: 6px;
  background: rgba(0,0,0,0.04);
  border-radius: 999px;
  overflow: hidden;
}
.spots-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444, #f59e0b);
  border-radius: 999px;
  box-shadow: 0 0 10px rgba(239,68,68,0.4);
}

/* Anchored price strikethrough */
.pricing-price-anchor {
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 4px;
  font-size: 0.875rem;
  color: var(--text-muted);
}
.pricing-price-anchor s { text-decoration-color: rgba(255,255,255,0.35); }
.pricing-price-anchor strong { color: var(--text-secondary); font-weight: 600; }

/* ─────────────────────────────────────────────────────────────
   Dashboard — v2 live leads table + AI sample
   ───────────────────────────────────────────────────────────── */
.leads-table {
  margin-top: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.leads-table-head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 9px 14px;
  background: rgba(0,0,0,0.02);
  border-bottom: 1px solid var(--border);
  font-size: 0.625rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}
.leads-table-head span:first-child { grid-column: 1 / 2; }
.leads-th-right { text-align: right; }

.leads-list { position: relative; }

.lead-row-v2 {
  display: grid;
  grid-template-columns: 34px minmax(0,1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 11px 14px;
  border-bottom: 1px solid var(--border);
  transition: background 200ms ease;
}
.lead-row-v2:last-child { border-bottom: none; }
.lead-row-v2:hover { background: rgba(0,0,0,0.02); }

.lead-body { min-width: 0; }
.lead-row-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.25;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.lead-row-meta {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.6875rem;
  color: var(--text-muted);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.lead-ch-icon {
  width: 11px; height: 11px;
  color: var(--accent);
  flex-shrink: 0;
  stroke-width: 2;
}

.lead-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  flex-shrink: 0;
}
.lead-response {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.625rem;
  font-weight: 700;
  color: #15803d;
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.22);
  border-radius: 999px;
  padding: 2px 7px;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.lead-response svg {
  width: 9px; height: 9px;
}

/* Slide-in entrance for fresh leads */
@keyframes leadSlideIn {
  from { opacity: 0; transform: translateY(-8px); max-height: 0; padding-top: 0; padding-bottom: 0; }
  to   { opacity: 1; transform: translateY(0);    max-height: 100px; padding-top: 11px; padding-bottom: 11px; }
}
.lead-row-v2.fresh {
  animation: leadSlideIn 380ms cubic-bezier(.22,.61,.36,1);
  background: rgba(37,99,235,0.06);
}
.lead-row-v2.fresh::before {
  content: "NEW";
  position: absolute;
  margin-left: -4px;
  margin-top: -22px;
  background: var(--accent);
  color: #050a15;
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 2px 6px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(37,99,235,0.5);
  animation: leadNewBadge 2.4s ease forwards;
}
@keyframes leadNewBadge {
  0%   { opacity: 0; transform: scale(0.6); }
  18%  { opacity: 1; transform: scale(1.06); }
  30%  { opacity: 1; transform: scale(1); }
  80%  { opacity: 1; }
  100% { opacity: 0; transform: scale(0.9) translateY(-2px); }
}

/* Stronger "Live" pulse */
.dash-live-dot {
  position: relative;
}
.dash-live-dot::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: var(--success);
  opacity: 0.4;
  animation: liveRipple 1.8s ease-out infinite;
}
@keyframes liveRipple {
  0%   { transform: scale(0.6); opacity: 0.55; }
  100% { transform: scale(2.4); opacity: 0; }
}

/* Count tick-up flash on the headline stat */
.dash-stat-num.tick {
  animation: countTick 320ms ease;
}
@keyframes countTick {
  0%   { transform: translateY(0); color: var(--text-primary); }
  40%  { transform: translateY(-3px); color: var(--accent); }
  100% { transform: translateY(0); color: var(--text-primary); }
}

/* AI response sample */
.ai-sample {
  margin-top: 14px;
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(37,99,235,0.05), rgba(67,120,230,0.03));
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-md);
}
.ai-sample-head {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 10px;
}
.ai-sample-avatar {
  width: 30px; height: 30px;
  display: inline-flex; align-items: center; justify-content: center;
  background: rgba(37,99,235,0.12);
  border: 1px solid rgba(37,99,235,0.3);
  border-radius: 8px;
  color: var(--accent);
}
.ai-sample-avatar svg { width: 16px; height: 16px; }
.ai-sample-meta {
  display: flex; flex-direction: column; gap: 1px;
  font-size: 0.6875rem;
  line-height: 1.3;
}
.ai-sample-meta strong { color: var(--text-primary); font-weight: 700; font-size: 0.75rem; }
.ai-sample-meta span { color: var(--text-muted); }
.ai-sample-bubble {
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  position: relative;
}
.ai-sample-bubble::before {
  content: "";
  position: absolute;
  top: -6px; left: 14px;
  width: 10px; height: 10px;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
  transform: rotate(45deg);
}

@media (max-width: 480px) {
  .lead-row-meta { font-size: 0.625rem; }
  .lead-response { font-size: 0.5625rem; padding: 2px 6px; }
  .ai-sample { padding: 12px 14px; }
  .ai-sample-bubble { font-size: 0.75rem; }
}

/* Demo page dashboard intro */
.demo-dash-intro {
  text-align: center;
  max-width: 640px;
  margin: 12px auto 28px;
}
.demo-dash-title {
  font-size: clamp(1.5rem, 3vw, 2.125rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin-bottom: 10px;
}
.demo-dash-sub {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ─────────────────────────────────────────────────────────────
   Home hero — phone notification cascade
   ───────────────────────────────────────────────────────────── */
.hero-phone-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  position: relative;
}
.hero-phone {
  width: 100%;
  max-width: 340px;
  background: linear-gradient(160deg, #ffffff 0%, #f4f8ff 100%);
  border: 1px solid rgba(148,163,184,0.22);
  border-radius: 48px;
  padding: 14px 12px 18px;
  box-shadow:
    /* Outer phone edge */
    0 0 0 6px #e8eef8,
    0 0 0 7px rgba(148,163,184,0.15),
    /* Soft drop */
    0 30px 80px rgba(15,23,42,0.14),
    /* Inner glow */
    0 0 0 1px rgba(37,99,235,0.06) inset;
  position: relative;
  overflow: hidden;
}
.hero-phone::before {
  /* Subtle screen sheen */
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 60% at 50% 0%, rgba(37,99,235,0.04), transparent 60%),
    linear-gradient(180deg, rgba(255,255,255,0.6), transparent 30%);
  pointer-events: none;
  border-radius: inherit;
}

/* Dynamic Island */
.hp-dynamic-island {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 102px;
  height: 30px;
  background: #07142F;
  border-radius: 100px;
  z-index: 5;
  box-shadow:
    inset 0 0 0 1px rgba(0,0,0,0.08),
    0 2px 8px rgba(0,0,0,0.18);
}
.hp-dynamic-island::after {
  /* Tiny camera dot */
  content: "";
  position: absolute;
  top: 50%; right: 12px;
  transform: translateY(-50%);
  width: 7px; height: 7px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #1a2540 0%, #07142F 70%);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
}

.hero-phone-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
}
.hp-time {
  font-variant-numeric: tabular-nums;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
  letter-spacing: -0.01em;
  /* Push slightly to leave room for Dynamic Island */
  padding-right: 60px;
}
.hp-icons {
  display: inline-flex; align-items: center; gap: 5px;
  color: var(--text-primary);
  padding-left: 60px;
}
.hp-i-signal  { width: 16px; height: 10px; }
.hp-i-wifi    { width: 15px; height: 11px; }
.hp-i-battery { width: 26px; height: 12px; }

.hero-phone-screen {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 4px;
  position: relative;
  z-index: 1;
}
.hp-section-label {
  color: #07142F;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  padding: 0 8px 4px;
}

/* Notification card */
.hp-notif {
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(148,163,184,0.18);
  box-shadow: 0 2px 8px rgba(15,23,42,0.06);
  display: grid;
  grid-template-columns: 38px 1fr auto;
  gap: 11px;
  align-items: center;
  background: rgba(0,0,0,0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 14px;
  padding: 11px 12px;
  position: relative;

  /* Initial state for the cascade animation */
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
  animation: hpNotifIn 14s ease-in-out infinite;
}
.hp-notif-icon {
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}
.hp-notif-icon svg { width: 19px; height: 19px; }
.hp-icon-missed { background: rgba(239,68,68,0.16); color: #dc2626; border: 1px solid rgba(239,68,68,0.35); }
.hp-icon-caught { background: rgba(37,99,235,0.10);  color: #2563eb; border: 1px solid rgba(37,99,235,0.25); }
.hp-icon-ai     { background: rgba(124,58,237,0.18); color: #7C3AED; border: 1px solid rgba(124,58,237,0.4); }
.hp-icon-booked { background: rgba(34,197,94,0.12);  color: #16a34a; border: 1px solid rgba(34,197,94,0.28); }

.hp-notif-body { min-width: 0; }
.hp-notif-head {
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 8px;
  margin-bottom: 1px;
}
.hp-notif-head strong {
  color: #07142F;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.005em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hp-notif-head span {
  font-size: 0.6875rem;
  color: var(--text-muted);
  flex-shrink: 0;
}
.hp-notif-text {
  font-size: 0.75rem;
  color: #334155;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.hp-notif-flag {
  position: absolute;
  top: -7px; right: 12px;
  background: var(--accent);
  color: #050a15;
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 2px 7px;
  border-radius: 6px;
  box-shadow: 0 4px 14px rgba(37,99,235,0.45);
}

/* iOS home indicator bar */
.hp-home-indicator {
  width: 110px;
  height: 4px;
  background: rgba(255,255,255,0.35);
  border-radius: 999px;
  margin: 18px auto 4px;
}

/* Stagger entrance per row.
   Animation is 14s and loops, with each notification appearing at a different
   offset so the cascade visually plays out then holds. */
.hp-notif-missed  { animation-delay: 0s;    }
.hp-notif-caught  { animation-delay: 0.9s;  }
.hp-notif-replied { animation-delay: 1.8s;  }
.hp-notif-booked  { animation-delay: 2.7s;  }

@keyframes hpNotifIn {
  /* Hidden before our slot */
  0%, 5%   { opacity: 0; transform: translateY(-10px) scale(0.96); }
  /* Pop in */
  7%       { opacity: 1; transform: translateY(0)    scale(1.02); }
  10%      { opacity: 1; transform: translateY(0)    scale(1);    }
  /* Hold visible */
  82%      { opacity: 1; transform: translateY(0)    scale(1);    }
  /* Fade out softly before loop */
  92%, 100%{ opacity: 0; transform: translateY(-6px) scale(0.97); }
}

/* The "missed call" notification mutes itself after the "caught" one arrives */
.hp-notif-missed { animation-name: hpNotifMissed; }
@keyframes hpNotifMissed {
  0%, 5%   { opacity: 0; transform: translateY(-10px) scale(0.96); filter: none; }
  7%       { opacity: 1; transform: translateY(0)    scale(1.02);  }
  10%      { opacity: 1; transform: translateY(0)    scale(1);     }
  18%      { opacity: 1; filter: none; }
  22%      { filter: grayscale(0.6) brightness(0.8); }
  82%      { opacity: 0.65; filter: grayscale(0.6) brightness(0.8); }
  92%, 100%{ opacity: 0; transform: translateY(-6px) scale(0.97);  }
}

/* Caption below the phone */
.hero-phone-caption {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hpc-line {
  display: flex; align-items: flex-start; gap: 9px;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--text-secondary);
}
.hpc-line strong { color: var(--text-primary); font-weight: 700; }
.hpc-dot {
  width: 7px; height: 7px;
  margin-top: 7px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 10px var(--accent);
  animation: pulse 2s infinite;
}
.hpc-money {
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(148,163,184,0.18);
  box-shadow: 0 2px 8px rgba(15,23,42,0.05);
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 12px;
  padding: 12px 14px;
  background: linear-gradient(135deg, rgba(37,99,235,0.06), rgba(34,197,94,0.04));
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-md);
}
.hpc-money-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}
.hpc-money-val {
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, #ffffff 0%, #2563eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: filter 200ms ease;
}
.hpc-money-val.tick { animation: countTick 320ms ease; }

@media (max-width: 980px) {
  .hero-phone-wrap { margin-top: 24px; }
}
@media (max-width: 480px) {
  .hero-phone { max-width: 300px; padding: 14px 12px 16px; border-radius: 44px; }
  .hp-dynamic-island { width: 92px; height: 26px; top: 9px; }
  .hp-notif { padding: 10px; gap: 10px; }
  .hp-notif-icon { width: 34px; height: 34px; }
  .hp-notif-icon svg { width: 17px; height: 17px; }
}
.urgency-banner {
  position: relative;
  z-index: 210;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 9px 44px 9px 20px;
  background: linear-gradient(90deg,
    rgba(239,68,68,0.18) 0%,
    rgba(239,68,68,0.10) 50%,
    rgba(239,68,68,0.18) 100%);
  border-bottom: 1px solid rgba(239,68,68,0.30);
  color: #fde2e2;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  flex-wrap: wrap;
}
.urgency-banner strong { color: #ffffff; font-weight: 700; margin-right: 4px; }
.urgency-banner .ub-dot {
  width: 8px; height: 8px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(239,68,68,0.9);
  animation: navAlertPulse 1.6s ease-in-out infinite;
  flex-shrink: 0;
}
.urgency-banner .ub-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  text-decoration: underline;
  text-decoration-color: rgba(255,255,255,0.4);
  text-underline-offset: 3px;
  font-weight: 700;
  white-space: nowrap;
  transition: all var(--transition);
}
.urgency-banner .ub-link:hover {
  text-decoration-color: #ffffff;
}
.urgency-banner .ub-link .ll-icon { width: 14px; height: 14px; }
.urgency-banner .ub-close {
  position: absolute;
  top: 50%; right: 10px;
  transform: translateY(-50%);
  width: 26px; height: 26px;
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent;
  color: rgba(255,255,255,0.55);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all var(--transition);
}
.urgency-banner .ub-close:hover {
  color: #ffffff;
  background: rgba(255,255,255,0.1);
}
.urgency-banner .ub-close svg { width: 14px; height: 14px; }
@media (max-width: 600px) {
  .urgency-banner { font-size: 0.75rem; padding: 8px 38px 8px 14px; gap: 9px; }
  .urgency-banner .ub-dot { width: 7px; height: 7px; }
}

/* ─────────────────────────────────────────────────────────────
   Mini calculator strip (home hero)
   ───────────────────────────────────────────────────────────── */
.mini-calc-section {
  padding: 36px 0;
  position: relative;
}
.mini-calc {
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(148,163,184,0.20);
  box-shadow: 0 4px 24px rgba(15,23,42,0.05), 0 20px 60px rgba(15,23,42,0.04);
  border-radius: var(--radius-xl);
  padding: 28px 32px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 32px;
  align-items: center;
  box-shadow: 0 12px 40px rgba(37,99,235,0.06);
  position: relative;
  overflow: hidden;
}
.mini-calc::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(80% 60% at 100% 0%, rgba(37,99,235,0.08), transparent 60%);
  pointer-events: none;
}
.mini-calc-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 8px;
}
.mini-calc-eyebrow::before {
  content: "";
  width: 6px; height: 6px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent);
}
.mini-calc-title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
}
.mini-calc-title .text-gradient { font-weight: 800; }
.mini-calc-fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  position: relative;
}
.mini-calc-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.mini-calc-field-head {
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 8px;
}
.mini-calc-field-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini-calc-field-value {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}
/* reuse .calc-slider styling */
.mini-calc-out {
  flex-shrink: 0;
  text-align: right;
  padding-left: 28px;
  border-left: 1px solid var(--border);
  position: relative;
}
.mini-calc-out-label {
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.mini-calc-out-big {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  background: linear-gradient(135deg, #ffffff 0%, #2563eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variant-numeric: tabular-nums;
  margin-bottom: 4px;
  transition: filter 200ms ease;
}
.mini-calc-out-big.pulse { animation: calcPulse 280ms ease; }
.mini-calc-out-sub {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 14px;
}
.mini-calc-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
}
.mini-calc-cta:hover { text-decoration: underline; text-underline-offset: 4px; }
.mini-calc-cta .ll-icon { width: 14px; height: 14px; }
@media (max-width: 900px) {
  .mini-calc { grid-template-columns: 1fr; padding: 24px 22px; gap: 20px; }
  .mini-calc-out { padding-left: 0; border-left: none; border-top: 1px solid var(--border); padding-top: 18px; text-align: left; }
  .mini-calc-fields { grid-template-columns: 1fr; gap: 14px; }
}

/* ─────────────────────────────────────────────────────────────
   "This week across pilot clients" stats strip
   ───────────────────────────────────────────────────────────── */
.live-stats {
  padding: 18px 0 26px;
}
.live-stats-inner {
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(148,163,184,0.18);
  box-shadow: 0 2px 8px rgba(15,23,42,0.04), 0 20px 60px rgba(15,23,42,0.04);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
}
.live-stats-head {
  display: flex; align-items: center; gap: 9px;
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 14px;
}
.live-stats-head::before {
  content: "";
  width: 7px; height: 7px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 10px var(--accent);
}
.live-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.live-stat { min-width: 0; }
.live-stat-num {
  font-size: clamp(1.5rem, 3.2vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1;
  background: linear-gradient(135deg, #ffffff 0%, #2563eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variant-numeric: tabular-nums;
  margin-bottom: 4px;
}
.live-stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
  font-weight: 500;
}
.live-stats-foot {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  font-size: 0.6875rem;
  color: var(--text-muted);
  line-height: 1.5;
}
@media (max-width: 720px) {
  .live-stats-row { grid-template-columns: 1fr 1fr; gap: 14px; }
}

/* ─────────────────────────────────────────────────────────────
   Slot picker (book-a-demo)
   ───────────────────────────────────────────────────────────── */
.slot-picker-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 28px 32px;
  margin-bottom: 24px;
}
.slot-picker-head {
  display: flex; align-items: baseline; justify-content: space-between;
  gap: 12px; flex-wrap: wrap;
  margin-bottom: 4px;
}
.slot-picker-title {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  display: inline-flex; align-items: center; gap: 9px;
}
.slot-picker-title .ll-icon { width: 18px; height: 18px; color: var(--accent); }
.slot-picker-eyebrow {
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
}
.slot-picker-sub {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 18px;
}
.slot-days {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 6px;
}
.slot-day {
  appearance: none;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 10px 6px 12px;
  color: var(--text-secondary);
  font: inherit;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition);
  min-width: 0;
}
.slot-day:hover {
  border-color: rgba(37,99,235,0.35);
  color: var(--text-primary);
  background: rgba(37,99,235,0.03);
}
.slot-day[aria-pressed="true"] {
  border-color: var(--accent);
  background: rgba(37,99,235,0.10);
  color: var(--text-primary);
  box-shadow: 0 0 0 1px rgba(37,99,235,0.45) inset, 0 0 18px rgba(37,99,235,0.15);
}
.slot-day-dow {
  display: block;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.slot-day-num {
  display: block;
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--text-primary);
}
.slot-day[aria-pressed="true"] .slot-day-num { color: var(--accent); }
.slot-day-mon {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-top: 2px;
}

.slot-times {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 16px;
}
.slot-time {
  appearance: none;
  background: var(--bg-surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  padding: 11px 14px;
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition);
  text-align: center;
}
.slot-time:hover {
  border-color: rgba(37,99,235,0.4);
  background: rgba(37,99,235,0.04);
}
.slot-time[aria-pressed="true"] {
  border-color: var(--accent);
  background: rgba(37,99,235,0.14);
  color: var(--accent);
  box-shadow: 0 0 18px rgba(37,99,235,0.18);
}
.slot-time-meta {
  display: block;
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-top: 2px;
}
.slot-time[aria-pressed="true"] .slot-time-meta { color: var(--accent); opacity: 0.75; }

.slot-empty {
  font-size: 0.875rem;
  color: var(--text-muted);
  padding: 14px 0 4px;
}
.slot-confirm {
  display: none;
  margin-top: 18px;
  padding: 12px 16px;
  background: rgba(37,99,235,0.06);
  border: 1px solid rgba(37,99,235,0.25);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-primary);
  align-items: center;
  gap: 9px;
}
.slot-confirm.show { display: flex; }
.slot-confirm .ll-icon { width: 16px; height: 16px; color: var(--accent); flex-shrink: 0; }
.slot-confirm strong { color: var(--accent); font-weight: 700; }

@media (max-width: 600px) {
  .slot-picker-card { padding: 22px 18px; }
  .slot-days { grid-template-columns: repeat(5, 1fr); gap: 6px; }
  .slot-day { padding: 8px 4px 10px; }
  .slot-day-num { font-size: 1.125rem; }
}

/* ─────────────────────────────────────────────────────────────
   Risk-reversal callout (pricing)
   ───────────────────────────────────────────────────────────── */
.risk-reversal {
  display: flex; align-items: flex-start; gap: 14px;
  margin-top: 22px;
  padding: 16px 18px;
  background: rgba(34,197,94,0.06);
  border: 1px solid rgba(34,197,94,0.28);
  border-radius: var(--radius-md);
}
.risk-reversal-icon {
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  border-radius: 10px;
  background: rgba(34,197,94,0.12);
  border: 1px solid rgba(34,197,94,0.3);
  color: #16a34a;
}
.risk-reversal-icon .ll-icon { width: 20px; height: 20px; }
.risk-reversal-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.55;
}
.risk-reversal-text strong {
  color: #15803d;
  font-weight: 700;
  display: block;
  margin-bottom: 2px;
  font-size: 0.9375rem;
}

/* ─────────────────────────────────────────────────────────────
   Calendar embed card (book-a-demo)
   ───────────────────────────────────────────────────────────── */
.calendar-embed-card {
  background: linear-gradient(135deg, rgba(37,99,235,0.04), rgba(67,120,230,0.03));
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-xl);
  padding: 28px 28px 18px;
  margin-bottom: 28px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.06);
}
.calendar-embed-head { margin-bottom: 18px; }
.calendar-embed-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 8px;
}
.calendar-embed-eyebrow .ll-icon { width: 14px; height: 14px; }
.calendar-embed-title {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
}
.calendar-embed-sub {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 4px;
}
.calendar-embed-frame {
  margin-top: 16px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  background: #ffffff;
}
.calendar-embed-fallback {
  margin-top: 12px;
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-align: center;
}
.calendar-embed-fallback a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 600;
}
.calendar-embed-fallback a:hover { color: #ffffff; }

/* ─────────────────────────────────────────────────────────────
   Legal pages — long-form prose
   ───────────────────────────────────────────────────────────── */
.legal-wrap {
  max-width: 760px;
  margin: 0 auto;
}
.legal-wrap h1 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 8px;
}
.legal-meta {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin-bottom: 32px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}
.legal-wrap h2 {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-top: 32px;
  margin-bottom: 10px;
}
.legal-wrap h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 22px;
  margin-bottom: 6px;
}
.legal-wrap p,
.legal-wrap li {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-secondary);
}
.legal-wrap p { margin-bottom: 14px; }
.legal-wrap ul, .legal-wrap ol {
  padding-left: 22px;
  margin-bottom: 14px;
}
.legal-wrap li { margin-bottom: 6px; }
.legal-wrap strong { color: var(--text-primary); font-weight: 700; }
.legal-wrap a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.legal-wrap a:hover { color: #ffffff; }
.legal-wrap .legal-callout {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  margin: 18px 0;
}
.legal-wrap .legal-callout p:last-child { margin-bottom: 0; }

/* ─────────────────────────────────────────────────────────────
   Cookie consent banner (injected by main.js)
   ───────────────────────────────────────────────────────────── */
.cookie-bar {
  position: fixed;
  left: 16px; right: 16px;
  bottom: 16px;
  z-index: 190;
  max-width: 560px;
  margin: 0 auto;
  display: none;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: rgba(15, 26, 48, 0.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 38px rgba(0,0,0,0.55);
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.55;
}
.cookie-bar.show { display: flex; }
.cookie-bar a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 600;
}
.cookie-bar a:hover { color: #ffffff; }
.cookie-bar button {
  appearance: none;
  background: var(--accent);
  color: #050a15;
  border: none;
  border-radius: var(--radius-sm);
  padding: 8px 14px;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: filter var(--transition);
}
.cookie-bar button:hover { filter: brightness(1.1); }
@media (max-width: 560px) {
  .cookie-bar { flex-direction: column; align-items: stretch; gap: 10px; text-align: left; }
  .cookie-bar button { width: 100%; }
  /* Lift sticky mobile CTA above the cookie bar by default if both visible */
  body.has-mobile-cta .cookie-bar { bottom: 84px; }
}

/* "or" divider between calendar and form */
.or-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 8px 0 22px;
  color: var(--text-muted);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.or-divider::before,
.or-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

@media (max-width: 600px) {
  .calendar-embed-card { padding: 22px 16px 14px; }
  .calendar-embed-frame iframe { height: 620px; }
}

/* ─────────────────────────────────────────────────────────────
   Red-highlighted nav link (attention button)
   ───────────────────────────────────────────────────────────── */
.nav-link-alert {
  position: relative;
  display: inline-flex !important;
  align-items: center;
  gap: 7px;
  padding: 6px 12px 6px 11px !important;
  color: #fecaca !important;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.35);
  border-radius: 999px;
  font-weight: 600 !important;
  box-shadow: 0 0 0 0 rgba(239,68,68,0.4);
  transition: all var(--transition);
}
.nav-link-alert:hover {
  color: #ffffff !important;
  background: rgba(239,68,68,0.18);
  border-color: rgba(239,68,68,0.6);
  box-shadow: 0 0 16px rgba(239,68,68,0.25);
}
.nav-link-alert::before {
  content: "";
  width: 7px; height: 7px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(239,68,68,0.9);
  animation: navAlertPulse 1.8s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes navAlertPulse {
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%      { opacity: 0.45; transform: scale(0.85); }
}

/* Mobile variant — full-width red panel */
.nav-mobile-links a.nav-link-alert {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.35);
  color: #fecaca !important;
}
.nav-mobile-links a.nav-link-alert:hover {
  background: rgba(239,68,68,0.18);
  color: #ffffff !important;
}

/* ─────────────────────────────────────────────────────────────
   Inline SVG icon system (replaces emoji throughout)
   ───────────────────────────────────────────────────────────── */
.ll-icon {
  display: inline-block;
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: middle;
}
/* Tint icons in branded containers cyan */
.card-icon .ll-icon,
.benefit-icon .ll-icon,
.wf-icon .ll-icon {
  width: 24px; height: 24px;
  color: var(--accent);
}
.contact-icon .ll-icon { width: 14px; height: 14px; color: var(--accent); }

/* Pain cards: replace .pain-emoji block layout */
.pain-icon {
  width: 36px; height: 36px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  border-radius: 10px;
  background: rgba(37,99,235,0.06);
  border: 1px solid rgba(37,99,235,0.18);
  transition: all 250ms ease;
}
.pain-icon .ll-icon { width: 20px; height: 20px; }
.pain-card:hover .pain-icon {
  color: #ef4444;
  background: rgba(239,68,68,0.08);
  border-color: rgba(239,68,68,0.35);
}

/* ─────────────────────────────────────────────────────────────
   Process flow — 4 step end-to-end widgets (demo page)
   ───────────────────────────────────────────────────────────── */
.process-flow-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  position: relative;
}
@media (max-width: 1100px) { .process-flow-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
@media (max-width: 620px)  { .process-flow-grid { grid-template-columns: 1fr; gap: 22px; } }

.pf-step {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 22px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.pf-step:hover {
  transform: translateY(-3px);
  border-color: var(--border-accent);
  box-shadow: 0 18px 40px rgba(37,99,235,0.08);
}
.pf-step-head { display: flex; gap: 14px; align-items: flex-start; }
.pf-num {
  flex-shrink: 0;
  width: 36px; height: 36px;
  border-radius: 10px;
  display: inline-flex; align-items: center; justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #2563eb, #4f8ef7);
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(37,99,235,0.28);
}
.pf-title {
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 2px 0 4px;
  color: var(--text-primary);
}
.pf-sub {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Shared widget shell */
.pf-widget {
  margin-top: auto;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px;
  min-height: 230px;
  position: relative;
  overflow: hidden;
}

/* Step 1 — Call widget */
.pfw-call-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.pfw-call-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.pfw-call-avatar::after {
  content: ""; position: absolute; inset: -6px;
  border-radius: 50%;
  border: 2px solid rgba(37,99,235,0.35);
  animation: pfPulse 1.8s ease-out infinite;
}
@keyframes pfPulse { 0%{transform:scale(.85);opacity:.9} 100%{transform:scale(1.35);opacity:0} }
.pfw-call-avatar img { width: 18px; height: 18px; }
.pfw-call-meta { min-width: 0; }
.pfw-call-meta strong { display: block; font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); }
.pfw-call-meta span   { font-size: 0.7rem; color: #15803d; display: inline-flex; align-items: center; gap: 5px; }
.pfw-call-meta span::before { content:""; width:6px; height:6px; border-radius:50%; background:#22c55e; box-shadow:0 0 8px #22c55e; }
.pfw-wave { display: flex; align-items: center; gap: 3px; height: 22px; margin-bottom: 12px; }
.pfw-wave span {
  width: 3px; background: linear-gradient(180deg, #2563eb, #4f8ef7);
  border-radius: 2px;
  animation: pfWave 1.2s ease-in-out infinite;
}
.pfw-wave span:nth-child(1){height:30%;animation-delay:0s}
.pfw-wave span:nth-child(2){height:65%;animation-delay:.1s}
.pfw-wave span:nth-child(3){height:90%;animation-delay:.2s}
.pfw-wave span:nth-child(4){height:50%;animation-delay:.3s}
.pfw-wave span:nth-child(5){height:75%;animation-delay:.4s}
.pfw-wave span:nth-child(6){height:35%;animation-delay:.5s}
.pfw-wave span:nth-child(7){height:60%;animation-delay:.6s}
.pfw-wave span:nth-child(8){height:85%;animation-delay:.7s}
.pfw-wave span:nth-child(9){height:45%;animation-delay:.8s}
.pfw-wave span:nth-child(10){height:70%;animation-delay:.9s}
.pfw-wave span:nth-child(11){height:30%;animation-delay:1s}
.pfw-wave span:nth-child(12){height:55%;animation-delay:1.1s}
@keyframes pfWave { 0%,100%{transform:scaleY(.45)} 50%{transform:scaleY(1)} }
.pfw-bubble {
  font-size: 0.74rem;
  line-height: 1.45;
  padding: 8px 10px;
  border-radius: 10px;
  margin-bottom: 6px;
  max-width: 92%;
}
.pfw-bubble.ai {
  background: rgba(37,99,235,0.10);
  border: 1px solid rgba(37,99,235,0.25);
  color: #c8f6fd;
}
.pfw-bubble.cust {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  margin-left: auto;
}

/* Step 2 — Dashboard widget */
.pfw-dash-bar {
  display: flex; align-items: center; gap: 6px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 12px;
}
.pfw-dash-bar i { width:7px; height:7px; border-radius:50%; display:inline-block; }
.pfw-dash-bar i:nth-child(1){background:#ef4444}
.pfw-dash-bar i:nth-child(2){background:#f59e0b}
.pfw-dash-bar i:nth-child(3){background:#22c55e}
.pfw-dash-bar span { font-size: 0.68rem; color: var(--text-muted); margin-left: 6px; }
.pfw-dash-stat {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 12px;
}
.pfw-dash-stat .pfw-num-big {
  font-size: 1.6rem; font-weight: 800;
  background: var(--grad-primary);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.pfw-dash-stat small { font-size: 0.68rem; color: var(--text-muted); display: block; }
.pfw-dash-tag {
  font-size: 0.65rem;
  padding: 3px 8px;
  border-radius: 100px;
  background: rgba(34,197,94,0.15);
  color: #15803d;
  border: 1px solid rgba(34,197,94,0.3);
  font-weight: 600;
}
.pfw-lead-row {
  display: grid;
  grid-template-columns: 26px 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 6px;
  font-size: 0.72rem;
}
.pfw-lead-row.fresh {
  border-color: rgba(37,99,235,0.5);
  background: linear-gradient(90deg, rgba(37,99,235,0.10), rgba(37,99,235,0.02));
  animation: pfRowIn .6s ease-out;
}
@keyframes pfRowIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
.pfw-lead-row .pfw-av {
  width: 26px; height: 26px; border-radius: 50%;
  background: linear-gradient(135deg, #4f8ef7, #7c3aed);
  color: #fff; font-weight: 700; font-size: 0.65rem;
  display: flex; align-items: center; justify-content: center;
}
.pfw-lead-row b { font-weight: 700; display: block; color: var(--text-primary); font-size: 0.74rem; }
.pfw-lead-row em { font-style: normal; color: var(--text-muted); font-size: 0.66rem; }
.pfw-lead-row .pfw-pill {
  font-size: 0.6rem; padding: 2px 7px; border-radius: 100px;
  background: rgba(37,99,235,0.18); color: #2563eb; border: 1px solid rgba(37,99,235,0.35);
  font-weight: 600;
}

/* Steps 3 & 4 — Mini phone */
.pfw-phone {
  width: 168px;
  margin: 0 auto;
  background: #0a0f1c;
  border: 6px solid #1a2233;
  border-radius: 26px;
  padding: 8px 8px 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.03);
  position: relative;
}
.pfw-phone::before {
  content: ""; position: absolute; top: 6px; left: 50%; transform: translateX(-50%);
  width: 48px; height: 14px; background: #000; border-radius: 100px;
}
.pfw-phone-time {
  text-align: center;
  font-size: 0.62rem; color: var(--text-muted);
  margin: 18px 0 10px;
  font-variant-numeric: tabular-nums;
}

.pfw-notif {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  background: rgba(28, 33, 47, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 6px;
  animation: pfNotifIn .6s ease-out both;
}
.pfw-notif:nth-of-type(2) { animation-delay: .8s; }
@keyframes pfNotifIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: none; }
}
.pfw-notif-ic {
  width: 24px; height: 24px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 700;
}
.pfw-notif-ic.sms   { background: #22c55e; color: #fff; }
.pfw-notif-ic.gmail { background: #fff; color: #ea4335; }
.pfw-notif-head {
  display: flex; justify-content: space-between; align-items: baseline; gap: 6px;
  margin-bottom: 2px;
}
.pfw-notif-head strong { font-size: 0.7rem; font-weight: 700; color: #fff; }
.pfw-notif-head time   { font-size: 0.58rem; color: var(--text-muted); }
.pfw-notif-text {
  font-size: 0.65rem; line-height: 1.4;
  color: rgba(255,255,255,0.7);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Customer SMS chat */
.pfw-chat-head {
  text-align: center;
  padding: 6px 0 10px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  margin-bottom: 10px;
}
.pfw-chat-head .pfw-chat-av {
  width: 30px; height: 30px; border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #4f8ef7);
  margin: 0 auto 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; font-weight: 700; color: #ffffff;
}
.pfw-chat-head span { font-size: 0.62rem; color: var(--text-muted); }
.pfw-chat-bubble {
  font-size: 0.66rem;
  line-height: 1.4;
  padding: 7px 10px;
  border-radius: 14px;
  margin-bottom: 5px;
  max-width: 86%;
  word-wrap: break-word;
}
.pfw-chat-bubble.them {
  background: rgba(0,0,0,0.05);
  color: rgba(255,255,255,0.85);
  border-bottom-left-radius: 4px;
}
.pfw-chat-bubble.me {
  background: linear-gradient(135deg, #4f8ef7, #2563eb);
  color: #ffffff;
  font-weight: 600;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}
.pfw-chat-bubble.me .pfw-check { font-weight: 800; margin-right: 3px; }

/* ─────────────────────────────────────────────────────────────
   Speed wins — side-by-side outcome comparison (demo page)
   ───────────────────────────────────────────────────────────── */
.speed-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}
@media (max-width: 880px) { .speed-compare { grid-template-columns: 1fr; gap: 20px; } }

.speed-col {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 28px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.speed-col-bad  { border-color: rgba(239,68,68,0.30); }
.speed-col-good {
  border-color: rgba(37,99,235,0.35);
  box-shadow: 0 20px 50px rgba(37,99,235,0.08);
}

.speed-col-head { margin-bottom: 22px; }
.speed-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 100px;
  letter-spacing: 0.02em;
  margin-bottom: 10px;
}
.speed-tag.bad  { color: #dc2626; background: rgba(239,68,68,0.10); border: 1px solid rgba(239,68,68,0.35); }
.speed-tag.good { color: #2563eb; background: rgba(37,99,235,0.10); border: 1px solid rgba(37,99,235,0.35); }
.speed-col-title { font-size: 1.25rem; font-weight: 800; margin: 0 0 4px; color: var(--text-primary); }
.speed-col-sub   { font-size: 0.85rem; color: var(--text-muted); margin: 0; }

.speed-timeline {
  list-style: none;
  margin: 0 0 4px;
  padding: 0 0 0 22px;
  position: relative;
  border-left: 2px dashed var(--border);
}
.speed-col-bad  .speed-timeline { border-color: rgba(239,68,68,0.28); }
.speed-col-good .speed-timeline { border-color: rgba(37,99,235,0.32); }

.speed-step {
  position: relative;
  margin-bottom: 20px;
  padding-left: 6px;
}
.speed-step:last-child { margin-bottom: 8px; }
.speed-step::before {
  content: "";
  position: absolute;
  left: -29px; top: 6px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--text-muted);
}
.speed-col-bad  .speed-step::before { border-color: #ef4444; }
.speed-col-good .speed-step::before {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37,99,235,0.10);
}
.speed-step time {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 4px;
  font-variant-numeric: tabular-nums;
}
.speed-step h4 {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--text-primary);
}
.speed-step p {
  font-size: 0.83rem;
  line-height: 1.55;
  color: var(--text-secondary);
  margin: 0;
}
.speed-step.bad-end h4  { color: #dc2626; }
.speed-step.good-end h4 { color: #2563eb; }

.speed-outcome {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}
.speed-outcome.bad  { background: rgba(239,68,68,0.06); border-color: rgba(239,68,68,0.30); }
.speed-outcome.good { background: rgba(37,99,235,0.06); border-color: rgba(37,99,235,0.35); }
.speed-outcome > span {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 1rem;
  flex-shrink: 0;
}
.speed-outcome.bad  > span { background: rgba(239,68,68,0.18); color: #dc2626; }
.speed-outcome.good > span { background: rgba(37,99,235,0.18); color: #2563eb; }
.speed-outcome strong { display: block; font-size: 0.95rem; font-weight: 700; margin-bottom: 2px; color: var(--text-primary); }
.speed-outcome p { font-size: 0.78rem; color: var(--text-muted); margin: 0; line-height: 1.4; }

.speed-tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 700px) { .speed-tiles { grid-template-columns: 1fr; } }
.speed-tile {
  text-align: center;
  padding: 22px 18px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.speed-tile-num {
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  font-weight: 850;
  background: var(--grad-primary);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.speed-tile-label { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45; }

/* ═══════════════════════════════════════════════════════════════
   AI WORKFORCE REPOSITION — new sections
   ═══════════════════════════════════════════════════════════════ */

/* ── Meet Your AI Office Team ── */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
@media (max-width: 980px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .team-grid { grid-template-columns: 1fr; } }

.team-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 26px 24px 24px;
  display: flex;
  flex-direction: column;
  transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.team-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-accent);
  box-shadow: 0 22px 50px rgba(37,99,235,0.10);
}
.team-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.team-card-icon {
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.team-card-icon svg { width: 16px; height: 16px; }
.tc-cyan   { background: rgba(37,99,235,0.12);  color: #2563eb; border: 1px solid rgba(37,99,235,0.30); }
.tc-blue   { background: rgba(67,120,230,0.12); color: #4f8ef7; border: 1px solid rgba(67,120,230,0.30); }
.tc-green  { background: rgba(34,197,94,0.12);  color: #22c55e; border: 1px solid rgba(34,197,94,0.30); }
.tc-purple { background: rgba(124,58,237,0.14); color: #a78bfa; border: 1px solid rgba(124,58,237,0.32); }
.team-role-badge {
  font-size: 0.70rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 4px 10px;
  border-radius: 100px;
  margin-left: auto;
}
.team-role-badge.tc-cyan   { background: rgba(37,99,235,0.10);  color: #0891b2; border: 1px solid rgba(37,99,235,0.28); }
.team-role-badge.tc-blue   { background: rgba(67,120,230,0.10); color: #2563EB; border: 1px solid rgba(67,120,230,0.28); }
.team-role-badge.tc-green  { background: rgba(34,197,94,0.10);  color: #15803d; border: 1px solid rgba(34,197,94,0.28); }
.team-role-badge.tc-purple { background: rgba(124,58,237,0.12); color: #7C3AED; border: 1px solid rgba(124,58,237,0.30); }
.team-card-title {
  font-size: 1.08rem;
  font-weight: 750;
  line-height: 1.35;
  margin-bottom: 10px;
  color: var(--text-primary);
}
.team-card-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 18px;
  flex-grow: 1;
}
.team-card-tasks {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.team-card-tasks span {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 100px;
}
.team-cta {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-top: 44px;
  flex-wrap: wrap;
}

/* ── What can we automate? ── */
.automate-wrap {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 820px) { .automate-wrap { grid-template-columns: 1fr; } }
.automate-tabs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
@media (max-width: 820px) {
  .automate-tabs { flex-direction: row; flex-wrap: wrap; }
}
.automate-tab {
  text-align: left;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 15px 18px;
  cursor: pointer;
  transition: all .2s ease;
  position: relative;
}
.automate-tab:hover { color: var(--text-primary); border-color: var(--border-accent); }
.automate-tab.active {
  color: var(--text-primary);
  background: linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.08));
  border-color: rgba(37,99,235,0.40);
  box-shadow: 0 8px 24px rgba(37,99,235,0.10);
}
.automate-tab.active::before {
  content: "";
  position: absolute;
  left: 0; top: 50%; transform: translateY(-50%);
  width: 3px; height: 60%;
  background: var(--grad-primary);
  border-radius: 0 3px 3px 0;
}
.automate-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  min-height: 280px;
}
.automate-panel-inner { animation: autoFade .35s ease; }
@keyframes autoFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.automate-panel-lead {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 24px;
  max-width: 640px;
}
.automate-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (max-width: 520px) { .automate-items { grid-template-columns: 1fr; } }
.automate-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: var(--text-secondary);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 13px 16px;
}
.automate-check {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: rgba(37,99,235,0.14);
  color: #2563eb;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.automate-check svg { width: 13px; height: 13px; }
.automate-note {
  text-align: center;
  margin-top: 28px;
  font-size: 0.92rem;
  color: var(--text-muted);
}
.automate-note a { color: var(--accent); text-decoration: none; font-weight: 600; }
.automate-note a:hover { text-decoration: underline; }

/* ── The LeadaLine Engine ── */
.engine-flow {
  display: grid;
  grid-template-columns: 1fr auto 1.15fr auto 1fr;
  gap: 16px;
  align-items: stretch;
}
@media (max-width: 920px) {
  .engine-flow { grid-template-columns: 1fr; gap: 12px; }
  .engine-arr { transform: rotate(90deg); margin: 4px auto; }
}
.engine-col {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px 18px;
}
.engine-col-mid {
  background: linear-gradient(160deg, rgba(37,99,235,0.07), rgba(124,58,237,0.05));
  border-color: rgba(37,99,235,0.30);
  box-shadow: 0 18px 50px rgba(37,99,235,0.08);
}
.engine-col-head {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 16px;
  text-align: center;
}
.engine-col-head.accent { color: #2563eb; }
.engine-nodes { display: flex; flex-direction: column; gap: 9px; }
.engine-node {
  font-size: 0.88rem;
  color: var(--text-secondary);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 11px 14px;
}
.engine-node-team {
  font-size: 0.9rem;
  font-weight: 650;
  color: var(--text-primary);
  background: rgba(15,26,48,0.85);
  border: 1px solid rgba(37,99,235,0.22);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  position: relative;
  padding-left: 30px;
}
.engine-node-team::before {
  content: "";
  position: absolute;
  left: 13px; top: 50%; transform: translateY(-50%);
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--grad-primary);
  box-shadow: 0 0 8px rgba(37,99,235,0.6);
}
.engine-arr {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(37,99,235,0.55);
  gap: 0;
}
.engine-arr-line {
  width: 18px; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(37,99,235,0.5));
}
.engine-arr-head { width: 12px; height: 20px; margin-left: -2px; }

/* ── Implementation process ── */
.impl-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 900px) { .impl-steps { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .impl-steps { grid-template-columns: 1fr; } }
.impl-step {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 26px 24px;
  position: relative;
  transition: transform .25s ease, border-color .25s ease;
}
.impl-step:hover { transform: translateY(-3px); border-color: var(--border-accent); }
.impl-step-num {
  width: 42px; height: 42px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.15rem; font-weight: 800;
  color: #ffffff;
  background: var(--grad-primary);
  box-shadow: 0 8px 20px rgba(37,99,235,0.25);
  margin-bottom: 16px;
}
.impl-step-title {
  font-size: 1.12rem;
  font-weight: 750;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.impl-step-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* Hero notif flag tweak for QUALIFIED label width */
.hp-notif-flag { white-space: nowrap; }

/* ─────────────────────────────────────────────────────────────
   Beyond the call — comparison section
   ───────────────────────────────────────────────────────────── */
.beyond-grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 860px) { .beyond-grid { grid-template-columns: 1fr; } }

.beyond-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 26px 24px;
}
.beyond-card-them { border-color: rgba(239,68,68,0.25); }
.beyond-card-us   { border-color: rgba(37,99,235,0.30); box-shadow: 0 16px 40px rgba(37,99,235,0.07); }

.beyond-tag {
  display: inline-block;
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.03em;
  padding: 4px 10px; border-radius: 100px;
  background: rgba(239,68,68,0.10); color: #dc2626;
  border: 1px solid rgba(239,68,68,0.30);
  margin-bottom: 18px;
}
.beyond-tag.accent {
  background: rgba(37,99,235,0.10); color: #2563eb;
  border-color: rgba(37,99,235,0.30);
}

/* "Typical AI voice tools" mock screen */
.beyond-them-screen {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.beyond-them-call { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.beyond-them-icon { width: 36px; height: 36px; color: #ef4444; }
.beyond-them-call strong { font-size: 0.9rem; color: var(--text-primary); }
.beyond-them-call span   { font-size: 0.8rem; color: var(--text-muted); }

/* Feature rows inside LeadaLine card */
.beyond-us-features { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }

.beyond-feat {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px 16px;
}
.beyond-feat-head {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 10px;
}
.beyond-feat-icon {
  width: 30px; height: 30px; flex-shrink: 0;
  border-radius: 8px;
  background: rgba(37,99,235,0.10);
  color: #2563eb;
  border: 1px solid rgba(37,99,235,0.25);
  display: flex; align-items: center; justify-content: center;
}
.beyond-feat-icon svg { width: 15px; height: 15px; }
.beyond-feat-head strong { font-size: 0.88rem; font-weight: 700; color: var(--text-primary); display: block; }
.beyond-feat-head span   { font-size: 0.76rem; color: var(--text-muted); }

/* Pipeline bar */
.beyond-pipe {
  display: flex; height: 8px; border-radius: 100px;
  overflow: hidden; gap: 2px; margin-bottom: 8px;
}
.bpipe-seg { border-radius: 100px; min-width: 4px; }
.bpipe-seg.new  { background: #2563eb; }
.bpipe-seg.cont { background: #4f8ef7; }
.bpipe-seg.quot { background: #7c3aed; }
.bpipe-seg.book { background: #22c55e; }
.beyond-pipe-legend {
  display: flex; flex-wrap: wrap; gap: 8px 14px;
  font-size: 0.7rem; color: var(--text-muted);
}
.bpipe-dot {
  display: inline-block; width: 7px; height: 7px;
  border-radius: 50%; margin-right: 4px;
}
.bpipe-dot.new  { background: #2563eb; }
.bpipe-dot.cont { background: #4f8ef7; }
.bpipe-dot.quot { background: #7c3aed; }
.bpipe-dot.book { background: #22c55e; }

/* Auto follow-up SMS preview */
.beyond-sms {
  background: var(--bg-card);
  border: 1px solid rgba(37,99,235,0.20);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--text-secondary);
}
.beyond-sms-meta { font-size: 0.68rem; color: var(--text-muted); margin-bottom: 5px; font-weight: 600; }

/* Performance report row */
.beyond-report {
  display: flex; gap: 6px;
}
.beyond-report > div {
  flex: 1; text-align: center;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 4px;
}
.beyond-report b { display: block; font-size: 1.1rem; font-weight: 800; background: var(--grad-primary); -webkit-background-clip: text; background-clip: text; color: transparent; }
.beyond-report span { font-size: 0.65rem; color: var(--text-muted); }

/* Beyond lists */
.beyond-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 8px;
}
.beyond-list li {
  font-size: 0.88rem; color: var(--text-secondary);
  padding-left: 18px; position: relative; line-height: 1.5;
}
.beyond-list li::before {
  content: "✓"; position: absolute; left: 0;
  color: #2563eb; font-weight: 700; font-size: 0.8rem;
}
.beyond-list.dim li::before { content: "–"; color: var(--text-muted); }
.beyond-list.dim li { color: var(--text-muted); }


/* ================================================================
   LIGHT THEME — DEFINITIVE OVERRIDE
   Appended last so these rules win the cascade unconditionally.
   Do not remove — this is the live design system.
   ================================================================ */

/* ── 1. Tokens ──────────────────────────────────────────────── */
:root {
  --bg-primary:    #F8FBFF;
  --bg-surface:    #F3F7FF;
  --bg-card:       #FFFFFF;
  --bg-card-hover: #F5F9FF;
  --border:        rgba(148,163,184,0.22);
  --border-accent: rgba(37,99,235,0.34);
  --accent:        #2563EB;
  --accent-cyan:   #18D7FF;
  --accent-violet: #7C5CFF;
  --accent-purple: #7C5CFF;
  --accent-blue:   #1D4ED8;
  --accent-glow:   rgba(37,99,235,0.08);
  --accent-dark:   rgba(37,99,235,0.05);
  --text-primary:  #07142F;
  --text-secondary:#334155;
  --text-muted:    #64748B;
  --grad-primary:  linear-gradient(135deg, #18D7FF 0%, #2563EB 48%, #7C5CFF 100%);
  --shadow-sm:     0 2px 8px rgba(15,23,42,0.05);
  --shadow-card:   0 2px 8px rgba(15,23,42,0.05), 0 18px 50px rgba(15,23,42,0.07);
  --shadow-md:     0 18px 50px rgba(15,23,42,0.08);
  --shadow-lg:     0 28px 90px rgba(15,23,42,0.10);
}

/* ── 2. Base ─────────────────────────────────────────────────── */
html, body {
  background: #F8FBFF !important;
  color: #07142F !important;
}

body::before {
  background:
    radial-gradient(ellipse 65% 55% at 90% 0%,  rgba(24,215,255,0.10) 0%, transparent 58%),
    radial-gradient(ellipse 55% 45% at 8%  90%, rgba(124,92,255,0.09) 0%, transparent 58%),
    radial-gradient(ellipse 45% 40% at 50% 10%, rgba(37,99,235,0.05)  0%, transparent 65%) !important;
}

/* ── 3. Page wrapper ─────────────────────────────────────────── */
.page-wrapper {
  background:
    radial-gradient(circle at 88% 8%,  rgba(24,215,255,0.09), transparent 30%),
    radial-gradient(circle at 10% 78%, rgba(124,92,255,0.08), transparent 32%),
    linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 40%, #F3F7FF 100%) !important;
  color: #07142F !important;
}

/* ── 4. Background grid ──────────────────────────────────────── */
.bg-grid {
  background-image:
    linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px) !important;
  background-size: 72px 72px !important;
}

/* ── 5. Surfaces ─────────────────────────────────────────────── */
.bg-surface,
section.bg-surface,
div.bg-surface { background: #F3F7FF !important; }

/* ── 6. Orbs — very soft, barely visible ────────────────────── */
.orb {
  filter: blur(48px) !important;
  opacity: 0.18 !important;
}
.orb-cyan   { background: radial-gradient(circle, rgba(24,215,255,0.7) 0%, transparent 70%) !important; }
.orb-blue   { background: radial-gradient(circle, rgba(37,99,235,0.7)  0%, transparent 70%) !important; }
.orb-purple { background: radial-gradient(circle, rgba(124,92,255,0.7) 0%, transparent 70%) !important; }
.orb-green  { background: radial-gradient(circle, rgba(34,197,94,0.7)  0%, transparent 70%) !important; }

/* ── 7. Navigation ───────────────────────────────────────────── */
.nav {
  background: rgba(255,255,255,0.92) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(148,163,184,0.18) !important;
  box-shadow: 0 4px 24px rgba(15,23,42,0.04) !important;
}
.nav.scrolled {
  background: rgba(255,255,255,0.98) !important;
  box-shadow: 0 4px 24px rgba(15,23,42,0.07) !important;
}
.nav-links a { color: #0F172A !important; }
.nav-links a:hover,
.nav-links a.active {
  color: #2563EB !important;
  background: rgba(37,99,235,0.07) !important;
}
.nav-mobile {
  background: #FFFFFF !important;
  border-bottom: 1px solid rgba(148,163,184,0.18) !important;
  box-shadow: 0 8px 24px rgba(15,23,42,0.08) !important;
}
.nav-mobile-links a { color: #07142F !important; }

/* ── 8. Hero ─────────────────────────────────────────────────── */
.hero { background: transparent !important; }
.hero::before {
  background: radial-gradient(ellipse at 60% 30%,
    rgba(37,99,235,0.07) 0%, transparent 65%) !important;
}
.hero-badge {
  background: rgba(37,99,235,0.06) !important;
  border: 1px solid rgba(37,99,235,0.22) !important;
  color: #2563EB !important;
  -webkit-text-fill-color: #2563EB !important;
}
.hero-badge::before { display: none !important; }
.hero-title { color: #07142F !important; }
.hero-subtitle { color: #334155 !important; }

/* ── 9. Gradient text — readable on light backgrounds ────────── */
.text-gradient {
  background: linear-gradient(135deg, #0891B2 0%, #2563EB 48%, #6D28D9 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: #2563EB !important;
}
@supports not (-webkit-background-clip: text) {
  .text-gradient {
    background: none !important;
    color: #2563EB !important;
    -webkit-text-fill-color: #2563EB !important;
  }
}

/* ── 10. Headings ────────────────────────────────────────────── */
h1, h2, h3, h4, h5, h6,
.hero-title, .section-title, .pr-h1,
.hiw-hero h1, .cp-hero h1,
.card-title, .team-card-title, .emp-card-title,
.beyond-card h3, .pain-text, .pf-title {
  color: #07142F !important;
}

/* ── 11. Body text ───────────────────────────────────────────── */
p, li,
.hero-subtitle, .section-subtitle,
.card-text, .team-card-text, .emp-card-desc,
.faq-a, .pr-faq-a { color: #334155 !important; }

/* ── 12. Cards ───────────────────────────────────────────────── */
.card,
.team-card,
.pkg-row,
.faq-item,
.pr-faq-item,
.demo-widget,
.metric-card,
.benefit-card,
.emp-card,
.mini-calc,
.beyond-card,
.pain-card,
.pf-step,
.process-widget,
.at-table,
.dashboard-card {
  background: rgba(255,255,255,0.88) !important;
  border: 1px solid rgba(148,163,184,0.22) !important;
  box-shadow: 0 2px 8px rgba(15,23,42,0.04), 0 18px 50px rgba(15,23,42,0.06) !important;
  color: #07142F !important;
}
.card-hover:hover,
.team-card:hover {
  border-color: rgba(37,99,235,0.28) !important;
  box-shadow: 0 4px 16px rgba(37,99,235,0.10), 0 24px 60px rgba(15,23,42,0.08) !important;
  transform: translateY(-3px) !important;
}

/* ── 13. Section badge ───────────────────────────────────────── */
.section-badge {
  background: rgba(37,99,235,0.06) !important;
  border: 1px solid rgba(37,99,235,0.20) !important;
  -webkit-text-fill-color: #2563EB !important;
  color: #2563EB !important;
}
.section-badge::after {
  background: rgba(37,99,235,0.06) !important;
}

/* ── 14. Buttons ─────────────────────────────────────────────── */
.btn-primary {
  background: linear-gradient(135deg, #18D7FF 0%, #2563EB 48%, #7C5CFF 100%) !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  box-shadow: 0 8px 28px rgba(37,99,235,0.22) !important;
}
.btn-primary:hover {
  filter: brightness(1.08) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 40px rgba(37,99,235,0.30) !important;
}
.btn-outline {
  background: rgba(255,255,255,0.80) !important;
  border: 1.5px solid rgba(37,99,235,0.32) !important;
  color: #2563EB !important;
  -webkit-text-fill-color: #2563EB !important;
}
.btn-outline:hover {
  background: rgba(37,99,235,0.06) !important;
  border-color: rgba(37,99,235,0.48) !important;
  color: #1D4ED8 !important;
  -webkit-text-fill-color: #1D4ED8 !important;
}
.btn-ghost { color: #334155 !important; }

/* ── 15. Hero phone — white body ────────────────────────────── */
.hero-phone {
  background: linear-gradient(160deg, #FFFFFF 0%, #F4F8FF 100%) !important;
  box-shadow:
    0 0 0 6px #DDE6F5,
    0 0 0 7px rgba(148,163,184,0.20),
    0 28px 80px rgba(15,23,42,0.14) !important;
}
.hero-phone-screen { background: transparent !important; }
.hp-section-label { color: #07142F !important; -webkit-text-fill-color: #07142F !important; }
.hp-time { color: #07142F !important; }
.hp-icons { color: rgba(7,20,47,0.75) !important; }
.hp-notif {
  background: rgba(255,255,255,0.95) !important;
  border: 1px solid rgba(148,163,184,0.20) !important;
  box-shadow: 0 2px 12px rgba(15,23,42,0.07) !important;
}
.hp-notif-head strong { color: #07142F !important; }
.hp-notif-text { color: #334155 !important; }
.hp-icon-caught { background: rgba(37,99,235,0.09) !important; color: #2563EB !important; border-color: rgba(37,99,235,0.22) !important; }
.hp-icon-ai     { background: rgba(124,92,255,0.09) !important; color: #7C5CFF !important; border-color: rgba(124,92,255,0.22) !important; }
.hp-icon-booked { background: rgba(34,197,94,0.10)  !important; color: #16a34a !important; border-color: rgba(34,197,94,0.25)  !important; }

/* ── 16. Phone caption ───────────────────────────────────────── */
.hpc-line { color: #334155 !important; }
.hpc-line strong { color: #07142F !important; }
.hpc-money {
  background: rgba(255,255,255,0.90) !important;
  border: 1px solid rgba(148,163,184,0.20) !important;
  box-shadow: 0 2px 8px rgba(15,23,42,0.05) !important;
}
.hpc-money-label { color: #64748B !important; }
.hpc-money-val { color: #64748B !important; -webkit-text-fill-color: #64748B !important; font-size: 0.875rem !important; }

/* ── 17. Live stats ──────────────────────────────────────────── */
.live-stats-inner {
  background: rgba(255,255,255,0.88) !important;
  border: 1px solid rgba(148,163,184,0.20) !important;
  box-shadow: 0 2px 8px rgba(15,23,42,0.04), 0 18px 50px rgba(15,23,42,0.05) !important;
}
.live-stats-head { color: #07142F !important; }
.live-stat-num {
  background: linear-gradient(135deg, #2563EB 0%, #7C5CFF 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: #2563EB !important;
}
.live-stat-label { color: #334155 !important; }
.live-stats-foot { color: #64748B !important; font-style: italic !important; }

/* ── 18. Mini calc ───────────────────────────────────────────── */
.mini-calc-eyebrow { color: #64748B !important; }
.mini-calc-title { color: #07142F !important; }
.mini-calc-field-label { color: #64748B !important; }
.mini-calc-field-value { color: #07142F !important; }
.mini-calc-out-label { color: #64748B !important; }
.mini-calc-out-sub { color: #64748B !important; }
.mini-calc-cta { color: #2563EB !important; -webkit-text-fill-color: #2563EB !important; }

/* ── 19. Cred strip ──────────────────────────────────────────── */
.cred-strip { background: #F3F7FF !important; border-color: rgba(148,163,184,0.20) !important; }
.cred-item { color: #334155 !important; }

/* ── 20. Footer ──────────────────────────────────────────────── */
.footer { background: #F3F7FF !important; border-top-color: rgba(148,163,184,0.20) !important; }
.footer * { color: #334155 !important; }
.footer h4 { color: #07142F !important; }
.footer a:hover { color: #2563EB !important; }
.footer-bottom { border-top-color: rgba(148,163,184,0.20) !important; color: #64748B !important; }
.footer-bottom * { color: #64748B !important; }

/* ── 21. FAQ ─────────────────────────────────────────────────── */
.faq-item, .pr-faq-item {
  background: #FFFFFF !important;
  border-color: rgba(148,163,184,0.22) !important;
}
.faq-q, .pr-faq-q { color: #07142F !important; }
.faq-a, .pr-faq-a { color: #334155 !important; }

/* ── 22. Pricing ─────────────────────────────────────────────── */
.pkg-row-name { color: #07142F !important; }
.pkg-row-desc { color: #64748B !important; }
.pkg-row-price { -webkit-text-fill-color: transparent !important; }
.emp-name { color: #07142F !important; }
.emp-desc { color: #334155 !important; }
.pr-faq-a { color: #334155 !important; }
.sb-trust { color: #64748B !important; }
.sb-setup p { color: #334155 !important; }
.sb-step-text { color: #334155 !important; }
.sb-pilot p { color: #334155 !important; }

/* ── 23. Team / AI employee cards ────────────────────────────── */
.team-card { background: #FFFFFF !important; }
.team-card-tasks span {
  background: rgba(37,99,235,0.07) !important;
  border-color: rgba(37,99,235,0.18) !important;
  color: #2563EB !important;
}

/* ── 24. Process flow widgets ────────────────────────────────── */
.pf-widget {
  background: #FFFFFF !important;
  border-color: rgba(148,163,184,0.22) !important;
}
.pf-num { background: var(--grad-primary) !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; }
.pfw-bubble.ai {
  background: rgba(37,99,235,0.07) !important;
  color: #07142F !important;
  border-color: rgba(37,99,235,0.18) !important;
}
.pfw-bubble.cust {
  background: #F3F7FF !important;
  color: #334155 !important;
}

/* ── 25. Urgency banner ──────────────────────────────────────── */
.urgency-banner {
  background: linear-gradient(135deg, #18D7FF 0%, #2563EB 48%, #7C5CFF 100%) !important;
  color: #FFFFFF !important;
}
.urgency-banner strong { color: #FFFFFF !important; }
.urgency-banner .ub-link { color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; }

/* ── 26. Comparison table ────────────────────────────────────── */
.comp-table th, .comp-table td { color: #07142F !important; }
.col-ll { color: #2563EB !important; font-weight: 600 !important; }

/* ── 27. Pain cards ──────────────────────────────────────────── */
.pain-card { background: #FFFFFF !important; border-color: rgba(148,163,184,0.22) !important; }
.pain-icon svg { stroke: #2563EB !important; }
.pain-text { color: #334155 !important; }

/* ── 28. Beyond section ──────────────────────────────────────── */
.beyond-card-them { background: #F8FBFF !important; border-color: rgba(148,163,184,0.22) !important; }
.beyond-card-us   { background: #FFFFFF !important; border-color: rgba(37,99,235,0.22) !important; }
.beyond-tag.accent { color: #2563EB !important; }
.beyond-feat-head strong { color: #07142F !important; }
.beyond-feat-head span { color: #334155 !important; }

/* ── 29. Automate section tabs ───────────────────────────────── */
.automate-tab {
  background: rgba(255,255,255,0.80) !important;
  border-color: rgba(148,163,184,0.22) !important;
  color: #334155 !important;
}
.automate-tab.active {
  background: #2563EB !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
  border-color: #2563EB !important;
}
.automate-panel {
  background: #FFFFFF !important;
  border-color: rgba(148,163,184,0.22) !important;
}

/* ── 30. Demo page ───────────────────────────────────────────── */
.demo-widget {
  background: #FFFFFF !important;
  border-color: rgba(148,163,184,0.22) !important;
  color: #07142F !important;
}
.ai-emp-nav {
  background: rgba(255,255,255,0.95) !important;
  border-color: rgba(148,163,184,0.20) !important;
}

/* ── 31. Addon cards + engine nodes — light ─────────────────── */
.addon-card {
  background: #FFFFFF !important;
  border: 1px solid rgba(148,163,184,0.22) !important;
  box-shadow: 0 2px 8px rgba(15,23,42,0.04), 0 18px 50px rgba(15,23,42,0.06) !important;
}
.addon-card h3, .addon-card h4, .addon-card strong { color: #07142F !important; }
.addon-card p, .addon-card li, .addon-card span { color: #334155 !important; }
.engine-node-team {
  background: rgba(37,99,235,0.06) !important;
  border: 1px solid rgba(37,99,235,0.22) !important;
  color: #07142F !important;
}

/* ── 32. Accent-bg badges & buttons — white text ────────────── */
.mobile-cta .mc-btn-primary,
.team-badge-popular,
.pkg-badge,
.demo-cal-day.selected,
.cal-day.today,
select.styled-select option:checked {
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

/* ── 33. Cookie bar — light ───────────────────────────── */
.cookie-bar {
  background: rgba(255,255,255,0.97) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(148,163,184,0.22) !important;
  box-shadow: 0 12px 40px rgba(15,23,42,0.14) !important;
  color: #334155 !important;
}
.cookie-bar span { color: #334155 !important; }
.cookie-bar a { color: #2563EB !important; }
.cookie-bar a:hover { color: #1D4ED8 !important; }
.cookie-bar button {
  background: linear-gradient(135deg, #18D7FF 0%, #2563EB 48%, #7C5CFF 100%) !important;
  color: #FFFFFF !important;
  -webkit-text-fill-color: #FFFFFF !important;
}

/* ── 34. Any accent-bg control text → white ─────────────── */
.mini-calc-slider::-webkit-slider-thumb { background: #2563EB !important; }
.mini-calc-out-value { color: #2563EB !important; -webkit-text-fill-color: #2563EB !important; }

/* ── 35. Calculator result number — readable gradient ─────── */
.calc-result-big {
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: #2563EB !important;
}
.calc-output {
  background:
    radial-gradient(120% 80% at 100% 0%, rgba(37,99,235,0.08), transparent 60%),
    linear-gradient(180deg, rgba(37,99,235,0.05), rgba(124,92,255,0.04)) !important;
}
.calc-result-label { color: #2563EB !important; }
.calc-result-period { color: #334155 !important; }
.calc-eyebrow { color: #2563EB !important; }


/* ================================================================
   OPTION 4 DESIGN POLISH — Final pass
   Typography · Logo · Phone mockup · Card colours · Background
   ================================================================ */

/* ── A. Typography — bolder, darker, more prominent ─────────── */
h1, h2, h3,
.hero-title, .section-title, .pr-h1,
.hiw-hero h1, .cp-hero h1,
.card-title, .team-card-title, .emp-card-title,
.beyond-card h3, .ai-emp-title, .pain-text {
  color: #07142F !important;
  font-weight: 850 !important;
}
.section-title {
  font-weight: 860 !important;
  letter-spacing: -0.025em !important;
}
.hero-title {
  font-weight: 900 !important;
  letter-spacing: -0.03em !important;
}
/* Darker body text */
p, li,
.hero-subtitle, .section-subtitle,
.card-text, .team-card-text,
.ai-emp-sub, .faq-a, .pr-faq-a,
.emp-card-desc, .pain-card p {
  color: #26364F !important;
  font-weight: 450 !important;
}
/* Muted — slightly stronger */
.text-muted, var(--text-muted),
.section-badge, .pr-meta,
.emp-section-num,
small, .footnote {
  color: #5A6A82 !important;
}

/* ── B. Nav — crisper, bolder links ─────────────────────────── */
.nav-links a {
  color: #07142F !important;
  font-weight: 560 !important;
}
.nav-links a:hover,
.nav-links a.active {
  color: #2563EB !important;
  background: rgba(37,99,235,0.07) !important;
  font-weight: 650 !important;
}

/* ── C. Logo — stronger presence ────────────────────────────── */
.nav-logo-img {
  height: 54px !important;
  filter: contrast(1.08) !important;
}
.footer-brand .nav-logo-img {
  height: 40px !important;
  filter: contrast(1.05) opacity(0.85) !important;
}

/* ── D. Phone mockup — dark premium screen ───────────────────── */
.hero-phone {
  background: linear-gradient(160deg, #F8FBFF 0%, #EEF3FF 100%) !important;
  box-shadow:
    0 0 0 6px #DDE6F5,
    0 0 0 7px rgba(148,163,184,0.18),
    0 32px 90px rgba(15,23,42,0.22),
    0 0 0 1px rgba(37,99,235,0.04) inset !important;
}
.hero-phone-screen {
  background: linear-gradient(175deg, #0d1b35 0%, #071020 100%) !important;
  border-radius: 38px !important;
}
.hp-section-label {
  color: rgba(248,250,252,0.65) !important;
  -webkit-text-fill-color: rgba(248,250,252,0.65) !important;
  letter-spacing: 0.08em !important;
}
.hp-section-label .text-gradient,
.hp-live-dot { display: inline-block !important; }
.hp-time { color: #F8FAFC !important; }
.hp-icons { color: rgba(248,250,252,0.8) !important; }
.hp-notif {
  background: rgba(22,36,62,0.88) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25) !important;
  backdrop-filter: blur(8px) !important;
}
.hp-notif-head strong { color: #F0F6FF !important; }
.hp-notif-text { color: rgba(148,163,184,0.9) !important; }

/* Employee colour-coded phone icons (strong contrast on dark) */
.hp-icon-caught {
  background: rgba(24,215,255,0.15) !important;
  color: #18D7FF !important;
  border-color: rgba(24,215,255,0.35) !important;
}
.hp-icon-ai {
  background: rgba(37,99,235,0.20) !important;
  color: #60A5FA !important;
  border-color: rgba(37,99,235,0.40) !important;
}
.hp-icon-booked {
  background: rgba(16,185,129,0.18) !important;
  color: #34D399 !important;
  border-color: rgba(16,185,129,0.40) !important;
}
.hp-icon-followup {
  background: rgba(245,158,11,0.18) !important;
  color: #FCD34D !important;
  border-color: rgba(245,158,11,0.38) !important;
}
.hp-icon-missed {
  background: rgba(239,68,68,0.18) !important;
  color: #FCA5A5 !important;
  border-color: rgba(239,68,68,0.38) !important;
}
/* Phone caption on light bg stays dark */
.hpc-line { color: #334155 !important; }
.hpc-money {
  background: rgba(255,255,255,0.95) !important;
  border: 1px solid rgba(148,163,184,0.20) !important;
}
.hpc-money-label { color: #64748B !important; }
.hpc-money-val { color: #64748B !important; -webkit-text-fill-color: #64748B !important; }

/* ── E. AI Employee colour-coded card borders ────────────────── */
/* How-it-works team cards — nth-child colour accents */
.team-card:nth-child(1) { border-top: 3px solid #18D7FF !important; }
.team-card:nth-child(2) { border-top: 3px solid #2563EB !important; }
.team-card:nth-child(3) { border-top: 3px solid #10B981 !important; }
.team-card:nth-child(4) { border-top: 3px solid #F59E0B !important; }
.team-card:nth-child(5) { border-top: 3px solid #7C5CFF !important; }
.team-card:nth-child(6) { border-top: 3px solid #6366F1 !important; }

/* Role badge colours per employee */
.team-role-badge.tc-cyan   { background: rgba(24,215,255,0.10) !important; color: #0891b2 !important; border: 1px solid rgba(24,215,255,0.30) !important; }
.team-role-badge.tc-blue   { background: rgba(37,99,235,0.10)  !important; color: #2563EB !important; border: 1px solid rgba(37,99,235,0.28)  !important; }
.team-role-badge.tc-green  { background: rgba(16,185,129,0.10) !important; color: #15803d !important; border: 1px solid rgba(16,185,129,0.28) !important; }
.team-role-badge.tc-purple { background: rgba(124,92,255,0.10) !important; color: #7C5CFF !important; border: 1px solid rgba(124,92,255,0.28) !important; }

/* Demo page employee section colour accents */
.ai-emp-section:nth-child(1) { border-left: 3px solid #18D7FF; }
.ai-emp-section:nth-child(2) { border-left: 3px solid #2563EB; }
.ai-emp-section:nth-child(3) { border-left: 3px solid #10B981; }
.ai-emp-section:nth-child(4) { border-left: 3px solid #F59E0B; }
.ai-emp-section:nth-child(5) { border-left: 3px solid #7C5CFF; }
.ai-emp-section:nth-child(6) { border-left: 3px solid #6366F1; }

/* AI Employee badge colours (demo + how-it-works) */
.ai-emp-badge.live     { background: rgba(16,185,129,0.10) !important; color: #15803d !important; border-color: rgba(16,185,129,0.30) !important; }
.ai-emp-badge.preview  { background: rgba(37,99,235,0.10)  !important; color: #2563EB !important; border-color: rgba(37,99,235,0.28)  !important; }
.ai-emp-badge.workflow { background: rgba(124,92,255,0.10) !important; color: #7C5CFF !important; border-color: rgba(124,92,255,0.28) !important; }

/* ── F. Package cards — stronger featured highlight ─────────── */
.pkg-row.featured {
  border-color: rgba(37,99,235,0.45) !important;
  border-top: 3px solid #2563EB !important;
}
.pkg-row:not(.featured) {
  border-top: 3px solid rgba(148,163,184,0.20) !important;
}
.pkg-row:last-child { border-top-color: rgba(124,92,255,0.35) !important; }

/* ── G. FAQ accordion — bolder questions ────────────────────── */
.faq-q, .pr-faq-q {
  font-weight: 700 !important;
  color: #07142F !important;
}
.faq-item:hover, .pr-faq-item:hover {
  border-color: rgba(37,99,235,0.25) !important;
  box-shadow: 0 4px 16px rgba(37,99,235,0.07) !important;
}

/* ── H. Page wrapper — Option 4 subtle background ───────────── */
.page-wrapper {
  background:
    radial-gradient(circle at 88% 8%,  rgba(24,215,255,0.07), transparent 28%),
    radial-gradient(circle at 8%  78%, rgba(124,92,255,0.07), transparent 30%),
    radial-gradient(circle at 55% 35%, rgba(37,99,235,0.04), transparent 45%),
    linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 45%, #F3F7FF 100%) !important;
}

/* ── I. Section alternating tints ───────────────────────────── */
.bg-surface,
section.bg-surface { background: #F2F7FF !important; }

/* ── J. Sidebar card stronger pilot ─────────────────────────── */
.sb-pilot-price { font-size: 2.8rem !important; font-weight: 900 !important; }
.sb-setup-price {
  font-size: 1.8rem !important;
  font-weight: 900 !important;
}

/* ── K. Pricing setup note fix ───────────────────────────────── */
/* End polish block */

/* End supplementary light fixes */

/* End light theme override */

/* ================================================================
   OPTION 4 FINAL — Phone revert to light + background reinforcement
   These rules MUST come last to win the cascade.
   ================================================================ */

/* ── Phone: light pearl frame, light screen (matches Option 4 reference) ── */
.hero-phone {
  background: linear-gradient(160deg, #FFFFFF 0%, #F5F8FF 100%) !important;
  box-shadow:
    0 0 0 8px #E8EFF8,
    0 0 0 9px rgba(148,163,184,0.12),
    0 40px 100px rgba(15,23,42,0.16),
    0 8px 30px rgba(37,99,235,0.06) !important;
}
/* Light screen — soft lavender tint like reference */
.hero-phone-screen {
  background: linear-gradient(175deg, #F8FBFF 0%, #EEF3FF 100%) !important;
  border-radius: 36px !important;
}
/* Status bar — dark text on light */
.hp-time { color: #07142F !important; }
.hp-icons { color: rgba(7,20,47,0.7) !important; }
/* Section label — dark */
.hp-section-label {
  color: #07142F !important;
  -webkit-text-fill-color: #07142F !important;
}
/* Notification cards — white with subtle border, dark text */
.hp-notif {
  background: rgba(255,255,255,0.92) !important;
  border: 1px solid rgba(148,163,184,0.18) !important;
  box-shadow: 0 2px 12px rgba(15,23,42,0.07) !important;
  backdrop-filter: blur(8px) !important;
}
.hp-notif-head strong { color: #07142F !important; }
.hp-notif-text { color: #334155 !important; }
/* Coloured icon tiles — vivid on light bg */
.hp-icon-caught {
  background: rgba(24,215,255,0.10) !important;
  color: #0891b2 !important;
  border-color: rgba(24,215,255,0.28) !important;
}
.hp-icon-ai {
  background: rgba(37,99,235,0.10) !important;
  color: #2563EB !important;
  border-color: rgba(37,99,235,0.25) !important;
}
.hp-icon-booked {
  background: rgba(16,185,129,0.12) !important;
  color: #15803d !important;
  border-color: rgba(16,185,129,0.28) !important;
}
.hp-icon-followup {
  background: rgba(245,158,11,0.12) !important;
  color: #b45309 !important;
  border-color: rgba(245,158,11,0.28) !important;
}
/* Phone caption area */
.hpc-money {
  background: rgba(255,255,255,0.95) !important;
  border: 1px solid rgba(148,163,184,0.18) !important;
  box-shadow: 0 2px 10px rgba(15,23,42,0.06) !important;
}
.hpc-money-label { color: #64748B !important; }
.hpc-money-val {
  color: #64748B !important;
  -webkit-text-fill-color: #64748B !important;
  font-size: 0.875rem !important;
}

/* ── Background reinforcement for pages without ll-fx JS active ── */
/* Ensures Option 4 glows show even without JS */
body:not(.ll-fx-on)::before {
  content: '';
  position: fixed;
  top: -25%;
  right: -20%;
  width: 75vw;
  height: 85vh;
  background: radial-gradient(ellipse at center,
    rgba(24,215,255,0.22) 0%, rgba(37,99,235,0.12) 40%, transparent 68%);
  border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  filter: blur(55px);
  pointer-events: none;
  z-index: -1;
}
body:not(.ll-fx-on)::after {
  content: '';
  position: fixed;
  bottom: -20%;
  left: -18%;
  width: 65vw;
  height: 70vh;
  background: radial-gradient(ellipse at center,
    rgba(124,92,255,0.20) 0%, rgba(99,102,241,0.11) 40%, transparent 68%);
  border-radius: 37% 63% 46% 54% / 48% 55% 45% 52%;
  filter: blur(50px);
  pointer-events: none;
  z-index: -1;
}

/* ── Option 4 page-wrapper — blobs embedded IN background stack ─── */
.page-wrapper {
  background:
    /* Cyan blob — top right, large and clearly visible */
    radial-gradient(ellipse 90% 80% at 100% 0%,  rgba(24,215,255,0.22), transparent 55%),
    /* Violet/lavender blob — bottom left */
    radial-gradient(ellipse 80% 70% at 0%   100%, rgba(124,92,255,0.18), transparent 55%),
    /* Secondary blue — right mid */
    radial-gradient(ellipse 55% 50% at 100% 55%, rgba(37,99,235,0.10), transparent 60%),
    /* Indigo accent — bottom right */
    radial-gradient(ellipse 50% 45% at 100% 100%, rgba(99,102,241,0.09), transparent 58%),
    /* Base white-to-light gradient */
    linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 50%, #F3F7FF 100%) !important;
  overflow-x: clip;
}

/* End Option 4 final override */

/* ================================================================
   GLOBAL OPTION 4 SYSTEM — replaces all page-specific decor
   Applied last so these rules definitively win.
   ================================================================ */

/* ── 1. Kill all per-page orbs + SVG decorations globally ────── */
/* The page-wrapper background handles the visual atmosphere. */
.page-decor .orb,
.page-decor .bg-svg,
.page-decor svg,
.bg-svg { display: none !important; }

/* Keep page-decor container but make it empty/non-visual */
.page-decor {
  pointer-events: none !important;
  overflow: hidden !important;
}

/* ── 2. All orbs hidden globally ─────────────────────────────── */
.orb {
  display: none !important;
}

/* ── 3. Transparent sections — let page-wrapper bg show through */
.section,
.section-sm,
.hero,
.ai-emp-section,
.portal-section,
.demo-final-cta,
.pr-faq {
  background: transparent !important;
  position: relative;
}

/* Alternate section tint — very subtle, lets blobs show through */
.section.bg-surface,
.ai-emp-section.bg-surface,
.portal-section.alt,
section.bg-surface,
div.bg-surface,
.bg-surface {
  background: rgba(244,248,255,0.62) !important;
}

/* ── 4. Page wrapper — consistent Option 4 background ─────────
   Large visible cyan + violet blobs embedded in background stack */
.page-wrapper {
  position: relative;
  overflow-x: clip;
  background:
    radial-gradient(ellipse 90% 80% at 100% 0%,   rgba(24,215,255,0.20), transparent 55%),
    radial-gradient(ellipse 80% 70% at 0%   100%,  rgba(124,92,255,0.17), transparent 55%),
    radial-gradient(ellipse 55% 50% at 100% 55%,  rgba(37,99,235,0.10), transparent 60%),
    radial-gradient(ellipse 50% 45% at 0%   40%,  rgba(24,215,255,0.07), transparent 58%),
    radial-gradient(ellipse 50% 40% at 100% 100%, rgba(99,102,241,0.09), transparent 58%),
    linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 50%, #F4F8FF 100%) !important;
  color: #07142F !important;
}

/* ── 5. Flowing accent behind hero product area ─────────────── */
.hero::before {
  content: '';
  position: absolute;
  right: -8%;
  top: -10%;
  width: 60%;
  height: 130%;
  background:
    radial-gradient(ellipse 80% 70% at 70% 30%, rgba(24,215,255,0.12), transparent 60%),
    radial-gradient(ellipse 70% 60% at 30% 80%, rgba(124,92,255,0.09), transparent 60%);
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
}

/* ── 6. Content sits above background ────────────────────────── */
.nav, footer, .footer,
.section > .container,
.section > .container-sm,
.hero > .container,
.hero > .container-sm,
.section-header, .portal-section > .container,
.ai-emp-section > .container,
.demo-final-cta > .container,
.pr-faq > .container {
  position: relative;
  z-index: 1;
}

/* ── 7. Footer — semi-transparent so blobs show through ──────── */
.footer {
  background: rgba(243,247,255,0.78) !important;
  border-top: 1px solid rgba(148,163,184,0.20) !important;
}

/* ── 8. Phone — light pearl frame matching Option 4 reference ── */
.hero-phone {
  background: linear-gradient(160deg, #FFFFFF 0%, #F5F8FF 100%) !important;
  box-shadow:
    0 0 0 8px #E8EFF8,
    0 0 0 9px rgba(148,163,184,0.12),
    0 40px 100px rgba(15,23,42,0.16) !important;
}
.hero-phone-screen {
  background: linear-gradient(175deg, #F8FBFF 0%, #EEF3FF 100%) !important;
  border-radius: 36px !important;
}
.hp-time { color: #07142F !important; }
.hp-icons { color: rgba(7,20,47,0.7) !important; }
.hp-section-label {
  color: #07142F !important;
  -webkit-text-fill-color: #07142F !important;
}
.hp-notif {
  background: rgba(255,255,255,0.95) !important;
  border: 1px solid rgba(148,163,184,0.18) !important;
  box-shadow: 0 2px 12px rgba(15,23,42,0.07) !important;
}
.hp-notif-head strong { color: #07142F !important; }
.hp-notif-text { color: #334155 !important; }
.hp-icon-caught   { background: rgba(24,215,255,0.10) !important; color: #0891b2 !important; border-color: rgba(24,215,255,0.28) !important; }
.hp-icon-ai       { background: rgba(37,99,235,0.10)  !important; color: #2563EB !important; border-color: rgba(37,99,235,0.25)  !important; }
.hp-icon-booked   { background: rgba(16,185,129,0.12) !important; color: #15803d !important; border-color: rgba(16,185,129,0.28) !important; }
.hp-icon-followup { background: rgba(245,158,11,0.12) !important; color: #b45309 !important; border-color: rgba(245,158,11,0.28) !important; }

/* End global Option 4 system */
