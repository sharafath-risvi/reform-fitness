import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Flawless Absolute Mathematical Grid (4x3 Desktop, 2x3 Mobile)
// Centers: Desktop (w: 22vw, h: 35vh, gapX: 2vw, gapY: 3vh), Mobile (w: 44vw, h: 25vh, gapX: 4vw, gapY: 3vh)

// Row 1 (Move Left) - Duplicated for infinite marquee (shift by -96vw)
const row1Cards = [
  { id: '1a', desktop: { x: '-36vw', y: '-38vh' }, mobile: { x: '-24vw', y: '-28vh' }, img: '/Reform_images/DSC06235.JPG' }, // Dumbbells
  { id: '2a', desktop: { x: '-12vw', y: '-38vh' }, mobile: { x: '24vw', y: '-28vh' }, img: '/Reform_images/DSC06253.JPG' }, // Bench
  { id: '3a', desktop: { x: '12vw',  y: '-38vh' }, mobile: null, img: '/Reform_images/DSC06283.JPG' }, // Plates on Rack
  { id: '4a', desktop: { x: '36vw',  y: '-38vh' }, mobile: null, img: '/Reform_images/DSC06306.JPG' }, // Dark Gym
  
  // Duplicates for seamless loop
  { id: '1b', desktop: { x: '60vw', y: '-38vh' }, mobile: { x: '72vw', y: '-28vh' }, img: '/Reform_images/DSC06235.JPG' },
  { id: '2b', desktop: { x: '84vw', y: '-38vh' }, mobile: { x: '120vw', y: '-28vh' }, img: '/Reform_images/DSC06253.JPG' },
  { id: '3b', desktop: { x: '108vw',  y: '-38vh' }, mobile: null, img: '/Reform_images/DSC06283.JPG' },
  { id: '4b', desktop: { x: '132vw',  y: '-38vh' }, mobile: null, img: '/Reform_images/DSC06306.JPG' },
]

// Row 2 (Stationary)
const row2Cards = [
  { id: '5a', desktop: { x: '-36vw', y: '0vh' },   mobile: null, img: '/Reform_images/DSC06326.JPG' }, // Ropes
  // VIDEO MASK IS DYNAMICALLY ANIMATED TO: Desktop (-12vw, 0vh) | Mobile (-24vw, 0vh)
  { id: '6a', desktop: { x: '12vw',  y: '0vh' },   mobile: { x: '24vw', y: '0vh' }, video: '/videos/video2.mp4', isNextHero: true }, // Next Hero Video
  { id: '7a', desktop: { x: '36vw',  y: '0vh' },   mobile: null, img: '/Reform_images/DSC06331.JPG' }, // Erg / Rowing Machine
]

// Row 3 (Move Right) - Duplicated for infinite marquee (shift by +96vw)
const row3Cards = [
  { id: '8a', desktop: { x: '-36vw', y: '38vh' },  mobile: { x: '-24vw', y: '28vh' }, img: '/Reform_images/DSC06221.JPG' }, // Reception / Keep
  { id: '9a', desktop: { x: '-12vw', y: '38vh' },  mobile: { x: '24vw', y: '28vh' }, img: '/Reform_images/DSC06225.JPG' }, // Treadmills
  { id: '10a', desktop: { x: '12vw',  y: '38vh' }, mobile: null, img: '/Reform_images/DSC06228.JPG' }, // Gym floor
  { id: '11a', desktop: { x: '36vw',  y: '38vh' }, mobile: null, img: '/Reform_images/DSC06287.JPG' }, // Luxury Gym

  // Duplicates for seamless loop
  { id: '8b', desktop: { x: '-132vw', y: '38vh' },  mobile: { x: '-120vw', y: '28vh' }, img: '/Reform_images/DSC06221.JPG' },
  { id: '9b', desktop: { x: '-108vw', y: '38vh' },  mobile: { x: '-72vw', y: '28vh' }, img: '/Reform_images/DSC06225.JPG' },
  { id: '10b', desktop: { x: '-84vw',  y: '38vh' }, mobile: null, img: '/Reform_images/DSC06228.JPG' },
  { id: '11b', desktop: { x: '-60vw',  y: '38vh' }, mobile: null, img: '/Reform_images/DSC06287.JPG' },
]

const galleryCards = [...row1Cards, ...row2Cards, ...row3Cards]

