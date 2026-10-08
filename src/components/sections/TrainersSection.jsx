import { useEffect, useRef } from 'react'
import { Award } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const trainers = [
  {
    id: 1,
    name: 'Arjun Menon',
    title: 'Head Trainer & Rehabilitation Specialist',
    specializations: ['Rehabilitation', 'Strength Training', 'Sports Injury Recovery'],
    experience: '8 Years',
    image: '/Reform_images/DSC06248.JPG',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    title: "Women's Fitness & Yoga Expert",
    specializations: ["Women's Health", 'Pre/Postnatal Fitness', 'Yoga', 'PCOS'],
    experience: '6 Years',
    image: '/Reform_images/DSC06240.JPG',
  },
  {
    id: 3,
    name: 'Rahul Nair',
    title: 'Senior Fitness & Mobility Coach',
    specializations: ['Senior Fitness', 'Mobility', 'Fall Prevention', 'Functional Training'],
    experience: '5 Years',
    image: '/Reform_images/DSC06244.JPG',
  },
  {
    id: 4,
    name: 'Divya Krishnan',
    title: 'Fat Loss & Nutrition Coach',
    specializations: ['Fat Loss', 'Body Transformation', 'Nutrition Coaching', 'Zumba'],
    experience: '5 Years',
    image: '/Reform_images/DSC06237.JPG',
  },
]

export default function TrainersSection() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal Scroll Trigger
      const getScrollAmount = () => trackRef.current.scrollWidth - window.innerWidth

      gsap.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })

      // Image Parallax within the card
      const images = gsap.utils.toArray('.trainer-img')
      images.forEach((img) => {
        gsap.to(img, {
          xPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
          }
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="h-screen bg-[#231F20] flex flex-col justify-center overflow-hidden" ref={containerRef}>
      
      {/* Static Header within pinned container */}
      <div className="container-custom absolute top-24 left-0 w-full z-10 pointer-events-none">
        <span className="text-[0.6rem] tracking-widest uppercase text-[#E8B884] font-semibold mb-2 block">
          Our Team
        </span>
        <h2 className="font-serif text-4xl lg:text-5xl text-white font-bold">
          Expert <em className="text-[#E8B884]">Guidance.</em>
        </h2>
      </div>

      {/* Horizontal Scrolling Track */}
      <div 
        ref={trackRef} 
        className="flex gap-6 lg:gap-12 px-6 lg:px-24 pt-48 pb-24 h-full items-center will-change-transform"
      >
        {trainers.map((trainer) => (
          <div 
            key={trainer.id} 
            className="relative flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] aspect-[3/4] overflow-hidden group rounded-sm"
          >
            {/* Image Layer with Parallax */}
            <div className="absolute inset-0 w-[120%] -left-[10%]">
              <img 
                src={trainer.image} 
                alt={trainer.name} 
                className="trainer-img w-full h-full object-cover will-change-transform grayscale group-hover:grayscale-0 transition-all duration-700 transform-gpu"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-70" />
            
            {/* Content Layer */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={14} className="text-[#E8B884] group-hover:text-green-brand transition-colors duration-500" />
                  <span className="text-white/80 text-[0.6rem] tracking-widest uppercase font-semibold">
                    {trainer.experience}
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl text-white mb-2 font-bold">
                  {trainer.name}
                </h3>
                
                <p className="text-[#E8B884] text-xs uppercase tracking-widest mb-6 font-semibold">
                  {trainer.title}
                </p>

                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {trainer.specializations.map(spec => (
                    <span key={spec} className="text-[0.55rem] tracking-widest uppercase text-white px-3 py-1.5 border border-white/20 hover:border-green-brand/50 hover:bg-green-brand/20 transition-colors duration-300 backdrop-blur-sm cursor-default">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
