import { useEffect, useRef, useState } from 'react'
import { Shield, Heart, Star, User, Lock, RefreshCw, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTagline from '../../ui/SectionTagline'

const values = [
  { icon: Shield, title: 'Safety First', desc: 'Every program begins with a rigorous medical and biomechanical screening. We never compromise on your structural integrity.' },
  { icon: Heart, title: 'Integrity', desc: 'No false promises, no quick-fix supplements, and no dishonest marketing. We only sell science and hard work.' },
  { icon: Star, title: 'Professionalism', desc: 'Our trainers are internationally certified experts who treat coaching as a respected medical-adjacent profession.' },
  { icon: User, title: 'Client-Centered', desc: 'Your program is built entirely around your lifestyle, your schedule, and your unique physiological needs.' },
  { icon: Lock, title: 'Confidentiality', desc: 'Your health data, assessments, and progress are treated with the same privacy as a medical record.' },
  { icon: RefreshCw, title: 'Continuous Improvement', desc: 'As you evolve, so does your protocol. We are constantly analyzing data to optimize your ongoing results.' },
  { icon: Users, title: 'Respect for Everyone', desc: 'An inclusive environment where beginners feel as safe and respected as professional athletes.' },
]

function ValueCard({ value, index }) {
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const Icon = value.icon

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="value-card opacity-0 translate-y-12 relative p-8 lg:p-10 glass-dark border border-white/5 rounded-sm overflow-hidden transition-all duration-500 ease-out hover:border-[#E8B884]/40 hover:-translate-y-2 group"
      style={{
        background: isHovered 
          ? `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(232,184,132,0.05), transparent 40%)` 
          : 'rgba(255,255,255,0.02)'
      }}
    >
      <div className="relative z-10">
        <Icon size={28} className="text-[#E8B884] mb-8 group-hover:scale-110 transition-transform duration-500 origin-left" />
        <span className="text-[0.6rem] tracking-[0.2em] text-white/40 uppercase font-semibold mb-3 block">Principle 0{index + 1}</span>
        <h3 className="font-serif text-2xl text-white mb-4 font-bold">{value.title}</h3>
        <p className="text-sm text-white/80 leading-relaxed font-light group-hover:text-white/90 transition-colors duration-300">{value.desc}</p>
      </div>
    </div>
  )
}

export default function AboutValues() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      )

      // Cards
      gsap.to('.value-card', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 85%',
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="py-32 lg:py-48 bg-[#231F20] relative overflow-hidden" ref={sectionRef}>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#E8B884]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-20 lg:mb-32" ref={headerRef}>
          <SectionTagline text="Our DNA" className="mb-6 opacity-0" />
          <h2 className="font-serif text-4xl lg:text-6xl text-white mb-6 leading-tight opacity-0 font-bold">
            The Principles <br /><em className="text-white/50">We Stand By.</em>
          </h2>
          <p className="text-base text-white/80 leading-relaxed font-light opacity-0">
            These core values drive every decision we make, ensuring you receive the <span className="text-green-brand font-medium">highest standard</span> of care and coaching.
          </p>
        </div>

        {/* Masonry/Irregular Grid */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
