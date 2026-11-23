"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BentoSection from "@/components/sections/BentoSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

export default function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // 60% of the scroll duration is reserved for horizontal navigation.
  const x = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["0%", "-66.67%"]
  );

  // The remaining 40% scrolls through the Experience timeline.
  const experienceProgress = useTransform(
    scrollYProgress,
    [0.6, 1],
    [0, 1]
  );

  return (
    <section ref={targetRef} className="relative h-[600vh]">
      <div className="sticky top-0 flex h-screen w-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          <Panel>
            <ProjectsSection />
          </Panel>

          <Panel>
            <BentoSection />
          </Panel>

          <Panel>
            <ExperienceSection scrollProgress={experienceProgress} />
          </Panel>
        </motion.div>
      </div>
    </section>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen flex-shrink-0 overflow-hidden">
      {children}
    </div>
  );
}