export default function HeroSection() {
  const containerRef = useRef(null)
  const bgVideoRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Initial States
      gsap.set('.hero-content-2', { opacity: 0, y: 30, filter: 'blur(10px)' })
      
      galleryCards.forEach(card => {
        const x = window.innerWidth < 1024 ? (card.mobile ? card.mobile.x : 0) : card.desktop.x
        const y = window.innerWidth < 1024 ? (card.mobile ? card.mobile.y : 0) : card.desktop.y
        // Start them slightly lower and smaller
        gsap.set(`.gallery-card-${card.id}`, { x, y: `calc(${y} + 8vh)`, opacity: 0, scale: 0.9, filter: 'blur(10px)' })
      })

      // Infinite Living Gallery Marquees
      // We run these continuously; they only become visible when opacity scrubs up.
      gsap.to('.row-1-marquee', { x: '-96vw', duration: 40, ease: 'none', repeat: -1 })
      gsap.to('.row-3-marquee', { x: '96vw', duration: 40, ease: 'none', repeat: -1 })

      // Master Cinematic Timeline
      const scrollTl = gsap.timeline()

      // STAGE 01-03: Video immediately active
      // Cinematic Zoom on Video 1 while active (Scale 1 to 1.05)
      scrollTl.to(bgVideoRef.current, { scale: 1.05, ease: 'none', duration: 7 }, 0)


      // STAGE 04: Content Fades Out, Video Shrinks, Grid Appears
      scrollTl.to('.hero-content-1', {
        opacity: 0,
        y: -30,
        filter: 'blur(10px)',
        ease: 'power2.inOut',
        duration: 1,
        stagger: 0.1,
      }, 7)
      
      scrollTl.to(overlayRef.current, { opacity: 0, duration: 1 }, 7)
      scrollTl.to('.gradient-overlay-1', { opacity: 0, duration: 1 }, 7)

      scrollTl.to('.video-mask', {
        width: () => window.innerWidth < 1024 ? '44vw' : '22vw',
        height: () => window.innerWidth < 1024 ? '25vh' : '35vh',
        borderRadius: '2rem',
        x: () => window.innerWidth < 1024 ? '-24vw' : '-12vw',
        y: '0vh', // Grid R2, C2
        ease: 'power3.inOut',
        duration: 2.5,
      }, 7)

      // Reset cinematic zoom so it fits the card naturally
      scrollTl.to(bgVideoRef.current, { scale: 1, ease: 'power3.inOut', duration: 2.5 }, 7)

      // Grid Cards animate in (staggered slightly randomly for editorial feel)
      galleryCards.forEach((card, index) => {
        if (window.innerWidth < 1024 && !card.mobile) return; // Skip hidden on mobile
        const x = window.innerWidth < 1024 ? card.mobile.x : card.desktop.x
        const y = window.innerWidth < 1024 ? card.mobile.y : card.desktop.y
        
        scrollTl.to(`.gallery-card-${card.id}`, {
          opacity: 1,
          y: y,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power3.out',
          duration: 2,
        }, 7 + (index * 0.05)) // Luxurious staggered delay
      })

      // STAGE 05: Pause to admire the gallery
      scrollTl.to('.video-mask', { y: '0vh', duration: 1.5 }, 9.5)


      // STAGE 06: Next Image Expands, Others Fade
      scrollTl.to('.row-1-marquee', { opacity: 0.15, filter: 'blur(5px)', duration: 1.5 }, 11)
      scrollTl.to('.row-3-marquee', { opacity: 0.15, filter: 'blur(5px)', duration: 1.5 }, 11)
      row2Cards.forEach(card => {
        if (!card.isNextHero) {
          scrollTl.to(`.gallery-card-${card.id}`, { opacity: 0.15, filter: 'blur(5px)', duration: 1.5 }, 11)
        }
      })
      scrollTl.to('.video-mask', { opacity: 0.15, filter: 'blur(5px)', duration: 1.5 }, 11)

      scrollTl.to('.next-hero-card', {
        width: '100vw',
        height: '100vh',
        x: '0vw',
        y: '0vh',
        borderRadius: '0px',
        zIndex: 40,
        ease: 'power3.inOut',
        duration: 2.5,
      }, 11)


      // STAGE 07: Hero Content 02 Fades In
      scrollTl.to('.next-hero-overlay', { opacity: 0.5, ease: 'none', duration: 1.5 }, 13.5)
      scrollTl.to('.next-hero-gradient', { opacity: 0.8, ease: 'none', duration: 1.5 }, 13.5)

      scrollTl.to('.hero-content-2', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.2,
        ease: 'power2.out',
        duration: 1.5,
      }, 13.5)

      // STAGE 08: Final hold before pin releases
      scrollTl.to('.hero-content-2', {
        y: 0,
        duration: 2.5,
      }, 15)

      const mmHero = gsap.matchMedia()
      mmHero.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          animation: scrollTl,
          invalidateOnRefresh: true,
        })
        return () => {}
      })
      mmHero.add("(max-width: 1023px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          animation: scrollTl,
          invalidateOnRefresh: true,
        })
        return () => {}
      })

      // Parallax on the final image after pin releases (desktop only)
      if (window.innerWidth >= 1024) {
        const sectionHeight = window.innerHeight * 3.0 // 200% + 100vh
        gsap.to('.next-hero-card video, .next-hero-card img', {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${sectionHeight}px top`,
            end: `${sectionHeight + window.innerHeight}px top`,
            scrub: 1,
          }
        })
      }

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const renderCard = (card) => (
    <div 
      key={`card-${card.id}`}
      className={`gallery-card gallery-card-${card.id} ${card.isNextHero ? 'next-hero-card' : ''} ${!card.mobile ? 'hidden lg:flex' : 'flex'} absolute w-[44vw] h-[25vh] lg:w-[22vw] lg:h-[35vh] rounded-[2rem] overflow-hidden opacity-0 shadow-[0_30px_80px_rgba(0,0,0,0.4)] will-change-[width,height,border-radius,transform,opacity,filter]`}
    >
      {card.video ? (
        <video 
          src={card.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] object-cover max-w-none grayscale-[20%]"
        />
      ) : (
        <img src={card.img} alt="Premium Gym" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] object-cover max-w-none grayscale-[20%]" decoding="async" loading="lazy" />
      )}
      {card.isNextHero && (
        <>
          <div className="next-hero-overlay absolute inset-0 bg-[#0a0a0a] opacity-0" />
          <div className="next-hero-gradient absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0" />
        </>
      )}
    </div>
  )

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#231F20]"
    >




      {/* Cinematic Background Grid Layers */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        
        {/* Row 1 Marquee (Moves Left) */}
        <div className="row-1-marquee absolute inset-0 pointer-events-none will-change-transform flex items-center justify-center">
          {row1Cards.map(renderCard)}
        </div>

        {/* Row 2 Static (Holds storytelling focus) */}
        <div className="row-2-static absolute inset-0 pointer-events-none flex items-center justify-center">
          {row2Cards.map(renderCard)}
        </div>

        {/* Row 3 Marquee (Moves Right) */}
        <div className="row-3-marquee absolute inset-0 pointer-events-none will-change-transform flex items-center justify-center">
          {row3Cards.map(renderCard)}
        </div>

        {/* The 1 Dynamic Video Mask (Moves to Grid R2, C2) */}
        <div className="video-mask w-[100vw] h-[100vh] rounded-[0px] overflow-hidden absolute shadow-2xl will-change-[width,height,border-radius,transform,opacity] z-20">
          <video
            ref={bgVideoRef}
            src="/videos/video1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            fetchpriority="high"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] object-cover max-w-none"
          />
          {/* Overlays for Hero Content 1 */}
          <div ref={overlayRef} className="absolute inset-0 bg-[#0a0a0a] opacity-60" />
          <div className="gradient-overlay-1 absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
        </div>
      </div>

      {/* Hero Content 01 (Directly Visible) */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 lg:px-10 pt-20 pointer-events-none">
        <div className="max-w-4xl flex flex-col items-center pointer-events-auto">
          
          <div className="hero-content-1 mb-8 flex flex-col items-center">
            <span className="text-[0.65rem] text-[#E8B884] tracking-[0.4em] uppercase font-semibold mb-4 drop-shadow-md">ReForm Fitness</span>
          </div>

          <h1
            className="font-serif hero-content-1 text-display text-white mb-8 leading-[1.1] drop-shadow-lg font-extrabold"
          >
            The Art of
            <br />
            <em className="text-white/80 italic font-extrabold"><span className="text-[#E8B884] font-extrabold">Transformation</span>.</em>
          </h1>

          <p className="hero-content-1 text-base lg:text-lg text-white leading-relaxed max-w-2xl mb-12 font-light drop-shadow-xl">
            A premium personal training and wellness experience. We don't just change your body—we rebuild your entire foundation through science, rehabilitation, and lifestyle mastery.
          </p>


        </div>
      </div>

      {/* Hero Content 02 (Reveals at Stage 7) */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-6 lg:px-10 pt-20 pointer-events-none">
        <div className="max-w-4xl flex flex-col items-center pointer-events-auto">
          
          <div className="hero-content-2 mb-8 flex flex-col items-center opacity-0 translate-y-8 blur-[10px]">
            <span className="text-[0.65rem] text-[#E8B884] tracking-[0.4em] uppercase font-semibold mb-4 drop-shadow-md">The ReForm Standard</span>
          </div>

          <h2
            className="hero-content-2 text-5xl lg:text-[5rem] text-white mb-8 leading-[1.1] opacity-0 translate-y-8 blur-[10px] drop-shadow-lg font-extrabold"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Elevating the Benchmark
            <br />
            of <em className="text-[#E8B884] italic font-extrabold">Personal Excellence.</em>
          </h2>

          <p className="hero-content-2 text-base lg:text-lg text-white leading-relaxed max-w-2xl mb-12 font-light opacity-0 translate-y-8 blur-[10px] drop-shadow-xl">
            We believe that true luxury is feeling absolutely limitless in your own body. Our methodology bridges the gap between high-performance athletics and premium lifestyle wellness.
          </p>

          <div className="hero-content-2 flex flex-col sm:flex-row gap-6 items-center opacity-0 translate-y-8 blur-[10px]">
            <Link to="/about" className="btn-primary">
              <span>Explore Our Philosophy</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

    </section>
  )
}
