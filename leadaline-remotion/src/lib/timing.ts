export const FPS = 60;

/** Scene map in frames @60fps. Panels handle their own enter/exit + overlap. */
export const SCENES = {
  hook: {start: 0, dur: 240},
  receptionist: {start: 240, dur: 300},
  qualify: {start: 540, dur: 360},
  ownerSummary: {start: 900, dur: 300},
  dashboard: {start: 1200, dur: 360},
  booking: {start: 1560, dur: 360},
  completed: {start: 1920, dur: 240},
  reviewReq: {start: 2160, dur: 300},
  reviewLogged: {start: 2460, dur: 330},
  cta: {start: 2790, dur: 330},
} as const;

export const DURATION = 3120; // 52s @ 60fps

export type SceneKey = keyof typeof SCENES;

/** Local frame within a scene. */
export const local = (frame: number, key: SceneKey) => frame - SCENES[key].start;

/** Standard panel opacity envelope: fade in over `inF`, hold, fade out over `outF` before scene end. */
export const panelEnvelope = (
  frame: number,
  key: SceneKey,
  inF = 16,
  outF = 12
): number => {
  const {start, dur} = SCENES[key];
  const f = frame - start;
  if (f < 0 || f > dur) return 0;
  const fin = Math.min(1, f / inF);
  const fout = Math.min(1, (dur - f) / outF);
  return Math.max(0, Math.min(fin, fout));
};
