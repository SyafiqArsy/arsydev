"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { setLenis } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Satu-satunya driver scroll halaman (Lenis). Memperlambat & menegaskan
 * scroll (bug "licin"), dan sinkron ke GSAP ScrollTrigger (horizontal pin +
 * reveal) lewat ticker yang sama.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // Tajam: lerp 1 = tanpa inersia (scroll langkah asli), wheel 1:1.
      // Halaman berhenti tegas per notch — tak melayang lagi.
      lerp: 1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true,
      syncTouchLerp: 0.05,
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      autoToggle: true,
      // Intro ScrollExpand punya scroller internal sendiri — jangan dibajak.
      prevent: (node: HTMLElement) => !!node.closest(".scroll-expand--scroller"),
    });

    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Ukur ulang pin setelah layout stabil (font/image bisa menggeser lebar).
    const refresh = () => ScrollTrigger.refresh();
    ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
