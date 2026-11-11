import { useEffect, useRef } from "react";
import "./christmas.css";

const DESKTOP_FLAKES = 60;
const MOBILE_FLAKES = 18;
const MAX_SNOW_TOUCHES = 32;

// Only these 3 specific Hero elements receive physical snow collision & edge accumulation
const TARGET_CONFIGS = [
  { id: "carousel", selector: ".hero-highlights-card", cornerInset: 14, maxDriftWidth: 54 },
  { id: "btn-track-pr", selector: ".hero-btn-primary", cornerInset: 10, maxDriftWidth: 40 },
  { id: "btn-latest-news", selector: ".hero-btn-secondary", cornerInset: 10, maxDriftWidth: 40 },
];

// 4 distinct realistic snow-cap types (vector assets with dripping icicle effects)
const SNOW_CAP_DEFS = [
  { src: "/images/snow-cap-1.svg", w: 100, h: 24, baselineY: 20, hasDrip: false },
  { src: "/images/snow-cap-2.svg", w: 100, h: 36, baselineY: 20, hasDrip: true, dripDepth: 13 },
  { src: "/images/snow-cap-3.svg", w: 100, h: 36, baselineY: 20, hasDrip: true, dripDepth: 12 },
  { src: "/images/snow-cap-4.svg", w: 100, h: 40, baselineY: 20, hasDrip: true, dripDepth: 16 },
];

// Smooth cubic ease-out for settling
const easeOutCubic = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

// Smooth sine ease-in-out for gentle melting
const easeInOutSine = (t) => -(Math.cos(Math.PI * Math.min(Math.max(t, 0), 1)) - 1) / 2;

const SnowfallEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Pre-load the 4 realistic vector snow cap & drip assets
    const snowCapImages = SNOW_CAP_DEFS.map((def) => {
      const img = new Image();
      img.src = def.src;
      return { ...def, img };
    });

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile = width <= 768;

    // Cache element DOM node references
    const targetNodes = TARGET_CONFIGS.map((cfg) => ({
      ...cfg,
      el: null,
    }));

    const updateDOMNodes = () => {
      for (let i = 0; i < targetNodes.length; i++) {
        if (!targetNodes[i].el || !document.body.contains(targetNodes[i].el)) {
          targetNodes[i].el = document.querySelector(targetNodes[i].selector);
        }
      }
    };

    updateDOMNodes();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = width <= 768;
      updateDOMNodes();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Settled snow touches on the top edges of the 3 elements (auto-melts in 7–10 seconds)
    const snowTouches = [];
    // Small contact frost motes
    const touchPuffs = [];

    // Helper to get live visible bounding rects every animation frame for 100% glitch-free scrolling
    const getLiveActiveTargets = () => {
      const active = [];
      for (let i = 0; i < targetNodes.length; i++) {
        const t = targetNodes[i];
        if (!t.el || !document.body.contains(t.el)) {
          t.el = document.querySelector(t.selector);
        }
        if (!t.el) continue;

        const rect = t.el.getBoundingClientRect();
        // Visible in viewport and below the 72px fixed navbar
        if (
          rect.width > 30 &&
          rect.height > 15 &&
          rect.bottom > 72 &&
          rect.top < height - 10
        ) {
          active.push({
            id: t.id,
            rect,
            cornerInset: t.cornerInset,
            maxDriftWidth: t.maxDriftWidth,
          });
        }
      }
      return active;
    };

    const pickSpawnX = (activeTargets) => {
      if (activeTargets.length > 0 && Math.random() < 0.45) {
        const t = activeTargets[Math.floor(Math.random() * activeTargets.length)];
        const minX = t.rect.left + t.cornerInset;
        const maxX = t.rect.right - t.cornerInset;
        if (maxX > minX) {
          return minX + Math.random() * (maxX - minX);
        }
      }
      return Math.random() * width;
    };

    const flakeCount = isMobile ? MOBILE_FLAKES : DESKTOP_FLAKES;

    // Initialize falling snowflake particles
    const initialTargets = getLiveActiveTargets();
    const flakes = Array.from({ length: flakeCount }, (_, idx) => {
      let startX = Math.random() * width;
      let startY = Math.random() * height;

      if (initialTargets.length > 0 && idx < initialTargets.length * 3) {
        const target = initialTargets[idx % initialTargets.length];
        const usableW = Math.max(target.rect.width - target.cornerInset * 2, 20);
        startX = target.rect.left + target.cornerInset + ((idx * 0.31 + 0.15) % 1) * usableW;
        startY = Math.max(target.rect.top - 16 - (idx * 15), 76);
      }

      return {
        x: startX,
        y: startY,
        prevY: startY,
        radius: Math.random() * 2.4 + 1.3,
        speedY: Math.random() * 1.1 + 0.55,
        speedX: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.55 + 0.4,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.008,
      };
    });

    const spawnOrMergeSnowTouch = (target, hitX, now) => {
      const usableW = Math.max(target.rect.width - target.cornerInset * 2, 20);
      const hitOffset = hitX - (target.rect.left + target.cornerInset);
      const offsetRatio = Math.min(Math.max(hitOffset / usableW, 0.04), 0.96);

      // Check for existing touch nearby on the same element to merge into
      for (let i = 0; i < snowTouches.length; i++) {
        const st = snowTouches[i];
        if (
          st.targetId === target.id &&
          Math.abs(st.offsetRatio - offsetRatio) < 0.12 &&
          now - st.bornAt < st.lifetime - 1800
        ) {
          st.baseWidth = Math.min(st.baseWidth + 5.5, target.maxDriftWidth);
          st.offsetRatio = st.offsetRatio * 0.72 + offsetRatio * 0.28;
          st.lifetime = now - st.bornAt + (7000 + Math.random() * 3000);
          return;
        }
      }

      if (snowTouches.length >= MAX_SNOW_TOUCHES) {
        snowTouches.shift();
      }

      const typeIndex = Math.floor(Math.random() * snowCapImages.length);
      const baseWidth =
        target.id === "carousel"
          ? 34 + Math.random() * 22
          : 26 + Math.random() * 16;

      snowTouches.push({
        targetId: target.id,
        offsetRatio, // store proportional ratio so position is frame-perfect on any screen/scroll
        typeIndex,
        bornAt: now,
        // 7 to 10 seconds lifetime as requested
        lifetime: 7000 + Math.random() * 3000,
        morphDuration: 420,
        meltDuration: 2000,
        baseWidth,
        flipX: Math.random() > 0.5 ? -1 : 1,
      });

      if (!isMobile && touchPuffs.length < 16) {
        for (let k = 0; k < 2; k++) {
          touchPuffs.push({
            x: hitX,
            y: target.rect.top,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -(Math.random() * 0.6 + 0.2),
            radius: Math.random() * 1.1 + 0.7,
            bornAt: now,
            duration: 340,
          });
        }
      }
    };

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastFrameTime = 0;
    const render = (timestamp) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      // Cap mobile snow to ~30fps to preserve mobile GPU
      if (isMobile && timestamp - lastFrameTime < 33) {
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      // LIVE frame-synced bounding boxes: eliminates 100% of scroll lag and jitter!
      const activeTargets = getLiveActiveTargets();
      const targetMap = {};
      for (let a = 0; a < activeTargets.length; a++) {
        targetMap[activeTargets[a].id] = activeTargets[a];
      }

      // 1. Falling Snowflakes + Physical Collision
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.prevY = f.y;
        f.swing += f.swingSpeed;
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.swing) * 0.4;

        let collided = false;
        for (let tIdx = 0; tIdx < activeTargets.length; tIdx++) {
          const t = activeTargets[tIdx];
          const edgeY = t.rect.top;
          if (
            f.x >= t.rect.left + t.cornerInset &&
            f.x <= t.rect.right - t.cornerInset &&
            f.prevY + f.radius <= edgeY + 3 &&
            f.y + f.radius >= edgeY - 0.5
          ) {
            spawnOrMergeSnowTouch(t, f.x, timestamp);
            collided = true;
            break;
          }
        }

        if (collided) {
          f.y = -6 - Math.random() * 20;
          f.prevY = f.y;
          f.x = pickSpawnX(activeTargets);
          continue;
        }

        // Wrap around bottom
        if (f.y > height) {
          f.y = -6;
          f.prevY = f.y;
          f.x = pickSpawnX(activeTargets);
        }
        // Wrap around sides
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fill();
      }

      // 2. Draw Settled Snow Touches using Live Synced Rects (Zero Scroll Glitching)
      if (snowTouches.length > 0 && activeTargets.length > 0) {
        for (let i = snowTouches.length - 1; i >= 0; i--) {
          const st = snowTouches[i];
          const age = timestamp - st.bornAt;

          if (age >= st.lifetime) {
            snowTouches.splice(i, 1);
            continue;
          }

          const target = targetMap[st.targetId];
          // If the component is currently scrolled completely off-screen, skip rendering this frame
          if (!target) continue;

          const snowType = snowCapImages[st.typeIndex];
          if (!snowType || !snowType.img.complete) continue;

          const settleProgress = easeOutCubic(age / st.morphDuration);

          const timeRemaining = st.lifetime - age;
          let meltFactor = 1.0;
          if (timeRemaining < st.meltDuration) {
            meltFactor = easeInOutSine(timeRemaining / st.meltDuration);
          }

          const dripStretch = snowType.hasDrip ? (1 - meltFactor) * 2.5 : 0;
          const drawW = st.baseWidth * (0.45 + 0.55 * settleProgress);
          const drawH = (drawW * (snowType.h / snowType.w)) * (0.8 + 0.2 * meltFactor);
          const baselineOnCanvas = (snowType.baselineY / snowType.h) * drawH;

          // Compute exact position from current frame's live rect
          const usableW = Math.max(target.rect.width - target.cornerInset * 2, 20);
          const cx = target.rect.left + target.cornerInset + st.offsetRatio * usableW;
          const edgeY = target.rect.top;
          const currentAlpha = Math.min(settleProgress * 0.96, meltFactor * 0.96);

          ctx.save();
          ctx.globalAlpha = Math.max(currentAlpha, 0);
          ctx.translate(cx, edgeY);
          ctx.scale(st.flipX, 1);

          ctx.drawImage(
            snowType.img,
            -drawW * 0.5,
            -baselineOnCanvas,
            drawW,
            drawH + dripStretch
          );

          ctx.restore();
        }
      }

      // 3. Draw Micro Contact Frost Puffs
      for (let i = touchPuffs.length - 1; i >= 0; i--) {
        const p = touchPuffs[i];
        const age = timestamp - p.bornAt;
        if (age >= p.duration) {
          touchPuffs.splice(i, 1);
          continue;
        }
        const prog = age / p.duration;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        const alpha = (1 - prog) * 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 - prog * 0.25), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="christmas-snow-canvas" aria-hidden="true" />;
};

export default SnowfallEffect;
