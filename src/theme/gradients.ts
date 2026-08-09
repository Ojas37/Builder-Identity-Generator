export const gradients = {
  ocean: 'linear-gradient(135deg, #0284c7 0%, #0d9488 50%, #030712 100%)',
  cyberBlue: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
  cyberGreen: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
  darkGlow: 'radial-gradient(circle at top, rgba(14, 165, 233, 0.15) 0%, rgba(3, 7, 18, 0) 70%)',
  oceanGlow: 'radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.1) 0%, rgba(3, 7, 18, 0) 50%)',
  cardBackground: 'linear-gradient(180deg, rgba(11, 15, 25, 0.8) 0%, rgba(3, 7, 18, 0.9) 100%)',
  textGradient: 'linear-gradient(180deg, #ffffff 0%, #9ca3af 100%)',
} as const;

export type GradientsType = typeof gradients;
