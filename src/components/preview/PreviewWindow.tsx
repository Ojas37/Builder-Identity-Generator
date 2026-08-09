import React from 'react';
import { FramePreview } from './FramePreview';
import { BuilderPreview } from './BuilderPreview';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FiDownload, FiTwitter } from 'react-icons/fi';

interface PreviewWindowProps {
  type: 'frame' | 'builder';
}

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ type }) => {
  return (
    <Card className="flex flex-col gap-6 bg-gradient-to-b from-neutral-900/20 to-neutral-950/40 border border-white/5 p-6 h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          <h4 className="text-xs font-mono tracking-wider uppercase text-neutral-400">
            Preview Render
          </h4>
        </div>
        <Badge variant="blue">Phase 1 Layout</Badge>
      </div>

      {/* Render Area */}
      <div className="flex-grow flex items-center justify-center py-6 min-h-[300px]">
        {type === 'frame' ? <FramePreview /> : <BuilderPreview />}
      </div>

      {/* Actions Placeholder */}
      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Button
            variant="secondary"
            fullWidth
            disabled
            className="gap-2 cursor-not-allowed opacity-50 text-neutral-500 border-white/5"
          >
            <FiDownload size={14} />
            Download PNG
          </Button>
          <span className="absolute -top-2.5 right-2 text-[7px] font-mono bg-neutral-900 border border-white/5 px-1 py-0.5 rounded text-neutral-500 uppercase tracking-widest">
            Phase 2
          </span>
        </div>

        <div className="relative flex-grow">
          <Button
            variant="secondary"
            fullWidth
            disabled
            className="gap-2 cursor-not-allowed opacity-50 text-neutral-500 border-white/5"
          >
            <FiTwitter size={14} />
            Share to X
          </Button>
          <span className="absolute -top-2.5 right-2 text-[7px] font-mono bg-neutral-900 border border-white/5 px-1 py-0.5 rounded text-neutral-500 uppercase tracking-widest">
            Phase 2
          </span>
        </div>
      </div>
    </Card>
  );
};
