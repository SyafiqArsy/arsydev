import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#020617] px-6 py-10 text-slate-300 sm:px-10 md:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

          {/* Brand */}
          <div className="max-w-xs">
            <a
              href="/"
              aria-label="Go to homepage"
              className="inline-flex text-2xl font-bold tracking-tight text-white transition-colors hover:text-sky-400"
            >
              SYAFIQ<span className="text-sky-400">.</span>
            </a>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Building digital experiences with creativity and technology.
            </p>
          </div>

          {/* Navigation & Social Links */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">

            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors duration-300 hover:text-sky-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4 sm:border-l sm:border-white/10 sm:pl-8">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-sm text-slate-500 transition-colors duration-300 hover:text-sky-400"
                >
                  {social.label}
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-9 flex flex-col gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} Syafiq Arsy. All rights reserved.
          </p>

          <p className="text-xs text-slate-600">
            Designed & Built with Next.js and Tailwind CSS.
          </p>
        </div>

      </div>
    </footer>
  );
}