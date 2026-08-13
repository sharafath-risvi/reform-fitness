import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Dumbbell, Flame, TrendingUp, Home, Users, Baby, HeartPulse, Flower2, Music, Activity, Apple } from 'lucide-react'
import SectionTagline from '../components/ui/SectionTagline'
import ConsultationCTASection from '../components/sections/ConsultationCTASection'

const allServices = [
  {
    icon: TrendingUp,
    title: 'Body Transformation',
    subtitle: 'Complete Physical & Mental Overhaul',
    desc: 'Our flagship transformation program combines personalized exercise programming, lifestyle nutrition coaching, mental wellness support, and weekly accountability tracking. This is not a short-term fix — it\'s a permanent lifestyle overhaul.',
    includes: ['Comprehensive fitness assessment', 'Customized workout plan', 'Nutrition lifestyle coaching', 'Weekly progress tracking', 'Monthly body composition review', 'Mindset and habit coaching'],
    color: '#E8B884',
    ideal: 'Anyone seeking a complete lifestyle change',
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Flame,
    title: 'Fat Loss Program',
    subtitle: 'Scientific, Sustainable Fat Reduction',
    desc: 'Evidence-based fat loss through strategic exercise programming and lifestyle nutrition adjustments. No crash diets. No starvation. Just smart science that creates a sustainable caloric deficit and metabolic improvement.',
    includes: ['Metabolic assessment', 'Cardio and resistance training mix', 'Nutrition habit coaching', 'Progress photo tracking', 'Plateau-breaking techniques', 'Long-term maintenance planning'],
    color: '#2B6F6F',
    ideal: 'People with weight management goals',
    img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Dumbbell,
    title: 'Muscle Building',
    subtitle: 'Strength Through Progressive Overload',
    desc: 'Structured hypertrophy and strength programming based on progressive overload principles. Build lean muscle mass, improve functional strength, and optimize your body composition with precision training.',
    includes: ['Strength assessment', 'Progressive overload program', 'Nutrition for muscle gain', 'Recovery optimization', 'Performance benchmarks', 'Deload and periodization planning'],
    color: '#E8B884',
    ideal: 'Men and women seeking muscle development',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Home,
    title: 'Home Personal Training',
    subtitle: 'Professional Training at Your Doorstep',
    desc: 'Your certified personal trainer comes to your home at your preferred time with any required equipment. Enjoy the privacy, flexibility, and personalized attention of one-on-one training without leaving home.',
    includes: ['Trainer visits your home', 'Equipment provided if needed', 'Fully customized sessions', 'Flexible scheduling', 'Family sessions available', 'Progress tracking app'],
    color: '#2B6F6F',
    ideal: 'Busy professionals, families, senior citizens',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Users,
    title: "Women's Fitness",
    subtitle: 'Designed for Her Unique Physiology',
    desc: 'Dedicated women\'s programs that understand and respect female physiology, hormonal cycles, and life stages. From fat loss to PCOS management to prenatal and postnatal recovery — we\'ve got you covered.',
    includes: ['Hormonal health-informed programming', 'PCOS management protocols', 'Bone density training', 'Prenatal safe exercises', 'Postnatal recovery program', 'Strength and confidence building'],
    color: '#E8B884',
    ideal: 'Women of all ages and stages of life',
    img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: HeartPulse,
    title: 'Senior Fitness',
    subtitle: 'Age Gracefully, Live Fully',
    desc: 'Specially designed programs for senior citizens that prioritize safety, fall prevention, joint health, and functional independence. Our senior trainers understand the physiological changes of aging and work with patience and expertise.',
    includes: ['Balance and coordination training', 'Joint strengthening exercises', 'Fall prevention techniques', 'Mobility and flexibility work', 'Low-impact cardio sessions', 'Functional daily movement training'],
    color: '#2B6F6F',
    ideal: 'Adults aged 55 and above',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Activity,
    title: 'Injury Rehabilitation',
    subtitle: 'From Recovery to Full Strength',
    desc: 'Our rehabilitation service bridges the gap between medical treatment and full fitness. We work alongside your doctor or physiotherapist to design progressive recovery programs that are safe, effective, and medically informed.',
    includes: ['Medical history review', 'Doctor coordination', 'Progressive recovery protocol', 'Pain point assessment', 'Return-to-function milestones', 'Long-term injury prevention'],
    color: '#E8B884',
    ideal: 'Post-surgery, chronic pain, and sports injury recovery',
    img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974&auto=format&fit=crop'
  },
  {
    icon: Flower2,
    title: 'Yoga',
    subtitle: 'Mind, Body & Breath in Harmony',
    desc: 'Traditional and modern yoga practices taught by certified instructors. Improve flexibility, build mindfulness, reduce stress, and develop a deep connection between your body and breath through regular practice.',
    includes: ['Breathing techniques (Pranayama)', 'Flexibility and mobility yoga', 'Meditation and mindfulness', 'Stress reduction sessions', 'Beginner to advanced levels', 'Private and group sessions'],
    color: '#2B6F6F',
    ideal: 'All fitness levels, those seeking mind-body balance',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop'
  },
  {
    icon: Music,
    title: 'Zumba',
    subtitle: 'Fitness That Feels Like a Celebration',
    desc: 'High-energy dance fitness classes that combine cardio training with the joy of movement. Burn calories, improve coordination, and build community in an exciting, upbeat environment.',
    includes: ['Professional Zumba instructors', 'Multiple music styles', 'All fitness levels welcome', 'Community group classes', 'Private sessions available', 'Calorie burn tracking'],
    color: '#E8B884',
    ideal: 'Anyone who wants cardio without the boredom',
    img: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    icon: Baby,
    title: 'Mobility & Flexibility',
    subtitle: 'Move Better, Feel Better, Live Better',
    desc: 'Targeted programs to improve joint mobility, correct movement patterns, and reduce chronic tightness and pain. Essential for everyone — from desk workers with posture issues to athletes seeking performance gains.',
    includes: ['Movement pattern assessment', 'Joint mobility protocols', 'Myofascial release techniques', 'Posture correction program', 'Flexibility progression plan', 'Pain reduction strategies'],
    color: '#2B6F6F',
    ideal: 'Desk workers, athletes, and chronic pain sufferers',
    img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop'
  },
  {
    icon: Apple,
    title: 'Nutrition Guidance',
    subtitle: 'Fuel Your Life the Right Way',
    desc: 'Not a medical diet plan — practical lifestyle nutrition coaching that helps you understand food, build healthy eating habits, and support your fitness goals without deprivation or confusion.',
    includes: ['Food habit assessment', 'Macro and calorie education', 'Meal planning support', 'Grocery and cooking guidance', 'Sustainable habit building', 'Progress and adaptation reviews'],
    color: '#E8B884',
    ideal: 'Anyone wanting to improve their relationship with food',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop'
  },
]

