import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { StarBackground } from '@/components/StarBackground';
import { Sidebar } from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProxyServer {
  id: string;
  country: string;
  region: string;
  latency: number;
  load: number;
  flagCode: string;
}

export default function ProxyNetwork() {
  const { toast } = useToast();
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [selectedServer, setSelectedServer] = useState('auto');
  const [networkStats, setNetworkStats] = useState({
    totalTraffic: '0 MB',
    activeConnections: 0,
    status: 'Disconnected'
  });
  
  // Proxy server data
  const proxyServers: ProxyServer[] = [
    { id: 'us-east', country: 'United States', region: 'East Coast', latency: 45, load: 62, flagCode: '🇺🇸' },
    { id: 'us-west', country: 'United States', region: 'West Coast', latency: 78, load: 38, flagCode: '🇺🇸' },
    { id: 'eu-central', country: 'Germany', region: 'Central Europe', latency: 112, load: 45, flagCode: '🇩🇪' },
    { id: 'asia-east', country: 'Japan', region: 'East Asia', latency: 145, load: 30, flagCode: '🇯🇵' },
    { id: 'asia-south', country: 'Singapore', region: 'Southeast Asia', latency: 160, load: 25, flagCode: '🇸🇬' },
  ];
  
  const toggleProxy = (enabled: boolean) => {
    setProxyEnabled(enabled);
    
    // Simulate network connection/disconnection
    if (enabled) {
      toast({
        title: 'Proxy Connected',
        description: `Connected to ${selectedServer === 'auto' ? 'fastest available server' : getSelectedServerName()}`,
      });
      
      setNetworkStats({
        totalTraffic: '0 MB',
        activeConnections: 1,
        status: 'Connected'
      });
    } else {
      toast({
        title: 'Proxy Disconnected',
        description: 'You are now browsing without proxy protection',
      });
      
      setNetworkStats({
        totalTraffic: '0 MB',
        activeConnections: 0,
        status: 'Disconnected'
      });
    }
  };
  
  const handleServerChange = (serverId: string) => {
    setSelectedServer(serverId);
    
    if (proxyEnabled) {
      toast({
        title: 'Proxy Server Changed',
        description: `Now connected to ${serverId === 'auto' ? 'fastest available server' : getSelectedServerName()}`,
      });
    }
  };
  
  const getSelectedServerName = () => {
    const server = proxyServers.find(s => s.id === selectedServer);
    return server ? `${server.country} (${server.region})` : 'Unknown Server';
  };
  
  const getLoadClass = (load: number) => {
    if (load < 40) return 'text-green-500';
    if (load < 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getLatencyClass = (latency: number) => {
    if (latency < 80) return 'text-green-500';
    if (latency < 130) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen">
      <StarBackground />
      
      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1 pl-16 md:pl-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-orbitron font-bold text-gradient mb-2">Gaming Proxy Network</h1>
                <p className="text-foreground/70">Enhanced gaming access with MoonLight GX secure network</p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0 space-x-2">
                <Label htmlFor="proxy-toggle" className="font-medium">Network Status:</Label>
                <Switch 
                  id="proxy-toggle" 
                  checked={proxyEnabled}
                  onCheckedChange={toggleProxy}
                  className="data-[state=checked]:bg-green-500"
                />
                <Badge variant={proxyEnabled ? "default" : "outline"} className={proxyEnabled ? "bg-green-500/80" : ""}>
                  {proxyEnabled ? "Connected" : "Disconnected"}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Proxy Server Selection */}
              <div className="md:col-span-2">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20 h-full">
                  <CardHeader>
                    <CardTitle>Select Proxy Region</CardTitle>
                    <CardDescription>Choose a server location to optimize your connection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedServer} onValueChange={handleServerChange} className="space-y-3">
                      <div className="flex items-center space-x-2 rounded-md border p-3 border-accent/30">
                        <RadioGroupItem value="auto" id="auto" />
                        <Label htmlFor="auto" className="flex-1 cursor-pointer font-medium">
                          Automatic (Best Location)
                        </Label>
                        <Badge variant="outline" className="ml-auto">Recommended</Badge>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      {proxyServers.map((server) => (
                        <div key={server.id} className="flex items-center space-x-2 rounded-md border p-3 border-accent/30">
                          <RadioGroupItem value={server.id} id={server.id} />
                          <Label htmlFor={server.id} className="flex-1 cursor-pointer">
                            <div className="font-medium">{server.flagCode} {server.country} - {server.region}</div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <span className={getLatencyClass(server.latency)}>Latency: {server.latency}ms</span>
                              <span className="mx-2">•</span>
                              <span className={getLoadClass(server.load)}>Load: {server.load}%</span>
                            </div>
                          </Label>
                          {server.load < 40 && <Badge variant="outline" className="ml-auto bg-green-500/10 text-green-500 border-green-500/30">Low Traffic</Badge>}
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
              
              {/* Proxy Stats */}
              <div>
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20 h-full">
                  <CardHeader>
                    <CardTitle>Network Statistics</CardTitle>
                    <CardDescription>Real-time proxy network information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <p className="font-medium">
                          <span className={`inline-block h-2 w-2 rounded-full mr-2 ${proxyEnabled ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {networkStats.status}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Current Region</p>
                        <p className="font-medium">
                          {proxyEnabled 
                            ? (selectedServer === 'auto' ? 'Auto-Selected Best Server' : getSelectedServerName())
                            : 'Not Connected'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Data Transfer</p>
                        <p className="font-medium">
                          {networkStats.totalTraffic}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Active Connections</p>
                        <p className="font-medium">
                          {networkStats.activeConnections}
                        </p>
                      </div>
                      
                      <div className="pt-4">
                        <p className="text-xs text-muted-foreground mb-2">Protection Status</p>
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Game Traffic</span>
                            <Badge variant={proxyEnabled ? "default" : "outline"} className={proxyEnabled ? "bg-green-500/80" : ""}>
                              {proxyEnabled ? "Protected" : "Exposed"}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Browser Traffic</span>
                            <Badge variant={proxyEnabled ? "default" : "outline"} className={proxyEnabled ? "bg-green-500/80" : ""}>
                              {proxyEnabled ? "Protected" : "Exposed"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Features explanation */}
            <Card className="bg-card/30 backdrop-blur-sm border-accent/20 mb-8">
              <CardHeader>
                <CardTitle>Gaming Proxy Benefits</CardTitle>
                <CardDescription>Why use MoonLight GX's gaming proxy network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Unrestricted Access</h3>
                    <p className="text-sm text-muted-foreground">Access region-locked games and content without limitations</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Enhanced Privacy</h3>
                    <p className="text-sm text-muted-foreground">Browse and play games with full encryption and privacy protection</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Reduced Latency</h3>
                    <p className="text-sm text-muted-foreground">Optimized routing can provide faster connections to game servers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}