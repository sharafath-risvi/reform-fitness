import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const bgImages = [
  "/Reform_images/trainers.png", 
]

const SplitText = ({ text }) => {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top py-1">
          <span className="word inline-block translate-y-[120%] opacity-0 blur-[8px] will-change-[transform,opacity,filter]">{word}</span>
        </span>
      ))}
    </>
  )
}

export default function BrandStorySection() {
  const containerRef = useRef(null)
  const storyRef = useRef(null)
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // ==========================================
      // SECTION 1: STORY (Chapter 01 & 02)
      // ==========================================

      // Desktop: full scroll distance
      mm.add("(min-width: 1024px)", () => {
        const tlStory = gsap.timeline({
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top top',
            end: '+=200%', 
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })
        tlStory.to('.block-1', { opacity: 1, y: 0, duration: 1 })
        tlStory.to('.block-1 .word', { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.04, duration: 1.5, ease: 'power3.out' }, "<")
        tlStory.to({}, { duration: 1 }) 
        tlStory.to('.block-1', { opacity: 0, y: -40, duration: 1 })
        tlStory.to('.bg-white-layer', { opacity: 0, duration: 1.5 }, "<")
        tlStory.to('.bg-img-1', { opacity: 1, duration: 1.5 }, "<")
        tlStory.to('.bg-img-1 img', { scale: 1, duration: 5, ease: 'none' }, "<")
        tlStory.to('.block-2', { opacity: 1, y: 0, duration: 1 }, "-=4")
        tlStory.to('.block-2 .word', { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.04, duration: 1.5, ease: 'power3.out' }, "<")
        tlStory.to({}, { duration: 1 })
        tlStory.to('.block-2', { opacity: 0, y: -40, duration: 1 })
        tlStory.to('.bg-img-1', { opacity: 0, duration: 1.5 }, "<") 
        return () => {}
      })

      // Mobile: compressed scroll distance
      mm.add("(max-width: 1023px)", () => {
        const tlStory = gsap.timeline({
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })
        tlStory.to('.block-1', { opacity: 1, y: 0, duration: 1 })
        tlStory.to('.block-1 .word', { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.04, duration: 1.2, ease: 'power3.out' }, "<")
        tlStory.to({}, { duration: 0.8 })
        tlStory.to('.block-1', { opacity: 0, y: -40, duration: 0.8 })
        tlStory.to('.bg-white-layer', { opacity: 0, duration: 1 }, "<")
        tlStory.to('.bg-img-1', { opacity: 1, duration: 1 }, "<")
        tlStory.to('.block-2', { opacity: 1, y: 0, duration: 0.8 }, ">")
        tlStory.to('.block-2 .word', { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.03, duration: 1, ease: 'power3.out' }, "<")
        tlStory.to({}, { duration: 0.8 })
        tlStory.to('.block-2', { opacity: 0, y: -40, duration: 0.8 })
        tlStory.to('.bg-img-1', { opacity: 0, duration: 1 }, "<")
        return () => {}
      })

    }, containerRef)
    
    // Recalculate scroll positions for dependent downstream sections
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="brand-story-wrapper bg-[#0D0D0D]">
      {/* ========================================== */}
      {/* CHAPTERS SECTION                           */}
      {/* ========================================== */}
      <section ref={storyRef} className="relative bg-[#0D0D0D] h-screen overflow-hidden">
        {/* White background layer for Chapter 01 */}
        <div className="bg-white-layer absolute inset-0 bg-white z-0 pointer-events-none" />

        {/* Chapter 02 background image with dark overlay */}
        <div className="bg-layer bg-img-1 absolute inset-0 z-0 opacity-0 overflow-hidden">
           <img src={bgImages[0]} className="w-full h-full object-cover object-[center_48%] lg:object-[center_58%] scale-110 will-change-transform transform-gpu" loading="lazy" decoding="async" />
           <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-6 sm:px-12">
          <div className="text-block block-1 absolute w-full max-w-4xl text-center opacity-0 translate-y-12 px-5 lg:px-0">
            <div className="flex items-center justify-center gap-4 mb-8 word translate-y-[120%] opacity-0 blur-[8px] w-full">
              <div className="w-8 h-[1px] bg-[#E8B884] shrink-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
                CHAPTER 01
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-7xl text-[#231F20] mb-8 lg:mb-10 leading-tight font-serif font-bold">
              <SplitText text="More Than A Gym." />
            </h2>
            <p className="text-sm sm:text-base lg:text-2xl text-[#231F20]/70 leading-relaxed font-light mb-4 lg:mb-6">
              <SplitText text="ReForm Fitness was founded on a simple truth: typical gyms fail most people. They offer equipment, but no guidance. They offer quick fixes, but no lasting change." />
            </p>
            <p className="text-base lg:text-2xl text-[#231F20]/70 leading-relaxed font-light hidden lg:block">
              <SplitText text="We are a Personal Training & Wellness company that helps people rebuild their health through customized, science-backed programs. Your body is not a machine to be punished—it is an instrument to be tuned." />
            </p>
          </div>

          <div className="text-block block-2 absolute w-full max-w-4xl text-center opacity-0 translate-y-12 px-5 lg:px-0">
            <div className="flex items-center justify-center gap-4 mb-8 word translate-y-[120%] opacity-0 blur-[8px] w-full">
              <div className="w-8 h-[1px] bg-[#E8B884] shrink-0" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
                CHAPTER 02
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-7xl text-white mb-8 lg:mb-10 leading-tight font-serif font-bold">
              <SplitText text="No Shortcuts. Just Results." />
            </h2>
            <p className="text-sm sm:text-base lg:text-2xl text-white/90 leading-relaxed font-light mb-4 lg:mb-6">
              <SplitText text='Instead of promising "Lose 10kg in 30 Days", we promise safe exercise, proper nutrition, and habits that compound over a lifetime.' />
            </p>
            <p className="text-base lg:text-2xl text-white/90 leading-relaxed font-light hidden lg:block">
              <SplitText text="Every client achieves sustainable health through personalized coaching, injury prevention, and lifestyle transformation." />
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
