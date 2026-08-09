import React from 'react';
import { useGenerator } from '../context/GeneratorContext';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { ImageUploader } from '../components/image/ImageUploader';
import { PreviewWindow } from '../components/preview/PreviewWindow';
import { FiSliders, FiImage, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const FramePage: React.FC = () => {
  const { uploadedImage, setUploadedImage } = useGenerator();

  return (
    <Section className="py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue font-bold">
            PFP ENGINE
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Profile Frame Generator
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl">
          Upload a high-resolution portrait to position, scale, and brand your picture with the official HH Goa 2026 frames.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Creator inputs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Upload card */}
          <Card className="border border-white/5 bg-neutral-900/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 font-mono text-white">
              1. Upload Portrait
            </h3>
            <ImageUploader value={uploadedImage} onChange={setUploadedImage} />
          </Card>

          {/* Frame selector placeholder */}
          <Card className="relative border border-white/5 bg-neutral-900/10 p-6 overflow-hidden">
            {/* Phase 2 Lock Overlay */}
            <div className="absolute inset-0 z-20 backdrop-blur-[2px] bg-neutral-950/40 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-accent-blue mb-2 shadow-lg">
                <FiLock size={14} />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                Frame Selector
              </span>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5">
                Coming in Phase 2
              </span>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 font-mono text-neutral-500">
              2. Select Frame Style
            </h3>
            <div className="grid grid-cols-3 gap-3 opacity-30">
              {['Classic Goa', 'Neon Ocean', 'Terminal Glow'].map((name, i) => (
                <div
                  key={i}
                  className="aspect-square border border-white/5 rounded-2xl bg-neutral-900 flex flex-col items-center justify-center p-3"
                >
                  <FiImage size={18} className="text-neutral-500 mb-2" />
                  <span className="text-[9px] font-mono text-neutral-400">{name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Crop controls placeholder */}
          <Card className="relative border border-white/5 bg-neutral-900/10 p-6 overflow-hidden">
            {/* Phase 2 Lock Overlay */}
            <div className="absolute inset-0 z-20 backdrop-blur-[2px] bg-neutral-950/40 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-accent-blue mb-2 shadow-lg">
                <FiLock size={14} />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                Image Manipulators
              </span>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5">
                Zoom, Pan & Rotation · Coming in Phase 2
              </span>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 font-mono text-neutral-500 flex items-center gap-2">
              <FiSliders size={14} />
              3. Position & Zoom
            </h3>
            <div className="flex flex-col gap-4 opacity-30">
              <div>
                <label className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">
                  Zoom Factor (1.0x)
                </label>
                <input type="range" className="w-full" disabled />
              </div>
              <div>
                <label className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">
                  Rotation (0 deg)
                </label>
                <input type="range" className="w-full" disabled />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Preview window */}
        <div className="lg:col-span-5 h-full">
          <PreviewWindow type="frame" />
        </div>
      </div>
    </Section>
  );
};
