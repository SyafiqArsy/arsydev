
import Navbar from "@/components/layout/Navbar";

export default function ProjectsPage() {
return (
    <>
    <Navbar />

    <main className="min-h-screen bg-navy px-8 pb-20 pt-32 text-white sm:px-14 md:px-20">
        <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
            Portfolio
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            All Projects<span className="text-accent">.</span>
        </h1>

        <p className="mt-4 max-w-xl text-slate">
            Explore my projects, experiments, and development journey.
        </p>
        </div>
    </main>
    </>
);
}
