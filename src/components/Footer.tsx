import { NAV } from '../data/nav'
import { profile } from '../data/profile'
import { isSet, resolveHref } from '../lib/links'
import { GitHubIcon, LinkedInIcon } from './icons'

export function Footer() {
  const year = new Date().getFullYear()
  const { linkedin, github } = profile.links

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__id">
          <a className="brand" href="#top">
            <span className="brand__mark" aria-hidden="true">
              {profile.initials}
            </span>
            <span className="brand__name">{profile.name}</span>
            <span className="sr-only"> (back to top)</span>
          </a>
          <p>
            {profile.title} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="site-footer__nav">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="site-footer__social" aria-label="Profiles">
          {isSet(linkedin) && (
            <li>
              <a href={resolveHref(linkedin)} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                <LinkedInIcon size={18} />
              </a>
            </li>
          )}
          {isSet(github) && (
            <li>
              <a href={resolveHref(github)} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                <GitHubIcon size={18} />
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="container site-footer__legal">
        <p>
          © {year} {profile.name}. Case studies are anonymized; independent projects are marked as planned until they are published.
        </p>
      </div>
    </footer>
  )
}
