import { ArrowRight, Gauge, MessagesSquare, ScanEye } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { Spot } from '../components/Spot'
import { caseStudies } from '../data/caseStudies'
import { headline, publicMetrics } from '../data/metrics'
import { sectionNumber } from '../data/nav'

const icons = { scan: ScanEye, message: MessagesSquare, gauge: Gauge } as const

type Props = { onOpen: (id: string) => void }

export function CaseStudies({ onOpen }: Props) {
  const metrics = publicMetrics()

  return (
    <Section
      id="work"
      number={sectionNumber('work')}
      eyebrow="Featured work"
      title="Case studies from professional AI products"
      lead="These come from professional work, so they are anonymized descriptions rather than public repositories. Each one separates what I did from what the team delivered."
    >
      <ul className="cases">
        {caseStudies.map((study, index) => {
          const Icon = icons[study.icon]
          const cardMetrics = study.metricIds
            .map((id) => metrics.find((metric) => metric.id === id))
            .filter((metric) => metric !== undefined)
          return (
            <li key={study.id}>
              <Reveal delay={index * 80} className="cases__item">
                <Spot as="article" className="case-card">
                  <div className="case-card__top">
                    <span className="case-card__icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <span className="case-card__num" aria-hidden="true">
                      {study.number}
                    </span>
                  </div>

                  <p className="badge">{study.kind}</p>
                  <h3 className="case-card__title">{study.title}</h3>
                  <p className="case-card__summary">{study.summary}</p>

                  {cardMetrics.length > 0 ? (
                    <ul className="case-card__metrics" aria-label="Reported results">
                      {cardMetrics.map((metric) => (
                        <li key={metric.id}>
                          <strong>{headline(metric)}</strong>
                          <span>{metric.heroLabel}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mini-flow">
                      <p className="mini-flow__label">Generalized workflow</p>
                      <ol className="mini-flow__list">
                        {study.flow.stages.map((stage) => (
                          <li key={stage.title}>{stage.title}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <p className="case-card__role">
                    <span>My role</span>
                    {study.role}
                  </p>

                  <ul className="chips chips--small" aria-label="Technologies and topics">
                    {study.tags.slice(0, 4).map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="case-card__cta"
                    aria-haspopup="dialog"
                    onClick={() => onOpen(study.id)}
                  >
                    Read case study
                    <span className="sr-only">: {study.title}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </Spot>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
