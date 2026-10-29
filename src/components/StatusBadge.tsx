import { CheckCircle2, CircleDashed, Hammer } from 'lucide-react'
import type { ProjectStatus } from '../data/plannedProjects'

const config = {
  planned: { label: 'Planned', icon: CircleDashed },
  'in-progress': { label: 'In progress', icon: Hammer },
  published: { label: 'Published', icon: CheckCircle2 },
} as const

/** Status is always text plus an icon, never colour alone. */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, icon: Icon } = config[status]
  return (
    <span className={`status status--${status}`}>
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  )
}
