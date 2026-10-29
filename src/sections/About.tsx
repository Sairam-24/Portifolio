import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Box,
  Brain,
  ChevronRight,
  Cloud,
  FileText,
  Image as ImageIcon,
  Mail,
  MapPin,
  Mic,
  Settings,
} from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/profile'

const coreAreas = [
  {
    id: 'gen-ai',
    title: 'Generative AI & LLMs',
    icon: Brain,
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.12)',
  },
  {
    id: 'rag-multi-agent',
    title: 'RAG & Multi-Agent Systems',
    icon: FileText,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
  },
  {
    id: 'voice-ai',
    title: 'Voice AI & Speech Processing',
    icon: Mic,
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.12)',
  },
  {
    id: 'cv-vlms',
    title: 'Computer Vision & VLMs',
    icon: ImageIcon,
    color: '#22d3ee',
    bg: 'rgba(34, 211, 238, 0.12)',
  },
  {
    id: 'backend',
    title: 'Python Backend Engineering',
    icon: Settings,
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.12)',
  },
  {
    id: 'realtime',
    title: 'Real-Time Systems',
    icon: Cloud,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
  },
  {
    id: 'perf',
    title: 'Performance Engineering',
    icon: BarChart3,
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.12)',
  },
  {
    id: 'end-to-end',
    title: 'End-to-End AI Products',
    icon: Box,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.12)',
  },
]

/** Animated micro-elements overlaying the icon */
function CoreAreaMicroGraphic({ type }: { type: string }) {
  switch (type) {
    case 'rag-multi-agent':
      return (
        <span className="core-micro-anim core-micro-radar" aria-hidden="true">
          <span className="radar-ping" />
        </span>
      )
    case 'cv-vlms':
      return (
        <span className="core-micro-anim core-micro-reticle" aria-hidden="true">
          <span className="reticle-laser" />
        </span>
      )
    default:
      return null
  }
}

/** Right-side motion graphic for each Core Area card */
function CoreAreaSideAnimation({ type }: { type: string }) {
  switch (type) {
    case 'voice-ai':
      return (
        <div className="core-motion-side core-motion-eq" aria-label="Live audio frequency equalizer">
          <span className="eq-bar bar-1" />
          <span className="eq-bar bar-2" />
          <span className="eq-bar bar-3" />
          <span className="eq-bar bar-4" />
        </div>
      )
    case 'perf':
      return (
        <div className="core-motion-side core-motion-bars" aria-label="Rising throughput benchmark">
          <span className="perf-bar pb-1" />
          <span className="perf-bar pb-2" />
          <span className="perf-bar pb-3" />
        </div>
      )
    case 'gen-ai':
      return (
        <div className="core-motion-side core-motion-synapse" aria-label="Synaptic neural glow">
          <span className="synapse-spark" />
          <span className="synapse-pulse" />
        </div>
      )
    case 'realtime':
      return (
        <div className="core-motion-side core-motion-signal" aria-label="Live WebSocket telemetry signal">
          <span className="signal-ring" />
          <span className="signal-dot" />
        </div>
      )
    case 'rag-multi-agent':
      return (
        <div className="core-motion-side core-motion-agent-scan" aria-label="Multi-agent search ping">
          <span className="agent-ping-dot" />
          <span className="agent-scan-text">RETRIEVE</span>
        </div>
      )
    case 'backend':
      return (
        <div className="core-motion-side core-motion-clock" aria-label="High concurrency worker thread">
          <span className="thread-pill">200 OK</span>
        </div>
      )
    case 'cv-vlms':
      return (
        <div className="core-motion-side core-motion-vlm" aria-label="Optical frame detection">
          <span className="vlm-target-corner" />
        </div>
      )
    case 'end-to-end':
      return (
        <div className="core-motion-side core-motion-deploy" aria-label="Production ready deployment">
          <span className="deploy-badge">PROD</span>
        </div>
      )
    default:
      return null
  }
}

