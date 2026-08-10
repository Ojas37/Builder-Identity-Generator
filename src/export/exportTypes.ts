export interface RenderConfig {
  width: number;
  height: number;
  scale: number;
}

export type DownloadStatus = 'idle' | 'generating' | 'success' | 'error';
