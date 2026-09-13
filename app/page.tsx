"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import Footer from "@/components/Footer";
import { useImageSequence } from "@/hooks/useImageSequence";
import { useLenis } from "@/components/SmoothScroll";

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
