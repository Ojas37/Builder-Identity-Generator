import { createImage } from '../utils/image';
import { PreviewRenderer } from '../canvas/PreviewRenderer';
import { downloadBlob, sanitizeFilename } from '../utils/download';
import { verifyImageBlobDimensions } from '../utils/verifyImage';
import { PFP_EXPORT_SIZE, BUILDER_EXPORT_WIDTH, BUILDER_EXPORT_HEIGHT } from '../constants/export';
import type { Area, BuilderData } from '../context/GeneratorContext';
import type { RenderConfig } from './exportTypes';

export interface ExportState {
  uploadedImage: string;
  crop: Area | null;
  rotation: number;
  selectedFrame: string | null;
  builderData: BuilderData;
  generatedTitle: string;
}

export class ImageExporter {
  /**
   * Export the graphic as a high-resolution PNG file.
   */
  public static async exportGraphic(
    mode: 'frame' | 'builder',
    state: ExportState
  ): Promise<void> {
    const { uploadedImage, crop, rotation, selectedFrame, builderData, generatedTitle } = state;

    if (!uploadedImage) {
      throw new Error('No image loaded to export');
    }

    // 1. Determine export bounds and compute design scale factors
    let exportWidth: number;
    let exportHeight: number;
    let baseWidth: number;

    if (mode === 'frame') {
      exportWidth = PFP_EXPORT_SIZE;
      exportHeight = PFP_EXPORT_SIZE;
      baseWidth = 800; // Base coordinate design system for frame is 800x800
    } else {
      exportWidth = BUILDER_EXPORT_WIDTH;
      exportHeight = BUILDER_EXPORT_HEIGHT;
      baseWidth = 500; // Base coordinate design system for card is 500x790
    }

    const scale = exportWidth / baseWidth;
    const config: RenderConfig = {
      width: exportWidth,
      height: exportHeight,
      scale,
    };

    // 2. Load the source image
    const image = await createImage(uploadedImage);

    // 3. Create high-resolution rendering canvas
    const canvas = document.createElement('canvas');
    
    // 4. Render composition on canvas
    if (mode === 'frame') {
      PreviewRenderer.renderFramePreview(canvas, image, crop, rotation, selectedFrame, config);
    } else {
      PreviewRenderer.renderBuilderPreview(canvas, image, crop, rotation, {
        name: builderData.name,
        role: builderData.role,
        title: generatedTitle,
      }, config);
    }

    // 5. Convert Canvas -> Blob -> Verify -> Download
    return new Promise<void>((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error('Failed to capture canvas export blob'));
          return;
        }

        try {
          // Programmatically verify the exported PNG dimensions to make sure the bounds are exact
          await verifyImageBlobDimensions(blob, exportWidth, exportHeight);

          // Build and sanitize file name
          let rawName: string;
          let fallbackName: string;

          if (mode === 'frame') {
            rawName = 'PFP';
            fallbackName = 'HH-Goa-2026-PFP.png';
          } else {
            rawName = builderData.name ? `${builderData.name}-Builder-Card` : 'Builder-Card';
            fallbackName = 'HH-Goa-2026-Builder-Card.png';
          }

          const sanitizedName = sanitizeFilename(rawName, fallbackName);

          // Save the file
          downloadBlob(blob, sanitizedName);
          
          // Force release canvas memory
          canvas.width = 0;
          canvas.height = 0;
          
          resolve();
        } catch (err: any) {
          reject(new Error(err.message || 'Verification or download failed'));
        }
      }, 'image/png');
    });
  }
}
