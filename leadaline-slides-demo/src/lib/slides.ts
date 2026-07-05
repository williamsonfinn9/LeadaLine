/** Slide sequence + Ken Burns + transition config. Frames @60fps, total 3600 (60s). */
export type Enter = 'zoomIn' | 'slideL' | 'slideU';
export type Slide = {
  src: string;          // image under /slides
  start: number;        // start frame
  dur: number;          // frames on screen (overlaps next by ~16)
  enter: Enter;
  kb: {scaleFrom: number; scaleTo: number; dx: number; dy: number};
  accent?: boolean;     // glow pulse (CTA)
};

// Windows aligned to the voiceover (see /renders/timing-plan.json).
export const SLIDES: Slide[] = [
  {src: 'slides/slide-01.png', start: 0,    dur: 346, enter: 'zoomIn', kb: {scaleFrom: 1.04, scaleTo: 1.10, dx: 0,  dy: -18}},
  {src: 'slides/slide-02.png', start: 330,  dur: 520, enter: 'slideL', kb: {scaleFrom: 1.05, scaleTo: 1.11, dx: -26, dy: 0}},
  {src: 'slides/slide-03.png', start: 834,  dur: 304, enter: 'slideU', kb: {scaleFrom: 1.05, scaleTo: 1.10, dx: 22,  dy: 12}},
  {src: 'slides/slide-04.png', start: 1122, dur: 358, enter: 'zoomIn', kb: {scaleFrom: 1.06, scaleTo: 1.11, dx: 24,  dy: -14}},
  {src: 'slides/slide-05.png', start: 1464, dur: 370, enter: 'slideL', kb: {scaleFrom: 1.04, scaleTo: 1.10, dx: -24, dy: 10}},
  {src: 'slides/slide-06.png', start: 1818, dur: 412, enter: 'slideU', kb: {scaleFrom: 1.05, scaleTo: 1.11, dx: 20,  dy: 14}},
  {src: 'slides/slide-07.png', start: 2214, dur: 424, enter: 'zoomIn', kb: {scaleFrom: 1.05, scaleTo: 1.10, dx: -20, dy: -12}},
  {src: 'slides/slide-08.png', start: 2622, dur: 358, enter: 'slideL', kb: {scaleFrom: 1.05, scaleTo: 1.11, dx: 24,  dy: 0}},
  {src: 'slides/slide-09.png', start: 2964, dur: 636, enter: 'zoomIn', kb: {scaleFrom: 1.03, scaleTo: 1.08, dx: 0,  dy: 0}, accent: true}, // CTA + hold
];

export const BOUNDARIES = SLIDES.slice(1).map((s) => s.start);
export const DURATION = 3600;
export const FPS = 60;
