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
      "I implemented the recognizer first from scratch in NumPy, including the LSTM cell and backward pass, then rebuilt the same architecture in PyTorch. Using the same model shape and data split made the comparison useful: the first version exposed the recurrent math, while the second showed what a mature training stack changed in practice.",
      "A substantial part of the project sits outside the model itself. A roughly 500-line preprocessing pipeline turns more than 800,000 source frames into aligned gesture sequences, and the application keeps capture, inference, and browser rendering separate so each part can be measured and changed independently.",
    ],
    results: [
      "Completed an end-to-end local gesture-recognition loop from webcam capture to browser output.",
      "The PyTorch model reached about 92% test accuracy, compared with about 85% for the NumPy implementation.",
    ],
    choices: [
      {
        title: "Represent motion as landmark sequences",
        body: "MediaPipe landmarks reduce each frame to compact coordinates, avoiding the cost and background sensitivity of processing raw video pixels while preserving the hand motion that distinguishes dynamic gestures.",
      },
      {
        title: "Implement the same LSTM twice",
        body: "The NumPy version exposed gate operations, recurrent state, and gradient flow directly; the PyTorch version then provided a faster and more accurate implementation for the working system without changing the underlying task.",
      },
      {
        title: "Make preprocessing sequence-aware",
        body: "The data pipeline preserves frame order, converts variable recordings into consistent tensors, and keeps labels aligned through the train, validation, and test split. Treating that as a first-class system component prevents the temporal model from learning from malformed or leaked sequences.",
      },
      {
        title: "Separate model latency from interface latency",
        body: "The OpenCV loop measures the forward pass, while the browser path measures capture, transport, inference, and return together. A persistent WebSocket channel keeps the interactive path lightweight and makes the sub-15 ms model time and sub-100 ms local round trip meaningful as different measurements.",
      },
    ],
  },
  "mvm-engine": {
    contribution: "Implemented the dot-product unit, accumulator, FSM controller, and top-level integration in a two-person lab group.",
    overview: [
      "This parameterizable SystemVerilog engine accelerates matrix-vector multiplication, the core operation in dense neural-network layers. It combines a pipelined dot-product datapath with per-lane memories, accumulators, and a controller that sequences reads and output validity.",
      "The architecture follows the broad shape of Microsoft's Brainwave accelerator: one shared vector stream feeds multiple output lanes, with each lane owning the matrix data and accumulation needed for an output element. Parameterization allowed the same RTL to scale from a small simulation target to the FPGA's resource limit.",
      "The project also exercised the implementation flow beyond functional RTL. The block was synthesized out of context because its wide interfaces could not map to physical board pins, then checked after implementation for timing, resource use, and netlist-level behavior on an AMD Kria target.",
    ],
    results: [
      "Met the lab's 550 MHz post-implementation timing target with 128 compute lanes on the 512 × 512 configuration.",
      "Verified individual modules, top-level behavior, and the implemented netlist through simulation and waveform debugging.",
    ],
    choices: [
      {
        title: "Pipeline the reduction path",
        body: "Registers between multiplier and adder-tree stages break one long combinational path into balanced stages. The placement of those registers, rather than a change in arithmetic, is what allows the design to meet the clock target.",
      },
      {
        title: "Align control with memory latency",
        body: "The controller offsets datapath-valid signals by one cycle to match the provided memory's registered read behavior, keeping addresses, operands, and accumulation controls aligned through the pipeline.",
      },
      {
        title: "Put row boundaries inside the accumulator protocol",
        body: "The `first` control starts a new sum with the incoming value, while `last` marks the value that should produce a valid output. Encoding row boundaries this way avoids a separate clear cycle and keeps accumulation state local to the unit that owns it.",
      },
      {
        title: "Distribute rows across independent lanes",
        body: "Matrix rows are assigned round-robin to lane-local memories so every lane receives comparable work and can produce a different output element in parallel. This regular mapping made lane count a parameter and supported scaling to 128 lanes against DSP and BRAM limits.",
      },
    ],
  },
  "route-extraction": {
    contribution: "Owned the pipeline end to end, including image processing, service orchestration, routing integration, and detector fine-tuning.",
    overview: [
      "The pipeline recovers an ordered sequence of landmarks from an arbitrary screenshot and snaps that sequence to a rideable cycling route. Inputs ranged from rendered maps to satellite views and scenic photographs, so a single visual assumption could not cover the full input set.",
      "The system combines morphological image processing, OCR, map services, and a detector fine-tuned for map icons on a 2,300-image dataset. The detector finds domain-specific symbols, while the rest of the pipeline turns those observations into geographic candidates and a route request.",
      "Ordering is as important as detection: a set of correct landmarks is not enough if the routing service receives them in the wrong sequence. Recovering connectivity from rendered map features is what turns image understanding into a usable route rather than a list of places.",
    ],
    results: [
      "Reduced per-image runtime from roughly 30 seconds to 12–15 seconds by overlapping independent network-bound work.",
      "Reached 98% mAP@50 on the fine-tuned map-icon detector.",
    ],
    choices: [
      {
        title: "Run complementary pipelines concurrently",
        body: "A heuristic path handles structured map views while a model-assisted path covers less predictable images. Running both together avoids paying their full latencies sequentially and lets the system use whichever interpretation is more useful for a given screenshot.",
      },
      {
        title: "Train for the missing visual class",
        body: "General-purpose detectors do not include map icons, so I assembled a dedicated dataset and fine-tuned YOLO with mosaic and flip augmentation. This was more robust across providers than maintaining a growing library of hand-written icon templates.",
      },
      {
        title: "Recover topology with morphology",
        body: "Morphological operations expose connected route shapes and landmark relationships in rendered maps. Using those structures to infer order gives the routing stage information that isolated object detections cannot provide.",
      },
      {
        title: "Fan out network-bound services",
        body: "OCR, model inference, and map-provider requests can proceed independently, so AsyncIO starts them together and waits at the point their results are needed. The image processing remains CPU-bound; the runtime reduction comes from hiding service latency and overlapping independent work.",
      },
    ],
  },
  "voice-agent-latency": {
    contribution: "Built the feature frontend and worked with another co-op student on pipeline performance in an existing codebase.",
    overview: [
      "This multi-person voice-assistant feature identifies the owner by voiceprint and uses that identity when deciding how to respond in a shared conversation. Requests from the owner and suggestions prompted by other speakers follow different interaction paths.",
      "The performance work focused on the interval from the user finishing a sentence to the assistant beginning its reply. At seven to eight seconds, the original flow interrupted conversational turn-taking even when each individual component behaved correctly.",
      "The improvement came from changing how existing stages cooperate rather than replacing the models. Voice activity detection, generation, text-to-speech, and identity verification were reorganized as a streaming pipeline so useful work could begin before every upstream stage had finished.",
    ],
    results: [
      "Reduced median response latency from 7–8 seconds to under 3 seconds during development testing.",
      "Kept speaker verification from adding noticeable response delay by running it beside the main pipeline.",
    ],
    choices: [
      {
        title: "Stream pipeline stages concurrently",
        body: "Voice activity detection, model inference, and text-to-speech begin work as soon as partial outputs are available instead of waiting for complete upstream results. This removes idle gaps without requiring any one model to run faster.",
      },
      {
        title: "Verify identity in parallel",
        body: "Speaker verification runs alongside response preparation rather than acting as a serial gate at the front of every turn. The embedding-based voiceprint check is fast enough for its result to arrive before the response needs to be released.",
      },
      {
        title: "Measure the conversational boundary",
        body: "Latency is defined from the end of the user's speech to the assistant's first audible word. That boundary reflects what a person experiences and avoids treating internal milestones, such as the first generated token, as completed responses.",
      },
      {
        title: "Preserve progressive output end to end",
        body: "Concurrency only helps if partial generation can continue into speech synthesis and the frontend without being buffered back into a full response. Keeping that progressive path intact made the architecture feel responsive rather than merely reporting a faster internal metric.",
      },
    ],
  },
  "workflow-agent": {
    contribution: "Co-designed and built the prototype architecture with one other co-op student.",
    overview: [
      "This Windows desktop agent observes repeated workflows, summarizes actions into reusable skills, and replays those skills through computer-use tool calls. It captures operating-system events, window context, keystrokes, and annotated screenshots.",
      "A lightweight matching layer recognizes known patterns before invoking larger models, while ChromaDB and a prefix tree organize related workflow sequences. This separates continuous observation from the more expensive reasoning needed to summarize or replay a task.",
      "The prototype covers the full lifecycle of a learned workflow: capture a trace, turn low-level events into meaningful actions, compare the sequence with known behavior, persist a reusable skill, and have an orchestrator execute it later. It was demonstrated internally on a small set of repeated tasks.",
    ],
    results: [
      "Built and demonstrated the full observe, summarize, store, match, and replay loop on several workflows.",
      "Observed replay success above 80% across the small set of demonstrated skills.",
    ],
    choices: [
      {
        title: "Capture structured OS events",
        body: "Windows event hooks provide timing, application, and window context directly, producing a more reliable action trace than inferring every step from screenshots alone.",
      },
      {
        title: "Make click context visual",
        body: "Drawing the click location onto each screenshot gives the vision-language model a cue in the modality it interprets best. The annotation ties a low-level coordinate to the visible control the user actually selected.",
      },
      {
        title: "Match noisy behavior with sliding windows",
        body: "People pause, backtrack, and vary small steps when repeating the same task, so exact event sequences would rarely match. Fuzzy windows identify a known workflow inside a longer, imperfect trace while tolerating those variations.",
      },
      {
        title: "Index shared workflow prefixes",
        body: "A prefix tree narrows candidate skills as actions arrive, while vector similarity in ChromaDB identifies semantically close traces and avoids storing near-duplicates. The combination supports both sequential structure and fuzzy meaning.",
      },
    ],
  },
  "bnn-asic": {
    contribution: "Worked on the RTL implementation and Python-driven cocotb verification as part of a small team.",
    overview: [
      "This project takes a three-layer, 20-neuron binarized network through TinyTapeout's shared-shuttle flow. The network is trained offline in Larq, converted into fixed RTL weights, verified against the Python model, and hardened to GDS.",
      "TinyTapeout provides only a small physical tile, so the network architecture and arithmetic are constrained by area from the start. Binary weights make a hardware implementation practical by replacing conventional multiply-accumulate operations with XNOR comparisons and population counts.",
      "The resulting circuit is fixed-function inference hardware rather than an on-chip training system. Its value is the complete path from model training to cycle-level verification and an automated physical-design flow suitable for fabrication.",
    ],
    results: [
      "Passed cocotb comparisons against the trained model and completed the automated hardening and GDS flow for submission.",
    ],
    choices: [
      {
        title: "Replace multipliers with XNOR and popcount",
        body: "Constraining weights to one bit turns multiplication into bitwise comparison and counting, allowing the network to fit within a small TinyTapeout tile without a bank of full-precision multipliers.",
      },
      {
        title: "Verify from the training environment",
        body: "cocotb drives RTL from Python so the hardware output can be compared directly with the trained model without duplicating reference vectors by hand or maintaining two separate test definitions.",
      },
      {
        title: "Train offline and hard-map weights",
        body: "The silicon only needs to perform inference, so training remains in Larq and the resulting binary parameters become constants in the RTL. This spends the limited area on the datapath instead of update logic and writable weight storage.",
      },
      {
        title: "Use CI as part of the hardware flow",
        body: "Every change passes through TinyTapeout's automated checks, hardening, and GDS generation rather than waiting for a final manual run. That keeps functional edits tied to whether the design still survives the physical flow.",
      },
    ],
  },
  "multi-device-speech": {
    contribution: "Co-built the application and cross-device orchestration; the underlying AI model was supplied by another team.",
    overview: [
      "This HarmonyOS demonstration connects multiple phones to one live AI conversation. The ArkTS application coordinates device state and real-time audio while integrating a model provided by a headquarters team.",
      "The application layer had to bridge an immature platform ecosystem: LiveKit supplied the real-time transport needed by the demo but did not offer a native HarmonyOS client. The project therefore centered on orchestration, state synchronization, and integrating audio components across device boundaries.",
      "A distance-aware audio processor reduced the effect of several nearby phones capturing the same speaker. Combined with the cross-device state model, it made the demonstration behave as one conversation instead of a collection of independent clients.",
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
        body: "An MVVM structure separates each phone's conversation state from its UI, making synchronization issues easier to trace and keeping cross-device events out of presentation code.",
      },
      {
        title: "Filter audio using device distance",
        body: "The integrated audio processor uses distance as a signal when deciding which captured audio to retain. That reduces duplicated speech and feedback when multiple participating phones are in the same physical space.",
      },
      {
        title: "Keep model and application responsibilities separate",
        body: "The supplied AI model is treated as a service behind the interaction flow, while the ArkTS application owns transport, device coordination, and user-facing state. This allowed the demo team to iterate without changing the underlying model.",
      },
    ],
  },
  "anchor": {
    contribution: "Built the Chrome extension and integrated its detection, summarization, and teammate-developed eye-tracking components in a four-person team.",
    overview: [
      "Anchor is a hackathon-built focus tool that detects when a user drifts off-task and responds with an on-screen overlay and spoken prompt. The extension periodically interprets screen context while avoiding repeated analysis of unchanged frames.",
      "My work connected the browser extension to the inference and summarization path, then integrated an eye-tracking model trained by a teammate as an additional attention signal. The project had to balance frequent observation with the cost of repeatedly sending similar screen content to a remote model.",
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
        body: "Pairing an overlay with speech makes the prompt noticeable even when the user's attention has moved away from the active screen, while still leaving a visible explanation of why the tool intervened.",
      },
      {
        title: "Combine attention and screen context",
        body: "Screen interpretation says what task is visible, while the teammate-developed eye-tracking model supplies a separate indication of where attention is directed. Integrating the two gives the decision path more context than either signal alone.",
      },
      {
        title: "Keep observation local until inference is useful",
        body: "The extension performs frame comparison before calling the model, so unchanged work remains on the device. This ordering reduces tokens and avoids treating a fixed sampling interval as a requirement to run remote inference every time.",
      },
    ],
  },
  "adaptive-pulse": {
    contribution: "Delivered authentication, document ingestion, ETL, and retrieval-augmented summarization work during one co-op term on a small team.",
    overview: [
      "Adaptive Pulse's B2B platform gained OAuth2 login, cloud-storage imports, continuous data synchronization into Supabase, and retrieval-augmented summaries over client financial and tax documents.",
      "Authentication and ingestion were connected problems: clients needed identities, but they also needed a practical way to bring in many documents without uploading each file manually. Provider authorization made one flow serve both needs across Google Drive, Dropbox, and GitHub.",
      "Once documents and structured records were available, the summarization service retrieved relevant passages from long filings before generation. The supporting ETL path synchronized more than one million rows into the same Supabase-backed platform used for application data and vector search.",
    ],
    results: [
      "Introduced OAuth2 SSO and bulk imports from Google Drive, Dropbox, and GitHub.",
      "Synchronized more than one million rows into Supabase and built a document summarization workflow.",
    ],
    choices: [
      {
        title: "Use storage authorization for login and import",
        body: "OAuth2 connects users to the providers they already use, enabling authentication and bulk document access through one flow rather than adding separate credentials and upload tooling.",
      },
      {
        title: "Retrieve relevant passages before summarizing",
        body: "Embeddings and pgvector select useful sections from long documents, keeping model context focused without sending complete filings or adding another database service.",
      },
      {
        title: "Keep vectors beside application data",
        body: "Using pgvector in Supabase lets document metadata, access-controlled records, and embeddings share one operational store. That reduced infrastructure overhead for a small team and simplified linking retrieval results back to source documents.",
      },
      {
        title: "Automate repeated ingestion with continuous ETL",
        body: "The Airbyte path turns client sources into an ongoing synchronization rather than a one-time import. This made the data layer useful beyond the initial upload flow, even though transmission reliability remained an area that needed further work.",
      },
    ],
  },
  "onnx-export-parallelism": {
    contribution: "Restructured a teammate's exporter for thread-level parallelism and debugged its file-generation path.",
    overview: [
      "This was a focused C++ change to an ONNX model-export pipeline. Independent export work was distributed across pthreads, followed by end-to-end debugging of the generated file path.",
      "The contribution was intentionally narrow: fewer than one hundred lines changed the scheduling structure around an existing exporter rather than redesigning model conversion. The important part was identifying work that could proceed independently without corrupting final assembly.",
    ],
    results: [
      "Reduced export runtime and restored reliable ONNX file generation in fewer than one hundred lines of C++.",
    ],
    choices: [
      {
        title: "Parallelize only independent work",
        body: "The implementation divides already separable export tasks across threads and joins them before file assembly, keeping synchronization straightforward and shared mutable state limited.",
      },
      {
        title: "Keep final file assembly behind a join point",
        body: "Worker threads complete their independent portions before the exporter produces the final artifact. This preserves a deterministic boundary for file generation and made the broken output path easier to debug.",
      },
      {
        title: "Use the codebase's existing execution model",
        body: "Pthreads provided direct thread-level control without introducing a new concurrency framework into a small contribution. That kept the patch compact and easier for the owning developer to review and maintain.",
      },
    ],
  },
  "promotions-platform": {
    contribution: "Maintained a large Spring Boot platform through a new submission flow, bug fixes, alerting, rendering fixes, and database indexes.",
    overview: [
      "JD.com's internal coupon and promotion platform serves hundreds of marketing employees. My work focused on making targeted changes safely in an established codebase and resolving issues directly with product managers.",
      "The engineering challenge was orientation and change control rather than a new architecture. Shipping a form or correcting an edge case required tracing behavior through a large Spring Boot system, finding the established extension points, and avoiding parallel mechanisms that would be harder to operate.",
      "Several reported issues crossed the frontend and backend boundary, so reproducing the product behavior mattered as much as editing server code. Two of three product-manager-reported problems ultimately came from rendering rather than the backend path where they first appeared.",
    ],
    results: [
      "Shipped a coupon and promotion submission form with supervisor review.",
      "Resolved three product-manager-reported issues and added alerting for a submission edge case.",
    ],
    choices: [
      {
        title: "Reuse the platform's alert abstraction",
        body: "Extending the existing alert object kept the submission fix consistent with established notification behavior and minimized new code in a system with a large operational surface.",
      },
      {
        title: "Prefer low-risk database indexes",
        body: "Indexes improved the paths I was working on without restructuring queries in a high-traffic system, keeping the intervention narrow and straightforward to review.",
      },
      {
        title: "Diagnose across the full request path",
        body: "Reported symptoms were traced through submission, backend handling, and frontend rendering instead of assuming the named subsystem was at fault. That process identified two rendering defects that initially appeared to be backend failures.",
      },
      {
        title: "Close the loop with product managers",
        body: "Working directly with the people who reported each issue made reproduction criteria and acceptance checks explicit. It also reduced the chance of shipping a technically plausible fix that did not resolve the workflow they were using.",
      },
    ],
  },
  "riscv-processor": {
    contribution: "Developing the datapath, control unit, processor subsystem, and verification setup as current coursework.",
    overview: [
      "This in-progress RISC-V processor in Verilog applies instruction decoding, control, and pipelining in a complete processor design rather than an isolated arithmetic block.",
      "Compared with the fixed-function MVM engine, the processor shifts complexity toward coordinating instructions and state over time. The current work covers the datapath and control relationships that allow different instruction classes to share arithmetic, register, and memory resources.",
    ],
    results: ["Datapath and control development is underway during the Fall 2026 Computer Architecture course."],
    choices: [
      {
        title: "Separate datapath from control",
        body: "Instruction fields and control decisions are kept distinct from the units that move and transform data. That makes it possible to reason about decoding and execution behavior without duplicating arithmetic paths for each instruction class.",
      },
      {
        title: "Treat pipeline timing as part of correctness",
        body: "As stages are introduced, control and data must advance together so an instruction's operation remains attached to the right operands and destination. The verification approach therefore needs to cover instruction interactions, not only single-instruction outputs.",
      },
    ],
  },
  "smart-light": {
    contribution: "Developed the STM32 firmware in C and assembled the circuit on a breadboard.",
    overview: [
      "This sensor-activated programmable light is built around an STM32 microcontroller, combining embedded firmware with a hand-wired physical circuit.",
      "The project connects a physical input to user-configurable behavior, so firmware sits between electrical signals and the light's observable response. It provided practical experience bringing up microcontroller code and hardware together rather than testing either side in isolation.",
    ],
    results: ["Completed a working breadboard build with sensor input and user-programmable behavior."],
    choices: [
      {
        title: "Keep behavior in firmware",
        body: "Sensor events and user-selected behavior are interpreted by the microcontroller rather than fixed entirely in wiring. This keeps the light's response changeable without rebuilding the physical circuit.",
      },
      {
        title: "Prototype the circuit on a breadboard",
        body: "Hand wiring made it practical to iterate on the sensor, controller, and output connections while the firmware was still changing. The build remained a functional prototype rather than introducing an unnecessary PCB step.",
      },
    ],
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
