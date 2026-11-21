import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-abyss px-6 pb-10 pt-20 text-accent-light sm:px-10 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-12 border-b border-accent-light/10 pb-12 md:flex-row">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              SYAFIQ<span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-accent-light/60">
              Frontend Developer & UI Designer crafting clean, performant web experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent-light/40">
                Navigation
              </p>
              <ul className="mt-3 space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-accent-light/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent-light/40">
                Connect
              </p>
              <ul className="mt-3 space-y-2">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-accent-light/80 transition-colors hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="pt-8 text-xs text-accent-light/40">
          &copy; {year} Syafiq Arsy. Built with Next.js &amp; Tailwind.
        </p>
      </div>
    </footer>
  );
}
