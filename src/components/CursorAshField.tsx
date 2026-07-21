import { useEffect, useRef } from "react";

type Ash = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  blur: number;
  ambient: boolean;
};

/**
 * Floating teal "ashes" + cursor particle trail (matches soft bokeh look).
 * Non-interactive; respects prefers-reduced-motion.
 */
const CursorAshField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let ashes: Ash[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let lastSpawn = 0;
    let running = true;

    const isDark = () => document.documentElement.classList.contains("dark");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnAmbient = (count: number) => {
      for (let i = 0; i < count; i++) {
        ashes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -0.15 - Math.random() * 0.45,
          size: 2 + Math.random() * 10,
          alpha: 0.12 + Math.random() * 0.35,
          life: 1,
          maxLife: 1,
          blur: 4 + Math.random() * 14,
          ambient: true,
        });
      }
    };

    const spawnTrail = (x: number, y: number) => {
      const n = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        ashes.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.4 - Math.random() * 1.2,
          size: 1.5 + Math.random() * 6,
          alpha: 0.45 + Math.random() * 0.4,
          life: 1,
          maxLife: 0.55 + Math.random() * 0.75,
          blur: 2 + Math.random() * 8,
          ambient: false,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const now = performance.now();
      if (now - lastSpawn > 28) {
        spawnTrail(mouseX, mouseY);
        lastSpawn = now;
      }
    };

    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      const dark = isDark();
      const rgb = dark ? "94, 234, 212" : "15, 148, 136";

      ashes = ashes.filter((a) => {
        a.x += a.vx;
        a.y += a.vy;

        if (a.ambient) {
          a.x += Math.sin(a.y * 0.01) * 0.15;
          if (a.y < -20) a.y = height + 20;
          if (a.x < -20) a.x = width + 20;
          if (a.x > width + 20) a.x = -20;
        } else {
          a.life -= 0.016 / a.maxLife;
          a.vy *= 0.99;
          a.vx *= 0.98;
          if (a.life <= 0) return false;
        }

        const fade = a.ambient ? a.alpha : a.alpha * Math.max(0, a.life);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb}, ${fade})`;
        ctx.shadowColor = `rgba(${rgb}, ${fade * 0.9})`;
        ctx.shadowBlur = a.blur;
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });

      // Soft glow near cursor
      if (mouseX > 0 && mouseY > 0) {
        const g = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 90);
        g.addColorStop(0, `rgba(${rgb}, 0.12)`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 90, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cap particle count for performance
      if (ashes.length > 180) {
        ashes = ashes.slice(ashes.length - 180);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    spawnAmbient(Math.min(48, Math.floor((width * height) / 28000)));
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40] mix-blend-multiply opacity-60 dark:mix-blend-screen dark:opacity-85"
    />
  );
};

export default CursorAshField;
