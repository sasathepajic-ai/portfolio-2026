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
        <SectionRenderer sections={config.sections} />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/4 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-secondary/40 font-mono">
            <span className="text-primary/30">&#47;&#47;</span>
            <span>© {new Date().getFullYear()} {config.personal.name}</span>
            <span className="text-white/10">·</span>
            <span>Built with Next.js</span>
          </div>
          <div className="flex gap-5">
            {config.personal.socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-secondary/40 hover:text-primary transition-colors font-mono uppercase tracking-wider"
              >
                {social.label ?? social.platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </SmoothScroll>
  );
}
