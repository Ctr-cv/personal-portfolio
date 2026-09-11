import Link from "next/link";
import { MetricChip } from "@/components/metric";
import { DisciplineMark, StatusPill, TagList } from "@/components/tags";
import type { Project } from "@/content/types";

/** Large, editorial row used for the three selected home-page projects. */
export function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group border-t border-bone-50">
      <Link href={`/work/${project.slug}`} className="block py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(15rem,0.65fr)] lg:gap-10">
          <span aria-hidden="true" className="numeric text-sm text-bone-500">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <DisciplineMark discipline={project.discipline} />
              {project.status && <StatusPill status={project.status} />}
            </div>
            <h3 className="type-h2 mt-5 max-w-3xl text-bone-50 transition-opacity duration-200 group-hover:opacity-65">
              {project.title}
            </h3>
            <p className="type-lead mt-5 max-w-2xl text-bone-400">{project.tagline}</p>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:border-l lg:border-carbon-700 lg:pl-8">
            {project.metrics[0] && <MetricChip metric={project.metrics[0]} />}
            <div>
              <p className="type-meta mb-4 text-bone-500">
                {project.kind} · {project.timeframe}
              </p>
              <TagList items={project.stack} max={4} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <span className="type-label inline-flex items-center gap-2 text-bone-100">
            View project
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Compact project index card; typography carries the visual hierarchy. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full border-t border-bone-50">
      <Link href={`/work/${project.slug}`} className="flex h-full flex-col py-6 sm:py-8">
        <div className="flex items-start justify-between gap-4">
          <DisciplineMark discipline={project.discipline} />
          {project.status && <StatusPill status={project.status} />}
        </div>

        <h3 className="type-h3 mt-8 text-bone-50 transition-opacity duration-200 group-hover:opacity-60">
          {project.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-base leading-relaxed text-bone-400">
          {project.tagline}
        </p>

        {project.metrics[0] && (
          <div className="mt-8 border-t border-carbon-700 pt-5">
            <MetricChip metric={project.metrics[0]} />
          </div>
        )}

        <div className="mt-auto pt-8">
          <p className="type-meta mb-4 text-bone-500">{project.timeframe}</p>
          <TagList items={project.stack} max={3} />
        </div>
      </Link>
    </article>
  );
}
