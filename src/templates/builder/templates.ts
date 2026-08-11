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
      const { width, height, scale } = config;

      // Draw cream card base background
      ctx.fillStyle = '#fdfcf7';
      ctx.fillRect(0, 0, width, height);

      // Draw thin double dark-green border frame around card edge (bolder)
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(10 * scale, 10 * scale, width - 20 * scale, height - 20 * scale);
      
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(14 * scale, 14 * scale, width - 28 * scale, height - 28 * scale);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;

      // 1. Draw top brand ticket slot badge
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(190 * scale, 10 * scale, 120 * scale, 35 * scale, [0, 0, 8 * scale, 8 * scale]);
      } else {
        ctx.rect(190 * scale, 10 * scale, 120 * scale, 35 * scale);
      }
      ctx.fill();

      // Top stamp palm tree icon
      PreviewRenderer.drawPalmTree(ctx, 250 * scale, 22 * scale, 12 * scale, scale, '#ffd000');
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(9 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('HH GOA 2026', 250 * scale, 36 * scale);

      // 2. Draw Main Title: HACKER गोवा HOUSE (bolder text)
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(30 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'right';
      ctx.fillText('HACKER', 205 * scale, 85 * scale);

      ctx.textAlign = 'left';
      ctx.fillText('HOUSE', 295 * scale, 85 * scale);

      // Draw middle 'गोवा' text block with a pink background and yellow outline
      ctx.save();
      ctx.translate(250 * scale, 80 * scale);
      ctx.rotate(-8 * Math.PI / 180);
      
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-26 * scale, -16 * scale, 52 * scale, 28 * scale, 4 * scale);
      } else {
        ctx.rect(-26 * scale, -16 * scale, 52 * scale, 28 * scale);
      }
      ctx.fill();

      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-24 * scale, -14 * scale, 48 * scale, 24 * scale, 3 * scale);
      } else {
        ctx.rect(-24 * scale, -14 * scale, 48 * scale, 24 * scale);
      }
      ctx.fill();

      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(15 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('गोवा', 0, 0);
      ctx.restore();

      // 3. Draw Vintage Postage Stamp (top left)
      PreviewRenderer.drawPerforatedStamp(ctx, 25 * scale, 32 * scale, 70 * scale, 85 * scale, scale, '#004d26');

      // 4. Draw Circular Postmark Stamp (top right)
      PreviewRenderer.drawPostmarkStamp(ctx, 420 * scale, 75 * scale, 45 * scale, 'GOA 2026', '#004d26', scale);

      // 5. Left Stub Illustration: Wooden Signpost & Leaning Surfboards (Clean & Professional)
      const postX = 65 * scale;
      const postY = 320 * scale;

      // Draw thick wooden signpost
      ctx.fillStyle = '#8b5a2b'; // Dark brown
      ctx.fillRect(postX - 3 * scale, postY, 6 * scale, 170 * scale);

      // Draw signposts arrows (Build, Ship, Repeat)
      const drawSignArrow = (arrowY: number, arrowText: string, color: string, isLeft: boolean) => {
        ctx.save();
        ctx.translate(postX, arrowY);
        ctx.fillStyle = color;
        ctx.beginPath();
        if (isLeft) {
          ctx.moveTo(-35 * scale, 0);
          ctx.lineTo(-20 * scale, -10 * scale);
          ctx.lineTo(15 * scale, -10 * scale);
          ctx.lineTo(15 * scale, 10 * scale);
          ctx.lineTo(-20 * scale, 10 * scale);
        } else {
          ctx.moveTo(35 * scale, 0);
          ctx.lineTo(20 * scale, -10 * scale);
          ctx.lineTo(-15 * scale, -10 * scale);
          ctx.lineTo(-15 * scale, 10 * scale);
          ctx.lineTo(20 * scale, 10 * scale);
        }
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.round(9 * scale)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(arrowText, isLeft ? -10 * scale : 10 * scale, 0);
        ctx.restore();
      };

      drawSignArrow(postY + 30 * scale, 'BUILD', '#ffd000', false);
      drawSignArrow(postY + 65 * scale, 'SHIP', '#ff007f', true);
      drawSignArrow(postY + 100 * scale, 'REPEAT', '#00a359', false);

      // Leaning surfboards next to the signpost (much more detailed)
      const drawSurfboard = (sX: number, sColor: string, stripeColor: string, rotationDeg: number) => {
        ctx.save();
        ctx.translate(sX, postY + 155 * scale);
        ctx.rotate(rotationDeg * Math.PI / 180);
        ctx.fillStyle = sColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 10 * scale, 35 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = stripeColor;
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(0, -35 * scale);
        ctx.lineTo(0, 35 * scale);
        ctx.stroke();
        ctx.restore();
      };
      drawSurfboard(postX - 25 * scale, '#ffd000', '#ff007f', -15);
      drawSurfboard(postX - 12 * scale, '#ff007f', '#004d26', -5);

      // 6. Right Stub Illustration: Beach Cottage & Scooter (Polished layout)
      const houseX = 425 * scale;
      const houseY = 380 * scale;

      // Sun reflection tag above house
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(houseX - 45 * scale, houseY - 50 * scale, 65 * scale, 18 * scale, 4 * scale);
      } else {
        ctx.rect(houseX - 45 * scale, houseY - 50 * scale, 65 * scale, 18 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText("LET'S BUILD!", houseX - 12 * scale, houseY - 38 * scale);

      // Beach house walls
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(houseX - 35 * scale, houseY - 20 * scale, 50 * scale, 40 * scale);

      // Red triangular roof
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.moveTo(houseX - 42 * scale, houseY - 20 * scale);
      ctx.lineTo(houseX - 10 * scale, houseY - 45 * scale);
      ctx.lineTo(houseX + 22 * scale, houseY - 20 * scale);
      ctx.closePath();
      ctx.fill();

      // Door and windows
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(houseX - 15 * scale, houseY + 5 * scale, 12 * scale, 15 * scale);
      ctx.fillStyle = '#004d26';
      ctx.fillRect(houseX - 28 * scale, houseY - 10 * scale, 10 * scale, 10 * scale);
      ctx.fillRect(houseX + 2 * scale, houseY - 10 * scale, 10 * scale, 10 * scale);

      // Vespa scooter silhouette next to house
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.arc(houseX + 28 * scale, houseY + 16 * scale, 6 * scale, 0, Math.PI * 2); // rear wheel
      ctx.arc(houseX + 44 * scale, houseY + 16 * scale, 6 * scale, 0, Math.PI * 2); // front wheel
      ctx.fill();

      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(houseX + 28 * scale, houseY + 16 * scale);
      ctx.lineTo(houseX + 36 * scale, houseY + 8 * scale);
      ctx.lineTo(houseX + 44 * scale, houseY + 16 * scale);
      ctx.moveTo(houseX + 36 * scale, houseY + 8 * scale);
      ctx.lineTo(houseX + 40 * scale, houseY - 2 * scale); // handlebars
      ctx.stroke();

      // 7. Middle User Info Name Badge under Portrait
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      const roleText = (data?.role || 'BUILDER').trim().toUpperCase();

      ctx.fillStyle = '#004d26'; // Dark green pill background
      ctx.font = `bold ${Math.round(20 * scale)}px "Space Grotesk", sans-serif`;
      const nameWidth = ctx.measureText(nameText).width + 30 * scale;
      const bH = 34 * scale;
      const bY = 385 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - nameWidth / 2, bY, nameWidth, bH, 6 * scale);
      } else {
        ctx.rect(cx - nameWidth / 2, bY, nameWidth, bH);
      }
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(nameText, cx, bY + bH / 2);

      // Subtitle Role badge
      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      const roleWidth = ctx.measureText(`⚡ ${roleText} ⚡`).width + 20 * scale;
      const rH = 22 * scale;
      const rY = 428 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - roleWidth / 2, rY, roleWidth, rH, 4 * scale);
      } else {
        ctx.rect(cx - roleWidth / 2, rY, roleWidth, rH);
      }
      ctx.fill();

      ctx.fillStyle = '#004d26';
      ctx.fillText(`⚡ ${roleText} ⚡`, cx, rY + rH / 2);

      // 8. Bottom Information Cards (3-Column Layout: BOLDER & LARGER TEXT)
      const footerY = 510 * scale;
      const colWidth = width / 3;

      // Divider lines
      ctx.strokeStyle = 'rgba(0, 77, 38, 0.1)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(colWidth, footerY + 10 * scale);
      ctx.lineTo(colWidth, height - 70 * scale);
      ctx.moveTo(colWidth * 2, footerY + 10 * scale);
      ctx.lineTo(colWidth * 2, height - 70 * scale);
      ctx.stroke();

      // --- Column 1: BUILDER CLASS ---
      const col1X = colWidth / 2;
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('✦ BUILDER CLASS ✦', col1X, footerY + 15 * scale);

      // Title
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(18 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.fillText((data?.title || 'BUILDER').toUpperCase(), col1X, footerY + 38 * scale);

      // QR Code (larger and bold green)
      PreviewRenderer.drawQRCode(ctx, col1X - 38 * scale, footerY + 52 * scale, 76 * scale, '#004d26');

      // --- Column 2: BEACH BAG ---
      const col2X = colWidth + colWidth / 2;
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ BEACH BAG ✦', col2X, footerY + 15 * scale);

      // Draw custom icons and list items
      const drawListItem = (itemY: number, label: string, iconColor: string) => {
        // Mini palm stamp as list bullet
        PreviewRenderer.drawPalmTree(ctx, col2X - 45 * scale, itemY, 8 * scale, scale, iconColor);
        ctx.fillStyle = '#004d26';
        ctx.font = `bold ${Math.round(11.5 * scale)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(label, col2X - 30 * scale, itemY);
      };

      drawListItem(footerY + 40 * scale, 'COCONUT', '#00a359');
      drawListItem(footerY + 64 * scale, 'VS CODE', '#ff007f');
      drawListItem(footerY + 88 * scale, 'LO-FI BEATS', '#ffd000');

      // Wave outline below list
      ctx.strokeStyle = '#00a359';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(col2X, footerY + 125 * scale, 12 * scale, Math.PI, 0);
      ctx.stroke();

      // --- Column 3: CURRENTLY SHIPPING ---
      const col3X = colWidth * 2 + colWidth / 2;
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('✦ CURRENTLY SHIPPING ✦', col3X, footerY + 15 * scale);

      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(13 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.fillText('BUILDING THE FUTURE', col3X, footerY + 36 * scale);

      // Barcode (larger and bold green)
      drawBarcode(ctx, col3X - 40 * scale, footerY + 52 * scale, 35 * scale, scale, '#004d26');

      // Credentials ID (larger)
      ctx.fillStyle = '#004d26';
      ctx.font = `${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.fillText('BUILDER ID: #HH-GOA-7757', col3X, footerY + 108 * scale);

      // 9. Bottom Pink Footer Banner (#FRAMEINGOA)
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(25 * scale, height - 52 * scale, width - 50 * scale, 28 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('#FRAMEINGOA', cx, height - 38 * scale);
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
      ctx.fillStyle = '#020504';
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
