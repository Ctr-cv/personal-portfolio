import Link from "next/link";
import { MetricChip } from "@/components/metric";
import { ProjectGlyph } from "@/components/project-glyph";
import { DisciplineMark, StatusPill, TagList } from "@/components/tags";
import type { Project } from "@/content/types";

/**
 * Featured card. Asymmetric on purpose: the glyph column is narrower than the
 * text column and the metrics hang off the bottom edge, so a grid of these does
 * not read as a row of identical boxes.
 */
export function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group relative">
      <Link
        href={`/work/${project.slug}`}
        className="corner-ticks block border border-bone-400/12 bg-carbon-850/40 p-6 transition-colors duration-500 hover:border-bone-400/25 hover:bg-carbon-800/60 sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="type-label numeric text-bone-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <DisciplineMark discipline={project.discipline} />
          </div>
          {project.status && <StatusPill status={project.status} />}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_11rem] lg:items-start">
          <div className="flex flex-col gap-4">
            <h3 className="type-h2 text-balance text-bone-50 transition-colors duration-300 group-hover:text-signal-300">
              {project.title}
            </h3>
            <p className="type-prose max-w-2xl text-pretty text-bone-300">{project.tagline}</p>
            <p className="type-meta text-bone-500">
              {project.kind} · {project.context} · {project.timeframe}
            </p>
          </div>

          <ProjectGlyph
            slug={project.slug}
            discipline={project.discipline}
            className="hidden h-28 opacity-45 lg:block"
          />
        </div>

        {project.metrics.length > 0 && (
          <div className="mt-8 grid gap-6 border-t border-bone-400/12 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.metrics.slice(0, 3).map((metric) => (
              <MetricChip key={metric.label} metric={metric} />
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <TagList items={project.stack} max={5} />
          <span className="type-label flex items-center gap-2 text-bone-400 transition-colors duration-300 group-hover:text-signal-400">
            Read case study
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Compact card for the /work index. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full">
      <Link
        href={`/work/${project.slug}`}
        className="corner-ticks flex h-full flex-col gap-5 border border-bone-400/12 bg-carbon-850/30 p-6 transition-colors duration-500 hover:border-bone-400/25 hover:bg-carbon-800/50"
      >
        <div className="flex items-start justify-between gap-3">
          <DisciplineMark discipline={project.discipline} />
          {project.status && <StatusPill status={project.status} />}
        </div>

        <ProjectGlyph
          slug={project.slug}
          discipline={project.discipline}
          className="h-20 opacity-35"
        />

        <div className="flex flex-col gap-3">
          <h3 className="type-h3 text-balance text-bone-50 transition-colors duration-300 group-hover:text-signal-300">
            {project.title}
          </h3>
          <p className="text-[0.9375rem] leading-relaxed text-pretty text-bone-400">
            {project.tagline}
          </p>
        </div>

        {project.metrics.length > 0 && (
          <div className="mt-auto border-t border-bone-400/12 pt-5">
            <MetricChip metric={project.metrics[0]} />
          </div>
        )}

        <div className={project.metrics.length > 0 ? "" : "mt-auto"}>
          <p className="type-meta mb-3 text-bone-500">{project.timeframe}</p>
          <TagList items={project.stack} max={3} />
        </div>
      </Link>
    </article>
  );
}
