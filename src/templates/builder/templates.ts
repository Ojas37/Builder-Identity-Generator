import type { BuilderTemplate } from './BuilderTemplate';

export const builderTemplates: BuilderTemplate[] = [
  {
    id: 'goa-jungle',
    name: 'Goa Jungle',
    description: 'Deep forest greens, sunflower yellow top banner, and hot pink stamp overlays.',
    previewColor: '#006c35',
    colors: {
      backgroundStart: '#004d25',
      backgroundEnd: '#000000',
      primary: '#ffd000',
      secondary: '#ff007f',
      accent: '#ffd000',
      text: '#ffffff',
      badgeBg: 'rgba(255, 0, 127, 0.1)',
      badgeText: '#ff007f',
    },
    typography: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Draw gradient background (Deep Green to Black)
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#004d25');
      grad.addColorStop(0.6, '#002612');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Yellow outer border line
      ctx.strokeStyle = 'rgba(255, 208, 0, 0.2)';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(10 * scale, 10 * scale, width - 20 * scale, height - 20 * scale);
    },
    renderOverlay(ctx, config, _data) {
      const { width, scale } = config;

      // 1. Draw Top Sunflower Yellow Banner
      const bannerY = 40 * scale;
      const bannerH = 45 * scale;
      ctx.fillStyle = '#ffd000';
      ctx.fillRect(10 * scale, bannerY, width - 20 * scale, bannerH);

      // Banner text
      ctx.fillStyle = '#004d25';
      ctx.font = `bold ${Math.round(18 * scale)}px "DM Serif Display", Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('HACKER HOUSE GOA 2026', width / 2, bannerY + bannerH / 2);

      // 2. Pink Rubber Stamp on the right side of the photo portrait
      const stampRadius = 26 * scale;
      const stampX = width - 55 * scale;
      const stampY = 240 * scale;

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

      // Devanagari text
      ctx.fillStyle = '#ff007f';
      ctx.font = `bold ${Math.round(16 * scale)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('गोवा', 0, 0);

      ctx.restore();

      // 3. Draw a vintage barcode at the bottom
      const footerY = 660 * scale;
      const barcodeX = width - 110 * scale;
      const barcodeY = footerY + 20 * scale;
      const barcodeH = 30 * scale;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      let currentX = barcodeX;
      const linePattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2];
      for (let i = 0; i < linePattern.length; i++) {
        const w = linePattern[i] * scale;
        ctx.fillRect(currentX, barcodeY, w, barcodeH);
        currentX += w + 2 * scale;
      }
    },
  },
  {
    id: 'cyber-terminal',
    name: 'Cyber Terminal',
    description: 'Dark grid background with neon cyan and green lines, barcode and tech hashes.',
    previewColor: '#10b981',
    colors: {
      backgroundStart: '#040a06',
      backgroundEnd: '#000000',
      primary: '#10b981',
      secondary: '#064e3b',
      accent: '#10b981',
      text: '#ffffff',
      badgeBg: 'rgba(16, 185, 129, 0.1)',
      badgeText: '#10b981',
    },
    typography: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", monospace',
    },
    renderBackground(ctx, config) {
      const { width, height, scale } = config;

      // Dark slate background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#09100d');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Grid overlay
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.02)';
      ctx.lineWidth = 1 * scale;
      const gridSize = 35 * scale;
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

      // Cyber corners
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2 * scale;
      const cornerL = 20 * scale;
      const pad = 15 * scale;
      // Top Left
      ctx.beginPath();
      ctx.moveTo(pad + cornerL, pad); ctx.lineTo(pad, pad); ctx.lineTo(pad, pad + cornerL);
      ctx.stroke();
      // Top Right
      ctx.beginPath();
      ctx.moveTo(width - pad - cornerL, pad); ctx.lineTo(width - pad, pad); ctx.lineTo(width - pad, pad + cornerL);
      ctx.stroke();
      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(pad + cornerL, height - pad); ctx.lineTo(pad, height - pad); ctx.lineTo(pad, height - pad + cornerL);
      ctx.stroke();
      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(width - pad - cornerL, height - pad); ctx.lineTo(width - pad, height - pad); ctx.lineTo(width - pad, height - pad + cornerL);
      ctx.stroke();
    },
    renderOverlay(ctx, config, _data) {
      const { width, scale } = config;
      const footerY = 660 * scale;

      // Barcode at the bottom
      const barcodeX = width - 110 * scale;
      const barcodeY = footerY + 20 * scale;
      const barcodeH = 30 * scale;
      
      ctx.fillStyle = '#10b981';
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
    name: 'Ocean Sand',
    description: 'Elegant deep blues with white waves pattern and clean minimalist cards.',
    previewColor: '#0ea5e9',
    colors: {
      backgroundStart: '#020617',
      backgroundEnd: '#000000',
      primary: '#0ea5e9',
      secondary: '#1e293b',
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

      // Slate gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#020617');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Waves illustration lines drawn in background (radial wave arcs)
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.05)';
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
