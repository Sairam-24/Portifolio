/**
 * Decorative system map: a model at the centre with the surrounding pieces of a
 * real AI application. It is an illustration, not data, so it is hidden from
 * assistive technology. Animation is CSS-only and disabled for reduced motion.
 */
const CENTER = 260
const RADIUS = 186

const nodes = [
  { label: 'Vision', angle: -120 },
  { label: 'LLM', angle: -60 },
  { label: 'RAG', angle: 0 },
  { label: 'API', angle: 60 },
  { label: 'Data', angle: 120 },
  { label: 'Eval', angle: 180 },
].map((node) => {
  const rad = (node.angle * Math.PI) / 180
  return { ...node, x: CENTER + RADIUS * Math.cos(rad), y: CENTER + RADIUS * Math.sin(rad) }
})

export function HeroVisual() {
  return (
    <svg className="hero-visual" viewBox="0 0 520 520" role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hv-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.55" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#9a7bff" />
        </linearGradient>
        <radialGradient id="hv-core" cx="50%" cy="40%" r="65%">
          <stop offset="0" stopColor="#1b2c66" />
          <stop offset="1" stopColor="#0a1030" />
        </radialGradient>
        <radialGradient id="hv-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#5b8cff" stopOpacity="0.38" />
          <stop offset="1" stopColor="#5b8cff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CENTER} cy={CENTER} r="250" fill="url(#hv-halo)" />

      <circle className="hv-ring hv-ring--slow" cx={CENTER} cy={CENTER} r={RADIUS} />
      <circle className="hv-ring hv-ring--fast" cx={CENTER} cy={CENTER} r="112" />

      {nodes.map((node) => (
        <line key={node.label} className="hv-link" x1={CENTER} y1={CENTER} x2={node.x} y2={node.y} />
      ))}

      <circle cx={CENTER} cy={CENTER} r="58" fill="url(#hv-core)" stroke="url(#hv-stroke)" strokeWidth="2" />
      <circle cx={CENTER} cy={CENTER} r="72" fill="none" stroke="url(#hv-stroke)" strokeOpacity="0.35" />
      <text x={CENTER} y={CENTER + 5} textAnchor="middle" className="hv-core-text">
        MODEL
      </text>

      {nodes.map((node) => (
        <g key={node.label} transform={`translate(${node.x - 52} ${node.y - 21})`}>
          <rect width="104" height="42" rx="12" className="hv-node" />
          <circle cx="20" cy="21" r="4.5" fill="url(#hv-stroke)" />
          <text x="34" y="26" className="hv-node-text">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
