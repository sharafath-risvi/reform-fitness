import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTagline from '../../ui/SectionTagline'

export default function AboutMission() {
  const containerRef = useRef(null)
  const bgImageRef = useRef(null)
  const missionRef = useRef(null)
  const visionRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin background image
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: bgImageRef.current,
      })

      // Image Parallax
      gsap.to('.mission-bg-img', {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      })

      // Reveal Mission
      gsap.fromTo(missionRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 75%',
          }
        }
      )

      // Reveal Vision
      gsap.fromTo(visionRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 75%',
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative bg-[#111]">
      
      {/* Pinned Cinematic Background */}
      <div className="absolute inset-0 w-full h-screen pointer-events-none overflow-hidden" ref={bgImageRef}>
        <img 
          src="/Reform_images/DSC06288.webp" 
          alt="ReForm Fitness Vision" 
          className="mission-bg-img w-full h-full object-cover will-change-transform opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#111]/80 to-[#111]" />
      </div>

      <div className="relative z-10">
        
        {/* Mission Block */}
        <div className="min-h-screen flex items-center container-custom pt-32 pb-16">
          <div className="max-w-3xl glass-dark p-8 md:p-12 lg:p-16 border border-white/5 rounded-sm" ref={missionRef}>
            <SectionTagline text="Our Mission" className="mb-6 opacity-0" />
            <h2 className="text-4xl lg:text-5xl xl:text-6xl text-white mb-8 leading-tight opacity-0 font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              To help every client achieve sustainable health through <em className="text-[#E8B884]">science-based training</em> and personalized coaching.
            </h2>
            <p className="text-base lg:text-lg text-white/80 leading-relaxed font-light opacity-0">
              We measure success not by how many packages we sell, but by the <span className="text-green-brand font-medium">lasting impact</span> we create in our clients' lives. Your transformation is our only metric.
            </p>
          </div>
        </div>

        {/* Vision Block */}
        <div className="min-h-screen flex items-center container-custom pb-32">
          <div className="max-w-3xl sm:ml-auto glass-dark p-8 md:p-12 lg:p-16 border border-white/5 rounded-sm sm:text-right" ref={visionRef}>
            <SectionTagline text="Our Vision" className="sm:justify-end mb-6 opacity-0" />
            <h2 className="text-4xl lg:text-5xl xl:text-6xl text-white mb-8 leading-tight opacity-0 font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              A world where every person lives with <em className="text-[#E8B884]">energy and strength</em> — without shortcuts.
            </h2>
            <p className="text-base lg:text-lg text-white/80 leading-relaxed font-light opacity-0 sm:ml-auto">
              We believe true health is not found in a 30-day crash diet, but through discipline, science, and genuine care. We envision a future where fitness is treated as a medical necessity.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
