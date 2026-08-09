import React, { useEffect } from 'react';
import { useGenerator } from '../context/GeneratorContext';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { ImageUploader } from '../components/image/ImageUploader';
import { ImageControls } from '../components/image/ImageControls';
import { PreviewWindow } from '../components/preview/PreviewWindow';
import { FiUser, FiCode, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MOCK_TITLES = [
  'AI Alchemist',
  'Vision Architect',
  'Pixel Pirate',
  'Bug Hunter',
  'Terminal Wizard',
  'Builder',
];

export const BuilderPage: React.FC = () => {
  const {
    uploadedImage,
    setUploadedImage,
    builderData,
    setBuilderData,
    generatedTitle,
    setGeneratedTitle,
    setPreviewMode,
  } = useGenerator();

  useEffect(() => {
    setPreviewMode('builder');
  }, [setPreviewMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuilderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGeneratedTitle(e.target.value);
  };

  return (
    <Section className="py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-green font-bold">
            CREDENTIALS ENGINE
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Builder ID Generator
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl">
          Enter your details and upload a photo to generate an official, event-style Hacker House Goa 2026 builder identity card.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Creator inputs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Upload card */}
          <Card className="border border-white/5 bg-neutral-900/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 font-mono text-white">
              1. Upload Photo
            </h3>
            <ImageUploader value={uploadedImage} onChange={setUploadedImage} />
          </Card>

          {/* Controls selector */}
          <ImageControls />

          {/* Builder info form */}
          <Card className="border border-white/5 bg-neutral-900/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 font-mono text-white">
              2. Profile Details
            </h3>
            <div className="flex flex-col gap-5">
              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiUser size={12} className="text-neutral-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={builderData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Satapathy Prayasu"
                  maxLength={25}
                  className="w-full bg-neutral-950/80 border border-white/5 focus:border-accent-green/40 focus:ring-1 focus:ring-accent-green/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200 font-sans"
                />
              </div>

              {/* Stack / Role Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiCode size={12} className="text-neutral-500" />
                  Primary Stack / Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={builderData.role}
                  onChange={handleInputChange}
                  placeholder="e.g. React & Rust Dev"
                  maxLength={30}
                  className="w-full bg-neutral-950/80 border border-white/5 focus:border-accent-green/40 focus:ring-1 focus:ring-accent-green/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200 font-sans"
                />
              </div>

              {/* Title Selector */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiAward size={12} className="text-neutral-500" />
                    Builder Title
                  </label>
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                    Auto-Matching in Phase 4
                  </span>
                </div>
                <div className="relative">
                  <select
                    name="title"
                    value={generatedTitle}
                    onChange={handleTitleChange}
                    className="w-full bg-neutral-950/80 border border-white/5 focus:border-accent-green/40 rounded-xl px-4 py-2.5 text-sm text-white outline-none appearance-none transition-all duration-200 cursor-pointer font-sans"
                  >
                    {MOCK_TITLES.map((title) => (
                      <option key={title} value={title} className="bg-neutral-950">
                        {title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neutral-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Preview window */}
        <div className="lg:col-span-5 h-full">
          <PreviewWindow type="builder" />
        </div>
      </div>
    </Section>
  );
};
