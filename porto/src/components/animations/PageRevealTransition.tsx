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
  /** Jarak scroll transisi. Default 50% viewport — reveal lebih snappy. */
  distance?: number;
  /** Layering: halaman lama di belakang saat mundur, baru di depan. */
  zIndex?: number;
  /** Posisi trigger ScrollTrigger. Default "top bottom". Untuk transisi #1
   *  (Skills → Stack) pakai "top top" agar mulai TEPAT saat horizontal selesai
   *  (container ber-offset 200vh; "top bottom" akan mulai di 100vh = tengah pin). */
  start?: string;
  /** Style kontainer reveal (mis. marginTop negatif untuk overlap). */
  style?: React.CSSProperties;
}

/**
 * Transisi "halaman mundur ke belakang lalu halaman baru muncul" memakai
 * GSAP ScrollTrigger (scrub). Trigger = kontainer children, start default
 * "top bottom", end "+distance".
 *
 * Selama scrub:
 * - `frontRef` (halaman lama) scale turun + fade.
 * - children (halaman baru) naik dari scale sedikit lebih besar + opacity 0 → 1.
 *
 * Tanpa z / preserve-3d — tween transform tak boleh menimpa sistem lain.
 * Dipakai 2x: (1) Track A horizontal → ScrollStack, (2) ScrollStack → Contact.
 */
export default function PageRevealTransition({
  frontRef,
  children,
  containerRef,
  distance,
  zIndex = 40,
  start = "top bottom",
  style,
}: PageRevealTransitionProps) {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const revealRef = containerRef ?? internalRef;
  const effectiveDistance = distance ?? Math.round(globalThis.innerHeight * 0.5);

  useLayoutEffect(() => {
    const revealEl = revealRef.current;
    const frontEl = frontRef.current;
    if (!revealEl || !frontEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: revealEl,
        start,
        end: `+=${effectiveDistance}`,
        scrub: true,
      },
    });

    // Halaman lama mundur (scale + fade) — tanpa z, tanpa 3D.
    tl.fromTo(
      frontEl,
      { scale: 1, opacity: 1 },
      { scale: 0.8, opacity: 0, ease: "none", duration: 0.5 },
      0,
    );

    // Halaman baru muncul dari belakang (scale + fade masuk).
    tl.fromTo(
      revealEl,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, ease: "none", duration: 0.5 },
      0.15,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [frontRef, effectiveDistance, start]);

  return (
    <div ref={revealRef} style={{ position: "relative", zIndex, ...style }}>
      {children}
    </div>
  );
}
