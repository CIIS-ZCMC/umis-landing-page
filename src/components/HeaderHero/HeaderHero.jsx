import React, { useState } from 'react';
import heroImage1 from '../../assets/slideshow/hero.png';
import heroImage2 from '../../assets/slideshow/hero-bg-1.png';
import heroImage3 from '../../assets/slideshow/lp-bg.jpg';
import heroImage4 from '../../assets/slideshow/hero-bg.png';

const HeaderHero = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slides = [heroImage1, heroImage2, heroImage3, heroImage4];

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
      <div className="container" style={{background:"#0A3E30"}}>
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
                    style={{ display: slideIndex === index + 1 ? 'block' : 'none' }}
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
                  style={{ backgroundColor: slideIndex === index + 1 ? '#0F5721' : 'rgba(15, 87, 33, 0.24)' }}
                ></span>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHero;
