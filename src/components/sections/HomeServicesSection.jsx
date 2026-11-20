import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Body Transformation',
    subtitle: 'Complete Physical & Mental Overhaul',
    category: 'Core Performance',
    img: '/services_images/bodytransformation.jpeg',
    objectPosition: 'center 22%',
  },
  {
    num: '02',
    title: 'Fat Loss',
    subtitle: 'Scientific, Sustainable Fat Reduction',
    category: 'Core Performance',
    img: '/services_images/fatloss.jpeg',
    objectPosition: 'center 52%',
  },
  {
    num: '03',
    title: 'Muscle Building',
    subtitle: 'Strength Through Progressive Overload',
    category: 'Core Performance',
    img: '/services_images/musclebuilding.jpeg',
    objectPosition: 'center 42%',
  },
  {
    num: '04',
    title: 'Home Personal Training',
    subtitle: 'Professional Training at Your Doorstep',
    category: 'Core Performance',
    img: '/services_images/homepersonaltraining.jpeg',
    objectPosition: 'center 35%',
  },
  {
    num: '05',
    title: 'Rehabilitation (Post Injury)',
    subtitle: 'From Recovery to Full Functional Strength',
    category: 'Specialized Care',
    img: '/services_images/injuryrehabilation.jpeg',
    objectPosition: 'center 35%',
  },
  {
    num: '06',
    title: 'Senior Fitness',
    subtitle: 'Age Gracefully, Balance & Independence',
    category: 'Specialized Care',
    img: '/services_images/seniorfitness.jpeg',
    objectPosition: 'center 42%',
  },
  {
    num: '07',
    title: "Women's Fitness",
    subtitle: 'Designed for Her Unique Physiology',
    category: 'Specialized Care',
    img: '/services_images/womenfitness.jpeg',
    objectPosition: 'center 38%',
  },
  {
    num: '08',
    title: 'Yoga',
    subtitle: 'Mind, Body & Breath in Harmony',
    category: 'Specialized Care',
    img: '/services_images/yoga.jpeg',
    objectPosition: 'center 22%',
  },
  {
    num: '09',
    title: 'Zumba',
    subtitle: 'Fitness That Feels Like a Celebration',
    category: 'Lifestyle & Vitality',
    img: '/services_images/zumba.png',
    objectPosition: 'center 32%',
  },
  {
    num: '10',
    title: 'Mobility & Flexibility',
    subtitle: 'Joint Health & Pain-Free Movement',
    category: 'Lifestyle & Vitality',
    img: '/services_images/mobility&flexibility.jpeg',
    objectPosition: 'center 40%',
  },
  {
    num: '11',
    title: 'Nutrition Guidance',
    subtitle: 'Fuel Your Life the Right Way',
    category: 'Lifestyle & Vitality',
    img: '/images/nutrition.png',
    objectPosition: 'center 50%',
  },
]

