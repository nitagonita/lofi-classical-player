import { useRef, useState } from "react";
import "./index.css";

const tracks = [
  {
    title: "Winter In The Woods (Piano)",
    artist: "Zight",
    src: "/audio/winter.mp3",
  },
  {
    title: "What Is Love (Piano)",
    artist: "Zight",
    src: "/audio/what-is-love.mp3",
  },
  {
    title: "Sonorus",
    artist: "Mr Smith",
    src: "/audio/sonorus.mp3",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = tracks[currentIndex];

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playTrackAtIndex = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 0);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    playTrackAtIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrackAtIndex(prevIndex);
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="app">
      <div className="overlay" />

      <div className="player-card">
        <h1 className="title">Night Bedroom Piano Player</h1>
        <p className="subtitle">Calm • Romantic • Study in the rain</p>

        <div className="track-info">
          <div className="track-label">Now Playing</div>
          <div className="track-title">{currentTrack.title}</div>
          <div className="track-artist">{currentTrack.artist}</div>
        </div>

        <div className="controls">
          <button onClick={handlePrev}>⏮</button>
          <button className="play-btn" onClick={handlePlayPause}>
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <button onClick={handleNext}>⏭</button>
        </div>

        <ul className="track-list">
          {tracks.map((track, index) => (
            <li
              key={track.title}
              className={index === currentIndex ? "active" : ""}
              onClick={() => playTrackAtIndex(index)}
            >
              {index === currentIndex && <span>🎧 </span>}
              {track.title} — <span className="artist">{track.artist}</span>
            </li>
          ))}
        </ul>

        <audio ref={audioRef} src={currentTrack.src} onEnded={handleEnded} />

        <div className="credits">
          <p>Music Credits:</p>
          <p>
            “Winter In The Woods (Piano)” &amp; “What Is Love (Piano)” by Zight
            — “Sonorus” by Mr Smith
          </p>
          <p>Licensed under CC BY 4.0 – Source: Free Music Archive</p>
        </div>
      </div>
    </div>
  );
}

export default App;
