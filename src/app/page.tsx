import Link from "next/link";
import { Backdrop, Container, Rule, SectionHeader, TimingDivider } from "@/components/layout-primitives";
import { FeaturedProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { DisciplineMark } from "@/components/tags";
import { education } from "@/content/about";
import { roles } from "@/content/experience";
import { basisGloss, basisLabel, featuredProjects } from "@/content/projects";
import { disciplines, methodNote, site } from "@/content/site";

/** Datasheet-style rail beside the hero. Carries the facts a recruiter scans for. */
const specs = [
  { key: "Program", value: "Computer Engineering, Waterloo" },
  { key: "Standing", value: "3rd year · 4.0/4.0 GPA" },
  { key: "Co-op terms", value: "4 completed · 5th upcoming" },
  { key: "Disciplines", value: "Digital hardware · AI systems" },
  { key: "Languages", value: "English · Mandarin" },
];

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO — the 30-second test lives here.
          ================================================================ */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
        <Backdrop variant="both" />

        <Container wide>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
            <div className="flex flex-col">
              <p className="anim-rise type-label flex flex-wrap items-center gap-x-3 gap-y-2 text-bone-400" style={{ ["--i" as string]: 0 }}>
                <span className="text-bone-100">{site.name}</span>
                <span aria-hidden="true" className="text-bone-500">/</span>
                <span>Computer Engineering, University of Waterloo</span>
              </p>

              {/* Oversized display type. The one thing you cannot miss. */}
              <h1 className="type-hero mt-8 text-bone-50">
                <span className="anim-wipe block" style={{ ["--i" as string]: 1 }}>
                  Silicon
                </span>
                <span className="anim-wipe block" style={{ ["--i" as string]: 2 }}>
                  <span className="text-bone-500">&amp;</span>{" "}
                  <span className="text-signal-400">software</span>
                  <span className="text-oxide-400">.</span>
                </span>
              </h1>

              <p
                className="anim-rise type-lead mt-10 max-w-2xl text-pretty text-bone-200"
                style={{ ["--i" as string]: 4 }}
              >
                {site.positioning}
              </p>

              <div
                className="anim-rise mt-11 flex flex-wrap items-center gap-4"
                style={{ ["--i" as string]: 5 }}
              >
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-3 bg-bone-100 px-6 py-4 text-carbon-900 transition-colors duration-400 hover:bg-signal-400"
                >
                  <span className="type-label">View the work</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="type-label inline-flex items-center gap-3 border border-bone-400/30 px-6 py-4 text-bone-200 transition-colors duration-400 hover:border-signal-400 hover:text-signal-300"
                >
                  Get in touch
                </a>
                <span className="type-label flex items-center gap-2.5 text-bone-400">
                  <span aria-hidden="true" className="anim-pulse size-1.5 rounded-full bg-oxide-400" />
                  {site.availability.label}
                </span>
              </div>
            </div>

            {/* Spec rail. Asymmetric counterweight to the headline. */}
            <aside
              className="anim-rise flex flex-col gap-px self-end border-t border-bone-400/15 lg:mb-2"
              style={{ ["--i" as string]: 6 }}
              aria-label="At a glance"
            >
              {specs.map((spec) => (
                <div
                  key={spec.key}
                  className="flex flex-col gap-1 border-b border-bone-400/12 py-3.5"
                >
                  <span className="type-label text-bone-500">{spec.key}</span>
                  <span className="type-meta text-bone-200">{spec.value}</span>
                </div>
              ))}
            </aside>
          </div>
        </Container>

        <TimingDivider className="mt-20 opacity-70" />
      </section>

      {/* ================================================================
          THE DUALITY — the differentiator, stated as two columns.
          ================================================================ */}
      <section className="relative py-8">
        <Container wide>
          <Reveal>
            <SectionHeader
              index="01"
              label="What I do"
              title="Most engineers pick one side of the hardware/software line. I've been building on both."
            />
          </Reveal>

          <div className="mt-14 grid gap-px border-t border-bone-400/15 lg:grid-cols-2">
            {disciplines.map((discipline, i) => (
              <Reveal
                key={discipline.id}
                index={i}
                className={`flex flex-col gap-6 border-b border-bone-400/12 py-10 ${
                  i === 0 ? "lg:border-r lg:pr-12" : "lg:pl-12"
                }`}
              >
                <DisciplineMark discipline={discipline.id} />
                <h3 className="type-h2 text-balance text-bone-50">{discipline.heading}</h3>
                <p className="type-prose text-pretty text-bone-300">{discipline.body}</p>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {discipline.keywords.map((keyword) => (
                    <li
                      key={keyword}
                      className={`type-label ${
                        discipline.id === "hardware" ? "text-signal-300" : "text-oxide-300"
                      }`}
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SELECTED WORK
          ================================================================ */}
      <section className="relative py-24 sm:py-32">
        <Container wide>
          <Reveal>
            <SectionHeader
              index="02"
              label="Selected work"
              title="Six projects worth reading about."
              intro="Each one is written up as a case study: the problem, the decisions and the reasoning behind them, the result, and what is still unfinished."
              accent="oxide"
            />
          </Reveal>

          <div className="mt-14 flex flex-col gap-6">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} index={i % 2}>
                <FeaturedProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-center">
            <Link
              href="/work"
              className="group type-label inline-flex items-center gap-3 border border-bone-400/25 px-7 py-4 text-bone-200 transition-colors duration-400 hover:border-signal-400 hover:text-signal-300"
            >
              All {featuredProjects.length > 0 ? "projects" : "work"}
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ================================================================
          ON THE NUMBERS — the thing I most want a reader to remember.
          ================================================================ */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-carbon-850/60" />
        <div aria-hidden="true" className="texture-noise absolute inset-0 -z-10" />

        <Container wide>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal className="flex flex-col gap-6">
              <SectionHeader index="03" label="Method" accent="bone" />
              <h2 className="type-h2 text-balance text-bone-50">{methodNote.heading}</h2>
              <p className="type-prose text-pretty text-bone-300">{methodNote.body}</p>
            </Reveal>

            <Reveal index={1} className="flex flex-col">
              <span className="type-label mb-6 text-bone-500">Legend</span>
              <dl className="flex flex-col">
                {(
                  ["measured", "tool-reported", "approximate", "estimated", "inherited-scale"] as const
                ).map((basis) => (
                  <div
                    key={basis}
                    className="grid gap-2 border-t border-bone-400/12 py-4 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="type-label flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`size-1.5 shrink-0 rounded-full ${
                          basis === "measured" || basis === "tool-reported"
                            ? "bg-oxide-400"
                            : basis === "inherited-scale"
                              ? "bg-bone-500"
                              : "bg-signal-400"
                        }`}
                      />
                      <span
                        className={
                          basis === "measured" || basis === "tool-reported"
                            ? "text-oxide-300"
                            : basis === "inherited-scale"
                              ? "text-bone-400"
                              : "text-signal-300"
                        }
                      >
                        {basisLabel[basis]}
                      </span>
                    </dt>
                    <dd className="type-meta text-bone-400">{basisGloss[basis]}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================================================================
          EXPERIENCE PREVIEW
          ================================================================ */}
      <section className="relative py-24 sm:py-32">
        <Container wide>
          <Reveal>
            <SectionHeader
              index="04"
              label="Experience"
              title="Four co-op terms, on three teams, in two countries."
              intro={education.note}
            />
          </Reveal>

          <ol className="mt-14 flex flex-col">
            {roles.map((role, i) => (
              <Reveal
                key={role.slug}
                as="li"
                index={i}
                className="group border-t border-bone-400/15 last:border-b"
              >
                <Link
                  href={`/experience#${role.slug}`}
                  className="grid gap-4 py-8 transition-colors duration-400 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="type-meta numeric text-bone-500">{role.timeframe}</span>
                  <div className="flex flex-col gap-2">
                    <h3 className="type-h3 text-bone-50 transition-colors duration-300 group-hover:text-signal-300">
                      {role.company}
                    </h3>
                    <p className="type-meta text-bone-400">
                      {role.title} · {role.location}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="type-label text-bone-500 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-signal-400"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>

          <Rule className="mt-16" />

          <Reveal className="mt-16 flex flex-col items-start gap-6">
            <p className="type-h2 max-w-3xl text-balance text-bone-100">
              There is more detail on every project than a resume has room for. That is the point of
              this site.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/experience"
                className="type-label border border-bone-400/25 px-6 py-4 text-bone-200 transition-colors duration-400 hover:border-signal-400 hover:text-signal-300"
              >
                Read the experience
              </Link>
              <Link
                href="/about"
                className="type-label border border-bone-400/25 px-6 py-4 text-bone-200 transition-colors duration-400 hover:border-oxide-400 hover:text-oxide-300"
              >
                About me
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
