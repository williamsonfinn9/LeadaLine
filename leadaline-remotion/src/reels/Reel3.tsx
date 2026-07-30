import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {theme} from '../lib/theme';
import {easeOut} from '../lib/anim';
import {ReelBg, Caption, Sub, VPhone, Msg, Notify, Flip, EndCard, ReelRoot, env, site} from './shared';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/* Beats @30fps — total 930 (31s)
   S1   0-165   21:47. Your office closed 5 hours ago (enquiry arrives)
   S2 165-330   Most firms reply tomorrow. Some never do.
   S3 330-585   FLIP: Your AI answers in seconds (qualifies + books 08:30)
   S4 585-780   You wake up to booked work (07:02 lock screen summary)
   S5 780-930   End card
*/

/** Late-night enquiry thread. */
const NightMsg: React.FC<{lf: number}> = ({lf}) => (
  <div style={{position: 'absolute', inset: 0, background: '#000', display: 'flex', flexDirection: 'column'}}>
    <div style={{padding: '92px 24px 18px', borderBottom: '1px solid #1A1A1C', display: 'flex', alignItems: 'center', gap: 15, background: 'rgba(20,20,22,0.94)'}}>
      <div style={{width: 62, height: 62, borderRadius: '50%', background: 'linear-gradient(150deg,#22364E,#101B2B)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(140,180,230,0.2)'}}>
        <span style={{fontFamily: theme.fonts.display, fontSize: 24, fontWeight: 700, color: '#B9CBDE'}}>SM</span>
      </div>
      <div style={{fontFamily: theme.fonts.body}}>
        <div style={{fontSize: 27, fontWeight: 700, color: '#fff'}}>Sarah M. — new enquiry</div>
        <div style={{fontSize: 19, color: '#8FA3B8', fontWeight: 600}}>via your website · 21:47</div>
      </div>
    </div>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 17, padding: '30px 26px'}}>
      <Msg lf={lf} delay={26} text="Hi — our fuse box keeps tripping every time we use the oven. Bit worried. Could someone take a look this week?" time="21:47" />
    </div>
  </div>
);

/** AI night conversation: instant answer, qualify, book. */
const NightAi: React.FC<{lf: number}> = ({lf}) => (
  <div style={{position: 'absolute', inset: 0, background: '#000', display: 'flex', flexDirection: 'column'}}>
    <div style={{padding: '92px 24px 18px', borderBottom: '1px solid #1A1A1C', display: 'flex', alignItems: 'center', gap: 15, background: 'rgba(20,20,22,0.94)'}}>
      <div style={{width: 62, height: 62, borderRadius: '50%', background: site.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="#04121B" strokeWidth={2.2}>
          <path d="M12 2a7 7 0 0 1 7 7v4a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z" opacity={0} />
          <path d="M4 12a8 8 0 0 1 16 0v6a2 2 0 0 1-2 2h-2v-6h3M4 12v6a2 2 0 0 0 2 2h2v-6H5" />
        </svg>
      </div>
      <div style={{fontFamily: theme.fonts.body}}>
        <div style={{fontSize: 27, fontWeight: 700, color: '#fff'}}>Your AI · answering</div>
        <div style={{fontSize: 19, color: theme.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8}}>
          <span style={{width: 9, height: 9, borderRadius: '50%', background: theme.green, boxShadow: '0 0 9px rgba(52,199,89,0.9)'}} />
          replied in 6 seconds
        </div>
      </div>
    </div>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: '26px 26px 44px', justifyContent: 'flex-end', overflow: 'hidden'}}>
      <Msg lf={lf} delay={10} ai text="Hi Sarah — sorry to hear that, a tripping board is worth checking quickly. Is it one circuit or the whole house?" time="21:47" />
      <Msg lf={lf} delay={72} text="Just the kitchen sockets I think!" time="21:48" />
      <Msg lf={lf} delay={128} ai text={<span>Thanks — that helps. We can have an engineer out <b>tomorrow at 08:30</b>. Shall I book it?</span>} time="21:48" />
      <Msg lf={lf} delay={190} text="Yes please! 🙏" time="21:49" />
    </div>
  </div>
);

