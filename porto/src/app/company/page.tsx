"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const panels = [
  { width: "22%", delay: 0.2 },
  { width: "18%", delay: 0.5 },
  { width: "25%", delay: 0.35 },
  { width: "15%", delay: 0.65 },
  { width: "20%", delay: 0.8 },
];

const stagger = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 2.6 + i * 0.15, ease: [0.25, 0, 0, 1] as [number, number, number, number] },
  }),
};

export default function CompanyPage() {
  const [mounted, setMounted] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    setMounted(true);

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

  if (!mounted) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        color: "#111111",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ===== TWO-COLUMN LAYOUT ===== */}
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* ─── LEFT COLUMN (65%) ─── */}
        <div
          style={{
            width: "65%",
            padding: "48px 64px 48px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Navigation */}
          <motion.nav
            custom={0}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={stagger}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            {["About", "Projects", "Contact"].map((item, i) => (
              <span key={item}>
                <a
                  href="#"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#111111",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </a>
                {i < 2 && (
                  <span
                    style={{
                      marginLeft: "20px",
                      color: "#999",
                      fontSize: "8px",
                    }}
                  >
                    •
                  </span>
                )}
              </span>
            ))}
          </motion.nav>

          {/* Announcement / News ticker */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={stagger}
            style={{
              marginBottom: "60px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#888",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Latest —
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "#444",
                fontWeight: 400,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              New identity system for Orbital — launched 2026
            </span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            custom={2}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={stagger}
            style={{
              fontSize: "clamp(72px, 10vw, 180px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "#111111",
              margin: "0 0 32px 0",
            }}
          >
            Studio
            <br />
            Arsy
          </motion.h1>

          {/* Description */}
          <motion.p
            custom={3}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={stagger}
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "#555",
              maxWidth: "480px",
              fontWeight: 400,
              margin: 0,
            }}
          >
            A design-led creative studio crafting digital products, brand
            identities, and immersive experiences for forward-thinking
            companies worldwide.
          </motion.p>
        </div>

        {/* ─── RIGHT COLUMN (35%) — Visual / Artwork ─── */}
        <div
          ref={parallaxRef}
          style={{
            width: "35%",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#f0f0f0",
          }}
        >
          {/* The image behind panels */}
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

          {/* Animated reveal panels */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              zIndex: 2,
            }}
          >
            {panels.map((p, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{
                  duration: 1.4,
                  delay: 2.6 + p.delay,
                  ease: [0.65, 0, 0.35, 1],
                }}
                style={{
                  width: p.width,
                  height: "100%",
                  backgroundColor: "#ffffff",
                  transformOrigin: "left center",
                  borderRight: i < panels.length - 1 ? "1px solid rgba(0,0,0,0.03)" : "none",
                }}
              />
            ))}
          </div>

          {/* Subtle overlay on the image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          padding: "24px 80px",
          borderTop: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
          color: "#999",
          letterSpacing: "0.05em",
        }}
      >
        <span>&copy; 2026 Studio Arsy</span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Twitter", "Instagram", "LinkedIn"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                color: "#999",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
