import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { getPortfolioConfig } from "@/core/utils/config-loader";
import CustomCursor from "@/components/shared/CustomCursor";
import ThemeProvider from "@/components/shared/ThemeProvider";

const geistMono    = Geist_Mono({ variable: "--font-mono",    subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-major-mono", subsets: ["latin"], weight: ["400","500","600","700"] });

export async function generateMetadata(): Promise<Metadata> {
  const config = getPortfolioConfig();
  return {
    title: config.metadata.title,
    description: config.metadata.description,
    openGraph: {
      title: config.metadata.title,
      description: config.metadata.description,
      url: config.metadata.url,
      siteName: config.personal.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.metadata.title,
      description: config.metadata.description,
    },
    keywords: [
      config.personal.name,
      config.personal.role,
      "Product Designer",
      "Design Engineer",
      "UX Design",
      "Portfolio",
      "Next.js",
      "React",
    ],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getPortfolioConfig();
  const c = config.theme.colors;

  return (
    <html lang="en" suppressHydrationWarning className={`${geistMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Anti-flash: apply saved theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root {
              --background: ${c.background};
              --foreground: ${c.foreground};
              --primary: ${c.primary};
              --secondary: ${c.secondary};
              --accent: ${c.accent};
              --surface: ${c.surface};
            }`,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden scanlines">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

