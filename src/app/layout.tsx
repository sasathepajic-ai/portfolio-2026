import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { getPortfolioConfig } from "@/core/utils/config-loader";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const config = getPortfolioConfig();
  return {
    title: config.metadata.title,
    description: config.metadata.description,
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
        {children}
      </body>
    </html>
  );
}
