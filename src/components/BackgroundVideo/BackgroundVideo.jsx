import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./background-video.css";

/**
 * BackgroundVideo Component
 *
 * Supports both Hero Section background video and Full-Page Ambient video.
 * Adheres to browser autoplay policies (muted, playsInline) and pauses
 * automatically when the browser tab is hidden to save power/CPU.
 */
const BackgroundVideo = ({
  src = "/videos/landing-bg.mp4",
  webmSrc = "/videos/landing-bg.webm",
  poster = "/videos/landing-bg-poster.jpg",
  mode = "hero", // 'hero' | 'ambient'
  showControls = true,
  children,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Pause playback when tab is hidden, resume when visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isPlaying) {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoError = () => {
    // If video file is not yet available, suppress crash and allow graceful poster/fallback
    setHasError(true);
  };

  // 1. Ambient Full-Page Mode
  if (mode === "ambient") {
    if (hasError) return null;
    return (
      <>
        <video
          ref={videoRef}
          className="ambient-video-background"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
          onError={handleVideoError}
          aria-hidden="true"
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
        <div className="ambient-video-overlay" aria-hidden="true" />
      </>
    );
  }

  // 2. Hero Section Mode
  return (
    <div className="hero-video-container">
      {!hasError && (
        <video
          ref={videoRef}
          className="hero-video-element"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
          onError={handleVideoError}
          aria-hidden="true"
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay for typography readability */}
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* Hero content layer */}
      {children && <div className="hero-video-content">{children}</div>}

      {/* Optional play/pause toggle button */}
      {showControls && !hasError && (
        <button
          type="button"
          className="video-control-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          title={isPlaying ? "Pause video" : "Play video"}
        >
          <span>{isPlaying ? "❚❚" : "▶"}</span>
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
      )}
    </div>
  );
};

BackgroundVideo.propTypes = {
  src: PropTypes.string,
  webmSrc: PropTypes.string,
  poster: PropTypes.string,
  mode: PropTypes.oneOf(["hero", "ambient"]),
  showControls: PropTypes.bool,
  children: PropTypes.node,
};

export default BackgroundVideo;
