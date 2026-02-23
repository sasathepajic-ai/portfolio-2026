"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { type ProjectType } from "@/core/config/schema";
import { X, Globe, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  SiFastapi, SiReact, SiTypescript, SiMysql, SiDocker,
  SiNginx, SiStreamlit, SiLangchain, SiOpenai, SiAnthropic,
  SiPython, SiNextdotjs, SiGit, SiPostgresql, SiTailwindcss,
  SiAmazonwebservices,
} from "react-icons/si";
import type { IconType } from "react-icons";

const TECH_ICONS: Record<string, IconType> = {
  "fastapi":          SiFastapi,
  "react":            SiReact,
  "typescript":       SiTypescript,
  "mysql":            SiMysql,
  "mysql 8":          SiMysql,
  "docker":           SiDocker,
  "nginx":            SiNginx,
  "streamlit":        SiStreamlit,
  "langchain":        SiLangchain,
  "langgraph":        SiLangchain,
  "openai":           SiOpenai,
  "openai gpt":       SiOpenai,
  "anthropic":        SiAnthropic,
  "anthropic claude": SiAnthropic,
  "claude":           SiAnthropic,
  "python":           SiPython,
  "next.js":          SiNextdotjs,
  "git":              SiGit,
  "postgresql":       SiPostgresql,
  "tailwind css":     SiTailwindcss,
  "aws rds":          SiAmazonwebservices,
  "aws bedrock":      SiAmazonwebservices,
};

const TECH_COLORS: Record<string, string> = {
  "fastapi":          "#009688",
  "react":            "#61DAFB",
  "typescript":       "#3178C6",
  "mysql":            "#4479A1",
  "mysql 8":          "#4479A1",
  "docker":           "#2496ED",
  "nginx":            "#009639",
  "streamlit":        "#FF4B4B",
  "langchain":        "#1C3C3C",
  "langgraph":        "#1C3C3C",
  "openai":           "#74AA9C",
  "openai gpt":       "#74AA9C",
  "anthropic":        "#CC785C",
  "anthropic claude": "#CC785C",
  "claude":           "#CC785C",
  "python":           "#3776AB",
  "next.js":          "#E8E8ED",
  "git":              "#F05032",
  "postgresql":       "#4169E1",
  "tailwind css":     "#06B6D4",
  "aws rds":          "#FF9900",
  "aws bedrock":      "#FF9900",
};

function TechIcon({ name }: { name: string }) {
  const Icon = TECH_ICONS[name.toLowerCase()];
  if (!Icon) return null;
  const color = TECH_COLORS[name.toLowerCase()];
  return <Icon className="w-3 h-3 shrink-0" style={color ? { color } : { opacity: 0.6 }} />;
}

interface CaseStudyProps {
  project: ProjectType | null;
  onClose: () => void;
}

