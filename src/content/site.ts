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
      "Open to SWE, AI/ML systems, and hardware/FPGA design roles. Fifth work term.",
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
    body: "Coursework and project experience in SystemVerilog, VHDL, FPGA implementation, timing closure, cocotb verification, and embedded C on STM32.",
    keywords: ["SystemVerilog", "Vivado", "cocotb", "FPGA / ASIC", "Embedded C"],
  },
  {
    id: "software" as const,
    label: "Software and ML",
    heading: "SW product engineering and Machine Learning",
    body: "Co-op and personal projects, spanning basic CV, real-time model inference, concurrent pipelines, frontend/backend services, and React applications.",
    keywords: ["Python", "PyTorch", "Computer vision", "FastAPI", "React", "NodeJS"],
  },
];
