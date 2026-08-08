"use client";

import { motion } from "framer-motion";

import AccordionGallery, {
  type AccordionGalleryItem,
} from "@/components/animations/AccordionGallery";

const galleryItems: AccordionGalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    label: "Nebula Dashboard",
    link: "#",
    alt: "Nebula Dashboard — real-time analytics with data visualizations",
  },
  {
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop",
    label: "Flux E-Commerce",
    link: "#",
    alt: "Flux E-Commerce — modern online storefront",
  },
  {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop",
    label: "Orion Social",
    link: "#",
    alt: "Orion Social — minimalist mobile social app",
  },
  {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=900&auto=format&fit=crop",
    label: "Prism Design System",
    link: "#",
    alt: "Prism Design System — component library and design tokens",
  },
  {
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=900&auto=format&fit=crop",
    label: "Aether AI Platform",
    link: "#",
    alt: "Aether AI — no-code machine learning platform",
  },
  {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=900&auto=format&fit=crop",
    label: "Orbital Identity",
    link: "#",
    alt: "Orbital Identity — brand identity system",
  },
];

export default function ProjectsSection() {
  return (
    <section
      style={{
        width: "100vw",
        minHeight: "100vh",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "40px",
        background: "#0a1628",
        color: "#f8fafc",
        padding: "0 6rem",
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#4a7bc4",
            marginBottom: "12px",
            display: "block",
          }}
        >
          Selected Work
        </span>
        <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, margin: 0 }}>
          Featured Projects
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <AccordionGallery
          items={galleryItems}
          defaultIndex={2}
          height={460}
          gap={10}
          radius={14}
          expandRatio={0.52}
          ease="power3.out"
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          trigger="hover"
          accentColor="#4a7bc4"
          overlayColor="#060010"
          textColor="#ffffff"
        />
      </motion.div>
    </section>
  );
}