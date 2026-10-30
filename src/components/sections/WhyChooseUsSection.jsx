import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollIndicator from '../ui/ScrollIndicator'

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
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      // Desktop (>= 1024px): Original creative 3D fan-out layout — UNCHANGED
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

      // Mobile (< 1024px): Clean vertical row-by-row entrance
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray('.why-mobile-row').forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                toggleActions: 'play none none none',
                invalidateOnRefresh: true,
              },
            }
          )
        })
      })

    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="w-full bg-white">
      {/* ══════════════════════════════════════════════════════════ */}
      {/* DESKTOP LAYOUT (lg+) — UNCHANGED                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section ref={containerRef} className="hidden lg:flex relative w-full h-screen bg-white overflow-hidden flex-col items-center justify-center">
        
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

        <ScrollIndicator
          variant="light"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOBILE LAYOUT (< lg) — Clean vertical row-by-row layout   */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="lg:hidden w-full bg-white py-14 sm:py-16 px-4 sm:px-6 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-6 h-[1px] bg-[#E8B884]" />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl leading-[1.08] font-serif font-bold">
            <span className="text-[#231F20]">Built</span>{' '}
            <span className="text-[#E8B884] italic">Different</span>
          </h2>
        </div>

        {/* Vertical Row-by-Row Items */}
        <div className="flex flex-col gap-5 sm:gap-6 max-w-xl mx-auto w-full">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="why-mobile-row relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-[#181818]"
            >
              <img
                src={card.img}
                alt={`${card.title} ${card.subtitle}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 border border-white/15 rounded-2xl pointer-events-none" />

              <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 text-white flex flex-col items-center text-center">
                <h3 className="font-serif text-2xl sm:text-3xl mb-1 tracking-wide font-bold">
                  {card.title}
                </h3>
                <span className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-[#E8B884]">
                  {card.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        <ScrollIndicator variant="light" className="mt-10" />
      </section>
    </div>
  )
}