function BrowserMockup({ src, alt, url = "ablsafety.com", onExpand }: { src: string; alt?: string; url?: string; onExpand?: () => void }) {
  return (
    <div className="w-full overflow-hidden rounded-xl group/mockup"
         style={{ boxShadow: "0 40px 120px -20px rgba(0,0,0,0.95)" }}>
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#111114] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-3 h-5 rounded-full bg-white/4 border border-white/5 flex items-center px-3 gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
          <span className="text-[9px] text-white/25 font-mono">{url}</span>
        </div>
        {onExpand && (
          <button
            onClick={onExpand}
            className="ml-1 p-1 rounded text-white/20 hover:text-white/60 hover:bg-white/6 transition-all duration-150"
            aria-label="Expand image"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        )}
      </div>
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src={src}
          alt={alt ?? "Screenshot"}
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}

function PhoneMockup({ src, alt, statusBar = true, onExpand }: { src: string; alt?: string; statusBar?: boolean | string; onExpand?: () => void }) {
  return (
    <div
      className="relative rounded-[20px] overflow-hidden border-[3px] border-white/10 bg-[#0a0a0c] w-full group/phone"
      style={{
        aspectRatio: "9/19.5",
        boxShadow: "0 24px 60px -8px rgba(0,0,0,0.95), inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* punch-hole camera */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a1a] z-10 ring-[1.5px] ring-white/8" />
      {/* status bar strip — keeps app navbar below the punch-hole */}
      {statusBar && <div className="absolute top-0 left-0 right-0 h-[7%] z-5" style={{ backgroundColor: typeof statusBar === "string" ? statusBar : "#f1f3f5" }} />}
      <Image
        src={src}
        alt={alt ?? "Mobile screenshot"}
        fill
        className="object-cover object-top"
        sizes="200px"
        priority
      />
      {onExpand && (
        <button
          onClick={onExpand}
          className="absolute bottom-2 right-2 z-20 p-1 rounded bg-black/40 text-white/30 opacity-0 group-hover/phone:opacity-100 hover:text-white/80 hover:bg-black/60 transition-all duration-150"
          aria-label="Expand image"
        >
          <Maximize2 className="w-2.5 h-2.5" />
        </button>
      )}
    </div>
  );
}

const NUM_RE = /(\d[\d,.]*(?:\s*[x]\s*\d+)?(?:\s*(?:ms|s|K|M|%|,000))*\+?)/g;
function highlight(str: string) {
  return str.replace(NUM_RE, '<strong class="text-white/85 font-semibold">$1</strong>');
}

const KEYWORDS = [
  "S.A.F.E.T.Y.™", "PS Pulse™", "FastAPI", "React", "TypeScript",
  "MySQL", "Docker", "Nginx", "LiteLLM", "Alembic", "Tekmatix",
  "Server-Sent Events", "HMAC", "JWT", "CRM", "VPS",
  "SQLModel", "SQLAlchemy", "React Router", "Mantine",
].sort((a, b) => b.length - a.length);

const KW_RE = new RegExp(
  KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "g"
);
function highlightKeywords(str: string) {
  return str.replace(KW_RE, '<span class="text-white/85 font-medium">$&</span>');
}

function enrich(str: string) {
  return highlightKeywords(highlight(str));
}

function splitParagraphs(text: string): string[] {
  return text.split('\n\n').filter(Boolean);
}
export default function CaseStudy({ project, onClose }: CaseStudyProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Build flat gallery from hero + all section images in order
  const gallery: { src: string; label: string; mobile?: boolean; statusBarColor?: string }[] = [];
  if (project) {
    const heroDesktop = project.images?.find((i) => i.type === "desktop");
    const heroMobile = project.images?.find((i) => i.type === "mobile");
    if (heroDesktop) gallery.push({ src: heroDesktop.src, label: "Hero" });
    if (heroMobile) gallery.push({ src: heroMobile.src, label: "Hero mobile", mobile: true, statusBarColor: "rgb(248, 249, 250)" });
    project.sections?.forEach((s) => {
      if (s.image) gallery.push({ src: s.image, label: s.title });
      if (s.mobileImage) gallery.push({ src: s.mobileImage, label: `${s.title} mobile`, mobile: true });
    });
  }

  const openLightbox = (src: string) => {
    const idx = gallery.findIndex((g) => g.src === src);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) closeLightbox();
        else onClose();
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      }
    };
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, lightboxIndex]);

  const desktops = project?.images?.filter((i) => i.type === "desktop") ?? [];
  const mobileHero = project?.images?.find((i) => i.type === "mobile");
  const [hero] = desktops;
  const currentLightbox = lightboxIndex !== null ? gallery[lightboxIndex] : null;

  return (
    <>
    <AnimatePresence>
      {project && (
        <motion.div
          key="cs-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-9999 bg-[#030304] overflow-y-auto overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          {/*  Nav bar  */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-12 lg:px-20 h-14 bg-[#030304]/95 backdrop-blur-md border-b border-white/4">
            <div />
            <span className="text-[10px] font-mono text-secondary/25 uppercase tracking-[0.2em]">Case Study</span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-secondary/40 hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/*  Content  */}
          <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">

            {/* Title block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="pt-14 pb-10"
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {project.dateRange && (
                  <span className="text-[11px] font-mono text-secondary/35 uppercase tracking-widest">{project.dateRange}</span>
                )}
                {project.client && (
                  <>
                    <span className="text-white/10">·</span>
                    <span className="text-[11px] font-mono text-accent/55 uppercase tracking-widest">{project.client}</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-3">
                {project.title}
              </h1>
              <p className="text-primary/60 font-mono text-sm mb-8">{project.subtitle}</p>

              <p className="text-secondary/85 leading-relaxed text-base max-w-2xl mb-6">
                {project.description}
              </p>
              {project.demoUrl && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-secondary/40 uppercase tracking-[0.15em]">Live site</span>
                  <span className="text-secondary/20">—</span>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary/80 hover:text-primary text-sm font-mono underline underline-offset-4 decoration-primary/30 hover:decoration-primary/70 transition-all duration-200"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    {new URL(project.demoUrl!).hostname.replace(/^www\./, "")}
                  </a>
                </div>
              )}
            </motion.div>

          </div>

          <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">

          {/*  Hero screenshot + optional phone  */}
          {hero && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={`pb-4 relative${mobileHero ? " pr-[15%] pb-[7%]" : ""}`}
            >
              <BrowserMockup src={hero.src} alt={hero.alt} onExpand={() => openLightbox(hero.src)} />
              {mobileHero && (
                <div className="absolute bottom-4 right-0 w-[22%]">
                  <PhoneMockup src={mobileHero.src} alt={mobileHero.alt} statusBar="rgb(248, 249, 250)" onExpand={() => openLightbox(mobileHero.src)} />
                </div>
              )}
            </motion.div>
          )}

            {/*  Challenge / Solution  */}
            {(project.challenge || project.solution) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="py-14 border-t border-white/4 space-y-12"
              >
                {project.challenge && (
                  <div>
                    <p className="text-[11px] font-mono text-accent/80 uppercase tracking-[0.2em] mb-4">The Challenge</p>
                    <div className="space-y-4 max-w-2xl">
                      {splitParagraphs(project.challenge).map((para, i) => (
                        <p key={i} className="text-secondary/85 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: enrich(para) }} />
                      ))}
                    </div>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <p className="text-[11px] font-mono text-primary/80 uppercase tracking-[0.2em] mb-4">The Solution</p>
                    <div className="space-y-4 max-w-2xl">
                      {splitParagraphs(project.solution).map((para, i) => (
                        <p key={i} className="text-secondary/85 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: enrich(para) }} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/*  Narrative sections  */}
            {project.sections && project.sections.length > 0 && (
              <div className="border-t border-white/4 pt-14 space-y-10 pb-4">
                {project.sections.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    {/* text + title annotation */}
                    <div className="grid sm:grid-cols-[1fr_140px] gap-6 sm:gap-12">
                      <div className="space-y-4">
                        {splitParagraphs(section.body).map((para, j) => (
                          <p key={j} className="text-secondary/80 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: enrich(para) }} />
                        ))}
                      </div>
                      <div className="sm:text-right order-first sm:order-last">
                        <h3 className="text-[11px] font-mono text-foreground/40 uppercase tracking-[0.15em] leading-snug">{section.title}</h3>
                      </div>
                    </div>
                    {/* mockup — full width, outside the grid */}
                    {(section.image || section.mobileImage) && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={`relative${section.mobileImage ? " pr-[15%] pb-[7%]" : ""}`}>
                          {section.image && (
                            <BrowserMockup src={section.image} alt={section.title} onExpand={() => openLightbox(section.image!)} />
                          )}
                          {section.mobileImage && (
                            <div className="absolute bottom-4 right-0 w-[22%]">
                              <PhoneMockup src={section.mobileImage} alt={`${section.title} mobile`} onExpand={() => openLightbox(section.mobileImage!)} />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

          </div>

          <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">

            {/*  Stack  */}
            <div className="py-14 border-t border-white/4 mb-8">
              <p className="text-[10px] font-mono text-primary/50 uppercase tracking-[0.22em] mb-6">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/3 border border-white/8 text-xs text-secondary/55 font-mono hover:text-secondary/85 hover:border-white/16 transition-all duration-200"
                  >
                    <TechIcon name={tech} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* Lightbox / Gallery */}
      <AnimatePresence>
        {currentLightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-99999 bg-black/98 flex items-center justify-center p-4 sm:p-6 cursor-none"
            onClick={closeLightbox}
            onMouseMove={(e) => {
              if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
              }
            }}
          >
            {/* Inverted cursor */}
            <div
              ref={cursorRef}
              className="pointer-events-none fixed z-99999 w-6 h-6 rounded-full bg-white top-0 left-0"
              style={{ mixBlendMode: "difference", willChange: "transform" }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close + label */}
              <div className="absolute -top-10 left-0 right-0 flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                  {currentLightbox.label} · {(lightboxIndex ?? 0) + 1} / {gallery.length}
                </span>
                <button onClick={closeLightbox} className="text-white/40 hover:text-white transition-colors cursor-none" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image */}
              <div className={`flex justify-center${currentLightbox.mobile ? " items-center" : ""}`}>
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    aspectRatio: currentLightbox.mobile ? "9/19.5" : "16/9",
                    width: currentLightbox.mobile ? "min(380px, 60vh)" : "100%",
                  }}
                >
                <Image
                  src={currentLightbox.src}
                  alt={currentLightbox.label}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                  priority
                />
                {currentLightbox.mobile && (
                  <div className="absolute top-0 left-0 right-0 h-[7%] z-10" style={{ backgroundColor: currentLightbox.statusBarColor ?? "#f1f3f5" }} />
                )}
                </div>
              </div>
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-none"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-none"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {gallery.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-5">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                      className={`w-1.5 h-1.5 rounded-full transition-all cursor-none ${
                        i === lightboxIndex ? "bg-white/70 scale-125" : "bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
