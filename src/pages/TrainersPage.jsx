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
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Divya Krishnan',
    title: 'Fat Loss & Nutrition Coach',
    experience: '05+ Years',
    specializations: ['Fat Loss', 'Body Transformation', 'Nutrition Coaching', 'Metabolic Training'],
    certifications: ['ISSA-CPT', 'Precision Nutrition Level 1', 'Metabolic Testing Specialist'],
    bio: 'Divya believes that sustainable fat loss comes from building habits, not breaking willpower. Her unique blend of scientific nutrition coaching and high-energy fitness training creates programs that clients actually enjoy and maintain long-term.',
    philosophy: '"When fitness is enjoyable and nutrition sustainable, results become inevitable."',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Anil Kumar',
    title: 'Strength & Performance Coach',
    experience: '07+ Years',
    specializations: ['Muscle Building', 'Athletic Performance', 'Powerlifting', 'Body Composition'],
    certifications: ['NSCA-CSCS', 'USA Weightlifting Coach', 'Sports Performance Coach'],
    bio: 'A competitive athlete himself, Anil brings performance-level coaching to everyday clients. His deep understanding of strength physics, periodization, and recovery science helps clients build functional strength that transforms appearance and performance.',
    philosophy: '"Strength is the foundation of everything. Every rep is an investment."',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Sneha Pillai',
    title: 'Yoga & Mindfulness Instructor',
    experience: '04+ Years',
    specializations: ['Yoga', 'Mindfulness', 'Stress Management', 'Flexibility'],
    certifications: ['RYT-500 Yoga Alliance', 'Mindfulness-Based Stress Reduction', 'Yin Yoga Certified'],
    bio: 'Sneha brings a deeply spiritual yet practically grounded approach to yoga and mindfulness. Her sessions create profound shifts in how clients experience their body, mind, and daily stress — making her one of the most requested instructors at ReForm Fitness.',
    philosophy: '"Yoga is not about how flexible you are. It\'s about how present you can be."',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Coach Profile Pending',
    title: 'Elite Trainer & Specialist',
    experience: 'TBA',
    specializations: ['Strength & Conditioning', 'Performance Optimization'],
    certifications: ['Certified Personal Trainer', 'Specialist Certification Pending'],
    bio: 'We are expanding our expert team. A new elite trainer will be joining ReForm Fitness soon to bring even more specialized expertise and guidance to your transformation journey. Stay tuned for their full profile and schedule.',
    philosophy: '"Commitment to excellence and continuous improvement in every session."',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Coach Profile Pending',
    title: 'Performance Specialist',
    experience: 'TBA',
    specializations: ['Functional Training', 'Athletic Development'],
    certifications: ['Certified Personal Trainer', 'Specialist Certification Pending'],
    bio: 'Our coaching staff is growing to serve you better. We rigorously select trainers who align with our science-based, empathy-driven approach to fitness. This profile will be updated when our newest team member officially joins.',
    philosophy: '"Empowering clients through education, proper mechanics, and dedication."',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 9,
    name: 'Coach Profile Pending',
    title: 'Wellness & Movement Coach',
    experience: 'TBA',
    specializations: ['Movement Mechanics', 'Holistic Wellness'],
    certifications: ['Certified Personal Trainer', 'Specialist Certification Pending'],
    bio: 'ReForm Fitness is committed to providing a diverse range of coaching expertise. A new specialist in movement mechanics and holistic wellness is preparing to join our team to support your long-term fitness goals.',
    philosophy: '"Movement is medicine, and proper guidance is the prescription."',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 10,
    name: 'Coach Profile Pending',
    title: 'Transformation Specialist',
    experience: 'TBA',
    specializations: ['Body Recomposition', 'Lifestyle Integration'],
    certifications: ['Certified Personal Trainer', 'Specialist Certification Pending'],
    bio: 'We are continuously seeking the best talent in the fitness industry. This upcoming addition to our team will bring fresh perspectives on body recomposition and sustainable lifestyle changes.',
    philosophy: '"Transformation is an ongoing journey of mindful choices and consistent effort."',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop',
  },
]

function TrainerStory({ trainer, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const isEven = index % 2 === 0
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
          
          {/* Image Side (~55%) */}
          <div className="w-full lg:w-[55%] relative overflow-hidden group">
            <div className="aspect-[4/3] lg:aspect-[3/2] overflow-hidden rounded-lg">
              <motion.div 
                className="w-full h-full relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
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

          {/* Content Side (~45%) */}
          <div className="w-full lg:w-[45%] py-4 lg:py-0">
            <SectionTagline text={`Trainer ${(index + 1).toString().padStart(2, '0')}`} className="mb-4" />

            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, delay: 0.2 }}
               className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light ${textColor} group-hover:translate-x-1 transition-transform duration-500 mb-3`}
            >
               {trainer.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-xs md:text-sm uppercase tracking-widest ${textMuted} mb-8`}
            >
              {trainer.title}
            </motion.p>
            
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, delay: 0.4 }}
            >
               <p className={`text-sm md:text-base leading-relaxed ${textMuted} mb-8 max-w-2xl`}>
                 {trainer.bio}
               </p>

               <div className={`h-[1px] w-full ${separatorColor} group-hover:bg-green-brand/40 transition-colors duration-700 mb-8`} />

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                     <h4 className={`text-[0.65rem] tracking-widest uppercase mb-3 ${textLabel} group-hover:text-green-brand transition-colors duration-500 font-bold`}>Specializations</h4>
                     <ul className="space-y-1.5">
                       {trainer.specializations.map(spec => (
                         <li key={spec} className={`text-sm ${textMuted}`}>{spec}</li>
                       ))}
                     </ul>
                  </div>

                  <div>
                     <h4 className={`text-[0.65rem] tracking-widest uppercase mb-3 ${textLabel} group-hover:text-green-brand transition-colors duration-500 font-bold`}>Experience</h4>
                     <p className={`text-sm ${textMuted} mb-6`}>{trainer.experience}</p>
                     
                     {trainer.philosophy && (
                       <div>
                         <h4 className={`text-[0.65rem] tracking-widest uppercase mb-3 ${textLabel} group-hover:text-green-brand transition-colors duration-500 font-bold`}>Approach</h4>
                         <p className={`text-sm italic ${textColor} leading-relaxed max-w-sm`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
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
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="ReForm Fitness Trainers" 
            className="w-full h-full object-cover object-top"
          />
          {/* Dark Cinematic Overlay */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
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
      <section className="py-24 lg:py-32 bg-white flex items-center justify-center">
        <div className="container-custom max-w-4xl text-center flex flex-col items-center px-6">
          <SectionTagline text="THE PEOPLE BEHIND REFORM" className="mb-8" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight font-serif drop-shadow-sm"
          >
            <span className="text-[#231F20] block">Expertise</span>
            <span className="text-[#E8B884] block italic font-light">With Purpose</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-2xl text-[#231F20]/70 leading-relaxed font-light max-w-3xl"
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

