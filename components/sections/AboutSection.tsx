import TextReveal from "@/components/animations/TextReveal";
import StrokeText from "@/components/animations/StrokeText";
import Lanyard from "@/components/3d/Lanyard";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 -mt-[100vh] flex min-h-screen flex-col justify-center rounded-t-[2.5rem] bg-navy px-8 py-20 sm:px-12 md:rounded-t-[4rem] md:px-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            <StrokeText
              text="About Me."
              responsive
              fontSize={48}
              fontWeight="inherit"
              letterSpacing="inherit"
              strokeColor="#38bdf8"
              fillColor="currentColor"
              strokeWidth={1.2}
              drawDuration={1.4}
              fillDelay={0.15}
              stagger={0.035}
              trigger="scroll"
              fillMode="wipe"
              wipeFrom="left"
            />
          </h2>

          <TextReveal
            as="p"
            text="I'm Syafiq Muhammad Musyafa Arsy At-Taufiq, an Informatics Engineering student specializing in backend development. I build high-performance APIs, scalable databases, and maintainable system architectures."
            className="mt-6 max-w-xl text-base leading-relaxed text-slate sm:text-lg"
          />
        </div>

        <div className="relative h-[55vh] min-h-[400px] overflow-hidden rounded-3xl border border-accent/30 bg-navy-light/50 shadow-[0_0_50px_-10px_rgba(56,189,248,0.25),inset_0_0_40px_rgba(56,189,248,0.08)]">
          <Lanyard position={[0, 0, 18]} fov={18} gravity={[0, -40, 0]} />
        </div>
      </div>
    </section>
  );
}
