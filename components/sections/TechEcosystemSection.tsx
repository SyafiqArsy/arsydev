
"use client";

import { motion } from "motion/react";
import StrokeText from "@/components/animations/StrokeText";
import ShapeGrid from "@/components/backgrounds/ShapeGrid";
import Skills3DWrapper from "@/components/3d/Skills3DWrapper";

export default function BentoSection() {
  return (
    <section
      id="skills"
      className="relative isolate z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-navy px-6 py-10 sm:px-10 md:px-16"
    >
      {/* Animated ShapeGrid Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="#10243d"
          hoverColor="#38bdf8"
          hoverFillColor="#0ea5e9"
          fillOpacity={0.08}
          cellSize={48}
          lineWidth={1}
          speed={0.2}
          radius={1.5}
          trail={0.7}
          glow={0.2}
          twinkle={0.05}
          fade={0.85}
          opacity={0.4}
          clickCascade={false}
          intro
          backgroundColor="transparent"
          className="h-full w-full"
        />
      </div>

      {/* Tech Ecosystem Heading */}
      <motion.div
        className="relative z-10 w-full max-w-6xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
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

      {/* 3D Technology Orbit */}
      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <Skills3DWrapper />
      </motion.div>
    </section>
  );
}