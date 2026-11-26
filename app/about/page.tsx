import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParallaxHeroDemo from "@/components/ui/wilderness";

import ShapeGrid from "@/components/backgrounds/ShapeGrid";
import StrokeText from "@/components/animations/StrokeText";
import SplitText from "@/components/animations/SplitText";
import RotatingText from "@/components/animations/RotatingText";
import DecryptedText from "@/components/ui/DecryptedText";
import JourneyTimeline from "@/components/ui/JourneyTimeline";
import FlexCarousel from "@/components/ui/FlexCarousel";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="relative w-full bg-[#020617] text-white">
        {/* Section 1: Wilderness Parallax Hero */}
        <ParallaxHeroDemo
          title="SYAFIQ ARSY"
          className="h-screen w-full"
        />

        {/* Section 2: About Me */}
        <section
          data-decrypted-view
          className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020617] px-6 py-28 sm:px-10"
        >

          {/* ShapeGrid Background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <ShapeGrid
              shape="square"
              direction="diagonal"
              lineColor="#12304a"
              hoverColor="#38bdf8"
              hoverFillColor="#0ea5e9"
              fillOpacity={0.08}
              cellSize={48}
              lineWidth={1}
              speed={0.2}
              radius={1.5}
              trail={0.8}
              glow={0.25}
              twinkle={0.06}
              fade={0.85}
              opacity={0.55}
              clickCascade={false}
              intro
              backgroundColor="transparent"
              className="absolute inset-0"
            />
          </div>

          {/* Subtle Background Overlay */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#020617]/30 via-transparent to-[#020617]/40" />

          {/* About Content */}
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">

            {/* About Title */}
            <div className="mb-16 flex w-full justify-center">
              <h2 className="w-full text-center text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
                <StrokeText
                  text="About Me"
                  responsive
                  fontSize={72}
                  fontWeight="inherit"
                  letterSpacing="inherit"
                  strokeColor="#38bdf8"
                  fillColor="currentColor"
                  strokeWidth={1.3}
                  drawDuration={3}
                  fillDelay={0.5}
                  stagger={0.08}
                  trigger="scroll"
                  fillMode="wipe"
                  wipeFrom="left"
                  className="mx-auto"
                />
              </h2>
            </div>

            {/* Introduction */}
            <div className="flex w-full flex-col items-center gap-3">

              {/* Name */}
              <SplitText
                text="I'm Syafiq Muhammad Musyafa Arsy At-Taufiq,"
                tag="p"
                className="text-lg font-medium leading-relaxed text-slate-300 sm:text-xl md:text-2xl"
                effect="wave"
                hoverEffect="lift"
                splitType="words"
                delay={65}
                duration={1.1}
                staggerFrom="start"
                trigger="view"
                threshold={0.1}
                rootMargin="-80px"
                textAlign="center"
              />

              {/* Dynamic Profession */}
              <div className="flex min-h-[52px] w-full items-center justify-center sm:min-h-[60px]">
                <RotatingText
                  texts={[
                    "a Fullstack Developer",
                    "an AI Enthusiast",
                  ]}
                  effect="slide"
                  direction="up"
                  staggerFrom="last"
                  staggerDuration={0.035}
                  rotationInterval={2500}
                  splitBy="words"
                  auto
                  loop
                  pauseOnHover={false}
                  className="text-2xl font-bold text-sky-400 sm:text-3xl md:text-4xl"
                  mainClassName="justify-center"
                  splitLevelClassName="overflow-hidden pb-1"
                />
              </div>

              {/* Description */}
              <div className="mt-5 flex w-full flex-col items-center gap-5">

                <SplitText
                  text="Passionate about building efficient, scalable, and maintainable digital solutions. I enjoy developing APIs, managing databases, and building reliable server-side systems."
                  tag="p"
                  className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9"
                  effect="rise"
                  hoverEffect="lift"
                  splitType="words"
                  delay={35}
                  duration={1.1}
                  staggerFrom="start"
                  trigger="view"
                  threshold={0.1}
                  rootMargin="-80px"
                  textAlign="center"
                />

                <SplitText
                  text="I thrive in collaborative environments where communication, coordination, and problem-solving turn ideas into meaningful results. Driven by continuous learning, I'm continuously expanding my knowledge of software engineering and cloud computing."
                  tag="p"
                  className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9"
                  effect="rise"
                  hoverEffect="lift"
                  splitType="words"
                  delay={30}
                  duration={1.1}
                  staggerFrom="start"
                  trigger="view"
                  threshold={0.1}
                  rootMargin="-80px"
                  textAlign="center"
                />

              </div>
            </div>

            {/* Statistics Cards */}
            <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">

              {/* Projects */}
              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.035] px-4 py-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:bg-white/[0.06]">

                <DecryptedText
                  text="10+"
                  animateOn="view"
                  effect="scramble"
                  sequential
                  speed={160}
                  maxIterations={12}
                  className="text-2xl font-bold tracking-tight text-cyan-300 sm:text-3xl"
                />

                <span className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Projects
                </span>

              </div>

              {/* Years Experience */}
              <div className="flex min-h-[88px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:bg-white/[0.06]">

                <DecryptedText
                  text="3+"
                  animateOn="view"
                  effect="scramble"
                  sequential
                  speed={160}
                  maxIterations={12}
                  className="text-2xl font-bold tracking-tight text-cyan-300 sm:text-3xl"
                />

                <span className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Years Exp
                </span>

              </div>

              {/* Tech Skills */}
              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.035] px-4 py-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:bg-white/[0.06]">

                <DecryptedText
                  text="5+"
                  animateOn="view"
                  effect="scramble"
                  sequential
                  speed={160}
                  maxIterations={12}
                  className="text-2xl font-bold tracking-tight text-cyan-300 sm:text-3xl"
                />

                <span className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Tech Skills
                </span>

              </div>

            </div>

            {/* Bottom Accent */}
            <div className="mt-12 h-px w-32 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

          </div>
        </section>

        {/* Section 3: Journey & Experiences */}
        <section className="relative w-full overflow-hidden bg-[#020617] px-6 py-28 sm:px-10">

          {/* ShapeGrid Background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <ShapeGrid
              shape="square"
              direction="diagonal"
              lineColor="#12304a"
              hoverColor="#38bdf8"
              hoverFillColor="#0ea5e9"
              fillOpacity={0.08}
              cellSize={48}
              lineWidth={1}
              speed={0.2}
              radius={1.5}
              trail={0.8}
              glow={0.25}
              twinkle={0.06}
              fade={0.85}
              opacity={0.55}
              clickCascade={false}
              intro
              backgroundColor="transparent"
              className="absolute inset-0"
            />
          </div>

          {/* Background Accent */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#020617]/20 via-transparent to-[#020617]/40" />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center">

            {/* Journey Title */}
            <div className="mb-16 flex w-full justify-center">
              <h2 className="w-full text-center text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
                <StrokeText
                  text="Journey & Experiences"
                  responsive
                  fontSize={72}
                  fontWeight="inherit"
                  letterSpacing="inherit"
                  strokeColor="#38bdf8"
                  fillColor="currentColor"
                  strokeWidth={1.3}
                  drawDuration={3}
                  fillDelay={0.5}
                  stagger={0.08}
                  trigger="scroll"
                  fillMode="wipe"
                  wipeFrom="left"
                  className="mx-auto"
                />
              </h2>
            </div>

            {/* Interactive Timeline */}
            <div className="w-full">
              <JourneyTimeline />
            </div>

            {/* Bottom Accent */}
            <div className="mt-12 h-px w-32 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

          </div>
        </section>

        {/* Section 4: Gallery */}
        <section className="relative isolate flex min-h-[720px] w-full items-center justify-center overflow-hidden bg-[#020617] py-20">

          {/* ShapeGrid Background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <ShapeGrid
              shape="square"
              direction="diagonal"
              lineColor="#12304a"
              hoverColor="#38bdf8"
              hoverFillColor="#0ea5e9"
              fillOpacity={0.08}
              cellSize={48}
              lineWidth={1}
              speed={0.2}
              radius={1.5}
              trail={0.8}
              glow={0.25}
              twinkle={0.06}
              fade={0.85}
              opacity={0.55}
              clickCascade={false}
              intro
              backgroundColor="transparent"
              className="absolute inset-0"
            />
          </div>

          {/* Background Overlay */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#020617]/30 via-transparent to-[#020617]/40" />

          {/* Gallery Content */}
          <div className="relative z-10 w-full">

            <div className="relative h-[560px] w-full">
              <FlexCarousel
                preset="liquid"
                intro="rise"
                cardHeight={0.5}
                gap={12}
                squeeze={0.2}
                focusOnClick
                captions
              />
            </div>

          </div>
        </section>
      </main>

      {/* Section 5: Footer */}
      <Footer />
    </>
  );
}