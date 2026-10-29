/**
 * Real and featured projects for Sai Babu Polisetti.
 */

export interface FeaturedProject {
  id: string
  title: string
  subtitle: string
  badge: string
  status: 'published' | 'in-progress'
  repoUrl: string
  liveUrl?: string
  description: string
  keyMetrics: { label: string; value: string }[]
  tags: string[]
  architecture: {
    title: string
    steps: { step: string; detail: string; tech: string }[]
  }
  demoType: 'voice-agent' | 'rag-system' | 'vlm-multimodal'
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'voice-agent',
    title: 'Low-Latency Streaming Voice AI Agent',
    subtitle: 'End-to-end speech assistant chaining STT, streaming LLM, and TTS with local CPU fallback.',
    badge: 'Flagship Project',
    status: 'published',
    repoUrl: 'https://github.com/Sairam-24/voice_agent',
    description:
      'Chains speech-to-text, LLM generation, and neural speech synthesis with sub-sentence streaming. Synthesis begins on the first sentence while the model continues generating the reply. Designed with concurrency controls, barge-in cancellation, and multilingual support in English, Hindi, Spanish, and Telugu.',
    keyMetrics: [
      { label: 'First Audio', value: '~2.5s (2-Core CPU)' },
      { label: 'Test Coverage', value: '270+ BE / 44 FE Tests' },
      { label: 'Languages', value: 'EN · HI · ES · TE' },
    ],
    tags: ['Python', 'FastAPI', 'WebSockets', 'faster-whisper', 'Ollama', 'Gemini API', 'Kokoro TTS', 'React'],
    architecture: {
      title: 'Streaming Audio Pipeline',
      steps: [
        { step: '01. Audio Ingest', detail: 'WebSocket 24kHz stream with VAD & dynamic task context', tech: 'faster-whisper' },
        { step: '02. Stream Inference', detail: 'Token streaming with per-await deadlines & bounded queue', tech: 'Ollama / Gemini' },
        { step: '03. Audio Synthesis', detail: 'Sentence-chunked audio generation with barge-in cancellation', tech: 'Piper / Kokoro' },
        { step: '04. Client Playback', detail: 'PCM chunk playback with zero stuttering and low latency', tech: 'Web Audio API' },
      ],
    },
    demoType: 'voice-agent',
  },
  {
    id: 'rag-document-agent',
    title: 'Multimodal RAG & Document Intelligence',
    subtitle: 'Production-ready RAG system answering questions with inline passage citations and zero hallucination.',
    badge: 'Upcoming Release',
    status: 'in-progress',
    repoUrl: 'https://github.com/Sairam-24/voice_agent',
    description:
      'Document parsing and Q&A engine supporting PDF, DOCX, and unstructured text. Combines hybrid dense vector search with BM25 keyword ranking within a strict model context budget. Prompts isolate retrieved passages as data to mitigate prompt injection.',
    keyMetrics: [
      { label: 'Retrieval Strategy', value: 'Hybrid BM25 + Dense' },
      { label: 'Hallucination Defense', value: 'Abstention Threshold' },
      { label: 'Supported Files', value: 'PDF · DOCX · TXT' },
    ],
    tags: ['Python', 'LangChain', 'pgvector', 'PostgreSQL', 'BM25', 'FastAPI', 'Docker'],
    architecture: {
      title: 'Hybrid Retrieval Pipeline',
      steps: [
        { step: '01. Document Parse', detail: 'Extract tables, structure and metadata chunks', tech: 'PyPDF / Docx' },
        { step: '02. Dual Indexing', detail: 'Generate dense embeddings and BM25 inverted index', tech: 'pgvector + BM25' },
        { step: '03. Hybrid Retrieval', detail: 'Reciprocal Rank Fusion with evidence score gate', tech: 'Hybrid Search' },
        { step: '04. Grounded Gen', detail: 'Passage citation attribution with strict hallucination check', tech: 'LLM Generator' },
      ],
    },
    demoType: 'rag-system',
  },
  {
    id: 'vlm-inspection',
    title: 'Multimodal Industrial Inspection Pipeline',
    subtitle: 'High-throughput computer vision pipeline powering automated quality audits.',
    badge: 'Production Proven',
    status: 'published',
    repoUrl: 'https://github.com/Sairam-24',
    description:
      'Reduced median processing latency by 33% by orchestrating CPU-intensive preprocessing in parallel with GPU Vision-Language Model inference. Reduced database save time for 23 inspection photos from 28s to under 1s using batched PostgreSQL transactions.',
    keyMetrics: [
      { label: 'Latency Reduction', value: '-33% Median Latency' },
      { label: 'Throughput Gain', value: '+22% Concurrency' },
      { label: 'Batch Write Speed', value: '28s → <1s (23 Photos)' },
    ],
    tags: ['Python', 'Vision-Language Models', 'PostgreSQL', 'Docker', 'Asyncio', 'REST APIs'],
    architecture: {
      title: 'Parallel Inspection Pipeline',
      steps: [
        { step: '01. Photo Batch Ingest', detail: 'Multi-device capture with automated compression', tech: 'Asyncio Worker' },
        { step: '02. Parallel Preprocessing', detail: 'CPU preprocessing overlaps with active GPU batch', tech: 'Thread Worker Pool' },
        { step: '03. VLM Evaluation', detail: 'Zero-shot fault detection and defect classification', tech: 'GPU VLM Engine' },
        { step: '04. Batched DB Commit', detail: 'Atomic multi-photo transaction written in <1s', tech: 'PostgreSQL' },
      ],
    },
    demoType: 'vlm-multimodal',
  },
]

