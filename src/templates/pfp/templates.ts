import type { PFPTemplate } from './PFPTemplate';
import { PreviewRenderer } from '../../canvas/PreviewRenderer';

export const pfpTemplates: PFPTemplate[] = [
  {
    id: 'goa-postcard',
    name: 'Goa Postcard',
    description: 'Cream travel postcard badge with coconut palms, beach shacks, surfboards, stamps, and ribbons.',
    previewColor: '#fcfaf5',
    colors: {
      background: '#fcfaf5',
      primary: '#004d26',
      secondary: '#ffd000',
      accent: '#ff007f',
      text: '#004d26',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // 1. Vintage cream postcard backdrop
      ctx.fillStyle = '#fcfaf5';
      ctx.fillRect(0, 0, width, height);

      // 2. Double green border frame outline
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(15 * scale, 15 * scale, width - 30 * scale, height - 30 * scale);
      ctx.strokeRect(20 * scale, 20 * scale, width - 40 * scale, height - 40 * scale);

      // 3. Draw sand patch ellipse dunes at bottom
      ctx.fillStyle = 'rgba(0, 77, 38, 0.05)';
      ctx.beginPath();
      ctx.ellipse(width / 2, height - 30 * scale, width / 2 - 30 * scale, 40 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 - 15 * scale;
      const rad = 230 * scale; // Circular portrait frame

      // 1. Draw left side elements: wooden signpost & surfboards
      // Signpost post
      ctx.fillStyle = '#d97706';
      ctx.fillRect(60 * scale, 280 * scale, 4 * scale, 180 * scale);
      
      // BUILD Sign (Yellow)
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      ctx.moveTo(35 * scale, 330 * scale);
      ctx.lineTo(75 * scale, 330 * scale);
      ctx.lineTo(85 * scale, 340 * scale);
      ctx.lineTo(75 * scale, 350 * scale);
      ctx.lineTo(35 * scale, 350 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('BUILD', 55 * scale, 342 * scale);

      // SHIP Sign (Pink)
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.moveTo(85 * scale, 365 * scale);
      ctx.lineTo(45 * scale, 365 * scale);
      ctx.lineTo(35 * scale, 375 * scale);
      ctx.lineTo(45 * scale, 385 * scale);
      ctx.lineTo(85 * scale, 385 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SHIP', 62 * scale, 377 * scale);

      // REPEAT Sign (Green)
      ctx.fillStyle = '#00a359';
      ctx.beginPath();
      ctx.moveTo(35 * scale, 400 * scale);
      ctx.lineTo(75 * scale, 400 * scale);
      ctx.lineTo(85 * scale, 410 * scale);
      ctx.lineTo(75 * scale, 420 * scale);
      ctx.lineTo(35 * scale, 420 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText('REPEAT', 55 * scale, 412 * scale);

      // Surfboards
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      ctx.ellipse(32 * scale, 480 * scale, 12 * scale, 35 * scale, -10 * Math.PI / 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 1 * scale;
      ctx.stroke();

      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.ellipse(50 * scale, 483 * scale, 12 * scale, 32 * scale, 8 * Math.PI / 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 2. Draw right side elements: beach cottage & scooter
      const hx = width - 130 * scale;
      const hy = 340 * scale;
      // Cottage Roof
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(hx + 35 * scale, hy - 25 * scale);
      ctx.lineTo(hx + 70 * scale, hy);
      ctx.closePath();
      ctx.fill();
      // Cottage Body
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(hx + 8 * scale, hy, 54 * scale, 45 * scale);
      // Windows & Door
      ctx.fillStyle = '#004d26';
      ctx.fillRect(hx + 18 * scale, hy + 12 * scale, 10 * scale, 12 * scale);
      ctx.fillRect(hx + 42 * scale, hy + 12 * scale, 10 * scale, 12 * scale);
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(hx + 30 * scale, hy + 28 * scale, 10 * scale, 17 * scale);

      // Scooter
      const vx = hx + 52 * scale;
      const vy = hy + 45 * scale;
      ctx.fillStyle = '#004d26';
      ctx.beginPath();
      ctx.arc(vx, vy, 5 * scale, 0, Math.PI * 2);
      ctx.arc(vx + 14 * scale, vy, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(vx, vy - 8 * scale, 14 * scale, 6 * scale);

      // 3. Draw postage stamp in top left
      ctx.save();
      ctx.translate(65 * scale, 105 * scale);
      ctx.rotate(-10 * Math.PI / 180);
      ctx.fillStyle = '#004d26';
      ctx.fillRect(-27 * scale, -37 * scale, 54 * scale, 74 * scale);
      ctx.fillStyle = '#fcfaf5';
      for (let y = -34 * scale; y <= 34 * scale; y += 8 * scale) {
        ctx.beginPath();
        ctx.arc(-27 * scale, y, 3 * scale, 0, Math.PI * 2);
        ctx.arc(27 * scale, y, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#004d26';
      ctx.fillRect(-23 * scale, -33 * scale, 46 * scale, 66 * scale);
      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(6 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('GOA', 0, -22 * scale);
      ctx.fillText('INDIA', 0, 26 * scale);
      ctx.beginPath();
      ctx.arc(0, 5 * scale, 12 * scale, Math.PI, 0);
      ctx.fill();
      PreviewRenderer.drawPalmTree(ctx, 0, 8 * scale, 22 * scale, scale, '#004d26');
      ctx.restore();

      // 4. Draw circular seal in top right
      ctx.save();
      ctx.translate(width - 75 * scale, 115 * scale);
      ctx.strokeStyle = '#004d26';
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, 36 * scale, 0, Math.PI * 2);
      ctx.stroke();
      PreviewRenderer.drawCurvedText(
        ctx,
        'BUILD IN GOA ★ SHIP FROM PARADISE',
        width - 75 * scale,
        115 * scale,
        28 * scale,
        -Math.PI / 2,
        `bold ${Math.round(5.5 * scale)}px "Fira Code", monospace`,
        '#004d26',
        scale
      );
      PreviewRenderer.drawPalmTree(ctx, 0, 15 * scale, 34 * scale, scale, '#004d26');
      ctx.restore();

      // 5. Draw gold scalloped portrait frame
      PreviewRenderer.drawScallopedBorder(ctx, cx, cy, rad, scale);

      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 8 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad - 6 * scale, 0, Math.PI * 2);
      ctx.stroke();
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 - 15 * scale;
      const rad = 230 * scale;

      // 1. Main Title: HACKER गोवा HOUSE
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(32 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER', cx - 25 * scale, 130 * scale);
      ctx.textAlign = 'left';
      ctx.fillText('HOUSE', cx + 45 * scale, 130 * scale);

      // Pink Devanagari stamp
      ctx.save();
      ctx.translate(cx, 126 * scale);
      ctx.rotate(-8 * Math.PI / 180);
      ctx.fillStyle = '#ffd000';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-24 * scale, -15 * scale, 48 * scale, 28 * scale, 4 * scale);
      } else {
        ctx.rect(-24 * scale, -15 * scale, 48 * scale, 28 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-22 * scale, -13 * scale, 44 * scale, 24 * scale, 3 * scale);
      } else {
        ctx.rect(-22 * scale, -13 * scale, 44 * scale, 24 * scale);
      }
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(13 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('गोवा', 0, 0);
      ctx.restore();

      // 2. Curved metadata texts
      PreviewRenderer.drawCurvedText(
        ctx,
        'HACKER HOUSE GOA 2026 ★ BUILD IN GOA',
        cx,
        cy,
        rad + 20 * scale,
        -Math.PI / 2,
        `bold ${Math.round(14 * scale)}px "DM Serif Display", Georgia, serif`,
        '#004d26',
        scale
      );

      PreviewRenderer.drawCurvedText(
        ctx,
        '★ SHIP FROM PARADISE ★ 28 - 31 OCT 2026',
        cx,
        cy,
        rad + 20 * scale,
        Math.PI / 2,
        `bold ${Math.round(9 * scale)}px "Fira Code", monospace`,
        '#004d26',
        scale,
        true
      );

      // 3. User Name Tag Badge (centered at bottom of circle)
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      ctx.fillStyle = '#004d26';
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 2 * scale;
      ctx.font = `bold ${Math.round(16 * scale)}px "Space Grotesk", sans-serif`;
      const tw = ctx.measureText(nameText).width + 30 * scale;
      const bH = 30 * scale;
      const bY = cy + rad - bH / 2;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - tw / 2, bY, tw, bH, 6 * scale);
      } else {
        ctx.rect(cx - tw / 2, bY, tw, bH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(nameText, cx, bY + bH / 2 + 5 * scale);

      // 4. Bottom Pink Ribbon "#FRAMEINGOA"
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(30 * scale, height - 55 * scale, width - 60 * scale, 24 * scale);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('#FRAMEINGOA', cx, height - 39 * scale);
    },
  },
  {
    id: 'boarding-stamp',
    name: 'Builder Editorial',
    description: 'Cyberpunk meet travel ticket stub with ticket borders, barcode bands, and monospace logs.',
    previewColor: '#09100d',
    colors: {
      background: '#09100d',
      primary: '#10b981',
      secondary: '#ffd000',
      accent: '#ff007f',
      text: '#ffffff',
    },
    typography: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Dark cyber-green background
      ctx.fillStyle = '#09100d';
      ctx.fillRect(0, 0, width, height);

      // Grid patterns
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
      ctx.lineWidth = 1 * scale;
      const grid = 40 * scale;
      ctx.beginPath();
      for (let x = 0; x < width; x += grid) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += grid) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 - 15 * scale;
      const rad = 230 * scale;

      // Draw glowing neon circular border
      ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
      ctx.shadowBlur = 10 * scale;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 8 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Technical ticks ring
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 2 * scale;
      ctx.setLineDash([4 * scale, 8 * scale]);
      ctx.beginPath();
      ctx.arc(cx, cy, rad + 10 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 - 15 * scale;
      const rad = 230 * scale;

      // 1. Top Event Tags
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(18 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('SYS_ACTIVE // HH_GOA_2026', 30 * scale, 65 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('IP: 192.168.26.1', width - 30 * scale, 65 * scale);

      // 2. Side brackets and specs
      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('[TARGET: BUILDER]', 30 * scale, 125 * scale);
      ctx.fillText('[LOC: GOA_SAND]', 30 * scale, 145 * scale);

      ctx.textAlign = 'right';
      ctx.fillText('15.2993° N, 74.1240° E', width - 30 * scale, 125 * scale);
      ctx.fillText('SEC_STATUS: ONLINE', width - 30 * scale, 145 * scale);

      // 3. User Name Tag Badge
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      ctx.fillStyle = '#09100d';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2 * scale;
      ctx.font = `bold ${Math.round(16 * scale)}px "Fira Code", monospace`;
      const tw = ctx.measureText(nameText).width + 30 * scale;
      const bH = 32 * scale;
      const bY = cy + rad - bH / 2;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - tw / 2, bY, tw, bH, 4 * scale);
      } else {
        ctx.rect(cx - tw / 2, bY, tw, bH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'center';
      ctx.fillText(nameText, cx, bY + bH / 2 + 5 * scale);

      // 4. Barcode at footer
      const barcodeX = 30 * scale;
      const barcodeY = height - 55 * scale;
      const barcodeH = 30 * scale;
      ctx.fillStyle = '#10b981';
      let currX = barcodeX;
      const pattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2, 3, 1];
      for (let i = 0; i < pattern.length; i++) {
        const w = pattern[i] * scale;
        ctx.fillRect(currX, barcodeY, w, barcodeH);
        currX += w + 2 * scale;
      }

      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(10 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('ID: #HH-GOA-7757', width - 30 * scale, height - 35 * scale);
    },
  },
  {
    id: 'cyber-terminal',
    name: 'Tropical Festival',
    description: 'Vibrant party green look with coconut palm wreaths, curved labels, and glowing postmarks.',
    previewColor: '#004d26',
    colors: {
      background: '#004d26',
      primary: '#ffd000',
      secondary: '#ff007f',
      accent: '#00a359',
      text: '#ffffff',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;
      
      // Deep jungle green
      ctx.fillStyle = '#004d26';
      ctx.fillRect(0, 0, width, height);

      // Radial sun rays
      ctx.strokeStyle = 'rgba(255, 208, 0, 0.05)';
      ctx.lineWidth = 1.5 * scale;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(width / 2 + Math.cos(angle) * width, height / 2 + Math.sin(angle) * height);
        ctx.stroke();
      }
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 - 15 * scale;
      const rad = 230 * scale;

      // Palm tree wreaths
      PreviewRenderer.drawPalmTree(ctx, 60 * scale, height, 440 * scale, scale, 'rgba(0, 163, 89, 0.6)');
      PreviewRenderer.drawPalmTree(ctx, width - 60 * scale, height, 440 * scale, scale, 'rgba(0, 163, 89, 0.6)');

      // Gold scallop and circle
      PreviewRenderer.drawScallopedBorder(ctx, cx, cy, rad + 8 * scale, scale);

      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 8 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 - 15 * scale;
      const rad = 230 * scale;

      // 1. Top Heading block
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(0, 0, width, 80 * scale);

      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(20 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE', cx + 25 * scale, 32 * scale);

      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(18 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('गोवा', cx + 35 * scale, 32 * scale);

      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('GOA, INDIA  •  OCT 28-31  •  HH STUDIO', cx, 58 * scale);

      // 2. Curved texts
      PreviewRenderer.drawCurvedText(
        ctx,
        'HACKER HOUSE GOA 2026 ★ BUILD IN GOA',
        cx,
        cy,
        rad + 22 * scale,
        -Math.PI / 2,
        `bold ${Math.round(13 * scale)}px "DM Serif Display", Georgia, serif`,
        '#ffd000',
        scale
      );

      PreviewRenderer.drawCurvedText(
        ctx,
        '★ SHIP FROM PARADISE ★ 28 - 31 OCT 2026',
        cx,
        cy,
        rad + 22 * scale,
        Math.PI / 2,
        `bold ${Math.round(9 * scale)}px "Fira Code", monospace`,
        '#ffd000',
        scale,
        true
      );

      // 3. User Name tag
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      ctx.fillStyle = '#002612';
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 2 * scale;
      ctx.font = `bold ${Math.round(14 * scale)}px "Space Grotesk", sans-serif`;
      const tw = ctx.measureText(nameText).width + 30 * scale;
      const bH = 26 * scale;
      const bY = cy + rad - bH / 2;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - tw / 2, bY, tw, bH, 6 * scale);
      } else {
        ctx.rect(cx - tw / 2, bY, tw, bH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(nameText, cx, bY + bH / 2 + 5 * scale);

      // 4. Footer block
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, height - 55 * scale, width, 55 * scale);

      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(11 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('#FrameInGoa', cx, height - 32 * scale);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = `${Math.round(7.5 * scale)}px "Fira Code", monospace`;
      ctx.fillText('hhgoa.com  •  Oct 28-31, 2026  •  Goa, India', cx, height - 15 * scale);
    },
  },
];
