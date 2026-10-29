import { ArrowRight } from 'lucide-react'
import { Fragment } from 'react'
import type { FlowStage } from '../data/caseStudies'

type Props = {
  title: string
  stages: FlowStage[]
  caption?: string
}

/**
 * A left-to-right pipeline diagram built from real text (so it is readable by
 * assistive tech and reflows on small screens). It switches from a vertical
 * stack to a row based on its own width, so it works in cards and dialogs alike.
 */
export function FlowDiagram({ title, stages, caption }: Props) {
  return (
    <figure className="flow">
      <figcaption className="flow__title">
        <span>{title}</span>
        {caption && <span className="flow__caption">{caption}</span>}
      </figcaption>
      <ol className="flow__list">
        {stages.map((stage, index) => (
          <Fragment key={stage.title}>
            <li className="flow__stage">
              <span className="flow__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <strong className="flow__name">{stage.title}</strong>
              <span className="flow__note">{stage.note}</span>
            </li>
            {index < stages.length - 1 && (
              <li className="flow__arrow" aria-hidden="true" role="presentation">
                <ArrowRight size={18} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </figure>
  )
}
