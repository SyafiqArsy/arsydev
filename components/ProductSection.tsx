"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import TextReveal from "./TextReveal";

interface Flavor {
  name: string;
  line: "Original" | "Premium";
  image: string;
  spec: string;
}

const FLAVORS: Flavor[] = [
  { name: "Kacang Hijau", line: "Original", image: "/products/o-kacanghijau.webp", spec: "Bakpia Basah · 450g · 4–5 hari" },
  { name: "Keju", line: "Original", image: "/products/o-keju.webp", spec: "Bakpia Kering · 375g · 8–10 hari" },
  { name: "Cokelat", line: "Original", image: "/products/o-coklat.webp", spec: "Bakpia Kering · 375g · 8–10 hari" },
  { name: "Cokelat Lumer", line: "Original", image: "/products/o-cokelatlumer.webp", spec: "Bakpia Kering · 375g · 8–10 hari" },
  { name: "Aneka Rasa", line: "Original", image: "/products/o-anekarasa.webp", spec: "Mix Keju–Cokelat–Nanas · 375g" },
  { name: "Kacang Hijau", line: "Premium", image: "/products/p-kacanghijau.webp", spec: "Bakpia Basah · 525g · 4–5 hari" },
  { name: "Kumbu", line: "Premium", image: "/products/p-kumbu.webp", spec: "Bakpia Basah · 525g · 4–5 hari" },
  { name: "Keju", line: "Premium", image: "/products/p-keju.webp", spec: "Bakpia Basah · 525g · 6–7 hari" },
  { name: "Cokelat", line: "Premium", image: "/products/p-cokelat.webp", spec: "Bakpia Basah · 525g · 6–7 hari" },
  { name: "Susu", line: "Premium", image: "/products/p-susu.webp", spec: "Bakpia Basah · 525g · 4–5 hari" },
  { name: "Nanas", line: "Premium", image: "/products/p-nanas.webp", spec: "Bakpia Basah · 525g · 4–5 hari" },
  { name: "Telo Ungu", line: "Premium", image: "/products/p-teloungu.webp", spec: "Bakpia Basah · 525g · 4–5 hari" },
  { name: "Durian", line: "Premium", image: "/products/p-durian.webp", spec: "Bakpia Basah · 525g · 4–5 hari" },
  { name: "Green Tea", line: "Premium", image: "/products/p-greentea.webp", spec: "Bakpia Basah · 525g · 4–5 hari" },
];

// Rendered twice back-to-back so the auto-scroll can wrap seamlessly.
const MARQUEE_FLAVORS = [...FLAVORS, ...FLAVORS];

const AUTO_SCROLL_SPEED_PX_PER_SEC = 36;

export default function ProductSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frameId: number;
    let lastTime: number | null = null;

    const step = (time: number) => {
      if (lastTime === null) lastTime = time;
      const deltaMs = time - lastTime;
      lastTime = time;

      if (!pausedRef.current) {
        const singleSetWidth = scroller.scrollWidth / 2;
        scroller.scrollLeft += (AUTO_SCROLL_SPEED_PX_PER_SEC * deltaMs) / 1000;
        if (scroller.scrollLeft >= singleSetWidth) {
          scroller.scrollLeft -= singleSetWidth;
        }
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <section id="products" className="relative z-10 bg-cream py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-16">
        <p className="text-xs uppercase tracking-[0.35em] text-golden-brown">
          Pilihan Rasa
        </p>
        <TextReveal
          as="h2"
          text="15 Varian Rasa, Satu Cerita."
          className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-deep-brown sm:text-5xl md:text-6xl"
        />
        <p className="mt-6 max-w-xl text-base leading-relaxed text-deep-brown/60">
          Dua lini rasa: <span className="text-deep-brown">Original</span> yang renyah tahan lama, dan{" "}
          <span className="text-deep-brown">Premium</span> yang lembut dengan isian melimpah.
        </p>
      </div>

      <div
        ref={scrollerRef}
        onPointerEnter={pause}
        onPointerLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="hide-scrollbar mt-16 flex gap-6 overflow-x-auto px-6 pb-6 sm:px-10 md:px-16"
      >
        {MARQUEE_FLAVORS.map((flavor, i) => (
          <FlavorCard
            key={`${flavor.line}-${flavor.name}-${i}`}
            flavor={flavor}
            index={i % FLAVORS.length}
          />
        ))}
      </div>
    </section>
  );
}

function FlavorCard({ flavor, index }: { flavor: Flavor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: Math.min(index, 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.04 }}
      className="group w-64 shrink-0 sm:w-72"
    >
      <div className="relative h-80 overflow-hidden rounded-3xl shadow-lg shadow-deep-brown/10 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-deep-brown/20">
        <Image
          src={flavor.image}
          alt={`Bakpia ${flavor.line} rasa ${flavor.name}`}
          fill
          sizes="(min-width: 640px) 288px, 256px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep-brown/95 via-deep-brown/40 to-transparent" />
        <span
          className={`absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm ${
            flavor.line === "Premium"
              ? "bg-brand-red text-cream-light"
              : "bg-brand-yellow text-deep-brown"
          }`}
        >
          {flavor.line}
        </span>
        <span className="absolute right-5 top-5 font-mono text-xs text-cream-light/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-xl font-semibold tracking-tight text-cream-light">
            {flavor.name}
          </h3>
          <p className="mt-1 text-xs text-cream-light/70">{flavor.spec}</p>
        </div>
      </div>
    </motion.div>
  );
}
