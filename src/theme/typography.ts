export const typography = {
  fontFamily: {
    sans: 'Space Grotesk, Inter, system-ui, -apple-system, sans-serif',
    mono: 'Fira Code, JetBrains Mono, ui-monospace, monospace',
    serif: '"DM Serif Display", Georgia, Cambria, "Times New Roman", Times, serif',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    builder: '0.2em', // specialized for HH Goa branding
  },
} as const;

export type TypographyType = typeof typography;
