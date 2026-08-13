import { useEffect, useRef } from 'react'
import { Apple, Droplets, Moon, Wind, Smile, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pillars = [
  { icon: Apple, title: 'Smart Eating', desc: 'Build sustainable eating habits — not restrictive diets. Real food, real results.', color: '#E8B884' },
  { icon: Droplets, title: 'Hydration', desc: 'Understanding water\'s role in fat loss, performance, and recovery.', color: '#2B6F6F' },
  { icon: Moon, title: 'Sleep Quality', desc: 'Optimize sleep for hormone balance, muscle recovery, and mental clarity.', color: '#E8B884' },
  { icon: Wind, title: 'Stress Management', desc: 'Cortisol control through breathing, meditation, and lifestyle adjustments.', color: '#2B6F6F' },
  { icon: Smile, title: 'Habit Building', desc: 'Small, consistent daily habits that compound into life-changing results.', color: '#E8B884' },
  { icon: Zap, title: 'Energy Optimization', desc: 'Fuel your body for peak performance at work, home, and the gym.', color: '#2B6F6F' },
]

export default function NutritionSection() {
  const containerRef = useRef(null)
  const headerLeftRef = useRef(null)
  const headerRightRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Left Reveal
      gsap.fromTo(headerLeftRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerLeftRef.current,
            start: 'top 85%',
          }
        }
      )

      // Header Right Reveal
      gsap.fromTo(headerRightRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRightRef.current,
            start: 'top 85%',
          }
        }
      )

      // Grid Stagger
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section-padding bg-white relative" ref={containerRef}>
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F8F6F4] opacity-50 pointer-events-none rounded-l-3xl" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div ref={headerLeftRef}>
            <span className="text-label text-[#2B6F6F] block mb-3 opacity-0">
              Nutrition & Lifestyle
            </span>
            <h2 className="font-serif text-headline text-[#231F20] opacity-0 font-bold">
              Eat Better.
              <br />
              <em className="text-[#E8B884]">Live Better.</em>
            </h2>
          </div>
          <div ref={headerRightRef}>
            <p className="text-base text-[#231F20]/60 leading-relaxed mb-6 opacity-0">
              We don't prescribe restrictive medical diets. We provide <strong className="text-[#231F20]">lifestyle nutrition coaching</strong> — practical, sustainable guidance that helps you understand food, build healthy habits, and fuel your transformation.
            </p>
            <div className="flex items-center gap-4 p-4 bg-[#F8F6F4] border-l-4 border-[#E8B884] opacity-0 magnetic">
              <div>
                <p className="text-sm font-medium text-[#231F20]">No crash diets. No starvation.</p>
                <p className="text-xs text-[#231F20]/50 mt-1">Just smart, science-backed nutrition habits that last a lifetime.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="flex gap-5 p-6 border border-[#EDE9E4] hover:border-[#E8B884]/40 hover:shadow-lg transition-all duration-300 group opacity-0 magnetic bg-white"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300"
                  style={{ background: `${pillar.color}12`, border: `1px solid ${pillar.color}25` }}
                >
                  <Icon size={18} style={{ color: pillar.color }} className="group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#231F20] mb-2 group-hover:text-[#2B6F6F] transition-colors font-bold">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#231F20]/50 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
