import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme} from '../lib/theme';
import {easeOut} from '../lib/anim';
import {demoData} from '../data/config';
import {SCENES} from '../lib/timing';

const STEPS = ['Enquiry', 'Capture', 'Qualify', 'Owner summary', 'CRM', 'Follow-up', 'Reporting'];

/** Maps the global frame to the active pipeline stage index. */
const activeStep = (frame: number): number => {
  if (frame < SCENES.receptionist.start) return 0;
  if (frame < SCENES.qualify.start) return 1;
  if (frame < SCENES.ownerSummary.start) return 2;
  if (frame < SCENES.dashboard.start) return 3;
  if (frame < SCENES.booking.start) return 4;
  if (frame < SCENES.completed.start) return 5;
  return 6;
};

export const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inOp = interpolate(frame, [6, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});
  // fade the chrome out for the CTA
  const outOp = interpolate(frame, [SCENES.cta.start - 8, SCENES.cta.start + 8], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const op = Math.min(inOp, outOp);
  const active = activeStep(frame);

  return (
    <>
      {/* logo */}
      <div style={{position: 'absolute', left: 130, top: 66, opacity: op}}>
        <Img src={staticFile('logo.png')} style={{width: 360, height: 'auto'}} />
      </div>

      {/* step bar */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 74,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: op,
          fontFamily: theme.fonts.body,
        }}
      >
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <React.Fragment key={s}>
              {i > 0 && <div style={{width: 14, height: 1, background: theme.line}} />}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  padding: '8px 15px',
                  borderRadius: 100,
                  whiteSpace: 'nowrap',
                  color: on ? '#fff' : theme.muted2,
                  border: on ? '1px solid transparent' : `1px solid ${theme.line}`,
                  background: on ? theme.grad : 'rgba(12,19,27,0.6)',
                  boxShadow: on ? '0 8px 20px rgba(59,156,245,0.35)' : 'none',
                  transition: 'none',
                }}
              >
                {s}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* tagline (fades after the hook) */}
      <div
        style={{
          position: 'absolute',
          left: 130,
          bottom: 60,
          fontFamily: theme.fonts.body,
          fontSize: 22,
          fontWeight: 600,
          color: theme.muted2,
          opacity:
            op *
            interpolate(frame, [SCENES.receptionist.start - 10, SCENES.receptionist.start + 6], [1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
        }}
      >
        {demoData.brand.name} · <span style={{color: theme.muted}}>{demoData.brand.tagline}</span>
      </div>
    </>
  );
};
