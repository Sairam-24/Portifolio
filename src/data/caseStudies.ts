/**
 * Professional case studies. All three are ANONYMIZED descriptions of work done
 * in a professional setting, not public repositories.
 *
 * Rules these entries follow (keep following them when you edit):
 *  - No company, client or product names, internal screenshots, customer data,
 *    credentials, or source code.
 *  - Workflows are described as generalized patterns, not as the internals of a
 *    specific product. The dialog says so to the reader.
 *  - "contribution" states only what you did. "teamContext" covers shared outcomes.
 *  - Numbers are NOT written in the prose. They come from metrics.ts via
 *    `metricIds`, so removing a metric there removes it everywhere.
 *
 * Review every sentence against what you are allowed to share before publishing.
 */

export type FlowStage = { title: string; note: string }

export type CaseStudy = {
  id: string
  number: string
  title: string
  kind: string
  summary: string
  role: string
  tags: string[]
  icon: 'scan' | 'message' | 'gauge'
  problem: string[]
  flow: { title: string; stages: FlowStage[] }
  sections: { heading: string; body: string }[]
  challengesTitle: string
  challenges: { title: string; text: string }[]
  contribution: string[]
  teamContext: string[]
  /** Ids from metrics.ts. Only metrics with public: true are shown. */
  metricIds: string[]
  methodology?: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'visual-inspection',
    number: '01',
    title: 'AI-assisted visual inspection',
    kind: 'Professional experience · anonymized',
    summary:
      'An image-based workflow that evaluates captured photos against defined criteria and returns a structured result to the host application.',
    role: 'Implementation, model integration, backend, testing',
    tags: ['Computer vision', 'Multimodal AI', 'Python', 'Flask', 'PostgreSQL', 'REST APIs'],
    icon: 'scan',
    problem: [
      'Visual inspection is repetitive, and the outcome can vary from one person to the next. The aim of this kind of product is to let someone capture images in an application, have an AI model assess them against defined criteria, and get back a consistent result they can act on.',
      'The hard part is rarely the model call itself. It is everything around it: getting usable images in, turning model output into something the application can trust, keeping the round trip fast enough for real use, and failing in ways a person can understand.',
    ],
    flow: {
      title: 'Generalized workflow',
      stages: [
        { title: 'Capture', note: 'Images are taken on a device as part of an inspection check.' },
        { title: 'Validate & prepare', note: 'Basic checks on format and quality; inputs are normalized.' },
        { title: 'AI evaluation', note: 'A vision or multimodal model assesses the images against each criterion.' },
        { title: 'Structured result', note: 'Output is parsed and validated against a defined structure.' },
        { title: 'Application', note: 'Results are stored and shown through REST APIs and PostgreSQL.' },
      ],
    },
    sections: [
      {
        heading: 'Image-based AI workflow',
        body: 'Each inspection check is a set of images. The backend passes them through a vision or multimodal model and collects an assessment per criterion, rather than a single free-text answer.',
      },
      {
        heading: 'Structured evaluation',
        body: 'Constraining results to a defined structure makes them testable. Fields can be checked deterministically, compared between runs, and displayed consistently. Output that does not match the structure is treated as a failure to handle, not as data to store.',
      },
      {
        heading: 'Application integration',
        body: 'The AI step sits behind REST endpoints built with Flask, with PostgreSQL holding results and records. A clear boundary around the model call keeps it possible to test, time and improve independently of the user interface.',
      },
    ],
    challengesTitle: 'Reliability challenges this kind of system has to handle',
    challenges: [
      {
        title: 'Variable image quality',
        text: 'Lighting, angle, blur and framing change what a model can fairly judge. Inputs need checking before they are trusted.',
      },
      {
        title: 'Borderline and unstable outputs',
        text: 'Answers on edge cases can differ between runs. Structured outputs and repeated functional tests show where behavior is unstable.',
      },
      {
        title: 'Malformed or partial results',
        text: 'A response can be late, truncated or off-format. Each case needs defined behavior rather than silent failure.',
      },
      {
        title: 'Latency under real use',
        text: 'Inspection happens at a pace set by people, so slow processing or slow saving is felt immediately. See the performance case study.',
      },
    ],
    contribution: [
      'Implemented and integrated model-driven features into the application.',
      'Built backend functionality with Python, Flask, REST APIs and PostgreSQL.',
      'Tested and debugged the end-to-end workflow, including edge cases and integration issues.',
      'Contributed product improvements based on testing and client feedback.',
      'Investigated processing-speed and save-time bottlenecks (see the performance case study).',
    ],
    teamContext: [
      'The product as a whole was delivered by a cross-functional team across development, testing and UI/UX.',
      'I describe my own part on the left and do not claim the product’s overall results as mine alone.',
    ],
    metricIds: [],
  },
  {
    id: 'llm-chatbot',
    number: '02',
    title: 'LLM-powered chatbot and question generation',
    kind: 'Professional experience · anonymized',
    summary:
      'Backend and model integration for conversational and generative features: natural-language chat, plus workflows that generate sets of questions.',
    role: 'LLM integration, prompt and output handling, backend, testing',
    tags: ['Generative AI', 'LLM integration', 'Prompt engineering', 'Flask', 'REST APIs', 'PostgreSQL'],
    icon: 'message',
    problem: [
      'Two related use cases: a chatbot that responds to people in natural language, and a workflow that generates sets of questions from source material. Both rest on the same foundation, a language model behind a dependable backend.',
      'The engineering is in the seams: how prompts are built, how the model’s output is checked and shaped before a user sees it, and what happens when the output is not what was asked for.',
    ],
    flow: {
      title: 'Generalized workflow',
      stages: [
        { title: 'User request', note: 'A chat message or a question-generation task.' },
        { title: 'Backend', note: 'A Flask API validates input and assembles the prompt and context.' },
        { title: 'LLM', note: 'The model is called with defined instructions and an expected output format.' },
        { title: 'Output handling', note: 'Responses are parsed and validated; malformed output is retried or handled.' },
        { title: 'Response', note: 'Returned to the interface and stored in PostgreSQL where needed.' },
      ],
    },
    sections: [
      {
        heading: 'Model integration',
        body: 'The language model is called from the backend rather than the browser, so keys, prompts and policies stay server-side. Routing calls through one integration layer keeps the model, its parameters and its error handling changeable in a single place.',
      },
      {
        heading: 'Prompt and output handling',
        body: 'Prompts are treated as part of the application: written for a clear task, given the context the model needs, and paired with an expected output format. Responses are parsed and validated instead of being passed straight through, so chat replies and question sets have a predictable structure.',
      },
      {
        heading: 'Backend integration',
        body: 'Flask REST endpoints expose chat and generation to the front end, and PostgreSQL holds what has to persist. Request validation, timeouts and error responses are designed so the interface can react sensibly when the model is slow or returns something unusable.',
      },
      {
        heading: 'User experience',
        body: 'In a chat, perceived speed and clarity matter more than in a batch job. Latency, understandable error states and consistent formatting are part of the experience, so they are engineering concerns as much as design ones.',
      },
    ],
    challengesTitle: 'Challenges this kind of feature has to handle',
    challenges: [
      {
        title: 'Output that ignores the format',
        text: 'Models sometimes answer in the wrong shape. Validation and a defined fallback keep that from reaching users.',
      },
      {
        title: 'Prompt changes with side effects',
        text: 'A small prompt edit can change behavior elsewhere. Functional tests with fixed example inputs make regressions visible.',
      },
      {
        title: 'Quality of generated questions',
        text: 'Questions should be answerable, relevant to the source and well formed. Review and spot checks catch what format validation cannot.',
      },
      {
        title: 'Latency and failures',
        text: 'Model calls can be slow or fail. Timeouts, retries and readable error states keep the product usable.',
      },
    ],
    contribution: [
      'Integrated LLM capabilities into backend services and application workflows.',
      'Worked on prompt engineering and on handling of model output.',
      'Built Python and Flask REST endpoints, with PostgreSQL persistence, for the features.',
      'Tested and debugged chat and generation behavior, and contributed product improvements.',
    ],
    teamContext: [
      'These features were delivered with a wider team that included UI/UX and testing.',
      'I describe my own part on the left and do not claim product-level results as mine alone.',
    ],
    metricIds: [],
  },
  {
    id: 'ai-performance',
    number: '03',
    title: 'AI pipeline performance optimization',
    kind: 'Professional experience · anonymized · measured',
    summary:
      'Finding where time was really going in an AI processing workflow, then reducing it and checking the change with before-and-after tests.',
    role: 'Bottleneck investigation, inference workflow, database handling, measurement',
    tags: ['Performance', 'Latency', 'Throughput', 'PostgreSQL', 'Profiling', 'Measurement'],
    icon: 'gauge',
    problem: [
      'An AI workflow can feel slow for reasons that have nothing to do with the model. Time disappears in data handling, in saves, in the way steps are sequenced, and in waiting on work that could overlap.',
      'Optimizing without measuring tends to speed up the wrong thing. This case study is about the loop used to avoid that, and about reporting the outcome honestly.',
    ],
    flow: {
      title: 'Measurement loop',
      stages: [
        { title: 'Baseline', note: 'Time real checks and record the median.' },
        { title: 'Locate', note: 'Split the workflow into stages and find where the time goes.' },
        { title: 'Change', note: 'Make one change at a time, in the inference workflow or database handling.' },
        { title: 'Re-measure', note: 'Repeat with the same method and the same kind of inputs.' },
        { title: 'Compare', note: 'Report the difference with its test conditions.' },
      ],
    },
    sections: [
      {
        heading: 'Bottleneck investigation',
        body: 'Before changing anything I measure. Timing each stage of the workflow replaces guesses with evidence and shows whether time is going to the model, to the data handling around it, or to the application.',
      },
      {
        heading: 'Inference workflow improvements',
        body: 'Orchestrated CPU-intensive preprocessing tasks in parallel with GPU Vision-Language Model inference. This concurrency eliminated dead wait-time on the GPU and reduced median processing latency by 33%.',
      },
      {
        heading: 'Database transaction optimization',
        body: 'Reduced database time for saving 23 photos from 28 seconds to under 1 second by replacing separate write roundtrips with a single batched PostgreSQL atomic transaction.',
      },
    ],
    challengesTitle: 'What makes performance claims easy to get wrong',
    challenges: [
      {
        title: 'Averages hide outliers',
        text: 'A few slow runs can drag a mean around. The median describes the typical case more fairly.',
      },
      {
        title: 'Synthetic inputs flatter results',
        text: 'Real checks include the awkward cases. Measuring on them is slower to set up and more honest.',
      },
      {
        title: 'End-to-end depends on more than code',
        text: 'Devices, networks and usage patterns all affect live throughput, so a result describes one setup, not every setup.',
      },
    ],
    contribution: [
      'Investigated bottlenecks in the AI processing path and the photo-save path.',
      'Implemented changes to the inference workflow and to database transaction handling.',
      'Designed and ran the before-and-after measurements.',
    ],
    teamContext: [
      'Live throughput depends on the whole product, including devices, interface and processing pipeline, so I treat it as a team outcome this work contributed to.',
      'Results describe the tested setup. They are not a guarantee for other environments.',
    ],
    metricIds: ['median-processing-time', 'checks-per-hour', 'save-23-photos'],
    methodology: [
      'Real checks rather than synthetic inputs wherever possible.',
      'Median, not mean, for processing time.',
      'The same method before and after each change.',
      'Throughput measured in live two-device testing.',
      'Results reported with the sample size and test conditions.',
    ],
  },
]
