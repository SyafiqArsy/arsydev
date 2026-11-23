"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import ScrollVelocity from "@/components/animations/ScrollVelocity";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import SequenceScroll from "@/components/sections/hero/SequenceScroll";
import AboutSection from "@/components/sections/AboutSection";
import AchievementsCTA from "@/components/sections/transitions/AchievementsCTA";
import HorizontalScroll from "@/components/sections/horizontal/HorizontalScroll";
import Footer from "@/components/layout/Footer";
import { useImageSequence } from "@/hooks/useImageSequence";
import { useLenis } from "@/components/providers/SmoothScroll";

export default function Home() {
  const { imagesRef, progress, isLoaded } = useImageSequence();
  const [contentRevealed, setContentRevealed] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (contentRevealed) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [lenis, contentRevealed]);

  return (
    <>
      <Preloader
        progress={progress}
        isLoaded={isLoaded}
        onExitComplete={() => setContentRevealed(true)}
      />

      <Navbar />

      <motion.main
        id="home"
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentRevealed ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SequenceScroll imagesRef={imagesRef} isLoaded={isLoaded} />
        <AboutSection />
        {/* Identity Scroll Separator */}
        <div className="relative z-10 overflow-hidden bg-navy py-8 sm:py-10">
          <ScrollVelocity
            texts={["SYAFIQ MUHAMMAD MUSYAFA ARSY AT-TAUFIQ"]}
            velocity={50}
            fontWeight={800}
            scrollerStyle={{
              fontSize: "clamp(1.75rem, 5vw, 4rem)",
              lineHeight: 1,
            }}
            color="rgba(240, 249, 255, 0.18)"
            numCopies={6}
            fadeEdges
            skewWithVelocity={0}
            scaleWithVelocity={0}
            draggable={false}
            pauseOnHover={false}
          />
        </div>
        <HorizontalScroll />
        <AchievementsCTA />
      </motion.main>
    </>
  );
}
