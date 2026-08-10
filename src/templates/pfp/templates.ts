import type { PFPTemplate } from './PFPTemplate';
import { PreviewRenderer } from '../../canvas/PreviewRenderer';

export const pfpTemplates: PFPTemplate[] = [
  {
    id: 'goa-palms',
    name: 'Goa Palms',
    description: 'Circular photo badge, gold scallops, curved brand texts, and corner palm trees.',
    previewColor: '#006c35',
    colors: {
      background: '#006c35',
      primary: '#ffd000',
      secondary: '#ff007f',
      accent: '#ffd000',
      text: '#ffffff',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;
      
      // Deep green forest background
      ctx.fillStyle = '#006c35';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle yellow corner arcs
      ctx.strokeStyle = 'rgba(255, 208, 0, 0.08)';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, 100 * scale, 0, Math.PI / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width, 0, 100 * scale, Math.PI / 2, Math.PI);
      ctx.stroke();
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 36 * scale;

      // Draw gold outer border frame
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 4 * scale;
      ctx.strokeRect(borderSize / 2, borderSize / 2, width - borderSize, height - borderSize);

      // Draw decorative palm trees in the bottom corners
      PreviewRenderer.drawPalmTree(ctx, borderSize + 10 * scale, height - borderSize - 5 * scale, 60 * scale, scale, '#ffd000');
      PreviewRenderer.drawPalmTree(ctx, width - borderSize - 10 * scale, height - borderSize - 5 * scale, 60 * scale, scale, '#ffd000');

      // Draw scalloped floral border around the center circle photo area
      const innerW = width - borderSize * 2;
      const cx = width / 2;
      const cy = height / 2;
      const rad = innerW / 2;
      
      PreviewRenderer.drawScallopedBorder(ctx, cx, cy, rad, scale);
    },
    renderOverlay(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 36 * scale;
      const cx = width / 2;
      const cy = height / 2;
      const rad = (width - borderSize * 2) / 2;

      // 1. Curved text along top and bottom circles
      // Top: HACKER HOUSE GOA
      PreviewRenderer.drawCurvedText(
        ctx,
        'HACKER HOUSE GOA',
        cx,
        cy,
        rad + 20 * scale,
        -Math.PI / 2,
        `bold ${Math.round(18 * scale)}px "DM Serif Display", Georgia, serif`,
        '#ffd000',
        scale
      );

      // Bottom: OCT 28 - 31  2026
      PreviewRenderer.drawCurvedText(
        ctx,
        'OCT 28 - 31 , 2026',
        cx,
        cy,
        rad + 20 * scale,
        Math.PI / 2,
        `bold ${Math.round(12 * scale)}px "Fira Code", monospace`,
        '#ffffff',
        scale,
        true
      );

      // 2. Draw pink Devanagari stamp "गोवा" overlapping bottom right circle edge
      const stampRadius = 26 * scale;
      const stampX = cx + rad - 15 * scale;
      const stampY = cy + rad - 15 * scale;

      ctx.save();
      ctx.translate(stampX, stampY);
      ctx.rotate(-15 * Math.PI / 180);

      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, stampRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, stampRadius - 4 * scale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(16 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('गोवा', 0, 0);

      ctx.restore();
    },
  },
  {
    id: 'boarding-stamp',
    name: 'Boarding Stamp',
    description: 'Cream retro ticket backdrop, vintage sun postage stamps, and palm trees.',
    previewColor: '#f4f1ea',
    borderWidth: 40,
    colors: {
      background: '#f4f1ea',
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
      // Cream paper backdrop
      ctx.fillStyle = '#f4f1ea';
      ctx.fillRect(0, 0, width, height);

      // Draw light brown sandy hills and beach outlines in background
      ctx.fillStyle = 'rgba(0, 108, 53, 0.04)';
      ctx.beginPath();
      ctx.ellipse(width / 2, height, width / 2, 80 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 40 * scale;

      // Draw beach palm trees directly in PFP corners
      PreviewRenderer.drawPalmTree(ctx, borderSize - 10 * scale, height - borderSize - 10 * scale, 80 * scale, scale, '#006c35');
      PreviewRenderer.drawPalmTree(ctx, width - borderSize + 10 * scale, height - borderSize - 10 * scale, 80 * scale, scale, '#006c35');

      // Draw retro postage stamp in top right
      PreviewRenderer.drawPerforatedStamp(ctx, width - borderSize - 75 * scale, borderSize + 10 * scale, 65 * scale, 85 * scale, scale, '#f4f1ea');

      // Golden inner framing border
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(borderSize, borderSize, width - borderSize * 2, height - borderSize * 2);
    },
    renderOverlay(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 40 * scale;

      // Inner circular photo border
      ctx.strokeStyle = '#006c35';
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, (width - borderSize * 2) / 2, 0, Math.PI * 2);
      ctx.stroke();

      // Top title text banner
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(18 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE GOA', borderSize + 12 * scale, borderSize / 2);

      // Bottom banner details
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('SHIP FROM PARADISE', borderSize + 12 * scale, height - borderSize / 2);

      // Round postmark stamp in bottom right
      PreviewRenderer.drawPostmarkStamp(ctx, width - borderSize - 35 * scale, height - borderSize - 35 * scale, 30 * scale, 'SHIP 2026', '#006c35', scale);
    },
  },
  {
    id: 'cyber-terminal',
    name: 'Cyber Terminal',
    description: 'Technical gridlines with vibrant neon green accents and system metrics.',
    previewColor: '#10b981',
    colors: {
      background: '#040a06',
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
      
      // Black background
      ctx.fillStyle = '#040a06';
      ctx.fillRect(0, 0, width, height);

      // Grid overlay
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)';
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
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 36 * scale;

      ctx.fillStyle = '#040a06';
      ctx.fillRect(0, 0, width, borderSize);
      ctx.fillRect(0, height - borderSize, width, borderSize);
      ctx.fillRect(0, 0, borderSize, height);
      ctx.fillRect(width - borderSize, 0, borderSize, height);

      // Neon outline
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(borderSize, borderSize, width - borderSize * 2, height - borderSize * 2);
    },
    renderOverlay(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 36 * scale;

      // Header Texts
      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(15 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('SYS_ACTIVE // 2026', borderSize + 16 * scale, borderSize / 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('LOC: GOA_SAND', width - borderSize - 16 * scale, borderSize / 2);

      // Footer Texts
      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('SEC_STATUS: BUILD_STATION', borderSize + 16 * scale, height - borderSize / 2);

      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${Math.round(12 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('TERMINAL_VERIFIED', width - borderSize - 16 * scale, height - borderSize / 2);
    },
  },
];
