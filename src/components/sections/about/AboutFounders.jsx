import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTagline from '../../ui/SectionTagline'

export default function AboutFounders() {
  const containerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create a single, coordinated timeline attached to one ScrollTrigger
      // This prevents disjointed animations or elements getting stuck during fast scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          // toggleActions: "play none none none" is the default behavior, 
          // playing the animation once when it enters the viewport.
        }
      })

      tl
        // 1. Heading reveals smoothly (Centred)
        .fromTo('.founder-header',
          { y: 40, opacity: 0, filter: 'blur(4px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
        )
        // 2. Image (Left side) enters from RIGHT to LEFT with a premium clip reveal
        .fromTo('.founder-image',
          { x: 60, opacity: 0, clipPath: 'inset(0% 15% 0% 0%)' },
          { x: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.out' },
          '-=0.4' // Overlap with heading entrance
        )
        // 3. Founder story (Right side) enters from RIGHT to LEFT (staggered paragraphs)
        .fromTo('.founder-text p',
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' },
          '-=0.8' // Start revealing concurrently as the image moves
        )
        // 4. Closing tagline appears beneath the story on the right
        .fromTo('.founder-tagline',
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.4' // Slightly overlap the end of the text stagger
        )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden" ref={containerRef}>
      <div className="container-custom max-w-7xl mx-auto px-6">
        
        {/* Centered Heading Area (Matched to Contact Page Typography) */}
        <div className="founder-header flex flex-col items-center text-center mb-12 lg:mb-20">
          <SectionTagline text="Meet the Founder" className="mb-8" />
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl mb-8 leading-[1.05] font-bold text-[#231F20]">
            The <span className="text-[#2B6F6F] font-bold">Story</span><br />
            <em className="text-[#E8B884] italic">Behind Reform Fitness</em>
          </h2>
        </div>
        
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* Image - LEFT SIDE (Slightly lowered and slightly taller) */}
          <div className="w-full flex flex-col lg:col-span-5 xl:col-span-5 mt-0 lg:mt-2">
            <div className="relative group w-full mb-8 lg:mb-0 max-w-md mx-auto lg:max-w-none">
              <div className="founder-image relative overflow-hidden aspect-[2/3] rounded-2xl w-full shadow-2xl">
                <img 
                  src="/founder/founder.jpeg" 
                  alt="Founder of Reform Fitness" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Founder Info - RIGHT SIDE */}
          <div className="founder-text flex flex-col justify-start lg:col-span-7 xl:col-span-7 lg:pt-4">
            <p className="text-base md:text-lg text-[#231F20]/90 leading-relaxed font-light mb-6">
              Reform Fitness was born from a personal experience that <span className="text-[#2B6F6F] font-medium">changed the way I understood fitness.</span>
            </p>
            
            <p className="text-base md:text-lg text-[#231F20]/90 leading-relaxed font-light mb-6">
              As a sports enthusiast, I never imagined that back pain would prevent me from playing the sport I loved. My wife was also facing her own postnatal fitness challenges. After medical treatment and physiotherapy, I discovered the <span className="text-[#2B6F6F] font-medium">impact of structured, personalized strength training.</span>
            </p>
            
            <p className="text-base md:text-lg text-[#231F20]/90 leading-relaxed font-light mb-6">
              The results changed everything. I regained my strength, returned to tennis, and saw significant improvements in my wife’s fitness journey as well.
            </p>
            
            <p className="text-base md:text-lg text-[#231F20]/90 leading-relaxed font-light mb-6">
              That experience led to a simple belief: the right training can do more than change your body—it can <span className="text-[#2B6F6F] font-medium">restore your ability to live, move, and perform at your best.</span>
            </p>
            
            <p className="text-base md:text-lg text-[#231F20]/90 leading-relaxed font-light mb-10">
              That belief became Reform Fitness.
            </p>
            
            <p className="text-base md:text-lg text-[#231F20]/90 leading-relaxed font-light mb-12">
              Today, we combine personalized coaching, strength training, and a results-driven approach to help every client overcome limitations, build lasting strength, and achieve meaningful transformation.
            </p>

            {/* Tagline Below Story (Right Side) */}
            <div className="founder-tagline mt-4">
              <p className="text-3xl md:text-4xl text-[#231F20] font-bold leading-tight mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                REFORM FITNESS
              </p>
              <p className="text-lg md:text-xl text-[#2B6F6F] font-semibold leading-relaxed">
                Built on experience. Driven by transformation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
