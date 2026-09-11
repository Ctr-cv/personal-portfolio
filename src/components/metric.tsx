import { basisLabel, type Metric } from "@/content/projects";

export function BasisBadge({ basis }: { basis: Metric["basis"] }) {
  return <span className="type-meta text-bone-500">{basisLabel[basis]}</span>;
}

export function MetricChip({ metric }: { metric: Metric }) {
  return (
    <div>
      <span className="numeric block text-2xl font-medium leading-none text-bone-50 sm:text-3xl">
        {metric.value}
      </span>
      <span className="type-meta mt-2 block text-bone-400">{metric.label}</span>
    </div>
  );
}

export function MetricRow({ metric }: { metric: Metric }) {
  return (
    <div className="grid gap-5 border-t border-carbon-700 py-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-12">
      <div>
        <span className="numeric block text-3xl font-medium leading-none text-bone-50">
          {metric.value}
        </span>
        <span className="type-meta mt-2 block text-bone-400">{metric.label}</span>
      </div>
      <div>
        <BasisBadge basis={metric.basis} />
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-400">{metric.note}</p>
      </div>
    </div>
  );
}
