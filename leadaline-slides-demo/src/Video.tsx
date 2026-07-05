import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {SLIDES, BOUNDARIES} from './lib/slides';
import {SlideScene} from './scenes/SlideScene';
import {Sweep} from './transitions';
import {useFonts} from './lib/fonts';

export const LeadaLineSlides: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{backgroundColor: '#EAEEFB'}}>
      {SLIDES.map((s, i) => (
        <SlideScene key={s.src} slide={s} index={i} />
      ))}
      {BOUNDARIES.map((b) => (
        <Sweep key={b} at={b - 8} />
      ))}
      <Audio src={staticFile('audio/master.m4a')} />
    </AbsoluteFill>
  );
};
