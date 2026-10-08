import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Play, Star, Award, Shield } from 'lucide-react'
import SectionTagline from '../components/ui/SectionTagline'
import ConsultationCTASection from '../components/sections/ConsultationCTASection'
import { useRef } from 'react'

const trainers = [
  {
    id: 1,
    name: 'Arjun Menon',
    title: 'Head Trainer & Rehabilitation Specialist',
    experience: '08+ Years',
    specializations: ['Rehabilitation', 'Strength Training', 'Sports Injury Recovery', 'Corrective Exercise'],
    certifications: ['NSCA-CPT', 'ACSM', 'Corrective Exercise Specialist', 'Sports Nutrition Level 1'],
    bio: 'Arjun is the driving force behind ReForm Fitness\'s rehabilitation division. With 8 years of experience working alongside orthopedic surgeons and physiotherapists, he has guided over 200 clients back to full health after surgeries, injuries, and chronic pain conditions.',
    philosophy: '"Science gives us the method, but compassion gives us the results."',
    image: '/Reform_images/DSC06244.webp',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    title: "Women's Fitness & Yoga Expert",
    experience: '06+ Years',
    specializations: ["Women's Health", 'Pre/Postnatal Fitness', 'Yoga', 'PCOS Management'],
    certifications: ['ACE-CPT', 'Pre/Postnatal Fitness Specialist', 'RYT-200 Yoga Alliance'],
    bio: 'Priya has dedicated her career to understanding and serving women\'s unique fitness needs. From young women managing PCOS to new mothers rebuilding their core, Priya brings warmth, expertise, and a deep understanding of female physiology to every session.',
    philosophy: '"Women\'s fitness is about becoming stronger, more capable, and fully alive."',
    image: '/Reform_images/DSC06234.webp',
  },
  {
    id: 3,
    name: 'Rahul Nair',
    title: 'Senior Fitness & Mobility Coach',
    experience: '05+ Years',
    specializations: ['Senior Fitness', 'Mobility Training', 'Fall Prevention', 'Functional Training'],
    certifications: ['NASM-CPT', 'Senior Fitness Specialist (ACE)', 'Functional Aging Specialist'],
    bio: 'Rahul found his calling working with senior citizens after seeing his own family struggle with mobility and independence challenges. His gentle approach has helped over 150 senior clients regain confidence, mobility, and vitality.',
    philosophy: '"Age is not a barrier. With patience and science, everyone can experience vitality."',
    image: '/Reform_images/DSC06247.webp',
  },
]

