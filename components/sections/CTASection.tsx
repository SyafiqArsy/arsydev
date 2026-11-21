"use client";

import MagneticButton from "@/components/ui/MagneticButton";

export default function CTASection() {
  return (
    <section id="contact" className="grain relative z-10 flex h-full flex-col items-center justify-center overflow-hidden bg-abyss px-8 text-accent-light">
      <div
        className="animate-drift pointer-events-none absolute -left-1/4 top-0 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }}
      />
      <div
        className="animate-drift-reverse pointer-events-none absolute -right-1/4 bottom-0 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
          Get In Touch
        </p>
        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Let&apos;s Work Together<span className="text-accent">.</span>
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-slate">
          Have a project in mind or want to collaborate? Feel free to reach out anytime.
        </p>
        <MagneticButton
          href="mailto:arsy@example.com"
          className="mt-8 rounded-full bg-accent px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-navy transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
        >
          Contact Me
        </MagneticButton>
      </div>
    </section>
  );
}
