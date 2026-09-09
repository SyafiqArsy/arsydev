"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const update = () => setOverHero(window.scrollY < window.innerHeight * 3);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const lightNav = open || overHero;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10">
        <a
          href="#home"
          className={`text-lg font-semibold tracking-tight transition-colors duration-500 ${
            lightNav ? "hero-text" : "text-accent-light"
          }`}
        >
          SYAFIQ<span className="text-accent">.</span>
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`group flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] transition-colors duration-500 ${
            lightNav ? "hero-text" : "text-accent-light"
          }`}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="relative flex h-3 w-6 flex-col justify-between">
            <span
              className={`block h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-abyss px-6 pb-10 pt-28 text-accent-light sm:px-10 sm:pt-32"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-baseline gap-4 overflow-hidden border-b border-accent-light/10 py-3 sm:py-4"
                >
                  <span className="font-mono text-xs text-slate">
                    0{i + 1}
                  </span>
                  <span className="text-4xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-3 group-hover:text-accent sm:text-6xl md:text-7xl">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-[0.25em] text-accent-light/70 transition-colors hover:text-accent"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
