import 'lenis/dist/lenis.css'
import { BackToTop } from './components/BackToTop'
import { CaseStudyDialog } from './components/CaseStudyDialog'
import { DraftBanner } from './components/DraftBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { caseStudies } from './data/caseStudies'
import { siteConfig } from './data/profile'
import { useCaseRoute } from './hooks/useCaseRoute'
import { useLenis } from './hooks/useLenis'
import { About } from './sections/About'
import { CaseStudies } from './sections/CaseStudies'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Impact } from './sections/Impact'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

const CASE_IDS = caseStudies.map((study) => study.id)

export default function App() {
  useLenis()
  const route = useCaseRoute(CASE_IDS)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="bg-fx" aria-hidden="true" />
      {siteConfig.draftMode && <DraftBanner />}
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Impact onOpenMethod={() => route.open('ai-performance')} />
        <Experience />
        <Skills />
        <CaseStudies onOpen={route.open} />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CaseStudyDialog id={route.id} onClose={route.close} onSwitch={route.switchTo} />
    </>
  )
}
