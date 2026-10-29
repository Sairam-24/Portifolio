/** True when the user has provided a value (not empty or whitespace). */
export const isSet = (value: string | undefined): value is string => !!value && value.trim().length > 0

export const isExternal = (href: string) => /^https?:\/\//i.test(href)

/**
 * Turns a value from profile.links into something safe to use as an href.
 * Absolute URLs and mailto: pass through. Anything else is treated as a file in
 * /public (for example a résumé PDF) and resolved against the deploy base path.
 */
export function resolveHref(href: string): string {
  const value = href.trim()
  if (isExternal(value) || value.startsWith('mailto:') || value.startsWith('#')) return value
  return import.meta.env.BASE_URL + value.replace(/^\/+/, '')
}
