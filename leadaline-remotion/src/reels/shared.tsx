import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {theme} from '../lib/theme';
import {easeOut, easeInOut, reveal, float} from '../lib/anim';
import {useFonts} from '../lib/fonts';

/* Site-accurate accent set (sampled from leadaline.com) */
export const site = {
  bg: '#05080F',
  cyan: '#18D7FF',
  blue: '#2F7BFF',
  violet: '#7C5CFF',
  grad: 'linear-gradient(120deg,#18D7FF,#2F7BFF 46%,#7C5CFF)',
  gradText: {
    backgroundImage: 'linear-gradient(120deg,#18D7FF,#2F7BFF 46%,#7C5CFF)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  } as React.CSSProperties,
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Scene opacity envelope for [a,b) with crossfade edges. */
export const env = (f: number, a: number, b: number, inF = 12, outF = 10): number => {
  if (f < a - 1 || f > b + 1) return 0;
  const fin = interpolate(f, [a, a + inF], [0, 1], {...clamp, easing: easeOut});
  const fout = outF > 0 ? interpolate(f, [b - outF, b], [1, 0], {...clamp, easing: easeOut}) : 1;
  return Math.min(fin, fout);
};

/** Dark site-style background: navy field, drifting glows, faint grid. */
export const ReelBg: React.FC<{hueShift?: number; warm?: number}> = ({hueShift = 0, warm = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const x1 = 540 + Math.sin(t * 0.32) * 300;
  const y1 = 420 + Math.cos(t * 0.26) * 200;
  const x2 = 540 + Math.cos(t * 0.22) * 340;
  const y2 = 1500 + Math.sin(t * 0.3) * 240;
  return (
    <AbsoluteFill style={{background: `radial-gradient(130% 100% at 50% 0%, #0A1220 0%, ${site.bg} 58%)`}}>
      <div style={{position: 'absolute', left: x1 - 500, top: y1 - 500, width: 1000, height: 1000, borderRadius: '50%', background: `radial-gradient(circle, rgba(24,215,255,${0.10 + warm * 0.05}), transparent 65%)`, filter: 'blur(70px)', transform: `rotate(${hueShift}deg)`}} />
      <div style={{position: 'absolute', left: x2 - 520, top: y2 - 520, width: 1040, height: 1040, borderRadius: '50%', background: `radial-gradient(circle, rgba(124,92,255,${0.12 + warm * 0.04}), transparent 65%)`, filter: 'blur(80px)'}} />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(120,160,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,220,0.05) 1px, transparent 1px)',
          backgroundSize: '108px 108px',
          maskImage: 'radial-gradient(90% 70% at 50% 40%, rgba(0,0,0,0.5), transparent)',
          WebkitMaskImage: 'radial-gradient(90% 70% at 50% 40%, rgba(0,0,0,0.5), transparent)',
        }}
      />
      {/* vignette */}
      <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 45%, transparent 60%, rgba(0,0,0,0.45) 100%)'}} />
    </AbsoluteFill>
  );
};

