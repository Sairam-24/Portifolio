#!/usr/bin/env node
/**
 * Pre-publish checklist runner:  npm run check:publish
 *
 * BLOCKERS (exit code 1):
 *   - [[placeholders]] still present in src/data
 *   - siteConfig.draftMode is still true
 *   - a term from scripts/confidential-terms.txt appears anywhere in the site source
 *
 * WARNINGS (listed, do not fail the check):
 *   - empty links in src/data/profile.ts (they are hidden once draftMode is false)
 *   - metrics that will be shown publicly (you must approve each one)
 *   - planned projects whose status and repoUrl disagree
 *   - SITE_URL not set (canonical URL and social image tags are omitted)
 *
 * It uses plain text matching, so it works on any Node version the project supports.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const rel = (file) => path.relative(root, file).replaceAll('\\', '/')
const read = (file) => readFileSync(path.join(root, file), 'utf8')

const useColor = process.stdout.isTTY
const paint = (code, text) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text)
const red = (t) => paint(31, t)
const yellow = (t) => paint(33, t)
const green = (t) => paint(32, t)
const bold = (t) => paint(1, t)
const dim = (t) => paint(2, t)

const blockers = []
const warnings = []

/** Remove block comments and whole-line // comments so documentation is not mistaken for content. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, ' '))
    .split('\n')
    .map((line) => (/^\s*\/\//.test(line) ? '' : line))
    .join('\n')
}

function walk(dir, extensions) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) out.push(...walk(full, extensions))
    else if (extensions.includes(path.extname(name))) out.push(full)
  }
  return out
}

// ---------------------------------------------------------------- placeholders
for (const file of walk(path.join(root, 'src', 'data'), ['.ts'])) {
  const lines = stripComments(readFileSync(file, 'utf8')).split('\n')
  lines.forEach((line, index) => {
    for (const match of line.matchAll(/\[\[(.+?)\]\]/g)) {
      blockers.push(`${rel(file)}:${index + 1}  placeholder  [[${match[1]}]]`)
    }
  })
}

// ---------------------------------------------------------------- profile
const profileSource = stripComments(read('src/data/profile.ts'))

if (/draftMode:\s*true/.test(profileSource)) {
  blockers.push('src/data/profile.ts  siteConfig.draftMode is still true (the "Draft" banner would be public)')
}

for (const key of ['email', 'linkedin', 'github', 'resume']) {
  const match = profileSource.match(new RegExp(`\\b${key}:\\s*(['"])(.*?)\\1`))
  const value = match?.[2]?.trim() ?? ''
  if (!value) {
    warnings.push(`links.${key} is empty, so it will be hidden on the published site`)
  } else if (key === 'resume' && !/^https?:\/\//i.test(value) && !existsSync(path.join(root, 'public', value))) {
    blockers.push(`links.resume points to "${value}" but public/${value} does not exist`)
  } else if (['linkedin', 'github'].includes(key) && !/^https:\/\//i.test(value)) {
    warnings.push(`links.${key} should be a full https:// URL (found "${value}")`)
  } else if (key === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    blockers.push(`links.email "${value}" does not look like an email address`)
  }
}

// ---------------------------------------------------------------- metrics
const metricsSource = stripComments(read('src/data/metrics.ts'))
const publicMetricIds = []
for (const match of metricsSource.matchAll(/id:\s*'([^']+)',\s*public:\s*(true|false)/g)) {
  if (match[2] === 'true') publicMetricIds.push(match[1])
}
if (publicMetricIds.length) {
  warnings.push(`${publicMetricIds.length} metric(s) will be public: ${publicMetricIds.join(', ')}. Confirm you may disclose each one (set public: false in src/data/metrics.ts to hide).`)
}

// ---------------------------------------------------------------- planned projects
const projectsSource = stripComments(read('src/data/plannedProjects.ts'))
const projectBlocks = projectsSource.split(/\n  \{\n    id: /).slice(1)
for (const block of projectBlocks) {
  const id = block.match(/^'([^']+)'/)?.[1] ?? 'unknown'
  const status = block.match(/status:\s*'([^']+)'/)?.[1]
  const repo = block.match(/repoUrl:\s*'([^']*)'/)?.[1]
  if (status === 'planned' && repo) warnings.push(`project "${id}" has a repoUrl but status is still 'planned'`)
  if (status && status !== 'planned' && !repo) blockers.push(`project "${id}" is '${status}' but has no repoUrl`)
}

// ---------------------------------------------------------------- confidential terms
const termsFile = path.join(root, 'scripts', 'confidential-terms.txt')
const terms = existsSync(termsFile)
  ? readFileSync(termsFile, 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
  : []

if (!existsSync(termsFile)) {
  warnings.push('scripts/confidential-terms.txt does not exist. Copy scripts/confidential-terms.example.txt to it and list employer, client and product names so they are searched for automatically.')
} else if (terms.length === 0) {
  warnings.push('scripts/confidential-terms.txt has no terms yet. Add employer, client and product names (one per line).')
} else {
  const targets = [...walk(path.join(root, 'src'), ['.ts', '.tsx', '.css']), path.join(root, 'index.html'), ...walk(path.join(root, 'public'), ['.txt', '.svg', '.html'])]
  for (const file of targets) {
    const lines = readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, index) => {
      for (const term of terms) {
        if (line.toLowerCase().includes(term.toLowerCase())) {
          blockers.push(`${rel(file)}:${index + 1}  contains confidential term "${term}"`)
        }
      }
    })
  }
}

// ---------------------------------------------------------------- environment
if (!process.env.SITE_URL) {
  warnings.push('SITE_URL is not set: the build will omit the canonical URL and the social-preview image tags (see .env.example)')
}

// ---------------------------------------------------------------- report
console.log(bold('\nPublish check\n'))

if (blockers.length) {
  console.log(red(bold(`Blockers (${blockers.length})`)) + dim('  fix these before publishing'))
  for (const item of blockers) console.log('  ' + red('✖') + ' ' + item)
  console.log()
}

if (warnings.length) {
  console.log(yellow(bold(`Review (${warnings.length})`)) + dim('  decide whether each one is intended'))
  for (const item of warnings) console.log('  ' + yellow('!') + ' ' + item)
  console.log()
}

console.log(dim('Also walk through docs/PUBLISHING-CHECKLIST.md, especially the confidentiality review.\n'))

if (blockers.length) {
  console.log(red(bold('Not ready to publish.')) + '\n')
  process.exit(1)
}
console.log(green(bold('No blockers found.')) + (warnings.length ? ' Review the items above, then publish.' : '') + '\n')
