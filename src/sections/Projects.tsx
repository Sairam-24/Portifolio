import { useState } from 'react'
import { ProjectMockup } from '../components/ProjectMockup'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { sectionNumber } from '../data/nav'
import { featuredProjects } from '../data/projects'

export function Projects() {
  const [selectedId, setSelectedId] = useState(featuredProjects[0]?.id ?? 'voice-agent')
  const currentProject = featuredProjects.find((p) => p.id === selectedId) ?? featuredProjects[0]!

  return (
    <Section
      id="projects"
      number={sectionNumber('projects')}
      eyebrow="Interactive Projects"
      title="Interactive AI Systems &amp; Production Pipelines"
      lead="Working engineering demonstrations, AI output inspectors, and architecture pipelines spanning Streaming Voice AI, Multimodal RAG, and Computer Vision."
    >
      {/* Project Switcher Bar */}
      <div className="project-switcher" role="tablist" aria-label="Featured projects">
        {featuredProjects.map((project, idx) => {
          const isSelected = project.id === currentProject.id
          return (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`project-tab${isSelected ? ' is-active' : ''}`}
              onClick={() => setSelectedId(project.id)}
            >
              <span className="project-tab-idx">0{idx + 1}</span>
              <div className="project-tab-info">
                <span className="project-tab-name">{project.title}</span>
                <span className="project-tab-badge">{project.badge}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Project Stage */}
      <Reveal className="project-stage-wrap">
        <div className="project-hero-card">
          <div className="project-hero-header">
            <div>
              <span className="project-hero-tagline">{currentProject.badge}</span>
              <h3 className="project-hero-title">{currentProject.title}</h3>
              <p className="project-hero-desc">{currentProject.description}</p>
            </div>

            <div className="project-hero-metrics">
              {currentProject.keyMetrics.map((metric) => (
                <div key={metric.label} className="hero-metric-box">
                  <span className="hero-metric-val">{metric.value}</span>
                  <span className="hero-metric-lbl">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Screen Mockup */}
          <ProjectMockup project={currentProject} />
        </div>
      </Reveal>
    </Section>
  )
}
