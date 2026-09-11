import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { Backdrop, Container, TimingDivider } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Vivi Huang — ${site.email}. Currently seeking a Winter 2027 co-op in hardware design, verification, or AI/ML systems.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "The best way to reach me. I read it every day.",
    primary: true,
  },
  {
    label: "LinkedIn",
    value: site.linkedinHandle,
    href: site.linkedin,
    note: "For recruiters and anything that starts with an introduction.",
    external: true,
  },
  {
    label: "GitHub",
    value: site.githubHandle,
    href: site.github,
    note: "Public code, including the Gestalt Engine repositories.",
    external: true,
  },
  {
    label: "Résumé",
    value: "PDF download",
    href: site.resume,
    note: "One page, kept current.",
    external: true,
  },
];

const lookingFor = [
  {
    title: "Digital design & verification",
    body: "RTL design, verification, or FPGA work. This is where I most want to grow, and where my strongest project lives.",
    accent: "signal" as const,
  },
  {
    title: "AI / ML systems",
    body: "Model deployment, inference latency, pipelines that have to run in production rather than in a notebook.",
    accent: "oxide" as const,
  },
  {
    title: "Anywhere the two meet",
    body: "Edge inference, accelerators, hardware-aware ML. If a role sits on that boundary, I would like to hear about it first.",
    accent: "signal" as const,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24">
        <Backdrop variant="both" />
        <Container wide>
          <p className="anim-rise type-label text-bone-400" style={{ ["--i" as string]: 0 }}>
            Contact
          </p>

          <h1
            className="anim-rise type-hero mt-8 max-w-5xl text-balance text-bone-50"
            style={{ ["--i" as string]: 1 }}
          >
            Let&rsquo;s talk.
          </h1>

          <p
            className="anim-rise type-lead mt-10 max-w-2xl text-pretty text-bone-200"
            style={{ ["--i" as string]: 2 }}
          >
            I&rsquo;m looking for my fifth co-op term. If your team works on digital design,
            verification, or AI systems — or somewhere those overlap — I&rsquo;d like to hear from
            you.
          </p>

          <div
            className="anim-rise mt-11 flex flex-wrap items-center gap-4"
            style={{ ["--i" as string]: 3 }}
          >
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 bg-signal-400 px-6 py-4 text-carbon-900 transition-colors duration-400 hover:bg-signal-300"
            >
              <span className="type-label">{site.email}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <CopyEmail email={site.email} />
          </div>

          <p
            className="anim-rise type-label mt-8 flex items-center gap-2.5 text-bone-400"
            style={{ ["--i" as string]: 4 }}
          >
            <span aria-hidden="true" className="anim-pulse size-1.5 rounded-full bg-oxide-400" />
            {site.availability.label} · {site.location}
          </p>
        </Container>

        <TimingDivider className="mt-20 opacity-50" />
      </section>

      {/* WHAT I'M LOOKING FOR */}
      <section className="relative py-8 sm:py-12">
        <Container wide>
          <Reveal>
            <span className="type-label text-bone-500">What I&rsquo;m looking for</span>
          </Reveal>

          <div className="mt-8 grid gap-px lg:grid-cols-3">
            {lookingFor.map((item, i) => (
              <Reveal
                key={item.title}
                index={i}
                className="flex flex-col gap-4 border border-bone-400/12 p-7"
              >
                <span
                  aria-hidden="true"
                  className={`h-px w-8 ${item.accent === "signal" ? "bg-signal-400" : "bg-oxide-400"}`}
                />
                <h2 className="type-h3 text-balance text-bone-50">{item.title}</h2>
                <p className="text-[0.9375rem] leading-relaxed text-pretty text-bone-300">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CHANNELS */}
      <section className="relative py-16 sm:py-24">
        <Container wide>
          <Reveal>
            <span className="type-label text-bone-500">Where to find me</span>
          </Reveal>

          <ul className="mt-8 flex flex-col">
            {channels.map((channel, i) => (
              <Reveal
                as="li"
                key={channel.label}
                index={i}
                className="group border-t border-bone-400/15 last:border-b"
              >
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="grid gap-2 py-7 sm:grid-cols-[minmax(0,8rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="type-label text-bone-500">{channel.label}</span>
                  <span className="flex flex-col gap-1.5">
                    <span
                      className={`type-h3 break-all transition-colors duration-300 ${
                        channel.primary
                          ? "text-signal-300 group-hover:text-signal-400"
                          : "text-bone-100 group-hover:text-signal-300"
                      }`}
                    >
                      {channel.value}
                    </span>
                    <span className="type-meta text-bone-400">{channel.note}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="type-label text-bone-500 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-signal-400"
                  >
                    {channel.external ? "↗" : "→"}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          {/*
            Deliberately no contact form. A form on a static site needs a mail
            provider, a secret, spam mitigation and an unauthenticated endpoint —
            all of it to do what a mailto: link already does. Not worth the
            attack surface for a personal site.
          */}
          <Reveal className="mt-14 flex flex-col gap-4 border-l-2 border-bone-500/40 py-1 pl-6">
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-pretty text-bone-400">
              There&rsquo;s no contact form here on purpose. A form would need a mail provider, a
              stored secret and spam handling to do what an email link already does — so this site
              stays fully static and there&rsquo;s no endpoint to abuse.
            </p>
          </Reveal>

          <Reveal className="mt-16 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="type-label border border-bone-400/25 px-6 py-4 text-bone-200 transition-colors duration-400 hover:border-signal-400 hover:text-signal-300"
            >
              Read the case studies first
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