/** Morning lock screen with the overnight summary. */
const Morning: React.FC<{lf: number}> = ({lf}) => {
  const sun = interpolate(lf, [0, 60], [0, 1], {...clamp, easing: easeOut});
  return (
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(255,170,90,${0.14 * sun}) 0%, rgba(14,22,38,1) 46%, #070B12 100%)`}}>
      <div style={{textAlign: 'center', marginTop: 128, fontFamily: theme.fonts.body, color: '#C7D3DE', fontSize: 27, fontWeight: 600}}>Friday 20 June</div>
      <div style={{textAlign: 'center', fontFamily: theme.fonts.display, color: '#fff', fontSize: 130, letterSpacing: -2, lineHeight: 1}}>07:02</div>
      <Notify lf={lf} delay={26} top={470} title="LeadaLine · overnight" line1="1 new enquiry — answered in 6 seconds" line2="Qualified · booked for 08:30 today ✓" />
      <Notify lf={lf} delay={64} top={700} title="Your diary" line1="08:30 — Sarah M. · kitchen circuit fault" line2="Confirmed with the customer last night" accent="linear-gradient(140deg,#34C759,#1E9E52)" />
    </div>
  );
};

export const Reel3: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ReelRoot>
      <ReelBg warm={frame > 585 ? 1 : 0} />

      {/* S1 — the 21:47 enquiry */}
      <AbsoluteFill style={{opacity: env(frame, 0, 165, 10, 12)}}>
        <div style={{position: 'absolute', left: '50%', top: 148, transform: 'translateX(-50%)', fontFamily: theme.fonts.display, fontSize: 132, fontWeight: 700, letterSpacing: -3, color: '#F4F8FC', opacity: interpolate(frame, [4, 22], [0, 1], clamp), textShadow: '0 6px 60px rgba(24,215,255,0.25)'}}>
          21:47
        </div>
        <Caption text="Your office closed *5 hours ago*." lf={frame} top={318} size={74} delay={18} />
        <VPhone lf={frame} delay={14} top={520} glow="rgba(124,92,255,0.24)" time="21:47">
          <NightMsg lf={frame} />
        </VPhone>
      </AbsoluteFill>

      {/* S2 — everyone's closed */}
      <AbsoluteFill style={{opacity: env(frame, 165, 330, 12, 12)}}>
        <Caption text="Most firms reply *tomorrow*." lf={frame - 165} top={165} size={94} />
        <Caption text="Some *never do*." lf={frame - 165} top={300} size={94} delay={26} />
        <Sub text="Harvard research: the average business takes 42 hours to respond." lf={frame - 165} top={470} delay={40} size={36} />
        <div style={{position: 'absolute', left: '50%', top: 640, transform: 'translateX(-50%)', width: 700, display: 'flex', flexDirection: 'column', gap: 20}}>
          {['A&P Electrical — closed', 'Brightline Electrics — closed', 'CityVolt Ltd — voicemail'].map((t, i) => {
            const p = interpolate(frame - 165 - 46 - i * 18, [0, 14], [0, 1], {...clamp, easing: easeOut});
            return (
              <div key={i} style={{background: 'rgba(16,22,32,0.85)', border: '1px solid rgba(140,170,210,0.1)', borderRadius: 22, padding: '28px 34px', fontFamily: theme.fonts.body, fontSize: 30, fontWeight: 700, color: '#66798D', display: 'flex', justifyContent: 'space-between', opacity: p * 0.95, transform: `translateY(${(1 - p) * 26}px)`}}>
                {t.split(' — ')[0]}
                <span style={{color: '#4E5D6E', fontWeight: 600}}>{t.split(' — ')[1]}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <Flip lf={frame} at={330} />

      {/* S3 — AI answers at night */}
      <AbsoluteFill style={{opacity: env(frame, 330, 585, 12, 12)}}>
        <Caption text="Your AI answered in *6 seconds*." lf={frame - 330} top={138} size={86} />
        <Sub text="Qualified the job. Calmed the customer. Booked the morning." lf={frame - 330} top={362} delay={22} size={35} width={920} />
        <VPhone lf={frame - 330} delay={6} top={500} glow="rgba(24,215,255,0.3)" time="21:47">
          <NightAi lf={frame - 330} />
        </VPhone>
      </AbsoluteFill>

      {/* S4 — wake up to booked work */}
      <AbsoluteFill style={{opacity: env(frame, 585, 780, 12, 12)}}>
        <Caption text="You wake up to *booked work*." lf={frame - 585} top={150} size={92} />
        <VPhone lf={frame - 585} delay={6} top={430} glow="rgba(255,170,90,0.2)" time="07:02">
          <Morning lf={frame - 585} />
        </VPhone>
      </AbsoluteFill>

      {/* S5 — end card */}
      <AbsoluteFill style={{opacity: env(frame, 780, 930, 12, 0)}}>
        <EndCard lf={frame - 780} line="Every enquiry. *Day and night*." siteSrc="site/offer-mobile.png" siteWidth={620} siteFrom={0} siteTo={4200} />
      </AbsoluteFill>
    </ReelRoot>
  );
};
