import { useEffect, useRef } from "react";
import "./nightmare.css";

const MAX_FLAKES = 45;
const MAX_BATS = 6;
const MAX_MOTES = 15;

const NightmareSpookySnowEffect = () => {
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

    // 1. Gothic Snowflakes (drifting downward with sway)
    const flakes = Array.from({ length: MAX_FLAKES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 1,
      speedY: Math.random() * 1.3 + 0.6,
      speedX: Math.random() * 0.7 - 0.35,
      opacity: Math.random() * 0.6 + 0.3,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
      isCyan: Math.random() > 0.6,
    }));

    // 2. Fluttering Gothic Bats
    const bats = Array.from({ length: MAX_BATS }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.6),
      speedX: -(Math.random() * 1.8 + 1),
      scale: Math.random() * 0.5 + 0.7,
      opacity: Math.random() * 0.35 + 0.45,
      wingAngle: Math.random() * Math.PI * 2,
      wingSpeed: Math.random() * 0.16 + 0.12,
      wobble: Math.random() * Math.PI * 2,
    }));

    // 3. Eerie Moonlight Motes (soft floating green/purple embers)
    const motes = Array.from({ length: MAX_MOTES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: Math.random() * 0.4 - 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      isGreen: Math.random() > 0.5,
    }));

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw glowing motes
        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];
          m.pulse += m.pulseSpeed;
          m.y += m.speedY;
          m.x += m.speedX;

          if (m.y < -10) {
            m.y = height + 10;
            m.x = Math.random() * width;
          }
          if (m.x < -10) m.x = width + 10;
          if (m.x > width + 10) m.x = -10;

          const op = Math.max(0.15, Math.min(0.75, 0.4 + Math.sin(m.pulse) * 0.3));

          ctx.save();
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
          ctx.shadowBlur = 8;
          if (m.isGreen) {
            ctx.fillStyle = `rgba(74, 222, 128, ${op})`;
            ctx.shadowColor = "rgba(74, 222, 128, 0.8)";
          } else {
            ctx.fillStyle = `rgba(168, 85, 247, ${op})`;
            ctx.shadowColor = "rgba(168, 85, 247, 0.8)";
          }
          ctx.fill();
          ctx.restore();
        }

        // 2. Draw gothic snowflakes
        for (let i = 0; i < flakes.length; i++) {
          const f = flakes[i];
          f.swing += f.swingSpeed;
          f.y += f.speedY;
          f.x += f.speedX + Math.sin(f.swing) * 0.5;

          if (f.y > height) {
            f.y = -5;
            f.x = Math.random() * width;
          }
          if (f.x > width) f.x = 0;
          if (f.x < 0) f.x = width;

          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          if (f.isCyan) {
            ctx.fillStyle = `rgba(186, 230, 253, ${f.opacity})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
          }
          ctx.fill();
        }

        // 3. Draw fluttering bats
        for (let i = 0; i < bats.length; i++) {
          const b = bats[i];
          b.wingAngle += b.wingSpeed;
          b.wobble += 0.035;
          b.x += b.speedX;
          b.y += Math.sin(b.wobble) * 0.6;

          if (b.x < -60) {
            b.x = width + 60;
            b.y = Math.random() * (height * 0.6);
          }

          const flapY = Math.sin(b.wingAngle) * 5;

          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.scale(b.scale, b.scale);
          ctx.rotate(-0.06 + Math.sin(b.wobble) * 0.08);

          ctx.fillStyle = `rgba(24, 18, 36, ${b.opacity})`;

          // Body
          ctx.beginPath();
          ctx.ellipse(0, 0, 3.5, 6, 0, 0, Math.PI * 2);
          ctx.fill();

          // Head & Ears
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

  return <canvas ref={canvasRef} className="nightmare-canvas" aria-hidden="true" />;
};

export default NightmareSpookySnowEffect;
