"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  type MotionValue,
} from "motion/react";

interface HeroIntroVideoProps {
  opacity: MotionValue<number>;
}

export default function HeroIntroVideo({
  opacity,
}: HeroIntroVideoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.video
      src="/hero-intro.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />,
    document.body
  );
}
