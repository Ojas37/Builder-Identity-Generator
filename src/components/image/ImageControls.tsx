import React from 'react';
import { useGenerator } from '../../context/GeneratorContext';
import { Button } from '../ui/Button';
import { FiZoomIn, FiRefreshCw } from 'react-icons/fi';
import { Card } from '../ui/Card';

export const ImageControls: React.FC = () => {
  const { uploadedImage, zoom, setZoom, rotation, setRotation, setCrop } = useGenerator();

  if (!uploadedImage) {
    return (
      <Card className="border border-white/5 bg-neutral-900/10 p-6 opacity-40 select-none">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 font-mono text-neutral-500 flex items-center gap-2">
          <FiZoomIn size={14} />
          Image Adjustments
        </h3>
        <p className="text-xs text-neutral-600 font-mono uppercase tracking-wider">Upload an image to activate sliders</p>
      </Card>
    );
  }

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  return (
    <Card className="border border-white/5 bg-neutral-900/10 p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
          <FiZoomIn size={14} className="text-accent-blue" />
          Image Adjustments
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="gap-1.5 font-mono uppercase text-[9px] tracking-wider py-1 px-2.5 h-auto text-neutral-400 hover:text-white"
        >
          <FiRefreshCw size={10} />
          Reset Layout
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Zoom Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
            <span>Zoom factor</span>
            <span className="text-accent-blue font-bold">{zoom.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-accent-blue focus:outline-none"
            aria-label="Zoom Image"
          />
        </div>

        {/* Rotation Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
            <span>Rotation</span>
            <span className="text-accent-green font-bold">{rotation}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value, 10))}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-accent-green focus:outline-none"
            aria-label="Rotate Image"
          />
        </div>
      </div>
    </Card>
  );
};
