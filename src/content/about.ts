import type { SkillGroup } from "./types";

/**
 * Depth is self-assessed and shown to the visitor:
 *   core     — I can be interviewed on this and defend the details.
 *   working  — I have shipped with it; I would not claim depth.
 *   exposure — I have used it. That is the whole claim.
 *
 * Nothing appears here that is not backed by something on this site.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Hardware & HDL",
    discipline: "hardware",
    items: [
      { name: "SystemVerilog", depth: "core", note: "Full accelerator design: datapath, control, integration" },
      { name: "RTL & FSM design", depth: "core" },
      { name: "Pipelining", depth: "core", note: "Register balancing for timing closure" },
      { name: "Timing closure", depth: "core", note: "650 MHz on an AMD Kria device" },
      { name: "Verilog", depth: "working", note: "Developing through my current architecture course" },
      { name: "Binarized network hardware", depth: "working", note: "XNOR/popcount datapath, taped out" },
    ],
  },
  {
    title: "EDA, Verification & Embedded",
    discipline: "hardware",
    items: [
      { name: "Vivado", depth: "core", note: "Out-of-context synthesis, post-implementation simulation" },
      { name: "cocotb", depth: "working", note: "Python-driven RTL verification against a reference model" },
      { name: "SystemVerilog testbenches", depth: "core", note: "Unit level and integration level" },
      { name: "Waveform debugging", depth: "core" },
      { name: "Netlist-level simulation", depth: "working" },
      { name: "STM32CubeIDE", depth: "working" },
      { name: "Embedded C", depth: "working" },
      { name: "Quartus", depth: "exposure", note: "Earlier coursework only" },
    ],
  },
  {
    title: "Languages",
    discipline: "software",
    items: [
      { name: "Python", depth: "core", note: "Strongest language: data pipelines, PyTorch, NumPy, cocotb" },
      { name: "TypeScript / JavaScript", depth: "working" },
      { name: "Java", depth: "working", note: "Spring Boot backend work" },
      { name: "SQL", depth: "working" },
      { name: "C / C++", depth: "working", note: "Embedded C, plus <100 lines of pthreads C++ professionally" },
      { name: "ArkTS", depth: "working", note: "HarmonyOS application development" },
    ],
  },
  {
    title: "ML & AI Systems",
    discipline: "software",
    items: [
      { name: "PyTorch", depth: "core" },
      { name: "NumPy", depth: "core", note: "Hand-written LSTM cell and backpropagation" },
      { name: "OpenCV", depth: "working" },
      { name: "MediaPipe", depth: "working" },
      { name: "YOLO fine-tuning", depth: "working", note: "98% mAP@50 on a custom class" },
      { name: "Larq", depth: "working", note: "Binarized network training for hardware" },
      { name: "ONNX Runtime", depth: "working" },
      { name: "LangChain", depth: "working", note: "RAG over financial and tax documents" },
      { name: "Vector search", depth: "working", note: "ChromaDB and pgvector" },
    ],
  },
  {
    title: "Product & Platform",
    discipline: "software",
    items: [
      { name: "FastAPI", depth: "working" },
      { name: "React", depth: "working" },
      { name: "Next.js", depth: "working" },
      { name: "Spring Boot", depth: "working" },
      { name: "Supabase / Postgres", depth: "working" },
      { name: "WebSockets", depth: "working" },
      { name: "OAuth2", depth: "working" },
      { name: "Airbyte", depth: "exposure", note: "Used it; hit errors I could not resolve" },
    ],
  },
  {
    title: "Tooling",
    discipline: "shared",
    items: [
      { name: "Git", depth: "core" },
      { name: "Linux / Unix", depth: "working" },
      { name: "Docker", depth: "working" },
      { name: "CI/CD", depth: "working", note: "GitHub Actions, including a GDS hardening flow" },
      { name: "Pytest", depth: "working" },
    ],
  },
];

/**
 * Stated as a boundary rather than buried. A hiring manager will find these out
 * in an interview anyway; saying them first is worth more than hiding them.
 */
export const boundaries = [
  {
    claim: "PCB design",
    reality:
      "None. My embedded work was hand-wired on a breadboard, and I have not used Altium, KiCad or any other PCB tooling.",
  },
  {
    claim: "VHDL",
    reality: "Not something I claim. My HDL work is SystemVerilog and Verilog.",
  },
  {
    claim: "Cloud platforms",
    reality:
      "Thin. A previous personal site on AWS S3, and Huawei Cloud used for team documentation rather than engineering work.",
  },
  {
    claim: "Device-level programming",
    reality:
      "My HarmonyOS work was app-layer. I wrote no drivers. Android sensor APIs are app-layer too, and I would not present either as firmware experience.",
  },
  {
    claim: "JUnit",
    reality: "Never used it. My testing experience is Pytest and HDL testbenches.",
  },
];

export const education = {
  degree: "BASc, Computer Engineering",
  school: "University of Waterloo",
  timeframe: "Sept 2023 – Apr 2028 (expected)",
  gpa: "4.0 / 4.0",
  honours: [
    "Dean's Honour List — Fall 2023",
    "Term Distinction in every semester since",
  ],
  coursework: [
    { name: "Digital Hardware Systems", note: "Lab-based; the MVM accelerator came out of this course" },
    { name: "Computer Architecture", note: "In progress, Fall 2026" },
    { name: "Digital Circuits and Systems", note: "Lab-based" },
    { name: "Digital Computers", note: "Lab-based" },
    { name: "Algorithms and Data Structures" },
    { name: "Database Systems" },
    { name: "Computer Networks" },
    { name: "Digital Signal Processing" },
  ],
  note: "Four completed co-op work terms, preparing for the fifth. Waterloo's program alternates study and full-time work terms, which is why there is more industry experience here than a third year usually implies.",
};

/** What I want to build next. Stated as intent, not as work. */
export const directions = [
  {
    title: "Self-directed HDL",
    body: "All of my HDL so far has been written for coursework. The next thing I want on this site is a hardware project I started myself — a small design on a real development board, with a testbench and a README, because nobody assigned it.",
  },
  {
    title: "AI at the edge",
    body: "My machine learning work and my hardware work have not met yet. Deploying a model onto constrained hardware is the project that would connect them, and it is the direction I find most interesting.",
  },
  {
    title: "Finishing the audio pipeline",
    body: "Gestalt Engine recognizes gestures but does not yet synthesize spatial audio from them. Finishing it would make it an interface rather than a classifier.",
  },
];
