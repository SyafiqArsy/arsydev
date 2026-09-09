import TextReveal from "./TextReveal";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 -mt-[100vh] rounded-t-[2.5rem] bg-navy px-6 pb-32 pt-28 sm:px-10 sm:pt-36 md:rounded-t-[4rem] md:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.35em] text-slate">
          About Me
        </p>

        <TextReveal
          as="h2"
          text="Crafting Experiences That Matter."
          className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-accent-light sm:text-6xl md:text-7xl"
        />

        <TextReveal
          as="p"
          text="Frontend developer and UI designer based in Yogyakarta. I build performant, accessible web applications with a focus on smooth interactions and clean design systems. Passionate about bridging the gap between design and engineering."
          className="mt-10 max-w-2xl text-xl leading-relaxed text-slate sm:text-2xl md:text-3xl"
        />
      </div>
    </section>
  );
}
