import React from 'react';
import { useGenerator } from '../../context/GeneratorContext';
import { Badge } from '../ui/Badge';

export const BuilderPreview: React.FC = () => {
  const { uploadedImage, builderInfo } = useGenerator();

  return (
    <div className="relative w-full max-w-[280px] aspect-[1/1.58] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 p-6 flex flex-col justify-between mx-auto">
      {/* Top hanger slot indicator */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-black/40 border border-white/5" />

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-green/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center mt-4">
        <span className="text-[10px] font-mono text-accent-blue tracking-[0.25em] font-extrabold">HH GOA // 2026</span>
        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">BUILDER IDENTITY</span>
      </div>

      {/* Image Area */}
      <div className="my-5 aspect-square w-[140px] mx-auto rounded-2xl overflow-hidden border border-white/5 relative bg-neutral-950/80 flex items-center justify-center">
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Builder ID"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-10 h-10 rounded-full border border-dashed border-neutral-800 flex items-center justify-center text-neutral-600 mb-2">
              ID
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">PORTRAIT PKG</span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex-grow flex flex-col justify-end text-center mb-4">
        {/* Name */}
        <div className="mb-2">
          {builderInfo.name ? (
            <h4 className="text-base font-bold tracking-tight text-white line-clamp-1">{builderInfo.name}</h4>
          ) : (
            <div className="h-6 w-32 mx-auto bg-neutral-800/50 animate-pulse rounded-md" />
          )}
        </div>

        {/* Stack / Role */}
        <div className="mb-4">
          {builderInfo.role ? (
            <p className="text-[11px] font-mono text-neutral-400 tracking-wide line-clamp-1">{builderInfo.role}</p>
          ) : (
            <div className="h-4 w-24 mx-auto bg-neutral-800/40 animate-pulse rounded-md mt-1" />
          )}
        </div>

        {/* Title Badges */}
        <div className="flex justify-center">
          <Badge variant="glow-green">
            {builderInfo.title || 'BUILDER'}
          </Badge>
        </div>
      </div>

      {/* Footer / Meta */}
      <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[7px] font-mono text-neutral-500">
        <div className="flex flex-col items-start">
          <span>STATION: GOA_SAND</span>
          <span>DATE: 28-31_OCT_2026</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-accent-blue font-bold">VERIFIED_BUILDER</span>
          <span>ID: 247-PM-STU</span>
        </div>
      </div>
    </div>
  );
};
