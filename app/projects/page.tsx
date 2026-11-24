
"use client";

import { motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import ShapeGrid from "@/components/backgrounds/ShapeGrid";

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

    <main className="relative isolate min-h-screen overflow-hidden bg-[#020617] text-[#f0f9ff]">
        {/* ShapeGrid Background */}
        <div className="pointer-events-none fixed inset-0 z-0">
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
            glow={0.25}
            twinkle={0.05}
            fade={0.85}
            opacity={0.5}
            clickCascade={false}
            intro
            backgroundColor="transparent"
            className="h-full w-full"
        />
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-36 sm:px-10 md:px-14 lg:px-16">

        {/* Hero Section */}
        <motion.section
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <span className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
            Portfolio / Selected Works
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
            Featured Projects
            <span className="text-[#38bdf8]">.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base md:text-lg">
            A collection of projects I&apos;ve built through exploration,
            problem solving, and continuous learning in technology.
            </p>

            <div className="mt-8 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

            <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <span>Selected Works</span>
            <span className="h-1 w-1 rounded-full bg-sky-400" />
            <span>2024 — 2026</span>
            </div>
        </motion.section>

        {/* Projects Header */}
        <motion.div
            className="mt-24 mb-8 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400">
                Explore My Work
            </span>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Project Collection
                <span className="text-sky-400">.</span>
            </h2>
            </div>

            <span className="font-mono text-xs tracking-wider text-slate-500">
            06 PROJECTS / 01 COLLECTION
            </span>
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
            <motion.article
                key={project.number}
                className="group relative overflow-hidden rounded-2xl border border-sky-400/10 bg-[#071426]/90 shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-colors duration-500 hover:border-sky-400/40 hover:bg-[#0a1b32]"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                duration: 0.65,
                delay: (index % 3) * 0.1,
                ease: "easeOut",
                }}
                whileHover={{ y: -7 }}
            >
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#10243d]">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                    backgroundImage: `url("${project.image}")`,
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/10 to-transparent opacity-90" />

                <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#020617]/70 px-3 py-1.5 font-mono text-[10px] tracking-widest text-sky-300 backdrop-blur-md">
                    PROJECT / {project.number}
                </div>

                <div className="absolute bottom-5 left-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300">
                    {project.category}
                    </span>
                </div>

                <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/30 bg-[#071426]/80 text-lg text-sky-300 transition-all duration-300 group-hover:rotate-45 group-hover:border-sky-400 group-hover:bg-sky-400 group-hover:text-[#020617]">
                    ↗
                </div>
                </div>

                {/* Project Information */}
                <div className="p-6">
                <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-300">
                    {project.title}
                </h3>

                <p className="mt-3 min-h-[76px] text-sm leading-7 text-slate-400">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                    {project.technologies.map((technology) => (
                    <span
                        key={technology}
                        className="rounded-full border border-sky-400/15 bg-sky-400/[0.06] px-3 py-1.5 font-mono text-[10px] tracking-wide text-sky-200/80 transition-colors duration-300 group-hover:border-sky-400/30"
                    >
                        {technology}
                    </span>
                    ))}
                </div>
                </div>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-500 group-hover:w-full" />
            </motion.article>
            ))}
        </div>

        {/* Footer */}
        <motion.div
            className="mt-24 border-t border-white/10 pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
            More ideas. More experiments. More things to build.
            </p>
        </motion.div>
        </div>
    </main>
    </>
);
}