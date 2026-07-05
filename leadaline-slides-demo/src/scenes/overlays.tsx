import React from 'react';
import {AbsoluteFill} from 'remotion';
import {GlowPulse, Rings, Sparkle, TypingDots, CountUp, BarReveal, Checkmark, HighlightBox, TransferPulse, PopHighlight} from '../lib/primitives';
import {CtaGlow} from '../transitions';
import {BLUE, PURPLE, GREEN} from '../lib/fonts';

/** Per-slide animated widgets, positioned over each slide's UI (1920x1080 space). */
export const Overlay: React.FC<{index: number; lf: number; bg: string; dur: number}> = ({index, lf, bg, dur}) => {
  const L = (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 20}}>{ov(index, lf, bg)}</AbsoluteFill>
  );
  return L;
};

const D = 22; // overlays begin after the entrance settles

function ov(i: number, lf: number, bg: string): React.ReactNode {
  switch (i) {
    // 1 — Opening
    case 0:
      return (
        <>
          <GlowPulse x={960} y={150} delay={D} size={300} color="rgba(47,107,255,0.4)" />
          {[300, 565, 830, 1095, 1360, 1620].map((x, k) => (
            <GlowPulse key={k} x={x} y={600} delay={D + 16 + k * 8} size={150} color={k % 2 ? 'rgba(122,63,240,0.5)' : 'rgba(47,107,255,0.5)'} />
          ))}
        </>
      );
    // 2 — AI Receptionist
    case 1:
      return (
        <>
          <GlowPulse x={1450} y={540} delay={D} size={520} color="rgba(47,107,255,0.28)" />
          <Rings x={1450} y={342} delay={D + 6} color={BLUE} />
          {[200, 372, 545, 718].map((x, k) => (
            <GlowPulse key={k} x={x} y={492} delay={D + 20 + k * 8} size={120} color="rgba(47,107,255,0.45)" />
          ))}
          <TransferPulse ax={800} ay={660} bx={1235} by={560} delay={D + 40} />
        </>
      );
    // 3 — Qualify / collected info
    case 2:
      return (
        <>
          {[345, 435, 522, 610, 697, 785].map((y, k) => (
            <HighlightBox key={k} x={1052} y={y - 30} w={568} h={60} delay={D + 10 + k * 9} color="rgba(47,107,255,0.10)" ring />
          ))}
          <TransferPulse ax={840} ay={540} bx={1040} by={440} delay={D + 30} />
          <HighlightBox x={165} y={758} w={648} h={96} delay={D + 74} color="rgba(47,107,255,0.12)" ring pulse />
        </>
      );
    // 4 — Owner Summary (lead delivered)
    case 3:
      return (
        <>
          <TransferPulse ax={720} ay={640} bx={1165} by={560} delay={D} color={PURPLE} />
          <PopHighlight x={1150} y={492} w={545} h={150} delay={D + 30} blue radius={22} />
          <GlowPulse x={1420} y={560} delay={D + 30} size={420} color="rgba(47,107,255,0.24)" />
          {[160, 405, 650].map((x, k) => (
            <HighlightBox key={k} x={x} y={678} w={225} h={200} delay={D + 44 + k * 8} color="rgba(122,63,240,0.07)" radius={16} />
          ))}
        </>
      );
    // 5 — CRM dashboard
    case 4:
      return (
        <>
          {[745, 957, 1173, 1392].map((x, k) => (
            <HighlightBox key={k} x={x} y={214} w={192} h={152} delay={D + 8 + k * 9} color="rgba(47,107,255,0.08)" radius={16} ring />
          ))}
          <HighlightBox x={745} y={520} w={560} h={44} delay={D + 52} color="rgba(47,107,255,0.12)" radius={10} ring pulse />
          <GlowPulse x={1450} y={560} delay={D + 40} size={360} color="rgba(122,63,240,0.16)" />
        </>
      );
    // 6 — Booking
    case 5:
      return (
        <>
          <TransferPulse ax={700} ay={640} bx={1040} by={470} delay={D} />
          <Checkmark x={815} y={560} delay={D + 24} size={62} />
          <HighlightBox x={1487} y={900} w={280} h={52} delay={D + 44} color="rgba(34,197,94,0.18)" radius={12} pulse />
          <GlowPulse x={1625} y={926} delay={D + 44} size={260} color="rgba(34,197,94,0.28)" />
        </>
      );
    // 7 — Follow-Up (message thread)
    case 6:
      return (
        <>
          <PopHighlight x={1092} y={296} w={306} h={104} delay={D + 6} blue radius={20} />
          <PopHighlight x={1038} y={462} w={224} h={48} delay={D + 34} radius={18} />
          <TypingDots x={1095} y={548} show={inWindow(lf, D + 44, D + 66)} />
          <PopHighlight x={1092} y={556} w={306} h={84} delay={D + 70} blue radius={20} />
          <GlowPulse x={1245} y={598} delay={D + 74} size={280} color="rgba(47,107,255,0.3)" />
        </>
      );
    // 8 — Review
    case 7:
      return (
        <>
          <PopHighlight x={1048} y={372} w={336} h={122} delay={D + 8} blue radius={18} />
          <GlowPulse x={1215} y={432} delay={D + 8} size={300} color="rgba(47,107,255,0.24)" />
          <Sparkle x={1258} y={432} delay={D + 30} />
          <Sparkle x={618} y={322} delay={D + 40} />
        </>
      );
    // 9 — Reporting (bars grow + count-up stats)
    case 8:
      return (
        <>
          <BarReveal x={224} y={588} w={474} h={210} delay={D} slideBg={'#FEFEFE'} />
          <CountUp x={72}  y={860} to={11} prefix="~" delay={D + 30} size={70} color={BLUE} cover={[124, 74]} coverColor={'#FBFAFC'} />
          <CountUp x={350} y={860} to={92} suffix="%" delay={D + 40} size={70} color={BLUE} cover={[132, 74]} coverColor={'#FBFAFC'} />
          <CountUp x={618} y={860} to={6}  delay={D + 50} size={70} color={BLUE} cover={[62, 74]}  coverColor={'#FBFAFC'} />
          <GlowPulse x={340} y={900} delay={D + 58} size={520} color="rgba(122,63,240,0.12)" />
        </>
      );
    // 10 — CTA
    case 9:
      return (
        <>
          <GlowPulse x={960} y={110} delay={D} size={300} color="rgba(47,107,255,0.3)" />
          <HighlightBox x={330} y={520} w={320} h={96} delay={D + 20} color="rgba(47,107,255,0.10)" radius={14} ring pulse />
          <CtaGlow x={1238} y={808} w={266} h={68} start={0} radius={16} />
        </>
      );
    default:
      return null;
  }
}

function inWindow(lf: number, a: number, b: number): number {
  if (lf < a) return 0;
  if (lf > b) return 2; // >1 means "past" -> component hides
  return 1;
}
