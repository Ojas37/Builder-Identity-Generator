export class PreviewRenderer {
  /**
   * Renders the profile picture frame preview on a canvas.
   */
  public static renderFramePreview(
    croppedCanvas: HTMLCanvasElement,
    _frameId: string | null
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');

    // We render at high resolution, e.g. 800x800
    const size = 800;
    canvas.width = size;
    canvas.height = size;

    // 1. Draw the cropped photo
    ctx.drawImage(croppedCanvas, 0, 0, size, size);

    // 2. Draw placeholder frame overlay
    const borderSize = 36;
    ctx.fillStyle = '#0b0f19'; // Deep dark card color (surface)
    
    // Draw outer borders
    // Top
    ctx.fillRect(0, 0, size, borderSize);
    // Bottom
    ctx.fillRect(0, size - borderSize, size, borderSize);
    // Left
    ctx.fillRect(0, 0, borderSize, size);
    // Right
    ctx.fillRect(size - borderSize, 0, borderSize, size);

    // Draw a subtle border outline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(borderSize, borderSize, size - borderSize * 2, size - borderSize * 2);

    // Glow accents
    ctx.strokeStyle = '#0ea5e9'; // Ocean blue
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(borderSize, borderSize);
    ctx.lineTo(size - borderSize, borderSize);
    ctx.stroke();

    ctx.strokeStyle = '#10b981'; // Neon green
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(borderSize, size - borderSize);
    ctx.lineTo(size - borderSize, size - borderSize);
    ctx.stroke();

    // 3. Draw branding texts
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Space Grotesk", sans-serif';
    ctx.fillText('HH GOA // 2026', borderSize + 16, borderSize - 12);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px "Fira Code", monospace';
    ctx.fillText('28 - 31 OCT', size - borderSize - 120, borderSize - 12);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px "Space Grotesk", sans-serif';
    ctx.fillText('BUILDER STATION', borderSize + 16, size - borderSize + 22);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 14px "Fira Code", monospace';
    ctx.fillText('SHIP OR SHIP', size - borderSize - 120, size - borderSize + 22);

    return canvas;
  }

  /**
   * Renders the event ID card builder preview on a canvas.
   */
  public static renderBuilderPreview(
    croppedCanvas: HTMLCanvasElement,
    data: { name: string; role: string; title: string }
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');

    // Standard ID card size ratios (500x790)
    const width = 500;
    const height = 790;
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
    const radialBlue = ctx.createRadialGradient(width, 0, 10, width, 0, 200);
    radialBlue.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
    radialBlue.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.fillStyle = radialBlue;
    ctx.fillRect(0, 0, width, height);

    const radialGreen = ctx.createRadialGradient(0, height, 10, 0, height, 200);
    radialGreen.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
    radialGreen.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = radialGreen;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Top Lanyard slot
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    // Draw rounded rectangle for hanger slot
    const slotW = 80;
    const slotH = 14;
    const slotX = (width - slotW) / 2;
    const slotY = 16;
    ctx.beginPath();
    // Using roundRect API (supported on modern browsers)
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(slotX, slotY, slotW, slotH, 6);
    } else {
      ctx.rect(slotX, slotY, slotW, slotH);
    }
    ctx.fill();
    ctx.stroke();

    // 3. Draw Header Brand Details
    ctx.fillStyle = '#0ea5e9'; // Accent blue
    ctx.font = 'extrabold 18px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HH GOA // 2026', width / 2, 70);

    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 11px "Space Grotesk", sans-serif';
    ctx.fillText('BUILDER IDENTITY', width / 2, 92);

    // 4. Draw User Portrait with rounded corners
    const portSize = 240;
    const portX = (width - portSize) / 2;
    const portY = 140;

    // Draw border card backing for portrait
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(portX - 1, portY - 1, portSize + 2, portSize + 2);

    // Clip to draw image rounded
    ctx.save();
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(portX, portY, portSize, portSize, 20);
    } else {
      ctx.rect(portX, portY, portSize, portSize);
    }
    ctx.clip();
    ctx.drawImage(croppedCanvas, portX, portY, portSize, portSize);
    ctx.restore();

    // 5. Draw Details
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';

    // Name
    const name = data.name || 'YOUR NAME';
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.fillText(name, width / 2, 440);

    // Role
    const role = (data.role || 'STACK / ROLE').toUpperCase();
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px "Fira Code", monospace';
    ctx.fillText(role, width / 2, 475);

    // 6. Title Badge (Terminal Wizard etc.)
    const title = (data.title || 'BUILDER').toUpperCase();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 1;
    
    // Measure title text to adjust badge width
    ctx.font = 'bold 12px "Fira Code", monospace';
    const textWidth = ctx.measureText(title).width;
    const badgeW = textWidth + 32;
    const badgeH = 28;
    const badgeX = (width - badgeW) / 2;
    const badgeY = 515;

    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 999);
    } else {
      ctx.rect(badgeX, badgeY, badgeW, badgeH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981'; // Neon green
    ctx.fillText(title, width / 2, badgeY + 18);

    // 7. Footer Meta Details
    const footerY = 660;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, footerY);
    ctx.lineTo(width - 30, footerY);
    ctx.stroke();

    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px "Fira Code", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('STATION: GOA_SAND', 30, footerY + 25);
    ctx.fillText('DATE: 28-31_OCT_2026', 30, footerY + 45);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 10px "Fira Code", monospace';
    ctx.fillText('VERIFIED_BUILDER', width - 30, footerY + 25);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px "Fira Code", monospace';
    ctx.fillText('ID: 247-PM-STU', width - 30, footerY + 45);

    // Outer card glow/border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);

    return canvas;
  }
}
