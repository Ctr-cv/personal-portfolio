"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout-primitives";
import { site } from "@/content/site";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  // Solidify the bar once scrolled, so it never competes with the hero.
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Deferred rather than called inline: catches a restored scroll position on
    // load without triggering a cascading render during the effect.
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        lifted
          ? "border-b border-bone-400/12 bg-carbon-900/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container wide>
        <div className="flex h-16 items-center justify-between gap-6 sm:h-20">
          <Link
            href="/"
            className="group flex items-baseline gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="font-display text-lg text-bone-50 sm:text-xl">{site.name}</span>
            <span
              aria-hidden="true"
              className="type-label hidden text-bone-500 transition-colors duration-300 group-hover:text-signal-400 sm:inline"
            >
              CE · Waterloo
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`type-label flex items-center gap-2 transition-colors duration-300 ${
                    active ? "text-signal-400" : "text-bone-400 hover:text-bone-100"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1 rounded-full transition-colors duration-300 ${
                      active ? "bg-signal-400" : "bg-transparent"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
            <a
              href={site.resume}
              className="type-label border border-bone-400/25 px-3.5 py-2 text-bone-200 transition-colors duration-300 hover:border-signal-400 hover:text-signal-300"
            >
              Résumé
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="type-label flex items-center gap-2.5 border border-bone-400/25 px-3 py-2 text-bone-200 md:hidden"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span
                className={`block h-px w-4 bg-current transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-current transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-bone-400/12 bg-carbon-900/97 backdrop-blur-md md:hidden"
      >
        <Container>
          <nav aria-label="Main" className="flex flex-col py-3">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-center justify-between border-b border-bone-400/10 py-4"
              >
                <span
                  className={`type-h3 ${isActive(item.href) ? "text-signal-400" : "text-bone-100"}`}
                >
                  {item.label}
                </span>
                <span aria-hidden="true" className="type-label numeric text-bone-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
            <a href={site.resume} onClick={() => setOpen(false)} className="py-4">
              <span className="type-h3 text-bone-100">Résumé</span>
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}
