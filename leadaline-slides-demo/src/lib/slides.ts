import type {Enter} from '../transitions';

/** 10-slide sequence + Ken Burns + premium entrance. Frames @60fps, total 3600 (60s). */
export type Slide = {
  src: string;
  start: number;
  dur: number;
  enter: Enter;
  hue: 'blue' | 'purple';
  bg: string; // approx page bg near dynamic areas (for cover masks)
  kb: {scaleFrom: number; scaleTo: number; dx: number; dy: number};
};

export const SLIDES: Slide[] = [
  {src: 'slides/slide-01.png', start: 0,    dur: 340, enter: 'center',      hue: 'blue',   bg: '#EEF2FE', kb: {scaleFrom: 1.0, scaleTo: 1.05,  dx: 0,   dy: -10}},
  {src: 'slides/slide-02.png', start: 324,  dur: 394, enter: 'wipeR',       hue: 'purple', bg: '#EDF1FE', kb: {scaleFrom: 1.0, scaleTo: 1.045, dx: -12, dy: 0}},
  {src: 'slides/slide-03.png', start: 702,  dur: 295, enter: 'wipeU',       hue: 'blue',   bg: '#EEF2FE', kb: {scaleFrom: 1.0, scaleTo: 1.045, dx: 10,  dy: 6}},
  {src: 'slides/slide-04.png', start: 981,  dur: 349, enter: 'zoomThrough', hue: 'purple', bg: '#EDF1FE', kb: {scaleFrom: 1.0, scaleTo: 1.045, dx: 12,  dy: -8}},
  {src: 'slides/slide-05.png', start: 1314, dur: 310, enter: 'blurScale',   hue: 'blue',   bg: '#F4F6FE', kb: {scaleFrom: 1.0, scaleTo: 1.04,  dx: -8,  dy: 5}},
  {src: 'slides/slide-06.png', start: 1608, dur: 364, enter: 'wipeR',       hue: 'blue',   bg: '#EFF2FE', kb: {scaleFrom: 1.0, scaleTo: 1.045, dx: 10,  dy: 8}},
  {src: 'slides/slide-07.png', start: 1956, dur: 400, enter: 'wipeU',       hue: 'purple', bg: '#EEF2FE', kb: {scaleFrom: 1.0, scaleTo: 1.045, dx: -10, dy: -6}},
  {src: 'slides/slide-08.png', start: 2340, dur: 418, enter: 'zoomThrough', hue: 'blue',   bg: '#EEF2FE', kb: {scaleFrom: 1.0, scaleTo: 1.045, dx: 12,  dy: 0}},
  {src: 'slides/slide-09.png', start: 2742, dur: 346, enter: 'blurScale',   hue: 'purple', bg: '#F4F6FD', kb: {scaleFrom: 1.0, scaleTo: 1.04,  dx: 0,   dy: 8}},
  {src: 'slides/slide-10.png', start: 3072, dur: 528, enter: 'center',      hue: 'blue',   bg: '#EEF2FE', kb: {scaleFrom: 1.0, scaleTo: 1.035, dx: 0,   dy: 0}},
];

export const BOUNDARIES = SLIDES.slice(1).map((s) => s.start);
export const DURATION = 3600;
export const FPS = 60;
