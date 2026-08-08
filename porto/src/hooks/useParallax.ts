"use client";

import { useEffect, useRef, useState } from "react";

interface UseParallaxReturn {
  parallaxRef: React.RefObject<HTMLDivElement | null>;
  parallaxY: number;
}

/**
 * Parallax ringan berbasis scroll: menggeser elemen secara vertikal
 * relatif terhadap posisinya di viewport. Dipakai mis. untuk artwork di Hero.
 */
export function useParallax(factor = 0.08, clamp = 40): UseParallaxReturn {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * factor;
        setParallaxY(Math.min(Math.max(offset, -clamp), clamp));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [factor, clamp]);

  return { parallaxRef, parallaxY };
}
