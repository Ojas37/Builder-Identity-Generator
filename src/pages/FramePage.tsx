import React, { useEffect } from 'react';
import { useGenerator } from '../context/GeneratorContext';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { ImageUploader } from '../components/image/ImageUploader';
import { ImageControls } from '../components/image/ImageControls';
import { PreviewWindow } from '../components/preview/PreviewWindow';
import { TemplateSelector } from '../components/ui/TemplateSelector';
import { motion } from 'framer-motion';

export const FramePage: React.FC = () => {
  const { uploadedImage, setUploadedImage, setPreviewMode } = useGenerator();

  useEffect(() => {
    setPreviewMode('frame');
  }, [setPreviewMode]);

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

          {/* Controls selector */}
          <ImageControls />

          {/* Template Selector */}
          <TemplateSelector mode="frame" />
        </div>

        {/* Right Column: Preview window */}
        <div className="lg:col-span-5 h-full">
          <PreviewWindow type="frame" />
        </div>
      </div>
    </Section>
  );
};