export function About() {
  return (
    <section id="about" className="section about-custom-section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-exact-layout">
          {/* ================= Left Profile Column ================= */}
          <Reveal className="about-exact-left">
            <div className="profile-exact-card">
              {/* Portrait Image */}
              <div className="profile-exact-img-wrap">
                <img
                  src="/profile.jpg"
                  alt="Sai Babu Polisetti"
                  className="profile-exact-img"
                  loading="lazy"
                />
                <div className="profile-exact-badge">
                  <span className="live-dot" />
                  <span>Open for Global Roles</span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="profile-exact-info">
                <h3 className="profile-exact-name">{profile.name}</h3>
                <p className="profile-exact-title">Senior AI Engineer</p>

                <div className="profile-exact-location">
                  <MapPin size={14} className="text-cyan shrink-0" />
                  <span>Hyderabad, India <span className="loc-pipe">|</span> Open to Relocate</span>
                </div>

                {/* Skill Tag Pills */}
                <div className="profile-exact-tags">
                  <span className="p-tag">Python</span>
                  <span className="p-tag">AI/ML</span>
                  <span className="p-tag">LLMs</span>
                  <span className="p-tag">RAG</span>
                  <span className="p-tag">Voice AI</span>
                  <span className="p-tag">Computer Vision</span>
                  <span className="p-tag">Full Stack</span>
                </div>

                {/* Contact Button */}
                <a href="#contact" className="profile-exact-btn">
                  <Mail size={16} />
                  <span>Contact Me</span>
                  <ChevronRight size={16} className="btn-arrow" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ================= Right Narrative Column ================= */}
          <div className="about-exact-right">
            {/* Top Heading & Narrative (Removed iso-chip-container per request) */}
            <Reveal>
              <div className="about-exact-header">
                <div className="about-text-content">
                  <span className="about-exact-eyebrow">01 / ABOUT ME</span>
                  <h2 className="about-exact-title">
                    Building Intelligent AI Products <br />
                    <span className="grad-title">from Idea to Production</span>
                  </h2>

                  <div className="about-exact-paragraphs">
                    <p>
                      I&rsquo;m an AI Engineer passionate about turning complex problems into practical, intelligent software. My work spans{' '}
                      <span className="hl-cyan">LLM-powered applications</span>,{' '}
                      <span className="hl-cyan">RAG pipelines</span>,{' '}
                      <span className="hl-cyan">multi-agent systems</span>,{' '}
                      <span className="hl-cyan">computer vision</span>,{' '}
                      <span className="hl-cyan">voice AI</span>, and{' '}
                      <span className="hl-cyan">scalable Python backend services</span>.
                    </p>
                    <p>
                      From building conversational AI and automated content generation systems to developing multimodal AI workflows and real-time voice assistants, I enjoy working across the entire engineering lifecycle &mdash; from architecture and experimentation to implementation, testing, and deployment.
                    </p>
                    <p>
                      I also focus on making AI systems faster, more reliable, and production-ready through performance optimization, concurrency, model evaluation, and efficient data processing.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Core Areas 8-Card Grid with Rich Motion Graphics */}
            <Reveal delay={100} className="about-core-areas-section">
              <span className="section-sub-label">CORE AREAS</span>
              <div className="core-areas-exact-grid">
                {coreAreas.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div
                      key={item.id}
                      className={`core-exact-card core-card--${item.id}`}
                      style={{
                        animationDelay: `${index * 0.25}s`,
                      }}
                    >
                      <div className="core-exact-card-left">
                        <div className={`core-exact-icon core-icon--${item.id}`}>
                          <IconComponent size={20} className={`core-svg-${item.id}`} />
                          <CoreAreaMicroGraphic type={item.id} />
                        </div>
                        <span className="core-exact-title">{item.title}</span>
                      </div>
                      <CoreAreaSideAnimation type={item.id} />
                    </div>
                  )
                })}
              </div>
            </Reveal>

            {/* Selected Impact 4-Column Card */}
            <Reveal delay={180} className="about-selected-impact-wrap">
              <div className="impact-exact-card">
                <span className="section-sub-label">SELECTED IMPACT</span>
                <div className="impact-exact-grid">
                  {/* Metric 1 */}
                  <div className="impact-col">
                    <div className="impact-metric-val impact-val--cyan">
                      <span>33%</span>
                      <ArrowDown size={18} strokeWidth={2.8} />
                    </div>
                    <p className="impact-metric-label">Lower median processing latency</p>
                  </div>

                  {/* Metric 2 */}
                  <div className="impact-col">
                    <div className="impact-metric-val impact-val--emerald">
                      <span>22%</span>
                      <ArrowUp size={18} strokeWidth={2.8} />
                    </div>
                    <p className="impact-metric-label">Higher concurrent throughput</p>
                  </div>

                  {/* Metric 3 */}
                  <div className="impact-col">
                    <div className="impact-metric-val impact-val--violet">
                      <span>28s &rarr; &lt;1s</span>
                    </div>
                    <p className="impact-metric-label">Database operation time for 23 photos</p>
                  </div>

                  {/* Metric 4 */}
                  <div className="impact-col">
                    <div className="impact-metric-val impact-val--amber">
                      <span>2.5s</span>
                    </div>
                    <p className="impact-metric-label">Voice agent first audio (Local CPU)</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
