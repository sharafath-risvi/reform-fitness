import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTagline from '../../ui/SectionTagline'

const images = [
  "/Reform_images/ourstory.JPG", // Origin/Focus
  "/Reform_images/DSC06300.JPG", // Progression
  "/Reform_images/DSC06281.JPG"  // Future/Community
]

export default function AboutStory() {
  const sectionRef = useRef(null)
  const rightPinRef = useRef(null)
  const leftScrollRef = useRef(null)
  const imageRefs = useRef([])

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia()
      const textBlocks = gsap.utils.toArray('.about-story-block')

      mm.add("(min-width: 1024px)", () => {
        // Pin the right image container only on desktop
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: rightPinRef.current,
        })

        textBlocks.forEach((block, i) => {
          if (i === 0) return 

          ScrollTrigger.create({
            trigger: block,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
              gsap.to(imageRefs.current[i], { opacity: 1, duration: 1, ease: 'power2.inOut' })
              gsap.to(imageRefs.current[i - 1], { opacity: 0, duration: 1, ease: 'power2.inOut' })
            },
            onLeaveBack: () => {
              gsap.to(imageRefs.current[i], { opacity: 0, duration: 1, ease: 'power2.inOut' })
              gsap.to(imageRefs.current[i - 1], { opacity: 1, duration: 1, ease: 'power2.inOut' })
            }
          })
        })
      })

      // Content fade-up applies universally
      textBlocks.forEach(block => {
        gsap.fromTo(block.children, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
            }
          }
        )
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#111] relative border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        
        {/* Left: Scrolling Story Content */}
        <div className="py-16 sm:py-24 lg:py-48 px-6 sm:px-12 lg:px-24 xl:px-32 relative order-2 lg:order-1" ref={leftScrollRef}>
          
          <div className="about-story-block min-h-auto lg:min-h-[70vh] flex flex-col justify-center mb-24 lg:mb-48">
            <SectionTagline text="Our Story" className="mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight font-bold">
              <span className="text-[#2B6F6F]">Built</span> from <em className="text-[#E8B884]">Frustration.</em>
            </h2>
            <p className="text-[1.05rem] lg:text-[1.15rem] text-white/90 leading-relaxed font-light mb-12 border-l border-[#E8B884]/30 pl-4">
              Our journey began with a simple belief: everyone deserves <span className="text-green-brand font-medium">science-based, personalized coaching</span> to transform their life.
            </p>
            <p className="text-[1.05rem] lg:text-[1.15rem] text-white/80 leading-relaxed font-light mb-6">
              ReForm Fitness was born out of frustration with the modern fitness industry. We saw gyms prioritizing memberships over results, and trainers offering cookie-cutter plans that ignored individual biomechanics.
            </p>
            <p className="text-[1.05rem] lg:text-[1.15rem] text-white/80 leading-relaxed font-light mb-0 lg:mb-0">
              We knew there had to be a better way—a scientific, empathetic, and truly personalized approach to human health.
            </p>
            {/* Mobile Image (Inline) */}
            <div className="block lg:hidden w-full h-[45vh] sm:h-[55vh] mt-10 rounded-xl overflow-hidden relative shadow-2xl bg-[#111]">
              <img src={images[0]} alt="Our Story" className="w-full h-full object-contain grayscale opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-[#111]/20 opacity-80 pointer-events-none" />
            </div>
          </div>

          <div className="about-story-block min-h-auto lg:min-h-[70vh] flex flex-col justify-center mb-24 lg:mb-48">
            <SectionTagline text="The Evolution" className="mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-8 leading-tight font-bold">
              Bridging <span className="text-[#2B6F6F]">Medicine</span> & <em className="text-[#E8B884]">Movement.</em>
            </h2>
            <p className="text-[1.05rem] lg:text-[1.15rem] text-white/80 leading-relaxed font-light mb-6">
              As we grew, so did our expertise. We realized that true fitness isn't just about lifting weights—it's about moving pain-free. We expanded our team to include rehabilitation specialists, working alongside doctors to help clients recover from injuries and surgeries.
            </p>
            <p className="text-[1.05rem] lg:text-[1.15rem] text-white/80 leading-relaxed font-light mb-0 lg:mb-0">
              Today, our programs cover everything from hormonal health and PCOS management to senior mobility and elite sports performance.
            </p>
            {/* Mobile Image (Inline) */}
            <div className="block lg:hidden w-full h-[45vh] sm:h-[55vh] mt-10 rounded-xl overflow-hidden relative shadow-2xl">
              <img src={images[1]} alt="The Evolution" className="w-full h-full object-cover grayscale opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-[#111]/20 opacity-80" />
            </div>
          </div>

          <div className="about-story-block min-h-auto lg:min-h-[70vh] flex flex-col justify-center mb-10 lg:mb-0">
            <SectionTagline text="The Future" className="mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-8 leading-tight font-bold">
              A New <span className="text-[#2B6F6F]">Era</span> of <em className="text-[#E8B884]">Wellness.</em>
            </h2>
            <p className="text-[1.05rem] lg:text-[1.15rem] text-white/80 leading-relaxed font-light mb-6">
              We are not just a facility; we are a movement toward sustainable health. We believe in building habits that last a lifetime, without extreme diets or punishing workouts.
            </p>
            <p className="text-[1.05rem] lg:text-[1.15rem] text-white/80 leading-relaxed font-light mb-0 lg:mb-0">
              When you join ReForm Fitness, you aren't just getting a trainer. You are getting a dedicated team committed to completely transforming your quality of life.
            </p>
            {/* Mobile Image (Inline) */}
            <div className="block lg:hidden w-full h-[45vh] sm:h-[55vh] mt-10 rounded-xl overflow-hidden relative shadow-2xl">
              <img src={images[2]} alt="The Future" className="w-full h-full object-cover grayscale opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-[#111]/20 opacity-80" />
            </div>
          </div>

        </div>

        {/* Right: Pinned Cinematic Imagery (Desktop Only) */}
        <div className="hidden lg:block h-screen relative order-1 lg:order-2" ref={rightPinRef}>
          {images.map((src, i) => (
            <div 
              key={i}
              className="absolute inset-0 w-full h-full will-change-transform"
              style={{ zIndex: images.length - i, opacity: i === 0 ? 1 : 0 }}
              ref={el => imageRefs.current[i] = el}
            >
              <img 
                src={src} 
                alt={`About Story ${i + 1}`} 
                className={`w-full h-full grayscale opacity-80 ${i === 0 ? 'object-contain bg-[#111]' : 'object-cover'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
