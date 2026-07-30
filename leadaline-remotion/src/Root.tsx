import React from 'react';
import {Composition} from 'remotion';
import {LeadaLineDemo} from './Video';
import {DURATION, FPS} from './lib/timing';
import {Reel1} from './reels/Reel1';
import {Reel2} from './reels/Reel2';
import {Reel3} from './reels/Reel3';

const REEL_FPS = 30;
const REEL_DUR = 930; // 31s

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="LeadaLineDemo"
      component={LeadaLineDemo}
      durationInFrames={DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition id="ReelMissedCall" component={Reel1} durationInFrames={REEL_DUR} fps={REEL_FPS} width={1080} height={1920} />
    <Composition id="ReelQuietQuote" component={Reel2} durationInFrames={REEL_DUR} fps={REEL_FPS} width={1080} height={1920} />
    <Composition id="ReelAfterHours" component={Reel3} durationInFrames={REEL_DUR} fps={REEL_FPS} width={1080} height={1920} />
  </>
);
