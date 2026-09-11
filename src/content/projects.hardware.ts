import type { Project } from "./types";

/**
 * ---------------------------------------------------------------------------
 * DISCLOSURE NOTE — read before deploying.
 *
 * Several entries describe work done at Huawei on internal or unreleased
 * systems. They are written at roughly the same level of detail as Vivi's
 * public resume, and deliberately avoid naming internal model families,
 * internal service names and model version numbers. Even so, the following
 * slugs should be reviewed against her confidentiality agreement before the
 * site goes public, because they are not covered by anything already on the
 * resume:
 *
 *   - workflow-agent        (unreleased desktop agent prototype)
 *   - multi-device-speech   (unreleased cross-device demo)
 *
 * To withhold one, delete its object from the array below. Everything else —
 * routing, sitemap, listings, related links — is derived from this array, so
 * nothing else needs changing.
 * ---------------------------------------------------------------------------
 */

export const hardwareProjects: Project[] = [
  {
    slug: "mvm-engine",
    title: "Pipelined Matrix-Vector Multiplication Engine",
    tagline:
      "A parameterizable neural-network accelerator in SystemVerilog, scaled to 128 compute lanes on an AMD Kria FPGA.",
    discipline: "hardware",
    kind: "FPGA accelerator",
    context: "Digital Hardware Systems, University of Waterloo",
    timeframe: "Jul – Aug 2026",
    weight: 100,
    featured: true,
    status: "shipped",
    role:
      "I implemented the dot-product unit, the accumulator, the FSM controller, and the top-level integration that ties them together. The course supplied a dual-port memory module, a top-level integration testbench, a timing constraints file, and module skeletons. Built with one lab partner.",
    team: "Two-person lab group",
    stack: [
      "SystemVerilog",
      "Vivado",
      "AMD Kria FPGA",
      "RTL simulation",
      "Timing closure",
      "Out-of-context synthesis",
    ],
    metrics: [
      {
        value: "650 MHz",
        label: "Timing met after implementation",
        basis: "tool-reported",
        note: "Vivado's post-implementation timing report, against the lab's 650 MHz pass requirement. Achieved through register-balanced pipelining. The constraints file deliberately specifies an unattainable 1 ns period — not as a target, but to push the synthesis tool to optimise as aggressively as it can.",
      },
      {
        value: "128 lanes",
        label: "Compute lanes at 512 × 512",
        basis: "tool-reported",
        note: "The lane count that fit the device's DSP and BRAM budget under out-of-context synthesis, on the lab's 512 × 512 benchmark with 8-bit inputs and 32-bit accumulators. Reported by Vivado's utilisation and timing reports.",
      },
      {
        value: "8 MACs",
        label: "Per lane, per cycle",
        basis: "measured",
        note: "A structural property of the design rather than a benchmark: each dot-product unit holds eight parallel multipliers feeding a log₂(N)-level adder reduction tree, and consumes one 8-element word per cycle once the pipeline is full.",
      },
    ],
    overview: [
      "A matrix-vector multiplication engine is the arithmetic core of a neural network inference accelerator: almost all of the work in a dense layer is one matrix multiplied by one vector. This design implements that operation in hardware, parameterized so the same RTL can be scaled from a single compute lane up to whatever the target device can hold.",
      "The architecture is explicitly modelled on Microsoft's Brainwave deep-learning accelerator, which was deployed commercially in Microsoft datacentres. Following a known industry architecture rather than inventing one meant the interesting work was in the implementation: pipelining the datapath hard enough to close timing, and sequencing memory with a controller that respects the memory's read latency.",
      "It is the project I would most want to be asked about. The design is small enough to hold entirely in your head and detailed enough that every decision in it has a reason.",
    ],
    challenge: [
      "The naive version of this circuit is a single long combinational path: multiply eight pairs of numbers, sum the eight products through a tree of adders, add the result to a running total. Written that way it is functionally correct and hopelessly slow, because the critical path runs through a multiplier and every level of the adder tree before it reaches a register.",
      "On top of that, the design has to be scalable and it has to be synthesizable standalone. The top-level interfaces are far wider than the Kria board has physical IO pins, so the block cannot simply be synthesized as a normal top-level design.",
    ],
    decisions: [
      {
        title: "Fully pipeline the dot-product unit",
        body: "The dot-product unit takes two 8-element signed vectors and produces a scalar. Eight parallel multipliers feed a binary adder reduction tree of log₂(N) levels, and the whole path is pipelined with registers between stages. This is what makes the clock target reachable: it breaks the long multiply-and-reduce path into short stages, each of which has to settle in one cycle rather than the whole chain having to settle in one cycle. Balancing where those registers sit is the difference between meeting 650 MHz and missing it.",
      },
      {
        title: "Give the accumulator first/last control instead of an external counter",
        body: "The accumulator adds signed values into an internal register under two control bits. `first` restarts the accumulation with the incoming value instead of adding to it, which resets state without a separate clear cycle. `last` marks the final input of a row, which is what causes the output-valid signal to assert. Pushing this into the accumulator keeps the controller simple — it only has to know which word of a row it is on, not maintain a copy of the accumulator's state.",
      },
      {
        title: "Offset the valid signal by exactly one cycle to match memory latency",
        body: "The provided memory has a one-cycle read latency: data appears the cycle after the address is presented. So the controller asserts the dot-product unit's valid signal one cycle after issuing a read address, not in the same cycle. This is a one-line detail and it is the single most common source of an off-by-one datapath bug in a design like this. Getting it wrong produces a design that simulates almost correctly, which is worse than one that fails obviously.",
      },
      {
        title: "Keep the controller to two states",
        body: "The controller is a two-state FSM. In IDLE it registers the operand start addresses and sizes and holds every output at zero, so the datapath cannot be driven by stale values. On `start` it moves to COMPUTE and sequences the vector and matrix read addresses along with the accumulator's control bits. Two states is enough because all of the per-cycle complexity lives in address arithmetic, not in control flow — and a two-state FSM is trivially reviewable, which matters more than elegance.",
      },
      {
        title: "Distribute matrix rows round-robin across lane memories",
        body: "The top level combines one vector memory with a parameterizable number of compute lanes; each lane holds its own matrix memory, dot-product unit and accumulator, and each produces exactly one element of the output vector — hence output lanes. For an M × N matrix, each row is split into N/8 eight-element words, and rows are distributed across the lane memories round-robin, so each matrix memory holds (N/8) × (M/NUM_OLANES) words. Round-robin keeps the memories evenly filled for any M that divides the lane count, which is what allows the lane count to be a parameter rather than a rewrite.",
      },
      {
        title: "Synthesize out-of-context against virtual IO",
        body: "Because the top-level interfaces are much wider than the Kria's available physical pins, the design is synthesized with `-mode out_of_context`. Vivado then connects those ports to virtual IOs implemented in lookup tables, so the block can be synthesized, placed and timed standalone as an IP block rather than as a pin-bound top level. Without this the design does not build at all, and it is the kind of flow detail that only shows up once you are targeting a real device rather than a simulator.",
      },
    ],
    sections: [
      {
        heading: "Verification went past the minimum",
        body: [
          "The course provided only a top-level integration testbench. Integrating four modules and then discovering that the output vector is wrong tells you almost nothing about which module is at fault, so I wrote unit testbenches for the individual modules first and brought them up one at a time. When the datapath and control did disagree, I found the mismatches by reading simulation waveforms rather than by adding print statements.",
          "I also did not stop at RTL simulation. RTL simulation tells you the design is logically right; it does not tell you the thing the tools actually built is right. I validated the implemented netlist with post-implementation functional simulation, and checked that DSP block and BRAM utilisation matched what the parameterization predicted — which is a cheap way to catch a design that is accidentally inferring logic instead of hard blocks.",
        ],
      },
      {
        heading: "Scaling for throughput",
        body: [
          "The lab included an optional throughput objective: fit as many compute lanes as possible and clock them as fast as possible, evaluated on 512 × 512 operands with 8-bit inputs and 32-bit outputs. This is a resource-budget problem more than an RTL problem — every added lane costs DSP slices and a BRAM-backed matrix memory, and past a point the placer can no longer meet timing with what is left. Scaling to 128 lanes was the point where the device's DSP and BRAM budget and the timing target met.",
        ],
      },
    ],
    outcome: [
      "The design meets timing at the 650 MHz target with 128 compute lanes on the 512 × 512 benchmark, verified at both RTL and implemented-netlist level.",
      "More usefully, it is the project that taught me the difference between RTL that simulates and RTL that builds. Pipelining for timing, respecting memory latency in control, synthesizing out-of-context, and checking utilisation against expectation are all things you only learn by having the tools refuse to cooperate.",
    ],
    limitations: [
      "This is coursework, built with a lab partner over two months. The modules listed under my role are my scope; the memory module, integration testbench, constraints file and skeletons were supplied by the course.",
      "Post-implementation resource utilisation was checked against expectation at the time but the exact numbers were not recorded, so no utilisation figures are quoted here.",
      "The design is a standalone accelerator block. It was never integrated behind a host interface or driven by a real inference workload end to end.",
    ],
  },

  {
    slug: "bnn-asic",
    title: "Binarized Neural Network ASIC",
    tagline:
      "A 3-layer, 20-neuron binarized MLP taken through TinyTapeout's hardening and GDS flow for fabrication.",
    discipline: "hardware",
    kind: "ASIC tapeout",
    context: "TinyTapeout shared shuttle",
    timeframe: "May – Aug 2025",
    weight: 78,
    featured: true,
    status: "shipped",
    role:
      "A team project — the design, training script and verification were a shared effort, and I am not going to carve up credit I cannot document precisely. My working areas were the RTL realization of the trained network and the cocotb verification driven from Python.",
    team: "Small team",
    stack: ["Digital design", "Larq / Keras", "cocotb", "Python", "GitHub Actions", "OpenLane / GDS flow"],
    metrics: [
      {
        value: "3 layers / 20 neurons",
        label: "Network realized in silicon",
        basis: "measured",
        note: "A structural property of the submitted design, not a benchmark. Deliberately tiny: TinyTapeout allocates each project a very small tile, so the interesting constraint is area, not accuracy.",
      },
      {
        value: "XNOR + popcount",
        label: "Inference reduced to",
        basis: "measured",
        note: "A consequence of binarizing the weights. With ±1 weights stored as single bits, a multiply-accumulate becomes an XNOR followed by a population count — no multipliers in the datapath at all. This is the property that makes the network fit in the available area.",
      },
    ],
    overview: [
      "TinyTapeout is a shared-shuttle service: many small digital designs are combined onto one die so that individuals can get real silicon fabricated affordably. This project is a small binarized neural network submitted through that flow — a 3-layer, 20-neuron MLP-style network, hardened and taken to GDS.",
      "The network does not learn on chip. Weights are trained offline in Python using Larq, a binarized-neural-network library built on Keras, and then hard-mapped into the RTL. What is in silicon is a fixed-function inference circuit.",
      "I want to be straightforward about intent: this was an educational project, done to go through a real physical-design flow end to end rather than to produce a competitive accelerator.",
    ],
    challenge: [
      "A TinyTapeout tile is very small, and a conventional neural network needs multipliers, which are expensive in area. A design with full-precision weights does not fit.",
      "The other challenge is one of trust. Once a design is hardened to GDS and submitted, there is no patching it. The RTL has to be shown equivalent to the trained model before submission, not after.",
    ],
    decisions: [
      {
        title: "Binarize the weights so the multipliers disappear",
        body: "Binarized networks constrain weights to ±1. Stored as single bits, the multiply in a multiply-accumulate collapses into an XNOR, and the accumulate becomes a population count over the resulting bits. That removes every multiplier from the datapath, which is what makes a network of this shape fit in the available area at all. The accuracy cost is real, and acceptable for a design whose purpose is to exist in silicon.",
      },
      {
        title: "Train offline, hard-map into RTL",
        body: "Training on chip would have consumed the entire area budget on machinery that runs once. Weights were trained in Larq and then baked into the RTL as constants, so the silicon only has to do inference. The tradeoff is that the chip does exactly one task forever — which for a demonstration part is the right side of the tradeoff.",
      },
      {
        title: "Verify RTL against the trained model with cocotb, from Python",
        body: "The trained model lives in Python, so the reference implementation lives in Python. cocotb lets the testbench drive the RTL directly from Python, which means the same script can run an input through the trained network and through the simulated hardware and compare them, rather than hand-transcribing expected vectors into an HDL testbench. That eliminates a whole class of transcription error, and cocotb is a framework used in industry rather than a teaching tool.",
      },
      {
        title: "Gate every change through the provided CI",
        body: "TinyTapeout supplies GitHub Actions pipelines that run the hardening and GDS generation flow automatically. Running that on every change meant a commit that broke the physical flow surfaced immediately, rather than at submission. The alternative — running the flow manually near the deadline — is how tapeout slots get missed.",
      },
    ],
    outcome: [
      "The design passed cocotb equivalence checks against the trained model and completed TinyTapeout's automated hardening and GDS flow, which is the bar for submission.",
      "The value to me was the flow, not the network: writing RTL that has to survive synthesis, hardening and physical design is a different discipline from writing RTL that only has to simulate.",
    ],
    limitations: [
      "Educational in intent. This is a demonstration part on a shared shuttle, not production silicon, and it should not be read as one.",
      "The design is described here as an 8-bit circuit with binarized weights: the weights themselves are single bits, and the design is exposed through TinyTapeout's 8-bit IO interface. Those are two different widths and I would rather name both than blur them.",
      "Team project. Team size and the exact division of work are not something I can document precisely, so I have not claimed a specific split.",
      "Whether this shuttle was fabricated and returned, and physical measurements from a returned die, are not part of this write-up.",
    ],
    links: [{ label: "TinyTapeout project page", href: "https://tinytapeout.com/" }],
  },

  {
    slug: "riscv-processor",
    title: "RISC-V Processor from Scratch",
    tagline:
      "Datapath, control and processor subsystem in Verilog — currently in progress, including pipelining.",
    discipline: "hardware",
    kind: "Processor design",
    context: "Computer Architecture, University of Waterloo",
    timeframe: "Fall 2026 — in progress",
    weight: 70,
    featured: false,
    status: "in-progress",
    role:
      "Coursework, in progress this term. Datapath, control unit and processor subsystem design, with simulation and verification tooling alongside.",
    stack: ["Verilog", "RISC-V", "RTL simulation", "Pipelining"],
    metrics: [],
    overview: [
      "A functional RISC-V processor built from scratch in Verilog as part of my Fall 2026 computer architecture course: datapath, control, and the surrounding processor subsystem, with pipelining applied in practice rather than only on paper.",
      "This is unfinished and listed as unfinished. It is here because it is the direction I am currently moving in, and because a portfolio that only shows completed things is a portfolio that is always a term out of date.",
    ],
    challenge: [
      "Building a processor is where the two halves of my background stop being separate. Up to now I have written RTL for fixed-function datapaths — an accelerator does one thing, very fast. A processor has to be general, which means the interesting difficulty moves out of the datapath and into control: hazards, forwarding, and the pipeline behaving correctly when instructions interact.",
    ],
    decisions: [],
    outcome: [
      "In progress. I will write this up properly — with the ISA subset, pipeline depth, toolchain and verification approach stated concretely — once it is actually finished and I can show what it runs.",
    ],
    limitations: [
      "Actively in progress as of Fall 2026. Nothing here should be read as a completed result.",
      "Pipeline depth, the implemented ISA subset and the toolchain are not stated because the design is not settled yet. I would rather leave them blank than describe a design I am still changing.",
    ],
  },

  {
    slug: "smart-light",
    title: "Sensor-Activated Programmable Light",
    tagline: "Embedded C firmware on an STM32, hand-wired on a breadboard.",
    discipline: "hardware",
    kind: "Embedded firmware",
    context: "Coursework",
    timeframe: "Coursework project",
    weight: 30,
    featured: false,
    status: "shipped",
    role: "Firmware in C on an STM32 microcontroller, developed in STM32CubeIDE.",
    stack: ["Embedded C", "STM32", "STM32CubeIDE"],
    metrics: [],
    overview: [
      "A sensor-activated, user-programmable smart light running on an STM32 microcontroller, written in C through STM32CubeIDE and assembled by hand on a breadboard.",
      "It is the smallest project on this site and it is here for one reason: it is the only place I have written firmware that drives physical hardware directly, which is a different discipline from both RTL and application software.",
    ],
    challenge: [
      "Firmware sits between two things that do not care about each other: a microcontroller's peripherals, which are unforgiving about timing and register state, and a user, who wants a light that behaves sensibly. Most of the work in a project like this is in the peripheral configuration rather than in the logic.",
    ],
    decisions: [],
    outcome: [
      "Working build on a breadboard, driven by sensor input with user-configurable behaviour.",
    ],
    limitations: [
      "Breadboard and hand-wiring only. There was no PCB, and I have no experience with Altium, KiCad or any other PCB design tooling — I would rather say that plainly than let an embedded project imply otherwise.",
      "This write-up is thin because I am not going to reconstruct specifics I do not remember precisely. The peripheral-level detail — which sensor, which peripherals, and whether I worked through ST's HAL or closer to the registers — is what would make this project actually interesting, and I would rather leave a gap than fill it with a plausible guess.",
    ],
  },
];
