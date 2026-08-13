import { useEffect, useRef } from 'react'
import { Shield, FlaskConical, User, TrendingUp, Heart, Lock, Star, RefreshCw } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const values = [
  { icon: Shield, title: 'Safety First', desc: 'Every program begins with a health screening. We prioritize your safety over shortcuts.', color: '#E8B884' },
  { icon: User, title: 'Client-Centered', desc: 'Your goals, your pace, your body. Every program is uniquely designed for you.', color: '#2B6F6F' },
  { icon: Star, title: 'Professionalism', desc: 'Certified trainers, evidence-based methods, and consistent delivery of excellence.', color: '#E8B884' },
  { icon: Heart, title: 'Integrity', desc: 'Honest guidance, transparent progress, no false promises or quick fixes.', color: '#2B6F6F' },
  { icon: Lock, title: 'Confidentiality', desc: 'Your health data and journey remain private. We treat every client with dignity.', color: '#E8B884' },
  { icon: FlaskConical, title: 'Science-Based', desc: 'Training protocols grounded in exercise science, physiology, and rehabilitation research.', color: '#2B6F6F' },
  { icon: TrendingUp, title: 'Long-Term Results', desc: 'We don\'t sell 30-day miracles. We build sustainable habits for lifelong health.', color: '#E8B884' },
  { icon: RefreshCw, title: 'Continuous Improvement', desc: 'Weekly check-ins, monthly reviews, and evolving programs as you progress.', color: '#2B6F6F' },
]

export default function CoreValuesSection() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )

      // Cards Staggered Animation
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: cardsRef.current[0], // Trigger when first row comes into view
            start: 'top 85%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // 3D Tilt on Mouse Move
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index]
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate rotation (-10 to 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    })
  }

  const handleMouseLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.7
    })
  }

  return (
    <section className="section-padding bg-[#F8F6F4]" ref={containerRef}>
      <div className="container-custom">
        <div className="text-center mb-16" ref={headerRef}>
          <span className="text-label text-[#2B6F6F] block mb-3 opacity-0">What We Stand For</span>
          <h2 className="font-serif text-headline text-[#231F20] opacity-0 font-bold">
            Our Core Values
          </h2>
          <div className="w-16 h-0.5 bg-[#E8B884] mx-auto mt-6 opacity-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                ref={el => cardsRef.current[index] = el}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="card-service cursor-default will-change-transform opacity-0 bg-white"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300 transform-gpu"
                  style={{ background: `${value.color}15`, border: `1px solid ${value.color}30`, transform: 'translateZ(30px)' }}
                >
                  <Icon size={20} style={{ color: value.color }} />
                </div>
                <h3 className={`font-serif text-[#231F20] mb-3 transform-gpu font-bold ${
                  (value.title === 'Professionalism' || value.title === 'Confidentiality') 
                    ? 'text-[0.85rem] sm:text-lg' 
                    : 'text-lg'
                }`} style={{ transform: 'translateZ(20px)' }}>
                  {value.title}
                </h3>
                <p className="text-sm text-[#231F20]/55 leading-relaxed transform-gpu" style={{ transform: 'translateZ(10px)' }}>
                  {value.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
