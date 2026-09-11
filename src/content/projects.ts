import { hardwareProjects } from "./projects.hardware";
import { softwareProjects } from "./projects.software";
import type { Discipline, MetricBasis, Project } from "./types";

export * from "./types";

/** All projects, strongest first. */
export const projects: Project[] = [...hardwareProjects, ...softwareProjects].sort(
  (a, b) => b.weight - a.weight,
);

export const featuredProjects = projects.filter((p) => p.featured);

export function projectsByDiscipline(discipline: Discipline): Project[] {
  return projects.filter((p) => p.discipline === discipline);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Previous/next for case-study footers, so a visitor never dead-ends. */
export function adjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { prev: projects[i - 1], next: projects[i + 1] };
}

/** Human-readable labels for metric provenance badges. */
export const basisLabel: Record<MetricBasis, string> = {
  measured: "Measured",
  "tool-reported": "Tool-reported",
  approximate: "Rough measurement",
  estimated: "Self-estimated",
  "inherited-scale": "Inherited scale — not my result",
};

/** Short gloss shown in the legend. */
export const basisGloss: Record<MetricBasis, string> = {
  measured: "Directly counted or instrumented. Defensible as stated.",
  "tool-reported": "Reported by a tool on a defined benchmark, e.g. a timing report or mAP@50.",
  approximate: "Measured during development, but not rigorously benchmarked.",
  estimated: "My own informal comparison. Directional, not a benchmark.",
  "inherited-scale": "A property of a system that already existed. Context only.",
};

export const disciplineLabel: Record<Discipline, string> = {
  hardware: "Hardware",
  software: "Software / AI",
};

export const statusLabel: Record<NonNullable<Project["status"]>, string> = {
  "in-progress": "In progress",
  shipped: "Shipped",
  demo: "Prototype",
  archived: "Archived",
};
