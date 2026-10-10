import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import SectionTagline from '../components/ui/SectionTagline'
import ConsultationCTASection from '../components/sections/ConsultationCTASection'

const trainers = [
  {
    id: 1,
    name: 'Akash Radhakrishnan',
    title: 'Certified Personal Trainer | Strength Coach | Athlete',
    experience: '3+ Years in the UAE',
    achievement: 'Mahatma Gandhi University Weightlifting Gold Medalist',
    specializations: ['Strength Training', 'Muscle Building', 'Fat Loss', 'Athletic Performance', 'Functional Fitness', 'Body Transformations'],
    bio: [
      "Akash is a competitive athlete and strength coach with 3+ years of experience in the UAE. His sporting background spans Weightlifting, Powerlifting, Wrestling, Bodybuilding, Baseball, Softball, and CrossFit.",
      "A Mahatma Gandhi University Weightlifting Gold Medalist, he specializes in strength training, muscle building, fat loss, and athletic performance—helping clients build confidence and a sustainable lifestyle."
    ],
    image: '/trainers/akash.webp',
  },
  {
    id: 2,
    name: 'Nishin Prakash',
    title: 'Fitness Coach',
    experience: '4+ Years',
    specializations: ['Strength & Conditioning', 'Body Recomposition', 'Fat Loss', 'Mobility & Stretching', 'Functional Training', '1:1 Personal Coaching'],
    location: 'Dubai, UAE',
    languages: 'English, Hindi, Malayalam & Tamil',
    bio: [
      "With 4 years of experience in fitness training, Nishin Prakash is a Dubai-based Fitness Coach specializing in Strength & Conditioning, Body Recomposition, Fat Loss, Mobility, and Stretching.",
      "Every training program is designed around the client’s goals, fitness level, lifestyle, and individual needs, ensuring that training is both effective and sustainable."
    ],
    image: '/trainers/nishin.webp',
  },
  {
    id: 3,
    name: 'Nisha Nangla',
    title: 'Certified Yoga Trainer & Zumba Instructor',
    experience: 'Yoga (4 Years) | Zumba (5 Years)',
    specializations: ['Yoga', 'Zumba', 'Strength Training', 'Flexibility & Stamina'],
    bio: [
      "Originally from Punjab, India, Nisha Nangla is a passionate fitness professional with 4 years of experience in Yoga and 5 years of experience in Zumba. She also specializes in strength training, helping clients build strength, flexibility, stamina, and confidence through enjoyable and personalized workouts."
    ],
    image: '/trainers/nisha.webp',
  },
]

function TrainerStory({ trainer, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  
  // Use alternating backgrounds
  const isDark = index % 2 !== 0 
  const bgColor = isDark ? 'bg-[#231F20]' : 'bg-white'
  
  // Alternate Image/Content placement based on index.
  // Trainer 1 (index 0): Image Right, Content Left.
  // Trainer 2 (index 1): Image Left, Content Right.
  // Trainer 3 (index 2): Image Right, Content Left.
  const isImageRight = index % 2 === 0
  
  // Text styling variables
  const nameColor = isDark ? 'text-white' : 'text-[#231F20]'
  const titleColor = isDark ? 'text-[#E8B884]' : 'text-[#2B6F6F]'
  const bioColor = isDark ? 'text-white/80' : 'text-[#231F20]/80'
  const labelColor = isDark ? 'text-[#E8B884]' : 'text-[#2B6F6F]'
  const dividerColor = isDark ? 'bg-white/10' : 'bg-black/10'

  return (
    <section ref={ref} className={`py-16 lg:py-24 w-full flex items-center ${bgColor} overflow-hidden transition-colors duration-700`}>
      <div className="w-full px-[5vw] lg:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start group">
          
          {/* Image Side - Ordered dynamically on large screens. Always on top on mobile. */}
          <div className={`w-full relative ${isImageRight ? 'lg:order-2' : 'lg:order-1'} ${index === 0 ? 'lg:mt-2 xl:mt-4' : ''}`}>
            <div className={`${index === 0 ? 'aspect-[3/4] lg:aspect-[2/3]' : 'aspect-[4/5]'} overflow-hidden rounded-2xl relative shadow-2xl w-full max-w-lg mx-auto lg:max-w-none`}>
              <motion.div 
                className="w-full h-full absolute inset-0"
                initial={{ opacity: 0, x: isImageRight ? 50 : -50, y: 20 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover grayscale-[10%] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0" 
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`w-full py-4 lg:py-6 flex flex-col justify-center ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
            <SectionTagline text={`Trainer ${(index + 1).toString().padStart(2, '0')}`} className="mb-4" />

            <motion.h2 
               initial={{ opacity: 0, x: isImageRight ? -50 : 50, y: 20 }}
               animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
               transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
               className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold ${nameColor} mb-3`}
            >
               {trainer.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: isImageRight ? -50 : 50, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`text-sm md:text-base uppercase tracking-[0.2em] ${titleColor} mb-8 font-semibold`}
            >
              {trainer.title}
            </motion.p>
            
            <motion.div
               initial={{ opacity: 0, x: isImageRight ? -50 : 50, y: 20 }}
               animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
               transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className={`space-y-4 text-base md:text-lg leading-relaxed ${bioColor} mb-10 font-light`}>
                 {trainer.bio.map((paragraph, i) => (
                   <p key={i}>{paragraph}</p>
                 ))}
               </div>

               <div className={`h-[1px] w-full ${dividerColor} mb-10`} />

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div>
                    <h4 className={`text-xs tracking-widest uppercase mb-3 ${labelColor} font-bold`}>Areas of Expertise</h4>
                    <ul className="space-y-2">
                      {trainer.specializations.map(spec => (
                        <li key={spec} className={`text-sm md:text-base ${bioColor}`}>{spec}</li>
                      ))}
                    </ul>
                 </div>

                 <div>
                    {trainer.experience && (
                      <div className="mb-5">
                        <h4 className={`text-xs tracking-widest uppercase mb-1 ${labelColor} font-bold`}>Experience</h4>
                        <p className={`text-sm md:text-base ${bioColor}`}>{trainer.experience}</p>
                      </div>
                    )}

                    {trainer.achievement && (
                      <div className="mb-5">
                        <h4 className={`text-xs tracking-widest uppercase mb-1 ${labelColor} font-bold`}>Achievement</h4>
                        <p className={`text-sm md:text-base ${bioColor}`}>{trainer.achievement}</p>
                      </div>
                    )}

                    {trainer.location && (
                      <div className="mb-5">
                        <h4 className={`text-xs tracking-widest uppercase mb-1 ${labelColor} font-bold`}>Location</h4>
                        <p className={`text-sm md:text-base ${bioColor}`}>{trainer.location}</p>
                      </div>
                    )}

                    {trainer.languages && (
                      <div className="mb-5">
                        <h4 className={`text-xs tracking-widest uppercase mb-1 ${labelColor} font-bold`}>Languages</h4>
                        <p className={`text-sm md:text-base ${bioColor}`}>{trainer.languages}</p>
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
          <TrainerStory 
            key={trainer.id} 
            trainer={trainer} 
            index={index} 
          />
        ))}
      </div>

      <ConsultationCTASection />
    </>
  )
}
