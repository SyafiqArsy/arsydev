import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#020617] text-white">
        <section className="flex min-h-screen flex-col justify-center px-8 sm:px-14 lg:px-24">
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.35em] text-[#38bdf8]">
            04 / Get in Touch
          </p>

          <h1 className="max-w-5xl text-6xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            LET&apos;S
            <br />
            CONNECT<span className="text-[#38bdf8]">.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            The contact section is currently being prepared.
            Stay tuned for more information.
          </p>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </>
  );
}