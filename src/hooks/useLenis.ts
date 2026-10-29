import Lenis from 'lenis'
import { useEffect } from 'react'

/**
 * Initializes buttery-smooth inertia scrolling powered by Lenis.
 * Automatically respects `prefers-reduced-motion` for accessibility.
 */
export function useLenis() {
  useEffect(() => {
    // Respect user's motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Handle in-page anchor links with smooth scroll
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return

      const hash = target.getAttribute('href')
      if (hash && hash.startsWith('#') && hash.length > 1) {
        const el = document.querySelector(hash)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el, { offset: -68, duration: 1.2 })
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleClick)
      lenis.destroy()
    }
  }, [])
}

