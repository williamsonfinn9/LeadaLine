import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme} from '../lib/theme';
import {easeOut, easeInOut} from '../lib/anim';
import {useFonts} from '../lib/fonts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/* Lowry brand, sampled from their own system */
const L = {
  indigo: '#1E2875',
  deep: '#141B52',
  ink: '#0C1138',
  blue: '#3E63DD',
  purple: '#8F3FF0',
  grad: 'linear-gradient(120deg,#3E63DD,#8F3FF0)',
  gradText: {
    backgroundImage: 'linear-gradient(120deg,#7FA0FF,#B98BFF)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  } as React.CSSProperties,
};

/* Beats @30fps, total 750 (25s) */
const B = {
  hook: [0, 140],
  overview: [140, 295],
  jobs: [295, 425],
  whatsapp: [425, 560],
  weRunIt: [560, 645],
  price: [645, 750],
} as const;

const env = (f: number, a: number, b: number, inF = 12, outF = 10) => {
  if (f < a - 1 || f > b + 1) return 0;
  const fin = interpolate(f, [a, a + inF], [0, 1], {...clamp, easing: easeOut});
  const fout = outF > 0 ? interpolate(f, [b - outF, b], [1, 0], {...clamp, easing: easeOut}) : 1;
  return Math.min(fin, fout);
};

/** Brand ground: deep indigo, drifting glows, faint grid. */
const Ground: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{background: `radial-gradient(120% 100% at 50% 0%, ${L.indigo} 0%, ${L.ink} 62%)`}}>
      <div style={{position: 'absolute', left: 300 + Math.sin(t * 0.3) * 300 - 500, top: 120 + Math.cos(t * 0.24) * 160 - 500, width: 1000, height: 1000, borderRadius: '50%', background: 'radial-gradient(circle, rgba(62,99,221,0.30), transparent 66%)', filter: 'blur(80px)'}} />
      <div style={{position: 'absolute', left: 1500 + Math.cos(t * 0.21) * 320 - 520, top: 700 + Math.sin(t * 0.27) * 200 - 520, width: 1040, height: 1040, borderRadius: '50%', background: 'radial-gradient(circle, rgba(143,63,240,0.26), transparent 66%)', filter: 'blur(90px)'}} />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(150,180,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(150,180,255,0.05) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'radial-gradient(85% 70% at 50% 45%, rgba(0,0,0,0.55), transparent)',
          WebkitMaskImage: 'radial-gradient(85% 70% at 50% 45%, rgba(0,0,0,0.55), transparent)',
        }}
      />
      <AbsoluteFill style={{background: 'radial-gradient(120% 92% at 50% 48%, transparent 58%, rgba(4,7,26,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};

/** Word-by-word headline. Wrap accent words in *asterisks*. */
const Head: React.FC<{text: string; lf: number; size?: number; top: number; delay?: number; width?: number}> = ({
  text,
  lf,
  size = 78,
  top,
  delay = 0,
  width = 1500,
}) => {
  const segs = text.split('*');
  const words: {w: string; g: boolean}[] = [];
  segs.forEach((seg, i) => {
    seg.split(/\s+/).forEach((w) => {
      if (!w) return;
      if (/^[.,!?:;]+$/.test(w) && words.length) {
        words[words.length - 1].w += w;
        return;
      }
      words.push({w, g: i % 2 === 1});
    });
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top,
        transform: 'translateX(-50%)',
        width,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: '0.26em',
        rowGap: '0.06em',
        fontFamily: theme.fonts.display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: -1.6,
        textAlign: 'center',
      }}
    >
      {words.map((w, i) => {
        const f = lf - delay - i * 3.5;
        const p = interpolate(f, [0, 14], [0, 1], {...clamp, easing: easeOut});
        const b = interpolate(f, [0, 11], [8, 0], {...clamp, easing: easeOut});
        return (
          <span key={i} style={{opacity: p, transform: `translateY(${(1 - p) * 30}px)`, filter: b > 0.1 ? `blur(${b}px)` : 'none', color: '#F2F6FF', ...(w.g ? L.gradText : {})}}>
            {w.w}
          </span>
        );
      })}
    </div>
  );
};

const Sub: React.FC<{text: string; lf: number; top: number; delay?: number; size?: number; width?: number}> = ({
  text,
  lf,
  top,
  delay = 0,
  size = 34,
  width = 1200,
}) => {
  const p = interpolate(lf - delay, [0, 16], [0, 1], {...clamp, easing: easeOut});
  return (
    <div style={{position: 'absolute', left: '50%', top, transform: `translateX(-50%) translateY(${(1 - p) * 20}px)`, width, opacity: p}}>
      <div style={{textAlign: 'center', fontFamily: theme.fonts.body, fontWeight: 600, fontSize: size, lineHeight: 1.42, color: '#9FB2D8'}}>{text}</div>
    </div>
  );
};

/** A CRM capture inside a soft device frame, with a slow push-in. */
const Screen: React.FC<{
  src: string;
  lf: number;
  dur: number;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: [number, number];
  panY?: [number, number];
  top?: number;
  w?: number;
}> = ({src, lf, dur, zoomFrom = 1.02, zoomTo = 1.14, panX = [0, 0], panY = [0, 0], top = 300, w = 1330}) => {
  const s = interpolate(lf, [0, 26], [0, 1], {...clamp, easing: easeOut});
  const k = interpolate(lf, [0, dur], [0, 1], {...clamp, easing: easeInOut});
  const scale = zoomFrom + (zoomTo - zoomFrom) * k;
  const x = panX[0] + (panX[1] - panX[0]) * k;
  const y = panY[0] + (panY[1] - panY[0]) * k;
  const h = w * (1800 / 3200);
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top,
        transform: `translateX(-50%) translateY(${(1 - s) * 44}px) scale(${0.97 + 0.03 * s})`,
        opacity: s,
        width: w,
        height: h,
        borderRadius: 22,
        overflow: 'hidden',
        background: '#0B1030',
        boxShadow: '0 60px 120px rgba(0,0,0,0.62), 0 0 0 1px rgba(150,180,255,0.16), 0 0 90px rgba(62,99,221,0.20)',
      }}
    >
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
        <Img src={staticFile(src)} style={{position: 'absolute', width: '100%', left: 0, top: 0, transform: `scale(${scale}) translate(${x}%, ${y}%)`, transformOrigin: 'center center'}} />
      </div>
      {/* screen sheen */}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,255,255,0.10), transparent 42%)', pointerEvents: 'none'}} />
    </div>
  );
};

