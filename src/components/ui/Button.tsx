import React, { type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent-blue' | 'accent-green' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
        {
          // Size
          'px-3 py-1.5 text-xs rounded-custom-xl': size === 'sm',
          'px-5 py-2.5 text-sm rounded-custom-2xl': size === 'md',
          'px-7 py-3 text-base rounded-custom-3xl': size === 'lg',
          // Width
          'w-full': fullWidth,
          // Variant
          'bg-white text-black hover:bg-neutral-200 border border-white': variant === 'primary',
          'bg-surface hover:bg-surface-hover text-white border border-border-custom hover:border-border-hover': variant === 'secondary',
          'bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue border border-accent-blue/30 hover:border-accent-blue/50 glass-panel-glow-blue': variant === 'accent-blue',
          'bg-accent-green/10 hover:bg-accent-green/20 text-accent-green border border-accent-green/30 hover:border-accent-green/50 glass-panel-glow-green': variant === 'accent-green',
          'bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white': variant === 'ghost',
          'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50': variant === 'danger',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
