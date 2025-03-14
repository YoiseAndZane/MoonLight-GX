import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/contexts/UserContext'

interface QuickAccessSite {
  id: string
  name: string
  url: string
  icon: string
}

const defaultSites: QuickAccessSite[] = [
  { id: '1', name: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube' },
  { id: '2', name: 'Twitch', url: 'https://twitch.tv', icon: 'fab fa-twitch' },
  { id: '3', name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
  { id: '4', name: 'Amazon', url: 'https://amazon.com', icon: 'fab fa-amazon' },
  { id: '5', name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
]

export function QuickAccessTiles() {
  const { toast } = useToast()
  const { quickAccessSites, setQuickAccessSites } = useUser()
  const [sites, setSites] = useState<QuickAccessSite[]>([])
  
  useEffect(() => {
    // If user has saved sites, use those, otherwise use defaults
    setSites(quickAccessSites.length > 0 ? quickAccessSites : defaultSites)
  }, [quickAccessSites])
  
  const handleSiteClick = (url: string) => {
    window.open(url, '_blank')
  }
  
  const handleAddNew = () => {
    toast({
      title: "Add New Site",
      description: "This feature will be available soon!",
      duration: 3000,
    })
  }
  
  return (
    <div className="mb-12">
      <h2 className="font-orbitron text-xl font-medium mb-4 flex items-center">
        <i className="fas fa-bolt text-primary mr-2"></i>
        Quick Access
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sites.map((site) => (
          <a 
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.preventDefault(); handleSiteClick(site.url); }}
            className="group"
          >
            <div className="aspect-square bg-card/50 rounded-lg flex flex-col items-center justify-center p-4 border border-border/20 group-hover:border-primary/60 transition-colors glow-effect">
              <div className="text-3xl mb-3 text-foreground/80 group-hover:text-primary transition-colors">
                <i className={site.icon}></i>
              </div>
              <span className="text-sm font-medium text-foreground/90">{site.name}</span>
            </div>
          </a>
        ))}
        
        <button 
          onClick={handleAddNew}
          className="group"
        >
          <div className="aspect-square bg-card/50 rounded-lg flex flex-col items-center justify-center p-4 border border-border/20 group-hover:border-primary/60 transition-colors glow-effect">
            <div className="text-3xl mb-3 text-foreground/80 group-hover:text-primary transition-colors">
              <i className="fas fa-plus"></i>
            </div>
            <span className="text-sm font-medium text-foreground/90">Add New</span>
          </div>
        </button>
      </div>
    </div>
  )
}
