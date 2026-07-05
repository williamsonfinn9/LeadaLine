import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import type {Slide} from '../lib/slides';
import {entrance, exitStyle, easeOut, GlowPulse} from '../transitions';

/** Animates one static slide image: Ken Burns zoom/drift + premium entrance/exit. */
export const SlideScene: React.FC<{slide: Slide}> = ({slide}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const {start, dur, src, kb, enter, accent} = slide;
  const lf = frame - start;
  if (lf < -2 || lf > dur + 2) return null;

  const inP = interpolate(lf, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const outQ = interpolate(lf, [dur - 14, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const kbP = interpolate(lf, [0, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const e = entrance(enter, inP);
  const x = exitStyle(outQ);
  const opacity = e.opacity * x.opacity;
  const scale = e.scale * x.scale;
  const blur = e.blur + x.blur;

  const kbScale = kb.scaleFrom + (kb.scaleTo - kb.scaleFrom) * kbP;
  const kbx = kb.dx * kbP;
  const kby = kb.dy * kbP;

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translate(${e.tx}px, ${e.ty}px) scale(${scale})`,
        filter: blur > 0.1 ? `blur(${blur}px)` : 'none',
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* Ken Burns layer */}
      <AbsoluteFill style={{transform: `scale(${kbScale}) translate(${kbx}px, ${kby}px)`}}>
        <Img src={staticFile(src)} style={{width, height, objectFit: 'cover'}} />
      </AbsoluteFill>
      {/* subtle depth vignette */}
      <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 45%, transparent 62%, rgba(20,30,70,0.10) 100%)', pointerEvents: 'none'}} />
      {accent && <GlowPulse />}
    </AbsoluteFill>
  );
};
