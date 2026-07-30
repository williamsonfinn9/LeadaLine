import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme} from '../lib/theme';

const Glow: React.FC<{
  size: number;
  color: string;
  x: number;
  y: number;
  ax: number;
  ay: number;
  period: number;
}> = ({size, color, x, y, ax, ay, period}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = (frame / fps / period) * Math.PI * 2;
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        left: x,
        top: y,
        borderRadius: '50%',
        filter: 'blur(130px)',
        transform: `translate(${Math.sin(t) * ax}px, ${Math.cos(t) * ay}px) scale(${
          1 + 0.12 * Math.sin(t)
        })`,
        background: `radial-gradient(circle, ${color}, transparent 66%)`,
      }}
    />
  );
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const drift = interpolate(frame, [0, durationInFrames], [0, -30]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(130% 100% at 78% 20%, #0A1220 0%, #070B14 42%, ${theme.bg} 100%)`,
      }}
    >
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${drift}px)`}}>
        <Glow size={900} color="rgba(59,156,245,0.22)" x={-150} y={-190} ax={120} ay={70} period={9} />
        <Glow size={1000} color="rgba(122,63,240,0.26)" x={1200} y={620} ax={-140} ay={-64} period={11} />
        <Glow size={620} color="rgba(111,227,251,0.16)" x={1080} y={-180} ax={90} ay={110} period={8} />
      </div>
      {/* subtle grain */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </AbsoluteFill>
  );
};
