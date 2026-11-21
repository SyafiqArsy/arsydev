"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import SequenceScroll from "@/components/sections/hero/SequenceScroll";
import AboutSection from "@/components/sections/AboutSection";
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
        initial={{ opacity: 0 }}
        animate={{ opacity: contentRevealed ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SequenceScroll imagesRef={imagesRef} isLoaded={isLoaded} />
        <AboutSection />
        <HorizontalScroll />
      </motion.main>
    </>
  );
}
