import {
  Box,
  Building2,
  Calendar,
  CheckCircle2,
  Cloud,
  Code2,
  Coins,
  Cpu,
  Database,
  Image as ImageIcon,
  Lightbulb,
  MapPin,
  Monitor,
  Settings,
  Users,
  Zap,
} from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { experience } from '../data/experience'
import { sectionNumber } from '../data/nav'

function BulletIcon({ type }: { type: string }) {
  switch (type) {
    case 'lightbulb':
      return <Lightbulb size={16} />
    case 'code':
      return <Code2 size={16} />
    case 'database':
      return <Database size={16} />
    case 'users':
      return <Users size={16} />
    case 'image':
      return <ImageIcon size={16} />
    case 'box':
      return <Box size={16} />
    case 'cloud':
      return <Cloud size={16} />
    case 'monitor':
      return <Monitor size={16} />
    case 'settings':
      return <Settings size={16} />
    default:
      return <CheckCircle2 size={16} />
  }
}

function SpecialCardIcon({ type }: { type: string }) {
  switch (type) {
    case 'zap':
      return <Zap size={16} />
    case 'cost':
      return <Coins size={16} />
    case 'cpu':
      return <Cpu size={16} />
    default:
      return <Zap size={16} />
  }
}

function renderHighlighted(text: string, highlights?: string[]) {
  if (!highlights || highlights.length === 0) return text
  const regex = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) => {
    const isHl = highlights.some((h) => h.toLowerCase() === part.toLowerCase())
    return isHl ? (
      <strong key={i} className="hl-cyan exp-bold">
        {part}
      </strong>
    ) : (
      part
    )
  })
}

export function Experience() {
  return (
    <Section
      id="experience"
      number={sectionNumber('experience')}
      eyebrow="Work Experience"
      title="Engineering Roles & Production Impact"
      lead="Applied AI, multimodal workflows, low-latency architectures, and production systems at Eliteus InfoTech."
    >
      <div className="wix-experience-container">
        {experience.map((job, idx) => (
          <Reveal key={job.id} delay={idx * 120} className="wix-experience-card-wrap">
            <div className="wix-experience-card">
              {/* Left Column: Period, Company, Location, Note, Skills */}
              <div className="wix-card-sidebar">
                <div className="wix-date-badge">
                  <Calendar size={13} />
                  <span>{job.dates}</span>
                </div>

                <div className="wix-company-info">
                  <div className="wix-company-name">
                    <Building2 size={16} className="text-cyan" />
                    <h4>{job.company}</h4>
                  </div>
                  <div className="wix-location">
                    <MapPin size={13} />
                    <span>{job.location}</span>
                  </div>
                </div>

                {job.companyNote && <p className="wix-company-note">{job.companyNote}</p>}

                {/* Tech stack pill tags */}
                {job.skills && (
                  <div className="wix-role-skills">
                    {job.skills.map((skill) => (
                      <span key={skill} className="wix-skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Role Title, Status Badge, Bullets & Specialized Cards */}
              <div className="wix-card-content">
                <div className="wix-role-header">
                  <h3 className="wix-role-title">{job.role}</h3>
                  <span
                    className={`wix-role-chip ${
                      job.status === 'Current Role' ? 'wix-role-chip--current' : 'wix-role-chip--prev'
                    }`}
                  >
                    <span className="chip-dot" />
                    {job.status}
                  </span>
                </div>

                {/* List of 7 or 5 Icon Bullets */}
                <div className="exp-bullets-list">
                  {job.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="exp-bullet-item">
                      <div className="exp-bullet-icon">
                        <BulletIcon type={b.icon} />
                      </div>
                      <p className="exp-bullet-text">{renderHighlighted(b.text, b.highlights)}</p>
                    </div>
                  ))}
                </div>

                {/* Specialized Engineering Cards for AI Engineer: Performance & DB, LLM Cost, Parallel Compute */}
                {job.specialCards && job.specialCards.length > 0 && (
                  <div className="exp-special-cards-grid">
                    {job.specialCards.map((sc) => (
                      <div key={sc.id} className={`exp-special-card exp-card--${sc.icon}`}>
                        <div className="exp-special-card-head">
                          <div className={`exp-special-icon exp-icon--${sc.icon}`}>
                            <SpecialCardIcon type={sc.icon} />
                          </div>
                          <div className="exp-special-head-copy">
                            <h5 className="exp-special-title">{sc.title}</h5>
                            <span className="exp-special-tag">{sc.tag}</span>
                          </div>
                        </div>

                        {/* If it has metrics (Card 1: consolidated median, throughput, DB writes) */}
                        {sc.metrics && (
                          <div className="exp-mini-metrics-row">
                            {sc.metrics.map((m, mIdx) => (
                              <div key={mIdx} className="exp-metric-mini">
                                <span className={`exp-m-num exp-m-num--${m.colorClass}`}>
                                  {m.value}
                                </span>
                                <span className="exp-m-lbl">{m.label}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* If it has feature tags (Card 2: LLM Cost, Card 3: Parallel CPU/GPU) */}
                        {sc.tags && (
                          <div className="exp-mini-features-row">
                            {sc.tags.map((t, tIdx) => (
                              <span key={tIdx} className="exp-pill-feature">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="exp-special-desc">{sc.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
