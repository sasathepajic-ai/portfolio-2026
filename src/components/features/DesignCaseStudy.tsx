"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type ProjectType } from "@/core/config/schema";
import { X, Globe, Sun, Moon, Expand } from "lucide-react";

/* ──────────────────────────────────────────────────────
   Content — Pragmatic Labs AI Website Case Study
   (hardcoded per project id; extend as needed)
────────────────────────────────────────────────────── */
interface Section {
  heading: string;
  subsections?: { heading?: string; body: string; code?: string }[];
  body?: string;
}

const CASE_STUDY_SECTIONS: Section[] = [
  {
    heading: "Overview",
    subsections: [
      {
        body: `**Project:** Marketing website for Pragmatic Labs AI
**URL:** [pragmaticlabs.ai](https://pragmatic-labs-ai-website.vercel.app/)
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion
**Role:** Full-stack design & development`,
      },
    ],
  },
  {
    heading: "The Challenge",
    body: `Pragmatic Labs AI offers AI consulting services — assistants, workflow automation, business intelligence, and strategy — to mid-sized businesses. The challenge wasn't building a generic agency site. It was communicating a specific kind of credibility: technically rigorous, but approachable enough that non-technical buyers would immediately trust and engage with the work.

The site needed to feel sharp and considered without relying on the vague visual language that dominates "AI company" design — no generic gradient blobs, no overused neural-network grid patterns. The design had to earn attention by being specific.

Three goals shaped every decision:

1. **Make the value immediately legible.** A visitor should understand what the company does and why it matters within the first five seconds — without a wall of text.
2. **Use motion purposefully.** Animation should add clarity and weight, not decorate an otherwise flat layout.
3. **Hold up technically.** The site would be seen by technical decision-makers who'd look at the source. It needed to reflect the same standard as the work itself.`,
  },
  {
    heading: "Design Direction",
    body: `The visual identity started with a deliberate departure from cold, sterile "tech blue" palettes. The base is a warm off-white (#f9f8f5) with subtle paper-like undertones, paired with a deep charcoal-black (#0a0c10) for text and a single, strong accent — a muted terracotta red (#cc493c). The system also carries a muted slate blue used for secondary text and supporting UI.

This pairing communicates precision without coldness. The warmth prevents the site from reading as generic SaaS; the typographic tightness (letter-spacing down to −0.038em on display headings, line-heights as low as 1.06) keeps it feeling high-craft.

All color, typography, shadow, and radius values are defined as CSS custom properties in a single design-tokens.css file. Tailwind v4's @theme inline layer bridges those tokens into utility classes so nothing is ever hardcoded twice — a color change in the token file propagates everywhere without touching a component.

Dark mode is implemented via a .dark class strategy on the <html> element, re-declaring every token at a darker scale in the same file. Components never branch on theme — they read tokens and the tokens do the work.`,
  },
  {
    heading: "The 3D Atom Hero",
    body: `The most significant technical piece is the animated background on the homepage — a 3D atom visualization rendered entirely on an HTML <canvas> element, without WebGL.`,
    subsections: [
      {
        heading: "Why custom canvas?",
        body: `Off-the-shelf WebGL libraries would have pulled in significant bundle weight for something that amounts to a subtle background element. The visual needed to be lightweight, instantly readable, and deferrable — conditions where a raw Canvas 2D renderer with requestAnimationFrame was the right call.`,
      },
      {
        heading: "Orbital geometry",
        body: `The atom has six orbital rings arranged as a regular hexagon in 3D space. Each ring shares the same inclination (62°, chosen to give clear elliptical depth without collapsing to a line), and they're spaced evenly by π/N around the Y axis.

All rings rotate at the same speed, so the whole structure spins as a rigid body rather than a chaotic cloud. One electron per ring orbits at a fixed speed, with each electron's starting phase offset to distribute them evenly.`,
        code: `const ORBITS = Array.from({ length: ORBIT_COUNT }, (_, k) => ({
  radiusFrac:  0.38,
  inclination: Math.PI / 2.9,
  lonBase:     k * (Math.PI / ORBIT_COUNT),
  lonSpeed:    0.032,
  elSpeed:     0.45,
  electrons: [{ phase: k * (2 * Math.PI / ORBIT_COUNT), r: 2.2 }],
  lineOpacity: 0.11,
}));`,
      },
      {
        heading: "Perspective projection",
        body: `A custom project() function handles the 3D-to-2D math: a point at angle θ on a ring is first placed in the ring's local plane, then rotated around X by the inclination, then rotated around Y for the current longitude, then perspective-divided against a field-of-view scalar.`,
        code: `function project(theta, radius, inclination, longitude, cx, cy, fov) {
  const x0 = radius * Math.cos(theta);
  const y0 = radius * Math.sin(theta);
  const y1 =  y0 * Math.cos(inclination);
  const z1 =  y0 * Math.sin(inclination);
  const x2 =  x0 * Math.cos(longitude) + z1 * Math.sin(longitude);
  const z2 = -x0 * Math.sin(longitude) + z1 * Math.cos(longitude);
  const p  = fov / (fov + z2 * 0.35);
  return [cx + x2 * p, cy + y1 * p, z2];
}`,
      },
      {
        heading: "Per-segment fading",
        body: `Rather than drawing each orbital ring as a single stroke, the ring is subdivided into 100 segments per frame. Each segment is alpha-faded based on its distance from the canvas center — segments near the center fade out, segments near the outer edge fade in. This uses a smoothstep curve (frac² × (3 − 2 × frac)) rather than a linear falloff, producing a soft and natural vignette where the rings seem to emerge from darkness toward the viewer.`,
      },
      {
        heading: "Scroll-speed interaction",
        body: `Scrolling the page applies a speed impulse to the animation. The impulse is proportional to the pixel delta per scroll event, capped at 8×. A passive scroll listener accumulates the impulse; the frame loop decays that value back toward 1× with a half-life of about 0.6 seconds using exponential decay. The result is that scrolling "spins up" the atom, and it gracefully slows when the user stops.`,
        code: `function onScroll() {
  const dy = Math.abs(window.scrollY - lastScrollY.current);
  const impulse = Math.min(dy * 0.08, 7.0);
  speedRef.current = Math.min(speedRef.current + impulse, 8.0);
}

// In frame():
speedRef.current = 1 + (speedRef.current - 1) * Math.exp(-dt * 1.15);`,
      },
      {
        heading: "Theme awareness",
        body: `The atom reads the active color palette in each frame by checking whether the <html> element carries the .dark class. This is monitored by a MutationObserver that updates a local dark flag when the class changes. No rerenders, no state — the canvas just draws with the right colors in the next frame.`,
      },
    ],
  },
  {
    heading: "Animation System",
    body: `Every section transition uses Framer Motion FadeIn and StaggerContainer / StaggerItem components built in-house. The components are thin wrappers around motion.div with whileInView + viewport: { once: true } — content animates in once when it enters the viewport and stays visible, rather than animating repeatedly on scroll. Delays stagger list items by 0.08s increments.

The homepage headline carries an animated SVG underline under "real work" — a motion.path that draws itself via pathLength on mount while also applying a subtle organic wave animation that keeps it alive after the initial draw.`,
  },
  {
    heading: "Architecture",
    body: `The site uses Next.js 16's App Router. Each route has a layout-level page.tsx that handles metadata and a separate *Content.tsx client component that owns the interactive UI. This separation keeps route files clean and allows metadata to be server-rendered while animations remain client-side.

Solution detail pages (/solutions/[slug]) are statically generated at build time from a typed SOLUTION_DETAILS record — no database, no API, no runtime fetching. Page-level metadata is generated from the same data structure via a shared seo.ts utility.

All theming, typography, and spacing decisions flow from the design-token file outward. No hardcoded colors appear in component files.`,
  },
  {
    heading: "Performance",
    body: `The Canvas animation is the most CPU-intensive piece. It cleans up fully on component unmount — cancelAnimationFrame, removeEventListener, and ResizeObserver / MutationObserver disconnect calls are all handled in the useEffect cleanup.

Device pixel ratio is capped at 2× to avoid excess pixel fill on high-DPI screens. The canvas is aria-hidden and pointer-events-none — it's decorative, incurs no accessibility cost, and never intercepts user interaction. Framer Motion animations use viewport: { once: true }, so the browser isn't tracking scroll position for animation on every element throughout the session.`,
  },
  {
    heading: "Outcome",
    body: `The site launched as the public face of Pragmatic Labs AI. It communicates a specific positioning — practical, rigorous, human — through both its copy and its design. The technical implementation reflects the same standards the company holds itself to in the AI systems it builds for clients: nothing unnecessarily complex, no dependencies pulled in without a reason, and performance treated as a feature rather than an afterthought.`,
  },
];

