import { useEffect, useRef, useState } from 'react'

interface Star {
  id: number
  size: number
  top: number
  left: number
  delay: number
  duration: number
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const generateStars = () => {
      const isMobile = window.innerWidth < 768
      const starCount = isMobile ? 100 : 200
      const newStars: Star[] = []
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 2 + 1,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2
        })
      }
      
      setStars(newStars)
    }
    
    generateStars()
    
    // Regenerate stars on window resize
    const handleResize = () => {
      generateStars()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full opacity-20 animate-twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  )
}
