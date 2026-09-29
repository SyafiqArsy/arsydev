"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TextReveal from "./TextReveal";
import MagicBento, { type BentoCardData } from "./animations/MagicBento";
import Skills3DWrapper from "./Skills3DWrapper";

const SKILLS: BentoCardData[] = [
  {
    color: "#0a0f1c",
    title: "Backend Development",
    description: "FastAPI, Node.js, REST & GraphQL APIs — building robust, scalable services.",
    label: "🖥️",
  },
  {
    color: "#0a0f1c",
    title: "Database Management",
    description: "PostgreSQL, MySQL, Redis — schema design, indexing, and query optimization.",
    label: "🗄️",
  },
  {
    color: "#0a0f1c",
    title: "System Architecture",
    description: "Microservices, caching, and API design — clean, maintainable system boundaries.",
    label: "🏗️",
  },
  {
    color: "#0a0f1c",
    title: "API Development",
    description: "Auth, validation, documentation — production-grade, well-tested endpoints.",
    label: "🔌",
  },
  {
    color: "#0a0f1c",
    title: "Tools & Workflow",
    description: "Git, Docker, CI/CD, Linux — streamlined development and deployment pipelines.",
    label: "⚙️",
  },
  {
    color: "#0a0f1c",
    title: "Frontend Fundamentals",
    description: "React, Next.js, TypeScript — building clean, performant interfaces.",
    label: "💻",
  },
];

export default function BentoSection() {
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");

  return (
    <section id="skills" className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden bg-navy px-8 py-10 sm:px-14 sm:py-12 md:px-20 md:py-14">
      {/* Header & View Switcher */}
      <div className="mx-auto w-full max-w-6xl px-2">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-slate">
              Skills & Tools
            </p>
            <TextReveal
              as="h2"
              text="Skills & Tools."
              className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-accent-light sm:text-3xl md:text-4xl"
            />
          </motion.div>

          {/* Mode Switcher Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center rounded-full border border-accent/30 bg-navy-light/40 p-1 backdrop-blur-md"
          >
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                viewMode === "3d"
                  ? "bg-accent text-white shadow-[0_0_20px_rgba(91,141,239,0.5)]"
                  : "text-slate hover:text-white"
              }`}
            >
              <span>🪐</span>
              <span>3D Orbit</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-accent text-white shadow-[0_0_20px_rgba(91,141,239,0.5)]"
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
              className="w-full"
            >
              <Skills3DWrapper />
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex w-full justify-center py-4"
            >
              <MagicBento
                cards={SKILLS}
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="91, 141, 239"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
