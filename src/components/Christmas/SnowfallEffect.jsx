import { useEffect, useRef } from "react";
import "./christmas.css";

const DESKTOP_FLAKES = 55;
const MOBILE_FLAKES = 16;

const SnowfallEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile = width <= 768;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = width <= 768;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const flakeCount = isMobile ? MOBILE_FLAKES : DESKTOP_FLAKES;

    // Initialize Snowflake particles
    const flakes = Array.from({ length: flakeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.6 + 1.2,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.6 + 0.35,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.008,
    }));

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Pause canvas repaints during active mobile touch-scrolling for 60fps scroll smoothness
    let isScrolling = false;
    let scrollTimeout = null;
    const handleScroll = () => {
      if (!isMobile) return;
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let lastFrameTime = 0;
    const render = (timestamp) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible || isScrolling) return;

      // Cap mobile snow to ~30fps to save mobile GPU & battery
      if (isMobile && timestamp - lastFrameTime < 33) {
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.swing += f.swingSpeed;
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.swing) * 0.4;

        // Wrap around bottom
        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        // Wrap around sides
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="christmas-snow-canvas" aria-hidden="true" />;
};

export default SnowfallEffect;
