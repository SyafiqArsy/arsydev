"use client";

import { useEffect, useState } from "react";
import { Variants } from "framer-motion";
import HeroSection from "./components/Hero/HeroSection";
import Footer from "./components/Layout/Footer";

const stagger: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 2.6 + i * 0.15,
      ease: [0.25, 0, 0, 1] as [number, number, number, number],
    },
  }),
};

export default function CompanyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        color: "#0b1d3a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ===== TWO-COLUMN LAYOUT ===== */}
      <HeroSection mounted={mounted} stagger={stagger} />

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
