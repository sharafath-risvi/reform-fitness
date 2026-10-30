import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollIndicator from '../ui/ScrollIndicator'

gsap.registerPlugin(ScrollTrigger)

const journeySteps = [
  { 
    step: '01', 
    title: 'Lead Enquiry', 
    desc: 'Every transformation begins with one conversation. We discuss your goals and lay the foundation.',
    image: '/images/leadenquiry.png'
  },
  { 
    step: '02', 
    title: 'Fitness Assessment', 
    desc: 'We understand your body before we transform it. Precision metrics ensure safety.',
    image: '/images/fitnessassessment.jpeg'
  },
  { 
    step: '03', 
    title: 'Health Screening', 
    desc: 'Safety always comes before intensity. We evaluate mobility and potential limitations.',
    image: '/images/healthscreening.jpeg'
  },
  { 
    step: '04', 
    title: 'Goal Discussion', 
    desc: 'Clear, realistic milestones set the foundation for long-term success and motivation.',
    image: '/images/goaldiscussion.jpeg'
  },
  { 
    step: '05', 
    title: 'Customized Program', 
    desc: 'A science-backed, bespoke plan designed exclusively for your unique body type.',
    image: '/images/customizedprograms.jpeg'
  },
  { 
    step: '06', 
    title: 'Training Begins', 
    desc: 'Precision execution at our luxury facility, guided every step of the way.',
    image: '/Reform_images/stage6.png'
  },
  { 
    step: '07', 
    title: 'Weekly Follow-up', 
    desc: 'Continuous tracking and micro-adjustments to ensure you are always progressing.',
    image: '/images/weeklyfollowup.png'
  },
  { 
    step: '08', 
    title: 'Monthly Review', 
    desc: 'Comprehensive evaluations to measure real physical change and strength gains.',
    image: '/images/monthlyreview.jpeg'
  },
  { 
    step: '09', 
    title: 'Transformation', 
    desc: 'Sustainable habits formed for a lifelong impact. Welcome to the new you.',
    image: '/images/transformation.jpeg'
  }
]

