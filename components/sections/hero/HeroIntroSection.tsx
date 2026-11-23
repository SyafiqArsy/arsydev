"use client";

import HeroIntroVideo from "./HeroIntroVideo";

export default function HeroIntroSection() {
return (
    <section
    id="home"
    className="relative h-screen w-full overflow-hidden bg-navy"
    >
    {/* Video background */}
    <HeroIntroVideo />

    {/* Dark overlay */}
    <div className="pointer-events-none absolute inset-0 bg-black/20" />

    {/* Intro content */}
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="hero-text max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
        Syafiq Arsy<span className="text-accent">.</span>
        </h1>

        <p className="hero-text mt-5 max-w-md text-sm tracking-wide sm:text-base">
        Frontend Developer &amp; UI Designer crafting clean, performant web experiences.
        </p>
    </div>

    {/* Scroll cue */}
    <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="hero-text flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
        </span>
        <span className="h-8 w-px animate-pulse bg-current" />
        </div>
    </div>
    </section>
);
}