/** Small caption chip that sits above a screen. */
const Chip: React.FC<{text: string; lf: number; delay?: number; top?: number}> = ({text, lf, delay = 0, top = 258}) => {
  const p = interpolate(lf - delay, [0, 14], [0, 1], {...clamp, easing: easeOut});
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top,
        transform: `translateX(-50%) translateY(${(1 - p) * 14}px)`,
        opacity: p,
        fontFamily: theme.fonts.body,
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: 2.6,
        textTransform: 'uppercase',
        color: '#9FB2D8',
        border: '1px solid rgba(150,180,255,0.22)',
        borderRadius: 100,
        padding: '11px 26px',
        background: 'rgba(20,27,82,0.5)',
      }}
    >
      {text}
    </div>
  );
};

export const LowryDemo: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 2 * 0.7);

  return (
    <AbsoluteFill style={{fontFamily: theme.fonts.body, overflow: 'hidden'}}>
      <Ground />

      {/* 1 — hook */}
      <AbsoluteFill style={{opacity: env(frame, B.hook[0], B.hook[1], 10, 14)}}>
        <div style={{position: 'absolute', left: '50%', top: 300, transform: 'translateX(-50%)', opacity: interpolate(frame, [4, 26], [0, 1], clamp)}}>
          <Img src={staticFile('lowry/lowry-logo.png')} style={{width: 420}} />
        </div>
        <Head text="The work stops at five." lf={frame} top={430} size={86} delay={22} />
        <Head text="The admin *does not*." lf={frame} top={534} size={86} delay={44} />
        <Sub text="Quotes to chase. Visits to book. Records to update." lf={frame} top={700} delay={72} />
      </AbsoluteFill>

      {/* 2 — director's view */}
      <AbsoluteFill style={{opacity: env(frame, B.overview[0], B.overview[1], 14, 12)}}>
        <Head text="Your whole business, *live*, in one view." lf={frame - B.overview[0]} top={110} size={72} />
        <Chip text="Director's View" lf={frame - B.overview[0]} delay={18} />
        <Screen src="lowry/overview.png" lf={frame - B.overview[0]} dur={B.overview[1] - B.overview[0]} zoomFrom={1.03} zoomTo={1.2} panY={[0, -3]} />
      </AbsoluteFill>

      {/* 3 — jobs and visits */}
      <AbsoluteFill style={{opacity: env(frame, B.jobs[0], B.jobs[1], 14, 12)}}>
        <Head text="Every job and visit, *already scheduled*." lf={frame - B.jobs[0]} top={110} size={72} />
        <Chip text="Jobs, visits and calendar" lf={frame - B.jobs[0]} delay={18} />
        <Screen src="lowry/jobs.png" lf={frame - B.jobs[0]} dur={B.jobs[1] - B.jobs[0]} zoomFrom={1.04} zoomTo={1.22} panY={[2, -2]} />
      </AbsoluteFill>

      {/* 4 — whatsapp */}
      <AbsoluteFill style={{opacity: env(frame, B.whatsapp[0], B.whatsapp[1], 14, 12)}}>
        <Head text="Engineers message from site. It *writes itself in*." lf={frame - B.whatsapp[0]} top={100} size={66} />
        <Chip text="WhatsApp to CRM" lf={frame - B.whatsapp[0]} delay={18} top={244} />
        <Screen src="lowry/whatsapp.png" lf={frame - B.whatsapp[0]} dur={B.whatsapp[1] - B.whatsapp[0]} zoomFrom={1.05} zoomTo={1.24} panY={[0, 1]} top={320} />
      </AbsoluteFill>

      {/* 5 — we run it */}
      <AbsoluteFill style={{opacity: env(frame, B.weRunIt[0], B.weRunIt[1], 14, 12)}}>
        <Head text="We answer the phone. We do the *admin*." lf={frame - B.weRunIt[0]} top={318} size={74} width={1560} />
        <Head text="You get your *evenings back*." lf={frame - B.weRunIt[0]} top={560} size={74} delay={26} width={1560} />
        <Sub text="Built, run and maintained by LeadaLine." lf={frame - B.weRunIt[0]} top={732} delay={52} />
      </AbsoluteFill>

      {/* 6 — price and CTA */}
      <AbsoluteFill style={{opacity: env(frame, B.price[0], B.price[1], 14, 0)}}>
        {(() => {
          const lf = frame - B.price[0];
          const p1 = interpolate(lf, [8, 28], [0, 1], {...clamp, easing: easeOut});
          const p2 = interpolate(lf, [26, 46], [0, 1], {...clamp, easing: easeOut});
          const pc = interpolate(lf, [50, 70], [0, 1], {...clamp, easing: easeOut});
          const card: React.CSSProperties = {
            background: 'rgba(20,27,82,0.62)',
            border: '1px solid rgba(150,180,255,0.2)',
            borderRadius: 26,
            padding: '38px 56px',
            textAlign: 'center',
            minWidth: 400,
          };
          return (
            <>
              <Head text="Set up in weeks, not *quarters*." lf={lf} top={190} size={62} />
              <div style={{position: 'absolute', left: '50%', top: 360, transform: 'translateX(-50%)', display: 'flex', gap: 34}}>
                <div style={{...card, opacity: p1, transform: `translateY(${(1 - p1) * 26}px)`}}>
                  <div style={{fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 86, ...L.gradText, lineHeight: 1}}>£2,000</div>
                  <div style={{fontFamily: theme.fonts.body, fontSize: 27, color: '#9FB2D8', fontWeight: 600, marginTop: 12}}>one off, to set up</div>
                </div>
                <div style={{...card, opacity: p2, transform: `translateY(${(1 - p2) * 26}px)`}}>
                  <div style={{fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 86, ...L.gradText, lineHeight: 1}}>£1,000</div>
                  <div style={{fontFamily: theme.fonts.body, fontSize: 27, color: '#9FB2D8', fontWeight: 600, marginTop: 12}}>a month, all in</div>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 660,
                  transform: `translateX(-50%) translateY(${(1 - pc) * 26}px)`,
                  opacity: pc,
                  background: L.grad,
                  borderRadius: 100,
                  padding: '28px 62px',
                  fontFamily: theme.fonts.display,
                  fontWeight: 700,
                  fontSize: 40,
                  color: '#fff',
                  boxShadow: `0 24px 60px rgba(62,99,221,${0.3 + 0.2 * pulse})`,
                }}
              >
                Book a call
              </div>
              <div style={{position: 'absolute', left: '50%', top: 810, transform: 'translateX(-50%)', opacity: pc, display: 'flex', alignItems: 'center', gap: 18}}>
                <Img src={staticFile('site/leadaline-logo.png')} style={{width: 200}} />
                <span style={{fontFamily: theme.fonts.body, fontSize: 26, color: '#7E93BE', fontWeight: 600}}>leadaline.com</span>
              </div>
            </>
          );
        })()}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
