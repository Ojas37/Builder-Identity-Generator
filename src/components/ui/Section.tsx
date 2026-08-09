import React, { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  container = true,
  ...props
}) => {
  return (
    <section className={cn('py-12 md:py-16 relative overflow-hidden', className)} {...props}>
      {container ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};
