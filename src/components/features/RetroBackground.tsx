"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../shared/ThemeProvider";

// ─── Theme palettes ───────────────────────────────────────────────────────────
const DARK = {
  gridLine: "rgba(76, 125, 255, 0.07)",
  gridLineFar: "rgba(0, 255, 198, 0.04)",
  particle: "rgba(0, 255, 198, 0.55)",
  particleFar: "rgba(76, 125, 255, 0.35)",
  uiStroke: "rgba(0, 255, 198, 0.12)",
  scanline: "rgba(0, 0, 0, 0.18)",
  circuit: "rgba(0, 255, 198, 0.08)",
  star: "rgba(0, 255, 198, 0.6)",
  starFar: "rgba(76, 125, 255, 0.4)",
};

const LIGHT = {
  gridLine: "rgba(60, 60, 55, 0.18)",
  gridLineFar: "rgba(58, 127, 93, 0.13)",
  particle: "rgba(30, 90, 60, 0.65)",
  particleFar: "rgba(90, 80, 60, 0.55)",
  uiStroke: "rgba(30, 90, 60, 0.32)",
  scanline: "rgba(0, 0, 0, 0.045)",
  circuit: "rgba(30, 90, 60, 0.28)",
  star: "rgba(30, 90, 60, 0.75)",
  starFar: "rgba(90, 80, 60, 0.65)",
};


// ─── Utility ─────────────────────────────────────────────────────────────────
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max));

// ─── Type definitions ─────────────────────────────────────────────────────────
interface Star { x: number; y: number; r: number; dx: number; dy: number; alpha: number; dAlpha: number; far: boolean }
interface CircuitNode { x: number; y: number; len: number; dir: number; alpha: number; dAlpha: number; done: boolean; progress: number; speed: number }
interface Particle { x: number; y: number; r: number; dx: number; dy: number; alpha: number; dAlpha: number; color: string }

