export const colors = {
  background: '#030712', // slate-950
  surface: '#0b0f19',    // Deep dark card
  surfaceHover: '#111827', // slate-900
  border: '#1f2937',      // slate-800
  borderHover: '#374151', // slate-700
  textPrimary: '#ffffff',
  textMuted: '#9ca3af',   // gray-400
  textMutedDark: '#4b5563', // gray-600
  accentBlue: '#0ea5e9',  // sky-500
  accentGreen: '#10b981', // emerald-500
  accentBlueGlow: 'rgba(14, 165, 233, 0.15)',
  accentGreenGlow: 'rgba(16, 185, 129, 0.15)',
  
  // HH Goa Brand Tokens
  brandGreen: '#006c35',
  brandYellow: '#ffd000',
  brandPink: '#ff007f',
  brandPrimary: '#006c35',
  brandSecondary: '#ffd000',
  brandAccent: '#ff007f',
} as const;

export type ColorsType = typeof colors;
