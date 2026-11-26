"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Sparkles,
  Code2,
  Camera,
  BriefcaseBusiness,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShapeGrid from "@/components/backgrounds/ShapeGrid";
import TestimonialGlobe from "@/components/ui/testimonial-globe";
import { TESTIMONIAL_GLOBE_REVIEWS } from "@/components/ui/testimonial-globe-data";

const contactMethods = [
  {
    label: "Email",
    value: "your.email@example.com",
    description: "For inquiries and opportunities",
    href: "mailto:your.email@example.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/your-profile",
    description: "Let's connect professionally",
    href: "https://linkedin.com/in/your-profile",
    icon: BriefcaseBusiness,
  },
  {
    label: "GitHub",
    value: "github.com/your-username",
    description: "Explore my projects and code",
    href: "https://github.com/your-username",
    icon: Code2,
  },
  {
    label: "Instagram",
    value: "@your-username",
    description: "Connect with me socially",
    href: "https://instagram.com/your-username",
    icon: Camera,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="relative isolate overflow-hidden bg-[#020617] text-white">

        {/* Background Atmosphere */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-20 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/[0.07] blur-[140px]" />
          <div className="absolute -right-40 top-[45%] h-80 w-80 rounded-full bg-blue-600/[0.06] blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 85%)",
            }}
          />
        </div>

        {/* Shape Grid Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <ShapeGrid
            shape="square"
            cellSize={56}
            lineWidth={0.8}
            direction="diagonal"
            speed={0.15}
            lineColor="#1e3a5f"
            hoverColor="#38bdf8"
            fillOpacity={0.08}
            glow={0.25}
            trail={0.6}
            fade={0.8}
            opacity={0.65}
            clickCascade={false}
            intro
          />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-7xl flex-col justify-center px-6 pb-20 pt-36 sm:px-10 lg:px-16">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            <h1 className="max-w-6xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-sky-400">GREAT.</span>
            </h1>

            <div className="mt-10 flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">

              <p className="max-w-xl text-sm leading-8 text-slate-400 sm:text-base">
                I&apos;m always open to meaningful conversations, exciting
                opportunities, and collaborations. Whether you have a project
                in mind or simply want to discuss technology, feel free to
                reach out.
              </p>

            </div>
          </motion.div>
        </section>

        {/* Contact Information */}
        <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 sm:px-10 lg:px-16">

          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>

              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Find me online<span className="text-sky-400">.</span>
              </h2>
            </div>
          </div>

          {/* Unified Contact & Globe Panel */}
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-7 lg:p-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6">

              {/* Left: Social Media */}
              <div className="grid grid-cols-1 gap-3">
                {contactMethods.map((contact, index) => {
                  const Icon = contact.icon;

                  return (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target={contact.label === "Email" ? undefined : "_blank"}
                      rel={contact.label === "Email" ? undefined : "noreferrer"}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                      }}
                      className="group relative flex min-h-[100px] items-center justify-between overflow-hidden rounded-2xl border border-slate-700/70 bg-[#0b1729] px-5 py-4 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-[#10233a] hover:shadow-[0_8px_30px_rgba(56,189,248,0.08)] sm:px-6"
                    >
                      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-400/[0.07] blur-3xl transition-all duration-500 group-hover:bg-sky-400/[0.14]" />

                      <div className="relative flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/15 bg-sky-400/[0.06] text-sky-400 transition-all duration-300 group-hover:border-sky-400/30 group-hover:bg-sky-400/10">
                          <Icon size={20} strokeWidth={1.6} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            {contact.label}
                          </p>

                          <h3 className="mt-2 truncate text-sm font-semibold text-white transition-colors group-hover:text-sky-300 sm:text-base">
                            {contact.value}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {contact.description}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="relative ml-2 shrink-0 text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky-400"
                      />
                    </motion.a>
                  );
                })}
              </div>

              {/* Right: Interactive Globe */}
              <div className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-2xl bg-sky-400/[0.015]">
                <TestimonialGlobe
                  items={TESTIMONIAL_GLOBE_REVIEWS}
                  eyebrow="Global Connections"
                  heading="Voices from around the world."
                  caption="Preview menggunakan data testimonial demo dari 21st.dev."
                  size={360}
                  autoRotate
                  rotationSpeed={1}
                  autoplay
                  interval={4500}
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Shared Footer */}
      <Footer />
    </>
  );
}