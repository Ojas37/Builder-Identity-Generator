import React, { useState } from 'react';
import { ImageDropzone } from './ImageDropzone';
import { ImagePreview } from './ImagePreview';
import { Button } from '../ui/Button';
import { FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setError(null);
    try {
      // Validate file size (e.g. 5MB)
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
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative flex flex-col gap-4"
          >
            <div className="aspect-square w-full max-w-[280px] mx-auto">
              <ImagePreview src={value} alt="Uploaded builder portrait" />
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="danger"
                size="sm"
                onClick={handleClear}
                className="gap-2"
              >
                <FiTrash2 size={14} />
                Remove Image
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
