import { useState } from 'react';
import { Music2, X } from 'lucide-react';

export default function AudioPlayer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2">
      {open && (
        <div className="room-card w-[320px] max-w-full p-2">
          <iframe
            className="w-full rounded-xl"
            title="Spotify Playlist"
            src="https://open.spotify.com/embed/playlist/3PJnL0qaMd3C71Am5X8wjM?utm_source=generator"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/94 px-3 py-2 text-sm text-[var(--color-secondary)] shadow-sm transition hover:text-[var(--color-primary)]"
        aria-expanded={open}
        aria-label={open ? 'Close Spotify player' : 'Open Spotify player'}
      >
        {open ? <X className="h-3.5 w-3.5" /> : <Music2 className="h-3.5 w-3.5" />}
        {open ? 'close' : 'music'}
      </button>
    </div>
  );
}
