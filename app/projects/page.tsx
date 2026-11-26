
"use client";

import { motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShapeGrid from "@/components/backgrounds/ShapeGrid";
import { PinContainer } from "@/components/ui/3d-pin";

interface Project {
  number: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    number: "01",
    title: "E-Commerce Dashboard",
    description:
      "A dashboard concept for monitoring business performance, sales activity, and real-time analytics through an intuitive interface.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    category: "Web Application",
    technologies: ["React", "TypeScript", "Dashboard UI"],
  },
  {
    number: "02",
    title: "Design System",
    description:
      "A reusable component library focused on consistent interfaces, accessibility, and a scalable design foundation.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    category: "UI / UX",
    technologies: ["Figma", "Design System", "Components"],
  },
  {
    number: "03",
    title: "Portfolio Generator",
    description:
      "A portfolio generator concept that creates personalized developer websites from structured configuration data.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    category: "Developer Tool",
    technologies: ["Next.js", "TypeScript", "CLI"],
  },
  {
    number: "04",
    title: "Motion Playground",
    description:
      "An experimental playground exploring interactive interfaces, creative transitions, and scroll-driven animations.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    category: "Creative Development",
    technologies: ["React", "Motion", "GSAP"],
  },
  {
    number: "05",
    title: "Weather App",
    description:
      "A minimal weather application concept with clear information hierarchy and an engaging visual experience.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    category: "Web Application",
    technologies: ["React", "API Integration", "CSS"],
  },
  {
    number: "06",
    title: "Task Manager",
    description:
      "A task management concept for organizing workflows, tracking progress, and managing everyday productivity.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    category: "Productivity Tool",
    technologies: ["Next.js", "TypeScript", "UI Design"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="relative isolate min-h-screen overflow-hidden bg-[#020617] text-white">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-50">
          <ShapeGrid
            shape="square"
            direction="diagonal"
            lineColor="#10243d"
            hoverColor="#38bdf8"
            hoverFillColor="#0ea5e9"
            fillOpacity={0.05}
            cellSize={54}
            lineWidth={1}
            speed={0.15}
            radius={1.5}
            trail={0.7}
            glow={0.2}
            twinkle={0.04}
            fade={0.9}
            opacity={0.4}
            clickCascade={false}
            intro
            backgroundColor="transparent"
            className="h-full w-full"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-32 pt-36 sm:px-10 lg:px-16">

          {/* Hero */}
          <motion.section
            className="mx-auto max-w-4xl pb-24 text-center sm:pb-32"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl md:text-8xl">
              <br />
              Featured
              Projects<span className="text-sky-400">.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              A collection of projects I&apos;ve built through exploration,
              problem solving, and continuous learning in technology.
            </p>
          </motion.section>

          {/* Project Collection */}
          <section id="projects">
            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
              <h2 className="text-sm font-medium text-slate-300">
                Selected Works
              </h2>

              <span className="font-mono text-[10px] tracking-wider text-slate-500">
                2024 — 2026
              </span>
            </div>

            <div className="flex flex-col">
              {projects.map((project, index) => (
                <motion.article
                  key={project.number}
                  className="group relative grid grid-cols-1 items-center gap-8 border-b border-white/[0.08] py-14 first:pt-6 last:border-b-0 sm:py-20 lg:grid-cols-2 lg:gap-12 xl:gap-20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05,
                    ease: "easeOut",
                  }}
                >
                  {/* 3D Animated Pin */}
                    <div
                    className={`relative flex min-h-[350px] items-center justify-center sm:min-h-[410px] ${
                        index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                    }`}
                    >
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.045] blur-[90px]" />

                    <PinContainer
                      title={project.title}
                      href="#projects"
                      containerClassName="relative z-10 flex h-[25rem] w-full max-w-[25rem] items-center justify-center"
                      className="w-[21rem] max-w-[calc(100vw-5rem)]"
                    >
                      <div className="flex w-full flex-col gap-3 tracking-tight text-white">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sky-400">
                              Project {project.number}
                            </span>

                            <h3 className="mt-1 truncate text-lg font-semibold">
                              {project.title}
                            </h3>
                          </div>

                          <span className="font-mono text-[10px] text-slate-500">
                            {project.number} / 06
                          </span>
                        </div>

                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#10243d]">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/pin:scale-105"
                            style={{
                              backgroundImage: `url("${project.image}")`,
                            }}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/30 to-transparent" />
                        </div>
                      </div>
                    </PinContainer>
                  </div>

                  {/* Project Information */}
                    <div
                    className={`relative flex flex-col justify-center lg:py-10 ${
                        index % 2 === 0
                        ? "lg:order-2 lg:items-end lg:text-right"
                        : "lg:order-1 lg:items-start lg:text-left"
                    }`}
                    >
                    <div className={`flex items-center gap-3 ${
                    index % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}>
                      <span className="font-mono text-xs text-sky-400">
                        {project.number}
                      </span>

                      <span className="h-px w-8 bg-slate-700" />

                      <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mt-6 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-sky-300 sm:text-4xl lg:text-5xl">
                      {project.title}
                      <span className="text-sky-400">.</span>
                    </h3>

                    <p className="mt-6 max-w-lg text-sm leading-8 text-slate-400 sm:text-base">
                      {project.description}
                    </p>

                    <div className="mt-9">
                      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        Built with
                      </p>

                      <div className={`flex flex-wrap gap-x-5 gap-y-3 ${
                        index % 2 === 0 ? "lg:justify-end" : ""
                        }`}>
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="text-xs text-slate-300 transition-colors duration-300 group-hover:text-sky-200 sm:text-sm"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </>
  );
}
