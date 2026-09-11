import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Rule } from "@/components/layout-primitives";
import { MetricChip } from "@/components/metric";
import { ProjectGlyph } from "@/components/project-glyph";
import { Reveal } from "@/components/reveal";
import { DisciplineMark, StatusPill, TagList } from "@/components/tags";
import { getCaseStudyCopy } from "@/content/case-studies";
import { adjacentProjects, getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} — ${site.name}`, description: project.tagline, url: `/work/${project.slug}`, type: "article" },
  };
}

function CaseHeading({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-t-2 border-bone-50 pt-5 lg:grid-cols-[12rem_minmax(0,1fr)]">
      <span aria-hidden="true" className="type-meta numeric text-bone-500">{index}</span>
      <h2 className="type-h2 max-w-4xl text-balance text-bone-50">{children}</h2>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const copy = getCaseStudyCopy(project);
  const { prev, next } = adjacentProjects(slug);
  const projectNumber = String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, "0");
  let sectionIndex = 0;
  const nextIndex = () => String(++sectionIndex).padStart(2, "0");

  return (
    <article>
      <header className="project-cover py-10 sm:py-14">
        <Container wide>
          <nav aria-label="Breadcrumb" className="anim-rise" style={{ ["--i" as string]: 0 }}>
            <ol className="type-label flex flex-wrap items-center gap-3 text-bone-500">
              <li><Link href="/" className="link-underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/work" className="link-underline">02 — Projects</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-bone-100">Project {projectNumber}</li>
            </ol>
          </nav>

          <div className="mt-12 grid gap-10 lg:grid-cols-[7rem_minmax(0,1fr)_20rem] lg:items-end">
            <div className="anim-rise" style={{ ["--i" as string]: 1 }}>
              <span aria-hidden="true" className="page-index !text-carbon-600">{projectNumber}</span>
              <span className="type-meta mt-5 block text-bone-500">Project<br />Index</span>
            </div>

            <div>
              <div className="anim-rise flex flex-wrap items-center gap-4" style={{ ["--i" as string]: 1 }}>
                <DisciplineMark discipline={project.discipline} />
                {project.status && <StatusPill status={project.status} />}
              </div>
              <h1 className="anim-rise type-h1 mt-7 max-w-5xl text-balance text-bone-50" style={{ ["--i" as string]: 2 }}>
                {project.title}
              </h1>
              <p className="anim-rise type-lead mt-8 max-w-3xl text-pretty text-bone-400" style={{ ["--i" as string]: 3 }}>
                {project.tagline}
              </p>
            </div>

            <div className="project-glyph-frame anim-rise" style={{ ["--i" as string]: 3 }} aria-hidden="true">
              <ProjectGlyph slug={project.slug} discipline={project.discipline} className="h-28 w-full opacity-70" />
            </div>
          </div>

          <dl className="anim-rise mt-14 grid gap-x-10 gap-y-7 border-t border-bone-50 pt-7 md:grid-cols-3" style={{ ["--i" as string]: 4 }}>
            <div><dt className="type-label text-bone-500">Context</dt><dd className="type-meta mt-2 text-bone-200">{project.context}</dd></div>
            <div><dt className="type-label text-bone-500">Timeframe</dt><dd className="type-meta mt-2 text-bone-200">{project.timeframe}</dd></div>
            <div><dt className="type-label text-bone-500">Contribution</dt><dd className="type-meta mt-2 text-bone-200">{copy.contribution}</dd></div>
          </dl>
        </Container>
      </header>

      <Container wide>
        <section className="py-16 sm:py-24">
          <Reveal><CaseHeading index={nextIndex()}>Overview</CaseHeading></Reveal>
          <div className="mt-10 grid gap-6 lg:ml-[calc(12rem+1rem)] lg:max-w-3xl">
            {copy.overview.map((paragraph, index) => <Reveal key={paragraph} index={index}><p className="type-prose text-pretty text-bone-300">{paragraph}</p></Reveal>)}
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <Reveal><CaseHeading index={nextIndex()}>Selected results</CaseHeading></Reveal>
          {project.metrics.length > 0 && (
            <div className="mt-10 grid gap-8 border-y border-carbon-700 bg-carbon-850 px-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.metrics.slice(0, 3).map((metric, index) => <Reveal key={metric.label} index={index}><MetricChip metric={metric} /></Reveal>)}
            </div>
          )}
          <ul className="mt-10 grid gap-5 lg:ml-[calc(12rem+1rem)] lg:max-w-3xl">
            {copy.results.map((result, index) => (
              <Reveal as="li" key={result} index={index} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                <span aria-hidden="true" className="type-meta numeric text-bone-500">{String(index + 1).padStart(2, "0")}</span>
                <p className="type-prose text-pretty text-bone-300">{result}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {copy.choices.length > 0 && (
          <section className="py-16 sm:py-24">
            <Reveal><CaseHeading index={nextIndex()}>Key design choices</CaseHeading></Reveal>
            <ol className="mt-10 border-b border-carbon-700 lg:ml-[calc(12rem+1rem)]">
              {copy.choices.map((choice, index) => (
                <Reveal as="li" key={choice.title} index={index} className="grid gap-4 border-t border-carbon-700 py-7 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-10">
                  <h3 className="type-h3 text-bone-50">{choice.title}</h3>
                  <p className="text-base leading-relaxed text-bone-400">{choice.body}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        <section className="py-16 sm:py-24">
          <Reveal className="grid gap-10 border-t border-bone-50 pt-8 lg:grid-cols-2">
            <div><span className="type-label text-bone-500">Stack</span><div className="mt-5"><TagList items={project.stack} /></div></div>
            {project.links && project.links.length > 0 && (
              <div>
                <span className="type-label text-bone-500">Links</span>
                <ul className="mt-5 flex flex-col gap-3">
                  {project.links.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer noopener" className="type-meta link-underline text-bone-200">{link.label} ↗</a></li>)}
                </ul>
              </div>
            )}
          </Reveal>
        </section>

        <Rule />
        <nav aria-label="More projects" className="grid gap-8 py-10 sm:grid-cols-2">
          {prev ? <Link href={`/work/${prev.slug}`} className="group border-t border-carbon-700 py-5"><span className="type-label text-bone-500">← Previous</span><span className="type-h3 mt-3 block text-bone-100 transition-opacity group-hover:opacity-60">{prev.title}</span></Link> : <span />}
          {next && <Link href={`/work/${next.slug}`} className="group border-t border-carbon-700 py-5 sm:text-right"><span className="type-label text-bone-500">Next →</span><span className="type-h3 mt-3 block text-bone-100 transition-opacity group-hover:opacity-60">{next.title}</span></Link>}
        </nav>
      </Container>
    </article>
  );
}
