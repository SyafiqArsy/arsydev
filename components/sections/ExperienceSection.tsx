
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import StrokeText from "@/components/animations/StrokeText";
import ShapeGrid from "@/components/backgrounds/ShapeGrid";

interface ExperienceItem {
id: string;
category: string;
period: string;
role: string;
organization: string;
description: string;
type: string;
}

const EXPERIENCES: ExperienceItem[] = [
{
    id: "01",
    category: "Professional Experience",
    period: "MONTH YEAR — PRESENT",
    role: "Backend Developer",
    organization: "Company / Organization Name",
    description:
    "Describe your responsibilities, backend development work, API implementation, and contributions to the team.",
    type: "WORK",
},
{
    id: "02",
    category: "Organization",
    period: "MONTH YEAR — MONTH YEAR",
    role: "Head of Organization",
    organization: "Student Organization Name",
    description:
    "Describe your leadership responsibilities, team coordination, organizational programs, and achievements.",
    type: "LEADERSHIP",
},
{
    id: "03",
    category: "Education",
    period: "YEAR — PRESENT",
    role: "Informatics Engineering Student",
    organization: "University / Institution Name",
    description:
    "Describe your academic journey, technical interests, coursework, and relevant academic achievements.",
    type: "EDUCATION",
},
{
    id: "04",
    category: "Project Experience",
    period: "MONTH YEAR — MONTH YEAR",
    role: "Full-Stack Developer",
    organization: "Project / Product Name",
    description:
    "Describe a project you developed, the technologies used, your contributions, and the problems you solved.",
    type: "PROJECT",
},
{
    id: "05",
    category: "Professional Development",
    period: "MONTH YEAR — MONTH YEAR",
    role: "Cloud Computing Learner",
    organization: "Training / Learning Platform",
    description:
    "Describe your learning journey in cloud infrastructure, deployment, networking, and cloud technologies.",
    type: "LEARNING",
},
{
    id: "06",
    category: "Achievement",
    period: "MONTH YEAR",
    role: "Certification / Achievement Title",
    organization: "Issuing Organization",
    description:
    "Add relevant certifications, competitions, recognitions, or other milestones from your development journey.",
    type: "ACHIEVEMENT",
},
];

interface ExperienceSectionProps {
    scrollProgress: MotionValue<number>;
}

