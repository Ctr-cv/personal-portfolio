import Link from "next/link";
import type { ReactNode } from "react";

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
      className={`mx-auto w-full px-6 sm:px-10 lg:px-16 ${wide ? "max-w-[96rem]" : "max-w-6xl"} ${className}`}
    >
      {children}
    </div>
  );
}

export function PageMarker({
  index,
  label,
  inverse = false,
}: {
  index: string;
  label: string;
  inverse?: boolean;
}) {
  return (
    <nav aria-label="Page location" className={`type-label flex items-center gap-3 ${inverse ? "text-[#a7a69f]" : "text-bone-500"}`}>
      <Link href="/" className={`link-underline ${inverse ? "hover:text-[#f5f4f0]" : "hover:text-bone-50"}`}>
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <span className={inverse ? "text-[#f5f4f0]" : "text-bone-100"}>
        {index} — {label}
      </span>
    </nav>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index?: string;
  label: string;
  title?: string;
  intro?: string;
  accent?: "signal" | "oxide" | "bone";
}) {
  return (
    <header className="border-t-2 border-bone-50 pt-5 sm:pt-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-12">
        <div className="flex items-baseline gap-3">
          <span aria-hidden="true" className="size-2 shrink-0 bg-bone-50" />
          {index && (
            <span aria-hidden="true" className="type-meta numeric text-bone-500">
              {index}
            </span>
          )}
          <span className="type-label text-bone-100">{label}</span>
        </div>
        <div>
          {title && <h2 className="type-h2 max-w-4xl text-bone-50">{title}</h2>}
          {intro && <p className="type-lead mt-6 max-w-2xl text-bone-400">{intro}</p>}
        </div>
      </div>
    </header>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-bone-50 ${className}`} />;
}

export function TimingDivider({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="mx-auto grid w-full max-w-[96rem] grid-cols-[3rem_minmax(0,1fr)_3rem] items-center px-6 sm:px-10 lg:px-16">
        <span className="h-2 w-px bg-carbon-500" />
        <span className="h-px bg-carbon-700" />
        <span className="ml-auto h-2 w-px bg-carbon-500" />
      </div>
    </div>
  );
}

export function Backdrop({
  variant: _variant = "signal",
}: {
  variant?: "signal" | "oxide" | "both";
}) {
  void _variant;
  return null;
}
