import React from 'react';
import { FramePreview } from './FramePreview';
import { BuilderPreview } from './BuilderPreview';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DownloadButton } from '../ui/DownloadButton';
import { ShareToXButton } from '../ui/ShareToXButton';

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
        <Badge variant="blue">Phase 3 Export</Badge>
      </div>

      {/* Render Area */}
      <div className="flex-grow flex items-center justify-center py-6 min-h-[300px]">
        {type === 'frame' ? <FramePreview /> : <BuilderPreview />}
      </div>

      {/* Actions */}
      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-3">
        <DownloadButton mode={type} />

        <ShareToXButton mode={type} />
      </div>
    </Card>
  );
};
