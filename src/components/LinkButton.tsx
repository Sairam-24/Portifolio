import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../data/profile'
import { isExternal, isSet, resolveHref } from '../lib/links'

type Props = {
  href: string
  label: string
  icon?: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Opens in a new tab even for local files (e.g. a PDF résumé). */
  newTab?: boolean
  /** Where to set this value, shown on the placeholder. */
  hint: string
}

/**
 * A button-styled link that copes with missing values: while draftMode is on it
 * shows a clearly marked placeholder, and once draftMode is off it renders
 * nothing. It never renders a dead link.
 */
export function LinkButton({ href, label, icon, variant = 'secondary', newTab = false, hint }: Props) {
  if (!isSet(href)) {
    if (!siteConfig.draftMode) return null
    return (
      <span className={`btn btn--${variant} is-placeholder`} aria-disabled="true" title={hint}>
        {icon}
        {label}
        <span className="btn__tag">add link</span>
      </span>
    )
  }

  const external = isExternal(href)
  const target = external || newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a className={`btn btn--${variant}`} href={resolveHref(href)} {...target}>
      {icon}
      {label}
      {external && <ArrowUpRight size={15} aria-hidden="true" />}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
