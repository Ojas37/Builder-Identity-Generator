import { useState, useEffect, useRef } from 'react';
import { useGenerator } from '../context/GeneratorContext';
import { PreviewRenderer } from '../canvas/PreviewRenderer';
import { createImage } from '../utils/image';
import { pfpTemplates } from '../templates/pfp/templates';
import { builderTemplates } from '../templates/builder/templates';
import type { RenderConfig } from '../export/exportTypes';

export function useImageTransform() {
  const {
    uploadedImage,
    croppedAreaPixels,
    rotation,
    selectedPFPTemplateId,
    selectedBuilderTemplateId,
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
        // Explicitly wait for fonts to load before drawing to canvas to prevent fallback text rendering
        if (typeof document !== 'undefined' && 'fonts' in document) {
          try {
            await document.fonts.ready;
          } catch (e) {
            console.warn('Font loading failed or timed out. Proceeding with rendering.');
          }
        }

        // 1. Load the original image once
        const image = await createImage(uploadedImage);

        if (!active) return;

        // 2. Setup rendering configuration for preview resolution (scale = 1.0)
        let finalWidth: number;
        let finalHeight: number;
        
        if (previewMode === 'frame') {
          finalWidth = 800;
          finalHeight = 800;
        } else {
          finalWidth = 500;
          finalHeight = 790;
        }

        const config: RenderConfig = {
          width: finalWidth,
          height: finalHeight,
          scale: 1.0,
        };

        // Create canvas for drawing
        const canvas = document.createElement('canvas');

        // 3. Render directly using the PreviewRenderer with chosen template
        if (previewMode === 'frame') {
          const template = pfpTemplates.find(t => t.id === selectedPFPTemplateId) || pfpTemplates[0];
          PreviewRenderer.renderFramePreview(
            canvas,
            image,
            croppedAreaPixels,
            rotation,
            template,
            config,
            { name: builderData.name }
          );
        } else {
          const template = builderTemplates.find(t => t.id === selectedBuilderTemplateId) || builderTemplates[0];
          PreviewRenderer.renderBuilderPreview(
            canvas,
            image,
            croppedAreaPixels,
            rotation,
            {
              name: builderData.name,
              role: builderData.role,
              title: generatedTitle,
            },
            template,
            config
          );
        }

        if (!active) return;

        // 4. Convert canvas to Blob URL
        canvas.toBlob((blob) => {
          if (!blob || !active) return;
          
          const newUrl = URL.createObjectURL(blob);
          
          // Revoke previous URL to prevent memory leaks
          if (prevUrlRef.current && prevUrlRef.current.startsWith('blob:')) {
            URL.revokeObjectURL(prevUrlRef.current);
          }
          
          prevUrlRef.current = newUrl;
          setPreviewUrl(newUrl);
          setIsProcessing(false);

          // Force release canvas memory
          canvas.width = 0;
          canvas.height = 0;
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
    }, 45);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [
    uploadedImage,
    croppedAreaPixels,
    rotation,
    selectedPFPTemplateId,
    selectedBuilderTemplateId,
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
