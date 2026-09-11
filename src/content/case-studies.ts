import type { Project } from "./types";

export interface CaseStudyCopy {
  contribution: string;
  overview: string[];
  results: string[];
  choices: { title: string; body: string }[];
}

const caseStudies: Record<string, CaseStudyCopy> = {
  "gestalt-engine": {
    contribution: "Built the data pipeline, NumPy and PyTorch models, inference server, and web client as a solo project.",
    overview: [
      "Gestalt Engine classifies 21 dynamic hand gestures from a webcam in real time. MediaPipe converts each frame into hand landmarks, a two-layer LSTM reads the motion sequence, and a FastAPI server streams predictions to a React client over WebSockets.",
      "I implemented the recognizer first from scratch in NumPy, including the LSTM cell and backward pass, then rebuilt the same architecture in PyTorch. The comparison made model behavior, training, and inference tradeoffs concrete.",
    ],
    results: [
      "Completed an end-to-end local gesture-recognition loop from webcam capture to browser output.",
      "The PyTorch model reached about 92% test accuracy, compared with about 85% for the NumPy implementation.",
    ],
    choices: [
      {
        title: "Represent motion as landmark sequences",
        body: "MediaPipe landmarks reduce each frame to compact coordinates, avoiding the cost and background sensitivity of processing raw video pixels.",
      },
      {
        title: "Implement the same LSTM twice",
        body: "The NumPy version exposed the recurrent math and gradient flow directly; the PyTorch version provided a faster, more accurate implementation for the working system.",
      },
    ],
  },
  "mvm-engine": {
    contribution: "Implemented the dot-product unit, accumulator, FSM controller, and top-level integration in a two-person lab group.",
    overview: [
      "This parameterizable SystemVerilog engine accelerates matrix-vector multiplication, the core operation in dense neural-network layers. It combines a pipelined dot-product datapath with per-lane memories, accumulators, and a controller that sequences reads and output validity.",
      "The design scales from one compute lane to the device resource limit and was implemented as a standalone IP block on an AMD Kria FPGA.",
    ],
    results: [
      "Met the lab's 650 MHz post-implementation timing target with 128 compute lanes on the 512 × 512 configuration.",
      "Verified individual modules, top-level behavior, and the implemented netlist through simulation and waveform debugging.",
    ],
    choices: [
      {
        title: "Pipeline the reduction path",
        body: "Registers between multiplier and adder-tree stages break one long combinational path into balanced stages that can meet the clock target.",
      },
      {
        title: "Align control with memory latency",
        body: "The controller offsets datapath-valid signals by one cycle to match the provided memory's registered read behavior and keep addresses, operands, and accumulation controls aligned.",
      },
    ],
  },
  "route-extraction": {
    contribution: "Owned the pipeline end to end, including image processing, service orchestration, routing integration, and detector fine-tuning.",
    overview: [
      "The pipeline recovers an ordered sequence of landmarks from an arbitrary screenshot and snaps that sequence to a rideable cycling route. Inputs ranged from rendered maps to satellite views and scenic photographs, requiring both deterministic image processing and model-assisted interpretation.",
      "It combines morphological processing, OCR, map services, and a detector fine-tuned for map icons on a 2,300-image dataset.",
    ],
    results: [
      "Reduced per-image runtime from roughly 30 seconds to 12–15 seconds by overlapping independent network-bound work.",
      "Reached 98% mAP@50 on the fine-tuned map-icon detector.",
    ],
    choices: [
      {
        title: "Run complementary pipelines concurrently",
        body: "A heuristic path handles structured map views while a model-assisted path covers less predictable images; running both together avoids paying their full latencies sequentially.",
      },
      {
        title: "Train for the missing visual class",
        body: "Because general detectors do not include map icons, I assembled a dedicated dataset and fine-tuned YOLO with mosaic and flip augmentation.",
      },
    ],
  },
  "voice-agent-latency": {
    contribution: "Built the feature frontend and worked with another co-op student on pipeline performance in an existing codebase.",
    overview: [
      "This multi-person voice-assistant feature identifies the owner by voiceprint and uses that identity when deciding how to respond in a shared conversation.",
      "The performance work focused on the interval from the user finishing a sentence to the assistant beginning its reply.",
    ],
    results: [
      "Reduced median response latency from 7–8 seconds to under 3 seconds during development testing.",
      "Kept speaker verification from adding noticeable response delay by running it beside the main pipeline.",
    ],
    choices: [
      {
        title: "Stream pipeline stages concurrently",
        body: "Voice activity detection, model inference, and text-to-speech begin work as soon as partial outputs are available instead of waiting for complete upstream results.",
      },
      {
        title: "Verify identity in parallel",
        body: "Speaker verification runs alongside response preparation rather than acting as a serial gate at the front of every turn.",
      },
    ],
  },
  "workflow-agent": {
    contribution: "Co-designed and built the prototype architecture with one other co-op student.",
    overview: [
      "This Windows desktop agent observes repeated workflows, summarizes actions into reusable skills, and replays those skills through computer-use tool calls. It captures operating-system events, window context, keystrokes, and annotated screenshots.",
      "A lightweight matching layer recognizes known patterns before invoking larger models, while ChromaDB and a prefix tree organize related workflow sequences.",
    ],
    results: [
      "Built and demonstrated the full observe, summarize, store, match, and replay loop on several workflows.",
      "Observed replay success above 80% across the small set of demonstrated skills.",
    ],
    choices: [
      {
        title: "Capture structured OS events",
        body: "Windows event hooks provide timing and application context directly, producing a more reliable action trace than inferring every step from screenshots.",
      },
      {
        title: "Make click context visual",
        body: "Drawing the click location onto each screenshot gives the vision-language model a direct visual cue and improved behavior summaries.",
      },
    ],
  },
  "bnn-asic": {
    contribution: "Worked on the RTL implementation and Python-driven cocotb verification as part of a small team.",
    overview: [
      "A three-layer, 20-neuron binarized network taken through TinyTapeout's shared-shuttle flow. The network is trained offline in Larq, converted into fixed RTL weights, verified against the Python model, and hardened to GDS.",
    ],
    results: [
      "Passed cocotb comparisons against the trained model and completed the automated hardening and GDS flow for submission.",
    ],
    choices: [
      {
        title: "Replace multipliers with XNOR and popcount",
        body: "Constraining weights to one bit turns multiplication into bitwise comparison and counting, allowing the network to fit within a small TinyTapeout tile.",
      },
      {
        title: "Verify from the training environment",
        body: "cocotb drives RTL from Python so the hardware output can be compared directly with the trained model without duplicating reference vectors by hand.",
      },
    ],
  },
  "multi-device-speech": {
    contribution: "Co-built the application and cross-device orchestration; the underlying AI model was supplied by another team.",
    overview: [
      "A HarmonyOS demonstration that connects multiple phones to one live AI conversation. The ArkTS application coordinates device state and real-time audio while integrating a model provided by a headquarters team.",
    ],
    results: [
      "Delivered a working multi-device demonstration with an observed average response time of about three seconds.",
    ],
    choices: [
      {
        title: "Bridge the missing SDK through ArkWeb",
        body: "With no native HarmonyOS LiveKit SDK, the app hosts LiveKit's maintained JavaScript client in an ArkWeb view instead of implementing a real-time transport from scratch.",
      },
      {
        title: "Keep device state in view models",
        body: "An MVVM structure separates each phone's conversation state from its UI, making synchronization issues easier to trace.",
      },
    ],
  },
  "anchor": {
    contribution: "Built the Chrome extension and integrated its detection, summarization, and teammate-developed eye-tracking components in a four-person team.",
    overview: [
      "Anchor is a hackathon-built focus tool that detects when a user drifts off-task and responds with an on-screen overlay and spoken prompt. The extension periodically interprets screen context while avoiding repeated analysis of unchanged frames.",
    ],
    results: [
      "Built a working end-to-end Chrome extension over the DeltaHacks weekend.",
      "Reduced inference token use by 75% by filtering near-duplicate screenshots.",
    ],
    choices: [
      {
        title: "Filter frames with perceptual hashing",
        body: "Perceptual hashes skip visually equivalent frames even when small pixel changes would defeat an exact hash, replacing unnecessary remote inference with cheap local comparison.",
      },
      {
        title: "Intervene visually and audibly",
        body: "Pairing an overlay with speech makes the prompt noticeable even when the user's attention has moved away from the active screen.",
      },
    ],
  },
  "adaptive-pulse": {
    contribution: "Delivered authentication, document ingestion, ETL, and retrieval-augmented summarization work during one co-op term on a small team.",
    overview: [
      "Adaptive Pulse's B2B platform gained OAuth2 login, cloud-storage imports, continuous data synchronization into Supabase, and retrieval-augmented summaries over client financial and tax documents.",
    ],
    results: [
      "Introduced OAuth2 SSO and bulk imports from Google Drive, Dropbox, and GitHub.",
      "Synchronized more than one million rows into Supabase and built a document summarization workflow.",
    ],
    choices: [
      {
        title: "Use storage authorization for login and import",
        body: "OAuth2 connects users to the providers they already use, enabling authentication and bulk document access through one flow.",
      },
      {
        title: "Retrieve relevant passages before summarizing",
        body: "Embeddings and pgvector select useful sections from long documents, keeping model context focused without adding another database service.",
      },
    ],
  },
  "onnx-export-parallelism": {
    contribution: "Restructured a teammate's exporter for thread-level parallelism and debugged its file-generation path.",
    overview: [
      "A focused C++ change to an ONNX model-export pipeline. Independent export work was distributed across pthreads, followed by end-to-end debugging of the generated file path.",
    ],
    results: [
      "Reduced export runtime and restored reliable ONNX file generation in fewer than one hundred lines of C++.",
    ],
    choices: [
      {
        title: "Parallelize only independent work",
        body: "The implementation divides already separable export tasks across threads and joins them before file assembly, keeping synchronization straightforward.",
      },
    ],
  },
  "promotions-platform": {
    contribution: "Maintained a large Spring Boot platform through a new submission flow, bug fixes, alerting, rendering fixes, and database indexes.",
    overview: [
      "JD.com's internal coupon and promotion platform serves hundreds of marketing employees. My work focused on making targeted changes safely in an established codebase and resolving issues directly with product managers.",
    ],
    results: [
      "Shipped a coupon and promotion submission form with supervisor review.",
      "Resolved three product-manager-reported issues and added alerting for a submission edge case.",
    ],
    choices: [
      {
        title: "Reuse the platform's alert abstraction",
        body: "Extending the existing alert object kept the submission fix consistent with established notification behavior and minimized new code.",
      },
      {
        title: "Prefer low-risk database indexes",
        body: "Indexes improved the paths I was working on without restructuring queries in a high-traffic system.",
      },
    ],
  },
  "riscv-processor": {
    contribution: "Developing the datapath, control unit, processor subsystem, and verification setup as current coursework.",
    overview: [
      "An in-progress RISC-V processor in Verilog applying instruction decoding, control, and pipelining in a complete processor design.",
    ],
    results: ["Datapath and control development is underway during the Fall 2026 Computer Architecture course."],
    choices: [],
  },
  "smart-light": {
    contribution: "Developed the STM32 firmware in C and assembled the circuit on a breadboard.",
    overview: [
      "A sensor-activated programmable light built around an STM32 microcontroller, combining embedded firmware with a hand-wired physical circuit.",
    ],
    results: ["Completed a working breadboard build with sensor input and user-programmable behavior."],
    choices: [],
  },
};

export function getCaseStudyCopy(project: Project): CaseStudyCopy {
  return caseStudies[project.slug] ?? {
    contribution: project.role,
    overview: project.overview.slice(0, 2),
    results: project.outcome.slice(0, 2),
    choices: project.decisions.slice(0, 2),
  };
}
