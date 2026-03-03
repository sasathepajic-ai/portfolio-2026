"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface ContactProps {
  title: string;
  subtitle?: string;
  sectionLabel?: string;
  email: string;
  location?: string;
  phone?: string;
}

export default function ContactScroll({ title, subtitle, sectionLabel = "05", email, location }: ContactProps) {
  const lines = [
    { prompt: "$", cmd: "whoami", delay: 0,
      output: <span className="text-foreground/65">sasa &mdash; Full Stack & AI Engineer</span> },
    { prompt: "$", cmd: "pwd", delay: 0.15,
      output: <span className="text-foreground/65">/valencia/spain/earth</span> },
    { prompt: "$", cmd: `echo "${subtitle ?? "remote & relocation"}"`, delay: 0.3,
      output: <span className="text-primary/60">{subtitle ?? "Open to remote & relocation"}</span> },
    { prompt: "$", cmd: `mail -s "Hello" ${email}`, delay: 0.5,
      output: (
        <a
          href={`mailto:${email}`}
          className="group inline-flex items-baseline gap-3 hover:text-primary transition-colors duration-200"
        >
          <span className="font-display font-bold text-foreground/80 group-hover:text-primary transition-colors tracking-wide uppercase"
                style={{ fontSize: "clamp(1.4rem, 3.5vw, 3.5rem)" }}>
            {email}
          </span>
          <span className="text-[10px] font-mono text-secondary/55 group-hover:text-primary/50 transition-colors">
            &lt;ENTER&gt;
          </span>
        </a>
      )
    },
  ];

  return (
    <section id="contact" className="min-h-[80vh] flex flex-col">
      {/* Command header */}
      <div className="flex items-center gap-3 px-6 sm:px-12 lg:px-16 py-5 border-y border-primary/10 bg-surface/50">
        <span className="text-primary/50 font-mono text-[11px]">$</span>
        <span className="text-[11px] font-mono text-foreground/65 tracking-widest">./contact.sh</span>
        <span className="ml-auto text-[9px] font-mono text-secondary/45 uppercase tracking-[0.15em]">
          {`// ${sectionLabel} / ${title.toUpperCase()}`}
        </span>
      </div>

      <div className="flex-1 flex flex-col px-6 sm:px-12 lg:px-16 py-12 sm:py-16 space-y-8">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: line.delay }}
            className="space-y-2"
          >
            {/* Command line */}
            <div className="flex items-baseline gap-2">
              <span className="text-primary/55 font-mono text-[11px] shrink-0">{line.prompt}</span>
              <span className="text-[11px] font-mono text-foreground/60 tracking-[0.05em] break-all">
                {line.cmd}
              </span>
            </div>
            {/* Output */}
            <div className="pl-5 text-xs font-mono leading-relaxed">
              {line.output}
            </div>
          </motion.div>
        ))}

        {/* Awaiting input */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-primary/55 font-mono text-[11px]">$</span>
            <span className="inline-block w-2 h-4 bg-primary/50 cursor-blink" />
          </div>
          {location && (
            <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-secondary/50">
              <MapPin className="w-3 h-3 text-primary/45" />
              <span>{location}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
