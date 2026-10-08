import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const journeySteps = [
  { 
    step: '01', 
    title: 'Lead Enquiry', 
    desc: 'Every transformation begins with one conversation. We discuss your goals and lay the foundation.',
    image: '/images/leadenquiry.jpeg'
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
    image: '/Reform_images/DSC06277.JPG'
  },
  { 
    step: '07', 
    title: 'Weekly Follow-up', 
    desc: 'Continuous tracking and micro-adjustments to ensure you are always progressing.',
    image: '/Reform_images/DSC06292.JPG'
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

  useEffect(() => {
    let ctx = gsap.context(() => {
      let activeIndex = -1
      
      const updateStage = (index) => {
        if (activeIndex === index) return
        const prev = activeIndex
        activeIndex = index
        
        if (prev !== -1) {
          gsap.to(`.stage-badge-${prev}`, { opacity: 0, y: -10, duration: 0.6, ease: 'power2.inOut', overwrite: 'auto' })
          gsap.to(`.stage-title-${prev}`, { opacity: 0, y: -15, filter: 'blur(4px)', duration: 0.6, ease: 'power2.inOut', overwrite: 'auto' })
          gsap.to(`.stage-desc-${prev}`, { opacity: 0, y: -10, duration: 0.6, ease: 'power2.inOut', overwrite: 'auto' })
          gsap.to(`.film-frame-${prev}`, { scale: 0.9, borderColor: 'transparent', boxShadow: 'none', duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
          gsap.to(`.film-img-${prev}`, { filter: 'blur(4px)', duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
          gsap.to(`.film-overlay-${prev}`, { opacity: 0.5, duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
        }
        
        gsap.fromTo(`.stage-badge-${index}`, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1, overwrite: 'auto' })
        gsap.fromTo(`.stage-title-${index}`, { opacity: 0, y: 20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', delay: 0.15, overwrite: 'auto' })
        gsap.fromTo(`.stage-desc-${index}`, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2, overwrite: 'auto' })
        
        const total = journeySteps.length
        const progressPercent = (index / (total - 1)) * 100
        gsap.to('.progress-dot', { left: `${progressPercent}%`, duration: 0.8, ease: 'power3.inOut', overwrite: 'auto' })
        
        const stageNum = (index + 1).toString().padStart(2, '0')
        const el = document.querySelector('.active-stage-num')
        if (el && el.textContent !== stageNum) {
           gsap.to(el, { opacity: 0, y: -5, duration: 0.2, overwrite: 'auto', onComplete: () => {
               el.textContent = stageNum
               gsap.fromTo(el, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 })
           }})
        }

        gsap.to(`.film-frame-${index}`, { scale: 1, borderColor: 'rgba(232, 184, 132, 0.4)', boxShadow: '0 0 50px rgba(232, 184, 132, 0.15)', duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
        gsap.to(`.film-img-${index}`, { filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
        gsap.to(`.film-overlay-${index}`, { opacity: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
      }

      let mm = gsap.matchMedia()

      // Desktop: original sticky scroll experience — UNCHANGED
      mm.add("(min-width: 1024px)", () => {
        journeySteps.forEach((_, i) => {
          ScrollTrigger.create({
            trigger: `.film-frame-${i}`,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => updateStage(i),
            onEnterBack: () => updateStage(i),
          })
          gsap.fromTo(`.film-img-${i}`,
            { yPercent: -5, scale: 1 },
            { yPercent: 5, scale: 1.05, ease: 'none', scrollTrigger: { trigger: `.film-frame-${i}`, start: 'top bottom', end: 'bottom top', scrub: true } }
          )
        })
      })

      // Mobile: fade each card in as it scrolls into view
      mm.add("(max-width: 1023px)", () => {
        document.querySelectorAll('.mobile-stage-card').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
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
        <div className="w-[40%] sticky top-0 h-[100dvh] pl-24 pr-16 flex flex-col justify-center z-20 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[150%] h-[50vh] -translate-y-1/2 bg-[#E8B884] opacity-[0.03] blur-[100px] rounded-full pointer-events-none z-[-1]" />
          <div className="relative z-10 pointer-events-auto flex flex-col items-start w-full">
            <div className="flex flex-col items-start relative ml-2">
               <div className="absolute left-[11px] top-6 w-[1px] h-40 bg-gradient-to-b from-[#E8B884]/40 to-transparent" />
               <div className="inline-flex items-center gap-4 relative z-10 w-fit">
                 <div className="w-6 h-[1px] bg-[#E8B884]" />
                 <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
                   PATH TO TRANSFORMATION
                 </span>
               </div>
            </div>
            <h2 className="text-7xl mt-12 leading-[1.05] font-serif drop-shadow-xl ml-8 font-bold">
              <span className="text-white block">Your</span>
              <span className="text-[#E8B884] block italic">Journey</span>
            </h2>
            <div className="relative h-56 w-full mt-12 ml-8 pointer-events-auto">
              {journeySteps.map((step, i) => (
                <div key={i} className={`stage-text-${i} absolute top-0 left-0 w-full pointer-events-none z-10`}>
                  <div className={`stage-badge-${i} inline-flex items-center gap-2 px-3 py-1 border border-[#E8B884]/30 rounded-full bg-[#E8B884]/5 mb-6 opacity-0 will-change-transform`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B884]" />
                    <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#E8B884] font-semibold">STAGE {step.step}</span>
                  </div>
                  <h3 className={`stage-title-${i} text-5xl text-white mb-4 leading-[1.1] font-serif drop-shadow-lg opacity-0 will-change-transform font-bold`}>
                    {step.title.split(' ').map((word, idx, arr) => (
                      <span key={idx} className={idx === arr.length - 1 ? 'italic text-[#E8B884]/90' : ''}>
                        {word}{idx < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className={`stage-desc-${i} text-[#D8D8D8] text-[1.05rem] leading-[1.6] font-light max-w-[340px] font-sans tracking-wide opacity-0 will-change-transform`}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 ml-8 flex flex-col items-start gap-3 pointer-events-auto w-48">
               <div className="text-[#E8B884] font-serif text-[0.8rem] tracking-widest flex items-center">
                 <span className="active-stage-num min-w-[20px] inline-block">01</span>
                 <span className="text-white/30 ml-1">/ {journeySteps.length.toString().padStart(2, '0')}</span>
               </div>
               <div className="flex items-center relative h-3 w-full">
                 <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-white/20" />
                 <div className="progress-dot absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#E8B884] -translate-y-1/2 shadow-[0_0_8px_#E8B884] will-change-[left]" style={{ left: '0%' }} />
               </div>
            </div>
          </div>
        </div>

        {/* Right Column — Film Strip */}
        <div className="w-[60%] flex flex-col py-[25vh] items-center gap-0 pb-[25vh] z-10">
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
                 <div className={`film-overlay film-overlay-${i} absolute inset-0 bg-[#0D0D0D] opacity-50 pointer-events-none`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOBILE LAYOUT (< lg) — Clean vertical storytelling        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden w-full">
        
        {/* Header */}
        <div className="px-4 sm:px-6 pt-16 sm:pt-20 pb-10">
          <div className="inline-flex items-center gap-3 mb-6 w-fit">
            <div className="w-5 h-[1px] bg-[#E8B884]" />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
              PATH TO TRANSFORMATION
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl leading-[1.05] font-serif font-bold">
            <span className="text-white block">Your</span>
            <span className="text-[#E8B884] block italic">Journey</span>
          </h2>
        </div>

        {/* Stages — vertical document flow, all 9 visible */}
        <div className="flex flex-col">
          {journeySteps.map((step, i) => (
            <div key={i} className="mobile-stage-card px-4 sm:px-6 pb-10 sm:pb-14">
              
              {/* Connector between stages */}
              {i > 0 && (
                <div className="flex ml-[9px] mb-8 opacity-40">
                  <div className="w-[1px] h-8 bg-gradient-to-b from-[#E8B884] to-transparent" />
                </div>
              )}

              {/* Stage Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#E8B884]/30 rounded-full bg-[#E8B884]/5 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8B884]" />
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#E8B884] font-semibold">
                  STAGE {step.step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[1.5rem] sm:text-[1.75rem] text-white mb-3 leading-[1.15] font-serif font-bold">
                {step.title.split(' ').map((word, idx, arr) => (
                  <span key={idx} className={idx === arr.length - 1 ? 'italic text-[#E8B884]/90' : ''}>
                    {word}{idx < arr.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </h3>

              {/* Description */}
              <p className="text-[#B8B8B8] text-[0.9rem] leading-[1.7] font-light tracking-wide mb-5 max-w-xs">
                {step.desc}
              </p>

              {/* Image */}
              <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden border border-white/10">
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/50 to-transparent" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
