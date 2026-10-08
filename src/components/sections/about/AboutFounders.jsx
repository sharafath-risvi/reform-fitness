import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award } from 'lucide-react'
import SectionTagline from '../../ui/SectionTagline'

const founders = [
  {
    name: "Arjun Menon",
    role: "Co-Founder & Head of Rehabilitation",
    image: "/Reform_images/DSC06294.webp",
    quote: "Fitness shouldn't break you down. It should build you up to handle life's actual demands.",
    details: "With over 8 years specializing in sports injury recovery and functional mechanics, Arjun designed ReForm to bridge the gap between clinical rehabilitation and high-performance training.",
    vision: "Fitness shouldn't break you down. It should build you up to handle life's actual demands.",
    intro: "With over 8 years specializing in sports injury recovery and functional mechanics, Arjun designed ReForm to bridge the gap between clinical rehabilitation and high-performance training.",
    experience: "8+ Years",
    specialization: "Clinical Rehabilitation, Sports Injury Recovery"
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & Head of Women's Wellness",
    image: "/Reform_images/DSC06296.webp",
    quote: "True transformation starts when you stop punishing your body and start nourishing it.",
    details: "Priya brings 6 years of expertise in holistic women's health, focusing on hormonal balance, pre/postnatal fitness, and creating sustainable lifestyle changes rather than quick fixes.",
    vision: "True transformation starts when you stop punishing your body and start nourishing it.",
    intro: "Priya brings 6 years of expertise in holistic women's health, focusing on hormonal balance, pre/postnatal fitness, and creating sustainable lifestyle changes rather than quick fixes.",
    experience: "6+ Years",
    specialization: "Hormonal Balance, Pre/Postnatal Fitness"
  }
]

export default function AboutFounders() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Reveal
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      )

      // Founders Parallax & Reveal
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        )

        // Parallax image within card
        const img = card.querySelector('.founder-img')
        gsap.to(img, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-padding bg-white overflow-hidden" ref={containerRef}>
      <div className="container-custom">
        <div className="text-center mb-24 lg:mb-32" ref={headerRef}>
          <SectionTagline text="Meet the Founders" className="mb-6 opacity-0 justify-center" />
          <h2 className="font-serif text-4xl lg:text-6xl text-[#231F20] mb-6 opacity-0 font-bold">
            The <em className="text-[#E8B884]">Visionaries.</em>
          </h2>
          <p className="text-base text-[#231F20]/60 max-w-2xl mx-auto leading-relaxed font-light opacity-0">
            Built with a vision of delivering personalized, science-based wellness and long-term transformation.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative">
          {founders.map((founder, index) => (
            <div 
              key={founder.name}
              ref={el => cardsRef.current[index] = el}
              className={`relative group ${index === 1 ? 'md:mt-32' : ''}`}
            >
              {/* Image Container with 3D Tilt perspective wrapper */}
              <div className="relative overflow-hidden aspect-[3/4] mb-8" style={{ perspective: '1000px' }}>
                <div className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="founder-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Subtle dark gradient at bottom for text contrast if needed, but we will place text below mostly */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Floating Glass Panel (Reveals on Hover) */}
                <div className="absolute inset-x-6 bottom-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out glass-dark p-6 border border-white/20">
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-green-brand font-semibold mb-2">Vision</p>
                  <p className="text-sm text-white/90 leading-relaxed italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    "{founder.vision}"
                  </p>
                </div>
              </div>

              {/* Founder Info */}
              <div className="pr-0 sm:pr-8">
                <div className="flex items-center gap-3 mb-3">
                  <Award size={14} className="text-[#E8B884]" />
                  <span className="text-[0.6rem] tracking-widest uppercase font-semibold text-[#2B6F6F]">
                    {founder.experience} Experience
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-[#231F20] mb-2 font-bold">
                  {founder.name}
                </h3>
                <p className="text-xs tracking-widest uppercase text-[#231F20]/50 font-semibold mb-4">
                  {founder.role}
                </p>
                <p className="text-sm text-[#231F20]/70 leading-relaxed mb-6 font-light">
                  {founder.intro}
                </p>
                <div className="inline-block border border-[#EDE9E4] px-4 py-2 text-[0.6rem] tracking-widest uppercase text-[#231F20]/60 bg-[#F8F6F4]">
                  {founder.specialization}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
