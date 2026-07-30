import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme} from '../lib/theme';
import {easeOut} from '../lib/anim';
import {ReelBg, Caption, Sub, VPhone, Msg, Flip, EndCard, ReelRoot, env, site} from './shared';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/* Beats @30fps — total 930 (31s)
   S1   0-150   You quoted £1,400 on Tuesday (thread, quote sent)
   S2 150-330   Then… nothing. Days tick past
   S3 330-570   FLIP: LeadaLine chases it (nudges → YES)
   S4 570-780   Booked + CRM flips to Won
   S5 780-930   End card
*/

/** The quote thread — used in S1/S2 (goes quiet) and S3 (comes alive). */
const Thread: React.FC<{lf: number; phase: 'sent' | 'silent' | 'chase'}> = ({lf, phase}) => {
  return (
    <div style={{position: 'absolute', inset: 0, background: '#000', display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '92px 24px 18px', borderBottom: '1px solid #1A1A1C', display: 'flex', alignItems: 'center', gap: 15, background: 'rgba(20,20,22,0.94)'}}>
        <div style={{width: 62, height: 62, borderRadius: '50%', background: 'linear-gradient(150deg,#22364E,#101B2B)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(140,180,230,0.2)'}}>
          <span style={{fontFamily: theme.fonts.display, fontSize: 24, fontWeight: 700, color: '#B9CBDE'}}>DW</span>
        </div>
        <div style={{fontFamily: theme.fonts.body}}>
          <div style={{fontSize: 27, fontWeight: 700, color: '#fff'}}>Dan W. — rewire quote</div>
          <div style={{fontSize: 19, color: phase === 'silent' ? '#5A6B7C' : theme.green, fontWeight: 600}}>
            {phase === 'silent' ? 'last seen Tuesday' : phase === 'chase' ? 'LeadaLine follow-up · active' : 'quote sent'}
          </div>
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 17, padding: '30px 26px', justifyContent: phase === 'chase' ? 'flex-end' : 'flex-start', overflow: 'hidden', paddingBottom: 44}}>
        <Msg lf={lf} delay={12} ai text={<span>Hi Dan — quote for the full rewire: <b>£1,400</b> inc. certification. Any questions just ask!</span>} time="Tue 09:12" />
        {phase === 'sent' && <Msg lf={lf} delay={54} text="Thanks, I'll have a think 👍" time="Tue 09:31" />}
        {phase === 'silent' && (
          <>
            <Msg lf={lf} delay={0} text="Thanks, I'll have a think 👍" time="Tue 09:31" grey />
            <div style={{alignSelf: 'center', marginTop: 26, fontFamily: theme.fonts.body, fontSize: 22, color: '#4E5D6E', fontWeight: 600, opacity: interpolate(lf, [30, 50], [0, 1], clamp)}}>
              Delivered · Tuesday
            </div>
          </>
        )}
        {phase === 'chase' && (
          <>
            <Msg lf={lf} delay={16} ai text="Hi Dan — just checking you got the rewire quote. Happy to talk anything through." time="Thu · auto" />
            <Msg lf={lf} delay={78} ai text="We've got space to start the week of the 14th if that helps — after that it's a 3-week wait." time="Sat · auto" />
            <Msg lf={lf} delay={150} text={<span>Sorry, mad week! Yes — let's go ahead 👍</span>} time="Sat 18:04" />
          </>
        )}
      </div>
    </div>
  );
};

/** Day ticker for the silence beat. */
const Days: React.FC<{lf: number}> = ({lf}) => {
  const days = ['WED', 'THU', 'FRI', 'SAT'];
  return (
    <div style={{position: 'absolute', left: '50%', top: 462, transform: 'translateX(-50%)', display: 'flex', gap: 26}}>
      {days.map((d, i) => {
        const f = lf - 26 - i * 26;
        const p = interpolate(f, [0, 14], [0, 1], {...clamp, easing: easeOut});
        return (
          <div key={d} style={{fontFamily: theme.fonts.display, fontSize: 34, fontWeight: 700, letterSpacing: 3, color: '#5A6B7C', opacity: p * 0.9, transform: `translateY(${(1 - p) * 18}px)`, borderBottom: '3px solid rgba(90,107,124,0.4)', paddingBottom: 8}}>
            {d}
          </div>
        );
      })}
    </div>
  );
};

