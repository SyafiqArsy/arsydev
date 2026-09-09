"use client";

import { motion } from "motion/react";
import TextReveal from "./TextReveal";
import MagicBento, { type BentoCardData } from "./animations/MagicBento";

const SKILLS: BentoCardData[] = [
  {
    color: "#111a2e",
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS — building performant, accessible UIs.",
    label: "💻",
  },
  {
    color: "#111a2e",
    title: "UI/UX Design",
    description: "Figma, design systems, user research — crafting intuitive interfaces.",
    label: "🎨",
  },
  {
    color: "#111a2e",
    title: "Motion Design",
    description: "GSAP, Framer Motion, scroll-driven animations — bringing interfaces to life.",
    label: "✨",
  },
  {
    color: "#111a2e",
    title: "Creative Coding",
    description: "Three.js, Canvas API, WebGL — generative art and interactive experiences.",
    label: "🧪",
  },
  {
    color: "#111a2e",
    title: "Tools & Workflow",
    description: "Git, CI/CD, VS Code — streamlined development pipelines.",
    label: "⚙️",
  },
  {
    color: "#111a2e",
    title: "Backend Basics",
    description: "Node.js, REST APIs, PostgreSQL — full-stack awareness.",
    label: "🔧",
  },
];

export default function BentoSection() {
  return (
    <section id="skills" className="relative z-10 bg-navy px-6 py-28 sm:px-10 md:px-16">
      <div className="mx-auto max-w-6xl">
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
            text="What I Work With."
            className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-accent-light sm:text-5xl md:text-6xl"
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
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
    </section>
  );
}
