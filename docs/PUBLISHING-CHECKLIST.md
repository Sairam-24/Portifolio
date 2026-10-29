# Publishing checklist

Work through this top to bottom before you share the URL with anyone. Tick each box only after you have looked at the real thing, not after you remember doing it.

Start with `npm run check:publish`. It finds mechanical problems (leftover placeholders, empty links, names you registered as confidential). Everything below it needs your judgment.

## 1. Personal details to replace

See the table in the [README](../README.md#replace-these-before-publishing). In short:

- [ ] `links.email`, `links.linkedin`, `links.github` (leave GitHub empty if you have no public work yet), `links.resume` in `src/data/profile.ts`
- [ ] Résumé PDF placed in `public/` and the file name entered in `links.resume`
- [ ] Employer, start date and the optional company note in `src/data/experience.ts`
- [ ] The two optional `[[...]]` sentences in the optimization case study: written, or deleted
- [ ] `SITE_URL` set for your final address
- [ ] `siteConfig.draftMode` set to `false` (last step)

## 2. Confidentiality and privacy review

The site contains no company names, product names, customer data, source code, credentials or screenshots from your employer as delivered. Your edits are what could change that. Check each item deliberately.

**Names and identifiers**
- [ ] Copy `scripts/confidential-terms.example.txt` to `scripts/confidential-terms.txt` and list your employer, every client, and every internal product, project or tool code name. Run `npm run check:publish`.
- [ ] Search the site yourself for names that are not in your list: abbreviations, internal acronyms, team names, client industries narrow enough to identify them.
- [ ] If you named your employer in the experience entry, you are allowed to do so (your LinkedIn already shows it, or your contract permits it).

**Technical and business detail**
- [ ] No source code, file names, class names, database table or column names, endpoints or schemas from the real system.
- [ ] No proprietary model choices, prompt text, thresholds, datasets, accuracy figures, volumes or pricing.
- [ ] No customer data, customer counts, locations or volumes, even approximate.
- [ ] No internal screenshots, diagrams or UI. The workflow diagrams on the site are generalized patterns; confirm they cannot be mistaken for your employer's actual architecture.
- [ ] No credentials, URLs of internal systems, or anything that reveals internal infrastructure.

**The measured results**
- [ ] For each of the three metrics, you are allowed to publish it. If your contract, an NDA or company policy covers performance figures, ask your manager or the relevant team in writing, and set `public: false` in `src/data/metrics.ts` for anything you are not cleared to share.
- [ ] Each figure matches what you actually measured (34.5 s → 23.2 s median over 27 real checks; about 147 → 179 checks per hour in live two-device testing; 28 s → under 1 s for saving 23 photos).
- [ ] The test context on each card is accurate. Add detail you are comfortable disclosing (for example, how many runs the photo-save timing used) in `context` and `method` in `src/data/metrics.ts`. If a figure cannot be explained in an interview, remove it.
- [ ] The page says the figures are self-reported from internal tests, not independently verified, and not guarantees. Keep that wording.

**Accuracy of claims (interviewers will probe these)**
- [ ] Every sentence under "My contribution" in each case study is true of your own work. Remove or rewrite anything that is not.
- [ ] The "Team context" lines do not claim more or less than reality.
- [ ] Experience highlights, dates and title match your LinkedIn profile and résumé exactly.
- [ ] The skills list contains only tools you have used and can discuss.
- [ ] The three independent projects are still labelled **Planned** (or **In progress** only if a public repository with real commits exists).

**Files and metadata**
- [ ] Résumé PDF: it contains no confidential employer content, and its document properties (author, title, company) are what you want public.
- [ ] Any image you add has its metadata (EXIF location, device) stripped.
- [ ] The email address you publish is one you are happy to receive spam on. Consider a dedicated address; anything on a public page is harvestable.
- [ ] You are comfortable that your name, city and job title are public (they are in the page title and metadata).

**Repository**
- [ ] If the repository is public, check its whole history, not just the latest commit, for anything you would not publish. Unfinished drafts with real names are the usual culprit.
- [ ] `scripts/confidential-terms.txt` is not committed (it is in `.gitignore` already; confirm with `git status`).
- [ ] No `.env` files with real values are committed. This project needs no secrets, so there should be nothing to commit.

## 3. Final automated and manual gates

- [ ] `npm run check:publish` reports "No blockers found" and you have read every warning.
- [ ] `npm run build` succeeds.
- [ ] `npm run preview`: click every nav item, open all three case studies, switch all three project tabs, open the contact form.
- [ ] Complete [TESTING-CHECKLIST.md](TESTING-CHECKLIST.md) on the real deployed URL, not only locally.
- [ ] Share the deployed link with one trusted colleague or friend and ask them to look for anything that feels too specific or too boastful.

## 4. After you publish

- [ ] Paste the URL into LinkedIn (Featured section and Contact info) and your résumé.
- [ ] Test the social preview by posting the link in a private chat or a post draft. Platforms cache previews, so fix the image before the first share.
- [ ] Put a reminder in your calendar to revisit the **Projects** section when you start your first repository, so the status changes only when real work is public.
