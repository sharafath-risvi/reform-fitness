import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Dumbbell, Flame, TrendingUp, Home, Users, Baby, HeartPulse, Flower2, Music, Activity, Apple } from 'lucide-react'
import SectionTagline from '../components/ui/SectionTagline'
import ConsultationCTASection from '../components/sections/ConsultationCTASection'

const allServices = [
  {
    icon: TrendingUp,
    title: 'Body Transformation',
    subtitle: 'Complete Physical & Mental Overhaul',
    desc: 'Our flagship transformation program combines personalized exercise programming, lifestyle nutrition coaching, mental wellness support, and weekly accountability tracking. This is not a short-term fix — it\'s a permanent lifestyle overhaul.',
    includes: ['Comprehensive fitness assessment', 'Customized workout plan', 'Nutrition lifestyle coaching', 'Weekly progress tracking', 'Monthly body composition review', 'Mindset and habit coaching'],
    color: '#E8B884',
    ideal: 'Anyone seeking a complete lifestyle change',
    img: '/services_images/bodytransformation.jpeg'
  },
  {
    icon: Flame,
    title: 'Fat Loss Program',
    subtitle: 'Scientific, Sustainable Fat Reduction',
    desc: 'Evidence-based fat loss through strategic exercise programming and lifestyle nutrition adjustments. No crash diets. No starvation. Just smart science that creates a sustainable caloric deficit and metabolic improvement.',
    includes: ['Metabolic assessment', 'Cardio and resistance training mix', 'Nutrition habit coaching', 'Progress photo tracking', 'Plateau-breaking techniques', 'Long-term maintenance planning'],
    color: '#2B6F6F',
    ideal: 'People with weight management goals',
    img: '/services_images/fatloss.jpeg'
  },
  {
    icon: Dumbbell,
    title: 'Muscle Building',
    subtitle: 'Strength Through Progressive Overload',
    desc: 'Structured hypertrophy and strength programming based on progressive overload principles. Build lean muscle mass, improve functional strength, and optimize your body composition with precision training.',
    includes: ['Strength assessment', 'Progressive overload program', 'Nutrition for muscle gain', 'Recovery optimization', 'Performance benchmarks', 'Deload and periodization planning'],
    color: '#E8B884',
    ideal: 'Men and women seeking muscle development',
    img: '/services_images/musclebuilding.jpeg'
  },
  {
    icon: Home,
    title: 'Home Personal Training',
    subtitle: 'Professional Training at Your Doorstep',
    desc: 'Your certified personal trainer comes to your home at your preferred time with any required equipment. Enjoy the privacy, flexibility, and personalized attention of one-on-one training without leaving home.',
    includes: ['Trainer visits your home', 'Equipment provided if needed', 'Fully customized sessions', 'Flexible scheduling', 'Family sessions available', 'Progress tracking app'],
    color: '#2B6F6F',
    ideal: 'Busy professionals, families, senior citizens',
    img: '/services_images/homepersonaltraining.jpeg'
  },
  {
    icon: Users,
    title: "Women's Fitness",
    subtitle: 'Designed for Her Unique Physiology',
    desc: 'Dedicated women\'s programs that understand and respect female physiology, hormonal cycles, and life stages. From fat loss to PCOS management to prenatal and postnatal recovery — we\'ve got you covered.',
    includes: ['Hormonal health-informed programming', 'PCOS management protocols', 'Bone density training', 'Prenatal safe exercises', 'Postnatal recovery program', 'Strength and confidence building'],
    color: '#E8B884',
    ideal: 'Women of all ages and stages of life',
    img: '/services_images/womenfitness.jpeg'
  },
  {
    icon: HeartPulse,
    title: 'Senior Fitness',
    subtitle: 'Age Gracefully, Live Fully',
    desc: 'Specially designed programs for senior citizens that prioritize safety, fall prevention, joint health, and functional independence. Our senior trainers understand the physiological changes of aging and work with patience and expertise.',
    includes: ['Balance and coordination training', 'Joint strengthening exercises', 'Fall prevention techniques', 'Mobility and flexibility work', 'Low-impact cardio sessions', 'Functional daily movement training'],
    color: '#2B6F6F',
    ideal: 'Adults aged 55 and above',
    img: '/services_images/seniorfitness.jpeg'
  },
  {
    icon: Activity,
    title: 'Injury Rehabilitation',
    subtitle: 'From Recovery to Full Strength',
    desc: 'Our rehabilitation service bridges the gap between medical treatment and full fitness. We work alongside your doctor or physiotherapist to design progressive recovery programs that are safe, effective, and medically informed.',
    includes: ['Medical history review', 'Doctor coordination', 'Progressive recovery protocol', 'Pain point assessment', 'Return-to-function milestones', 'Long-term injury prevention'],
    color: '#E8B884',
    ideal: 'Post-surgery, chronic pain, and sports injury recovery',
    img: '/Reform_images/DSC06282.JPG'
  },
  {
    icon: Flower2,
    title: 'Yoga',
    subtitle: 'Mind, Body & Breath in Harmony',
    desc: 'Traditional and modern yoga practices taught by certified instructors. Improve flexibility, build mindfulness, reduce stress, and develop a deep connection between your body and breath through regular practice.',
    includes: ['Breathing techniques (Pranayama)', 'Flexibility and mobility yoga', 'Meditation and mindfulness', 'Stress reduction sessions', 'Beginner to advanced levels', 'Private and group sessions'],
    color: '#2B6F6F',
    ideal: 'All fitness levels, those seeking mind-body balance',
    img: '/services_images/yoga.png'
  },
  {
    icon: Music,
    title: 'Zumba',
    subtitle: 'Fitness That Feels Like a Celebration',
    desc: 'High-energy dance fitness classes that combine cardio training with the joy of movement. Burn calories, improve coordination, and build community in an exciting, upbeat environment.',
    includes: ['Professional Zumba instructors', 'Multiple music styles', 'All fitness levels welcome', 'Community group classes', 'Private sessions available', 'Calorie burn tracking'],
    color: '#E8B884',
    ideal: 'Anyone who wants cardio without the boredom',
    img: '/services_images/zumba.png'
  },
  {
    icon: Baby,
    title: 'Mobility & Flexibility',
    subtitle: 'Move Better, Feel Better, Live Better',
    desc: 'Targeted programs to improve joint mobility, correct movement patterns, and reduce chronic tightness and pain. Essential for everyone — from desk workers with posture issues to athletes seeking performance gains.',
    includes: ['Movement pattern assessment', 'Joint mobility protocols', 'Myofascial release techniques', 'Posture correction program', 'Flexibility progression plan', 'Pain reduction strategies'],
    color: '#2B6F6F',
    ideal: 'Desk workers, athletes, and chronic pain sufferers',
    img: '/services_images/mobility&flexibility.png'
  },
  {
    icon: Apple,
    title: 'Nutrition Guidance',
    subtitle: 'Fuel Your Life the Right Way',
    desc: 'Not a medical diet plan — practical lifestyle nutrition coaching that helps you understand food, build healthy eating habits, and support your fitness goals without deprivation or confusion.',
    includes: ['Food habit assessment', 'Macro and calorie education', 'Meal planning support', 'Grocery and cooking guidance', 'Sustainable habit building', 'Progress and adaptation reviews'],
    color: '#E8B884',
    ideal: 'Anyone wanting to improve their relationship with food',
    img: '/Reform_images/DSC06220.JPG'
  },
]

