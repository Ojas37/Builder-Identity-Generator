import { SHARE_CAPTIONS, X_POST_INTENT_URL } from '../constants/share';

/**
 * Directly generates and triggers an X (Twitter) post composer intent.
 * MUST be called directly within a synchronous event handler block (click listener)
 * to prevent modern browser popup blockers from intercepting it.
 */
export function shareToX(mode: 'frame' | 'builder'): boolean {
  const text = SHARE_CAPTIONS[mode];
  const url = `${X_POST_INTENT_URL}?text=${encodeURIComponent(text)}`;
  
  const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
  
  return !!openedWindow;
}
