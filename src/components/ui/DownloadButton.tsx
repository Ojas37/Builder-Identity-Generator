import React, { useState, useEffect } from 'react';
import { useGenerator } from '../../context/GeneratorContext';
import { ImageExporter, type ExportState } from '../../export/ImageExporter';
import { Button } from './Button';
import { FiDownload, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import type { DownloadStatus } from '../../export/exportTypes';

interface DownloadButtonProps {
  mode: 'frame' | 'builder';
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ mode }) => {
  const {
    uploadedImage,
    croppedAreaPixels,
    rotation,
    selectedFrame,
    builderData,
    generatedTitle,
  } = useGenerator();

  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (status === 'success' || status === 'error') {
      timer = setTimeout(() => {
        setStatus('idle');
        setErrorMessage(null);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleDownload = async () => {
    if (!uploadedImage) return;

    setStatus('generating');
    setErrorMessage(null);

    const exportState: ExportState = {
      uploadedImage,
      crop: croppedAreaPixels,
      rotation,
      selectedFrame,
      builderData,
      generatedTitle,
    };

    try {
      await ImageExporter.exportGraphic(mode, exportState);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Generation failed.');
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'generating':
        return 'Generating...';
      case 'success':
        return 'Downloaded ✓';
      case 'error':
        return 'Error! Try Again';
      default:
        return 'Download PNG';
    }
  };

  const getButtonVariant = () => {
    if (status === 'success') return 'accent-green';
    if (status === 'error') return 'danger';
    return 'primary';
  };

  const isDisabled = !uploadedImage || status === 'generating';

  return (
    <div className="relative flex-grow">
      <Button
        variant={getButtonVariant()}
        fullWidth
        disabled={isDisabled}
        onClick={handleDownload}
        className="gap-2 font-mono uppercase tracking-wider text-xs font-semibold focus:ring-2 focus:ring-accent-blue focus:outline-none transition-all duration-200"
        aria-label="Download generated graphic as PNG"
      >
        {status === 'generating' && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
            fill="none"
            viewBox="0 0 24 24"
            role="status"
            aria-label="Processing image"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {status === 'success' && <FiCheck size={14} />}
        {status === 'error' && <FiAlertTriangle size={14} />}
        {status === 'idle' && <FiDownload size={14} />}
        {getButtonText()}
      </Button>

      {errorMessage && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-red-400 whitespace-nowrap">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
