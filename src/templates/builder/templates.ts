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
      text: '#ffffff', // White name text to stand out in the green ticket banner box!
      badgeBg: 'rgba(255, 255, 255, 0.2)',
      badgeText: '#ffd000',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Draw cream card base background
      ctx.fillStyle = '#f4f1ea';
      ctx.fillRect(0, 0, width, height);

      // Perforated tear-off stub divider line (dotted) at x = 330 * scale
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

      // Draw beach coconut palm trees in the bottom-left stub
      PreviewRenderer.drawPalmTree(ctx, 40 * scale, height - 60 * scale, 75 * scale, scale, '#006c35');
      
      // Draw retro beach hut scenery in the bottom-left stub
      PreviewRenderer.drawBeachHut(ctx, 80 * scale, height - 105 * scale, scale);

      // Outer thin ticket border
      ctx.strokeStyle = '#006c35';
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(10 * scale, 10 * scale, width - 20 * scale, height - 20 * scale);
    },
    renderOverlay(ctx, config, data) {
      const { height, scale } = config;

      // 1. Draw top brand logo header inside the left section
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(15 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE GOA', 30 * scale, 65 * scale);

      // Draw Devanagari stamp next to header
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(13 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('गोवा', 195 * scale, 65 * scale);

      // 2. Draw golden scalloped floral border around circular photo frame
      // Center of left stub: cx = 165 * scale. cy = 230 * scale. radius = 80 * scale.
      PreviewRenderer.drawScallopedBorder(ctx, 165 * scale, 230 * scale, 80 * scale, scale);

      // 3. Draw postage stamp in the top right of the left stub
      PreviewRenderer.drawPerforatedStamp(ctx, 245 * scale, 20 * scale, 65 * scale, 85 * scale, scale, '#f4f1ea');

      // 4. Draw vertical meta banner along the left side
      ctx.save();
      ctx.translate(25 * scale, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = 'rgba(0, 108, 53, 0.4)';
      ctx.font = `500 ${Math.round(9 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('28 - 31 OCT 2026 // BUILDER PASS', 0, 0);
      ctx.restore();

      // 5. Draw dark green banner backing box for name and role
      ctx.fillStyle = '#006c35';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(30 * scale, 412 * scale, 270 * scale, 80 * scale, 6 * scale);
      } else {
        ctx.rect(30 * scale, 412 * scale, 270 * scale, 80 * scale);
      }
      ctx.fill();

      // Perforated stub (right side layout): Event flight information
      const stubX = 350 * scale;
      ctx.fillStyle = '#006c35';
      ctx.textAlign = 'left';

      // Section titles
      ctx.font = `bold ${Math.round(9 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('PASSENGER', stubX, 80 * scale);
      ctx.fillText('FLIGHT ID', stubX, 140 * scale);
      ctx.fillText('GATE ST.', stubX, 200 * scale);
      ctx.fillText('SEAT CLASS', stubX, 260 * scale);

      // Section data values
      ctx.fillStyle = '#1e293b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      
      const splitName = (data.name || 'YOUR NAME').trim().toUpperCase();
      ctx.fillText(splitName.slice(0, 12), stubX, 100 * scale);
      ctx.fillText('HH-2026', stubX, 160 * scale);
      ctx.fillText('GOA_SAND', stubX, 220 * scale);
      
      const splitTitle = (data.title || 'BUILDER').trim().toUpperCase();
      ctx.fillText(splitTitle.slice(0, 11), stubX, 280 * scale);

      // Mock QR code inside the right stub
      const qrSize = 100 * scale;
      const qrX = stubX;
      const qrY = 320 * scale;
      PreviewRenderer.drawQRCode(ctx, qrX, qrY, qrSize, '#006c35');

      // Barcode on the right stub footer
      const footerY = 660 * scale;
      const barcodeX = stubX;
      const barcodeY = footerY + 15 * scale;
      const barcodeH = 35 * scale;
      
      ctx.fillStyle = '#006c35';
      let currentX = barcodeX;
      const linePattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2];
      for (let i = 0; i < linePattern.length; i++) {
        const w = linePattern[i] * scale;
        ctx.fillRect(currentX, barcodeY, w, barcodeH);
        currentX += w + 2 * scale;
      }

      // Draw postmark stamp "GOA 2026" inside the left stub
      PreviewRenderer.drawPostmarkStamp(ctx, 275 * scale, 360 * scale, 28 * scale, 'GOA 2026', '#006c35', scale);
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
