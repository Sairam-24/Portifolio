import { useCallback, useEffect, useRef, useState } from 'react'

const PREFIX = '#case-'

function readId(validIds: readonly string[]): string | null {
  const hash = window.location.hash
  if (!hash.startsWith(PREFIX)) return null
  const id = hash.slice(PREFIX.length)
  return validIds.includes(id) ? id : null
}

/**
 * Keeps the open case study in the URL hash (#case-<id>) so it can be linked to,
 * and so the browser Back button closes it. Opening adds a history entry;
 * switching between case studies replaces it; landing directly on a link and
 * closing clears the hash without leaving the site.
 */
export function useCaseRoute(validIds: readonly string[]) {
  const [id, setId] = useState<string | null>(() => readId(validIds))
  const pushed = useRef(false)

  useEffect(() => {
    const sync = () => {
      const next = readId(validIds)
      if (!next) pushed.current = false
      setId(next)
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [validIds])

  const open = useCallback((next: string) => {
    pushed.current = true
    window.location.hash = PREFIX + next
  }, [])

  const switchTo = useCallback((next: string) => {
    window.history.replaceState(null, '', PREFIX + next)
    setId(next)
  }, [])

  const close = useCallback(() => {
    if (!window.location.hash.startsWith(PREFIX)) {
      setId(null)
      return
    }
    if (pushed.current) {
      pushed.current = false
      window.history.back()
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      setId(null)
    }
  }, [])

  return { id, open, close, switchTo }
}
