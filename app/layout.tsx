import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Syafiq Arsy — Frontend Developer & UI Designer",
  description:
    "Portfolio of Syafiq Arsy — frontend developer and UI designer crafting clean, performant web experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-navy font-display text-accent-light antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