export default function ExperienceSection({
    scrollProgress,
}: ExperienceSectionProps) {
const timelineViewportRef = useRef<HTMLDivElement>(null);
const timelineContentRef = useRef<HTMLDivElement>(null);

const [timelineBounds, setTimelineBounds] = useState({
    start: 0,
    end: 0,
    maxScroll: 0,
});

const GLOW_HEIGHT = 24;

// Measure timeline markers and available page-driven scroll distance.
useLayoutEffect(() => {
    const content = timelineContentRef.current;
    const viewport = timelineViewportRef.current;

    if (!content || !viewport) return;

    const updateTimelineBounds = () => {
        const firstMarker = content.querySelector<HTMLElement>(
            '[data-timeline-marker="first"]'
        );

        const lastMarker = content.querySelector<HTMLElement>(
            '[data-timeline-marker="last"]'
        );

        if (!firstMarker || !lastMarker) return;

        const getMarkerCenter = (marker: HTMLElement) => {
            const article = marker.closest<HTMLElement>("article");

            if (!article) return 0;

            return (
                article.offsetTop +
                marker.offsetTop +
                marker.offsetHeight / 2
            );
        };

        const start = getMarkerCenter(firstMarker);
        const end = getMarkerCenter(lastMarker);
        const maxScroll = Math.max(
            0,
            content.scrollHeight - viewport.clientHeight
        );

        setTimelineBounds((previous) => {
            if (
                previous.start === start &&
                previous.end === end &&
                previous.maxScroll === maxScroll
            ) {
                return previous;
            }

            return { start, end, maxScroll };
        });
    };

    updateTimelineBounds();

    const observer = new ResizeObserver(updateTimelineBounds);
    observer.observe(content);
    observer.observe(viewport);

    window.addEventListener("resize", updateTimelineBounds);

    return () => {
        observer.disconnect();
        window.removeEventListener("resize", updateTimelineBounds);
    };
}, []);

// Animate glow strictly between the first and last marker.
const timelineY = useTransform(
    scrollProgress,
    [0, 1],
    [0, -timelineBounds.maxScroll]
);

const glowTop = useTransform(
    scrollProgress,
    [0, 1],
    [
        timelineBounds.start,
        Math.max(
            timelineBounds.start,
            timelineBounds.end - GLOW_HEIGHT
        ),
    ]
);

return (
    <section
    id="experience"
    className="relative isolate flex h-full w-full flex-col justify-center overflow-hidden bg-navy px-8 py-10 sm:px-14 md:px-20"
    >
        {/* Animated ShapeGrid Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
            <ShapeGrid
                shape="square"
                direction="diagonal"
                lineColor="#10243d"
                hoverColor="#38bdf8"
                hoverFillColor="#0ea5e9"
                fillOpacity={0.06}
                cellSize={52}
                lineWidth={1}
                speed={0.18}
                radius={1.5}
                trail={0.65}
                glow={0.18}
                twinkle={0.04}
                fade={0.9}
                opacity={0.35}
                clickCascade={false}
                intro
                backgroundColor="transparent"
                className="h-full w-full"
            />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            {/* Left: Section introduction */}
            <div className="flex flex-col justify-center">
            <h2 className="mt-4 max-w-lg text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                <StrokeText
                text="Experience & Journey."
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

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 max-w-md text-sm leading-relaxed text-slate sm:text-base"
            >
                Every experience is a step forward. A collection of milestones,
                challenges, and lessons that shape my professional journey.
            </motion.p>
            </div>

            
            {/* Right: Scrollable Timeline */}
            <div className="relative min-h-0 min-w-0 w-full">

                <div
                    ref={timelineViewportRef}
                    style={{
                        maskImage:
                            "linear-gradient(to bottom, transparent 0px, black 36px, black calc(100% - 36px), transparent 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, transparent 0px, black 36px, black calc(100% - 36px), transparent 100%)",
                    }}
                    className="
                        relative z-10 h-[52vh] w-full min-w-0 max-w-full
                        overflow-hidden pr-2
                        lg:h-[72vh]
                    "
                >

                <motion.div
                    ref={timelineContentRef}
                    style={{ y: timelineY }}
                    className="relative flex w-full min-w-0 flex-col gap-4 py-10 sm:gap-5"
                >
                    {/* Continuous Timeline Track */}
                    <div
                        style={{
                            top: timelineBounds.start,
                            height: Math.max(
                                0,
                                timelineBounds.end - timelineBounds.start
                            ),
                        }}
                        className="
                        pointer-events-none absolute
                        left-[15.5px] z-0
                        w-px bg-sky-400/40
                        sm:left-[20.5px]
                        "
                    />

                    {/* Moving Timeline Glow */}
                    <motion.div
                        style={{ top: glowTop }}
                        className="
                        pointer-events-none absolute
                        left-[14.5px] z-0
                        h-6 w-[3px] rounded-full
                        bg-gradient-to-b from-transparent via-sky-300 to-transparent
                        shadow-[0_0_8px_rgba(56,189,248,0.9),0_0_20px_rgba(56,189,248,0.65)]
                        sm:left-[19.5px]
                        "
                    />
                    {EXPERIENCES.map((item, index) => (
                        <motion.article
                        key={item.id}
                        initial={{
                            opacity: 0,
                            y: 28,
                            scale: 0.94,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.2,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 22,
                            delay: index * 0.05,
                        }}
                        className="group relative w-full min-w-0 pl-10 sm:pl-12"
                        >
                        {/* Timeline marker */}
                        <div
                            data-timeline-marker={
                                index === 0
                                    ? "first"
                                    : index === EXPERIENCES.length - 1
                                        ? "last"
                                        : undefined
                            }
                            className="
                            absolute left-[9px] top-6 z-10 flex h-3.5 w-3.5
                            items-center justify-center rounded-full
                            border border-sky-400/60 bg-navy
                            transition-all duration-300
                            group-hover:scale-125
                            group-hover:border-sky-300
                            group-hover:bg-sky-400
                            group-hover:shadow-[0_0_20px_rgba(56,189,248,0.9)]
                            sm:left-[13px] sm:h-4 sm:w-4
                            "
                        >
                            <span className="h-1 w-1 rounded-full bg-sky-400 transition-colors duration-300 group-hover:bg-navy" />
                        </div>

                        {/* Experience card */}
                        <div
                            className="
                            relative w-full min-w-0 overflow-hidden break-words rounded-2xl
                            border border-white/10
                            bg-[#080f28]/75 p-4 backdrop-blur-md
                            transition-all duration-300 ease-out
                            group-hover:-translate-y-1
                            group-hover:border-sky-400/70
                            group-hover:bg-[#101d3d]
                            group-hover:shadow-[0_0_30px_rgba(56,189,248,0.16),0_12px_30px_rgba(0,0,0,0.25)]
                            sm:p-5
                            "
                        >
                            {/* Hover glow */}
                            <div className="pointer-events-none absolute -right-12 -top-16 h-32 w-32 rounded-full bg-sky-400/0 blur-3xl transition-all duration-500 group-hover:bg-sky-400/20" />

                            <div className="relative z-10">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sky-400 transition-colors duration-300 group-hover:text-sky-300 sm:text-[10px]">
                                {item.category}
                                </span>

                                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[8px] tracking-wider text-slate/70 transition-all duration-300 group-hover:border-sky-400/40 group-hover:bg-sky-400/10 group-hover:text-sky-300 sm:text-[9px]">
                                {item.type}
                                </span>
                            </div>

                            <p className="mt-3 font-mono text-[10px] tracking-wider text-slate/60 transition-colors duration-300 group-hover:text-slate/90 sm:text-xs">
                                {item.period}
                            </p>

                            <h3 className="mt-1 text-base font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-300 sm:text-lg">
                                {item.role}
                            </h3>

                            <p className="mt-1 text-xs font-medium text-slate transition-colors duration-300 group-hover:text-white/90 sm:text-sm">
                                {item.organization}
                            </p>

                            <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate/65 transition-colors duration-300 group-hover:text-slate/90 sm:text-sm">
                                {item.description}
                            </p>
                            </div>
                        </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
            </div>
        </div>
    </section>
);
}