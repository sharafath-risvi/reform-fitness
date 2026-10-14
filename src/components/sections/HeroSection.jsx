import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Four authentic ReForm Fitness cinematic training videos from homeherovideos
const heroVideos = [
  { id: 'v1', src: '/homeherovideos/video1.mp4' },
  { id: 'v2', src: '/homeherovideos/video2.mp4' },
  { id: 'v3', src: '/homeherovideos/video3.mp4' },
  { id: 'v4', src: '/homeherovideos/video4.mp4' },
]

export default function HeroSection() {
  const containerRef = useRef(null)
  const initialContentRef = useRef(null)
  const secondaryContentRef = useRef(null)

  // Blurred background layers
  const bgBlur1Ref = useRef(null)
  const bgBlur2Ref = useRef(null)
  const bgVid1Ref = useRef(null)
  const bgVid2Ref = useRef(null)

  // Centered video card (Panel 2 in Stage 4 & 5)
  const centerCardRef = useRef(null)
  const centerCardVideo1WrapperRef = useRef(null)
  const centerCardVideo2WrapperRef = useRef(null)
  const centerVid1Ref = useRef(null)
  const centerVid2Ref = useRef(null)

  // Side panels for four-video row: Panel 1 (left), Panel 3, Panel 4 (right)
  const panel1Ref = useRef(null)
  const panelVid1Ref = useRef(null)
  const panel3Ref = useRef(null)
  const panelVid3Ref = useRef(null)
  const panel4Ref = useRef(null)
  const panelVid4Ref = useRef(null)

  useEffect(() => {
    // Autoplay all videos reliably without audio
    const allVideos = [
      centerVid1Ref.current,
      centerVid2Ref.current,
      bgVid1Ref.current,
      bgVid2Ref.current,
      panelVid1Ref.current,
      panelVid3Ref.current,
      panelVid4Ref.current,
    ].filter(Boolean)

    allVideos.forEach((video) => {
      video.muted = true
      video.defaultMuted = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully if browser policy delays playback
        })
      }
    })

    // Recalibrate ScrollTrigger once primary hero video data is ready,
    // but only if the user hasn't scrolled yet — refresh() temporarily
    // resets scroll to 0 to recalculate pin spacers, causing a jump mid-scroll.
    const safeRefresh = () => {
      if (window.scrollY === 0) {
        ScrollTrigger.refresh()
      }
    }
    if (centerVid1Ref.current) {
      if (centerVid1Ref.current.readyState >= 2) {
        safeRefresh()
      } else {
        centerVid1Ref.current.addEventListener('loadeddata', safeRefresh, { once: true })
      }
    }

    // Keep blurred backgrounds synchronized with their corresponding foreground videos
    const syncInterval = setInterval(() => {
      if (centerVid1Ref.current && bgVid1Ref.current) {
        if (Math.abs(centerVid1Ref.current.currentTime - bgVid1Ref.current.currentTime) > 0.15) {
          bgVid1Ref.current.currentTime = centerVid1Ref.current.currentTime
        }
      }
      if (centerVid2Ref.current && bgVid2Ref.current) {
        if (Math.abs(centerVid2Ref.current.currentTime - bgVid2Ref.current.currentTime) > 0.15) {
          bgVid2Ref.current.currentTime = centerVid2Ref.current.currentTime
        }
      }
    }, 500)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Desktop & Tablet (>= 768px):
      // Stage 1: Fullscreen Video 1 with initial content
      // Stage 2: Video 1 contracts to centered 9:16 card + matching blurred Video 1 background
      // Stage 3: Simultaneous diagonal movement in 3D:
      //          Video 2 moves center -> bottom-left ↙ while rotating away
      //          Video 3 enters bottom-right -> center ↖ while rotating toward viewer
      // Stage 4: Centered video physically glides to Panel 2 while Panels 1, 3, 4 enter into a continuous 4-video row
      // Stage 5: Short heading reveals centered directly OVER the four videos
      mm.add('(min-width: 768px)', () => {
        // Initial setup for Desktop
        gsap.set(centerCardRef.current, {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          left: '50%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          opacity: 1,
          zIndex: 12,
          boxShadow: '0 0px 0px rgba(0,0,0,0)',
          transformPerspective: 1400,
          transformStyle: 'preserve-3d',
        })
        gsap.set(centerCardVideo1WrapperRef.current, {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          xPercent: 0,
          yPercent: 0,
          z: 0,
          scale: 1,
          borderRadius: '0px',
          boxShadow: '0 0px 0px rgba(0,0,0,0)',
          transformPerspective: 1400,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
        })
        gsap.set(centerCardVideo2WrapperRef.current, {
          opacity: 0,
          rotateX: -18,
          rotateY: 42,
          rotateZ: 8,
          xPercent: 75,
          yPercent: 55,
          z: -200,
          scale: 0.86,
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          transformPerspective: 1400,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
        })
        gsap.set(bgBlur1Ref.current, { opacity: 0, zIndex: 1 })
        gsap.set(bgBlur2Ref.current, { opacity: 0, zIndex: 2 })

        // Initial setup for Panels 1, 3, 4
        gsap.set(panel1Ref.current, {
          autoAlpha: 0,
          xPercent: -40,
          scale: 0.96,
          rotateY: 6,
          transformPerspective: 1200,
          transformOrigin: 'right center',
          zIndex: 10,
        })
        gsap.set(panel3Ref.current, {
          autoAlpha: 0,
          xPercent: 40,
          scale: 0.96,
          rotateY: -6,
          transformPerspective: 1200,
          transformOrigin: 'left center',
          zIndex: 10,
        })
        gsap.set(panel4Ref.current, {
          autoAlpha: 0,
          xPercent: 70,
          scale: 0.96,
          rotateY: -8,
          transformPerspective: 1200,
          transformOrigin: 'left center',
          zIndex: 10,
        })

        gsap.set(initialContentRef.current, { autoAlpha: 1, y: 0, zIndex: 20 })
        gsap.set(secondaryContentRef.current, { autoAlpha: 0, y: 35, zIndex: 25 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // STAGE 1 -> STAGE 2:
        // 1. Initial content fades out smoothly
        tl.to(
          initialContentRef.current,
          {
            autoAlpha: 0,
            y: -30,
            duration: 0.25,
            ease: 'power2.out',
          },
          0
        )

        // 2. Large video contracts into centered 9:16 card (37.125vh x 66vh, preserving native 9:16 aspect ratio)
        tl.to(
          centerCardRef.current,
          {
            width: '37.125vh',
            height: '66vh',
            borderRadius: '20px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            duration: 0.45,
            ease: 'power2.inOut',
          },
          0.05
        )
        tl.to(
          centerCardVideo1WrapperRef.current,
          {
            borderRadius: '20px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            duration: 0.45,
            ease: 'power2.inOut',
          },
          0.05
        )

        // 3. Blurred background of Video 1 emerges simultaneously
        tl.to(
          bgBlur1Ref.current,
          {
            opacity: 1,
            duration: 0.40,
            ease: 'power2.out',
          },
          0.08
        )

        // HOLD STAGE 2: Visitor experiences centered Video 1 over blurred Video 1
        tl.addLabel('stage2_hold')
        tl.to({}, { duration: 0.25 })

        // =========================================================
        // STAGE 2 -> STAGE 3: SIMULTANEOUS DIAGONAL MOVEMENT IN 3D
        // Video 2: Center -> Bottom-Left (negative X, positive Y) ↙
        // Video 3: Bottom-Right -> Center (positive X/Y -> 0, 0) ↖
        // =========================================================
        tl.addLabel('stage3_transition')
        tl.to(
          centerCardVideo1WrapperRef.current,
          {
            rotateY: -42,
            rotateX: 18,
            rotateZ: -8,
            xPercent: -75,
            yPercent: 55,
            z: -180,
            scale: 0.88,
            opacity: 0,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          'stage3_transition'
        )
        tl.to(
          centerCardVideo2WrapperRef.current,
          {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            xPercent: 0,
            yPercent: 0,
            z: 0,
            scale: 1,
            opacity: 1,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          'stage3_transition'
        )
        tl.to(
          bgBlur1Ref.current,
          {
            opacity: 0,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          'stage3_transition'
        )
        tl.to(
          bgBlur2Ref.current,
          {
            opacity: 1,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          'stage3_transition'
        )

        // HOLD STAGE 3: Visitor clearly sees sharp centered Video 3 over matching blurred Video 3
        tl.addLabel('stage3_hold')
        tl.to({}, { duration: 0.30 })

        // STAGE 3 -> STAGE 4:
        // Center video visibly travels into Panel 2 position (left: 37.5vw, width: 25vw, height: 100vh)
        // while Panels 1, 3, and 4 enter smoothly, and the blurred background naturally fades away.
        tl.addLabel('stage4_transition')
        tl.to(
          centerCardRef.current,
          {
            left: '37.5vw',
            width: '25vw',
            height: '100vh',
            borderRadius: '0px',
            boxShadow: '0 0px 0px rgba(0,0,0,0)',
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'stage4_transition'
        )
        tl.to(
          centerCardVideo2WrapperRef.current,
          {
            borderRadius: '0px',
            boxShadow: '0 0px 0px rgba(0,0,0,0)',
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'stage4_transition'
        )
        tl.to(
          bgBlur2Ref.current,
          {
            opacity: 0,
            duration: 0.55,
            ease: 'power2.inOut',
          },
          'stage4_transition'
        )
        tl.to(
          panel1Ref.current,
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'stage4_transition'
        )
        tl.to(
          panel3Ref.current,
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'stage4_transition'
        )
        tl.to(
          panel4Ref.current,
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'stage4_transition'
        )

        // HOLD STAGE 4: Four equal video panels cleanly established in one row
        tl.addLabel('stage4_hold')
        tl.to({}, { duration: 0.25 })

        // STAGE 4 -> STAGE 5:
        // Short heading reveals centered directly OVER the four videos
        tl.addLabel('stage5_transition')
        tl.to(
          secondaryContentRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          'stage5_transition'
        )

        // HOLD STAGE 5: Heading readable over the four panels before unpinning
        tl.addLabel('stage5_hold')
        tl.to({}, { duration: 0.35 })

        return () => {}
      })

      // Mobile (< 768px):
      mm.add('(max-width: 767px)', () => {
        gsap.set(centerCardRef.current, {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          left: '50%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          opacity: 1,
          zIndex: 12,
          boxShadow: '0 0px 0px rgba(0,0,0,0)',
          transformPerspective: 1400,
          transformStyle: 'preserve-3d',
        })
        gsap.set(centerCardVideo1WrapperRef.current, {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          xPercent: 0,
          yPercent: 0,
          z: 0,
          scale: 1,
          borderRadius: '0px',
          boxShadow: '0 0px 0px rgba(0,0,0,0)',
          transformPerspective: 1400,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
        })
        gsap.set(centerCardVideo2WrapperRef.current, {
          opacity: 0,
          rotateX: -16,
          rotateY: 38,
          rotateZ: 6,
          xPercent: 65,
          yPercent: 48,
          z: -180,
          scale: 0.86,
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          transformPerspective: 1400,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
        })
        gsap.set(bgBlur1Ref.current, { opacity: 0, zIndex: 1 })
        gsap.set(bgBlur2Ref.current, { opacity: 0, zIndex: 2 })

        // Initial setup for Panels 1, 3, 4
        gsap.set(panel1Ref.current, {
          autoAlpha: 0,
          xPercent: -40,
          scale: 0.96,
          rotateY: 6,
          transformPerspective: 1200,
          transformOrigin: 'right center',
          zIndex: 10,
        })
        gsap.set(panel3Ref.current, {
          autoAlpha: 0,
          xPercent: 40,
          scale: 0.96,
          rotateY: -6,
          transformPerspective: 1200,
          transformOrigin: 'left center',
          zIndex: 10,
        })
        gsap.set(panel4Ref.current, {
          autoAlpha: 0,
          xPercent: 70,
          scale: 0.96,
          rotateY: -8,
          transformPerspective: 1200,
          transformOrigin: 'left center',
          zIndex: 10,
        })

        gsap.set(initialContentRef.current, { autoAlpha: 1, y: 0, zIndex: 20 })
        gsap.set(secondaryContentRef.current, { autoAlpha: 0, y: 25, zIndex: 25 })

        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=280%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Stage 1 -> 2:
        tlMobile.to(
          initialContentRef.current,
          {
            autoAlpha: 0,
            y: -25,
            duration: 0.25,
            ease: 'power2.out',
          },
          0
        )

        tlMobile.to(
          centerCardRef.current,
          {
            width: '31.5vh',
            height: '56vh',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            duration: 0.45,
            ease: 'power2.inOut',
          },
          0.05
        )
        tlMobile.to(
          centerCardVideo1WrapperRef.current,
          {
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            duration: 0.45,
            ease: 'power2.inOut',
          },
          0.05
        )

        tlMobile.to(
          bgBlur1Ref.current,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          0.08
        )

        tlMobile.addLabel('m_stage2_hold')
        tlMobile.to({}, { duration: 0.25 })

        // =========================================================
        // Stage 2 -> 3: SIMULTANEOUS DIAGONAL MOVEMENT (Mobile)
        // =========================================================
        tlMobile.addLabel('m_stage3_transition')
        tlMobile.to(
          centerCardVideo1WrapperRef.current,
          {
            rotateY: -38,
            rotateX: 16,
            rotateZ: -6,
            xPercent: -65,
            yPercent: 48,
            z: -150,
            scale: 0.88,
            opacity: 0,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          'm_stage3_transition'
        )
        tlMobile.to(
          centerCardVideo2WrapperRef.current,
          {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            xPercent: 0,
            yPercent: 0,
            z: 0,
            scale: 1,
            opacity: 1,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          'm_stage3_transition'
        )
        tlMobile.to(
          bgBlur1Ref.current,
          {
            opacity: 0,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          'm_stage3_transition'
        )
        tlMobile.to(
          bgBlur2Ref.current,
          {
            opacity: 1,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          'm_stage3_transition'
        )

        tlMobile.addLabel('m_stage3_hold')
        tlMobile.to({}, { duration: 0.30 })

        // Stage 3 -> 4:
        tlMobile.addLabel('m_stage4_transition')
        tlMobile.to(
          centerCardRef.current,
          {
            left: '37.5vw',
            width: '25vw',
            height: '100vh',
            borderRadius: '0px',
            boxShadow: '0 0px 0px rgba(0,0,0,0)',
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'm_stage4_transition'
        )
        tlMobile.to(
          centerCardVideo2WrapperRef.current,
          {
            borderRadius: '0px',
            boxShadow: '0 0px 0px rgba(0,0,0,0)',
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'm_stage4_transition'
        )
        tlMobile.to(
          bgBlur2Ref.current,
          {
            opacity: 0,
            duration: 0.55,
            ease: 'power2.inOut',
          },
          'm_stage4_transition'
        )
        tlMobile.to(
          panel1Ref.current,
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'm_stage4_transition'
        )
        tlMobile.to(
          panel3Ref.current,
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'm_stage4_transition'
        )
        tlMobile.to(
          panel4Ref.current,
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          'm_stage4_transition'
        )

        tlMobile.addLabel('m_stage4_hold')
        tlMobile.to({}, { duration: 0.20 })

        // Stage 4 -> 5:
        tlMobile.addLabel('m_stage5_transition')
        tlMobile.to(
          secondaryContentRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          'm_stage5_transition'
        )

        tlMobile.addLabel('m_stage5_hold')
        tlMobile.to({}, { duration: 0.30 })

        return () => {}
      })
    }, containerRef)

    return () => {
      clearInterval(syncInterval)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[640px] sm:min-h-[720px] w-full flex items-center justify-center overflow-hidden bg-[#111]"
    >
      {/* ========================================================= */}
      {/* 1. BLURRED FULL-SCREEN BACKGROUNDS (STAGES 2 & 3)         */}
      {/* ========================================================= */}
      {/* Background 1: Blurred Video 1 */}
      <div
        ref={bgBlur1Ref}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-0 will-change-[opacity] z-[1]"
      >
        <video
          ref={bgVid1Ref}
          src={heroVideos[0].src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover filter blur-[20px] scale-110 pointer-events-none"
        />
      </div>

      {/* Background 2: Blurred Video 2 */}
      <div
        ref={bgBlur2Ref}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-0 will-change-[opacity] z-[2]"
      >
        <video
          ref={bgVid2Ref}
          src={heroVideos[1].src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover filter blur-[20px] scale-110 pointer-events-none"
        />
      </div>

      {/* ========================================================= */}
      {/* 2. THE FOUR VIDEO PANELS                                   */}
      {/* Panel 1, Center Card (Panel 2), Panel 3, Panel 4           */}
      {/* ========================================================= */}

      {/* Panel 1 (Video 1) - Left column (0vw to 25vw) */}
      <div
        ref={panel1Ref}
        className="absolute top-0 bottom-0 overflow-hidden pointer-events-none z-[10] will-change-[transform,opacity]"
        style={{ left: '0vw', width: '25vw', height: '100%' }}
      >
        <video
          ref={panelVid1Ref}
          src={heroVideos[0].src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />
      </div>

      {/* Panel 2: CENTERED VIDEO CARD (Stages 1, 2, 3) -> Becomes Column 2 (25vw to 50vw) in Stage 4 */}
      <div
        ref={centerCardRef}
        className="absolute pointer-events-none z-[12] will-change-[width,height,border-radius,box-shadow,left,top,transform]"
        style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
      >
        {/* Video 1 Wrapper (Sharp Video 1: Active during Stage 1 & 2, moves center -> bottom-left in Stage 3) */}
        <div
          ref={centerCardVideo1WrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-[transform,opacity]"
          style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
        >
          <video
            ref={centerVid1Ref}
            src={heroVideos[0].src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        </div>

        {/* Video 2 Wrapper (Sharp Video 2: Enters bottom-right -> center in Stage 3, becomes Panel 2 in Stage 4) */}
        <div
          ref={centerCardVideo2WrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-[transform,opacity]"
          style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
        >
          <video
            ref={centerVid2Ref}
            src={heroVideos[1].src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        </div>
      </div>

      {/* Panel 3 (Video 3) - Column 3 (50vw to 75vw) */}
      <div
        ref={panel3Ref}
        className="absolute top-0 bottom-0 overflow-hidden pointer-events-none z-[10] will-change-[transform,opacity]"
        style={{ left: '50vw', width: '25vw', height: '100%' }}
      >
        <video
          ref={panelVid3Ref}
          src={heroVideos[2].src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />
      </div>

      {/* Panel 4 (Video 4) - Right column (75vw to 100vw) */}
      <div
        ref={panel4Ref}
        className="absolute top-0 bottom-0 overflow-hidden pointer-events-none z-[10] will-change-[transform,opacity]"
        style={{ left: '75vw', width: '25vw', height: '100%' }}
      >
        <video
          ref={panelVid4Ref}
          src={heroVideos[3].src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />
      </div>

      {/* ========================================================= */}
      {/* 3. STAGE 1: INITIAL HERO CONTENT (OVER FULLSCREEN VIDEO 1) */}
      {/* ========================================================= */}
      <div
        ref={initialContentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8 max-w-4xl mx-auto pointer-events-none will-change-[opacity,transform] z-20"
      >
        <div
          className="flex flex-col items-center p-6 sm:p-8 rounded-3xl pointer-events-auto"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 60%, transparent 80%)',
          }}
        >
          {/* Brand Tagline */}
          <div className="mb-3 sm:mb-5 flex flex-col items-center">
            <span className="text-[0.65rem] sm:text-xs text-[#E8B884] tracking-[0.4em] uppercase font-semibold drop-shadow-md">
              ReForm Fitness
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.6rem] text-white mb-4 sm:mb-6 leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] font-extrabold max-w-3xl">
            The Art of
            <br />
            <em className="text-white/95 italic font-extrabold">
              <span className="text-[#E8B884] font-extrabold">Transformation</span>.
            </em>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            A premium personal training and wellness experience. We don't just change your body—we rebuild your entire foundation through science, rehabilitation, and lifestyle mastery.
          </p>

          {/* Call-to-Action Button */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
            <Link to="/about" className="btn-primary group">
              <span>Explore Our Philosophy</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. STAGE 5: SHORT HEADING OVER THE FOUR VIDEOS            */}
      {/* ========================================================= */}
      <div
        ref={secondaryContentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none will-change-[opacity,transform] z-25"
      >
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
          {/* Brand Tagline */}
          <span className="text-[0.65rem] sm:text-xs text-[#E8B884] tracking-[0.4em] uppercase font-semibold mb-3 sm:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            The ReForm Standard
          </span>

          {/* Short Main Headline - Exactly Two Lines */}
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.2rem] text-white leading-[1.12] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] font-extrabold w-full max-w-5xl">
            <span className="block">Elevating the Benchmark</span>
            <span className="block mt-1 sm:mt-2">
              of <em className="text-[#E8B884] italic font-extrabold">Personal Excellence.</em>
            </span>
          </h2>
        </div>
      </div>
    </section>
  )
}
