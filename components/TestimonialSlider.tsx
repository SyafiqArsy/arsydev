"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Testimonial {
  quote: string;
  name: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Bakpianya lembut dan isiannya benar-benar terasa.",
    name: "Customer",
    image: "/sequence/ezgif-frame-288.jpg",
  },
  {
    quote: "Setiap gigitan terasa seperti dibuat khusus untuk momen spesial.",
    name: "Customer",
    image: "/sequence/ezgif-frame-240.jpg",
  },
  {
    quote: "Kemasannya rapi, rasanya premium, cocok untuk oleh-oleh.",
    name: "Customer",
    image: "/sequence/ezgif-frame-278.jpg",
  },
];

const AUTOPLAY_MS = 5500;

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const current = TESTIMONIALS[index];

  return (
    <section
      className="relative z-10 h-screen w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={current.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-deep-brown/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-cream-light">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-brand-yellow">{"★★★★★"}</p>
            <p className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-4xl md:text-5xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-cream-light/70">
              &mdash; {current.name}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 flex gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-brand-yellow" : "w-1.5 bg-cream-light/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
