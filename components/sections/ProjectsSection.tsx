"use client";

import { motion } from "motion/react";
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
      <div className="mx-auto w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
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
    </section>
  );
}
