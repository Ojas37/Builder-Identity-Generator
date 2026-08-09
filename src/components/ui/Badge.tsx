import React, { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'green' | 'gray' | 'glow-blue' | 'glow-green';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'gray',
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold rounded-full tracking-wider uppercase border font-mono',
        {
          'bg-neutral-800 text-neutral-300 border-neutral-700': variant === 'gray',
          'bg-accent-blue/10 text-accent-blue border-accent-blue/20': variant === 'blue',
          'bg-accent-green/10 text-accent-green border-accent-green/20': variant === 'green',
          'bg-accent-blue/10 text-accent-blue border-accent-blue/30 text-glow-blue animate-pulse-subtle': variant === 'glow-blue',
          'bg-accent-green/10 text-accent-green border-accent-green/30 text-glow-green animate-pulse-subtle': variant === 'glow-green',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
