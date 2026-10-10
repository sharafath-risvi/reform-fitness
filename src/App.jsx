import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import TrainersPage from './pages/TrainersPage'
import ConsultationPage from './pages/ConsultationPage'
import ContactPage from './pages/ContactPage'
import WhatsAppFloat from './components/ui/WhatsAppFloat'
import ScrollProgress from './components/ui/ScrollProgress'

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence 
      mode="wait"
      onExitComplete={() => {
        window.scrollTo(0, 0)
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true })
        }
        ScrollTrigger.refresh()
      }}
    >
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger)

// Force redirect to Home on any page refresh
if (typeof window !== 'undefined' && window.performance) {
  const navEntries = window.performance.getEntriesByType('navigation')
  const isReload = navEntries.length > 0 && navEntries[0].type === 'reload'
  const isDeprecatedReload = window.performance.navigation && window.performance.navigation.type === 1
  
  if (isReload || isDeprecatedReload) {
    if (window.location.pathname !== '/') {
      window.location.replace('/')
    }
  }
}

export default function App() {
  useLayoutEffect(() => {
    // Always start at the top on page load / refresh.
    // 'manual' prevents the browser from restoring the previous scroll
    // position, which would fight with GSAP's pinned sections.
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    window.lenis = lenis
    window.lenis.scrollTo(0, { immediate: true })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      window.lenis = null
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollProgress />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  )
}
