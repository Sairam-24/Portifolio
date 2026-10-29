import { ArrowRight, Info } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { publicMetrics } from '../data/metrics'
import { sectionNumber } from '../data/nav'

type Props = { onOpenMethod: () => void }

export function Impact({ onOpenMethod }: Props) {
  const metrics = publicMetrics()
  if (metrics.length === 0) return null

  return (
    <Section
      id="impact"
      number={sectionNumber('impact')}
      eyebrow="Performance Benchmarks"
      title="Measurable Results & Paired Baseline Comparisons"
      lead="Measured results from production optimization and speech engineering, comparing baseline setups with parallelized architectures."
    >
      <ul className="metrics">
        {metrics.map((metric, index) => (
          <li key={metric.id}>
            <Reveal delay={index * 90} className="metrics__item">
              <MetricCard metric={metric} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <aside className="read-me" aria-label="How to read these figures">
          <Info size={20} aria-hidden="true" className="read-me__icon" />
          <div>
            <h3>How to read these figures</h3>
            <ul>
              <li>Each number comes from a specific test, in a specific setup. It is not a general performance guarantee.</li>
              <li>They are my own measurements from internal testing and have not been independently verified.</li>
              <li>The same change could produce a different result on other hardware, data or usage patterns.</li>
            </ul>
            <button type="button" className="text-link" onClick={onOpenMethod} aria-haspopup="dialog">
              See the measurement approach <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </aside>
      </Reveal>
    </Section>
  )
}
