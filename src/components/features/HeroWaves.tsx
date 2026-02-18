"use client";

import { useEffect, useRef } from "react";

export default function HeroWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Wave configuration
    const waves = [
      {
        // Green / Primary wave
        color: [5, 150, 105], // #059669
        amplitude: 100,
        frequency: 0.006,
        speed: 0.002,
        phase: 0,
        yOffset: 0.48,
        lineCount: 12,
        lineSpacing: 3.5,
      },
      {
        // Neon Rose / Crimson wave
        color: [244, 63, 94], // #f43f5e (Rose-500) - Reddish but neon/pink-tinted, not standard red
        amplitude: 90,
        frequency: 0.007,
        speed: -0.0015,
        phase: 2.0,
        yOffset: 0.52,
        lineCount: 10,
        lineSpacing: 3.2,
      },
      {
        // Dark Blue / Headline dot wave (matches text-blue-700)
        color: [29, 78, 216], // #1d4ed8 (Blue-700)
        amplitude: 75,
        frequency: 0.005,
        speed: 0.001,
        phase: 4.0,
        yOffset: 0.50,
        lineCount: 8,
        lineSpacing: 3.0,
      },
    ];

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);

      const centerX = w * 0.5;
      // Fade zone: how far from center before full opacity
      const fadeRadius = w * 0.25;
      const fullRadius = w * 0.50;

      for (const wave of waves) {
        for (let line = 0; line < wave.lineCount; line++) {
          const lineOffset = (line - wave.lineCount / 2) * wave.lineSpacing;

          ctx.beginPath();

          for (let x = 0; x <= w; x += 2) {
            // Distance from horizontal center, normalized
            const distFromCenter = Math.abs(x - centerX);

            // Opacity: low in center, high at edges
            let edgeFactor: number;
            if (distFromCenter < fadeRadius) {
              edgeFactor = 0.20 + (distFromCenter / fadeRadius) * 0.40;
            } else {
              const t = Math.min((distFromCenter - fadeRadius) / (fullRadius - fadeRadius), 1);
              edgeFactor = 0.60 + t * 0.65;
            }

            // Each line in the bundle slightly different
            const lineVariation = Math.sin(x * 0.003 + line * 0.8 + time * wave.speed * 0.5) * 8;

            const y =
              h * wave.yOffset +
              lineOffset +
              lineVariation +
              Math.sin(x * wave.frequency + time * wave.speed + wave.phase + line * 0.3) *
                wave.amplitude *
                edgeFactor *
                3 +
              Math.sin(x * wave.frequency * 2.3 + time * wave.speed * 1.4 + line * 0.5) *
                wave.amplitude *
                edgeFactor *
                1.2;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          const [r, g, b] = wave.color;
          // Edge opacity for line alpha (center = very faint, edges = visible)
          const baseAlpha = 0.03 + (line / wave.lineCount) * 0.02;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha + 0.06})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      time += 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
