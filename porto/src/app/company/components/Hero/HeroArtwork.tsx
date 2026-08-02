"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroArtworkProps {
  parallaxRef: React.RefObject<HTMLDivElement | null>;
  parallaxY: number;
  panelsStarted: boolean;
}

const panels = [
  { width: "22%", delay: 0.2 },
  { width: "18%", delay: 0.5 },
  { width: "25%", delay: 0.35 },
  { width: "15%", delay: 0.65 },
  { width: "20%", delay: 0.8 },
];

export default function HeroArtwork({ parallaxRef, parallaxY, panelsStarted }: HeroArtworkProps) {
  return (
    <div
      ref={parallaxRef}
      style={{
        width: "35%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#e8eef6",
      }}
    >
      {/* The image behind panels */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${parallaxY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Animated reveal panels */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          zIndex: 2,
        }}
      >
        {panels.map((p, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 1 }}
            animate={panelsStarted ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{
              duration: 1.4,
              delay: panelsStarted ? 2.6 + p.delay : 0,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{
              width: p.width,
              height: "100%",
              backgroundColor: "#ffffff",
              transformOrigin: "left center",
              borderRight: i < panels.length - 1 ? "1px solid rgba(0,0,0,0.03)" : "none",
            }}
          />
        ))}
      </div>

      {/* Subtle overlay on the image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
