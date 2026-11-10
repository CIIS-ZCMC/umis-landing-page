import { useState, useRef, useEffect, useCallback } from "react";

export const CHRISTMAS_PLAYLIST = [
  {
    id: 1,
    title: "We Wish You a Merry Christmas",
    subtitle: "90s Christmas Chimes",
    src: "/audio/christmas/02_we_wish_you_a_merry_christmas.mp3",
  },
  {
    id: 2,
    title: "Jingle Bells",
    subtitle: "90s Christmas Chimes",
    src: "/audio/christmas/01_jingle_bells.mp3",
  },
  {
    id: 3,
    title: "Joy to the World",
    subtitle: "90s Christmas Chimes",
    src: "/audio/christmas/03_joy_to_the_world.mp3",
  },
  {
    id: 4,
    title: "Silent Night",
    subtitle: "90s Christmas Chimes",
    src: "/audio/christmas/04_silent_night.mp3",
  },
];

const ChristmasMusicPlayer = () => {
  // First track played is "We Wish You a Merry Christmas"
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);

  const currentTrack = CHRISTMAS_PLAYLIST[currentTrackIndex];

  // Play audio safely handling browser autoplay policies
  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : 0.65;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        hasInteractedRef.current = true;
      })
      .catch(() => {
        // Autoplay blocked by browser policy until user interacts with the page
        setIsPlaying(false);
      });
  }, [isMuted]);

  // Autoplay on mount + fallback on first user gesture (click/scroll/touch)
  useEffect(() => {
    startPlayback();

    // Browser autoplay policy fallback: start as soon as user touches or clicks anywhere
    const handleFirstGesture = () => {
      if (!hasInteractedRef.current && audioRef.current && audioRef.current.paused) {
        startPlayback();
      }
    };

    window.addEventListener("click", handleFirstGesture, { passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { passive: true });
    window.addEventListener("scroll", handleFirstGesture, { passive: true });
    window.addEventListener("keydown", handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };
  }, [startPlayback]);

  // Handle play / pause toggle (via global ribbon button)
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  // Auto-advance to next track when current song ends
  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % CHRISTMAS_PLAYLIST.length);
  }, []);

  // When track index changes, load and play next track automatically
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    audio.load();
    if (isPlaying || hasInteractedRef.current) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentTrackIndex, currentTrack.src]);

  // Global listener for hero ribbon sound toggle
  useEffect(() => {
    const handleGlobalMusicToggle = () => {
      togglePlay();
    };
    window.addEventListener("zcmc-toggle-christmas-music", handleGlobalMusicToggle);
    return () => {
      window.removeEventListener("zcmc-toggle-christmas-music", handleGlobalMusicToggle);
    };
  }, [togglePlay]);

  // Notify hero ribbon of playing/muted state changes
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("zcmc-christmas-music-state", {
        detail: { isPlaying, isMuted, trackTitle: currentTrack.title },
      })
    );
  }, [isPlaying, isMuted, currentTrack]);

  // Controller UI is completely hidden per user request, audio runs purely in background
  return (
    <div style={{ display: "none" }} aria-hidden="true">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        onEnded={nextTrack}
      />
    </div>
  );
};

export default ChristmasMusicPlayer;
