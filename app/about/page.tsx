import Navbar from "@/components/layout/Navbar";
import ParallaxHeroDemo from "@/components/ui/wilderness";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="relative w-full bg-[#020617]">
        {/* Section 1: Parallax Hero */}
        <ParallaxHeroDemo
          title="SYAFIQ ARSY"
          className="h-screen w-full"
        />

        {/* Section 2: About Content */}
        <section className="relative min-h-screen w-full bg-[#020617] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white">
              About Me
            </h2>

            <p className="mt-6 max-w-2xl text-lg text-slate-400">
              Welcome to my personal space. More information about me
              will be added here.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}