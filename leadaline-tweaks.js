/* ============================================================
   LeadaLine — Futuristic Background FX Engine
   - Particle constellation (canvas)
   - Mouse spotlight tracking
   - Data-rail vertical streams (auto-spawned)
   - Tweaks panel with localStorage persistence
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'leadaline_fx_v1';

  const DEFAULTS = {
    enabled: true,
    aurora: true,
    grid: true,
    dots: true,
    rails: true,
    spotlight: true,
    network: true,
    intensity: 0.8,        // master multiplier 0..1.4
    particleCount: 60      // tuned at runtime by viewport
  };

  // ── Load saved settings ─────────────────────────────────────
  let cfg = { ...DEFAULTS };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    cfg = { ...DEFAULTS, ...saved };
  } catch (_) {}

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); } catch (_) {}
  }

  // ── Build the DOM layer ─────────────────────────────────────
  const fx = document.createElement('div');
  fx.className = 'll-fx';
  fx.setAttribute('aria-hidden', 'true');
  fx.innerHTML = `
    <div class="ll-fx-aurora"    data-layer="aurora"></div>
    <div class="ll-fx-grid"      data-layer="grid"></div>
    <div class="ll-fx-dots"      data-layer="dots"></div>
    <canvas class="ll-fx-canvas" data-layer="network"></canvas>
    <div class="ll-fx-rails"     data-layer="rails"></div>
    <div class="ll-fx-spotlight" data-layer="spotlight"></div>
    <div class="ll-fx-vignette"></div>
  `;
  document.body.prepend(fx);
  document.body.classList.add('ll-fx-on');

  // ── Spawn data rails (vertical streams at random x positions) ──
  function spawnRails() {
    const rails = fx.querySelector('.ll-fx-rails');
    rails.innerHTML = '';
    const count = 6;
    for (let i = 0; i < count; i++) {
      const r = document.createElement('div');
      r.className = 'll-fx-rail';
      // bias toward edges
      const side = i % 2 === 0 ? 0 : 1;
      const edge = side ? 90 + Math.random() * 8 : Math.random() * 10;
      r.style.left = edge + '%';
      r.style.animationDuration = (5 + Math.random() * 5) + 's';
      r.style.animationDelay = (-Math.random() * 7) + 's';
      r.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
      rails.appendChild(r);
    }
  }
  spawnRails();

  // ── Mouse spotlight ─────────────────────────────────────────
  const spotEl = fx.querySelector('.ll-fx-spotlight');
  let targetX = 50, targetY = 35;
  let curX = 50, curY = 35;
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
  }, { passive: true });

  // ── Particle network on canvas ──────────────────────────────
  const canvas = fx.querySelector('.ll-fx-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;

  function resize() {
    const rect = fx.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width  = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    // Scale particle count to viewport area, with master intensity cap.
    const base = Math.min(110, Math.max(28, Math.floor((W * H) / 26000)));
    const count = Math.floor(base * cfg.intensity);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.6 + Math.random() * 1.4,
        // brand-hued: 0=cyan, 1=blue, 2=purple
        hue: Math.random()
      });
    }
  }

  const HUES = [
    [6, 214, 240],     // cyan
    [79, 142, 247],    // blue
    [124, 92, 231]     // purple
  ];

  function hueColor(t, alpha) {
    let i, frac;
    if (t < 0.5) { i = 0; frac = t / 0.5; }
    else { i = 1; frac = (t - 0.5) / 0.5; }
    const a = HUES[i], b = HUES[i + 1];
    const r = Math.round(a[0] + (b[0] - a[0]) * frac);
    const g = Math.round(a[1] + (b[1] - a[1]) * frac);
    const bl= Math.round(a[2] + (b[2] - a[2]) * frac);
    return `rgba(${r},${g},${bl},${alpha})`;
  }

  let animId = null;
  function tick() {
    // Smooth spotlight follow
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    spotEl.style.setProperty('--mx', curX + '%');
    spotEl.style.setProperty('--my', curY + '%');

    ctx.clearRect(0, 0, W, H);

    if (cfg.network && !reduceMotion) {
      // Update + draw particles
      const mxPx = (curX / 100) * W;
      const myPx = (curY / 100) * H;
      const LINK_DIST = 130;
      const MOUSE_PULL = 80;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // gentle attraction to mouse vicinity
        const dx = mxPx - p.x;
        const dy = myPx - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          const pull = (200 - d) / 200 * 0.012;
          p.vx += (dx / (d + 1)) * pull;
          p.vy += (dy / (d + 1)) * pull;
        }
        // friction
        p.vx *= 0.985;
        p.vy *= 0.985;
        // drift
        p.x += p.vx;
        p.y += p.vy;
        // wrap
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      // Lines between near particles
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.22;
            ctx.strokeStyle = hueColor((a.hue + b.hue) / 2, alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // dot
        ctx.fillStyle = hueColor(a.hue, 0.55);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
        // soft glow halo
        ctx.fillStyle = hueColor(a.hue, 0.10);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animId = requestAnimationFrame(tick);
  }

  // ── Apply settings to DOM ───────────────────────────────────
  function applyConfig() {
    fx.style.display = cfg.enabled ? '' : 'none';
    const layers = ['aurora','grid','dots','network','rails','spotlight'];
    layers.forEach(name => {
      const el = fx.querySelector(`[data-layer="${name}"]`);
      if (el) el.style.display = cfg[name] ? '' : 'none';
    });
    // CSS variable opacities scale with intensity
    const k = cfg.intensity;
    fx.style.setProperty('--ll-aurora-opacity',    (0.55 + 0.45 * k).toFixed(2));
    fx.style.setProperty('--ll-grid-opacity',      (0.45 + 0.55 * k).toFixed(2));
    fx.style.setProperty('--ll-dots-opacity',      (0.4  + 0.6  * k).toFixed(2));
    fx.style.setProperty('--ll-rails-opacity',     (0.4  + 0.6  * k).toFixed(2));
    fx.style.setProperty('--ll-spotlight-opacity', (0.6  + 0.4  * k).toFixed(2));
    fx.style.setProperty('--ll-net-opacity',       (0.55 + 0.45 * k).toFixed(2));
    save();
  }

  // ── Bootstrap ───────────────────────────────────────────────
  resize();
  applyConfig();
  if (!reduceMotion) tick();
  window.addEventListener('resize', () => { resize(); }, { passive: true });

  // ── TWEAKS PANEL ────────────────────────────────────────────
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'll-tweaks-toggle';
  toggleBtn.setAttribute('aria-label', 'Background effects settings');
  toggleBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  `;
  document.body.appendChild(toggleBtn);

  const panel = document.createElement('div');
  panel.className = 'll-tweaks-panel';
  panel.innerHTML = `
    <h4>Background FX <button type="button" aria-label="Close" data-action="close">×</button></h4>

    <div class="ll-tweaks-section">
      <div class="ll-tweak-row">
        <span class="ll-tweak-label">Background effects</span>
        <div class="ll-switch" data-toggle="enabled"></div>
      </div>
      <div class="ll-tweak-row">
        <span class="ll-tweak-label">Intensity</span>
        <input type="range" min="0.3" max="1.4" step="0.05" data-slider="intensity">
      </div>
    </div>

    <div class="ll-tweaks-section">
      <div class="ll-tweak-row"><span class="ll-tweak-label">Aurora mesh</span><div class="ll-switch" data-toggle="aurora"></div></div>
      <div class="ll-tweak-row"><span class="ll-tweak-label">Perspective grid</span><div class="ll-switch" data-toggle="grid"></div></div>
      <div class="ll-tweak-row"><span class="ll-tweak-label">Dot matrix</span><div class="ll-switch" data-toggle="dots"></div></div>
      <div class="ll-tweak-row"><span class="ll-tweak-label">Particle network</span><div class="ll-switch" data-toggle="network"></div></div>
      <div class="ll-tweak-row"><span class="ll-tweak-label">Data rails</span><div class="ll-switch" data-toggle="rails"></div></div>
      <div class="ll-tweak-row"><span class="ll-tweak-label">Mouse spotlight</span><div class="ll-switch" data-toggle="spotlight"></div></div>
    </div>

    <div class="ll-tweaks-foot">
      Live preview — settings save automatically.
      <br><button type="button" data-action="reset">Reset to defaults</button>
    </div>
  `;
  document.body.appendChild(panel);

  function refreshPanel() {
    panel.querySelectorAll('[data-toggle]').forEach(el => {
      const key = el.dataset.toggle;
      el.classList.toggle('on', !!cfg[key]);
    });
    panel.querySelectorAll('[data-slider]').forEach(el => {
      const key = el.dataset.slider;
      el.value = cfg[key];
    });
  }
  refreshPanel();

  toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  panel.addEventListener('click', (e) => {
    const tgt = e.target;
    if (tgt.dataset.action === 'close') {
      panel.classList.remove('open');
      return;
    }
    if (tgt.dataset.action === 'reset') {
      cfg = { ...DEFAULTS };
      applyConfig();
      refreshPanel();
      initParticles();
      return;
    }
    const t = tgt.closest('[data-toggle]');
    if (t) {
      const key = t.dataset.toggle;
      cfg[key] = !cfg[key];
      t.classList.toggle('on', cfg[key]);
      applyConfig();
      if (key === 'network') initParticles();
    }
  });

  panel.addEventListener('input', (e) => {
    const s = e.target.closest('[data-slider]');
    if (!s) return;
    const key = s.dataset.slider;
    cfg[key] = parseFloat(s.value);
    applyConfig();
    if (key === 'intensity') initParticles();
  });

  // Pause animation when tab is hidden (battery friendly)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) { cancelAnimationFrame(animId); animId = null; }
    } else if (!animId && !reduceMotion) {
      tick();
    }
  });

})();
