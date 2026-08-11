import type { RenderConfig } from '../../export/exportTypes';

export interface PFPTemplate {
  id: string;
  name: string;
  description: string;
  previewColor: string; // Used for UI selector circular color preview

  borderWidth?: number;

  colors: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    borderColor?: string;
  };

  typography: {
    heading: string;
    body: string;
    mono: string;
  };

  renderBackground?: (ctx: CanvasRenderingContext2D, config: RenderConfig) => void;
  renderFrame?: (ctx: CanvasRenderingContext2D, config: RenderConfig) => void;
  renderOverlay?: (ctx: CanvasRenderingContext2D, config: RenderConfig, data?: { name?: string; role?: string; title?: string }) => void;
}
