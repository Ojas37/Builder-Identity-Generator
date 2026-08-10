import React, { useState, useEffect } from 'react';
import { useGenerator } from '../../context/GeneratorContext';
import { shareToX } from '../../services/xShare';
import { Button } from './Button';
import { FiTwitter, FiCheck, FiAlertTriangle } from 'react-icons/fi';

interface ShareToXButtonProps {
  mode: 'frame' | 'builder';
}

export const ShareToXButton: React.FC<ShareToXButtonProps> = ({ mode }) => {
  const { uploadedImage } = useGenerator();
  const [status, setStatus] = useState<'idle' | 'sharing' | 'success' | 'error'>('idle');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (status === 'success' || status === 'error') {
      timer = setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleShare = () => {
    setStatus('sharing');
    const success = shareToX(mode);
    if (success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'sharing':
        return 'Opening X...';
      case 'success':
        return 'X Opened ✓';
      case 'error':
        return 'Blocked! Try Again';
      default:
        return 'Share to X';
    }
  };

  const getButtonVariant = () => {
    if (status === 'success') return 'accent-green';
    if (status === 'error') return 'danger';
    return 'secondary';
  };

  const isDisabled = !uploadedImage;

  return (
    <div className="relative flex flex-col flex-grow gap-1">
      <Button
        variant={getButtonVariant()}
        fullWidth
        disabled={isDisabled}
        onClick={handleShare}
        className="gap-2 font-mono uppercase tracking-wider text-xs font-semibold focus:ring-2 focus:ring-accent-blue focus:outline-none transition-all duration-200"
        aria-label="Share generator post to X"
      >
        {status === 'sharing' && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            role="status"
            aria-label="Opening Twitter Intent"
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
        {status === 'idle' && <FiTwitter size={14} />}
        {getButtonText()}
      </Button>

      {/* Subtle, non-intrusive instruction footer for manual upload constraint */}
      {uploadedImage && (
        <span className="text-[9px] font-mono text-neutral-500 text-center leading-normal mt-1">
          {status === 'success' ? (
            <span className="text-accent-green">Composer opened! Add your downloaded PNG.</span>
          ) : status === 'error' ? (
            <span className="text-red-400">Popup blocked. Allow popups for X composer.</span>
          ) : (
            <span>Download PNG first, then attach to X.</span>
          )}
        </span>
      )}
    </div>
  );
};