/** CRM card: quote status flips to WON. */
const CrmWon: React.FC<{lf: number}> = ({lf}) => {
  const flip = interpolate(lf - 60, [0, 16], [0, 1], {...clamp, easing: easeOut});
  const rows = [
    {n: 'Dan W.', j: 'Full rewire', v: '£1,400'},
    {n: 'S. Okafor', j: 'EV charger', v: '£1,050'},
    {n: 'M. Price', j: 'Consumer unit', v: '£620'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0B121C,#070B12)', padding: '104px 26px 0'}}>
      <div style={{fontFamily: theme.fonts.body, fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 11}}>
        <span style={{width: 10, height: 10, borderRadius: '50%', background: site.cyan, boxShadow: '0 0 10px rgba(24,215,255,0.8)'}} />
        Quotes — this week
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
        {rows.map((r, i) => {
          const p = interpolate(lf - 14 - i * 12, [0, 14], [0, 1], {...clamp, easing: easeOut});
          const isWon = i === 0;
          return (
            <div key={i} style={{background: '#121A26', border: `1px solid ${isWon && flip > 0.4 ? 'rgba(52,199,89,0.45)' : 'rgba(140,170,210,0.12)'}`, borderRadius: 20, padding: '24px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: p, transform: `translateY(${(1 - p) * 24}px)`, boxShadow: isWon && flip > 0.4 ? '0 0 40px rgba(52,199,89,0.18)' : 'none'}}>
              <div style={{fontFamily: theme.fonts.body}}>
                <div style={{fontSize: 27, fontWeight: 800, color: '#F0F6FC'}}>{r.n}</div>
                <div style={{fontSize: 21, color: '#7E93A9', marginTop: 4}}>{r.j} · {r.v}</div>
              </div>
              {isWon ? (
                <div style={{position: 'relative', width: 128, height: 52}}>
                  <span style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#F5B301', background: 'rgba(245,179,1,0.14)', borderRadius: 100, opacity: 1 - flip, transform: `scale(${1 - 0.15 * flip})`}}>Chasing</span>
                  <span style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#04121B', background: theme.green, borderRadius: 100, opacity: flip, transform: `scale(${0.7 + 0.3 * flip})`, boxShadow: '0 8px 26px rgba(52,199,89,0.45)'}}>WON ✓</span>
                </div>
              ) : (
                <span style={{fontSize: 20, fontWeight: 800, color: '#8FA3B8', background: 'rgba(140,163,184,0.12)', borderRadius: 100, padding: '12px 22px'}}>Sent</span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 24, fontFamily: theme.fonts.body, fontSize: 21, color: '#7E93A9', textAlign: 'center', opacity: interpolate(lf - 100, [0, 16], [0, 1], clamp)}}>
        Chased automatically until there's an answer
      </div>
    </div>
  );
};

export const Reel2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ReelRoot>
      <ReelBg warm={frame > 330 ? 1 : 0} />

      {/* S1 — the quote goes out */}
      <AbsoluteFill style={{opacity: env(frame, 0, 150, 10, 12)}}>
        <Caption text="You quoted *£1,400* on Tuesday." lf={frame} top={150} size={92} delay={4} />
        <VPhone lf={frame} delay={8} top={460} glow="rgba(47,123,255,0.26)" time="09:12">
          <Thread lf={frame} phase="sent" />
        </VPhone>
      </AbsoluteFill>

      {/* S2 — silence */}
      <AbsoluteFill style={{opacity: env(frame, 150, 330, 12, 12)}}>
        <Caption text="Then… *nothing*." lf={frame - 150} top={140} size={100} />
        <Sub text="Most quotes need 5+ follow-ups. Most firms send one." lf={frame - 150} top={310} delay={20} size={36} width={920} />
        <Days lf={frame - 150} />
        <VPhone lf={frame - 150} delay={0} top={560} glow="rgba(90,107,124,0.18)" time="18:00">
          <Thread lf={frame - 150} phase="silent" />
        </VPhone>
      </AbsoluteFill>

      <Flip lf={frame} at={330} />

      {/* S3 — LeadaLine chases */}
      <AbsoluteFill style={{opacity: env(frame, 330, 570, 12, 12)}}>
        <Caption text="LeadaLine *chases it* for you." lf={frame - 330} top={138} size={90} />
        <Sub text="Polite. Persistent. In your tone — until there's an answer." lf={frame - 330} top={365} delay={20} size={35} width={920} />
        <VPhone lf={frame - 330} delay={6} top={502} glow="rgba(24,215,255,0.28)" time="18:04">
          <Thread lf={frame - 330} phase="chase" />
        </VPhone>
      </AbsoluteFill>

      {/* S4 — WON */}
      <AbsoluteFill style={{opacity: env(frame, 570, 780, 12, 12)}}>
        <Caption text="That's *£1,400* you nearly lost." lf={frame - 570} top={140} size={88} />
        <Sub text="Every quote tracked in your CRM — nothing slips away." lf={frame - 570} top={368} delay={18} size={35} width={920} />
        <VPhone lf={frame - 570} delay={4} top={505} glow="rgba(52,199,89,0.26)" time="18:05">
          <CrmWon lf={frame - 570} />
        </VPhone>
      </AbsoluteFill>

      {/* S5 — end card */}
      <AbsoluteFill style={{opacity: env(frame, 780, 930, 12, 0)}}>
        <EndCard lf={frame - 780} line="Stop losing *quoted work*." siteSrc="site/offer-mobile.png" siteWidth={620} siteFrom={780} siteTo={4600} />
      </AbsoluteFill>
    </ReelRoot>
  );
};
