"use client";

import dynamic from "next/dynamic";

const SkillsOrbitScene = dynamic(() => import("./SkillsOrbitScene"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto my-4 flex h-[380px] w-full max-w-5xl items-center justify-center sm:h-[420px] md:h-[460px]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <span className="text-[11px] uppercase tracking-widest text-slate/70">
          Loading 3D Orbit...
        </span>
      </div>
    </div>
  ),
});

export default function Skills3DWrapper() {
  return <SkillsOrbitScene />;
}
