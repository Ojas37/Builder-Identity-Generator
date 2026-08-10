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
              <div className="flex items-center gap-2">
                {/* Visual color dot representing template color scheme */}
                <span 
                  className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0 shadow-inner"
                  style={{ backgroundColor: template.previewColor }}
                  aria-hidden="true"
                />
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
