import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, Check, FileText, Dumbbell, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionTagline from '../components/ui/SectionTagline'
import ConsultationCTASection from '../components/sections/ConsultationCTASection'

const contactDetails = [
  { icon: Phone, label: 'Phone', value: '+91 XXX XXX XXXX', desc: 'Available Mon–Sat, 6AM–9PM', href: 'tel:+91XXXXXXXXXX' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with an Expert', desc: 'Fastest response time', href: 'https://wa.me/91XXXXXXXXXX' },
  { icon: Mail, label: 'Email', value: 'hello@reformfitness.com', desc: 'Detailed inquiries & partnerships', href: 'mailto:hello@reformfitness.com' },
  { icon: MapPin, label: 'Studio Address', value: 'Level 4, Luxury Avenue', desc: 'City Center, 560001', href: '#location' },
]

const checklist = [
  "Personal Training",
  "Fat Loss & Recomp",
  "Rehabilitation",
  "Women's Fitness",
  "Lifestyle Coaching",
  "Corporate Wellness"
]

const introCards = [
  { icon: User, title: 'Personal Consultation', desc: 'Discuss your specific history, injuries, and goals in a private 1-on-1 session.' },
  { icon: FileText, title: 'Science-Based Guidance', desc: 'We analyze your biomechanics and lifestyle to build the perfect foundation.' },
  { icon: Dumbbell, title: 'Tailored Fitness Journey', desc: 'No cookie-cutter routines. Receive a roadmap designed exclusively for your body.' }
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit } = useForm()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const onSubmit = (data) => {
    console.log(data)
    setSent(true)
  }

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans overflow-hidden">
      
      {/* SECTION 01: PREMIUM CINEMATIC HERO (FULL-WIDTH) */}
      <section className="relative w-full h-[100svh] min-h-[700px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* Background Image & Parallax */}
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')` }}
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
                Contact Us
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[2.5rem] lg:text-7xl text-white mb-10 leading-[1.05] font-extrabold drop-shadow-2xl"
            >
              Let's Build Your<br />
              <em className="text-[#E8B884] italic font-extrabold">Transformation</em>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/80 leading-relaxed font-light mb-14 max-w-xl tracking-wide drop-shadow-md"
            >
              Whether you're ready to commit or just seeking clarity, we are here to provide expert guidance tailored to your goals.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#contact-section" className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#E8B884] text-[#0a0a0a] text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-[#2B6F6F] hover:text-white hover:-translate-y-1 transition-all duration-300 group shadow-[0_10px_30px_rgba(232,184,132,0.15)] hover:shadow-[0_20px_40px_rgba(43,111,111,0.15)]">
                <span>Book a Consultation</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 02: NEW INTRODUCTION SECTION (WHITE) */}
      <section className="px-6 lg:px-24 py-32 max-w-full mx-auto w-full bg-[#FAFAF8] text-[#0a0a0a] relative z-20">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <SectionTagline text="Connect With ReForm" className="mb-8" />
            
            <h2 className="font-serif text-5xl lg:text-7xl mb-8 leading-[1.05] font-bold">
              Let's <span className="text-green-brand font-bold">Start</span><br />
              <em className="text-[#E8B884] italic">The Conversation</em>
            </h2>
            
            <p className="text-lg lg:text-xl text-[#0a0a0a]/60 leading-relaxed font-light max-w-2xl">
              Every incredible <span className="text-green-brand font-medium">physical transformation</span> begins with a single decision. Whether you're looking to build strength, recover from an injury, or completely reshape your lifestyle, our team of expert coaches is ready to guide you.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 03: GET IN TOUCH (SPLIT LAYOUT - DARK) */}
      <section id="contact-section" className="relative px-6 lg:px-24 py-32 w-full bg-[#0a0a0a] text-white">
        <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Info Blocks (40%) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[40%] flex flex-col pt-4"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-[#E8B884]" />
              <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#E8B884] font-semibold">
                Get In Touch
              </span>
            </div>
            
            <h2 className="font-serif text-5xl lg:text-7xl text-white mb-16 leading-[1.05] font-bold">
              <span className="text-green-brand font-bold">Reach</span> <em className="text-[#E8B884] italic">Out</em>
            </h2>
            
            <div className="flex flex-col gap-6">
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon
                return (
                  <a
                    key={index}
                    href={detail.href}
                    target={detail.href.startsWith('http') ? '_blank' : undefined}
                    rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-6 p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:border-[green-brand]/40 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(43,111,111,0.08)]"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[green-brand]/20 group-hover:border-[green-brand]/50 transition-colors duration-500">
                      <Icon size={22} className="text-[#CFCFCF] group-hover:text-[green-brand] transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#E8B884] font-semibold mb-2">{detail.label}</span>
                      <span className="text-xl text-white font-serif mb-2">{detail.value}</span>
                      <span className="text-sm text-white/50 font-light">{detail.desc}</span>
                    </div>
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Right Side: Premium Form (60%) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[60%] relative p-8 md:p-12 lg:p-16 rounded-[2.5rem] lg:rounded-[3.5rem] bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8B884]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {sent ? (
              <div className="text-center py-24 flex flex-col items-center">
                <div className="w-24 h-24 bg-green-brand/10 border border-green-brand/20 rounded-full flex items-center justify-center mb-8">
                  <Check className="text-green-brand" size={40} />
                </div>
                <h3 className="text-4xl lg:text-5xl text-white mb-6 font-serif font-bold">Message Received</h3>
                <p className="text-white/80 font-light text-lg max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A senior coach will review your inquiry and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 relative z-10">
                
                {/* Form Header */}
                <div className="flex flex-col items-start">
                  <div className="inline-flex items-center gap-4 mb-4">
                    <div className="w-6 h-[1px] bg-[#E8B884]" />
                    <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#E8B884] font-semibold">Contact Form</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl text-white mb-2 font-serif drop-shadow-md font-bold">Start the Conversation</h3>
                  <p className="text-white/80 font-light text-[0.95rem]">
                    Tell us about your goals and we'll create the right fitness journey for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input 
                      {...register('name', { required: true })} 
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 outline-none focus:border-[green-brand] transition-colors font-light text-lg text-white" 
                    />
                    <label className="absolute left-0 top-3 text-white/40 text-lg transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-[0.65rem] peer-focus:text-[green-brand] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-semibold peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-[0.65rem] peer-[&:not(:placeholder-shown)]:text-white/60 peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:font-semibold">
                      Full Name
                    </label>
                  </div>
                  <div className="relative">
                    <input 
                      {...register('phone')} 
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 outline-none focus:border-[green-brand] transition-colors font-light text-lg text-white" 
                    />
                    <label className="absolute left-0 top-3 text-white/40 text-lg transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-[0.65rem] peer-focus:text-[green-brand] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-semibold peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-[0.65rem] peer-[&:not(:placeholder-shown)]:text-white/60 peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:font-semibold">
                      Phone Number
                    </label>
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    {...register('email', { required: true })} 
                    type="email" 
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 outline-none focus:border-[green-brand] transition-colors font-light text-lg text-white" 
                  />
                  <label className="absolute left-0 top-3 text-white/40 text-lg transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-[0.65rem] peer-focus:text-[green-brand] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-semibold peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-[0.65rem] peer-[&:not(:placeholder-shown)]:text-white/60 peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:font-semibold">
                    Email Address
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative pt-2">
                    <label className="block text-[0.65rem] uppercase tracking-widest font-semibold text-white/50 mb-2">Service Interested In</label>
                    <select 
                      {...register('service')} 
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 outline-none focus:border-[green-brand] transition-colors font-light text-lg text-white appearance-none cursor-pointer"
                    >
                      <option value="" className="text-black">Select an option...</option>
                      {checklist.map(item => (
                        <option key={item} value={item} className="text-black">{item}</option>
                      ))}
                      <option value="General Inquiry" className="text-black">General Inquiry</option>
                    </select>
                  </div>
                  <div className="relative pt-2">
                    <label className="block text-[0.65rem] uppercase tracking-widest font-semibold text-white/50 mb-2">Preferred Time</label>
                    <select 
                      {...register('time')} 
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 outline-none focus:border-[green-brand] transition-colors font-light text-lg text-white appearance-none cursor-pointer"
                    >
                      <option value="" className="text-black">Select a time...</option>
                      <option value="Morning" className="text-black">Morning (6AM - 12PM)</option>
                      <option value="Afternoon" className="text-black">Afternoon (12PM - 4PM)</option>
                      <option value="Evening" className="text-black">Evening (4PM - 9PM)</option>
                    </select>
                  </div>
                </div>

                <div className="relative pt-3">
                  <textarea 
                    {...register('message', { required: true })} 
                    rows={3} 
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 outline-none focus:border-[green-brand] transition-colors font-light text-lg text-white resize-none" 
                  />
                  <label className="absolute left-0 top-6 text-white/40 text-lg transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-[0.65rem] peer-focus:text-[green-brand] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-semibold peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[0.65rem] peer-[&:not(:placeholder-shown)]:text-white/60 peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:font-semibold">
                    Tell us about your goals...
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-5 rounded-full bg-[#E8B884] text-[#0a0a0a] hover:text-white font-semibold tracking-[0.2em] uppercase text-[0.8rem] hover:bg-[#2B6F6F] transition-colors duration-500 mt-6 flex items-center justify-center gap-4 group shadow-[0_10px_30px_rgba(232,184,132,0.15)] hover:shadow-[0_20px_40px_rgba(43,111,111,0.15)]"
                >
                  <span>Submit Application</span>
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 04: MAP SECTION (WHITE) */}
      <section id="location" className="px-6 lg:px-24 py-32 w-full bg-[#FAFAF8] text-[#0a0a0a] relative rounded-t-[3rem] lg:rounded-t-[4rem] -mt-10">
        <div className="max-w-[1800px] mx-auto">
          
          <div className="flex flex-col items-center text-center mb-16">
            <SectionTagline text="Location" className="mb-8" />
            
            <h2 className="text-5xl lg:text-7xl leading-[1.05] font-serif mb-8 drop-shadow-xl font-bold">
              Visit Our <em className="text-[#E8B884] italic">Studio</em>
            </h2>
            <p className="text-[#0a0a0a]/60 text-lg font-light max-w-2xl mx-auto">
              Experience our state-of-the-art private training facility, designed exclusively for ultimate focus, luxury, and performance.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[600px] relative rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-black/5 group bg-[#FAFAF8]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent z-10 pointer-events-none" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9937499984947!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              className="w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 border-0 pointer-events-none"
              allowFullScreen=""
              loading="lazy"
              title="ReForm Fitness Map Location"
            />
            <div className="absolute bottom-12 left-12 z-20 pointer-events-none">
              <p className="text-3xl text-white font-serif font-medium mb-2 drop-shadow-md">ReForm Private Studio</p>
              <p className="text-[#E8B884] font-semibold uppercase tracking-[0.2em] text-xs drop-shadow-md">Central Boulevard, 560001</p>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* SECTION 05: GLOBAL CTA */}
      <ConsultationCTASection />

    </div>
  )
}
