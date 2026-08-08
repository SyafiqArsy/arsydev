"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PanelReveal from "@/components/ui/PanelReveal";
import { fadeUp } from "@/lib/animations";
import { useParallax } from "@/hooks/useParallax";

interface HeroSectionProps {
  /** Callback untuk menggulir ke section Projects (Work). */
  scrollToProjects: () => void;
}

const navItems = ["About", "Projects", "Contact"];

export default function HeroSection({ scrollToProjects }: HeroSectionProps) {
  const { parallaxRef, parallaxY } = useParallax(0.08, 40);
  const [panelsStarted, setPanelsStarted] = useState(false);

  // Mulai reveal panel setelah hero terpasang (loading selesai).
  useEffect(() => {
    setPanelsStarted(true);
  }, []);

  return (
    <section
      style={{
        width: "100vw",
        minHeight: "100vh",
        flexShrink: 0,
        display: "flex",
        backgroundColor: "#ffffff",
        color: "#0b1d3a",
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
      }}
    >
      {/* ─── KIRI (65%) — Teks hero ─── */}
      <div
        style={{
          width: "65%",
          padding: "48px 64px 48px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}
        >
          {navItems.map((item, i) => (
            <span key={item}>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#0b1d3a",
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
              {i < navItems.length - 1 && (
                <span style={{ marginLeft: "20px", color: "#9aa7bd", fontSize: "8px" }}>•</span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          style={{ marginBottom: "60px", display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#7c97c0",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Latest —
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "#44526b",
              fontWeight: 400,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            New identity system for Orbital — launched 2026
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={2}
          style={{
            fontSize: "clamp(72px, 10vw, 180px)",
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#0b1d3a",
            margin: "0 0 32px 0",
          }}
        >
          Studio
          <br />
          Arsy
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={3}
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#44526b",
            maxWidth: "480px",
            fontWeight: 400,
            margin: "0 0 40px 0",
          }}
        >
          A design-led creative studio crafting digital products, brand identities,
          and immersive experiences for forward-thinking companies worldwide.
        </motion.p>

        <motion.button
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={4}
          onClick={scrollToProjects}
          style={{
            alignSelf: "flex-start",
            padding: "14px 36px",
            borderRadius: "999px",
            background: "#0b1d3a",
            color: "#fff",
            border: "none",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Explore Work
        </motion.button>
      </div>

      {/* ─── KANAN (35%) — Artwork dengan parallax & reveal panel ─── */}
      <div
        ref={parallaxRef}
        style={{
          width: "35%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#e8eef6",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxY}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />

        <PanelReveal started={panelsStarted} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
