import type { BuilderTemplate } from './BuilderTemplate';
import { PreviewRenderer } from '../../canvas/PreviewRenderer';

// Helper to draw a barcode dynamically on the canvas
const drawBarcode = (ctx: CanvasRenderingContext2D, x: number, y: number, height: number, scale: number, color: string) => {
  ctx.save();
  ctx.fillStyle = color;
  let currX = x;
  const pattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2];
  for (let i = 0; i < pattern.length; i++) {
    const w = pattern[i] * scale;
    ctx.fillRect(currX, y, w, height);
    currX += w + 2 * scale;
  }
  ctx.restore();
};

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

      // Draw the high-fidelity professional card template illustration
      const bgImg = PreviewRenderer.getCachedImage('/card-bg.png');
      if (bgImg) {
        ctx.drawImage(bgImg, 0, 0, width, height);
      } else {
        // Fallback to solid cream color if reference image not found
        ctx.fillStyle = '#fdfcf7';
        ctx.fillRect(0, 0, width, height);
      }
    },
    renderOverlay(ctx, config, data) {
      const { width, scale } = config;
      const cx = width / 2;

      // 1. Draw elegant outer framing around portrait to fit custom uploaded photos cleanly
      const pcy = 285 * scale;
      const prad = 80 * scale;
      PreviewRenderer.drawScallopedBorder(ctx, cx, pcy, prad, scale);

      // Red inner teeth ring
      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(cx, pcy, prad - 4 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Clear out the original name/role block and overlay the new user name card
      // Cover namebox Y=380px to Y=455px
      ctx.fillStyle = '#fdfcf7';
      ctx.fillRect(100 * scale, 375 * scale, 300 * scale, 80 * scale);

      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      const roleText = (data?.role || 'BUILDER').trim().toUpperCase();

      // Green name badge pill card with double border
      ctx.fillStyle = '#004d26';
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 3 * scale;

      const nameW = Math.max(ctx.measureText(nameText).width, 180 * scale) + 40 * scale;
      const bH = 34 * scale;
      const bY = 385 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - nameW / 2, bY, nameW, bH, 6 * scale);
      } else {
        ctx.rect(cx - nameW / 2, bY, nameW, bH);
      }
      ctx.fill();
      ctx.stroke();

      // Render name
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(18 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(nameText, cx, bY + bH / 2);

      // Role Pill Badge underneath name card
      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(8.5 * scale)}px "Fira Code", monospace`;
      const roleW = ctx.measureText(`⚡ ${roleText} ⚡`).width + 24 * scale;
      const rH = 18 * scale;
      const rY = 423 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - roleW / 2, rY, roleW, rH, 99);
      } else {
        ctx.rect(cx - roleW / 2, rY, roleW, rH);
      }
      ctx.fill();

      ctx.fillStyle = '#ff007f';
      ctx.fillText(`⚡ ${roleText} ⚡`, cx, rY + rH / 2);

      // 3. Clean and redraw bottom columns to cover original placeholder data (BOLDER & LARGER)
      const colY = 490 * scale;
      const colWidth = width / 3;

      // Clear the three columns area
      ctx.fillStyle = '#fdfcf7';
      ctx.fillRect(20 * scale, colY - 5 * scale, width - 40 * scale, 240 * scale);

      // Draw grid vertical separator lines
      ctx.strokeStyle = 'rgba(0, 77, 38, 0.15)';
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      ctx.moveTo(165 * scale, colY - 5 * scale);
      ctx.lineTo(165 * scale, colY + 235 * scale);
      ctx.moveTo(330 * scale, colY - 5 * scale);
      ctx.lineTo(330 * scale, colY + 235 * scale);
      ctx.stroke();

      // --- Column 1: BUILDER CLASS ---
      const col1X = colWidth / 2;
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ BUILDER CLASS ✦', col1X, colY + 15 * scale);
      
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(16 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.fillText((data?.title || 'BUILDER').toUpperCase(), col1X, colY + 38 * scale);

      // Green QR code with mini palm tree inside
      PreviewRenderer.drawQRCode(ctx, col1X - 38 * scale, colY + 52 * scale, 76 * scale, '#004d26');
      PreviewRenderer.drawPalmTree(ctx, col1X, colY + 112 * scale, 18 * scale, scale, '#ffd000');

      // --- Column 2: BEACH BAG ---
      const col2X = colWidth + colWidth / 2;
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ BEACH BAG ✦', col2X, colY + 15 * scale);

      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      
      // Item 1: Coconut
      PreviewRenderer.drawPalmTree(ctx, col2X - 45 * scale, colY + 40 * scale, 10 * scale, scale, '#00a359');
      ctx.fillText('COCONUT', col2X - 25 * scale, colY + 43 * scale);

      // Item 2: VS Code
      ctx.fillStyle = '#ff007f';
      ctx.fillText('< />', col2X - 45 * scale, colY + 68 * scale);
      ctx.fillStyle = '#004d26';
      ctx.fillText('VS CODE', col2X - 25 * scale, colY + 68 * scale);

      // Item 3: Lo-Fi Beats
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(col2X - 35 * scale, colY + 92 * scale, 5 * scale, Math.PI, 0);
      ctx.stroke();
      ctx.fillStyle = '#004d26';
      ctx.fillText('LO-FI BEATS', col2X - 25 * scale, colY + 95 * scale);

      // Sunset Ocean wave at the bottom
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      ctx.arc(col2X, colY + 185 * scale, 22 * scale, Math.PI, 0);
      ctx.fill();
      
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      ctx.moveTo(col2X - 45 * scale, colY + 188 * scale);
      ctx.lineTo(col2X + 45 * scale, colY + 188 * scale);
      ctx.moveTo(col2X - 30 * scale, colY + 193 * scale);
      ctx.lineTo(col2X + 30 * scale, colY + 193 * scale);
      ctx.stroke();

      // --- Column 3: CURRENTLY SHIPPING ---
      const col3X = colWidth * 2 + colWidth / 2;
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('✦ CURRENTLY SHIPPING ✦', col3X, colY + 15 * scale);

      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(13 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.fillText('BUILDING THE FUTURE', col3X, colY + 36 * scale);

      // Barcode (larger)
      drawBarcode(ctx, col3X - 40 * scale, colY + 52 * scale, 35 * scale, scale, '#004d26');

      ctx.fillStyle = '#004d26';
      ctx.font = `${Math.round(9 * scale)}px "Fira Code", monospace`;
      ctx.fillText('BUILDER ID', col3X, colY + 104 * scale);
      ctx.fillText('#HH-GOA-7757', col3X, colY + 116 * scale);
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
      
      // Deep dark cyber background
      ctx.fillStyle = '#020604';
      ctx.fillRect(0, 0, width, height);

      // Tech Grid overlay
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1.5 * scale;
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

      // Border frames with neon tick lines
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3 * scale;
      ctx.strokeRect(12 * scale, 12 * scale, width - 24 * scale, height - 24 * scale);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;

      // 1. Rarity Indicator (Bolder & Larger text)
      const rarity = getRarityProfile(data?.name || 'YOUR NAME');
      ctx.fillStyle = rarity.bg;
      ctx.strokeStyle = rarity.color;
      ctx.lineWidth = 1.5 * scale;
      
      const rarW = 140 * scale;
      const rarH = 30 * scale;
      const rarY = 32 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - rarW / 2, rarY, rarW, rarH, 4 * scale);
      } else {
        ctx.rect(cx - rarW / 2, rarY, rarW, rarH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = rarity.color;
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${rarity.label} // ${'★'.repeat(rarity.stars)}`, cx, rarY + rarH / 2);

      // 2. Header Title: SYS_ACTIVE // HH_GOA_2026
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(22 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('SYS_ACTIVE // HH_GOA_2026', cx, 95 * scale);

      // 3. User Name & Credentials (bold name card)
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      const roleText = (data?.role || 'BUILDER').trim().toUpperCase();

      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(24 * scale)}px "Fira Code", monospace`;
      const nameW = ctx.measureText(nameText).width + 30 * scale;
      const bH = 36 * scale;
      const bY = 390 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - nameW / 2, bY, nameW, bH, 4 * scale);
      } else {
        ctx.rect(cx - nameW / 2, bY, nameW, bH);
      }
      ctx.fill();

      ctx.fillStyle = '#020504';
      ctx.fillText(nameText, cx, bY + bH / 2);

      // User role/stack
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.fillText(`ROLE: ${roleText}`, cx, 445 * scale);

      // 4. Tech Stats & Columns Footer (BOLDER & LARGER)
      const footerY = 510 * scale;
      const colWidth = width / 3;

      // Divider lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(colWidth, footerY + 10 * scale);
      ctx.lineTo(colWidth, height - 70 * scale);
      ctx.moveTo(colWidth * 2, footerY + 10 * scale);
      ctx.lineTo(colWidth * 2, height - 70 * scale);
      ctx.stroke();

      // --- Column 1: TARGET CONFIG ---
      const col1X = colWidth / 2;
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('// REGISTRY', col1X, footerY + 15 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(15 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText((data?.title || 'BUILDER').toUpperCase(), col1X, footerY + 38 * scale);

      // QR Code (larger neon green)
      PreviewRenderer.drawQRCode(ctx, col1X - 38 * scale, footerY + 52 * scale, 76 * scale, '#10b981');

      // --- Column 2: PARAMETERS ---
      const col2X = colWidth + colWidth / 2;
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('// SYSTEMS', col2X, footerY + 15 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.fillText('COCONUT: ENABLED', col2X, footerY + 40 * scale);
      ctx.fillText('STATION: GOA_SAND', col2X, footerY + 68 * scale);
      ctx.fillText('IP: 192.168.26.1', col2X, footerY + 96 * scale);

      // --- Column 3: SHIPPING STATS ---
      const col3X = colWidth * 2 + colWidth / 2;
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('// CRATE_STATUS', col3X, footerY + 15 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('BUILDING THE FUTURE', col3X, footerY + 36 * scale);

      // Barcode
      drawBarcode(ctx, col3X - 40 * scale, footerY + 52 * scale, 35 * scale, scale, '#10b981');

      // Credentials ID (larger)
      ctx.fillStyle = '#10b981';
      ctx.font = `${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('SYS_SECURED // #HH-7757', col3X, footerY + 108 * scale);

      // 5. Tech Terminal footer
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

      // Draw elegant deep navy/sunset ocean blue backdrop
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0a192f');
      grad.addColorStop(0.5, '#172a45');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle wave vector outlines in background
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const yOffset = 300 * scale + i * 40 * scale;
        ctx.moveTo(0, yOffset);
        ctx.bezierCurveTo(125 * scale, yOffset - 30 * scale, 375 * scale, yOffset + 30 * scale, width, yOffset);
        ctx.stroke();
      }

      // Elegant gold outer accent frame
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5 * scale;
      ctx.strokeRect(15 * scale, 15 * scale, width - 30 * scale, height - 30 * scale);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;

      // 1. Header Title: HACKER HOUSE GOA (Editorial serif style)
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(28 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.fillText('HACKER HOUSE GOA', cx, 75 * scale);

      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('SHIP FROM PARADISE  •  28-31 OCT 2026', cx, 100 * scale);

      // 2. User Name & Role (bold and readable)
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      const roleText = (data?.role || 'BUILDER').trim().toUpperCase();

      ctx.fillStyle = '#f59e0b'; // Gold name badge
      ctx.font = `bold ${Math.round(22 * scale)}px "Space Grotesk", sans-serif`;
      const nameW = ctx.measureText(nameText).width + 30 * scale;
      const bH = 34 * scale;
      const bY = 385 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - nameW / 2, bY, nameW, bH, 4 * scale);
      } else {
        ctx.rect(cx - nameW / 2, bY, nameW, bH);
      }
      ctx.fill();

      ctx.fillStyle = '#0a192f';
      ctx.fillText(nameText, cx, bY + bH / 2);

      // User role/stack
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText(roleText, cx, 442 * scale);

      // 3. Information Cards & Columns (BOLDER & LARGER)
      const footerY = 510 * scale;
      const colWidth = width / 3;

      // Divider lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(colWidth, footerY + 10 * scale);
      ctx.lineTo(colWidth, height - 70 * scale);
      ctx.moveTo(colWidth * 2, footerY + 10 * scale);
      ctx.lineTo(colWidth * 2, height - 70 * scale);
      ctx.stroke();

      // --- Column 1: CLASS ---
      const col1X = colWidth / 2;
      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ CLASS ✦', col1X, footerY + 15 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(16 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.fillText((data?.title || 'BUILDER').toUpperCase(), col1X, footerY + 38 * scale);

      // QR Code (larger white)
      PreviewRenderer.drawQRCode(ctx, col1X - 38 * scale, footerY + 52 * scale, 76 * scale, '#ffffff');

      // --- Column 2: COORDINATES ---
      const col2X = colWidth + colWidth / 2;
      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ LOCATION ✦', col2X, footerY + 15 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(11.5 * scale)}px "Fira Code", monospace`;
      ctx.fillText('LAT: 15.2993° N', col2X, footerY + 42 * scale);
      ctx.fillText('LON: 74.1240° E', col2X, footerY + 70 * scale);
      ctx.fillText('ALT: 0M SEA LEVEL', col2X, footerY + 98 * scale);

      // --- Column 3: SHIPPING ---
      const col3X = colWidth * 2 + colWidth / 2;
      ctx.fillStyle = '#f59e0b';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ STATUS ✦', col3X, footerY + 15 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(13 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('BUILDING THE FUTURE', col3X, footerY + 36 * scale);

      // Barcode
      drawBarcode(ctx, col3X - 40 * scale, footerY + 52 * scale, 35 * scale, scale, '#ffffff');

      // Credentials ID (larger)
      ctx.fillStyle = '#f59e0b';
      ctx.font = `${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('BUILD_ID: #HH-7757', col3X, footerY + 108 * scale);

      // 4. Elegant tag footer
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(25 * scale, height - 52 * scale, width - 50 * scale, 28 * scale);

      ctx.fillStyle = '#0a192f';
      ctx.font = `bold ${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('#FRAMEINGOA', cx, height - 38 * scale);
    },
  },
];
