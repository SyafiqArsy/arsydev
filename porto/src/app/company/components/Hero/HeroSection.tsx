"use client";

import { useRef, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Navigation from "./Navigation";
import Announcement from "./Announcement";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroArtwork from "./HeroArtwork";

interface HeroSectionProps {
  mounted: boolean;
  stagger: Variants;
}

export default function HeroSection({ mounted, stagger }: HeroSectionProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [panelsStarted, setPanelsStarted] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    if (mounted && !panelsStarted) {
      setPanelsStarted(true);
    }
  }, [mounted, panelsStarted]);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * 0.08;
        setParallaxY(Math.min(Math.max(offset, -40), 40));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* ─── LEFT COLUMN (65%) ─── */}
      <div
        style={{
          width: "65%",
          padding: "48px 64px 48px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Navigation mounted={mounted} stagger={stagger} />
        <Announcement mounted={mounted} stagger={stagger} />
        <HeroTitle mounted={mounted} stagger={stagger} />
        <HeroDescription mounted={mounted} stagger={stagger} />
      </div>

      {/* ─── RIGHT COLUMN (35%) — Visual / Artwork ─── */}
      <HeroArtwork
        parallaxRef={parallaxRef}
        parallaxY={parallaxY}
        panelsStarted={panelsStarted}
      />
    </div>
  );
}
