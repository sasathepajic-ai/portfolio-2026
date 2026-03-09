"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { type ProjectType } from "@/core/config/schema";
import CaseStudy from "./CaseStudy";
import DesignCaseStudy from "./DesignCaseStudy";
import { Globe, ExternalLink } from "lucide-react";

interface ProjectsProps {
  title: string;
  subtitle?: string;
  sectionLabel?: string;
  sectionId?: string;
  items: ProjectType[];
}

export default function ProjectsScroll({ title, sectionLabel = "02", sectionId, items }: ProjectsProps) {
  const [selected, setSelected] = useState<ProjectType | null>(null);
  const featured = items[0];

  const isDesign = sectionId === "design" || featured?.caseStudyType === "design";

  // ── Design section rendering ──────────────────────
  if (isDesign) {
    return (
      <>
        <section className="border-b border-primary/10">
          <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-5 border-b border-primary/8 bg-surface/50">
            <span className="text-primary/50 font-mono text-[11px]">$</span>
            <span className="text-[11px] font-mono text-foreground/65 tracking-widest">
              ls ./design/{featured?.title.toLowerCase().replace(/ /g, "-")}/
            </span>
            <span className="ml-auto text-[9px] font-mono text-secondary/45 uppercase tracking-[0.15em]">
              {`// ${sectionLabel} / ${title.toUpperCase()}`}
            </span>
          </div>

          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 sm:px-12 lg:px-16 py-10 sm:py-14 border-b border-primary/6 last:border-b-0"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl">

                {/* Left: info */}
                <div className="lg:w-[42%] flex flex-col justify-between gap-8">
                  <div>
                    {/* Header */}
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-sm font-mono text-primary/30 shrink-0">#</span>
                      <h2 className="font-display font-bold uppercase tracking-wide leading-none text-foreground/85 whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}>
                        {item.title}
                      </h2>
                    </div>
                    {item.subtitle && (
                      <div className="flex items-start gap-3 mt-2 mb-5 pl-1">
                        <span className="font-mono text-primary/45 text-sm relative top-0.5 shrink-0">›</span>
                        <p className="text-[11px] font-mono text-primary/50 tracking-[0.08em] leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                    )}

                    {/* Meta */}
                    <div className="border border-primary/12 divide-y divide-primary/8 mb-6 max-w-xs">
                      {item.dateRange && (
                        <div className="grid grid-cols-[5.5rem_1fr] text-[10px] font-mono">
                          <span className="px-3 py-2 text-secondary/55 border-r border-primary/10 bg-primary/2">DATE</span>
                          <span className="px-3 py-2 text-foreground/70">{item.dateRange}</span>
                        </div>
                      )}
                      {item.demoUrl && (
                        <div className="grid grid-cols-[5.5rem_1fr] text-[10px] font-mono">
                          <span className="px-3 py-2 text-secondary/55 border-r border-primary/10 bg-primary/2">URL</span>
                          <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-2 text-primary/65 hover:text-primary inline-flex items-center gap-1.5 min-w-0"
                          >
                            <Globe className="w-3 h-3 shrink-0" />
                            <span className="truncate">{new URL(item.demoUrl).hostname.replace(/^www\./, "")}</span>
                          </a>
                        </div>
                      )}
                      <div className="grid grid-cols-[5.5rem_1fr] text-[10px] font-mono">
                        <span className="px-3 py-2 text-secondary/55 border-r border-primary/10 bg-primary/2">STACK</span>
                        <span className="px-3 py-2 text-foreground/65 leading-relaxed">
                          {item.techStack.slice(0, 4).join(" · ")}{item.techStack.length > 4 ? " · ..." : ""}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] font-mono text-foreground/55 leading-relaxed border-l-2 border-primary/15 pl-4 max-w-prose">
                      {item.description.slice(0, 280)}{item.description.length > 280 ? "..." : ""}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => setSelected(item)}
                      className="group flex items-center gap-2 text-[11px] font-mono border border-primary/30 px-4 py-2 text-primary/60 hover:bg-primary/8 hover:border-primary/55 hover:text-primary transition-all duration-200"
                    >
                      <span className="text-primary/50 group-hover:text-primary/70">&gt;</span>
                      View case study
                    </button>
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[11px] font-mono border border-primary/20 hover:border-primary/40 px-4 py-2 text-secondary/50 hover:text-foreground/70 transition-all duration-200"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live site
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: image preview */}
                <div className="lg:w-[58%]">
                  <DesignImagePreview item={item} onOpen={() => setSelected(item)} />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <DesignCaseStudy project={selected} onClose={() => setSelected(null)} />
      </>
    );
  }

  // ── Engineering section rendering (original) ──────
  return (
    <>
      <section id="work" className="border-b border-primary/10">

        {/* Command header */}
        <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-5 border-b border-primary/8 bg-surface/50">
          <span className="text-primary/50 font-mono text-[11px]">$</span>
          <span className="text-[11px] font-mono text-foreground/65 tracking-widest">
            cat ./work/{featured?.title.toLowerCase().replace(/ /g, "-")}/README.md
          </span>
          <span className="ml-auto text-[9px] font-mono text-secondary/45 uppercase tracking-[0.15em]">
            {`// ${sectionLabel} / ${title.toUpperCase()}`}
          </span>
        </div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="px-6 sm:px-12 lg:px-16 py-8 sm:py-12"
          >
            {/* README "markdown" content */}
            <div className="max-w-4xl">

              {/* # Title */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-sm font-mono text-primary/30">#</span>
                <h2 className="font-display font-bold uppercase tracking-wide leading-none text-foreground/85 text-4xl sm:text-5xl lg:text-6xl">
                  {featured.title}
                </h2>
              </div>

              {/* > blockquote subtitle */}
              {featured.subtitle && (
                <div className="flex items-start gap-3 mt-3 mb-6 pl-1">
                  <span className="font-mono text-primary/45 text-sm relative -top-0.75">›</span>
                  <p className="text-xs font-mono text-primary/50 tracking-[0.08em] leading-relaxed">
                    {featured.subtitle}
                  </p>
                </div>
              )}

              {/* Metadata table */}
              <div className="border border-primary/12 divide-y divide-primary/8 mb-8 max-w-md">
                {featured.client && (
                  <div className="grid grid-cols-[7rem_1fr] text-[10px] font-mono">
                    <span className="px-3 py-2 text-secondary/55 border-r border-primary/10 bg-primary/2">CLIENT</span>
                    <span className="px-3 py-2 text-foreground/70">{featured.client}</span>
                  </div>
                )}
                {featured.dateRange && (
                  <div className="grid grid-cols-[7rem_1fr] text-[10px] font-mono">
                    <span className="px-3 py-2 text-secondary/55 border-r border-primary/10 bg-primary/2">DATE</span>
                    <span className="px-3 py-2 text-foreground/70">{featured.dateRange}</span>
                  </div>
                )}
                <div className="grid grid-cols-[7rem_1fr] text-[10px] font-mono">
                  <span className="px-3 py-2 text-secondary/55 border-r border-primary/10 bg-primary/2">STACK</span>
                  <span className="px-3 py-2 text-foreground/65 leading-relaxed">
                    {featured.techStack.slice(0, 5).join(" · ")}{featured.techStack.length > 5 ? " · ..." : ""}
                  </span>
                </div>
              </div>

              {/* ## Overview */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-[10px] font-mono text-secondary/50">##</span>
                  <span className="text-[9px] font-mono text-secondary/50 tracking-[0.2em] uppercase">OVERVIEW</span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-foreground/60 leading-relaxed max-w-2xl border-l-2 border-primary/15 pl-4">
                  {featured.description.slice(0, 360)}{featured.description.length > 360 ? "..." : ""}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => setSelected(featured)}
                className="group flex items-center gap-2 text-xs font-mono border border-primary/30 px-4 py-2 text-primary/60 hover:bg-primary/8 hover:border-primary/55 hover:text-primary transition-all duration-200"
              >
                <span className="text-primary/50 group-hover:text-primary/70">&gt;</span>
                cat README_FULL.md  // VIEW CASE STUDY
              </button>
            </div>

            {/* Screenshot — terminal window frame */}
            {featured.images?.find((img) => img.type === "desktop") && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-10 max-w-4xl"
              >
                <div
                  className="border border-primary/12 cursor-pointer hover:border-primary/25 transition-colors group/img"
                  onClick={() => setSelected(featured)}
                >
                  <div className="flex items-center gap-3 px-4 py-2.5 border-b border-primary/8 bg-surface">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent/40" />
                      <span className="w-2 h-2 rounded-full bg-primary/20" />
                      <span className="w-2 h-2 rounded-full bg-primary/40" />
                    </div>
                    <div className="flex-1 h-4 border border-primary/10 bg-primary/3 flex items-center px-2">
                      <span className="text-[8px] font-mono text-primary/45">
                        {featured.demoUrl ?? (featured.title.toLowerCase().replace(/ /g, "-") + ".io")}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-primary/40 opacity-0 group-hover/img:opacity-100 transition-opacity">
                      [ EXPAND ]
                    </span>
                  </div>
                  <Image
                    src={featured.images!.find((img) => img.type === "desktop")!.src}
                    alt={featured.title}
                    width={1200}
                    height={750}
                    className="w-full h-auto block opacity-70 group-hover/img:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    priority
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </section>

      <CaseStudy project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

/* ──────────────────────────────────────────────────────
   Design image preview (card right side)
   Shows dark image by default with a light-mode peek thumbnail.
   Clicking the main image opens the case study.
────────────────────────────────────────────────────── */
function DesignImagePreview({ item, onOpen }: { item: ProjectType; onOpen: () => void }) {
  const [dark, setDark] = useState(true);
  const src = dark ? item.darkImage : item.lightImage;
  const hasBoth = !!(item.lightImage && item.darkImage);

  if (!src) return null;

  return (
    <div className="w-full space-y-2">
      {/* Main preview — cropped to 1440×1080 (4:3) ratio, always shows top of screenshot */}
      <button
        onClick={onOpen}
        className="relative w-full block overflow-hidden border border-primary/15 hover:border-primary/30 transition-colors group/preview cursor-pointer"
        style={{ aspectRatio: "1440 / 1080" }}
        aria-label="Open case study"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${item.title} — ${dark ? "dark" : "light"} theme`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-background, #000200))" }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-[11px] font-mono text-primary/80 border border-primary/30 bg-background/80 px-3 py-1.5 backdrop-blur-sm">
            View case study →
          </span>
        </div>
      </button>

      {/* Theme switch thumbnails */}
      {hasBoth && (
        <div className="flex gap-2">
          <ThumbBtn
            src={item.darkImage!}
            label="Dark"
            active={dark}
            onClick={() => setDark(true)}
          />
          <ThumbBtn
            src={item.lightImage!}
            label="Light"
            active={!dark}
            onClick={() => setDark(false)}
          />
        </div>
      )}
    </div>
  );
}

function ThumbBtn({
  src, label, active, onClick,
}: { src: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2.5 py-1.5 border text-[9px] font-mono uppercase tracking-widest transition-all ${
        active
          ? "border-primary/50 bg-primary/8 text-primary/80"
          : "border-primary/15 text-secondary/45 hover:border-primary/30 hover:text-foreground/60"
      }`}
    >
      <div className="w-8 h-5 overflow-hidden border border-primary/20 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="w-full h-auto block" style={{ objectPosition: "top" }} />
      </div>
      {label}
    </button>
  );
}
