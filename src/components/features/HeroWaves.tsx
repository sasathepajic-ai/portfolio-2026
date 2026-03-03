"use client";

import { useEffect, useRef } from "react";

// Characters: varied symbols and glyphs instead of 0/1
const CHAR_POOL = [
  "#", "%", "&", "@", "$", "~", "^", "*", "?", "!",
  "<", ">", "{", "}", "[", "]", "+", "=", "/", "-",
  "3", "7", "9", "2", "5", "8", "4", "6",
  "F", "C", "X", "Z", "K", "V", "Q", "W",
  "f", "c", "x", "z", "k", "v", "q", "w",
];
const FLIP_FRAMES = ["¦", "|", "ı", "¦", "~", "*"]; // visual "spin" sequence
const GLITCH_POOL = ["|", "¦", "!", "ı", "l", "I", "⌐", "¬"];
// Words that get injected vertically (letter per row) into columns
const WORD_POOL = [
  "REACT", "PYTHON", "NEXTJS", "DOCKER",
  "FASTAPI", "FIGMA", "DESIGN", "UIDEV",
  "AI", "ML", "LLM", "RAG", "GPT",
  "SQL", "AWS", "API", "REST",
  "AUTH", "CRUD", "ORM", "GIT",
  "CSS", "HTML", "UX", "UI",
  "ASYNC", "AGENT",
];

const PALETTES = [
  { r: 0,   g: 204, b: 68  }, // bright primary #00cc44
  { r: 0,   g: 255, b: 65  }, // matrix green #00ff41
  { r: 0,   g: 172, b: 32  }, // medium green
  { r: 0,   g: 120, b: 22  }, // dim green
  { r: 140, g: 255, b: 160 }, // pale phosphor
];

const FONT_SIZE  = 13;
const COL_STRIDE = 15;
const SIDE_FRAC  = 0.26;

interface Char {
  value: string;
  isWordChar: boolean;  // part of a vertical keyword sequence
  isFlipping: boolean;
  flipPhase: number;
  flipSpeed: number;
  flipToValue: string;
  glitchCountdown: number;
  glitchDuration: number;
  glitchValue: string;
  glitching: boolean;
}

interface Column {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: Char[];
  palette: typeof PALETTES[number];
  baseAlpha: number;
}

function makeChar(letter?: string): Char {
  return {
    value: letter ?? CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)],
    isWordChar: !!letter,
    isFlipping: false,
    flipPhase: 0,
    flipSpeed: 0.015 + Math.random() * 0.04,
    flipToValue: "0",
    glitchCountdown: 40 + Math.floor(Math.random() * 200),
    glitchDuration: 0,
    glitchValue: "|",
    glitching: false,
  };
}

function makeColumn(x: number, h: number): Column {
  const length = 8 + Math.floor(Math.random() * 18);
  const chars  = Array.from({ length }, () => makeChar());

  // ~90% chance to inject a vertical word at a random position
  if (Math.random() < 0.90) {
    const word  = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
    const start = Math.floor(Math.random() * Math.max(1, length - word.length));
    for (let wi = 0; wi < word.length && start + wi < length; wi++) {
      chars[start + wi] = makeChar(word[wi]);
    }
  }

  return {
    x,
    y: -Math.random() * h * 1.5,
    speed: 0.1 + Math.random() * 0.35,
    length,
    chars,
    palette: PALETTES[Math.floor(Math.random() * PALETTES.length)],
    baseAlpha: 0.25 + Math.random() * 0.55,
  };
}

