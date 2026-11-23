"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AchievementsSection from "@/components/sections/AchievementsSection";
import CTASection from "@/components/sections/CTASection";

if (typeof window !== "undefined") {
gsap.registerPlugin(ScrollTrigger);
}

export default function AchievementsCTA() {
const containerRef = useRef<HTMLDivElement>(null);
const achievementsRef = useRef<HTMLDivElement>(null);
const ctaRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
    const container = containerRef.current;
    const achievements = achievementsRef.current;
    const cta = ctaRef.current;

    if (!container || !achievements || !cta) return;

    const context = gsap.context(() => {
    gsap.set(achievements, {
        transformOrigin: "center center",
        transformPerspective: 1400,
        zIndex: 2,
    });

    gsap.set(cta, {
        transformOrigin: "center center",
        transformPerspective: 1400,
        zIndex: 1,
        scale: 0.65,
        z: -900,
        rotateX: -8,
        opacity: 0,
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=1600",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        },
    });

    timeline
        .to(
        achievements,
        {
            scale: 0.65,
            z: -700,
            rotateX: 12,
            opacity: 0,
            ease: "power2.in",
            duration: 1,
        },
        0
        )
        .to(
        cta,
        {
            scale: 1,
            z: 0,
            rotateX: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
        },
        0.25
        );
    }, container);

    return () => context.revert();
}, []);

return (
    <div
    ref={containerRef}
    className="relative h-screen w-full overflow-hidden bg-navy"
    style={{
        perspective: "1400px",
        transformStyle: "preserve-3d",
    }}
    >
    <div
        ref={achievementsRef}
        className="
        absolute inset-0 h-full w-full
        [&>section]:!h-full
        [&>section]:!min-h-0
        [&>section]:!w-full
        "
        style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        }}
    >
        <AchievementsSection />
    </div>

    <div
        ref={ctaRef}
        className="
        absolute inset-0 h-full w-full
        [&>section]:!h-full
        [&>section]:!min-h-0
        [&>section]:!w-full
        "
        style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        }}
    >
        <CTASection />
    </div>
    </div>
);
}