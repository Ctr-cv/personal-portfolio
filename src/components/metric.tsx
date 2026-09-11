import type { Metric } from "@/content/projects";

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
    <div className="border-t border-carbon-700 py-6">
      <MetricChip metric={metric} />
    </div>
  );
}
