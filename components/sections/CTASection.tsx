"use client";

import { motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import SocialFlipButton from "@/components/ui/social-flip-button";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="
        grain relative z-10 flex min-h-screen
        flex-col items-center justify-center
        overflow-hidden bg-navy px-8 py-24
        text-accent-light
      "
    >
      {/* Background Glow */}
      <div
        className="
          animate-drift pointer-events-none absolute
          -left-1/4 top-0 h-[36rem] w-[36rem]
          rounded-full opacity-30 blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        }}
      />

      <div
        className="
          animate-drift-reverse pointer-events-none absolute
          -right-1/4 bottom-0 h-[32rem] w-[32rem]
          rounded-full opacity-20 blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <h2 className="
            mt-4 text-4xl font-bold leading-tight
            tracking-tight text-white
            sm:text-5xl md:text-7xl
          ">
            Hit Me Up<span className="text-accent">.</span>
          </h2>

          <p className="
            mx-auto mt-5 max-w-lg
            text-sm leading-relaxed text-slate
            sm:text-base
          ">
            Have an idea or want to collaborate?
            Let's connect and build something meaningful together.
          </p>
        </motion.div>

        {/* Social Flip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7"
        >
          <SocialFlipButton />
        </motion.div>

        {/* Optional Direct Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
        </motion.div>
      </div>
    </section>
  );
}
