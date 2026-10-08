import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const stats = [
  { number: 500, suffix: '+', label: 'Lives Transformed', desc: 'Clients who completed our programs' },
  { number: 98, suffix: '%', label: 'Satisfaction Rate', desc: 'Client-reported satisfaction scores' },
  { number: 10, suffix: '+', label: 'Years of Excellence', desc: 'Of professional coaching experience' },
  { number: 15, suffix: '+', label: 'Expert Trainers', desc: 'Certified and specialized coaches' },
]

const transformations = [
  {
    name: 'Kavya R.', goal: 'Fat Loss', result: 'Lost 18 kg in 5 months',
    detail: 'Through customized workouts and lifestyle nutrition coaching, Kavya transformed her health and energy levels.', duration: '5 Months', color: '#E8B884',
  },
  {
    name: 'Suresh M.', goal: 'Rehabilitation', result: 'Recovered from knee surgery',
    detail: 'Post-ACL surgery, Suresh regained full mobility and returned to recreational football within 8 months.', duration: '8 Months', color: '#2B6F6F',
  },
  {
    name: 'Anita K.', goal: "Women's Fitness", result: 'Managed PCOS, gained strength',
    detail: 'Anita reversed her PCOS symptoms and built incredible strength through a tailored hormonal health program.', duration: '6 Months', color: '#E8B884',
  },
  {
    name: 'Rajan P.', goal: 'Senior Fitness', result: 'Walks 5 km daily at 68',
    detail: 'After years of joint pain and low mobility, Rajan now walks confidently and lives fully independently.', duration: '4 Months', color: '#2B6F6F',
  },
]

function StatItem({ stat }) {
  const containerRef = useRef(null)
  const [displayValue, setDisplayValue] = useState(0)
  const counted = useRef(false)

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 90%',
        onEnter: () => {
          if (counted.current) return
          counted.current = true
          const duration = 2500
          const start = performance.now()
          const end = stat.number
          const animate = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = end * eased
            setDisplayValue(Math.floor(current))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [stat.number])

  return (
    <div ref={containerRef} className="text-center stat-item opacity-0">
      <div className="text-5xl lg:text-7xl font-light mb-4 text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        {displayValue}<span className="text-[#E8B884]">{stat.suffix}</span>
      </div>
      <div className="text-sm font-semibold tracking-widest uppercase text-white mb-2">{stat.label}</div>
      <div className="text-xs text-white/40 font-light">{stat.desc}</div>
    </div>
  )
}

export default function TransformationSection() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const statsRef = useRef(null)
  const cardsRef = useRef(null)
  const bgImageRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background Image Parallax
      gsap.to(bgImageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Header Stagger
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

      // Stats Stagger Reveal
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          }
        }
      )

      // Cards Stagger Reveal
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          }
        }
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-32 lg:py-48 bg-[#111] overflow-hidden" ref={containerRef}>
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none">
        <img 
          ref={bgImageRef}
          src="/Reform_images/DSC06273.webp" 
          alt="Transformation background" 
          className="w-full h-full object-cover opacity-30 grayscale will-change-transform transform-gpu"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#111]/80 to-[#111]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-24" ref={headerRef}>
          <span className="text-[0.6rem] tracking-widest uppercase text-[#E8B884] font-semibold block mb-6 opacity-0">
            Results That Speak
          </span>
          <h2 className="font-serif text-4xl lg:text-6xl text-white opacity-0 leading-tight font-bold">
            Real People.
            <br />
            <em className="text-[#E8B884] font-bold">Real Transformations.</em>
          </h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-32" ref={statsRef}>
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={cardsRef}>
          {transformations.map((t) => (
            <div
              key={t.name}
              className="glass-dark p-8 border border-white/10 hover:border-[#E8B884]/40 hover:bg-white/5 transition-all duration-500 group opacity-0 flex flex-col h-full"
            >
              <span
                className="text-[0.6rem] tracking-widest uppercase font-semibold mb-6 block"
                style={{ color: t.color }}
              >
                {t.goal}
              </span>
              <div
                className="text-2xl text-white mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t.result}
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-light mb-8 flex-grow">{t.detail}</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-xs text-white/40 tracking-wider uppercase">{t.name}</span>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: t.color }}>{t.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
