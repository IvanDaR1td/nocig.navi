// 使用默认导出
export default function AudioPlayer() {
  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <iframe
        className="rounded-xl"
        title="Spotify Playlist"
        src="https://open.spotify.com/embed/playlist/3PJnL0qaMd3C71Am5X8wjM?utm_source=generator"
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}