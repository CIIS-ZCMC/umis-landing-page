import { useState } from "react";
import heroImage1 from "../../assets/slideshow/hero.png";
import heroImage2 from "../../assets/slideshow/hero-bg.png";
import heroImage3 from "../../assets/slideshow/lp-bg.jpg";
import BackgroundVideo from "../BackgroundVideo/BackgroundVideo";

const HeaderHero = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [viewMode, setViewMode] = useState("video"); // 'video' | 'gallery'
  const slides = [heroImage1, heroImage2, heroImage3];

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
    <div className="header-hero">
      <div className="container" style={{ background: "#0A3E30", position: "relative" }}>
        {/* View Switcher: Live Video Tour vs Photos Gallery */}
        <div className="hero-view-switcher" role="tablist" aria-label="Hero media switcher">
          <button
            type="button"
            className={`hero-switcher-tab ${viewMode === "video" ? "active" : ""}`}
            onClick={() => setViewMode("video")}
            aria-selected={viewMode === "video"}
          >
            <span>🎥</span> Tower 1 Tour
          </button>
          <button
            type="button"
            className={`hero-switcher-tab ${viewMode === "gallery" ? "active" : ""}`}
            onClick={() => setViewMode("gallery")}
            aria-selected={viewMode === "gallery"}
          >
            <span>🖼️</span> Gallery
          </button>
        </div>

        {viewMode === "video" ? (
          <BackgroundVideo
            mp4Src="/videos/short-tower-1.mp4"
            movSrc="/videos/short-tower-1.mov"
            badgeText="🏢 ZCMC Tower 1 Showcase"
          >
            <h2 className="hero-video-heading">Zamboanga City Medical Center</h2>
            <p className="hero-video-subheading">
              Dedicated to delivering compassionate, modern, and accessible healthcare services for the region.
            </p>
          </BackgroundVideo>
        ) : (
          <div className="slideshow-container">
            <div className="slideshow-bg">
              <div className="slideshow-content">
                <a className="prev" onClick={() => plusSlides(-1)}>
                  &#10094;
                </a>
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
                <a className="next" onClick={() => plusSlides(1)}>
                  &#10095;
                </a>
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
        )}
      </div>
    </div>
  );
};

export default HeaderHero;
