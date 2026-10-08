import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react'

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { label: 'Body Transformation', href: '/services' },
  { label: 'Fat Loss Program', href: '/services' },
  { label: 'Muscle Building', href: '/services' },
  { label: 'Home Personal Training', href: '/services' },
  { label: "Women's Fitness", href: '/services' },
  { label: 'Senior Fitness', href: '/services' },
  { label: 'Injury Rehabilitation', href: '/services' },
  { label: 'Yoga & Zumba', href: '/services' },
  { label: 'Nutrition Guidance', href: '/services' },
]

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
)

const socialLinks = [
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'YouTube', href: '#', icon: YoutubeIcon },
]

export default function Footer() {
  const { ref: footerRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <footer ref={footerRef} className="bg-[#0a0a0a] text-white pt-16 lg:pt-32 pb-8 border-t border-white/5 relative overflow-hidden flex flex-col">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#E8B884]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#E8B884]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full flex-grow relative z-10 flex flex-col">
        
        {/* ========================================== */}
        {/* 2. TOP FOOTER BRAND AREA                   */}
        {/* ========================================== */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-8 mb-16 lg:mb-32">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start max-w-md"
          >
            <Link to="/" className="inline-block mb-8 group">
              <img 
                src="/logos/primary-logo.png" 
                alt="ReForm Fitness" 
                className="h-[5.5rem] w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
              />
            </Link>
            <p className="text-xl lg:text-2xl text-white/90 font-serif leading-relaxed">
              Training with purpose.<br />
              <em className="text-[#E8B884] italic font-light">Transformation with precision.</em>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left lg:text-right"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-tight font-serif font-bold">
              Build strength.<br />
              Move better.<br />
              <em className="text-[#E8B884] italic font-bold">Live stronger.</em>
            </h2>
          </motion.div>
        </div>

        {/* ========================================== */}
        {/* 3. 4. 5. FOOTER NAVIGATION & INFO          */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24 lg:mb-32">
          
          {/* COLUMN 01: EXPLORE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-[#E8B884] mb-8 font-bold">
              Explore
            </h4>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[0.95rem] text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-3 group w-fit"
                  >
                    <span className="w-0 h-[1px] bg-green-brand group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 02: SERVICES */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-[#E8B884] mb-8 font-bold">
              Services
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[0.95rem] text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-3 group w-fit"
                  >
                    <span className="w-0 h-[1px] bg-green-brand group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 03: GET IN TOUCH */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-[#E8B884] mb-8 font-bold">
              Get In Touch
            </h4>
            <ul className="space-y-6">
              <li>
                <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-4 text-[0.95rem] text-white/60 hover:text-white transition-colors duration-300 group w-fit">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-green-brand/30 group-hover:text-green-brand transition-colors">
                    <Phone size={14} />
                  </div>
                  <span>+91 XXX XXX XXXX</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@reformfitness.com" className="flex items-center gap-4 text-[0.95rem] text-white/60 hover:text-white transition-colors duration-300 group w-fit">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-green-brand/30 group-hover:text-green-brand transition-colors">
                    <Mail size={14} />
                  </div>
                  <span className="break-all">hello@reformfitness.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[0.95rem] text-white/60 hover:text-[#25D366] transition-colors duration-300 group w-fit">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#25D366]/30 group-hover:text-[#25D366] transition-colors">
                    <MessageCircle size={14} />
                  </div>
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li>
                <Link to="/contact#location" className="flex items-center gap-4 text-[0.95rem] text-white/60 hover:text-white transition-colors duration-300 group w-fit">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-green-brand/30 group-hover:text-green-brand transition-colors">
                    <MapPin size={14} />
                  </div>
                  <span>Level 4, Luxury Avenue<br/>City Center, 560001</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* COLUMN 04: FOLLOW REFORM */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-[#E8B884] mb-8 font-bold">
              Follow ReForm
            </h4>
            <ul className="space-y-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex items-center gap-4 text-[0.95rem] text-white/60 hover:text-white transition-colors duration-300 group w-fit"
                  >
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-brand/10 group-hover:border-green-brand/30 group-hover:text-green-brand transition-all">
                      <Icon size={14} />
                    </div>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* ========================================== */}
        {/* 6. VISUAL DIVIDER                          */}
        {/* ========================================== */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-white/10 origin-left mb-16"
        />

        {/* ========================================== */}
        {/* 7. LARGE FOOTER BRAND STATEMENT            */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center mb-16 overflow-hidden"
        >
          <h1 
            className="font-serif text-[8.8vw] md:text-[9.8vw] leading-none font-bold text-white/5 tracking-tighter select-none whitespace-nowrap"
          >
            <span style={{ WebkitTextStroke: '1px #2B6F6F' }} className="mr-[3vw]">REFORM</span>
            <span style={{ WebkitTextStroke: '1px #E8B884' }}>FITNESS</span>
          </h1>
        </motion.div>

        {/* ========================================== */}
        {/* 8. BOTTOM FOOTER                           */}
        {/* ========================================== */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 mt-auto"
        >
          <p className="text-[0.75rem] tracking-wider text-white/70 font-light text-center md:text-left">
            © {new Date().getFullYear()} ReForm Fitness. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/30 font-semibold">Developed by</span>
            <a 
              href="https://thajiratechworks.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[0.75rem] tracking-wider text-white/50 font-light hover:text-[#E8B884] transition-colors duration-300 cursor-pointer"
            >
              Thajira Techworks
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
