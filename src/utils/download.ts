/**
 * Safely triggers browser download for a Blob file.
 * Handles slight delays in revocation for compatibility with mobile Safari/Chrome.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  
  // Append to DOM to ensure click propagates in all browsers (Firefox, iOS Safari, etc.)
  document.body.appendChild(anchor);
  anchor.click();
  
  // Clean up
  document.body.removeChild(anchor);
  
  // Debounce revocation to ensure Safari completes processing the object URL download request
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 250);
}

/**
 * Sanitizes input names, stripping forbidden filename characters.
 * Validates against Windows/Unix forbidden filename sets: \ / : * ? " < > |
 */
export function sanitizeFilename(name: string, fallback: string): string {
  if (!name || !name.trim()) {
    return fallback;
  }
  
  // Replace invalid characters with hyphens
  const sanitized = name.trim().replace(/[\\/:*?"<>|]/g, '-');
  
  if (!sanitized) {
    return fallback;
  }
  
  return `HH-Goa-2026-${sanitized}.png`;
}
