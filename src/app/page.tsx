import { getPortfolioConfig } from "@/core/utils/config-loader";
import SectionRenderer from "@/components/shared/SectionRenderer";
import Navbar from "@/components/shared/Navbar";
import SmoothScroll from "@/components/shared/SmoothScroll";

export default function HomePage() {
  const config = getPortfolioConfig();

  return (
    <SmoothScroll>
      <Navbar name={config.personal.name} items={config.nav ?? []} />
      <main>
        <SectionRenderer sections={config.sections} socials={config.personal.socials} />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-14">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex items-center gap-2">
                <span className="text-primary/50 font-mono text-sm">&#47;&#47;</span>
                <span className="text-foreground font-semibold font-mono text-sm tracking-tight">
                  {config.personal.name.split(" ")[0].toLowerCase()}
                </span>
                <span className="w-px h-3.5 bg-primary/40" />
              </div>
              <p className="text-[11px] text-secondary/30 font-mono">
                &copy; {new Date().getFullYear()} {config.personal.name} &middot; Built with Next.js
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {config.personal.socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 text-xs text-secondary/40 hover:text-primary transition-colors font-mono uppercase tracking-wider"
                >
                  <span className="w-1 h-1 rounded-full bg-current opacity-40 group-hover:opacity-100 transition-opacity" />
                  {social.label ?? social.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Decorative bottom line */}
          <div className="mt-10 flex items-center gap-3 text-white/5 font-mono text-[10px]">
            <span>&#8249;</span>
            <div className="flex-1 h-px bg-white/4" />
            <span className="text-primary/10">sasathepajic.ai</span>
            <div className="flex-1 h-px bg-white/4" />
            <span>&#8250;</span>
          </div>
        </div>
      </footer>
    </SmoothScroll>
  );
}
