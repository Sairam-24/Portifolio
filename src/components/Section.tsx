import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  id: string
  number: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, number, eyebrow, title, lead, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`section ${className}`.trim()}>
      <div className="container">
        <Reveal>
          <header className="section__head">
            <p className="eyebrow">
              <span className="eyebrow__num">{number}</span>
              {eyebrow}
            </p>
            <h2 id={`${id}-title`} className="section__title">
              {title}
            </h2>
            {lead && <p className="lead">{lead}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
