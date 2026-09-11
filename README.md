# Vivi Huang — Portfolio

A multi-page portfolio for Vivi Huang, a third-year Computer Engineering student
at the University of Waterloo. Built with Next.js 16, TypeScript, and Tailwind
CSS v4, and designed to deploy on Vercel as a fully static site.

> **Read [Before you publish](#before-you-publish) first.** Two case studies
> describe unreleased work and need a confidentiality decision, and the site
> currently links a résumé PDF containing a phone number.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Dev server                                      |
| `npm run build`     | Production build                                |
| `npm run start`     | Serve the production build locally              |
| `npm run lint`      | ESLint                                          |
| `npm run typecheck` | `tsc --noEmit`                                  |
| `npm run verify`    | Typecheck → lint → build; run before deploying. |

> On Windows PowerShell, `npm run build` can print an unrelated Node
> `ExperimentalWarning` to stderr. The build result is determined by its exit
> code, not the warning.

## Deploying to Vercel

The site is fully static: no environment variables, database, API routes, or
secrets.

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Accept the defaults. Vercel detects Next.js; the build command and output
   settings need no changes.
4. Deploy.

### Set the production URL

`site.url` in `src/content/site.ts` is currently
`https://vivihuang.vercel.app`. It drives canonical URLs, the sitemap,
`robots.txt`, and Open Graph metadata. Set it to the actual production domain
and redeploy:

```ts
url: "https://your-real-domain.com",
```

## Before you publish

### 1. Confidentiality review — required

Two case studies describe Huawei work beyond what is already on Vivi's public
résumé:

| Slug                  | Page                        | Description                        |
| --------------------- | --------------------------- | ---------------------------------- |
| `workflow-agent`      | `/work/workflow-agent`      | Unreleased desktop-agent prototype |
| `multi-device-speech` | `/work/multi-device-speech` | Unreleased cross-device demo        |

Both stay at the level of engineering problem and technique and avoid internal
model families, service names, and version numbers. Review them against the
applicable confidentiality agreement before publishing.

To withhold one, delete its object from `src/content/projects.software.ts`.
Routing, the sitemap, listings, counts, and project navigation are derived from
that array.

### 2. The résumé PDF is public

`public/vivi-huang-resume.pdf` is linked from the header, footer, Experience,
and Contact pages. **It contains a phone number**, so publishing the site also
publishes that number through the PDF.

- To keep the résumé but remove the phone number, replace the PDF at the same
  path with an edited copy.
- To remove the résumé, delete the file and remove its links and the `resume`
  entry in `src/content/site.ts`.

The HTML pages display email, GitHub, and LinkedIn, but not the phone number.

### 3. Details worth adding

- **Gestalt Engine demo recording.** A real-time gesture interface is much more
  convincing in motion. Add a recording to `public/` and link it from the
  project's `links` array.
- **Smart Light implementation details.** Add the sensor, peripherals, and HAL
  or register-level approach when confirmed.
- **RISC-V Processor details.** Add the ISA subset, pipeline depth, toolchain,
  and verification approach when the in-progress design settles.
- **BNN ASIC project link.** Replace the generic TinyTapeout URL with the actual
  project page.
- **Logic analyzer wording.** Confirm whether the résumé refers to Vivado's
  on-chip ILA or a physical bench instrument before adding it to the skills
  list.
- **VR sensor application.** Add it after confirming its provenance and dates.

## Design

The visual direction is restrained Swiss minimalism: typography, alignment,
rules, and whitespace provide the hierarchy instead of decoration.

- **Palette:** off-white surfaces, rich black type, and accessible neutral
  grays. Hardware and software remain distinguishable through labels and
  structure rather than bright color coding.
- **Typography:** one family—Bricolage Grotesque—across display, body, labels,
  and figures. Weight and scale establish hierarchy.
- **Layout:** asymmetric editorial grids, generous section spacing, firm rules,
  and concise project rows. The home page leads with identity, three selected
  projects in a fixed order, and co-op experience for a clear first scan.
- **Motion:** a short staged page entrance and restrained scroll reveals. CSS
  honors `prefers-reduced-motion` globally.
- **Case studies:** contribution, overview, up to three results, zero to two key
  design choices, stack, links, and adjacent-project navigation. Long challenge,
  outcome, and limitations sections are not rendered.

The content schema still stores measurement basis and notes alongside metrics so
figures can be maintained with context. The interface presents only concise
result values and labels.

## Project structure

```text
src/
  app/
    layout.tsx              Fonts, metadata, Person JSON-LD, skip link
    page.tsx                Home
    work/page.tsx           Projects index, software first
    work/[slug]/page.tsx    Concise static case-study template
    experience/page.tsx     Co-op timeline and education
    about/page.tsx          Bio, technical range, and direction
    contact/page.tsx        Contact and role interests
    globals.css             Visual system
    opengraph-image.tsx     Generated Open Graph image
    icon.tsx                Generated favicon
    sitemap.ts robots.ts not-found.tsx
  components/               Shared presentational components
  content/
    case-studies.ts         Concise visible case-study copy
    projects.*.ts           Project metadata and detailed source content
    experience.ts           Work history
    about.ts site.ts        Shared site content
skills/                     Local design guidance used for the portfolio
```

### Adding a project

1. Add a `Project` object to `src/content/projects.hardware.ts` or
   `src/content/projects.software.ts`.
2. Add its concise contribution, overview, results, and design choices to
   `src/content/case-studies.ts`.
3. Set `weight` for ordering and `featured` if it should be available to
   featured-project queries.

The route, sitemap entry, index card, counts, and previous/next links are
derived from the project arrays. The three home-page projects are intentionally
fixed in `src/app/page.tsx` as Gestalt Engine, MVM Engine, and Route Extraction.

## Technical notes

- **Fully static.** The current build prerenders 24 routes, including 13
  generated project pages.
- **No contact form.** Contact uses `mailto:` and external profile links, keeping
  the site free of a mail provider, stored secret, and public form endpoint.
- **Next.js 16.** Dependencies are pinned in `package-lock.json`; run
  `npm run verify` before deployment.
- **Security headers.** `next.config.ts` disables `X-Powered-By` and sets
  `nosniff`, `Referrer-Policy`, `X-Frame-Options`, and a restrictive
  `Permissions-Policy`.

### Accessibility

- High-contrast text and neutral surfaces, visible focus rings, and a skip link.
- Semantic landmarks and heading order throughout the multi-page structure.
- `aria-current` for active navigation, plus `aria-expanded` and
  `aria-controls` on the mobile menu.
- Decorative marks and rules are hidden from assistive technology.
- `prefers-reduced-motion` and `prefers-contrast: more` are honored.
- Scroll-reveal content remains visible when JavaScript is unavailable.

## Source material

`vivi.txt` and `Software_Resume.pdf` at the repository root are source material;
they are not served by the site. `public/vivi-huang-resume.pdf` is the only
publicly reachable résumé copy. Where source documents disagreed, the résumé was
treated as authoritative for the 550 MHz timing result, 128-lane count, and
TinyTapeout dates.
