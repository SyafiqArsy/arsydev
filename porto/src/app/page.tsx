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

const INTRO_FLAG = "arsydev.intro.played";

/** Sudah pernah mainkan intro sesi ini? (sessionStorage — bertahan dari refresh, bukan dari buka tab baru). */
const hasPlayedIntro = () => {
  try {
    return sessionStorage.getItem(INTRO_FLAG) === "1";
  } catch {
    return false;
  }
};

type IntroPhase = "loading" | "expand" | "landing";

export default function Home() {
  // Baca flag sesi awal render (lazy) agar refresh langsung ke landing tanpa kedip layar.
  // Tidak ada cara client penanda "hard refresh": reload mempertahankan sessionStorage,
  // jadi refresh apa pun melewatkan intro — persis yang diminta.
  const [playedOnce] = useState(hasPlayedIntro);
  const [phase, setPhase] = useState<IntroPhase>(playedOnce ? "landing" : "loading");

  // Tandai sesi sesegera mungkin: intro hanya main sekali per sesi browser.
  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_FLAG, "1");
    } catch {
      // storage tidak tersedia → intro main tiap muat, degradasi aman
    }
  }, []);

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
      {!playedOnce && phase !== "landing" ? (
        <>
          <LoadingScreen onDone={() => setPhase("expand")} />
          {/* Intro di-mount SEJAK loading & di baliknya (z-9000 < z-9999).
              Fade-in-nya rampung di balik layar loading, jadi saat loading fade-out,
              intro sudah opak penuh — tidak ada kelebat landing page. */}
          <ScrollExpandIntro onDone={() => setPhase("landing")} />
        </>
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