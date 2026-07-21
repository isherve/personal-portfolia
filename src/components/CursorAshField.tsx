import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  rgb: string;
  friction: number;
};

/** Soft teal ashes + cursor burst — same behavior as https://codacre.com/ */
const TEAL_RGB = ["136,254,231", "136,254,231", "136,254,231", "86,246,219"] as const;
const TEAL_RGB_LIGHT = ["15,148,136", "13,148,136", "20,160,145", "45,180,165"] as const;
const MAX_PARTICLES = 140;
const AMBIENT_EVERY_N_FRAMES = 12;

function pickRgb(palette: readonly string[]) {
  return palette[Math.floor(Math.random() * palette.length)];
}

const CursorAshField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const palette = () =>
      document.documentElement.classList.contains("dark") ? TEAL_RGB : TEAL_RGB_LIGHT;

    const spawnAmbient = () => {
      const list = particlesRef.current;
      if (list.length >= MAX_PARTICLES) return;
      list.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 0.82),
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.18 + Math.random() * 0.4),
        life: 0.5 + Math.random() * 0.5,
        decay: 0.003 + Math.random() * 0.0025,
        size: 1.4 + Math.random() * 2,
        rgb: pickRgb(palette()),
        friction: 0.9985,
      });
    };

    for (let i = 0; i < 18; i++) {
      spawnAmbient();
      const last = particlesRef.current[particlesRef.current.length - 1];
      if (last) last.life = Math.random();
    }

    let frame = 0;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      ++frame % AMBIENT_EVERY_N_FRAMES === 0 && spawnAmbient();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const list = particlesRef.current;

      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.life -= p.decay;

        if (p.life <= 0) {
          list.splice(i, 1);
          continue;
        }

        const alpha = p.life * 0.78;
        const radius = Math.max(p.size * Math.sqrt(p.life), 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb},${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMouseMove = (event: MouseEvent) => {
      const list = particlesRef.current;
      const count = Math.min(3, MAX_PARTICLES - list.length);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 2.2;
        list.push({
          x: event.clientX + (Math.random() - 0.5) * 10,
          y: event.clientY + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.75 + Math.random() * 0.25,
          decay: 0.026 + Math.random() * 0.012,
          size: 2.2 + Math.random() * 2.8,
          rgb: pickRgb(palette()),
          friction: 0.895,
        });
      }
      if (list.length > MAX_PARTICLES) {
        list.splice(0, list.length - MAX_PARTICLES);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] h-screen w-screen"
    />
  );
};

export default CursorAshField;
