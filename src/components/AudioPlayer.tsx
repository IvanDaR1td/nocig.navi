import { useEffect, useRef, useState } from 'react';
import { Music2, X, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export default function AudioPlayer() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !region.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <div className="audio-player" ref={region}>
    <div id="music-panel" className="music-panel" hidden={!open}>
      {open && <>
        <iframe
          className="spotify-embed"
          title={t('audio.title')}
          src="https://open.spotify.com/embed/playlist/3PJnL0qaMd3C71Am5X8wjM?utm_source=generator&theme=0"
          loading="lazy"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
        <a
          className="spotify-external-link"
          href="https://open.spotify.com/playlist/3PJnL0qaMd3C71Am5X8wjM"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('audio.openExternal')}<ArrowUpRight className="inline-arrow" size={16} strokeWidth={1.6} aria-hidden="true" />
        </a>
      </>}
    </div>
    <button type="button" ref={button} className="music-toggle" onClick={() => setOpen(value => !value)}
      aria-expanded={open} aria-controls="music-panel" aria-label={t(open ? 'audio.closeLabel' : 'audio.openLabel')}>
      {open ? <X size={15} aria-hidden="true" /> : <Music2 size={15} aria-hidden="true" />}{t(open ? 'audio.close' : 'audio.label')}
    </button>
  </div>;
}
