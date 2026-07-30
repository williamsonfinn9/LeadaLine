import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export type Enter = 'wipeR' | 'wipeU' | 'zoomThrough' | 'blurScale' | 'center';

export type EnterStyle = {opacity: number; scale: number; blur: number; clipPath?: string};

/** Premium entrance styles (p: 0..1). */
export const enterStyle = (kind: Enter, p: number): EnterStyle => {
  const b = 1 - p;
  switch (kind) {
    case 'wipeR':
      return {opacity: 1, scale: 1.012, blur: b * 3, clipPath: `inset(0 ${b * 100}% 0 0)`};
    case 'wipeU':
      return {opacity: 1, scale: 1.012, blur: b * 3, clipPath: `inset(${b * 100}% 0 0 0)`};
    case 'zoomThrough':
      return {opacity: p, scale: 1.16 - 0.16 * p, blur: b * 11};
    case 'blurScale':
      return {opacity: p, scale: 1.06 - 0.06 * p, blur: b * 8};
    case 'center':
    default:
      return {opacity: p, scale: 0.955 + 0.045 * p, blur: b * 6};
  }
};

/** Quick exit for a match cut (q: 0..1). */
export const exitStyle = (q: number) => ({opacity: 1 - q, scale: 1 + 0.055 * q, blur: 7 * q});

/** Light sheen sweeping across at `at` (global frame) — hides wipe seams, adds flair. */
export const Sweep: React.FC<{at: number; width?: number; strength?: number}> = ({at, width = 560, strength = 1}) => {
  const frame = useCurrentFrame();
  const {width: W} = useVideoConfig();
  const op = interpolate(frame, [at, at + 6, at + 26, at + 34], [0, 0.85 * strength, 0.85 * strength, 0], clamp);
  if (op <= 0) return null;
  const prog = interpolate(frame, [at, at + 34], [0, 1], {...clamp, easing: easeInOut});
  const x = interpolate(prog, [0, 1], [-width, W + width]);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 60}}>
      <div style={{position: 'absolute', top: '-10%', left: 0, width, height: '120%', transform: `translateX(${x}px) skewX(-14deg)`, opacity: op, filter: 'blur(9px)', background: 'linear-gradient(105deg, transparent, rgba(150,185,255,0.10) 42%, rgba(220,232,255,0.34) 50%, rgba(150,185,255,0.10) 58%, transparent)'}} />
    </AbsoluteFill>
  );
};

/** Slow-drifting soft glow — subtle background motion layered over a slide. */
export const MovingLight: React.FC<{start: number; hue?: 'blue' | 'purple'}> = ({start, hue = 'blue'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = (frame - start) / fps;
  const x = 960 + Math.sin(t * 0.5) * 420;
  const y = 540 + Math.cos(t * 0.4) * 240;
  const col = hue === 'blue' ? 'rgba(47,107,255,0.10)' : 'rgba(122,63,240,0.10)';
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen', zIndex: 3}}>
      <div style={{position: 'absolute', left: x - 400, top: y - 400, width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle, ${col}, transparent 70%)`, filter: 'blur(60px)'}} />
    </AbsoluteFill>
  );
};

/** CTA glow pulse ring (final scene). */
export const CtaGlow: React.FC<{x: number; y: number; w: number; h: number; start: number; radius?: number}> = ({x, y, w, h, start, radius = 16}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = ((frame - start) / fps) * Math.PI * 2 * 0.8;
  const op = 0.35 + 0.3 * Math.sin(t);
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: radius, boxShadow: `0 0 40px rgba(47,107,255,${op}), 0 0 0 3px rgba(122,63,240,${0.45 * op})`, pointerEvents: 'none'}} />;
};
