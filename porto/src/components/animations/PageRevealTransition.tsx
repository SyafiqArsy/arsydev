"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageRevealTransitionProps {
  /** Halaman lama yang "mundur ke belakang" saat transisi (mis. wrapper Track A). */
  frontRef: React.RefObject<HTMLElement | null>;
  /** Halaman baru yang muncul dari belakang. Kontainer ini jadi trigger ScrollTrigger. */
  children: React.ReactNode;
  /** Ref ke kontainer reveal — dipakai sebagai front untuk transisi berikutnya (mis. Stack → Contact). */
  containerRef?: React.RefObject<HTMLDivElement | null>;
  /** Jarak scroll transisi. Default 80% viewport. */
  distance?: number;
  /** Layering: halaman lama di belakang saat mundur, baru di depan. */
  zIndex?: number;
}

/**
 * Transisi "halaman mundur ke belakang lalu halaman baru muncul" memakai
 * GSAP ScrollTrigger (scrub). Trigger = kontainer children, start "top bottom"
 * (saat bagian atas halaman baru menyentuh dasar viewport), end "top top".
 *
 * Selama scrub:
 * - `frontRef` (halaman lama) scale turun + fade + z mundur.
 * - children (halaman baru) naik dari scale sedikit lebih besar + opacity 0 → 1.
 *
 * Dipakai 2x: (1) Track A horizontal → ScrollStack, (2) ScrollStack → Contact.
 */
export default function PageRevealTransition({
  frontRef,
  children,
  containerRef,
  distance,
  zIndex = 40,
}: PageRevealTransitionProps) {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const revealRef = containerRef ?? internalRef;
  const effectiveDistance = distance ?? Math.round(globalThis.innerHeight * 0.8);

  useLayoutEffect(() => {
    const revealEl = revealRef.current;
    const frontEl = frontRef.current;
    if (!revealEl || !frontEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: revealEl,
        start: "top bottom",
        end: `+=${effectiveDistance}`,
        scrub: true,
      },
    });

    // Halaman lama mundur ke belakang.
    tl.fromTo(
      frontEl,
      { scale: 1, opacity: 1, z: 0 },
      { scale: 0.82, opacity: 0.4, z: -400, ease: "none", duration: 0.5 },
      0,
    );

    // Halaman baru muncul dari belakang.
    tl.fromTo(
      revealEl,
      { opacity: 0, scale: 1.08, z: 400 },
      { opacity: 1, scale: 1, z: 0, ease: "none", duration: 0.5 },
      0.15,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [frontRef, effectiveDistance]);

  return (
    <div
      ref={revealRef}
      style={{
        position: "relative",
        zIndex,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
    >
      {children}
    </div>
  );
}
