import type { Project } from "./types";

export const softwareProjects: Project[] = [
  {
    slug: "gestalt-engine",
    title: "Gestalt Engine",
    tagline:
      "A real-time gesture-to-audio interface. I implemented the same LSTM recognizer twice — once from scratch in NumPy, once in PyTorch.",
    discipline: "software",
    kind: "Real-time ML system",
    context: "Personal project, solo",
    timeframe: "Feb 2026 – present",
    weight: 96,
    featured: true,
    status: "in-progress",
    role:
      "Solo. Data pipeline, both model implementations, the inference server and the web client are all mine.",
    stack: [
      "Python",
      "NumPy",
      "PyTorch",
      "MediaPipe",
      "OpenCV",
      "FastAPI",
      "WebSockets",
      "React",
      "Vite",
    ],
    metrics: [
      {
        value: "~85% → ~92%",
        label: "Test accuracy, NumPy vs PyTorch",
        basis: "measured",
        note: "Accuracy on a held-out test split across 21 dynamic gesture classes, for the from-scratch NumPy implementation and the PyTorch implementation respectively. Both use the same stacked two-layer LSTM architecture and the same train/test/validation split, so the gap reflects implementation and optimisation quality rather than a difference in model design.",
      },
      {
        value: "<15 ms",
        label: "Model forward pass, per frame",
        basis: "measured",
        note: "Time for a single forward pass inside the local OpenCV capture loop. This is the model's inference time only — it is not the end-to-end latency of the web application, and the two should not be conflated.",
      },
      {
        value: "<100 ms",
        label: "Browser round trip, end to end",
        basis: "approximate",
        note: "Full round trip from browser capture to server inference and back over WebSockets, measured locally on one machine. Loopback rather than a real network, so treat it as an upper bound on the compute path rather than as a deployed latency figure.",
      },
      {
        value: "800k+ frames",
        label: "Processed into training data",
        basis: "measured",
        note: "Raw frames from the open-source IPN-Hand dataset, spanning 4,000+ gesture instances, transformed into correctly shaped training arrays by a ~500-line preprocessing pipeline I wrote. The dataset is not mine; the curation of it into trainable form is.",
      },
    ],
    overview: [
      "Gestalt Engine reads hand gestures from a webcam in real time and classifies them into one of 21 dynamic gesture classes — dynamic meaning gestures defined by motion over time, not by a static hand pose. MediaPipe extracts hand landmarks per frame, and a stacked two-layer LSTM classifies the resulting temporal sequence.",
      "The part I care about is that I built the recognizer twice. The first implementation is written from scratch in NumPy, including a hand-written LSTM cell and its backpropagation. The second is PyTorch. The NumPy version is slower and less accurate and I would never ship it — I wrote it because implementing backpropagation through a gated recurrent cell by hand is the difference between knowing what an LSTM is and knowing how one works.",
      "The intended end state is gesture-driven spatial audio: stereo output synthesized from 3D hand tracking, so the interface can give feedback without a screen. Gesture recognition is finished. The audio pipeline is not.",
    ],
    challenge: [
      "Recognizing a dynamic gesture is a sequence problem, not an image problem. A single frame of a wave and a single frame of a swipe can be identical; the class only exists in how the hand moves over time. That rules out per-frame image classification and forces a model with temporal state.",
      "It also has to be fast enough to feel immediate. A gesture interface that responds in 300 ms does not feel like an interface, it feels like a delay, so the whole path — landmark extraction, sequence classification, transport to the browser — has a latency budget rather than just a correctness requirement.",
      "And the raw data is nowhere near trainable. IPN-Hand ships as video with annotations, not as fixed-shape tensors of landmark sequences.",
    ],
    decisions: [
      {
        title: "Extract landmarks instead of feeding raw pixels to the model",
        body: "MediaPipe reduces each frame to a small set of hand landmark coordinates. Classifying a sequence of landmark vectors rather than a sequence of images shrinks the input by orders of magnitude, which is most of the reason the forward pass fits in single-digit milliseconds. It also makes the model largely indifferent to background, lighting and skin tone, because none of that survives landmark extraction — a robustness win that came for free with the latency win.",
      },
      {
        title: "Choose LSTMs deliberately, not by default",
        body: "I picked a stacked two-layer LSTM for two reasons. First, it handles temporal reasoning over frame sequences well enough for 21 classes. Second — and this was decisive — an LSTM cell is tractable to implement from scratch. A transformer would likely perform better and I could not have hand-derived its gradients in a reasonable amount of time. Choosing the architecture I could fully understand was the point of the exercise.",
      },
      {
        title: "Write the NumPy implementation first, PyTorch second",
        body: "Doing it in the harder order was intentional. Writing the LSTM cell and its backward pass in NumPy first meant that when I moved to PyTorch, autograd was a convenience rather than a black box — I knew what it was computing. The ~7-point accuracy gap between the two is honest information about my from-scratch optimisation, not a claim that NumPy is deficient.",
      },
      {
        title: "Separate the model's latency from the system's latency",
        body: "The forward pass runs in under 15 ms locally; the browser round trip over WebSockets is under 100 ms. I report those as two numbers on purpose. They measure different things, and quoting the smaller one as the system's responsiveness would be the kind of claim that falls apart the first time someone asks how it was measured.",
      },
      {
        title: "Treat data preprocessing as real engineering",
        body: "The ~500-line pipeline that turns 800,000-plus raw IPN-Hand frames and 4,000-plus gesture instances into correctly shaped arrays was the largest single piece of code in the project for a while. Variable-length gestures have to become fixed-shape tensors, sequences have to stay aligned with their labels, and the train/test/validation split has to avoid leaking instances of the same recording across splits. Getting that wrong produces excellent accuracy numbers that mean nothing.",
      },
    ],
    outcome: [
      "Gesture recognition works end to end: webcam to landmarks to classified gesture, streamed to a React client over WebSockets, in under 100 ms locally.",
      "Two working implementations of the same recognizer, at ~85% (NumPy, from scratch) and ~92% (PyTorch) test accuracy over 21 dynamic gesture classes.",
    ],
    limitations: [
      "The spatial audio pipeline — the part that would make it a gesture-to-audio interface rather than a gesture recognizer — is not finished.",
      "It runs locally only. There is no deployment, and the latency figures are loopback measurements on a single machine rather than over a real network.",
      "There is no demo recording yet. This is the honest weak point of the project's presentation: a real-time gesture interface is far more convincing in motion than in prose, and until there is a video, this page is doing the work that thirty seconds of screen capture would do better.",
    ],
    links: [
      { label: "Model repository — Flicker-model", href: "https://github.com/Ctr-cv/Flicker-model" },
      { label: "GitHub — Ctr-cv", href: "https://github.com/Ctr-cv" },
    ],
  },

  {
    slug: "voice-agent-latency",
    title: "Multi-Person Voice Agent",
    tagline:
      "Cutting median response latency from 7–8 seconds to under 3 by making sequential pipeline stages concurrent.",
    discipline: "software",
    kind: "Latency optimization",
    context: "Huawei Technologies Canada",
    timeframe: "Sept 2025 – Apr 2026",
    weight: 92,
    featured: true,
    status: "shipped",
    role:
      "I contributed to an existing codebase rather than owning it. I built the entire frontend, and did the performance work together with another co-op student.",
    team: "Existing project team; performance work shared with one other co-op",
    stack: ["Frontend development", "Streaming pipelines", "Speaker verification", "VAD", "TTS"],
    metrics: [
      {
        value: "7–8s → <3s",
        label: "Median response latency",
        basis: "approximate",
        note: "Defined as the interval from the moment the user stops speaking to the assistant's first word, at the median. This was a rough measurement taken during development, not rigorous benchmarking — the direction and rough magnitude are solid, the exact figures are not instrumented percentiles.",
      },
      {
        value: "~0 ms",
        label: "Latency added by speaker verification",
        basis: "approximate",
        note: "Negligible in practice because the voiceprint model is embedding-based and very fast, and runs alongside the other stages rather than in front of them. This is the result I find most interesting: identifying who is speaking did not have to be traded against responsiveness.",
      },
    ],
    overview: [
      "A voice assistant normally assumes one user. This feature makes it work in a room: it identifies the owner by voiceprint and acts only on the owner's requests, while still offering suggestions when other people in the conversation ask for something.",
      "The codebase already existed. My contribution was twofold — I built the entire frontend for the feature, and I worked with another co-op student on making the existing system fast enough to be usable in conversation.",
      "The latency result is the strongest quantified outcome of my co-op terms, and the reason it was achievable is that the original pipeline was leaving time on the table structurally rather than being slow at any one thing.",
    ],
    challenge: [
      "A median response latency of seven to eight seconds is not a slow feature, it is a broken one. Conversation has a turn-taking rhythm, and once a response takes longer than a few seconds people stop treating the system as a conversational partner and start treating it as a form they are waiting on.",
      "Adding speaker verification to the pipeline made this worse in principle: the system now had to determine who was speaking before it knew whether to respond at all, which is another stage in a chain that was already too long.",
    ],
    decisions: [
      {
        title: "Overlap the stages instead of optimizing any single one",
        body: "Voice activity detection, language model inference and text-to-speech were running as a sequence: each stage waited for the previous one to finish. Because each stage produces output progressively, that wait is mostly unnecessary. Restructuring them to stream and run concurrently — TTS beginning on the first part of a response while the model is still generating the rest — is where the bulk of the reduction came from. No individual component got faster; the pipeline stopped idling.",
      },
      {
        title: "Run speaker verification alongside, not in front",
        body: "Speaker verification could have been a gate at the head of the pipeline: identify the speaker, then decide whether to process. That would have added its full cost to every turn. Running it concurrently with the other stages instead meant the system could begin working on the response while establishing identity. Combined with the voiceprint model being embedding-based and therefore very cheap, the identity check ended up effectively free.",
      },
      {
        title: "Define the latency metric before optimizing it",
        body: "\"Response time\" is ambiguous enough to be meaningless — it can be measured from the start of speech, the end of speech, the end of detection, or the first audible output. We fixed it as: from the moment the user stops speaking to the assistant's first word, at the median. Naming the metric precisely is what makes a before-and-after comparison mean anything, and it is why I can still describe the result accurately a year later.",
      },
    ],
    outcome: [
      "Median response latency dropped from seven to eight seconds to under three, which is the difference between a demo people are patient with and one they can actually talk to.",
      "Speaker verification was added without a measurable responsiveness cost, so the multi-person behaviour did not come at the expense of the single-user experience.",
    ],
    limitations: [
      "I contributed to this system, I did not architect it. The codebase predates me.",
      "The latency figures are rough development measurements, not instrumented percentiles from a benchmark harness. I have quoted them as approximate throughout for that reason.",
      "This work touches an internal, shipping product. The description here stays at the level of engineering technique and deliberately does not enumerate internal system names, model versions or architecture.",
    ],
  },

  {
    slug: "route-extraction",
    title: "Cycling Route Extraction Pipeline",
    tagline:
      "Recovering an ordered sequence of landmarks from an arbitrary screenshot, then snapping it to a real cycling route.",
    discipline: "software",
    kind: "Computer vision pipeline",
    context: "Huawei Technologies Canada",
    timeframe: "Sept 2025 – Apr 2026",
    weight: 88,
    featured: true,
    status: "shipped",
    role: "Owned end to end, including the object detection fine-tuning nested inside it.",
    stack: [
      "Python",
      "AsyncIO",
      "OpenCV",
      "Morphological image processing",
      "YOLO26",
      "OCR",
      "Maps APIs",
    ],
    metrics: [
      {
        value: "30s → 13s",
        label: "Per-image runtime",
        basis: "approximate",
        note: "Roughly 30 seconds down to 12–15 seconds per image. Critically, this came from concurrency hiding network latency and overlapping two independent pipelines — not from the image processing itself getting faster. The computer vision work is CPU-bound and AsyncIO does not accelerate it.",
      },
      {
        value: "98% mAP@50",
        label: "Map icon detection, after fine-tuning",
        basis: "tool-reported",
        note: "Mean average precision at an IoU threshold of 0.5, reported by the training framework on a held-out split of a self-curated 2,300-image dataset. Written as mAP@50 deliberately: a bare \"98% mAP\" would conventionally imply the much stricter mAP@50-95 average, which this is not. No pre-fine-tuning baseline was measured, so the improvement is not quantified — only the final result.",
      },
      {
        value: "2,300 images",
        label: "Dataset assembled for a class absent from pretraining",
        basis: "measured",
        note: "Dataset size. I assembled it and labelled some of it; most of the labelling was done by colleagues. Mosaic and flip augmentation were applied during training.",
      },
    ],
    overview: [
      "Given a screenshot, recover the ordered sequence of geographic landmarks in it, then snap that sequence to a real, rideable cycling route using a maps routing service.",
      "What made it hard is that the input was genuinely unconstrained. It might be a satellite map view, a standard vector map view, or a purely scenic photograph with no map in it at all. Those three cases share almost no visual assumptions, so there is no single technique that handles all of them.",
      "I owned this end to end, including fine-tuning an object detector for it — map icons are not a class any general-purpose detector is pretrained on.",
    ],
    challenge: [
      "Ordering is the real problem, not detection. Finding landmarks in an image is one thing; recovering the sequence a rider would visit them in is another, and it is what the routing service needs. Morphological image processing — operating on the shapes and connectivity of the map's rendered features — is what recovered that ordering.",
      "Runtime was the other problem. At roughly thirty seconds per image, the pipeline was too slow to sit behind anything interactive.",
      "And the detector was starting from nothing useful. Map icons are absent from standard pretraining classes, so an off-the-shelf model performed poorly on them.",
    ],
    decisions: [
      {
        title: "Run a heuristic pipeline and a model-based pipeline concurrently",
        body: "Rather than choosing between a deterministic heuristic approach and a language-model approach, I ran both concurrently with AsyncIO and took the better result. Unconstrained input is exactly the situation where one approach handles the cases the other fails on: heuristics are reliable on well-structured map views, and the model-based path degrades more gracefully on scenic photographs. Running them concurrently rather than sequentially means the pipeline pays roughly the cost of the slower one instead of the sum of both.",
      },
      {
        title: "Fan out blocking external calls — and be precise about what that bought",
        body: "The pipeline calls several external services: a language model API, cloud OCR, and two different maps providers. Those calls are network-bound and were being made one after another. Fanning them out with AsyncIO so they are in flight simultaneously is the other half of the runtime reduction. It is worth stating plainly what this did not do: AsyncIO did not make the image processing faster. Morphological processing is CPU-bound, and an event loop does not help with CPU-bound work. The entire gain came from overlapping independent work and hiding network latency. Any description of this project that implies asynchronous code accelerated the computer vision would be wrong, and I would not be able to defend it.",
      },
      {
        title: "Fine-tune a detector rather than engineer features for icons",
        body: "Map icons are small, highly stylized, and vary between map providers — a hand-written feature detector for them would be brittle across exactly the input variety this pipeline had to handle. Fine-tuning YOLO26 on a purpose-built 2,300-image dataset with mosaic and flip augmentation reached 98% mAP@50. Mosaic augmentation matters specifically here: it composites multiple images into one, which produces the crowded, multi-icon scenes the model actually sees in real map screenshots.",
      },
    ],
    outcome: [
      "A working pipeline that turns an unconstrained screenshot into an ordered landmark sequence and then into a real cycling route, at 12–15 seconds per image instead of around 30.",
      "A fine-tuned detector at 98% mAP@50 on a class that did not exist in pretraining.",
    ],
    limitations: [
      "The pre-fine-tuning baseline was never measured. I can tell you the base model performed poorly on map icons qualitatively, but I cannot quantify the improvement.",
      "Runtime figures are approximate per-image measurements taken during development rather than a benchmark over a fixed test set.",
      "Most of the dataset labelling was done by colleagues, not by me. I assembled and curated the dataset and labelled part of it.",
      "Internal APIs and services are described generically here rather than named.",
    ],
  },

  {
    slug: "workflow-agent",
    title: "Workflow-Learning Desktop Agent",
    tagline:
      "An agent that watches how you work, learns the workflows you repeat, and offers to do them for you.",
    discipline: "software",
    kind: "Agent architecture",
    context: "Huawei Technologies Canada",
    timeframe: "Early 2026, ~1 month",
    weight: 84,
    featured: true,
    status: "demo",
    role:
      "Owned jointly with one other co-op student. We proposed the entire framework ourselves after reading and testing ideas from recent conference papers. My teammate's contributions are attributed inline below.",
    team: "Two co-op students",
    stack: [
      "Python",
      "Windows (SetWinEventHook, win32gui)",
      "Vision-language models",
      "ChromaDB",
      "Prefix trees",
      "Computer-use tool calling",
    ],
    metrics: [
      {
        value: ">80%",
        label: "Replay success, on 2–3 learned skills",
        basis: "estimated",
        note: "Observed replay success rate across two to three demonstrated skills. This is a small-sample figure from an early prototype, not an evaluation — the honest reading is \"it worked most of the time on the handful of workflows we taught it\", and it should not be extrapolated.",
      },
      {
        value: "0.85 cosine",
        label: "Deduplication threshold for stored skills",
        basis: "measured",
        note: "The similarity threshold above which a newly observed sequence is treated as an already-known skill rather than a new one, using vector similarity in ChromaDB. My teammate tuned this threshold, not me.",
      },
    ],
    overview: [
      "The premise: most desktop work is repetitive, but the repetition is invisible to the computer. This agent observes a user working at the operating-system level, identifies workflows they perform repeatedly, stores them as reusable skills, and then offers to walk the user through them.",
      "My teammate and I proposed the whole framework ourselves after reading and testing ideas from recent conference papers. It is the most architecturally ambitious thing I have worked on, and it is also an early-stage prototype — roughly a month of work as the final project of my term, demonstrated internally and still early in development when I handed it off.",
    ],
    challenge: [
      "Learning from observation means solving three problems that all resist clean solutions. You have to capture what the user did with enough fidelity to replay it. You have to recognize that two sessions are the same workflow even though a human never repeats anything identically. And you have to decide what is worth remembering, or the skill store fills with noise.",
      "There is a fourth, quieter problem: watching a user continuously and sending everything to a large model is prohibitively expensive.",
    ],
    decisions: [
      {
        title: "Capture at the OS event level, not by scraping the screen",
        body: "The agent hooks Windows accessibility and window events using SetWinEventHook and win32gui, recording window events, keystrokes and screenshots. Capturing structured OS events gives a far more reliable signal about what actually happened than trying to infer it from pixels alone, and it comes with timing and window context for free.",
      },
      {
        title: "Annotate screenshots with a red dot at the click location",
        body: "A vision-language model could not reliably locate a click when given an image plus raw coordinates — it would describe the wrong element. Drawing a red dot on the screenshot at the click position puts the information into the modality the model is actually good at, and the accuracy of behaviour summarization improved substantially. This idea was mainly my teammate's; we reasoned it out together. It is my favourite detail in the system because the fix is almost embarrassingly simple and the reasoning behind it is not.",
      },
      {
        title: "Match fuzzily, on purpose",
        body: "Comparison against known patterns uses fuzzy sliding-window matching rather than exact sequence matching. This is not a tolerance for sloppiness, it is a requirement: real human behaviour is noisy, and nobody performs the same workflow with the same keystrokes twice. Exact matching would recognize essentially nothing. Sliding-window comparison lets a workflow be recognized even when the user pauses, backtracks or does the steps slightly out of order.",
      },
      {
        title: "Store skills in a prefix tree over a vector database",
        body: "Stored skills live as objects in a prefix tree backed by ChromaDB. The prefix tree is the right shape for workflows because workflows share beginnings — several different tasks may start with the same three steps, and a trie lets the classifier narrow down candidates as the observation unfolds instead of comparing against every stored skill. ChromaDB underneath provides the vector similarity that makes deduplication at a 0.85 cosine threshold possible, so re-observing a known workflow updates rather than duplicates it.",
      },
      {
        title: "Use the cheap matching layer as a cost filter",
        body: "The fuzzy matching layer served a second purpose beyond recognition: it filtered out expensive calls to the larger model. If cheap local comparison can determine that an observation is not interesting, the expensive reasoning step never runs. The architecture is sound and I want to be clear that we never measured the savings, so I am not going to quote a number for it.",
      },
      {
        title: "Summarize behaviour with a small model, orchestrate with a larger one",
        body: "A small language model summarizes observed behaviour into a compact description, and a separate orchestrator issues computer-use tool calls derived from stored skills at replay time. Splitting these means the thing that runs constantly is cheap, and the thing that is expensive only runs when the user has actually asked for a workflow to be performed.",
      },
    ],
    outcome: [
      "A working end-to-end prototype: observe, summarize, match, persist as a skill, and replay via computer-use tool calls, demonstrated on two to three skills with better than 80% replay success.",
      "Demonstrated internally to the human-machine-interaction team.",
    ],
    limitations: [
      "An early-stage demo built in about a month, and still early in development when I handed it off. It is not a product and I would not describe it as one.",
      ">80% replay success is across two or three skills. That is a demonstration, not an evaluation.",
      "The system assumes a bounded skill length of roughly thirty steps.",
      "I did not tune the matching threshold — my teammate did. The red-dot annotation idea was mainly his as well.",
      "Cost savings from the matching-layer filter were never measured.",
      "Described here at the level of architecture and technique; internal model families and versions are not named.",
    ],
  },

  {
    slug: "multi-device-speech",
    title: "Multi-Device Live Speech Demo",
    tagline:
      "Cross-device conversational AI on HarmonyOS, including a web-view workaround for a missing SDK.",
    discipline: "software",
    kind: "Mobile / cross-device",
    context: "Huawei Technologies Canada",
    timeframe: "Sept 2025 – Apr 2026",
    weight: 66,
    featured: false,
    status: "demo",
    role:
      "Owned jointly with one other co-op student. We built the demo application from scratch and did the orchestration; the underlying AI model was supplied by a headquarters team.",
    team: "Two co-op students",
    stack: ["ArkTS", "HarmonyOS", "MVVM", "ArkWeb", "LiveKit (JS)", "Real-time audio"],
    metrics: [
      {
        value: "~3s",
        label: "Average agent response time",
        basis: "approximate",
        note: "Average observed response time during demonstrations, not an instrumented benchmark.",
      },
    ],
    overview: [
      "A demonstration application connecting multiple HarmonyOS phones so that several users could hold a live conversation with an AI agent across devices. Written in ArkTS with an MVVM structure, built from scratch by two of us.",
      "The AI model came from a headquarters team. What my teammate and I built was the application and the orchestration between devices — and one workaround I am fond of, because it is the kind of decision that only exists on real platforms.",
    ],
    challenge: [
      "Real-time audio across multiple devices needs a transport built for it. LiveKit is the obvious choice and it had no official HarmonyOS SDK, which on a young platform is a normal situation rather than an exceptional one.",
    ],
    decisions: [
      {
        title: "Run LiveKit's JavaScript API inside an ArkWeb web view",
        body: "With no native SDK available, I ran LiveKit's JavaScript API inside a web view using HarmonyOS's ArkWeb component. This is the same approach used on Android in the same situation, which is what gave me confidence it was a legitimate pattern rather than a hack — the JS SDK is well maintained, and hosting it in a web view was dramatically less work and less risk than writing a native client against the protocol. The alternative was implementing a real-time transport from scratch on a deadline.",
      },
      {
        title: "Structure the app MVVM so device state stays separable",
        body: "With several phones participating in one conversation, the interesting state is which device is doing what. MVVM kept that state in view models rather than distributed through UI code, which is what made the cross-device behaviour debuggable when devices went out of sync.",
      },
      {
        title: "Integrate distance-based audio filtering",
        body: "I integrated an internal real-time audio processing model that filtered audio based on distance. In a multi-device conversation this is the difference between usable and unusable: without it, several phones in one room pick up the same speech at different amplitudes and the system responds to echoes of itself.",
      },
    ],
    outcome: [
      "A working multi-device demo with roughly three second average agent response time, shown to the product team and to senior leadership.",
    ],
    limitations: [
      "This was app-layer work. I wrote no drivers and did no device-level programming, and I would rather say so than let \"HarmonyOS multi-device\" imply firmware experience.",
      "The AI model was provided by another team. My scope was the application, the orchestration and the integrations.",
      "A demonstration application, not a shipped product.",
      "Internal models and services are described by function rather than named.",
    ],
  },

  {
    slug: "onnx-export-parallelism",
    title: "ONNX Export Pipeline Parallelism",
    tagline: "Under a hundred lines of C++ to restructure a slow model-export pipeline around pthreads.",
    discipline: "software",
    kind: "Systems / C++",
    context: "Huawei Technologies Canada",
    timeframe: "Sept 2025 – Apr 2026",
    weight: 44,
    featured: false,
    status: "shipped",
    role:
      "A small, self-contained contribution to a teammate's pipeline: restructuring it for thread-level parallelism and debugging the file-generation path.",
    stack: ["C++", "pthreads", "ONNX Runtime"],
    metrics: [],
    overview: [
      "A teammate had built a pipeline that exported a large model to an ONNX file, and it was slow. I restructured it around pthreads for more effective parallelism, in fewer than a hundred lines of C++, and debugged the file-generation path end to end.",
      "It is a small piece of work and I am including it because it is the closest I have come to systems-level programming in a professional setting — but I want to describe it accurately, which means describing it as less than it could be made to sound.",
    ],
    challenge: [
      "The export pipeline was doing work that was independent but running it serially. The fix is structural rather than clever.",
    ],
    decisions: [
      {
        title: "Straightforward thread-level parallelism — and nothing more than that",
        body: "This was ordinary pthreads work: identify the independent work, distribute it across threads, join. I had no knowledge of the hardware the pipeline actually ran on, so framing this as cache-aware or hardware-aware optimization would be false. It was thread-level parallelism on work that was already parallelizable, plus the debugging needed to make the file generation path reliable afterwards.",
      },
    ],
    outcome: [
      "Reduced export runtime and a file-generation path that worked reliably.",
    ],
    limitations: [
      "Under a hundred lines of C++. My C and C++ are working-level, not expert, and this project is the evidence for that characterization rather than against it.",
      "No measured before-and-after runtime figure, so none is quoted.",
    ],
  },

  {
    slug: "anchor",
    title: "Anchor",
    tagline:
      "A focus tool that notices when you drift off-task and says something about it. 75% fewer tokens via perceptual hashing.",
    discipline: "software",
    kind: "Chrome extension / hackathon",
    context: "DeltaHacks 12",
    timeframe: "Jan 2026",
    weight: 58,
    featured: false,
    status: "shipped",
    role:
      "Team of four. I built the Chrome extension, integrated the AI detection and summarization pipeline, and integrated an eye-tracking module that a teammate custom-trained.",
    team: "Four people",
    stack: ["JavaScript", "Next.js", "Chrome Extension APIs", "Gemini", "ElevenLabs"],
    metrics: [
      {
        value: "−75%",
        label: "Token usage",
        basis: "measured",
        note: "Verified by counting tokens before and after adding a perceptual-hash comparison between consecutive screenshots, so that near-identical frames are skipped instead of being sent for inference. This is a real measurement — I counted the tokens.",
      },
    ],
    overview: [
      "Anchor detects when a user has drifted off-task and intervenes twice over: it speaks to them, and it overlays a notification on screen. Built by a team of four at DeltaHacks 12 over a weekend.",
      "My scope was the Chrome extension itself, the integration of the AI-based detection and summarization, and the integration of an eye-tracking module. That eye-tracking model was custom-trained by a teammate, not by me — I integrated it.",
    ],
    challenge: [
      "Detecting distraction means continuously interpreting what is on screen, and the naive implementation of that is to screenshot on an interval and send every frame to a model. That is both expensive and wasteful, because most consecutive frames of someone working are nearly identical.",
    ],
    decisions: [
      {
        title: "Skip near-identical frames with perceptual hashing",
        body: "Before sending a screenshot for inference, the extension computes a perceptual hash and compares it to the previous frame's. Visually near-identical frames are dropped. A perceptual hash — rather than an exact hash — is essential here, because a blinking cursor or a scrolling pixel changes an exact hash while changing nothing that matters semantically. This cut token usage by 75%, which I verified by counting tokens before and after. It is also a good example of a cheap local computation replacing an expensive remote one.",
      },
      {
        title: "Intervene in two modalities",
        body: "An on-screen overlay is easy to ignore when you are already not looking at the thing you should be. Speech via ElevenLabs is harder to tune out. Doing both covers the case where the user's attention has already left the screen, which is precisely the case the tool exists for.",
      },
    ],
    outcome: [
      "A working end-to-end tool: browser extension, distraction detection, spoken and on-screen intervention.",
      "75% reduction in token usage from the perceptual-hash frame filter, measured directly.",
    ],
    limitations: [
      "We did not place at DeltaHacks 12.",
      "Weekend hackathon scope, with the reliability that implies.",
      "The eye-tracking model was trained by a teammate. My contribution there was integration.",
    ],
    links: [{ label: "Devpost", href: "https://devpost.com/software/anchor-ewiqn2" }],
  },

  {
    slug: "adaptive-pulse",
    title: "Authentication, ETL and RAG for a B2B SaaS Platform",
    tagline:
      "Introducing login to a product that had none, then bulk document import and AI summarization on top of it.",
    discipline: "software",
    kind: "Full-stack product work",
    context: "Adaptive Pulse",
    timeframe: "May – Aug 2024",
    weight: 56,
    featured: false,
    status: "shipped",
    role:
      "Three workstreams over one co-op term, on a small team: OAuth2 SSO and cloud-storage connectors, continuous ETL into Supabase, and a RAG summarization service.",
    team: "Small team: two co-op students, a couple of engineers, a PM, and the CEO and CTO",
    stack: [
      "OAuth2",
      "Google Drive API",
      "Dropbox API",
      "Supabase",
      "Airbyte",
      "LangChain.js",
      "pgvector",
      "OpenAI embeddings",
    ],
    metrics: [
      {
        value: "~30%",
        label: "Reduction in document review time",
        basis: "estimated",
        note: "My own informal timing comparison of the old manual process against the new summarization flow. Not a controlled benchmark, and output quality was assessed by eye rather than through any formal evaluation. Both caveats are load-bearing: treat this as a directional estimate.",
      },
      {
        value: "1M+ rows",
        label: "Landed in Supabase via continuous ETL",
        basis: "measured",
        note: "Row count synchronized from client sources into Supabase through the ETL pipeline.",
      },
      {
        value: "0 → SSO",
        label: "Authentication before and after",
        basis: "measured",
        note: "The product had no login functionality whatsoever before this work. This is the contribution I am most confident about, because the before state is unambiguous.",
      },
    ],
    overview: [
      "Adaptive Pulse sold a B2B SaaS product combining taxation services with AI features to over a hundred client companies. I joined as one of two co-op students on a team that also had a couple of engineers, a product manager, and the CEO and CTO.",
      "Three things came out of the term. The product got authentication, which it had entirely lacked. Clients got bulk document import instead of uploading one file at a time. And there was a retrieval-augmented summarization service over their tax filings and financial reports.",
    ],
    challenge: [
      "The starting position was unusual: a product already selling to a hundred-plus client companies with no login functionality at all, and no cloud storage integration — clients uploaded documents one file at a time. Both of those are the sort of gap that gets more expensive to close the longer a product ships without it.",
      "The documents themselves are the hard part of the AI feature. Tax filings and financial reports are long, structured, and full of numbers where being approximately right is being wrong.",
    ],
    decisions: [
      {
        title: "OAuth2 SSO with connectors to the storage clients already used",
        body: "Rather than building an account system and asking clients to upload into it, I built an OAuth2 single-sign-on flow with connectors to Google Drive, Dropbox and GitHub — Drive and Dropbox being the primary two. This solved authentication and bulk import with the same mechanism: once the user has authorized their storage provider, importing many documents is just an API call rather than a hundred uploads. The decision to support multiple providers came from my supervisor.",
      },
      {
        title: "Retrieval over embeddings rather than stuffing documents into context",
        body: "The summarization service uses LangChain.js with a small OpenAI text embedding model and pgvector on Supabase for vector storage. Retrieving the relevant passages and summarizing those, rather than sending whole filings to a model, is what made it workable over documents of that length — and keeping vectors in Postgres via pgvector meant no separate vector database to operate, which matters on a team that size.",
      },
      {
        title: "The genuinely hard part was a file picker",
        body: "The most difficult piece of this work was not the AI feature — it was Google's file picker API and its poor documentation. I mention it because it is representative of real product engineering in a way that an architecture diagram is not: the integration nobody budgets time for is usually the one that consumes it.",
      },
    ],
    outcome: [
      "The product went from no authentication to OAuth2 SSO with cloud storage connectors, and from single-file uploads to bulk import for 100+ client companies.",
      "A continuous ETL pipeline landing over a million rows into Supabase.",
      "A working RAG summarization service over client tax filings and financial reports, which I estimate cut document review time by around 30%.",
    ],
    limitations: [
      "I hit repeated transmission errors with Airbyte on the ETL pipeline and was not able to resolve them. Airbyte was my supervisor's choice of tool; the failure to get it fully reliable is mine to report either way.",
      "The ~30% figure is my own informal timing comparison, not a controlled benchmark.",
      "Output quality of the summarization service was assessed by eye. There was no formal evaluation — no golden set, no scored rubric.",
      "I do not recall which specific OpenAI embedding model was used, so I have not named one.",
    ],
  },

  {
    slug: "promotions-platform",
    title: "Coupon and Promotion Platform Maintenance",
    tagline:
      "Four months inside one of JD.com's largest internal platforms: shipping small changes to a large codebase I did not write.",
    discipline: "software",
    kind: "Backend maintenance",
    context: "JD.com, Beijing",
    timeframe: "Jan – Apr 2025",
    weight: 42,
    featured: false,
    status: "shipped",
    role:
      "Backend developer on an existing platform: a new submission form, a bug fix with alerting, frontend rendering fixes, and database indexes.",
    stack: ["Java", "Spring Boot", "SQL", "Redis / Kafka (adjacent)"],
    metrics: [
      {
        value: "500k+ daily",
        label: "Transactions on the platform I worked in",
        basis: "inherited-scale",
        note: "This is a property of the platform as I found it, not a result I produced. The same goes for its availability. I am including it because it describes the environment I was operating in — code review standards, blast radius, caution — and for no other reason. It is not an achievement of mine and should never be read as one.",
      },
      {
        value: "3 issues",
        label: "Driven to resolution with product managers",
        basis: "measured",
        note: "Three product-manager-reported platform issues taken from report to resolution over four months, which involved direct communication with the PMs rather than picking tickets off a board.",
      },
    ],
    overview: [
      "One of JD.com's largest internal platforms, used by hundreds of marketing employees to issue coupons and determine promotion eligibility. Spring Boot, with Redis and Kafka in the stack, though my work sat above those layers rather than engaging with them deeply.",
      "I want to frame this term accurately, because my first instinct was to dismiss it as \"not much work\" and that undersells it. I shipped a new form, fixed a submission bug and added alerting for it, cleared up frontend rendering defects, and added database indexes. That is ordinary, necessary early-career engineering, and the skill it actually built was navigating and safely changing a very large codebase somebody else wrote.",
    ],
    challenge: [
      "The difficulty in this kind of work is not algorithmic, it is orientation. Finding the right thirty lines to change in a platform of that size — and being confident that changing them will not affect coupon issuance for hundreds of employees — takes most of the time. Writing the change takes very little of it.",
    ],
    decisions: [
      {
        title: "Reuse the existing alert class instead of building notification logic",
        body: "A form was failing to submit under an edge case. Fixing the bug was straightforward; the more useful part was adding an alert so that case, and other issues product managers had reported, would surface on their own next time. I did that by reusing an alert object class already used elsewhere in the system rather than writing new notification machinery — about thirty lines of code total. In an unfamiliar codebase of that size, finding the existing abstraction is almost always the right move over introducing a parallel one.",
      },
      {
        title: "Add indexes rather than restructure queries",
        body: "Some of the slowness I encountered was addressable with database indexes. That is the lowest-risk intervention available on a platform with that transaction volume, and the appropriate one for someone four months into a codebase.",
      },
      {
        title: "Work the issues directly with product managers",
        body: "Three platform issues came from product managers, and two of the three turned out to be frontend rendering defects rather than backend faults. Working directly with the PMs over four months to reproduce, diagnose and confirm the fixes was more of the job than the code was — and diagnosing that a reported \"backend\" problem is actually a rendering problem is itself the useful contribution.",
      },
    ],
    outcome: [
      "A new coupon and promotion submission form with supervisor review, shipped into the platform.",
      "A submission edge case fixed and made self-reporting through existing alerting.",
      "Three product-manager-reported issues driven to resolution, two of which were frontend rendering defects.",
      "Experience writing design documents, participating in code review, and debugging a large unfamiliar codebase — which is what I actually took away from the term.",
    ],
    limitations: [
      "The platform's 500,000+ daily transactions and its availability are properties of the system I inherited. They are context for the environment, not results I produced.",
      "I wrote no tests and did no CI/CD work during this term.",
      "There is no measured performance delta from my changes, including the indexes.",
      "Redis and Kafka were in the stack but my work sat above them. I would not claim depth in either from this term.",
    ],
  },
];
