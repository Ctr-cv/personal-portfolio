import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageMarker, SectionHeader } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { directions, skillGroups } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vivi Huang is a third-year Computer Engineering student at the University of Waterloo with experience in software, machine learning, and digital hardware.",
  alternates: { canonical: "/about" },
};

const bio = [
  "Hello! My name is Vivi Huang, and I'm a third-year Computer Engineering student at the University of Waterloo. Through my personal time, school courses, and previous co-ops, I have gained extensive experience in full-stack and product development.",
  "My recent projects span real-time machine learning, computer vision, FPGA acceleration, and embedded systems. I enjoy work where implementation details matter, from parallelizing a backend service to pipelining registers in an RTL datapath.",
  "I'm constantly driven by curiosity and problem solving, and in hunt for ambitious and technical work. Feel free to contact me for any inquiries!",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-cover page-cover-about py-12 sm:py-16">
        <Container wide>
          <div className="anim-rise" style={{ ["--i" as string]: 0 }}>
            <PageMarker index="01" label="About" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[9rem_minmax(0,1fr)_20rem] lg:gap-14">
            <div className="anim-rise" style={{ ["--i" as string]: 1 }}>
              <span aria-hidden="true" className="page-index">01</span>
              <p className="type-meta mt-5 text-bone-500">Profile<br />Range<br />Direction</p>
            </div>

            <div>
              <h1 className="anim-rise type-h1 max-w-5xl text-balance text-bone-50" style={{ ["--i" as string]: 2 }}>
                Computer Engineering across software, ML, and digital hardware.
              </h1>
              <div className="mt-10 flex max-w-2xl flex-col gap-6">
                {bio.map((paragraph, index) => (
                  <p key={paragraph} className="anim-rise type-prose text-pretty text-bone-300" style={{ ["--i" as string]: index + 3 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside className="profile-panel anim-rise self-start p-6" style={{ ["--i" as string]: 6 }} aria-label="Profile details">
              <span className="type-label text-bone-500">Profile / 2026</span>
              <div className="mt-6">
                {[
                  { key: "Based in", value: site.location },
                  { key: "Languages", value: site.languages },
                  { key: "GitHub", value: site.githubHandle, href: site.github },
                  { key: "Email", value: site.email, href: `mailto:${site.email}` },
                ].map((item) => (
                  <div key={item.key} className="border-t border-carbon-700 py-4">
                    <span className="type-meta block text-bone-500">{item.key}</span>
                    {item.href ? (
                      <a href={item.href} className="link-underline type-meta mt-1 block w-fit break-all text-bone-100" {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
                        {item.value}
                      </a>
                    ) : (
                      <span className="type-meta mt-1 block text-bone-100">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container wide>
          <Reveal>
            <SectionHeader index="01" label="Technical range" title="Tools used across projects and co-op terms." intro="Grouped by engineering domain, with concise implementation context where it is useful." />
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} index={index % 2} className="self-start border border-carbon-700 bg-carbon-900">
                <div className="flex flex-col gap-3 border-b border-carbon-700 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="type-meta numeric text-bone-500">{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="type-h3 text-bone-50">{group.title}</h2>
                  </div>
                  <span className="type-meta numeric shrink-0 text-bone-500">{String(group.items.length).padStart(2, "0")} skills</span>
                </div>

                <ul className="grid gap-px bg-carbon-700 sm:grid-cols-2">
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={item.name}
                      className="group relative min-h-[4.5rem] bg-carbon-900 px-4 py-3.5 transition-[background-color,transform] duration-200 ease-out hover:z-10 hover:-translate-y-px hover:bg-carbon-800"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-baseline gap-2.5">
                          <span aria-hidden="true" className="type-meta numeric shrink-0 text-[0.625rem] text-bone-600 transition-colors duration-200 group-hover:text-bone-400">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-bone-50 transition-colors duration-200 group-hover:text-bone-100">
                            {item.name}
                          </span>
                        </div>
                        <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-carbon-600 transition-[width,background-color] duration-200 group-hover:w-6 group-hover:bg-bone-400" />
                      </div>
                      {item.note && <span className="type-meta mt-1.5 block pl-[2.1rem] leading-snug text-bone-500 transition-colors duration-200 group-hover:text-bone-400">{item.note}</span>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="surface-panel py-20 sm:py-28">
        <Container wide>
          <Reveal>
            <SectionHeader index="02" label="Next" title="Areas I want to explore further." intro="A few directions connecting my current software, machine learning, and hardware experience." />
          </Reveal>

          <div className="mt-14 grid border-b border-carbon-700 lg:grid-cols-3">
            {directions.map((direction, index) => (
              <Reveal key={direction.title} index={index} className={`border-t border-carbon-700 py-8 ${index === 0 ? "lg:pr-10" : "lg:border-l lg:px-10"}`}>
                <span aria-hidden="true" className="type-meta numeric text-bone-500">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="type-h3 mt-6 text-bone-50">{direction.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-bone-400">{direction.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap gap-3">
            <Link href="/work" className="type-label bg-bone-100 px-6 py-4 text-carbon-850">View projects →</Link>
            <Link href="/contact" className="type-label border border-bone-100 px-6 py-4 text-bone-100">Contact</Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
