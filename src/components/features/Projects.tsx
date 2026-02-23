"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { type ProjectType } from "@/core/config/schema";
import { ExternalLink, ArrowRight } from "lucide-react";
import CaseStudy from "./CaseStudy";

interface ProjectsProps {
  title: string;
  subtitle?: string;
  items: ProjectType[];
}

// --- Desktop browser-chrome mockup ---
function DesktopMockup({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.8)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111116] border-b border-white/6">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-2.5 h-4 rounded-full bg-white/5 flex items-center px-2.5 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/15 shrink-0" />
          <span className="text-[8px] text-white/25 font-mono truncate">ablsafety.com</span>
        </div>
      </div>
      {/* Screen: FHD 16:9 */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src={src}
          alt={alt ?? "Desktop screenshot"}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    </div>
  );
}

function PhoneMockup({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative rounded-[18px] overflow-hidden border-[3px] border-white/10 bg-[#0a0a0c] w-full"
      style={{
        aspectRatio: "9/19.5",
        boxShadow: "0 24px 60px -8px rgba(0,0,0,0.95), inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0a0a0c] z-10 ring-[1.5px] ring-white/8" />
      <Image
        src={src}
        alt={alt ?? "Mobile screenshot"}
        fill
        className="object-cover object-top"
        sizes="200px"
      />
    </div>
  );
}

export default function Projects({ title, subtitle, items }: ProjectsProps) {
  const [selected, setSelected] = useState<ProjectType | null>(null);

  const featured = items[0];

  const desktopImages = featured?.images?.filter((i) => i.type === "desktop") ?? [];
  const mobileHero = featured?.images?.find((i) => i.type === "mobile");

  return (
    <>
      <section className="relative py-28 sm:py-36">
        <div className="section-divider absolute top-0 left-6 right-6" />

        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3 flex items-center gap-3">
              {title}
              <span className="text-primary/40 font-mono text-2xl leading-none select-none font-normal translate-y-0.5">&lt; /&gt;</span>
            </h2>
            {subtitle && <p className="text-secondary max-w-xl">{subtitle}</p>}
          </motion.div>

          {/* Featured project */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="corner-brackets rounded-2xl border border-white/8 bg-linear-to-br from-white/2 to-transparent overflow-hidden mb-6"
            >
              <div className="h-px w-full bg-linear-to-r from-transparent via-primary/30 to-transparent" />

              <div className="grid lg:grid-cols-[1fr_1.25fr] gap-0">

                {/* Left: info */}
                <div className="p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/6">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-primary/50 font-mono text-xs font-semibold">0x01</span>
                      {featured.dateRange && (
                        <span className="text-secondary/40 font-mono text-[10px]">{featured.dateRange}</span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-tight mb-1.5">
                      {featured.title}
                    </h3>
                    {featured.client && (
                      <p className="text-secondary/45 text-[11px] font-mono mb-4">{featured.client}</p>
                    )}
                    <p className="text-secondary/75 text-sm leading-relaxed mb-6">
                      {featured.description}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 flex items-center gap-3 flex-wrap">
                    {featured.demoUrl && (
                      <a
                        href={featured.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/18 border border-primary/30 hover:border-primary/50 text-primary text-xs font-mono transition-all duration-200"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View live
                      </a>
                    )}
                    <button
                      onClick={() => setSelected(featured)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-foreground/70 hover:text-foreground text-xs font-mono transition-all duration-200"
                    >
                      View case study
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right: mockup showcase */}
                <div className="relative p-6 lg:p-8 flex flex-col gap-4 bg-surface/40 overflow-hidden">
                  {/* Subtle dot grid */}
                  <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Desktop + phone overlay */}
                  {desktopImages[0] && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative z-10 w-full${mobileHero ? " pr-[15%] pb-[7%]" : ""}`}
                    >
                      <DesktopMockup src={desktopImages[0].src} alt={desktopImages[0].alt} />
                      {mobileHero && (
                        <div className="absolute bottom-0 right-0 w-[22%]">
                          <PhoneMockup src={mobileHero.src} alt={mobileHero.alt} />
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <CaseStudy project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