const differentiators = [
  {
    title: "Science-Based Programming",
    desc: "No guesswork. Every workout is rooted in exercise science and tailored to your physiology."
  },
  {
    title: "Certified Professionals",
    desc: "Work with elite trainers holding internationally recognized certifications and specialized degrees."
  },
  {
    title: "Personalised Plans",
    desc: "Your body is unique. Your program should be too. We don't do cookie-cutter templates."
  },
  {
    title: "Long-Term Results",
    desc: "We focus on sustainable habit building rather than crash diets or short-term fixes."
  },
  {
    title: "Injury Prevention",
    desc: "Proper form and mobility are prioritized to keep you healthy, active, and pain-free."
  },
  {
    title: "Weekly Progress Tracking",
    desc: "Consistent monitoring ensures you are always moving forward and hitting your milestones."
  }
];

function FrameSequence({ containerRef, blurValue }) {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  // Preload all frames sequentially
  useEffect(() => {
    const images = []
    
    // Video 1
    for (let i = 1; i <= 276; i++) {
      const img = new Image()
      const frameNum = i.toString().padStart(3, '0')
      img.src = `/videos/gym_video_frames/ezgif-frame-${frameNum}.png`
      images.push(img)
    }
    
    // Video 2
    for (let i = 1; i <= 300; i++) {
      const img = new Image()
      const frameNum = i.toString().padStart(3, '0')
      img.src = `/videos/gym_video_2/ezgif-frame-${frameNum}.png`
      images.push(img)
    }
    
    imagesRef.current = images
  }, [])

  const drawFrame = (img) => {
    const canvas = canvasRef.current
    if (!canvas || !img || !img.width) return
    
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    
    const canvasWidth = canvas.width / dpr
    const canvasHeight = canvas.height / dpr
    
    const isMobile = window.innerWidth < 1024
    const coverRatio = Math.max(canvasWidth / img.width, canvasHeight / img.height)
    const containRatio = Math.min(canvasWidth / img.width, canvasHeight / img.height)
    
    // On mobile, force strict 'contain' scaling to show the entire original frame 
    // without any cropping, leaving solid black letterboxing if needed.
    const ratio = isMobile ? containRatio : coverRatio
    
    const newWidth = img.width * ratio
    const newHeight = img.height * ratio
    const x = (canvasWidth - newWidth) / 2
    const y = (canvasHeight - newHeight) / 2
    
    // Fill background with solid black
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // Draw the image with its exact preserved aspect ratio
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, newWidth, newHeight)
  }

  const getVideoRatio = (latest) => {
    if (latest <= 0.15) return 0;
    if (latest >= 0.90) return 1;
    return (latest - 0.15) / 0.75;
  }

  // Handle canvas sizing and initial draw
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      
      const latest = scrollYProgress.get()
      const videoRatio = getVideoRatio(latest)
      const frameIndex = Math.min(575, Math.max(0, Math.floor(videoRatio * 576)))
      
      const img = imagesRef.current[frameIndex]
      
      if (img && img.complete) {
        drawFrame(img)
      } else if (img) {
        img.onload = () => drawFrame(img)
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [scrollYProgress])

  // Continuous draw loop on scroll to prevent canvas buffer dropping
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const videoRatio = getVideoRatio(latest)
    const frameIndex = Math.min(575, Math.max(0, Math.floor(videoRatio * 576)))
    
    const img = imagesRef.current[frameIndex]
    
    if (img) {
      if (img.complete) {
        drawFrame(img)
      } else {
        img.onload = () => {
          const currentLatest = scrollYProgress.get()
          const currentVideoRatio = getVideoRatio(currentLatest)
          const currentFrameIndex = Math.min(575, Math.max(0, Math.floor(currentVideoRatio * 576)))
          if (frameIndex === currentFrameIndex) {
            drawFrame(img)
          }
        }
      }
    }
  })

  const filterStyle = useTransform(blurValue, v => v > 0 ? `blur(${v}px)` : 'none')

  return (
    <motion.canvas 
      ref={canvasRef} 
      className="w-full h-full object-cover bg-black" 
      style={{ 
        width: '100%', 
        height: '100%',
        filter: filterStyle,
        WebkitFilter: filterStyle
      }}
    />
  )
}

