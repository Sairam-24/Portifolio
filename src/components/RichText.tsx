import type { ReactNode } from 'react'

const TOKEN = /\[\[(.+?)\]\]/g

/**
 * Renders data-file text. Anything written as [[like this]] is a placeholder
 * and is shown highlighted in amber so it cannot be missed before publishing.
 */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    parts.push(
      <mark key={index} className="placeholder" title="Placeholder: replace this text in src/data">
        {match[1]}
      </mark>,
    )
    last = index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
