"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ProjectsSection from "./ProjectsSection";
import BentoSection from "./BentoSection";
import CTASection from "./CTASection";

export default function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // 3 full-viewport panels side by side → translate track so the last panel
  // lands flush left at progress 1 (200vw of travel over a 300vw track).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.67%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen w-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          <Panel>
            <ProjectsSection />
          </Panel>
          <Panel>
            <BentoSection />
          </Panel>
          <Panel>
            <CTASection />
          </Panel>
        </motion.div>
      </div>
    </section>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="relative h-screen w-screen flex-shrink-0 overflow-hidden">{children}</div>;
}