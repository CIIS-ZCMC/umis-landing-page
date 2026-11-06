import { useEffect, useRef } from "react";
import "./christmas.css";

const MAX_FLAKES = 65;

const SnowfallEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize Snowflake particles
    const flakes = Array.from({ length: MAX_FLAKES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1.2,
      speedY: Math.random() * 1.4 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      opacity: Math.random() * 0.65 + 0.35,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
    }));

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < flakes.length; i++) {
          const f = flakes[i];
          f.swing += f.swingSpeed;
          f.y += f.speedY;
          f.x += f.speedX + Math.sin(f.swing) * 0.5;

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
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="christmas-snow-canvas" aria-hidden="true" />;
};

export default SnowfallEffect;
