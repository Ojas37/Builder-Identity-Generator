import React from 'react';
import { FramePreview } from './FramePreview';
import { BuilderPreview } from './BuilderPreview';
import { Card } from '../ui/Card';
import { DownloadButton } from '../ui/DownloadButton';
import { ShareToXButton } from '../ui/ShareToXButton';

interface PreviewWindowProps {
  type: 'frame' | 'builder';
}

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ type }) => {
  return (
    <Card className="flex flex-col gap-6 bg-gradient-to-b from-neutral-900/20 to-neutral-950/40 border border-white/5 p-6 h-full justify-between">
      {/* Header with live sync tags */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 select-none">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${type === 'frame' ? 'bg-accent-blue' : 'bg-accent-green'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${type === 'frame' ? 'bg-accent-blue' : 'bg-accent-green'}`}></span>
          </span>
          <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white">
            PREVIEW RENDER
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">STATUS:</span>
          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${type === 'frame' ? 'text-accent-blue' : 'text-accent-green'}`}>
            LIVE SYNCED
          </span>
        </div>
      </div>

      {/* Clean border workspace area around preview card */}
      <div className="flex-grow flex items-center justify-center py-8 px-4 min-h-[440px] relative overflow-hidden bg-neutral-950/40 rounded-2xl border border-white/5 shadow-inner">
        {/* Soft background ambient glow */}
        <div className={`absolute inset-0 bg-radial-gradient ${type === 'frame' ? 'from-accent-blue/5' : 'from-accent-green/5'} to-transparent pointer-events-none opacity-50`} />
        {type === 'frame' ? <FramePreview /> : <BuilderPreview />}
      </div>

      {/* Compact actions row */}
      <div className="border-t border-white/5 pt-5 flex justify-center gap-4 w-full">
        <div className="w-full max-w-[170px]">
          <DownloadButton mode={type} />
        </div>
        <div className="w-full max-w-[170px]">
          <ShareToXButton mode={type} />
        </div>
      </div>
    </Card>
  );
};
