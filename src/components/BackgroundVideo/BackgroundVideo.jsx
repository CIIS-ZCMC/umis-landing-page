import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./background-video.css";
import fallbackPoster from "../../assets/slideshow/tower-1-poster.jpg";

/**
 * BackgroundVideo Component
 *
 * Designed for ZCMC Landing Page video showcases (such as Tower 1).
 * Features:
 * - Autoplay compliance (starts muted so browsers never block it)
 * - Sound toggle (unmute / mute on click)
 * - Play / Pause toggle
 * - Tab visibility listener (pauses playback when user switches tabs to save battery/CPU)
 * - Graceful fallback poster if video is loading or unsupported
 */
const BackgroundVideo = ({
  mp4Src = "/videos/short-tower-1.mp4",
  movSrc = "/videos/short-tower-1.mov",
  poster = fallbackPoster,
  mode = "hero", // 'hero' | 'ambient'
  showControls = true,
  badgeText = "🏢 ZCMC Tower 1 Showcase",
  children,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Tab visibility: pause on hidden, resume on active
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isPlaying) {
        video.play().catch(() => {});
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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVideoError = () => {
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
          <source src={mp4Src} type="video/mp4" />
          <source src={movSrc} type="video/quicktime" />
        </video>
        <div className="ambient-video-overlay" aria-hidden="true" />
      </>
    );
  }

  // 2. Hero Section Mode
  return (
    <div className="hero-video-container" ref={containerRef}>
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
          aria-label="ZCMC Tower 1 Video"
        >
          <source src={mp4Src} type="video/mp4" />
          <source src={movSrc} type="video/quicktime" />
        </video>
      )}

      {/* Dark gradient overlay for branding and typography contrast */}
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* Top Left Badge */}
      {badgeText && (
        <div className="hero-video-badge" role="status">
          <span className="hero-video-badge-dot" />
          <span>{badgeText}</span>
        </div>
      )}

      {/* Hero content layer */}
      {children && <div className="hero-video-content">{children}</div>}

      {/* Bottom Right Media Controls (Play/Pause & Sound) */}
      {showControls && !hasError && (
        <div className="hero-video-controls">
          <button
            type="button"
            className="video-control-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            title={isPlaying ? "Pause video" : "Play video"}
          >
            <span>{isPlaying ? "❚❚" : "▶"}</span>
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            type="button"
            className="video-control-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            <span>{isMuted ? "🔇" : "🔊"}</span>
            <span>{isMuted ? "Unmute" : "Muted"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

BackgroundVideo.propTypes = {
  mp4Src: PropTypes.string,
  movSrc: PropTypes.string,
  poster: PropTypes.string,
  mode: PropTypes.oneOf(["hero", "ambient"]),
  showControls: PropTypes.bool,
  badgeText: PropTypes.string,
  children: PropTypes.node,
};

export default BackgroundVideo;
