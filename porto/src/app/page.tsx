"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import LoadingScreen from "@/components/animations/LoadingScreen";
import ScrollExpandIntro from "@/components/animations/ScrollExpandIntro";
import NavMenu from "@/components/layout/NavMenu";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

const TOTAL_SECTIONS = 4;

type IntroPhase = "loading" | "expand" | "landing";

export default function Home() {
  const [phase, setPhase] = useState<IntroPhase>("loading");

  // Scroll terkunci selama loading & scroll-expand intro berlangsung.
  useEffect(() => {
    document.body.style.overflow = phase === "landing" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const {
    tunnelRef,
    trackX,
    activeSection,
    scrollToSection,
  } = useHorizontalScroll(TOTAL_SECTIONS);

  return (
    <>
      {phase === "loading" ? (
        <LoadingScreen onDone={() => setPhase("expand")} />
      ) : null}

      {phase === "expand" ? (
        <ScrollExpandIntro onDone={() => setPhase("landing")} />
      ) : null}

      {phase !== "loading" ? (
        <NavMenu
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />
      ) : null}

      <div
        ref={tunnelRef}
        style={{ height: `${(TOTAL_SECTIONS - 1) * 100}vh` }}
      />

      <motion.div
        className="horizontal-track"
        style={{ x: trackX }}
      >
        <HeroSection
          scrollToProjects={() => scrollToSection(1)}
        />

        <ProjectsSection />

        <SkillsSection />

        <ContactSection />
      </motion.div>

      <Footer />
    </>
  );
}