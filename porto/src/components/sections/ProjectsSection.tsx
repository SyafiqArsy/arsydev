"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

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
        gap: "32px",
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

      <div
        style={{
          display: "flex",
          gap: "32px",
          overflowX: "auto",
          paddingBottom: "16px",
        }}
      >
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
