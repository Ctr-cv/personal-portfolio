import Link from "next/link";
import { Container } from "@/components/layout-primitives";
import { site } from "@/content/site";

const columns = [
  {
    label: "Site",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/work" },
      { label: "Experience", href: "/experience" },
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
    <footer className="mt-24 border-t border-bone-50">
      <Container wide>
        <aside
          aria-label="Availability"
          className="grid gap-3 border-b border-carbon-700 py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
        >
          <span className="type-meta flex items-center gap-2 text-bone-300">
            <span aria-hidden="true" className="size-1.5 bg-bone-50" />
            {site.availability.label}
          </span>
          <p className="text-sm leading-relaxed text-bone-500">{site.availability.detail}</p>
          <a href={`mailto:${site.email}`} className="type-meta link-underline w-fit text-bone-100">
            Email →
          </a>
        </aside>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="font-display text-lg text-bone-100">{site.name}</span>
            <p className="type-meta mt-3 text-bone-500">{site.role}</p>
            <p className="type-meta mt-1 text-bone-500">{site.location}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <span className="type-label text-bone-500">{column.label}</span>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noreferrer noopener" className="link-underline type-meta text-bone-300">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="link-underline type-meta text-bone-300">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-carbon-700 py-6 sm:flex-row sm:justify-between">
          <p className="type-meta text-bone-500">© {new Date().getFullYear()} {site.name}</p>
          <p className="type-meta text-bone-500">Built with Next.js · Deployed on Vercel</p>
        </div>
      </Container>
    </footer>
  );
}
