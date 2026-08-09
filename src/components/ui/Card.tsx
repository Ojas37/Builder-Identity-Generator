import React, { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: 'none' | 'blue' | 'green' | 'combined';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glowColor = 'none',
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'glass-panel rounded-custom-3xl p-6 transition-all duration-300 relative overflow-hidden',
        {
          'hover:border-border-hover': hoverable,
          'glass-panel-glow-blue hover:shadow-[0_0_50px_-5px_rgba(14,165,233,0.25)] hover:border-accent-blue/30': glowColor === 'blue',
          'glass-panel-glow-green hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.25)] hover:border-accent-green/30': glowColor === 'green',
          'hover:shadow-[0_0_50px_-5px_rgba(14,165,233,0.15),0_0_50px_-5px_rgba(16,185,129,0.15)] hover:border-white/10': glowColor === 'combined',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
