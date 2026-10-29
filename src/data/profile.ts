/**
 * Personal details and links. This file is the first place to edit.
 *
 * Conventions used across src/data:
 *  - A value written as [[like this]] is a placeholder. It renders in amber so
 *    it is impossible to miss, and `npm run check:publish` lists every one.
 *  - An empty string for a link means "not provided yet". While draftMode is
 *    true the site shows a disabled amber button; once draftMode is false, links
 *    that are still empty are hidden instead of shown broken.
 *
 * Keep this file free of imports: vite.config.ts reads it at build time to
 * generate the JSON-LD metadata.
 */

export const siteConfig = {
  /**
   * While true, a banner at the top of the page says this is a draft and
   * placeholders are highlighted. Set to false right before you publish.
   */
  draftMode: false,
}

export const profile = {
  name: 'Sai Babu Polisetti',
  /** Initials shown in the header monogram. */
  initials: 'SP',
  title: 'Senior AI Engineer · Applied AI & Intelligent Systems',
  location: 'Hyderabad, India',

  /** Short description used for SEO fallback and the hero. Keep under ~160 characters. */
  tagline:
    'Senior AI Engineer building end-to-end production AI: low-latency streaming Voice AI, grounded RAG retrieval systems, multimodal computer vision, and high-throughput Python backends.',

  openTo: {
    roles: ['Senior AI Engineer', 'AI Engineer', 'Applied AI Engineer', 'LLM & Systems Engineer'],
    where: 'Hyderabad, India (open to suitable national & international roles)',
  },

  /**
   * Links you must provide. Leave "" until you have the real value.
   *  - email:    your address, e.g. "name@example.com" (no "mailto:")
   *  - linkedin: full URL, e.g. "https://www.linkedin.com/in/your-handle"
   *  - github:   full URL, e.g. "https://github.com/your-username"
   *  - resume:   a full URL, or a file you place in /public, e.g. "SaiBabu-Polisetti-Resume.pdf"
   */
  links: {
    email: 'polisettisaibabu@gmail.com',
    linkedin: 'https://www.linkedin.com/in/saipolisetti/',
    github: 'https://github.com/Sairam-24',
    resume: '',
  },
}

export type Links = typeof profile.links
