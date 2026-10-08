import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'intro',
    isIntro: true,
  },
  {
    id: 'personal-training',
    title: 'Personal Training',
    desc: '1-on-1 coaching with customized programming based on your unique biomechanics, lifestyle, and goals.',
    image: '/ourexpertise/personaltraining.jpeg',
  },
  {
    id: 'home-training',
    title: 'Home Training',
    desc: 'Premium personal training brought to your living room. We bring the expertise, you bring the commitment.',
    image: '/ourexpertise/hometraining.jpeg',
  },
  {
    id: 'transformation',
    title: 'Body Transformation',
    desc: 'A complete overhaul of training, nutrition, and lifestyle habits to achieve your dream physique safely.',
    image: '/ourexpertise/bodytransformation.jpeg',
  },
]

export default function ServicesSection() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.service-panel')
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerWidth * panels.length}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      // Horizontal Storytelling Scroll
      const trackTween = tl.to(trackRef.current, {
        xPercent: -100 * ((panels.length - 1) / panels.length),
        ease: 'none',
      })

      // Micro-Interactions
      panels.forEach((panel, i) => {
        // Image Parallax (Only applies to service cards)
        const img = panel.querySelector('.service-img')
        if (img) {
          gsap.fromTo(img, 
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: trackTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              }
            }
          )
        }

        // Text Content Reveal
        const textContent = panel.querySelector('.content-reveal')
        if (textContent) {
          if (i === 0) {
            // Intro Panel reveals as the section scrolls into view vertically
            gsap.fromTo(textContent.children,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power2.out',
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: 'top 60%',
                }
              }
            )
          } else {
            // Service Panels reveal as they horizontally enter the viewport
            gsap.fromTo(textContent.children,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: trackTween,
                  start: 'left 75%',
                  toggleActions: 'play none none reverse'
                }
              }
            )
          }
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="h-screen bg-[#231F20] flex flex-col justify-center overflow-hidden relative">
      
      {/* Horizontal Scrolling Track */}
      <div 
        ref={trackRef} 
        className="flex h-full will-change-transform items-center absolute inset-0 z-20"
        style={{ width: `${services.length * 100}vw` }}
      >
        {services.map((service, index) => (
          <div key={service.id} className={`service-panel w-screen h-full flex items-center justify-center relative shrink-0 ${service.isIntro ? 'bg-[#231F20]' : ''}`}>
            
            {/* Fullscreen Parallax Background (Only for services) */}
            {!service.isIntro && (
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={service.image} 
                  className="service-img w-[120%] h-full object-cover grayscale opacity-30 -ml-[10%] transform-gpu" 
                  alt={service.title} 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
              </div>
            )}

            {service.isIntro ? (
              /* CARD 01: Introduction Screen */
              <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center content-reveal">
                <div className="inline-flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[2px] bg-[#E8B884]" />
                  </div>
                  <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#E8B884] font-semibold">
                    OUR EXPERTISE
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-7xl text-white mb-8 leading-tight font-serif drop-shadow-xl font-bold">
                  Services <span className="text-[#E8B884] italic">& Specialties</span>
                </h2>
                <p className="text-white/90 text-base lg:text-xl font-light leading-relaxed drop-shadow-md">
                  ReForm Fitness provides personalized, <span className="text-green-brand font-medium">science-based</span> fitness programs designed around each client's unique goals.
                </p>
              </div>
            ) : (
              /* CARDS 02-04: Services Glassmorphism Cards */
              <div className="relative z-10 glass-dark p-5 sm:p-8 lg:p-20 border border-white/10 hover:border-green-brand/50 rounded-sm w-[90vw] max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between content-reveal transform hover:scale-[1.01] transition-all duration-700">
                 {/* Left Content */}
                 <div className="flex-1 w-full text-left z-20">
                    <div className="inline-flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-[2px] bg-[#E8B884]" />
                      </div>
                      <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#E8B884] font-semibold">
                        OUR EXPERTISE
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-4xl lg:text-6xl text-white mb-6 leading-tight drop-shadow-xl font-bold">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-base lg:text-xl font-light leading-relaxed max-w-md mb-8 sm:mb-10">
                      {service.desc}
                    </p>
                    <Link to="/services" className="group/btn inline-flex items-center gap-4 text-white text-xs tracking-[0.2em] uppercase font-semibold pointer-events-auto">
                      <span className="group-hover/btn:text-green-brand transition-colors duration-300">Explore Program</span>
                      <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:border-green-brand group-hover/btn:text-green-brand transition-all duration-500">
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                 </div>

                 {/* Right Huge Number */}
                 <div className="hidden md:flex justify-end pr-4 lg:pr-8 z-10 opacity-50">
                    <span className="text-[8rem] lg:text-[14rem] text-[#E8B884]/20 font-bold tracking-tighter leading-none block select-none pointer-events-none">
                      0{index}
                    </span>
                 </div>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </section>
  )
}

