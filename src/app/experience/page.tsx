import type { Metadata } from "next";
import Link from "next/link";
import { Container, TimingDivider } from "@/components/layout-primitives";
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
    "Four co-op terms in software engineering, backend development, and full-stack product work at Huawei, JD.com, and Adaptive Pulse.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <section className="pt-16 pb-16 sm:pt-24">
        <Container wide>
          <p className="anim-rise type-label text-bone-400" style={{ ["--i" as string]: 0 }}>
            Experience
          </p>
          <h1
            className="anim-rise type-h1 mt-7 max-w-4xl text-balance text-bone-50"
            style={{ ["--i" as string]: 1 }}
          >
            Four work terms across engineering teams in Canada and China.
          </h1>
          <p
            className="anim-rise type-lead mt-8 max-w-2xl text-pretty text-bone-400"
            style={{ ["--i" as string]: 2 }}
          >
            Software engineering, backend development, and full-stack product work alongside my
            Computer Engineering degree at Waterloo.
          </p>
        </Container>
        <TimingDivider className="mt-16" />
      </section>

      <Container wide>
        <ol>
          {roles.map((role, roleIndex) => (
            <li
              key={role.slug}
              id={role.slug}
              className="scroll-mt-24 border-t border-bone-50 py-16 first:border-t-0 sm:py-24"
            >
              <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <span aria-hidden="true" className="type-meta numeric text-bone-500">
                    {String(roles.length - roleIndex).padStart(2, "0")}
                  </span>
                  <span className="type-meta numeric mt-4 block text-bone-300">{role.timeframe}</span>
                  <span className="type-meta mt-1 block text-bone-500">{role.location}</span>
                </div>

                <div>
                  <h2 className="type-h1 text-balance text-bone-50">{role.company}</h2>
                  <p className="type-h3 mt-3 text-bone-300">{role.title}</p>
                  <p className="type-prose mt-6 max-w-2xl text-pretty text-bone-400">{role.context}</p>
                </div>
              </Reveal>

              <div className="lg:ml-[calc(14rem+4rem)]">
                {role.metrics.length > 0 && (
                  <div className="mt-14">
                    <span className="type-label text-bone-500">Selected results</span>
                    <div className="mt-6">
                      {role.metrics.map((metric, index) => (
                        <Reveal key={metric.label} index={index}>
                          <MetricRow metric={metric} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}

                <Reveal className="mt-14">
                  <span className="type-label text-bone-500">Contributions</span>
                  <ul className="mt-6 flex max-w-3xl flex-col gap-5">
                    {role.contributions.map((item, index) => (
                      <li key={item} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                        <span aria-hidden="true" className="type-meta numeric text-bone-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-base leading-relaxed text-bone-300">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {role.beyondCode && role.beyondCode.length > 0 && (
                  <Reveal className="mt-14">
                    <span className="type-label text-bone-500">Team contributions</span>
                    <ul className="mt-6 flex max-w-3xl flex-col gap-4">
                      {role.beyondCode.map((item) => (
                        <li key={item} className="border-t border-carbon-700 pt-4 text-base leading-relaxed text-bone-400">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {role.projects && role.projects.length > 0 && (
                  <Reveal className="mt-14">
                    <span className="type-label text-bone-500">Related projects</span>
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                      {role.projects.map((slug) => {
                        const project = getProject(slug);
                        if (!project) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/work/${slug}`}
                              className="group block h-full border-t border-bone-50 py-5"
                            >
                              <span className="type-h3 text-bone-100 transition-opacity group-hover:opacity-60">
                                {project.title}
                              </span>
                              <span className="type-meta mt-2 block text-bone-500">{project.kind}</span>
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

        <section id="education" className="scroll-mt-24 border-t border-bone-50 py-16 sm:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <span className="type-label text-bone-500">Education</span>
              <span className="type-meta numeric mt-4 block text-bone-300">{education.timeframe}</span>
            </div>

            <div>
              <h2 className="type-h1 text-balance text-bone-50">{education.school}</h2>
              <p className="type-h3 mt-3 text-bone-300">{education.degree}</p>

              <dl className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
                <div>
                  <dt className="type-label text-bone-500">GPA</dt>
                  <dd className="numeric mt-2 text-2xl text-bone-50">{education.gpa}</dd>
                </div>
                <div>
                  <dt className="type-label text-bone-500">Standing</dt>
                  <dd className="type-meta mt-2 text-bone-200">
                    {education.honours.map((honour) => (
                      <span key={honour} className="block">{honour}</span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-12">
                <span className="type-label text-bone-500">Relevant coursework</span>
                <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                  {education.coursework.map((course) => (
                    <li key={course.name} className="border-t border-carbon-700 py-4">
                      <span className="type-meta text-bone-100">{course.name}</span>
                      {course.note && <span className="type-meta mt-1 block text-bone-500">{course.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal className="flex flex-col items-start gap-6 border-t border-bone-50 py-16">
          <p className="type-h2 max-w-3xl text-balance text-bone-100">Seeking a fifth co-op term.</p>
          <p className="type-prose max-w-2xl text-bone-400">{site.availability.detail}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="type-label bg-bone-100 px-6 py-4 text-carbon-850">
              Contact →
            </Link>
            <a href={site.resume} className="type-label border border-bone-100 px-6 py-4 text-bone-100">
              Résumé (PDF)
            </a>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
