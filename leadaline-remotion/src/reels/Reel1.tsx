import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme} from '../lib/theme';
import {easeOut} from '../lib/anim';
import {ReelBg, Caption, Sub, VPhone, Notify, Chip, Flip, EndCard, ReelRoot, env, site} from './shared';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/* Beats @30fps — total 930 (31s)
   S1   0-135   You're on the tools + incoming call ringing
   S2 135-300   Missed call. 85% won't leave a voicemail
   S3 300-435   They ring the next electrician on Google
   S4 435-650   FLIP: LeadaLine answers in one ring (AI screen, chips)
   S5 650-790   The lead lands on your phone
   S6 790-930   End card
*/

const RING_END = 135;

/** Incoming call screen; rings until RING_END, then "Missed Call". */
const CallScreen: React.FC<{lf: number}> = ({lf}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ringing = lf < RING_END;
  const t = frame / fps;
  const buzz = ringing ? Math.sin(t * Math.PI * 2 * 9) * 2.4 * (0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 1.1)) : 0;
  const missedP = interpolate(lf, [RING_END + 8, RING_END + 26], [0, 1], {...clamp, easing: easeOut});
  return (
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 0%, #10192B, #070B12 72%)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 150, transform: `translateX(${buzz}px)`}}>
      <div style={{fontFamily: theme.fonts.body, fontSize: 26, color: '#8FA3B8', fontWeight: 600, opacity: ringing ? 1 : 0.35}}>mobile</div>
      <div style={{fontFamily: theme.fonts.display, fontSize: 52, fontWeight: 700, color: '#fff', marginTop: 8, opacity: ringing ? 1 : 0.35}}>Potential customer</div>
      <div style={{fontFamily: theme.fonts.body, fontSize: 25, color: ringing ? site.cyan : '#5A6B7C', fontWeight: 700, marginTop: 12}}>
        {ringing ? 'incoming call…' : 'call ended'}
      </div>

      {/* pulsing rings around avatar */}
      <div style={{position: 'relative', marginTop: 60, width: 210, height: 210, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {ringing &&
          [0, 1, 2].map((i) => {
            const p = ((lf + i * 22) % 66) / 66;
            return <div key={i} style={{position: 'absolute', inset: 0, borderRadius: '50%', border: '2.5px solid rgba(24,215,255,0.6)', opacity: 0.55 * (1 - p), transform: `scale(${0.7 + p * 0.9})`}} />;
          })}
        <div style={{width: 170, height: 170, borderRadius: '50%', background: 'linear-gradient(150deg,#22364E,#101B2B)', border: '1px solid rgba(140,180,230,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: ringing ? 1 : 0.4}}>
          <svg viewBox="0 0 24 24" width={84} height={84} fill="none" stroke="#B9CBDE" strokeWidth={1.6}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        </div>
      </div>

      {/* answer / decline while ringing */}
      {ringing && (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 110, display: 'flex', justifyContent: 'space-between', padding: '0 90px'}}>
          <div style={{width: 118, height: 118, borderRadius: '50%', background: '#E53B4E', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 40px rgba(229,59,78,0.4)'}}>
            <svg viewBox="0 0 24 24" width={54} height={54} fill="none" stroke="#fff" strokeWidth={2} style={{transform: 'rotate(135deg)'}}>
              <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
          </div>
          <div style={{width: 118, height: 118, borderRadius: '50%', background: '#34C759', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 40px rgba(52,199,89,0.4)', transform: `scale(${1 + 0.06 * Math.sin(t * Math.PI * 2 * 2)})`}}>
            <svg viewBox="0 0 24 24" width={54} height={54} fill="none" stroke="#fff" strokeWidth={2}>
              <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
          </div>
        </div>
      )}

      {/* missed call banner */}
      {!ringing && (
        <div style={{position: 'absolute', left: 40, right: 40, top: 470, background: 'rgba(40,20,26,0.92)', border: '1px solid rgba(229,59,78,0.4)', borderRadius: 26, padding: '30px 32px', opacity: missedP, transform: `translateY(${(1 - missedP) * 30}px)`, display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{width: 58, height: 58, borderRadius: '50%', background: '#E53B4E', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 58px'}}>
            <svg viewBox="0 0 24 24" width={30} height={30} fill="none" stroke="#fff" strokeWidth={2.4}>
              <path d="M16 2v6h6" opacity={0} />
              <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              <path d="M23 1l-6 6M17 1l6 6" strokeWidth={2.2} />
            </svg>
          </div>
          <div style={{fontFamily: theme.fonts.body}}>
            <div style={{fontSize: 30, fontWeight: 800, color: '#FF8896'}}>Missed call</div>
            <div style={{fontSize: 22, color: '#C9AAB1', marginTop: 4}}>No voicemail left</div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Search results card — "they call the next firm". */
const NextFirm: React.FC<{lf: number}> = ({lf}) => {
  const rows = [
    {name: 'A&P Electrical Ltd', stars: '★★★★★ 5.0', badge: 'They answered'},
    {name: 'Brightline Electrics', stars: '★★★★☆ 4.8', badge: ''},
    {name: 'You', stars: '★★★★★ 4.9', badge: 'Missed the call', you: true},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0B1017', padding: '110px 26px 0'}}>
      <div style={{background: '#131A24', borderRadius: 22, padding: '20px 26px', display: 'flex', alignItems: 'center', gap: 16, border: '1px solid rgba(140,170,210,0.14)'}}>
        <svg viewBox="0 0 24 24" width={30} height={30} fill="none" stroke="#8FA3B8" strokeWidth={2.2}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span style={{fontFamily: theme.fonts.body, fontSize: 27, color: '#D7E2EC', fontWeight: 600}}>electrician near me</span>
      </div>
      <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 16}}>
        {rows.map((r, i) => {
          const f = lf - 20 - i * 14;
          const p = interpolate(f, [0, 14], [0, 1], {...clamp, easing: easeOut});
          return (
            <div key={i} style={{background: r.you ? 'rgba(40,22,28,0.8)' : '#121926', border: `1px solid ${r.you ? 'rgba(229,59,78,0.35)' : 'rgba(140,170,210,0.12)'}`, borderRadius: 20, padding: '24px 26px', opacity: p * (r.you ? 0.85 : 1), transform: `translateY(${(1 - p) * 26}px)`, fontFamily: theme.fonts.body}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: 28, fontWeight: 800, color: r.you ? '#B9909A' : '#F0F6FC'}}>{r.name}</span>
                {r.badge && (
                  <span style={{fontSize: 18, fontWeight: 800, color: r.you ? '#FF8896' : '#0A121B', background: r.you ? 'rgba(229,59,78,0.18)' : '#34C759', borderRadius: 100, padding: '8px 16px'}}>{r.badge}</span>
                )}
              </div>
              <div style={{fontSize: 21, color: '#F5B301', marginTop: 6}}>{r.stars} <span style={{color: '#7E93A9'}}>· Google</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** AI answer screen: waveform + capture chips. */
const AiAnswer: React.FC<{lf: number}> = ({lf}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 0%, #0D1A2A, #070B12 70%)', padding: '110px 30px 0'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{position: 'relative', width: 72, height: 72}}>
          {[0, 1].map((i) => {
            const p = ((lf + i * 25) % 50) / 50;
            return <div key={i} style={{position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(52,199,89,0.7)', opacity: 0.6 * (1 - p), transform: `scale(${0.8 + p * 0.8})`}} />;
          })}
          <div style={{position: 'absolute', inset: 6, borderRadius: '50%', background: site.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="#04121B" strokeWidth={2.4}>
              <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
          </div>
        </div>
        <div style={{fontFamily: theme.fonts.body}}>
          <div style={{fontSize: 28, fontWeight: 800, color: '#fff'}}>Answered · 1st ring</div>
          <div style={{fontSize: 21, fontWeight: 700, color: theme.green, marginTop: 3, display: 'flex', alignItems: 'center', gap: 9}}>
            <span style={{width: 10, height: 10, borderRadius: '50%', background: theme.green, boxShadow: '0 0 10px rgba(52,199,89,0.9)'}} />
            Your AI receptionist · live
          </div>
        </div>
      </div>

      {/* waveform */}
      <div style={{display: 'flex', alignItems: 'center', gap: 7, height: 90, marginTop: 34, justifyContent: 'center'}}>
        {Array.from({length: 26}).map((_, i) => {
          const hgt = 14 + 52 * Math.abs(Math.sin(frame * 0.31 + i * 0.55)) * (0.4 + 0.6 * Math.abs(Math.sin(frame * 0.083 + i * 0.21)));
          return <div key={i} style={{width: 9, height: hgt, borderRadius: 5, background: `linear-gradient(180deg, ${site.cyan}, ${site.violet})`, opacity: 0.9}} />;
        })}
      </div>

      <div style={{marginTop: 30, display: 'flex', flexDirection: 'column', gap: 16}}>
        <Chip lf={lf} delay={40} label="Service" value="Fuse board replacement" />
        <Chip lf={lf} delay={70} label="Location" value="Eltham · SE9" />
        <Chip lf={lf} delay={100} label="Urgency" value="This week · quoted job" />
      </div>
    </div>
  );
};

export const Reel1: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ReelRoot>
      <ReelBg warm={frame > 435 ? 1 : 0} />

      {/* S1+S2 — call rings then missed */}
      <AbsoluteFill style={{opacity: env(frame, 0, 300, 10, 14)}}>
        {frame < 150 && <Caption text="You're up a *ladder*." lf={frame} top={165} size={96} delay={4} />}
        {frame >= 150 && (
          <>
            <Caption text="That job just *hung up*." lf={frame - 150} top={140} size={92} />
            <Sub text="85% of callers won't leave a voicemail." lf={frame - 150} top={372} delay={16} size={36} width={900} />
          </>
        )}
        <VPhone lf={frame} delay={6} top={470} glow="rgba(229,59,78,0.25)">
          <CallScreen lf={frame} />
        </VPhone>
      </AbsoluteFill>

      {/* S3 — they call the next firm */}
      <AbsoluteFill style={{opacity: env(frame, 300, 435, 12, 12)}}>
        <Caption text="They ring the *next* electrician." lf={frame - 300} top={140} size={90} />
        <Sub text="~8 in 10 move on within 30 minutes." lf={frame - 300} top={368} delay={18} size={36} width={900} />
        <VPhone lf={frame - 300} delay={4} top={505} glow="rgba(124,92,255,0.22)">
          <NextFirm lf={frame - 300} />
        </VPhone>
      </AbsoluteFill>

      <Flip lf={frame} at={435} />

      {/* S4 — LeadaLine answers */}
      <AbsoluteFill style={{opacity: env(frame, 435, 650, 12, 12)}}>
        <Caption text="LeadaLine answers in *one ring*." lf={frame - 435} top={135} size={88} />
        <Sub text="Every call, web form and WhatsApp — day and night." lf={frame - 435} top={362} delay={20} size={35} width={920} />
        <VPhone lf={frame - 435} delay={6} top={500} glow="rgba(24,215,255,0.30)">
          <AiAnswer lf={frame - 435} />
        </VPhone>
      </AbsoluteFill>

      {/* S5 — lead lands with the owner */}
      <AbsoluteFill style={{opacity: env(frame, 650, 790, 12, 12)}}>
        <Caption text="The job lands *in your pocket*." lf={frame - 650} top={140} size={90} />
        <Sub text="Qualified, scored and sent by SMS + email — in seconds." lf={frame - 650} top={368} delay={16} size={35} width={920} />
        <VPhone lf={frame - 650} delay={4} top={505} glow="rgba(47,123,255,0.3)" time="14:34">
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, #0E1626, #070B12 70%)'}}>
            <div style={{textAlign: 'center', marginTop: 130, fontFamily: theme.fonts.body, color: '#C7D3DE', fontSize: 27, fontWeight: 600}}>Thursday 19 June</div>
            <div style={{textAlign: 'center', fontFamily: theme.fonts.display, color: '#fff', fontSize: 130, letterSpacing: -2, lineHeight: 1}}>14:34</div>
            <Notify lf={frame - 650} delay={26} top={480} title="LeadaLine" line1="New qualified lead — Fuse board · SE9" line2="This week · est. £680–£950 · call back after 5pm" />
          </div>
        </VPhone>
      </AbsoluteFill>

      {/* S6 — end card */}
      <AbsoluteFill style={{opacity: env(frame, 790, 930, 12, 0)}}>
        <EndCard lf={frame - 790} line="Never miss another *call*." siteSrc="site/book-mobile.png" siteWidth={586} siteFrom={0} siteTo={2300} />
      </AbsoluteFill>
    </ReelRoot>
  );
};
