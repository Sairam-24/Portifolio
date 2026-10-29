import { ArrowDown, Bot, Cpu, Mic, Sparkles, Zap } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../components/icons'
import { HeroVisual3D } from '../components/HeroVisual3D'
import { LinkButton } from '../components/LinkButton'
import { TechMarquee } from '../components/TechMarquee'
import { profile } from '../data/profile'

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          {/* Status & Location Pill */}
          <div className="hero__status-row">
            <p className="hero__status">
              <span className="pulse-dot" aria-hidden="true" />
              AI Engineer · {profile.location}
            </p>
          </div>

          {/* Prominent Name Header */}
          <div className="hero__identity">
            <div>
              <p className="hero__id-label">PORTFOLIO &amp; SYSTEMS</p>
              <h1 id="hero-title" className="hero__name">
                SAI BABU <span className="grad-text">POLISETTI</span>
              </h1>
            </div>
          </div>

          <h2 className="hero__headline">
            Architecting <span className="grad-text">Applied AI Systems</span>, Multimodal Pipelines &amp; Production Engineering.
          </h2>

          <p className="hero__lead">
            Senior AI Engineer in Hyderabad building production-grade intelligent systems: low-latency streaming Voice AI,
            grounded RAG retrieval pipelines, computer vision workflows, and high-concurrency Python backends.
          </p>

          {/* Action CTAs */}
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              Explore Projects
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <LinkButton
              href={profile.links.github}
              label="GitHub"
              icon={<GitHubIcon size={16} />}
              newTab
              hint="GitHub profile"
            />
            <LinkButton
              href={profile.links.linkedin}
              label="LinkedIn"
              icon={<LinkedInIcon size={16} />}
              newTab
              hint="LinkedIn profile"
            />
            <a className="btn btn--secondary" href={`mailto:${profile.links.email}`}>
              <Sparkles size={16} aria-hidden="true" />
              Contact Me
            </a>
          </div>
        </div>

        {/* 3D Multi-Scene WebGL Studio - Aligned directly opposite the name */}
        <div className="hero__art">
          <HeroVisual3D />
        </div>
      </div>

      {/* Animated Capability Badges Deck */}
      <div className="container hero__capabilities-row">
        <div className="hero__capabilities" aria-label="Core Engineering Capabilities">
          {/* 1. Voice AI Badge */}
          <div className="capability-card">
            <div className="capability-head">
              <div className="capability-icon capability-icon--cyan">
                <Mic size={15} />
              </div>
              <div className="mini-equalizer" aria-hidden="true">
                <span className="eq-bar eq-bar--1" />
                <span className="eq-bar eq-bar--2" />
                <span className="eq-bar eq-bar--3" />
                <span className="eq-bar eq-bar--4" />
              </div>
            </div>
            <strong className="capability-title">Streaming Voice AI</strong>
            <p className="capability-desc">&lt; 2.5s First Audio · faster-whisper + Kokoro TTS</p>
          </div>

          {/* 2. Grounded RAG Badge */}
          <div className="capability-card">
            <div className="capability-head">
              <div className="capability-icon capability-icon--violet">
                <Bot size={15} />
              </div>
              <span className="capability-tag capability-tag--green">Zero Hallucination</span>
            </div>
            <strong className="capability-title">Grounded RAG &amp; Chatbots</strong>
            <p className="capability-desc">Hybrid BM25 + pgvector · Strict Passage Attribution</p>
          </div>

          {/* 3. Multimodal & AI Workflows */}
          <div className="capability-card">
            <div className="capability-head">
              <div className="capability-icon capability-icon--blue">
                <Cpu size={15} />
              </div>
              <span className="capability-tag capability-tag--cyan">-33% Latency</span>
            </div>
            <strong className="capability-title">VLM &amp; Multi-Agent</strong>
            <p className="capability-desc">Parallel CPU/GPU Pipelines · Batched DB Transactions</p>
          </div>

          {/* 4. Vibe Coding & Measured Delivery */}
          <div className="capability-card">
            <div className="capability-head">
              <div className="capability-icon capability-icon--amber">
                <Zap size={15} />
              </div>
              <span className="capability-tag capability-tag--amber">270+ Tests</span>
            </div>
            <strong className="capability-title">Vibe Coding &amp; Rapid Delivery</strong>
            <p className="capability-desc">Rapid Prototyping with Pytest Baselines &amp; Benchmarks</p>
          </div>
        </div>
      </div>

      {/* Igloo-style Tech Marquee Ribbon */}
      <div className="hero__marquee-wrap">
        <TechMarquee />
      </div>
    </section>
  )
}
