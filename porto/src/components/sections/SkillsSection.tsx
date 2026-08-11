"use client";

import { motion } from "framer-motion";
import { RadarAxis } from "../ui/charts/radar-axis";
import { RadarChart, RadarData, RadarMetric } from "../ui/charts/radar-chart";
import { RadarGrid } from "../ui/charts/radar-grid";
import { RadarLabels } from "../ui/charts/radar-labels";
import { RadarArea } from "../ui/charts/radar-area";
import { RadarPointer } from "../ui/charts/radar-pointer";
import { RadarHoverLabel } from "../ui/charts/radar-hover-label";

const skillMetrics: RadarMetric[] = [
  { key: "frontend", label: "Frontend", max: 100 },
  { key: "design", label: "Creative Design", max: 100 },
  { key: "backend", label: "Backend Dev", max: 100 },
  { key: "databases", label: "Databases", max: 100 },
  { key: "devops", label: "DevOps/Tools", max: 100 },
  { key: "motion", label: "Motion Design", max: 100 },
];

const skillData: RadarData[] = [
  {
    key: "my-profile",
    values: {
      frontend: 95,
      design: 88,
      backend: 85,
      databases: 75,
      devops: 90,
      motion: 80,
    },
  },
];

const toolCategories = [
  {
    title: "Frontend & UI",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Shadcn UI",
      "GSAP",
    ],
  },
  {
    title: "Design & UX",
    tools: ["Figma", "Adobe XD", "UI/UX Prototyping", "Illustration", "Brand Identity"],
  },
  {
    title: "Backend & Infra",
    tools: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "RESTful APIs",
      "Docker",
      "Git/GitHub",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section
      className="horizontal-section" // Re-use existing horizontal section styling
      style={{
        background: "var(--chart-background)", // Use chart background variable
        padding: "0 6rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16 py-20">
        {/* Left Column: Text and Tool Chips */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4 block">
              Expertise
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Skills & <span className="gradient-text">Tools</span>
            </h2>
            <p className="mt-6 text-lg text-slate-400 max-w-md">
              A comprehensive overview of my technical proficiencies and the tools I leverage to build modern web experiences.
            </p>
          </motion.div>

          {/* Tool Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg lg:max-w-none">
            {toolCategories.map((category, catIdx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + catIdx * 0.1 }}
                className="col-span-1"
              >
                <h3 className="text-md font-semibold mb-3 text-slate-300">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool, toolIdx) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + catIdx * 0.1 + toolIdx * 0.05 }}
                      className="px-4 py-2 bg-slate-800 bg-opacity-50 border border-slate-700 rounded-full text-sm text-slate-300
                                 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300 cursor-pointer shadow-md"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 relative mt-16 lg:mt-0"
        >
          <RadarChart metrics={skillMetrics} data={skillData} size={400}>
            <RadarGrid levels={4} />
            <RadarAxis />
            <RadarArea dataKey="my-profile" glow={true} fillOpacity={0.3} />
            <RadarPointer dataKey="my-profile" />
            <RadarLabels labelOffset={25} labelFontSize={12} />
            <RadarHoverLabel />
          </RadarChart>
        </motion.div>
      </div>
    </section>
  );
}
