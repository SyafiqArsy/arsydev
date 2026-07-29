"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";

const projects = [
  {
    id: 1,
    title: "Nebula Dashboard", category: "Web App / SaaS",
    description: "A real-time analytics dashboard with interactive data visualizations and AI-powered insights.",
    tech: ["React", "D3.js", "Node.js", "WebSocket"],
    gradient: "from-purple-600 via-violet-600 to-indigo-700",
  },
  {
    id: 2,
    title: "Flux E-Commerce", category: "Full-Stack / E-Commerce",
    description: "Modern e-commerce platform with seamless checkout, inventory management, and personalized recommendations.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    gradient: "from-pink-600 via-rose-600 to-red-700",
  },
  {
    id: 3,
    title: "Orion Social", category: "Mobile / Social",
    description: "A minimalist social platform focused on meaningful connections through shared creative experiences.",
    tech: ["React Native", "Firebase", "GraphQL", "Expo"],
    gradient: "from-amber-500 via-orange-600 to-red-600",
  },
  {
    id: 4,
    title: "Prism Design System", category: "Design / Component Library",
    description: "Comprehensive design system with 200+ components, accessibility-first approach, and Figma integration.",
    tech: ["Storybook", "React", "Tailwind", "Figma API"],
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
  },
  {
    id: 5,
    title: "Aether AI Platform", category: "AI / Machine Learning",
    description: "No-code AI training platform that lets teams build, deploy, and monitor custom ML models.",
    tech: ["Python", "TensorFlow", "FastAPI", "React"],
    gradient: "from-blue-600 via-indigo-600 to-violet-700",
  },
];

const panels = [
  { width: "22%", delay: 0.2 },
  { width: "18%", delay: 0.5 },
  { width: "25%", delay: 0.35 },
  { width: "15%", delay: 0.65 },
  { width: "20%", delay: 0.8 },
];

const navItems = ["Studio", "Work", "Skills", "Contact"];
const TOTAL_SECTIONS = 4;

