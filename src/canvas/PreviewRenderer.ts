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
   * Programmatically draws a vector star.
   */
  public static drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number
  ): void {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  /**
   * Programmatically draws a row of rating stars.
   */
  public static drawStarRating(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    filledCount: number,
    maxCount: number,
    size: number,
    color: string
  ): void {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    for (let i = 0; i < maxCount; i++) {
      const isFilled = i < filledCount;
      const starX = x + i * (size * 1.5);
      
      this.drawStar(ctx, starX, y, 5, size, size / 2.2);
      
      if (isFilled) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  /**
   * Programmatically draws a retro circular postmark stamp.
   */
  public static drawPostmarkStamp(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    text: string,
    color: string,
    scale: number
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-12 * Math.PI / 180);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.5 * scale;

    // Outer circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Inner circle
    ctx.beginPath();
    ctx.arc(0, 0, radius - 4 * scale, 0, Math.PI * 2);
    ctx.stroke();

    // Draw split divider lines inside circle
    ctx.beginPath();
    ctx.moveTo(-radius + 6 * scale, -2 * scale);
    ctx.lineTo(radius - 6 * scale, -2 * scale);
    ctx.moveTo(-radius + 6 * scale, 2 * scale);
    ctx.lineTo(radius - 6 * scale, 2 * scale);
    ctx.stroke();

    // Text centered inside stamp
    ctx.font = `bold ${Math.round(8 * scale)}px "Fira Code", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 0);

    ctx.restore();
  }

  /**
   * Programmatically draws a pixel-perfect QR Code representation.
   */
  public static drawQRCode(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string
  ): void {
    ctx.save();
    ctx.fillStyle = color;
    const p = size / 10; // 10x10 modular resolution grid

    // 1. Finder pattern: top left
    ctx.fillRect(x, y, p * 3, p);
    ctx.fillRect(x, y, p, p * 3);
    ctx.fillRect(x + p * 2, y, p, p * 3);
    ctx.fillRect(x, y + p * 2, p * 3, p);
    ctx.fillRect(x + p, y + p, p, p);

    // 2. Finder pattern: top right
    ctx.fillRect(x + size - p * 3, y, p * 3, p);
    ctx.fillRect(x + size - p * 3, y, p, p * 3);
    ctx.fillRect(x + size - p, y, p, p * 3);
    ctx.fillRect(x + size - p * 3, y + p * 2, p * 3, p);
    ctx.fillRect(x + size - p * 2, y + p, p, p);

    // 3. Finder pattern: bottom left
    ctx.fillRect(x, y + size - p * 3, p * 3, p);
    ctx.fillRect(x, y + size - p * 3, p, p * 3);
    ctx.fillRect(x + p * 2, y + size - p * 3, p, p * 3);
    ctx.fillRect(x, y + size - p, p * 3, p);
    ctx.fillRect(x + p, y + size - p * 2, p, p);

    // 4. Generate pseudo-random grid details matching QR specs
    let lcg = 54321; // Linear congruential seed
    const nextRand = () => {
      lcg = (lcg * 1103515245 + 12345) & 0x7fffffff;
      return lcg / 0x7fffffff;
    };

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        // Skip locator zones
        if (r < 3 && c < 3) continue;
        if (r < 3 && c > 6) continue;
        if (r > 6 && c < 3) continue;

        if (nextRand() > 0.45) {
          ctx.fillRect(x + c * p, y + r * p, p, p);
        }
      }
    }
    ctx.restore();
  }

  /**
   * Programmatically draws a curved palm tree vector.
   */
  public static drawPalmTree(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    height: number,
    scale: number,
    color: string
  ): void {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2 * scale;
    
    // Trunk (slightly curved bezier)
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x - 10 * scale, y - height / 2, x - 5 * scale, y - height);
    ctx.stroke();

    // Leaves (fronds) radiating from top center
    const lx = x - 5 * scale;
    const ly = y - height;
    const leafAngles = [-120, -90, -60, -30, 0, 30];
    ctx.lineWidth = 1 * scale;

    leafAngles.forEach((angleDeg) => {
      const angle = (angleDeg * Math.PI) / 180;
      const leafLen = 22 * scale;
      const targetX = lx + Math.cos(angle) * leafLen;
      const targetY = ly + Math.sin(angle) * leafLen;

      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.quadraticCurveTo(
        lx + Math.cos(angle - 0.2) * leafLen,
        ly + Math.sin(angle - 0.2) * leafLen,
        targetX,
        targetY
      );
      ctx.stroke();

      // Draw sub-leaves (needles) along the frond stem
      for (let j = 1; j <= 5; j++) {
        const t = j / 5;
        const px = lx + (targetX - lx) * t;
        const py = ly + (targetY - ly) * t;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(
          px - 4 * scale * Math.sin(angle),
          py + 4 * scale * Math.cos(angle)
        );
        ctx.stroke();
      }
    });
    ctx.restore();
  }

  /**
   * Programmatically draws a retro beach hut scenery with sand hills and parked scooter.
   */
  public static drawBeachHut(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number
  ): void {
    ctx.save();
    
    // Sand hill base backdrop
    ctx.fillStyle = 'rgba(0, 108, 53, 0.08)'; // green-tinted hills
    ctx.beginPath();
    ctx.ellipse(x + 25 * scale, y + 42 * scale, 60 * scale, 18 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hut main body
    ctx.fillStyle = '#006c35'; // Brand Green
    ctx.fillRect(x, y + 10 * scale, 35 * scale, 25 * scale);
    
    // Roof triangle
    ctx.fillStyle = '#ff007f'; // Brand Pink
    ctx.beginPath();
    ctx.moveTo(x - 5 * scale, y + 10 * scale);
    ctx.lineTo(x + 17.5 * scale, y - 5 * scale);
    ctx.lineTo(x + 40 * scale, y + 10 * scale);
    ctx.closePath();
    ctx.fill();

    // Yellow door / window details
    ctx.fillStyle = '#ffd000'; // Brand Yellow
    ctx.fillRect(x + 6 * scale, y + 18 * scale, 8 * scale, 17 * scale); // Door
    ctx.fillRect(x + 22 * scale, y + 16 * scale, 7 * scale, 7 * scale); // Window
    
    // Parked pink scooter vector next to hut
    const sX = x - 18 * scale;
    const sY = y + 25 * scale;
    ctx.fillStyle = '#ff007f'; // Scooter body
    ctx.fillRect(sX, sY, 12 * scale, 6 * scale);
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(sX + 2 * scale, sY + 8 * scale, 3 * scale, 0, Math.PI * 2); // Front wheel
    ctx.arc(sX + 10 * scale, sY + 8 * scale, 3 * scale, 0, Math.PI * 2); // Rear wheel
    ctx.fill();
    
    ctx.restore();
  }

  /**
   * Programmatically draws a scalloped floral framing ring with small petal arcs and floral cores.
   */
  public static drawScallopedBorder(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    radius: number,
    scale: number
  ): void {
    ctx.save();
    
    // Draw scalloped circular petals along perimeter
    const numScallops = 32;
    ctx.fillStyle = '#ffd000'; // Brand Yellow petals
    ctx.strokeStyle = '#ffd000';
    ctx.lineWidth = 1 * scale;

    for (let i = 0; i < numScallops; i++) {
      const angle = (i * Math.PI * 2) / numScallops;
      const scallopX = cx + Math.cos(angle) * radius;
      const scallopY = cy + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.arc(scallopX, scallopY, 6 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Red/pink flower centers inside each scalloped petal
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.arc(scallopX, scallopY, 2 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd000'; // Reset
    }

    // Draw solid forest green backing ring just inside the scallops
    ctx.strokeStyle = '#006c35';
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 2 * scale, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Programmatically draws a postage stamp with perforated edges and a miniature sunset inside.
   */
  public static drawPerforatedStamp(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    scale: number,
    cutoutColor = '#030712'
  ): void {
    ctx.save();
    
    // Draw white stamp paper body
    ctx.fillStyle = '#fdfcf7';
    ctx.fillRect(x, y, w, h);

    // Subtract circles along the edges to simulate perforated stamp holes
    ctx.fillStyle = cutoutColor;
    const pRadius = 3 * scale;
    const step = 8 * scale;

    // Top and Bottom perforations
    for (let curX = x + 4 * scale; curX <= x + w; curX += step) {
      ctx.beginPath();
      ctx.arc(curX, y, pRadius, 0, Math.PI * 2);
      ctx.arc(curX, y + h, pRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    // Left and Right perforations
    for (let curY = y + 4 * scale; curY <= y + h; curY += step) {
      ctx.beginPath();
      ctx.arc(x, curY, pRadius, 0, Math.PI * 2);
      ctx.arc(x + w, curY, pRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw inner picture: sunset gradient rising over waves
    const px = x + 6 * scale;
    const py = y + 6 * scale;
    const pw = w - 12 * scale;
    const ph = h - 12 * scale;

    const stampGrad = ctx.createLinearGradient(px, py, px, py + ph);
    stampGrad.addColorStop(0, '#ffd000'); // Yellow sun
    stampGrad.addColorStop(1, '#ff007f'); // Pink sky
    ctx.fillStyle = stampGrad;
    ctx.fillRect(px, py, pw, ph);

    // Ocean waves curved vector lines
    ctx.strokeStyle = '#006c35';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(px, py + ph - 8 * scale);
    ctx.quadraticCurveTo(px + pw / 2, py + ph - 12 * scale, px + pw, py + ph - 8 * scale);
    ctx.stroke();

    // Text labels inside stamp
    ctx.fillStyle = '#006c35';
    ctx.font = `bold ${Math.round(7 * scale)}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('GOA', px + pw / 2, py + 8 * scale);
    ctx.fillText('INDIA', px + pw / 2, py + 16 * scale);

    ctx.restore();
  }

  /**
   * Programmatically draws text along a circle arc pathway.
   */
  public static drawCurvedText(
    ctx: CanvasRenderingContext2D,
    text: string,
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    font: string,
    color: string,
    scale: number,
    isReversed = false
  ): void {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const characters = text.split('');
    const numChars = characters.length;
    
    // Spacing index adjusting dynamically by radius size
    const angleStep = 0.08 * (1.5 / (radius / 100)) * (scale || 1.0);
    
    characters.forEach((char, i) => {
      const idx = isReversed ? numChars - 1 - i : i;
      const charAngle = startAngle + (idx - numChars / 2) * angleStep;
      
      ctx.save();
      const px = cx + Math.cos(charAngle) * radius;
      const py = cy + Math.sin(charAngle) * radius;
      ctx.translate(px, py);
      
      ctx.rotate(charAngle + (isReversed ? -Math.PI / 2 : Math.PI / 2));
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
    ctx.restore();
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

    // 1. Render template background
    if (template.renderBackground) {
      template.renderBackground(ctx, config);
    } else {
      ctx.fillStyle = template.colors.background;
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw portrait photo (circular frame crop for Boarding Stamp template, square otherwise)
    const borderSize = (template.borderWidth || 36) * scale;
    const imageSizeW = width - borderSize * 2;
    const imageSizeH = height - borderSize * 2;
    
    ctx.save();
    if (template.id === 'boarding-stamp') {
      // Draw circular clip path in center
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, imageSizeW / 2, 0, Math.PI * 2);
      ctx.clip();
      this.drawCroppedImage(ctx, image, crop, rotation, borderSize, borderSize, imageSizeW, imageSizeH);
    } else {
      this.drawCroppedImage(ctx, image, crop, rotation, borderSize, borderSize, imageSizeW, imageSizeH);
    }
    ctx.restore();

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
    if (template.id !== 'goa-boarding-pass') {
      ctx.fillText('HH GOA // 2026', width / 2, 70 * scale);
      ctx.fillStyle = template.colors.text;
      ctx.font = `bold ${Math.round(11 * scale)}px ${template.typography.body}`;
      ctx.fillText('BUILDER IDENTITY', width / 2, 92 * scale);
    }

    // 4. Draw User Portrait (circular crop frame layout for Goa Boarding Pass, rounded square otherwise)
    const isBoardingPass = template.id === 'goa-boarding-pass';
    const portSize = isBoardingPass ? 150 * scale : 240 * scale;
    const portX = isBoardingPass ? 90 * scale : (width - portSize) / 2;
    const portY = isBoardingPass ? 240 * scale : 140 * scale;

    ctx.save();
    if (isBoardingPass) {
      // Circular crop portrait matching boarding pass ticket templates
      ctx.beginPath();
      ctx.arc(portX + portSize / 2, portY + portSize / 2, portSize / 2, 0, Math.PI * 2);
      ctx.clip();
      this.drawCroppedImage(ctx, image, crop, rotation, portX, portY, portSize, portSize);
    } else {
      // Rounded square portrait card clipping
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(portX - 1, portY - 1, portSize + 2, portSize + 2);

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(portX, portY, portSize, portSize, 20 * scale);
      } else {
        ctx.rect(portX, portY, portSize, portSize);
      }
      ctx.clip();
      this.drawCroppedImage(ctx, image, crop, rotation, portX, portY, portSize, portSize);
    }
    ctx.restore();

    // 5. Draw Details
    if (!isBoardingPass) {
      const textCenterX = width / 2;
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
      ctx.fillText(name, textCenterX, 440 * scale);

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
      ctx.fillText(role, textCenterX, 475 * scale);

      // 6. Title Badge (Wizard etc. at y=515 in base)
      const title = (data.title || 'BUILDER').toUpperCase();
      ctx.fillStyle = template.colors.badgeBg;
      ctx.strokeStyle = template.colors.badgeText;
      ctx.lineWidth = 1 * scale;
      
      ctx.font = `bold ${Math.round(11 * scale)}px ${template.typography.mono}`;
      const textWidth = ctx.measureText(title).width;
      const badgeW = textWidth + 30 * scale;
      const badgeH = 26 * scale;
      const badgeX = textCenterX - badgeW / 2;
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
      ctx.fillText(title, textCenterX, badgeY + 17 * scale);

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
      
      if (template.id !== 'rarity-badge') {
        ctx.fillText('ID: 247-PM-STU', width - 30 * scale, footerY + 45 * scale);
      }
    }

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
