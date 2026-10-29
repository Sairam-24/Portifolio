import { createElement, type HTMLAttributes, type PointerEvent, type ReactNode } from 'react'

type Props = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'article' | 'li'
  children: ReactNode
}

/**
 * A card with a soft glow that follows the pointer. Purely decorative: the
 * effect is driven by CSS variables and is turned off for touch and
 * reduced-motion users in CSS.
 */
export function Spot({ as = 'div', className = '', children, onPointerMove, ...rest }: Props) {
  const handleMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
    onPointerMove?.(event)
  }
  return createElement(as, { className: `spot ${className}`.trim(), onPointerMove: handleMove, ...rest }, children)
}
