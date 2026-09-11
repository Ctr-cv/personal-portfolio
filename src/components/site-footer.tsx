import Link from "next/link";
import { Container } from "@/components/layout-primitives";
import { site } from "@/content/site";

const columns = [
  {
    label: "Site",
    links: [
      { label: "Work", href: "/work" },
      { label: "Experience", href: "/experience" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Elsewhere",
    links: [
      { label: `GitHub — ${site.githubHandle}`, href: site.github, external: true },
      { label: "LinkedIn", href: site.linkedin, external: true },
      { label: "Résumé (PDF)", href: site.resume, external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-bone-400/12">
      <div aria-hidden="true" className="texture-grid absolute inset-0 -z-10 opacity-30" />

      <Container wide className="py-16 sm:py-20">
        {/* Primary conversion point. A footer is where people land after reading. */}
        <div className="flex flex-col gap-8 border-b border-bone-400/12 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-5">
            <span className="type-label text-signal-400">{site.availability.label}</span>
            <p className="type-h2 text-balance text-bone-50">
              If any of this is the kind of work your team is doing, I&rsquo;d like to hear about it.
            </p>
            <p className="type-meta text-bone-400">{site.availability.detail}</p>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="group inline-flex shrink-0 items-center gap-3 border border-signal-400/45 px-6 py-4 text-signal-300 transition-colors duration-400 hover:bg-signal-400 hover:text-carbon-900"
          >
            <span className="type-label">{site.email}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <span className="font-display text-lg text-bone-100">{site.name}</span>
            <p className="type-meta text-bone-500">{site.role}</p>
            <p className="type-meta text-bone-500">{site.location}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.label} aria-label={column.label} className="flex flex-col gap-3">
              <span className="type-label text-bone-500">{column.label}</span>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-underline type-meta text-bone-300 hover:text-signal-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="link-underline type-meta text-bone-300 hover:text-signal-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-3">
            <span className="type-label text-bone-500">Note</span>
            <p className="type-meta text-bone-500">
              Every figure on this site is labelled with how it was measured.
            </p>
            <Link
              href="/about#numbers"
              className="link-underline type-meta text-bone-300 hover:text-signal-300"
            >
              Why that matters
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-bone-400/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta text-bone-500">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="type-meta text-bone-500">Built with Next.js · Deployed on Vercel</p>
        </div>
      </Container>
    </footer>
  );
}
