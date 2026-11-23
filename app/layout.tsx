import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Geist } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Syafiq Arsy — Backend Developer & Full-Stack Engineer",
  description:
    "Portfolio of Syafiq Arsy — Informatics Engineering student & developer building high-performance APIs, robust backend systems, and modern web applications.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(spaceGrotesk.variable, jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body className="bg-navy font-sans text-accent-light antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
