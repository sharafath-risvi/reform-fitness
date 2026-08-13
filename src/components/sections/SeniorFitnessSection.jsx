import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const seniorBenefits = [
  { icon: '⚖️', title: 'Balance & Stability', desc: 'Reduce fall risk with targeted balance and coordination training.' },
  { icon: '🦿', title: 'Joint Strength', desc: 'Strengthen knees, hips, and shoulders for pain-free movement.' },
  { icon: '🧘', title: 'Mobility', desc: 'Improve range of motion and flexibility for daily activities.' },
  { icon: '🚶', title: 'Walking Ability', desc: 'Build stamina and gait quality for confident, independent movement.' },
  { icon: '🏠', title: 'Functional Independence', desc: 'Train the body to handle real life — stairs, groceries, and more.' },
  { icon: '❤️', title: 'Cardiovascular Health', desc: 'Heart-healthy cardio sessions appropriate for senior physiology.' },
]

export default function SeniorFitnessSection() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      )

      // Grid Stagger
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      )

      // CTA Parallax & Reveal
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section-padding bg-[#F8F6F4]" ref={containerRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16" ref={headerRef}>
          <div>
            <span className="text-label text-[#2B6F6F] block mb-3 opacity-0">
              Senior Fitness
            </span>
            <h2 className="font-serif text-headline text-[#231F20] opacity-0 font-bold">
              Age Gracefully.
              <br />
              <em className="text-[#E8B884]">Live Fully.</em>
            </h2>
          </div>
          <p className="text-base text-[#231F20]/60 leading-relaxed opacity-0">
            Growing older doesn't mean slowing down. Our senior fitness programs are designed with the utmost care, combining gentle exercise, joint rehabilitation, and functional training to help senior citizens maintain their independence and quality of life.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" ref={gridRef}>
          {seniorBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white p-8 border border-[#EDE9E4] hover:border-[#E8B884]/40 hover:shadow-lg transition-all duration-300 group opacity-0 magnetic"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">{benefit.icon}</div>
              <h3 className="font-serif text-lg text-[#231F20] mb-2 group-hover:text-[#2B6F6F] transition-colors font-bold">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#231F20]/50 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div
          ref={ctaRef}
          className="bg-[#231F20] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 opacity-0 shadow-2xl relative overflow-hidden group"
        >
          {/* Decorative background flare */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8B884] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#E8B884] font-semibold mb-2">For Senior Citizens</p>
            <h3 className="font-serif text-2xl text-white font-bold">
              It's never too late to invest in your health.
            </h3>
          </div>
          <div className="relative z-10">
            <Link to="/consultation" className="btn-primary whitespace-nowrap group magnetic">
              <span>Book Senior Assessment</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