export default function CustomerJourneySection() {
  const sectionRef = useRef(null)
  const mobileCarouselRef = useRef(null)
  const mobileCardRefs = useRef([])
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  const scrollToMobileStage = (index) => {
    const clamped = Math.max(0, Math.min(journeySteps.length - 1, index))
    setMobileActiveIndex(clamped)
    const container = mobileCarouselRef.current
    const card = mobileCardRefs.current[clamped]
    if (container && card) {
      const targetLeft = card.offsetLeft - container.offsetLeft - 16
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      })
    }
  }

  const handleMobilePrev = () => {
    scrollToMobileStage(mobileActiveIndex - 1)
  }

  const handleMobileNext = () => {
    scrollToMobileStage(mobileActiveIndex + 1)
  }

  const handleMobileScroll = () => {
    const container = mobileCarouselRef.current
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

  useEffect(() => {
    let ctx = gsap.context(() => {
      let activeIndex = -1
      
      const updateStage = (index, immediate = false) => {
        if (activeIndex === index && !immediate) return
        const prev = activeIndex
        activeIndex = index

        // Ensure all non-active stages cleanly hide without overlapping tweens
        journeySteps.forEach((_, idx) => {
          if (idx !== index) {
            const badgeSel = `.stage-badge-${idx}`
            const titleSel = `.stage-title-${idx}`
            const descSel = `.stage-desc-${idx}`
            const frameSel = `.film-frame-${idx}`
            const imgSel = `.film-img-${idx}`
            const overlaySel = `.film-overlay-${idx}`

            gsap.killTweensOf([badgeSel, titleSel, descSel, frameSel, imgSel, overlaySel])

            if (idx === prev && !immediate) {
              gsap.to(badgeSel, { autoAlpha: 0, y: -10, duration: 0.4, ease: 'power2.inOut', overwrite: true })
              gsap.to(titleSel, { autoAlpha: 0, y: -15, filter: 'blur(4px)', duration: 0.4, ease: 'power2.inOut', overwrite: true })
              gsap.to(descSel, { autoAlpha: 0, y: -10, duration: 0.4, ease: 'power2.inOut', overwrite: true })
              gsap.to(frameSel, { scale: 0.92, borderColor: 'transparent', boxShadow: 'none', duration: 0.6, ease: 'power2.out', overwrite: true })
              gsap.to(imgSel, { filter: 'blur(4px)', duration: 0.6, ease: 'power2.out', overwrite: true })
              gsap.to(overlaySel, { opacity: 0.5, duration: 0.6, ease: 'power2.out', overwrite: true })
            } else {
              gsap.set([badgeSel, titleSel, descSel], { autoAlpha: 0, y: 15 })
              gsap.set(frameSel, { scale: 0.92, borderColor: 'transparent', boxShadow: 'none' })
              gsap.set(imgSel, { filter: 'blur(4px)' })
              gsap.set(overlaySel, { opacity: 0.5 })
            }
          }
        })

        const activeBadge = `.stage-badge-${index}`
        const activeTitle = `.stage-title-${index}`
        const activeDesc = `.stage-desc-${index}`
        const activeFrame = `.film-frame-${index}`
        const activeImg = `.film-img-${index}`
        const activeOverlay = `.film-overlay-${index}`

        gsap.killTweensOf([activeBadge, activeTitle, activeDesc, activeFrame, activeImg, activeOverlay])

        if (immediate) {
          gsap.set(activeBadge, { autoAlpha: 1, y: 0 })
          gsap.set(activeTitle, { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
          gsap.set(activeDesc, { autoAlpha: 1, y: 0 })
          gsap.set(activeFrame, { scale: 1, borderColor: 'rgba(232, 184, 132, 0.4)', boxShadow: '0 0 50px rgba(232, 184, 132, 0.15)' })
          gsap.set(activeImg, { filter: 'blur(0px)' })
          gsap.set(activeOverlay, { opacity: 0 })
        } else {
          gsap.fromTo(activeBadge, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.05, overwrite: true })
          gsap.fromTo(activeTitle, { autoAlpha: 0, y: 20, filter: 'blur(6px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', delay: 0.08, overwrite: true })
          gsap.fromTo(activeDesc, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.12, overwrite: true })

          gsap.to(activeFrame, { scale: 1, borderColor: 'rgba(232, 184, 132, 0.4)', boxShadow: '0 0 50px rgba(232, 184, 132, 0.15)', duration: 0.65, ease: 'power2.out', overwrite: true })
          gsap.to(activeImg, { filter: 'blur(0px)', duration: 0.65, ease: 'power2.out', overwrite: true })
          gsap.to(activeOverlay, { opacity: 0, duration: 0.65, ease: 'power2.out', overwrite: true })
        }

        const total = journeySteps.length
        const progressPercent = (index / (total - 1)) * 100
        gsap.to('.progress-dot', { left: `${progressPercent}%`, duration: immediate ? 0 : 0.6, ease: 'power3.inOut', overwrite: 'auto' })

        const stageNum = (index + 1).toString().padStart(2, '0')
        const el = sectionRef.current?.querySelector('.active-stage-num')
        if (el && el.textContent !== stageNum) {
          if (immediate) {
            el.textContent = stageNum
            gsap.set(el, { opacity: 1, y: 0 })
          } else {
            gsap.to(el, {
              opacity: 0,
              y: -5,
              duration: 0.18,
              overwrite: 'auto',
              onComplete: () => {
                el.textContent = stageNum
                gsap.fromTo(el, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.25 })
              },
            })
          }
        }
      }

      let mm = gsap.matchMedia()

      // Desktop: sticky scroll experience with synchronized stage updates — UNCHANGED
      mm.add('(min-width: 1024px)', () => {
        updateStage(0, true)

        journeySteps.forEach((_, i) => {
          ScrollTrigger.create({
            trigger: `.film-frame-${i}`,
            start: 'top 62%',
            end: 'bottom 38%',
            onEnter: () => updateStage(i),
            onEnterBack: () => updateStage(i),
            invalidateOnRefresh: true,
          })
          gsap.fromTo(
            `.film-img-${i}`,
            { yPercent: -5, scale: 1 },
            {
              yPercent: 5,
              scale: 1.05,
              ease: 'none',
              scrollTrigger: {
                trigger: `.film-frame-${i}`,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
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
    <section ref={sectionRef} className="bg-[#0D0D0D] w-full relative">

      {/* ══════════════════════════════════════════════════════════ */}
      {/* DESKTOP LAYOUT (lg+) — sticky cinematic experience        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-row w-full max-w-[1800px] mx-auto">
        
        {/* Left Column — Sticky */}
        <div className="w-[42%] sticky top-0 h-[100dvh] pl-16 xl:pl-24 pr-10 xl:pr-14 flex flex-col justify-center z-20 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[150%] h-[50vh] -translate-y-1/2 bg-[#E8B884] opacity-[0.03] blur-[100px] rounded-full pointer-events-none z-[-1]" />
          <div className="relative z-10 pointer-events-auto flex flex-col items-start w-full">
            <div className="flex flex-col items-start relative ml-2">
               <div className="absolute left-[11px] top-6 w-[1px] h-24 bg-gradient-to-b from-[#E8B884]/40 to-transparent" />
               <div className="inline-flex items-center gap-4 relative z-10 w-fit">
                 <div className="w-6 h-[1px] bg-[#E8B884]" />
                 <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
                   PATH TO TRANSFORMATION
                 </span>
               </div>
            </div>

            {/* Small Section Heading: Your Journey */}
            <h2 className="text-2xl xl:text-3xl mt-4 leading-[1.1] font-serif drop-shadow-xl ml-8 font-bold">
              <span className="text-white">Your </span>
              <span className="text-[#E8B884] italic">Journey</span>
            </h2>

            {/* Synchronized Changing Stage Content — Larger & Clearly Readable */}
            <div className="relative min-h-[280px] xl:min-h-[310px] w-full mt-8 ml-8 pointer-events-auto">
              {journeySteps.map((step, i) => (
                <div
                  key={i}
                  className={`stage-text-${i} absolute top-0 left-0 w-full pointer-events-none z-10`}
                >
                  <div
                    className={`stage-badge-${i} inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#E8B884]/35 rounded-full bg-[#E8B884]/10 mb-5 will-change-transform ${
                      i === 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#E8B884]" />
                    <span className="text-xs tracking-[0.22em] uppercase text-[#E8B884] font-semibold">
                      STAGE {step.step}
                    </span>
                  </div>
                  <h3
                    className={`stage-title-${i} text-5xl xl:text-6xl 2xl:text-[4rem] text-white mb-5 leading-[1.08] font-serif drop-shadow-lg will-change-transform font-bold ${
                      i === 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {step.title.split(' ').map((word, idx, arr) => (
                      <span key={idx} className={idx === arr.length - 1 ? 'italic text-[#E8B884]/95' : ''}>
                        {word}
                        {idx < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p
                    className={`stage-desc-${i} text-[#EFEFEF] text-lg xl:text-xl leading-[1.65] font-light max-w-[430px] font-sans tracking-wide will-change-transform ${
                      i === 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stage Progress Counter & Bar */}
            <div className="mt-6 ml-8 flex flex-col items-start gap-3 pointer-events-auto w-56">
               <div className="text-[#E8B884] font-serif text-sm tracking-widest flex items-center">
                 <span className="active-stage-num min-w-[22px] inline-block font-bold">01</span>
                 <span className="text-white/40 ml-1">/ {journeySteps.length.toString().padStart(2, '0')}</span>
               </div>
               <div className="flex items-center relative h-3 w-full">
                 <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-white/20" />
                 <div className="progress-dot absolute top-1/2 left-0 w-2.5 h-2.5 rounded-full bg-[#E8B884] -translate-y-1/2 shadow-[0_0_8px_#E8B884] will-change-[left]" style={{ left: '0%' }} />
               </div>
            </div>

            {/* Subtle Scroll Indicator */}
            <ScrollIndicator
              variant="dark"
              className="mt-8 ml-8 !justify-start"
            />
          </div>
        </div>

        {/* Right Column — Film Strip */}
        <div className="w-[58%] flex flex-col py-[22vh] items-center gap-0 pb-[25vh] z-10">
          {journeySteps.map((step, i) => (
            <div key={i} className="film-frame-wrapper flex flex-col items-center w-full">
              {i > 0 && (
                <div className="flex flex-col items-center justify-center h-32 relative opacity-60">
                  <div className="w-[1px] h-full bg-[#E8B884]/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-[#E8B884] bg-[#0D0D0D] shadow-[0_0_8px_#E8B884]" />
                </div>
              )}
              <div className={`film-frame film-frame-${i} w-[75%] max-w-[700px] aspect-[4/5] relative rounded-[2rem] overflow-hidden will-change-transform border border-transparent`}>
                 <img src={step.image} className={`film-img film-img-${i} absolute inset-0 w-full h-full object-cover will-change-transform transform-gpu`} alt={step.title} loading="lazy" decoding="async" />
                 <div className={`film-overlay film-overlay-${i} absolute inset-0 bg-[#0D0D0D] ${i === 0 ? 'opacity-0' : 'opacity-50'} pointer-events-none`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOBILE LAYOUT (< lg) — Horizontal Carousel with Arrows     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden w-full py-14 sm:py-16 overflow-hidden">
        
        {/* Header + Top Stage Counter */}
        <div className="px-4 sm:px-6 mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl leading-[1.1] font-serif font-bold">
              <span className="text-white">Your </span>
              <span className="text-[#E8B884] italic">Journey</span>
            </h2>
          </div>

          {/* Stage Counter */}
          <div className="text-[#E8B884] font-serif text-sm tracking-widest flex items-center pb-0.5">
            <span className="font-bold">
              {(mobileActiveIndex + 1).toString().padStart(2, '0')}
            </span>
            <span className="text-white/40 ml-1">
              / {journeySteps.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Horizontal Carousel Wrapper */}
        <div className="relative w-full">
          {/* Horizontal Scroll Track — 1 card visible at a time + peek of next card */}
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 pb-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {journeySteps.map((step, i) => (
              <div
                key={i}
                ref={(el) => (mobileCardRefs.current[i] = el)}
                className="snap-start shrink-0 w-[84vw] sm:w-[76vw] max-w-[400px] rounded-2xl bg-[#161616] border border-white/10 overflow-hidden shadow-xl flex flex-col"
              >
                {/* Image Container */}
                <div className="w-full aspect-[4/3] relative overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/30" />

                  {/* Stage Badge overlaid on top-left */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-3 py-1 border border-[#E8B884]/40 rounded-full bg-black/65 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B884]" />
                    <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#E8B884] font-semibold">
                      STAGE {step.step}
                    </span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl text-white mb-2.5 leading-[1.15] font-serif font-bold">
                      {step.title.split(' ').map((word, idx, arr) => (
                        <span
                          key={idx}
                          className={idx === arr.length - 1 ? 'italic text-[#E8B884]/95' : ''}
                        >
                          {word}
                          {idx < arr.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </h3>
                    <p className="text-[#E2E2E2] text-base leading-[1.6] font-light tracking-wide">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* End spacer so the last card can snap cleanly */}
            <div className="shrink-0 w-4 sm:w-6" aria-hidden="true" />
          </div>
        </div>

        {/* Bottom Controls: Pagination Dots + Left/Right Navigation Arrows */}
        <div className="px-4 sm:px-6 mt-5 flex flex-col items-center gap-5">
          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2">
            {journeySteps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToMobileStage(idx)}
                aria-label={`Go to stage ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === mobileActiveIndex
                    ? 'w-6 bg-[#E8B884]'
                    : 'w-2 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>

          {/* Left and Right Navigation Arrows Side-by-Side at the Bottom */}
          <div className="flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={handleMobilePrev}
              disabled={mobileActiveIndex === 0}
              aria-label="Previous journey stage"
              className="w-12 h-12 rounded-full bg-[#E8B884] border border-[#E8B884] text-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-200 active:scale-95"
            >
              <ChevronLeft size={22} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={handleMobileNext}
              disabled={mobileActiveIndex === journeySteps.length - 1}
              aria-label="Next journey stage"
              className="w-12 h-12 rounded-full bg-[#E8B884] border border-[#E8B884] text-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-200 active:scale-95"
            >
              <ChevronRight size={22} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