function CinematicServiceTexts({ scrollYProgress, isMobile }) {
  // Video 1 runs from 0.15 to 0.51 (276 out of 576 frames mapped across 0.75 range)
  // 8 sequential texts mapped smoothly across this space.
  const text1Opacity = useTransform(scrollYProgress, [0.17, 0.18, 0.20, 0.21], [0, 1, 1, 0])
  const text2Opacity = useTransform(scrollYProgress, [0.21, 0.22, 0.23, 0.24], [0, 1, 1, 0])
  const text3Opacity = useTransform(scrollYProgress, [0.25, 0.26, 0.27, 0.28], [0, 1, 1, 0])
  const text4Opacity = useTransform(scrollYProgress, [0.28, 0.29, 0.31, 0.32], [0, 1, 1, 0])
  const text5Opacity = useTransform(scrollYProgress, [0.32, 0.33, 0.345, 0.355], [0, 1, 1, 0])
  const text6Opacity = useTransform(scrollYProgress, [0.36, 0.37, 0.39, 0.40], [0, 1, 1, 0])
  const text7Opacity = useTransform(scrollYProgress, [0.41, 0.42, 0.43, 0.44], [0, 1, 1, 0])
  const text8Opacity = useTransform(scrollYProgress, [0.45, 0.46, 0.47, 0.49], [0, 1, 1, 0])

  const textClass = "absolute font-sans font-light tracking-[0.25em] uppercase text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-2xl pointer-events-none whitespace-nowrap"
  
  if (isMobile) {
    // 100% pure flexbox centering. ZERO absolute transform logic.
    const wrapper = "absolute inset-0 flex items-center justify-center pointer-events-none"
    const mobileText = "font-sans font-light tracking-[0.25em] uppercase text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-2xl pointer-events-none whitespace-nowrap text-center"
    
    return (
      <div key="mobile" className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        <div className={wrapper}>
          <motion.div className={mobileText} style={{ opacity: text1Opacity }}>
            Body Transformation
          </motion.div>
        </div>
        <div className={wrapper}>
          <motion.div className={mobileText} style={{ opacity: text2Opacity }}>
            Injury Rehabilitation
          </motion.div>
        </div>
        <div className={wrapper}>
          <motion.div className={mobileText} style={{ opacity: text3Opacity }}>
            Muscle Building
          </motion.div>
        </div>
        <div className={wrapper}>
          <motion.div className={mobileText} style={{ opacity: text4Opacity }}>
            Home Personal Training
          </motion.div>
        </div>
        <div className={wrapper}>
          <motion.div className={mobileText} style={{ opacity: text5Opacity }}>
            Senior Fitness
          </motion.div>
        </div>
        <div className={wrapper}>
          <motion.div className={mobileText} style={{ opacity: text6Opacity }}>
            Yoga
          </motion.div>
        </div>
        <div className={wrapper}>
          <motion.div className={mobileText} style={{ opacity: text7Opacity }}>
            Women's Fitness
          </motion.div>
        </div>
        <div className={wrapper}>
          <motion.div className={mobileText} style={{ opacity: text8Opacity }}>
            Zumba
          </motion.div>
        </div>
      </div>
    )
  }

  // Exact original desktop code
  return (
    <div key="desktop" className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <motion.div className={textClass} style={{ opacity: text1Opacity, bottom: '20%', left: '50%', x: '-50%' }}>
        Body Transformation
      </motion.div>
      <motion.div className={textClass} style={{ opacity: text2Opacity, top: '25%', right: '15%' }}>
        Injury Rehabilitation
      </motion.div>
      <motion.div className={textClass} style={{ opacity: text3Opacity, bottom: '25%', left: '10%' }}>
        Muscle Building
      </motion.div>
      <motion.div className={textClass} style={{ opacity: text4Opacity, top: '40%', right: '10%' }}>
        Home Personal Training
      </motion.div>
      <motion.div className={textClass} style={{ opacity: text5Opacity, top: '30%', left: '15%' }}>
        Senior Fitness
      </motion.div>
      <motion.div className={textClass} style={{ opacity: text6Opacity, bottom: '15%', right: '15%' }}>
        Yoga
      </motion.div>
      <motion.div className={textClass} style={{ opacity: text7Opacity, top: '50%', left: '15%' }}>
        Women's Fitness
      </motion.div>
      <motion.div className={textClass} style={{ opacity: text8Opacity, bottom: '30%', left: '50%', x: '-50%' }}>
        Zumba
      </motion.div>
    </div>
  )
}

