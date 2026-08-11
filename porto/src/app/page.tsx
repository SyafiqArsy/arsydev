"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import LoadingScreen from "@/components/animations/LoadingScreen";
import ScrollExpandIntro from "@/components/animations/ScrollExpandIntro";
import NavMenu from "@/components/layout/NavMenu";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import ServicesStack from "@/components/sections/ServicesStack";

import PageRevealTransition from "@/components/animations/PageRevealTransition";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

const TOTAL_SECTIONS = 3;

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

  // Referensi wrapper horizontal (Track A) — dimundurkan oleh transisi GSAP.
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null);
  // Referensi ScrollStack — dimundurkan oleh transisi kedua (Stack → Contact).
  const servicesStackRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {!playedOnce && phase !== "landing" ? (
        <>
          <LoadingScreen onDone={() => setPhase("expand")} />
          {/* Intro di-mount SEJAK loading & di baliknya (z-9000 < z-9999). */}
          <ScrollExpandIntro onDone={() => setPhase("landing")} />
        </>
      ) : null}

      {phase !== "loading" ? (
        <NavMenu
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />
      ) : null}

      {/* Scroll tunnel — spacer untuk ruang scroll horizontal (3 section) */}
      <div
        ref={tunnelRef}
        style={{ height: `${(TOTAL_SECTIONS - 1) * 100}vh` }}
      />

      {/* Track A — horizontal: Hero, Projects, Skills (fixed, dimundurkan transisi) */}
      <motion.div
        ref={horizontalTrackRef}
        className="horizontal-track"
        style={{ x: trackX, zIndex: 20, position: "fixed" }}
      >
        <HeroSection
          scrollToProjects={() => scrollToSection(1)}
        />
        <ProjectsSection />
        <SkillsSection />
      </motion.div>

      {/* Track B — vertikal: ScrollStack + Contact, di flow dokumen setelah tunnel */}
      <PageRevealTransition
        frontRef={horizontalTrackRef}
        containerRef={servicesStackRef}
        zIndex={30}
      >
        <ServicesStack />
      </PageRevealTransition>
      <PageRevealTransition frontRef={servicesStackRef} zIndex={50}>
        <ContactSection />
      </PageRevealTransition>

      <Footer />
    </>
  );
}
