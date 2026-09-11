# Vivi Huang — Portfolio

A multi-page portfolio for Vivi Huang, third-year Computer Engineering at the
University of Waterloo. Built with Next.js 16, TypeScript and Tailwind CSS v4,
and designed to deploy on Vercel as a fully static site.

> **Read [Before you publish](#before-you-publish) first.** Two case studies
> describe unreleased work and need a confidentiality decision, and the site
> currently links a résumé PDF containing a phone number.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Dev server                                       |
| `npm run build`     | Production build                                 |
| `npm run start`     | Serve the production build locally               |
| `npm run lint`      | ESLint                                           |
| `npm run typecheck` | `tsc --noEmit`                                   |
| `npm run verify`    | typecheck → lint → build. Run before deploying.  |

> On Windows PowerShell, `npm run build` may report a non-zero exit code because
> Node prints an unrelated `ExperimentalWarning` to stderr and PowerShell treats
> that as failure. The build itself succeeds. To check the real exit code:
> `cmd /c "npm run build & echo EXIT=%ERRORLEVEL%"`.

---

## Deploying to Vercel

The site is fully static — no environment variables, no database, no API routes,
no secrets.

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Accept the defaults. Vercel detects Next.js; the framework preset, build
   command (`next build`) and output directory need no changes.
4. Deploy.

### One thing to change after the first deploy

`site.url` in `src/content/site.ts` is currently `https://vivihuang.vercel.app`.
It drives canonical URLs, the sitemap, `robots.txt` and Open Graph tags, so set
it to the real production domain and redeploy:

```ts
// src/content/site.ts
url: "https://your-real-domain.com",
```

If you add a custom domain in Vercel, do this at the same time.

---

## Before you publish

### 1. Confidentiality review — required

Two case studies describe Huawei work that is **not** covered by anything
already on Vivi's public résumé:

| Slug                  | Page                        | What it describes                     |
| --------------------- | --------------------------- | ------------------------------------- |
| `workflow-agent`      | `/work/workflow-agent`      | Unreleased desktop agent prototype    |
| `multi-device-speech` | `/work/multi-device-speech` | Unreleased cross-device speech demo   |

Both are written at the level of engineering problem and technique, and
deliberately avoid internal model families, internal service names and version
numbers. That is a judgement call, not a guarantee — review them against
whatever confidentiality agreement you signed.

**To withhold one:** delete its object from the array in
`src/content/projects.software.ts`. Routing, the sitemap, listings, counts and
prev/next links are all derived from that array, so nothing else needs editing.

The remaining Huawei case studies (`route-extraction`, `voice-agent-latency`,
`onnx-export-parallelism`) stay at roughly résumé-level disclosure.

### 2. The résumé PDF is public

`public/vivi-huang-resume.pdf` is linked from the header, footer, `/experience`
and `/contact`. **It contains your phone number**, so publishing the site
publishes that number.

- To keep the résumé but drop the phone number: replace the PDF with an edited
  version at the same path.
- To remove the résumé entirely: delete the file and remove the `resume` entry
  from `src/content/site.ts`, then remove the links that reference it.

The site itself does **not** display your phone number anywhere — only the email
address, GitHub and LinkedIn. That was a deliberate default.

### 3. Details worth filling in

These would each measurably improve the site:

- **A demo recording for Gestalt Engine.** This is the single highest-leverage
  item. A real-time gesture interface is far more convincing in motion than in
  prose, and the case study currently says so in its own limitations section.
  Add the file to `public/` and link it from the project's `links` array.
- **`smart-light` is thin on purpose.** The peripheral-level detail — which
  sensor, which peripherals, HAL vs. LL vs. direct register access — is what
  would make it interesting. It was left blank rather than guessed.
- **`riscv-processor`** is marked in-progress with no ISA subset, pipeline depth
  or toolchain stated. Fill those in when the design settles.
- **`bnn-asic`** links to the generic TinyTapeout site. Swap in the actual
  project page URL.
- **The logic analyzer question.** Your résumé lists "logic analyzer". Vivado's
  on-chip ILA and a physical bench instrument are quite different skills; the
  site does not claim either. Resolve it and add whichever is accurate to
  `skillGroups` in `src/content/about.ts`.
- **The VR sensor application was omitted.** Its provenance (Huawei project vs.
  personal) and dates were unconfirmed, so it is not on the site. It is a
  legitimate portfolio piece as an owned end-to-end application once you can
  state where it came from.

---

## Design

The aesthetic direction is **instrumentation** — borrowed from the tools of
digital design: EDA canvases, timing diagrams, oscilloscope phosphor, and PCB
copper with its oxide.

**Colour carries meaning rather than decoration.** Amber (`signal`) marks
hardware, teal (`oxide`) marks software, on a carbon substrate with warm bone
type. The two accents are used consistently in every card, badge, glyph and
section marker, so the hardware/software duality is legible before you read a
word.

**Type** is Bricolage Grotesque (display), Newsreader (long-form prose, because
case studies are meant to be read) and IBM Plex Mono (labels and figures).

**Motion** is one orchestrated page load — a staggered rise and a clip-path wipe
on the hero — plus restrained scroll reveals. All of it is CSS, and
`prefers-reduced-motion` is honoured in a single place in `globals.css`.

**Project glyphs are generated, not photographed.** Most of this work has no
screenshots, and inventing device mockups for an FPGA accelerator would be
decoration pretending to be evidence. Each project instead gets a deterministic
SVG derived from its slug — a die floorplan for hardware, a signal graph for
software — so the same project always renders the same recognizable mark.

### The measurement-provenance system

The distinguishing feature of this site: **no number appears without how it was
obtained.** `Metric` in `src/content/types.ts` requires a `basis` and a `note`,
so the type system makes it impossible to add a figure without saying where it
came from.

| Basis              | Meaning                                                        |
| ------------------ | -------------------------------------------------------------- |
| `measured`         | Directly counted or instrumented. Defensible as stated.         |
| `tool-reported`    | Reported by a tool on a defined benchmark (timing report, mAP). |
| `approximate`      | Measured during development, not rigorously benchmarked.        |
| `estimated`        | An informal personal comparison. Directional only.              |
| `inherited-scale`  | A property of a pre-existing system. Context, never a result.   |

The notes are rendered inline, not behind a tooltip, because a caveat you have
to hover to find is not really a caveat. Concretely, this is why the site says:

- The route-extraction speedup came from **concurrency hiding network latency**,
  not from the CPU-bound computer vision getting faster.
- `98% mAP@50`, never a bare "98% mAP" — which would imply the much stricter
  mAP@50-95 average.
- JD.com's 500k+ daily transactions are labelled `inherited-scale`: a property
  of the platform, explicitly not Vivi's achievement.
- Latency and document-review figures are `approximate` and `estimated`
  respectively, with the measurement definition stated.

Every case study also ends with a **Scope and limitations** panel given equal
visual weight rather than buried, and team projects state contribution
boundaries — including where a teammate's idea or model is being described.

---

## Project structure

```
src/
  app/
    layout.tsx              Fonts, metadata, Person JSON-LD, skip link
    page.tsx                Home
    work/page.tsx           Project index, grouped by discipline
    work/[slug]/page.tsx    Case study template (static, one page per project)
    experience/page.tsx     Co-op timeline + education
    about/page.tsx          Bio, skills matrix, boundaries, direction
    contact/page.tsx        Conversion page
    globals.css             The whole design system
    opengraph-image.tsx     Generated OG image
    icon.tsx                Generated favicon
    sitemap.ts robots.ts not-found.tsx
  components/               Presentational only; no content lives here
  content/                  All copy and data
```

**All copy lives in `src/content/`.** Pages read from it and never hardcode
content, so updating the site is a data edit rather than a JSX edit.

### Adding a project

Append a `Project` object to `hardwareProjects` or `softwareProjects` in
`src/content/projects.hardware.ts` / `projects.software.ts`. The route, sitemap
entry, listing card, counts and prev/next links are all derived. `weight`
controls ordering (higher first) and `featured` controls appearance on the home
page.

---

## Technical notes

- **Fully static.** All 24 routes are prerendered. There are no API routes and
  no server-side data fetching.
- **No contact form, deliberately.** A form would need a mail provider, a stored
  secret and spam mitigation to do what a `mailto:` link already does. Avoiding
  it keeps the site static and leaves no unauthenticated endpoint to abuse.
- **Next.js 16.** The scaffold produced `next@15.5.2`, which carries a published
  security advisory (CVE-2025-66478), and the remaining transitive advisories
  could only be cleared by moving to 16. `npm audit` reports zero
  vulnerabilities.
- **Security headers** are set in `next.config.ts`: `nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`,
  and a `Permissions-Policy` denying camera, microphone and geolocation.
  `poweredByHeader` is off. No CSP is set, since the inline JSON-LD would need a
  nonce and the site loads no third-party scripts.

### Accessibility

- All text/background pairs were checked against WCAG 2.1. Everything clears AA;
  most clears AAA. `bone-500` was lightened from `#7c766e` to `#8e8880` because
  it measured 4.07:1 on `carbon-800`, below the 4.5:1 threshold, and it carries
  label and meta text.
- Skip link, visible focus rings, semantic landmarks, `aria-current` on the
  active nav item, `aria-expanded`/`aria-controls` on the mobile menu, and
  `aria-hidden` on every decorative glyph and rule.
- `prefers-reduced-motion` and `prefers-contrast: more` are both honoured.
- Scroll reveals render content **visible** and only hide elements confirmed to
  be below the fold, so nothing is trapped invisible if JavaScript fails.

---

## Source material

`vivi.txt` and `Software_Resume.pdf` at the repository root are the source
material the content was written from. They are not part of the build and are
not served — `public/vivi-huang-resume.pdf` is the only publicly reachable copy
of the résumé. Where the two disagreed, the résumé was treated as authoritative
(it confirms the 650 MHz timing result, the 128-lane count and the TinyTapeout
dates, all of which were open questions in `vivi.txt`).