export default function Home() {
  const tunnelRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [panelsStarted, setPanelsStarted] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  const { scrollYProgress } = useScroll({ target: tunnelRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 });
  const trackX = useTransform(smoothProgress, [0, 1], ["0vw", `-${(TOTAL_SECTIONS - 1) * 100}vw`]);

  useEffect(() => {
    const timer = setTimeout(() => { setMounted(true); setPanelsStarted(true); }, 2650);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const idx = Math.round(latest * (TOTAL_SECTIONS - 1));
      setActiveSection(idx);
    });
  }, [smoothProgress]);

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

  const scrollToSection = (idx: number) => {
    if (!tunnelRef.current) return;
    const target = (idx / (TOTAL_SECTIONS - 1)) * (tunnelRef.current.scrollHeight - window.innerHeight);
    tunnelRef.current.scrollTo({ top: target, behavior: "smooth" });
  };

  const fadeUp = (i: number) => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0, 0, 1] as [number, number, number, number] } },
  });

  return (
    <>
      <LoadingScreen />

      <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left" style={{ scaleX: smoothProgress, backgroundColor: "#111" }} />

      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
      >
        <div style={{
          padding: "10px 32px", borderRadius: "999px", background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.06)",
          display: "flex", gap: "28px", alignItems: "center",
          fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
        }}>
          {navItems.map((item, idx) => (
            <button key={item} onClick={() => scrollToSection(idx)}
              style={{
                fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
                fontWeight: 500, color: activeSection === idx ? "#111" : "#999",
                background: "none", border: "none", cursor: "pointer", transition: "color 0.3s",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.nav>

      <div ref={tunnelRef} className="relative" style={{ height: `${(TOTAL_SECTIONS - 1) * 100}vh` }} />

      <motion.div className="horizontal-track" style={{ x: trackX }}>
        {/* ════════ SECTION 0 — Studio ════════ */}
        <section style={{
          width: "100vw", minHeight: "100vh", flexShrink: 0, display: "flex",
          backgroundColor: "#ffffff", color: "#111",
          fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
        }}>
          <div style={{
            width: "65%", padding: "48px 64px 48px 80px",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <motion.div initial="hidden" animate={mounted ? "show" : "hidden"} variants={fadeUp(0)}
              style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
              {["About", "Projects", "Contact"].map((item, i) => (
                <span key={item}>
                  <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#111", fontWeight: 500 }}>{item}</span>
                  {i < 2 && <span style={{ marginLeft: "20px", color: "#999", fontSize: "8px" }}>•</span>}
                </span>
              ))}
            </motion.div>

            <motion.div initial="hidden" animate={mounted ? "show" : "hidden"} variants={fadeUp(1)}
              style={{ marginBottom: "60px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 500, whiteSpace: "nowrap" }}>Latest —</span>
              <span style={{ fontSize: "13px", color: "#444", fontWeight: 400, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>New identity system for Orbital — launched 2026</span>
            </motion.div>

            <motion.h1 initial="hidden" animate={mounted ? "show" : "hidden"} variants={fadeUp(2)}
              style={{ fontSize: "clamp(72px, 10vw, 180px)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", color: "#111", margin: "0 0 32px 0" }}>
              Studio<br />Arsy
            </motion.h1>

            <motion.p initial="hidden" animate={mounted ? "show" : "hidden"} variants={fadeUp(3)}
              style={{ fontSize: "15px", lineHeight: 1.7, color: "#555", maxWidth: "480px", fontWeight: 400, margin: "0 0 40px 0" }}>
              A design-led creative studio crafting digital products, brand identities, and immersive experiences for forward-thinking companies worldwide.
            </motion.p>

            <motion.button initial="hidden" animate={mounted ? "show" : "hidden"} variants={fadeUp(4)}
              onClick={() => scrollToSection(1)}
              style={{
                alignSelf: "flex-start", padding: "14px 36px", borderRadius: "999px", background: "#111", color: "#fff",
                border: "none", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer",
              }}
            >
              Explore Work
            </motion.button>
          </div>

          <div ref={parallaxRef} style={{ width: "35%", position: "relative", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop')",
              backgroundSize: "cover", backgroundPosition: "center",
              transform: `translateY(${parallaxY}px)`, transition: "transform 0.1s ease-out",
            }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: 2 }}>
              {panels.map((p, i) => (
                <motion.div key={i}
                  initial={{ scaleX: 1 }}
                  animate={panelsStarted ? { scaleX: 0 } : { scaleX: 1 }}
                  transition={{ duration: 1.4, delay: p.delay, ease: [0.65, 0, 0.35, 1] }}
                  style={{
                    width: p.width, height: "100%", backgroundColor: "#ffffff",
                    transformOrigin: "left center",
                    borderRight: i < panels.length - 1 ? "1px solid rgba(0,0,0,0.03)" : "none",
                  }}
                />
              ))}
            </div>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 100%)",
              zIndex: 1, pointerEvents: "none",
            }} />
          </div>
        </section>

        {/* ════════ SECTION 1 — Work ════════ */}
        <section style={{
          width: "100vw", minHeight: "100vh", flexShrink: 0,
          display: "flex", flexDirection: "column", justifyContent: "center", gap: "32px",
          background: "#0a0a0a", color: "#f5f5f5", padding: "0 6rem",
        }}>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a78bfa", marginBottom: "12px", display: "block" }}>Selected Work</span>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, margin: 0 }}>Featured Projects</h2>
          </motion.div>

          <div className="horizontal-scroll" style={{ display: "flex", gap: "32px", overflowX: "auto", paddingBottom: "16px" }}>
            {projects.map((project, idx) => (
              <motion.div key={project.id} className="flex-shrink-0" style={{ width: "460px" }}
                initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div style={{
                  borderRadius: "16px", overflow: "hidden",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  height: "420px", display: "flex", flexDirection: "column",
                  transition: "border-color 0.4s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <div style={{
                    height: "176px", display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                    background: `linear-gradient(135deg, ${project.gradient.split(" ").map(s => s.includes("from-") ? s.replace("from-", "#") : s.includes("via-") ? s.replace("via-", "#") : s.includes("to-") ? s.replace("to-", "#") : s).join(" ")})`,
                  }}>
                    <span style={{ fontSize: "64px", fontWeight: 700, color: "rgba(255,255,255,0.15)", position: "relative", zIndex: 1 }}>
                      {String(project.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a78bfa", marginBottom: "8px" }}>{project.category}</span>
                    <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 8px 0" }}>{project.title}</h3>
                    <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#999", margin: "0 0 16px 0", flex: 1 }}>{project.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {project.tech.map((t) => (
                        <span key={t} style={{ padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)", fontSize: "11px", color: "#888" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════ SECTION 2 — Skills ════════ */}
        <section style={{
          width: "100vw", minHeight: "100vh", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#0a0a0a", padding: "0 6rem",
        }}>
          <Skills />
        </section>

        {/* ════════ SECTION 3 — Contact ════════ */}
        <section style={{
          width: "100vw", minHeight: "100vh", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#0a0a0a", padding: "0 6rem",
        }}>
          <Contact />
        </section>
      </motion.div>

      <footer style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30,
        padding: "16px 80px", borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: "11px", color: "#666", letterSpacing: "0.05em",
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
      }}>
        <span>&copy; {new Date().getFullYear()} Studio Arsy</span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["GitHub", "Instagram", "LinkedIn"].map((s) => (
            <a key={s} href="#" style={{ color: "#666", textDecoration: "none", textTransform: "uppercase" }}>{s}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
