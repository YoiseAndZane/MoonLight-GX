import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StarBackground } from '@/components/StarBackground';
import { Sidebar } from '@/components/Sidebar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/Footer';
import { THEMES, dispatchThemeChangedEvent, initThemeFromStorage } from '@/lib/themeManager';

interface Theme {
  id: string;
  name: string;
  color: string;
  description: string;
  active: boolean;
}

export default function BrowserToolBox() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('themes');
  
  // Themes data with descriptions
  const [themes, setThemes] = useState<Theme[]>(
    THEMES.map(theme => ({
      ...theme,
      description: getThemeDescription(theme.name),
      active: false
    }))
  );
  
  // Function to get theme descriptions
  function getThemeDescription(themeName: string): string {
    switch(themeName) {
      case 'Cyber Neon':
        return 'A futuristic and glowing aesthetic with neon-colored elements and highlights.';
      case 'Dark Matter':
        return 'A sleek and mysterious dark mode theme with deep blacks and subtle metallic elements.';
      case 'BloodMoonLight':
        return 'A red-tinted, intense theme with shades of crimson and black in pulsating gradients.';
      case 'The True MoonLight':
        return 'An elegant moonlit atmosphere, blending starry skies with smooth, glowing elements.';
      default:
        return 'A custom theme with unique visual elements.';
    }
  }
  
  // Initialize active theme from storage
  useEffect(() => {
    const savedThemeId = localStorage.getItem('moonlight_theme') || '1';
    setThemes(current => 
      current.map(theme => ({
        ...theme,
        active: theme.id === savedThemeId
      }))
    );
  }, []);
  
  // Function to activate a theme
  const activateTheme = (themeId: string) => {
    // Update local state
    setThemes(themes.map(theme => ({
      ...theme,
      active: theme.id === themeId
    })));
    
    // Apply theme using the theme manager
    dispatchThemeChangedEvent(themeId);
    
    const selectedTheme = themes.find(t => t.id === themeId);
    if (selectedTheme) {
      toast({
        title: "Theme activated",
        description: `Theme has been changed to ${selectedTheme.name}`,
      });
    }
  };
  
  return (
    <div className="min-h-screen">
      <StarBackground />
      
      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1 pl-16 md:pl-20">
          <div className="container mx-auto px-4 py-8">
            <h1 className="font-orbitron text-3xl font-bold mb-6 text-gradient">Browser ToolBox</h1>
            
            <Tabs defaultValue="themes" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-card/50">
                <TabsTrigger value="themes">Visual Themes</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="addons">Add-ons</TabsTrigger>
              </TabsList>
              
              {/* Themes Tab */}
              <TabsContent value="themes" className="space-y-6">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20">
                  <CardHeader className="pb-2">
                    <CardTitle>Visual Themes</CardTitle>
                    <CardDescription>Transform your browsing experience with these immersive themes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {themes.map((theme) => (
                        <div 
                          key={theme.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            theme.active 
                              ? 'border-primary shadow-md shadow-primary/20' 
                              : 'border-border hover:border-accent'
                          }`}
                          onClick={() => activateTheme(theme.id)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: theme.color }}
                            />
                            <h3 className="font-medium">{theme.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>
                          <div className="flex gap-1">
                            {theme.active && (
                              <Badge variant="outline" className="bg-primary/10 text-primary">
                                Active
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 border border-dashed border-accent/50 rounded-lg bg-card/20">
                      <h3 className="font-medium mb-2">Theme Effects</h3>
                      <p className="text-sm text-muted-foreground">
                        Themes change the entire browser's color scheme, UI elements, animations, and background effects. 
                        Some themes also adjust contrast levels and may include custom sound effects or animations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-4">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20">
                  <CardHeader className="pb-2">
                    <CardTitle>Performance Tools</CardTitle>
                    <CardDescription>Optimize your browsing experience</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <p className="text-muted-foreground">Performance tools coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Add-ons Tab */}
              <TabsContent value="addons" className="space-y-4">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20">
                  <CardHeader className="pb-2">
                    <CardTitle>Browser Add-ons</CardTitle>
                    <CardDescription>Extend your browser with powerful add-ons</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <p className="text-muted-foreground">Browser add-ons marketplace coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}