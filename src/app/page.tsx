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
        <footer className="border-t border-primary/10 py-10 px-8 sm:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-secondary/40 tracking-[0.15em]">
                © 2026 {config.personal.name}
              </div>
              <div className="text-[10px] font-mono text-secondary/25">
                Designed & built with Next.js · Deployed on Vercel
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
