import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring, Easing} from 'remotion';
import {BLUE, PURPLE, GREEN, AMBER, GRAD, DISPLAY} from './fonts';

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

type P = {x: number; y: number; delay?: number};

/** Soft radial glow that pulses (breathing) at a point. */
export const GlowPulse: React.FC<P & {size?: number; color?: string; strength?: number}> = ({
  x, y, delay = 0, size = 260, color = 'rgba(47,107,255,0.5)', strength = 1,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 160}});
  const t = ((frame - delay) / fps) * Math.PI * 2 * 0.75;
  const op = Math.max(0, s * (0.5 + 0.32 * Math.sin(t)) * strength);
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: '50%', background: `radial-gradient(circle, ${color}, transparent 68%)`, filter: 'blur(22px)', opacity: op, pointerEvents: 'none'}} />
  );
};

/** Expanding concentric rings — "incoming / ringing". */
export const Rings: React.FC<P & {color?: string; max?: number}> = ({x, y, delay = 0, color = BLUE, max = 3}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      {Array.from({length: max}).map((_, i) => {
        const period = 66;
        const f = (frame - delay - i * (period / max)) % period;
        if (f < 0) return null;
        const p = f / period;
        const size = interpolate(p, [0, 1], [120, 360]);
        const op = interpolate(p, [0, 0.15, 1], [0, 0.5, 0]);
        return <div key={i} style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: '50%', border: `2px solid ${color}`, opacity: op, pointerEvents: 'none'}} />;
      })}
    </>
  );
};

/** Tasteful sparkle burst (a few 4-point stars). */
export const Sparkle: React.FC<P & {color?: string}> = ({x, y, delay = 0, color = AMBER}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pts = [ [0, -1], [1, 0], [0, 1], [-1, 0], [0.7, -0.7], [-0.7, 0.7] ];
  return (
    <>
      {pts.map(([dx, dy], i) => {
        const f = frame - delay - i * 3;
        const s = spring({frame: f, fps, config: {damping: 12, stiffness: 200}});
        const life = interpolate(f, [0, 20, 42], [0, 1, 0], clamp);
        const dist = interpolate(s, [0, 1], [0, 26 + (i % 2) * 10]);
        const sz = 8 + (i % 2) * 4;
        return (
          <div key={i} style={{position: 'absolute', left: x + dx * dist - sz / 2, top: y + dy * dist - sz / 2, width: sz, height: sz, opacity: life, pointerEvents: 'none', transform: `rotate(45deg)`, background: color, borderRadius: 2, boxShadow: `0 0 8px ${color}`}} />
        );
      })}
    </>
  );
};

/** Typing dots bubble. */
export const TypingDots: React.FC<P & {show: number}> = ({x, y, show}) => {
  const frame = useCurrentFrame();
  if (show <= 0 || show > 1) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, display: 'flex', gap: 8, padding: '12px 16px', background: '#E7EAF0', borderRadius: 18, pointerEvents: 'none', boxShadow: '0 6px 16px rgba(30,45,90,0.12)'}}>
      {[0, 1, 2].map((i) => {
        const t = ((frame - i * 6) / 12) % 1;
        const yy = -6 * Math.max(0, Math.sin(t * Math.PI));
        return <div key={i} style={{width: 12, height: 12, borderRadius: '50%', background: '#8A97AB', transform: `translateY(${yy}px)`}} />;
      })}
    </div>
  );
};

