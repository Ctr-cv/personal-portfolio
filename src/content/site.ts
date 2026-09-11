export const site = {
  name: "Vivi Huang",
  /** Used in <title> templates and the OG image. */
  shortTitle: "Vivi Huang",
  role: "Computer Engineering @ University of Waterloo",
  /** The hero's differentiating line. */
  positioning:
    "Computer Engineering student working across software, machine learning, and digital hardware.",
  /** One-sentence answer to "what do you do". */
  summary:
    "Third-year Computer Engineering student at the University of Waterloo. Four completed co-op terms across AI systems, full-stack product work, and digital hardware design.",
  url: "https://vivihuang.vercel.app",
  email: "vivihuang.ca@gmail.com",
  github: "https://github.com/Ctr-cv",
  githubHandle: "Ctr-cv",
  linkedin: "https://www.linkedin.com/in/vivi-huang-45254223b",
  linkedinHandle: "vivi-huang-45254223b",
  resume: "/vivi-huang-resume.pdf",
  location: "Waterloo, Ontario, Canada",
  languages: "English and Mandarin, both at professional working level",
  availability: {
    label: "Seeking Winter 2027 co-op",
    detail:
      "Open to hardware design, verification, and AI/ML systems roles. Fifth work term.",
  },
} as const;

/**
 * The two-column thesis on the home page. This is the single most important
 * piece of copy on the site: it is the thing that makes Vivi's profile
 * memorable rather than one more student portfolio.
 */
export const disciplines = [
  {
    id: "hardware" as const,
    label: "Digital hardware",
    heading: "RTL and embedded systems",
    body: "Coursework and project experience in SystemVerilog, FPGA implementation, timing closure, cocotb verification, and embedded C on STM32.",
    keywords: ["SystemVerilog", "Vivado", "cocotb", "FPGA / ASIC", "Embedded C"],
  },
  {
    id: "software" as const,
    label: "Software and ML",
    heading: "Machine learning and product engineering",
    body: "Co-op and personal work spanning computer vision, real-time inference, concurrent pipelines, backend services, and React applications.",
    keywords: ["Python", "PyTorch", "Computer vision", "FastAPI", "React"],
  },
];

/**
 * Shown on the home page and About. The point is not modesty for its own sake:
 * it is that the visitor can trust every other number on the site.
 */
export const methodNote = {
  heading: "On the numbers",
  body: "Every figure on this site is labelled with how it was obtained — instrumented measurement, tool-reported result, rough measurement, or personal estimate. Where a system's scale was inherited rather than built, it says so. The labels are there because I would rather you trust the numbers I can defend than be impressed by ones I cannot.",
};
