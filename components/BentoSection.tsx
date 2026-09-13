"use client";

import { motion } from "motion/react";
import TextReveal from "./TextReveal";
import MagicBento, { type BentoCardData } from "./animations/MagicBento";

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
            text="Skills & Tools."
            className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-accent-light sm:text-4xl"
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
