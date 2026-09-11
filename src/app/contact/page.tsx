import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { Container, TimingDivider } from "@/components/layout-primitives";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Vivi Huang at ${site.email}. Seeking a Winter 2027 co-op in digital hardware, verification, or AI/ML systems.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, note: "Best way to reach me." },
  { label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin, note: "Professional profile.", external: true },
  { label: "GitHub", value: site.githubHandle, href: site.github, note: "Public projects and code.", external: true },
  { label: "Résumé", value: "PDF", href: site.resume, note: "One-page résumé.", external: true },
];

const interests = [
  {
    title: "Digital design & verification",
    body: "RTL design, FPGA implementation, verification, and timing-focused engineering work.",
  },
  {
    title: "AI & ML systems",
    body: "Model deployment, inference performance, computer vision, and production pipelines.",
  },
  {
    title: "Hardware-aware ML",
    body: "Edge inference, accelerators, and roles connecting model design with constrained hardware.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-16 pb-16 sm:pt-24">
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
            className="anim-rise type-lead mt-10 max-w-2xl text-pretty text-bone-400"
            style={{ ["--i" as string]: 2 }}
          >
            I&rsquo;m seeking a Winter 2027 co-op in digital hardware, verification, AI systems, or
            work connecting those areas.
          </p>

          <div className="anim-rise mt-10 flex flex-wrap gap-3" style={{ ["--i" as string]: 3 }}>
            <a href={`mailto:${site.email}`} className="type-label bg-bone-100 px-6 py-4 text-carbon-850">
              {site.email} →
            </a>
            <CopyEmail email={site.email} />
          </div>

          <p className="anim-rise type-meta mt-8 text-bone-500" style={{ ["--i" as string]: 4 }}>
            {site.availability.label} · {site.location}
          </p>
        </Container>
        <TimingDivider className="mt-20" />
      </section>

      <section className="py-20 sm:py-28">
        <Container wide>
          <Reveal>
            <span className="type-label text-bone-500">Areas of interest</span>
          </Reveal>
          <div className="mt-8 grid border-b border-carbon-700 lg:grid-cols-3">
            {interests.map((item, index) => (
              <Reveal
                key={item.title}
                index={index}
                className={`border-t border-carbon-700 py-8 ${
                  index === 0 ? "lg:pr-10" : "lg:border-l lg:px-10"
                }`}
              >
                <h2 className="type-h3 text-bone-50">{item.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-bone-400">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container wide>
          <Reveal>
            <span className="type-label text-bone-500">Channels</span>
          </Reveal>
          <ul className="mt-8">
            {channels.map((channel, index) => (
              <Reveal as="li" key={channel.label} index={index} className="group border-t border-bone-50 last:border-b">
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="grid gap-2 py-7 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="type-label text-bone-500">{channel.label}</span>
                  <span>
                    <span className="type-h3 break-all text-bone-100 transition-opacity group-hover:opacity-60">
                      {channel.value}
                    </span>
                    <span className="type-meta mt-1 block text-bone-500">{channel.note}</span>
                  </span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    {channel.external ? "↗" : "→"}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12">
            <Link href="/work" className="type-label link-underline text-bone-100">
              View projects →
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
