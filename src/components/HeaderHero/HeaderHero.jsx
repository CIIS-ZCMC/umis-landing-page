import { useState, useRef, useEffect } from "react";
import heroImage1 from "../../assets/slideshow/hero.png";
import heroImage2 from "../../assets/slideshow/hero-bg.png";
import heroImage3 from "../../assets/slideshow/lp-bg.jpg";
import "./header-hero-video.css";

const HeaderHero = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const slides = [heroImage1, heroImage2, heroImage3];

  // Pause playback when tab is hidden, resume when tab is active
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

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;
      if (newIndex > slides.length) return 1;
      if (newIndex < 1) return slides.length;
      return newIndex;
    });
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <div className="header-hero-fullscreen">
      {/* 1. Fullscreen Background Video Layer (100vw, 100vh) */}
      <div className="hero-video-bg-layer" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video-bg-element"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroImage1}
        >
          <source src="/videos/short-tower-1.mp4" type="video/mp4" />
          <source src="/videos/short-tower-1.mov" type="video/quicktime" />
        </video>

        {/* Semi-transparent dark green gradient vignette */}
        <div className="hero-video-bg-overlay" />
      </div>

      {/* 2. Foreground Content: The Carousel sitting on top of the playing video */}
      <div className="hero-foreground-content">
        <div className="slideshow-container slideshow-container-hero">
          <div className="slideshow-bg slideshow-bg-hero">
            <div className="slideshow-content">
              <button
                type="button"
                className="prev"
                onClick={() => plusSlides(-1)}
                aria-label="Previous slide"
              >
                &#10094;
              </button>

              <div className="slideshow-img-container">
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    className="slideshow-img"
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    style={{
                      display: slideIndex === index + 1 ? "block" : "none",
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                className="next"
                onClick={() => plusSlides(1)}
                aria-label="Next slide"
              >
                &#10095;
              </button>
            </div>

            <div className="slider-dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className="slider-dot"
                  onClick={() => currentSlide(index + 1)}
                  style={{
                    backgroundColor:
                      slideIndex === index + 1
                        ? "#0F5721"
                        : "rgba(15, 87, 33, 0.24)",
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating Bottom Controls: Status Badge and Video Controls */}
      <div className="hero-floating-footer">
        <div className="hero-video-badge" role="status">
          <span className="hero-video-badge-dot" />
          <span>🎥 ZCMC Tower 1 Live Background</span>
        </div>

        <div className="hero-video-controls">
          <button
            type="button"
            className="video-control-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            title={isPlaying ? "Pause video" : "Play video"}
          >
            <span>{isPlaying ? "❚❚" : "▶"}</span>
            <span>{isPlaying ? "Pause Video" : "Play Video"}</span>
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
      </div>
    </div>
  );
};

export default HeaderHero;
