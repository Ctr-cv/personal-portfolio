import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Hardware & HDL",
    discipline: "hardware",
    items: [
      { name: "SystemVerilog", depth: "core", note: "Accelerator datapath, control, and integration" },
      { name: "RTL & FSM design", depth: "core" },
      { name: "Pipelining", depth: "core", note: "Register balancing for timing closure" },
      { name: "Timing closure", depth: "core", note: "550 MHz on an AMD Kria device" },
      { name: "Verilog", depth: "working", note: "Computer Architecture coursework" },
      { name: "Binarized network hardware", depth: "working", note: "XNOR/popcount datapath and tapeout" },
    ],
  },
  {
    title: "EDA, Verification & Embedded",
    discipline: "hardware",
    items: [
      { name: "Vivado", depth: "core", note: "Synthesis, implementation, and post-implementation simulation" },
      { name: "cocotb", depth: "working", note: "RTL verification against Python reference models" },
      { name: "SystemVerilog testbenches", depth: "core", note: "Unit and integration testing" },
      { name: "Waveform debugging", depth: "core" },
      { name: "Netlist-level simulation", depth: "working" },
      { name: "STM32CubeIDE", depth: "working" },
      { name: "Embedded C", depth: "working" },
      { name: "Quartus", depth: "exposure", note: "Coursework" },
    ],
  },
  {
    title: "Languages",
    discipline: "software",
    items: [
      { name: "Python", depth: "core", note: "Data pipelines, PyTorch, NumPy, and cocotb" },
      { name: "TypeScript / JavaScript", depth: "working" },
      { name: "Java", depth: "working", note: "Spring Boot backend development" },
      { name: "SQL", depth: "working" },
      { name: "C / C++", depth: "working", note: "Embedded C and pthreads" },
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
      { name: "Airbyte", depth: "exposure" },
    ],
  },
  {
    title: "Tooling",
    discipline: "shared",
    items: [
      { name: "Git", depth: "core" },
      { name: "Linux / Unix", depth: "working" },
      { name: "Docker", depth: "working" },
      { name: "CI/CD", depth: "working", note: "GitHub Actions and a GDS hardening flow" },
      { name: "Pytest", depth: "working" },
    ],
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
    { name: "Digital Hardware Systems", note: "Lab-based; MVM accelerator course project" },
    { name: "Computer Architecture", note: "In progress, Fall 2026" },
    { name: "Digital Circuits and Systems", note: "Lab-based" },
    { name: "Digital Computers", note: "Lab-based" },
    { name: "Algorithms and Data Structures" },
    { name: "Database Systems" },
    { name: "Computer Networks" },
    { name: "Digital Signal Processing" },
  ],
  note: "Four completed co-op work terms alongside the Computer Engineering program.",
};

export const directions = [
  {
    title: "Independent RTL design",
    body: "Develop a self-directed design on an FPGA board with a complete verification setup and implementation results.",
  },
  {
    title: "Machine learning at the edge",
    body: "Deploy a model on constrained hardware and explore the tradeoffs between model structure, memory, and throughput.",
  },
  {
    title: "Gesture-driven audio",
    body: "Extend Gestalt Engine from gesture recognition into a complete spatial-audio interface.",
  },
];
