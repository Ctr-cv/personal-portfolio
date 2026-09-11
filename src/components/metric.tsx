import { basisLabel, type Metric, type MetricBasis } from "@/content/projects";

/**
 * The signature component of this site: a number is never shown without how it
 * was obtained. `note` is rendered inline rather than hidden behind a tooltip,
 * because a caveat you have to hover to find is not really a caveat.
 */

const basisStyles: Record<MetricBasis, { dot: string; text: string }> = {
  measured: { dot: "bg-oxide-400", text: "text-oxide-300" },
  "tool-reported": { dot: "bg-oxide-400", text: "text-oxide-300" },
  approximate: { dot: "bg-signal-400", text: "text-signal-300" },
  estimated: { dot: "bg-signal-400", text: "text-signal-300" },
  "inherited-scale": { dot: "bg-bone-500", text: "text-bone-400" },
};

export function BasisBadge({ basis }: { basis: MetricBasis }) {
  const s = basisStyles[basis];
  return (
    <span className="type-label inline-flex items-center gap-2">
      <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${s.dot}`} />
      <span className={s.text}>{basisLabel[basis]}</span>
    </span>
  );
}

/** Compact form for listing cards: figure + label + provenance, no note. */
export function MetricChip({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="numeric text-xl leading-none text-bone-50 sm:text-2xl">
        {metric.value}
      </span>
      <span className="type-meta text-bone-400">{metric.label}</span>
      <BasisBadge basis={metric.basis} />
    </div>
  );
}

/**
 * Full form for case studies. Reads like a datasheet row: the figure, what it
 * describes, how it was obtained, and what it does not mean.
 */
export function MetricRow({ metric }: { metric: Metric }) {
  const accent =
    metric.basis === "inherited-scale"
      ? "before:bg-bone-500"
      : metric.basis === "measured" || metric.basis === "tool-reported"
        ? "before:bg-oxide-400"
        : "before:bg-signal-400";

  return (
    <div
      className={`relative grid gap-x-8 gap-y-3 border-t border-bone-400/15 py-6 pl-5 before:absolute before:left-0 before:top-6 before:h-8 before:w-px md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] ${accent}`}
    >
      <div className="flex flex-col gap-2">
        <span className="numeric text-2xl leading-none text-bone-50 sm:text-3xl">
          {metric.value}
        </span>
        <span className="type-meta text-bone-300">{metric.label}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <BasisBadge basis={metric.basis} />
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-bone-400">
          {metric.note}
        </p>
      </div>
    </div>
  );
}
