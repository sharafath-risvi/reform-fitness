import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Activity } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const conditions = [
  { title: 'Post Surgery', icon: '🏥', desc: 'Guided recovery protocols aligned with surgical rehabilitation timelines.' },
  { title: 'Back Pain', icon: '🔙', desc: 'Targeted core strengthening and posture correction for chronic back issues.' },
  { title: 'Shoulder Pain', icon: '💪', desc: 'Rotator cuff rehabilitation and shoulder mobility restoration programs.' },
  { title: 'Knee Pain', icon: '🦵', desc: 'Joint-friendly strengthening to reduce pain and restore function.' },
  { title: 'Sports Injury', icon: '⚽', desc: 'Return-to-play protocols for athletes recovering from injury.' },
  { title: 'Post-Injury Recovery', icon: '✅', desc: 'Comprehensive recovery plans bridging medical treatment and full fitness.' },
]

export default function RehabSection() {
  const containerRef = useRef(null)
  const leftColRef = useRef(null)
  const gridRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Left Content Reveal
      gsap.fromTo(leftColRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
          }
        }
      )

      // Right Grid Stagger
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      )

      // Bottom Stats Reveal
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 95%',
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section-padding bg-[#231F20] text-white relative overflow-hidden" ref={containerRef}>
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#E8B884] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#2B6F6F] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div ref={leftColRef}>
            <div className="flex items-center gap-3 mb-6 opacity-0">
              <Activity size={18} className="text-[#E8B884]" />
              <span className="text-label text-[#E8B884]">Rehabilitation</span>
            </div>
            <h2
              className="font-serif text-headline text-white mb-6 opacity-0 font-bold"
            >
              Recover.
              <br />
              <em className="text-[#E8B884]">Rebuild.</em>
              <br />
              Thrive.
            </h2>
            <p className="text-base text-white/55 leading-relaxed mb-6 opacity-0">
              One of ReForm Fitness's strongest services — we work <strong className="text-white/80">directly alongside doctors and physiotherapists</strong> to design rehabilitation programs that are medically safe, progressive, and effective.
            </p>
            <p className="text-base text-white/55 leading-relaxed mb-8 opacity-0">
              Whether you're recovering from surgery or managing chronic pain, our trainers are equipped to guide your journey from first movement to full strength.
            </p>
            <div className="opacity-0">
              <Link to="/services" className="btn-primary magnetic group inline-flex">
                <span>Explore Rehabilitation</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Condition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" ref={gridRef}>
            {conditions.map((cond) => (
              <div
                key={cond.title}
                className="glass-dark p-6 hover:border-[#E8B884]/30 transition-all duration-300 group opacity-0 magnetic"
              >
                <div className="text-2xl mb-3">{cond.icon}</div>
                <h3 className="font-serif text-base text-white mb-2 group-hover:text-[#E8B884] transition-colors font-bold">
                  {cond.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">{cond.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat banner */}
        <div
          ref={statsRef}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-12"
        >
          {[
            { num: '200+', label: 'Rehabilitation Clients' },
            { num: '6+', label: 'Conditions We Address' },
            { num: '95%', label: 'Recovery Success Rate' },
          ].map((s) => (
            <div key={s.label} className="text-center opacity-0">
              <div className="stat-number">{s.num}</div>
              <div className="text-xs text-white/30 tracking-wider uppercase font-semibold mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
