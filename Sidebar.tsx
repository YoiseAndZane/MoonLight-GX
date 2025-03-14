import { Link, useLocation } from 'wouter'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: 'fa-home', label: 'Home', path: '/' },
  { icon: 'fa-shield-alt', label: 'Proxy', path: '/proxy' },
  { icon: 'fa-gamepad', label: 'Games', path: '/games' },
  { icon: 'fa-tools', label: 'ToolBox', path: '/toolbox' },
  { icon: 'fa-robot', label: 'AI Assistant', path: '/assistant' },
  { icon: 'fa-cog', label: 'Settings', path: '/settings' },
  { icon: 'fa-code', label: 'Developer', path: '/developer' },
]

export function Sidebar() {
  const [location] = useLocation()
  
  return (
    <div className="fixed top-0 left-0 h-full w-16 md:w-20 bg-opacity-80 backdrop-blur-md z-10 flex flex-col items-center py-6 border-r border-border/30 bg-[#1a1a2e]">
      <div className="mb-10">
        <Link href="/">
          <div className="w-10 h-10 relative animate-float block cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-80 blur"></div>
            <div className="absolute inset-0 rounded-full bg-background flex items-center justify-center">
              <span className="font-orbitron text-xl font-bold text-gradient">M</span>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="space-y-8 flex flex-col items-center flex-1">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group glow-effect cursor-pointer",
              location === item.path 
                ? "bg-secondary/40 text-primary" 
                : "bg-secondary/10 text-foreground/60 hover:text-primary hover:bg-secondary/40"
            )}>
              <i className={`fas ${item.icon} text-lg group-hover:scale-110 transition-transform`}></i>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-auto">
        <Link href="/profile">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-secondary/40 transition-all duration-300 group glow-effect cursor-pointer">
            <i className="fas fa-user text-lg group-hover:scale-110 transition-transform"></i>
          </div>
        </Link>
      </div>
    </div>
  )
}
