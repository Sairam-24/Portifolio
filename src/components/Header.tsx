import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NAV, OBSERVED_IDS } from '../data/nav'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const scrolled = useScrolled()
  const active = useActiveSection(OBSERVED_IDS)

  // Close the mobile menu with Escape and return focus to its button.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Leave the mobile state behind when the viewport grows.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px)')
    const onChange = () => query.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
      <div className="container site-header__bar">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="brand__name">{profile.name}</span>
          <span className="sr-only"> (back to top)</span>
        </a>

        <nav className="nav" aria-label="Primary">
          <ul id="primary-nav" className={`nav__list${open ? ' is-open' : ''}`}>
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  className="nav__link"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