function TrainerStory({ trainer, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const isEven = index % 2 === 0
  
  const imageInitialX = isEven ? -50 : 50;
  const contentInitialX = isEven ? 50 : -50;

  const isDark = index % 2 !== 0 // Alternating Backgrounds: White (even) -> Black (odd)
  const bgColor = isDark ? 'bg-[#231F20]' : 'bg-white'
  const textColor = isDark ? 'text-white' : 'text-[#231F20]'
  const textMuted = isDark ? 'text-white/60' : 'text-[#231F20]/60'
  const textLabel = isDark ? 'text-[#E8B884]' : 'text-[#2B6F6F]' 
  const separatorColor = isDark ? 'bg-white/10' : 'bg-black/10'

  return (
    <section ref={ref} className={`py-16 lg:py-24 w-full flex items-center ${bgColor} overflow-hidden transition-colors duration-700`}>
      <div className="w-full px-[5vw] lg:px-[8vw]">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group`}>
          
          {/* Image Side */}
          <div className="w-full lg:w-[50%] relative group">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
              <motion.div 
                className="w-full h-full absolute inset-0"
                initial={{ opacity: 0, x: imageInitialX, y: 20 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-[50%] py-4 lg:py-12 flex flex-col justify-center">
            <SectionTagline text={`Trainer ${(index + 1).toString().padStart(2, '0')}`} className="mb-4" />

            <motion.h2 
               initial={{ opacity: 0, x: contentInitialX, y: 20 }}
               animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
               transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
               className={`font-serif text-5xl md:text-6xl lg:text-7xl font-light ${textColor} group-hover:translate-x-1 transition-transform duration-500 mb-4`}
            >
               {trainer.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: contentInitialX, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`text-sm md:text-base uppercase tracking-widest ${textMuted} mb-10`}
            >
              {trainer.title}
            </motion.p>
            
            <motion.div
               initial={{ opacity: 0, x: contentInitialX, y: 20 }}
               animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
               transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
               <p className={`text-base md:text-lg leading-relaxed ${textMuted} mb-10 max-w-2xl`}>
                 {trainer.bio}
               </p>

               <div className={`h-[1px] w-full ${separatorColor} group-hover:bg-green-brand/40 transition-colors duration-700 mb-10`} />

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                  <div>
                     <h4 className={`text-xs tracking-widest uppercase mb-4 ${textLabel} group-hover:text-green-brand transition-colors duration-500 font-bold`}>Specializations</h4>
                     <ul className="space-y-2">
                       {trainer.specializations.map(spec => (
                         <li key={spec} className={`text-base ${textMuted}`}>{spec}</li>
                       ))}
                     </ul>
                  </div>

                  <div>
                     <h4 className={`text-xs tracking-widest uppercase mb-4 ${textLabel} group-hover:text-green-brand transition-colors duration-500 font-bold`}>Experience</h4>
                     <p className={`text-base ${textMuted} mb-8`}>{trainer.experience}</p>
                     
                     {trainer.philosophy && (
                       <div>
                         <h4 className={`text-xs tracking-widest uppercase mb-4 ${textLabel} group-hover:text-green-brand transition-colors duration-500 font-bold`}>Approach</h4>
                         <p className={`text-lg md:text-xl italic ${textColor} leading-relaxed max-w-sm`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                           {trainer.philosophy}
                         </p>
                       </div>
                     )}
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TrainersPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <>
      {/* SECTION 01 — CINEMATIC TRAINERS HERO */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center overflow-hidden bg-[#111] pt-24 pb-12">
        {/* Parallax Background */}
        <motion.div 
          style={{ y, scale: 1.05 }} 
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="/Reform_images/DSC06269.webp" 
            alt="ReForm Fitness Trainers" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Cinematic Overlay */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </motion.div>

        {/* Left-Aligned Hero Content */}
        <div className="relative z-10 w-full px-[5vw] lg:pl-[8vw] lg:pr-12">
          <SectionTagline text="OUR TRAINERS" className="mb-8" />
          
          <div className="overflow-hidden mb-8 max-w-4xl">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl lg:text-7xl font-extrabold text-white leading-tight"
            >
              Meet The <span className="text-[#2B6F6F]">People</span> <br/> Behind Your <em className="text-[#E8B884] italic font-extrabold">Transformation</em>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-base md:text-lg text-white/90 max-w-xl font-light tracking-wide leading-relaxed">
              Expert coaches. Individual attention. A smarter approach to your transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 02 — TRAINER INTRODUCTION */}
      <section className="pt-24 lg:pt-32 pb-0 lg:pb-0 bg-white flex items-center justify-center">
        <div className="container-custom max-w-4xl text-center flex flex-col items-center px-6">
          <SectionTagline text="THE PEOPLE BEHIND REFORM" className="mb-8" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-7xl mb-8 leading-[1.05] font-bold text-[#231F20]"
          >
            Expertise<br />
            <em className="text-[#E8B884] italic">With Purpose</em>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base lg:text-lg text-[#231F20]/70 leading-relaxed font-light max-w-2xl"
          >
            Every ReForm trainer brings professional expertise, personal attention, and a commitment to helping every client move better, feel stronger, and achieve lasting results.
          </motion.p>
        </div>
      </section>

      {/* SECTION 03 — TRAINER SHOWCASE */}
      <div className="w-full bg-[#231F20]">
        {trainers.map((trainer, index) => (
          <TrainerStory key={trainer.id} trainer={trainer} index={index} />
        ))}
      </div>

      <ConsultationCTASection />
    </>
  )
}

