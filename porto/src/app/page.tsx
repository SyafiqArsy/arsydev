"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

const projects = [
  {
    id: 1,
    title: "Nebula Dashboard",
    category: "Web App / SaaS",
    description: "A real-time analytics dashboard with interactive data visualizations and AI-powered insights.",
    tech: ["React", "D3.js", "Node.js", "WebSocket"],
    gradient: "from-purple-600 via-violet-600 to-indigo-700",
    accent: "#a78bfa",
    image: null,
  },
  {
    id: 2,
    title: "Flux E-Commerce",
    category: "Full-Stack / E-Commerce",
    description: "Modern e-commerce platform with seamless checkout, inventory management, and personalized recommendations.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    gradient: "from-pink-600 via-rose-600 to-red-700",
    accent: "#f472b6",
    image: null,
  },
  {
    id: 3,
    title: "Orion Social",
    category: "Mobile / Social",
    description: "A minimalist social platform focused on meaningful connections through shared creative experiences.",
    tech: ["React Native", "Firebase", "GraphQL", "Expo"],
    gradient: "from-amber-500 via-orange-600 to-red-600",
    accent: "#fbbf24",
    image: null,
  },
  {
    id: 4,
    title: "Prism Design System",
    category: "Design / Component Library",
    description: "Comprehensive design system with 200+ components, accessibility-first approach, and Figma integration.",
    tech: ["Storybook", "React", "Tailwind", "Figma API"],
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    accent: "#34d399",
    image: null,
  },
  {
    id: 5,
    title: "Aether AI Platform",
    category: "AI / Machine Learning",
    description: "No-code AI training platform that lets teams build, deploy, and monitor custom ML models.",
    tech: ["Python", "TensorFlow", "FastAPI", "React"],
    gradient: "from-blue-600 via-indigo-600 to-violet-700",
    accent: "#60a5fa",
    image: null,
  },
];

const navItems = ["Home", "Work", "Skills", "Contact"];

// 4 sections × 100vw = 400vw width
// Scroll tunnel height = (sections - 1) × 100vh
const TOTAL_SECTIONS = 4;

export default function Home() {
  const tunnelRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll on the tunnel element
  const { scrollYProgress } = useScroll({
    target: tunnelRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  // Translate X: 0 → -((TOTAL_SECTIONS - 1) * 100)vw
  const trackX = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(TOTAL_SECTIONS - 1) * 100}vw`]
  );

  // Progress bar width
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Detect active section for nav highlight
  const [activeSection, setActiveSection] = useState(0);
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const idx = Math.round(latest * (TOTAL_SECTIONS - 1));
      setActiveSection(idx);
    });
  }, [smoothProgress]);

  const scrollToSection = (idx: number) => {
    if (!tunnelRef.current) return;
    const scrollTarget =
      (idx / (TOTAL_SECTIONS - 1)) *
      (tunnelRef.current.scrollHeight - window.innerHeight);
    tunnelRef.current.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  return (
    <>
      {/* ─── Progress Bar ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* ─── Navigation ─── */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-8 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-8">
          {navItems.map((item, idx) => (
            <button
              key={item}
              onClick={() => scrollToSection(idx)}
              className={`text-sm tracking-wider uppercase transition-colors ${
                activeSection === idx
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* ─── Scroll Tunnel (spacer that creates the vertical scroll room) ─── */}
      <div
        ref={tunnelRef}
        className="relative"
        style={{ height: `${(TOTAL_SECTIONS - 1) * 100}vh` }}
      />

      {/* ─── Horizontal Track (fixed, moves via transform) ─── */}
      <motion.div
        className="horizontal-track"
        style={{ x: trackX }}
      >
        {/* ============= SECTION 0 — HERO ============= */}
        <section className="horizontal-section">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow" />
            <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-pink-600/15 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-8">
                ✦ Available for new projects
              </span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.95] mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Creative
              <br />
              <span className="gradient-text">Developer</span>
            </motion.h1>

            <motion.p
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crafting digital experiences at the intersection of design and
              technology. I build products that people love to use.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => scrollToSection(1)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection(3)}
                className="px-8 py-4 rounded-full border border-white/10 text-gray-300 hover:bg-white/5 transition-all duration-300"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex flex-col items-center gap-2 text-gray-600 text-xs tracking-widest uppercase">
              Scroll →
              <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* ============= SECTION 1 — WORK / PROJECTS ============= */}
        <section className="horizontal-section flex-col justify-center gap-8">
          <div className="w-full max-w-6xl self-start pl-[6rem]">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-purple-400 mb-4 block">
                Selected Work
              </span>
              <h2 className="text-5xl md:text-7xl font-bold">
                Featured{" "}
                <span className="gradient-text">Projects</span>
              </h2>
            </motion.div>
          </div>

          {/* Horizontal project cards within this section */}
          <div
            className="horizontal-scroll gap-8 pb-4"
            style={{
              paddingLeft: "6rem",
              paddingRight: "40px",
              width: "100vw",
            }}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="w-[460px] md:w-[520px] flex-shrink-0"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 h-[420px] flex flex-col">
                  <div
                    className={`h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-lg" />
                      <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/20 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full" />
                    </div>
                    <span className="text-6xl font-bold text-white/20">
                      {String(project.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs uppercase tracking-[0.15em] text-purple-400 mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============= SECTION 2 — SKILLS ============= */}
        <section className="horizontal-section">
          <Skills />
        </section>

        {/* ============= SECTION 3 — CONTACT ============= */}
        <section className="horizontal-section">
          <Contact />
        </section>
      </motion.div>

      {/* ─── Footer ─── */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 py-4 px-6 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Porto. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["GitHub", "LinkedIn", "Twitter"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
