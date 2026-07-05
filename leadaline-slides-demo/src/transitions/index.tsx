import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, Easing, AbsoluteFill} from 'remotion';
import type {Enter} from '../lib/slides';

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Entrance transform for an incoming slide (p: 0..1). Reusable, premium. */
export const entrance = (kind: Enter, p: number) => {
  const blur = (1 - p) * 8;
  if (kind === 'slideL')
    return {opacity: p, tx: (1 - p) * 120, ty: 0, scale: 1.02 - 0.02 * p, blur};
  if (kind === 'slideU')
    return {opacity: p, tx: 0, ty: (1 - p) * 110, scale: 1.02 - 0.02 * p, blur};
  // zoomIn (dolly)
  return {opacity: p, tx: 0, ty: 0, scale: 1.06 - 0.06 * p, blur};
};

/** Quick exit (q: 0..1) — fade + slight scale-up + blur for a motion-blur match cut. */
export const exitStyle = (q: number) => ({
  opacity: 1 - q,
  scale: 1 + 0.05 * q,
  blur: 7 * q,
});

/** A light sheen that sweeps across the frame at `at` (global frame). */
export const Sweep: React.FC<{at: number; width?: number}> = ({at, width = 620}) => {
  const frame = useCurrentFrame();
  const {width: W} = useVideoConfig();
  const op = interpolate(frame, [at, at + 6, at + 26, at + 34], [0, 0.9, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (op <= 0) return null;
  const p = interpolate(frame, [at, at + 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const x = interpolate(p, [0, 1], [-width, W + width]);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 50}}>
      <div style={{position: 'absolute', top: '-10%', left: 0, width, height: '120%', transform: `translateX(${x}px) skewX(-14deg)`, opacity: op, filter: 'blur(8px)', background: 'linear-gradient(105deg, transparent, rgba(140,180,255,0.10) 42%, rgba(210,225,255,0.28) 50%, rgba(140,180,255,0.10) 58%, transparent)'}} />
    </AbsoluteFill>
  );
};

/** Soft glow pulse for the CTA slide. */
export const GlowPulse: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = (frame / fps) * Math.PI * 2 * 0.7;
  const op = 0.28 + 0.16 * Math.sin(t);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', bottom: '8%', width: 1100, height: 360, transform: 'translateX(-50%)', borderRadius: '50%', filter: 'blur(90px)', opacity: op, background: 'radial-gradient(ellipse at center, rgba(47,107,255,0.5), rgba(122,63,240,0.28) 55%, transparent 72%)'}} />
    </AbsoluteFill>
  );
};
