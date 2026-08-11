import type { BuilderTemplate } from './BuilderTemplate';
import { PreviewRenderer } from '../../canvas/PreviewRenderer';

// Helper to deterministically calculate a rarity profile based on name string
const getRarityProfile = (name: string) => {
  const normalized = (name || 'YOUR NAME').trim().toUpperCase();
  let score = 0;
  for (let i = 0; i < normalized.length; i++) {
    score += normalized.charCodeAt(i);
  }
  
  const levels = [
    { label: 'LEGENDARY', stars: 5, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    { label: 'EPIC', stars: 4, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
    { label: 'RARE', stars: 3, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { label: 'UNCOMMON', stars: 2, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    { label: 'COMMON', stars: 1, color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.1)' },
  ];

  return levels[score % levels.length];
};

export const builderTemplates: BuilderTemplate[] = [
  {
    id: 'goa-boarding-pass',
    name: 'Goa Palms',
    description: 'Vibrant poster with vintage postage stamps, surfboards, beach huts, and custom credentials.',
    previewColor: '#fdfcf7',
    colors: {
      backgroundStart: '#fdfcf7',
      backgroundEnd: '#fdfcf7',
      primary: '#004d26',
      secondary: '#00a359',
      accent: '#ff007f',
      text: '#004d26',
      badgeBg: '#004d26',
      badgeText: '#ffffff',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Draw cream card base background
      ctx.fillStyle = '#fdfcf7';
      ctx.fillRect(0, 0, width, height);

      // Draw thin double dark-green border frame around card edge
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(10 * scale, 10 * scale, width - 20 * scale, height - 20 * scale);
      ctx.strokeRect(13 * scale, 13 * scale, width - 26 * scale, height - 26 * scale);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;

      // 1. Draw top brand ticket slot badge
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(205 * scale, 10 * scale, 90 * scale, 35 * scale, [0, 0, 8 * scale, 8 * scale]);
      } else {
        ctx.rect(205 * scale, 10 * scale, 90 * scale, 35 * scale);
      }
      ctx.fill();

      // Top stamp palm tree icon
      PreviewRenderer.drawPalmTree(ctx, 250 * scale, 24 * scale, 12 * scale, scale, '#ffd000');
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('HH GOA 2026', 250 * scale, 36 * scale);

      // 2. Draw Main Title: HACKER गोवा HOUSE
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(28 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'right';
      ctx.fillText('HACKER', 215 * scale, 85 * scale);

      ctx.textAlign = 'left';
      ctx.fillText('HOUSE', 285 * scale, 85 * scale);

      // Draw middle 'गोवा' text block with a pink background and yellow outline
      ctx.save();
      ctx.translate(250 * scale, 80 * scale);
      ctx.rotate(-8 * Math.PI / 180);
      
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-24 * scale, -15 * scale, 48 * scale, 26 * scale, 4 * scale);
      } else {
        ctx.rect(-24 * scale, -15 * scale, 48 * scale, 26 * scale);
      }
      ctx.fill();

      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-22 * scale, -13 * scale, 44 * scale, 22 * scale, 3 * scale);
      } else {
        ctx.rect(-22 * scale, -13 * scale, 44 * scale, 22 * scale);
      }
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(13 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('गोवा', 0, 0);
      ctx.restore();

      // 3. Draw Vintage stamps in top left and top right corners
      // Top Left: GOA INDIA postage stamp (rotated rect)
      ctx.save();
      ctx.translate(50 * scale, 75 * scale);
      ctx.rotate(-10 * Math.PI / 180);
      
      // Draw stamp jagged perforations
      ctx.fillStyle = '#004d26';
      ctx.fillRect(-27 * scale, -37 * scale, 54 * scale, 74 * scale);
      ctx.fillStyle = '#fdfcf7';
      for (let y = -34 * scale; y <= 34 * scale; y += 8 * scale) {
        ctx.beginPath();
        ctx.arc(-27 * scale, y, 3 * scale, 0, Math.PI * 2);
        ctx.arc(27 * scale, y, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let x = -24 * scale; x <= 24 * scale; x += 8 * scale) {
        ctx.beginPath();
        ctx.arc(x, -37 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.arc(x, 37 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stamp interior
      ctx.fillStyle = '#004d26';
      ctx.fillRect(-23 * scale, -33 * scale, 46 * scale, 66 * scale);
      
      ctx.strokeStyle = '#fdfcf7';
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(-21 * scale, -31 * scale, 42 * scale, 62 * scale);

      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(6 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('GOA', 0, -22 * scale);
      ctx.fillText('INDIA', 0, 26 * scale);

      // Draw micro palm & sunset inside stamp
      ctx.beginPath();
      ctx.arc(0, 5 * scale, 12 * scale, Math.PI, 0);
      ctx.fill();
      PreviewRenderer.drawPalmTree(ctx, 0, 8 * scale, 22 * scale, scale, '#004d26');

      ctx.restore();

      // Top Right: Circular seal: "BUILD IN GOA * SHIP FROM PARADISE"
      ctx.save();
      ctx.translate(435 * scale, 85 * scale);
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, 36 * scale, 0, Math.PI * 2);
      ctx.stroke();

      PreviewRenderer.drawCurvedText(
        ctx,
        'BUILD IN GOA ★ SHIP FROM PARADISE',
        435 * scale,
        85 * scale,
        28 * scale,
        -Math.PI / 2,
        `bold ${Math.round(5.5 * scale)}px "Fira Code", monospace`,
        '#004d26',
        scale
      );
      PreviewRenderer.drawPalmTree(ctx, 0, 15 * scale, 34 * scale, scale, '#004d26');
      ctx.restore();

      // 4. Draw Center portrait framing (gold scalloped ring with red triangle teeth inside)
      const pcy = 285 * scale;
      const prad = 80 * scale;
      PreviewRenderer.drawScallopedBorder(ctx, cx, pcy, prad, scale);

      // Red inner teeth ring
      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(cx, pcy, prad - 4 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // 5. Draw Left Stub Graphics (Signpost & Surfboards)
      // Brown wooden post
      ctx.fillStyle = '#d97706';
      ctx.fillRect(63 * scale, 280 * scale, 4 * scale, 180 * scale);
      
      // BUILD Sign (Yellow)
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      ctx.moveTo(35 * scale, 350 * scale);
      ctx.lineTo(82 * scale, 350 * scale);
      ctx.lineTo(92 * scale, 360 * scale);
      ctx.lineTo(82 * scale, 370 * scale);
      ctx.lineTo(35 * scale, 370 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('BUILD', 55 * scale, 362 * scale);

      // SHIP Sign (Pink)
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.moveTo(95 * scale, 385 * scale);
      ctx.lineTo(48 * scale, 385 * scale);
      ctx.lineTo(38 * scale, 395 * scale);
      ctx.lineTo(48 * scale, 405 * scale);
      ctx.lineTo(95 * scale, 405 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SHIP', 70 * scale, 397 * scale);

      // REPEAT Sign (Green)
      ctx.fillStyle = '#00a359';
      ctx.beginPath();
      ctx.moveTo(35 * scale, 420 * scale);
      ctx.lineTo(82 * scale, 420 * scale);
      ctx.lineTo(92 * scale, 430 * scale);
      ctx.lineTo(82 * scale, 440 * scale);
      ctx.lineTo(35 * scale, 440 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText('REPEAT', 55 * scale, 432 * scale);

      // Surfboards resting at the bottom left
      // Yellow surfboard
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      ctx.ellipse(32 * scale, 475 * scale, 12 * scale, 35 * scale, -10 * Math.PI / 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 1 * scale;
      ctx.stroke();

      // Pink surfboard
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.ellipse(50 * scale, 478 * scale, 12 * scale, 32 * scale, 8 * Math.PI / 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 6. Draw Right Stub Graphics (Red beach house cottage & Vespa scooter)
      // Beach house cottage
      const hx = 390 * scale;
      const hy = 360 * scale;
      // Roof
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(hx + 35 * scale, hy - 25 * scale);
      ctx.lineTo(hx + 70 * scale, hy);
      ctx.closePath();
      ctx.fill();
      // Body
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(hx + 8 * scale, hy, 54 * scale, 45 * scale);
      // Windows
      ctx.fillStyle = '#004d26';
      ctx.fillRect(hx + 18 * scale, hy + 12 * scale, 10 * scale, 12 * scale);
      ctx.fillRect(hx + 42 * scale, hy + 12 * scale, 10 * scale, 12 * scale);
      // Door
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(hx + 30 * scale, hy + 28 * scale, 10 * scale, 17 * scale);

      // Vespa scooter parked in front of cottage
      const vx = hx + 55 * scale;
      const vy = hy + 45 * scale;
      // Wheels
      ctx.fillStyle = '#004d26';
      ctx.beginPath();
      ctx.arc(vx, vy, 5 * scale, 0, Math.PI * 2);
      ctx.arc(vx + 14 * scale, vy, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(vx, vy - 8 * scale, 14 * scale, 6 * scale);
      ctx.beginPath();
      ctx.moveTo(vx, vy - 2 * scale);
      ctx.lineTo(vx - 2 * scale, vy - 12 * scale);
      ctx.lineTo(vx + 4 * scale, vy - 12 * scale);
      ctx.closePath();
      ctx.fill();

      // Yellow bubble: "LET'S BUILD!"
      ctx.save();
      ctx.translate(415 * scale, 310 * scale);
      ctx.rotate(12 * Math.PI / 180);
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-30 * scale, -10 * scale, 60 * scale, 20 * scale, 6 * scale);
      } else {
        ctx.rect(-30 * scale, -10 * scale, 60 * scale, 20 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(7 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("LET'S BUILD!", 0, 0);
      ctx.restore();

      // 7. User Details Banners (Name and Role)
      // Name Badge
      ctx.fillStyle = '#004d26';
      ctx.beginPath();
      const nameText = (data.name || 'YOUR NAME').toUpperCase();
      ctx.font = `bold ${Math.round(18 * scale)}px "Space Grotesk", sans-serif`;
      const nameW = ctx.measureText(nameText).width + 40 * scale;
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - nameW / 2, 385 * scale, nameW, 30 * scale, 6 * scale);
      } else {
        ctx.rect(cx - nameW / 2, 385 * scale, nameW, 30 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(nameText, cx, 400 * scale);

      // Role Pill Badge
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      const roleText = `⚡ ${(data.role || 'STACK / ROLE').toUpperCase()} ⚡`;
      ctx.font = `bold ${Math.round(8 * scale)}px "Fira Code", monospace`;
      const roleW = ctx.measureText(roleText).width + 30 * scale;
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - roleW / 2, 422 * scale, roleW, 18 * scale, 99);
      } else {
        ctx.rect(cx - roleW / 2, 422 * scale, roleW, 18 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#ff007f';
      ctx.fillText(roleText, cx, 431 * scale);

      // 8. Bottom 3-Column Ticket layout
      const colY = 485 * scale;
      
      // Draw grid vertical separator lines
      ctx.strokeStyle = 'rgba(0, 77, 38, 0.1)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(165 * scale, colY - 5 * scale);
      ctx.lineTo(165 * scale, colY + 140 * scale);
      ctx.moveTo(330 * scale, colY - 5 * scale);
      ctx.lineTo(330 * scale, colY + 140 * scale);
      ctx.stroke();

      // Column 1: BUILDER CLASS
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('✦ BUILDER CLASS ✦', 97.5 * scale, colY + 10 * scale);
      
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(11 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.fillText((data.title || 'BUILDER').toUpperCase(), 97.5 * scale, colY + 28 * scale);

      // Green QR code with mini palm tree inside
      PreviewRenderer.drawQRCode(ctx, 55 * scale, colY + 38 * scale, 85 * scale, '#004d26');
      PreviewRenderer.drawPalmTree(ctx, 97.5 * scale, colY + 98 * scale, 18 * scale, scale, '#ffd000');

      // Column 2: BEACH BAG
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ BEACH BAG ✦', 250 * scale, colY + 10 * scale);

      ctx.font = `bold ${Math.round(8 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      
      // Item 1: Coconut
      PreviewRenderer.drawPalmTree(ctx, 195 * scale, colY + 30 * scale, 12 * scale, scale, '#00a359');
      ctx.fillText('COCONUT', 215 * scale, colY + 33 * scale);

      // Item 2: VS Code
      ctx.fillStyle = '#ff007f';
      ctx.fillText('< />', 195 * scale, colY + 53 * scale);
      ctx.fillStyle = '#004d26';
      ctx.fillText('VS CODE', 215 * scale, colY + 53 * scale);

      // Item 3: Lo-Fi Beats
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      ctx.arc(195 * scale, colY + 70 * scale, 5 * scale, Math.PI, 0);
      ctx.stroke();
      ctx.fillStyle = '#004d26';
      ctx.fillText('LO-FI BEATS', 215 * scale, colY + 73 * scale);

      // Sunset Ocean illustration at the bottom of Column 2
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      ctx.arc(250 * scale, colY + 130 * scale, 16 * scale, Math.PI, 0);
      ctx.fill();
      // Wave horizontal lines
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(210 * scale, colY + 132 * scale);
      ctx.lineTo(290 * scale, colY + 132 * scale);
      ctx.moveTo(225 * scale, colY + 136 * scale);
      ctx.lineTo(275 * scale, colY + 136 * scale);
      ctx.stroke();

      // Column 3: CURRENTLY SHIPPING
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('✦ CURRENTLY SHIPPING ✦', 402.5 * scale, colY + 10 * scale);

      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(11 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.fillText('BUILDING THE FUTURE', 402.5 * scale, colY + 28 * scale);

      // Barcode
      const barcodeX = 350 * scale;
      const barcodeY = colY + 55 * scale;
      const barcodeH = 30 * scale;
      ctx.fillStyle = '#004d26';
      let currX = barcodeX;
      const pattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2];
      for (let i = 0; i < pattern.length; i++) {
        const w = pattern[i] * scale;
        ctx.fillRect(currX, barcodeY, w, barcodeH);
        currX += w + 2 * scale;
      }

      ctx.fillStyle = '#004d26';
      ctx.font = `${Math.round(7 * scale)}px "Fira Code", monospace`;
      ctx.fillText('BUILDER ID', 402.5 * scale, colY + 102 * scale);
      ctx.fillText('#HH-GOA-7757', 402.5 * scale, colY + 114 * scale);

      // 9. Bottom Pink Ribbon "#FRAMEINGOA"
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(30 * scale, height - 50 * scale, width - 60 * scale, 24 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('#FRAMEINGOA', cx, height - 35 * scale);
    },
  },
  {
    id: 'rarity-badge',
    name: 'Cyber Pass',
    description: 'Dynamic rarity stars and custom borders generated deterministically from your name.',
    previewColor: '#a855f7',
    colors: {
      backgroundStart: '#09100d',
      backgroundEnd: '#000000',
      primary: '#a855f7',
      secondary: '#6b7280',
      accent: '#a855f7',
      text: '#ffffff',
      badgeBg: 'rgba(168, 85, 247, 0.1)',
      badgeText: '#a855f7',
    },
    typography: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Draw dark cyber backdrop
      ctx.fillStyle = '#09100d';
      ctx.fillRect(0, 0, width, height);

      // Drawing tech grids
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1 * scale;
      const gridSize = 40 * scale;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;

      // 1. Calculate deterministic rarity properties based on builder name
      const rarity = getRarityProfile(data.name);

      // 2. Draw card color glow border representing rarity
      ctx.strokeStyle = rarity.color;
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(10 * scale, 10 * scale, width - 20 * scale, height - 20 * scale);

      // Draw glowing corner indicators in rarity color
      const len = 15 * scale;
      ctx.fillStyle = rarity.color;
      ctx.fillRect(10 * scale, 10 * scale, len, 3 * scale);
      ctx.fillRect(10 * scale, 10 * scale, 3 * scale, len);

      ctx.fillRect(width - 10 * scale - len, 10 * scale, len, 3 * scale);
      ctx.fillRect(width - 10 * scale, 10 * scale, 3 * scale, len);

      // 3. Draw Rarity Badge Label (EPIC, LEGENDARY, etc.)
      const badgeY = 560 * scale;
      const labelText = `${rarity.label} PASS`;
      
      ctx.fillStyle = rarity.bg;
      ctx.strokeStyle = rarity.color;
      ctx.lineWidth = 1 * scale;
      
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      const tW = ctx.measureText(labelText).width;
      const bW = tW + 24 * scale;
      const bH = 24 * scale;
      const bX = (width - bW) / 2;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(bX, badgeY, bW, bH, 4 * scale);
      } else {
        ctx.rect(bX, badgeY, bW, bH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = rarity.color;
      ctx.fillText(labelText, width / 2, badgeY + 16 * scale);

      // 4. Draw Rarity Star Rating below the badge
      const starsY = badgeY + 45 * scale;
      const starSize = 7 * scale;
      const starsRowWidth = (rarity.stars * (starSize * 1.5)) - (starSize * 0.5);
      const startX = (width - starsRowWidth) / 2 + (starSize / 2);
      PreviewRenderer.drawStarRating(ctx, startX, starsY, rarity.stars, rarity.stars, starSize, rarity.color);

      // 5. Draw ID barcode at the bottom
      const footerY = 660 * scale;
      const barcodeX = 35 * scale;
      const barcodeY = footerY + 20 * scale;
      const barcodeH = 30 * scale;
      
      ctx.fillStyle = rarity.color;
      let currentX = barcodeX;
      const linePattern = [1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1];
      for (let i = 0; i < linePattern.length; i++) {
        const w = linePattern[i] * scale;
        ctx.fillRect(currentX, barcodeY, w, barcodeH);
        currentX += w + 2 * scale;
      }
    },
  },
  {
    id: 'ocean-sand',
    name: 'Sunset Waves',
    description: 'Deep sunset gradients with elegant vector waves and modern branding.',
    previewColor: '#0ea5e9',
    colors: {
      backgroundStart: '#020617',
      backgroundEnd: '#000000',
      primary: '#0ea5e9',
      secondary: '#9ca3af',
      accent: '#0ea5e9',
      text: '#ffffff',
      badgeBg: 'rgba(14, 165, 233, 0.1)',
      badgeText: '#0ea5e9',
    },
    typography: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Dark blue background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0a192f'); // Deep blue
      grad.addColorStop(0.5, '#020617');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Waves illustration lines drawn in background (radial wave arcs)
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.04)';
      ctx.lineWidth = 2 * scale;
      
      ctx.beginPath();
      ctx.arc(width / 2, height + 100 * scale, 400 * scale, Math.PI, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width / 2, height + 100 * scale, 500 * scale, Math.PI, 0);
      ctx.stroke();
    },
    renderOverlay(ctx, config, _data) {
      const { width, scale } = config;
      const footerY = 660 * scale;

      // Draw subtle logo wave icon next to footer
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 1.5 * scale;
      const iconX = width - 75 * scale;
      const iconY = footerY + 30 * scale;
      ctx.beginPath();
      ctx.moveTo(iconX, iconY);
      ctx.quadraticCurveTo(iconX + 10 * scale, iconY - 8 * scale, iconX + 20 * scale, iconY);
      ctx.quadraticCurveTo(iconX + 30 * scale, iconY + 8 * scale, iconX + 40 * scale, iconY);
      ctx.stroke();
    },
  },
];
