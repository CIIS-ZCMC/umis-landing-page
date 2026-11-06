import { useState, useRef, useEffect } from "react";
import heroImage1 from "../../assets/slideshow/hero.png";
import heroImage2 from "../../assets/slideshow/hero-bg.png";
import heroImage3 from "../../assets/slideshow/lp-bg.jpg";
import useUniversalSearchHook from "../../hooks/UniversalSearchHook";
import "./header-hero-video.css";

const SLIDES = [
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
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const { openModal } = useUniversalSearchHook();

  // Tab visibility: pause playback when tab is hidden, resume when active
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

  // Auto-advance card slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

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

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentHighlight = SLIDES[slideIndex];

  return (
    <section className="hero-fullscreen-viewport" aria-label="ZCMC Welcome Section">
      {/* 1. Fullscreen Background Video Layer (100vw x 100vh) */}
      <div className="hero-video-backdrop" aria-hidden="true">
        <video
          ref={videoRef}
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
                {slideIndex + 1} / {SLIDES.length}
              </span>
            </div>

            {/* Media Viewport */}
            <div className="card-media-viewport">
              <img
                src={currentHighlight.image}
                alt={currentHighlight.title}
                className="card-slide-image"
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
                  {SLIDES.map((_, idx) => (
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

            <button
              type="button"
              className="hero-ctrl-btn"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              <span>{isMuted ? "🔇" : "🔊"}</span>
              <span>{isMuted ? "Unmute" : "Muted"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
