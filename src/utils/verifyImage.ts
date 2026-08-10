import { createImage } from './image';

/**
 * Programmatically loads a Blob into an Image and asserts its width and height.
 * Resolves if correct, rejects with an error if dimensions are incorrect.
 */
export function verifyImageBlobDimensions(
  blob: Blob,
  expectedWidth: number,
  expectedHeight: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob);
    
    createImage(objectUrl)
      .then((img) => {
        URL.revokeObjectURL(objectUrl);
        if (img.width === expectedWidth && img.height === expectedHeight) {
          resolve();
        } else {
          reject(
            new Error(
              `Dimension mismatch: Expected ${expectedWidth}x${expectedHeight}, got ${img.width}x${img.height}`
            )
          );
        }
      })
      .catch((err) => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error(`Failed to load image for verification: ${err.message || err}`));
      });
  });
}
