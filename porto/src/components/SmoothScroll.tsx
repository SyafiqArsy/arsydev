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
      lerp: 0.075,
      wheelMultiplier: 0.75,
      touchMultiplier: 1.2,
      syncTouch: true,
      syncTouchLerp: 0.09,
      duration: 1.4,
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