function PremiumHero() {
  const containerRef = useRef(null)
  
  const [isMobile, setIsMobile] = useState(false)
  const [scrollRange, setScrollRange] = useState(0)
  
  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth < 1024)
      if (containerRef.current) {
        setScrollRange(containerRef.current.offsetHeight - window.innerHeight)
      }
    }
    updateLayout()
    setTimeout(updateLayout, 150)
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const mobileY = useTransform(scrollYProgress, (v) => v * scrollRange)

  // TIMELINE PHASES (ONE CONTINUOUS SCROLL PROGRESS):
  // PHASE 1a (0.0 - 0.08): Text splits and flies outward.
  // PHASE 1b (0.08 - 0.15): Blur reduces from 15 to 0. First frame becomes sharp.
  // PHASE 2 (0.15 - 0.90): Video 1 and Video 2 play forward sequentially as one timeline.
  // ENDING TRANSITION CURRENTLY DISABLED: The hero simply holds the final sharp frame until released.

  // The blur applies to both the start and the end of the timeline
  // (Original with end blur: [0, 0.08, 0.15, 0.75, 0.85], [15, 15, 0, 0, 20])
  const blurValue = useTransform(scrollYProgress, [0, 0.08, 0.15, 1], [15, 15, 0, 0])
  
  // (Original with end overlay: [0, 0.08, 0.15, 0.75, 0.85], [0.4, 0.4, 0, 0, 0.5])
  const overlayBgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15, 1], [0.4, 0.4, 0, 0])
  
  // Initial Content (Phase 1a)
  const ourX = useTransform(scrollYProgress, [0, 0.08], ["0vw", "-100vw"])
  const servicesX = useTransform(scrollYProgress, [0, 0.08], ["0vw", "100vw"])

  // Final Content (Phase 4 & 5) - CURRENTLY DISABLED
  /*
  const contentOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.8, 0.9], [40, 0])
  const contentScale = useTransform(scrollYProgress, [0.8, 0.9], [0.95, 1])
  */

  return (
    <section ref={containerRef} className="relative w-full h-[700vh] bg-black">
      <motion.div 
        className={`${isMobile ? 'absolute top-0 left-0' : 'sticky top-0'} w-full h-[100svh] lg:h-screen overflow-hidden`}
        style={isMobile ? { y: mobileY } : {}}
      >
        
        {/* EXACT SAME Element handles video AND blur. Never unmounts. */}
        <FrameSequence containerRef={containerRef} blurValue={blurValue} />
        
        {/* Darken Overlay */}
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayBgOpacity }}
        />

        {/* Video 1 Cinematic Texts */}
        <CinematicServiceTexts scrollYProgress={scrollYProgress} isMobile={isMobile} />

        {/* INITIAL Cinematic Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
          <div className="text-center px-6 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
            <motion.h1 
              className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-extrabold drop-shadow-2xl text-[#E8B884] italic uppercase pr-4 md:pr-10"
              style={{ x: ourX }}
            >
              OUR
            </motion.h1>
            <motion.h1 
              className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-extrabold drop-shadow-2xl text-green-brand uppercase tracking-tighter"
              style={{ x: servicesX }}
            >
              SERVICES
            </motion.h1>
          </div>
        </div>

        {/* FINAL Cinematic Content Overlay (CURRENTLY DISABLED) */}
        {/*
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ opacity: contentOpacity }}
        >
          <motion.div 
            className="text-center px-6 max-w-5xl mx-auto"
            style={{ y: contentY, scale: contentScale }}
          >
            <div className="flex justify-center mb-8">
              <SectionTagline text="OUR SERVICES" />
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] font-extrabold drop-shadow-2xl">
              <span className="text-white block font-extrabold">Training <span className="text-green-brand font-extrabold">Designed</span></span>
              <span className="text-[#E8B884] block italic font-extrabold">Around You</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-lg">
              Experience the pinnacle of personal training. Tailored strategies, elite coaching, and a premium environment dedicated to your success.
            </p>

            <div className="pointer-events-auto">
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="btn-primary inline-flex group shadow-2xl">
                <span>Book a Consultation</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
        */}

      </motion.div>
    </section>
  )
}



