import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Sidebar } from '@/components/Sidebar';
import { StarBackground } from '@/components/StarBackground';
import { useUser } from '@/contexts/UserContext';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  timestamp: Date;
}



export default function Profile() {
  const { user, userSettings, updateSettings } = useUser();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock history data
  const [history, setHistory] = useState<HistoryItem[]>([
    { 
      id: '1', 
      title: 'MoonLight GX Documentation', 
      url: 'https://docs.moonlightgx.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
    },
    { 
      id: '2', 
      title: 'Gaming News - Latest Updates', 
      url: 'https://gamingnews.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    },
    { 
      id: '3', 
      title: 'YouTube - Game Streaming', 
      url: 'https://youtube.com/gaming',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
    }
  ]);
  
  const clearHistory = () => {
    setHistory([]);
    toast({
      title: "History cleared",
      description: "Your browsing history has been cleared",
    });
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <StarBackground />
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-orbitron mb-6 text-gradient">Your Profile</h1>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-card/50">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card className="bg-card/50 border-accent/20">
                <CardHeader className="pb-2">
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-muted text-xl">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{user?.name || 'Unknown User'}</h3>
                      <p className="text-muted-foreground">@{user?.username || 'username'}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          MoonLight GX User
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="darkTheme">Dark Theme</Label>
                        <p className="text-sm text-muted-foreground">Enable dark theme for MoonLight GX</p>
                      </div>
                      <Switch 
                        id="darkTheme" 
                        checked={userSettings?.darkThemeEnabled}
                        onCheckedChange={(checked) => updateSettings({ darkThemeEnabled: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="effects">Visual Effects</Label>
                        <p className="text-sm text-muted-foreground">Enable visual effects and animations</p>
                      </div>
                      <Switch 
                        id="effects" 
                        checked={userSettings?.effectsEnabled}
                        onCheckedChange={(checked) => updateSettings({ effectsEnabled: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="audioEnabled">Audio</Label>
                        <p className="text-sm text-muted-foreground">Enable audio effects and background music</p>
                      </div>
                      <Switch 
                        id="audioEnabled" 
                        checked={userSettings?.audioEnabled}
                        onCheckedChange={(checked) => updateSettings({ audioEnabled: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history" className="space-y-4">
              <Card className="bg-card/50 border-accent/20">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Browsing History</CardTitle>
                    <CardDescription>Your recent browsing activity</CardDescription>
                  </div>
                  <Button variant="destructive" size="sm" onClick={clearHistory}>
                    Clear History
                  </Button>
                </CardHeader>
                <CardContent>
                  {history.length > 0 ? (
                    <div className="space-y-4">
                      {history.map((item) => (
                        <div key={item.id} className="flex justify-between p-2 hover:bg-muted/50 rounded-md">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.url}</p>
                          </div>
                          <time className="text-sm text-muted-foreground">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </time>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No browsing history available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            

            
            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card className="bg-card/50 border-accent/20">
                <CardHeader className="pb-2">
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="proxy">Proxy Service</Label>
                        <p className="text-sm text-muted-foreground">Route traffic through MoonLight GX proxy</p>
                      </div>
                      <Switch 
                        id="proxy" 
                        checked={userSettings?.proxyEnabled}
                        onCheckedChange={(checked) => updateSettings({ proxyEnabled: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cookies">Cookie Blocker</Label>
                        <p className="text-sm text-muted-foreground">Block third-party cookies</p>
                      </div>
                      <Switch id="cookies" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="tracking">Tracking Protection</Label>
                        <p className="text-sm text-muted-foreground">Block known trackers and analytics</p>
                      </div>
                      <Switch id="tracking" />
                    </div>
                    
                    <div className="mt-4">
                      <Button className="w-full">Change Password</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}