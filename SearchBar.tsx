import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Link } from 'wouter'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useUser } from '@/contexts/UserContext'

export function SearchBar() {
  const { toast } = useToast()
  const { userSettings, updateSettings } = useUser()
  const [isConnecting, setIsConnecting] = useState(false)
  
  const handleProxyToggle = (enabled: boolean) => {
    setIsConnecting(true)
    
    // Simulate connection delay
    setTimeout(() => {
      updateSettings({ proxyEnabled: enabled })
      
      toast({
        title: enabled ? 'Proxy Connected' : 'Proxy Disconnected',
        description: enabled 
          ? 'You are now browsing through the MoonLight GX secure network' 
          : 'You are now browsing without proxy protection',
        duration: 3000,
      })
      
      setIsConnecting(false)
    }, 800)
  }
  
  return (
    <div className="relative max-w-2xl mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-md"></div>
      <div className="relative bg-card/50 backdrop-blur-sm rounded-lg flex items-center justify-between overflow-hidden border border-border/30 py-2 px-4">
        <div className="flex items-center">
          <div className="mr-3 text-primary">
            <i className="fas fa-shield-alt text-lg"></i>
          </div>
          <div>
            <div className="font-medium">MoonLight Proxy</div>
            <div className="text-xs text-muted-foreground">Enhanced gaming access with low latency</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant={userSettings?.proxyEnabled ? "default" : "outline"} className={userSettings?.proxyEnabled ? "bg-green-500/80" : ""}>
            {isConnecting 
              ? 'Connecting...' 
              : (userSettings?.proxyEnabled ? 'Connected' : 'Disconnected')}
          </Badge>
          
          <Switch 
            checked={userSettings?.proxyEnabled}
            onCheckedChange={handleProxyToggle}
            disabled={isConnecting}
            className="data-[state=checked]:bg-green-500"
          />
          
          <Link href="/proxy" className="ml-2">
            <Button variant="outline" size="sm">
              <i className="fas fa-sliders-h mr-2"></i>
              Configure
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
