# Testing checklist

Run this on `npm run preview` before deploying, then again on the real deployed URL. Tick items as you go.

The development of this project included automated browser checks (interactions, overflow at 11 widths from 320 to 1920 px, axe-core accessibility audits, text-contrast measurement). They do not replace a quick look by you on a real phone.

## 1. Mobile and responsive layout

Test in your browser's device toolbar (Chrome/Edge: F12 → toggle device toolbar) **and** on at least one real phone.

- [ ] **320 px** (smallest phones): nothing is cut off, no horizontal scrollbar, text is readable.
- [ ] **375 px and 414 px** (typical phones): hero buttons wrap cleanly; the primary button is full width.
- [ ] **768 px** (tablet portrait): case studies in two columns with the third spanning the row; project tabs stacked.
- [ ] **1024 px and 1280 px** (laptop): three-column case studies and metrics; full navigation bar.
- [ ] **1920 px** (large desktop): content stays centred and readable, not stretched.
- [ ] Rotate a phone to landscape: the case study dialog still scrolls and its close button is reachable.
- [ ] Zoom the browser to 200% and 400% (WCAG reflow): content reflows to one column, nothing overlaps or hides.
- [ ] Pinch-zoom works on the phone (it is not disabled).
- [ ] Hero image/diagram does not push the headline off-screen on short screens.

## 2. Navigation and interactive controls

- [ ] Every header link scrolls to its section and the section title is not hidden behind the sticky header.
- [ ] The active link highlights as you scroll, and no link is highlighted at the very top.
- [ ] The brand/monogram link returns to the top.
- [ ] **Mobile menu:** the hamburger opens the list; tapping a link closes it and scrolls; Escape closes it and returns focus to the button; resizing to desktop width closes it.
- [ ] **Case studies:** each of the three cards opens a dialog; Close button, Escape and a click outside all close it; the page behind does not scroll while it is open; focus returns to the card's button.
- [ ] Previous/Next inside a dialog switches studies and returns to the top.
- [ ] Browser **Back** closes an open case study; opening `…/#case-ai-performance` directly shows that case study.
- [ ] The "See the measurement approach" link in Impact opens the performance case study.
- [ ] **Project tabs:** click each; with a tab focused, Left/Right/Up/Down arrows move between tabs and Home/End jump to first/last; the roadmap phases expand and collapse.
- [ ] **Contact form:** submitting empty shows two errors; with a name and message, "Open in email app" opens your mail client with a filled subject and body; "Copy message" copies the text; with no email configured, the send button is disabled and says why.
- [ ] Email "Copy" button copies the address (when an email is set).
- [ ] Every external link opens in a new tab; every link works (click them all, including LinkedIn, GitHub and résumé).
- [ ] The résumé PDF opens and is the right file and version.
- [ ] Missing links are hidden (not dead) when `draftMode` is `false`.
- [ ] No console errors in DevTools on load or while using the site.

## 3. Accessibility

**Keyboard only (put the mouse away)**
- [ ] First Tab stop is "Skip to main content", and it works.
- [ ] You can reach and operate every link, button, tab, form field and dialog control.
- [ ] Focus is always visible (cyan outline) and the order matches the visual order.
- [ ] Focus never gets trapped, except inside an open dialog (by design), and Escape always leaves it.

**Screen reader** (NVDA on Windows is free; VoiceOver on macOS/iOS; TalkBack on Android)
- [ ] The page title and a single main heading are announced; headings form a sensible outline (open the headings list).
- [ ] Landmarks exist: banner, navigation (two, labelled), main, footer.
- [ ] Buttons and links have meaningful names (for example "Read case study: AI-assisted visual inspection").
- [ ] The dialog is announced with its title; tabs announce "tab, selected, 1 of 3".
- [ ] Before/after charts are announced as a summary sentence, not as a stream of numbers.
- [ ] The "Copied" and form-status messages are announced.

**Visual and motion**
- [ ] Turn on your OS "reduce motion" setting: animation stops (pulsing dot, rotating rings, flowing lines, scroll fades, bar growth) and content is simply visible.
- [ ] Windows High Contrast / forced-colors mode: all text and controls remain visible.
- [ ] Information is never conveyed by colour alone (status badges have text and an icon).
- [ ] Run an automated audit as a second opinion: the **axe DevTools** browser extension or **Lighthouse → Accessibility**. Expect 100 or close to it. Investigate anything flagged rather than dismissing it. Colour-contrast results marked "needs review" occur on translucent cards and are not failures.

## 4. Performance and SEO

- [ ] Lighthouse (Chrome DevTools → Lighthouse, mobile) on the **deployed** site: Performance, Accessibility, Best Practices and SEO all green. The production JS bundle is about 95 kB gzipped; if Performance is low, test again in a private window with extensions disabled.
- [ ] View source on the deployed site: the title, meta description, `og:` and `twitter:` tags are present, and (with `SITE_URL` set) so are the canonical link and absolute `og:image`.
- [ ] Open `<your-url>/og-image.png`, `/favicon.svg`, `/robots.txt`: all load (no 404).
- [ ] The favicon shows in the browser tab; "Add to home screen" on iOS uses the touch icon.
- [ ] Share the URL in LinkedIn/Slack/WhatsApp or a social-card validator to confirm the preview image and text look right. Previews are cached, so check before the first public share.

## 5. Deployment

- [ ] `npm run build` succeeds on a clean checkout: delete `node_modules` and `dist`, then run `npm ci && npm run build`.
- [ ] The deployed URL loads over **HTTPS** and the padlock shows.
- [ ] Fonts load from the same domain (DevTools → Network: no requests to other domains).
- [ ] Refresh the page while a case study is open (`#case-…` in the URL): it reopens the same case study.
- [ ] A hard refresh (Ctrl+Shift+R) shows the latest content after a redeploy.
- [ ] **GitHub Pages:** Settings → Pages shows "Your site is live", the Actions run is green, and assets load from `/<repository>/…` without 404s.
- [ ] **Cloudflare:** the deployment is Active; `_headers` took effect (DevTools → Network → select the document → Response headers show `x-content-type-options: nosniff`).
- [ ] Custom domain (if used): both `https://example.com` and `https://www.example.com` behave as intended, and `SITE_URL` matches the one you want indexed.
- [ ] Test the deployed site on at least one phone over mobile data, not only your home Wi-Fi.
