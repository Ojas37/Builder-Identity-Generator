import type { PFPTemplate } from './PFPTemplate';
import { PreviewRenderer } from '../../canvas/PreviewRenderer';

export const pfpTemplates: PFPTemplate[] = [
  {
    id: 'goa-palms',
    name: 'Goa Palms',
    description: 'Vibrant jungle green frame with yellow header banners, tropical side palm trees, gold badges, and bottom taglines.',
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
      
      // 1. Deep jungle green forest background
      ctx.fillStyle = '#004d26';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw ornate green backing pattern (concentric arches and rings)
      ctx.strokeStyle = 'rgba(0, 163, 89, 0.15)';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 + 10 * scale, 320 * scale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width / 2, height / 2 + 10 * scale, 280 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // Curved floral design arcs in background
      ctx.lineWidth = 1 * scale;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        ctx.save();
        ctx.translate(width / 2, height / 2 + 10 * scale);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(210 * scale, 0);
        ctx.quadraticCurveTo(250 * scale, 30 * scale, 280 * scale, 0);
        ctx.stroke();
        ctx.restore();
      }
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 + 10 * scale;
      const rad = 210 * scale; // Circular portrait radius matching centered layout

      // 1. Draw two large tropical palm trees framing the left and right sides
      PreviewRenderer.drawPalmTree(ctx, 80 * scale, height, 480 * scale, scale, 'rgba(0, 163, 89, 0.7)');
      PreviewRenderer.drawPalmTree(ctx, width - 80 * scale, height, 480 * scale, scale, 'rgba(0, 163, 89, 0.7)');

      // Taller golden palm tree outlines
      PreviewRenderer.drawPalmTree(ctx, 40 * scale, height - 20 * scale, 580 * scale, scale, 'rgba(255, 208, 0, 0.3)');
      PreviewRenderer.drawPalmTree(ctx, width - 40 * scale, height - 20 * scale, 580 * scale, scale, 'rgba(255, 208, 0, 0.3)');

      // 2. Thick gold outer circle frame around photo
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 6 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Gold scalloped border ring outside the photo frame
      PreviewRenderer.drawScallopedBorder(ctx, cx, cy, rad + 8 * scale, scale);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 + 10 * scale;
      const rad = 210 * scale;

      // 1. Top Yellow Header Block (fills width)
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(0, 0, width, 80 * scale);

      // Header Text: HACKER HOUSE गोवा
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(20 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE', cx + 25 * scale, 32 * scale);

      // Pink stamp "गोवा" next to header
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(18 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('गोवा', cx + 35 * scale, 32 * scale);

      // Subtitle below header text
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(8 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('GOA, INDIA  •  OCT 28-31  •  HH STUDIO', cx, 58 * scale);

      // 2. Curved gold text around the circular portrait
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

      // 3. User Name Tag Badge overlapping bottom of circle
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      ctx.fillStyle = '#002612'; // Dark green pill background
      ctx.strokeStyle = '#ffd000'; // Gold border
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
      ctx.textBaseline = 'middle';
      ctx.fillText(nameText, cx, bY + bH / 2);

      // 4. Bottom Semi-transparent Footer block
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
  {
    id: 'boarding-stamp',
    name: 'Boarding Stamp',
    description: 'Retro cream travel ticket look, vintage sun postage stamp, and green postmarks.',
    previewColor: '#fcfaf5',
    colors: {
      background: '#fcfaf5',
      primary: '#006c35',
      secondary: '#ffd000',
      accent: '#ff007f',
      text: '#006c35',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;
      
      // Cream paper background
      ctx.fillStyle = '#fcfaf5';
      ctx.fillRect(0, 0, width, height);

      // Soft green background radial grid details
      ctx.strokeStyle = 'rgba(0, 108, 53, 0.03)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      for (let i = 40 * scale; i < width; i += 80 * scale) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
      }
      ctx.stroke();
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2;
      const rad = 260 * scale;

      // 1. Draw palm tree graphics in bottom corners
      PreviewRenderer.drawPalmTree(ctx, 40 * scale, height - 30 * scale, 120 * scale, scale, '#006c35');
      PreviewRenderer.drawPalmTree(ctx, width - 40 * scale, height - 30 * scale, 120 * scale, scale, '#006c35');

      // Draw beach sand dunes outlines
      ctx.fillStyle = 'rgba(0, 108, 53, 0.04)';
      ctx.beginPath();
      ctx.ellipse(80 * scale, height - 30 * scale, 80 * scale, 16 * scale, 0, 0, Math.PI * 2);
      ctx.ellipse(width - 80 * scale, height - 30 * scale, 80 * scale, 16 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw retro postage stamp in top right corner
      PreviewRenderer.drawPerforatedStamp(ctx, width - 110 * scale, 30 * scale, 80 * scale, 100 * scale, scale, '#006c35');

      // 3. Thick forest green circle frame around photo
      ctx.strokeStyle = '#006c35';
      ctx.lineWidth = 6 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Dashed golden inner tracking ring
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 1.5 * scale;
      ctx.setLineDash([6 * scale, 4 * scale]);
      ctx.beginPath();
      ctx.arc(cx, cy, rad - 8 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    },
    renderOverlay(ctx, config) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2;
      const rad = 260 * scale;

      // 1. Top Event Heading text
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(18 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'left';
      ctx.fillText('HACKER HOUSE GOA', 35 * scale, 55 * scale);

      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(14 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('गोवा', 245 * scale, 55 * scale);

      // 2. Curved postage stamp details wrapping circular frame
      PreviewRenderer.drawCurvedText(
        ctx,
        '★ DEPARTURE: OCT 28 ★ SHIP FROM PARADISE ★',
        cx,
        cy,
        rad + 20 * scale,
        -Math.PI / 2,
        `bold ${Math.round(10 * scale)}px "Fira Code", monospace`,
        '#006c35',
        scale
      );

      // 3. Postmark stamp at bottom right
      PreviewRenderer.drawPostmarkStamp(ctx, width - 85 * scale, height - 95 * scale, 35 * scale, 'GOA 2026', '#006c35', scale);
    },
  },
  {
    id: 'cyber-terminal',
    name: 'Cyber Terminal',
    description: 'Technical gridlines with vibrant neon green scanlines, corner brackets, and system status tags.',
    previewColor: '#10b981',
    colors: {
      background: '#020604',
      primary: '#10b981',
      secondary: '#064e3b',
      accent: '#10b981',
      text: '#ffffff',
    },
    typography: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;
      
      // Deep dark cyber backdrop
      ctx.fillStyle = '#020604';
      ctx.fillRect(0, 0, width, height);

      // Glowing grid overlay
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.06)';
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

      // Soft vertical scanning lines gradient
      const scanGrad = ctx.createLinearGradient(0, 0, 0, height);
      scanGrad.addColorStop(0, 'rgba(16, 185, 129, 0.05)');
      scanGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.0)');
      scanGrad.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, 0, width, height);
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const size = 560 * scale;
      const rx = (width - size) / 2;
      const ry = (height - size) / 2;

      // 1. Neon glowing outline around the central portrait
      ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
      ctx.shadowBlur = 10 * scale;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(rx, ry, size, size, 24 * scale);
      } else {
        ctx.rect(rx, ry, size, size);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // 2. Technical corner target reticle brackets
      const len = 25 * scale;
      const offset = 12 * scale;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3 * scale;

      // Top Left Corner
      ctx.beginPath();
      ctx.moveTo(rx - offset, ry - offset + len);
      ctx.lineTo(rx - offset, ry - offset);
      ctx.lineTo(rx - offset + len, ry - offset);
      ctx.stroke();

      // Top Right Corner
      ctx.beginPath();
      ctx.moveTo(rx + size + offset - len, ry - offset);
      ctx.lineTo(rx + size + offset, ry - offset);
      ctx.lineTo(rx + size + offset, ry - offset + len);
      ctx.stroke();

      // Bottom Left Corner
      ctx.beginPath();
      ctx.moveTo(rx - offset, ry + size + offset - len);
      ctx.lineTo(rx - offset, ry + size + offset);
      ctx.lineTo(rx - offset + len, ry + size + offset);
      ctx.stroke();

      // Bottom Right Corner
      ctx.beginPath();
      ctx.moveTo(rx + size + offset - len, ry + size + offset);
      ctx.lineTo(rx + size + offset, ry + size + offset);
      ctx.lineTo(rx + size + offset, ry + size + offset - len);
      ctx.stroke();
    },
    renderOverlay(ctx, config) {
      const { width, height, scale } = config;
      const size = 560 * scale;
      const rx = (width - size) / 2;
      const ry = (height - size) / 2;

      // 1. Header info banner
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(15 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('SYS_ACTIVE // HH_GOA_2026', rx, ry - 30 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('IP: 192.168.26.1', rx + size, ry - 30 * scale);

      // 2. Target acquisition metrics printed over the corners
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(9 * scale)}px "Fira Code", monospace`;
      
      // Top Left tag
      ctx.textAlign = 'left';
      ctx.fillText('TARGET: BUILDER', rx + 16 * scale, ry + 25 * scale);
      
      // Top Right tag
      ctx.textAlign = 'right';
      ctx.fillText('LOC: GOA_SAND', rx + size - 16 * scale, ry + 25 * scale);

      // 3. Cyber stats on the bottom of the portrait
      // Status bar overlay (Green badge, black text)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(rx + 16 * scale, ry + size - 36 * scale, 120 * scale, 20 * scale, 4 * scale);
      } else {
        ctx.rect(rx + 16 * scale, ry + size - 36 * scale, 120 * scale, 20 * scale);
      }
      ctx.fill();

      ctx.fillStyle = '#020604';
      ctx.font = `bold ${Math.round(9 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('STATUS: VERIFIED', rx + 76 * scale, ry + size - 26 * scale);

      // Coordinates at bottom right
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(9 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('15.2993° N, 74.1240° E', rx + size - 16 * scale, ry + size - 26 * scale);

      // 4. Terminal verified system footer status
      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.font = `${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('BUILD_STATION: ONLINE', rx, ry + size + 30 * scale);

      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('TERMINAL_SYS_SECURED', rx + size, ry + size + 30 * scale);
    },
  },
];
