/**
 * Professional work experience data reflecting real production engineering.
 */

export type ExperienceBullet = {
  icon: 'lightbulb' | 'code' | 'database' | 'users' | 'image' | 'box' | 'cloud' | 'monitor' | 'settings'
  text: string
  highlights?: string[]
}

export type ExperienceMetric = {
  value: string
  label: string
  colorClass: 'cyan' | 'emerald' | 'violet' | 'amber'
}

export type ExperienceSpecialCard = {
  id: string
  title: string
  tag: string
  icon: 'zap' | 'cost' | 'cpu'
  metrics?: ExperienceMetric[]
  tags?: string[]
  description: string
}

export type ExperienceEntry = {
  id: string
  role: string
  company: string
  companyNote: string
  dates: string
  location: string
  status: 'Current Role' | 'Previous Role'
  skills: string[]
  bullets: ExperienceBullet[]
  specialCards?: ExperienceSpecialCard[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'ai-engineer',
    role: 'AI Engineer',
    company: 'Eliteus InfoTech',
    companyNote: 'Applied AI, multimodal systems & backend engineering.',
    dates: 'Jan 2025 – Present',
    location: 'Hyderabad, India',
    status: 'Current Role',
    skills: ['Python', 'FastAPI', 'LLMs', 'RAG', 'Agentic AI', 'Amazon Bedrock', 'Docker', 'Git'],
    bullets: [
      {
        icon: 'lightbulb',
        text: 'Built and integrated generative AI applications using hosted APIs (e.g., OpenAI, Gemini) and locally run models for text, image, audio and video use cases.',
        highlights: ['generative AI applications'],
      },
      {
        icon: 'code',
        text: 'Designed and developed REST APIs and backend services for LLM-powered features and scalable application workflows.',
        highlights: ['REST APIs', 'backend services'],
      },
      {
        icon: 'database',
        text: 'Implemented RAG workflows for document ingestion, retrieval and grounded responses using vector search and embeddings.',
        highlights: ['RAG workflows'],
      },
      {
        icon: 'users',
        text: 'Developed agentic AI workflows and group-chat multi-agent collaboration for task decomposition and coordinated outputs.',
        highlights: ['agentic AI workflows', 'group-chat multi-agent collaboration'],
      },
      {
        icon: 'image',
        text: 'Researched and evaluated multimodal models across text, images, audio, video and documents, comparing quality, latency, cost and hardware requirements.',
        highlights: ['multimodal models'],
      },
      {
        icon: 'box',
        text: 'Packaged services using Docker and used Git branching, commits and merges for version control.',
        highlights: ['Docker', 'Git'],
      },
      {
        icon: 'cloud',
        text: 'Explored Amazon Bedrock for managed foundation-model access and experimentation.',
        highlights: ['Amazon Bedrock'],
      },
    ],
    specialCards: [
      {
        id: 'perf-db',
        title: 'Measured Performance & DB Batching',
        tag: 'Sub-Second Execution',
        icon: 'zap',
        metrics: [
          { value: '33% ↓', label: 'Lower median latency', colorClass: 'cyan' },
          { value: '22% ↑', label: 'Higher throughput', colorClass: 'emerald' },
          { value: '28s → <1s', label: 'Batched DB writes', colorClass: 'violet' },
        ],
        description:
          'Batched photo saves and metadata operations into unified atomic PostgreSQL transactions with concurrent CPU worker pools.',
      },
      {
        id: 'llm-cost',
        title: 'LLM Cost-Efficient Architecture',
        tag: 'Token & Cost Optimization',
        icon: 'cost',
        tags: ['Tiered Model Routing', 'Prompt Caching', 'Token Compression'],
        description:
          'Routed high-volume classification to local SLMs and complex reasoning to frontier APIs, pairing prompt caching and token pruning to cut inference costs by over 50%.',
      },
      {
        id: 'parallel-compute',
        title: 'Parallel CPU & GPU Pipelines',
        tag: 'Heterogeneous Compute',
        icon: 'cpu',
        tags: ['Zero Idle GPU', 'Async Worker Pools', 'Parallel I/O & VLM'],
        description:
          'Decoupled CPU-bound image/audio preprocessing from GPU VLM/LLM inference in concurrent non-blocking worker pools, maximizing GPU saturation without idle cycles.',
      },
    ],
  },
  {
    id: 'software-developer-trainee',
    role: 'Software Developer Trainee',
    company: 'Eliteus InfoTech',
    companyNote: 'Contributed to full-stack development and backend systems.',
    dates: 'Jan 2024 – Dec 2024',
    location: 'Hyderabad, India',
    status: 'Previous Role',
    skills: ['Java', 'REST APIs', 'React', 'SQL', 'Microservices'],
    bullets: [
      {
        icon: 'code',
        text: 'Developed backend services using Java, Spring Boot and built REST APIs for application features.',
        highlights: ['backend services'],
      },
      {
        icon: 'database',
        text: 'Designed and optimized relational database schemas and queries for better performance.',
        highlights: ['database schemas'],
      },
      {
        icon: 'monitor',
        text: 'Built reusable and interactive UI components using React.',
        highlights: ['UI components', 'React'],
      },
      {
        icon: 'settings',
        text: 'Integrated frontend and backend services to deliver complete end-to-end features.',
        highlights: ['frontend and backend services'],
      },
      {
        icon: 'users',
        text: 'Worked with a modular codebase and followed Git branching, commits and pull merges.',
        highlights: ['Git'],
      },
    ],
  },
]