export default function HeroWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let columns: Column[] = [];

    const buildColumns = (w: number, h: number) => {
      const sideW = w * SIDE_FRAC;
      columns = [];
      for (let x = COL_STRIDE / 2; x < sideW; x += COL_STRIDE) {
        columns.push(makeColumn(x, h));
      }
      for (let x = w - sideW + COL_STRIDE / 2; x < w; x += COL_STRIDE) {
        columns.push(makeColumn(x, h));
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      buildColumns(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const sideW = w * SIDE_FRAC;

      for (const col of columns) {
        col.y += col.speed;

        if (col.y > h + col.length * FONT_SIZE) {
          col.y        = -col.length * FONT_SIZE - Math.random() * 300;
          col.speed    = 0.1 + Math.random() * 0.35;
          col.palette  = PALETTES[Math.floor(Math.random() * PALETTES.length)];
          col.baseAlpha = 0.25 + Math.random() * 0.55;
          // regenerate chars so each loop has a fresh word roll
          const newLen = 8 + Math.floor(Math.random() * 18);
          col.length = newLen;
          col.chars  = Array.from({ length: newLen }, () => makeChar());
          if (Math.random() < 0.90) {
            const word  = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
            const start = Math.floor(Math.random() * Math.max(1, newLen - word.length));
            for (let wi = 0; wi < word.length && start + wi < newLen; wi++) {
              col.chars[start + wi] = makeChar(word[wi]);
            }
          }
        }

        // Fade columns that are closer to center
        const distFromEdge = col.x < w / 2 ? col.x : w - col.x;
        const fadeStart    = sideW * 0.35;
        const fadeEnd      = sideW * 1.0;
        const edgeFade     = distFromEdge < fadeStart
          ? 1
          : 1 - Math.min((distFromEdge - fadeStart) / (fadeEnd - fadeStart), 1);
        if (edgeFade < 0.01) continue;

        const { r, g, b } = col.palette;

        for (let i = 0; i < col.length; i++) {
          const ch    = col.chars[i];
          const charY = col.y + i * FONT_SIZE;
          if (charY < -FONT_SIZE || charY > h) continue;

          // ── Glitch tick (skip for word chars) ──
          if (!ch.isWordChar) {
          if (ch.glitching) {
            ch.glitchDuration--;
            if (ch.glitchDuration <= 0) {
              ch.glitching       = false;
              ch.glitchCountdown = 60 + Math.floor(Math.random() * 240);
            }
          } else {
            ch.glitchCountdown--;
            if (ch.glitchCountdown <= 0) {
              ch.glitching      = true;
              ch.glitchValue    = GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)];
              ch.glitchDuration = 2 + Math.floor(Math.random() * 6);
            }
          }
          }

          // ── Flip tick (skip for word chars) ──
          if (!ch.isWordChar) {
          if (ch.isFlipping) {
            ch.flipPhase += ch.flipSpeed * 3.5;
            if (ch.flipPhase >= Math.PI) {
              ch.value      = ch.flipToValue;
              ch.flipPhase  = 0;
              ch.isFlipping = false;
            }
          } else if (Math.random() < 0.003) {
            ch.isFlipping  = true;
            ch.flipPhase   = 0;
            ch.flipToValue = CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
          }
          }

          // ── Alpha: head brightest, tail fades ──
          const tailFade  = Math.max(0, 1 - (i / col.length) * 1.1);
          const headBoost = i === 0 ? 1.5 : i === 1 ? 1.1 : 1.0;
          const alpha     = col.baseAlpha * tailFade * headBoost * edgeFade;
          if (alpha < 0.01) continue;

          // ── Displayed char ──
          let display: string;
          if (ch.isWordChar) {
            display = ch.value;
          } else if (ch.glitching) {
            display = ch.glitchValue;
          } else if (ch.isFlipping) {
            const idx = Math.floor((ch.flipPhase / Math.PI) * (FLIP_FRAMES.length - 1));
            display   = FLIP_FRAMES[Math.min(idx, FLIP_FRAMES.length - 1)];
          } else {
            display = ch.value;
          }

          const scaleY = (!ch.isWordChar && ch.isFlipping) ? Math.cos(ch.flipPhase) : 1;

          ctx.save();
          ctx.translate(col.x, charY);
          if (scaleY !== 1) ctx.transform(1, 0, 0, scaleY, 0, 0);

          if (ch.isWordChar) {
            ctx.shadowColor = "rgba(255,255,255,0.6)";
            ctx.shadowBlur  = 6;
          } else if (i < 2) {
            ctx.shadowColor = `rgb(${r},${g},${b})`;
            ctx.shadowBlur  = i === 0 ? 10 : 5;
          }

          ctx.globalAlpha = ch.isWordChar ? Math.min(1, alpha * 1.4) : Math.min(1, alpha);
          ctx.fillStyle   = ch.isWordChar ? "rgb(255,255,255)" : `rgb(${r},${g},${b})`;
          ctx.font        = `${FONT_SIZE}px 'Courier New', monospace`;
          ctx.textAlign   = "center";
          ctx.fillText(display, 0, 0);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
