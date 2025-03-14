import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/contexts/UserContext'

interface ControlOption {
  id: string
  name: string
  description: string
  icon: string
  value: boolean
  key: 'proxyEnabled' | 'audioEnabled' | 'darkThemeEnabled' | 'effectsEnabled'
}

export function ControlsSection() {
  const { toast } = useToast()
  const { userSettings, updateSettings } = useUser()
  
  const [controls, setControls] = useState<ControlOption[]>([
    { 
      id: '1', 
      name: 'Proxy', 
      description: 'Browse privately', 
      icon: 'fa-shield-alt', 
      value: userSettings.proxyEnabled,
      key: 'proxyEnabled'
    },
    { 
      id: '2', 
      name: 'Audio', 
      description: 'Enable sound effects', 
      icon: 'fa-volume-up', 
      value: userSettings.audioEnabled,
      key: 'audioEnabled'
    },
    { 
      id: '3', 
      name: 'Dark Theme', 
      description: 'Adjust appearance', 
      icon: 'fa-moon', 
      value: userSettings.darkThemeEnabled,
      key: 'darkThemeEnabled'
    },
    { 
      id: '4', 
      name: 'Effects', 
      description: 'Animation and visual effects', 
      icon: 'fa-paint-brush', 
      value: userSettings.effectsEnabled,
      key: 'effectsEnabled'
    },
  ])
  
  useEffect(() => {
    // Update controls when user settings change
    setControls(controls.map(control => ({
      ...control,
      value: userSettings[control.key]
    })))
  }, [userSettings])
  
  const toggleControl = (id: string) => {
    const updatedControls = controls.map(control => {
      if (control.id === id) {
        // Update the user settings
        updateSettings({ [control.key]: !control.value })
        
        toast({
          title: `${control.name} ${!control.value ? 'Enabled' : 'Disabled'}`,
          duration: 2000,
        })
        
        return {
          ...control,
          value: !control.value
        }
      }
      return control
    })
    
    setControls(updatedControls)
  }
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-border/30">
          <h2 className="font-orbitron text-xl font-medium flex items-center">
            <i className="fas fa-sliders-h text-primary mr-2"></i>
            Controls
          </h2>
        </div>
        
        <div className="divide-y divide-border/20">
          {controls.map((option) => (
            <div key={option.id} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-md bg-secondary/20 flex items-center justify-center text-primary">
                  <i className={`fas ${option.icon}`}></i>
                </div>
                <div>
                  <div className="font-medium">{option.name}</div>
                  <div className="text-xs text-foreground/50">{option.description}</div>
                </div>
              </div>
              
              <Switch
                checked={option.value}
                onCheckedChange={() => toggleControl(option.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
