import { useEffect, useRef } from "react";
import "./halloween.css";

const MAX_BATS = 9;
const MAX_EMBERS = 22;

const DriftingBatsEffect = () => {
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

    // Initialize Bat Particles
    const bats = Array.from({ length: MAX_BATS }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.65), // upper 65% of screen
      speedX: -(Math.random() * 1.6 + 0.8), // drift leftwards
      speedY: Math.sin(Math.random() * Math.PI * 2) * 0.4,
      scale: Math.random() * 0.6 + 0.7,
      opacity: Math.random() * 0.4 + 0.4,
      wingAngle: Math.random() * Math.PI * 2,
      wingSpeed: Math.random() * 0.15 + 0.12,
      angle: -0.08,
      wobble: Math.random() * Math.PI * 2,
    }));

    // Initialize Glowing Embers (spooky orange and purple)
    const embers = Array.from({ length: MAX_EMBERS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedY: -(Math.random() * 0.8 + 0.3), // float upwards
      speedX: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      isOrange: Math.random() > 0.4,
    }));

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw and update glowing embers
        for (let i = 0; i < embers.length; i++) {
          const e = embers[i];
          e.pulse += e.pulseSpeed;
          e.y += e.speedY;
          e.x += e.speedX + Math.sin(e.pulse) * 0.3;

          if (e.y < -10) {
            e.y = height + 10;
            e.x = Math.random() * width;
          }
          if (e.x < -10) e.x = width + 10;
          if (e.x > width + 10) e.x = -10;

          const currentOpacity = Math.max(0.1, Math.min(0.8, e.opacity + Math.sin(e.pulse) * 0.25));

          ctx.save();
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.shadowBlur = 6;
          if (e.isOrange) {
            ctx.fillStyle = `rgba(249, 115, 22, ${currentOpacity})`;
            ctx.shadowColor = `rgba(249, 115, 22, 0.6)`;
          } else {
            ctx.fillStyle = `rgba(168, 85, 247, ${currentOpacity})`;
            ctx.shadowColor = `rgba(168, 85, 247, 0.6)`;
          }
          ctx.fill();
          ctx.restore();
        }

        // 2. Draw and update bats
        for (let i = 0; i < bats.length; i++) {
          const b = bats[i];
          b.wingAngle += b.wingSpeed;
          b.wobble += 0.03;
          b.x += b.speedX;
          b.y += Math.sin(b.wobble) * 0.7;

          // Wrap around screen
          if (b.x < -60) {
            b.x = width + 60;
            b.y = Math.random() * (height * 0.65);
          }

          const flapY = Math.sin(b.wingAngle) * 5;

          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.scale(b.scale, b.scale);
          ctx.rotate(b.angle + Math.sin(b.wobble) * 0.08);

          // Deep twilight bat silhouette
          ctx.fillStyle = `rgba(26, 20, 36, ${b.opacity})`;

          // Bat Body
          ctx.beginPath();
          ctx.ellipse(0, 0, 3.5, 6, 0, 0, Math.PI * 2);
          ctx.fill();

          // Bat Head & Ears
          ctx.beginPath();
          ctx.arc(0, -6, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-1.5, -7);
          ctx.lineTo(-3.5, -11);
          ctx.lineTo(0, -8);
          ctx.lineTo(3.5, -11);
          ctx.lineTo(1.5, -7);
          ctx.fill();

          // Left Wing
          ctx.beginPath();
          ctx.moveTo(-1.5, -2);
          ctx.quadraticCurveTo(-11, -13 + flapY, -20, -5 + flapY);
          ctx.quadraticCurveTo(-14, 2 + flapY * 0.5, -9, 2);
          ctx.quadraticCurveTo(-5, 4, 0, 2);
          ctx.closePath();
          ctx.fill();

          // Right Wing
          ctx.beginPath();
          ctx.moveTo(1.5, -2);
          ctx.quadraticCurveTo(11, -13 + flapY, 20, -5 + flapY);
          ctx.quadraticCurveTo(14, 2 + flapY * 0.5, 9, 2);
          ctx.quadraticCurveTo(5, 4, 0, 2);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
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

  return <canvas ref={canvasRef} className="halloween-bats-canvas" aria-hidden="true" />;
};

export default DriftingBatsEffect;
