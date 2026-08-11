"use client";

import { useLayoutEffect, useRef, useState } from "react";

import LoadingScreen from "@/components/animations/LoadingScreen";
import ScrollExpandIntro from "@/components/animations/ScrollExpandIntro";
import NavMenu from "@/components/layout/NavMenu";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import ServicesStack from "@/components/sections/ServicesStack";

import SmoothScroll from "@/components/SmoothScroll";
import PageRevealTransition from "@/components/animations/PageRevealTransition";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { smoothScrollTo } from "@/lib/smoothScroll";

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
  // STATE DETERMINISTIK (SSR = client): struktur utama SELALU dirender sebagai
  // landing. sessionStorage TIDAK dibaca saat initializer — itu menyebabkan
  // hydration mismatch (server intro tree vs client landing tree). Baca flag
  // sesi di useLayoutEffect (client-only, sebelum paint) → tanpa flash.
  const [playedOnce, setPlayedOnce] = useState(false);
  const [introMounted, setIntroMounted] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>("loading");

  // Client-only, sebelum paint: putuskan intro setelah DOM utama ter-hydrate.
  useLayoutEffect(() => {
    const played = hasPlayedIntro();
    setPlayedOnce(played);
    if (played) setPhase("landing");
    setIntroMounted(true);
  }, []);

  // Scroll terkunci selama intro (loading/expand) berlangsung.
  useLayoutEffect(() => {
    document.body.style.overflow = phase === "landing" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Kontainer reveal — dimundurkan transisi GSAP (Stack → Contact).
  const servicesRef = useRef<HTMLDivElement | null>(null);

  // Satu driver scroll (Lenis) + GSAP ScrollTrigger scrub untuk horizontal.
  const {
    wrapRef,
    trackRef,
    activeSection,
    scrollToSection,
  } = useHorizontalScroll(TOTAL_SECTIONS, servicesRef);

  // Nav: 0-2 = section horizontal (via pin), 3 = halaman terakhir (Contact).
  const goToSection = (idx: number) => {
    if (idx >= TOTAL_SECTIONS) {
      smoothScrollTo(document.documentElement.scrollHeight);
    } else {
      scrollToSection(idx);
    }
  };

  // Intro sebagai OVERLAY di atas struktur landing — struktur utama selalu
  // ada & konsisten SSR/client. Intro baru di-mount setelah hydration.
  const showIntro = introMounted && !playedOnce && phase !== "landing";

  return (
    <>
      {showIntro ? (
        <>
          <LoadingScreen onDone={() => setPhase("expand")} />
          {/* Intro di-mount SEJAK loading & di baliknya (z-9000 < z-9999). */}
          <ScrollExpandIntro onDone={() => setPhase("landing")} />
        </>
      ) : null}

      {phase !== "loading" ? (
        <NavMenu activeSection={activeSection} scrollToSection={goToSection} />
      ) : null}

      {/* Hanya saat landing: Lenis aktif sebagai driver scroll halaman. */}
      {phase === "landing" ? <SmoothScroll /> : null}

      {/* Track A — horizontal: Hero, Projects, Skills.
          Wrapper = scroll-room 300vh (sticky section menahan 200vh),
          kemudian release; tidak ada GSAP pin-spacer (React DOM konsisten). */}
      <div ref={wrapRef} className="horizontal-wrap">
        <section className="horizontal-pin">
          <div ref={trackRef} className="horizontal-track">
            <HeroSection scrollToProjects={() => scrollToSection(1)} />
            <ProjectsSection />
            <SkillsSection />
          </div>
        </section>
      </div>

      {/* Track B — vertikal: ScrollStack + Contact. Mulai di posisi normal
          (300vh) — Skills selesai terpin di 200vh, lalu ter-scroll 200→300vh
          sehingga terlihat PENUH dulu, baru Track B muncul & stack beranimasi. */}
      <PageRevealTransition
        frontRef={wrapRef}
        containerRef={servicesRef}
        zIndex={30}
        start="top top"
      >
        <ServicesStack />
      </PageRevealTransition>
      <PageRevealTransition frontRef={servicesRef} zIndex={50}>
        <ContactSection />
      </PageRevealTransition>

      <Footer />
    </>
  );
}
