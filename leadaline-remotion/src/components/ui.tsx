import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme, radius} from '../lib/theme';
import {easeOut, easeInOut} from '../lib/anim';

/** Frosted glass card. */
export const GlassCard: React.FC<{
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({style, children}) => (
  <div
    style={{
      background: 'rgba(12,19,27,0.72)',
      border: `1px solid ${theme.line}`,
      borderRadius: radius.lg,
      boxShadow: '0 34px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Kinetic headline. Wrap the gradient part with *asterisks*. Reveals word-by-word. */
export const Kinetic: React.FC<{
  text: string;
  localFrame: number;
  fontSize: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({text, localFrame, fontSize, delay = 0, style}) => {
  const {fps} = useVideoConfig();
  // split into segments toggling gradient at '*'
  const segs = text.split('*');
  const words: {w: string; grad: boolean}[] = [];
  segs.forEach((seg, i) => {
    const grad = i % 2 === 1;
    seg.split(/(\s+|\n)/).forEach((w) => {
      if (w !== '') words.push({w, grad});
    });
  });
  let wi = 0;
  return (
    <h1
      style={{
        fontFamily: theme.fonts.display,
        fontWeight: 700,
        fontSize,
        lineHeight: 1.03,
        letterSpacing: -1.5,
        color: theme.text,
        margin: 0,
        ...style,
      }}
    >
      {words.map((seg, i) => {
        if (seg.w === '\n') return <br key={i} />;
        if (/^\s+$/.test(seg.w)) return <span key={i}> </span>;
        const idx = wi++;
        const f = localFrame - delay - idx * 4;
        const op = interpolate(f, [0, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
        const y = interpolate(f, [0, 16], [28, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
        const b = interpolate(f, [0, 12], [6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: op,
              transform: `translateY(${y}px)`,
              filter: b > 0.05 ? `blur(${b}px)` : 'none',
              ...(seg.grad ? theme.gradText : {}),
            }}
          >
            {seg.w}
          </span>
        );
      })}
    </h1>
  );
};

/** Transition sheen that sweeps across the frame. Trigger at `at` (global frame). */
export const Sweep: React.FC<{at: number; width?: number}> = ({at, width = 700}) => {
  const frame = useCurrentFrame();
  const {width: W} = useVideoConfig();
  const p = interpolate(frame, [at, at + 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const op = interpolate(frame, [at, at + 6, at + 28, at + 36], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (op <= 0) return null;
  const x = interpolate(p, [0, 1], [-width, W + width]);
  return (
    <div
      style={{
        position: 'absolute',
        top: '-10%',
        left: 0,
        width,
        height: '120%',
        transform: `translateX(${x}px) skewX(-14deg)`,
        opacity: op,
        pointerEvents: 'none',
        filter: 'blur(6px)',
        background:
          'linear-gradient(105deg, transparent, rgba(111,227,251,0.05) 40%, rgba(180,215,255,0.16) 50%, rgba(111,227,251,0.05) 60%, transparent)',
      }}
    />
  );
};

/** Animated 5-star rating; stars pop in sequentially. */
export const Stars: React.FC<{count: number; localFrame: number; delay?: number; size?: number}> = ({
  count,
  localFrame,
  delay = 0,
  size = 34,
}) => (
  <div style={{display: 'flex', gap: 6}}>
    {Array.from({length: count}).map((_, i) => {
      const f = localFrame - delay - i * 5;
      const s = interpolate(f, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
      const rot = interpolate(f, [0, 12], [-30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
      return (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} style={{transform: `scale(${s}) rotate(${rot}deg)`, opacity: s, filter: 'drop-shadow(0 0 8px rgba(245,179,1,0.5))'}}>
          <path fill={theme.amber} d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.6z" />
        </svg>
      );
    })}
  </div>
);

export const Kicker: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      fontFamily: theme.fonts.body,
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: 4,
      textTransform: 'uppercase',
      color: theme.blue,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
      ...style,
    }}
  >
    <span style={{width: 9, height: 9, borderRadius: '50%', background: theme.grad, boxShadow: '0 0 12px rgba(59,156,245,0.8)'}} />
    {children}
  </div>
);
