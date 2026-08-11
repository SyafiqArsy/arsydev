"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { smoothScrollTo } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface UseHorizontalScrollReturn {
  /** Wrapper scroll-room (300vh) — trigger ScrollTrigger. */
  wrapRef: RefObject<HTMLDivElement | null>;
  /** Track flex yang di-translate horizontal. */
  trackRef: RefObject<HTMLDivElement | null>;
  /** Section aktif untuk nav (0-2 horizontal, 3 = post-pin/Contact). */
  activeSection: number;
  /** Smooth scroll ke section horizontal (idx 0-2). */
  scrollToSection: (idx: number) => void;
}

/**
 * Menggerakkan track horizontal via ScrollTrigger scrub — TANPA GSAP pin.
 *
 * CSS `position:sticky` pada `.horizontal-pin` (top:0) menahan section selama
 * scroll wrapper (0→200vh), jadi tidak ada GSAP pin-spacer yang membungkus
 * node React (sumber DOM inconsistency / insertBefore error). ScrollTrigger
 * hanya men-scrub translate track -200vw sepanjang wrapper.
 */
export function useHorizontalScroll(
  totalSections: number,
  onPostPinRef?: RefObject<HTMLElement | null>,
): UseHorizontalScrollReturn {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const lastSectionRef = useRef(0);

  useLayoutEffect(() => {
    const wrapEl = wrapRef.current;
    const trackEl = trackRef.current;
    if (!wrapEl || !trackEl) return;

    const dist = () => Math.max(0, trackEl.offsetWidth - window.innerWidth);

    // Scrub horizontal TANPA pin: translate track sepanjang wrapper.
    // Sticky CSS sudah menahan section; ScrollTrigger hanya menggeser track.
    const tween = gsap.to(trackEl, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: wrapEl,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            totalSections - 1,
            Math.round(self.progress * (totalSections - 1)),
          );
          if (lastSectionRef.current !== idx) {
            lastSectionRef.current = idx;
            setActiveSection(idx);
          }
        },
      },
    });

    const st = tween.scrollTrigger;

    // Trigger kedua: section post-pin (Services) mulai di viewport
    // (tepat saat release sticky, scrollY = 200vh) → nav Contact aktif.
    const markSection = (idx: number) => {
      if (lastSectionRef.current !== idx) {
        lastSectionRef.current = idx;
        setActiveSection(idx);
      }
    };
    let postPin: ScrollTrigger | null = null;
    if (onPostPinRef?.current) {
      postPin = ScrollTrigger.create({
        trigger: onPostPinRef.current,
        start: "top top",
        onEnter: () => markSection(3),
        onLeaveBack: () => markSection(totalSections - 1),
      });
    }

    return () => {
      st?.kill();
      tween.kill();
      postPin?.kill();
    };
  }, [totalSections, onPostPinRef]);

  const scrollToSection = (idx: number) => {
    const clamped = Math.min(Math.max(idx, 0), totalSections - 1);
    // Section idx = posisi idx*100vh dalam wrapper (start wrapper top = 0).
    smoothScrollTo(clamped * window.innerWidth);
  };

  return { wrapRef, trackRef, activeSection, scrollToSection };
}
