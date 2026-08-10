import type { PFPTemplate } from './PFPTemplate';

export const pfpTemplates: PFPTemplate[] = [
  {
    id: 'goa-palms',
    name: 'Goa Palms',
    description: 'Deep forest green backdrop, sunflower yellow, and hot pink stamp overlays.',
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
      
      // Draw forest green solid background
      ctx.fillStyle = '#006c35';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle sun rays in the background (Yellow lines emanating from top center)
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
      // Top
      ctx.fillRect(0, 0, width, borderSize);
      // Bottom
      ctx.fillRect(0, height - borderSize, width, borderSize);
      // Left
      ctx.fillRect(0, 0, borderSize, height);
      // Right
      ctx.fillRect(width - borderSize, 0, borderSize, height);

      // Inner yellow stroke line
      ctx.strokeStyle = '#ffd000';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(borderSize, borderSize, width - borderSize * 2, height - borderSize * 2);
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

      // Stamp border
      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, stampRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner circle border
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.arc(0, 0, stampRadius - 4 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // Devanagari Text
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(17 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('गोवा', 0, 0);

      ctx.restore();
    },
  },
  {
    id: 'builder-terminal',
    name: 'Builder Terminal',
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
      
      // Black backdrop
      ctx.fillStyle = '#040a06';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle terminal grid overlay
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
      // Frame Borders
      ctx.fillRect(0, 0, width, borderSize);
      ctx.fillRect(0, height - borderSize, width, borderSize);
      ctx.fillRect(0, 0, borderSize, height);
      ctx.fillRect(width - borderSize, 0, borderSize, height);

      // Inner outline
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
  {
    id: 'ocean-minimal',
    name: 'Ocean Minimal',
    description: 'Clean slate backdrop with ocean blue vector curves and thin lines.',
    previewColor: '#0ea5e9',
    colors: {
      background: '#020617',
      primary: '#0ea5e9',
      secondary: '#1e293b',
      accent: '#0ea5e9',
      text: '#ffffff',
    },
    typography: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Dark blue background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Radial blue glow center bottom
      const glow = ctx.createRadialGradient(width / 2, height, 10, width / 2, height, 300 * scale);
      glow.addColorStop(0, 'rgba(14, 165, 233, 0.1)');
      glow.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    },
    renderFrame(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 36 * scale;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, borderSize);
      ctx.fillRect(0, height - borderSize, width, borderSize);
      ctx.fillRect(0, 0, borderSize, height);
      ctx.fillRect(width - borderSize, 0, borderSize, height);

      // Thin outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(borderSize, borderSize, width - borderSize * 2, height - borderSize * 2);
      
      // Bottom highlight blue line
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(borderSize, height - borderSize);
      ctx.lineTo(width - borderSize, height - borderSize);
      ctx.stroke();
    },
    renderOverlay(ctx, config) {
      const { width, height, scale } = config;
      const borderSize = 36 * scale;

      // Header Texts
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(16 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('HH GOA', borderSize + 16 * scale, borderSize / 2);

      ctx.fillStyle = '#9ca3af';
      ctx.font = `${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText('2026 Selections', width - borderSize - 16 * scale, borderSize / 2);

      // Footer
      ctx.fillStyle = '#9ca3af';
      ctx.font = `${Math.round(12 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('Goa Beach Build Station', borderSize + 16 * scale, height - borderSize / 2);
    },
  },
];
