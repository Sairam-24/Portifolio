import { publicMetrics } from './metrics'

export type NavItem = { id: string; label: string }

const items: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'impact', label: 'Benchmarks' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Case Studies' },
  { id: 'contact', label: 'Contact' },
]

/** The Impact link disappears if every metric has been hidden in metrics.ts. */
export const NAV: NavItem[] = items.filter((item) => item.id !== 'impact' || publicMetrics().length > 0)

/** "01", "02"… following the order of the visible sections. */
export const sectionNumber = (id: string): string => String(NAV.findIndex((item) => item.id === id) + 1).padStart(2, '0')

/** Section ids observed for the active-link highlight ("top" is the hero). */
export const OBSERVED_IDS: string[] = ['top', ...NAV.map((item) => item.id)]
