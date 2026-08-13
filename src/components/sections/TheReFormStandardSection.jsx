import { useEffect, useRef } from 'react'
import { ShieldCheck, Focus, Award, Leaf } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const features = [
  { icon: ShieldCheck, title: 'Safe & Scientific', desc: 'No guesswork. Everything we do is rooted in exercise science and medical guidelines.' },
  { icon: Focus, title: 'Hyper Personalized', desc: 'No cookie-cutter templates. Your program is built exclusively for your body and goals.' },
  { icon: Award, title: 'Expert Coaches', desc: 'Internationally certified trainers who specialize in rehabilitation and mobility.' },
  { icon: Leaf, title: 'Sustainable Results', desc: 'We don\'t do crash diets. We build habits that last a lifetime.' },
]

export default function TheReFormStandardSection() {
  const containerRef = useRef(null)
  const bgImageRef = useRef(null)
  const gridRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Deep Parallax on Background Image
      gsap.fromTo(bgImageRef.current,
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // Text Reveal
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

      // Grid Items Stagger
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          }
        }
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-32 lg:py-48 overflow-hidden bg-[#111]">
      
      {/* Cinematic Background Image Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop"
          alt="ReForm Fitness Values"
          className="w-full h-full object-cover will-change-transform transform-gpu"
          loading="lazy"
          decoding="async"
        />
        {/* Darkening & Blur Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="px-6 lg:px-24 relative z-10 w-full max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Left Content */}
          <div ref={headerRef} className="max-w-2xl">
            <div className="inline-flex items-center gap-4 mb-6 opacity-0">
              <div className="w-8 h-[2px] bg-[#E8B884]" />
              <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#E8B884] font-semibold">
                THE REFORM STANDARD
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-6xl text-white mb-8 leading-tight opacity-0 font-bold">
              We Don't Guess.
              <br />
              <em className="text-[#2B6F6F] font-bold">We Assess.</em>
            </h2>
            <p className="text-[1.05rem] lg:text-[1.1rem] text-white/80 leading-relaxed font-light mb-8 opacity-0">
              The fitness industry is full of influencers selling shortcuts. We are <span className="text-green-brand font-medium">professionals selling science</span>. From your first assessment to your final goal, every step is calculated.
            </p>
            <div className="opacity-0">
              <a href="#consultation" className="inline-flex items-center gap-4 text-xs tracking-widest uppercase text-white font-semibold group magnetic">
                <span className="border-b border-[#E8B884] pb-1">Learn about our methodology</span>
              </a>
            </div>
          </div>

          {/* Right Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {features.map((feature) => {
              return (
                <div 
                  key={feature.title}
                  className={`bg-[#231F20]/85 backdrop-blur-xl py-8 lg:py-8 rounded-2xl border border-white/5 shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(232,184,132,0.15)] hover:border-[#E8B884]/40 hover:-translate-y-2 transition-all duration-700 group opacity-0 flex flex-col h-full justify-center ${
                    feature.title === 'Hyper Personalized' ? 'px-5 lg:px-6' : 'px-8 lg:px-10'
                  }`}
                >
                  <h3 className="font-serif text-white mb-4 group-hover:text-[#E8B884] transition-colors duration-500 font-bold text-lg sm:text-xl lg:text-[1.35rem] xl:text-[1.65rem] tracking-tighter">
                    {feature.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-[#E8B884]/30 mb-5 group-hover:w-16 group-hover:bg-[#E8B884] transition-all duration-700" />
                  <p className="text-base text-white/90 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
