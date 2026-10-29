import { PencilRuler } from 'lucide-react'

/** Shown while siteConfig.draftMode is true. Remove by setting it to false in src/data/profile.ts. */
export function DraftBanner() {
  return (
    <aside className="draft-banner" aria-label="Draft notice">
      <div className="container draft-banner__inner">
        <PencilRuler size={16} aria-hidden="true" />
        <p>
          <strong>Draft.</strong> Amber items are placeholders still waiting for real details. Set <code>draftMode</code> to{' '}
          <code>false</code> in <code>src/data/profile.ts</code> before publishing.
        </p>
      </div>
    </aside>
  )
}
