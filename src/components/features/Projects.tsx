"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type ProjectType } from "@/core/config/schema";
import { ArrowUpRight, Layers, ExternalLink } from "lucide-react";
import ProjectModal from "./ProjectModal";

interface ProjectsProps {
  title: string;
  subtitle?: string;
  items: ProjectType[];
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Projects({ title, subtitle, items }: ProjectsProps) {
  const [selected, setSelected] = useState<ProjectType | null>(null);

  return (
    <section className="relative py-28 sm:py-36">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-6 right-6" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header with HUD bracket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="flex flex-col items-center">
              <Layers className="w-6 h-6 text-primary/60" />
              <div className="w-px h-8 bg-linear-to-b from-primary/30 to-transparent" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">{title}</h2>
              {subtitle && <p className="mt-3 text-secondary max-w-xl">{subtitle}</p>}
            </div>
          </div>
        </motion.div>

        {/* Grid — featured first item large, rest in 2-col */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-5"
        >
          {/* Featured project */}
          {items[0] && (
            <motion.article
              variants={cardMotion}
              onClick={() => setSelected(items[0])}
              className="glow-card group cursor-pointer rounded-2xl"
            >
              <div className="card-inner corner-brackets rounded-2xl border border-white/8 bg-linear-to-br from-white/2 to-transparent overflow-hidden hover:border-primary/30 hover:from-primary/3 transition-all duration-300">
                {/* Hover accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500 z-10" />
                <div className="p-8 relative">
                  {/* Arrow indicator */}
                  <div className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 text-white opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-primary/60 font-mono text-xs font-semibold">0x01</span>
                    {items[0].dateRange && (
                      <>
                        <div className="w-px h-3 bg-primary/20" />
                        <p className="text-xs text-primary/60 font-mono tracking-widest uppercase">
                          {items[0].dateRange}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">
                      {items[0].title}
                    </h3>
                    {items[0].demoUrl && (
                      <a
                        href={items[0].demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 px-2 py-1 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/30 text-primary rounded text-[10px] font-medium transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    )}
                  </div>
                  <p className="text-secondary text-sm mb-2">{items[0].subtitle}</p>
                  <p className="text-secondary/80 text-sm leading-relaxed mb-6 line-clamp-3">
                    {items[0].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {items[0].techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-primary/8 text-primary/80 border border-primary/12"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Remaining projects in 2-col */}
          <div className="grid gap-5 sm:grid-cols-2">
            {items.slice(1).map((project, index) => (
              <motion.article
                key={project.id}
                variants={cardMotion}
                onClick={() => setSelected(project)}
                className="glow-card group cursor-pointer rounded-2xl"
              >
                <div className="card-inner corner-brackets rounded-2xl border border-white/8 bg-linear-to-br from-white/2 to-transparent overflow-hidden hover:border-primary/30 hover:from-primary/3 transition-all duration-300">
                  {/* Hover accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500 z-10" />
                  <div className="p-6 relative">
                    {/* Arrow indicator */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary/60 font-mono text-xs font-semibold">0x0{index + 2}</span>
                      {project.dateRange && (
                        <>
                          <div className="w-px h-3 bg-primary/20" />
                          <p className="text-[10px] text-primary/50 font-mono tracking-widest uppercase">
                            {project.dateRange}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground tracking-tight leading-snug">
                        {project.title}
                      </h3>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/30 text-primary rounded text-[9px] font-medium transition-colors"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          Live
                        </a>
                      )}
                    </div>
                    <p className="text-secondary text-sm mt-1 mb-4 line-clamp-2">{project.subtitle}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-white/4 text-secondary/70 border border-white/6"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-white/4 text-secondary/40">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
