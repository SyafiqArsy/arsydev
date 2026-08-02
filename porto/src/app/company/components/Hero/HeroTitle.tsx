"use client";

import { motion, Variants } from "framer-motion";

interface HeroTitleProps {
  mounted: boolean;
  stagger: Variants;
}

export default function HeroTitle({ mounted, stagger }: HeroTitleProps) {
  return (
    <motion.h1
      custom={2}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      variants={stagger}
      style={{
        fontSize: "clamp(72px, 10vw, 180px)",
        fontWeight: 800,
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        color: "#0b1d3a",
        margin: "0 0 32px 0",
      }}
    >
      Studio
      <br />
      Arsy
    </motion.h1>
  );
}
