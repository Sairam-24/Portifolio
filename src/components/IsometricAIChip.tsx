export function IsometricAIChip() {
  return (
    <div className="iso-chip-container" aria-hidden="true">
      <svg
        viewBox="0 0 340 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="iso-chip-svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="chip-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          <linearGradient id="chip-core" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>

          <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="trace-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>

          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Glow */}
        <ellipse cx="170" cy="150" rx="120" ry="60" fill="url(#glow-grad)" />

        {/* Base PCB Plate */}
        <polygon
          points="170,80 270,135 170,190 70,135"
          fill="#0a1128"
          stroke="#1e3a8a"
          strokeWidth="2"
        />
        <polygon
          points="70,135 170,190 170,202 70,147"
          fill="#060b1c"
          stroke="#1e3a8a"
          strokeWidth="1.5"
        />
        <polygon
          points="170,190 270,135 270,147 170,202"
          fill="#080e22"
          stroke="#1e3a8a"
          strokeWidth="1.5"
        />

        {/* Circuit Traces */}
        <path d="M120 162 L100 173 L80 162" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
        <path d="M220 162 L240 173 L260 162" stroke="#818cf8" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
        <path d="M170 190 L170 215" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />

        {/* Central 3D AI Processor Die */}
        <g className="iso-core-mesh">
          {/* Chip Base Platform */}
          <polygon
            points="170,105 240,143 170,182 100,143"
            fill="url(#chip-core)"
            stroke="#38bdf8"
            strokeWidth="2.5"
            filter="url(#neon-glow)"
          />
          <polygon
            points="100,143 170,182 170,192 100,153"
            fill="#091026"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <polygon
            points="170,182 240,143 240,153 170,192"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />

          {/* Inner Glowing Crystal Inset */}
          <polygon
            points="170,118 222,146 170,175 118,146"
            fill="url(#chip-top)"
            stroke="#60a5fa"
            strokeWidth="1"
          />

          {/* "AI" Isometric Monogram */}
          <text
            x="170"
            y="152"
            fill="#ffffff"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
            transform="skewY(-10) scale(1, 0.85)"
            filter="drop-shadow(0 2px 8px rgba(56, 189, 248, 0.8))"
          >
            AI
          </text>
        </g>

        {/* Floating Holographic Satellite Tile 1: Brain (Top Left) */}
        <g className="iso-satellite iso-satellite--1">
          <polygon points="50,60 80,45 80,65 50,80" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
          <polygon points="50,60 80,45 110,60 80,75" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
          <circle cx="80" cy="60" r="8" fill="#a855f7" opacity="0.3" />
          <path d="M76 58 C76 55, 84 55, 84 58 C84 62, 76 60, 76 64" stroke="#c084fc" strokeWidth="1.5" fill="none" />
        </g>

        {/* Floating Holographic Satellite Tile 2: Mic (Top Right) */}
        <g className="iso-satellite iso-satellite--2">
          <polygon points="260,35 290,20 290,40 260,55" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <polygon points="260,35 290,20 320,35 290,50" fill="#172554" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="290" cy="35" r="8" fill="#38bdf8" opacity="0.3" />
          <rect x="288" y="30" width="4" height="8" rx="2" fill="#38bdf8" />
        </g>

        {/* Floating Holographic Satellite Tile 3: Image / Gallery (Right) */}
        <g className="iso-satellite iso-satellite--3">
          <polygon points="290,110 320,95 320,115 290,130" fill="#0f172a" stroke="#c084fc" strokeWidth="1.5" />
          <polygon points="290,110 320,95 350,110 320,125" fill="#2e1065" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="320" cy="110" r="7" fill="#c084fc" opacity="0.3" />
          <path d="M315 112 L318 107 L322 111 L325 106" stroke="#e879f9" strokeWidth="1.5" fill="none" />
        </g>

        {/* Floating Holographic Satellite Tile 4: Document (Bottom Right) */}
        <g className="iso-satellite iso-satellite--4">
          <polygon points="285,185 315,170 315,190 285,205" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <polygon points="285,185 315,170 345,185 315,200" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M310 182 H320 M310 186 H320 M310 190 H316" stroke="#38bdf8" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

