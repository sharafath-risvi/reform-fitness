import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AboutHero() {
  const containerRef = useRef(null)
  const bgImageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin and zoom
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          scrub: 1,
        }
      })

      gsap.fromTo(bgImageRef.current,
        { scale: 1 },
        {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        }
      )

      gsap.to(contentRef.current, {
        y: -150,
        opacity: 0,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col justify-center overflow-hidden bg-[#111]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 will-change-transform pointer-events-none">
        <img
          ref={bgImageRef}
          src="/Reform_images/DSC06270.webp"
          alt="About ReForm Fitness"
          className="w-full h-full object-cover origin-center will-change-transform opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#111]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-6 lg:px-12 flex flex-col justify-center h-full pt-24 lg:pt-32" ref={contentRef}>
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-[0.65rem] text-[#E8B884] tracking-[0.4em] uppercase font-semibold mb-6 block"
          >
            Chapter II
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[2rem] sm:text-[2.5rem] lg:text-7xl text-white mb-8 leading-[1.1] font-extrabold"
          >
            Not a gym.
            <br />
            <em className="text-[#E8B884] font-extrabold">A Health <span className="text-green-brand font-extrabold">Transformation</span> Company.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl font-light"
          >
            ReForm Fitness was built on the belief that everyone — regardless of age, fitness level, or medical history — deserves personalized, science-based coaching that transforms not just their body, but their entire life.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
