import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Type stack. Three faces, each with a job:
 *   Bricolage Grotesque — display. Slightly irregular, so headlines have a voice.
 *   Newsreader          — long-form prose. Case studies are meant to be read.
 *   IBM Plex Mono       — labels and figures. Engineering-adjacent by heritage.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Hardware & AI Systems Engineering`,
    template: `%s · ${site.name}`,
  },
  description: site.summary,
  keywords: [
    "Vivi Huang",
    "Computer Engineering",
    "University of Waterloo",
    "SystemVerilog",
    "FPGA",
    "RTL design",
    "Machine learning",
    "AI systems",
    "co-op",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Hardware & AI Systems Engineering`,
    description: site.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Hardware & AI Systems Engineering`,
    description: site.summary,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

/** Structured data so search results describe her accurately. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Computer Engineering Student",
  description: site.summary,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Waterloo",
  },
  knowsLanguage: ["English", "Mandarin"],
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${newsreader.variable} ${plexMono.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="type-label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-signal-400 focus:bg-carbon-900 focus:px-4 focus:py-3 focus:text-signal-300"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        <script
          type="application/ld+json"
          // Static, developer-authored object. No user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
