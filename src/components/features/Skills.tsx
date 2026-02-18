"use client";

import { motion } from "framer-motion";
import { type SkillCategoryType } from "@/core/config/schema";
import { Cpu } from "lucide-react";

interface SkillsProps {
  title: string;
  subtitle?: string;
  categories: SkillCategoryType[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills({ title, subtitle, categories }: SkillsProps) {
  return (
    <section className="relative py-28 sm:py-36">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-6 right-6" />


      <div className="mx-auto max-w-6xl px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="flex flex-col items-center">
              <Cpu className="w-6 h-6 text-primary/60" />
              <div className="w-px h-8 bg-linear-to-b from-primary/30 to-transparent" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">{title}</h2>
              {subtitle && <p className="mt-3 text-secondary max-w-xl">{subtitle}</p>}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              variants={card}
              className="group relative rounded-xl border border-white/8 bg-linear-to-br from-white/2 to-transparent p-6 transition-all duration-300 hover:border-primary/30 hover:from-primary/3"
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
              
              {/* Category label */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-primary/60 font-mono text-xs font-semibold">0{i + 1}</span>
                <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase group-hover:text-primary/90 transition-colors duration-300">
                  {cat.name}
                </h3>
                <div className="flex-1 h-px bg-white/6 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono rounded-md bg-white/4 text-secondary border border-white/8 group-hover:bg-primary/10 group-hover:text-primary/90 group-hover:border-primary/20 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
