import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTagline from '../../ui/SectionTagline'

export default function AboutPhilosophy() {
  const containerRef = useRef(null)
  const bgImageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax Image
      gsap.fromTo(bgImageRef.current,
        { yPercent: -15 },
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

      // Content Reveal
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white" ref={containerRef}>
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none">
        <img 
          ref={bgImageRef}
          src="/Reform_images/DSC06270.webp" 
          alt="Wellness Philosophy" 
          className="w-full h-full object-cover will-change-transform opacity-90"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      </div>

      <div className="container-custom relative z-10 text-center px-6" ref={contentRef}>
        <SectionTagline text="The Philosophy" className="mb-8 opacity-0 justify-center" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#231F20] leading-snug max-w-5xl mx-auto opacity-0 font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          "Your body is not a machine to be punished. It is an instrument to be tuned. <em className="text-[#E8B884]">Respect it.</em>"
        </h2>
        <p className="text-base text-[#231F20]/60 max-w-2xl mx-auto leading-relaxed font-light mt-8 opacity-0">
          We believe in training for <span className="text-green-brand font-medium">longevity, mobility, and strength</span> rather than temporary aesthetics.
        </p>
        <div className="w-px h-16 bg-[#2B6F6F]/20 mx-auto mt-12 opacity-0" />
      </div>

    </section>
  )
}
