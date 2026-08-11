import type { PFPTemplate } from './PFPTemplate';
import { PreviewRenderer } from '../../canvas/PreviewRenderer';

export const pfpTemplates: PFPTemplate[] = [
  {
    id: 'goa-palms',
    name: 'Goa Palms',
    description: 'Vibrant Goa beach sunset frame with high-fidelity scenery illustrations, yellow headers, and gold badges.',
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
      const { width, height } = config;
      
      // Get the preloaded background illustration from the cache
      const bgImg = PreviewRenderer.getCachedImage('/goa-bg.png');
      
      if (bgImg) {
        // Draw the high-fidelity beach sunset illustration to fill the canvas
        ctx.drawImage(bgImg, 0, 0, width, height);
      } else {
        // Fallback to solid forest green color if background image not found
        ctx.fillStyle = '#004d26';
        ctx.fillRect(0, 0, width, height);
      }
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 + 25 * scale;
      const rad = 210 * scale; // Circular portrait radius matching centered layout

      // 1. Thick gold outer circle frame around photo (bold width)
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 12 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Gold scalloped border ring outside the photo frame (large scallops)
      PreviewRenderer.drawScallopedBorder(ctx, cx, cy, rad + 12 * scale, scale);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 + 25 * scale;
      const rad = 210 * scale;

      // 1. Top Yellow Header Block (height 110px)
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(0, 0, width, 110 * scale);

      // Header Text: HACKER HOUSE गोवा (very bold and large)
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(36 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE', cx + 40 * scale, 45 * scale);

      // Pink stamp "गोवा" next to header
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(32 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('गोवा', cx + 60 * scale, 45 * scale);

      // Subtitle below header text (bold and legible)
      ctx.fillStyle = '#004d26';
      ctx.font = `bold ${Math.round(13 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('GOA, INDIA  •  OCT 28-31  •  HH STUDIO', cx, 85 * scale);

      // 2. Curved gold text around the circular portrait (extremely bold and large)
      PreviewRenderer.drawCurvedText(
        ctx,
        'HACKER HOUSE GOA 2026 ★ BUILD IN GOA',
        cx,
        cy,
        rad + 28 * scale,
        -Math.PI / 2,
        `bold ${Math.round(24 * scale)}px "DM Serif Display", Georgia, serif`,
        '#ffd000',
        scale
      );

      PreviewRenderer.drawCurvedText(
        ctx,
        '★ SHIP FROM PARADISE ★ 28 - 31 OCT 2026',
        cx,
        cy,
        rad + 28 * scale,
        Math.PI / 2,
        `bold ${Math.round(15 * scale)}px "Fira Code", monospace`,
        '#ffd000',
        scale,
        true
      );

      // 3. User Name Tag Badge overlapping bottom of circle (large and readable)
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      ctx.fillStyle = '#002612'; // Dark green pill background
      ctx.strokeStyle = '#ffd000'; // Gold border
      ctx.lineWidth = 3 * scale;
      
      ctx.font = `bold ${Math.round(22 * scale)}px "Space Grotesk", sans-serif`;
      const tw = ctx.measureText(nameText).width + 50 * scale;
      const bH = 42 * scale;
      const bY = cy + rad - bH / 2 + 6 * scale;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - tw / 2, bY, tw, bH, 10 * scale);
      } else {
        ctx.rect(cx - tw / 2, bY, tw, bH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(nameText, cx, bY + bH / 2);

      // 4. Bottom Semi-transparent Footer block (height 75px)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, height - 75 * scale, width, 75 * scale);

      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(22 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('#FrameInGoa', cx, height - 42 * scale);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = `${Math.round(13 * scale)}px "Fira Code", monospace`;
      ctx.fillText('hhgoa.com  •  Oct 28-31, 2026  •  Goa, India', cx, height - 18 * scale);
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
      ctx.strokeStyle = 'rgba(0, 108, 53, 0.05)';
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      for (let i = 50 * scale; i < width; i += 100 * scale) {
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
      const cy = height / 2 + 10 * scale;
      const rad = 190 * scale;

      // 1. Draw palm tree graphics in bottom corners (larger)
      PreviewRenderer.drawPalmTree(ctx, 50 * scale, height - 30 * scale, 150 * scale, scale, '#006c35');
      PreviewRenderer.drawPalmTree(ctx, width - 50 * scale, height - 30 * scale, 150 * scale, scale, '#006c35');

      // Draw beach sand dunes outlines
      ctx.fillStyle = 'rgba(0, 108, 53, 0.06)';
      ctx.beginPath();
      ctx.ellipse(80 * scale, height - 30 * scale, 100 * scale, 22 * scale, 0, 0, Math.PI * 2);
      ctx.ellipse(width - 80 * scale, height - 30 * scale, 100 * scale, 22 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw retro postage stamp in top right corner (large)
      PreviewRenderer.drawPerforatedStamp(ctx, width - 150 * scale, 30 * scale, 110 * scale, 140 * scale, scale, '#006c35');

      // 3. Thick forest green circle frame around photo (bolder)
      ctx.strokeStyle = '#006c35';
      ctx.lineWidth = 10 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Dashed golden inner tracking ring
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 2.5 * scale;
      ctx.setLineDash([8 * scale, 5 * scale]);
      ctx.beginPath();
      ctx.arc(cx, cy, rad - 12 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    },
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 + 10 * scale;
      const rad = 190 * scale;

      // 1. Top Event Heading text (very large)
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(28 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE GOA', 35 * scale, 55 * scale);

      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(24 * scale)}px "Space Grotesk", sans-serif`;
      ctx.fillText('गोवा', 345 * scale, 55 * scale);

      // 2. Curved postage stamp details wrapping circular frame (bold and legible)
      PreviewRenderer.drawCurvedText(
        ctx,
        '★ DEPARTURE: OCT 28 ★ SHIP FROM PARADISE ★',
        cx,
        cy,
        rad + 25 * scale,
        -Math.PI / 2,
        `bold ${Math.round(14 * scale)}px "Fira Code", monospace`,
        '#006c35',
        scale
      );

      // 3. Passenger Ticket label at the bottom of the circle
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      ctx.fillStyle = '#fcfaf5'; // Cream ticket background
      ctx.strokeStyle = '#006c35'; // Green border
      ctx.lineWidth = 2 * scale;
      
      ctx.font = `bold ${Math.round(14 * scale)}px "Fira Code", monospace`;
      const tw = ctx.measureText(`PASS: ${nameText}`).width + 30 * scale;
      const bH = 30 * scale;
      const bY = cy + rad - bH / 2;

      ctx.beginPath();
      ctx.rect(cx - tw / 2, bY, tw, bH);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#006c35';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`PASS: ${nameText}`, cx, bY + bH / 2);

      // 4. Postmark stamp at bottom right (large)
      PreviewRenderer.drawPostmarkStamp(ctx, width - 110 * scale, height - 125 * scale, 50 * scale, 'GOA 2026', '#006c35', scale);
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
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1.5 * scale;
      const gridSize = 50 * scale;

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
      scanGrad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      scanGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.0)');
      scanGrad.addColorStop(1, 'rgba(16, 185, 129, 0.08)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, 0, width, height);
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 + 20 * scale;
      const rad = 200 * scale;

      const rx = cx - rad;
      const ry = cy - rad;
      const size = rad * 2;

      // 1. Neon glowing outline around the central portrait (bold)
      ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
      ctx.shadowBlur = 15 * scale;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 5 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // 2. Technical corner target reticle brackets (thick)
      const len = 35 * scale;
      const offset = 18 * scale;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 5 * scale;

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
    renderOverlay(ctx, config, data) {
      const { width, height, scale } = config;
      const cx = width / 2;
      const cy = height / 2 + 20 * scale;
      const rad = 200 * scale;

      const rx = cx - rad;
      const ry = cy - rad;
      const size = rad * 2;

      // 1. Header info banner (large and bold)
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(20 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('SYS_ACTIVE // HH_GOA_2026', rx, ry - 35 * scale);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(15 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('IP: 192.168.26.1', rx + size, ry - 35 * scale);

      // 2. Target acquisition metrics printed over the corners
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(13 * scale)}px "Fira Code", monospace`;
      
      // Top Left tag (show user primary role/stack if available)
      const roleText = (data?.role || 'BUILDER').trim().toUpperCase();
      ctx.textAlign = 'left';
      ctx.fillText(`TARGET: ${roleText}`, rx + 24 * scale, ry + 35 * scale);
      
      // Top Right tag
      ctx.textAlign = 'right';
      ctx.fillText('LOC: GOA_SAND', rx + size - 24 * scale, ry + 35 * scale);

      // 3. Status bar overlay (Green badge, black text - shows builder title if available)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      const bW = 160 * scale;
      const bH = 28 * scale;
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(rx + 24 * scale, ry + size - 45 * scale, bW, bH, 4 * scale);
      } else {
        ctx.rect(rx + 24 * scale, ry + size - 45 * scale, bW, bH);
      }
      ctx.fill();

      const titleText = (data?.title || 'VERIFIED').trim().toUpperCase();
      ctx.fillStyle = '#020604';
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(`SYS: ${titleText}`, rx + 24 * scale + bW / 2, ry + size - 31 * scale);

      // Coordinates at bottom right
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(13 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('15.2993° N, 74.1240° E', rx + size - 24 * scale, ry + size - 31 * scale);

      // 4. User Name Tag Badge overlapping bottom of circle
      const nameText = (data?.name || 'YOUR NAME').trim().toUpperCase();
      ctx.fillStyle = '#020604'; // Black background
      ctx.strokeStyle = '#10b981'; // Neon green border
      ctx.lineWidth = 2 * scale;
      
      ctx.font = `bold ${Math.round(14 * scale)}px "Fira Code", monospace`;
      const tw = ctx.measureText(`ID: ${nameText}`).width + 30 * scale;
      const nameBadgeH = 32 * scale;
      const nameBadgeY = cy + rad - nameBadgeH / 2;

      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(cx - tw / 2, nameBadgeY, tw, nameBadgeH, 6 * scale);
      } else {
        ctx.rect(cx - tw / 2, nameBadgeY, tw, nameBadgeH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`ID: ${nameText}`, cx, nameBadgeY + nameBadgeH / 2);

      // 5. Terminal verified system footer status
      ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.font = `${Math.round(15 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('BUILD_STATION: ONLINE', rx, ry + size + 35 * scale);

      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(15 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('TERMINAL_SYS_SECURED', rx + size, ry + size + 35 * scale);
    },
  },
];
