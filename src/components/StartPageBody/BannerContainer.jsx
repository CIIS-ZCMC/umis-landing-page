import { useState, useEffect } from "react";
import ihomp_pgs_scoreboard from "../../assets/banner/IHOMP PGS Scoreboard.png";
import iisu_pgs_scoreboard from "../../assets/banner/IISU PGS Scoreboard.png";

const banners = [
  { src: ihomp_pgs_scoreboard, alt: "IHOMP PGS Scoreboard" },
  { src: iisu_pgs_scoreboard, alt: "IISU PGS Scoreboard" },
];

const BannerContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container-xl">
      <div className="banner-carousel">
        {banners.map((banner, index) => (
          <img
            key={index}
            className={`banner-image ${index === currentIndex ? "active" : ""}`}
            src={banner.src}
            alt={banner.alt}
          />
        ))}
        <div className="banner-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`banner-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;
