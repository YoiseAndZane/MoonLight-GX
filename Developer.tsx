import { useState } from 'react';
import { StarBackground } from '@/components/StarBackground';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Developer() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('tools');
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: "Developer Feature",
      description: `${feature} feature coming soon!`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen">
      <StarBackground />
      
      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1 pl-16 md:pl-20">
          <div className="container mx-auto px-4 py-8">
            <div className="py-6 mb-6">
              <h1 className="font-orbitron text-3xl font-bold text-gradient mb-2">Dev Headquarters</h1>
              <p className="text-foreground/70">Meet the team behind MoonLight GX and explore developer tools</p>
            </div>
            
            <Tabs 
              defaultValue="tools" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="bg-card/50">
                <TabsTrigger value="tools">Developer Tools</TabsTrigger>
                <TabsTrigger value="yoise">About Yoise</TabsTrigger>
                <TabsTrigger value="zane">About Zane</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tools" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <i className="fas fa-terminal text-primary mr-2"></i>
                        Console
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-4">
                        Access browser console and run JavaScript commands
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => handleFeatureClick('Console')}
                        className="w-full"
                      >
                        Open Console
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <i className="fas fa-network-wired text-primary mr-2"></i>
                        Network Monitor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-4">
                        Track network requests and analyze performance
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => handleFeatureClick('Network Monitor')}
                        className="w-full"
                      >
                        Open Network Monitor
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <i className="fas fa-code text-primary mr-2"></i>
                        Element Inspector
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-4">
                        Inspect and modify page elements
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => handleFeatureClick('Element Inspector')}
                        className="w-full"
                      >
                        Open Inspector
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <i className="fas fa-bug text-primary mr-2"></i>
                        Debugger
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-4">
                        Set breakpoints and debug JavaScript
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => handleFeatureClick('Debugger')}
                        className="w-full"
                      >
                        Open Debugger
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="yoise" className="space-y-6">
                <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      <Avatar className="h-20 w-20 md:h-32 md:w-32 border-2 border-primary">
                        <AvatarFallback className="bg-primary/20 text-2xl">Y</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl font-orbitron text-gradient">About the Owner: Yoise</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="border-primary/50 bg-primary/10">
                            Owner & Founder
                          </Badge>
                          <Badge variant="outline" className="border-secondary/50 bg-secondary/10">
                            Bedrock Wormhole Exploiter
                          </Badge>
                          <Badge variant="outline" className="border-accent/50 bg-accent/10">
                            YoiseplaysYT
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed">
                      Hello! I'm Yoise, the Owner and Founder of MoonLight GX. Some of you may know me as the Bedrock Wormhole Exploiter or from my YouTube channel, YoiseplaysYT.
                    </p>
                    <p className="leading-relaxed">
                      So, why did I start this project? Well, I was inspired by Amp (the owner of DDX, or DayDream X) and the innovative work done in that space. MoonLight X and MoonLight GX are the result of my desire to create a customizable, high-performance browser that bypasses network restrictions while providing an immersive, enjoyable experience—especially for gamers.
                    </p>
                    <p className="leading-relaxed">
                      Even though my school admins have tried their best to block my efforts, we've come too far to give up now. With every update, MoonLight GX gets better, faster, and more feature-packed than ever.
                    </p>
                    
                    <div className="pt-4">
                      <h3 className="font-medium text-lg mb-2">Projects</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-md border border-accent/30 bg-card/50">
                          <h4 className="font-medium">MoonLight X</h4>
                          <p className="text-sm text-muted-foreground">The original browser project</p>
                        </div>
                        <div className="p-3 rounded-md border border-accent/30 bg-card/50">
                          <h4 className="font-medium">MoonLight GX</h4>
                          <p className="text-sm text-muted-foreground">Gaming-focused browser experience</p>
                        </div>
                        <div className="p-3 rounded-md border border-accent/30 bg-card/50">
                          <h4 className="font-medium">Mystical SMP</h4>
                          <p className="text-sm text-muted-foreground">Original owner during Season 0-0.1</p>
                        </div>
                        <div className="p-3 rounded-md border border-accent/30 bg-card/50">
                          <h4 className="font-medium">YoiseplaysYT</h4>
                          <p className="text-sm text-muted-foreground">YouTube gaming channel</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="zane" className="space-y-6">
                <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      <Avatar className="h-20 w-20 md:h-32 md:w-32 border-2 border-secondary">
                        <AvatarFallback className="bg-secondary/20 text-2xl">Z</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl font-orbitron text-gradient">About Zane</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="border-secondary/50 bg-secondary/10">
                            Co-Owner
                          </Badge>
                          <Badge variant="outline" className="border-destructive/50 bg-destructive/10">
                            Mystical SMP Owner
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed">
                      HOI! I'm ZANE!!!!!! I'm Yoise's brother, and honestly, he kinda pulled me into this whole MoonLight GX project. He was the one who taught me how to code—from using those educational coding sites all the way to building projects on Replit. Now, I'm proud to be the Co-Owner of MoonLight GX, working alongside Yoise to make this browser even more powerful and customizable.
                    </p>
                    <p className="leading-relaxed">
                      On top of that, I'm also the Owner of Mystical SMP—Seasons 1-4 (with Yoise being the original owner during Season 0-0.1). It's been an awesome journey, and I'm looking forward to what's next for both MoonLight GX and Mystical SMP!
                    </p>
                    
                    <div className="pt-4">
                      <h3 className="font-medium text-lg mb-2">Contributions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-md border border-accent/30 bg-card/50">
                          <h4 className="font-medium">MoonLight GX Co-Owner</h4>
                          <p className="text-sm text-muted-foreground">Browser development and design</p>
                        </div>
                        <div className="p-3 rounded-md border border-accent/30 bg-card/50">
                          <h4 className="font-medium">Mystical SMP Owner</h4>
                          <p className="text-sm text-muted-foreground">Seasons 1-4 management</p>
                        </div>
                        <div className="p-3 rounded-md border border-accent/30 bg-card/50">
                          <h4 className="font-medium">Feature Development</h4>
                          <p className="text-sm text-muted-foreground">MoonLight GX customization features</p>
                        </div>
                        <div className="p-3 rounded-md border border-accent/30 bg-card/50">
                          <h4 className="font-medium">Community Support</h4>
                          <p className="text-sm text-muted-foreground">User assistance and feedback</p>
                        </div>
                      </div>
                    </div>
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
