import type { Photograph } from '../content/photography';
import { mediaUrl } from './media';

// Original photographs stay in the archive; the viewing room uses lighter copies.
export function photographyMedia(photo: Photograph) {
  const stem = photo.src.replace(/\.jpg$/i, '');
  const thumbnail = mediaUrl(`${stem}-240.webp`);
  const preview = mediaUrl(`${stem}-768.webp`);
  const full = mediaUrl(`${stem}-full.webp`);
  return { thumbnail, preview, full, srcSet: `${preview} 768w, ${full} ${photo.width}w` };
}
