import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { profile } from './src/data/profile.ts'

/**
 * Adds the metadata that needs an absolute URL (canonical, og:url, og:image)
 * and a JSON-LD "Person" block. URL-dependent tags are only emitted when
 * SITE_URL is set, so the build never ships a placeholder or broken address.
 */
function seoPlugin(siteUrl: string): Plugin {
  const origin = siteUrl ? siteUrl.replace(/\/+$/, '') + '/' : ''
  return {
    name: 'portfolio-seo',
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = []

      if (origin) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: origin }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: origin }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: origin + 'og-image.png' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: origin + 'og-image.png' }, injectTo: 'head' },
        )
      } else {
        console.warn('\n[portfolio-seo] SITE_URL is not set: canonical URL and og:image tags are omitted.\n')
      }

      const sameAs = [profile.links.linkedin, profile.links.github].filter((l) => /^https?:\/\//.test(l))
      const person: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.title,
        address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'IN' },
        knowsAbout: ['Generative AI', 'Large language models', 'Retrieval-augmented generation', 'Computer vision', 'Multimodal AI'],
      }
      if (origin) person.url = origin
      if (sameAs.length) person.sameAs = sameAs

      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(person),
        injectTo: 'head',
      })
      return tags
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // Relative base: works on Cloudflare Pages, GitHub Pages (project or user
    // site) and any static host without further configuration.
    base: env.BASE_PATH || './',
    plugins: [react(), seoPlugin(env.SITE_URL ?? '')],
    build: {
      target: 'es2022',
      sourcemap: false,
    },
  }
})
