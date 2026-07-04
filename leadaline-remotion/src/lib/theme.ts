/** LeadaLine brand system (from the client reference deck). */
export const theme = {
  bg: '#05080F',
  bg2: '#080D13',
  surface: '#0C131B',
  surface2: '#111A24',
  line: '#1C2A36',
  text: '#EAF1F4',
  muted: '#8595A2',
  muted2: '#5C6B77',
  blue: '#3B9CF5',
  purple: '#7A3FF0',
  cyan: '#6FE3FB',
  green: '#34C759',
  amber: '#F5B301',
  red: '#FF6B6B',
  imsg: '#0A84FF',
  recv: '#26262B',
  grad: 'linear-gradient(140deg, #3B9CF5, #7A3FF0)',
  gradText: {
    backgroundImage: 'linear-gradient(140deg, #3B9CF5, #7A3FF0)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  } as React.CSSProperties,
  glass: {
    background: 'rgba(15,23,33,0.66)',
    border: '1px solid rgba(120,180,255,0.14)',
    boxShadow:
      '0 34px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
    backdropFilter: 'blur(14px)',
  } as React.CSSProperties,
  fonts: {
    display: '"Space Grotesk", system-ui, sans-serif',
    body: '"Manrope", system-ui, sans-serif',
  },
};

/** Radius + shadow tokens */
export const radius = {sm: 14, md: 20, lg: 26, xl: 34, pill: 100};
