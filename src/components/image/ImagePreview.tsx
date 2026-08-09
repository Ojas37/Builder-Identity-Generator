import React from 'react';
import { cn } from '../../utils/cn';

interface ImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = 'Preview',
  className,
}) => {
  return (
    <div className={cn('relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-950/40 border border-white/5', className)}>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain select-none transition-all duration-300"
        draggable={false}
      />
    </div>
  );
};
