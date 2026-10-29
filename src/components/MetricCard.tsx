import { ArrowRight, Gauge, Mic, Timer, Zap } from 'lucide-react'
import type { CSSProperties } from 'react'
import { barWidths, changeLabel, type Metric } from '../data/metrics'
import { RichText } from './RichText'
import { Spot } from './Spot'

const icons = {
  'median-processing-time': Timer,
  'checks-per-hour': Gauge,
  'save-23-photos': Zap,
  'voice-first-audio': Mic,
} as const

type Props = { metric: Metric; compact?: boolean }

export function MetricCard({ metric, compact = false }: Props) {
  const Icon = icons[metric.id as keyof typeof icons] ?? Gauge
  const widths = barWidths(metric)
  const direction = metric.better === 'down' ? 'lower is better' : 'higher is better'
  const summary = `${metric.label}: baseline ${metric.before.display}, optimized ${metric.after.display}.`

  return (
    <Spot as="article" className={`metric${compact ? ' metric--compact' : ''}`}>
      <header className="metric__head">
        <div className="metric__head-title">
          <span className="metric__icon" aria-hidden="true">
            <Icon size={18} />
          </span>
          <h3 className="metric__label">{metric.label}</h3>
        </div>
        {metric.workload && (
          <span className="metric__workload-badge" title="Workload benchmark scope">
            {metric.workload}
          </span>
        )}
      </header>

      {/* Paired values display */}
      <div className="metric__values-paired">
        <div className="paired-col paired-col--baseline">
          <span className="paired-col__lbl">Baseline</span>
          <span className="metric__from">{metric.before.display}</span>
        </div>

        <div className="paired-col__arrow-wrap">
          <ArrowRight size={compact ? 18 : 22} className="metric__arrow" aria-hidden="true" />
          {metric.showPercent && (
            <span className="metric__delta">
              <span className="sr-only">Improvement: </span>
              {changeLabel(metric)}
            </span>
          )}
          {!metric.showPercent && (
            <span className="metric__delta metric__delta--bound">
              -97%
            </span>
          )}
        </div>

        <div className="paired-col paired-col--opt">
          <span className="paired-col__lbl">Optimized</span>
          <span className="metric__to">{metric.after.display}</span>
        </div>
      </div>

      <div className="metric__sub">
        <p className="metric__unit">
          {metric.unit} · {direction}
        </p>
      </div>

      {/* Paired baseline-vs-optimized horizontal bars */}
      <div className="bars" role="img" aria-label={summary}>
        <div className="bars__row">
          <span className="bars__name">Baseline</span>
          <span className="bars__track">
            <span
              className="bars__bar bars__bar--before"
              style={{ '--w': `${widths.before}%` } as CSSProperties}
            />
          </span>
          <span className="bars__val">{metric.before.display}</span>
        </div>
        <div className="bars__row">
          <span className="bars__name">Optimized</span>
          <span className="bars__track">
            <span
              className="bars__bar bars__bar--after"
              style={{ '--w': `${widths.after}%` } as CSSProperties}
            />
          </span>
          <span className="bars__val">{metric.after.display}</span>
        </div>
      </div>

      {/* Engineering notes & optimization explanation */}
      <dl className="metric__notes">
        {metric.baselineCause && (
          <div>
            <dt>Baseline Bottleneck</dt>
            <dd>
              <RichText text={metric.baselineCause} />
            </dd>
          </div>
        )}
        {metric.optimizationDetail && (
          <div>
            <dt>Engineering Optimization</dt>
            <dd className="metric__opt-dd">
              <RichText text={metric.optimizationDetail} />
            </dd>
          </div>
        )}
        <div>
          <dt>Test Setup &amp; Workload</dt>
          <dd>
            <RichText text={metric.context} />
          </dd>
        </div>
        {!compact && metric.method && (
          <div>
            <dt>Evaluation Method</dt>
            <dd>
              <RichText text={metric.method} />
            </dd>
          </div>
        )}
      </dl>
    </Spot>
  )
}