export default function HomeServicesSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const mobileTrackRef = useRef(null)
  const mobileCardRefs = useRef([])
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  useEffect(() => {
    // Eagerly pre-load all service images off the main thread
    services.forEach((service) => {
      const img = new Image()
      img.src = service.img
      if (img.decode) {
        img.decode().catch(() => {})
      }
    })

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Desktop: Pinned Horizontal Scrolling
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current
        const section = sectionRef.current
        if (!track || !section) return

        const getScrollAmount = () => track.scrollWidth - window.innerWidth + 160

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollAmount() * 1.15}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress
              const num = Math.min(
                services.length,
                Math.max(1, Math.floor(p * services.length) + 1)
              ).toString().padStart(2, '0')

              const numEl = section.querySelector('.active-service-num')
              if (numEl && numEl.textContent !== num) {
                numEl.textContent = num
              }

              const fillEl = section.querySelector('.services-progress-fill')
              if (fillEl) {
                fillEl.style.width = `${Math.min(100, Math.max(8, p * 100))}%`
              }
            },
          },
        })

        return () => {
          tween.kill()
        }
      })
    }, sectionRef)

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  const handleDesktopScroll = (direction) => {
    const scrollAmount = window.innerWidth * 0.65 * (direction === 'next' ? 1 : -1)
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' })
  }

  const scrollToMobileService = (index) => {
    const clamped = Math.max(0, Math.min(services.length - 1, index))
    setMobileActiveIndex(clamped)
    const container = mobileTrackRef.current
    const card = mobileCardRefs.current[clamped]
    if (container && card) {
      const targetLeft = card.offsetLeft - container.offsetLeft - 16
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      })
    }
  }

  const handleMobileScroll = () => {
    const container = mobileTrackRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    let closestIdx = 0
    let minDistance = Infinity

    mobileCardRefs.current.forEach((card, idx) => {
      if (!card) return
      const cardStart = card.offsetLeft - container.offsetLeft - 16
      const dist = Math.abs(scrollLeft - cardStart)
      if (dist < minDistance) {
        minDistance = dist
        closestIdx = idx
      }
    })

    if (closestIdx !== mobileActiveIndex) {
      setMobileActiveIndex(closestIdx)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="home-services-section relative w-full h-[100dvh] bg-white overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-14 pb-8 sm:pb-10 lg:pb-10 select-none text-[#231F20]"
    >
      {/* Background radial luxury glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#E8B884] opacity-[0.035] blur-[160px] rounded-full pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* TOP HEADER: Static within pinned viewport                 */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="home-services-header w-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 relative z-20 shrink-0">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[1px] bg-[#E8B884]" />
            <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
              OUR SERVICES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#231F20] leading-tight">
            Training <span className="text-[#E8B884] italic">Designed Around You</span>
          </h2>
        </div>

        {/* Coordinated Progress & Controls */}
        <div className="flex items-center gap-5 sm:gap-8 self-end sm:self-auto">
          {/* Active Counter & Progress Track */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center text-xs font-mono font-semibold text-[#E8B884]">
              <span className="active-service-num text-sm sm:text-base font-bold text-[#231F20] mr-1">
                {(mobileActiveIndex + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-black/40">/ {services.length.toString().padStart(2, '0')}</span>
            </div>
            {/* Live Progress Bar */}
            <div className="w-24 sm:w-32 h-[2px] bg-black/10 rounded-full overflow-hidden">
              <div
                className="services-progress-fill h-full bg-[#E8B884] transition-all duration-150 rounded-full"
                style={{ width: `${((mobileActiveIndex + 1) / services.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Desktop Arrow Buttons for easy navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDesktopScroll('prev')}
              aria-label="Scroll services backward"
              className="w-10 h-10 rounded-full border border-black/15 bg-black/[0.04] hover:bg-[#E8B884] hover:text-black hover:border-[#E8B884] text-[#231F20] flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleDesktopScroll('next')}
              aria-label="Scroll services forward"
              className="w-10 h-10 rounded-full border border-black/15 bg-black/[0.04] hover:bg-[#E8B884] hover:text-black hover:border-[#E8B884] text-[#231F20] flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* DESKTOP PINNED HORIZONTAL SCROLL TRACK (lg+)              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex items-center w-full overflow-hidden my-auto relative z-10">
        <div
          ref={trackRef}
          className="flex gap-6 xl:gap-8 px-16 will-change-transform transform-gpu items-center py-4"
        >
          {services.map((service) => (
            <Link
              key={service.num}
              to="/services"
              onClick={() => {
                window.scrollTo(0, 0)
                if (window.lenis) {
                  window.lenis.scrollTo(0, { immediate: true })
                }
              }}
              className="group relative shrink-0 w-[440px] xl:w-[490px] 2xl:w-[540px] h-[64vh] min-h-[490px] max-h-[640px] rounded-2xl xl:rounded-3xl overflow-hidden bg-[#161616] border border-black/10 hover:border-[#E8B884]/80 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(232,184,132,0.28)] flex flex-col justify-between p-7 xl:p-8 2xl:p-9 cursor-pointer"
            >
              {/* Full Service Image with tailored focal framing */}
              <img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-100 transform-gpu"
                style={{ objectPosition: service.objectPosition || 'center' }}
                loading="eager"
                decoding="async"
              />

              {/* Top Vignette Overlay */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/75 via-black/30 to-transparent pointer-events-none" />

              {/* Bottom Vignette Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

              {/* Top Bar: Service Number Badge + Explore Arrow */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#E8B884] px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 shadow-sm">
                    {service.num}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-white/80 font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    {service.category}
                  </span>
                </div>
                <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E8B884] group-hover:bg-[#E8B884] group-hover:text-black group-hover:border-[#E8B884] transition-all duration-300 shadow-lg">
                  <ArrowUpRight size={19} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Bar: Title + Subtitle + Action link */}
              <div className="relative z-10">
                <h3 className="font-serif text-2xl xl:text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-[#E8B884] transition-colors duration-300 leading-tight mb-2 line-clamp-2">
                  {service.title}
                </h3>
                <p className="text-xs xl:text-sm text-white/85 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] line-clamp-2">
                  {service.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#E8B884] opacity-85 group-hover:opacity-100 transition-opacity">
                  <span>Explore Service</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOBILE / TABLET HORIZONTAL SWIPE TRACK (< lg)            */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col w-full my-auto overflow-hidden">
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-5 sm:px-8 pb-4 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {services.map((service, idx) => (
            <div
              key={service.num}
              ref={(el) => (mobileCardRefs.current[idx] = el)}
              className="snap-start shrink-0 w-[86vw] sm:w-[70vw] md:w-[56vw] max-w-[440px] h-[58vh] min-h-[430px] max-h-[560px]"
            >
              <Link
                to="/services"
                onClick={() => {
                  window.scrollTo(0, 0)
                  if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
                }}
                className="relative w-full h-full rounded-2xl overflow-hidden bg-[#161616] border border-black/10 flex flex-col justify-between p-6 shadow-xl block"
              >
                {/* Full Image */}
                <img
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: service.objectPosition || 'center' }}
                  loading="lazy"
                  decoding="async"
                />

                {/* Overlays */}
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/75 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#E8B884] px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15">
                      {service.num}
                    </span>
                    <span className="text-[10px] tracking-wider uppercase text-white/80 font-semibold px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                      {service.category}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E8B884]">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10">
                  <h3 className="font-serif text-2xl font-bold text-white leading-tight mb-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    {service.title}
                  </h3>
                  <p className="text-xs text-white/85 font-medium leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2">
                    {service.subtitle}
                  </p>
                  <div className="mt-3.5 flex items-center gap-1.5 text-xs font-semibold text-[#E8B884]">
                    <span>Explore Service</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Carousel Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            type="button"
            onClick={() => scrollToMobileService(mobileActiveIndex - 1)}
            disabled={mobileActiveIndex === 0}
            aria-label="Previous service"
            className="w-10 h-10 rounded-full border border-black/15 bg-black/[0.04] disabled:opacity-30 disabled:pointer-events-none text-[#231F20] flex items-center justify-center active:scale-95 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollToMobileService(mobileActiveIndex + 1)}
            disabled={mobileActiveIndex === services.length - 1}
            aria-label="Next service"
            className="w-10 h-10 rounded-full border border-[#E8B884] bg-[#E8B884] text-black flex items-center justify-center active:scale-95 transition-all shadow-md"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Slide to explore indicator below arrows */}
        <div className="flex items-center justify-center mt-2.5">
          <span className="text-[10px] tracking-[0.25em] uppercase text-black/50 font-semibold flex items-center gap-1.5">
            <span>Slide to explore</span>
            <ArrowRight size={12} className="text-[#E8B884] inline" />
          </span>
        </div>
      </div>
    </section>
  )
}
