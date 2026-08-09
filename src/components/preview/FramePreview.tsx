import React from 'react';
import { useGenerator } from '../../context/GeneratorContext';

export const FramePreview: React.FC = () => {
  const { uploadedImage } = useGenerator();

  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-radial-gradient from-accent-blue/5 to-transparent pointer-events-none" />

      {uploadedImage ? (
        <div className="relative w-full h-full p-6 flex items-center justify-center">
          {/* Mock Branded Frame Overlay */}
          <div className="absolute inset-0 border-[16px] border-surface flex flex-col justify-between p-4 pointer-events-none z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            {/* Top Frame Line */}
            <div className="flex justify-between items-center w-full">
              <span className="text-[8px] font-mono text-accent-blue tracking-widest font-bold">HH GOA // 2026</span>
              <span className="text-[8px] font-mono text-neutral-500">28-31 OCT</span>
            </div>
            
            {/* Bottom Frame Line */}
            <div className="flex justify-between items-center w-full">
              <span className="text-[8px] font-mono text-neutral-500 uppercase">BUILDER STATION</span>
              <span className="text-[8px] font-mono text-accent-green tracking-widest">SHIP OR SHIP</span>
            </div>
          </div>

          {/* Photo Content */}
          <img
            src={uploadedImage}
            alt="PFP Preview"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ) : (
        <div className="text-center p-6">
          <div className="w-16 h-16 rounded-full border border-dashed border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-600">
            PFP
          </div>
          <p className="text-sm font-semibold text-neutral-400">No Image Uploaded</p>
          <p className="text-xs text-neutral-500 mt-1 max-w-[200px]">Upload a photo to see the frame preview</p>
        </div>
      )}
    </div>
  );
};
