"use client";

import { motion } from "framer-motion";

import LoadingScreen from "@/components/animations/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

const TOTAL_SECTIONS = 4;

export default function Home() {
  const {
    tunnelRef,
    trackX,
    smoothProgress,
    activeSection,
    scrollToSection,
  } = useHorizontalScroll(TOTAL_SECTIONS);

  return (
    <>
      <LoadingScreen />

      <Navbar
        progress={smoothProgress}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

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
