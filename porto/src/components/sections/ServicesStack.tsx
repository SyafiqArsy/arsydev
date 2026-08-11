"use client";

import { useMemo } from "react";
import {
  Code2,
  LayoutTemplate,
  ServerCog,
  Check,
} from "lucide-react";

import ScrollStack, {
  ScrollStackItem,
} from "@/components/animations/ScrollStack";

interface ServiceItem {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  capabilities: string[];
}

const services: ServiceItem[] = [
  {
    number: "01",
    icon: Code2,
    title: "Web Application Development",
    description:
      "Full-stack applications arsitektur modern. Dari dashboard real-time Nebula hingga storefront Flux — dibangun dengan React, Next.js, dan TypeScript yang terukur dan mudah dirawat.",
    capabilities: ["React / Next.js", "TypeScript", "RESTful APIs", "Scalable Architecture"],
  },
  {
    number: "02",
    icon: LayoutTemplate,
    title: "UI Engineering & Design Systems",
    description:
      "Pengalaman antarmuka yang presisi. Membangun design system Prism, mengubah Figma menjadi komponen hidup, dan menghidupkan interaksi dengan motion yang halus.",
    capabilities: ["Figma → Code", "Design Systems", "Tailwind CSS", "Motion / Animation"],
  },
  {
    number: "03",
    icon: ServerCog,
    title: "Backend & Platform",
    description:
      "API dan infrastruktur yang andal. Dari backend Aether AI hingga arsitektur data Orion — Node.js, database, dan Docker untuk platform yang aman serta mudah diskalakan.",
    capabilities: ["Node.js / Express", "PostgreSQL / MongoDB", "Docker", "DevOps & Git"],
  },
];

export default function ServicesStack() {
  const stackCards = useMemo(
    () =>
      services.map((service, idx) => (
        <ScrollStackItem
          key={service.title}
          itemClassName={`services-stack-card services-stack-card--${idx + 1}`}
        >
          <div className="services-card-inner">
            <div className="services-card-head">
              <span className="services-card-icon">
                <service.icon className="w-7 h-7" />
              </span>
              <span className="services-card-number">{service.number}</span>
            </div>
            <h3 className="services-card-title">{service.title}</h3>
            <p className="services-card-desc">{service.description}</p>
            <ul className="services-card-tags">
              {service.capabilities.map((cap) => (
                <li key={cap}>
                  <Check className="w-3.5 h-3.5" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </ScrollStackItem>
      )),
    [],
  );

  return (
    <section
      className="services-stack-section"
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#0a1628",
        color: "#f8fafc",
        padding: "0 6rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="services-stack-header" style={{ marginBottom: "2rem" }}>
        <span className="text-sm uppercase tracking-[0.2em] text-blue-400">
          What I Do
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white mt-3">
          Services & <span className="gradient-text">Offerings</span>
        </h2>
      </div>

      <ScrollStack
        useWindowScroll
        enableSmooth={false}
        itemDistance={140}
        itemScale={0.04}
        itemStackDistance={42}
        stackPosition="15%"
        scaleEndPosition="5%"
        baseScale={0.9}
      >
        {stackCards}
      </ScrollStack>
    </section>
  );
}
