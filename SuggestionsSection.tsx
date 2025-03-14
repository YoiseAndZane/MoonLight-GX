import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface SuggestionLink {
  name: string
  url: string
}

interface Suggestion {
  id: string
  title: string
  description: string
  icon: string
  links: SuggestionLink[]
}

const initialSuggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Latest Tech News',
    description: 'Discover the newest developments in AI, quantum computing, and space technology.',
    icon: 'fa-newspaper',
    links: [
      { name: 'TechCrunch', url: 'https://techcrunch.com' },
      { name: 'Wired', url: 'https://wired.com' },
      { name: 'The Verge', url: 'https://theverge.com' },
    ]
  },
  {
    id: '2',
    title: 'Learn Something New',
    description: 'Expand your knowledge with these educational resources and online courses.',
    icon: 'fa-graduation-cap',
    links: [
      { name: 'Coursera', url: 'https://coursera.org' },
      { name: 'Khan Academy', url: 'https://khanacademy.org' },
      { name: 'MIT OpenCourseware', url: 'https://ocw.mit.edu' },
    ]
  },
  {
    id: '3',
    title: 'Developer Resources',
    description: 'Useful tools and references for coders and web developers.',
    icon: 'fa-code',
    links: [
      { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
      { name: 'GitHub', url: 'https://github.com' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
    ]
  },
]

export function SuggestionsSection() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions)
  const { toast } = useToast()
  
  const handleRefresh = () => {
    toast({
      title: "Refreshing suggestions",
      description: "Finding new content for you...",
      duration: 2000,
    })
    
    // In a real implementation, we would fetch new suggestions from the API
    // For now, we'll just shuffle the existing ones
    setSuggestions([...suggestions].sort(() => Math.random() - 0.5))
  }
  
  const openLink = (url: string) => {
    window.open(url, '_blank')
  }
  
  return (
    <div className="lg:col-span-2">
      <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/30 h-full">
        <div className="px-5 py-4 border-b border-border/30 flex justify-between items-center">
          <h2 className="font-orbitron text-xl font-medium flex items-center">
            <i className="fas fa-sparkles text-primary mr-2"></i>
            Suggestions
          </h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRefresh}
            className="text-sm text-foreground/60 hover:text-primary"
          >
            Refresh
          </Button>
        </div>
        
        <div className="p-5 space-y-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="rounded-lg bg-secondary/10 p-4 border border-border/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-md bg-secondary/30 flex items-center justify-center text-primary flex-shrink-0">
                  <i className={`fas ${suggestion.icon}`}></i>
                </div>
                <div>
                  <h3 className="font-medium mb-1">{suggestion.title}</h3>
                  <p className="text-sm text-foreground/70 mb-2">{suggestion.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.links.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => openLink(link.url)}
                        className="text-xs px-2 py-1 rounded bg-secondary/20 text-primary hover:bg-secondary/40 transition-colors"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
