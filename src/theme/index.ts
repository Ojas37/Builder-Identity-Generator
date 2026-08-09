import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { gradients } from './gradients';
import { shadows } from './shadows';
import { motion } from './motion';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  gradients,
  shadows,
  motion,
} as const;

export type ThemeType = typeof theme;
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './gradients';
export * from './shadows';
export * from './motion';
