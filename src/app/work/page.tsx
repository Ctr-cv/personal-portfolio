import type { Metadata } from "next";
import { Container, SectionHeader } from "@/components/layout-primitives";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { roles } from "@/content/experience";
import { projects, projectsByDiscipline } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software, machine learning, digital hardware, and embedded systems projects by Computer Engineering student Vivi Huang.",
  alternates: { canonical: "/work" },
};

const groups = [
  {
    id: "software" as const,
    index: "01",
    label: "Software & machine learning",
    title: "Models, pipelines, and products",
    intro:
      "Computer vision, real-time inference, concurrent pipelines, and product engineering from co-op and personal work.",
  },
  {
    id: "hardware" as const,
    index: "02",
    label: "Hardware & firmware",
    title: "RTL, silicon, and embedded systems",
    intro:
      "FPGA acceleration, an ASIC tapeout, processor design, and STM32 firmware built through coursework and team projects.",
  },
];

export default function ProjectsPage() {
  const softwareCount = projectsByDiscipline("software").length;
  const hardwareCount = projectsByDiscipline("hardware").length;
  const professionalSlugs = new Set(roles.flatMap((role) => role.projects ?? []));
  const professionalCount = projects.filter((project) => professionalSlugs.has(project.slug)).length;

  return (
    <>
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Container wide>
          <p className="anim-rise type-label text-bone-400" style={{ ["--i" as string]: 0 }}>
            Projects
          </p>
          <h1
            className="anim-rise type-h1 mt-7 max-w-5xl text-balance text-bone-50"
            style={{ ["--i" as string]: 1 }}
          >
            Selected engineering work across software and hardware.
          </h1>
          <p
            className="anim-rise type-lead mt-8 max-w-2xl text-pretty text-bone-400"
            style={{ ["--i" as string]: 2 }}
          >
            {softwareCount} software and machine learning projects, {hardwareCount} hardware and
            firmware projects, including {professionalCount} from co-op terms.
          </p>
        </Container>
      </section>

      {groups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24 py-20 sm:py-28">
          <Container wide>
            <Reveal>
              <SectionHeader
                index={group.index}
                label={group.label}
                title={group.title}
                intro={group.intro}
              />
            </Reveal>

            <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projectsByDiscipline(group.id).map((project, index) => (
                <Reveal as="li" key={project.slug} index={index % 3}>
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
