"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Timeline, type TimelineEvent } from "@/components/ui/Timeline";

type JourneyEvent = TimelineEvent & {
  description: string;
  highlights: string[];
};

const timelineEvents: JourneyEvent[] = [
  {
    id: "education",
    date: "2022-01-01",
    title: "Education",
    meta: "Academic Journey",
    description:
      "This is a placeholder for your educational journey. Add your academic background, institution, and important milestones here.",
    highlights: [
      "Academic background",
      "Learning milestones",
      "Relevant achievements",
    ],
    media: (
      <div className="flex h-full min-h-32 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/5">
        <span className="text-4xl font-bold text-sky-400">01</span>
      </div>
    ),
  },
  {
    id: "organization",
    date: "2023-01-01",
    title: "Organization",
    meta: "Leadership & Collaboration",
    description:
      "This is a placeholder for your organizational experience, leadership journey, and collaborative activities.",
    highlights: [
      "Organizational involvement",
      "Leadership experience",
      "Team collaboration",
    ],
    media: (
      <div className="flex h-full min-h-32 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/5">
        <span className="text-4xl font-bold text-sky-400">02</span>
      </div>
    ),
  },
  {
    id: "internship",
    date: "2024-01-01",
    title: "Internship",
    meta: "Professional Experience",
    description:
      "This is a placeholder for your professional experience. Describe your role, responsibilities, and what you learned.",
    highlights: [
      "Professional experience",
      "Technical responsibilities",
      "Skills developed",
    ],
    media: (
      <div className="flex h-full min-h-32 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/5">
        <span className="text-4xl font-bold text-sky-400">03</span>
      </div>
    ),
  },
  {
    id: "projects",
    date: "2025-01-01",
    title: "Projects",
    meta: "Personal & Technical Projects",
    description:
      "This is a placeholder for your projects. Explain the problems you solved, technologies used, and the results.",
    highlights: [
      "Project overview",
      "Technology stack",
      "Key contributions",
    ],
    media: (
      <div className="flex h-full min-h-32 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/5">
        <span className="text-4xl font-bold text-sky-400">04</span>
      </div>
    ),
  },
];

export default function JourneyTimeline() {
  const [selectedEvent, setSelectedEvent] =
    useState<JourneyEvent | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock background scrolling and support Escape while the modal is open.
  useEffect(() => {
    if (!selectedEvent) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedEvent(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  return (
    <>
      <Timeline
        events={timelineEvents}
        itemWidth={300}
        height={420}
        years
        ruler
        cables
        aria-label="Journey and Experiences Timeline"
        className="w-full"
        onEventClick={(event) => {
          const selected = timelineEvents.find(
            (item) => item.id === event.id,
          );

          if (selected) setSelectedEvent(selected);
        }}
      />

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key="journey-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedEvent(null);
              }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md sm:p-6"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="journey-modal-title"
              aria-describedby="journey-modal-description"
              initial={{ opacity: 0, scale: 0.94, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-sky-400/20 bg-[#071426] shadow-[0_0_80px_rgba(14,165,233,0.12)]"
            >
              {/* Decorative background */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.12),transparent_55%)]" />

              {/* Modal content */}
              <div className="relative p-6 sm:p-9">

                {/* Header */}
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
                      {selectedEvent.meta}
                    </p>

                    <h3
                      id="journey-modal-title"
                      className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                      {selectedEvent.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {new Date(
                        selectedEvent.date,
                      ).getUTCFullYear()}
                    </p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    aria-label="Close modal"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-300 transition-all duration-300 hover:rotate-90 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    ×
                  </button>
                </div>

                {/* Media */}
                <div className="mb-7 overflow-hidden rounded-2xl border border-sky-400/15 bg-[#020617]">
                  <div className="aspect-[16/9] w-full">
                    {selectedEvent.media}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-7">
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-400">
                    Overview
                  </h4>

                  <p
                    id="journey-modal-description"
                    className="text-sm leading-7 text-slate-300 sm:text-base"
                  >
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sky-400">
                    Highlights
                  </h4>

                  <div className="space-y-3">
                    {selectedEvent.highlights.map(
                      (highlight, index) => (
                        <motion.div
                          key={`${selectedEvent.id}-${index}`}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.12 + index * 0.08,
                          }}
                          className="flex items-center gap-3 text-sm text-slate-300"
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 text-xs text-sky-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {highlight}
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs tracking-wider text-slate-500">
                    SYAFIQ ARSY · JOURNEY
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="rounded-full border border-sky-400/30 px-5 py-2 text-sm font-medium text-sky-400 transition-all duration-300 hover:bg-sky-400 hover:text-[#020617] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    Close
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}