"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/** Ubah class tailwind gradient (from-…-…) menjadi hex solid untuk background gradient inline. */
function gradientToCss(gradient: string): string {
  const hexMap: Record<string, string> = {
    "from-blue-500": "#3b82f6",
    "from-blue-600": "#2563eb",
    "from-blue-700": "#1d4ed8",
    "via-blue-700": "#1d4ed8",
    "via-blue-800": "#1e40af",
    "to-blue-700": "#1d4ed8",
    "to-blue-800": "#1e40af",
    "to-blue-900": "#1e3a8a",
    "from-slate-700": "#334155",
    "to-slate-800": "#1e293b",
    "to-slate-900": "#0f172a",
  };
  const parts = gradient.split(" ").map((s) => hexMap[s] ?? "");
  return `linear-gradient(135deg, ${parts.join(", ")})`;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="flex-shrink-0"
      style={{ width: "460px" }}
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          height: "420px",
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.4s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
      >
        <div
          style={{
            height: "176px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            background: gradientToCss(project.gradient),
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.15)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {String(project.id).padStart(2, "0")}
          </span>
        </div>
        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#4a7bc4",
              marginBottom: "8px",
            }}
          >
            {project.category}
          </span>
          <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 8px 0" }}>{project.title}</h3>
          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#9aa7bd",
              margin: "0 0 16px 0",
              flex: 1,
            }}
          >
            {project.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  fontSize: "11px",
                  color: "#b8c4d6",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
