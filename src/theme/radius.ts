export const radius = {
  none: '0px',
  sm: '0.125rem', // 2px
  md: '0.25rem',  // 4px
  lg: '0.375rem', // 6px
  xl: '0.5rem',   // 8px
  '2xl': '0.75rem', // 12px
  '3xl': '1rem',    // 16px
  '4xl': '1.5rem',  // 24px
  '5xl': '2rem',    // 32px
  full: '9999px',
} as const;

export type RadiusType = typeof radius;
