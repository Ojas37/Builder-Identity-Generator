import React, { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface LoadingSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangle' | 'circle';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'rectangle',
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-neutral-800/60 animate-pulse-subtle border border-white/5',
        {
          'rounded-custom-2xl': variant === 'rectangle',
          'rounded-full': variant === 'circle',
        },
        className
      )}
      {...props}
    />
  );
};