const differentiators = [
  {
    title: "Science-Based Programming",
    desc: "No guesswork. Every workout is rooted in exercise science and tailored to your physiology."
  },
  {
    title: "Certified Professionals",
    desc: "Work with elite trainers holding internationally recognized certifications and specialized degrees."
  },
  {
    title: "Personalised Plans",
    desc: "Your body is unique. Your program should be too. We don't do cookie-cutter templates."
  },
  {
    title: "Long-Term Results",
    desc: "We focus on sustainable habit building rather than crash diets or short-term fixes."
  },
  {
    title: "Injury Prevention",
    desc: "Proper form and mobility are prioritized to keep you healthy, active, and pain-free."
  },
  {
    title: "Weekly Progress Tracking",
    desc: "Consistent monitoring ensures you are always moving forward and hitting your milestones."
  }
];

function PremiumHero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  
  return (
    <section ref={ref} className="relative w-full min-h-[75vh] lg:h-[85vh] flex items-center overflow-hidden bg-[#231F20] pt-32 pb-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Content */}
        <div className="px-[5vw] lg:pl-[8vw] lg:pr-12">
          <SectionTagline text="OUR SERVICES" className="mb-8" />

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-5xl lg:text-7xl mb-8 leading-[1.1] font-extrabold"
          >
            <span className="text-white block font-extrabold">Training <span className="text-green-brand font-extrabold">Designed</span></span>
            <span className="text-[#E8B884] block italic font-extrabold">Around You</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-white/70 max-w-xl mb-12 font-light leading-relaxed"
          >
            Experience the pinnacle of personal training. Tailored strategies, elite coaching, and a premium environment dedicated to your success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="btn-primary inline-flex group">
              <span>Book a Consultation</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Right Geometric Composition */}
        <div className="relative w-full h-[60vh] lg:h-[75vh] mt-12 lg:mt-0 lg:pr-[5vw]">
          
          {/* IMAGE 1: The Anchor (Left Tall Pill) */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[5%] left-[5%] w-[45%] h-[80%] rounded-[10rem] overflow-hidden shadow-2xl z-10 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070" 
              alt="Strength Training" 
              className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>

          {/* IMAGE 2: The Top Accent (Top Right Organic Square) */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-[5%] w-[45%] h-[45%] rounded-[3rem] overflow-hidden shadow-2xl z-0 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070" 
              alt="Personal Training" 
              className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>

          {/* IMAGE 3: The Base (Bottom Right Asymmetric Form) */}
          <motion.div 
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[5%] right-[2%] w-[50%] h-[40%] rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-2xl z-20 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070" 
              alt="Mobility and Conditioning" 
              className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>

          {/* IMAGE 4: The Floating Detail (Center Intersection Circle) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[35%] left-[40%] w-[30%] aspect-square rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 border-[6px] border-[#231F20] group"
          >
            <img 
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069" 
              alt="Coaching" 
              className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>

        </div>

      </div>
    </section>
  )
}

function ServicesIntro() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="py-32 lg:py-48 px-6 bg-[#FAFAF8] text-center">
      <div className="max-w-4xl mx-auto">
        <SectionTagline text="OUR PHILOSOPHY" className="mb-8" />

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl text-[#231F20] mb-10 font-serif leading-tight"
        >
          <span className="text-green-brand font-medium">Programs</span> Designed <em className="text-[#E8B884] italic font-light">Around You</em>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-[#231F20]/70 font-light leading-relaxed"
        >
          Every program at ReForm Fitness is <span className="text-green-brand font-medium">meticulously crafted</span> based on your unique biomechanics, goals, and lifestyle. We don't believe in templates. We combine science with personalization to deliver results that last a lifetime.
        </motion.p>
      </div>
    </section>
  )
}

function ServiceBlock({ service, index }) {
  const isEven = index % 2 !== 0
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  
  return (
    <div ref={ref} className="w-full max-w-[1400px] mx-auto px-6 mb-24 lg:mb-40 overflow-hidden">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center`}>
        
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-[75vh] relative overflow-hidden rounded-2xl lg:rounded-[2rem] shadow-2xl"
        >
          <img 
            src={service.img} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 py-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SectionTagline text={service.title} className="mb-6" />
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl text-[#231F20] font-serif mb-6 leading-tight font-bold">
              {service.title}
            </h3>
            
            <p className="text-base md:text-lg text-[#231F20]/90 font-light leading-relaxed mb-10 max-w-xl">
              {service.desc}
            </p>
            
            <div className="bg-[#FAFAF8] p-8 lg:p-10 rounded-2xl border border-black/5 mb-10">
              <span className="text-xs uppercase tracking-widest text-[#231F20] font-semibold block mb-6">
                What's Included
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-green-brand mt-1 flex-shrink-0" />
                    <span className="text-sm text-[#231F20]/70 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/contact#contact-section" className="btn-primary inline-flex group text-sm">
                <span>Start Program</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

function PremiumServicesShowcase() {
  return (
    <section className="py-20 bg-white">
      {allServices.map((service, index) => (
        <ServiceBlock key={service.title} service={service} index={index} />
      ))}
    </section>
  )
}

function WhyOurProgramsAreDifferent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  
  return (
    <section ref={ref} className="py-32 bg-[#FAFAF8] px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionTagline text="THE REFORM STANDARD" className="justify-center mb-6" />
          <h2 className="text-4xl md:text-5xl text-[#231F20] font-serif leading-tight font-bold">
            Why Our <span className="text-green-brand font-bold">Programs</span> Are <em className="text-[#E8B884] italic font-bold">Different</em>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {differentiators.map((diff, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-10 lg:p-12 rounded-2xl border border-black/5 hover:border-green-brand/30 hover:shadow-[0_20px_40px_rgba(43,111,111,0.06)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAFAF8] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <div className="w-2 h-2 rounded-full bg-[#E8B884] group-hover:bg-green-brand transition-colors duration-500" />
              </div>
              <h4 className="text-xl text-[#231F20] mb-4 font-bold">{diff.title}</h4>
              <p className="text-[#231F20]/60 font-light leading-relaxed">
                {diff.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TransformationPromise() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  
  return (
    <section className="relative w-full py-40 md:py-60 flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
          alt="Transformation Promise" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div ref={ref} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white font-serif leading-[1.2]"
        >
          We Don't Sell Quick Fixes. <br />
          <em className="text-[#E8B884] italic font-light">We Build Lifelong Transformation.</em>
        </motion.h2>
      </div>
    </section>
  )
}
export default function ServicesPage() {
  return (
    <div className="w-full overflow-hidden bg-white">
      <PremiumHero />
      <ServicesIntro />
      <PremiumServicesShowcase />
      <WhyOurProgramsAreDifferent />
      <TransformationPromise />
      <ConsultationCTASection />
    </div>
  )
}