/** Big kinetic caption, word-by-word. Wrap gradient words in *asterisks*. */
export const Caption: React.FC<{
  text: string;
  lf: number;
  size?: number;
  top?: number;
  delay?: number;
  align?: 'center' | 'left';
  width?: number;
}> = ({text, lf, size = 92, top = 170, delay = 0, align = 'center', width = 950}) => {
  const segs = text.split('*');
  const words: {w: string; grad: boolean}[] = [];
  segs.forEach((seg, i) => {
    seg.split(/\s+/).forEach((w) => {
      if (!w) return;
      // merge punctuation-only tokens into the previous word (no orphan "." lines)
      if (/^[.,!?…:;]+$/.test(w) && words.length > 0) {
        words[words.length - 1].w += w;
        return;
      }
      words.push({w, grad: i % 2 === 1});
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
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: '0.28em',
        rowGap: '0.08em',
        fontFamily: theme.fonts.display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.06,
        letterSpacing: -2,
        textAlign: align,
      }}
    >
      {words.map((w, i) => {
        const f = lf - delay - i * 4;
        const p = interpolate(f, [0, 14], [0, 1], {...clamp, easing: easeOut});
        const b = interpolate(f, [0, 11], [9, 0], {...clamp, easing: easeOut});
        return (
          <span
            key={i}
            style={{
              opacity: p,
              transform: `translateY(${(1 - p) * 34}px)`,
              filter: b > 0.1 ? `blur(${b}px)` : 'none',
              color: '#F4F8FC',
              ...(w.grad ? site.gradText : {}),
              textShadow: w.grad ? 'none' : '0 4px 40px rgba(0,0,0,0.5)',
            }}
          >
            {w.w}
          </span>
        );
      })}
    </div>
  );
};

/** Smaller supporting line under a caption. */
export const Sub: React.FC<{text: string; lf: number; top: number; delay?: number; size?: number; color?: string; width?: number}> = ({
  text,
  lf,
  top,
  delay = 0,
  size = 40,
  color = '#93A6BC',
  width = 860,
}) => (
  <div style={{position: 'absolute', left: '50%', top, transform: 'translateX(-50%)', width}}>
    <div
      style={{
        textAlign: 'center',
        fontFamily: theme.fonts.body,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.4,
        color,
        ...reveal(lf, 30, {delay, y: 22}),
      }}
    >
      {text}
    </div>
  </div>
);

/** Vertical phone frame sized for 1080x1920 canvas. */
export const VPhone: React.FC<{
  lf: number;
  children: React.ReactNode;
  w?: number;
  top?: number;
  delay?: number;
  glow?: string;
  time?: string;
}> = ({lf, children, w = 620, top = 560, delay = 0, glow = 'rgba(47,123,255,0.30)', time = '14:32'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const h = w * 2.1;
  const s = interpolate(lf - delay, [0, 26], [0, 1], {...clamp, easing: easeOut});
  const fy = float(frame, fps, 9, 4.6);
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top,
        transform: `translateX(-50%) translateY(${(1 - s) * 90 + fy}px) scale(${0.94 + 0.06 * s})`,
        opacity: s,
        width: w,
        height: h,
      }}
    >
      <div style={{position: 'absolute', left: '50%', top: '50%', width: w * 1.35, height: h * 1.1, transform: 'translate(-50%,-50%)', background: `radial-gradient(ellipse, ${glow}, transparent 68%)`, filter: 'blur(70px)'}} />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: w * 0.155,
          padding: 17,
          background: 'linear-gradient(150deg,#2A2E36,#14171D 40%,#0C0E13)',
          boxShadow: '0 70px 140px rgba(0,0,0,0.72), inset 0 0 0 2px rgba(255,255,255,0.05)',
        }}
      >
        <div style={{position: 'absolute', left: '50%', top: 30, transform: 'translateX(-50%)', width: w * 0.30, height: 40, background: '#000', borderRadius: 24, zIndex: 30}} />
        <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: w * 0.155 - 14, overflow: 'hidden', background: '#000'}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 76, zIndex: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 44px 0', fontSize: 25, fontWeight: 700, color: '#fff', fontFamily: theme.fonts.body}}>
            <span>{time}</span>
            <span style={{fontSize: 20}}>5G ▪▪</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

/** Real website screenshot scrolling inside its container. */
export const SiteScroll: React.FC<{
  src: string;
  lf: number;
  from?: number;
  to?: number;
  dur?: number;
  width: number;
}> = ({src, lf, from = 0, to = 3000, dur = 240, width}) => {
  const y = interpolate(lf, [0, dur], [from, to], {...clamp, easing: easeInOut});
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#05080F'}}>
      <Img src={staticFile(src)} style={{position: 'absolute', top: 0, left: 0, width, transform: `translateY(${-y}px)`}} />
    </div>
  );
};

