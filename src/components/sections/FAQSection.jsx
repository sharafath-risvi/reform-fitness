import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const faqs = [
  { q: 'Do I need to be fit to start with ReForm Fitness?', a: 'Absolutely not. We welcome complete beginners, seniors, people recovering from injuries, and anyone at any fitness level. Every program begins with a thorough assessment so we can design something that\'s perfect for where you are right now.' },
  { q: 'What makes ReForm Fitness different from a regular gym?', a: 'We are not a gym — we are a health transformation company. Every client undergoes a personal health screening and receives a fully customized program. We work with medical professionals, track your progress weekly, and adjust your program based on your body\'s response. You also get direct access to your trainer, not just a workout plan.' },
  { q: 'How does Home Personal Training work?', a: 'Your certified trainer comes to your home at a time that suits you. They bring any required equipment. This service is ideal for busy professionals, families, working women, and senior citizens who prefer privacy and convenience.' },
  { q: 'Is Rehabilitation safe without a doctor\'s supervision?', a: 'We always coordinate with your doctor or physiotherapist. We never replace medical treatment — instead, we work alongside it. All rehabilitation programs are designed after reviewing your medical history and, where required, written permission from your doctor.' },
  { q: 'What is included in the health screening?', a: 'Our health screening covers medical history, current medications, past injuries or surgeries, lifestyle habits, sleep quality, nutrition patterns, and mental wellness. This comprehensive view helps us design a truly safe and effective program.' },
  { q: 'Do you offer nutrition plans?', a: 'We offer lifestyle nutrition coaching rather than strict medical diet plans. We help you build sustainable eating habits, understand macronutrients, and make smarter food choices that support your goals — without crash diets or deprivation.' },
  { q: 'How quickly will I see results?', a: 'Most clients notice improvements in energy, sleep, and mood within the first 2–3 weeks. Visible physical changes typically begin in 4–6 weeks depending on your goals, consistency, and lifestyle factors. We prioritize long-term sustainable results over quick fixes.' },
  { q: 'Are your trainers certified?', a: 'Yes. All ReForm Fitness trainers hold internationally recognized certifications from organizations such as NSCA, NASM, ACE, ACSM, and ISSA. Many also hold specialized certifications in rehabilitation, women\'s health, and senior fitness.' },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item border-b border-[#EDE9E4] last:border-b-0 opacity-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <span className={`text-[1.1rem] font-medium transition-colors duration-200 pr-6 font-serif ${open ? 'text-[#2B6F6F]' : 'text-[#231F20] group-hover:text-[#2B6F6F]'}`}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className={open ? 'text-green-brand' : 'text-[#231F20]/30'} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[0.95rem] lg:text-base text-[#231F20]/80 leading-relaxed pb-6 pr-8">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const accordionRef = useRef(null)

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

      // Accordion Stagger
      const items = gsap.utils.toArray('.faq-item')
      gsap.fromTo(items,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 85%',
          }
        }
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-padding bg-white" ref={containerRef}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Header */}
          <div ref={headerRef}>
            <div className="flex items-center gap-4 mb-4 opacity-0">
              <div className="w-8 h-[1px] bg-[#E8B884] shrink-0" />
              <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
                COMMON QUESTIONS
              </span>
            </div>
            <h2 className="font-serif text-headline text-[#231F20] mb-8 opacity-0 font-bold">
              Frequently Asked
              <br />
              <em className="text-[#E8B884] font-bold font-serif">Questions</em>
            </h2>
            <p className="text-sm text-[#231F20]/55 leading-relaxed opacity-0">
              Can't find your answer here? We're happy to chat. Reach out via WhatsApp or book a free discovery call — no commitment required.
            </p>

            <div className="mt-8 p-6 bg-[#F8F6F4] border-l-4 border-[#E8B884] opacity-0 magnetic">
              <p className="text-sm font-semibold text-[#231F20] mb-1">Still have questions?</p>
              <p className="text-xs text-[#231F20]/50 mb-4">Message us on WhatsApp — we typically reply within 1 hour.</p>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#2B6F6F] hover:text-[#E8B884] transition-colors"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div ref={accordionRef}>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
