export const motion = {
  transition: {
    default: { type: 'spring', stiffness: 300, damping: 30 },
    gentle: { type: 'spring', stiffness: 120, damping: 20 },
    slow: { type: 'spring', stiffness: 80, damping: 25 },
    instant: { type: 'tween', duration: 0 },
    smooth: { ease: [0.16, 1, 0.3, 1], duration: 0.6 }, // easeOutExpo
  },
  animation: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
  },
} as const;

export type MotionType = typeof motion;
