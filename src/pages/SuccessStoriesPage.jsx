import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Star, Quote } from 'lucide-react'
import { useState, useRef } from 'react'

const stories = [
  {
    name: 'Kavya Reddy',
    age: '29',
    goal: 'Fat Loss & Body Transformation',
    result: 'Lost 18 kg in 5 months',
    duration: '5 Months',
    trainer: 'Divya Krishnan',
    story: 'I had tried every diet and gym in the city. Nothing worked because no one took the time to understand WHY I was struggling. ReForm Fitness was different from day one. My trainer did a complete health screening, understood my PCOS, and built a program specifically for my body. Within 3 weeks I felt more energy than I had in years. The nutrition coaching changed my relationship with food completely. I\'m not on a diet anymore — I\'m living a healthier lifestyle. 18 kg lighter and stronger than ever.',
    color: '#E8B884',
  },
  {
    name: 'Suresh Menon',
    age: '42',
    goal: 'Post ACL Surgery Rehabilitation',
    result: 'Full recovery, back to football',
    duration: '8 Months',
    trainer: 'Arjun Menon',
    story: 'After my ACL surgery, my doctor said I might never play football again. My ReForm trainer worked closely with my physiotherapist to design a step-by-step recovery program. Every phase was carefully planned — from basic mobility to full strength and agility. 8 months later, I not only walked without pain but played in my company\'s football tournament. The level of expertise and care at ReForm is unmatched. They treated me like family, not a patient.',
    color: '#2B6F6F',
  },
  {
    name: 'Anita Kumar',
    age: '34',
    goal: 'PCOS Management & Women\'s Fitness',
    result: 'PCOS symptoms reversed, 12 kg lost',
    duration: '6 Months',
    trainer: 'Priya Sharma',
    story: 'PCOS had made me feel like my body was working against me. My ReForm trainer understood hormonal health at a level I hadn\'t encountered before. She adjusted my program based on my cycle, taught me about inflammation-reducing foods, and designed exercises that actually supported my hormones rather than stressing them. 6 months later, my doctor called my bloodwork "remarkable." I feel completely in control of my health for the first time in a decade.',
    color: '#E8B884',
  },
  {
    name: 'Rajan Pillai',
    age: '68',
    goal: 'Senior Fitness & Mobility',
    result: 'Walks 5 km daily, pain-free at 68',
    duration: '4 Months',
    trainer: 'Rahul Nair',
    story: 'I was using a cane to walk. My knees ached constantly and I\'d given up on the idea of being active in my 60s. My family convinced me to try ReForm Fitness\'s senior program. My trainer was patient, encouraging, and incredibly knowledgeable. He understood exactly which exercises would strengthen my joints without stressing them. Within 4 months I put down the cane permanently. I now walk 5 km every morning. ReForm didn\'t just improve my fitness — they gave me my independence back.',
    color: '#2B6F6F',
  },
  {
    name: 'Meera Shenoy',
    age: '38',
    goal: 'Home Personal Training - Postnatal',
    result: 'Lost baby weight, regained core strength',
    duration: '3 Months',
    trainer: 'Priya Sharma',
    story: 'As a new mother with a 3-month-old, going to a gym was simply impossible. The Home PT service was exactly what I needed. My trainer came to my home 4 days a week, worked around my baby\'s schedule, and designed a gentle but effective postnatal program. The core restoration was phenomenal. I feel like I\'m back in my body again — stronger, more confident, and actually enjoying movement. Being a mother AND being fit is possible with the right support.',
    color: '#E8B884',
  },
  {
    name: 'Vikram Nair',
    age: '31',
    goal: 'Muscle Building & Strength',
    result: 'Gained 8 kg muscle mass in 6 months',
    duration: '6 Months',
    trainer: 'Anil Kumar',
    story: 'I had been training for 3 years with no real progress. Then I trained with ReForm Fitness and realized I had no idea what I was doing. The progressive overload programming, nutrition optimization, and recovery protocols were on a completely different level. My trainer tracked every variable and adjusted my program every 4 weeks. In 6 months I gained 8 kg of lean muscle and my strength numbers doubled. This is what professional coaching looks like.',
    color: '#2B6F6F',
  },
]

const stats = [
  { number: 500, suffix: '+', label: 'Clients Transformed' },
  { number: 98, suffix: '%', label: 'Satisfaction Rate' },
  { number: 4.9, suffix: '', label: 'Google Rating', decimals: 1 },
  { number: 200, suffix: '+', label: 'Reviews Received' },
]

const testimonials = [
  { name: 'Kavya R.', text: 'ReForm changed my entire relationship with health. It\'s not about weight — it\'s about how you feel, move, and live.', rating: 5, program: 'Body Transformation' },
  { name: 'Suresh M.', text: 'After my knee surgery, I was terrified. My ReForm trainer built me back stronger than before.', rating: 5, program: 'Rehabilitation' },
  { name: 'Anita K.', text: 'My PCOS symptoms improved dramatically in 3 months. I\'m stronger than I\'ve ever been.', rating: 5, program: "Women's Fitness" },
  { name: 'Rajan P.', text: 'At 68, I thought my best years were behind me. ReForm proved me wrong.', rating: 5, program: 'Senior Fitness' },
  { name: 'Meera S.', text: 'As a working mother, having a trainer at home was life-changing. Incredible experience.', rating: 5, program: 'Home Personal Training' },
  { name: 'Vikram T.', text: 'Not just a trainer — a coach, mentor, and motivator. Best investment I\'ve ever made.', rating: 5, program: 'Muscle Building' },
]

