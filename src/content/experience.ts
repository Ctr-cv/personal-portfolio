import type { Role } from "./types";

/** Most recent first, with Lansi placed before the overlapping JD.com term. */
export const roles: Role[] = [
  {
    slug: "huawei",
    company: "Huawei Technologies Canada",
    title: "Software Engineer Intern",
    location: "Markham, ON",
    timeframe: "Sept 2025 – Apr 2026",
    start: "2025-09",
    end: "2026-04",
    context:
      "Eight-months co-op term @ Huawei Human-Machine Interaction Lab. My work spans computer vision, machine learning, OS-level agent architecture, mobile development and latency optimization.",
    contributions: [
      "Owned a cycling-route extraction pipeline end to end: recovering ordered geographic landmarks from unconstrained screenshots via morphological image processing, then snapping them to real routes through a maps routing service. Cut per-image runtime from roughly 30s to 12–15s.",
      "Fine-tuned a YOLO26 detector for in-pipeline map icon detection on a self-curated 2,300-image dataset — a class absent from pretraining — reaching 98% mAP@50 with mosaic and flip augmentation.",
      "Co-proposed and built a Windows desktop agent that learns repeated user workflows from OS-level event capture and replays them through computer-use tool calls, with fuzzy sliding-window matching over a prefix tree of skills in ChromaDB.",
      "Built the entire frontend for a multi-person voice assistant mode gating replies on voiceprint identity, and cut median response latency from 7–8s to under 3s by running streaming VAD, model inference and TTS concurrently.",
      "Co-built a multi-device live speech demo on HarmonyOS in ArkTS, running LiveKit's JavaScript API inside an ArkWeb web view because no native HarmonyOS SDK existed.",
      "Parallelized team's ONNX model-export pipeline around pthreads to fix performance issues and debugged the file-generation path.",
    ],
    beyondCode: [
      "Pitched approaches to my supervisor and to the full twelve-person team in standups, including frontend design proposals and optimizations to existing projects.",
      "Ran design reviews and helped other team members with their own projects.",
      "Managed the team's local agent testing setup on a small 7B model and reported findings back to the team.",
      "Became a main communicator in several headquarters group chats because I speak Mandarin, recorded demo videos and photography for headquarters leadership, and collected voice data on behalf of other teams.",
    ],
    metrics: [
      {
        value: "5 projects",
        label: "In one eight-month term",
        basis: "measured",
        note: "Five distinct projects across computer vision, ML, agent architecture, mobile development and latency optimization. The breadth is the notable part — most of these are normally separate specialties.",
      },
    ],
    stack: [
      "Python",
      "C++",
      "ArkTS",
      "AsyncIO",
      "OpenCV",
      "YOLO26",
      "ChromaDB",
      "ONNX Runtime",
      "HarmonyOS",
    ],
    projects: [
      "route-extraction",
      "voice-agent-latency",
      "workflow-agent",
      "multi-device-speech",
      "onnx-export-parallelism",
    ],
    scopeNote:
      "Much of this work touches internal and unreleased systems. Everything here is described at the level of engineering problem and technique; internal service names, model families and version numbers are deliberately omitted.",
  },

  {
    slug: "lansi-ai",
    company: "Shenzhen Lansi Institute of AI",
    title: "Data Analyst Intern",
    location: "Remote",
    timeframe: "Dec 2024 – Mar 2025",
    start: "2024-12",
    end: "2025-03",
    context:
      "Supported cancer-research data analysis and literature review using open-source clinical and gene-expression datasets.",
    contributions: [
      "Used R and Python to explore clinical and gene-expression data drawn from a global collection of 500,000 open-source cancer-research samples.",
      "Gathered research inputs through web scraping and Python-assisted literature review, using Zotero to organize recent medical papers.",
      "Built automated scrapers to aggregate literature and applied neural-network and statistical prediction procedures, including Lasso and Cox regression, in support of research on model predictions.",
    ],
    metrics: [
      {
        value: "500k",
        label: "Open-source samples analyzed",
        basis: "inherited-scale",
        note: "The size of the source dataset, not samples collected or generated during the internship.",
      },
    ],
    stack: ["R", "Python", "Web scraping", "Lasso regression", "Cox regression", "Zotero"],
  },

  {
    slug: "jd",
    company: "JD.com",
    title: "Backend Developer",
    location: "Beijing, China",
    timeframe: "Jan – Apr 2025",
    start: "2025-01",
    end: "2025-04",
    context:
      "Worked on one of JD.com's largest internal platforms — coupon issuance and promotion eligibility, used by hundreds of marketing employees. Spring Boot, with Redis and Kafka in the stack.",
    contributions: [
      "Implemented a new coupon/promotion review submission workflow, allowing employees to submit coupons and promotions for supervisor review.",
      "Debugged an edge case causing that form to fail to submit, and added alert notifications for it by reusing an alert object class already used elsewhere in the system to fix PM-reported issues.",
      "Fixed frontend rendering defects, which accounted for two of the three issues product managers had raised.",
      "Added promotion query paths via target database indexing",
      "Wrote design documents, participated in code review, and worked directly with product managers to drive three platform issues to resolution over four months.",
    ],
    metrics: [
      {
        value: "500k+ daily",
        label: "Transactions on the platform",
        basis: "inherited-scale",
        note: "A property of the platform as I found it, along with its high availability. Context for the environment I was working in — code review standards and blast radius — and explicitly not a result I produced.",
      },
    ],
    stack: ["Java", "Spring Boot", "SQL", "Vue"],
    projects: ["promotions-platform"],
    scopeNote:
      "The platform's transaction volume and availability were inherited, not produced by me. I wrote no tests and did no CI/CD work this term, and I have no measured performance delta to report. What I gained was the ability to navigate and safely change a very large codebase somebody else wrote.",
  },

  {
    slug: "adaptive-pulse",
    company: "Adaptive Pulse",
    title: "Full Stack Developer",
    location: "Toronto, ON",
    timeframe: "May – Aug 2024",
    start: "2024-05",
    end: "2024-08",
    context:
      "A small company selling a B2B SaaS product combining taxation services with AI features to 100+ client companies. Small team of CEO, CTO, core engineers and co-ops.",
    contributions: [
      "Introduced authentication to a product that had none: an OAuth2 single-sign-on flow with connectors to Google Drive, Dropbox and GitHub, so client companies could bulk-import documents instead of uploading one file at a time.",
      "Built a continuous ETL synchronization from client sources into Supabase using Airbyte, landing over a million rows.",
      "Built a retrieval-augmented summarization service over client tax filings, office documents and financial reports using LangChain.js, OpenAI embeddings and pgvector on Supabase.",
    ],
    metrics: [
      {
        value: "~30%",
        label: "Reduction in document review time",
        basis: "estimated",
        note: "My own informal timing comparison of the old process against the new one. Output quality was assessed by eye, with no formal evaluation. Directional, not a benchmark.",
      },
      {
        value: "1M+ rows",
        label: "Synchronized into Supabase",
        basis: "measured",
        note: "Rows landed through the continuous ETL pipeline.",
      },
    ],
    stack: [
      "TypeScript",
      "OAuth2",
      "Supabase",
      "Airbyte",
      "LangChain.js",
      "pgvector",
    ],
    projects: ["adaptive-pulse"],
    scopeNote:
      "I hit repeated Airbyte transmission errors on the ETL pipeline that I was not able to resolve. Airbyte and the multi-provider requirement were both my supervisor's decisions.",
  },

  {
    slug: "chinese-academy-sciences",
    company: "Chinese Academy of Sciences",
    title: "Research Intern",
    location: "Beijing, China",
    timeframe: "May – Aug 2023",
    start: "2023-05",
    end: "2023-08",
    context:
      "Contributed to deep-sea chassis research alongside five PhD students and a doctoral advisor, focusing on thermal simulation and mechanical design.",
    contributions: [
      "Worked on 3D modelling and CAD for the chassis using COMSOL and SolidWorks.",
      "Ran more than 100 COMSOL simulations to evaluate thermal behavior and compare heat-sink configurations.",
      "Proposed a heat-sink design whose simulated heat-efficiency result improved by 23% over the comparison design.",
    ],
    metrics: [
      {
        value: "100+",
        label: "COMSOL simulations",
        basis: "measured",
        note: "Simulation-run count completed during the research internship.",
      },
      {
        value: "23%",
        label: "Simulated heat-efficiency improvement",
        basis: "tool-reported",
        note: "A COMSOL simulation result for the proposed heat-sink design, not a physical-hardware measurement.",
      },
    ],
    stack: ["COMSOL", "SolidWorks", "3D modelling", "CAD", "Thermal simulation"],
  },
];

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
