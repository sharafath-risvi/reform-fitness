import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const testimonials = [
  { name: 'Kavya R.', program: 'Body Transformation', rating: 5, text: 'ReForm Fitness changed my entire relationship with health. It\'s not about weight — it\'s about how you feel, how you move, and how you live. I\'ve never felt better in my life.', location: 'Bangalore' },
  { name: 'Suresh M.', program: 'Rehabilitation', rating: 5, text: 'After my knee surgery, I was terrified of exercise. My trainer at ReForm understood every limitation and built me back stronger than before. Truly outstanding expertise.', location: 'Chennai' },
  { name: 'Anita K.', program: "Women's Fitness", rating: 5, text: 'Dealing with PCOS is not easy, but my trainer understood my hormonal needs. Within 3 months my symptoms improved dramatically. I\'m stronger than I\'ve ever been.', location: 'Hyderabad' },
  { name: 'Rajan P.', program: 'Senior Fitness', rating: 5, text: 'At 68, I thought my best years were behind me. ReForm proved me wrong. I walk 5 km daily, my joint pain is gone, and I feel 20 years younger.', location: 'Mumbai' },
  { name: 'Meera S.', program: 'Home Personal Training', rating: 5, text: 'As a working mother, going to a gym was impossible. Having my trainer come home was life-changing. Professional, flexible, and incredibly effective.', location: 'Pune' },
  { name: 'Vikram T.', program: 'Muscle Building', rating: 5, text: 'Not just a trainer — a coach, a mentor, and a motivator. The scientific approach to progressive training gave me results I\'d been chasing for years.', location: 'Delhi' },
]

const marqueeItems = [...testimonials, ...testimonials, ...testimonials] // Triple for seamless looping

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-[350px] lg:w-[450px] bg-white border border-[#EDE9E4] p-8 mx-4 hover:border-[#E8B884]/40 hover:shadow-2xl transition-all duration-500 group cursor-default">
      <Quote size={24} className="text-green-brand/40 mb-6 group-hover:scale-110 transition-transform origin-left" />
      <p className="text-[1.1rem] text-[#231F20]/90 leading-relaxed mb-8 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        "{t.text}"
      </p>
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} fill="#E8B884" className="text-[#E8B884]" />
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[#EDE9E4] pt-4">
        <div>
          <div className="text-sm font-semibold text-[#231F20]">{t.name}</div>
          <div className="text-[0.65rem] tracking-wider uppercase text-[#231F20]/40 mt-1">{t.program}</div>
        </div>
        <div className="text-[0.65rem] tracking-widest uppercase text-[#2B6F6F] font-semibold">{t.location}</div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Reveal
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      )

      // Marquee setup helper
      const setupMarquee = (row, direction) => {
        // Calculate the total width of one set of items
        // We have 3 sets. We only need to animate from 0 to -1/3 (or -1/3 to 0) to loop perfectly.
        const timeline = gsap.timeline({ repeat: -1, paused: false })
        
        if (direction === 'left') {
          gsap.set(row, { xPercent: 0 })
          timeline.to(row, {
            xPercent: -33.333,
            duration: 40,
            ease: 'none',
          })
        } else {
          gsap.set(row, { xPercent: -33.333 })
          timeline.to(row, {
            xPercent: 0,
            duration: 40,
            ease: 'none',
          })
        }
        
        return timeline
      }

      const tl1 = setupMarquee(row1Ref.current, 'left')
      const tl2 = setupMarquee(row2Ref.current, 'right')

      // Scroll Velocity hook
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // self.getVelocity() gets pixels per second
          const velocity = self.getVelocity()
          // Scale velocity to a timeScale multiplier. Clamp it between -5 and 5.
          let timeScale = 1 + Math.abs(velocity / 400)
          timeScale = Math.min(Math.max(timeScale, 1), 4) // max 4x speed
          
          gsap.to([tl1, tl2], {
            timeScale: timeScale,
            duration: 0.5, // smoothly ramp up speed
            overwrite: true,
          })
          
          // Return to normal speed when scroll stops
          clearTimeout(window.scrollTimeout)
          window.scrollTimeout = setTimeout(() => {
            gsap.to([tl1, tl2], {
              timeScale: 1,
              duration: 1,
              overwrite: true,
            })
          }, 150)
        }
      })

    }, sectionRef)

    return () => {
      clearTimeout(window.scrollTimeout)
      ctx.revert()
    }
  }, [])

  return (
    <section className="section-padding-sm bg-[#F8F6F4] overflow-hidden" ref={sectionRef}>
      <div className="container-custom mb-16" ref={headerRef}>
        <div className="text-center">
          <span className="text-label text-[#2B6F6F] block mb-3 opacity-0">
            Client Stories
          </span>
          <h2 className="font-serif text-headline text-[#231F20] opacity-0 font-bold">
            What Our Clients Say
          </h2>
        </div>
      </div>

      {/* Infinite Marquee Row 1 */}
      <div className="w-[300vw] sm:w-[200vw] lg:w-[150vw] mb-8">
        <div ref={row1Ref} className="flex will-change-transform">
          {marqueeItems.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Infinite Marquee Row 2 (Reverse) */}
      <div className="w-[300vw] sm:w-[200vw] lg:w-[150vw]">
        <div ref={row2Ref} className="flex will-change-transform">
          {[...marqueeItems].reverse().map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
