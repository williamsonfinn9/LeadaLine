import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme, radius} from '../lib/theme';
import {easeOut, easeInOut, easeIn, countUp} from '../lib/anim';
import {SCENES} from '../lib/timing';
import {demoData} from '../data/config';
import {Stars} from './ui';

const W = 1500;
const H = 720;
const COL_W = 322;
const COL_GAP = 22;

const KPI: React.FC<{label: string; value: number; suffix?: string; grad?: boolean; lf: number; delay: number; up?: string}> = ({label, value, suffix = '', grad, lf, delay, up}) => {
  const op = interpolate(lf - delay, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const y = interpolate(lf - delay, [0, 14], [26, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const v = countUp(lf, 60, value, {delay: delay + 6, duration: 34});
  return (
    <div style={{flex: 1, background: theme.surface2, border: `1px solid ${theme.line}`, borderRadius: 16, padding: '22px 24px', opacity: op, transform: `translateY(${y}px)`}}>
      <div style={{fontSize: 18, color: theme.muted, fontWeight: 600}}>{label}</div>
      <div style={{fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 52, marginTop: 6, lineHeight: 1, ...(grad ? theme.gradText : {color: '#fff'})}}>{v}{suffix}</div>
      {up && <div style={{fontSize: 16, color: theme.green, fontWeight: 700, marginTop: 6}}>{up}</div>}
    </div>
  );
};

const LeadChip: React.FC<{name: string; sub: string; highlight?: boolean; style?: React.CSSProperties; review?: boolean}> = ({name, sub, highlight, style, review}) => (
  <div style={{background: highlight ? '#0F1A28' : '#0C131B', border: `1.5px solid ${highlight ? 'rgba(59,156,245,0.5)' : theme.line}`, borderRadius: 14, padding: '16px 16px', boxShadow: highlight ? '0 16px 34px rgba(59,156,245,0.28), 0 0 26px rgba(59,156,245,0.22)' : '0 8px 16px rgba(0,0,0,0.3)', ...style}}>
    <div style={{fontSize: 22, fontWeight: 700, color: '#fff'}}>{name}</div>
    <div style={{fontSize: 18, color: review ? theme.amber : highlight ? theme.blue : theme.muted, fontWeight: 600, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6}}>
      {review && <span>★</span>}{sub}
    </div>
  </div>
);

export const DashboardStage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logStart = SCENES.dashboard.start;
  const reviewStart = SCENES.reviewLogged.start;
  const inLog = frame >= logStart - 30 && frame < SCENES.booking.start;
  const inReview = frame >= reviewStart - 26 && frame < SCENES.cta.start;
  if (!inLog && !inReview) return null;

  const mode: 'log' | 'review' = inReview ? 'review' : 'log';
  const base = mode === 'log' ? logStart : reviewStart;
  const lf = frame - base;

  // device-swap enter/exit
  const enter = interpolate(frame, [base - 26, base + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const exitAt = mode === 'log' ? SCENES.booking.start : SCENES.cta.start;
  const exit = interpolate(frame, [exitAt - 24, exitAt], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
  const op = Math.max(0, enter * (1 - exit));
  const scale = interpolate(enter, [0, 1], [0.9, 1]) * interpolate(exit, [0, 1], [1, 0.94]);
  const blur = (1 - enter) * 12 + exit * 9;

  // moving lead card across columns (log mode)
  const colX = (i: number) => 34 + 250 + COL_GAP + i * (COL_W + COL_GAP) + 12; // side(250)+padding
  const boardLeft = 250; // sidebar width
  const stops = [0, 1, 2, 3].map((i) => boardLeft + 34 + i * (COL_W + COL_GAP) + 14);
  const moveP = interpolate(lf, [30, 70, 110, 150, 190], [0, 0, 1, 2, 3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const seg = Math.floor(moveP);
  const frac = moveP - seg;
  const mx = interpolate(frac, [0, 1], [stops[Math.min(seg, 3)], stops[Math.min(seg + 1, 3)]]);
  const my = 190 + Math.sin(frac * Math.PI) * -18; // arc

  const columns = demoData.pipeline;

  return (
    <div style={{position: 'absolute', left: '50%', top: '56%', transform: `translate(-50%,-50%) scale(${scale})`, opacity: op, filter: blur > 0.1 ? `blur(${blur}px)` : 'none', width: W, height: H, borderRadius: 22, border: `1px solid ${theme.line}`, background: theme.surface, boxShadow: '0 60px 130px rgba(0,0,0,0.7)', overflow: 'hidden'}}>
      {/* browser bar */}
      <div style={{height: 66, background: theme.bg2, borderBottom: `1px solid ${theme.line}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 26px'}}>
        <span style={{width: 14, height: 14, borderRadius: '50%', background: '#FF5F57'}} /><span style={{width: 14, height: 14, borderRadius: '50%', background: '#FEBC2E'}} /><span style={{width: 14, height: 14, borderRadius: '50%', background: '#28C840'}} />
        <div style={{marginLeft: 20, flex: 1, height: 38, borderRadius: 9, background: '#0A0F16', border: `1px solid ${theme.line}`, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 18, color: theme.muted2, fontWeight: 500}}><b style={{color: theme.muted}}>app.leadaline.com</b>&nbsp;/ {mode === 'review' ? 'reviews' : 'pipeline'}</div>
      </div>
      <div style={{display: 'flex', height: H - 66}}>
        {/* sidebar */}
        <div style={{width: 250, borderRight: `1px solid ${theme.line}`, padding: '26px 20px', background: theme.bg2}}>
          <div style={{fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10}}>Lead Dashboard <span style={{color: theme.green, fontSize: 15, border: '1px solid rgba(52,199,89,0.4)', borderRadius: 100, padding: '3px 10px'}}>Live</span></div>
          {['Leads', 'Pipeline', 'Bookings', 'Reviews', 'Reports'].map((n) => {
            const on = (mode === 'review' && n === 'Reviews') || (mode === 'log' && n === 'Pipeline');
            return <div key={n} style={{fontSize: 19, color: on ? '#fff' : theme.muted, fontWeight: 600, padding: '12px 14px', borderRadius: 10, background: on ? theme.surface2 : 'transparent'}}>{n}</div>;
          })}
        </div>
        {/* main */}
        <div style={{flex: 1, padding: '24px 30px', position: 'relative'}}>
          {/* KPIs (review mode counts up) */}
          {mode === 'review' && (
            <div style={{display: 'flex', gap: 18, marginBottom: 22}}>
              <KPI label="Leads / wk" value={demoData.metrics.leadsPerWeek} grad lf={lf} delay={20} up="▲ 28%" />
              <KPI label="Qualified" value={demoData.metrics.qualified} lf={lf} delay={30} up="▲ 32%" />
              <KPI label="Booked" value={demoData.metrics.booked} lf={lf} delay={40} up="▲ 19%" />
              <KPI label="Answered" value={demoData.metrics.answeredPct} suffix="%" lf={lf} delay={50} up="24/7" />
            </div>
          )}
          {/* pipeline columns */}
          <div style={{display: 'flex', gap: COL_GAP, height: mode === 'review' ? 'calc(100% - 128px)' : '100%'}}>
            {columns.map((c, i) => {
              const active = mode === 'log' ? seg + 1 === i || (seg >= 3 && i === 3) : i === 3;
              return (
                <div key={c} style={{flex: 1, background: '#0A0F16', border: `1px solid ${theme.line}`, borderRadius: 18, padding: '18px 16px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}}>
                    <span style={{fontSize: 20, fontWeight: 700, color: active ? theme.blue : '#fff'}}>{c}</span>
                    <span style={{fontSize: 16, fontWeight: 700, color: theme.muted2, background: theme.surface2, borderRadius: 100, padding: '3px 11px'}}>{[3, 2, 4, 6][i]}</span>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 12, opacity: 0.5}}>
                    {i === 0 && <LeadChip name="R. Okafor" sub="Fuse board" />}
                    {i === 1 && <LeadChip name="M. Hughes" sub="Rewire quote" />}
                    {i === 3 && mode === 'review' && <LeadChip name={demoData.lead.customerName} sub="5-star review" review />}
                    {i === 3 && mode === 'log' && <LeadChip name="T. Bennett" sub="Review ★" />}
                  </div>
                </div>
              );
            })}
          </div>
          {/* moving lead card (log mode) */}
          {mode === 'log' && (
            <div style={{position: 'absolute', left: mx, top: my, width: COL_W - 32, zIndex: 5}}>
              <LeadChip name={demoData.lead.customerName} sub={`${demoData.lead.product} · ${demoData.lead.estimatedValue.split(' ')[0]}`} highlight />
            </div>
          )}
          {/* review card (review mode) */}
          {mode === 'review' && (
            <div style={{position: 'absolute', right: 30, bottom: 24, width: 460, background: theme.surface2, border: `1px solid ${theme.line}`, borderRadius: 18, padding: 22, opacity: interpolate(lf - 70, [0, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(lf - 70, [0, 16], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`, boxShadow: '0 24px 50px rgba(0,0,0,0.5)'}}>
              <Stars count={demoData.review.stars} localFrame={lf - 80} size={30} />
              <div style={{fontSize: 21, color: '#fff', fontWeight: 600, marginTop: 12, lineHeight: 1.3}}>{demoData.review.text}</div>
              <div style={{fontSize: 16, color: theme.muted, marginTop: 10}}>{demoData.lead.customerName} · logged automatically</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
