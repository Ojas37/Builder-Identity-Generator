import type { BuilderTemplate } from './BuilderTemplate';
import { PreviewRenderer } from '../../canvas/PreviewRenderer';
import bgImageUrl from '../../assets/Bg.png';

// Pre-load the card background into the cache as soon as this module is imported
// so it's always available synchronously when renderBackground runs.
PreviewRenderer.preloadImage(bgImageUrl);

// Helper to deterministically calculate a rarity profile based on name string
const getRarityProfile = (name: string) => {
  const normalized = (name || 'YOUR NAME').trim().toUpperCase();
  let score = 0;
  for (let i = 0; i < normalized.length; i++) {
    score += normalized.charCodeAt(i);
  }
  const levels = [
    { label: 'LEGENDARY', stars: 5, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
    { label: 'EPIC', stars: 4, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)' },
    { label: 'RARE', stars: 3, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
    { label: 'UNCOMMON', stars: 2, color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
    { label: 'COMMON', stars: 1, color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.15)' },
  ];
  return levels[score % levels.length];
};

// Helper to draw a barcode dynamically on the canvas
const drawBarcode = (ctx: CanvasRenderingContext2D, x: number, y: number, h: number, scale: number, color: string) => {
  ctx.save();
  ctx.fillStyle = color;
  let currX = x;
  const pattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2];
  for (let i = 0; i < pattern.length; i++) {
    const w = pattern[i] * scale;
    ctx.fillRect(currX, y, w, h);
    currX += w + 2 * scale;
  }
  ctx.restore();
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
      const { width, height } = config;
      // Draw the high-fidelity professional card template illustration (Bg.png)
      const bgImg = PreviewRenderer.getCachedImage(bgImageUrl);
      if (bgImg) {
        ctx.drawImage(bgImg, 0, 0, width, height);
      } else {
        // Kick off a background preload for the next render cycle
        PreviewRenderer.preloadImage(bgImageUrl);
        ctx.fillStyle = '#fdfcf7';
        ctx.fillRect(0, 0, width, height);
      }
    },
    renderOverlay(ctx, config, data) {
      const { scale } = config;

      // Bg.png is 1024x1536 → rendered at 500x750.
      // All coordinates below are in the 500x750 base canvas space.
      // Card background warm beige color:
      const warmBeige = '#f5e6d4';

      // ── NAME BOX ──────────────────────────────────────────────────
      // Box interior in 500×750: x ≈ 49–439 (center 244), y ≈ 409–522
      const nameBoxCX = 244 * scale;
      const nameBoxW  = 380 * scale; // Full inner width of Name box
      const nameBoxCY = 485 * scale; // Positioned lower to reduce gap and balance space

      // Draw the user's name directly in the box
      const nameText = (data?.name || '').trim().toUpperCase();
      if (nameText) {
        ctx.fillStyle = '#004d26';
        ctx.font = `bold ${Math.round(18 * scale)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nameText, nameBoxCX, nameBoxCY, nameBoxW - 20 * scale);
      }

      // ── ROLE BOX ──────────────────────────────────────────────────
      // Box interior in 500×750: x ≈ 53–439 (center 246), y ≈ 523–634
      const roleBoxCX = 246 * scale;
      const roleBoxW  = 380 * scale; // Full inner width of Role box
      const roleBoxCY = 535 * scale; // Positioned higher to reduce gap and balance space

      // Draw the user's role directly in the box
      const roleText = (data?.role || '').trim().toUpperCase();
      if (roleText) {
        ctx.fillStyle = '#004d26';
        ctx.font = `bold ${Math.round(18 * scale)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(roleText, roleBoxCX, roleBoxCY, roleBoxW - 20 * scale);
      }

      // ── BUILDER TITLE (column 1, bottom section) ───────────────────
      // "TERMINAL WIZARD" sits at approximately y=625–670 in 500×750.
      const titleText   = (data?.title || 'BUILDER').trim().toUpperCase();
      const col1CX      = 83 * scale;
      const titleAreaX  = 16 * scale;
      const titleAreaY  = 622 * scale;
      const titleAreaW  = 150 * scale;
      const titleAreaH  = 50 * scale;

      // Erase the baked-in title text using the exact card background color
      ctx.fillStyle = warmBeige;
      ctx.fillRect(titleAreaX, titleAreaY, titleAreaW, titleAreaH);

      // Draw user's title (split on spaces, max 2 lines)
      const titleLines = titleText.split(' ');
      ctx.fillStyle = '#cc0055';
      ctx.font = `bold ${Math.round(14 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (titleLines.length === 1) {
        ctx.fillText(titleLines[0], col1CX, titleAreaY + titleAreaH / 2);
      } else {
        const half = Math.ceil(titleLines.length / 2);
        const line1 = titleLines.slice(0, half).join(' ');
        const line2 = titleLines.slice(half).join(' ');
        ctx.fillText(line1, col1CX, titleAreaY + titleAreaH * 0.32);
        ctx.fillText(line2, col1CX, titleAreaY + titleAreaH * 0.68);
      }
    },
  },
  {
    id: 'rarity-badge',
    name: 'Cyber Pass',
    description: 'Technical dark grid overlay, neon target reticles, rarity indicators, and verification stats.',
    previewColor: '#09100d',
    colors: {
      backgroundStart: '#09100d',
      backgroundEnd: '#020504',
      primary: '#10b981',
      secondary: '#047857',
      accent: '#10b981',
      text: '#ffffff',
      badgeBg: '#10b981',
      badgeText: '#020504',
    },
    typography: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;
      ctx.fillStyle = '#020604';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1.5 * scale;
      const gridSize = 40 * scale;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3 * scale;
      ctx.strokeRect(12 * scale, 12 * scale, width - 24 * scale, height - 24 * scale);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const rarity = getRarityProfile(data?.name || 'YOUR NAME');

      ctx.fillStyle = rarity.bg;
      ctx.strokeStyle = rarity.color;
      ctx.lineWidth = 1.5 * scale;
      const rarW = 140 * scale, rarH = 30 * scale, rarY = 32 * scale;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - rarW / 2, rarY, rarW, rarH, 4 * scale);
      } else {
        ctx.rect(cx - rarW / 2, rarY, rarW, rarH);
      }
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = rarity.color;
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(`${rarity.label} // ${'★'.repeat(rarity.stars)}`, cx, rarY + rarH / 2);

      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(22 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('SYS_ACTIVE // HH_GOA_2026', cx, 95 * scale);

      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      const roleText = (data?.role || 'BUILDER').trim().toUpperCase();

      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(24 * scale)}px "Fira Code", monospace`;
      const nameW = ctx.measureText(nameText).width + 30 * scale;
      const bH = 36 * scale, bY = 390 * scale;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - nameW / 2, bY, nameW, bH, 4 * scale);
      } else {
        ctx.rect(cx - nameW / 2, bY, nameW, bH);
      }
      ctx.fill();
      ctx.fillStyle = '#020504';
      ctx.fillText(nameText, cx, bY + bH / 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.fillText(`ROLE: ${roleText}`, cx, 445 * scale);

      const footerY = 510 * scale, colWidth = width / 3;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(colWidth, footerY + 10 * scale); ctx.lineTo(colWidth, height - 70 * scale);
      ctx.moveTo(colWidth * 2, footerY + 10 * scale); ctx.lineTo(colWidth * 2, height - 70 * scale);
      ctx.stroke();

      const col1X = colWidth / 2;
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('// REGISTRY', col1X, footerY + 15 * scale);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(15 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText((data?.title || 'BUILDER').toUpperCase(), col1X, footerY + 38 * scale);
      PreviewRenderer.drawQRCode(ctx, col1X - 38 * scale, footerY + 52 * scale, 76 * scale, '#10b981');

      const col2X = colWidth + colWidth / 2;
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('// SYSTEMS', col2X, footerY + 15 * scale);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.fillText('COCONUT: ENABLED', col2X, footerY + 40 * scale);
      ctx.fillText('STATION: GOA_SAND', col2X, footerY + 68 * scale);
      ctx.fillText('IP: 192.168.26.1', col2X, footerY + 96 * scale);

      const col3X = colWidth * 2 + colWidth / 2;
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('// CRATE_STATUS', col3X, footerY + 15 * scale);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('BUILDING THE FUTURE', col3X, footerY + 36 * scale);
      drawBarcode(ctx, col3X - 40 * scale, footerY + 52 * scale, 35 * scale, scale, '#10b981');
      ctx.fillStyle = '#10b981';
      ctx.font = `${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('SYS_SECURED // #HH-7757', col3X, footerY + 108 * scale);

      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.fillRect(25 * scale, height - 52 * scale, width - 50 * scale, 28 * scale);
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.fillText('SYSTEM_VERIFIED // SECURE_ACCESS_GRANTED', cx, height - 38 * scale);
    },
  },
  {
    id: 'ocean-sand',
    name: 'Sunset Waves',
    description: 'Golden hour sunset backdrop framing, clean editorial typography, and coordinates.',
    previewColor: '#0a192f',
    colors: {
      backgroundStart: '#0a192f',
      backgroundEnd: '#172a45',
      primary: '#f8fafc',
      secondary: '#38bdf8',
      accent: '#f59e0b',
      text: '#ffffff',
      badgeBg: '#f59e0b',
      badgeText: '#0a192f',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0a192f');
      grad.addColorStop(0.5, '#172a45');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const yOffset = 300 * scale + i * 40 * scale;
        ctx.moveTo(0, yOffset);
        ctx.bezierCurveTo(125 * scale, yOffset - 30 * scale, 375 * scale, yOffset + 30 * scale, width, yOffset);
        ctx.stroke();
      }

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5 * scale;
      ctx.strokeRect(15 * scale, 15 * scale, width - 30 * scale, height - 30 * scale);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(28 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.fillText('HACKER HOUSE GOA', cx, 75 * scale);

      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('SHIP FROM PARADISE  •  28-31 OCT 2026', cx, 100 * scale);

      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      const roleText = (data?.role || 'BUILDER').trim().toUpperCase();

      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(22 * scale)}px "Space Grotesk", sans-serif`;
      const nameW = ctx.measureText(nameText).width + 30 * scale;
      const bH = 34 * scale, bY = 385 * scale;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - nameW / 2, bY, nameW, bH, 4 * scale);
      } else {
        ctx.rect(cx - nameW / 2, bY, nameW, bH);
      }
      ctx.fill();
      ctx.fillStyle = '#0a192f';
      ctx.fillText(nameText, cx, bY + bH / 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText(roleText, cx, 442 * scale);

      const footerY = 510 * scale, colWidth = width / 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(colWidth, footerY + 10 * scale); ctx.lineTo(colWidth, height - 70 * scale);
      ctx.moveTo(colWidth * 2, footerY + 10 * scale); ctx.lineTo(colWidth * 2, height - 70 * scale);
      ctx.stroke();

      const col1X = colWidth / 2;
      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ CLASS ✦', col1X, footerY + 15 * scale);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(16 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.fillText((data?.title || 'BUILDER').toUpperCase(), col1X, footerY + 38 * scale);
      PreviewRenderer.drawQRCode(ctx, col1X - 38 * scale, footerY + 52 * scale, 76 * scale, '#ffffff');

      const col2X = colWidth + colWidth / 2;
      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ LOCATION ✦', col2X, footerY + 15 * scale);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(11.5 * scale)}px "Fira Code", monospace`;
      ctx.fillText('LAT: 15.2993° N', col2X, footerY + 42 * scale);
      ctx.fillText('LON: 74.1240° E', col2X, footerY + 70 * scale);
      ctx.fillText('ALT: 0M SEA LEVEL', col2X, footerY + 98 * scale);

      const col3X = colWidth * 2 + colWidth / 2;
      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ STATUS ✦', col3X, footerY + 15 * scale);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(13 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('BUILDING THE FUTURE', col3X, footerY + 36 * scale);
      drawBarcode(ctx, col3X - 40 * scale, footerY + 52 * scale, 35 * scale, scale, '#ffffff');
      ctx.fillStyle = '#f59e0b';
      ctx.font = `${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('BUILD_ID: #HH-7757', col3X, footerY + 108 * scale);

      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(25 * scale, height - 52 * scale, width - 50 * scale, 28 * scale);
      ctx.fillStyle = '#0a192f';
      ctx.font = `bold ${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('#FRAMEINGOA', cx, height - 38 * scale);
    },
  },
];