/* ──────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────── */
function renderBody(text: string) {
  // Very lightweight inline markdown: **bold** and inline backticks
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="text-foreground/90 font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i} className="text-primary/80 bg-primary/8 px-1 py-0.5 text-[11px] font-mono rounded-sm">{part.slice(1, -1)}</code>;
    return <span key={i}>{part}</span>;
  });
}

function parseBody(text: string) {
  return text.split("\n\n").filter(Boolean).map((para, i) => {
    // Numbered list
    if (/^\d+\.\s/.test(para)) {
      const items = para.split(/\n(?=\d+\.\s)/).filter(Boolean);
      return (
        <ol key={i} className="space-y-2.5 pl-1 list-none">
          {items.map((item, j) => {
            const match = item.match(/^(\d+)\.\s+([\s\S]*)$/);
            if (!match) return <li key={j}>{renderBody(item)}</li>;
            return (
              <li key={j} className="flex gap-3 items-baseline">
                <span className="text-[10px] font-mono text-primary/50 shrink-0 tabular-nums">{match[1]}.</span>
                <span className="text-secondary/80 text-sm leading-relaxed">{renderBody(match[2])}</span>
              </li>
            );
          })}
        </ol>
      );
    }
    return (
      <p key={i} className="text-secondary/80 text-sm leading-relaxed">
        {renderBody(para)}
      </p>
    );
  });
}

