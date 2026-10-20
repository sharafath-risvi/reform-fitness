import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const serviceGroups = [
  // Group 1: Core Performance
  [
    {
      num: '01',
      title: 'Body Transformation',
      subtitle: 'Complete Physical & Mental Overhaul',
      img: '/services_images/bodytransformation.jpeg',
    },
    {
      num: '02',
      title: 'Fat Loss',
      subtitle: 'Scientific, Sustainable Fat Reduction',
      img: '/services_images/fatloss.jpeg',
    },
    {
      num: '03',
      title: 'Muscle Building',
      subtitle: 'Strength Through Progressive Overload',
      img: '/services_images/musclebuilding.jpeg',
    },
    {
      num: '04',
      title: 'Home Personal Training',
      subtitle: 'Professional Training at Your Doorstep',
      img: '/services_images/homepersonaltraining.jpeg',
      objectPosition: 'center 30%',
    },
  ],
  // Group 2: Specialized Care
  [
    {
      num: '05',
      title: 'Rehabilitation (Post Injury)',
      subtitle: 'From Recovery to Full Functional Strength',
      img: '/services_images/injuryrehabilation.png',
    },
    {
      num: '06',
      title: 'Senior Fitness',
      subtitle: 'Age Gracefully, Balance & Independence',
      img: '/services_images/seniorfitness.jpeg',
    },
    {
      num: '07',
      title: "Women's Fitness",
      subtitle: 'Designed for Her Unique Physiology',
      img: '/services_images/womenfitness.jpeg',
    },
    {
      num: '08',
      title: 'Yoga',
      subtitle: 'Mind, Body & Breath in Harmony',
      img: '/services_images/yoga.png',
    },
  ],
  // Group 3: Lifestyle & Vitality
  [
    {
      num: '09',
      title: 'Zumba',
      subtitle: 'Fitness That Feels Like a Celebration',
      img: '/services_images/zumba.png',
    },
    {
      num: '10',
      title: 'Mobility & Flexibility',
      subtitle: 'Joint Health & Pain-Free Movement',
      img: '/services_images/mobility&flexibility.png',
    },
    {
      num: '11',
      title: 'Nutrition Guidance',
      subtitle: 'Fuel Your Life the Right Way',
      img: '/images/nutrition.png',
      objectPosition: 'center',
    },
  ],
]

