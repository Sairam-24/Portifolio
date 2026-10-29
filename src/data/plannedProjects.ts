/**
 * Independent projects. NONE of these are built yet.
 *
 * Status rules (please keep them honest):
 *  - 'planned'      nothing public exists. No demo, screenshot, metric or repo link.
 *  - 'in-progress'  a public repo exists with real commits. Add `repoUrl`.
 *  - 'published'    it runs, it is documented, and the README states its limits.
 *
 * Add `repoUrl` only when the repository is public and has real content. Never
 * add demo links, screenshots or results before they exist.
 */

import type { FlowStage } from './caseStudies'

export type ProjectStatus = 'planned' | 'in-progress' | 'published'

export type RoadmapPhase = {
  phase: string
  title: string
  /** Rough effort for one person working part-time. An estimate, not a promise. */
  estimate: string
  tasks: string[]
}

export type PlannedProject = {
  id: string
  name: string
  status: ProjectStatus
  repoUrl?: string
  tagline: string
  whyItMatters: string
  features: string[]
  stack: { layer: string; choice: string }[]
  architecture: { title: string; stages: FlowStage[] }
  evaluation: string[]
  roadmap: RoadmapPhase[]
  /** What must be true before the status can change to 'published'. */
  doneWhen: string[]
}

export const plannedProjects: PlannedProject[] = [
  {
    id: 'rag-assistant',
    name: 'RAG research assistant with citations',
    status: 'planned',
    tagline: 'Answers questions from a fixed set of public documents and shows exactly which passages support each answer.',
    whyItMatters:
      'RAG is a core skill for LLM engineering roles, and a public project with an honest evaluation shows retrieval quality, grounding and judgment about when the system should say “I don’t know”.',
    features: [
      'Ingestion of a small, freely licensed public document set (parsing, chunking, metadata).',
      'Answers with inline citations that link back to the source passage.',
      'Abstains when retrieved evidence is weak instead of guessing.',
      'Hybrid retrieval (keyword plus vector) behind a switch, so its effect can be measured.',
      'An evaluation harness: a hand-written question set with expected source passages.',
      'Reproducible setup with one command and a documented list of limitations.',
    ],
    stack: [
      { layer: 'Language & API', choice: 'Python with Flask (already familiar) or FastAPI if streaming is wanted' },
      { layer: 'Vector store', choice: 'PostgreSQL with pgvector, building on existing PostgreSQL experience' },
      { layer: 'Embeddings', choice: 'An open-source sentence embedding model, runnable locally at no cost' },
      { layer: 'LLM', choice: 'A local model through Ollama, with a hosted API as an optional alternative' },
      { layer: 'Interface', choice: 'Small React page that shows answers beside their sources' },
      { layer: 'Packaging', choice: 'Docker Compose, pytest, GitHub Actions' },
    ],
    architecture: {
      title: 'Proposed architecture',
      stages: [
        { title: 'Ingest', note: 'Public documents → parse → chunk with metadata.' },
        { title: 'Index', note: 'Embeddings and keyword index stored in PostgreSQL.' },
        { title: 'Retrieve', note: 'Hybrid search, optional reranking, evidence threshold.' },
        { title: 'Generate', note: 'LLM answers only from the retrieved passages and cites them.' },
        { title: 'Evaluate', note: 'Question set scores retrieval hits and citation accuracy.' },
      ],
    },
    evaluation: [
      '30–50 hand-written questions, each with the passage that answers it.',
      'Retrieval hit rate at k, citation accuracy, and abstention on unanswerable questions.',
      'A results table in the README, including where it fails.',
    ],
    roadmap: [
      {
        phase: 'Phase 0',
        title: 'Scope and repository',
        estimate: '2–3 days',
        tasks: [
          'Choose 20–40 freely licensed public documents and record their licenses.',
          'Write the 30–50 evaluation questions before building anything.',
          'Create the repository with a license, README skeleton and issue list.',
        ],
      },
      {
        phase: 'Phase 1',
        title: 'Baseline pipeline (command line)',
        estimate: '1–2 weeks',
        tasks: [
          'Ingestion, chunking, embeddings and pgvector index.',
          'Retrieve and answer with citations from a script.',
          'Commit early and often so the history shows real progress.',
        ],
      },
      {
        phase: 'Phase 2',
        title: 'Evaluation',
        estimate: '1 week',
        tasks: [
          'Automate the question set and record retrieval and citation scores.',
          'Compare vector only against hybrid retrieval and keep the numbers.',
          'Document failure cases honestly.',
        ],
      },
      {
        phase: 'Phase 3',
        title: 'Interface and hardening',
        estimate: '1 week',
        tasks: [
          'Minimal web interface showing the answer next to its sources.',
          'Tests, Docker Compose and continuous integration.',
        ],
      },
      {
        phase: 'Phase 4',
        title: 'Publish',
        estimate: '2–3 days',
        tasks: [
          'README with architecture, setup, evaluation results and limitations.',
          'Tag v0.1.0, then add the repository link to this site.',
          'Only then change the status here to Published and add real screenshots.',
        ],
      },
    ],
    doneWhen: [
      'A stranger can clone the repository and reproduce the evaluation with the documented commands.',
      'The README reports results, including failures.',
    ],
  },
  {
    id: 'multimodal-json',
    name: 'Multimodal image analysis with structured JSON output',
    status: 'planned',
    tagline: 'Takes an image and returns validated JSON, scored against a small hand-labelled dataset.',
    whyItMatters:
      'It shows how to make a vision-language model dependable enough to build on: a strict output schema, validation, retries, and an evaluation that measures consistency instead of relying on a few good-looking examples.',
    features: [
      'A fixed JSON schema for the output, enforced by validation.',
      'Retry and repair logic for invalid output, with counts of how often it triggers.',
      'A small evaluation set of 50–100 public-domain or openly licensed images with hand-written labels.',
      'Field-level scoring, schema-validity rate, and run-to-run consistency.',
      'Per-image latency recorded alongside quality.',
      'Built on public images only, so no overlap with any employer’s data or domain.',
    ],
    stack: [
      { layer: 'Language & API', choice: 'Python with Flask or FastAPI' },
      { layer: 'Validation', choice: 'Pydantic or JSON Schema' },
      { layer: 'Vision-language model', choice: 'An open model run locally, with a hosted model as an optional comparison' },
      { layer: 'Storage', choice: 'PostgreSQL (or SQLite) for run records and evaluation results' },
      { layer: 'Interface', choice: 'React upload page that displays the validated JSON' },
      { layer: 'Packaging', choice: 'Docker, pytest, GitHub Actions' },
    ],
    architecture: {
      title: 'Proposed architecture',
      stages: [
        { title: 'Upload', note: 'Image through a web page or API call.' },
        { title: 'Prepare', note: 'Validate type and size; resize and normalize.' },
        { title: 'Model', note: 'Vision-language model with a schema-constrained prompt.' },
        { title: 'Validate', note: 'Parse against the schema; retry or flag invalid output.' },
        { title: 'Evaluate', note: 'Compare with labels; record validity, accuracy and latency.' },
      ],
    },
    evaluation: [
      'Hand-labelled set of 50–100 openly licensed images, with sources recorded.',
      'Field-level accuracy, schema-validity rate and agreement across repeated runs.',
      'Latency per image, reported with the hardware used.',
    ],
    roadmap: [
      {
        phase: 'Phase 0',
        title: 'Task, schema and dataset',
        estimate: '3–4 days',
        tasks: [
          'Pick a public-domain task, for example scene content and image quality issues.',
          'Define the JSON schema and the labelling guide.',
          'Collect and label the images, recording each license.',
        ],
      },
      {
        phase: 'Phase 1',
        title: 'Single-image pipeline',
        estimate: '1 week',
        tasks: [
          'Model call, parsing and validation from a script.',
          'Retry and repair path with counters.',
        ],
      },
      {
        phase: 'Phase 2',
        title: 'Evaluation and consistency',
        estimate: '1 week',
        tasks: [
          'Score the dataset and repeat runs to measure consistency.',
          'Write down the error categories and where the model struggles.',
        ],
      },
      {
        phase: 'Phase 3',
        title: 'Web interface',
        estimate: '1 week',
        tasks: [
          'Upload page that shows image, JSON and validation status.',
          'Tests and continuous integration.',
        ],
      },
      {
        phase: 'Phase 4',
        title: 'Publish',
        estimate: '2–3 days',
        tasks: [
          'README with schema, dataset notes, results and limitations.',
          'Tag v0.1.0 and add the repository link to this site.',
        ],
      },
    ],
    doneWhen: [
      'The dataset, labels and evaluation script are in the repository and the numbers are reproducible.',
      'Failure categories are documented, not hidden.',
    ],
  },
  {
    id: 'inference-benchmark',
    name: 'AI inference benchmarking dashboard',
    status: 'planned',
    tagline: 'Runs the same workload against different models or settings and compares latency, throughput and output quality.',
    whyItMatters:
      'It turns the measurement discipline from professional work into something public: a reproducible benchmark that reports percentiles, hardware and method, and treats quality as a result alongside speed.',
    features: [
      'A command-line runner driven by a config file (models, prompts, concurrency, repeats).',
      'Latency percentiles (p50, p95, p99), time to first token, tokens per second, throughput and error rate.',
      'Quality scoring: exact match or reference checks for structured tasks, with any model-based judging clearly labelled.',
      'Warm-up runs, repeated trials and recorded environment details.',
      'A dashboard that compares runs and exports the raw data.',
      'A written methodology section explaining what the numbers do and do not mean.',
    ],
    stack: [
      { layer: 'Runner', choice: 'Python with asyncio for concurrent load' },
      { layer: 'Targets', choice: 'Local models through Ollama or llama.cpp, optionally a hosted API' },
      { layer: 'Storage', choice: 'SQLite or PostgreSQL, plus raw JSON/CSV exports' },
      { layer: 'API', choice: 'Flask or FastAPI serving results' },
      { layer: 'Dashboard', choice: 'React with a lightweight chart library' },
      { layer: 'Packaging', choice: 'Docker, pytest, GitHub Actions' },
    ],
    architecture: {
      title: 'Proposed architecture',
      stages: [
        { title: 'Config', note: 'Models, prompts, concurrency and repeat counts.' },
        { title: 'Runner', note: 'Warm-up, then timed trials under controlled load.' },
        { title: 'Collect', note: 'Latency, tokens, errors and environment details.' },
        { title: 'Score', note: 'Quality checks against references or rubrics.' },
        { title: 'Dashboard', note: 'Compare runs, inspect distributions, export raw data.' },
      ],
    },
    evaluation: [
      'Each reported number links to raw data that can be re-checked.',
      'Hardware, software versions and settings are saved with every run.',
      'Quality and speed are shown together, never speed alone.',
    ],
    roadmap: [
      {
        phase: 'Phase 0',
        title: 'Methodology first',
        estimate: '2–3 days',
        tasks: [
          'Decide the workloads, metrics and how fairness between targets is kept.',
          'Write the methodology section before writing code.',
        ],
      },
      {
        phase: 'Phase 1',
        title: 'Runner and data capture',
        estimate: '1–2 weeks',
        tasks: [
          'Config-driven runner with warm-up, repeats and concurrency.',
          'Store raw timings plus environment metadata.',
        ],
      },
      {
        phase: 'Phase 2',
        title: 'Quality scoring',
        estimate: '1 week',
        tasks: [
          'Reference-based checks for a structured task.',
          'Optional model-based judging, labelled as such with its limits.',
        ],
      },
      {
        phase: 'Phase 3',
        title: 'Dashboard',
        estimate: '1 week',
        tasks: [
          'Comparison views, percentile charts and raw-data export.',
          'Tests and continuous integration.',
        ],
      },
      {
        phase: 'Phase 4',
        title: 'Publish',
        estimate: '2–3 days',
        tasks: [
          'README with method, results and caveats about what generalizes.',
          'Tag v0.1.0 and add the repository link to this site.',
        ],
      },
    ],
    doneWhen: [
      'Someone else can rerun a benchmark and get comparable shapes of results on their hardware.',
      'The README states plainly what the results do not show.',
    ],
  },
]
