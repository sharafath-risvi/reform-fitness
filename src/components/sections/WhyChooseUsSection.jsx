import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cardsData = [
  {
    title: 'Personalized',
    subtitle: 'Programs',
    img: '/Reform_images/DSC06277.webp',
  },
  {
    title: 'Certified',
    subtitle: 'Coaches',
    img: '/Reform_images/DSC06269.webp',
  },
  {
    title: 'Science-Based',
    subtitle: 'Training',
    img: '/Reform_images/DSC06224.webp',
  },
  {
    title: 'Long-Term',
    subtitle: 'Results',
    img: '/images/longterm.jpeg',
  },
  {
    title: 'Continuous',
    subtitle: 'Support',
    img: '/images/continuoussupport.jpeg',
  }
]

export default function WhyChooseUsSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      const buildTimeline = (isMobile) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: isMobile ? '+=200%' : '+=300%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })

        // Initial setup
        gsap.set('.card-group', { y: '100vh', rotateX: 0, rotateY: 0, scale: 1, opacity: 1 })
        gsap.set('.card-item', { x: '0%', y: '0%', rotateZ: 0, z: 0 })

        // Phase 1: Rise up (0 to 15)
        tl.to('.card-group', { y: '0vh', duration: 15, ease: 'none' }, 0)

        // Phase 2: Fan out
        const fanDuration = isMobile ? 40 : 20; // 15 to 55 on mobile, 15 to 35 on desktop
        const cards = gsap.utils.toArray('.card-item')
        cards.forEach((card, index) => {
          const offset = index - 2
          tl.to(card, {
            x: `${offset * 85}%`,
            y: `${Math.abs(offset) * 10}%`,
            rotateZ: offset * 8,
            z: -Math.abs(offset) * 150,
            duration: fanDuration,
            ease: 'power1.out'
          }, 15)
        })

        // Phase 3: Tilt
        const tiltDuration = isMobile ? 45 : 25; // 15 to 60 on mobile, 15 to 40 on desktop
        tl.to('.card-group', { 
            rotateX: 8, 
            rotateY: -15, 
            duration: tiltDuration, 
            ease: 'power1.out' 
        }, 15)

        // Phase 4: Settle
        const settleDuration = isMobile ? 25 : 30; // 60 to 85 on mobile, 40 to 70 on desktop
        const settleStart = isMobile ? 60 : 40;
        tl.to('.card-group', { 
            rotateX: 0, 
            rotateY: 0, 
            duration: settleDuration, 
            ease: 'power1.inOut' 
        }, settleStart)

        // Keep flat
        const stayDuration = isMobile ? 5 : 15; // 85 to 90 on mobile, 70 to 85 on desktop
        tl.to('.card-group', { rotateX: 0, duration: stayDuration }, settleStart + settleDuration)

        // Phase 5: Fade out
        const fadeDuration = isMobile ? 10 : 15; // 90 to 100 on mobile, 85 to 100 on desktop
        const fadeStart = isMobile ? 90 : 85;
        tl.to('.card-group', { 
            opacity: 0, 
            scale: 0.9, 
            y: '-10vh', 
            duration: fadeDuration, 
            ease: 'none' 
        }, fadeStart)

        return tl
      }

      mm.add("(min-width: 1024px)", () => buildTimeline(false))
      mm.add("(max-width: 1023px)", () => buildTimeline(true))

    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center">
      
      {/* Editorial Header */}
      <div className="absolute top-0 left-0 w-full pt-12 lg:pt-16 px-8 flex flex-col items-center z-20 pointer-events-none">
        <div className="inline-flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-[1px] bg-[#E8B884]" />
          </div>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
            WHY CHOOSE US
          </span>
        </div>
        
        <h2 className="text-4xl lg:text-6xl leading-[1.05] font-serif text-center drop-shadow-sm font-bold">
          <span className="text-[#231F20]">Built</span>{' '}
          <span className="text-[#E8B884] italic">Different</span>
        </h2>
      </div>

      <div 
        className="card-group relative flex items-center justify-center w-full h-full mt-[8vh] will-change-transform"
        style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
      >
        <div 
          className="relative flex items-center justify-center scale-[0.45] sm:scale-[0.6] md:scale-75 lg:scale-100" 
          style={{ transformStyle: 'preserve-3d' }}
        >
          {cardsData.map((card, index) => {
            const offsetFromCenter = index - 2;
            const zIndex = 10 - Math.abs(offsetFromCenter);
            return (
              <div
                key={index}
                className="card-item group absolute w-[300px] h-[420px] sm:w-[320px] sm:h-[460px] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-white will-change-transform"
                style={{ zIndex }}
              >
                <img src={card.img} alt={card.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 border border-white/20 group-hover:border-white/50 transition-colors duration-500 rounded-[2.5rem]" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 text-white flex flex-col items-center text-center pb-10">
                   <h3 className="font-serif text-3xl mb-1 tracking-wide font-bold">
                     {card.title}
                   </h3>
                   <span className="text-sm font-light tracking-[0.2em] uppercase text-[#E8B884]">
                     {card.subtitle}
                   </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
