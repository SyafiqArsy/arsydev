"use client";

import { motion, type MotionValue } from "framer-motion";

interface NavbarProps {
  /** Progress scroll keseluruhan (untuk progress bar & penanda section). */
  progress: MotionValue<number>;
  /** Section yang sedang aktif (0–3). */
  activeSection: number;
  /** Scroll ke section tujuan. */
  scrollToSection: (idx: number) => void;
}

const navItems = ["Studio", "Work", "Skills", "Contact"];

export default function Navbar({ progress, activeSection, scrollToSection }: NavbarProps) {
  return (
    <>
      {/* Progress bar di atas layar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{ scaleX: progress, backgroundColor: "#4a7bc4" }}
      />

      {/* Navbar pill mengambang */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
      >
        <div
          style={{
            padding: "10px 32px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            gap: "28px",
            alignItems: "center",
            fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
          }}
        >
          {navItems.map((item, idx) => (
            <button
              key={item}
              onClick={() => scrollToSection(idx)}
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: activeSection === idx ? "#0b1d3a" : "#9aa7bd",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
