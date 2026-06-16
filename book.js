/* ============================================================
   LeadaLine — Futuristic Background FX Layer
   Sits behind all content; layers below z-index 0 inside .ll-fx.
   Brand palette: #2563EB cyan, #2563EB blue, #7C5CFF purple
   ============================================================ */

/* Root layer — fixed full-viewport, never blocks input. */
.ll-fx {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  contain: strict;
  opacity: 1;
}

/* Make sure nothing in the FX layer ever blocks the page. */
.ll-fx > * { pointer-events: none; }

/* Body shouldn't paint its own atmospheric glow when FX layer is on —
   the FX aurora replaces it cleanly. */
body.ll-fx-on::before,
body.ll-fx-on::after { display: none !important; }

/* ── 1. AURORA — slowly morphing conic + radial mesh ─────────── */
.ll-fx-aurora {
  position: absolute;
  inset: -30%;
  /* Option 4 — large organic flowing blobs — MORE VISIBLE */
  background:
    /* Main cyan/teal blob — top right */
    radial-gradient(ellipse 120% 100% at 108% -8%,  rgba(24,215,255,0.28), transparent 52%),
    /* Main violet/lavender blob — bottom left */
    radial-gradient(ellipse 100% 85% at -12% 112%, rgba(124,92,255,0.24), transparent 52%),
    /* Blue mid-accent — right edge */
    radial-gradient(ellipse 75% 60% at 100% 52%,  rgba(37,99,235,0.14), transparent 58%),
    /* Cyan soft sweep — top */
    radial-gradient(ellipse 65% 45% at 48% -8%, rgba(24,215,255,0.10), transparent 62%),
    /* Indigo — bottom right corner */
    radial-gradient(ellipse 60% 50% at 100% 100%, rgba(99,102,241,0.13), transparent 58%);
  filter: blur(60px) saturate(1.3);
  animation: ll-aurora-drift 55s ease-in-out infinite alternate;
  opacity: var(--ll-aurora-opacity, 1);
}
@keyframes ll-aurora-drift {
  0%   { transform: translate3d(0,0,0) scale(1);     }
  25%  { transform: translate3d(-3%,2%,0) scale(1.05);}
  50%  { transform: translate3d(2%,-1%,0) scale(1.02);}
  75%  { transform: translate3d(-1%,3%,0) scale(1.08);}
  100% { transform: translate3d(2%,-2%,0) scale(1.03);}
}

/* ── 2. ANIMATED GRID — perspective grid that slowly drifts ─── */
.ll-fx-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right,  rgba(37,99,235,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(37,99,235,0.04) 1px, transparent 1px);
  background-size: 56px 56px;
  background-position: 0 0;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 35%, transparent 90%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 35%, transparent 90%);
  animation: ll-grid-pan 60s linear infinite;
  opacity: var(--ll-grid-opacity, 1);
}
@keyframes ll-grid-pan {
  to { background-position: 56px 56px; }
}

/* ── 3. DOT MATRIX — finer dot pattern with subtle twinkle ──── */
.ll-fx-dots {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle, rgba(37,99,235,0.04) 1px, transparent 1.5px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, #000 40%, transparent 95%);
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, #000 40%, transparent 95%);
  animation: ll-dots-fade 9s ease-in-out infinite;
  opacity: var(--ll-dots-opacity, 1);
}
@keyframes ll-dots-fade {
  0%, 100% { opacity: calc(var(--ll-dots-opacity, 1) * 0.7); }
  50%      { opacity: calc(var(--ll-dots-opacity, 1) * 1.0); }
}

