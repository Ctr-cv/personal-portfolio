import { statusLabel } from "@/content/projects";
import type { Discipline, Project } from "@/content/types";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-meta rounded-full border border-bone-400/20 px-2.5 py-1 text-bone-400 transition-colors duration-300 group-hover:border-bone-400/35 group-hover:text-bone-300">
      {children}
    </span>
  );
}

export function TagList({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items;
  const rest = max ? items.length - shown.length : 0;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
      {rest > 0 && (
        <li>
          <Tag>+{rest}</Tag>
        </li>
      )}
    </ul>
  );
}

/** Amber for hardware, teal for software. Consistent everywhere on the site. */
export function DisciplineMark({
  discipline,
  withLabel = true,
}: {
  discipline: Discipline;
  withLabel?: boolean;
}) {
  const isHardware = discipline === "hardware";
  return (
    <span className="type-label inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${isHardware ? "bg-signal-400" : "bg-oxide-400"}`}
      />
      {withLabel && (
        <span className={isHardware ? "text-signal-300" : "text-oxide-300"}>
          {isHardware ? "Hardware" : "Software"}
        </span>
      )}
    </span>
  );
}

export function StatusPill({ status }: { status: NonNullable<Project["status"]> }) {
  const inProgress = status === "in-progress";
  return (
    <span
      className={`type-label inline-flex items-center gap-2 rounded-full border px-2.5 py-1 ${
        inProgress
          ? "border-signal-400/40 text-signal-300"
          : "border-bone-400/20 text-bone-400"
      }`}
    >
      {inProgress && <span aria-hidden="true" className="anim-pulse size-1.5 rounded-full bg-signal-400" />}
      {statusLabel[status]}
    </span>
  );
}
