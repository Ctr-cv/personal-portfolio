import Link from "next/link";
import { Container, SectionHeader, TimingDivider } from "@/components/layout-primitives";
import { FeaturedProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { DisciplineMark } from "@/components/tags";
import { roles } from "@/content/experience";
import { getProject } from "@/content/projects";
import { disciplines, site } from "@/content/site";

const selectedProjects = ["gestalt-engine", "mvm-engine", "route-extraction"]
  .map(getProject)
  .filter((project) => project !== undefined);

const specs = [
  { key: "Program", value: "Computer Engineering, Waterloo" },
  { key: "Standing", value: "3rd year · 4.0 / 4.0" },
  { key: "Experience", value: "4 completed co-op terms" },
  { key: "Focus", value: "Software · ML · Digital hardware" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-5rem)] py-20 sm:py-28">
        <Container wide className="flex min-h-[70vh] flex-col justify-between">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div>
              <p className="anim-rise type-label text-bone-400" style={{ ["--i" as string]: 0 }}>
                {site.name} · Computer Engineering
              </p>
              <h1 className="anim-rise type-hero mt-10 max-w-6xl text-bone-50" style={{ ["--i" as string]: 1 }}>
                Software, ML,<br />and digital hardware.
              </h1>
              <p className="anim-rise type-lead mt-10 max-w-2xl text-bone-400" style={{ ["--i" as string]: 2 }}>
                {site.positioning} Four co-op terms across engineering teams in Canada and China.
              </p>
              <div className="anim-rise mt-10 flex flex-wrap gap-3" style={{ ["--i" as string]: 3 }}>
                <Link href="/work" className="type-label bg-bone-100 px-6 py-4 text-carbon-850 transition-opacity hover:opacity-75">
                  View projects →
                </Link>
                <a href={`mailto:${site.email}`} className="type-label border border-bone-100 px-6 py-4 text-bone-100 transition-opacity hover:opacity-60">
                  Contact
                </a>
              </div>
            </div>

            <aside className="anim-rise self-end border-t border-bone-50" style={{ ["--i" as string]: 4 }} aria-label="At a glance">
              {specs.map((spec) => (
                <div key={spec.key} className="border-b border-carbon-700 py-4">
                  <span className="type-meta block text-bone-500">{spec.key}</span>
                  <span className="type-meta mt-1 block text-bone-100">{spec.value}</span>
                </div>
              ))}
            </aside>
          </div>
          <p className="type-meta mt-16 text-bone-500">Scroll to explore ↓</p>
        </Container>
      </section>

      <TimingDivider />

      <section className="py-24 sm:py-36">
        <Container wide>
          <Reveal>
            <SectionHeader index="01" label="Areas of work" title="Engineering across software and hardware." />
          </Reveal>
          <div className="mt-14 grid border-b border-carbon-700 lg:grid-cols-2">
            {disciplines.map((discipline, i) => (
              <Reveal key={discipline.id} index={i} className={`border-t border-carbon-700 py-8 ${i === 0 ? "lg:pr-12" : "lg:border-l lg:pl-12"}`}>
                <DisciplineMark discipline={discipline.id} />
                <h3 className="type-h3 mt-8 text-bone-50">{discipline.heading}</h3>
                <p className="type-prose mt-5 max-w-xl text-bone-400">{discipline.body}</p>
                <p className="type-meta mt-6 text-bone-500">{discipline.keywords.join(" · ")}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container wide>
          <Reveal>
            <SectionHeader index="02" label="Selected projects" title="Three representative projects." intro="Machine learning, FPGA design, and computer vision work from personal and professional settings." />
          </Reveal>
          <div className="mt-16 border-b border-bone-50">
            {selectedProjects.map((project, i) => (
              <Reveal key={project.slug} index={i}>
                <FeaturedProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/work" className="type-label link-underline text-bone-100">View all projects →</Link>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container wide>
          <Reveal>
            <SectionHeader index="03" label="Experience" title="Four co-op terms across three companies." intro="Software engineering, backend development, and full-stack product work." />
          </Reveal>
          <ol className="mt-16 border-b border-bone-50">
            {roles.map((role, i) => (
              <Reveal key={role.slug} as="li" index={i} className="border-t border-bone-50">
                <Link href={`/experience#${role.slug}`} className="group grid gap-8 py-9 lg:grid-cols-[10rem_minmax(0,0.8fr)_minmax(0,1.2fr)_auto] lg:items-start">
                  <span className="type-meta text-bone-500">{role.timeframe}</span>
                  <div>
                    <h3 className="type-h3 text-bone-50">{role.company}</h3>
                    <p className="type-meta mt-2 text-bone-400">{role.title} · {role.location}</p>
                  </div>
                  <div>
                    <p className="text-base leading-relaxed text-bone-400">{role.context}</p>
                    <p className="type-meta mt-4 text-bone-500">{role.stack.slice(0, 5).join(" · ")}</p>
                  </div>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10">
            <Link href="/experience" className="type-label link-underline text-bone-100">View full experience →</Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
