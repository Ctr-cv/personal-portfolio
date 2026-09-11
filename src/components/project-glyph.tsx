import type { Discipline } from "@/content/types";

/**
 * Project visual hooks, generated rather than photographed.
 *
 * A portfolio card wants a visual hook, but there are no screenshots for most of
 * this work and inventing device mockups for an FPGA accelerator would be
 * decoration pretending to be evidence. So each project gets a deterministic
 * glyph derived from its slug: a die floorplan for hardware, a signal graph for
 * software. Same slug always renders the same glyph, so it becomes recognizable
 * as that project's mark across the site.
 */

/** Small deterministic hash so the glyph is stable across renders and builds. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Seeded generator: mulberry32. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hardware: a floorplan of compute tiles with routing between them. */
function DieGlyph({ seed, stroke }: { seed: number; stroke: string }) {
  const next = rng(seed);
  const cols = 6;
  const rows = 4;
  const cell = 26;
  const pad = 10;

  const tiles = Array.from({ length: cols * rows }, (_, i) => {
    const r = next();
    return {
      x: pad + (i % cols) * cell,
      y: pad + Math.floor(i / cols) * cell,
      filled: r > 0.52,
      strong: r > 0.86,
    };
  });

  const traceY = Array.from({ length: 3 }, () => pad + Math.floor(next() * rows) * cell + cell / 2);

  return (
    <svg viewBox="0 0 176 124" fill="none" className="size-full">
      {/* Routing channels, drawn under the tiles. */}
      {traceY.map((y, i) => (
        <path
          key={`t${i}`}
          d={`M4 ${y} H172`}
          stroke={stroke}
          strokeOpacity="0.16"
          strokeWidth="1"
        />
      ))}
      {tiles.map((t, i) => (
        <rect
          key={i}
          x={t.x}
          y={t.y}
          width={cell - 7}
          height={cell - 7}
          rx="1"
          stroke={stroke}
          strokeOpacity={t.strong ? 0.75 : t.filled ? 0.34 : 0.14}
          strokeWidth="1"
          fill={t.strong ? stroke : "none"}
          fillOpacity={t.strong ? 0.14 : 0}
        />
      ))}
      {/* Registration corner, like a die photo. */}
      <path
        d={`M4 ${pad} V4 H${pad}`}
        stroke={stroke}
        strokeOpacity="0.5"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Software: a directed graph of stages, the shape most of this work takes. */
function GraphGlyph({ seed, stroke }: { seed: number; stroke: string }) {
  const next = rng(seed);
  const layers = 4;

  const nodes: { x: number; y: number; layer: number; r: number }[] = [];
  for (let l = 0; l < layers; l += 1) {
    const count = 1 + Math.floor(next() * 3);
    for (let n = 0; n < count; n += 1) {
      nodes.push({
        x: 20 + l * 45,
        y: 26 + ((n + 1) / (count + 1)) * 72,
        layer: l,
        r: next() > 0.7 ? 3.4 : 2.2,
      });
    }
  }

  const edges: { from: number; to: number }[] = [];
  nodes.forEach((node, i) => {
    const targets = nodes
      .map((other, j) => ({ other, j }))
      .filter(({ other }) => other.layer === node.layer + 1);
    targets.forEach(({ j }) => {
      if (next() > 0.28) edges.push({ from: i, to: j });
    });
  });

  return (
    <svg viewBox="0 0 176 124" fill="none" className="size-full">
      {edges.map((e, i) => {
        const a = nodes[e.from];
        const b = nodes[e.to];
        const mx = (a.x + b.x) / 2;
        return (
          <path
            key={i}
            d={`M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`}
            stroke={stroke}
            strokeOpacity="0.28"
            strokeWidth="1"
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.r > 3 ? stroke : "none"}
          fillOpacity={n.r > 3 ? 0.9 : 0}
          stroke={stroke}
          strokeOpacity="0.6"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export function ProjectGlyph({
  slug,
  discipline,
  className = "",
}: {
  slug: string;
  discipline: Discipline;
  className?: string;
}) {
  const seed = hash(slug);
  const stroke =
    discipline === "hardware" ? "var(--color-signal-400)" : "var(--color-oxide-400)";

  return (
    <div
      aria-hidden="true"
      className={`transition-opacity duration-500 group-hover:opacity-100 ${className}`}
    >
      {discipline === "hardware" ? (
        <DieGlyph seed={seed} stroke={stroke} />
      ) : (
        <GraphGlyph seed={seed} stroke={stroke} />
      )}
    </div>
  );
}