/* ──────────────────────────────────────────────────────
   Full-image scrollable overlay (mobile expand target)
────────────────────────────────────────────────────── */
function FullImageOverlay({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-99999 bg-background/97 flex flex-col"
    >
      {/* toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary/15 shrink-0">
        <span className="text-[10px] font-mono text-secondary/50 tracking-widest uppercase">Full screenshot</span>
        <button
          onClick={onClose}
          className="text-foreground/40 hover:text-foreground transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* scrollable image */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────
   Main component
────────────────────────────────────────────────────── */
interface DesignCaseStudyProps {
  project: ProjectType | null;
  onClose: () => void;
}

export default function DesignCaseStudy({ project, onClose }: DesignCaseStudyProps) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const activeImage = darkTheme ? project?.darkImage : project?.lightImage;

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullImageOpen) setFullImageOpen(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = prev; };
  }, [project, onClose, fullImageOpen]);

  if (!project) return null;

  const hasBothThemes = !!(project.lightImage && project.darkImage);

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            key="design-cs-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-9999 bg-background overflow-hidden flex flex-col"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* ── Title bar ── */}
            <div className="flex items-center gap-4 px-6 sm:px-10 h-11 bg-surface border-b border-primary/15 shrink-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={onClose} aria-label="Close" className="w-3 h-3 rounded-full bg-accent/55 hover:bg-accent transition-colors" />
                <span className="w-3 h-3 rounded-full bg-primary/15" />
                <span className="w-3 h-3 rounded-full bg-primary/30" />
              </div>
              <span className="text-[10px] font-mono text-foreground/40 tracking-[0.12em] truncate">
                ~/design/{project.title.toLowerCase().replace(/ /g, "-")}/case-study.md
              </span>
              <div className="ml-auto flex items-center gap-3 shrink-0">
                <button onClick={onClose} aria-label="Close" className="text-secondary/35 hover:text-foreground/70 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

              {/* ────────────────────────────────
                  LEFT: text content
              ──────────────────────────────── */}
              <div className="lg:w-[52%] overflow-y-auto overscroll-contain">
                <div className="px-6 sm:px-10 py-10 pb-24 max-w-2xl">

                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10"
                  >
                    <div className="text-[9px] font-mono text-secondary/35 tracking-widest mb-4 uppercase">
                      # CASE_STUDY — DESIGN
                    </div>
                    <h1 className="font-display font-bold uppercase tracking-wide leading-none text-foreground/90 mb-3"
                      style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}>
                      {project.title}
                    </h1>
                    {project.subtitle && (
                      <p className="text-[11px] font-mono text-primary/50 tracking-[0.08em] leading-relaxed mb-6">
                        {project.subtitle}
                      </p>
                    )}

                    {/* Meta table */}
                    <div className="border border-primary/12 divide-y divide-primary/8 max-w-xs">
                      {project.dateRange && (
                        <div className="grid grid-cols-[5.5rem_1fr] text-[10px] font-mono">
                          <span className="px-3 py-2 text-secondary/50 border-r border-primary/10 bg-primary/2 shrink-0">DATE</span>
                          <span className="px-3 py-2 text-foreground/60">{project.dateRange}</span>
                        </div>
                      )}
                      {project.demoUrl && (
                        <div className="grid grid-cols-[5.5rem_1fr] text-[10px] font-mono">
                          <span className="px-3 py-2 text-secondary/50 border-r border-primary/10 bg-primary/2 shrink-0">URL</span>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-2 text-primary/65 hover:text-primary underline underline-offset-4 decoration-primary/20 hover:decoration-primary/60 transition-all inline-flex items-center gap-1.5"
                          >
                            <Globe className="w-3 h-3 shrink-0" />
                            {new URL(project.demoUrl).hostname.replace(/^www\./, "")}
                          </a>
                        </div>
                      )}
                      <div className="grid grid-cols-[5.5rem_1fr] text-[10px] font-mono">
                        <span className="px-3 py-2 text-secondary/50 border-r border-primary/10 bg-primary/2 shrink-0">STACK</span>
                        <span className="px-3 py-2 text-foreground/60 leading-relaxed">{project.techStack.join(" · ")}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Mobile-only image preview */}
                  <MobileImagePreview
                    src={activeImage}
                    alt={`${project.title} screenshot`}
                    onExpand={() => setFullImageOpen(true)}
                    hasBothThemes={hasBothThemes}
                    darkTheme={darkTheme}
                    onToggleTheme={() => setDarkTheme((d) => !d)}
                  />

                  {/* Case study sections */}
                  <div className="space-y-10">
                    {CASE_STUDY_SECTIONS.map((section, si) => (
                      <motion.div
                        key={si}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + si * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="border-l-2 border-primary/15 pl-5"
                      >
                        {/* Section heading */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[10px] font-mono text-primary/45 tracking-widest select-none">##</span>
                          <span className="text-[10px] font-mono text-foreground/50 tracking-[0.18em] uppercase">
                            {section.heading.replace(/ /g, "_")}
                          </span>
                        </div>

                        {/* Optional top-level body */}
                        {section.body && (
                          <div className="space-y-3 mb-5">
                            {parseBody(section.body)}
                          </div>
                        )}

                        {/* Subsections */}
                        {section.subsections && section.subsections.length > 0 && (
                          <div className="space-y-6 mt-4">
                            {section.subsections.map((sub, sj) => (
                              <div key={sj} className="space-y-3">
                                {sub.heading && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-mono text-secondary/40 tracking-widest select-none">###</span>
                                    <span className="text-[10px] font-mono text-secondary/55 tracking-[0.14em] uppercase">
                                      {sub.heading.replace(/ /g, "_")}
                                    </span>
                                  </div>
                                )}
                                <div className="space-y-2.5">
                                  {parseBody(sub.body)}
                                </div>
                                {sub.code && (
                                  <pre className="overflow-x-auto bg-surface border border-primary/15 p-4 text-[11px] font-mono text-primary/65 leading-relaxed mt-3">
                                    <code>{sub.code}</code>
                                  </pre>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Highlights footer */}
                  {project.highlights && project.highlights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="mt-14 pt-10 border-t border-primary/10"
                    >
                      <div className="flex items-center gap-2 mb-5">
                        <span className="text-[10px] font-mono text-primary/40 tracking-widest">##</span>
                        <span className="text-[10px] font-mono text-foreground/45 tracking-[0.2em] uppercase">KEY_DETAILS</span>
                      </div>
                      <div className="space-y-3">
                        {project.highlights.map((h, hi) => (
                          <div key={hi} className="grid grid-cols-[2.5rem_1fr] gap-2 items-baseline">
                            <span className="text-[10px] font-mono text-primary/40 tabular-nums text-right">
                              {String(hi + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs font-mono text-foreground/65 leading-relaxed">{h}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* ────────────────────────────────
                  RIGHT: sticky full screenshot (desktop only)
              ──────────────────────────────── */}
              <div
                ref={rightPanelRef}
                className="hidden lg:flex lg:flex-col lg:w-[48%] border-l border-primary/10 overflow-y-auto overscroll-contain bg-surface/20 relative"
              >
                {/* Sticky theme toggle inside panel */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-surface/90 border-b border-primary/10 backdrop-blur-sm">
                  <span className="text-[9px] font-mono text-secondary/45 tracking-widest uppercase">
                    {darkTheme ? "Dark theme" : "Light theme"}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[10px] font-mono text-primary/55 hover:text-primary border border-primary/20 hover:border-primary/40 px-2.5 py-1 transition-all"
                      >
                        <Globe className="w-3 h-3" />
                        <span>Live site</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Full-height screenshot */}
                {activeImage && (
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeImage}
                      alt={`${project.title} — ${darkTheme ? "dark" : "light"} theme`}
                      className="w-full h-auto block"
                      loading="eager"
                    />
                  </motion.div>
                )}

                {/* Thumbnail row for switching themes */}
                {hasBothThemes && (
                  <div className="sticky bottom-0 z-10 flex gap-2 px-5 py-3 bg-surface/90 border-t border-primary/10 backdrop-blur-sm">
                    <ThemeThumbnail
                      src={project.darkImage!}
                      label="Dark"
                      active={darkTheme}
                      onClick={() => setDarkTheme(true)}
                    />
                    <ThemeThumbnail
                      src={project.lightImage!}
                      label="Light"
                      active={!darkTheme}
                      onClick={() => setDarkTheme(false)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ── Vim-style status bar ── */}
            <div className="flex items-center gap-6 px-6 h-8 bg-primary/10 border-t border-primary/20 shrink-0">
              <span className="text-[9px] font-mono text-primary/60 tracking-widest">case-study.md</span>
              <span className="text-[9px] font-mono text-secondary/40 tracking-widest ml-auto">{project.techStack.length} deps</span>
              <span className="text-[9px] font-mono text-secondary/35 tracking-widest">q :quit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-image overlay (mobile expand) */}
      <AnimatePresence>
        {fullImageOpen && activeImage && (
          <FullImageOverlay
            key="full-img"
            src={activeImage}
            alt={`${project?.title ?? "Screenshot"} — full page`}
            onClose={() => setFullImageOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ──────────────────────────────────────────────────────
   Mobile image preview (cropped to first 1080px of height)
────────────────────────────────────────────────────── */
function MobileImagePreview({
  src,
  alt,
  onExpand,
  hasBothThemes,
  darkTheme,
  onToggleTheme,
}: {
  src?: string;
  alt: string;
  onExpand: () => void;
  hasBothThemes?: boolean;
  darkTheme?: boolean;
  onToggleTheme?: () => void;
}) {
  if (!src) return null;

  return (
    <div className="lg:hidden mb-8">
      {/* Cropped preview — shows top portion at 1440×1080 (4:3) ratio */}
      <div className="relative w-full overflow-hidden border border-primary/15" style={{ aspectRatio: "1440 / 1080" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Fade-out gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-background, #000200))" }} />
      </div>
      {/* Controls row */}
      <div className="mt-2 flex items-center gap-2">
        {hasBothThemes && onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 text-[11px] font-mono text-secondary/55 hover:text-foreground/75 border border-primary/20 hover:border-primary/35 px-3 py-1.5 transition-all active:scale-95"
            aria-label="Toggle theme"
          >
            {darkTheme
              ? <><Moon className="w-3 h-3" /><span>Dark</span></>
              : <><Sun className="w-3 h-3" /><span>Light</span></>
            }
          </button>
        )}
        <button
          onClick={onExpand}
          className="flex items-center gap-2 text-[11px] font-mono text-primary/60 hover:text-primary border border-primary/20 hover:border-primary/40 px-4 py-1.5 transition-all active:scale-95 flex-1 justify-center"
          aria-label="View full screenshot"
        >
          <Expand className="w-3.5 h-3.5" />
          View full screenshot
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   Theme thumbnail button (desktop bottom bar)
────────────────────────────────────────────────────── */
function ThemeThumbnail({
  src,
  label,
  active,
  onClick,
}: {
  src: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-1.5 border transition-all ${
        active
          ? "border-primary/50 bg-primary/8 text-primary/80"
          : "border-primary/20 text-secondary/50 hover:border-primary/35 hover:text-foreground/60"
      }`}
    >
      <div className="w-10 h-6 overflow-hidden border border-primary/20 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="w-full h-auto block object-top" style={{ objectPosition: "top" }} />
      </div>
      <span className="text-[9px] font-mono tracking-widest uppercase">{label}</span>
    </button>
  );
}
