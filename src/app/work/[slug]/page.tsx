import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Backdrop, Container, Rule, TimingDivider } from "@/components/layout-primitives";
import { MetricRow } from "@/components/metric";
import { ProjectGlyph } from "@/components/project-glyph";
import { Reveal } from "@/components/reveal";
import { DisciplineMark, StatusPill, TagList } from "@/components/tags";
import { adjacentProjects, getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.tagline,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

/** Section heading used throughout the case study body. */
function CaseHeading({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span aria-hidden="true" className="type-label numeric shrink-0 text-signal-400">
        {index}
      </span>
      <h2 className="type-h2 text-balance text-bone-50">{children}</h2>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = adjacentProjects(slug);
  const accentText = project.discipline === "hardware" ? "text-signal-400" : "text-oxide-400";

  // Sequential section numbering, so sections can be conditional without the
  // indices drifting out of order.
  let sectionIndex = 0;
  const nextIndex = () => String(++sectionIndex).padStart(2, "0");

  return (
    <article>
      {/* ================================================================
          HERO
          ================================================================ */}
      <header className="relative overflow-hidden pt-12 pb-16 sm:pt-16">
        <Backdrop variant={project.discipline === "hardware" ? "signal" : "oxide"} />

        <Container wide>
          <nav aria-label="Breadcrumb" className="anim-rise" style={{ ["--i" as string]: 0 }}>
            <ol className="type-label flex items-center gap-3 text-bone-500">
              <li>
                <Link href="/work" className="transition-colors hover:text-signal-400">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className={accentText}>{project.kind}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
            <div className="flex flex-col">
              <div
                className="anim-rise flex flex-wrap items-center gap-4"
                style={{ ["--i" as string]: 1 }}
              >
                <DisciplineMark discipline={project.discipline} />
                {project.status && <StatusPill status={project.status} />}
              </div>

              <h1
                className="anim-rise type-h1 mt-7 max-w-4xl text-balance text-bone-50"
                style={{ ["--i" as string]: 2 }}
              >
                {project.title}
              </h1>

              <p
                className="anim-rise type-lead mt-8 max-w-2xl text-pretty text-bone-200"
                style={{ ["--i" as string]: 3 }}
              >
                {project.tagline}
              </p>
            </div>

            <ProjectGlyph
              slug={project.slug}
              discipline={project.discipline}
              className="anim-rise hidden h-32 self-end opacity-50 lg:block"
            />
          </div>

          {/* Datasheet header block. */}
          <dl
            className="anim-rise mt-16 grid gap-x-10 gap-y-7 border-t border-bone-400/15 pt-8 sm:grid-cols-2 lg:grid-cols-4"
            style={{ ["--i" as string]: 4 }}
          >
            <div className="flex flex-col gap-2">
              <dt className="type-label text-bone-500">Context</dt>
              <dd className="type-meta text-bone-200">{project.context}</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="type-label text-bone-500">Timeframe</dt>
              <dd className="type-meta text-bone-200">{project.timeframe}</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="type-label text-bone-500">Type</dt>
              <dd className="type-meta text-bone-200">{project.kind}</dd>
            </div>
            {project.team && (
              <div className="flex flex-col gap-2">
                <dt className="type-label text-bone-500">Team</dt>
                <dd className="type-meta text-bone-200">{project.team}</dd>
              </div>
            )}
          </dl>
        </Container>

        <TimingDivider className="mt-14 opacity-50" />
      </header>

      <Container wide>
        {/* ================================================================
            MY ROLE — placed high, because for team projects it is the first
            thing a reviewer needs to know.
            ================================================================ */}
        <Reveal className="border-l-2 border-signal-400/50 py-2 pl-6 sm:pl-8">
          <span className="type-label text-signal-400">My role</span>
          <p className="type-prose mt-4 max-w-3xl text-pretty text-bone-200">{project.role}</p>
        </Reveal>

        {/* ================================================================
            RESULTS — up front, with provenance attached.
            ================================================================ */}
        {project.metrics.length > 0 && (
          <section className="mt-24">
            <Reveal>
              <CaseHeading index={nextIndex()}>Results, and how they were measured</CaseHeading>
              <p className="type-meta mt-5 max-w-2xl text-bone-400">
                Each figure below carries its provenance. Where a number is an estimate or a rough
                measurement, it says so.
              </p>
            </Reveal>

            <div className="mt-10">
              {project.metrics.map((metric, i) => (
                <Reveal key={metric.label} index={i}>
                  <MetricRow metric={metric} />
                </Reveal>
              ))}
              <div className="border-t border-bone-400/15" />
            </div>
          </section>
        )}

        {/* ================================================================
            OVERVIEW
            ================================================================ */}
        <section className="mt-24">
          <Reveal>
            <CaseHeading index={nextIndex()}>Overview</CaseHeading>
          </Reveal>
          <div className="mt-8 flex max-w-3xl flex-col gap-6">
            {project.overview.map((paragraph, i) => (
              <Reveal key={i} index={i}>
                <p className="type-prose text-pretty text-bone-200">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================================================================
            THE CHALLENGE
            ================================================================ */}
        <section className="mt-24">
          <Reveal>
            <CaseHeading index={nextIndex()}>The challenge</CaseHeading>
          </Reveal>
          <div className="mt-8 flex max-w-3xl flex-col gap-6">
            {project.challenge.map((paragraph, i) => (
              <Reveal key={i} index={i}>
                <p className="type-prose text-pretty text-bone-300">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================================================================
            KEY DECISIONS — the substance. What separates a case study from a
            project description is the reasoning, not the feature list.
            ================================================================ */}
        {project.decisions.length > 0 && (
          <section className="mt-24">
            <Reveal>
              <CaseHeading index={nextIndex()}>
                Key decisions
              </CaseHeading>
              <p className="type-meta mt-5 max-w-2xl text-bone-400">
                The reasoning, including the tradeoffs and the things that turned out to matter more
                than expected.
              </p>
            </Reveal>

            <ol className="mt-12 flex flex-col">
              {project.decisions.map((decision, i) => (
                <Reveal
                  as="li"
                  key={decision.title}
                  index={i % 3}
                  className="group grid gap-x-10 gap-y-4 border-t border-bone-400/15 py-9 last:border-b lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]"
                >
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="type-label numeric shrink-0 text-bone-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="type-h3 text-balance text-bone-50">{decision.title}</h3>
                  </div>
                  <p className="type-prose max-w-2xl text-pretty text-bone-300">{decision.body}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* ================================================================
            ADDITIONAL SECTIONS
            ================================================================ */}
        {project.sections?.map((section) => (
          <section key={section.heading} className="mt-24">
            <Reveal>
              <h2 className="type-h2 max-w-3xl text-balance text-bone-50">{section.heading}</h2>
            </Reveal>
            <div className="mt-8 flex max-w-3xl flex-col gap-6">
              {section.body.map((paragraph, i) => (
                <Reveal key={i} index={i}>
                  <p className="type-prose text-pretty text-bone-300">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        {/* ================================================================
            OUTCOME
            ================================================================ */}
        <section className="mt-24">
          <Reveal>
            <CaseHeading index={nextIndex()}>Outcome</CaseHeading>
          </Reveal>
          <ul className="mt-8 flex max-w-3xl flex-col gap-5">
            {project.outcome.map((item, i) => (
              <Reveal as="li" key={i} index={i} className="flex gap-4">
                <span aria-hidden="true" className={`mt-3 h-px w-6 shrink-0 bg-current ${accentText}`} />
                <p className="type-prose text-pretty text-bone-200">{item}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ================================================================
            LIMITATIONS — deliberately not hidden at the bottom of a fold.
            ================================================================ */}
        <section className="mt-24">
          <Reveal className="border border-bone-400/15 bg-carbon-850/50 p-7 sm:p-10">
            <div className="flex items-baseline gap-4">
              <span aria-hidden="true" className="type-label numeric shrink-0 text-bone-500">
                ⚠
              </span>
              <h2 className="type-h2 text-balance text-bone-100">Scope and limitations</h2>
            </div>
            <p className="type-meta mt-5 max-w-2xl text-bone-400">
              What this project is not, and what I would be unable to defend if you pushed on it.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {project.limitations.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-bone-500" />
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-pretty text-bone-300">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ================================================================
            STACK + LINKS
            ================================================================ */}
        <section className="mt-24">
          <Reveal className="grid gap-10 border-t border-bone-400/15 pt-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <span className="type-label text-bone-500">Stack</span>
              <TagList items={project.stack} />
            </div>

            {project.links && project.links.length > 0 && (
              <div className="flex flex-col gap-5">
                <span className="type-label text-bone-500">Links</span>
                <ul className="flex flex-col gap-3">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group type-meta inline-flex items-center gap-3 text-bone-200 transition-colors hover:text-signal-300"
                      >
                        <span className="link-underline">{link.label}</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-500 group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </section>

        <Rule className="mt-20" />

        {/* ================================================================
            PREV / NEXT — never dead-end a reader.
            ================================================================ */}
        <nav aria-label="More work" className="mt-10 grid gap-px sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-col gap-3 border border-bone-400/12 p-7 transition-colors duration-400 hover:border-bone-400/30 hover:bg-carbon-850/50"
            >
              <span className="type-label text-bone-500">← Previous</span>
              <span className="type-h3 text-bone-100 transition-colors group-hover:text-signal-300">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col items-start gap-3 border border-bone-400/12 p-7 transition-colors duration-400 hover:border-bone-400/30 hover:bg-carbon-850/50 sm:items-end sm:text-right"
            >
              <span className="type-label text-bone-500">Next →</span>
              <span className="type-h3 text-bone-100 transition-colors group-hover:text-signal-300">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </Container>
    </article>
  );
}
