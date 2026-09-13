"use client";

import MagneticButton from "./MagneticButton";

export default function CTASection() {
  return (
    <section id="contact" className="grain relative z-10 overflow-hidden bg-abyss py-32 text-accent-light">
      <div
        className="animate-drift pointer-events-none absolute -left-1/4 top-0 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #6d9dff 0%, transparent 70%)" }}
      />
      <div
        className="animate-drift-reverse pointer-events-none absolute -right-1/4 bottom-0 h-[32rem] w-[32rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #cdd9f5 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Let&apos;s Work Together<span className="text-accent">.</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-accent-light/70">
          Have a project in mind or just want to chat? I&apos;m always open to new opportunities and collaborations.
        </p>
        <MagneticButton
          href="mailto:syafiq@example.com"
          className="mt-8 rounded-full bg-accent px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-abyss transition-all duration-300 hover:bg-accent-light hover:text-abyss"
        >
          Get In Touch
        </MagneticButton>
      </div>
    </section>
  );
}
