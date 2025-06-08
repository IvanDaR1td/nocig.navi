export default function AudioPlayer() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-2">
        <iframe
          className="rounded-md"
          title="Spotify Playlist"
          src="https://open.spotify.com/embed/playlist/3PJnL0qaMd3C71Am5X8wjM?utm_source=generator"
          width="300"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
