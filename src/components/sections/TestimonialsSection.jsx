import { useState, useRef, useEffect, useCallback } from 'react'
import { Star, Quote, Play, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'

// All 14 authentic client reviews provided by user
const writtenTestimonials = [
  {
    id: 1,
    name: 'Francesca Gianoli',
    initials: 'FG',
    text: "Highly recommended! They are professional, motivating, and genuinely committed to helping you achieve your goals. They know how to push you beyond your comfort zone while adapting the training to your individual needs and abilities. Every session is challenging, enjoyable, and purposeful. If you're looking for someone who will support you, keep you accountable, and help you become stronger and more confident, you're in great hands!",
  },
  {
    id: 2,
    name: 'Sreenidhi',
    initials: 'SN',
    text: "I've been training with Reform Fitness for about 3 months and the results are fascinating! The trainer is very well equipped, very knowledgeable and extremely motivating! I'm receiving many compliments on the way I look, all thanks to them :)",
  },
  {
    id: 3,
    name: 'Anita Banghard',
    initials: 'AB',
    text: "Absolutely fantastic team! Great variety of exercise solutions provided, with a real focus on working towards improving health, focus, stability and fitness. Highly recommended!",
  },
  {
    id: 4,
    name: 'Amit Soni',
    initials: 'AS',
    text: "Akash is a very good trainer. He really understands how to get the best out of his clients. If you are serious about your fitness goals then he's the guy to help you achieve them.",
  },
  {
    id: 5,
    name: 'Tanishka Bhise',
    initials: 'TB',
    text: "I have had a great experience in my fitness journey with Reform Fitness. I started not long ago, but have already seen great results in my fitness and overall energy. The trainers are professional, supportive and knowledgeable.",
  },
  {
    id: 6,
    name: 'Nicci Probert',
    initials: 'NP',
    text: "Excellent personal training service. I've been training with them for 7 months now. The team is professional and knowledgeable. The workouts are well-structured, challenging and focused on my fitness goals.",
  },
  {
    id: 7,
    name: 'Blanche Dabreo',
    initials: 'BD',
    text: "Me and my friend have been training with Nisha. She is really good with her Zumba sessions, keeps us energised and makes exercise fun. All the best to the wonderful team.",
  },
  {
    id: 8,
    name: 'Gunjan Garg',
    initials: 'GG',
    text: "Akash is a great trainer. It's been an year I am working out with him. His involvement is 100 percent.",
  },
  {
    id: 9,
    name: 'Shabrina Sharmin',
    initials: 'SS',
    text: "Nishaji is a good trainer, hardworking and very helpful. She is good at training me.",
  },
  {
    id: 10,
    name: 'Camilla',
    initials: 'CA',
    text: "I trained very well with Akash since 2024 and I saw the results! Very nice and professional.",
  },
  {
    id: 11,
    name: 'Mohammed Chowdhury',
    initials: 'MC',
    text: "Nisha is a great yoga trainer.",
  },
  {
    id: 12,
    name: 'Jay',
    initials: 'JA',
    text: "Best transformation training ✌️",
  },
  {
    id: 13,
    name: 'naturalcurlbyfida',
    initials: 'NF',
    text: "Amazing team.",
  },
  {
    id: 14,
    name: 'AKSHAY VIJAY.P',
    initials: 'AV',
    text: "My experience with Reform Fitness Specialist has been excellent. They gave me the motivation and push I needed to get serious about my fitness journey. What I particularly appreciate is their approach: rather than simply providing random ...",
  },
]

// Video testimonials:
// - vid-2 and vid-3 are portrait (9:16) — shown first and second
// - vid-1 (IMG_3221_comp.mp4) is genuinely landscape (1280×720, 16:9) — shown third in landscape card
const videoTestimonials = [
  {
    id: 'vid-2',
    src: '/videotestimonal/IMG_4287_comp.mp4',
    isLandscape: false,
  },
  {
    id: 'vid-3',
    src: '/videotestimonal/IMG_9076.MP4',
    isLandscape: false,
  },
  {
    id: 'vid-1',
    src: '/videotestimonal/IMG_3221_comp.mp4',
    isLandscape: true,
  },
]

// Tripled list for infinite seamless marquee loop
const infiniteReviews = [
  ...writtenTestimonials,
  ...writtenTestimonials,
  ...writtenTestimonials,
]

export default function TestimonialsSection() {
  const marqueeRef = useRef(null)
  const videoScrollRef = useRef(null)
  const videoRefs = useRef({})
  const [activeVideoId, setActiveVideoId] = useState(null)
  const isHoveredRef = useRef(false)
  const isUserScrollingRef = useRef(false)
  const resumeTimerRef = useRef(null)
  const touchStartXRef = useRef(0)
  const touchStartYRef = useRef(0)
  const userScrollStartTimeRef = useRef(null)

  // -------------------------------------------------------------
  // ROW 1: Continuous Smooth Horizontal Marquee Animation
  // Works reliably across desktop and mobile touch devices
  // -------------------------------------------------------------
  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return

    // Initialize scroll position in the middle set for seamless bidirectional scrolling
    const initScroll = () => {
      if (el.scrollWidth > el.clientWidth && el.scrollLeft === 0) {
        el.scrollLeft = el.scrollWidth / 3
      }
    }

    // Run after layout paint & resize
    const timer = setTimeout(initScroll, 60)
    window.addEventListener('resize', initScroll)

    let animationFrameId
    let lastTime = performance.now()
    const speed = 0.55 // pixels per 16ms frame for an elegant, readable pace

    const step = (currentTime) => {
      const delta = (currentTime - lastTime) / 16.667
      lastTime = currentTime

      if (el) {
        // Guarantee initial offset if not yet set
        if (el.scrollLeft === 0 && el.scrollWidth > el.clientWidth) {
          el.scrollLeft = el.scrollWidth / 3
        }

        // Safety watchdog: ensure mobile touch never gets stuck paused permanently
        if (isUserScrollingRef.current) {
          if (!userScrollStartTimeRef.current) {
            userScrollStartTimeRef.current = currentTime
          } else if (currentTime - userScrollStartTimeRef.current > 2000) {
            isUserScrollingRef.current = false
            userScrollStartTimeRef.current = null
          }
        } else {
          userScrollStartTimeRef.current = null
        }

        // Auto-scroll when not actively hovered (desktop) or dragged (mobile)
        if (!isHoveredRef.current && !isUserScrollingRef.current) {
          el.scrollLeft += speed * Math.min(delta, 2.5)

          const oneSetWidth = el.scrollWidth / 3
          if (oneSetWidth > 0) {
            if (el.scrollLeft >= oneSetWidth * 2) {
              el.scrollLeft -= oneSetWidth
            } else if (el.scrollLeft <= 0) {
              el.scrollLeft += oneSetWidth
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', initScroll)
      cancelAnimationFrame(animationFrameId)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  // Touch handlers that distinguish vertical page scrolling from deliberate horizontal swipe
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return
    const dx = Math.abs(e.touches[0].clientX - touchStartXRef.current)
    const dy = Math.abs(e.touches[0].clientY - touchStartYRef.current)
    // Only pause the marquee when the user explicitly swipes horizontally on the cards
    if (dx > 10 && dx > dy) {
      isUserScrollingRef.current = true
      userScrollStartTimeRef.current = performance.now()
    }
  }

  const handleTouchEndOrCancel = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isUserScrollingRef.current = false
      userScrollStartTimeRef.current = null
    }, 1000)
  }

  // Manual arrow navigation for Written Testimonials
  const handleScrollReviews = (direction) => {
    const el = marqueeRef.current
    if (!el) return
    isUserScrollingRef.current = true
    userScrollStartTimeRef.current = performance.now()
    const scrollAmount = direction === 'left' ? -340 : 340
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isUserScrollingRef.current = false
      userScrollStartTimeRef.current = null
    }, 1200)
  }

  // Manual arrow navigation for Video Testimonials
  const handleScrollVideos = (direction) => {
    const el = videoScrollRef.current
    if (!el) return
    const scrollAmount = direction === 'left' ? -340 : 340
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // -------------------------------------------------------------
  // ROW 2: Video Playback Handler (Play one, pause all others)
  // Strictly inline inside card, no zoom/modal
  // -------------------------------------------------------------
  const handlePlayVideo = useCallback((id) => {
    Object.entries(videoRefs.current).forEach(([vId, videoEl]) => {
      if (videoEl) {
        if (vId === id) {
          videoEl.play().catch(() => {})
        } else {
          videoEl.pause()
        }
      }
    })
    setActiveVideoId(id)
  }, [])

  const handleVideoEnded = (id) => {
    if (activeVideoId === id) {
      setActiveVideoId(null)
    }
  }

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-white text-[#231F20] overflow-hidden border-t border-[#EDE9E4] select-none">
      {/* Luxury Ambient Glows (Light theme compatible) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#E8B884] opacity-[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[400px] bg-[#2B6F6F] opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />

      {/* ========================================================= */}
      {/* 1. SECTION INTRODUCTION (TOP)                             */}
      {/* ========================================================= */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16 lg:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#E8B884]" />
              <span className="text-[0.65rem] sm:text-xs text-[#E8B884] tracking-[0.3em] uppercase font-semibold">
                CLIENT EXPERIENCES
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#231F20] font-bold tracking-tight mb-4 leading-[1.08]">
              Real Stories.{' '}
              <em className="text-[#E8B884] italic">Real Results.</em>
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-[#231F20]/75 font-light leading-relaxed">
              Discover what our clients say about their experiences, progress and transformations with ReForm Fitness.
            </p>
          </div>

          {/* Row 1 Navigation Controls (Desktop) */}
          <div className="hidden sm:flex items-center gap-3 self-end">
            <button
              onClick={() => handleScrollReviews('left')}
              className="w-12 h-12 rounded-full border border-[#EDE9E4] bg-[#FAF9F7] hover:bg-[#E8B884] hover:text-[#231F20] hover:border-[#E8B884] flex items-center justify-center text-[#231F20] transition-all duration-300 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScrollReviews('right')}
              className="w-12 h-12 rounded-full border border-[#EDE9E4] bg-[#FAF9F7] hover:bg-[#E8B884] hover:text-[#231F20] hover:border-[#E8B884] flex items-center justify-center text-[#231F20] transition-all duration-300 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              aria-label="Next reviews"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. ROW 1: WRITTEN TESTIMONIALS CAROUSEL                   */}
      {/* ========================================================= */}
      <div className="relative w-full mb-20 sm:mb-28 lg:mb-32">
        <div
          ref={marqueeRef}
          onMouseEnter={() => {
            isHoveredRef.current = true
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEndOrCancel}
          onTouchCancel={handleTouchEndOrCancel}
          className="flex overflow-x-auto no-scrollbar px-4 sm:px-10 lg:px-16 py-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {infiniteReviews.map((review, idx) => (
            <article
              key={`${review.id}-${idx}`}
              className="w-[260px] min-[380px]:w-[295px] sm:w-[340px] lg:w-[375px] flex-shrink-0 mr-3 sm:mr-5 bg-white border border-[#EDE9E4] hover:border-[#E8B884] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(232,184,132,0.15)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top: 5 Gold Stars & Decorative Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        size={15}
                        fill="#E8B884"
                        className="text-[#E8B884]"
                      />
                    ))}
                  </div>
                  <Quote
                    size={22}
                    className="text-[#2B6F6F]/30 rotate-180 group-hover:text-[#2B6F6F] transition-colors duration-300"
                  />
                </div>

                {/* Review Text - Slightly increased font size with comfortable line spacing */}
                <p className="text-[#231F20]/85 text-[0.92rem] sm:text-[0.98rem] lg:text-[1.02rem] leading-[1.7] font-normal font-sans mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Bottom: Reviewer Identity */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#EDE9E4]">
                <div className="w-10 h-10 rounded-full bg-[#E8B884]/20 border border-[#E8B884]/50 flex items-center justify-center text-[#231F20] font-bold text-xs tracking-wider shrink-0">
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <span className="text-sm sm:text-[0.95rem] font-bold text-[#231F20] tracking-wide block truncate">
                    {review.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.66rem] sm:text-[0.7rem] tracking-wider uppercase text-[#2B6F6F] font-semibold mt-0.5">
                    <CheckCircle2 size={12} className="text-[#2B6F6F]" /> Verified Client
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Navigation Arrows (under carousel) */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-4">
          <button
            onClick={() => handleScrollReviews('left')}
            className="w-11 h-11 rounded-full border border-[#EDE9E4] bg-[#FAF9F7] active:bg-[#E8B884] active:text-[#231F20] flex items-center justify-center text-[#231F20] transition-all duration-200 shadow-sm"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => handleScrollReviews('right')}
            className="w-11 h-11 rounded-full border border-[#EDE9E4] bg-[#FAF9F7] active:bg-[#E8B884] active:text-[#231F20] flex items-center justify-center text-[#231F20] transition-all duration-200 shadow-sm"
            aria-label="Next reviews"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. ROW 2: VIDEO TESTIMONIALS (CINEMATIC STORIES)          */}
      {/* ========================================================= */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Row 2 Subheader */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-6 h-[1px] bg-[#E8B884]" />
              <span className="text-[0.65rem] sm:text-xs text-[#E8B884] tracking-[0.3em] uppercase font-semibold">
                VIDEO TESTIMONIALS
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#231F20] font-bold tracking-tight mb-2 leading-tight">
              Hear It From <em className="text-[#E8B884] italic">Our Clients</em>
            </h3>

            <p className="text-sm sm:text-base text-[#231F20]/75 font-light">
              Real people. Real experiences. Their words tell the story.
            </p>
          </div>

          {/* Row 2 Navigation Controls (Desktop) */}
          <div className="hidden sm:flex items-center gap-3 self-end">
            <button
              onClick={() => handleScrollVideos('left')}
              className="w-12 h-12 rounded-full border border-[#EDE9E4] bg-[#FAF9F7] hover:bg-[#E8B884] hover:text-[#231F20] hover:border-[#E8B884] flex items-center justify-center text-[#231F20] transition-all duration-300 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              aria-label="Previous video"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScrollVideos('right')}
              className="w-12 h-12 rounded-full border border-[#EDE9E4] bg-[#FAF9F7] hover:bg-[#E8B884] hover:text-[#231F20] hover:border-[#E8B884] flex items-center justify-center text-[#231F20] transition-all duration-300 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              aria-label="Next video"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Video Cards Grid / Carousel */}
        <div
          ref={videoScrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 px-4 sm:px-2 sm:-mx-2 lg:justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videoTestimonials.map((video) => {
            const isPlaying = activeVideoId === video.id
            return (
              <div
                key={video.id}
                className="w-[84vw] min-[380px]:w-[86vw] max-w-[360px] sm:w-[340px] lg:w-[360px] flex-shrink-0 mr-4 sm:mr-7 last:mr-0 aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden relative bg-[#0D0D0D] border border-[#EDE9E4] hover:border-[#E8B884] shadow-[0_12px_35px_rgba(0,0,0,0.08)] group transition-all duration-300"
              >
                {/* HTML5 Video Element — plays strictly inside card, no zoom/lightbox */}
                <video
                  ref={(el) => {
                    videoRefs.current[video.id] = el
                  }}
                  src={`${video.src}#t=0.001`}
                  playsInline
                  webkit-playsinline="true"
                  preload="metadata"
                  controls={isPlaying}
                  onEnded={() => handleVideoEnded(video.id)}
                  className="w-full h-full bg-black object-contain [&:fullscreen]:object-contain [&:-webkit-full-screen]:object-contain"
                  style={{ objectFit: 'contain' }}
                />

                {/* Overlay – Play button only, no text overlays */}
                {!isPlaying && (
                  <div
                    onClick={() => handlePlayVideo(video.id)}
                    className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 cursor-pointer"
                  >
                    {/* Centre Play Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayVideo(video.id)
                      }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8B884] text-[#231F20] flex items-center justify-center shadow-[0_0_35px_rgba(232,184,132,0.5)] group-hover:scale-110 group-hover:bg-white transition-all duration-300 focus:outline-none cursor-pointer"
                      aria-label="Play testimonial video"
                    >
                      <Play size={26} className="fill-current ml-1" />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile Navigation Arrows (under video carousel) */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-4">
          <button
            onClick={() => handleScrollVideos('left')}
            className="w-11 h-11 rounded-full border border-[#EDE9E4] bg-[#FAF9F7] active:bg-[#E8B884] active:text-[#231F20] flex items-center justify-center text-[#231F20] transition-all duration-200 shadow-sm"
            aria-label="Previous video"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => handleScrollVideos('right')}
            className="w-11 h-11 rounded-full border border-[#EDE9E4] bg-[#FAF9F7] active:bg-[#E8B884] active:text-[#231F20] flex items-center justify-center text-[#231F20] transition-all duration-200 shadow-sm"
            aria-label="Next video"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
