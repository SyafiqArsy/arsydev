"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { TOTAL_FRAMES } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroIntroVideo from "./HeroIntroVideo";
import TechText from "@/components/animations/TechText";

interface SequenceScrollProps {
  imagesRef: React.RefObject<HTMLImageElement[]>;
  isLoaded: boolean;
}

/**
 * ponytail: BAR_KEYFRAMES removed — new 121-frame sequence from
 * `referensi image-sequence/` appears to be pillarbox-free. If future
 * frames have baked-in bars, re-measure and add keyframes back.
 */

export default function SequenceScroll({ imagesRef, isLoaded }: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimsRef = useRef({ width: 0, height: 0 });
  const lastDrawnRef = useRef(-1);
  const currentFrameRef = useRef(1);

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      scrollYProgress.set(Math.min(1, Math.max(0, raw)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [scrollYProgress]);

  // Complete the video-to-sequence handoff within the first few pixels.
  const HANDOFF_END = 0.003;

  // Keep frame 1 at the exact moment the canvas takes over.
  // Then progress through all remaining frames.
  const frameIndex = useTransform(
    scrollYProgress,
    [HANDOFF_END, 1],
    [1, TOTAL_FRAMES]
  );

  // Video and canvas crossfade over exactly the same scroll range.
  const videoOpacity = useTransform(
    scrollYProgress,
    [0, HANDOFF_END],
    [1, 0]
  );

  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, HANDOFF_END],
    [0, 1]
  );

  // Intro content fades out during the transition.
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.09, 0.16],
    [1, 1, 0]
  );

  const introY = useTransform(
    scrollYProgress,
    [0, 0.16],
    [0, -32]
  );

  const draw = useCallback((rawIndex: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    const { width, height } = dimsRef.current;
    if (!canvas || !images?.length || !width || !height) return;

    const index = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(rawIndex)));
    const img = images[index - 1];
    const ctx = canvas.getContext("2d");
    if (!ctx || !img || !img.complete || !img.naturalWidth) return;

    const sw = img.naturalWidth;
    const sh = img.naturalHeight;

    const canvasRatio = width / height;
    const sourceRatio = sw / sh;

    let dw: number, dh: number, dx: number, dy: number;
    if (canvasRatio > sourceRatio) {
      dw = width;
      dh = width / sourceRatio;
      dx = 0;
      dy = (height - dh) / 2;
    } else {
      dh = height;
      dw = height * sourceRatio;
      dy = 0;
      dx = (width - dw) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, sw, sh, dx, dy, dw, dh);
  }, [imagesRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { width: rect.width, height: rect.height };
      draw(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  useEffect(() => {
    if (isLoaded) draw(currentFrameRef.current);
  }, [isLoaded, draw]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    currentFrameRef.current = latest;
    const rounded = Math.round(latest);
    if (rounded !== lastDrawnRef.current) {
      lastDrawnRef.current = rounded;
      draw(latest);
    }
  });

  const stage2Opacity = useTransform(scrollYProgress, [0.2, 0.28, 0.4, 0.47], [0, 1, 1, 0]);
  const stage2X = useTransform(scrollYProgress, [0.2, 0.3], [-48, 0]);

  const stage3Opacity = useTransform(scrollYProgress, [0.53, 0.61, 0.72, 0.79], [0, 1, 1, 0]);
  const stage3X = useTransform(scrollYProgress, [0.53, 0.63], [48, 0]);

  const stage4Opacity = useTransform(scrollYProgress, [0.85, 0.93], [0, 1]);
  const stage4Y = useTransform(scrollYProgress, [0.85, 0.93], [32, 0]);
  const stage4Pointer = useTransform(stage4Opacity, (v) => (v > 0.6 ? "auto" : "none"));

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-transparent"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
        <motion.canvas
          ref={canvasRef}
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 z-10 h-full w-full"
        />

        <HeroIntroVideo opacity={videoOpacity} />

        {/* Intro content */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-start justify-center px-1 text-left sm:px-2 md:px-4 lg:px-8"
        >
          <div className="w-full max-w-[560px]">
            {/* ARSY */}
            <div className="pointer-events-auto relative -mt-[70px] h-[180px] w-full">
              <TechText
                text="ARSY"
                fontWeight={700}
                fontSize={125}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                guides={false}
                fontFamily=""
                letterSpacing={-0.05}
                color="#38bdf8"
                accentColor="#7dd3fc"
                align="center"
              />
            </div>

            {/* DEV */}
            <div className="pointer-events-auto relative -mt-[70px] h-[180px] w-full">
              <TechText
                text="DEV"
                fontWeight={700}
                fontSize={125}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                guides={false}
                fontFamily=""
                letterSpacing={-0.05}
                color="#38bdf8"
                accentColor="#7dd3fc"
                align="center"
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="hero-text flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <span className="h-8 w-px animate-pulse bg-current" />
          </div>
        </motion.div>

        {/* Stage 2 — 30% — left aligned */}
        <motion.div
          style={{ opacity: stage2Opacity, x: stage2X }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-left sm:items-start sm:justify-center sm:px-12 md:px-20"
        >
          <div className="max-w-xl">
            <h2 className="hero-text text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              Building for<br />the Web<span className="text-accent">.</span>
            </h2>
            <p className="hero-text mt-3 max-w-xs text-sm sm:text-base">
              Modern interfaces built with care — from component architecture to pixel-perfect polish.
            </p>
          </div>
        </motion.div>

        {/* Stage 3 — 60% — right aligned */}
        <motion.div
          style={{ opacity: stage3Opacity, x: stage3X }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-right sm:items-end sm:justify-center sm:px-12 md:px-20"
        >
          <div className="max-w-2xl">
            <h2 className="hero-text text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              Design Meets<br />Code<span className="text-accent">.</span>
            </h2>
            <p className="hero-text mt-3 ml-auto max-w-xs text-sm sm:text-base">
              Bridging design systems with production-ready implementations.
            </p>
          </div>
        </motion.div>

        {/* Stage 4 — 90% — centered CTA */}
        <motion.div
          style={{ opacity: stage4Opacity, y: stage4Y, pointerEvents: stage4Pointer }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="hero-text text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Let&apos;s Create<span className="text-accent">.</span>
          </h2>
          <p className="hero-text mt-5 max-w-md text-sm sm:text-base">
            Explore my work and see what we can build together.
          </p>
          <MagneticButton
            href="#projects"
            className="mt-8 rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-abyss ring-2 ring-transparent transition-all duration-300 hover:bg-navy hover:text-accent hover:ring-accent"
          >
            View My Work
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
