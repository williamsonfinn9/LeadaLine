import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme, radius} from '../lib/theme';
import {easeOut, easeIn} from '../lib/anim';
import {SCENES, SceneKey, panelEnvelope} from '../lib/timing';
import {demoData} from '../data/config';
import {Kinetic, Kicker, GlassCard} from '../components/ui';

/** Left-column panel wrapper: envelope opacity + entrance (blur/scale/x). */
const Panel: React.FC<{sceneKey: SceneKey; children: (lf: number) => React.ReactNode}> = ({sceneKey, children}) => {
  const frame = useCurrentFrame();
  const op = panelEnvelope(frame, sceneKey);
  if (op <= 0) return null;
  const lf = frame - SCENES[sceneKey].start;
  const inX = interpolate(lf, [0, 20], [42, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const inB = interpolate(lf, [0, 16], [8, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        top: 0,
        width: 830,
        height: 1080,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: op,
        transform: `translateX(${inX}px)`,
        filter: inB > 0.1 ? `blur(${inB}px)` : 'none',
      }}
    >
      {children(lf)}
    </div>
  );
};

const Body: React.FC<{children: React.ReactNode; lf: number; delay?: number}> = ({children, lf, delay = 24}) => {
  const op = interpolate(lf - delay, [0, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  return <p style={{fontFamily: theme.fonts.body, fontSize: 29, fontWeight: 500, lineHeight: 1.5, color: theme.muted, marginTop: 28, maxWidth: 700, opacity: op}}>{children}</p>;
};

const Points: React.FC<{items: {t: string; s: string; color: string; icon: React.ReactNode}[]; lf: number; delay?: number}> = ({items, lf, delay = 28}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 40}}>
    {items.map((it, i) => {
      const f = lf - delay - i * 8;
      const op = interpolate(f, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
      const x = interpolate(f, [0, 14], [-24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
      return (
        <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 20, opacity: op, transform: `translateX(${x}px)`}}>
          <div style={{width: 60, height: 60, flex: '0 0 60px', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.line}`, background: theme.surface}}>{it.icon}</div>
          <div>
            <div style={{fontFamily: theme.fonts.body, fontSize: 30, fontWeight: 700, color: theme.text}}>{it.t}</div>
            <div style={{fontFamily: theme.fonts.body, fontSize: 24, fontWeight: 500, color: theme.muted, marginTop: 3}}>{it.s}</div>
          </div>
        </div>
      );
    })}
  </div>
);

const Chips: React.FC<{items: string[]; lf: number; delay?: number}> = ({items, lf, delay = 30}) => (
  <div style={{display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 40, maxWidth: 720}}>
    {items.map((c, i) => {
      const f = lf - delay - i * 5;
      const s = interpolate(f, [0, 14], [0.85, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
      const op = interpolate(f, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
      return <div key={c} style={{fontFamily: theme.fonts.body, fontSize: 22, fontWeight: 600, color: theme.text, padding: '12px 22px', borderRadius: 100, border: `1px solid ${theme.line}`, background: theme.surface, opacity: op, transform: `scale(${s})`, display: 'flex', alignItems: 'center', gap: 11}}><span style={{width: 9, height: 9, borderRadius: '50%', background: theme.grad}} />{c}</div>;
    })}
  </div>
);

const svg = (d: string, stroke: string) => (
  <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

/** Left qualify lead card. */
const LeadCard: React.FC<{lf: number}> = ({lf}) => {
  const L = demoData.lead;
  const cardOp = interpolate(lf - 24, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const cardY = interpolate(lf - 24, [0, 18], [44, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const rows: [string, string, boolean][] = [
    ['Service', L.service, false],
    ['Area', L.area, false],
    ['Callback', L.callback, false],
    ['Estimated value', L.estimatedValue, true],
  ];
  return (
    <div style={{marginTop: 38, width: 660, borderRadius: 24, border: `1px solid ${theme.line}`, background: theme.surface, boxShadow: '0 30px 70px rgba(0,0,0,0.5)', overflow: 'hidden', opacity: cardOp, transform: `translateY(${cardY}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '26px 30px', borderBottom: `1px solid ${theme.line}`, background: 'linear-gradient(140deg,rgba(59,156,245,0.1),rgba(122,63,240,0.08))'}}>
        <div style={{width: 60, height: 60, borderRadius: '50%', background: theme.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 24, boxShadow: '0 0 20px rgba(59,156,245,0.5)'}}>{L.initials}</div>
        <div>
          <div style={{fontSize: 30, fontWeight: 700, color: '#fff'}}>{L.customerName}</div>
          <div style={{fontSize: 22, color: theme.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8}}><span style={{width: 9, height: 9, borderRadius: '50%', background: theme.green, boxShadow: '0 0 10px rgba(52,199,89,0.8)'}} />Qualified lead</div>
        </div>
        <div style={{marginLeft: 'auto', fontSize: 20, fontWeight: 700, color: '#fff', background: theme.grad, padding: '9px 18px', borderRadius: 100}}>{L.quality}</div>
      </div>
      {rows.map(([k, v, val], i) => {
        const f = lf - 40 - i * 8;
        const op = interpolate(f, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
        const x = interpolate(f, [0, 12], [22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
        return (
          <div key={k} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 30px', borderTop: i === 0 ? 'none' : '1px solid rgba(28,42,54,0.6)', opacity: op, transform: `translateX(${x}px)`}}>
            <span style={{fontSize: 23, color: theme.muted, fontWeight: 600}}>{k}</span>
            <span style={{fontSize: val ? 30 : 26, fontWeight: 700, ...(val ? {fontFamily: theme.fonts.display, ...theme.gradText} : {color: '#fff'})}}>{v}</span>
          </div>
        );
      })}
    </div>
  );
};

/** Top-centre caption for the full-width dashboard scenes. */
const DashCaption: React.FC<{sceneKey: SceneKey; kicker: string; text: string}> = ({sceneKey, kicker, text}) => {
  const frame = useCurrentFrame();
  const op = panelEnvelope(frame, sceneKey, 14, 12);
  if (op <= 0) return null;
  const lf = frame - SCENES[sceneKey].start;
  const y = interpolate(lf, [0, 18], [-16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 128, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: op, transform: `translateY(${y}px)`}}>
      <div style={{fontFamily: theme.fonts.body, fontWeight: 700, fontSize: 18, letterSpacing: 4, textTransform: 'uppercase', color: theme.blue, marginBottom: 8}}>{kicker}</div>
      <div style={{fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 40, letterSpacing: -1, color: theme.text}}>{text}</div>
    </div>
  );
};

/** CTA end card. */
const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lf = frame - SCENES.cta.start;
  if (lf < -10) return null;
  const op = interpolate(lf, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const rise = (d: number) => {
    const f = lf - d;
    return {opacity: interpolate(f, [0, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut}), transform: `translateY(${interpolate(f, [0, 16], [22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut})}px)`};
  };
  const pulse = 1 + 0.04 * Math.sin((lf / fps) * Math.PI * 2 * 1.1);
  const parse = (t: string) => t.split('*').map((s, i) => (i % 2 ? <span key={i} style={theme.gradText}>{s}</span> : <span key={i}>{s}</span>));
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, opacity: op}}>
      <Img src={staticFile('logo.png')} style={{width: 520, height: 'auto', ...rise(4)}} />
      <h1 style={{fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 66, letterSpacing: -1.5, textAlign: 'center', color: theme.text, margin: 0, whiteSpace: 'pre-line', ...rise(10)}}>{parse(demoData.cta.headline)}</h1>
      <div style={{position: 'relative', marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 16, padding: '30px 52px', borderRadius: 20, background: theme.grad, color: '#fff', fontFamily: theme.fonts.body, fontWeight: 700, fontSize: 34, boxShadow: '0 26px 60px rgba(59,156,245,0.5), 0 0 70px rgba(122,63,240,0.45)', opacity: rise(16).opacity, transform: `${rise(16).transform} scale(${pulse})`}}>
        <div style={{position: 'absolute', inset: -16, borderRadius: 32, background: theme.grad, filter: 'blur(28px)', opacity: 0.55, zIndex: -1}} />
        {demoData.cta.button}
        <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 12, ...rise(20)}}>
        <span style={{fontFamily: theme.fonts.display, fontWeight: 600, fontSize: 26, color: theme.muted}}>{demoData.brand.tagline}</span>
        <span style={{fontFamily: theme.fonts.body, fontSize: 22, fontWeight: 700, color: theme.cyan, background: 'rgba(111,227,251,0.1)', border: '1px solid rgba(111,227,251,0.3)', borderRadius: 100, padding: '10px 20px'}}>{demoData.cta.note}</span>
      </div>
    </div>
  );
};

/** All left content + dashboard captions + CTA. */
export const LeftStage: React.FC = () => {
  const H = demoData.hook;
  const L = demoData.lead;
  return (
    <>
      <Panel sceneKey="hook">
        {(lf) => (
          <>
            <Kicker>{demoData.brand.kicker}</Kicker>
            <Kinetic text={H.headline} localFrame={lf} fontSize={88} delay={6} />
            <Body lf={lf} delay={22}>{H.sub}</Body>
            <Chips items={demoData.pipeline.length ? ['Enquiry', 'Capture', 'Qualify', 'Owner summary', 'CRM', 'Follow-up', 'Reporting'] : []} lf={lf} delay={30} />
          </>
        )}
      </Panel>

      <Panel sceneKey="receptionist">
        {(lf) => (
          <>
            <Kicker>Capture · AI Receptionist</Kicker>
            <Kinetic text={'Answers every call —\n*instantly.*'} localFrame={lf} fontSize={70} />
            <Body lf={lf}>Across phone, website, WhatsApp and web forms — every enquiry answered 24/7 and turned into clean, structured data.</Body>
            <Chips items={['📞 Calls', '🌐 Website', '💬 WhatsApp', '📝 Forms']} lf={lf} delay={30} />
          </>
        )}
      </Panel>

      <Panel sceneKey="qualify">
        {(lf) => (
          <>
            <Kicker>Qualify · AI Sales Assistant</Kicker>
            <Kinetic text={'Scored & scoped —\n*before you’ve seen it.*'} localFrame={lf} fontSize={62} />
            <LeadCard lf={lf} />
          </>
        )}
      </Panel>

      <Panel sceneKey="ownerSummary">
        {(lf) => (
          <>
            <Kicker>Owner summary · AI Admin</Kicker>
            <Kinetic text={'The whole lead,\n*in your pocket.*'} localFrame={lf} fontSize={66} />
            <Points lf={lf} items={[
              {t: 'Instant, not end-of-day', s: 'Delivered the second the call ends.', color: theme.blue, icon: svg('M13 2L3 14h7l-1 8 10-12h-7z', theme.blue)},
              {t: 'Everything in one glance', s: 'Name, job, area, quality and value.', color: theme.cyan, icon: svg('M20 7L9 18l-5-5', theme.cyan)},
              {t: 'Urgent jobs flagged', s: 'Emergencies jump the queue.', color: theme.red, icon: svg('M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z', theme.red)},
            ]} />
          </>
        )}
      </Panel>

      <DashCaption sceneKey="dashboard" kicker="CRM · Your portal" text="Every lead logged — nothing forgotten." />

      <Panel sceneKey="booking">
        {(lf) => (
          <>
            <Kicker>Booking · AI Booking Assistant</Kicker>
            <Kinetic text={'Straight into\n*your diary.*'} localFrame={lf} fontSize={66} />
            <Points lf={lf} items={[
              {t: 'Offers real times', s: 'Two options texted; the customer picks.', color: theme.blue, icon: svg('M3 4h18v17H3zM3 9h18M8 2v4M16 2v4', theme.blue)},
              {t: 'No phone tag', s: 'It drops straight into your calendar.', color: theme.cyan, icon: svg('M20 7L9 18l-5-5', theme.cyan)},
              {t: 'Reminders handled', s: 'Morning-of reminder sent — fewer no-shows.', color: theme.purple, icon: svg('M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', theme.purple)},
            ]} />
          </>
        )}
      </Panel>

      <Panel sceneKey="completed">
        {(lf) => (
          <>
            <Kicker>Job completed</Kicker>
            <Kinetic text={'Signed off —\n*beautifully.*'} localFrame={lf} fontSize={70} />
            <Body lf={lf}>The work’s done. Now the follow-up that wins your next customer runs on its own.</Body>
          </>
        )}
      </Panel>

      <Panel sceneKey="reviewReq">
        {(lf) => (
          <>
            <Kicker>Reviews · AI Review Assistant</Kicker>
            <Kinetic text={'Every happy job —\n*a 5-star review.*'} localFrame={lf} fontSize={62} />
            <Points lf={lf} items={[
              {t: 'Asked at the right moment', s: 'Sent on completion, when they’re happiest.', color: theme.amber, icon: svg('M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.6z', theme.amber)},
              {t: 'Builds your ranking', s: 'A steady stream lifts you in local search.', color: theme.blue, icon: svg('M5 20V9M12 20V4M19 20v-7', theme.blue)},
            ]} />
          </>
        )}
      </Panel>

      <DashCaption sceneKey="reviewLogged" kicker="Reporting · Your portal" text="Reviews & results — logged automatically." />

      <CTA />
    </>
  );
};
