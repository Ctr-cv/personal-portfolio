import Link from "next/link";
import { Backdrop, Container } from "@/components/layout-primitives";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <Backdrop variant="signal" />
      <Container wide>
        <p className="type-label numeric text-signal-400">Error 404</p>
        <h1 className="type-h1 mt-7 max-w-3xl text-balance text-bone-50">
          No signal on this address.
        </h1>
        <p className="type-lead mt-8 max-w-xl text-pretty text-bone-300">
          This page doesn&rsquo;t exist. The work is all in one place, though.
        </p>

        <nav aria-label="Recover" className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="type-label border border-signal-400/45 px-6 py-4 text-signal-300 transition-colors duration-400 hover:bg-signal-400 hover:text-carbon-900"
          >
            View the work
          </Link>
          <Link
            href="/"
            className="type-label border border-bone-400/25 px-6 py-4 text-bone-200 transition-colors duration-400 hover:border-bone-400/50"
          >
            Back home
          </Link>
        </nav>
      </Container>
    </section>
  );
}
