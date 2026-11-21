"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "p" | "div" | "h2" | "h3";
}

export default function TextReveal({ text, className = "", as = "p" }: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [18, 0]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <span className="mr-[0.28em] inline-block overflow-hidden pb-1">
      <motion.span style={{ opacity, y, filter }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}
