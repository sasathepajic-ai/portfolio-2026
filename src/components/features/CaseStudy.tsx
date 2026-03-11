"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const TECH_VERSIONS: Record<string, string> = {
  "fastapi":          "0.110.x",
  "react":            "18.x",
  "typescript":       "5.x",
  "mysql":            "8.x",
  "mysql 8":          "8.x",
  "docker":           "26.x",
  "nginx":            "1.26.x",
  "streamlit":        "1.x",
  "langchain":        "0.2.x",
  "langgraph":        "0.2.x",
  "openai":           "gpt-4o",
  "openai gpt":       "gpt-4o",
  "anthropic":        "claude-3.5",
  "anthropic claude": "claude-3.5",
  "claude":           "claude-3.5",
  "python":           "3.12.x",
  "next.js":          "15.x",
  "git":              "2.x",
  "postgresql":       "16.x",
  "tailwind css":     "4.x",
  "aws rds":          "—",
  "aws bedrock":      "—",
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

interface CaseStudyProps {
  project: ProjectType | null;
  onClose: () => void;
}

function BrowserMockup({ src, alt, url = "ablsafety.com", onExpand }: { src: string; alt?: string; url?: string; onExpand?: () => void }) {
  return (
    <div className="w-full overflow-hidden group/mockup border border-primary/15 hover:border-primary/25 transition-colors">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-surface border-b border-primary/12">
        <div className="flex-1 mx-3 h-5 border border-primary/10 bg-primary/3 flex items-center px-3 gap-2">
          <span className="text-[9px] text-primary/45 font-mono">&gt; {url}</span>
        </div>
        {onExpand && (
          <button
            onClick={onExpand}
            className="ml-1 w-7 h-7 flex items-center justify-center text-[#1a0800] bg-mondrian-yellow hover:opacity-85 transition-all duration-150 shrink-0"
            aria-label="Expand image"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        )}
      </div>
      <div className="w-full">
        <Image
          src={src}
          alt={alt ?? "Screenshot"}
          width={1440}
          height={1080}
          className="w-full h-auto"
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
      className="relative overflow-hidden border border-primary/20 bg-surface w-full group/phone"
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
          className="absolute bottom-2 right-2 z-20 w-7 h-7 flex items-center justify-center bg-mondrian-yellow text-[#1a0800] opacity-0 group-hover/phone:opacity-100 hover:opacity-85 transition-all duration-150"
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
  return str.replace(NUM_RE, '<strong class="text-foreground/95 font-semibold">$1</strong>');
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
  return str.replace(KW_RE, '<span class="text-foreground/95 font-medium">$&</span>');
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
  const touchStartX = useRef<number | null>(null);
  const [isTouch] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : true
  );

  const gallery: { src: string; label: string; mobile?: boolean; statusBarColor?: string }[] = [];
  if (project) {
    const heroDesktop = project.images?.find((i) => i.type === "desktop");
    const heroMobile  = project.images?.find((i) => i.type === "mobile");
    if (heroDesktop) gallery.push({ src: heroDesktop.src, label: "Hero" });
    if (heroMobile)  gallery.push({ src: heroMobile.src, label: "Hero mobile", mobile: true, statusBarColor: "rgb(248, 249, 250)" });
    project.sections?.forEach((s) => {
      if (s.image)       gallery.push({ src: s.image,       label: s.title });
      if (s.mobileImage) gallery.push({ src: s.mobileImage, label: `${s.title} mobile`, mobile: true });
    });
  }

  const openLightbox  = (src: string) => { const idx = gallery.findIndex((g) => g.src === src); setLightboxIndex(idx >= 0 ? idx : 0); };
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage     = useCallback(() => setLightboxIndex((i) => i === null ? null : (i - 1 + gallery.length) % gallery.length), [gallery.length]);
  const nextImage     = useCallback(() => setLightboxIndex((i) => i === null ? null : (i + 1) % gallery.length), [gallery.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (lightboxIndex !== null) closeLightbox(); else onClose(); }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft")  prevImage();
        if (e.key === "ArrowRight") nextImage();
      }
    };
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = prev; };
  }, [onClose, lightboxIndex, nextImage, prevImage]);

  const desktops   = project?.images?.filter((i) => i.type === "desktop") ?? [];
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
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-9999 bg-background overflow-hidden flex flex-col"
          onWheel={(e) => e.stopPropagation()}
        >

          {/* ── Terminal title bar ── */}
          <div className="shrink-0 flex items-center gap-4 px-6 sm:px-10 h-11 bg-surface border-b border-primary/15">
            {/* filename */}
            <span className="text-[10px] font-mono text-foreground/45 tracking-[0.12em] truncate">
              ~/projects/{project.title.toLowerCase().replace(/ /g, "-")}/README.md
            </span>
            <span className="ml-auto text-[9px] font-mono text-primary/35 tracking-widest uppercase shrink-0">
              less +G
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 text-secondary/35 hover:text-foreground/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            {/* LEFT: text content */}
            <div className="lg:w-[52%] overflow-y-auto overscroll-contain">
              <div className="px-6 sm:px-10 pb-24">

            {/* File header bannerline */}
            <div className="pt-10 pb-2 border-b border-primary/8 mb-10">
              <div className="text-[9px] font-mono text-secondary/35 tracking-widest mb-6">
                {`# ${project.title.toUpperCase().replace(/ /g, "_")} — README.md`}
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold uppercase tracking-wide leading-none text-foreground/90 mb-4"
                style={{ fontSize: "clamp(1.7rem, 3.8vw, 3.2rem)" }}
              >
                {project.title}
              </motion.h1>

              {/* Subtitle */}
              {project.subtitle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.4 }}
                  className="flex items-start gap-2 mb-6"
                >
                  <span className="font-mono text-primary/40 text-sm -mt-0.5 shrink-0">›</span>
                  <p className="text-xs font-mono text-primary/55 tracking-[0.08em] leading-relaxed">{project.subtitle}</p>
                </motion.div>
              )}

              {/* Metadata table */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.4 }}
                className="border border-primary/12 divide-y divide-primary/8 mb-8"
              >
                {project.dateRange && (
                  <div className="grid grid-cols-[6rem_1fr] text-[10px] font-mono">
                    <span className="px-3 py-2 text-secondary/50 border-r border-primary/10 bg-primary/2 shrink-0">DATE</span>
                    <span className="px-3 py-2 text-foreground/60">{project.dateRange}</span>
                  </div>
                )}
                {project.client && (
                  <div className="grid grid-cols-[6rem_1fr] text-[10px] font-mono">
                    <span className="px-3 py-2 text-secondary/50 border-r border-primary/10 bg-primary/2 shrink-0">CLIENT</span>
                    <span className="px-3 py-2 text-foreground/60">{project.client}</span>
                  </div>
                )}
                {project.demoUrl && (
                  <div className="grid grid-cols-[6rem_1fr] text-[10px] font-mono">
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
              </motion.div>
            </div>

            {/* Problem → Insight → Solution → Outcome grid */}
            {(project.problem || project.outcome) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-2"
              >
                {[
                  { label: "Problem",  text: project.problem,  accent: "border-accent/20 bg-accent/3" },
                  { label: "Insight",  text: project.insight,  accent: "border-primary/12 bg-primary/2" },
                  { label: "Solution", text: project.solution, accent: "border-primary/12 bg-primary/2" },
                  { label: "Outcome",  text: project.outcome,  accent: "border-primary/20 bg-primary/3" },
                ].filter(s => s.text).map((step) => (
                  <div key={step.label} className={`border p-4 ${step.accent}`}>
                    <span className="text-[9px] font-mono text-primary/45 tracking-widest uppercase block mb-2">{step.label}</span>
                    <p className="text-xs text-foreground/65 leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono text-primary/40 tracking-widest">##</span>
                  <span className="text-[10px] font-mono text-foreground/45 tracking-[0.2em] uppercase">Highlights</span>
                </div>
                <div className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 border border-primary/8 px-4 py-3 bg-primary/1.5">
                      <span className="text-[9px] font-mono text-primary/35 tabular-nums shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-xs text-foreground/65 leading-relaxed" dangerouslySetInnerHTML={{ __html: enrich(h) }} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}


            {(project.challenge || project.solution) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-14 space-y-10"
              >
                {project.challenge && (
                  <div className="border-l-2 border-accent/30 pl-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-mono text-accent/60 tracking-widest">##</span>
                      <span className="text-[10px] font-mono text-accent/60 tracking-[0.2em] uppercase">CHALLENGE</span>
                    </div>
                    <div className="space-y-4">
                      {splitParagraphs(project.challenge).map((para, i) => (
                        <p key={i} className="text-foreground/60 leading-relaxed text-sm font-mono" dangerouslySetInnerHTML={{ __html: enrich(para) }} />
                      ))}
                    </div>
                  </div>
                )}
                {project.solution && (
                  <div className="border-l-2 border-primary/30 pl-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-mono text-primary/60 tracking-widest">##</span>
                      <span className="text-[10px] font-mono text-primary/60 tracking-[0.2em] uppercase">SOLUTION</span>
                    </div>
                    <div className="space-y-4">
                      {splitParagraphs(project.solution).map((para, i) => (
                        <p key={i} className="text-foreground/60 leading-relaxed text-sm font-mono" dangerouslySetInnerHTML={{ __html: enrich(para) }} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Narrative sections */}
            {project.sections && project.sections.length > 0 && (
              <div className="space-y-16 mb-14">
                {project.sections.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-l-2 border-primary/15 pl-6"
                  >
                    {/* Section label */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-mono text-primary/45 tracking-widest">##</span>
                      <span className="text-[10px] font-mono text-foreground/50 tracking-[0.18em] uppercase">
                        {section.title.replace(/ /g, "_")}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="space-y-4 mb-8">
                      {splitParagraphs(section.body).map((para, j) => (
                        <p key={j} className="text-secondary/80 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: enrich(para) }} />
                      ))}
                    </div>


                  </motion.div>
                ))}
              </div>
            )}

            {/* ## GALLERY — visible only on mobile (no right panel on small screens) */}
            {gallery.length > 0 && (
              <div className="lg:hidden mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono text-primary/40 tracking-widest">##</span>
                  <span className="text-[10px] font-mono text-foreground/45 tracking-[0.2em] uppercase">GALLERY</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory">
                  {gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className="shrink-0 snap-start border border-primary/15 overflow-hidden hover:border-primary/35 transition-colors"
                      style={{
                        width: item.mobile ? 72 : 160,
                        aspectRatio: item.mobile ? "9/19.5" : "16/9",
                      }}
                    >
                      <Image
                        src={item.src}
                        alt={item.label}
                        width={item.mobile ? 72 : 160}
                        height={item.mobile ? 156 : 90}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ## TECH_STACK */}
            <div className="pt-10 border-t border-primary/10 mb-16">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-primary/40 tracking-widest">##</span>
                <span className="text-[10px] font-mono text-foreground/45 tracking-[0.2em] uppercase">TECH_STACK</span>
              </div>
              {/* requirements.txt filename */}
              <div className="text-[9px] font-mono text-secondary/35 mb-4 tracking-widest">requirements.txt</div>
              <div className="border border-primary/10 bg-surface/40 divide-y divide-primary/6">
                {project.techStack.map((tech, i) => {
                  const key = tech.toLowerCase();
                  const Icon = TECH_ICONS[key];
                  const color = TECH_COLORS[key];
                  const ver = TECH_VERSIONS[key] ?? "latest";
                  const pkg = tech.toLowerCase().replace(/ /g, "-");
                  return (
                    <div key={tech} className="flex items-center gap-0 font-mono text-[11px] group hover:bg-primary/2.5 transition-colors">
                      {/* line number */}
                      <span className="w-8 text-right pr-3 text-secondary/25 text-[9px] tabular-nums shrink-0 select-none border-r border-primary/6 py-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* icon */}
                      <span className="px-3 py-2 shrink-0">
                        {Icon
                          ? <Icon className="w-3 h-3" style={{ color, opacity: 0.65 }} />
                          : <span className="w-3 h-3 inline-block" />
                        }
                      </span>
                      {/* package==version */}
                      <span className="py-2 flex-1 min-w-0">
                        <span className="text-foreground/70 group-hover:text-foreground/90 transition-colors">{pkg}</span>
                        <span className="text-primary/30">{ver !== "—" ? "==" : ""}</span>
                        <span className="text-primary/55">{ver !== "—" ? ver : ""}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

              </div>{/* end left inner */}
            </div>{/* end left column */}

            {/* RIGHT: image navigation panel */}
            <div className="hidden lg:flex lg:w-[48%] flex-col overflow-y-auto overscroll-contain border-l border-primary/8">
              <div className="px-6 py-8 space-y-10">
                {hero && (
                  <div>
                    <p className="text-[9px] font-mono text-secondary/40 tracking-[0.18em] uppercase mb-3">Hero</p>
                    <div className={`relative${mobileHero ? " pr-[18%] pb-[10%]" : ""}`}>
                      <BrowserMockup
                        src={hero.src}
                        alt={hero.alt}
                        url={project.demoUrl ? new URL(project.demoUrl).hostname.replace(/^www\./, "") : "ablsafety.com"}
                        onExpand={() => openLightbox(hero.src)}
                      />
                      {mobileHero && (
                        <div className="absolute bottom-0 right-0 w-[22%]">
                          <PhoneMockup src={mobileHero.src} alt={mobileHero.alt} statusBar="rgb(248, 249, 250)" onExpand={() => openLightbox(mobileHero.src)} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {project.sections?.map((section, i) => (section.image || section.mobileImage) && (
                  <div key={i}>
                    <p className="text-[9px] font-mono text-secondary/40 tracking-[0.18em] uppercase mb-3">{section.title}</p>
                    <div className={`relative${section.mobileImage ? " pr-[18%] pb-[10%]" : ""}`}>
                      {section.image && (
                        <BrowserMockup
                          src={section.image}
                          alt={section.title}
                          url={project.demoUrl ? new URL(project.demoUrl).hostname.replace(/^www\./, "") : "ablsafety.com"}
                          onExpand={() => openLightbox(section.image!)}
                        />
                      )}
                      {section.mobileImage && (
                        <div className="absolute bottom-0 right-0 w-[22%]">
                          <PhoneMockup src={section.mobileImage} alt={`${section.title} mobile`} onExpand={() => openLightbox(section.mobileImage!)} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>{/* end flex row body */}

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
          className={`fixed inset-0 z-99999 bg-background/98 flex items-center justify-center p-4 sm:p-6${isTouch ? "" : " cursor-none"}`}
          onClick={closeLightbox}
          onMouseMove={(e) => { if (!isTouch && cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`; }}
        >
          {!isTouch && <div ref={cursorRef} className="pointer-events-none fixed z-99999 w-6 h-6 rounded-full bg-white top-0 left-0" style={{ mixBlendMode: "difference", willChange: "transform" }} />}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-7xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 40) { if (diff > 0) nextImage(); else prevImage(); }
              touchStartX.current = null;
            }}
          >
            <div className="absolute -top-10 left-0 right-0 flex items-center justify-between">
              <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em]">
                {currentLightbox.label} · {(lightboxIndex ?? 0) + 1} / {gallery.length}
              </span>
              <button onClick={closeLightbox} className={`text-foreground/40 hover:text-foreground transition-colors${isTouch ? "" : " cursor-none"}`} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className={`flex justify-center${currentLightbox.mobile ? " items-center" : ""}`}>
              <div
                className="relative overflow-hidden border border-primary/15"
                style={{ aspectRatio: currentLightbox.mobile ? "9/19.5" : "16/9", width: currentLightbox.mobile ? "min(380px, 60vh)" : "100%" }}
              >
                <Image src={currentLightbox.src} alt={currentLightbox.label} fill className="object-cover object-top" sizes="100vw" priority />
                {currentLightbox.mobile && (
                  <div className="absolute top-0 left-0 right-0 h-[7%] z-10" style={{ backgroundColor: currentLightbox.statusBarColor ?? "#f1f3f5" }} />
                )}
              </div>
            </div>
            {gallery.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className={`absolute left-2 xl:left-0 top-1/2 -translate-y-1/2 xl:-translate-x-14 p-2.5 xl:p-2 rounded-full bg-background/60 border border-foreground/15 text-foreground/60 hover:text-foreground hover:bg-background/80 transition-all z-10${isTouch ? "" : " cursor-none"}`} aria-label="Previous">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className={`absolute right-2 xl:right-0 top-1/2 -translate-y-1/2 xl:translate-x-14 p-2.5 xl:p-2 rounded-full bg-background/60 border border-foreground/15 text-foreground/60 hover:text-foreground hover:bg-background/80 transition-all z-10${isTouch ? "" : " cursor-none"}`} aria-label="Next">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            {gallery.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-5">
                {gallery.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${isTouch ? "" : "cursor-none "}${i === lightboxIndex ? "bg-foreground/70 scale-125" : "bg-foreground/20 hover:bg-foreground/45"}`}
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
