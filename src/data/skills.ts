/**
 * Technical skills, grouped. Everything here comes from the strengths in your
 * brief. Do NOT add tools, libraries or certifications you have not used for
 * real: interviewers ask about every item on this list.
 *
 * To add a confirmed skill, append a string to the relevant `items` array.
 */

export type SkillIcon = 'brain' | 'sparkles' | 'library' | 'eye' | 'server' | 'database' | 'gauge' | 'git'

export type SkillGroup = {
  id: string
  title: string
  icon: SkillIcon
  blurb: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-ml',
    title: 'AI and machine learning',
    icon: 'brain',
    blurb: 'Putting models to work inside real applications.',
    items: ['Applied AI systems', 'Model integration', 'End-to-end AI application development', 'Inference workflows'],
  },
  {
    id: 'genai',
    title: 'Generative AI and LLM applications',
    icon: 'sparkles',
    blurb: 'Language models as dependable product components.',
    items: ['LLM integration', 'Prompt engineering', 'Output parsing and validation', 'Chatbots', 'Question-generation workflows'],
  },
  {
    id: 'rag',
    title: 'RAG and retrieval',
    icon: 'library',
    blurb: 'Grounding model answers in source material.',
    items: ['Retrieval-augmented generation (RAG)', 'Grounding answers in documents', 'Context design for LLMs'],
  },
  {
    id: 'vision',
    title: 'Computer vision and multimodal AI',
    icon: 'eye',
    blurb: 'Image-based workflows and models that read more than text.',
    items: ['Image-based AI workflows', 'Multimodal model integration', 'Structured evaluation of visual output'],
  },
  {
    id: 'backend',
    title: 'Backend engineering and APIs',
    icon: 'server',
    blurb: 'The services that carry AI features to users.',
    items: ['Python', 'Flask', 'REST API design', 'Service and model integration'],
  },
  {
    id: 'data',
    title: 'Databases and data workflows',
    icon: 'database',
    blurb: 'Storing results and records reliably.',
    items: ['PostgreSQL', 'Transaction handling', 'Persisting AI results and media records'],
  },
  {
    id: 'performance',
    title: 'Performance optimization',
    icon: 'gauge',
    blurb: 'Measure first, then make it faster.',
    items: ['Latency reduction', 'Throughput improvement', 'Inference performance', 'Bottleneck investigation', 'Database transaction optimization'],
  },
  {
    id: 'delivery',
    title: 'Testing, debugging, Git, and delivery',
    icon: 'git',
    blurb: 'Getting work shipped and keeping it working.',
    items: ['Functional testing', 'Debugging', 'Git', 'Client demonstrations', 'Requirement gathering', 'Cross-functional coordination'],
  },
]
