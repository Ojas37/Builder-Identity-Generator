import { useState, useEffect, useRef } from 'react';
import { useGenerator } from '../context/GeneratorContext';
import { getCroppedImgCanvas } from '../utils/crop';
import { PreviewRenderer } from '../canvas/PreviewRenderer';

export function useImageTransform() {
  const {
    uploadedImage,
    croppedAreaPixels,
    rotation,
    selectedFrame,
    previewMode,
    builderData,
    generatedTitle,
  } = useGenerator();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Track previous object URL to revoke it and prevent memory leaks
  const prevUrlRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    if (!uploadedImage || !croppedAreaPixels) {
      setPreviewUrl(null);
      return;
    }

    const generatePreview = async () => {
      setIsProcessing(true);
      setError(null);
      try {
        // 1. Get cropped image canvas
        const croppedCanvas = await getCroppedImgCanvas(
          uploadedImage,
          croppedAreaPixels,
          rotation
        );

        if (!active) return;

        // 2. Process through renderer based on current preview mode
        let finalCanvas: HTMLCanvasElement;
        if (previewMode === 'frame') {
          finalCanvas = PreviewRenderer.renderFramePreview(croppedCanvas, selectedFrame);
        } else {
          finalCanvas = PreviewRenderer.renderBuilderPreview(croppedCanvas, {
            name: builderData.name,
            role: builderData.role,
            title: generatedTitle,
          });
        }

        if (!active) return;

        // 3. Convert to Blob URL
        finalCanvas.toBlob((blob) => {
          if (!blob || !active) return;
          
          const newUrl = URL.createObjectURL(blob);
          
          // Revoke previous URL to prevent memory leaks
          if (prevUrlRef.current && prevUrlRef.current.startsWith('blob:')) {
            URL.revokeObjectURL(prevUrlRef.current);
          }
          
          prevUrlRef.current = newUrl;
          setPreviewUrl(newUrl);
          setIsProcessing(false);
        }, 'image/png');

      } catch (err) {
        if (active) {
          setError('Failed to render live preview.');
          setIsProcessing(false);
        }
      }
    };

    // Debounce preview rendering slightly during fast slider edits/drags to ensure buttery smoothness
    const timer = setTimeout(() => {
      generatePreview();
    }, 40);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [
    uploadedImage,
    croppedAreaPixels,
    rotation,
    selectedFrame,
    previewMode,
    builderData.name,
    builderData.role,
    generatedTitle,
  ]);

  // Clean up object URL when hook unmounts
  useEffect(() => {
    return () => {
      if (prevUrlRef.current && prevUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(prevUrlRef.current);
      }
    };
  }, []);

  return { previewUrl, isProcessing, error };
}
