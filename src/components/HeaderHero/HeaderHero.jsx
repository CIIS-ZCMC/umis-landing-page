import { useState, useRef, useEffect } from "react";
import heroImage1 from "../../assets/slideshow/hero.png";
import heroImage2 from "../../assets/slideshow/hero-bg.png";
import heroImage3 from "../../assets/slideshow/lp-bg.jpg";
import tower1Poster from "../../assets/slideshow/tower-1-poster.jpg";
import useUniversalSearchHook from "../../hooks/UniversalSearchHook";
import "./header-hero-video.css";
import { ENABLE_CHRISTMAS_THEME, HOLIDAY_CONFIG } from "../../config/holidayConfig.jsx";
import { fetchZcmcDohLiveFeed } from "../../utils/zcmcDohScraper";

// Saved static slides (100% safe fallback if live zcmc.doh.gov.ph feed is unreachable in the future)
export const STATIC_SLIDES = [
  {
    image: heroImage1,
    title: "ZCMC Main Hospital Complex",
    subtitle: "Full-service tertiary healthcare institution serving Region IX and beyond.",
  },
  {
    image: heroImage2,
    title: "Modern Clinical & Surgical Suites",
    subtitle: "Equipped with state-of-the-art diagnostic technology and patient-centered facilities.",
  },
  {
    image: heroImage3,
    title: "Tower 1 Development & Expansion",
    subtitle: "Expanding hospital capacity with specialized clinics, private rooms, and modern amenities.",
  },
];

