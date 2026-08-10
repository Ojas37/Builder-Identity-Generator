import type { RenderConfig } from '../../export/exportTypes';

export interface BuilderTemplate {
  id: string;
  name: string;
  description: string;
  previewColor: string; // Used for UI selector circular color preview

  colors: {
    backgroundStart: string;
    backgroundEnd: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  };

  typography: {
    heading: string;
    body: string;
    mono: string;
  };

  renderBackground?: (ctx: CanvasRenderingContext2D, config: RenderConfig) => void;
  renderOverlay?: (
    ctx: CanvasRenderingContext2D,
    config: RenderConfig,
    data: { name: string; role: string; title: string }
  ) => void;
}
