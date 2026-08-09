import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiAlertCircle } from 'react-icons/fi';
import { cn } from '../../utils/cn';

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  onError: (error: string) => void;
  isInvalid: boolean;
  errorMessage: string | null;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileSelect,
  onError,
  isInvalid,
  errorMessage,
}) => {
  const onDrop = React.useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        if (rejection.errors[0]?.code === 'file-invalid-type') {
          onError('Unsupported format. Please upload PNG, JPG, JPEG, or HEIC.');
        } else {
          onError(rejection.errors[0]?.message || 'File upload failed.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/jpg': ['.jpg', '.jpeg'],
      'image/heic': ['.heic'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border border-dashed rounded-custom-3xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] bg-neutral-900/20 backdrop-blur-sm',
        {
          'border-neutral-800 hover:border-neutral-700': !isDragActive && !isInvalid,
          'border-accent-blue bg-accent-blue/5 glow-border-blue scale-[1.01]': isDragActive,
          'border-red-500/50 bg-red-500/5 hover:border-red-500/80': isInvalid,
        }
      )}
    >
      <input {...getInputProps()} />

      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center mb-4 border transition-all duration-300',
          {
            'border-neutral-800 text-neutral-400 bg-neutral-900': !isDragActive && !isInvalid,
            'border-accent-blue/30 text-accent-blue bg-accent-blue/10': isDragActive,
            'border-red-500/30 text-red-400 bg-red-500/10': isInvalid,
          }
        )}
      >
        {isInvalid ? <FiAlertCircle size={20} /> : <FiUploadCloud size={20} />}
      </div>

      <div className="max-w-[280px]">
        {isInvalid ? (
          <>
            <p className="text-sm font-semibold text-red-400 mb-1">Invalid File</p>
            <p className="text-xs text-neutral-400 leading-normal">{errorMessage}</p>
          </>
        ) : isDragActive ? (
          <p className="text-sm font-semibold text-accent-blue">Drop the files here...</p>
        ) : (
          <>
            <p className="text-sm font-semibold text-white mb-1">
              Drag & Drop your image
            </p>
            <p className="text-xs text-neutral-500 mb-4">or click to browse from device</p>
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider">
              Supports PNG, JPG, JPEG, HEIC (Max 5MB)
            </p>
          </>
        )}
      </div>
    </div>
  );
};
