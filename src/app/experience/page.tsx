import type { Metadata } from "next";
import Link from "next/link";
import { Backdrop, Container, TimingDivider } from "@/components/layout-primitives";
import { MetricRow } from "@/components/metric";
import { Reveal } from "@/components/reveal";
import { TagList } from "@/components/tags";
import { education } from "@/content/about";
import { roles } from "@/content/experience";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Four co-op work terms: Software Engineer Intern at Huawei Technologies Canada, Backend Developer at JD.com in Beijing, and Full Stack Developer at Adaptive Pulse in Toronto.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24">
        <Backdrop variant="oxide" />
        <Container wide>
          <p className="anim-rise type-label text-bone-400" style={{ ["--i" as string]: 0 }}>
            Experience
          </p>
          <h1
            className="anim-rise type-h1 mt-7 max-w-4xl text-balance text-bone-50"
            style={{ ["--i" as string]: 1 }}
          >
            Four work terms, three teams, two countries.
          </h1>
          <p
            className="anim-rise type-lead mt-8 max-w-2xl text-pretty text-bone-300"
            style={{ ["--i" as string]: 2 }}
          >
            {education.note} Each role below lists what I actually did, and where the scale of a
            system belonged to the system rather than to me, it says so.
          </p>
        </Container>
        <TimingDivider className="mt-16 opacity-50" />
      </section>

      <Container wide>
        <ol className="flex flex-col">
          {roles.map((role, roleIndex) => (
            <li
              key={role.slug}
              id={role.slug}
              className="scroll-mt-24 border-t border-bone-400/15 py-16 first:border-t-0 sm:py-20"
            >
              {/* Header: company, title, dates */}
              <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
                <div className="flex flex-col gap-3">
                  <span aria-hidden="true" className="type-label numeric text-signal-400">
                    {String(roles.length - roleIndex).padStart(2, "0")}
                  </span>
                  <span className="type-meta numeric text-bone-300">{role.timeframe}</span>
                  <span className="type-meta text-bone-500">{role.location}</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h2 className="type-h1 text-balance text-bone-50">{role.company}</h2>
                  <p className="type-h3 text-oxide-300">{role.title}</p>
                  <p className="type-prose mt-2 max-w-2xl text-pretty text-bone-300">
                    {role.context}
                  </p>
                </div>
              </Reveal>

              <div className="lg:ml-[calc(14rem+4rem)]">
                {/* Metrics */}
                {role.metrics.length > 0 && (
                  <div className="mt-14">
                    <span className="type-label text-bone-500">Outcomes</span>
                    <div className="mt-6">
                      {role.metrics.map((metric, i) => (
                        <Reveal key={metric.label} index={i}>
                          <MetricRow metric={metric} />
                        </Reveal>
                      ))}
                      <div className="border-t border-bone-400/15" />
                    </div>
                  </div>
                )}

                {/* What I did */}
                <Reveal className="mt-14">
                  <span className="type-label text-bone-500">What I built</span>
                  <ul className="mt-6 flex flex-col gap-5">
                    {role.contributions.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="numeric mt-1 shrink-0 text-xs text-bone-500"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-pretty text-bone-200">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Non-code contributions */}
                {role.beyondCode && role.beyondCode.length > 0 && (
                  <Reveal className="mt-14">
                    <span className="type-label text-oxide-400">Beyond shipping code</span>
                    <ul className="mt-6 flex flex-col gap-4">
                      {role.beyondCode.map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <span
                            aria-hidden="true"
                            className="mt-3 h-px w-5 shrink-0 bg-oxide-400/60"
                          />
                          <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-pretty text-bone-300">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {/* Honest scope framing */}
                {role.scopeNote && (
                  <Reveal className="mt-14 border-l-2 border-bone-500/50 py-1 pl-6">
                    <span className="type-label text-bone-500">Scope note</span>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-pretty text-bone-400">
                      {role.scopeNote}
                    </p>
                  </Reveal>
                )}

                {/* Related case studies */}
                {role.projects && role.projects.length > 0 && (
                  <Reveal className="mt-14">
                    <span className="type-label text-bone-500">Case studies from this term</span>
                    <ul className="mt-6 grid gap-px sm:grid-cols-2">
                      {role.projects.map((slug) => {
                        const project = getProject(slug);
                        if (!project) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/work/${slug}`}
                              className="group flex h-full flex-col gap-2 border border-bone-400/12 p-5 transition-colors duration-400 hover:border-bone-400/30 hover:bg-carbon-850/50"
                            >
                              <span className="type-h3 text-bone-100 transition-colors group-hover:text-signal-300">
                                {project.title}
                              </span>
                              <span className="type-meta text-bone-500">{project.kind}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Reveal>
                )}

                <Reveal className="mt-12">
                  <TagList items={role.stack} />
                </Reveal>
              </div>
            </li>
          ))}
        </ol>

        {/* Education */}
        <section
          id="education"
          className="scroll-mt-24 border-t border-bone-400/15 py-16 sm:py-20"
        >
          <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-3">
              <span className="type-label text-signal-400">Education</span>
              <span className="type-meta numeric text-bone-300">{education.timeframe}</span>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="type-h1 text-balance text-bone-50">{education.school}</h2>
              <p className="type-h3 text-oxide-300">{education.degree}</p>

              <dl className="mt-4 flex flex-wrap gap-x-14 gap-y-6">
                <div className="flex flex-col gap-1.5">
                  <dt className="type-label text-bone-500">GPA</dt>
                  <dd className="numeric text-2xl text-bone-50">{education.gpa}</dd>
                </div>
                <div className="flex flex-col gap-1.5">
                  <dt className="type-label text-bone-500">Standing</dt>
                  <dd className="type-meta text-bone-200">
                    {education.honours.map((h) => (
                      <span key={h} className="block">
                        {h}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <span className="type-label text-bone-500">Relevant coursework</span>
                <ul className="mt-5 grid gap-px sm:grid-cols-2">
                  {education.coursework.map((course) => (
                    <li
                      key={course.name}
                      className="flex flex-col gap-1.5 border-t border-bone-400/12 py-4"
                    >
                      <span className="type-meta text-bone-100">{course.name}</span>
                      {course.note && (
                        <span className="type-meta text-bone-500">{course.note}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal className="flex flex-col items-start gap-6 border-t border-bone-400/15 py-16">
          <p className="type-h2 max-w-3xl text-balance text-bone-100">
            Preparing for a fifth work term.
          </p>
          <p className="type-prose max-w-2xl text-pretty text-bone-300">
            {site.availability.detail}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="type-label border border-signal-400/45 px-6 py-4 text-signal-300 transition-colors duration-400 hover:bg-signal-400 hover:text-carbon-900"
            >
              Get in touch
            </Link>
            <a
              href={site.resume}
              className="type-label border border-bone-400/25 px-6 py-4 text-bone-200 transition-colors duration-400 hover:border-bone-400/50"
            >
              Résumé (PDF)
            </a>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