// ─── Main canvas component ───────────────────────────────────────────────────
export default function RetroBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);

  // keep theme ref in sync so draw loop doesn't need to close over stale value
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    // ── State ───────────────────────────────────────────────────────────────
    let stars: Star[] = [];
    let circuitNodes: CircuitNode[] = [];
    let particles: Particle[] = [];
    let gridOffsetX = 0;
    let gridOffsetY = 0;

    function palette() { return themeRef.current === "light" ? LIGHT : DARK; }

    // ── Builders ────────────────────────────────────────────────────────────
    function buildStars(w: number, h: number) {
      stars = Array.from({ length: 60 }, () => ({
        x: rand(0, w), y: rand(0, h),
        r: rand(0.5, 2),
        dx: rand(-0.12, 0.12), dy: rand(-0.06, 0.06),
        alpha: rand(0.35, 0.85),
        dAlpha: rand(0.003, 0.010) * (Math.random() > 0.5 ? 1 : -1),
        far: Math.random() > 0.5,
      }));
    }

    function buildCircuitNodes(w: number, h: number) {
      circuitNodes = Array.from({ length: 8 }, () => ({
        x: rand(0, w), y: rand(50, h - 50),
        len: rand(40, 120),
        dir: randInt(0, 4), // 0=R 1=D 2=L 3=U
        alpha: rand(0.15, 0.32),
        dAlpha: 0,
        done: false,
        progress: 0,
        speed: rand(0.003, 0.009),
      }));
    }

    function buildParticles(w: number, h: number) {
      particles = Array.from({ length: 18 }, () => {
        const dark = themeRef.current !== "light";
        return {
          x: rand(0, w), y: rand(0, h),
          r: rand(1, 2.5),
          dx: rand(-0.15, 0.15), dy: rand(-0.10, 0.10),
          alpha: rand(0.2, 0.55),
          dAlpha: rand(0.004, 0.011) * (Math.random() > 0.5 ? 1 : -1),
          color: Math.random() > 0.5
            ? (dark ? DARK.particle : LIGHT.particle)
            : (dark ? DARK.particleFar : LIGHT.particleFar),
        };
      });
    }

    function init(w: number, h: number) {
      buildStars(w, h);
      buildCircuitNodes(w, h);
      buildParticles(w, h);
    }

    // ── Resize ──────────────────────────────────────────────────────────────
    function resize() {
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W;
      canvas!.height = H;
      init(W, H);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Draw helpers ─────────────────────────────────────────────────────────
    function drawFarGrid(pal: typeof DARK) {
      // Very subtle far grid — drifts slowly
      const spX = 48, spY = 48;
      const ox = (gridOffsetX * 0.18) % spX;
      const oy = (gridOffsetY * 0.12) % spY;

      ctx!.save();
      ctx!.strokeStyle = pal.gridLineFar;
      ctx!.lineWidth = 0.5;
      ctx!.beginPath();
      for (let x = -spX + ox; x < W + spX; x += spX) {
        ctx!.moveTo(x, 0); ctx!.lineTo(x, H);
      }
      for (let y = -spY + oy; y < H + spY; y += spY) {
        ctx!.moveTo(0, y); ctx!.lineTo(W, y);
      }
      ctx!.stroke();
      ctx!.restore();
    }

    function drawMidGrid(pal: typeof DARK) {
      // Slightly denser mid grid — moves a bit faster
      const spX = 24, spY = 24;
      const ox = (gridOffsetX * 0.35) % spX;
      const oy = (gridOffsetY * 0.25) % spY;

      ctx!.save();
      ctx!.strokeStyle = pal.gridLine;
      ctx!.lineWidth = 0.4;
      ctx!.beginPath();
      for (let x = -spX + ox; x < W + spX; x += spX) {
        ctx!.moveTo(x, 0); ctx!.lineTo(x, H);
      }
      for (let y = -spY + oy; y < H + spY; y += spY) {
        ctx!.moveTo(0, y); ctx!.lineTo(W, y);
      }
      ctx!.stroke();
      ctx!.restore();
    }

    function drawStars(pal: typeof DARK) {
      for (const s of stars) {
        // drift
        s.x += s.dx; s.y += s.dy;
        s.alpha += s.dAlpha;
        if (s.alpha > 0.92 || s.alpha < 0.08) s.dAlpha *= -1;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;

        const color = s.far ? pal.starFar : pal.star;
        ctx!.save();
        ctx!.globalAlpha = s.alpha;
        ctx!.fillStyle = color;
        ctx!.fillRect(Math.round(s.x), Math.round(s.y), s.r > 1.5 ? 2 : 1, s.r > 1.5 ? 2 : 1);
        ctx!.restore();
      }
    }

    function drawCircuitLines(pal: typeof DARK) {
      for (const n of circuitNodes) {
        if (!n.done) { n.progress = Math.min(1, n.progress + n.speed); }
        if (n.progress >= 1) {
          n.done = true;
          // restart after random delay
          if (Math.random() < 0.004) {
            n.x = rand(0, W); n.y = rand(50, H - 50);
            n.len = rand(40, 120);
            n.dir = randInt(0, 4);
            n.progress = 0; n.done = false;
            n.speed = rand(0.003, 0.009);
          }
        }

        const len = n.len * n.progress;
        const ex = n.dir === 0 ? n.x + len : n.dir === 2 ? n.x - len : n.x;
        const ey = n.dir === 1 ? n.y + len : n.dir === 3 ? n.y - len : n.y;

        ctx!.save();
        ctx!.globalAlpha = n.alpha;
        ctx!.strokeStyle = pal.circuit;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(Math.round(n.x), Math.round(n.y));
        ctx!.lineTo(Math.round(ex), Math.round(ey));
        ctx!.stroke();

        // Node dot at endpoints
        ctx!.fillStyle = pal.circuit;
        ctx!.fillRect(Math.round(n.x) - 1, Math.round(n.y) - 1, 2, 2);
        if (n.done) ctx!.fillRect(Math.round(ex) - 1, Math.round(ey) - 1, 2, 2);
        ctx!.restore();
      }
    }

    function drawScanlines(pal: typeof DARK) {
      // Horizontal scanlines — faint banded texture
      ctx!.save();
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = pal.scanline;
      for (let y = 0; y < H; y += 4) {
        ctx!.fillRect(0, y, W, 1);
      }
      ctx!.restore();
    }

    function drawParticles() {
      for (const p of particles) {
        p.x += p.dx; p.y += p.dy;
        p.alpha += p.dAlpha;
        if (p.alpha > 0.72 || p.alpha < 0.08) p.dAlpha *= -1;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx!.save();
        ctx!.globalAlpha = p.alpha;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(Math.round(p.x), Math.round(p.y), 2, 2);
        ctx!.restore();
      }
    }

    // ── Main render loop ────────────────────────────────────────────────────
    function draw() {
      if (!ctx || !canvas) return;
      const pal = palette();

      // Drift grid offsets
      gridOffsetX += 0.25;
      gridOffsetY += 0.15;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // ── Layer 0: far background — grid + stars ──────────────────────
      drawFarGrid(pal);
      drawStars(pal);

      // ── Layer 1: mid — circuit lines ────────────────────────────────
      drawMidGrid(pal);
      drawCircuitLines(pal);

      // ── Layer 3: particles ────────────────────────────────────────────
      drawParticles();

      // ── Layer 4: scanlines ────────────────────────────────────────────
      drawScanlines(pal);

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="retro-bg-canvas"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}
