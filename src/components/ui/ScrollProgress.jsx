import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={progressRef}
      className="scroll-progress"
      style={{ transformOrigin: 'left' }}
    />
  )
}
