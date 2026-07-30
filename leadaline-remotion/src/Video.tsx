import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Background} from './components/Background';
import {Chrome} from './components/Chrome';
import {PhoneStage} from './components/Phone';
import {DashboardStage} from './components/Dashboard';
import {LeftStage} from './scenes';
import {Sweep} from './components/ui';
import {useFonts} from './lib/fonts';
import {theme} from './lib/theme';

const BOUNDARIES = [240, 540, 900, 1200, 1560, 1920, 2160, 2460, 2790];

export const LeadaLineDemo: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{background: theme.bg, fontFamily: theme.fonts.body}}>
      <Background />
      <DashboardStage />
      <PhoneStage />
      <LeftStage />
      <Chrome />
      {BOUNDARIES.map((b) => (
        <Sweep key={b} at={b - 6} />
      ))}
      <Audio src={staticFile('music.m4a')} volume={0.9} />
    </AbsoluteFill>
  );
};