/** iOS-style notification banner. */
export const Notify: React.FC<{
  lf: number;
  delay?: number;
  title: string;
  line1: string;
  line2?: string;
  top?: number;
  accent?: string;
}> = ({lf, delay = 0, title, line1, line2, top = 130, accent = site.grad}) => {
  const s = interpolate(lf - delay, [0, 18], [0, 1], {...clamp, easing: easeOut});
  return (
    <div
      style={{
        position: 'absolute',
        left: 26,
        right: 26,
        top,
        background: 'rgba(34,40,52,0.86)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 30,
        padding: '26px 28px',
        display: 'flex',
        gap: 20,
        opacity: s,
        transform: `translateY(${(1 - s) * -60}px) scale(${0.96 + 0.04 * s})`,
        boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
        zIndex: 20,
      }}
    >
      <div style={{width: 62, height: 62, flex: '0 0 62px', borderRadius: 16, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Img src={staticFile('site/leadaline-logo.png')} style={{width: 44, filter: 'brightness(4)'}} />
      </div>
      <div style={{minWidth: 0}}>
        <div style={{fontFamily: theme.fonts.body, fontSize: 24, fontWeight: 800, color: '#fff', display: 'flex', justifyContent: 'space-between', gap: 12}}>
          {title}
          <span style={{fontWeight: 500, color: '#9FB0BF', fontSize: 20}}>now</span>
        </div>
        <div style={{fontFamily: theme.fonts.body, fontSize: 25, fontWeight: 700, color: '#EAF2FA', marginTop: 7, lineHeight: 1.3}}>{line1}</div>
        {line2 && <div style={{fontFamily: theme.fonts.body, fontSize: 22, color: '#B9C7D6', marginTop: 5, lineHeight: 1.35}}>{line2}</div>}
      </div>
    </div>
  );
};

/** Chat bubble (thread style). */
export const Msg: React.FC<{lf: number; delay?: number; ai?: boolean; text: React.ReactNode; time?: string; grey?: boolean}> = ({
  lf,
  delay = 0,
  ai,
  text,
  time,
  grey,
}) => {
  const f = lf - delay;
  const p = interpolate(f, [0, 13], [0, 1], {...clamp, easing: easeOut});
  return (
    <div
      style={{
        alignSelf: ai ? 'flex-end' : 'flex-start',
        maxWidth: '82%',
        padding: '20px 26px',
        fontSize: 27,
        lineHeight: 1.34,
        fontWeight: 500,
        fontFamily: theme.fonts.body,
        color: '#fff',
        background: grey ? '#1C1F26' : ai ? theme.imsg : theme.recv,
        borderRadius: ai ? '26px 26px 8px 26px' : '26px 26px 26px 8px',
        opacity: p,
        transform: `translateY(${(1 - p) * 22}px) scale(${0.93 + 0.07 * p})`,
      }}
    >
      {text}
      {time && <span style={{display: 'block', fontSize: 17, opacity: 0.65, marginTop: 7, textAlign: 'right'}}>{time}</span>}
    </div>
  );
};

/** Ticking capture chip (Service ✓ / Location ✓ / Urgency ✓). */
export const Chip: React.FC<{lf: number; delay?: number; label: string; value: string}> = ({lf, delay = 0, label, value}) => {
  const f = lf - delay;
  const p = interpolate(f, [0, 14], [0, 1], {...clamp, easing: easeOut});
  const tick = interpolate(f, [10, 22], [0, 1], {...clamp, easing: easeOut});
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(18,26,38,0.92)',
        border: '1px solid rgba(120,170,255,0.16)',
        borderRadius: 20,
        padding: '18px 22px',
        opacity: p,
        transform: `translateX(${(1 - p) * 40}px)`,
      }}
    >
      <div style={{width: 40, height: 40, borderRadius: '50%', background: tick > 0.05 ? theme.green : '#232B37', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'none', boxShadow: tick > 0.05 ? '0 0 18px rgba(52,199,89,0.55)' : 'none'}}>
        <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" style={{strokeDasharray: 30, strokeDashoffset: 30 * (1 - tick)}} />
        </svg>
      </div>
      <div style={{fontFamily: theme.fonts.body}}>
        <div style={{fontSize: 18, fontWeight: 700, color: '#7E93A9', letterSpacing: 1.4, textTransform: 'uppercase'}}>{label}</div>
        <div style={{fontSize: 26, fontWeight: 700, color: '#F0F6FC', marginTop: 3}}>{value}</div>
      </div>
    </div>
  );
};

/** Full-screen flash used at the narrative flip. */
export const Flip: React.FC<{lf: number; at: number}> = ({lf, at}) => {
  const p = interpolate(lf, [at, at + 5, at + 22], [0, 0.9, 0], clamp);
  if (p <= 0) return null;
  return <AbsoluteFill style={{background: site.grad, opacity: p * 0.28, zIndex: 60}} />;
};

/** End card: logo, line, real site scroll in phone, CTA pill. */
export const EndCard: React.FC<{
  lf: number;
  line: string;
  siteSrc?: string;
  siteWidth?: number;
  siteFrom?: number;
  siteTo?: number;
}> = ({lf, line, siteSrc = 'site/book-mobile.png', siteWidth = 586, siteFrom = 0, siteTo = 2400}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoS = interpolate(lf, [0, 22], [0, 1], {...clamp, easing: easeOut});
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 2 * 0.75);
  const ctaS = interpolate(lf, [46, 64], [0, 1], {...clamp, easing: easeOut});
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: '50%', top: 128, transform: `translateX(-50%) scale(${0.92 + 0.08 * logoS})`, opacity: logoS}}>
        <Img src={staticFile('site/leadaline-logo.png')} style={{width: 420, filter: 'drop-shadow(0 8px 40px rgba(24,215,255,0.25))'}} />
      </div>
      <Caption text={line} lf={lf} top={272} size={84} delay={10} />
      <VPhone lf={lf} delay={24} top={620} w={620} glow="rgba(24,215,255,0.26)" time="09:41">
        <SiteScroll src={siteSrc} lf={lf - 40} width={siteWidth} from={siteFrom} to={siteTo} dur={200} />
      </VPhone>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 122,
          transform: `translateX(-50%) translateY(${(1 - ctaS) * 40}px)`,
          opacity: ctaS,
          background: site.grad,
          borderRadius: 100,
          padding: '30px 66px',
          fontFamily: theme.fonts.display,
          fontWeight: 700,
          fontSize: 42,
          color: '#04121B',
          boxShadow: `0 26px 60px rgba(24,140,255,${0.35 + 0.2 * pulse}), 0 0 0 ${2 + 3 * pulse}px rgba(24,215,255,${0.25 * (1 - pulse) + 0.1})`,
          zIndex: 40,
        }}
      >
        Book a free demo → leadaline.com
      </div>
    </AbsoluteFill>
  );
};

/** Font loader wrapper for every reel. */
export const ReelRoot: React.FC<{children: React.ReactNode}> = ({children}) => {
  useFonts();
  return <AbsoluteFill style={{fontFamily: theme.fonts.body, overflow: 'hidden'}}>{children}</AbsoluteFill>;
};
