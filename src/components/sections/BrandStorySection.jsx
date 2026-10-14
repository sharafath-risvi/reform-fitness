import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const bgImages = [
  "/Reform_images/DSC06269.webp", 
]

const coreValueImages = [
  "/images/safetyfirst.webp",
  "/images/clientcentered.jpeg",
  "/images/professionalism.jpeg",
  "/Reform_images/DSC06234.webp",
  "/Reform_images/DSC06253.webp",
  "/images/sciencebased.jpeg",
  "/Reform_images/DSC06292.webp",
  "/images/longterm.jpeg",
]

const coreValues = [
  "Safety First",
  "Client-Centered",
  "Professionalism",
  "Integrity",
  "Confidentiality",
  "Science-Based",
  "Continuous Improvement",
  "Long-Term Results"
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
  const cvRef = useRef(null)
  
  useEffect(() => {
    // Eagerly pre-load & decode all Core Values images off the main thread to eliminate on-scroll decoding pauses
    coreValueImages.forEach((src) => {
      const img = new Image()
      img.src = src
      if (img.decode) {
        img.decode().catch(() => {})
      }
    })

    let ctx = gsap.context(() => {
      
      const mm = gsap.matchMedia()

      // ==========================================
      // SECTION 1: STORY (Chapter 01 & 02)
      // ==========================================

      // Desktop: full 400% scroll distance
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
        tlStory.to('.bg-img-1', { opacity: 1, duration: 1.5 })
        tlStory.to('.bg-img-1 img', { scale: 1, duration: 5, ease: 'none' }, "<")
        tlStory.to('.block-2', { opacity: 1, y: 0, duration: 1 }, "-=4")
        tlStory.to('.block-2 .word', { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.04, duration: 1.5, ease: 'power3.out' }, "<")
        tlStory.to({}, { duration: 1 })
        tlStory.to('.block-2', { opacity: 0, y: -40, duration: 1 })
        tlStory.to('.bg-img-1', { opacity: 0, duration: 1.5 }, "<") 
        return () => {}
      })

      // Mobile: compressed 200% scroll distance
      mm.add("(max-width: 1023px)", () => {
        const tlStory = gsap.timeline({
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })
        tlStory.to('.block-1', { opacity: 1, y: 0, duration: 1 })
        tlStory.to('.block-1 .word', { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.04, duration: 1.2, ease: 'power3.out' }, "<")
        tlStory.to({}, { duration: 0.5 })
        tlStory.to('.block-1', { opacity: 0, y: -40, duration: 0.8 })
        tlStory.to('.bg-img-1', { opacity: 1, duration: 1 })
        tlStory.to('.block-2', { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        tlStory.to('.block-2 .word', { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.03, duration: 1, ease: 'power3.out' }, "<")
        tlStory.to({}, { duration: 0.5 })
        tlStory.to('.block-2', { opacity: 0, y: -40, duration: 0.8 })
        tlStory.to('.bg-img-1', { opacity: 0, duration: 1 }, "<")
        return () => {}
      })

      // ==========================================
      // SECTION 2: CORE VALUES ENTRANCE & ANIMATION
      // ==========================================

      // Set initial centering and GPU compositing flags on all card layers
      gsap.set('.card-layer', { xPercent: -50, yPercent: -50, force3D: true, transformOrigin: '50% 50%' })
      
      // Part A: Synchronized Core Values image + text entrance (unpinned scroll-in)
      const entranceTL = gsap.timeline({
        scrollTrigger: {
          trigger: cvRef.current,
          start: 'top bottom',
          end: 'top 15%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      })
      entranceTL.fromTo('.cv-bg-layer',
        { opacity: 0.35, scale: 1.04 },
        { opacity: 1, scale: 1, ease: 'power2.out' },
        0
      )
      entranceTL.fromTo('.cv-intro-container',
        { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out' },
        0
      )

      // Helper: builds the Core Values pinned timeline
      const buildCoreValuesTimeline = (tlCV, isMobile) => {
        // Calculate target dimensions matching CSS vw/vh units to prevent clamp string interpolation breakdown
        const targetW_vw = isMobile
          ? ((Math.min(Math.max(window.innerWidth * 0.38, 140), 210) / window.innerWidth) * 100).toFixed(2) + 'vw'
          : ((Math.min(Math.max(window.innerWidth * 0.30, 280), 450) / window.innerWidth) * 100).toFixed(2) + 'vw'
        const targetH_vh = isMobile
          ? ((Math.min(Math.max(window.innerHeight * 0.45, 190), 280) / window.innerHeight) * 100).toFixed(2) + 'vh'
          : ((Math.min(Math.max(window.innerHeight * 0.40, 350), 600) / window.innerHeight) * 100).toFixed(2) + 'vh'

        // Hold the fully entered scene with image and text before transitioning
        tlCV.to({}, { duration: isMobile ? 0.8 : 1.2 })
        tlCV.to('.cv-intro-wrapper', { opacity: 0, y: -40, duration: isMobile ? 1 : 1.2, ease: 'power2.inOut' })
        tlCV.to({}, { duration: 0.4 })

        // SCENE 05: Stack Cards
        // Smoothly and monotonically shrink the full-viewport image layer into its card dimensions
        tlCV.to('.cv-bg-layer', {
          width: targetW_vw,
          height: targetH_vh,
          borderRadius: '24px',
          duration: 2,
          ease: 'power3.inOut'
        }, "stack")
        tlCV.to('.cv-bg-layer .bg-overlay', { backgroundColor: 'rgba(35,31,32,0.75)', duration: 1.5 }, "stack")
        tlCV.to('.cv-text-1', { opacity: 1, duration: 0.8 }, "stack+=0.5")

        const cardConfigDesktop = [
          { x: -70, y: -20, rotation: -6 },
          { x: 80, y: 25, rotation: 8 },
          { x: 120, y: -30, rotation: 14 },
          { x: -140, y: 35, rotation: -12 },
          { x: 180, y: 15, rotation: -2 },
          { x: -200, y: -25, rotation: -16 },
          { x: 220, y: -10, rotation: 18 }
        ]
        const cardConfigMobile = [
          { x: -36, y: -12, rotation: -5 },
          { x: 40, y: 14, rotation: 6 },
          { x: 60, y: -16, rotation: 10 },
          { x: -72, y: 18, rotation: -9 },
          { x: 90, y: 8, rotation: -2 },
          { x: -100, y: -14, rotation: -12 },
          { x: 110, y: -6, rotation: 14 }
        ]
        const cardConfig = isMobile ? cardConfigMobile : cardConfigDesktop

        cardConfig.forEach((cfg, i) => {
          tlCV.fromTo(`.card-${i+2}`, 
            { opacity: 0, y: 150, x: cfg.x * 2, rotation: cfg.rotation * 2, scale: 0.8, xPercent: -50, yPercent: -50 },
            { opacity: 1, y: cfg.y, x: cfg.x, rotation: cfg.rotation, scale: 1, xPercent: -50, yPercent: -50, duration: 1, ease: 'power3.out' },
            "stack+=0.4"
          )
          tlCV.to(`.card-${i+2} .cv-text`, { opacity: 1, duration: 0.4 }, "-=0.3")
        })

        tlCV.to({}, { duration: isMobile ? 0.5 : 1 })

        // SCENE 06: Gallery arrangement — each platform gets a mobile or desktop version
        if (!isMobile) {
          // Desktop: full vw/vh spread + vertical scroll up
          const galleryPositions = [
            { x: '-25vw', y: '-40vh', w: '35vw', h: '45vh' },
            { x: '25vw', y: '-15vh', w: '25vw', h: '35vh' },
            { x: '-15vw', y: '25vh', w: '28vw', h: '40vh' },
            { x: '20vw', y: '45vh', w: '30vw', h: '45vh' },
            { x: '-25vw', y: '75vh', w: '35vw', h: '50vh' },
            { x: '15vw', y: '105vh', w: '28vw', h: '38vh' },
            { x: '-20vw', y: '140vh', w: '30vw', h: '42vh' },
            { x: '25vw', y: '170vh', w: '32vw', h: '48vh' },
          ]
          tlCV.to(cvRef.current, { backgroundColor: '#FFFFFF', duration: 2, ease: 'power2.inOut' }, "gallery")
          galleryPositions.forEach((pos, i) => {
            if (i === 0) {
              tlCV.to(`.cv-bg-layer`, { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y, width: pos.w, height: pos.h, rotation: 0, duration: 2, ease: 'power3.inOut' }, "gallery")
            } else {
              tlCV.to(`.card-${i+1}`, { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y, width: pos.w, height: pos.h, rotation: 0, duration: 2, ease: 'power3.inOut' }, "gallery")
            }
          })
          tlCV.to('.gallery-wrapper', { y: '-180vh', duration: 8, ease: 'power1.inOut' }, "gallery+=1.5")
        } else {
          // Mobile: 2-column vertical arrangement within viewport, then scroll up
          // Cards settle into a tight 2-col grid: 4 rows × 2 cols (8 cards total)
          // Card width ~42vw, height ~28vh, gaps ~3vw / 3vh
          // Col centres: left=-23vw, right=+23vw relative to viewport centre
          // Row centres start at y=-42vh and step down 31vh each
          const mobileGalleryPositions = [
            // cv-bg-layer goes top-left
            { target: '.cv-bg-layer',  x: '-23vw', y: '-42vh', w: '42vw', h: '28vh' },
            { target: '.card-2',       x:  '23vw', y: '-42vh', w: '42vw', h: '28vh' },
            { target: '.card-3',       x: '-23vw', y: '-11vh', w: '42vw', h: '28vh' },
            { target: '.card-4',       x:  '23vw', y: '-11vh', w: '42vw', h: '28vh' },
            { target: '.card-5',       x: '-23vw', y:  '20vh', w: '42vw', h: '28vh' },
            { target: '.card-6',       x:  '23vw', y:  '20vh', w: '42vw', h: '28vh' },
            { target: '.card-7',       x: '-23vw', y:  '51vh', w: '42vw', h: '28vh' },
            { target: '.card-8',       x:  '23vw', y:  '51vh', w: '42vw', h: '28vh' },
          ]
          tlCV.to(cvRef.current, { backgroundColor: '#FFFFFF', duration: 2, ease: 'power2.inOut' }, "mobile-gallery")
          mobileGalleryPositions.forEach((pos) => {
            tlCV.to(pos.target, {
              xPercent: -50, yPercent: -50,
              x: pos.x, y: pos.y,
              width: pos.w, height: pos.h,
              rotation: 0,
              borderRadius: '16px',
              duration: 2, ease: 'power3.inOut'
            }, "mobile-gallery")
          })
          // After settling into grid, scroll the whole wrapper up to reveal bottom rows
          tlCV.to('.gallery-wrapper', { y: '-55vh', duration: 5, ease: 'power1.inOut' }, "mobile-gallery+=1.5")
          // Then fade out gently before pin releases
          tlCV.to('.gallery-wrapper', { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, "mobile-gallery+=7")
        }
      }

      // Part B: Pinned animation
      mm.add("(min-width: 1024px)", () => {
        const tlCV = gsap.timeline({
          scrollTrigger: {
            trigger: cvRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })
        buildCoreValuesTimeline(tlCV, false)

        const moveImgs = gsap.utils.toArray('.card-layer img')
        let rafId = null
        const handleMouseMove = (e) => {
          if (rafId) return
          rafId = requestAnimationFrame(() => {
            rafId = null
            const x = (e.clientX / window.innerWidth - 0.5) * 15
            const y = (e.clientY / window.innerHeight - 0.5) * 15
            gsap.to(moveImgs, { x, y, duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
          })
        }
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
          if (rafId) cancelAnimationFrame(rafId)
        }
      })

      mm.add("(max-width: 1023px)", () => {
        const tlCV = gsap.timeline({
          scrollTrigger: {
            trigger: cvRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })
        buildCoreValuesTimeline(tlCV, true)
        return () => {}
      })

    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="brand-story-wrapper bg-white">
      
      {/* ========================================== */}
      {/* CHAPTERS SECTION                           */}
      {/* ========================================== */}
      <section ref={storyRef} className="relative bg-white h-screen overflow-hidden">
        <div className="bg-layer bg-img-1 absolute inset-0 z-0 opacity-0 overflow-hidden">
           <img src={bgImages[0]} className="w-full h-full object-cover scale-110 will-change-transform transform-gpu" loading="lazy" decoding="async" />
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

      {/* ========================================== */}
      {/* CORE VALUES SECTION                        */}
      {/* ========================================== */}
      <section ref={cvRef} className="relative bg-[#111] h-screen overflow-hidden">
        
        {/* Core Values Intro Text */}
        <div className="cv-intro-wrapper absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-6">
           <div className="cv-intro-container flex flex-col items-center text-center max-w-4xl">
              <div className="inline-flex items-center gap-4 mb-6 lg:mb-8">
                <div className="cv-tagline-line w-8 h-[1px] bg-[#E8B884]"></div>
                <span className="cv-tagline-text text-xs tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
                  OUR CORE VALUES
                </span>
                {/* Intentionally NO horizontal line on the right side */}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl mb-6 lg:mb-8 leading-tight font-serif drop-shadow-md font-bold">
                <span className="built-on-text text-white block"><span className="text-green-brand font-bold">Built</span> on</span>
                <span className="text-[#E8B884] block italic">Excellence</span>
              </h2>
              <p className="cv-desc text-base md:text-xl lg:text-2xl text-white/80 leading-relaxed font-light">
                The principles that shape every transformation.
              </p>
           </div>
        </div>

        {/* Core Values Gallery (Background Image + Expanding Cards) */}
        <div className="gallery-wrapper absolute inset-0 z-10 pointer-events-none transform-gpu [backface-visibility:hidden]">
          
          {/* Main Background Reveal Layer */}
          <div className="cv-bg-layer card-layer absolute top-1/2 left-1/2 w-[100vw] h-[100vh] overflow-hidden bg-black [backface-visibility:hidden] transform-gpu will-change-[width,height,transform]">
            <img src={coreValueImages[0]} className="w-full h-full object-cover opacity-100 transform-gpu" loading="eager" decoding="async" />
            <div className="absolute inset-0 bg-black/50 bg-overlay pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center cv-text-1 opacity-0 z-30 pointer-events-none px-6 text-center">
               <h3 className="text-white text-[13px] min-[375px]:text-[15px] md:text-2xl font-serif tracking-widest uppercase drop-shadow-xl font-bold">{coreValues[0]}</h3>
            </div>
          </div>

          {/* The other 7 Core Value Cards */}
          {coreValueImages.slice(1).map((src, i) => (
            <div key={i} className={`card-layer card-${i+2} absolute top-1/2 left-1/2 w-[60vw] h-[40vh] md:w-[25vw] md:h-[35vh] opacity-0 overflow-hidden rounded-2xl shadow-xl bg-[#231F20] [backface-visibility:hidden] transform-gpu will-change-[transform,opacity]`}>
              <img src={src} className="w-full h-full object-cover opacity-95 scale-105 transform-gpu" loading="eager" decoding="async" />
              <div className="absolute inset-0 bg-[#231F20]/75 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 cv-text px-6 text-center pointer-events-none">
                 <h3 className={`text-white ${["Professionalism", "Confidentiality"].includes(coreValues[i+1]) ? "text-[11px] min-[375px]:text-[13px]" : "text-[13px] min-[375px]:text-[15px]"} md:text-2xl font-serif tracking-widest uppercase drop-shadow-xl font-bold`}>{coreValues[i+1]}</h3>
              </div>
            </div>
          ))}
        </div>
        
      </section>

    </div>
  )
}
