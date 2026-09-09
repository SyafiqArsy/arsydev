"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform } from "motion/react";
import { animate } from "motion";

interface Stat {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 9, suffix: "+", label: "Toko Resmi se-DIY" },
  { value: 4.6, decimals: 1, suffix: "★", label: "Rating Rata-rata Google" },
  { value: 58, suffix: "K+", label: "Ulasan Pelanggan" },
  { value: 120, suffix: "K+", label: "Pengikut Instagram" },
];

export default function StatsSection() {
  return (
    <section className="relative z-10 bg-deep-brown px-6 py-24 text-cream-light sm:px-10 md:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
        {STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

function Stat({ value, decimals = 0, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [isInView, value, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (displayRef.current) displayRef.current.textContent = v;
    });
  }, [rounded]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center md:items-start md:text-left">
      <p className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
        <span ref={displayRef}>{(0).toFixed(decimals)}</span>
        <span className={suffix === "★" ? "text-brand-yellow" : undefined}>{suffix}</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-cream-light/60">
        {label}
      </p>
    </div>
  );
}
