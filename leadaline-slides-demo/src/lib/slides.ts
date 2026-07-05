/** 10-slide sequence + Ken Burns + transitions. Frames @60fps, total 3600 (60s). */
export type Enter = 'zoomIn' | 'slideL' | 'slideU';
export type Slide = {
  src: string;
  start: number;
  dur: number;
  enter: Enter;
  kb: {scaleFrom: number; scaleTo: number; dx: number; dy: number};
  accent?: boolean;
};

// Windows aligned to the voiceover (audio/vo_timing.json). Subtle Ken Burns so
// full-bleed slide text never crops (starts at 1.0, gentle ~5% push).
export const SLIDES: Slide[] = [
  {src: 'slides/slide-01.png', start: 0,    dur: 340, enter: 'zoomIn', kb: {scaleFrom: 1.0, scaleTo: 1.055, dx: 0,   dy: -12}},                 // Opening
  {src: 'slides/slide-02.png', start: 324,  dur: 394, enter: 'slideL', kb: {scaleFrom: 1.0, scaleTo: 1.05,  dx: -14, dy: 0}},                   // Receptionist
  {src: 'slides/slide-03.png', start: 702,  dur: 295, enter: 'slideU', kb: {scaleFrom: 1.0, scaleTo: 1.05,  dx: 12,  dy: 8}},                   // Qualify
  {src: 'slides/slide-04.png', start: 981,  dur: 349, enter: 'zoomIn', kb: {scaleFrom: 1.0, scaleTo: 1.05,  dx: 14,  dy: -10}},                 // Owner Summary
  {src: 'slides/slide-05.png', start: 1314, dur: 310, enter: 'slideL', kb: {scaleFrom: 1.0, scaleTo: 1.045, dx: -12, dy: 6}},                   // CRM dashboard
  {src: 'slides/slide-06.png', start: 1608, dur: 364, enter: 'slideU', kb: {scaleFrom: 1.0, scaleTo: 1.05,  dx: 12,  dy: 10}},                  // Booking
  {src: 'slides/slide-07.png', start: 1956, dur: 400, enter: 'zoomIn', kb: {scaleFrom: 1.0, scaleTo: 1.05,  dx: -12, dy: -8}},                  // Follow-Up
  {src: 'slides/slide-08.png', start: 2340, dur: 418, enter: 'slideL', kb: {scaleFrom: 1.0, scaleTo: 1.05,  dx: 14,  dy: 0}},                   // Review
  {src: 'slides/slide-09.png', start: 2742, dur: 346, enter: 'slideU', kb: {scaleFrom: 1.0, scaleTo: 1.05,  dx: 0,   dy: 10}},                  // Reporting
  {src: 'slides/slide-10.png', start: 3072, dur: 528, enter: 'zoomIn', kb: {scaleFrom: 1.0, scaleTo: 1.04,  dx: 0,   dy: 0}, accent: true},     // CTA (held to end)
];

export const BOUNDARIES = SLIDES.slice(1).map((s) => s.start);
export const DURATION = 3600;
export const FPS = 60;
