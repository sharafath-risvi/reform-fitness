import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { X, Menu, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Success Stories', href: '/success-stories' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    
    // Determine if scrolled past threshold for styling
    setScrolled(prev => {
      const isScrolled = latest > 60
      if (prev !== isScrolled) return isScrolled
      return prev
    })

    // Hide/Show logic based on scroll direction
    setHidden(prev => {
      const isHidden = latest > 150 && latest > previous
      if (prev !== isHidden) return isHidden
      return prev
    })
  })

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-250%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-4 lg:top-8 left-0 right-0 z-50 px-4 lg:px-12 pointer-events-none"
      >
        <div 
          className={`mx-auto w-full max-w-[1800px] rounded-[2.5rem] lg:rounded-full transition-all duration-500 ease-out pointer-events-auto border transform-gpu ${
            scrolled 
              ? 'bg-[#0a0a0a]/80 backdrop-blur-lg border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.15)] py-4 px-6 lg:px-10' 
              : 'bg-[#0a0a0a]/40 backdrop-blur-md border-white/[0.04] py-5 px-6 lg:px-10'
          }`}
        >
          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <Link to="/" className="flex flex-col leading-none group">
              <img 
                src="/logos/SECONDARY LOGO.png" 
                alt="ReForm Fitness" 
                className="h-[46px] w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
                fetchpriority="high"
                decoding="async"
              />
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white p-2 hover:text-[#E8B884] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between w-full relative min-h-[50px]">
            
            {/* Left Links */}
            <div className="flex-1 flex items-center justify-start gap-10 xl:gap-14 pl-2 lg:pl-6">
              {navLinks.slice(0, 3).map((link) => (
                <NavLink key={link.href} to={link.href}>
                  {({ isActive }) => (
                    <div className={`text-[0.7rem] xl:text-[0.75rem] tracking-[0.25em] uppercase font-medium transition-colors duration-500 relative py-2 group cursor-pointer ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                      {link.label}
                      <span className={`absolute bottom-0 left-0 h-[1px] bg-green-brand transition-all duration-500 ease-out transform-gpu ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Links */}
            <div className="flex-1 flex items-center justify-end gap-10 xl:gap-14 pr-2 lg:pr-6">
              {navLinks.slice(3).map((link) => (
                <NavLink key={link.href} to={link.href}>
                  {({ isActive }) => (
                    <div className={`text-[0.7rem] xl:text-[0.75rem] tracking-[0.25em] uppercase font-medium transition-colors duration-500 relative py-2 group cursor-pointer ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                      {link.label}
                      <span className={`absolute bottom-0 left-0 h-[1px] bg-green-brand transition-all duration-500 ease-out transform-gpu ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Absolute Centered Logo overlapping the top edge */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 -top-8 xl:-top-10 z-10 group drop-shadow-2xl">
              <img 
                src="/logos/primary-logo.png" 
                alt="ReForm Fitness" 
                className="h-[4.5rem] xl:h-[5.5rem] w-auto opacity-95 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 transform-gpu" 
                fetchpriority="high"
                decoding="async"
              />
            </Link>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#231F20]"
          >
            <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-10 flex-shrink-0">
                <Link to="/" className="flex flex-col leading-none relative z-10"
                  onClick={() => setMenuOpen(false)}
                >
                  <img src="/logos/SECONDARY LOGO.png" alt="ReForm Fitness" className="h-[46px] w-auto opacity-90" />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:text-[#E8B884] transition-colors p-2"
                  aria-label="Close menu"
                >
                  <X size={32} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-8 flex-1 justify-center">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={link.href}
                      className="text-4xl sm:text-5xl font-light text-white hover:text-green-brand transition-colors duration-300 block border-b border-white/10 pb-6"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pb-8"
              >
                <Link
                  to="/consultation"
                  className="w-full flex items-center justify-center gap-3 py-5 bg-[#E8B884] hover:bg-green-brand text-[#231F20] hover:text-white transition-colors duration-500 text-sm font-semibold tracking-[0.2em] uppercase rounded-sm"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
