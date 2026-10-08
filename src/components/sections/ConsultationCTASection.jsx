import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ConsultationCTASection() {
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background Image subtle reveal/scale
      gsap.fromTo(bgRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      )

      // Content Reveal
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      className="relative min-h-[55vh] lg:min-h-[65vh] flex items-center justify-center overflow-hidden bg-[#111]" 
      ref={containerRef}
    >
      {/* Cinematic Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-luminosity will-change-transform opacity-0"
        style={{
          backgroundImage: `url('/Reform_images/DSC06277.webp')`,
        }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-[#0a0a0a]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />

      <div className="container-custom relative z-10 w-full flex flex-col items-center justify-center text-center py-16 sm:py-20 lg:py-24" ref={contentRef}>
        
        <h2
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-tight opacity-0 font-bold"
        >
          Ready to <em className="text-[#E8B884] italic">Transform?</em>
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 max-w-lg mb-10 leading-relaxed font-light opacity-0">
          Start your journey with expert guidance built around you.
        </p>

        <div className="opacity-0">
          <Link 
            to="/contact" 
            onClick={() => window.scrollTo(0, 0)}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-md overflow-hidden cursor-pointer shadow-lg"
          >
            {/* Base Background (Beige) */}
            <div className="absolute inset-0 bg-[#E8B884] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-105" />
            
            {/* Hover Background Reveal (Green) */}
            <div className="absolute inset-0 bg-[#2B6F6F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            
            {/* Subtle Border */}
            <div className="absolute inset-0 border border-white/20 rounded-md pointer-events-none" />
            
            <span className="relative z-10 text-[#231F20] group-hover:text-white font-medium tracking-wide transition-colors duration-500">
              Book a Consultation
            </span>
            <ArrowUpRight 
              size={18} 
              className="relative z-10 text-[#231F20] group-hover:text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" 
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
