import React from 'react';
import { useGenerator } from '../../context/GeneratorContext';
import { useImageTransform } from '../../hooks/useImageTransform';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';

export const FramePreview: React.FC = () => {
  const { uploadedImage } = useGenerator();
  const { previewUrl, isProcessing, error } = useImageTransform();

  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-radial-gradient from-accent-blue/5 to-transparent pointer-events-none" />

      {uploadedImage ? (
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Live PFP Frame Preview"
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <LoadingSkeleton className="w-full h-full rounded-xl" />
          )}

          {/* Error visual state */}
          {error && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 text-center">
              <p className="text-xs font-mono text-red-400">{error}</p>
            </div>
          )}

          {/* Live rendering subtle indicator */}
          {isProcessing && (
            <div className="absolute top-6 right-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 select-none">
          <div className="w-16 h-16 rounded-full border border-dashed border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-600">
            PFP
          </div>
          <p className="text-sm font-semibold text-neutral-400 font-sans">No Image Uploaded</p>
          <p className="text-xs text-neutral-500 mt-1 max-w-[200px] font-sans">Upload a photo to see the frame preview</p>
        </div>
      )}
    </div>
  );
};
