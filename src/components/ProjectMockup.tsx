import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  GitBranch,
  Maximize2,
  Mic,
  MicOff,
  Pause,
  Play,
  ShieldAlert,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'
import { useState } from 'react'
import type { FeaturedProject } from '../data/projects'

interface ProjectMockupProps {
  project: FeaturedProject
}

export function ProjectMockup({ project }: ProjectMockupProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'output' | 'pipeline' | 'terminal'>('demo')
  const [isVoiceActive, setIsVoiceActive] = useState(true)
  const [isScanning, setIsScanning] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'defects'>('all')
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(`git clone ${project.repoUrl}.git`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="project-mockup">
        {/* Browser Top Window Bar */}
        <div className="mockup-window-bar">
          <div className="mockup-window-dots">
            <span className="dot dot--red" />
            <span className="dot dot--amber" />
            <span className="dot dot--green" />
          </div>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mockup-url-bar"
            title="Open repository on GitHub"
          >
            <span className="mockup-url-lock">🔒</span>
            <span className="mockup-url-text">
              github.com/Sairam-24/{project.id === 'voice-agent' ? 'voice_agent' : project.id}
            </span>
            <ExternalLink size={12} className="mockup-url-ext" />
          </a>

          {/* Interactive view tabs */}
          <div className="mockup-tabs">
            <button
              type="button"
              className={`mockup-tab${activeTab === 'demo' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('demo')}
              title="Live interactive application UI"
            >
              <Sparkles size={13} />
              <span>Interactive UI</span>
            </button>
            <button
              type="button"
              className={`mockup-tab${activeTab === 'output' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('output')}
              title="AI Result & Output Close-Up Inspector"
            >
              <BarChart3 size={13} />
              <span>AI Output Inspector</span>
            </button>
            <button
              type="button"
              className={`mockup-tab${activeTab === 'pipeline' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('pipeline')}
              title="Architecture and data-flow pipeline"
            >
              <Activity size={13} />
              <span>Architecture</span>
            </button>
            <button
              type="button"
              className={`mockup-tab${activeTab === 'terminal' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('terminal')}
              title="Terminal commands and server logs"
            >
              <Terminal size={13} />
              <span>Terminal</span>
            </button>
            <button
              type="button"
              className="mockup-tab mockup-tab--expand"
              onClick={() => setIsFullscreen(true)}
              title="Full-size interactive preview"
              aria-label="Open full-size preview modal"
            >
              <Maximize2 size={13} />
              <span className="expand-text">Full Preview</span>
            </button>
          </div>
        </div>

        {/* Main Mockup Screen Body */}
        <div className="mockup-body">
          {/* TAB 1: INTERACTIVE UI */}
          {activeTab === 'demo' && (
            <div className="mockup-demo-view">
              {/* VOICE AGENT DEMO */}
              {project.demoType === 'voice-agent' && (
                <div className="voice-stage">
                  <div className="voice-stage__header">
                    <div className="voice-status">
                      <span className={`voice-status-dot${isVoiceActive ? ' is-pulsing' : ''}`} />
                      <span className="voice-status-label">
                        {isVoiceActive ? 'Voice Stream Active · 24kHz WebSockets' : 'Voice Stream Paused'}
                      </span>
                    </div>
                    <div className="voice-latency-badge">
                      <span>TTFA:</span>
                      <strong>~2.5s</strong>
                      <span className="voice-badge-tag">2-Core Local CPU</span>
                    </div>
                  </div>

                  {/* Equalizer Waveform */}
                  <div className="voice-waveform-container" aria-hidden="true">
                    <div className={`voice-waveform${isVoiceActive ? ' is-active' : ''}`}>
                      {Array.from({ length: 32 }).map((_, i) => (
                        <span
                          key={i}
                          className="waveform-bar"
                          style={{
                            animationDelay: `${(i * 0.04).toFixed(2)}s`,
                            height: isVoiceActive
                              ? `${Math.max(16, (Math.sin(i * 0.4) * 0.5 + 0.5) * 64)}px`
                              : '6px',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Simulated Dialogue Stream */}
                  <div className="voice-chat-feed">
                    <div className="chat-bubble chat-bubble--user">
                      <span className="chat-sender">You (Microphone Speech Ingest)</span>
                      <p className="chat-msg">
                        &ldquo;Explain how sub-sentence chunking lowers speech latency on a local CPU.&rdquo;
                      </p>
                    </div>
                    <div className="chat-bubble chat-bubble--agent">
                      <div className="chat-agent-header">
                        <span className="chat-sender chat-sender--ai">Voice Agent (faster-whisper + Kokoro TTS)</span>
                        <span className="stream-pill">Streaming PCM Audio</span>
                      </div>
                      <p className="chat-msg">
                        &ldquo;Neural TTS begins synthesizing the <strong>first sentence</strong> immediately as it arrives from the LLM,
                        rather than waiting for full completion. First audio is heard in <strong>2.5s</strong> on a 2-core CPU, with real-time
                        barge-in cancellation.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="voice-controls">
                    <button
                      type="button"
                      className={`btn-voice-toggle${isVoiceActive ? ' is-on' : ''}`}
                      onClick={() => setIsVoiceActive(!isVoiceActive)}
                    >
                      {isVoiceActive ? <Mic size={15} /> : <MicOff size={15} />}
                      <span>{isVoiceActive ? 'Mute Microphone Stream' : 'Resume Voice Stream'}</span>
                    </button>

                    <div className="voice-spec-pills">
                      <span className="spec-pill">Multilingual: EN, HI, ES, TE</span>
                      <span className="spec-pill">Zero Dedicated GPU Required</span>
                      <span className="spec-pill">Barge-in VAD Interrupts</span>
                    </div>
                  </div>
                </div>
              )}

              {/* RAG DOCUMENT AGENT DEMO */}
              {project.demoType === 'rag-system' && (
                <div className="rag-stage">
                  <div className="rag-header">
                    <div className="rag-query-box">
                      <span className="rag-query-icon">🔍</span>
                      <span className="rag-query-text">
                        Query: &ldquo;What optimization reduced database transaction time for photo uploads?&rdquo;
                      </span>
                    </div>
                    <span className="rag-guardrail">
                      <ShieldAlert size={14} /> Zero-Hallucination Gate (Score: 0.94 &gt; 0.85)
                    </span>
                  </div>

                  <div className="rag-doc-preview">
                    <div className="rag-doc-card">
                      <div className="rag-doc-meta">
                        <span className="rag-doc-type">PDF SOURCE</span>
                        <strong>production_benchmarks.pdf · Page 4</strong>
                        <span className="rag-score">BM25: 0.94</span>
                      </div>
                      <p className="rag-passage">
                        &ldquo;...batching saves and metadata operations into a single atomic PostgreSQL transaction reduced upload time
                        from <strong>28s to under 1s</strong> for 23 inspection photos...&rdquo;
                      </p>
                      <div className="rag-attribution">
                        <CheckCircle2 size={13} className="text-cyan" />
                        <span>Cited as Primary Evidence (Passage Chunk #12)</span>
                      </div>
                    </div>

                    <div className="rag-doc-card">
                      <div className="rag-doc-meta">
                        <span className="rag-doc-type">DOCX SOURCE</span>
                        <strong>concurrency_architecture.docx · Page 8</strong>
                        <span className="rag-score">Dense Embedding: 0.89</span>
                      </div>
                      <p className="rag-passage">
                        &ldquo;...median processing latency was reduced by <strong>33%</strong> by decoupling CPU preprocessing into background
                        worker threads while the GPU VLM evaluates concurrent batches...&rdquo;
                      </p>
                      <div className="rag-attribution">
                        <CheckCircle2 size={13} className="text-cyan" />
                        <span>Cited as Corroborating Evidence (Passage Chunk #27)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VLM MULTIMODAL INSPECTION DEMO WITH LIVE SCANNER ANIMATION */}
              {project.demoType === 'vlm-multimodal' && (
                <div className="vlm-viewport">
                  {/* Viewport Top Bar */}
                  <div className="vlm-canvas-header">
                    <div className="vlm-feed-status">
                      <span className={`status-dot ${isScanning ? 'status-dot--live' : 'status-dot--paused'}`} />
                      <span className="feed-title">OPTICAL FEED: HIGH-SPEED PRODUCTION LINE</span>
                      <span className="feed-fps">1920x1080 · 60 FPS</span>
                    </div>
                    <div className="vlm-controls-bar">
                      <button
                        type="button"
                        className="vlm-scan-toggle"
                        onClick={() => setIsScanning(!isScanning)}
                      >
                        {isScanning ? <Pause size={12} /> : <Play size={12} />}
                        <span>{isScanning ? 'Pause Scanner' : 'Resume Scanner'}</span>
                      </button>
                      <div className="vlm-filter-pills">
                        <button
                          type="button"
                          className={`filter-btn ${selectedFilter === 'all' ? 'is-active' : ''}`}
                          onClick={() => setSelectedFilter('all')}
                        >
                          All Regions
                        </button>
                        <button
                          type="button"
                          className={`filter-btn ${selectedFilter === 'defects' ? 'is-active' : ''}`}
                          onClick={() => setSelectedFilter('defects')}
                        >
                          Defects Only
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Optical Inspection Canvas */}
                  <div className="vlm-canvas-stage">
                    {/* Industrial Mechanical / Circuit Blueprint Graphics */}
                    <div className="vlm-schematic-bg" aria-hidden="true">
                      <svg viewBox="0 0 800 360" className="vlm-schematic-svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 211, 238, 0.08)" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        {/* Machined Component Outlines */}
                        <rect x="80" y="60" width="640" height="240" rx="16" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(91, 140, 255, 0.3)" strokeWidth="2" />
                        <rect x="120" y="90" width="180" height="180" rx="10" fill="rgba(30, 41, 59, 0.5)" stroke="rgba(34, 211, 238, 0.25)" strokeDasharray="4 4" />
                        <circle cx="210" cy="180" r="54" fill="none" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" />
                        <circle cx="210" cy="180" r="16" fill="rgba(34, 211, 238, 0.2)" stroke="rgba(34, 211, 238, 0.7)" />
                        {/* Weld Joint and Fissure Target Area */}
                        <rect x="340" y="90" width="220" height="180" rx="10" fill="rgba(30, 41, 59, 0.5)" stroke="rgba(239, 68, 68, 0.35)" />
                        <path d="M 370 140 Q 420 185 460 160 T 520 210" fill="none" stroke="rgba(239, 68, 68, 0.9)" strokeWidth="2.5" strokeDasharray="6 2" />
                        {/* Terminal Pins */}
                        <rect x="580" y="90" width="110" height="180" rx="8" fill="rgba(30, 41, 59, 0.5)" stroke="rgba(34, 211, 238, 0.25)" />
                        <line x1="600" y1="120" x2="670" y2="120" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="3" />
                        <line x1="600" y1="150" x2="670" y2="150" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="3" />
                        <line x1="600" y1="180" x2="670" y2="180" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="3" />
                        <line x1="600" y1="210" x2="670" y2="210" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="3" />
                        <line x1="600" y1="240" x2="670" y2="240" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="3" />
                      </svg>
                    </div>

                    {/* LIVE ANIMATED SCANNING LASER BEAM */}
                    {isScanning && <div className="vlm-laser-line" />}

                    {/* REGION 1: DETECTED DEFECT (Micro-Fissure) */}
                    <div className="vlm-target-box vlm-box--defect">
                      <div className="vlm-reticle-corner vlm-corner--tl" />
                      <div className="vlm-reticle-corner vlm-corner--tr" />
                      <div className="vlm-reticle-corner vlm-corner--bl" />
                      <div className="vlm-reticle-corner vlm-corner--br" />
                      <div className="vlm-badge vlm-badge--defect">
                        <span className="pulse-dot" />
                        <strong>CRITICAL DEFECT: Structural Micro-Fissure</strong>
                        <span className="badge-conf">98.4%</span>
                      </div>
                      <span className="vlm-coord-tag">ROI: [340, 90, 220, 180] · REJECT</span>
                    </div>

                    {/* REGION 2: FASTENER TORQUE PASS */}
                    {selectedFilter === 'all' && (
                      <div className="vlm-target-box vlm-box--pass vlm-box--fastener">
                        <div className="vlm-reticle-corner vlm-corner--tl" />
                        <div className="vlm-reticle-corner vlm-corner--tr" />
                        <div className="vlm-reticle-corner vlm-corner--bl" />
                        <div className="vlm-reticle-corner vlm-corner--br" />
                        <div className="vlm-badge vlm-badge--pass">
                          <CheckCircle2 size={11} />
                          <span>TORQUE SPEC: M6 Fastener 12.4 Nm</span>
                          <span className="badge-conf">99.1%</span>
                        </div>
                        <span className="vlm-coord-tag">ROI: [120, 90, 180, 180] · PASS</span>
                      </div>
                    )}

                    {/* REGION 3: PIN TERMINAL ALIGNMENT PASS */}
                    {selectedFilter === 'all' && (
                      <div className="vlm-target-box vlm-box--pass vlm-box--pins">
                        <div className="vlm-reticle-corner vlm-corner--tl" />
                        <div className="vlm-reticle-corner vlm-corner--tr" />
                        <div className="vlm-reticle-corner vlm-corner--bl" />
                        <div className="vlm-reticle-corner vlm-corner--br" />
                        <div className="vlm-badge vlm-badge--pass">
                          <CheckCircle2 size={11} />
                          <span>PIN ALIGNMENT: Tolerance 0.05mm</span>
                          <span className="badge-conf">99.7%</span>
                        </div>
                        <span className="vlm-coord-tag">ROI: [580, 90, 110, 180] · PASS</span>
                      </div>
                    )}

                    {/* Real-Time Telemetry HUD Footer */}
                    <div className="vlm-telemetry-hud">
                      <div className="hud-metric">
                        <span className="hud-lbl">VLM Inference</span>
                        <span className="hud-val">23.2ms</span>
                      </div>
                      <div className="hud-metric">
                        <span className="hud-lbl">Throughput</span>
                        <span className="hud-val">179 checks/hr</span>
                      </div>
                      <div className="hud-metric">
                        <span className="hud-lbl">Batched DB Commit</span>
                        <span className="hud-val">&lt; 1.0s (23 photos)</span>
                      </div>
                      <div className="hud-metric hud-metric--alert">
                        <span className="hud-lbl">Audit Flag</span>
                        <span className="hud-val">LINE DIVERSION TRIGGERED</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AI OUTPUT INSPECTOR (CLOSE-UP / RESULTS) */}
          {activeTab === 'output' && (
            <div className="mockup-inspector-view">
              {project.demoType === 'voice-agent' && (
                <div className="inspector-card">
                  <div className="inspector-head">
                    <span className="inspector-badge">Sub-Sentence Latency Waterfall</span>
                    <h4 className="inspector-title">Breakdown: Utterance End to First Audio PCM Chunk</h4>
                  </div>

                  <div className="waterfall-grid">
                    <div className="waterfall-row">
                      <span className="waterfall-stage">01. VAD Speech Ingest &amp; Buffering</span>
                      <div className="waterfall-bar-track">
                        <div className="waterfall-bar" style={{ width: '8%', background: '#38bdf8' }} />
                      </div>
                      <span className="waterfall-ms">42ms</span>
                    </div>

                    <div className="waterfall-row">
                      <span className="waterfall-stage">02. faster-whisper Transcription</span>
                      <div className="waterfall-bar-track">
                        <div className="waterfall-bar" style={{ width: '18%', background: '#60a5fa' }} />
                      </div>
                      <span className="waterfall-ms">118ms</span>
                    </div>

                    <div className="waterfall-row">
                      <span className="waterfall-stage">03. Ollama / Gemini First Token Stream</span>
                      <div className="waterfall-bar-track">
                        <div className="waterfall-bar" style={{ width: '38%', background: '#818cf8' }} />
                      </div>
                      <span className="waterfall-ms">490ms</span>
                    </div>

                    <div className="waterfall-row">
                      <span className="waterfall-stage">04. Kokoro TTS Sentence-1 Neural Synthesis</span>
                      <div className="waterfall-bar-track">
                        <div className="waterfall-bar" style={{ width: '92%', background: 'linear-gradient(90deg, #22d3ee, #a855f7)' }} />
                      </div>
                      <span className="waterfall-ms">1,850ms</span>
                    </div>
                  </div>

                  <div className="waterfall-summary-box">
                    <div className="summary-stat">
                      <span className="sum-lbl">Time to First Audio (TTFA)</span>
                      <span className="sum-val sum-val--cyan">~2.5s</span>
                      <span className="sum-sub">Local 2-Core CPU Fallback</span>
                    </div>
                    <div className="summary-stat">
                      <span className="sum-lbl">Sub-Sentence Concurrency</span>
                      <span className="sum-val sum-val--emerald">Active Stream</span>
                      <span className="sum-sub">Sentence 1 plays while Sentence 2 generates</span>
                    </div>
                    <div className="summary-stat">
                      <span className="sum-lbl">Barge-in Latency</span>
                      <span className="sum-val sum-val--purple">&lt; 60ms</span>
                      <span className="sum-sub">Immediate speech cut-off</span>
                    </div>
                  </div>
                </div>
              )}

              {project.demoType === 'rag-system' && (
                <div className="inspector-card">
                  <div className="inspector-head">
                    <span className="inspector-badge">Reciprocal Rank Fusion &amp; Attribution Matrix</span>
                    <h4 className="inspector-title">Hybrid BM25 + Dense Vector Passage Ranking</h4>
                  </div>

                  <div className="inspector-table-wrap">
                    <table className="inspector-table">
                      <thead>
                        <tr>
                          <th>Passage Chunk</th>
                          <th>Dense Cosine</th>
                          <th>BM25 Keyword</th>
                          <th>RRF Fusion Score</th>
                          <th>Hallucination Gate</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Chunk #12 (PDF p.4)</strong>: DB batching &lt;1s</td>
                          <td><span className="score-val">0.912</span></td>
                          <td><span className="score-val">0.940</span></td>
                          <td><strong className="score-val--top">0.926</strong></td>
                          <td><span className="gate-pass">PASS (&gt;0.85)</span></td>
                          <td><span className="status-cited">Cited Primary</span></td>
                        </tr>
                        <tr>
                          <td><strong>Chunk #27 (DOCX p.8)</strong>: CPU/GPU parallel -33%</td>
                          <td><span className="score-val">0.894</span></td>
                          <td><span className="score-val">0.875</span></td>
                          <td><strong className="score-val--top">0.885</strong></td>
                          <td><span className="gate-pass">PASS (&gt;0.85)</span></td>
                          <td><span className="status-cited">Cited Supporting</span></td>
                        </tr>
                        <tr>
                          <td><strong>Chunk #04 (PDF p.2)</strong>: General hardware specs</td>
                          <td><span className="score-val">0.742</span></td>
                          <td><span className="score-val">0.680</span></td>
                          <td><span className="score-val">0.711</span></td>
                          <td><span className="gate-fail">ABSTAIN (&lt;0.85)</span></td>
                          <td><span className="status-discarded">Filtered Out</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="inspector-footnote">
                    <strong>Zero-Hallucination Defense:</strong> Chunks scoring below the 0.85 threshold are isolated and pruned before prompt
                    injection. The LLM is instructed to abstain when evidence confidence is insufficient.
                  </p>
                </div>
              )}

              {project.demoType === 'vlm-multimodal' && (
                <div className="inspector-card">
                  <div className="inspector-head">
                    <span className="inspector-badge">Defect Segmentation &amp; Audit Log</span>
                    <h4 className="inspector-title">High-Resolution Defect Classification &amp; Telemetry</h4>
                  </div>

                  <div className="defect-inspector-grid">
                    <div className="defect-crop-box">
                      <div className="defect-crop-title">Magnified ROI Crop (Fissure Area)</div>
                      <div className="defect-crop-visual">
                        <div className="defect-heat-overlay" />
                        <span className="defect-flag-pill">Micro-Fissure Detected: 98.4%</span>
                      </div>
                      <span className="defect-coords">Bounding Box: [340, 90, 220, 180] · Area: 39,600 px²</span>
                    </div>

                    <div className="defect-stats-col">
                      <h5 className="sub-heading">Class Probability Distribution</h5>
                      <div className="prob-row">
                        <span className="prob-name">Micro-Fissure</span>
                        <div className="prob-bar-track">
                          <div className="prob-bar prob-bar--danger" style={{ width: '98.4%' }} />
                        </div>
                        <span className="prob-val">98.4%</span>
                      </div>
                      <div className="prob-row">
                        <span className="prob-name">Surface Oxidation</span>
                        <div className="prob-bar-track">
                          <div className="prob-bar prob-bar--safe" style={{ width: '1.2%' }} />
                        </div>
                        <span className="prob-val">1.2%</span>
                      </div>
                      <div className="prob-row">
                        <span className="prob-name">Normal Variance</span>
                        <div className="prob-bar-track">
                          <div className="prob-bar prob-bar--safe" style={{ width: '0.4%' }} />
                        </div>
                        <span className="prob-val">0.4%</span>
                      </div>

                      <div className="audit-decision-box">
                        <div className="audit-row">
                          <span>Automated Decision:</span>
                          <strong className="text-red">REJECT (Divert Line 2)</strong>
                        </div>
                        <div className="audit-row">
                          <span>Audit Record ID:</span>
                          <code>#VLM-2026-0941</code>
                        </div>
                        <div className="audit-row">
                          <span>DB Write Latency:</span>
                          <strong className="text-cyan">0.85s (Batched Transaction)</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ARCHITECTURE PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="mockup-pipeline-view">
              <div className="pipeline-header-wrap">
                <h4 className="pipeline-title">{project.architecture.title}</h4>
                <span className="pipeline-badge">Production Architecture</span>
              </div>
              <div className="pipeline-steps">
                {project.architecture.steps.map((item, idx) => (
                  <div key={item.step} className="pipeline-step-card">
                    <div className="pipeline-step-header">
                      <span className="pipeline-step-badge">{item.step}</span>
                      <span className="pipeline-step-tech">{item.tech}</span>
                    </div>
                    <p className="pipeline-step-detail">{item.detail}</p>
                    <div className="pipeline-step-foot">
                      <span className="step-num">Stage 0{idx + 1}</span>
                      <ChevronRight size={14} className="step-arrow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TERMINAL */}
          {activeTab === 'terminal' && (
            <div className="mockup-terminal-view">
              <div className="terminal-header">
                <span className="terminal-title">bash — 80x24</span>
                <button type="button" className="terminal-copy" onClick={handleCopy}>
                  <Copy size={13} />
                  <span>{copied ? 'Copied!' : 'Copy Clone Command'}</span>
                </button>
              </div>
              <pre className="terminal-code">
                <code>{`$ git clone ${project.repoUrl}.git
$ cd ${project.id === 'voice-agent' ? 'voice_agent' : project.id}
$ python -m venv venv && source venv/bin/activate
$ pip install -r requirements.txt

# Start ${project.title}:
$ python -m app.main --host 0.0.0.0 --port 8000
[INFO] Initializing pipeline worker pools... OK
[INFO] Model engine ready. Concurrency configured.
[INFO] Streaming endpoint active on ws://localhost:8000/ws
[INFO] Ready for requests. Latency target verified.`}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer bar with GitHub CTA */}
        <div className="mockup-footer">
          <div className="mockup-footer-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-badge">
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--sm"
          >
            <GitBranch size={14} />
            <span>Star on GitHub</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* FULL-SIZE PREVIEW MODAL */}
      {isFullscreen && (
        <div className="project-modal-backdrop" onClick={() => setIsFullscreen(false)}>
          <div className="project-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-header">
              <div>
                <span className="modal-badge">{project.badge}</span>
                <h3 className="modal-title">{project.title}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsFullscreen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="project-modal-body">
              <div className="modal-metric-deck">
                {project.keyMetrics.map((m) => (
                  <div key={m.label} className="modal-metric-card">
                    <span className="m-val">{m.value}</span>
                    <span className="m-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="modal-desc-box">
                <h4>System Architecture &amp; Implementation Details</h4>
                <p>{project.description}</p>
              </div>

              <div className="modal-pipeline-flow">
                <h5>End-to-End Execution Flow</h5>
                <div className="modal-flow-grid">
                  {project.architecture.steps.map((st) => (
                    <div key={st.step} className="modal-flow-item">
                      <strong>{st.step}</strong>
                      <span className="flow-tech">{st.tech}</span>
                      <p>{st.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer-cta">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <GitBranch size={15} />
                  <span>View Full Source Code on GitHub</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
