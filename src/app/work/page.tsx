import type { Metadata } from "next";
import { Backdrop, Container, SectionHeader } from "@/components/layout-primitives";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { roles } from "@/content/experience";
import { projects, projectsByDiscipline } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies across digital hardware and AI systems: an FPGA matrix-vector accelerator, a binarized neural network ASIC, a real-time gesture recognizer, voice agent latency work, and more.",
  alternates: { canonical: "/work" },
};

const groups = [
  {
    id: "hardware" as const,
    index: "01",
    label: "Digital hardware",
    title: "RTL, silicon and firmware",
    intro:
      "Accelerator design, a tapeout, a processor in progress, and embedded firmware. Everything here has been through a real toolchain rather than only a simulator.",
    accent: "signal" as const,
  },
  {
    id: "software" as const,
    index: "02",
    label: "Software & AI systems",
    title: "Models, pipelines and products",
    intro:
      "Computer vision pipelines, agent architecture, latency work on real-time systems, and full-stack product engineering — most of it from four co-op terms.",
    accent: "oxide" as const,
  },
];

export default function WorkPage() {
  const hardwareCount = projectsByDiscipline("hardware").length;
  const softwareCount = projectsByDiscipline("software").length;

  // Derived from the experience data rather than matched on strings, so adding a
  // role or a project keeps this count correct.
  const professionalSlugs = new Set(roles.flatMap((role) => role.projects ?? []));
  const professionalCount = projects.filter((p) => professionalSlugs.has(p.slug)).length;
  const inProgressCount = projects.filter((p) => p.status === "in-progress").length;

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24">
        <Backdrop variant="both" />
        <Container wide>
          <p
            className="anim-rise type-label text-bone-400"
            style={{ ["--i" as string]: 0 }}
          >
            Work
          </p>
          <h1
            className="anim-rise type-h1 mt-7 max-w-4xl text-balance text-bone-50"
            style={{ ["--i" as string]: 1 }}
          >
            {projects.length} projects, written up honestly.
          </h1>
          <p
            className="anim-rise type-lead mt-8 max-w-2xl text-pretty text-bone-300"
            style={{ ["--i" as string]: 2 }}
          >
            {hardwareCount} hardware and {softwareCount} software projects. Each case study covers the
            problem, the decisions I made and why, the result, and what is still unfinished — including
            the projects where the honest answer is &ldquo;this is a prototype&rdquo;.
          </p>

          <dl
            className="anim-rise mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-bone-400/15 pt-8"
            style={{ ["--i" as string]: 3 }}
          >
            <div className="flex flex-col gap-1.5">
              <dt className="type-label text-bone-500">Hardware</dt>
              <dd className="numeric text-2xl text-signal-400">{hardwareCount}</dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="type-label text-bone-500">Software / AI</dt>
              <dd className="numeric text-2xl text-oxide-400">{softwareCount}</dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="type-label text-bone-500">From co-op terms</dt>
              <dd className="numeric text-2xl text-bone-100">
                {professionalCount}
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="type-label text-bone-500">In progress</dt>
              <dd className="numeric text-2xl text-bone-100">
                {inProgressCount}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {groups.map((group) => (
        <section key={group.id} id={group.id} className="relative scroll-mt-24 py-16 sm:py-20">
          <Container wide>
            <Reveal>
              <SectionHeader
                index={group.index}
                label={group.label}
                title={group.title}
                intro={group.intro}
                accent={group.accent}
              />
            </Reveal>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectsByDiscipline(group.id).map((project, i) => (
                <Reveal as="li" key={project.slug} index={i % 3}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ))}
    </>
  );
}