/** Count-up number drawn over a covered region. */
export const CountUp: React.FC<{
  x: number; y: number; to: number; delay?: number; prefix?: string; suffix?: string;
  size?: number; color?: string; cover?: [number, number]; coverColor?: string; align?: 'left' | 'center';
}> = ({x, y, to, delay = 0, prefix = '', suffix = '', size = 68, color = BLUE, cover, coverColor = '#F5F7FE', align = 'left'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = interpolate(frame - delay, [0, 34], [0, 1], {...clamp, easing: easeOut});
  const val = Math.round(to * p);
  const pop = spring({frame: frame - delay - 34, fps, config: {damping: 9, stiffness: 200}});
  const scale = 1 + 0.08 * Math.max(0, interpolate(frame - delay, [34, 40, 52], [0, 1, 0], clamp));
  return (
    <>
      {cover && <div style={{position: 'absolute', left: x - (align === 'center' ? cover[0] / 2 : 0), top: y, width: cover[0], height: cover[1], background: coverColor, pointerEvents: 'none'}} />}
      <div style={{position: 'absolute', left: align === 'center' ? x : x, top: y, transform: `translateX(${align === 'center' ? '-50%' : '0'}) scale(${scale})`, transformOrigin: 'left center', fontFamily: DISPLAY, fontWeight: 700, fontSize: size, color, letterSpacing: -1, pointerEvents: 'none', lineHeight: 1}}>
        {prefix}{val}{suffix}
      </div>
    </>
  );
};

/** Left-to-right reveal mask over a chart region (bars "grow"). */
export const BarReveal: React.FC<{x: number; y: number; w: number; h: number; delay?: number; slideBg: string}> = ({x, y, w, h, delay = 0, slideBg}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 46], [0, 1], {...clamp, easing: easeOut});
  const coverX = x + w * p;
  const shimmer = interpolate(frame - delay, [0, 46], [0, w], clamp);
  return (
    <>
      {/* cover the un-grown part of the bars with the slide's bg */}
      <div style={{position: 'absolute', left: coverX, top: y, width: x + w - coverX + 4, height: h, background: slideBg, pointerEvents: 'none'}} />
      {/* bright leading edge */}
      {p < 1 && <div style={{position: 'absolute', left: x + shimmer - 6, top: y, width: 12, height: h, background: 'rgba(255,255,255,0.7)', filter: 'blur(4px)', pointerEvents: 'none'}} />}
    </>
  );
};

/** Spring-pop checkmark in a circle. */
export const Checkmark: React.FC<P & {size?: number}> = ({x, y, delay = 0, size = 66}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 10, stiffness: 200}});
  const draw = interpolate(frame - delay, [6, 22], [0, 1], {...clamp, easing: easeOut});
  const r = size / 2;
  return (
    <div style={{position: 'absolute', left: x - r, top: y - r, width: size, height: size, borderRadius: '50%', background: GREEN, transform: `scale(${s})`, boxShadow: `0 0 26px rgba(34,197,94,0.6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" style={{strokeDasharray: 30, strokeDashoffset: 30 * (1 - draw)}} />
      </svg>
    </div>
  );
};

/** Soft rounded highlight box that scales/glows in (spring). */
export const HighlightBox: React.FC<{x: number; y: number; w: number; h: number; delay?: number; color?: string; radius?: number; ring?: boolean; pulse?: boolean}> = ({x, y, w, h, delay = 0, color = 'rgba(47,107,255,0.16)', radius = 16, ring, pulse}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 170}});
  const t = ((frame - delay) / fps) * Math.PI * 2 * 0.8;
  const glow = pulse ? 0.5 + 0.4 * Math.sin(t) : 0.7;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: radius, background: color, opacity: s, transform: `scale(${interpolate(s, [0, 1], [0.94, 1])})`, boxShadow: ring ? `0 0 0 2px rgba(47,107,255,${0.5 * glow}), 0 0 34px rgba(47,107,255,${0.4 * glow})` : `0 0 40px ${color}`, pointerEvents: 'none'}} />
  );
};

/** A pulse travelling along a straight path from a to b — "data transfer". */
export const TransferPulse: React.FC<{ax: number; ay: number; bx: number; by: number; delay?: number; color?: string}> = ({ax, ay, bx, by, delay = 0, color = BLUE}) => {
  const frame = useCurrentFrame();
  const loop = 40;
  const f = (frame - delay) % loop;
  if (frame - delay < 0) return null;
  const p = f / loop;
  const x = interpolate(p, [0, 1], [ax, bx]);
  const y = interpolate(p, [0, 1], [ay, by]);
  const op = interpolate(p, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  return <div style={{position: 'absolute', left: x - 7, top: y - 7, width: 14, height: 14, borderRadius: '50%', background: color, boxShadow: `0 0 16px ${color}`, opacity: op, pointerEvents: 'none'}} />;
};

/** Progressive "pop" glow at a bubble/element (soft rounded highlight that scales in then holds). */
export const PopHighlight: React.FC<{x: number; y: number; w: number; h: number; delay?: number; blue?: boolean; radius?: number}> = ({x, y, w, h, delay = 0, blue, radius = 20}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 11, stiffness: 210}});
  const bump = interpolate(frame - delay, [0, 6, 16], [0, 1, 0], clamp);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: radius, opacity: interpolate(s, [0, 0.4], [0, 1], clamp), transform: `scale(${interpolate(s, [0, 1], [0.8, 1]) + bump * 0.03})`, boxShadow: blue ? '0 0 30px rgba(47,107,255,0.55), 0 0 0 2px rgba(47,107,255,0.35)' : '0 8px 22px rgba(30,45,90,0.18)', pointerEvents: 'none'}} />
  );
};
