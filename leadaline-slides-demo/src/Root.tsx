import React from 'react';
import {Composition} from 'remotion';
import {LeadaLineSlides} from './Video';
import {DURATION, FPS} from './lib/slides';

export const RemotionRoot: React.FC = () => (
  <Composition id="LeadaLineSlides" component={LeadaLineSlides} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
);
