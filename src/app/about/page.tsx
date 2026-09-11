import type { Metadata } from "next";
import Link from "next/link";
import { Backdrop, Container, SectionHeader, TimingDivider } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { boundaries, directions, skillGroups } from "@/content/about";
import { basisGloss, basisLabel } from "@/content/projects";
import { methodNote, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vivi Huang — third-year Computer Engineering student at the University of Waterloo, working across digital hardware design and AI systems engineering.",
  alternates: { canonical: "/about" },
};

const depthLabel = {
  core: "Core",
  working: "Working",
  exposure: "Exposure",
} as const;

const depthStyle = {
  core: "text-bone-50",
  working: "text-bone-300",
  exposure: "text-bone-500",
} as const;

/** The bio. First person, because a portfolio written in third person is odd. */
const bio = [
  "I'm a third-year Computer Engineering student at the University of Waterloo, in a program that alternates study terms with full-time work terms. That's why there is more industry experience on this site than a third year normally implies — four completed co-op terms, with a fifth coming up.",
  "I work in two areas that are usually treated as separate specialties. On the hardware side that means SystemVerilog: a pipelined matrix-vector accelerator that closes timing at 650 MHz on an AMD Kria device, and a binarized neural network taken through a real tapeout flow. On the software side it means AI systems and full-stack product work: computer vision pipelines, agent architecture, and latency work on real-time voice systems.",
  "I don't think of these as two careers. The reason a binarized network fits on a TinyTapeout tile is the same reason it trains differently, and the reason a voice agent felt broken at eight seconds is a pipelining problem that would be familiar to anyone who has balanced registers in a datapath. Working in both directions makes me better at each of them.",
  "I'm bilingual in English and Mandarin at a professional level, and that has been load-bearing rather than decorative. One of my co-op terms was based in Beijing, and during a later term I became a main communication channel to Mandarin-speaking headquarters teams.",
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24">
        <Backdrop variant="both" />
        <Container wide>
          <p className="anim-rise type-label text-bone-400" style={{ ["--i" as string]: 0 }}>
            About
          </p>

          <div className="mt-8 grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <div>
              <h1
                className="anim-rise type-h1 max-w-4xl text-balance text-bone-50"
                style={{ ["--i" as string]: 1 }}
              >
                I build in both directions of the stack.
              </h1>

              <div className="mt-10 flex max-w-2xl flex-col gap-6">
                {bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="anim-rise type-prose text-pretty text-bone-200"
                    style={{ ["--i" as string]: i + 2 }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside
              className="anim-rise flex flex-col gap-px self-start border-t border-bone-400/15"
              style={{ ["--i" as string]: 6 }}
              aria-label="Details"
            >
              {[
                { key: "Based in", value: site.location },
                { key: "Languages", value: site.languages },
                { key: "GitHub", value: site.githubHandle, href: site.github },
                { key: "Email", value: site.email, href: `mailto:${site.email}` },
              ].map((item) => (
                <div key={item.key} className="flex flex-col gap-1 border-b border-bone-400/12 py-3.5">
                  <span className="type-label text-bone-500">{item.key}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="link-underline type-meta w-fit break-all text-bone-200 hover:text-signal-300"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="type-meta text-bone-200">{item.value}</span>
                  )}
                </div>
              ))}
            </aside>
          </div>
        </Container>
        <TimingDivider className="mt-20 opacity-50" />
      </section>

      {/* SKILLS */}
      <section className="relative py-16 sm:py-20">
        <Container wide>
          <Reveal>
            <SectionHeader
              index="01"
              label="Technical range"
              title="What I can be interviewed on, and what I've only used."
              intro="Depth is self-assessed and shown rather than flattened into a logo wall. Nothing appears here that isn't backed by something on this site."
            />
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {(["core", "working", "exposure"] as const).map((depth) => (
              <span key={depth} className="type-label flex items-center gap-2.5">
                <span className={depthStyle[depth]}>{depthLabel[depth]}</span>
                <span className="text-bone-500">
                  {depth === "core"
                    ? "— I can defend the details"
                    : depth === "working"
                      ? "— I've shipped with it"
                      : "— I've used it, that's the claim"}
                </span>
              </span>
            ))}
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-14 lg:grid-cols-2">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} index={i % 2} className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${
                      group.discipline === "hardware"
                        ? "bg-signal-400"
                        : group.discipline === "software"
                          ? "bg-oxide-400"
                          : "bg-bone-400"
                    }`}
                  />
                  <h3 className="type-h3 text-bone-50">{group.title}</h3>
                </div>

                <ul className="mt-6 flex flex-col">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="grid gap-x-6 gap-y-1 border-t border-bone-400/12 py-3.5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className={`type-meta ${depthStyle[item.depth]}`}>{item.name}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="type-label text-bone-500">{depthLabel[item.depth]}</span>
                        {item.note && (
                          <span className="type-meta text-bone-400">{item.note}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* BOUNDARIES — stated rather than buried. */}
      <section className="relative py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-carbon-850/60" />
        <div aria-hidden="true" className="texture-noise absolute inset-0 -z-10" />

        <Container wide>
          <Reveal>
            <SectionHeader
              index="02"
              label="Boundaries"
              title="What I don't claim."
              intro="You would find these out in an interview anyway. Saying them first is worth more than hiding them, and it makes the rest of the site more credible rather than less."
              accent="bone"
            />
          </Reveal>

          <dl className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {boundaries.map((boundary, i) => (
              <Reveal
                key={boundary.claim}
                index={i % 3}
                className="flex flex-col gap-3 border border-bone-400/12 p-6"
              >
                <dt className="type-label text-bone-300">{boundary.claim}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-pretty text-bone-400">
                  {boundary.reality}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* ON THE NUMBERS */}
      <section id="numbers" className="relative scroll-mt-24 py-16 sm:py-24">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="flex flex-col gap-6">
              <SectionHeader index="03" label="Method" accent="oxide" />
              <h2 className="type-h2 text-balance text-bone-50">{methodNote.heading}</h2>
              <p className="type-prose text-pretty text-bone-300">{methodNote.body}</p>
            </Reveal>

            <Reveal index={1}>
              <dl className="flex flex-col">
                {(
                  ["measured", "tool-reported", "approximate", "estimated", "inherited-scale"] as const
                ).map((basis) => (
                  <div
                    key={basis}
                    className="grid gap-2 border-t border-bone-400/12 py-4 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="type-label flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`size-1.5 shrink-0 rounded-full ${
                          basis === "measured" || basis === "tool-reported"
                            ? "bg-oxide-400"
                            : basis === "inherited-scale"
                              ? "bg-bone-500"
                              : "bg-signal-400"
                        }`}
                      />
                      <span
                        className={
                          basis === "measured" || basis === "tool-reported"
                            ? "text-oxide-300"
                            : basis === "inherited-scale"
                              ? "text-bone-400"
                              : "text-signal-300"
                        }
                      >
                        {basisLabel[basis]}
                      </span>
                    </dt>
                    <dd className="type-meta text-bone-400">{basisGloss[basis]}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* WHAT'S NEXT */}
      <section className="relative py-16 sm:py-24">
        <Container wide>
          <Reveal>
            <SectionHeader
              index="04"
              label="Direction"
              title="What I want to build next."
              intro="Stated as intent, not as work. None of this exists yet, and it would be dishonest to list it anywhere near the case studies."
            />
          </Reveal>

          <div className="mt-12 grid gap-px lg:grid-cols-3">
            {directions.map((direction, i) => (
              <Reveal
                key={direction.title}
                index={i}
                className="flex flex-col gap-4 border border-bone-400/12 p-7"
              >
                <span aria-hidden="true" className="type-label numeric text-signal-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-h3 text-balance text-bone-50">{direction.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-pretty text-bone-300">
                  {direction.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="type-label border border-bone-400/25 px-6 py-4 text-bone-200 transition-colors duration-400 hover:border-signal-400 hover:text-signal-300"
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="type-label border border-bone-400/25 px-6 py-4 text-bone-200 transition-colors duration-400 hover:border-oxide-400 hover:text-oxide-300"
            >
              Get in touch
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
