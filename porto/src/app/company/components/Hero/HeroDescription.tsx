"use client";

import { motion, Variants } from "framer-motion";

interface HeroDescriptionProps {
  mounted: boolean;
  stagger: Variants;
}

export default function HeroDescription({ mounted, stagger }: HeroDescriptionProps) {
  return (
    <motion.p
      custom={3}
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      variants={stagger}
      style={{
        fontSize: "15px",
        lineHeight: 1.7,
        color: "#44526b",
        maxWidth: "480px",
        fontWeight: 400,
        margin: 0,
      }}
    >
      A design-led creative studio crafting digital products, brand
      identities, and immersive experiences for forward-thinking
      companies worldwide.
    </motion.p>
  );
}