export default function HomeServicesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Eagerly pre-load all 12 service images off the main thread
    serviceGroups.flat().forEach((service) => {
      const img = new Image()
      img.src = service.img
      if (img.decode) {
        img.decode().catch(() => {})
      }
    })

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      const setupTimeline = (isMobile) => {
        // Initial positioning and visibility
        gsap.set('.service-group-1', { yPercent: 0, autoAlpha: 1, force3D: true })
        gsap.set('.service-group-2', { yPercent: 100, autoAlpha: 0, force3D: true })
        gsap.set('.service-group-3', { yPercent: 100, autoAlpha: 0, force3D: true })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: isMobile ? '+=220%' : '+=260%',
            pin: true,
            scrub: 0.8,
            anticipatePin: isMobile ? 0 : 1,
            invalidateOnRefresh: true,
          }
        })

        // Stage 1 Hold
        tl.to({}, { duration: 1.0 })

        // Transition: Group 1 -> Group 2
        tl.to('.service-group-1', {
          yPercent: -100,
          autoAlpha: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        }, "step1")

        tl.fromTo('.service-group-2',
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.5, ease: 'power2.inOut' },
          "step1"
        )

        tl.to('.stage-num-1', { opacity: 0, y: -8, duration: 0.4 }, "step1")
        tl.fromTo('.stage-num-2', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, "step1+=0.2")

        tl.to('.indicator-dot-1', { backgroundColor: 'rgba(0,0,0,0.2)', scale: 0.85, duration: 0.4 }, "step1")
        tl.to('.indicator-dot-2', { backgroundColor: '#E8B884', scale: 1.25, duration: 0.4 }, "step1")

        // Stage 2 Hold
        tl.to({}, { duration: 1.2 })

        // Transition: Group 2 -> Group 3
        tl.to('.service-group-2', {
          yPercent: -100,
          autoAlpha: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        }, "step2")

        tl.fromTo('.service-group-3',
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.5, ease: 'power2.inOut' },
          "step2"
        )

        tl.to('.stage-num-2', { opacity: 0, y: -8, duration: 0.4 }, "step2")
        tl.fromTo('.stage-num-3', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, "step2+=0.2")

        tl.to('.indicator-dot-2', { backgroundColor: 'rgba(0,0,0,0.2)', scale: 0.85, duration: 0.4 }, "step2")
        tl.to('.indicator-dot-3', { backgroundColor: '#E8B884', scale: 1.25, duration: 0.4 }, "step2")

        // Stage 3 Hold before releasing pin into next section
        tl.to({}, { duration: 1.2 })
      }

      mm.add("(min-width: 1024px)", () => {
        setupTimeline(false)
        return () => {}
      })

      mm.add("(max-width: 1023px)", () => {
        setupTimeline(true)
        return () => {}
      })

    }, sectionRef)

    // Recalculate ScrollTrigger start/end coordinates for downstream sections
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] bg-white overflow-hidden flex flex-col justify-between pt-14 sm:pt-16 lg:pt-20 pb-4 sm:pb-6 lg:pb-10 select-none"
    >
      {/* Background radial luxury glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E8B884] opacity-[0.035] blur-[140px] rounded-full pointer-events-none" />

      {/* Header Bar: Positioned below floating navbar with ample clearance */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center sm:flex-row sm:items-end justify-between gap-5 sm:gap-3 relative z-20 mt-6 sm:mt-0 mb-8 sm:mb-8 lg:mb-10">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:w-auto">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-1.5 sm:mb-2 w-full">
            <div className="w-6 sm:w-8 h-[1px] bg-[#E8B884]" />
            <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
              OUR SERVICES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#231F20] leading-tight">
            Training <span className="text-[#E8B884] italic">Designed Around You</span>
          </h2>
        </div>

        {/* Coordinated Group Indicator */}
        <div className="flex items-center gap-3 self-center sm:self-auto pb-1">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] tracking-[0.2em] uppercase text-black/50 font-medium">Stage</span>
            <div className="flex items-center text-xs font-mono font-semibold text-[#E8B884]">
              <div className="relative inline-block w-5 h-4 overflow-hidden text-right mr-1">
                <span className="stage-num-1 absolute inset-0 font-mono font-bold text-[#231F20]">01</span>
                <span className="stage-num-2 absolute inset-0 font-mono font-bold text-[#231F20] opacity-0">02</span>
                <span className="stage-num-3 absolute inset-0 font-mono font-bold text-[#231F20] opacity-0">03</span>
              </div>
              <span className="text-black/40">/ 03</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-black/5 border border-black/10 px-2.5 py-1.5 rounded-full">
            <div className="indicator-dot-1 w-2 h-2 rounded-full bg-[#E8B884] transform-gpu transition-all" />
            <div className="indicator-dot-2 w-2 h-2 rounded-full bg-black/20 transform-gpu transition-all" />
            <div className="indicator-dot-3 w-2 h-2 rounded-full bg-black/20 transform-gpu transition-all" />
          </div>
        </div>
      </div>

      {/* Stage Container: Holds the 2x2 group grids and cleanly clips vertical transitions */}
      <div className="relative w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-[460px] sm:h-[580px] lg:h-[680px] xl:h-[780px] overflow-hidden z-10 my-auto">
        {serviceGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`service-group-${groupIndex + 1} absolute inset-0 w-full h-full will-change-[transform,opacity] transform-gpu px-4 sm:px-6 lg:px-8`}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 h-full w-full">
              {group.map((service, idx) => (
                <Link
                  key={service.num}
                  to="/services"
                  onClick={() => {
                    window.scrollTo(0, 0)
                    if (window.lenis) {
                      window.lenis.scrollTo(0, { immediate: true })
                    }
                  }}
                  className={`group relative h-full cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden bg-[#181818] border border-white/15 hover:border-[#E8B884]/80 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(232,184,132,0.18)] flex flex-col justify-between p-3 sm:p-4 lg:p-5 ${group.length === 3 && idx === 2 ? 'col-span-2 mx-auto w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.75rem)]' : 'w-full'}`}
                >
                  {/* Service Background Image - Full brightness & natural vibrant color */}
                  <img
                    src={service.img}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-100 transform-gpu"
                    style={{ objectPosition: service.objectPosition || 'center' }}
                    loading="eager"
                    decoding="async"
                  />

                  {/* Subtle top vignette for badge clarity without darkening the image body */}
                  <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />

                  {/* Subtle bottom gradient only where title/subtitle sit for crisp readability */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                  {/* Top Bar: Service Number + Link Arrow */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#E8B884] font-bold px-2 py-0.5 rounded-md bg-black/45 backdrop-blur-md border border-white/10 shadow-sm">
                      {service.num}
                    </span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E8B884] group-hover:bg-[#E8B884] group-hover:text-black group-hover:border-[#E8B884] transition-all duration-300 shadow-md">
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Bar: Title + Subtitle */}
                  <div className="relative z-10">
                    <h3 className="font-serif text-xs sm:text-base lg:text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-[#E8B884] transition-colors duration-300 leading-snug line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-medium mt-0.5 sm:mt-1 line-clamp-1">
                      {service.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
