"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

interface UseHorizontalScrollReturn {
  tunnelRef: React.RefObject<HTMLDivElement | null>;
  trackX: MotionValue<string>;
  smoothProgress: MotionValue<number>;
  activeSection: number;
  scrollToSection: (idx: number) => void;
}

/**
 * Mengelola "scroll tunnel" vertikal + terjemahan horizontal antar section.
 *
 * - Membuat elemen spacer setinggi `(totalSections - 1) * 100vh` untuk ruang scroll.
 * - `trackX` mentranslasikan track horizontal sebesar satu viewport per section.
 * - `activeSection` mengikuti progress scroll untuk menandai nav aktif.
 * - `scrollToSection(idx)` melakukan smooth scroll ke section tujuan.
 */
export function useHorizontalScroll(totalSections: number): UseHorizontalScrollReturn {
  const [activeSection, setActiveSection] = useState(0);

  // Tunnel: 4 section → 3 viewport tinggi → setiap scroll "halaman" memajukan 1 section.
  const tunnelRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: tunnelRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 });
  const trackX = useTransform(smoothProgress, [0, 1], ["0vw", `-${(totalSections - 1) * 100}vw`]);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const idx = Math.round(latest * (totalSections - 1));
      setActiveSection(idx);
    });
  }, [smoothProgress, totalSections]);

  const scrollToSection = (idx: number) => {
    if (!tunnelRef.current) return;
    const target = (idx / (totalSections - 1)) * (tunnelRef.current.scrollHeight - window.innerHeight);
    tunnelRef.current.scrollTo({ top: target, behavior: "smooth" });
  };

  return { tunnelRef, trackX, smoothProgress, activeSection, scrollToSection };
}
