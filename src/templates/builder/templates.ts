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
    name: 'Goa Boarding Pass',
    description: 'Cream ticket stub with coconut palms, beach huts, scalloped photo frames, and stamps.',
    previewColor: '#f4f1ea',
    colors: {
      backgroundStart: '#f4f1ea',
      backgroundEnd: '#f4f1ea',
      primary: '#006c35',
      secondary: '#ffd000',
      accent: '#ff007f',
      text: '#006c35',
      badgeBg: '#ffffff',
      badgeText: '#ffd000',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Draw cream card base background (full card height)
      ctx.fillStyle = '#f4f1ea';
      ctx.fillRect(10 * scale, 10 * scale, width - 20 * scale, height - 20 * scale);

      // Perforated tear-off stub divider line (dotted) from y = 30 to height - 30
      ctx.strokeStyle = '#006c35';
      ctx.lineWidth = 2 * scale;
      ctx.setLineDash([4 * scale, 4 * scale]);
      ctx.beginPath();
      ctx.moveTo(330 * scale, 30 * scale);
      ctx.lineTo(330 * scale, height - 30 * scale);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash settings

      // Draw top and bottom punch hole circles cut out from the card
      ctx.fillStyle = '#030712'; // Matches outer body canvas backdrop
      ctx.beginPath();
      ctx.arc(330 * scale, 0, 10 * scale, 0, Math.PI * 2);
      ctx.arc(330 * scale, height, 10 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Outer thin ticket border (full card height)
      ctx.strokeStyle = '#006c35';
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(10 * scale, 10 * scale, width - 20 * scale, height - 20 * scale);
    },
    renderOverlay(ctx, config, data) {
      const { height, scale } = config;

      // 1. Draw top brand logo header inside the left section
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(18 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE GOA', 30 * scale, 65 * scale);

      // Draw Devanagari stamp next to header
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(15 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('गोवा', 240 * scale, 65 * scale);

      // 2. Draw golden scalloped floral border around circular photo frame
      PreviewRenderer.drawScallopedBorder(ctx, 165 * scale, 270 * scale, 100 * scale, scale);

      // 3. Draw Yellow/White Title Badge under the circular portrait
      const badgeText = (data.title || 'BUILDER').toUpperCase();
      ctx.fillStyle = '#ffffff'; // White fill
      ctx.strokeStyle = '#ffd000'; // Yellow border
      ctx.lineWidth = 1.5 * scale;
      
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      const tw = ctx.measureText(badgeText).width;
      const bW = tw + 24 * scale;
      const bH = 24 * scale;
      const bX = 165 * scale - bW / 2;
      const bY = 390 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(bX, bY, bW, bH, 12 * scale);
      } else {
        ctx.rect(bX, bY, bW, bH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffd000'; // Yellow text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, 165 * scale, bY + 13 * scale);

      // 4. Fill the blank space in the middle stub with stacked 'BUILD', 'SHIP', 'REPEAT' buttons & beach hut scenery
      // Vertical stacked banners (left-middle of left stub)
      const tabX = 50 * scale;
      ctx.font = `bold ${Math.round(8 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 'BUILD' Tab (Green)
      ctx.fillStyle = '#006c35';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(tabX, 445 * scale, 65 * scale, 20 * scale, 4 * scale);
      } else {
        ctx.rect(tabX, 445 * scale, 65 * scale, 20 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText('BUILD', tabX + 32.5 * scale, 455 * scale);

      // 'SHIP' Tab (Pink)
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(tabX, 475 * scale, 65 * scale, 20 * scale, 4 * scale);
      } else {
        ctx.rect(tabX, 475 * scale, 65 * scale, 20 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SHIP', tabX + 32.5 * scale, 485 * scale);

      // 'REPEAT' Tab (Yellow)
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(tabX, 505 * scale, 65 * scale, 20 * scale, 4 * scale);
      } else {
        ctx.rect(tabX, 505 * scale, 65 * scale, 20 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#006c35';
      ctx.fillText('REPEAT', tabX + 32.5 * scale, 515 * scale);

      // Beach Hut Scenery (right-middle of left stub)
      ctx.fillStyle = 'rgba(0, 108, 53, 0.04)';
      ctx.beginPath();
      ctx.ellipse(220 * scale, 510 * scale, 55 * scale, 15 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Beach Hut
      PreviewRenderer.drawBeachHut(ctx, 185 * scale, 460 * scale, 1.25 * scale);

      // Palm Tree behind Beach Hut
      PreviewRenderer.drawPalmTree(ctx, 255 * scale, 510 * scale, 85 * scale, scale, '#006c35');

      // 5. Draw Hacker House Slogan centered underneath the scenery
      ctx.fillStyle = '#006c35';
      ctx.font = `italic bold ${Math.round(13 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('LESS NOISE. MORE SIGNAL.', 165 * scale, 570 * scale);

      // 6. Bottom Palm Tree and Credentials footer
      PreviewRenderer.drawPalmTree(ctx, 40 * scale, height - 55 * scale, 75 * scale, scale, '#006c35');
      ctx.fillStyle = 'rgba(0, 108, 53, 0.08)';
      ctx.beginPath();
      ctx.ellipse(80 * scale, height - 55 * scale, 60 * scale, 12 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(9 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('STATION: GOA_SAND', 145 * scale, height - 70 * scale);
      ctx.fillText('DATE: 28-31 OCT, 2026', 145 * scale, height - 52 * scale);

      // 7. Draw vertical meta banner along the left side
      ctx.save();
      ctx.translate(25 * scale, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = 'rgba(0, 108, 53, 0.4)';
      ctx.font = `500 ${Math.round(9 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('28 - 31 OCT 2026 // BUILDER PASS', 0, 0);
      ctx.restore();

      // Perforated stub (right side layout): Event flight information
      const stubX = 350 * scale;
      
      // Section titles
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(9 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('PASSENGER', stubX, 80 * scale);
      ctx.fillText('FLIGHT ID', stubX, 140 * scale);
      ctx.fillText('GATE', stubX, 200 * scale);
      ctx.fillText('SEAT CLASS', stubX, 260 * scale);

      // Section data values
      ctx.fillStyle = '#1e293b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      
      const splitName = (data.name || 'YOUR NAME').trim().toUpperCase();
      let passengerFont = 11;
      ctx.font = `bold ${Math.round(passengerFont * scale)}px "Fira Code", monospace`;
      while (ctx.measureText(splitName).width > 120 * scale && passengerFont > 8) {
        passengerFont -= 1;
        ctx.font = `bold ${Math.round(passengerFont * scale)}px "Fira Code", monospace`;
      }
      ctx.fillText(splitName, stubX, 100 * scale);
      
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.fillText('HH-2026', stubX, 160 * scale);
      ctx.fillText('GOA_SAND', stubX, 220 * scale);
      
      const splitTitle = (data.title || 'BUILDER').trim().toUpperCase();
      let titleFont = 11;
      ctx.font = `bold ${Math.round(titleFont * scale)}px "Fira Code", monospace`;
      while (ctx.measureText(splitTitle).width > 120 * scale && titleFont > 8) {
        titleFont -= 1;
        ctx.font = `bold ${Math.round(titleFont * scale)}px "Fira Code", monospace`;
      }
      ctx.fillText(splitTitle, stubX, 280 * scale);

      // Mock QR code inside the right stub
      const qrSize = 105 * scale;
      const qrX = stubX;
      const qrY = 330 * scale;
      PreviewRenderer.drawQRCode(ctx, qrX, qrY, qrSize, '#006c35');

      // Barcode on the right stub footer
      const barcodeX = stubX;
      const barcodeY = height - 100 * scale;
      const barcodeH = 35 * scale;
      
      ctx.fillStyle = '#006c35';
      let currentX = barcodeX;
      const linePattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2];
      for (let i = 0; i < linePattern.length; i++) {
        const w = linePattern[i] * scale;
        ctx.fillRect(currentX, barcodeY, w, barcodeH);
        currentX += w + 2 * scale;
      }

      // Draw pink ID_BUILDER tag under barcode
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(8 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('ID_BUILDER', stubX + (qrSize / 2), barcodeY + barcodeH + 15 * scale);
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
