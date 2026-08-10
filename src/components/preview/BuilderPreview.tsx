import React from 'react';
import { useGenerator } from '../../context/GeneratorContext';
import { useImageTransform } from '../../hooks/useImageTransform';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';

export const BuilderPreview: React.FC = () => {
  const { uploadedImage } = useGenerator();
  const { previewUrl, isProcessing, error } = useImageTransform();

  return (
    <div className="relative w-full max-w-[340px] flex items-center justify-center">
      {uploadedImage ? (
        <div className="relative w-full flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Live Builder ID Preview"
              className="w-full h-auto object-contain rounded-[20px] border border-white/10 shadow-[0_20px_50px_rgba(0,108,53,0.2)] hover:shadow-[0_20px_50px_rgba(0,108,53,0.35)] hover:border-accent-green/30 transition-all duration-300"
            />
          ) : (
            <LoadingSkeleton className="w-full aspect-[1/1.58] rounded-[20px]" />
          )}

          {/* Error visual state */}
          {error && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 text-center rounded-[20px]">
              <p className="text-xs font-mono text-red-400">{error}</p>
            </div>
          )}

          {/* Live rendering subtle indicator */}
          {isProcessing && (
            <div className="absolute top-6 right-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 select-none w-full border border-dashed border-neutral-800 rounded-[20px] bg-neutral-950/20">
          <div className="w-16 h-16 rounded-full border border-dashed border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-600 font-mono">
            ID
          </div>
          <p className="text-sm font-semibold text-neutral-400 font-sans">No Image Uploaded</p>
          <p className="text-xs text-neutral-500 mt-1 max-w-[200px] mx-auto font-sans">Upload a photo and details to see the builder card preview</p>
        </div>
      )}
    </div>
  );
};
