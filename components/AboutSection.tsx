import TextReveal from "./TextReveal";
import Lanyard from "@/Lanyard";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 -mt-[100vh] rounded-t-[2.5rem] bg-navy px-6 pb-32 pt-28 sm:px-10 sm:pt-36 md:rounded-t-[4rem] md:px-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div>
          <TextReveal
            as="h2"
            text="About Me"
            className="text-4xl font-semibold leading-[1.05] tracking-tight text-accent-light sm:text-6xl md:text-7xl"
          />

          <TextReveal
            as="p"
            text="I'm Syafiq Muhammad Musyafa Arsy At-Taufiq, an Informatics engineering student specializing in backend development with a strong interest in building efficient, scalable, and maintainable systems. Experienced in API development, database management, and server-side programming."
            className="mt-8 max-w-2xl text-lg leading-relaxed text-slate sm:text-xl md:text-2xl"
          />
        </div>

        <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-3xl border border-accent/50 bg-navy-light/30 shadow-[0_0_60px_-12px_rgba(91,141,239,0.55),inset_0_0_50px_rgba(91,141,239,0.12)]">
          <Lanyard position={[0, 0, 18]} fov={18} gravity={[0, -40, 0]} />
        </div>
      </div>
    </section>
  );
}
