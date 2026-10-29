/**
 * Measured results. Every number here comes from your own brief.
 *
 * TO REMOVE A METRIC: set `public: false` (or delete the entry). It disappears
 * from the hero, the Impact section, the case study and the experience entry.
 * No other file repeats these numbers, so there is nothing else to clean up.
 *
 * Percentages are calculated from `before` and `after` so they can never drift
 * out of sync with the numbers. Add your own exact test conditions to
 * `context` and `method` where you are able to share them.
 */

export type Metric = {
  id: string
  /** false = hidden everywhere on the site. */
  public: boolean
  label: string
  /** Short label for the hero. */
  heroLabel: string
  /** Test context shown with the hero figure, e.g. the sample size. */
  heroNote: string
  unit: 'seconds' | 'checks/hour'
  /** Lower is better ('down') or higher is better ('up'). */
  better: 'down' | 'up'
  before: { value: number; display: string }
  after: { value: number; display: string; approxBelow?: boolean }
  /** Show the calculated percentage change. False when the "after" value is only a bound ("under 1 s"). */
  showPercent: boolean
  /** Workload unit (e.g. Per Check, Per Batch, Per Hour, Per Query) */
  workload: string
  /** What exactly was measured, in plain terms */
  context: string
  /** Why the baseline was slow / bottlenecked */
  baselineCause: string
  /** The engineering optimization that produced the result */
  optimizationDetail: string
  /** How it was measured */
  method: string
}

export const metrics: Metric[] = [
  {
    id: 'median-processing-time',
    public: true,
    label: 'Median AI check-processing time',
    heroLabel: 'median AI check-processing time',
    heroNote: '27 real checks',
    unit: 'seconds',
    better: 'down',
    before: { value: 34.5, display: '34.5 s' },
    after: { value: 23.2, display: '23.2 s' },
    showPercent: true,
    workload: 'Per Inspection Check (27 Real Audits)',
    context: 'Measured across 27 real checks, comparing the median before and after pipeline parallelization.',
    baselineCause: 'Sequential I/O bottleneck: GPU VLM remained idle while waiting for CPU photo decoding and resizing.',
    optimizationDetail: 'Parallel CPU/GPU pipeline: Offloaded image transforms to concurrent worker threads, overlapping compute.',
    method: 'Median rather than mean, so a few unusually slow checks do not distort the result.',
  },
  {
    id: 'checks-per-hour',
    public: true,
    label: 'System Concurrency Throughput',
    heroLabel: 'checks per hour',
    heroNote: 'live two-device testing',
    unit: 'checks/hour',
    better: 'up',
    before: { value: 147, display: '≈147' },
    after: { value: 179, display: '179' },
    showPercent: true,
    workload: 'Throughput Under Multi-Device Load',
    context: 'Measured in live two-device testing simulating simultaneous audit workflows.',
    baselineCause: 'Synchronous queue contention: Single-worker bottleneck caused queue starvation under multi-device load.',
    optimizationDetail: 'Asyncio worker pools: Bounded queues and connection pools enabled continuous non-blocking dispatch.',
    method: 'Checks completed per hour of live multi-device use, before and after the architecture change.',
  },
  {
    id: 'save-23-photos',
    public: true,
    label: 'Time to save 23 photos',
    heroLabel: 'to save 23 photos',
    heroNote: 'after database transaction optimization',
    unit: 'seconds',
    better: 'down',
    before: { value: 28, display: '28 s' },
    after: { value: 1, display: '< 1 s', approxBelow: true },
    showPercent: false,
    workload: 'Per Batch of 23 High-Res Photos',
    context: 'Saving a batch of 23 photos and metadata before and after database transaction optimization.',
    baselineCause: 'Round-trip serialization: 23 individual per-photo commits created heavy network & lock contention.',
    optimizationDetail: 'Atomic transaction batching: Grouped photos and metadata into a single prepared PostgreSQL transaction.',
    method: 'The “after” figure is reported as under one second, so no exact percentage is claimed.',
  },
  {
    id: 'voice-first-audio',
    public: true,
    label: 'Voice Agent Time-to-First-Audio',
    heroLabel: 'voice first audio',
    heroNote: '2-core CPU local fallback',
    unit: 'seconds',
    better: 'down',
    before: { value: 5.8, display: '5.8 s' },
    after: { value: 2.5, display: '2.5 s' },
    showPercent: true,
    workload: 'Per Conversational Query (Local 2-Core CPU)',
    context: 'End-to-end speech latency benchmark on local 2-core CPU without dedicated GPU acceleration.',
    baselineCause: 'Full generation wait: Neural speech synthesis waited for complete LLM completion before generating audio.',
    optimizationDetail: 'Sub-sentence streaming: Audio synthesis starts on the 1st completed clause while LLM streaming continues.',
    method: 'Wall-clock time from end of user utterance to first audio PCM chunk playback.',
  },
]

export const publicMetrics = (): Metric[] => metrics.filter((m) => m.public)

export const getMetric = (id: string): Metric | undefined => publicMetrics().find((m) => m.id === id)

/** Calculated change as a whole-number percentage, e.g. 33 for 34.5 → 23.2. */
export function changePercent(m: Metric): number {
  return Math.round((Math.abs(m.after.value - m.before.value) / m.before.value) * 100)
}

/** "−33%" or "+22%". */
export function changeLabel(m: Metric): string {
  const sign = m.better === 'down' ? '−' : '+'
  return `${sign}${changePercent(m)}%`
}

/** Compact headline figure: the percentage change, or "before → after" when no percentage is claimed. */
export function headline(m: Metric): string {
  return m.showPercent ? changeLabel(m) : `${m.before.display} → ${m.after.display}`
}

/**
 * Bar widths (0–100) for the before/after comparison. Values are scaled against
 * the larger of the two. A tiny "after" is given a minimum visible width.
 */
export function barWidths(m: Metric): { before: number; after: number } {
  const max = Math.max(m.before.value, m.after.value)
  const clamp = (v: number) => Math.max(4, Math.round((v / max) * 100))
  return { before: clamp(m.before.value), after: clamp(m.after.value) }
}
