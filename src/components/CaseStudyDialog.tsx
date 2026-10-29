import { ArrowLeft, ArrowRight, Check, ShieldCheck, Users, X } from 'lucide-react'
import { useEffect, useRef, type RefObject } from 'react'
import { caseStudies, type CaseStudy } from '../data/caseStudies'
import { publicMetrics } from '../data/metrics'
import { FlowDiagram } from './FlowDiagram'
import { MetricCard } from './MetricCard'
import { RichText } from './RichText'

type Props = {
  id: string | null
  onClose: () => void
  onSwitch: (id: string) => void
}

export function CaseStudyDialog({ id, onClose, onSwitch }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const openIdRef = useRef(id)
  const study = caseStudies.find((item) => item.id === id)

  useEffect(() => {
    openIdRef.current = id
    const dialog = dialogRef.current
    if (!dialog) return
    if (id && !dialog.open) dialog.showModal()
    if (!id && dialog.open) dialog.close()
    scrollRef.current?.scrollTo({ top: 0 })
  }, [id])

  return (
    <dialog
      ref={dialogRef}
      className="cs-dialog"
      aria-labelledby="cs-title"
      // Fires for Escape, the close button and programmatic close. Only report it when we did not initiate it.
      onClose={() => {
        if (openIdRef.current) onClose()
      }}
      // A click on the backdrop lands on the <dialog> element itself, never on its contents.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      {study && <Body study={study} scrollRef={scrollRef} onClose={onClose} onSwitch={onSwitch} />}
    </dialog>
  )
}

type BodyProps = {
  study: CaseStudy
  scrollRef: RefObject<HTMLDivElement | null>
  onClose: () => void
  onSwitch: (id: string) => void
}

function Body({ study, scrollRef, onClose, onSwitch }: BodyProps) {
  const index = caseStudies.findIndex((item) => item.id === study.id)
  const previous = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
  const next = caseStudies[(index + 1) % caseStudies.length]
  const results = study.metricIds
    .map((metricId) => publicMetrics().find((metric) => metric.id === metricId))
    .filter((metric) => metric !== undefined)

  return (
    <div className="cs">
      <header className="cs__head">
        <div>
          <p className="cs__kicker">
            Case study {study.number} · {study.kind}
          </p>
          <h2 id="cs-title" className="cs__title">
            {study.title}
          </h2>
        </div>
        <button type="button" className="cs__close" onClick={onClose}>
          <X size={20} aria-hidden="true" />
          <span className="sr-only">Close case study</span>
        </button>
      </header>

      <div className="cs__scroll" ref={scrollRef}>
        <p className="cs__notice">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>
            Anonymized and generalized. This page contains no company or product names, customer data, source code or internal
            screenshots, and its diagrams show a common pattern rather than any specific product&rsquo;s design.
          </span>
        </p>

        <section className="cs__block" aria-labelledby="cs-problem">
          <h3 id="cs-problem" className="cs__h">
            The problem
          </h3>
          {study.problem.map((paragraph) => (
            <p key={paragraph} className="cs__p">
              {paragraph}
            </p>
          ))}
        </section>

        <FlowDiagram title={study.flow.title} stages={study.flow.stages} caption="Illustrative, not a specific product" />

        <section className="cs__block" aria-labelledby="cs-how">
          <h3 id="cs-how" className="cs__h">
            How it works
          </h3>
          <div className="cs__steps">
            {study.sections.map((section, i) => (
              <div key={section.heading} className="cs__step">
                <span className="cs__step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h4>{section.heading}</h4>
                  <p>
                    <RichText text={section.body} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cs__block" aria-labelledby="cs-challenges">
          <h3 id="cs-challenges" className="cs__h">
            {study.challengesTitle}
          </h3>
          <ul className="cs__cards">
            {study.challenges.map((challenge) => (
              <li key={challenge.title}>
                <strong>{challenge.title}</strong>
                <span>{challenge.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="cs__split" aria-label="Contribution and team context">
          <div className="cs__col cs__col--mine">
            <h3 className="cs__h">
              <Check size={18} aria-hidden="true" /> My contribution
            </h3>
            <ul>
              {study.contribution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="cs__col">
            <h3 className="cs__h">
              <Users size={18} aria-hidden="true" /> Team context
            </h3>
            <ul>
              {study.teamContext.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {study.methodology && (
          <section className="cs__block" aria-labelledby="cs-method">
            <h3 id="cs-method" className="cs__h">
              Measurement approach
            </h3>
            <ul className="cs__ticks">
              {study.methodology.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {results.length > 0 && (
          <section className="cs__block" aria-labelledby="cs-results">
            <h3 id="cs-results" className="cs__h">
              Reported results
            </h3>
            <div className="cs__metrics">
              {results.map((metric) => (
                <MetricCard key={metric.id} metric={metric} compact />
              ))}
            </div>
            <p className="cs__caveat">
              These are my own measurements from specific internal tests. They have not been independently verified, and they
              describe the tested setup rather than guaranteeing the same result elsewhere.
            </p>
          </section>
        )}

        <nav className="cs__pager" aria-label="Case studies">
          {previous && (
            <button type="button" onClick={() => onSwitch(previous.id)}>
              <ArrowLeft size={18} aria-hidden="true" />
              <span>
                <small>Previous</small>
                {previous.title}
              </span>
            </button>
          )}
          {next && (
            <button type="button" onClick={() => onSwitch(next.id)} className="cs__pager-next">
              <span>
                <small>Next</small>
                {next.title}
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </nav>
      </div>
    </div>
  )
}
