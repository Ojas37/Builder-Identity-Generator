import type { Area } from '../context/GeneratorContext';
import type { RenderConfig } from '../export/exportTypes';
import type { PFPTemplate } from '../templates/pfp/PFPTemplate';
import type { BuilderTemplate } from '../templates/builder/BuilderTemplate';

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
    if (!crop) {
      ctx.drawImage(image, destX, destY, destW, destH);
      return;
    }

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = crop.width;
    tempCanvas.height = crop.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
      ctx.drawImage(image, destX, destY, destW, destH);
      return;
    }

    const rotRad = (rotation * Math.PI) / 180;
    const bBoxWidth =
      Math.abs(Math.cos(rotRad) * image.width) +
      Math.abs(Math.sin(rotRad) * image.height);
    const bBoxHeight =
      Math.abs(Math.sin(rotRad) * image.width) +
      Math.abs(Math.cos(rotRad) * image.height);

    const rotCanvas = document.createElement('canvas');
    rotCanvas.width = bBoxWidth;
    rotCanvas.height = bBoxHeight;
    const rotCtx = rotCanvas.getContext('2d');
    if (!rotCtx) {
      ctx.drawImage(image, destX, destY, destW, destH);
      return;
    }

    rotCtx.translate(bBoxWidth / 2, bBoxHeight / 2);
    rotCtx.rotate(rotRad);
    rotCtx.translate(-image.width / 2, -image.height / 2);
    rotCtx.drawImage(image, 0, 0);

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

    ctx.drawImage(tempCanvas, destX, destY, destW, destH);
  }

  /**
   * Renders the profile picture frame preview on a canvas dynamically.
   */
  public static renderFramePreview(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    crop: Area | null,
    rotation: number,
    template: PFPTemplate,
    config: RenderConfig
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');

    const { width, height, scale } = config;
    canvas.width = width;
    canvas.height = height;

    // 1. Render template background (if defined)
    if (template.renderBackground) {
      template.renderBackground(ctx, config);
    } else {
      ctx.fillStyle = template.colors.background;
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw portrait photo centered inside the frame boundaries
    const borderSize = (template.borderWidth || 36) * scale;
    const imageSizeW = width - borderSize * 2;
    const imageSizeH = height - borderSize * 2;
    
    this.drawCroppedImage(ctx, image, crop, rotation, borderSize, borderSize, imageSizeW, imageSizeH);

    // 3. Render template frame overlay borders
    if (template.renderFrame) {
      template.renderFrame(ctx, config);
    } else {
      ctx.strokeStyle = template.colors.borderColor || template.colors.primary;
      ctx.lineWidth = borderSize;
      ctx.strokeRect(borderSize / 2, borderSize / 2, width - borderSize, height - borderSize);
    }

    // 4. Render custom overlays (text, stamps, logos)
    if (template.renderOverlay) {
      template.renderOverlay(ctx, config);
    } else {
      // Default overlay layout fallback
      ctx.fillStyle = template.colors.text;
      ctx.font = `bold ${Math.round(16 * scale)}px ${template.typography.heading}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('HH GOA', borderSize + 16 * scale, borderSize / 2);
    }
  }

  /**
   * Renders the event ID card builder preview on a canvas dynamically.
   */
  public static renderBuilderPreview(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    crop: Area | null,
    rotation: number,
    data: { name: string; role: string; title: string },
    template: BuilderTemplate,
    config: RenderConfig
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');

    const { width, height, scale } = config;
    canvas.width = width;
    canvas.height = height;

    // 1. Draw Card Background
    if (template.renderBackground) {
      template.renderBackground(ctx, config);
    } else {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, template.colors.backgroundStart);
      bgGrad.addColorStop(1, template.colors.backgroundEnd);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
    }

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
    ctx.fillStyle = template.colors.accent;
    ctx.font = `extrabold ${Math.round(18 * scale)}px ${template.typography.heading}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    
    // Draw top brand logo text if templates don't override the top area
    if (template.id !== 'goa-jungle') {
      ctx.fillText('HH GOA // 2026', width / 2, 70 * scale);
      ctx.fillStyle = template.colors.text;
      ctx.font = `bold ${Math.round(11 * scale)}px ${template.typography.body}`;
      ctx.fillText('BUILDER IDENTITY', width / 2, 92 * scale);
    }

    // 4. Draw User Portrait with rounded corners (240x240 size at y=140 in base)
    const portSize = 240 * scale;
    const portX = (width - portSize) / 2;
    const portY = 140 * scale;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1 * scale;
    ctx.strokeRect(portX - 1, portY - 1, portSize + 2, portSize + 2);

    ctx.save();
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(portX, portY, portSize, portSize, 20 * scale);
    } else {
      ctx.rect(portX, portY, portSize, portSize);
    }
    ctx.clip();
    
    this.drawCroppedImage(ctx, image, crop, rotation, portX, portY, portSize, portSize);
    ctx.restore();

    // 5. Draw Details
    ctx.textAlign = 'center';
    ctx.fillStyle = template.colors.text;

    // Name (with auto text wrapping/clipping to prevent overflow of long inputs)
    const name = (data.name || 'YOUR NAME').toUpperCase();
    ctx.font = `bold ${Math.round(24 * scale)}px ${template.typography.heading}`;
    
    // Safe text bounds check
    const maxTextWidth = width - 80 * scale;
    let nameFontW = 24;
    ctx.font = `bold ${Math.round(nameFontW * scale)}px ${template.typography.heading}`;
    while (ctx.measureText(name).width > maxTextWidth && nameFontW > 14) {
      nameFontW -= 2;
      ctx.font = `bold ${Math.round(nameFontW * scale)}px ${template.typography.heading}`;
    }
    ctx.fillText(name, width / 2, 440 * scale);

    // Role
    const role = (data.role || 'STACK / ROLE').toUpperCase();
    ctx.fillStyle = template.colors.secondary;
    ctx.font = `${Math.round(13 * scale)}px ${template.typography.mono}`;
    
    // Role font resizing bounds check
    let roleFontW = 13;
    while (ctx.measureText(role).width > maxTextWidth && roleFontW > 9) {
      roleFontW -= 1;
      ctx.font = `${Math.round(roleFontW * scale)}px ${template.typography.mono}`;
    }
    ctx.fillText(role, width / 2, 475 * scale);

    // 6. Title Badge (Wizard etc. at y=515 in base)
    const title = (data.title || 'BUILDER').toUpperCase();
    ctx.fillStyle = template.colors.badgeBg;
    ctx.strokeStyle = template.colors.badgeText;
    ctx.lineWidth = 1 * scale;
    
    ctx.font = `bold ${Math.round(11 * scale)}px ${template.typography.mono}`;
    const textWidth = ctx.measureText(title).width;
    const badgeW = textWidth + 30 * scale;
    const badgeH = 26 * scale;
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

    ctx.fillStyle = template.colors.badgeText;
    ctx.fillText(title, width / 2, badgeY + 17 * scale);

    // 7. Footer Divider Line (y=660 in base)
    const footerY = 660 * scale;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(30 * scale, footerY);
    ctx.lineTo(width - 30 * scale, footerY);
    ctx.stroke();

    // Footer Text Details
    ctx.fillStyle = template.colors.secondary;
    ctx.font = `${Math.round(10 * scale)}px ${template.typography.mono}`;
    
    ctx.textAlign = 'left';
    ctx.fillText('STATION: GOA_SAND', 30 * scale, footerY + 25 * scale);
    ctx.fillText('DATE: 28-31_OCT_2026', 30 * scale, footerY + 45 * scale);

    ctx.textAlign = 'right';
    ctx.fillStyle = template.colors.accent;
    ctx.font = `bold ${Math.round(10 * scale)}px ${template.typography.mono}`;
    ctx.fillText('VERIFIED_BUILDER', width - 30 * scale, footerY + 25 * scale);
    
    ctx.fillStyle = template.colors.secondary;
    ctx.font = `${Math.round(10 * scale)}px ${template.typography.mono}`;
    ctx.fillText('ID: 247-PM-STU', width - 30 * scale, footerY + 45 * scale);

    // 8. Custom Overlays from the Template config
    if (template.renderOverlay) {
      template.renderOverlay(ctx, config, data);
    }

    // Outer card glow border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2 * scale;
    ctx.strokeRect(0, 0, width, height);
  }
}
