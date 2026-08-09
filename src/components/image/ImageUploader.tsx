import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { useCrop } from '../../hooks/useCrop';
import { ImageDropzone } from './ImageDropzone';
import { Button } from '../ui/Button';
import { FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const { crop, zoom, rotation, onCropChange, onZoomChange, onRotationChange, onCropComplete } = useCrop();

  const handleFileSelect = (file: File) => {
    setError(null);
    try {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size too large. Maximum size is 5MB.');
        return;
      }
      
      const objectUrl = URL.createObjectURL(file);
      onChange(objectUrl);
    } catch (err) {
      setError('An error occurred during file upload.');
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value && value.startsWith('blob:')) {
      URL.revokeObjectURL(value);
    }
    onChange(null);
    setError(null);
  };

  const handleDropzoneError = (errMsg: string) => {
    setError(errMsg);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!value ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ImageDropzone
              onFileSelect={handleFileSelect}
              onError={handleDropzoneError}
              isInvalid={!!error}
              errorMessage={error}
            />
          </motion.div>
        ) : (
          <motion.div
            key="cropper"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative flex flex-col gap-4"
          >
            {/* Inline Cropper Container */}
            <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-3xl overflow-hidden bg-neutral-950 border border-white/5 shadow-inner">
              <Cropper
                image={value}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onRotationChange={onRotationChange}
                onCropComplete={onCropComplete}
                cropShape="rect"
                showGrid={true}
                restrictPosition={true}
                classes={{
                  containerClassName: 'bg-neutral-950',
                  cropAreaClassName: 'border border-white/40 rounded-2xl shadow-[0_0_0_9999px_rgba(3,7,18,0.7)]',
                }}
              />
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="danger"
                size="sm"
                onClick={handleClear}
                className="gap-2 font-mono uppercase text-[10px] tracking-wider"
              >
                <FiTrash2 size={12} />
                Remove Image
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
