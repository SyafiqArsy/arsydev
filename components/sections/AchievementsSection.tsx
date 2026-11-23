
"use client";

import { motion } from "motion/react";
import StrokeText from "@/components/animations/StrokeText";

interface Achievement {
id: string;
category: string;
title: string;
organization: string;
year: string;
description: string;
type: string;
featured?: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
{
    id: "01",
    category: "Certification",
    title: "Certification Title Goes Here",
    organization: "Issuing Organization",
    year: "2026",
    description:
    "Add a short description about this certification and the knowledge or skills demonstrated.",
    type: "CERTIFICATE",
    featured: true,
},
{
    id: "02",
    category: "Achievement",
    title: "Achievement Title Goes Here",
    organization: "Institution / Organization",
    year: "2026",
    description:
    "Describe your achievement, the challenge you completed, and the recognition you received.",
    type: "AWARD",
},
{
    id: "03",
    category: "Certification",
    title: "Certification Title Goes Here",
    organization: "Issuing Organization",
    year: "2025",
    description:
    "Add information about the certification and its relevance to your professional development.",
    type: "CERTIFICATE",
},
];

export default function AchievementsSection() {
return (
    <section
    id="achievements"
    className="relative z-10 overflow-hidden bg-navy px-8 py-24 sm:px-14 md:px-20 md:py-32"
    >
    {/* Background accents */}
    <div className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[120px]" />
    <div className="pointer-events-none absolute -bottom-40 -left-40 h-[25rem] w-[25rem] rounded-full bg-blue-500/5 blur-[120px]" />

    <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
        <div>

            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                <StrokeText
                    text="Achievements & Certifications."
                    responsive
                    fontSize={48}
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
        </div>

        <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-sm text-sm leading-relaxed text-slate sm:text-base"
        >
            A collection of milestones, recognitions, and certifications
            that represent continuous learning and professional growth.
        </motion.p>
        </div>

        {/* Achievement cards */}
        <div className="grid gap-4 md:grid-cols-2">
        {ACHIEVEMENTS.map((item, index) => (
            <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-navy/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-navy sm:p-8 ${
                item.featured ? "md:row-span-2 md:min-h-[540px]" : ""
            }`}
            >
            {/* Decorative number */}
            <span className="pointer-events-none absolute -right-3 -top-8 font-mono text-[110px] font-bold leading-none text-white/[0.025] transition-colors duration-500 group-hover:text-accent/[0.06] sm:text-[140px]">
                {item.id}
            </span>

            <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent sm:text-[10px]">
                    {item.category}
                </span>

                <span className="font-mono text-[10px] tracking-widest text-slate/50">
                    {item.year}
                </span>
                </div>

                {item.featured && (
                <div className="my-8 flex h-28 w-28 items-center justify-center rounded-2xl border border-accent/20 bg-accent/5 sm:my-12 sm:h-36 sm:w-36">
                    <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    className="h-14 w-14 text-accent sm:h-20 sm:w-20"
                    >
                    <path
                        d="M32 5L39 12L49 11L51 21L59 27L54 36L57 46L47 51L43 60L32 57L21 60L17 51L7 46L10 36L5 27L13 21L15 11L25 12L32 5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M22 32L29 39L43 25"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                </div>
                )}

                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-slate/50">
                {item.type}
                </p>

                <h3 className="max-w-md text-xl font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                {item.title}
                </h3>

                <p className="mt-2 text-xs font-medium text-accent/70 sm:text-sm">
                {item.organization}
                </p>

                <p className="mt-4 max-w-md text-xs leading-relaxed text-slate/65 sm:text-sm">
                {item.description}
                </p>
            </div>

            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/[0.07] pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate/40">
                ARSYDEV / {item.id}
                </span>

                <span className="text-lg text-accent/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                ↗
                </span>
            </div>
            </motion.article>
        ))}
        </div>
    </div>
    </section>
);
}