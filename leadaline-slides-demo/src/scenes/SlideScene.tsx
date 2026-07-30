import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import type {Slide} from '../lib/slides';
import {enterStyle, exitStyle, easeOut, MovingLight} from '../transitions';
import {Overlay} from './overlays';

/** Animates one slide image: premium clip/scale entrance + Ken Burns + drifting light + overlay widgets. */
export const SlideScene: React.FC<{slide: Slide; index: number}> = ({slide, index}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const {start, dur, src, kb, enter, hue} = slide;
  const lf = frame - start;
  if (lf < -2 || lf > dur + 2) return null;

  const inP = interpolate(lf, [0, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const outQ = interpolate(lf, [dur - 14, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  const kbP = interpolate(lf, [0, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const e = enterStyle(enter, inP);
  const x = exitStyle(outQ);
  const opacity = e.opacity * x.opacity;
  const blur = e.blur + x.blur;
  const kbScale = kb.scaleFrom + (kb.scaleTo - kb.scaleFrom) * kbP;

  return (
    <AbsoluteFill style={{opacity, transform: `scale(${e.scale * x.scale})`, filter: blur > 0.1 ? `blur(${blur}px)` : 'none', willChange: 'transform, opacity, filter'}}>
      <AbsoluteFill style={{clipPath: e.clipPath, WebkitClipPath: e.clipPath}}>
        <AbsoluteFill style={{transform: `scale(${kbScale}) translate(${kb.dx * kbP}px, ${kb.dy * kbP}px)`}}>
          <Img src={staticFile(src)} style={{width, height, objectFit: 'cover'}} />
        </AbsoluteFill>
        <MovingLight start={start} hue={hue} />
        <Overlay index={index} lf={lf} bg={slide.bg} dur={dur} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'radial-gradient(120% 92% at 50% 46%, transparent 64%, rgba(20,30,70,0.09) 100%)', pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