function StatItem({ stat, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const [counted, setCounted] = useState(false)
  const [displayValue, setDisplayValue] = useState(0)
  const animRef = useRef(null)

  if (inView && !counted) {
    setCounted(true)
    const duration = 2500
    const start = performance.now()
    const end = stat.number
    const decimals = stat.decimals || 0
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = end * eased
      setDisplayValue(decimals ? parseFloat(current.toFixed(decimals)) : Math.floor(current))
      if (progress < 1) animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <div className="stat-number mb-2">
        {displayValue}{stat.suffix}
      </div>
      <div className="text-xs text-white/30 tracking-wider uppercase font-semibold">{stat.label}</div>
    </motion.div>
  )
}

export default function SuccessStoriesPage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <>
      {/* SECTION 01: PREMIUM CINEMATIC HERO (FULL-WIDTH) */}
      <section className="relative w-full h-[100svh] min-h-[700px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* Background Image & Parallax */}
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity"
            style={{ backgroundImage: `url('/Reform_images/DSC06270.JPG')` }}
          />
          {/* Subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-[#0a0a0a]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/40" />
        </motion.div>
        
        {/* Content Container */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 px-6 lg:px-24 w-full max-w-[1800px] mx-auto mt-20"
        >
          <div className="max-w-3xl flex flex-col items-start text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-4 mb-8"
            >
              <div className="w-10 h-[1px] bg-[#E8B884]" />
              <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
                Success Stories
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[2rem] sm:text-[2.5rem] lg:text-7xl text-white mb-8 leading-[1.05] font-extrabold drop-shadow-2xl"
            >
              Real people.<br />
              <em className="text-[#E8B884] italic font-extrabold">Real transformations.</em>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-xl text-white/80 leading-relaxed font-light mb-10 max-w-xl tracking-wide drop-shadow-md"
            >
              These are not before-and-after photo contests. These are real stories of real people who chose to prioritize their health and were guided every step of the way.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-[#231F20] py-16 px-6 lg:px-10">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => <StatItem key={stat.label} stat={stat} index={i} />)}
        </div>
      </section>

      {/* Detailed Stories */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-12">
          {stories.map((story, index) => {
            const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={story.name}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-[#EDE9E4] overflow-hidden"
              >
                {/* Stat Panel */}
                <div
                  className={`lg:col-span-2 p-10 flex flex-col justify-between ${!isEven ? 'lg:order-2' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${story.color}12, ${story.color}05)`, borderRight: isEven ? '1px solid #EDE9E4' : 'none', borderLeft: !isEven ? '1px solid #EDE9E4' : 'none' }}
                >
                  <div>
                    <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 mb-6 inline-block" style={{ background: story.color + '15', color: story.color, border: `1px solid ${story.color}30` }}>
                      {story.goal}
                    </span>
                    <div className="stat-number mb-2">{story.result.split(' ').slice(0, 2).join(' ')}</div>
                    <p className="text-sm text-[#231F20]/55">{story.result}</p>
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between py-3 border-t border-[#EDE9E4]">
                      <span className="text-xs text-[#231F20]/40 uppercase tracking-wider font-semibold">Client</span>
                      <span className="text-sm font-medium text-[#231F20]">{story.name}, {story.age}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-[#EDE9E4]">
                      <span className="text-xs text-[#231F20]/40 uppercase tracking-wider font-semibold">Trainer</span>
                      <span className="text-sm font-medium text-[#231F20]">{story.trainer}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-[#EDE9E4]">
                      <span className="text-xs text-[#231F20]/40 uppercase tracking-wider font-semibold">Duration</span>
                      <span className="text-sm font-medium" style={{ color: story.color }}>{story.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Story */}
                <div className={`lg:col-span-3 p-10 lg:p-14 bg-white ${!isEven ? 'lg:order-1' : ''}`}>
                  <Quote size={32} className="mb-6 opacity-20" style={{ color: story.color }} />
                  <p className="text-base text-[#231F20]/65 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    "{story.story}"
                  </p>
                  <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#EDE9E4]">
                    <div>
                      <div className="text-sm font-semibold text-[#231F20]">{story.name}</div>
                      <div className="text-xs text-[#231F20]/40">{story.goal}</div>
                    </div>
                    <div className="flex gap-0.5 ml-auto">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#E8B884" className="text-[#E8B884]" />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Testimonial Cards */}
      <section className="section-padding bg-[#F8F6F4]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-label text-[#2B6F6F] block mb-3">What Clients Say</span>
            <h2 className="font-serif text-headline text-[#231F20] font-bold">
              More <em className="text-[#E8B884]">Client Reviews</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => {
              const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
              return (
                <motion.div
                  key={t.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-[#EDE9E4] p-8 hover:border-[#E8B884]/40 hover:shadow-lg transition-all duration-300"
                >
                  <Quote size={20} className="text-[#E8B884]/30 mb-4" />
                  <p className="text-sm text-[#231F20]/65 leading-relaxed mb-6 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#231F20]">{t.name}</div>
                      <div className="text-xs text-[#231F20]/40">{t.program}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="#E8B884" className="text-[#E8B884]" />)}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-[#231F20] text-center">
        <div className="container-custom">
          <h2 className="font-serif text-2xl lg:text-4xl text-white mb-4 font-bold">
            Ready to write your <em className="text-[#E8B884]">own story?</em>
          </h2>
          <Link to="/consultation" className="btn-primary inline-flex group mt-6">
            <span>Book Free Consultation</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}
