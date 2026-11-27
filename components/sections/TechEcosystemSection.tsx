"use client";

import { motion } from "motion/react";
import StrokeText from "@/components/animations/StrokeText";
import ShapeGrid from "@/components/backgrounds/ShapeGrid";
import Skills3DWrapper from "@/components/3d/Skills3DWrapper";

import {
  RadarChart,
} from "@/components/charts/radar-chart";
import { RadarArea } from "@/components/charts/radar-area";
import { RadarAxis } from "@/components/charts/radar-axis";
import { RadarGrid } from "@/components/charts/radar-grid";
import { RadarLabels } from "@/components/charts/radar-labels";

// =====================================================
// SKILL COMPETENCY PLACEHOLDER
// Ubah nilai 0-100 berikut sesuai kemampuan sebenarnya.
// =====================================================

const SKILL_METRICS = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "api", label: "API" },
  { key: "database", label: "Database" },
  { key: "cloud", label: "Cloud" },
  { key: "devops", label: "DevOps" },
  { key: "linux", label: "Linux" },
  { key: "architecture", label: "System" },
  { key: "programming", label: "Coding" },
  { key: "iot", label: "IoT" },
];

const SKILL_DATA = [
  {
    label: "Technical Skills",
    color: "#38bdf8",
    values: {
      frontend: 80,
      backend: 70,
      api: 75,
      database: 65,
      cloud: 60,
      devops: 55,
      linux: 70,
      architecture: 60,
      programming: 85,
      iot: 45,
    },
  },
];

export default function TechEcosystemSection() {
  return (
    <section
      id="skills"
      className="relative isolate z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-navy px-4 py-4 sm:px-8 md:px-12 lg:py-8"
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

      {/* Heading */}
      <motion.div
        className="relative z-10 w-full max-w-6xl shrink-0 text-center"
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

      {/* Technology Orbit & Radar Chart */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-2 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4">

        {/* 3D Technology Orbit */}
        <motion.div
          className="relative flex w-full items-center justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="w-full">
            <Skills3DWrapper />
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          className="relative mx-auto flex w-full max-w-[460px] items-center justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div
            className="w-full"
            style={{
              "--chart-background": "#080f28",
              "--chart-foreground": "#f0f9ff",
              "--chart-foreground-muted": "#94a3b8",
              "--chart-label": "#cbd5e1",
              "--chart-grid": "rgba(148, 163, 184, 0.2)",
            } as React.CSSProperties}
          >
            <RadarChart
              data={SKILL_DATA}
              metrics={SKILL_METRICS}
              levels={5}
              margin={58}
              animate
              className="w-full"
            >
              <RadarGrid
                showLabels
                stroke="rgba(148, 163, 184, 0.25)"
                strokeOpacity={0.7}
              />

              <RadarAxis
                stroke="#64748b"
                strokeOpacity={0.5}
              />

              <RadarLabels
                offset={22}
                fontSize={10}
              />

              <RadarArea
                index={0}
                color="#38bdf8"
                showPoints
                showStroke
                showGlow
              />
            </RadarChart>
          </div>
        </motion.div>
      </div>
    </section>
  );
}