/* ── 4. SCAN LINE — futuristic horizontal sweep ──────────────── */
.ll-fx-scan {
  position: absolute;
  left: 0; right: 0;
  top: 0;
  height: 220px;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(37,99,235,0.01) 35%,
    rgba(37,99,235,0.025) 50%,
    rgba(37,99,235,0.01) 65%,
    transparent 100%);
  animation: ll-scan 11s linear infinite; display: none;
  opacity: var(--ll-scan-opacity, 1);
  will-change: transform;
}
.ll-fx-scan::after {
  content: '';
  position: absolute;
  left: 0; right: 0;
  top: 50%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent, rgba(37,99,235,0.15) 30%, rgba(37,99,235,0.2) 50%, rgba(124,92,255,0.15) 70%, transparent);
  box-shadow: 0 0 8px rgba(37,99,235,0.15);
}
@keyframes ll-scan {
  0%   { transform: translate3d(0, -220px, 0); }
  100% { transform: translate3d(0, 100vh,   0); }
}

/* ── 5. DATA RAILS — vertical "data stream" pulses, edges only  */
.ll-fx-rails {
  position: absolute;
  inset: 0;
  opacity: var(--ll-rails-opacity, 1);
}
.ll-fx-rail {
  position: absolute;
  top: -20%;
  width: 1px;
  height: 140%;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(37,99,235,0.0) 40%,
    rgba(37,99,235,0.2)  50%,
    rgba(37,99,235,0.0) 60%,
    transparent 100%);
  filter: drop-shadow(0 0 4px rgba(37,99,235,0.2));
  animation: ll-rail 7s linear infinite; display: none;
}
@keyframes ll-rail {
  0%   { transform: translateY(-30%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(60%);  opacity: 0; }
}

/* ── 6. MOUSE SPOTLIGHT — JS sets --mx --my as % ─────────────── */
.ll-fx-spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    420px circle at var(--mx, 50%) var(--my, 35%),
    rgba(37,99,235,0.06) 0%,
    rgba(124,92,255,0.04) 30%,
    transparent 70%);
  transition: background 600ms ease;
  opacity: var(--ll-spotlight-opacity, 1);
  mix-blend-mode: multiply;
}

/* ── 7. CANVAS NETWORK — particle constellation ──────────────── */
.ll-fx-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: var(--ll-net-opacity, 1);
}

/* ── 8. VIGNETTE — soft edge darken to keep content readable ── */
.ll-fx-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 100% 80% at 50% 50%, transparent 55%, rgba(15,23,42,0.03) 100%);
}

/* Lift navigation chrome above the FX layer */
.nav { z-index: 200 !important; }
.page-wrapper { position: relative; z-index: 1; }

/* Hide the Vapi floating widget visually, but keep it in the DOM
   so demo.js can still programmatically click it to start a call. */
[data-vapi-button],
.vapi-btn,
.vapi-widget,
[class^="vapi-"],
[id^="vapi-"] {
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 1px !important;
  height: 1px !important;
  position: fixed !important;
  left: -9999px !important;
  bottom: 0 !important;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ll-fx-aurora,
  .ll-fx-grid,
  .ll-fx-dots,
  .ll-fx-scan,
  .ll-fx-rail { animation: none !important; }
}

/* ============================================================
   TWEAKS PANEL
   ============================================================ */
