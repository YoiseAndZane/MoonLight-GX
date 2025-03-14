import { useState } from 'react'
import { StarBackground } from '@/components/StarBackground'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useUser } from '@/contexts/UserContext'
import { useToast } from '@/hooks/use-toast'

export default function Settings() {
  const { userSettings, updateSettings } = useUser()
  const { toast } = useToast()
  
  const [settings, setSettings] = useState({
    proxyEnabled: userSettings.proxyEnabled,
    audioEnabled: userSettings.audioEnabled,
    darkThemeEnabled: userSettings.darkThemeEnabled,
    effectsEnabled: userSettings.effectsEnabled,
  })
  
  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] }
      return newSettings
    })
  }
  
  const saveSettings = () => {
    updateSettings(settings)
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated",
      duration: 3000,
    })
  }
  
  return (
    <div className="min-h-screen">
      <StarBackground />
      
      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1 pl-16 md:pl-20">
          <div className="container mx-auto px-4 py-8">
            <div className="py-6 mb-6">
              <h1 className="font-orbitron text-3xl font-bold mb-2">Settings</h1>
              <p className="text-foreground/70">Customize your browsing experience</p>
            </div>
            
            <div className="grid gap-6 mb-12">
              <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-sliders-h text-primary mr-2"></i>
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Proxy</h3>
                      <p className="text-sm text-foreground/50">Browse privately through a secure proxy</p>
                    </div>
                    <Switch 
                      checked={settings.proxyEnabled}
                      onCheckedChange={() => handleToggle('proxyEnabled')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Audio Effects</h3>
                      <p className="text-sm text-foreground/50">Enable sound feedback and effects</p>
                    </div>
                    <Switch 
                      checked={settings.audioEnabled}
                      onCheckedChange={() => handleToggle('audioEnabled')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Theme</h3>
                      <p className="text-sm text-foreground/50">Use dark mode for all screens</p>
                    </div>
                    <Switch 
                      checked={settings.darkThemeEnabled}
                      onCheckedChange={() => handleToggle('darkThemeEnabled')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Visual Effects</h3>
                      <p className="text-sm text-foreground/50">Enable animations and visual effects</p>
                    </div>
                    <Switch 
                      checked={settings.effectsEnabled}
                      onCheckedChange={() => handleToggle('effectsEnabled')}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={saveSettings}>
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
