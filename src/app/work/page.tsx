import type { Metadata } from "next";
import { Container, PageMarker, SectionHeader } from "@/components/layout-primitives";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { roles } from "@/content/experience";
import { projects, projectsByDiscipline } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software, machine learning, digital hardware, and embedded systems projects by Computer Engineering student Vivi Huang.",
  alternates: { canonical: "/work" },
};

const groups = [
  {
    id: "software" as const,
    index: "01",
    label: "Software & machine learning",
    title: "Models, pipelines, and products",
    intro: "Computer vision, real-time inference, concurrent pipelines, and product engineering from co-op and personal work.",
  },
  {
    id: "hardware" as const,
    index: "02",
    label: "Hardware & firmware",
    title: "RTL, silicon, and embedded systems",
    intro: "FPGA acceleration, an ASIC tapeout, processor design, and STM32 firmware built through coursework and team projects.",
  },
];

export default function ProjectsPage() {
  const softwareCount = projectsByDiscipline("software").length;
  const hardwareCount = projectsByDiscipline("hardware").length;
  const professionalSlugs = new Set(roles.flatMap((role) => role.projects ?? []));
  const professionalCount = projects.filter((project) => professionalSlugs.has(project.slug)).length;

  return (
    <>
      <section className="page-cover page-cover-projects py-12 sm:py-16">
        <Container wide>
          <div className="anim-rise" style={{ ["--i" as string]: 0 }}>
            <PageMarker index="02" label="Projects" inverse />
          </div>

          <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div>
              <span aria-hidden="true" className="page-index block !text-[#4d4d4d]">02</span>
              <h1 className="anim-rise type-h1 mt-8 max-w-5xl text-balance text-[#f5f4f0]" style={{ ["--i" as string]: 1 }}>
                Selected engineering work across software and hardware.
              </h1>
            </div>

            <dl className="anim-rise border-b border-[#4d4d4d]" style={{ ["--i" as string]: 2 }}>
              {[
                { label: "Software / ML", value: softwareCount },
                { label: "Hardware / firmware", value: hardwareCount },
                { label: "From co-op terms", value: professionalCount },
                { label: "Total catalog", value: projects.length },
              ].map((item) => (
                <div key={item.label} className="catalog-stat flex items-end justify-between gap-8">
                  <dt className="type-meta text-[#a7a69f]">{item.label}</dt>
                  <dd className="numeric text-3xl text-[#f5f4f0]">{String(item.value).padStart(2, "0")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {groups.map((group, groupIndex) => (
        <section key={group.id} id={group.id} className={`scroll-mt-24 py-20 sm:py-28 ${groupIndex === 0 ? "surface-panel" : ""}`}>
          <Container wide>
            <Reveal>
              <SectionHeader index={group.index} label={group.label} title={group.title} intro={group.intro} />
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
