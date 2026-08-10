import type { Area } from '../context/GeneratorContext';
import type { RenderConfig } from '../export/exportTypes';

export class PreviewRenderer {
  /**
   * Helper to draw a cropped, rotated image directly onto a destination area.
   */
  private static drawCroppedImage(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    crop: Area | null,
    rotation: number,
    destX: number,
    destY: number,
    destW: number,
    destH: number
  ): void {
    // If no crop coordinates are provided, draw the original image centered and fitted
    if (!crop) {
      ctx.drawImage(image, destX, destY, destW, destH);
      return;
    }

    // Create a temporary canvas matching crop pixel size
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = crop.width;
    tempCanvas.height = crop.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
      ctx.drawImage(image, destX, destY, destW, destH);
      return;
    }

    const rotRad = (rotation * Math.PI) / 180;
    
    // Bounding box size of the rotated image
    const bBoxWidth =
      Math.abs(Math.cos(rotRad) * image.width) +
      Math.abs(Math.sin(rotRad) * image.height);
    const bBoxHeight =
      Math.abs(Math.sin(rotRad) * image.width) +
      Math.abs(Math.cos(rotRad) * image.height);

    // Create intermediate rotated canvas
    const rotCanvas = document.createElement('canvas');
    rotCanvas.width = bBoxWidth;
    rotCanvas.height = bBoxHeight;
    const rotCtx = rotCanvas.getContext('2d');
    if (!rotCtx) {
      ctx.drawImage(image, destX, destY, destW, destH);
      return;
    }

    // Draw rotated image centered on intermediate canvas
    rotCtx.translate(bBoxWidth / 2, bBoxHeight / 2);
    rotCtx.rotate(rotRad);
    rotCtx.translate(-image.width / 2, -image.height / 2);
    rotCtx.drawImage(image, 0, 0);

    // Extract the cropped portion from the rotated canvas onto the temp canvas
    tempCtx.drawImage(
      rotCanvas,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    // Draw the temp canvas onto the final canvas context
    ctx.drawImage(tempCanvas, destX, destY, destW, destH);
  }

  /**
   * Renders the profile picture frame preview on a canvas dynamically based on configuration.
   */
  public static renderFramePreview(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    crop: Area | null,
    rotation: number,
    _frameId: string | null,
    config: RenderConfig
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');

    const { width, height, scale } = config;
    canvas.width = width;
    canvas.height = height;

    // 1. Draw the cropped photo covering the entire canvas (except borders)
    this.drawCroppedImage(ctx, image, crop, rotation, 0, 0, width, height);

    // 2. Draw placeholder frame overlay scaled from base coordinate system (800x800 base)
    const baseBorder = 36;
    const borderSize = baseBorder * scale;

    ctx.fillStyle = '#0b0f19'; // Deep dark card color (surface)
    
    // Draw outer borders
    ctx.fillRect(0, 0, width, borderSize); // Top
    ctx.fillRect(0, height - borderSize, width, borderSize); // Bottom
    ctx.fillRect(0, 0, borderSize, height); // Left
    ctx.fillRect(width - borderSize, 0, borderSize, height); // Right

    // Draw a subtle border outline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1 * scale;
    ctx.strokeRect(borderSize, borderSize, width - borderSize * 2, height - borderSize * 2);

    // Glow accents
    ctx.strokeStyle = '#0ea5e9'; // Ocean blue
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(borderSize, borderSize);
    ctx.lineTo(width - borderSize, borderSize);
    ctx.stroke();

    ctx.strokeStyle = '#10b981'; // Neon green
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(borderSize, height - borderSize);
    ctx.lineTo(width - borderSize, height - borderSize);
    ctx.stroke();

    // 3. Draw branding texts
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.round(16 * scale)}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('HH GOA // 2026', borderSize + 16 * scale, borderSize / 2);

    ctx.fillStyle = '#9ca3af';
    ctx.font = `${Math.round(14 * scale)}px "Fira Code", monospace`;
    ctx.textAlign = 'right';
    ctx.fillText('28 - 31 OCT', width - borderSize - 16 * scale, borderSize / 2);

