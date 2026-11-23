"use client";

import { motion } from "motion/react";
import StrokeText from "@/components/animations/StrokeText";
import ShapeGrid from "@/components/backgrounds/ShapeGrid";
import { CircularCarousel } from "@/components/ui/circular-carousel";
import type { CarouselItem } from "@/components/ui/circular-carousel";

const ACHIEVEMENTS: CarouselItem[] = [
{
    id: "01",
    title: "Nebula Engine",
    description:
    "Real-time rendering pipeline built for immersive 3D worlds.",
    tag: "Graphics",
},
{
    id: "02",
    title: "Quantum Sync",
    description:
    "Instant state replication across every connected device.",
    tag: "Realtime",
},
{
    id: "03",
    title: "Aurora Analytics",
    description:
    "Insightful dashboards that surface trends as they happen.",
    tag: "Data",
},
{
    id: "04",
    title: "Pulse Notifications",
    description:
    "Timely, contextual alerts that keep users in the loop.",
    tag: "Messaging",
},
{
    id: "05",
    title: "Vault Security",
    description:
    "End-to-end encryption with zero-trust access controls.",
    tag: "Security",
},
{
    id: "06",
    title: "Forge CI",
    description:
    "Blazing-fast build and deploy pipelines out of the box.",
    tag: "DevOps",
},
];

export default function AchievementsSection() {
return (
    <section
    id="achievements"
    className="
        relative isolate z-10 flex min-h-[720px] w-full
        flex-col justify-center overflow-hidden
    bg-navy px-6 py-24
        sm:px-14 md:px-20 md:py-28
    "
    >
        {/* Animated ShapeGrid Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
        <ShapeGrid
            shape="square"
            direction="diagonal"
            lineColor="#12304a"
            hoverColor="#38bdf8"
            hoverFillColor="#0ea5e9"
            fillOpacity={0.09}
            cellSize={46}
            lineWidth={1}
            speed={0.24}
            radius={1.5}
            trail={0.75}
            glow={0.25}
            twinkle={0.07}
            fade={0.85}
            opacity={0.5}
            clickCascade={false}
            intro
            backgroundColor="transparent"
            className="h-full w-full"
        />
        </div>
    {/* Background accents */}
    <div className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[120px]" />

    <div className="pointer-events-none absolute -bottom-40 -left-40 h-[25rem] w-[25rem] rounded-full bg-blue-500/5 blur-[120px]" />

    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        {/* Section heading */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="flex w-full flex-col items-center text-center"
        >
        <h2 className="mx-auto mt-4 w-full max-w-5xl text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            <StrokeText
                text="Achievements & Certifications."
                responsive
                fontSize={56}
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
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
                />
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
            A collection of milestones, recognitions, and certifications
            that represent continuous learning, dedication, and professional
            growth throughout my journey.
        </p>
        </motion.div>

        {/* Circular Achievement Carousel */}
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="mt-12 flex w-full justify-center sm:mt-16"
        >
        <CircularCarousel
            items={ACHIEVEMENTS}
            autoPlay
            autoPlayInterval={4000}
            className="w-full max-w-3xl"
        />
        </motion.div>
    </div>
    </section>
);
}