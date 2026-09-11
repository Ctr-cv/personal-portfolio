import type { ReactNode } from "react";

/** Consistent page gutter. Everything on the site sits inside this. */
export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${wide ? "max-w-[92rem]" : "max-w-6xl"} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Numbered section header. The index is rendered as a machine label to reinforce
 * the datasheet framing, and is decorative — hidden from assistive tech.
 */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  accent = "signal",
}: {
  index?: string;
  label: string;
  title?: string;
  intro?: string;
  accent?: "signal" | "oxide" | "bone";
}) {
  const accentClass =
    accent === "oxide" ? "text-oxide-400" : accent === "bone" ? "text-bone-400" : "text-signal-400";

  return (
    <header className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        {index && (
          <span aria-hidden="true" className={`type-label numeric ${accentClass}`}>
            {index}
          </span>
        )}
        <span className="type-label text-bone-400">{label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-bone-400/20" />
      </div>
      {title && <h2 className="type-h2 max-w-3xl text-bone-50">{title}</h2>}
      {intro && <p className="type-lead max-w-2xl text-bone-300">{intro}</p>}
    </header>
  );
}

/** Thin rule used to separate major bands of a page. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-bone-400/15 ${className}`} />;
}

/**
 * A timing-diagram divider: two digital signals, one lagging the other by a
 * cycle. It is the site's recurring motif and a quiet nod to the one-cycle
 * memory-latency offset in the MVM controller.
 */
export function TimingDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="h-12 w-full"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 14 H80 V4 H200 V14 H320 V4 H420 V14 H560 V4 H660 V14 H820 V4 H940 V14 H1080 V4 H1200"
          stroke="var(--color-signal-400)"
          strokeWidth="1.25"
          strokeOpacity="0.55"
          className="anim-trace"
          style={{ ["--trace-length" as string]: 2600 }}
        />
        <path
          d="M0 44 H120 V34 H240 V44 H360 V34 H460 V44 H600 V34 H700 V44 H860 V34 H980 V44 H1120 V34 H1200"
          stroke="var(--color-oxide-400)"
          strokeWidth="1.25"
          strokeOpacity="0.45"
          className="anim-trace"
          style={{ ["--trace-length" as string]: 2600 }}
        />
      </svg>
    </div>
  );
}

/** Layered atmosphere: grid, bloom and grain. Sits behind page content. */
export function Backdrop({
  variant = "signal",
}: {
  variant?: "signal" | "oxide" | "both";
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="texture-grid mask-fade-b absolute inset-0 opacity-60" />
      {(variant === "signal" || variant === "both") && (
        <div className="texture-bloom absolute inset-0" />
      )}
      {(variant === "oxide" || variant === "both") && (
        <div className="texture-bloom-oxide absolute inset-0" />
      )}
      <div className="texture-noise absolute inset-0" />
    </div>
  );
}