.ll-tweaks-toggle {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9998;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(37,99,235,0.25);
  color: #2563EB;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px rgba(37,99,235,0.15);
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.ll-tweaks-toggle:hover { transform: translateY(-2px); box-shadow: 0 0 32px rgba(37,99,235,0.45); }
.ll-tweaks-toggle svg { width: 20px; height: 20px; }

.ll-tweaks-panel {
  position: fixed;
  right: 20px;
  bottom: 76px;
  z-index: 9999;
  width: 300px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid rgba(37,99,235,0.2);
  border-radius: 14px;
  padding: 18px;
  color: #0f172a;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 24px rgba(15,23,42,0.10), 0 0 0 1px rgba(148,163,184,0.18);
  display: none;
}
.ll-tweaks-panel.open { display: block; animation: ll-panel-in 220ms ease; }
@keyframes ll-panel-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.ll-tweaks-panel h4 {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #2563EB;
  margin: 0 0 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ll-tweaks-panel h4 button {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;
}
.ll-tweaks-panel h4 button:hover { color: #0f172a; }

.ll-tweak-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(0,0,0,0.03);
}
.ll-tweak-row:last-child { border-bottom: none; }
.ll-tweak-label { color: #475569; font-size: 12.5px; flex: 1; }
.ll-tweak-row input[type="range"] {
  flex: 0 0 110px;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: rgba(37,99,235,0.2);
  border-radius: 2px;
  outline: none;
}
.ll-tweak-row input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg,#2563EB,#7C5CFF);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(37,99,235,0.5);
}
.ll-tweak-row input[type="range"]::-moz-range-thumb {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg,#2563EB,#7C5CFF);
  cursor: pointer;
  border: none;
}

.ll-switch {
  width: 36px; height: 20px;
  background: rgba(15,23,42,0.04);
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: background 200ms ease;
  flex-shrink: 0;
}
.ll-switch::after {
  content: '';
  position: absolute;
  top: 2px; left: 2px;
  width: 16px; height: 16px;
  background: #94a3b8;
  border-radius: 50%;
  transition: all 200ms ease;
}
.ll-switch.on { background: rgba(37,99,235,0.25); }
.ll-switch.on::after { left: 18px; background: linear-gradient(135deg,#2563EB,#7C5CFF); box-shadow: 0 0 8px rgba(37,99,235,0.6); }

.ll-tweaks-section {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid rgba(15,23,42,0.03);
}
.ll-tweaks-section:first-of-type { margin-top: 0; padding-top: 0; border-top: none; }

.ll-tweaks-foot {
  margin-top: 14px;
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.5;
}
.ll-tweaks-foot button {
  background: rgba(37,99,235,0.12);
  border: 1px solid rgba(37,99,235,0.3);
  color: #2563EB;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
}
.ll-tweaks-foot button:hover { background: rgba(37,99,235,0.2); color: #0f172a; }

/* ============================================================
   LeadaLine — Shared page Tweaks panel
   (toolbar-toggled; built by assets/js/leadaline-tweaks.js)
   ============================================================ */
#llTweaks {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9997;
  width: 290px;
  background: #ffffff;
  border: 1px solid rgba(37,99,235,0.2);
  border-radius: 12px;
  padding: 16px 18px;
  color: #0f172a;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  display: none;
}
#llTweaks.open { display: block; animation: ll-panel-in 220ms ease; }
#llTweaks h4 {
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;
  color: #2563EB; margin: 0 0 14px; font-weight: 700;
  display: flex; justify-content: space-between; align-items: center;
}
#llTweaks h4 button {
  background: transparent; border: none; color: #94a3b8;
  cursor: pointer; font-size: 16px; line-height: 1; padding: 0;
}
#llTweaks h4 button:hover { color: #0f172a; }
#llTweaks .ll-row {
  display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;
}
#llTweaks .ll-row-head {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 12.5px; color: #475569;
}
#llTweaks .ll-row-val {
  font-variant-numeric: tabular-nums;
  color: #2563EB; font-weight: 600; font-size: 12px;
}
#llTweaks input[type=range] {
  width: 100%; -webkit-appearance: none; appearance: none;
  height: 4px; background: rgba(37,99,235,0.2); border-radius: 2px; outline: none;
}
#llTweaks input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 14px; height: 14px; border-radius: 50%;
  background: linear-gradient(135deg,#2563EB,#7C5CFF); cursor: pointer;
  box-shadow: 0 0 10px rgba(37,99,235,0.5);
}
#llTweaks input[type=range]::-moz-range-thumb {
  width: 14px; height: 14px; border-radius: 50%; border: none;
  background: linear-gradient(135deg,#2563EB,#7C5CFF); cursor: pointer;
}
#llTweaks .ll-foot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 4px; padding-top: 10px;
  border-top: 1px solid rgba(15,23,42,0.03);
  font-size: 11px; color: #94a3b8;
}
#llTweaks .ll-foot button {
  background: rgba(37,99,235,0.12);
  border: 1px solid rgba(37,99,235,0.3);
  color: #2563EB;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px; font-weight: 600;
  cursor: pointer;
}
#llTweaks .ll-foot button:hover { background: rgba(37,99,235,0.22); color: #0f172a; }
