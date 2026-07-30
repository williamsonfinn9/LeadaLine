import React from 'react';
import {Composition} from 'remotion';
import {LeadaLineDemo} from './Video';
import {DURATION, FPS} from './lib/timing';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="LeadaLineDemo"
    component={LeadaLineDemo}
    durationInFrames={DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
