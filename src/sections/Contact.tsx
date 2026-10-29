import { Check, Copy, FileText, Mail, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { GitHubIcon, LinkedInIcon } from '../components/icons'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { sectionNumber } from '../data/nav'
import { profile, siteConfig } from '../data/profile'
import { isExternal, isSet, resolveHref } from '../lib/links'

export function Contact() {
  const { email, linkedin, github, resume } = profile.links
  const showComposer = isSet(email) || siteConfig.draftMode

  return (
    <Section
      id="contact"
      number={sectionNumber('contact')}
      eyebrow="Contact"
      title="Let’s talk about AI engineering roles"
      lead={`I'm open to suitable AI engineering opportunities in India and internationally, including remote and relocation roles. ${profile.openTo.roles.join(', ')}.`}
    >
      <div className={`contact${showComposer ? '' : ' contact--single'}`}>
        <Reveal>
          <ul className="contact__list">
            <EmailRow email={email} />
            <LinkRow
              href={linkedin}
              label="LinkedIn"
              icon={<LinkedInIcon size={20} />}
              hint="Set links.linkedin in src/data/profile.ts"
            />
            <LinkRow
              href={github}
              label="GitHub"
              icon={<GitHubIcon size={20} />}
              hint="Set links.github in src/data/profile.ts"
              note="Public projects are planned; see Projects."
            />
            <LinkRow
              href={resume}
              label="Résumé"
              icon={<FileText size={20} />}
              hint="Put a PDF in /public and set links.resume in src/data/profile.ts"
              newTab
            />
          </ul>

          <aside className="first-message" aria-labelledby="first-message-title">
            <h3 id="first-message-title">A useful first message includes</h3>
            <ul>
              <li>The team and the product it builds</li>
              <li>What the role covers day to day</li>
              <li>Location, work mode and any relocation expectations</li>
              <li>The interview process and timeline</li>
            </ul>
          </aside>
        </Reveal>

        {showComposer && (
          <Reveal delay={90}>
            <Composer email={email} />
          </Reveal>
        )}
      </div>
    </Section>
  )
}

type RowProps = { icon: ReactNode; label: string; children: ReactNode; placeholder?: boolean }

function Row({ icon, label, children, placeholder = false }: RowProps) {
  return (
    <li className={`contact-row${placeholder ? ' is-placeholder' : ''}`}>
      <span className="contact-row__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="contact-row__body">
        <p className="contact-row__label">{label}</p>
        {children}
      </div>
    </li>
  )
}

function LinkRow({
  href,
  label,
  icon,
  hint,
  note,
  newTab = false,
}: {
  href: string
  label: string
  icon: ReactNode
  hint: string
  note?: string
  newTab?: boolean
}) {
  if (!isSet(href)) {
    if (!siteConfig.draftMode) return null
    return (
      <Row icon={icon} label={label} placeholder>
        <p className="contact-row__value">
          <mark className="placeholder" title={hint}>
            add link
          </mark>
        </p>
        <p className="contact-row__note">{hint}</p>
      </Row>
    )
  }
  const external = isExternal(href) || newTab
  return (
    <Row icon={icon} label={label}>
      <a
        className="contact-row__value contact-row__link"
        href={resolveHref(href)}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
      {note && <p className="contact-row__note">{note}</p>}
    </Row>
  )
}

/** Copies text, falling back to a hidden textarea where the async clipboard API is unavailable. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(area)
      return ok
    } catch {
      return false
    }
  }
}

function EmailRow({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  if (!isSet(email)) {
    if (!siteConfig.draftMode) return null
    return (
      <Row icon={<Mail size={20} />} label="Email" placeholder>
        <p className="contact-row__value">
          <mark className="placeholder">add email</mark>
        </p>
        <p className="contact-row__note">Set links.email in src/data/profile.ts</p>
      </Row>
    )
  }

  const onCopy = async () => {
    setState((await copyText(email)) ? 'copied' : 'failed')
    window.setTimeout(() => setState('idle'), 2400)
  }

  return (
    <Row icon={<Mail size={20} />} label="Email">
      <div className="contact-row__inline">
        <a className="contact-row__value contact-row__link" href={`mailto:${email}`}>
          {email}
        </a>
        <button type="button" className="icon-btn" onClick={onCopy}>
          {state === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          <span>{state === 'copied' ? 'Copied' : 'Copy'}</span>
          <span className="sr-only"> email address</span>
        </button>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {state === 'copied' ? 'Email address copied to clipboard.' : state === 'failed' ? 'Could not copy. Select the address and copy it manually.' : ''}
      </span>
    </Row>
  )
}

type Draft = { name: string; org: string; role: string; message: string }

function Composer({ email }: { email: string }) {
  const [draft, setDraft] = useState<Draft>({ name: '', org: '', role: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<'name' | 'message', string>>>({})
  const [status, setStatus] = useState('')
  const ready = isSet(email)

  const update = (key: keyof Draft) => (event: { target: { value: string } }) =>
    setDraft((current) => ({ ...current, [key]: event.target.value }))

  const subject = `${draft.role.trim() || 'AI engineering opportunity'}${draft.org.trim() ? ` at ${draft.org.trim()}` : ''}`
  const body = `Hi ${profile.name.split(' ')[0]},\n\n${draft.message.trim()}\n\n${draft.name.trim()}${draft.org.trim() ? `\n${draft.org.trim()}` : ''}`

  const validate = () => {
    const next: typeof errors = {}
    if (!draft.name.trim()) next.name = 'Please add your name.'
    if (!draft.message.trim()) next.message = 'Please add a short message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!validate() || !ready) return
    setStatus('Opening your email app. If nothing opens, use “Copy message” and send it to my email address.')
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onCopy = async () => {
    if (!validate()) return
    const ok = await copyText(`Subject: ${subject}\n\n${body}`)
    setStatus(ok ? 'Message copied. Paste it into any email.' : 'Could not copy automatically. Please select the text and copy it manually.')
  }

  return (
    <form className="composer" onSubmit={onSubmit} noValidate aria-labelledby="composer-title">
      <h3 id="composer-title">Write a message</h3>
      <p className="composer__intro">
        There is no server behind this site. This form prepares an email in your own mail app, so nothing is sent or stored by the
        website.
      </p>

      <div className="field">
        <label htmlFor="c-name">Your name</label>
        <input
          id="c-name"
          name="name"
          autoComplete="name"
          required
          value={draft.name}
          onChange={update('name')}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'c-name-error' : undefined}
        />
        {errors.name && (
          <p id="c-name-error" className="field__error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="c-org">
            Organization <span className="field__opt">(optional)</span>
          </label>
          <input id="c-org" name="organization" autoComplete="organization" value={draft.org} onChange={update('org')} />
        </div>
        <div className="field">
          <label htmlFor="c-role">
            Role or topic <span className="field__opt">(optional)</span>
          </label>
          <input id="c-role" name="role" value={draft.role} onChange={update('role')} placeholder="e.g. LLM Engineer" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          required
          value={draft.message}
          onChange={update('message')}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'c-message-error' : undefined}
        />
        {errors.message && (
          <p id="c-message-error" className="field__error">
            {errors.message}
          </p>
        )}
      </div>

      <div className="composer__actions">
        <button type="submit" className="btn btn--primary" disabled={!ready} aria-describedby={ready ? undefined : 'composer-note'}>
          <Send size={16} aria-hidden="true" />
          Open in email app
        </button>
        <button type="button" className="btn btn--secondary" onClick={onCopy}>
          <Copy size={16} aria-hidden="true" />
          Copy message
        </button>
      </div>

      {!ready && (
        <p id="composer-note" className="composer__note">
          <mark className="placeholder">Email address not set</mark> — add it in src/data/profile.ts to enable sending.
        </p>
      )}
      <p className="composer__status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  )
}
