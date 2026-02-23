import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { getPortfolioConfig } from "@/core/utils/config-loader";
import CustomCursor from "@/components/shared/CustomCursor";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

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
      "Full Stack Engineer",
      "AI Engineer",
      "Portfolio",
      "Next.js",
      "React",
      "FastAPI",
    ],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getPortfolioConfig();
  const c = config.theme.colors;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
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
      <body className="antialiased overflow-x-hidden dot-grid">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

