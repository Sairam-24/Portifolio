export function TechMarquee() {
  const techs = [
    { name: 'Python', color: '#38bdf8' },
    { name: 'FastAPI', color: '#059669' },
    { name: 'faster-whisper', color: '#22d3ee' },
    { name: 'Streaming LLMs', color: '#818cf8' },
    { name: 'Kokoro & Piper TTS', color: '#a855f7' },
    { name: 'WebSockets', color: '#f59e0b' },
    { name: 'RAG & BM25', color: '#ec4899' },
    { name: 'PostgreSQL', color: '#3b82f6' },
    { name: 'Docker', color: '#0ea5e9' },
    { name: 'Asyncio & Concurrency', color: '#10b981' },
    { name: 'React 19 & Vite', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Vision-Language Models', color: '#c084fc' },
  ]

  return (
    <div className="tech-marquee-container" aria-hidden="true">
      <div className="tech-marquee-track">
        {[...techs, ...techs].map((tech, idx) => (
          <div key={idx} className="tech-marquee-pill">
            <span className="marquee-dot" style={{ backgroundColor: tech.color }} />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

