"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import StrokeText from "@/components/animations/StrokeText";
import MagicBento, { type BentoCardData } from "@/components/animations/MagicBento";
import Skills3DWrapper from "@/components/3d/Skills3DWrapper";

const SKILLS: BentoCardData[] = [
  {
    color: "#080f28",
    title: "Backend Development",
    description: "FastAPI, Node.js, REST & GraphQL APIs — building robust, scalable services.",
    label: "🖥️",
  },
  {
    color: "#080f28",
    title: "Database Management",
    description: "PostgreSQL, MySQL, Redis — schema design, indexing, and query optimization.",
    label: "🗄️",
  },
  {
    color: "#080f28",
    title: "System Architecture",
    description: "Microservices, caching, and API design — clean, maintainable system boundaries.",
    label: "🏗️",
  },
  {
    color: "#080f28",
    title: "API Development",
    description: "Auth, validation, documentation — production-grade, well-tested endpoints.",
    label: "🔌",
  },
  {
    color: "#080f28",
    title: "Tools & Workflow",
    description: "Git, Docker, CI/CD, Linux — streamlined development and deployment pipelines.",
    label: "⚙️",
  },
  {
    color: "#080f28",
    title: "Frontend Fundamentals",
    description: "React, Next.js, TypeScript — building clean, performant interfaces.",
    label: "💻",
  },
];

export default function BentoSection() {
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");

  return (
    <section id="skills" className="relative z-10 flex h-full w-full flex-col justify-center overflow-hidden bg-navy px-8 py-10 sm:px-14 sm:py-12 md:px-20">
      {/* Header & View Switcher */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-2 md:pt-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              <StrokeText
                text="Tech Ecosystem."
                responsive
                fontSize={36}
                fontWeight="inherit"
                letterSpacing="inherit"
                strokeColor="#38bdf8"
                fillColor="currentColor"
                strokeWidth={1.2}
                drawDuration={1.4}
                fillDelay={0.15}
                stagger={0.035}
                trigger="scroll"
                fillMode="wipe"
                wipeFrom="left"
              />
            </h2>
          </motion.div>

          {/* Mode Switcher Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center rounded-full border border-accent/30 bg-navy-light/60 p-1 backdrop-blur-md"
          >
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-medium transition-all duration-300 ${
                viewMode === "3d"
                  ? "bg-accent text-navy font-bold shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                  : "text-slate hover:text-white"
              }`}
            >
              <span>🪐</span>
              <span>3D Orbit</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-medium transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-accent text-navy font-bold shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                  : "text-slate hover:text-white"
              }`}
            >
              <span>🎴</span>
              <span>Bento Grid</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative my-auto flex w-full items-center justify-center py-2">
        <AnimatePresence mode="wait">
          {viewMode === "3d" ? (
            <motion.div
              key="3d-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-h-[calc(100vh-10rem)] overflow-y-auto"
            >
              <Skills3DWrapper />
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex w-full justify-center py-2 max-h-[calc(100vh-10rem)] overflow-y-auto"
            >
            <MagicBento
              cards={SKILLS}
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={true}
              spotlightRadius={240}
              particleCount={10}
              glowColor="56, 189, 248"
            />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}