function ServiceBlock({ service, index }) {
  const isEven = index % 2 !== 0
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  
  const imageInitialX = isEven ? -50 : 50;
  const contentInitialX = isEven ? 50 : -50;

  return (
    <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 mb-24 lg:mb-40 overflow-hidden">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center`}>
        
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: imageInitialX, y: 20 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-[75vh] relative overflow-hidden rounded-2xl lg:rounded-[2rem] shadow-2xl"
        >
          <img 
            src={service.img} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 py-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, x: contentInitialX, y: 30 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionTagline text={service.title} className="mb-6" />
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl text-[#231F20] font-serif mb-6 leading-tight font-bold">
              {service.title}
            </h3>
            
            <p className="text-base md:text-lg text-[#231F20]/90 font-light leading-relaxed mb-10 max-w-xl">
              {service.desc}
            </p>
            
            <div className="bg-[#FAFAF8] p-8 lg:p-10 rounded-2xl border border-black/5 mb-10">
              <span className="text-xs uppercase tracking-widest text-[#231F20] font-semibold block mb-6">
                What's Included
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-green-brand mt-1 flex-shrink-0" />
                    <span className="text-sm text-[#231F20]/70 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/contact#contact-section" className="btn-primary inline-flex group text-sm">
                <span>Start Program</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

function PremiumServicesShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 mb-20 md:mb-32 text-center flex flex-col items-center">
        <SectionTagline text="OUR SERVICES" className="justify-center mb-6" />
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl text-[#231F20] font-serif leading-tight font-bold mb-8"
        >
          Training <em className="text-[#E8B884] italic font-light">Designed Around You</em>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-[#231F20]/70 font-light leading-relaxed max-w-3xl"
        >
          Every program at ReForm Fitness is <span className="text-green-brand font-medium">meticulously crafted</span> based on your unique biomechanics, goals, and lifestyle. We don't believe in templates. We combine science with personalization to deliver results that last a lifetime.
        </motion.p>
      </div>

      {allServices.map((service, index) => (
        <ServiceBlock key={service.title} service={service} index={index} />
      ))}
    </section>
  )
}



function TransformationPromise() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  
  return (
    <section className="relative w-full py-40 md:py-60 flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="/Reform_images/DSC06269.JPG" 
          alt="Transformation Promise" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div ref={ref} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white font-serif leading-[1.2]"
        >
          We Don't Sell Quick Fixes. <br />
          <em className="text-[#E8B884] italic font-light">We Build Lifelong Transformation.</em>
        </motion.h2>
      </div>
    </section>
  )
}
export default function ServicesPage() {
  return (
    <div className="w-full bg-white">
      <PremiumHero />
      <PremiumServicesShowcase />
      <TransformationPromise />
      <ConsultationCTASection />
    </div>
  )
}
