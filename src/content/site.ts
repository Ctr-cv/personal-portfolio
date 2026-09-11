export const site = {
  name: "Vivi Huang",
  /** Used in <title> templates and the OG image. */
  shortTitle: "Vivi Huang",
  role: "Computer Engineering @ University of Waterloo",
  /** The hero's differentiating line. */
  positioning:
    "I build in both directions of the stack — pipelined RTL that closes timing on real silicon, and AI systems that ship to real users.",
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
    label: "Digital Hardware",
    heading: "RTL that meets timing",
    body: "A parameterizable matrix-vector multiplication engine in SystemVerilog, scaled to 128 compute lanes against a real device's DSP and BRAM budget. A binarized neural network submitted for fabrication through TinyTapeout. Verification with cocotb, unit testbenches ahead of integration, and post-implementation netlist simulation — not just RTL that simulates.",
    keywords: ["SystemVerilog", "Vivado", "Timing closure", "cocotb", "FPGA / ASIC"],
  },
  {
    id: "software" as const,
    label: "AI Systems",
    heading: "Latency that users feel",
    body: "Voice agent response latency cut from 7–8 seconds to under 3 by restructuring sequential stages to run concurrently. An LSTM gesture recognizer implemented twice — once from scratch in NumPy with hand-written backpropagation, once in PyTorch — to actually understand it. Object detection fine-tuned for a class that did not exist in pretraining.",
    keywords: ["Python", "PyTorch", "Concurrency", "Computer vision", "FastAPI / React"],
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