const HeaderHero = () => {
  const [slides, setSlides] = useState(STATIC_SLIDES);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted] = useState(true); // Background video is permanently muted
  const [christmasMusicState, setChristmasMusicState] = useState({ isPlaying: false, isMuted: false, trackTitle: "" });

  // Fetch live carousel pictures from https://zcmc.doh.gov.ph/ with automatic static fallback
  useEffect(() => {
    let isMounted = true;
    fetchZcmcDohLiveFeed()
      .then((feed) => {
        if (isMounted && feed && Array.isArray(feed.slides) && feed.slides.length > 0) {
          setSlides(feed.slides);
          setSlideIndex(0);
        }
      })
      .catch(() => {
        // Keep STATIC_SLIDES on any error
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleMusicState = (e) => {
      if (e.detail) {
        setChristmasMusicState(e.detail);
      }
    };
    window.addEventListener("zcmc-christmas-music-state", handleMusicState);
    return () => {
      window.removeEventListener("zcmc-christmas-music-state", handleMusicState);
    };
  }, []);
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const { openModal } = useUniversalSearchHook();

  // Tab visibility & viewport intersection: pause playback when off-screen or hidden to save mobile GPU
  useEffect(() => {
    const video = videoRef.current;
    const section = heroSectionRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isPlaying) {
        video.play().catch(() => {});
      }
    };

    let observer;
    if (section && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry.isIntersecting) {
            video.pause();
          } else if (isPlaying && !document.hidden) {
            video.play().catch(() => {});
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(section);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (observer) observer.disconnect();
    };
  }, [isPlaying]);

  // Auto-advance card slideshow every 5.5 seconds
  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides]);

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

  const toggleMusic = () => {
    window.dispatchEvent(new CustomEvent("zcmc-toggle-christmas-music"));
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentHighlight = slides[slideIndex] || STATIC_SLIDES[0];

  const handleSlideImageError = (e) => {
    const target = e.currentTarget;
    if (
      currentHighlight.fallbackOriginalImage &&
      target.src !== currentHighlight.fallbackOriginalImage
    ) {
      target.src = currentHighlight.fallbackOriginalImage;
    } else {
      // Fallback to saved static hospital image if remote image fails
      const fallbackStatic = STATIC_SLIDES[slideIndex % STATIC_SLIDES.length];
      if (target.src !== fallbackStatic.image) {
        target.src = fallbackStatic.image;
      }
    }
  };

  return (
    <section ref={heroSectionRef} className="hero-fullscreen-viewport" aria-label="ZCMC Welcome Section">
      {/* 1. Fullscreen Background Video Layer (100vw x 100vh) */}
      <div className="hero-video-backdrop" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster={tower1Poster}
        >
          <source src="/videos/short-tower-1.mp4?v=1" type="video/mp4" />
          <source src="/videos/short-tower-1.mov" type="video/quicktime" />
        </video>
        <div className="hero-video-gradient-overlay" />
      </div>

      {/* 2. Main Two-Column Hero Stage */}
      <div className="hero-split-grid">
        {/* Left Column: Hospital Mission, Identity & Direct CTAs */}
        <div className="hero-left-editorial">
          <div className="hero-tag-pill" role="status">
            <span className="hero-pill-pulsar" />
            <span>DOH Licensed Apex Tertiary Medical Center</span>
          </div>

          <h1 className="hero-main-title">
            Compassionate Care. <br />
            <span className="hero-gradient-text">World-Class Healing.</span>
          </h1>

          <p className="hero-description">
            Zamboanga City Medical Center is Region IX’s premier tertiary healthcare institution,
            delivering comprehensive clinical care, specialized medical services, and medical education.
          </p>

          {/* Action Hub Buttons */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="hero-btn-primary"
              onClick={() => openModal("pr")}
              title="Track procurement, purchase requests or hospital documents"
              aria-label="Track Document / Transaction"
            >
              <span>🔍</span>
              <span>Track Document (PR / PO)</span>
            </button>

            <a
              href="#news"
              className="hero-btn-secondary"
              onClick={(e) => scrollToSection(e, "news")}
              title="Scroll down to view hospital news and updates"
            >
              <span>Latest News &amp; Advisories ↓</span>
            </a>
          </div>

          {/* Emergency / Contact Badge */}
          <div className="hero-emergency-strip">
            <span>🚨 <strong>24/7 Emergency:</strong> (062) 991-2934</span>
            <span>•</span>
            <span>📍 Evangelista St., Sta. Catalina, Zamboanga City</span>
          </div>
        </div>

        {/* Right Column: Floating Highlights Carousel Card */}
        <div className="hero-right-showcase">
          <div className="hero-highlights-card" role="region" aria-label="Hospital Photo Highlights">
            {/* Card Header Bar */}
            <div className="card-header-bar">
              <span className="card-header-title">
                <span>📸</span> Hospital Highlights
              </span>
              <span className="card-counter">
                {slideIndex + 1} / {slides.length}
              </span>
            </div>

            {/* Media Viewport */}
            <div className="card-media-viewport">
              <img
                src={currentHighlight.image}
                alt={currentHighlight.title}
                className="card-slide-image"
                decoding="async"
                onError={handleSlideImageError}
                onClick={() => {
                  if (currentHighlight.link) {
                    window.open(currentHighlight.link, "_blank", "noopener,noreferrer");
                  }
                }}
                style={
                  currentHighlight.isDynamic
                    ? {
                        objectFit: "contain",
                        background: "#032216",
                        cursor: currentHighlight.link ? "pointer" : "default",
                      }
                    : undefined
                }
              />

              <button
                type="button"
                className="card-arrow-btn prev"
                onClick={prevSlide}
                aria-label="Previous photo highlight"
              >
                &#10094;
              </button>

              <button
                type="button"
                className="card-arrow-btn next"
                onClick={nextSlide}
                aria-label="Next photo highlight"
              >
                &#10095;
              </button>
            </div>

            {/* Card Footer Caption & Progress Indicators */}
            <div className="card-footer-info">
              <h4 className="card-slide-caption">{currentHighlight.title}</h4>
              <p className="card-slide-subcaption">{currentHighlight.subtitle}</p>

              <div className="card-pagination-strip">
                <div className="card-dots-cluster">
                  {slides.map((_, idx) => (
                    <span
                      key={idx}
                      className={`card-dot-indicator ${slideIndex === idx ? "active" : ""}`}
                      onClick={() => setSlideIndex(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Go to slide ${idx + 1}`}
                      onKeyDown={(e) => e.key === "Enter" && setSlideIndex(idx)}
                    />
                  ))}
                </div>

                <a
                  href="#more-info"
                  className="hero-ctrl-btn"
                  onClick={(e) => scrollToSection(e, "more-info")}
                  style={{ textDecoration: "none", fontSize: "10.5px", padding: "3px 10px" }}
                >
                  View Services →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Utility Ribbon Bar (Above the Fold) */}
      <div className="hero-bottom-ribbon-bar">
        <div className="hero-bottom-ribbon-content">
          <div className="hero-quick-shortcuts" role="navigation" aria-label="Quick Navigation">
            <button
              type="button"
              className="shortcut-item-link"
              onClick={() => openModal("pr")}
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <span className="shortcut-icon">📋</span>
              <span>Document Tracking</span>
            </button>

            <a
              href="#more-info"
              className="shortcut-item-link"
              onClick={(e) => scrollToSection(e, "more-info")}
            >
              <span className="shortcut-icon">🩺</span>
              <span>Clinical Services</span>
            </a>

            <a
              href="#news"
              className="shortcut-item-link"
              onClick={(e) => scrollToSection(e, "news")}
            >
              <span className="shortcut-icon">📰</span>
              <span>News &amp; Updates</span>
            </a>

            <a
              href="#contact"
              className="shortcut-item-link"
              onClick={(e) => scrollToSection(e, "contact")}
            >
              <span className="shortcut-icon">📞</span>
              <span>Contact Directory</span>
            </a>
          </div>

          {/* Right: Live Video Tag & Media Controls */}
          <div className="hero-ribbon-controls">
            <span className="hero-video-pill-info">
              <span>🎥</span> Tower 1 Video
            </span>

            <button
              type="button"
              className="hero-ctrl-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause background video" : "Play background video"}
              title={isPlaying ? "Pause video" : "Play video"}
            >
              <span>{isPlaying ? "❚❚" : "▶"}</span>
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>

            {ENABLE_CHRISTMAS_THEME && HOLIDAY_CONFIG.christmasSoundtrack && (
              <button
                type="button"
                className={`hero-ctrl-btn ${christmasMusicState.isPlaying ? "active-music" : ""}`}
                onClick={toggleMusic}
                aria-label="Toggle 90s Christmas Soundtrack"
                title={christmasMusicState.isPlaying ? "Pause Christmas Soundtrack" : "Play 90s Christmas Soundtrack"}
              >
                <span>{christmasMusicState.isPlaying ? "🎵" : "🔇"}</span>
                <span>{christmasMusicState.isPlaying ? "Music Playing" : "Play Music"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
