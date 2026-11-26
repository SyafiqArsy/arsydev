"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Timeline, type TimelineEvent } from "@/components/ui/Timeline";

type JourneyEvent = TimelineEvent & {
  description: string;
  highlights: string[];
  gallery?: string[];
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

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  const activeGallery = selectedEvent?.gallery ?? [];
  const hasMultiplePhotos = activeGallery.length > 1;

  const showPreviousPhoto = () => {
    setActivePhotoIndex((current) =>
      (current - 1 + activeGallery.length) % activeGallery.length
    );
  };

  const showNextPhoto = () => {
    setActivePhotoIndex((current) =>
      (current + 1) % activeGallery.length
    );
  };

// Lock background scrolling and support Escape while the modal is open.
useEffect(() => {
  if (!selectedEvent) return;

  const previousBodyOverflow = document.body.style.overflow;
  const previousHtmlOverflow = document.documentElement.style.overflow;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedEvent(null);
    }
  };

  // Stop Lenis smooth scrolling.
  lenis?.stop();

  // Prevent native browser scrolling.
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  closeButtonRef.current?.focus();
  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;

    document.removeEventListener("keydown", handleKeyDown);

    // Resume Lenis scrolling.
    lenis?.start();
  };
}, [selectedEvent, lenis]);

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

          if (selected) {
            setActivePhotoIndex(0);
            setSelectedEvent(selected);
          }
        }}
      />

      {typeof document !== "undefined" &&
      createPortal(
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
              className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-md sm:p-4"
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
                className="relative my-auto max-h-[min(82dvh,560px)] w-full max-w-4xl overflow-hidden rounded-2xl border border-sky-400/20 bg-[#071426] shadow-[0_0_60px_rgba(14,165,233,0.12)]"
              >

                {/* Decorative background */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.12),transparent_55%)]" />

                {/* Horizontal Modal Layout */}
                <div className="relative grid min-h-0 grid-cols-1 sm:grid-cols-[0.9fr_1.1fr]">

                  {/* Left: Media Carousel */}
                  <div className="relative min-h-[190px] overflow-hidden border-b border-sky-400/15 bg-[#020617] sm:min-h-[420px] sm:border-b-0 sm:border-r">

                    {activeGallery.length > 0 ? (
                      <>
                        {/* Current Photo */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${selectedEvent.id}-${activePhotoIndex}`}
                            className="absolute inset-0"
                            initial={{ opacity: 0, x: 25 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -25 }}
                            transition={{ duration: 0.25 }}
                            drag={hasMultiplePhotos ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.15}
                            onDragEnd={(_, info) => {
                              if (info.offset.x < -50) {
                                showNextPhoto();
                              } else if (info.offset.x > 50) {
                                showPreviousPhoto();
                              }
                            }}
                          >
                            <img
                              src={activeGallery[activePhotoIndex]}
                              alt={`${selectedEvent.title} photo ${activePhotoIndex + 1}`}
                              draggable={false}
                              className="size-full select-none object-cover"
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        {hasMultiplePhotos && (
                          <>
                            <button
                              type="button"
                              onClick={showPreviousPhoto}
                              aria-label="Previous photo"
                              className="absolute left-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#020617]/70 text-xl text-white backdrop-blur-md transition hover:border-sky-400/50 hover:bg-sky-400/20 hover:text-sky-400"
                            >
                              ‹
                            </button>

                            <button
                              type="button"
                              onClick={showNextPhoto}
                              aria-label="Next photo"
                              className="absolute right-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#020617]/70 text-xl text-white backdrop-blur-md transition hover:border-sky-400/50 hover:bg-sky-400/20 hover:text-sky-400"
                            >
                              ›
                            </button>

                            {/* Photo Indicators */}
                            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#020617]/75 px-3 py-2 backdrop-blur-md">
                              {activeGallery.map((_, index) => (
                                <button
                                  key={`${selectedEvent.id}-photo-${index}`}
                                  type="button"
                                  onClick={() => setActivePhotoIndex(index)}
                                  aria-label={`Go to photo ${index + 1}`}
                                  aria-current={activePhotoIndex === index ? "true" : undefined}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    activePhotoIndex === index
                                      ? "w-5 bg-sky-400"
                                      : "w-1.5 bg-slate-500 hover:bg-slate-300"
                                  }`}
                                />
                              ))}

                              <span className="ml-1 text-[10px] tabular-nums text-slate-300">
                                {activePhotoIndex + 1} / {activeGallery.length}
                              </span>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      /* Fallback: Existing Placeholder Media */
                      <div className="absolute inset-0">
                        {selectedEvent.media}
                      </div>
                    )}

                  </div>

                  {/* Right: Content */}
                  <div className="flex min-h-0 flex-col overflow-y-auto p-5 sm:p-6">

                    {/* Header */}
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400">
                          {selectedEvent.meta}
                        </p>

                        <h3
                          id="journey-modal-title"
                          className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                        >
                          {selectedEvent.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {new Date(selectedEvent.date).getUTCFullYear()}
                        </p>
                      </div>

                      <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={() => setSelectedEvent(null)}
                        aria-label="Close modal"
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-300 transition-all duration-300 hover:rotate-90 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        ×
                      </button>
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                        Overview
                      </h4>

                      <p
                        id="journey-modal-description"
                        className="text-sm leading-6 text-slate-300"
                      >
                        {selectedEvent.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-sky-400">
                        Highlights
                      </h4>

                      <div className="space-y-2.5">
                        {selectedEvent.highlights.map((highlight, index) => (
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
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <span className="text-[10px] tracking-wider text-slate-500">
                        SYAFIQ ARSY · JOURNEY
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedEvent(null)}
                        className="rounded-full border border-sky-400/30 px-4 py-2 text-xs font-medium text-sky-400 transition-all duration-300 hover:bg-sky-400 hover:text-[#020617] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        Close
                      </button>
                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
          </AnimatePresence>,
        document.body
      )}
    </>
  );
}