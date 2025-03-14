import { useState, useEffect } from 'react'
import { formatDate, formatTime } from '@/lib/utils'
import { useUser } from '@/contexts/UserContext'

export function GreetingHeader() {
  const { user } = useUser()
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()))
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()))
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(formatTime(now))
      setCurrentDate(formatDate(now))
    }
    
    // Update initially and then every minute
    updateDateTime()
    const intervalId = setInterval(updateDateTime, 60000)
    
    return () => clearInterval(intervalId)
  }, [])
  
  return (
    <div className="py-6 mb-6">
      <div className="flex flex-col items-center mb-6">
        <h1 className="font-orbitron text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-2 tracking-wide">
          MOONLIGHT GX
        </h1>
        <div className="w-40 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
      </div>
      
      <div className="relative inline-block animated-border">
        <h2 className="font-orbitron text-2xl md:text-4xl font-bold mb-2">
          Welcome back, <span className="text-gradient">{user?.name || 'Gamer'}</span>
        </h2>
      </div>
      <p className="text-foreground/70 text-sm md:text-base">
        <span>{currentTime}</span> · <span>{currentDate}</span>
      </p>
    </div>
  )
}
