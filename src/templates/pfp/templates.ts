import type { PFPTemplate } from './PFPTemplate';
import { PreviewRenderer } from '../../canvas/PreviewRenderer';

export const pfpTemplates: PFPTemplate[] = [
  {
    id: 'goa-palms',
    name: 'Goa Palms',
    description: 'Deep forest green backdrop, sunflower yellow margins, and hot pink stamp overlays.',
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
      
      // Draw forest green background
      ctx.fillStyle = '#006c35';
      ctx.fillRect(0, 0, width, height);

      // Sun rays
      ctx.strokeStyle = 'rgba(255, 208, 0, 0.04)';
      ctx.lineWidth = 4 * scale;
      const cX = width / 2;
      const cY = 0;
      for (let i = 0; i < 180; i += 10) {
        const rad = (i * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(cX, cY);
        ctx.lineTo(cX + Math.cos(rad) * width * 1.5, cY + Math.sin(rad) * height * 1.5);
        ctx.stroke();
      }
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 36 * scale;

      ctx.fillStyle = '#006c35';
      ctx.fillRect(0, 0, width, borderSize);
      ctx.fillRect(0, height - borderSize, width, borderSize);
      ctx.fillRect(0, 0, borderSize, height);
      ctx.fillRect(width - borderSize, 0, borderSize, height);

      // Yellow border outline
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(borderSize, borderSize, width - borderSize * 2, height - borderSize * 2);

      // Drawing corner triangles to look like corner photo mounts
      ctx.fillStyle = '#ffd000';
      const mS = 12 * scale;
      ctx.beginPath();
      // Top Left
      ctx.moveTo(borderSize, borderSize);
      ctx.lineTo(borderSize + mS, borderSize);
      ctx.lineTo(borderSize, borderSize + mS);
      ctx.fill();
      // Top Right
      ctx.moveTo(width - borderSize, borderSize);
      ctx.lineTo(width - borderSize - mS, borderSize);
      ctx.lineTo(width - borderSize, borderSize + mS);
      ctx.fill();
      // Bottom Left
      ctx.moveTo(borderSize, height - borderSize);
      ctx.lineTo(borderSize + mS, height - borderSize);
      ctx.lineTo(borderSize, height - borderSize - mS);
      ctx.fill();
      // Bottom Right
      ctx.moveTo(width - borderSize, height - borderSize);
      ctx.lineTo(width - borderSize - mS, height - borderSize);
      ctx.lineTo(width - borderSize, height - borderSize - mS);
      ctx.fill();
    },
    renderOverlay(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 36 * scale;

      // 1. Draw Brand Header
      ctx.fillStyle = '#ffd000';
      ctx.font = `bold ${Math.round(18 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE GOA', borderSize + 16 * scale, borderSize / 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.round(13 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('28 - 31 OCT 2026', width - borderSize - 16 * scale, borderSize / 2);

      // 2. Draw Bottom Meta
      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.round(13 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('BUILDER STATION', borderSize + 16 * scale, height - borderSize / 2);

      // 3. Draw Pink Devanagari rubber stamp "गोवा" in bottom right corner
      const stampRadius = 26 * scale;
      const stampX = width - borderSize - 45 * scale;
      const stampY = height - borderSize - 30 * scale;

      ctx.save();
      ctx.translate(stampX, stampY);
      ctx.rotate(-15 * Math.PI / 180);

      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, stampRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, stampRadius - 4 * scale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(17 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('गोवा', 0, 0);

      ctx.restore();
    },
  },
  {
    id: 'boarding-stamp',
    name: 'Boarding Stamp',
    description: 'Cream retro ticket backdrop, circular photo overlay, and postmark seals.',
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
      const { width, height } = config;
      // Retro cream paper texture
      ctx.fillStyle = '#f4f1ea';
      ctx.fillRect(0, 0, width, height);
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 40 * scale;

      ctx.fillStyle = '#f4f1ea';
      ctx.fillRect(0, 0, width, borderSize);
      ctx.fillRect(0, height - borderSize, width, borderSize);
      ctx.fillRect(0, 0, borderSize, height);
      ctx.fillRect(width - borderSize, 0, borderSize, height);

      // Dual border outlines
      ctx.strokeStyle = '#006c35';
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(borderSize - 4 * scale, borderSize - 4 * scale, width - (borderSize - 4 * scale) * 2, height - (borderSize - 4 * scale) * 2);
      
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(borderSize, borderSize, width - borderSize * 2, height - borderSize * 2);
    },
    renderOverlay(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 40 * scale;

      // 1. Draw Circular Frame Border around clipped photo
      ctx.strokeStyle = '#006c35';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, (width - borderSize * 2) / 2, 0, Math.PI * 2);
      ctx.stroke();

      // Inner yellow highlight circle
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, (width - borderSize * 2) / 2 - 4 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Draw Header
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(18 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE GOA', borderSize + 12 * scale, borderSize / 2);

      ctx.fillStyle = '#6b7280';
      ctx.font = `${Math.round(11 * scale)}px "Fira Code", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('28-31 OCT 2026', width - borderSize - 12 * scale, borderSize / 2);

      // 3. Draw Footer
      ctx.fillStyle = '#006c35';
      ctx.font = `bold ${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('BOARDING PASS PFP', borderSize + 12 * scale, height - borderSize / 2);

      // 4. Draw Circular Postmark stamp: "SHIP FROM PARADISE" (retro green ink!)
      const stampRadius = 30 * scale;
      const stampX = width - borderSize - 55 * scale;
      const stampY = height - borderSize - 25 * scale;
      PreviewRenderer.drawPostmarkStamp(ctx, stampX, stampY, stampRadius, 'SHIP 2026', '#006c35', scale);
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
