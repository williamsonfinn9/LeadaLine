<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Office Team — LeadaLine</title>
  <meta name="description" content="Meet the AI Employees that help service businesses answer enquiries, qualify customers, book work, follow up leads, update the CRM and track performance.">
  <meta property="og:title" content="AI Office Team — LeadaLine">
  <meta property="og:description" content="LeadaLine installs modular AI Employees that work together inside your service business. Meet the full AI Office Team.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.leadaline.com/how-it-works.html">
  <link rel="icon" type="image/png" href="assets/logo-mark.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/bg-fx.css">
  <style>
  /* ── Page-specific styles ── */

  /* Hero */
  .hiw-hero { padding: 80px 0 56px; text-align: center; }
  .hiw-hero h1 { font-size: clamp(2rem,5vw,3.2rem); font-weight: 900; line-height: 1.15; margin-bottom: 18px; }
  .hiw-hero p  { font-size: 1.05rem; color: var(--text-secondary); max-width: 640px; margin: 0 auto 32px; line-height: 1.7; }
  .hiw-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

  /* Trust strip */
  .trust-strip { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 24px; margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--border); }
  .trust-item { display: flex; align-items: center; gap: 7px; font-size: 0.82rem; color: var(--text-muted); font-weight: 500; }
  .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--grad-primary); flex-shrink: 0; }

  /* AI Employee cards */
  .emp-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  @media (max-width: 980px) { .emp-cards-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .emp-cards-grid { grid-template-columns: 1fr; } }

  .emp-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px;
    display: flex; flex-direction: column;
    transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
  }
  .emp-card:hover { transform: translateY(-4px); border-color: var(--border-accent); box-shadow: 0 20px 50px rgba(37,99,235,0.09); }
  .emp-card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .emp-card-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .emp-card-icon svg { width: 18px; height: 18px; }
  .emp-card-role { font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 100px; margin-left: auto; }
  .ec-cyan   { background: rgba(37,99,235,0.12);  color: #2563eb; border: 1px solid rgba(37,99,235,0.28); }
  .ec-blue   { background: rgba(67,120,230,0.12); color: #2563EB; border: 1px solid rgba(67,120,230,0.28); }
  .ec-green  { background: rgba(34,197,94,0.12);  color: #15803d; border: 1px solid rgba(34,197,94,0.28); }
  .ec-purple { background: rgba(124,58,237,0.14); color: #7C3AED; border: 1px solid rgba(124,58,237,0.30); }
  .emp-card-title { font-size: 1.05rem; font-weight: 750; margin-bottom: 8px; color: var(--text-primary); }
  .emp-card-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; flex-grow: 1; }
  .emp-card-handles { display: flex; flex-direction: column; gap: 5px; margin-bottom: 16px; }
  .emp-card-handle { font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px; }
  .emp-card-handle::before { content:""; width:5px; height:5px; border-radius:50%; background: var(--grad-primary); flex-shrink:0; }
  .emp-card-outcome { margin-top: auto; padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.78rem; line-height: 1.45; }
  .emp-card-outcome strong { display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }

  /* One team flow */
  .one-team-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  @media (max-width: 860px) { .one-team-layout { grid-template-columns: 1fr; gap: 36px; } }
  .flow-chain { display: flex; flex-direction: column; gap: 0; }
  .flow-node { display: grid; grid-template-columns: 40px 1fr; gap: 14px; align-items: center; }
  .flow-node-circle {
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--bg-card); border: 1.5px solid rgba(37,99,235,0.30);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 800; color: #2563eb;
    flex-shrink: 0; z-index: 1; position: relative;
  }
  .flow-node-circle.start { background: linear-gradient(135deg, rgba(37,99,235,0.25), rgba(67,120,230,0.20)); border-color: rgba(37,99,235,0.55); }
  .flow-node-circle.end   { background: linear-gradient(135deg, rgba(34,197,94,0.25), rgba(37,99,235,0.15)); border-color: rgba(34,197,94,0.55); color: #15803d; }
  .flow-node-label { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
  .flow-node-sub   { font-size: 0.76rem; color: var(--text-muted); }
  .flow-connector { display: flex; align-items: center; padding: 4px 0 4px 20px; }
  .flow-connector-line { width: 1.5px; height: 22px; background: linear-gradient(180deg, rgba(37,99,235,0.4), rgba(37,99,235,0.15)); margin-left: 0; }
  .one-team-copy h3 { font-size: 1.6rem; font-weight: 800; line-height: 1.25; margin-bottom: 18px; }
  .one-team-copy p  { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 14px; }
  .one-team-copy .callout { padding: 16px 18px; background: rgba(37,99,235,0.06); border: 1px solid rgba(37,99,235,0.22); border-radius: var(--radius-md); font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }
  .one-team-copy .callout strong { color: var(--text-primary); }

  /* Build steps */
  .build-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
  @media (max-width: 1000px) { .build-steps { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px)  { .build-steps { grid-template-columns: 1fr; } }
  .build-step { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 22px 20px; transition: transform .2s ease, border-color .2s; }
  .build-step:hover { transform: translateY(-3px); border-color: var(--border-accent); }
  .build-step-num { width: 38px; height: 38px; border-radius: 10px; background: var(--grad-primary); color: #ffffff; font-weight: 800; font-size: 1rem; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
  .build-step-title { font-size: 1rem; font-weight: 700; margin-bottom: 7px; color: var(--text-primary); }
  .build-step-text  { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }

  /* Package cards */
  .package-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  @media (max-width: 900px) { .package-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; } }
  .package-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px 24px; position: relative; display: flex; flex-direction: column; }
  .package-card.featured { border-color: rgba(37,99,235,0.40); box-shadow: 0 20px 50px rgba(37,99,235,0.10); }
  .package-badge { display: inline-block; font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 100px; background: var(--grad-primary); color: #ffffff; margin-bottom: 14px; }
  .package-name  { font-size: 1.3rem; font-weight: 850; margin-bottom: 6px; color: var(--text-primary); }
  .package-desc  { font-size: 0.85rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 20px; }
  .package-includes { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; flex-grow: 1; }
  .package-item { display: flex; align-items: center; gap: 9px; font-size: 0.85rem; color: var(--text-secondary); }
  .package-item svg { width: 14px; height: 14px; flex-shrink: 0; color: #2563eb; }
  .package-best { margin-top: auto; padding: 10px 12px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 0.78rem; color: var(--text-muted); }
  .package-best strong { color: var(--text-secondary); font-weight: 600; }

  /* Portal preview */
  .portal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
  @media (max-width: 860px) { .portal-grid { grid-template-columns: 1fr; gap: 32px; } }
  .portal-copy h3 { font-size: 1.7rem; font-weight: 850; line-height: 1.25; margin-bottom: 16px; }
  .portal-copy p  { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 14px; }
  .portal-copy .portal-note { font-size: 0.82rem; color: var(--text-muted); font-style: italic; }
  .portal-mock { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .portal-mock-bar { display: flex; align-items: center; gap: 7px; padding: 12px 16px; background: var(--bg-surface); border-bottom: 1px solid var(--border); }
  .portal-mock-dot { width: 8px; height: 8px; border-radius: 50%; }
  .portal-mock-dot:nth-child(1) { background: #ef4444; }
  .portal-mock-dot:nth-child(2) { background: #f59e0b; }
  .portal-mock-dot:nth-child(3) { background: #22c55e; }
  .portal-mock-title { font-size: 0.72rem; color: var(--text-muted); margin-left: 6px; }
  .portal-mock-live { margin-left: auto; font-size: 0.65rem; font-weight: 700; color: #15803d; display: flex; align-items: center; gap: 5px; }
  .portal-mock-live::before { content:""; width:6px; height:6px; border-radius:50%; background:#22c55e; box-shadow:0 0 6px #22c55e; }
  .portal-mock-body { padding: 18px; }
  .portal-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
  .portal-stat { text-align: center; padding: 12px 8px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); }
  .portal-stat-n { font-size: 1.5rem; font-weight: 850; background: var(--grad-primary); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1.1; }
  .portal-stat-l { font-size: 0.66rem; color: var(--text-muted); margin-top: 3px; }
  .portal-activity { display: flex; flex-direction: column; gap: 7px; }
  .portal-act-row { display: flex; align-items: center; gap: 10px; padding: 9px 12px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-sm); }
  .portal-act-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .portal-act-text { font-size: 0.78rem; color: var(--text-secondary); flex-grow: 1; }
  .portal-act-time { font-size: 0.68rem; color: var(--text-muted); }
  .portal-act-status { font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 100px; }
  .pas-new  { background: rgba(37,99,235,0.14); color: #2563eb; border: 1px solid rgba(37,99,235,0.30); }
  .pas-hot  { background: rgba(239,68,68,0.14);  color: #dc2626; border: 1px solid rgba(239,68,68,0.30); }
  .pas-book { background: rgba(34,197,94,0.14);  color: #15803d; border: 1px solid rgba(34,197,94,0.30); }
  .pas-fup  { background: rgba(245,158,11,0.14); color: #b45309; border: 1px solid rgba(245,158,11,0.30); }

  /* Benefit cards */
  .benefit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  @media (max-width: 900px) { .benefit-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .benefit-grid { grid-template-columns: 1fr; } }
  .benefit-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 22px; }
  .benefit-icon { width: 40px; height: 40px; border-radius: 11px; background: rgba(37,99,235,0.10); color: #2563eb; border: 1px solid rgba(37,99,235,0.25); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .benefit-icon svg { width: 20px; height: 20px; }
  .benefit-title { font-size: 1rem; font-weight: 750; margin-bottom: 8px; color: var(--text-primary); }
  .benefit-text  { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }
  </style>
</head>
<body>

<nav class="nav" id="mainNav">
  <div class="container nav-inner">
    <a href="index.html" class="nav-logo" aria-label="LeadaLine home">
      <img src="assets/logo-wordmark-dark.png" alt="LeadaLine" class="nav-logo-img">
    </a>
    <ul class="nav-links" role="list" aria-label="Main navigation">
      <li><a href="index.html" class="nav-link">Home</a></li>
      <li><a href="demo.html" class="nav-link">Live Demo</a></li>
      <li><a href="how-it-works.html" class="nav-link active">AI Office Team</a></li>
      <li><a href="what-you-get.html" class="nav-link">Client Portal</a></li>
      <li><a href="pricing.html" class="nav-link">Pricing</a></li>
      <li><a href="faq.html" class="nav-link">FAQ</a></li>
    </ul>
    <div class="nav-ctas">
      <a href="client-login.html" class="btn btn-sm" style="background:linear-gradient(135deg,rgba(37,99,235,0.15),rgba(124,58,237,0.15));border:1px solid rgba(37,99,235,0.35);color:#2563eb;gap:6px;display:inline-flex;align-items:center">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Client Portal
      </a>
      <a href="book-a-demo.html" class="btn btn-primary btn-sm">Book a Demo</a>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="Open navigation menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav class="nav-mobile" id="navMobile" aria-label="Mobile navigation">
    <ul class="nav-mobile-links" role="list">
      <li><a href="index.html">Home</a></li>
      <li><a href="demo.html">Live Demo</a></li>
      <li><a href="how-it-works.html">AI Office Team</a></li>
      <li><a href="what-you-get.html">Client Portal</a></li>
      <li><a href="pricing.html">Pricing</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
    <div class="nav-mobile-ctas">
      <a href="what-you-get.html" class="btn btn-outline btn-full">Client Portal</a>
      <a href="book-a-demo.html" class="btn btn-primary btn-full">Book a Demo</a>
    </div>
  </nav>
</nav>

<div class="page-wrapper">

  <!-- BACKGROUND DECOR -->
  <div class="page-decor" aria-hidden="true">
    <div class="orb orb-xl orb-cyan orb-f2" style="top:-120px;right:-200px;opacity:0.4"></div>
    <div class="orb orb-lg orb-purple orb-f1" style="top:40%;left:-180px;opacity:0.35"></div>
    <div class="orb orb-md orb-blue orb-f3" style="bottom:15%;right:10%;opacity:0.3"></div>
  </div>

  <!-- ══ HERO ══ -->
  <section class="hiw-hero bg-grid">
    <div class="container">
      <span class="section-badge" style="display:inline-flex;margin-bottom:20px">
        <span class="pulse-dot" aria-hidden="true"></span>
        AI Office Team
      </span>
      <h1>Meet Your <span class="text-gradient">AI Office Team</span></h1>
      <p>LeadaLine installs modular AI Employees that answer enquiries, qualify customers, book work, follow up opportunities, update your CRM and show clear reporting — all working together inside one connected system.</p>
      <div class="hiw-hero-btns">
        <a href="book-a-demo.html" class="btn btn-primary btn-lg">Book a Demo</a>
        <a href="demo.html" class="btn btn-outline btn-lg">Try the Live Demo</a>
      </div>
      <div class="trust-strip">
        <div class="trust-item"><span class="trust-dot"></span>Built for UK service businesses</div>
        <div class="trust-item"><span class="trust-dot"></span>Modular AI Employees</div>
        <div class="trust-item"><span class="trust-dot"></span>Connected CRM dashboard</div>
        <div class="trust-item"><span class="trust-dot"></span>Founder-led setup</div>
        <div class="trust-item"><span class="trust-dot"></span>Launch-ready in 7–14 days</div>
      </div>
    </div>
  </section>

  <!-- ══ SECTION 1 — THE AI EMPLOYEES ══ -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">The team</span>
        <h2 class="section-title">The AI Employees <span class="text-gradient">inside your business</span></h2>
        <p class="section-subtitle">Start with the core team, then add more AI Employees as your business needs them. Each one handles a different part of your operation.</p>
      </div>

      <div class="emp-cards-grid">

        <!-- AI Receptionist -->
        <article class="emp-card">
          <div class="emp-card-top">
            <div class="emp-card-icon ec-cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <span class="emp-card-role ec-cyan">AI Receptionist</span>
          </div>
          <h3 class="emp-card-title">Answers enquiries 24/7</h3>
          <p class="emp-card-desc">Answers calls, website enquiries, WhatsApp messages and common questions around the clock — so customers are never left waiting.</p>
          <div class="emp-card-handles">
            <div class="emp-card-handle">Missed calls and after-hours enquiries</div>
            <div class="emp-card-handle">Website chat and contact forms</div>
            <div class="emp-card-handle">Common questions and FAQs</div>
            <div class="emp-card-handle">First customer response</div>
            <div class="emp-card-handle">Capturing name, phone, service and urgency</div>
          </div>
          <div class="emp-card-outcome ec-cyan" style="background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.20)">
            <strong style="color:#2563eb">Business outcome</strong>
            Customers get a fast response instead of moving to a competitor.
          </div>
        </article>

        <!-- AI Sales Assistant -->
        <article class="emp-card">
          <div class="emp-card-top">
            <div class="emp-card-icon ec-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>
            </div>
            <span class="emp-card-role ec-blue">AI Sales Assistant</span>
          </div>
          <h3 class="emp-card-title">Qualifies every lead</h3>
          <p class="emp-card-desc">Asks the right questions, identifies urgency and recommends the next best action — so you always know which enquiries matter most.</p>
          <div class="emp-card-handles">
            <div class="emp-card-handle">Lead qualification and scoring</div>
            <div class="emp-card-handle">Service type and requirements</div>
            <div class="emp-card-handle">Urgency and priority assessment</div>
            <div class="emp-card-handle">Customer requirements</div>
            <div class="emp-card-handle">Recommended next action for the owner</div>
          </div>
          <div class="emp-card-outcome ec-blue" style="background:rgba(67,120,230,0.06);border:1px solid rgba(67,120,230,0.20)">
            <strong style="color:#1d4ed8">Business outcome</strong>
            The owner knows which enquiries are worth prioritising.
          </div>
        </article>

        <!-- AI Booking Assistant -->
        <article class="emp-card">
          <div class="emp-card-top">
            <div class="emp-card-icon ec-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><polyline points="9 15 11 17 15 13"/></svg>
            </div>
            <span class="emp-card-role ec-green">AI Booking Assistant</span>
          </div>
          <h3 class="emp-card-title">Fills your diary automatically</h3>
          <p class="emp-card-desc">Helps arrange appointments, quote visits, consultations and jobs — collecting availability and confirming the next step with the customer.</p>
          <div class="emp-card-handles">
            <div class="emp-card-handle">Preferred date and time collection</div>
            <div class="emp-card-handle">Appointment and quote requests</div>
            <div class="emp-card-handle">Confirmation messages to the customer</div>
            <div class="emp-card-handle">Booking notes and details</div>
            <div class="emp-card-handle">Calendar handoff where enabled</div>
          </div>
          <div class="emp-card-outcome ec-green" style="background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.20)">
            <strong style="color:#15803d">Business outcome</strong>
            Less back-and-forth and more booked appointments.
          </div>
        </article>

        <!-- AI Follow-Up Assistant -->
        <article class="emp-card">
          <div class="emp-card-top">
            <div class="emp-card-icon ec-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.46"/></svg>
            </div>
            <span class="emp-card-role ec-purple">AI Follow-Up</span>
          </div>
          <h3 class="emp-card-title">Chases warm leads automatically</h3>
          <p class="emp-card-desc">Chases warm leads, quote requests and stale opportunities so potential jobs are not forgotten while you're busy on site.</p>
          <div class="emp-card-handles">
            <div class="emp-card-handle">Quote follow-ups sent automatically</div>
            <div class="emp-card-handle">Warm lead reminders</div>
            <div class="emp-card-handle">Customer reply handling</div>
            <div class="emp-card-handle">Re-engagement messages</div>
            <div class="emp-card-handle">CRM status updates</div>
          </div>
          <div class="emp-card-outcome ec-purple" style="background:rgba(124,58,237,0.06);border:1px solid rgba(124,58,237,0.22)">
            <strong style="color:#7c3aed">Business outcome</strong>
            More opportunities recovered without the owner manually chasing.
          </div>
        </article>

        <!-- AI Admin Assistant -->
        <article class="emp-card">
          <div class="emp-card-top">
            <div class="emp-card-icon ec-cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
            </div>
            <span class="emp-card-role ec-cyan">AI Admin Assistant</span>
          </div>
          <h3 class="emp-card-title">Keeps your pipeline organised</h3>
          <p class="emp-card-desc">Updates the CRM, sends owner summaries and keeps the lead pipeline organised — without you touching a spreadsheet or inbox.</p>
          <div class="emp-card-handles">
            <div class="emp-card-handle">CRM updates and data entry</div>
            <div class="emp-card-handle">Lead status and category management</div>
            <div class="emp-card-handle">Owner summaries via SMS and email</div>
            <div class="emp-card-handle">Notes, tags and next actions</div>
            <div class="emp-card-handle">Pipeline organisation and housekeeping</div>
          </div>
          <div class="emp-card-outcome ec-cyan" style="background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.20)">
            <strong style="color:#2563eb">Business outcome</strong>
            Less admin and fewer leads lost in inboxes or spreadsheets.
          </div>
        </article>

        <!-- AI Reporting Assistant -->
        <article class="emp-card">
          <div class="emp-card-top">
            <div class="emp-card-icon ec-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </div>
            <span class="emp-card-role ec-blue">AI Reporting</span>
          </div>
          <h3 class="emp-card-title">Shows you what is working</h3>
          <p class="emp-card-desc">Turns lead activity into simple weekly and monthly summaries — so you know where opportunities are being won and where they are being lost.</p>
          <div class="emp-card-handles">
            <div class="emp-card-handle">Leads captured and qualified</div>
            <div class="emp-card-handle">Booked jobs and follow-ups needed</div>
            <div class="emp-card-handle">Missed opportunities flagged</div>
            <div class="emp-card-handle">Response times and conversion rates</div>
            <div class="emp-card-handle">Recommended improvements</div>
          </div>
          <div class="emp-card-outcome ec-blue" style="background:rgba(67,120,230,0.06);border:1px solid rgba(67,120,230,0.20)">
            <strong style="color:#1d4ed8">Business outcome</strong>
            The owner gets full visibility without digging through data.
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- ══ SECTION 2 — ONE TEAM ══ -->
  <section class="section bg-surface">
    <div class="container">
      <div class="one-team-layout">

        <!-- Flow chain -->
        <div class="flow-chain" aria-label="AI Office Team workflow">
          <div class="flow-node">
            <div class="flow-node-circle start">→</div>
            <div><div class="flow-node-label">Customer enquiry arrives</div><div class="flow-node-sub">Call, website, form, WhatsApp</div></div>
          </div>
          <div class="flow-connector"><div class="flow-connector-line"></div></div>
          <div class="flow-node">
            <div class="flow-node-circle">R</div>
            <div><div class="flow-node-label">AI Receptionist</div><div class="flow-node-sub">Captures the enquiry</div></div>
          </div>
          <div class="flow-connector"><div class="flow-connector-line"></div></div>
          <div class="flow-node">
            <div class="flow-node-circle">S</div>
            <div><div class="flow-node-label">AI Sales Assistant</div><div class="flow-node-sub">Qualifies and scores the lead</div></div>
          </div>
          <div class="flow-connector"><div class="flow-connector-line"></div></div>
          <div class="flow-node">
            <div class="flow-node-circle">B</div>
            <div><div class="flow-node-label">AI Booking Assistant</div><div class="flow-node-sub">Arranges the next step</div></div>
          </div>
          <div class="flow-connector"><div class="flow-connector-line"></div></div>
          <div class="flow-node">
            <div class="flow-node-circle">A</div>
            <div><div class="flow-node-label">AI Admin Assistant</div><div class="flow-node-sub">Updates the CRM and notifies owner</div></div>
          </div>
          <div class="flow-connector"><div class="flow-connector-line"></div></div>
          <div class="flow-node">
            <div class="flow-node-circle">F</div>
            <div><div class="flow-node-label">AI Follow-Up Assistant</div><div class="flow-node-sub">Chases if no response</div></div>
          </div>
          <div class="flow-connector"><div class="flow-connector-line"></div></div>
          <div class="flow-node">
            <div class="flow-node-circle">Rp</div>
            <div><div class="flow-node-label">AI Reporting Assistant</div><div class="flow-node-sub">Summarises performance</div></div>
          </div>
          <div class="flow-connector"><div class="flow-connector-line"></div></div>
          <div class="flow-node">
            <div class="flow-node-circle end">✓</div>
            <div><div class="flow-node-label">Business owner</div><div class="flow-node-sub">Has a clear, clean pipeline</div></div>
          </div>
        </div>

        <!-- Copy -->
        <div class="one-team-copy">
          <span class="section-badge" style="margin-bottom:18px;display:inline-flex">One connected system</span>
          <h3>One team. <span class="text-gradient">Shared information.</span></h3>
          <p>Your AI Employees are not separate disconnected tools. They work together inside the LeadaLine Engine — each one passing information to the next.</p>
          <p>The Receptionist does not just answer the enquiry and disappear. The details are passed into the CRM, summarised for the owner, followed up where needed and included in performance reporting.</p>
          <div class="callout">
            <strong>What this means for your business:</strong> You do not get a chatbot. You get a connected lead-handling system that works whether you are on site, at dinner or asleep.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ SECTION 3 — HOW WE BUILD YOUR TEAM ══ -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Implementation</span>
        <h2 class="section-title">How we build your <span class="text-gradient">AI Office Team</span></h2>
        <p class="section-subtitle">We handle everything from understanding your business to training your AI Employees and going live — you are operational within 7–14 days, not months.</p>
      </div>

      <div class="build-steps">
        <div class="build-step">
          <div class="build-step-num">1</div>
          <h3 class="build-step-title">Discovery</h3>
          <p class="build-step-text">We understand how your business currently handles calls, website enquiries, bookings, follow-ups and admin.</p>
        </div>
        <div class="build-step">
          <div class="build-step-num">2</div>
          <h3 class="build-step-title">AI Team Design</h3>
          <p class="build-step-text">We decide which AI Employees your business actually needs based on where the biggest gaps and opportunities are.</p>
        </div>
        <div class="build-step">
          <div class="build-step-num">3</div>
          <h3 class="build-step-title">Training</h3>
          <p class="build-step-text">We train each AI Employee on your services, locations, FAQs, tone of voice, opening hours and next-step rules.</p>
        </div>
        <div class="build-step">
          <div class="build-step-num">4</div>
          <h3 class="build-step-title">System Connection</h3>
          <p class="build-step-text">We connect the AI Office Team to the right channels — website, calls, SMS, WhatsApp, CRM and calendar where needed.</p>
        </div>
        <div class="build-step">
          <div class="build-step-num">5</div>
          <h3 class="build-step-title">Testing</h3>
          <p class="build-step-text">We test the full journey — from customer enquiry through to owner summary, CRM update, follow-up and dashboard visibility.</p>
        </div>
        <div class="build-step">
          <div class="build-step-num">6</div>
          <h3 class="build-step-title">Launch</h3>
          <p class="build-step-text">Your AI Office Team goes live and starts helping with real customer enquiries from day one.</p>
        </div>
        <div class="build-step">
          <div class="build-step-num">7</div>
          <h3 class="build-step-title">Optimisation</h3>
          <p class="build-step-text">We review performance, improve how your AI Employees respond, adjust workflows and help the system become more useful over time.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ SECTION 4 — WHICH TEAM DO YOU NEED? ══ -->
  <section class="section bg-surface">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Packages</span>
        <h2 class="section-title">Which AI Office Team <span class="text-gradient">is right for you?</span></h2>
        <p class="section-subtitle">Start with the team that matches where you are today. You can add more AI Employees as your business grows.</p>
      </div>

      <div class="package-grid">

        <article class="package-card">
          <div class="package-name">Essential</div>
          <p class="package-desc">For businesses that want faster enquiry response and cleaner lead handling.</p>
          <div class="package-includes">
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>AI Receptionist</div>
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>AI Sales Assistant</div>
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>AI Admin Assistant</div>
          </div>
          <div class="package-best"><strong>Best for:</strong> Businesses that want to stop missing enquiries and keep leads organised.</div>
        </article>

        <article class="package-card featured">
          <div class="package-badge">Most popular</div>
          <div class="package-name">Growth</div>
          <p class="package-desc">For businesses that want more booked work and stronger follow-up on every opportunity.</p>
          <div class="package-includes">
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Everything in Essential</div>
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>AI Booking Assistant</div>
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>AI Follow-Up Assistant</div>
          </div>
          <div class="package-best"><strong>Best for:</strong> Businesses that receive regular quote requests, appointments or warm leads.</div>
        </article>

        <article class="package-card">
          <div class="package-name">Full AI Office Team</div>
          <p class="package-desc">For businesses that want the complete system — enquiries, follow-up, admin and performance in one place.</p>
          <div class="package-includes">
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>All 6 AI Employees</div>
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>AI Receptionist + Sales</div>
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>AI Booking + Follow-Up</div>
            <div class="package-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>AI Admin + Reporting</div>
          </div>
          <div class="package-best"><strong>Best for:</strong> Businesses that want a full AI workforce handling enquiries, follow-up, admin and visibility.</div>
        </article>

      </div>

      <div style="text-align:center;margin-top:32px">
        <a href="pricing.html" class="btn btn-outline btn-lg">View Pricing</a>
      </div>
    </div>
  </section>

  <!-- ══ SECTION 5 — CLIENT PORTAL ══ -->
  <section class="section">
    <div class="container">
      <div class="portal-grid">
        <div class="portal-copy">
          <span class="section-badge" style="margin-bottom:18px;display:inline-flex">Client Portal</span>
          <h3>Your <span class="text-gradient">Client Portal</span></h3>
          <p>Every LeadaLine client gets access to a portal where they can see lead activity, CRM pipeline and AI Office Team performance — without having to ask for updates.</p>
          <p>You can see new enquiries as they arrive, track status through the pipeline, review owner summaries and understand where opportunities are being won or lost.</p>
          <p class="portal-note">Client portal access is provided to active LeadaLine clients after onboarding. The portal is not publicly available.</p>
          <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">
            <a href="demo.html" class="btn btn-outline btn-sm">View Live Demo</a>
            <a href="client-login.html" class="btn btn-sm" style="background:linear-gradient(135deg,rgba(37,99,235,0.15),rgba(124,58,237,0.15));border:1px solid rgba(37,99,235,0.35);color:#2563eb">Client Portal</a>
          </div>
        </div>

        <!-- Portal mock -->
        <div class="portal-mock" aria-label="Example client portal preview" aria-hidden="true">
          <div class="portal-mock-bar">
            <div class="portal-mock-dot"></div><div class="portal-mock-dot"></div><div class="portal-mock-dot"></div>
            <span class="portal-mock-title">LeadaLine — Client Portal</span>
            <span class="portal-mock-live">Live</span>
          </div>
          <div class="portal-mock-body">
            <div class="portal-stats-row">
              <div class="portal-stat"><div class="portal-stat-n">18</div><div class="portal-stat-l">Leads this week</div></div>
              <div class="portal-stat"><div class="portal-stat-n">5</div><div class="portal-stat-l">Booked jobs</div></div>
              <div class="portal-stat"><div class="portal-stat-n">4</div><div class="portal-stat-l">Follow-ups due</div></div>
            </div>
            <div class="portal-activity">
              <div class="portal-act-row">
                <div class="portal-act-dot" style="background:#2563eb"></div>
                <div class="portal-act-text">James Smith — roof leak, M21</div>
                <div class="portal-act-time">09:41</div>
                <div class="portal-act-status pas-hot">Hot</div>
              </div>
              <div class="portal-act-row">
                <div class="portal-act-dot" style="background:#22c55e"></div>
                <div class="portal-act-text">Sarah Mitchell — boiler quote</div>
                <div class="portal-act-time">09:43</div>
                <div class="portal-act-status pas-book">Booked</div>
              </div>
              <div class="portal-act-row">
                <div class="portal-act-dot" style="background:#f59e0b"></div>
                <div class="portal-act-text">Dan Brennan — gutter replacement</div>
                <div class="portal-act-time">08:12</div>
                <div class="portal-act-status pas-fup">Follow-up</div>
              </div>
              <div class="portal-act-row">
                <div class="portal-act-dot" style="background:#2563eb"></div>
                <div class="portal-act-text">Leah Maddox — garden landscaping</div>
                <div class="portal-act-time">07:58</div>
                <div class="portal-act-status pas-new">New</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ SECTION 6 — WHY IT MATTERS ══ -->
  <section class="section bg-surface">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Why it matters</span>
        <h2 class="section-title">Why service businesses <span class="text-gradient">use an AI Office Team</span></h2>
        <p class="section-subtitle">Four practical improvements that happen from the moment your AI team goes live.</p>
      </div>

      <div class="benefit-grid">
        <div class="benefit-card">
          <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
          <h3 class="benefit-title">Faster response</h3>
          <p class="benefit-text">Customers get a reply while they are still interested — not the next morning when they have already moved on.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 4H6.5A1.5 1.5 0 0 0 5 5.5v15A1.5 1.5 0 0 0 6.5 22h11A1.5 1.5 0 0 0 19 20.5v-15A1.5 1.5 0 0 0 17.5 4H15"/><path d="M9 14l2 2 4-4"/></svg></div>
          <h3 class="benefit-title">Cleaner lead information</h3>
          <p class="benefit-text">Owners receive structured summaries with service, urgency and contact details — not a raw voicemail or half-completed form.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
          <h3 class="benefit-title">Less admin</h3>
          <p class="benefit-text">Leads are organised automatically instead of sitting in inboxes, notebooks or WhatsApp threads that are easy to lose.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.46"/></svg></div>
          <h3 class="benefit-title">More opportunities recovered</h3>
          <p class="benefit-text">Follow-up messages and reminders stop warm leads going cold — so jobs that would have been forgotten come back to life.</p>
        </div>
      </div>

      <p style="text-align:center;max-width:580px;margin:36px auto 0;font-size:0.9rem;color:var(--text-muted);line-height:1.7">The goal is not to replace your team. The goal is to make sure your business responds faster, follows up consistently and keeps every opportunity visible.</p>
    </div>
  </section>

  <!-- ══ FINAL CTA ══ -->
  <section class="cta-section">
    <div class="container">
      <h2 class="cta-title">Ready to build your <span class="text-gradient">AI Office Team?</span></h2>
      <p class="cta-sub">Book a demo and we'll map out which AI Employees would make the biggest difference inside your business.</p>
      <div class="btn-group" style="justify-content:center">
        <a href="book-a-demo.html" class="btn btn-primary btn-lg">Book a Demo</a>
        <a href="demo.html" class="btn btn-outline btn-lg">Try the Live Demo</a>
      </div>
    </div>
  </section>

</div>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo"><img src="assets/logo-wordmark-dark.png" alt="LeadaLine" class="nav-logo-img"></a>
        <p class="footer-tagline">AI Office Teams for UK service businesses. Answer enquiries, qualify customers, book work and keep your pipeline organised automatically.</p>
      </div>
      <div class="footer-links-col">
        <h4>Product</h4>
        <ul role="list">
          <li><a href="demo.html">Live Demo</a></li>
          <li><a href="how-it-works.html">AI Office Team</a></li>
          <li><a href="what-you-get.html">Client Portal</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="what-you-get.html">Client Portal</a></li>
        </ul>
      </div>
      <div class="footer-links-col">
        <h4>Contact</h4>
        <ul role="list" class="footer-contact">
          <li><a href="mailto:admin@leadaline.com">admin@leadaline.com</a></li>
          <li><a href="tel:+447749342966">07749 342966</a></li>
          <li><a href="tel:+447484657654">07484 657654</a></li>
        </ul>
      </div>
      <div class="footer-links-col">
        <h4>Company</h4>
        <ul role="list">
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="book-a-demo.html">Book a Demo</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LeadaLine. All rights reserved. Built for UK service businesses.</p>
      <p>LeadaLine processes enquiry data securely and in line with GDPR principles.</p>
    </div>
  </div>
</footer>

<script src="assets/js/config.js"></script>
<script src="assets/js/bg-fx.js"></script>
<script src="assets/js/main.js"></script>
<script>window.LL_TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "navX": -53,
  "logoH": 48,
  "navGap": 80
}/*EDITMODE-END*/;</script>
<script src="assets/js/leadaline-tweaks.js"></script>
</body>
</html>
