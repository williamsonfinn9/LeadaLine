import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {SLIDES, BOUNDARIES} from './lib/slides';
import {SlideScene} from './scenes/SlideScene';
import {Sweep} from './transitions';

export const LeadaLineSlides: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#EAEEFB'}}>
    {SLIDES.map((s) => (
      <SlideScene key={s.src} slide={s} />
    ))}
    {BOUNDARIES.map((b) => (
      <Sweep key={b} at={b - 8} />
    ))}
    <Audio src={staticFile('audio/master.m4a')} />
  </AbsoluteFill>
);
