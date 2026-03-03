import { getPortfolioConfig } from "@/core/utils/config-loader";
import SectionRenderer from "@/components/shared/SectionRenderer";
import Navbar from "@/components/shared/Navbar";

export default function HomePage() {
  const config = getPortfolioConfig();

  return (
    <div className="flex min-h-screen">
      {/* Fixed sidebar */}
      <Navbar
        name={config.personal.name}
        items={config.nav ?? []}
        socials={config.personal.socials}
      />

      {/* Main scrollable content — offset by sidebar width on desktop */}
      <div className="flex-1 lg:pl-65 min-w-0">
        <main>
          <SectionRenderer sections={config.sections} socials={config.personal.socials} />
        </main>

        {/* Footer */}
        <footer className="border-t border-primary/10 py-8 px-8 sm:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-secondary/35 tracking-[0.15em]">
                $ echo &quot;© 2026 {config.personal.name}&quot;
              </div>
              <div className="text-[9px] font-mono text-secondary/20">
                Built with Next.js 15 · Deployed on Vercel
              </div>
            </div>
            <div className="flex gap-3">
              {config.personal.socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[9px] font-mono text-secondary/30 hover:text-primary/60 transition-colors uppercase tracking-[0.12em] border border-primary/10 px-2 py-1 hover:border-primary/25"
                >
                  {social.label ?? social.platform}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
