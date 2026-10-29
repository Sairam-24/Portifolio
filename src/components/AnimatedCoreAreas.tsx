import { Bot, Eye, Mic, Zap } from 'lucide-react'

export function AnimatedCoreAreas() {
  return (
    <div className="core-areas-grid">
      {/* 1. Streaming Voice AI */}
      <div className="core-area-card core-area-card--voice">
        <div className="core-area-anim-header">
          {/* Animated 3D/2D Soundwave Visualizer */}
          <div className="anim-soundwave" aria-hidden="true">
            <span className="wave-line wave-line--1" />
            <span className="wave-line wave-line--2" />
            <span className="wave-line wave-line--3" />
            <span className="wave-line wave-line--4" />
            <span className="wave-line wave-line--5" />
            <span className="wave-line wave-line--6" />
            <span className="wave-line wave-line--7" />
            <span className="wave-line wave-line--8" />
            <span className="wave-line wave-line--9" />
            <span className="wave-line wave-line--10" />
            <span className="wave-line wave-line--11" />
            <span className="wave-line wave-line--12" />
          </div>

          <div className="anim-badge anim-badge--cyan">
            <Mic size={13} />
            <span>&lt; 2.5s First Audio</span>
          </div>
        </div>

        <div className="core-area-content">
          <h4 className="core-area-title">Streaming Voice AI</h4>
          <p className="core-area-desc">
            End-to-end low-latency speech pipelines chaining faster-whisper STT, token-streaming LLMs, and Kokoro/Piper neural TTS with sub-sentence chunking.
          </p>

          <div className="core-area-tags">
            <span className="core-tag">faster-whisper</span>
            <span className="core-tag">24kHz WebSockets</span>
            <span className="core-tag">Barge-In Support</span>
            <span className="core-tag">Kokoro TTS</span>
          </div>
        </div>
      </div>

      {/* 2. Grounded RAG & Document Intelligence */}
      <div className="core-area-card core-area-card--rag">
        <div className="core-area-anim-header">
          {/* Animated Vector Retrieval Radar */}
          <div className="anim-rag-radar" aria-hidden="true">
            <div className="radar-sweep" />
            <div className="radar-node radar-node--1" />
            <div className="radar-node radar-node--2" />
            <div className="radar-node radar-node--3" />
            <div className="radar-ray" />
          </div>

          <div className="anim-badge anim-badge--violet">
            <Bot size={13} />
            <span>Zero Hallucination</span>
          </div>
        </div>

        <div className="core-area-content">
          <h4 className="core-area-title">Grounded RAG &amp; Chatbots</h4>
          <p className="core-area-desc">
            Hybrid dense vector search combined with BM25 keyword ranking, passage citation attribution, and strict context budget guardrails against hallucination.
          </p>

          <div className="core-area-tags">
            <span className="core-tag">pgvector</span>
            <span className="core-tag">BM25 Search</span>
            <span className="core-tag">Citation Gates</span>
            <span className="core-tag">PDF / DOCX</span>
          </div>
        </div>
      </div>

      {/* 3. Multimodal & Vision-Language Models */}
      <div className="core-area-card core-area-card--vlm">
        <div className="core-area-anim-header">
          {/* Animated Optical Inspection Scanner */}
          <div className="anim-vlm-scanner" aria-hidden="true">
            <div className="scan-reticle">
              <span className="reticle-corner reticle-corner--tl" />
              <span className="reticle-corner reticle-corner--tr" />
              <span className="reticle-corner reticle-corner--bl" />
              <span className="reticle-corner reticle-corner--br" />
              <div className="scan-beam" />
              <div className="scan-target-box">
                <span className="scan-tag">Defect: None [99.8%]</span>
              </div>
            </div>
          </div>

          <div className="anim-badge anim-badge--blue">
            <Eye size={13} />
            <span>-33% Latency</span>
          </div>
        </div>

        <div className="core-area-content">
          <h4 className="core-area-title">Multimodal &amp; Computer Vision</h4>
          <p className="core-area-desc">
            Applied Vision-Language Models for automated defect detection, visual inspection, and multi-image evaluation running on parallel CPU/GPU pipelines.
          </p>

          <div className="core-area-tags">
            <span className="core-tag">VLM Inference</span>
            <span className="core-tag">Parallel CPU/GPU</span>
            <span className="core-tag">Inspection Automation</span>
            <span className="core-tag">Dynamic Prompts</span>
          </div>
        </div>
      </div>

      {/* 4. High-Throughput & Concurrency Backends */}
      <div className="core-area-card core-area-card--latency">
        <div className="core-area-anim-header">
          {/* Animated Data Pipeline Stream */}
          <div className="anim-pipeline" aria-hidden="true">
            <div className="pipeline-stream">
              <span className="stream-packet stream-packet--1" />
              <span className="stream-packet stream-packet--2" />
              <span className="stream-packet stream-packet--3" />
            </div>
            <div className="pipeline-nodes">
              <span className="pipe-node">FastAPI</span>
              <span className="pipe-arrow">➔</span>
              <span className="pipe-node pipe-node--worker">Pool</span>
              <span className="pipe-arrow">➔</span>
              <span className="pipe-node pipe-node--db">Postgres</span>
            </div>
          </div>

          <div className="anim-badge anim-badge--green">
            <Zap size={13} />
            <span>28s ➔ &lt; 1s DB</span>
          </div>
        </div>

        <div className="core-area-content">
          <h4 className="core-area-title">Low-Latency Backends</h4>
          <p className="core-area-desc">
            Production Python backends built with FastAPI and Asyncio. Concurrency control, semaphores, load-shedding, and batched atomic PostgreSQL transactions.
          </p>

          <div className="core-area-tags">
            <span className="core-tag">Python &amp; FastAPI</span>
            <span className="core-tag">Asyncio</span>
            <span className="core-tag">PostgreSQL</span>
            <span className="core-tag">Docker</span>
          </div>
        </div>
      </div>
    </div>
  )
}
