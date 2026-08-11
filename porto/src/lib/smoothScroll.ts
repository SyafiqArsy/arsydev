"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

/** Smooth scroll ke target (px atau elemen) via Lenis — tanpa instant jump. */
export const smoothScrollTo = (target: number | HTMLElement, duration = 1.2) => {
  if (lenis) {
    lenis.scrollTo(target, {
      duration,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
};
