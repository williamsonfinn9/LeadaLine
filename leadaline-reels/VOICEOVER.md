# LeadaLine Reels — Voiceover Scripts

Voiceover is **not yet baked in**. This file holds the exact VO line for every
reel so it can be generated (ElevenLabs) or recorded in one pass.

---

## Voice direction

- **Voice:** UK English, **female**, professional.
- **Tone:** calm, premium, confident — understated SaaS brand, never hype-y or salesy.
- **Pace:** measured; leave a small beat at the start (~0.3s) and a confident pause before the closing line / CTA.
- **Level:** VO sits on top of the music + SFX; duck the music ~6 dB under the voice.

### Pronunciation / style
- **LeadaLine** → "LEE-da-line" (three beats, stress on "LEE"). Never spell it out.
- **£** → "pounds". Numbers read naturally ("twelve", not "one-two").
- **24/7** → "twenty-four seven". **2am** → "two a.m." **AI** → "A.I."
- Phone number **07484 657654** → read as on-screen only; in VO say "get in touch" (don't read digits).
- Keep it British: "enquiry" (not "inquiry"), "diary", "whilst" optional.

### Recommended ElevenLabs settings (when generating)
- Model: `eleven_multilingual_v2` (or `eleven_turbo_v2_5` for speed)
- Stability ~**0.45**, Similarity ~**0.80**, Style **0**, Speaker boost **on**
- Output: `mp3_44100_128`
- Suggested voices to audition (UK female): **Alice**, **Matilda**, **Charlotte**, **Lily**, **Jessica**. Pick one and use it across ALL reels for brand consistency.

### How these get used
For each reel, save the VO as `vo/<reel-folder>.mp3`. The render pipeline will
measure the VO length, retime the reel's timeline to it, and mux **VO + SFX (ducked)**.
Most reels currently run ~8–10s; VO may push a couple slightly longer — that's expected.

---

## THEMED REELS (poster series)

**Reel 01 — Missed Call = Missed Job** (`leadaline-reel-01-missed-call`)
> A missed call is a missed job. LeadaLine replies instantly, captures the enquiry, and sends it straight to you.

**Reel 02 — Too Many Enquiries** (`leadaline-reel-02-too-many-enquiries`)
> WhatsApp, email, missed calls — enquiries everywhere. LeadaLine pulls them into one clear system, so nothing slips through.

**Reel 03 — The Customer Who Went Elsewhere** (`leadaline-reel-03-went-elsewhere`)
> While you're still meaning to reply, they've already booked someone else. LeadaLine responds in seconds — so you win the job.

**Reel 04 — Owner Summary Arrives Instantly** (`leadaline-reel-04-owner-summary`)
> Every new lead, summarised and sent to you in seconds. Name, job, urgency — clear, instant, and ready to action.

**Reel 05 — After-Hours Enquiry** (`leadaline-reel-05-after-hours`)
> Enquiries don't stop at five o'clock. LeadaLine captures, qualifies and alerts you — any hour, day or night.

**Reel 06 — AI Receptionist for Contractors** (`leadaline-reel-06-ai-receptionist`)
> Like a receptionist who never clocks off. LeadaLine answers every enquiry, captures the details, and never misses a lead.

**Reel 07 — The Quote Follow-Up Problem** (`leadaline-reel-07-quote-followup`)
> Most quotes go cold because no one follows up. LeadaLine chases every one automatically — and turns them into booked work.

**Reel 08 — See Everything, Grow Faster** (`leadaline-reel-08-see-everything`)
> See where your leads come from, how fast you respond, and what converts. Data that helps you make more money.

**Reel 09 — Morning Rush** (`leadaline-reel-09-morning-rush`)
> Six enquiries before your first coffee. LeadaLine handles them all — ranked, qualified and ready — while you get on with the work.

**Reel 10 — Free Tailored Demo** (`leadaline-reel-10-free-demo`)
> See it built for your business. We'll set up a free, tailored demo — get in touch and we'll show you how it works.

---

## CHAT-THREAD REELS (sparse VO — let the conversation read on screen)

*Open line lands over the hook; close line lands over the end card. Stay quiet during the messages.*

**A1 — After-Hours Chat** (`leadaline-reelA1-afterhours-chat`)
> **Open:** It's nearly ten at night — and a customer needs help.
> **Close:** LeadaLine booked the job while you slept. Because the first to reply wins. Book your free demo.

**A2 — Missed Call Text-Back** (`leadaline-reelA2-missed-call-textback`)
> **Open:** You missed their call — but the job isn't lost.
> **Close:** LeadaLine texts back instantly and captures the lead. Most missed callers never try again — so don't let them. Book your free demo.

**A3 — First to Reply Wins** (`leadaline-reelA3-first-to-reply`)
> **Open:** Two tradesmen. One customer.
> **Close:** They booked with the one who replied first. Make sure that's you. Book your free demo.

**A4 — Quote Follow-Up** (`leadaline-reelA4-quote-followup`)
> **Open:** Quote sent... then silence.
> **Close:** A quick follow-up brought them back. Most jobs are won on the follow-up. Book your free demo.

**A5 — Smart Qualifying** (`leadaline-reelA5-smart-qualifying`)
> **Open:** Not every enquiry is ready to book.
> **Close:** LeadaLine qualifies each one before it reaches you. Real leads, not time-wasters. Book your free demo.

---

## SERVICE REELS (one per service)

**Svc 01 — AI Lead Engine** (`leadaline-svc01-lead-engine`)
> Meet the AI Lead Engine. It captures every enquiry, replies instantly, qualifies the lead, books the job, and keeps you in the loop. Capture and convert — automatically.

**Svc 02 — AI Receptionist** (`leadaline-svc02-receptionist`)
> An AI receptionist that never clocks off. It answers every enquiry, day or night — so you never miss another lead.

**Svc 03 — AI Sales Assistant** (`leadaline-svc03-sales-assistant`)
> Not every enquiry is worth your time. The AI Sales Assistant qualifies each one, so you focus on the serious buyers.

**Svc 04 — AI Booking Assistant** (`leadaline-svc04-booking-assistant`)
> Stop playing phone-tag to book a job. The AI Booking Assistant fills your diary and sends confirmations — no back-and-forth.

**Svc 05 — AI Follow-Up Assistant** (`leadaline-svc05-followup-assistant`)
> Quiet leads aren't dead leads. The AI Follow-Up Assistant chases every quote and enquiry — turning more of them into customers.

**Svc 06 — AI Calling Assistant** (`leadaline-svc06-calling-assistant`)
> When a warm lead comes in, the AI Calling Assistant rings them within minutes, qualifies, and books. Warm enquiries only — never cold calling.

**Svc 07 — AI Admin Assistant** (`leadaline-svc07-admin-assistant`)
> Spend less time on paperwork. The AI Admin Assistant logs, updates and organises every lead — so your office runs itself.

**Svc 08 — AI Reporting Assistant** (`leadaline-svc08-reporting-assistant`)
> Know exactly how your leads are performing. The AI Reporting Assistant sends clear weekly summaries, straight to your inbox.

**Svc 09 — Missed Call Recovery** (`leadaline-svc09-missed-call-recovery`)
> Missed a call? We text back instantly, capture the enquiry, and notify you — turning missed calls into booked jobs.

**Svc 10 — Website Lead Capture** (`leadaline-svc10-website-capture`)
> Turn website visitors into qualified enquiries. Smart forms capture and qualify every lead, then send it straight to you.

**Svc 11 — CRM & Lead Tracking** (`leadaline-svc11-crm-tracking`)
> Every enquiry, tracked from first contact to won. Complete visibility of your pipeline — so nothing gets forgotten.

**Svc 12 — Full AI Office Team** (`leadaline-svc12-office-team`)
> Imagine a full front office that never sleeps. Receptionist, sales, booking, follow-up and reporting — all powered by A.I. Capture and convert more, with less admin.

---

*All copy is British English. Stats used in the chat reels are modest, industry-typical
figures (e.g. "first to reply wins", "most jobs won on the follow-up"), not specific client claims.*
