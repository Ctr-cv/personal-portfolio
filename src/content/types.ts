/**
 * Content schema for the portfolio.
 *
 * A deliberate design decision: quantified claims are not plain strings. Every
 * metric carries how it was obtained (`basis`) so the UI can render honest
 * provenance next to the number. An engineer reading this site should never be
 * misled about which figures are rigorous measurements and which are estimates,
 * and Vivi should never be put in the position of defending a number the site
 * overstated on her behalf.
 */

/** How a number came to exist. Drives the badge shown beside it. */
export type MetricBasis =
  /** Instrumented or tool-reported. Defensible as-is. */
  | "measured"
  /** Reported by a tool on a defined benchmark (e.g. Vivado timing, mAP@50). */
  | "tool-reported"
  /** Rough or informal measurement. Directionally right, not rigorous. */
  | "approximate"
  /** Self-estimated by comparison. Explicitly not a benchmark. */
  | "estimated"
  /** A property of a system that already existed. Context, never an achievement. */
  | "inherited-scale";

export interface Metric {
  /** The headline figure, e.g. "30s → 13s". */
  value: string;
  /** What the figure describes, e.g. "Per-image runtime". */
  label: string;
  basis: MetricBasis;
  /** Required. How it was measured, and what it does and does not mean. */
  note: string;
}

export type Discipline = "hardware" | "software";

export interface ProjectLink {
  label: string;
  href: string;
}

/** A block of case-study prose with an optional pull-out. */
export interface CaseSection {
  heading: string;
  /** Each string is a paragraph. */
  body: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** Shown under the title in listings. One line, plain language. */
  tagline: string;
  discipline: Discipline;
  /** Short kind descriptor, e.g. "FPGA accelerator", "ASIC tapeout". */
  kind: string;
  context: string;
  timeframe: string;
  /** Sort key: higher shows first. */
  weight: number;
  featured: boolean;
  status?: "in-progress" | "shipped" | "demo" | "archived";
  /** Honest one-line scope statement. Critical for team projects. */
  role: string;
  team?: string;
  stack: string[];
  metrics: Metric[];
  /** 2–3 sentence overview for the case study hero. */
  overview: string[];
  challenge: string[];
  /** Named engineering decisions with the reasoning behind them. */
  decisions: { title: string; body: string }[];
  sections?: CaseSection[];
  outcome: string[];
  /** Things that are genuinely unfinished or unproven. Shown, not hidden. */
  limitations: string[];
  links?: ProjectLink[];
}

export interface Role {
  slug: string;
  company: string;
  title: string;
  location: string;
  timeframe: string;
  /** For ordering and for the timeline rail. */
  start: string;
  end: string;
  /** One line on what the org/product was. */
  context: string;
  /** What she actually did, in her own scope. */
  contributions: string[];
  /** Non-code contributions: communication, reviews, mentoring. */
  beyondCode?: string[];
  metrics: Metric[];
  stack: string[];
  /** Related case study slugs. */
  projects?: string[];
  /** Framing note where scale belongs to the platform, not to her. */
  scopeNote?: string;
}

export interface SkillGroup {
  title: string;
  discipline: Discipline | "shared";
  /**
   * `depth` is self-assessed and shown to the visitor. Being explicit about
   * working-level vs. deep beats a wall of undifferentiated logos.
   */
  items: { name: string; depth: "core" | "working" | "exposure"; note?: string }[];
}
