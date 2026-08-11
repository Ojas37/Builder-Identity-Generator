import React from 'react';
import { useGenerator } from '../../context/GeneratorContext';
import { pfpTemplates } from '../../templates/pfp/templates';
import { builderTemplates } from '../../templates/builder/templates';
import { Card } from './Card';
import { cn } from '../../utils/cn';

interface TemplateSelectorProps {
  mode: 'frame' | 'builder';
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ mode }) => {
  const {
    selectedPFPTemplateId,
    setSelectedPFPTemplateId,
    selectedBuilderTemplateId,
    setSelectedBuilderTemplateId,
  } = useGenerator();

  const templates = mode === 'frame' ? pfpTemplates : builderTemplates;
  const activeId = mode === 'frame' ? selectedPFPTemplateId : selectedBuilderTemplateId;
  const setActiveId = mode === 'frame' ? setSelectedPFPTemplateId : setSelectedBuilderTemplateId;

  return (
    <Card className="p-5 border border-white/5 bg-neutral-900/30 flex flex-col gap-4">
      <div>
        <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-400">
          SELECT THEME VARIANT
        </h4>
        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
          Choose a visual identity style for your graphic
        </p>
      </div>

      {/* Horizontally scrollable list on mobile, grid layout on desktop */}
      <div 
        className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory"
        role="radiogroup"
        aria-label="Theme template selection list"
      >
        {templates.map((template) => {
          const isSelected = template.id === activeId;
          return (
            <button
              key={template.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select template ${template.name}`}
              onClick={() => setActiveId(template.id)}
              className={cn(
                "snap-start flex-shrink-0 w-[140px] sm:w-auto p-3.5 rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-neutral-950",
                isSelected
                  ? "bg-white/5 border-accent-blue/50 shadow-[0_0_15px_-3px_rgba(14,165,233,0.15)]"
                  : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/2 cursor-pointer"
              )}
            >
              {/* Miniature preview representing the actual template design */}
              <div className="w-full h-16 rounded-lg mb-2.5 overflow-hidden relative border border-white/10 bg-neutral-900 shadow-inner select-none pointer-events-none">
                {/* 1. Builder Card Miniature Previews */}
                {template.id === 'goa-boarding-pass' && (
                  <div className="absolute inset-0 bg-[#fdfcf7] flex flex-col p-1 justify-between">
                    <div className="flex justify-between items-center px-1">
                      <div className="w-4 h-1.5 bg-[#004d26] rounded-xs" />
                      <div className="w-3 h-1 bg-[#ff007f] rounded-full" />
                      <div className="w-4 h-1 bg-[#004d26] rounded-xs" />
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-[#ffd000] bg-neutral-200 mx-auto flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-neutral-300" />
                    </div>
                    <div className="w-12 h-1.5 bg-[#004d26] rounded-xs mx-auto" />
                    <div className="flex justify-between px-1">
                      <div className="w-3 h-2 bg-[#ff007f]/30 rounded-xs" />
                      <div className="w-3 h-2 bg-[#004d26]/20 rounded-xs" />
                      <div className="w-3 h-2 bg-[#ffd000]/30 rounded-xs" />
                    </div>
                  </div>
                )}
                {template.id === 'rarity-badge' && (
                  <div className="absolute inset-0 bg-[#09100d] p-1 flex flex-col justify-between border border-purple-500/30">
                    <div className="flex justify-between">
                      <div className="w-1 h-1 bg-purple-500" />
                      <div className="w-1.5 h-0.5 bg-purple-500" />
                      <div className="w-1 h-1 bg-purple-500" />
                    </div>
                    <div className="w-7 h-7 rounded-full border border-purple-500 bg-neutral-800 mx-auto" />
                    <div className="w-12 h-2 bg-purple-950/40 border border-purple-500/50 rounded-xs mx-auto" />
                    <div className="w-16 h-1.5 bg-purple-500/30 rounded-xs mx-auto" />
                  </div>
                )}
                {template.id === 'ocean-sand' && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] to-[#000000] p-1 flex flex-col justify-between">
                    <div className="w-full h-0.5 bg-sky-500/10" />
                    <div className="w-7 h-7 rounded-full border border-sky-500 bg-neutral-800 mx-auto" />
                    <div className="w-14 h-1.5 bg-sky-500/20 rounded-xs mx-auto" />
                    <div className="w-full h-1 bg-sky-500/10" />
                  </div>
                )}

                {/* 2. PFP Frame Miniature Previews */}
                {template.id === 'goa-palms' && (
                  <div className="absolute inset-0 bg-[#004d26] flex flex-col justify-between">
                    <div className="w-full h-3.5 bg-[#ffd000] flex items-center justify-center p-0.5">
                      <div className="w-12 h-1 bg-[#004d26]/40 rounded-full" />
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[#ffd000] bg-neutral-200 mx-auto flex items-center justify-center relative">
                      <div className="w-5 h-5 rounded-full bg-neutral-300" />
                      <div className="absolute -bottom-1 w-5 h-1.5 bg-[#002612] rounded-xs border border-[#ffd000]/50" />
                    </div>
                    <div className="w-full h-2.5 bg-black/60 flex items-center justify-center p-0.5">
                      <div className="w-10 h-0.5 bg-[#ffd000]/60 rounded-full" />
                    </div>
                  </div>
                )}
                {template.id === 'boarding-stamp' && (
                  <div className="absolute inset-0 bg-[#fcfaf5] p-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-1 bg-[#006c35]/40 rounded-full" />
                      <div className="w-3 h-4 bg-[#006c35]/20 rounded-xs border border-[#006c35]/30" />
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-[#006c35] bg-neutral-200 mx-auto flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-neutral-300" />
                    </div>
                    <div className="flex justify-between">
                      <div className="w-3 h-3 bg-[#006c35]/10 rounded-full" />
                      <div className="w-4 h-4 bg-[#006c35]/15 rounded-full" />
                    </div>
                  </div>
                )}
                {template.id === 'cyber-terminal' && (
                  <div className="absolute inset-0 bg-[#020604] p-1 flex flex-col justify-between border border-emerald-500/20">
                    <div className="w-full h-1 bg-emerald-500/10" />
                    <div className="w-7 h-7 rounded-full border border-emerald-500 bg-neutral-800 mx-auto flex items-center justify-center relative">
                      <div className="w-5 h-5 rounded-full bg-neutral-300" />
                      {/* corner target markers */}
                      <div className="absolute inset-0.5 border border-emerald-500/30" />
                    </div>
                    <div className="w-full h-1 bg-emerald-500/10" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono font-bold tracking-wide text-white block truncate">
                  {template.name}
                </span>
              </div>
              <p className="text-[9px] text-neutral-500 font-mono mt-1.5 line-clamp-2 leading-tight">
                {template.description}
              </p>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
