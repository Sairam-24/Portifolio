import { Brain, Database, Eye, Gauge, GitBranch, Library, Server, Sparkles } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { Spot } from '../components/Spot'
import { sectionNumber } from '../data/nav'
import { skillGroups, type SkillIcon } from '../data/skills'

const icons: Record<SkillIcon, typeof Brain> = {
  brain: Brain,
  sparkles: Sparkles,
  library: Library,
  eye: Eye,
  server: Server,
  database: Database,
  gauge: Gauge,
  git: GitBranch,
}

export function Skills() {
  return (
    <Section
      id="skills"
      number={sectionNumber('skills')}
      eyebrow="Technical skills"
      title="What I work with"
      lead="Grouped by the kind of problem they solve. This lists skills from my professional work only."
    >
      <ul className="skills">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.icon]
          return (
            <li key={group.id}>
              <Reveal delay={(index % 4) * 60} className="skills__item">
                <Spot as="article" className="skill-card">
                  <div className="skill-card__head">
                    <span className="skill-card__icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3>{group.title}</h3>
                      <p className="skill-card__blurb">{group.blurb}</p>
                    </div>
                  </div>
                  <ul className="chips chips--small" aria-label={`${group.title}: skills`}>
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Spot>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
