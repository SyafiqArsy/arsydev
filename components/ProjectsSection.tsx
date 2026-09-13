"use client";

import { motion } from "motion/react";
import TextReveal from "./TextReveal";
import AccordionGallery, {
  type AccordionGalleryItem,
} from "./animations/AccordionGallery";

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
  return (
    <section id="projects" className="relative z-10 flex h-full flex-col items-center justify-center bg-navy-light py-12">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-slate">
            Selected Work
          </p>
          <TextReveal
            as="h2"
            text="Projects I've Built."
            className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-accent-light sm:text-4xl"
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-8 w-full px-6 sm:px-10 md:px-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <AccordionGallery
          items={galleryItems}
          defaultIndex={2}
          height={400}
          gap={10}
          radius={14}
          expandRatio={0.52}
          ease="power3.out"
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          trigger="hover"
          accentColor="#5b8def"
          overlayColor="#060911"
          textColor="#ffffff"
          grayscale={true}
          showLabels={true}
        />
      </motion.div>
    </section>
  );
}
