import {interpolate, spring, Easing} from 'remotion';

/** Premium ease — smooth, confident deceleration. */
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.5, 0, 0.75, 0);

/** Spring presets tuned for a high-end SaaS feel. */
export const springs = {
  snappy: {damping: 18, stiffness: 220, mass: 0.7},
  smooth: {damping: 26, stiffness: 140, mass: 0.9},
  pop: {damping: 12, stiffness: 200, mass: 0.6},
};

/**
 * Fade + rise + subtle scale + motion-blur-ish reveal.
 * Returns a style object; drive it with a local frame (frame - startFrame).
 */
export const reveal = (
  frame: number,
  fps: number,
  {
    delay = 0,
    y = 26,
    scaleFrom = 0.98,
    blur = 8,
    duration = 22,
  }: {delay?: number; y?: number; scaleFrom?: number; blur?: number; duration?: number} = {}
): React.CSSProperties => {
  const f = frame - delay;
  const p = interpolate(f, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  const b = interpolate(f, [0, duration * 0.7], [blur, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * y}px) scale(${scaleFrom + (1 - scaleFrom) * p})`,
    filter: b > 0.05 ? `blur(${b}px)` : 'none',
  };
};

/** Spring-driven fly-in from a direction (dx/dy in px). */
export const flyIn = (
  frame: number,
  fps: number,
  {delay = 0, dx = 0, dy = 0, config = springs.smooth}: {delay?: number; dx?: number; dy?: number; config?: object} = {}
): React.CSSProperties => {
  const s = spring({frame: frame - delay, fps, config});
  return {
    opacity: interpolate(s, [0, 1], [0, 1]),
    transform: `translate(${(1 - s) * dx}px, ${(1 - s) * dy}px) scale(${0.94 + 0.06 * s})`,
  };
};

/** Idle float for keeping elements alive (no dead space). */
export const float = (frame: number, fps: number, amp = 8, periodSec = 4) => {
  const t = (frame / fps / periodSec) * Math.PI * 2;
  return Math.sin(t) * amp;
};

/** Count-up number helper. */
export const countUp = (
  frame: number,
  fps: number,
  to: number,
  {delay = 0, duration = 40}: {delay?: number; duration?: number} = {}
) =>
  Math.round(
    interpolate(frame - delay, [0, duration], [0, to], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeOut,
    })
  );
