import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme, radius} from '../lib/theme';
import {easeOut, easeIn} from '../lib/anim';
import {SCENES} from '../lib/timing';
import {demoData} from '../data/config';
import {Stars} from './ui';

const SCREEN_PAD = 14;

/** Opacity envelope for a screen active in [a,b) with `cf`-frame crossfades. */
const win = (frame: number, a: number, b: number, cf = 10) => {
  if (frame < a - cf || frame > b + cf) return 0;
  const fin = interpolate(frame, [a - cf, a + cf], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fout = interpolate(frame, [b - cf, b + cf], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return Math.min(fin, fout);
};

const ScreenWrap: React.FC<{op: number; children: React.ReactNode; style?: React.CSSProperties}> = ({op, children, style}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      borderRadius: 46,
      overflow: 'hidden',
      opacity: op,
      transform: `scale(${interpolate(op, [0, 1], [1.05, 1])})`,
      filter: op < 0.98 ? `blur(${interpolate(op, [0, 1], [7, 0])}px)` : 'none',
      ...style,
    }}
  >
    {children}
  </div>
);

/* ---------- individual screens ---------- */

const Lock: React.FC<{lf: number}> = ({lf}) => {
  const noteOp = interpolate(lf, [70, 100], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const noteY = interpolate(lf, [70, 100], [44, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  return (
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, #0E1626, #070B12 70%)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 120}}>
      <div style={{fontFamily: theme.fonts.body, color: '#C7D3DE', fontSize: 26, fontWeight: 600}}>Thursday 19 June</div>
      <div style={{fontFamily: theme.fonts.display, color: '#fff', fontSize: 120, letterSpacing: -2, lineHeight: 1, marginTop: 2}}>14:32</div>
      <div style={{position: 'absolute', left: 22, right: 22, bottom: 150, background: 'rgba(30,36,46,0.72)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 26, padding: '22px 24px', display: 'flex', gap: 16, opacity: noteOp, transform: `translateY(${noteY}px)`}}>
        <div style={{width: 46, height: 46, borderRadius: 12, background: theme.grad, flex: '0 0 46px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="#fff" strokeWidth={2}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
        </div>
        <div>
          <div style={{fontSize: 20, fontWeight: 700, color: '#fff', display: 'flex', justifyContent: 'space-between'}}>{demoData.brand.name} <span style={{fontWeight: 500, color: '#9FB0BF', fontSize: 16}}>now</span></div>
          <div style={{fontSize: 19, color: '#D6E0E9', marginTop: 5}}>New customer · incoming — <b>Answered by your AI</b></div>
          <div style={{marginTop: 12, fontSize: 16, fontWeight: 700, color: theme.cyan}}>● mobile · handled for you</div>
        </div>
      </div>
    </div>
  );
};

const Bubble: React.FC<{m: {from: string; text: string; time?: string}; show: number}> = ({m, show}) => {
  const op = interpolate(show, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const y = interpolate(show, [0, 12], [18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const s = interpolate(show, [0, 14], [0.92, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const ai = m.from === 'ai';
  return (
    <div
      style={{
        alignSelf: ai ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        padding: '16px 20px',
        fontSize: 22,
        lineHeight: 1.32,
        fontWeight: 500,
        color: '#fff',
        background: ai ? theme.imsg : theme.recv,
        borderRadius: ai ? '22px 22px 6px 22px' : '22px 22px 22px 6px',
        opacity: op,
        transform: `translateY(${y}px) scale(${s})`,
      }}
    >
      {m.text}
      {m.time && <span style={{display: 'block', fontSize: 14, opacity: 0.7, marginTop: 6, textAlign: 'right'}}>{m.time}</span>}
    </div>
  );
};

/** iMessage thread. Bubbles reveal across receptionist+qualify windows. */
const Thread: React.FC<{lf: number}> = ({lf}) => {
  const msgs = demoData.conversation;
  // reveal one bubble roughly every 55 frames, first at lf~30
  return (
    <div style={{position: 'absolute', inset: 0, background: '#000', display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '74px 20px 16px', borderBottom: '1px solid #1A1A1C', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'rgba(20,20,22,0.9)'}}>
        <div style={{width: 70, height: 70, borderRadius: '50%', background: theme.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(59,156,245,0.5)'}}>
          <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="#fff" strokeWidth={2}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
        </div>
        <div style={{fontSize: 24, fontWeight: 700, color: '#fff'}}>New customer</div>
        <div style={{fontSize: 17, color: theme.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7}}>
          <span style={{width: 9, height: 9, borderRadius: '50%', background: theme.green, boxShadow: '0 0 9px rgba(52,199,89,0.9)'}} />Answered by your AI
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 14, padding: '26px 22px', justifyContent: 'flex-end', overflow: 'hidden'}}>
        {msgs.map((m, i) => (
          <Bubble key={i} m={m} show={lf - (30 + i * 55)} />
        ))}
      </div>
    </div>
  );
};

const Row: React.FC<{k: string; v: string; show: number; val?: boolean}> = ({k, v, show, val}) => {
  const op = interpolate(show, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const x = interpolate(show, [0, 12], [22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid rgba(28,42,54,0.7)', opacity: op, transform: `translateX(${x}px)`}}>
      <span style={{fontSize: 19, color: theme.muted, fontWeight: 600}}>{k}</span>
      <span style={{fontSize: 22, fontWeight: 700, textAlign: 'right', ...(val ? theme.gradText : {color: '#fff'})}}>{v}</span>
    </div>
  );
};

const Summary: React.FC<{lf: number}> = ({lf}) => {
  const L = demoData.lead;
  return (
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0B121C,#070B12)', padding: '74px 22px 24px', display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20}}>
        <div style={{width: 52, height: 52, borderRadius: 13, background: theme.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(59,156,245,0.5)'}}>
          <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="#fff" strokeWidth={2}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 8l9 6 9-6" /></svg>
        </div>
        <div>
          <div style={{fontSize: 23, fontWeight: 700, color: '#fff'}}>New qualified lead</div>
          <div style={{fontSize: 16, color: theme.muted, fontWeight: 500}}>Sent to you · just now</div>
        </div>
      </div>
      <div style={{background: theme.surface2, border: `1px solid ${theme.line}`, borderRadius: 22, padding: '8px 22px'}}>
        <Row k="Customer" v={L.customerName} show={lf - 20} />
        <Row k="Job" v={`${L.product} · ${L.location}`} show={lf - 32} />
        <Row k="Lead quality" v={L.quality} show={lf - 44} />
        <Row k="Est. value" v={L.estimatedValue} show={lf - 56} val />
        <Row k="Next step" v={`Call back ${L.callback.toLowerCase()}`} show={lf - 68} />
      </div>
      <div style={{marginTop: 16, fontSize: 17, color: theme.muted, fontWeight: 600, textAlign: 'center'}}>Delivered by SMS · WhatsApp · email</div>
    </div>
  );
};

const Booking: React.FC<{lf: number}> = ({lf}) => {
  const times = ['09:00', '11:00', '14:00', '16:30'];
  const bookedIdx = 2;
  return (
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0B121C,#070B12)', padding: '74px 22px 24px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 11, marginBottom: 22}}>
        <span style={{width: 9, height: 9, borderRadius: '50%', background: theme.green, boxShadow: '0 0 10px rgba(52,199,89,0.8)'}} />
        <span style={{fontWeight: 700, fontSize: 20, color: '#fff'}}>This week · <span style={{color: theme.muted}}>auto-booked</span></span>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {times.map((t, i) => {
          const booked = i === bookedIdx;
          const show = interpolate(lf - (24 + i * 10), [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
          const pop = booked ? interpolate(lf - 80, [0, 16], [0.7, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}) : 1;
          return (
            <div key={t} style={{display: 'flex', gap: 12, opacity: show, transform: `translateX(${(1 - show) * 20}px)`}}>
              <div style={{width: 56, fontSize: 15, color: theme.muted, fontWeight: 600, paddingTop: 6, textAlign: 'right'}}>{t}</div>
              {booked ? (
                <div style={{flex: 1, borderRadius: 14, padding: '16px 18px', background: theme.grad, color: '#fff', fontWeight: 700, fontSize: 18, boxShadow: '0 16px 34px rgba(59,156,245,0.45)', transform: `scale(${pop})`}}>
                  {demoData.booking.label} — {demoData.lead.customerName}
                  <div style={{fontWeight: 500, fontSize: 15, opacity: 0.92, marginTop: 3}}>{demoData.booking.slot}</div>
                </div>
              ) : (
                <div style={{flex: 1, borderRadius: 14, padding: '16px 18px', background: '#0F1620', border: `1px dashed ${theme.line}`, color: theme.muted2, fontWeight: 600, fontSize: 16}}>—</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Completed: React.FC<{lf: number}> = ({lf}) => {
  const s = interpolate(lf - 20, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const ring = interpolate(lf - 20, [0, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  return (
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 30%, #0C1A16, #070B12 70%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26}}>
      <div style={{position: 'relative', width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${theme.green}`, opacity: interpolate(ring, [0.6, 1], [0.8, 0]), transform: `scale(${interpolate(ring, [0, 1], [0.7, 1.5])})`}} />
        <div style={{width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(140deg,#34C759,#1E9E52)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${s})`, boxShadow: '0 0 40px rgba(52,199,89,0.5)'}}>
          <svg viewBox="0 0 24 24" width={64} height={64} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      </div>
      <div style={{fontFamily: theme.fonts.display, fontSize: 34, fontWeight: 700, color: '#fff', opacity: s}}>Job completed</div>
      <div style={{fontSize: 20, color: theme.muted, opacity: s, textAlign: 'center', padding: '0 30px'}}>{demoData.lead.service}</div>
    </div>
  );
};

const ReviewReq: React.FC<{lf: number}> = ({lf}) => {
  return (
    <div style={{position: 'absolute', inset: 0, background: '#000', display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '74px 20px 16px', borderBottom: '1px solid #1A1A1C', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(20,20,22,0.9)'}}>
        <div style={{width: 52, height: 52, borderRadius: '50%', background: theme.grad}} />
        <div>
          <div style={{fontSize: 22, fontWeight: 700, color: '#fff'}}>{demoData.lead.customerName}</div>
          <div style={{fontSize: 15, color: theme.muted}}>Review request · auto</div>
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 14, padding: '26px 22px', justifyContent: 'flex-start'}}>
        <Bubble m={{from: 'ai', text: 'Thanks again! If you were happy, a quick Google review really helps 🙏', time: 'Auto · on-brand'}} show={lf - 24} />
        <div style={{alignSelf: 'flex-end', background: theme.imsg, borderRadius: '22px 22px 6px 22px', padding: '14px 18px', opacity: interpolate(lf - 60, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          <div style={{fontSize: 18, color: '#fff', fontWeight: 600, marginBottom: 8}}>★ Leave a review</div>
          <div style={{fontSize: 15, color: 'rgba(255,255,255,0.85)'}}>g.page/leadaline-review</div>
        </div>
        <div style={{marginTop: 8, background: theme.surface2, border: `1px solid ${theme.line}`, borderRadius: 20, padding: 20, opacity: interpolate(lf - 120, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(lf - 120, [0, 14], [16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
          <Stars count={demoData.review.stars} localFrame={lf - 130} size={30} />
          <div style={{fontSize: 20, color: '#fff', fontWeight: 600, marginTop: 12, lineHeight: 1.35}}>{demoData.review.text}</div>
        </div>
      </div>
    </div>
  );
};

/** Persistent phone stage — floats, flies in/out for the device-swap moments. */
export const PhoneStage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // container transform: enter (hook), exit->dashboard (1200), re-enter (1560), exit (2460)
  const enter1 = interpolate(frame, [6, 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const exit1 = interpolate(frame, [SCENES.dashboard.start - 30, SCENES.dashboard.start], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
  const enter2 = interpolate(frame, [SCENES.booking.start - 30, SCENES.booking.start + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const exit2 = interpolate(frame, [SCENES.reviewLogged.start - 26, SCENES.reviewLogged.start], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});

  // visible in [0,1200) and [1560,2460)
  const visible = (frame < SCENES.dashboard.start ? 1 : 0) * (1 - exit1) + (frame >= SCENES.booking.start - 30 ? 1 : 0) * enter2;
  const opacity = Math.max(0, Math.min(1, (frame < SCENES.dashboard.start ? enter1 * (1 - exit1) : enter2 * (1 - exit2))));
  const tx = (1 - enter1) * 130 + exit1 * 130 + (frame >= SCENES.booking.start - 30 ? (1 - enter2) * 130 : 0);
  const rotY = (1 - enter1) * -18 + exit1 * -14;
  const blur = (1 - enter1) * 12 + exit1 * 11 + (frame >= SCENES.booking.start - 30 && frame < SCENES.booking.start + 6 ? (1 - enter2) * 11 : 0) + exit2 * 9;
  const floatY = Math.sin((frame / fps / 3.4) * Math.PI * 2) * 13;

  if (opacity <= 0.001) return null;

  return (
    <div style={{position: 'absolute', right: 210, top: '50%', transform: `translateY(-50%)`, perspective: 1700}}>
      {/* glow */}
      <div style={{position: 'absolute', left: '50%', top: '50%', width: 560, height: 960, transform: 'translate(-50%,-50%)', borderRadius: 90, background: 'radial-gradient(ellipse at center, rgba(59,156,245,0.28), rgba(122,63,240,0.16) 55%, transparent 72%)', filter: 'blur(60px)', opacity: opacity * (0.7 + 0.2 * Math.sin((frame / fps / 2.7) * Math.PI * 2))}} />
      <div
        style={{
          opacity,
          transform: `translate(${tx}px, ${floatY}px) rotateY(${rotY}deg) scale(${interpolate(exit2, [0, 1], [1, 0.92])})`,
          filter: blur > 0.1 ? `blur(${blur}px)` : 'none',
          width: 404,
          height: 850,
          borderRadius: 60,
          padding: SCREEN_PAD,
          background: 'linear-gradient(150deg,#2A2E36,#14171D 40%,#0C0E13)',
          boxShadow: '0 60px 130px rgba(0,0,0,0.7), inset 0 0 0 2px rgba(255,255,255,0.05)',
          position: 'relative',
        }}
      >
        <div style={{position: 'absolute', left: '50%', top: 22, transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 22, zIndex: 30}} />
        <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 46, overflow: 'hidden', background: '#000'}}>
          {/* status bar */}
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 60, zIndex: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 34px 0', fontSize: 19, fontWeight: 700, color: '#fff'}}>
            <span>14:32</span><span style={{fontSize: 16}}>5G ▪▪</span>
          </div>
          <ScreenWrap op={win(frame, 0, SCENES.receptionist.start)}><Lock lf={frame} /></ScreenWrap>
          <ScreenWrap op={win(frame, SCENES.receptionist.start, SCENES.ownerSummary.start)}><Thread lf={frame - SCENES.receptionist.start} /></ScreenWrap>
          <ScreenWrap op={win(frame, SCENES.ownerSummary.start, SCENES.dashboard.start)}><Summary lf={frame - SCENES.ownerSummary.start} /></ScreenWrap>
          <ScreenWrap op={win(frame, SCENES.booking.start, SCENES.completed.start)}><Booking lf={frame - SCENES.booking.start} /></ScreenWrap>
          <ScreenWrap op={win(frame, SCENES.completed.start, SCENES.reviewReq.start)}><Completed lf={frame - SCENES.completed.start} /></ScreenWrap>
          <ScreenWrap op={win(frame, SCENES.reviewReq.start, SCENES.reviewLogged.start)}><ReviewReq lf={frame - SCENES.reviewReq.start} /></ScreenWrap>
        </div>
      </div>
    </div>
  );
};
