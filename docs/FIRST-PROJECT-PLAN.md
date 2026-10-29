# Plan: your first independent public AI project

## Recommendation: build the RAG research assistant first

Your site lists **RAG** as a core strength, but none of your three case studies can show it publicly, because your professional work is confidential and does not cover it. A public RAG project closes that exact gap. It is also the project recruiters for LLM and Generative AI roles most expect to see.

Plain "chat with your PDF" demos are everywhere, so a basic version will not stand out. What makes this one credible is the part most demos skip: **a small, honest evaluation**. You already work that way professionally (measure, change one thing, re-measure, report conditions). Applying the same discipline to RAG is your differentiator.

**Suggested order across all three projects**

1. **RAG research assistant with citations** (this plan). Highest hiring relevance, fills the evidence gap, and its evaluation harness is reusable.
2. **AI inference benchmarking dashboard.** Turns your strongest professional identity (performance measurement) into public work, and can reuse the RAG project's evaluation code to score output quality.
3. **Multimodal image analysis with structured JSON.** Closest to your employer's domain, so keep it strictly on public images and a different task, and do it last so there is no pressure to resemble anything confidential.

## Scope: keep it small enough to finish

The most common failure is a project that stays at 70%. Fix the scope now.

**In scope (the minimum that is still impressive)**
- 20–40 freely licensed public documents (for example open-access papers or public documentation), with licenses recorded.
- Ingest → chunk → embed → retrieve → answer **with citations to source passages**.
- Abstains ("I can't find that in the documents") when evidence is weak.
- 30–50 hand-written evaluation questions with the passage that answers each, scored automatically.
- A README with architecture, setup, results **including failures**, and limitations.

**Out of scope for v0.1** (write them under "Future work" instead): user accounts, many file formats, fine-tuning, agents, multi-user deployment, a fancy interface.

**Choices that reduce risk**
- Use **PostgreSQL with pgvector**: you already know PostgreSQL, so you spend time on RAG, not on a new database.
- Use **Flask** for the API: you already know it. Switch to FastAPI only if you specifically want streaming and async.
- Use a **local open model through Ollama** (and an open embedding model) so anyone can reproduce your results without paying for an API. A hosted model can be an optional extra.
- Build the **command-line version first**, the interface last.

## Prioritized plan

Estimates assume part-time work (roughly 8–10 hours a week). Do the priorities in order; do not start P2 before P1 works.

### P0: Foundations (2–3 days)
1. Pick the document set and write down each license. Fewer, better documents beat many.
2. **Write the evaluation questions before any code.** For each, record the question and the document and passage that answers it. Include 5–8 questions the documents cannot answer, to test abstention.
3. Create the public repository on GitHub: README skeleton stating the goal, a license (MIT is the usual choice), `.gitignore`, and an issues list or project board using the phases below.

### P1: Baseline pipeline, command line (1–2 weeks)
4. Ingestion: parse, chunk (start simple: fixed size with overlap), store text plus metadata (document, page or section).
5. Embeddings into pgvector; retrieve top-k.
6. Answer generation from the retrieved passages only, with citations that point to the source passage.
7. Make it runnable with one documented command. **Commit small and often**; the commit history is part of what a reviewer reads.

### P2: Evaluation (1 week) — the part that sets you apart
8. Script that runs every question and records: was the right passage retrieved (hit rate at k), is the citation correct, and for unanswerable questions did it abstain.
9. Run it, save the results table in the repo, and note **where it fails and why**.
10. Make one change at a time (chunk size, k, keyword plus vector hybrid, a reranker) and re-run. Keep a short log of what helped and what did not. This is your professional methodology, shown publicly.

### P3: Interface and hardening (1 week)
11. A small web page that shows the answer beside its cited source passages.
12. Tests for the pipeline pieces, a Docker Compose file so someone else can run it, and a continuous-integration workflow that runs the tests.

### P4: Publish (2–3 days)
13. README: what it is, an architecture diagram, setup in a few commands, evaluation results and failures, limitations, and future work.
14. Tag `v0.1.0`.
15. **Only now** update this site: in `src/data/plannedProjects.ts` set `status` (`'in-progress'` once the repository has real work, `'published'` when it meets the "counts as published when" list) and add `repoUrl`. Add a screenshot or demo link only if it exists and works. Set `links.github` in `src/data/profile.ts` so the GitHub button appears.
16. Add the repository to your LinkedIn Featured section and mention one concrete finding from your evaluation (for example, what changed when you added hybrid retrieval).

## Quality bar before you call it published

- [ ] A stranger can clone the repository and reproduce your evaluation numbers from the README alone.
- [ ] The README reports failures and limitations, not only wins.
- [ ] There are no secrets, keys or private documents in the repository or its history.
- [ ] You can explain every design choice in an interview: why this chunk size, why this k, what the evaluation does and does not prove.

## Pitfalls to avoid

- **Overclaiming.** "Works well" without numbers is weaker than "retrieves the right passage for 31 of 40 questions; fails mostly on tables".
- **Evaluating on questions you tuned against.** Keep roughly a quarter of the questions untouched until the end.
- **Scope creep.** Every new feature before P2 is done is a delay of the part that matters most.
- **Leaking confidential patterns.** Use different documents, a different domain and different structure from your employer's products.
- **Going silent.** Commit weekly. A repository with steady real commits is more convincing than one big upload.

## Interview talking points this project gives you

- How you chose chunking and retrieval settings, and the evidence for it.
- How you measured quality, and one thing that surprised you.
- When the system should refuse to answer, and how you tested that.
- Trade-offs between a local model and a hosted one: cost, latency, quality, reproducibility.
- What you would do next with more time.