    ctx.fillStyle = '#9ca3af';
    ctx.font = `${Math.round(14 * scale)}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('BUILDER STATION', borderSize + 16 * scale, height - borderSize / 2);

    ctx.fillStyle = '#10b981';
    ctx.font = `bold ${Math.round(14 * scale)}px "Fira Code", monospace`;
    ctx.textAlign = 'right';
    ctx.fillText('SHIP OR SHIP', width - borderSize - 16 * scale, height - borderSize / 2);
  }

  /**
   * Renders the event ID card builder preview on a canvas dynamically based on configuration.
   */
  public static renderBuilderPreview(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    crop: Area | null,
    rotation: number,
    data: { name: string; role: string; title: string },
    config: RenderConfig
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');

    const { width, height, scale } = config;
    canvas.width = width;
    canvas.height = height;

    // 1. Draw Card Background (Slate Dark Gradient)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0f172a'); // slate-900
    bgGrad.addColorStop(0.5, '#020617'); // slate-950
    bgGrad.addColorStop(1, '#000000'); // black
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw glowing spots in corners
    const radialBlue = ctx.createRadialGradient(width, 0, 10, width, 0, 200 * scale);
    radialBlue.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
    radialBlue.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.fillStyle = radialBlue;
    ctx.fillRect(0, 0, width, height);

    const radialGreen = ctx.createRadialGradient(0, height, 10, 0, height, 200 * scale);
    radialGreen.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
    radialGreen.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = radialGreen;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Top Lanyard slot (80x14 slot at y=16 in base 500x790 coordinates)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1 * scale;
    
    const slotW = 80 * scale;
    const slotH = 14 * scale;
    const slotX = (width - slotW) / 2;
    const slotY = 16 * scale;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(slotX, slotY, slotW, slotH, 6 * scale);
    } else {
      ctx.rect(slotX, slotY, slotW, slotH);
    }
    ctx.fill();
    ctx.stroke();

    // 3. Draw Header Brand Details
    ctx.fillStyle = '#0ea5e9'; // Accent blue
    ctx.font = `extrabold ${Math.round(18 * scale)}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('HH GOA // 2026', width / 2, 70 * scale);

    ctx.fillStyle = '#9ca3af';
    ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
    ctx.fillText('BUILDER IDENTITY', width / 2, 92 * scale);

    // 4. Draw User Portrait with rounded corners (240x240 size at y=140 in base)
    const portSize = 240 * scale;
    const portX = (width - portSize) / 2;
    const portY = 140 * scale;

    // Draw border card backing for portrait
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1 * scale;
    ctx.strokeRect(portX - 1, portY - 1, portSize + 2, portSize + 2);

    // Clip to draw image rounded
    ctx.save();
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(portX, portY, portSize, portSize, 20 * scale);
    } else {
      ctx.rect(portX, portY, portSize, portSize);
    }
    ctx.clip();
    
    // Draw the cropped/transformed image directly on the clipped region
    this.drawCroppedImage(ctx, image, crop, rotation, portX, portY, portSize, portSize);
    ctx.restore();

    // 5. Draw Details
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';

    // Name
    const name = data.name || 'YOUR NAME';
    ctx.font = `bold ${Math.round(26 * scale)}px "Space Grotesk", sans-serif`;
    ctx.fillText(name, width / 2, 440 * scale);

    // Role
    const role = (data.role || 'STACK / ROLE').toUpperCase();
    ctx.fillStyle = '#9ca3af';
    ctx.font = `${Math.round(14 * scale)}px "Fira Code", monospace`;
    ctx.fillText(role, width / 2, 475 * scale);

    // 6. Title Badge (Terminal Wizard etc. at y=515 in base)
    const title = (data.title || 'BUILDER').toUpperCase();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 1 * scale;
    
    // Measure title text to adjust badge width
    ctx.font = `bold ${Math.round(12 * scale)}px "Fira Code", monospace`;
    const textWidth = ctx.measureText(title).width;
    const badgeW = textWidth + 32 * scale;
    const badgeH = 28 * scale;
    const badgeX = (width - badgeW) / 2;
    const badgeY = 515 * scale;

    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 999);
    } else {
      ctx.rect(badgeX, badgeY, badgeW, badgeH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981'; // Neon green
    ctx.fillText(title, width / 2, badgeY + 18 * scale);

    // 7. Footer Meta Details (y=660 in base)
    const footerY = 660 * scale;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(30 * scale, footerY);
    ctx.lineTo(width - 30 * scale, footerY);
    ctx.stroke();

    ctx.fillStyle = '#9ca3af';
    ctx.font = `${Math.round(10 * scale)}px "Fira Code", monospace`;
    
    ctx.textAlign = 'left';
    ctx.fillText('STATION: GOA_SAND', 30 * scale, footerY + 25 * scale);
    ctx.fillText('DATE: 28-31_OCT_2026', 30 * scale, footerY + 45 * scale);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#0ea5e9';
    ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
    ctx.fillText('VERIFIED_BUILDER', width - 30 * scale, footerY + 25 * scale);
    
    ctx.fillStyle = '#9ca3af';
    ctx.font = `${Math.round(10 * scale)}px "Fira Code", monospace`;
    ctx.fillText('ID: 247-PM-STU', width - 30 * scale, footerY + 45 * scale);

    // Outer card glow/border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2 * scale;
    ctx.strokeRect(0, 0, width, height);
  }
}
