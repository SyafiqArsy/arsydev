"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import StrokeText from "@/components/animations/StrokeText";
import ShapeGrid from "@/components/backgrounds/ShapeGrid";
import AccordionGallery, {
  type AccordionGalleryItem,
} from "@/components/animations/AccordionGallery";
import { useRouter } from "next/navigation";
import { LiquidButton } from "@/components/ui/liquid-button";

const galleryItems: AccordionGalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    label: "E-Commerce Dashboard",
    link: "#",
    alt: "Real-time analytics dashboard with interactive charts",
  },
  {
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop",
    label: "Design System",
    link: "#",
    alt: "Component library with accessibility-first approach",
  },
  {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop",
    label: "Portfolio Generator",
    link: "#",
    alt: "CLI tool that scaffolds portfolio sites from JSON config",
  },
  {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=900&auto=format&fit=crop",
    label: "Motion Playground",
    link: "#",
    alt: "Interactive sandbox for scroll-driven animations",
  },
  {
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=900&auto=format&fit=crop",
    label: "Weather App",
    link: "#",
    alt: "Minimal weather interface with animated icons",
  },
  {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=900&auto=format&fit=crop",
    label: "Task Manager",
    link: "#",
    alt: "Kanban-style task board with drag-and-drop",
  },
];

export default function ProjectsSection() {
  const router = useRouter();
  const lenis = useLenis();

  const [selectedProject, setSelectedProject] =
    useState<AccordionGalleryItem | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    // Stop Lenis smooth scrolling.
    lenis?.stop();

    // Lock native browser scrolling.
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      // Restore previous scroll styles.
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;

      // Resume Lenis scrolling.
      lenis?.start();
    };
  }, [selectedProject, lenis]);

  return (
    <section
      id="projects"
      className="relative isolate z-10 flex h-full w-full flex-col justify-center overflow-hidden bg-navy px-8 py-10 sm:px-14 md:px-20"
    >
      {/* Animated ShapeGrid Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="#12304a"
          hoverColor="#38bdf8"
          hoverFillColor="#0ea5e9"
          fillOpacity={0.12}
          cellSize={42}
          lineWidth={1}
          speed={0.3}
          radius={1.5}
          trail={0.8}
          glow={0.3}
          twinkle={0.08}
          fade={0.8}
          opacity={0.65}
          clickCascade={false}
          intro
          backgroundColor="transparent"
          className="h-full w-full"
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl justify-center px-4 text-center">
        <motion.div
          className="relative z-10 flex w-full justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mt-2 w-full text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            <StrokeText
              text="Featured Projects."
              responsive
              fontSize={36}
              fontWeight="inherit"
              letterSpacing="inherit"
              strokeColor="#38bdf8"
              fillColor="currentColor"
              strokeWidth={1.2}
              drawDuration={1.4}
              fillDelay={0.15}
              stagger={0.035}
              trigger="scroll"
              fillMode="wipe"
              wipeFrom="left"
              className="mx-auto"
            />
          </h2>
        </motion.div>
      </div>


      <motion.div
        className="relative z-10 mx-auto mt-6 w-full max-w-6xl px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <AccordionGallery
          items={galleryItems}
          onItemClick={(item) => setSelectedProject(item)}
          defaultIndex={2}
          height={320}
          gap={12}
          radius={16}
          expandRatio={0.48}
          ease="power3.out"
          parallax={0.4}
          tilt={3}
          stagger={0.06}
          trigger="hover"
          accentColor="#38bdf8"
          overlayColor="#020617"
          textColor="#ffffff"
          grayscale={true}
          showLabels={true}
        />
      </motion.div>

      {/* See More Projects Button */}
      <motion.div
        className="relative z-10 mt-10 flex w-full justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <LiquidButton
          variant="dark"
          size="default"
          onClick={() => router.push("/projects")}
        >
          See More Project <span aria-hidden="true">↗</span>
        </LiquidButton>
      </motion.div>

      {/* Project Preview Modal - Rendered Outside Section */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#020617]/85 px-4 py-6 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedProject(null)}
                role="presentation"
              >
                <motion.div
                  className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-sky-400/20 bg-[#080f28] shadow-[0_0_60px_rgba(56,189,248,0.12)]"
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={(event) => event.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="project-modal-title"
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#020617]/70 text-xl text-white backdrop-blur-md transition-colors hover:border-sky-400 hover:text-sky-400"
                    aria-label="Close project preview"
                  >
                    &times;
                  </button>

                  {/* Project Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={
                        selectedProject.alt ||
                        selectedProject.label ||
                        "Project preview"
                      }
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080f28] via-transparent to-transparent" />
                  </div>

                  {/* Project Information */}
                  <div className="px-6 pb-7 pt-2 sm:px-8 sm:pb-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-400">
                      Featured Project
                    </span>

                    <h3
                      id="project-modal-title"
                      className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                    >
                      {selectedProject.label}
                      <span className="text-sky-400">.</span>
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {selectedProject.alt}
                    </p>

                    {/* View Project Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(null);
                        router.push("/projects");
                      }}
                      className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/10 px-5 py-3 text-sm font-semibold text-sky-300 transition-all duration-300 hover:border-sky-400 hover:bg-sky-400 hover:text-[#020617]"
                    >
                      View Project
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

    </section>
  );
}
