import AboutHero from '../components/sections/about/AboutHero'
import AboutStory from '../components/sections/about/AboutStory'
import AboutFounders from '../components/sections/about/AboutFounders'
import AboutMission from '../components/sections/about/AboutMission'
import ConsultationCTASection from '../components/sections/ConsultationCTASection'

export default function AboutPage() {
  return (
    <div className="bg-[#111]">
      <AboutHero />
      <AboutStory />
      <AboutFounders />
      <AboutMission />
      <ConsultationCTASection />
    </div>
  )
}
