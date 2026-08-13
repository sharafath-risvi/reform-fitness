import { useEffect, useRef } from 'react'
import { Play, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTagline from '../ui/SectionTagline'

const dummyReels = [
  { 
    id: 1, 
    title: 'Personal Training', 
    category: 'Coaching',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop', 
    url: 'https://www.instagram.com/reformfitness/' 
  },
  { 
    id: 2, 
    title: 'Strength Training', 
    category: 'Form Check',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop', 
    url: 'https://www.instagram.com/reformfitness/' 
  },
  { 
    id: 3, 
    title: 'Science-Based Training', 
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop', 
    url: 'https://www.instagram.com/reformfitness/' 
  },
  { 
    id: 4, 
    title: 'Transformation Journey', 
    category: 'Results',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop', 
    url: 'https://www.instagram.com/reformfitness/' 
  },
  { 
    id: 5, 
    title: 'Long-Term Results', 
    category: 'Mindset',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop', 
    url: 'https://www.instagram.com/reformfitness/' 
  },
]

// Stagger array for editorial layout look
const yOffsets = ['lg:translate-y-0', 'lg:translate-y-12', 'lg:translate-y-4', 'lg:translate-y-16', 'lg:translate-y-8']

export default function InstagramReelsSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const carouselRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Reveal
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Cards Reveal
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="px-6 lg:px-24 w-full max-w-[1800px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-16 lg:mb-24">
          <div ref={headerRef} className="max-w-3xl">
            <div className="opacity-0 mb-6">
              <SectionTagline text="INSTAGRAM REELS" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl leading-[1.05] font-serif font-bold text-[#231F20] opacity-0">
              See The Work.<br />
              <em className="text-[#2B6F6F] italic">Feel The Difference.</em>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 xl:pb-2">
            {/* CTA Button */}
            <a 
              href="https://www.instagram.com/reformfitness/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2B6F6F] text-white rounded-full text-sm tracking-wider uppercase font-semibold hover:bg-[#E8B884] hover:text-[#231F20] transition-colors duration-300 group shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Follow ReForm
            </a>

            {/* Navigation Arrows (Desktop) */}
            <div className="hidden md:flex items-center gap-3 ml-4">
              <button 
                onClick={scrollLeft}
                className="w-14 h-14 rounded-full border border-[#EDE9E4] flex items-center justify-center text-[#231F20] hover:border-[#E8B884] hover:text-[#2B6F6F] hover:bg-[#FAF9F7] transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
              <button 
                onClick={scrollRight}
                className="w-14 h-14 rounded-full border border-[#EDE9E4] flex items-center justify-center text-[#231F20] hover:border-[#E8B884] hover:text-[#2B6F6F] hover:bg-[#FAF9F7] transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Carousel Container */}
      <div className="relative w-full">
        {/* We add extra padding-bottom to account for the staggered layout on desktop */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 lg:gap-8 px-6 lg:px-24 pb-12 lg:pb-32 w-full max-w-[1800px] mx-auto hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dummyReels.map((reel, i) => (
            <a 
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={el => cardsRef.current[i] = el}
              className={`group relative flex-none w-[280px] sm:w-[320px] lg:w-[360px] aspect-[9/16] rounded-[2rem] overflow-hidden snap-center cursor-pointer bg-gray-100 opacity-0 shadow-lg hover:shadow-2xl transition-all duration-700 will-change-transform ${yOffsets[i % yOffsets.length]}`}
            >
              {/* Image */}
              <img 
                src={reel.image} 
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Gradient Overlay (Darker at bottom for text readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

              {/* Top Icons */}
              <div className="absolute top-6 right-6 flex items-center gap-2 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 group-hover:bg-[#2B6F6F] group-hover:border-[#2B6F6F] transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                
                {/* Category Pill */}
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[0.65rem] tracking-[0.2em] uppercase font-semibold rounded-full mb-4 w-max group-hover:bg-[#E8B884] group-hover:border-[#E8B884] group-hover:text-[#111] transition-all duration-500">
                  {reel.category}
                </div>
                
                <h3 className="font-serif text-white text-2xl lg:text-3xl font-bold leading-[1.1] mb-4">
                  {reel.title}
                </h3>
                
                {/* Play Indicator / Divider Line */}
                <div className="flex items-center gap-4 text-white/70 group-hover:text-[#E8B884] transition-colors duration-500">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current">
                    <Play size={12} fill="currentColor" className="ml-0.5" />
                  </div>
                  <div className="h-[1px] flex-grow bg-white/20 group-hover:bg-[#E8B884]/40 transition-colors duration-500" />
                </div>

              </div>
            </a>
          ))}
          
          {/* Spacer for right padding on mobile */}
          <div className="flex-none w-4 lg:w-12" aria-hidden="true" />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-8 px-6">
        <button 
          onClick={scrollLeft}
          className="w-12 h-12 rounded-full border border-[#EDE9E4] flex items-center justify-center text-[#231F20] hover:border-[#E8B884] hover:text-[#2B6F6F] transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button 
          onClick={scrollRight}
          className="w-12 h-12 rounded-full border border-[#EDE9E4] flex items-center justify-center text-[#231F20] hover:border-[#E8B884] hover:text-[#2B6F6F] transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

    </section>
  )
}
