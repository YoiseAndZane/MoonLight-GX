import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface ProxyServer {
  id: string;
  country: string;
  region: string;
  latency: number;
  load: number;
  flagCode: string;
  downloadSpeed: number;
  uploadSpeed: number;
  isRotating?: boolean;
  isEncrypted?: boolean;
}

export default function ProxyNetwork() {
  const { toast } = useToast();
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [selectedServer, setSelectedServer] = useState('auto');
  const [activeTab, setActiveTab] = useState('regions');
  const [rotatingProxies, setRotatingProxies] = useState(false);
  const [highAnonymity, setHighAnonymity] = useState(false);
  const [encryptedProxy, setEncryptedProxy] = useState(true);
  const [dnsProtection, setDnsProtection] = useState(true);
  const [proxyUsername, setProxyUsername] = useState('');
  const [proxyPassword, setProxyPassword] = useState('');
  const [authEnabled, setAuthEnabled] = useState(false);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [isSpeedTesting, setIsSpeedTesting] = useState(false);
  const [speedTestProgress, setSpeedTestProgress] = useState(0);
  
  // Network statistics
  const [networkStats, setNetworkStats] = useState({
    totalTraffic: '0 MB',
    activeConnections: 0,
    status: 'Disconnected',
    blockedAttempts: 0,
    bypassedGeoRestrictions: 0
  });
  
  // Exceptions and app routing
  const [exceptions, setExceptions] = useState<string[]>([
    'spotify.com', 'netflix.com', 'local.network'
  ]);
  const [newException, setNewException] = useState('');
  
  // Blocked sites (simulated data)
  const [blockedSites, setBlockedSites] = useState<{site: string, timestamp: Date}[]>([
    { site: 'restricted-content.com', timestamp: new Date() },
    { site: 'school-blocked-site.edu', timestamp: new Date(Date.now() - 1000 * 60 * 5) }
  ]);
  
  // Proxy server data
  const [proxyServers, setProxyServers] = useState<ProxyServer[]>([
    { 
      id: 'us-east', 
      country: 'United States', 
      region: 'East Coast', 
      latency: 45, 
      load: 62, 
      flagCode: '🇺🇸',
      downloadSpeed: 87,
      uploadSpeed: 35,
      isRotating: true,
      isEncrypted: true
    },
    { 
      id: 'us-west', 
      country: 'United States', 
      region: 'West Coast', 
      latency: 78, 
      load: 38, 
      flagCode: '🇺🇸',
      downloadSpeed: 92,
      uploadSpeed: 42,
      isRotating: false,
      isEncrypted: true
    },
    { 
      id: 'eu-central', 
      country: 'Germany', 
      region: 'Central Europe', 
      latency: 112, 
      load: 45, 
      flagCode: '🇩🇪',
      downloadSpeed: 76,
      uploadSpeed: 38,
      isRotating: true,
      isEncrypted: true
    },
    { 
      id: 'asia-east', 
      country: 'Japan', 
      region: 'East Asia', 
      latency: 145, 
      load: 30, 
      flagCode: '🇯🇵',
      downloadSpeed: 65,
      uploadSpeed: 28,
      isRotating: false,
      isEncrypted: true
    },
    { 
      id: 'asia-south', 
      country: 'Singapore', 
      region: 'Southeast Asia', 
      latency: 160, 
      load: 25, 
      flagCode: '🇸🇬',
      downloadSpeed: 58,
      uploadSpeed: 22,
      isRotating: true,
      isEncrypted: true
    },
    { 
      id: 'uk-london', 
      country: 'United Kingdom', 
      region: 'London', 
      latency: 95, 
      load: 55, 
      flagCode: '🇬🇧',
      downloadSpeed: 82,
      uploadSpeed: 36,
      isRotating: false,
      isEncrypted: true
    },
    { 
      id: 'canada', 
      country: 'Canada', 
      region: 'Toronto', 
      latency: 68, 
      load: 42, 
      flagCode: '🇨🇦',
      downloadSpeed: 88,
      uploadSpeed: 40,
      isRotating: true,
      isEncrypted: true
    },
    { 
      id: 'australia', 
      country: 'Australia', 
      region: 'Sydney', 
      latency: 210, 
      load: 28, 
      flagCode: '🇦🇺',
      downloadSpeed: 54,
      uploadSpeed: 20,
      isRotating: false,
      isEncrypted: true
    },
  ]);
  
  // Traffic data for charts
  const [dataUsage, setDataUsage] = useState({
    used: 0,
    total: 5000, // 5GB
  });
  
  // Run a simulated proxy connection
  useEffect(() => {
    if (proxyEnabled) {
      const timer = setInterval(() => {
        setDataUsage(prev => {
          const newUsed = prev.used + Math.random() * 2;
          return { ...prev, used: newUsed > prev.total ? prev.total : newUsed };
        });
        
        setNetworkStats(prev => ({
          ...prev,
          totalTraffic: `${(dataUsage.used / 1000).toFixed(2)} GB`,
          activeConnections: Math.floor(Math.random() * 3) + 1,
        }));
      }, 3000);
      
      return () => clearInterval(timer);
    }
  }, [proxyEnabled, dataUsage.used]);
  
  // Function to toggle proxy connection
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
        status: 'Connected',
        blockedAttempts: 0,
        bypassedGeoRestrictions: 0
      });
      
      // Reset data usage on new connection
      setDataUsage(prev => ({ ...prev, used: 0 }));
    } else {
      toast({
        title: 'Proxy Disconnected',
        description: 'You are now browsing without proxy protection',
      });
      
      setNetworkStats({
        totalTraffic: '0 MB',
        activeConnections: 0,
        status: 'Disconnected',
        blockedAttempts: 0,
        bypassedGeoRestrictions: 0
      });
    }
  };
  
  // Function to handle server selection
  const handleServerChange = (serverId: string) => {
    setSelectedServer(serverId);
    
    if (proxyEnabled) {
      toast({
        title: 'Proxy Server Changed',
        description: `Now connected to ${serverId === 'auto' ? 'fastest available server' : getSelectedServerName()}`,
      });
    }
  };
  
  // Function to get server name from ID
  const getSelectedServerName = () => {
    const server = proxyServers.find(s => s.id === selectedServer);
    return server ? `${server.country} (${server.region})` : 'Unknown Server';
  };
  
  // Function to get CSS class based on load
  const getLoadClass = (load: number) => {
    if (load < 40) return 'text-green-500';
    if (load < 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Function to get CSS class based on latency
  const getLatencyClass = (latency: number) => {
    if (latency < 80) return 'text-green-500';
    if (latency < 130) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Function to add a new exception to the list
  const addException = () => {
    if (newException && !exceptions.includes(newException)) {
      setExceptions([...exceptions, newException]);
      setNewException('');
      toast({
        title: 'Exception Added',
        description: `${newException} added to proxy exceptions`,
      });
    }
  };
  
  // Function to remove an exception from the list
  const removeException = (site: string) => {
    setExceptions(exceptions.filter(e => e !== site));
    toast({
      title: 'Exception Removed',
      description: `${site} removed from proxy exceptions`,
    });
  };
  
  // Function to simulate a speed test
  const runSpeedTest = () => {
    setIsSpeedTesting(true);
    setSpeedTestProgress(0);
    
    const interval = setInterval(() => {
      setSpeedTestProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsSpeedTesting(false);
          
          // Update proxy server speeds with simulated results
          setProxyServers(servers => 
            servers.map(server => ({
              ...server,
              downloadSpeed: Math.floor(Math.random() * 50) + 50,
              uploadSpeed: Math.floor(Math.random() * 30) + 20,
              latency: Math.floor(Math.random() * 200) + 30,
            }))
          );
          
          toast({
            title: 'Speed Test Completed',
            description: 'Network performance data has been updated',
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
  };
  
  // Function to simulate setting up authentication
  const setupAuthentication = () => {
    if (proxyUsername && proxyPassword) {
      setAuthEnabled(true);
      toast({
        title: 'Proxy Authentication Enabled',
        description: 'Your proxy connection is now secured with authentication',
      });
    } else {
      toast({
        title: 'Authentication Error',
        description: 'Please enter both username and password',
        variant: 'destructive'
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
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
                <TabsTrigger value="regions">Regions</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="speed">Speed Test</TabsTrigger>
                <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              {/* Regions Tab */}
              <TabsContent value="regions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          
                          <div className="max-h-[500px] overflow-y-auto pr-1 space-y-3">
                            {proxyServers.map((server) => (
                              <div key={server.id} className="flex items-center space-x-2 rounded-md border p-3 border-accent/30">
                                <RadioGroupItem value={server.id} id={server.id} />
                                <Label htmlFor={server.id} className="flex-1 cursor-pointer">
                                  <div className="font-medium">{server.flagCode} {server.country} - {server.region}</div>
                                  <div className="flex items-center flex-wrap text-xs text-muted-foreground mt-1">
                                    <span className={getLatencyClass(server.latency)}>Latency: {server.latency}ms</span>
                                    <span className="mx-2">•</span>
                                    <span className={getLoadClass(server.load)}>Load: {server.load}%</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-blue-400">Down: {server.downloadSpeed} Mbps</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-purple-400">Up: {server.uploadSpeed} Mbps</span>
                                  </div>
                                </Label>
                                <div className="flex flex-col items-end space-y-1 ml-auto">
                                  {server.load < 40 && <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">Low Traffic</Badge>}
                                  {server.isRotating && <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">Rotating IP</Badge>}
                                </div>
                              </div>
                            ))}
                          </div>
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
                            <Progress 
                              value={(dataUsage.used / dataUsage.total) * 100} 
                              className="h-2 mt-1 mb-2"
                            />
                            <p className="text-xs text-right">
                              {(dataUsage.used / 1000).toFixed(2)} GB / {(dataUsage.total / 1000).toFixed(0)} GB
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Active Connections</p>
                            <p className="font-medium">
                              {networkStats.activeConnections}
                            </p>
                          </div>
                          
                          {proxyEnabled && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Security Features</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {encryptedProxy && <Badge variant="outline" className="bg-green-500/10 text-green-500">Encrypted</Badge>}
                                {rotatingProxies && <Badge variant="outline" className="bg-blue-500/10 text-blue-400">IP Rotation</Badge>}
                                {dnsProtection && <Badge variant="outline" className="bg-purple-500/10 text-purple-400">DNS Protected</Badge>}
                                {highAnonymity && <Badge variant="outline" className="bg-amber-500/10 text-amber-400">High Anonymity</Badge>}
                              </div>
                            </div>
                          )}
                          
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
              </TabsContent>
              
              {/* Features Tab */}
              <TabsContent value="features" className="space-y-4">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20">
                  <CardHeader>
                    <CardTitle>Proxy Security Features</CardTitle>
                    <CardDescription>Configure additional proxy security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label htmlFor="rotating-proxies" className="font-medium">Rotating Proxies</Label>
                          <p className="text-sm text-muted-foreground">Change your IP address periodically</p>
                        </div>
                        <Switch 
                          id="rotating-proxies" 
                          checked={rotatingProxies}
                          onCheckedChange={setRotatingProxies}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label htmlFor="high-anonymity" className="font-medium">High Anonymity Mode</Label>
                          <p className="text-sm text-muted-foreground">Maximum privacy protection</p>
                        </div>
                        <Switch 
                          id="high-anonymity" 
                          checked={highAnonymity}
                          onCheckedChange={setHighAnonymity}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label htmlFor="encrypted-proxy" className="font-medium">Encrypted Connection</Label>
                          <p className="text-sm text-muted-foreground">Encrypt all proxy traffic</p>
                        </div>
                        <Switch 
                          id="encrypted-proxy" 
                          checked={encryptedProxy}
                          onCheckedChange={setEncryptedProxy}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label htmlFor="dns-protection" className="font-medium">DNS Leak Protection</Label>
                          <p className="text-sm text-muted-foreground">Prevent DNS requests from revealing location</p>
                        </div>
                        <Switch 
                          id="dns-protection" 
                          checked={dnsProtection}
                          onCheckedChange={setDnsProtection}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <div>
                          <Label htmlFor="auto-switch" className="font-medium">Auto-Switch if Blocked</Label>
                          <p className="text-sm text-muted-foreground">Automatically change servers if blocked</p>
                        </div>
                        <Switch 
                          id="auto-switch" 
                          checked={autoSwitch}
                          onCheckedChange={setAutoSwitch}
                        />
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Proxy Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        For premium proxy services requiring authentication
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="proxy-username">Username</Label>
                          <Input 
                            id="proxy-username" 
                            value={proxyUsername}
                            onChange={e => setProxyUsername(e.target.value)}
                            placeholder="Enter username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="proxy-password">Password</Label>
                          <Input 
                            id="proxy-password" 
                            type="password"
                            value={proxyPassword}
                            onChange={e => setProxyPassword(e.target.value)}
                            placeholder="Enter password"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        onClick={setupAuthentication}
                        disabled={authEnabled}
                        className="mt-2"
                      >
                        {authEnabled ? "Authentication Enabled" : "Enable Authentication"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20">
                  <CardHeader>
                    <CardTitle>Proxy Network Settings</CardTitle>
                    <CardDescription>Configure how the proxy network functions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-4">Split Tunneling</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          <div className="space-y-2">
                            <Label className="font-medium">Browser Traffic</Label>
                            <RadioGroup defaultValue="all">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="browser-all" />
                                <Label htmlFor="browser-all">All Sites</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="select" id="browser-select" />
                                <Label htmlFor="browser-select">Selected Sites Only</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="font-medium">Game Traffic</Label>
                            <RadioGroup defaultValue="all">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="game-all" />
                                <Label htmlFor="game-all">All Games</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="select" id="game-select" />
                                <Label htmlFor="game-select">Selected Games Only</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg mb-4">Country Spoofing</h3>
                        <RadioGroup defaultValue="auto">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="auto" id="geo-auto" />
                            <Label htmlFor="geo-auto">Match Proxy Location</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="geo-custom" />
                            <Label htmlFor="geo-custom">Custom Location</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg mb-4">Connection Logging</h3>
                        <RadioGroup defaultValue="minimal">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="log-none" />
                            <Label htmlFor="log-none">No Logging</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="minimal" id="log-minimal" />
                            <Label htmlFor="log-minimal">Minimal (Errors Only)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="full" id="log-full" />
                            <Label htmlFor="log-full">Full Connection Logs</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Speed Test Tab */}
              <TabsContent value="speed" className="space-y-4">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20">
                  <CardHeader>
                    <CardTitle>Proxy Speed Test</CardTitle>
                    <CardDescription>Test performance of proxy server locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center p-4">
                        {isSpeedTesting ? (
                          <div className="space-y-4">
                            <h3 className="font-medium">Testing Proxy Network Speed...</h3>
                            <Progress value={speedTestProgress} className="h-2 max-w-md mx-auto" />
                            <p className="text-sm text-muted-foreground">{speedTestProgress}% Complete</p>
                          </div>
                        ) : (
                          <div>
                            <Button onClick={runSpeedTest} className="mx-auto">
                              Run Speed Test
                            </Button>
                            <p className="text-sm text-muted-foreground mt-2">
                              Tests download, upload, and latency to all proxy servers
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg mb-4">Server Performance Ranking</h3>
                        <div className="space-y-3">
                          {proxyServers
                            .sort((a, b) => b.downloadSpeed - a.downloadSpeed)
                            .map((server, index) => (
                              <div key={server.id} className="flex items-center space-x-4 p-3 rounded-md border border-accent/30">
                                <div className="font-medium w-6 text-center">{index + 1}</div>
                                <div className="flex-1">
                                  <div className="font-medium">{server.flagCode} {server.country} - {server.region}</div>
                                  <div className="flex items-center flex-wrap text-xs text-muted-foreground mt-1">
                                    <span className={getLatencyClass(server.latency)}>Latency: {server.latency}ms</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-blue-400">Down: {server.downloadSpeed} Mbps</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-purple-400">Up: {server.uploadSpeed} Mbps</span>
                                  </div>
                                </div>
                                <RadioGroupItem value={server.id} id={`speed-${server.id}`} onClick={() => handleServerChange(server.id)} />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Exceptions Tab */}
              <TabsContent value="exceptions" className="space-y-4">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20">
                  <CardHeader>
                    <CardTitle>Proxy Exceptions</CardTitle>
                    <CardDescription>Configure sites to bypass the proxy network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <Input 
                          placeholder="example.com" 
                          value={newException}
                          onChange={e => setNewException(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={addException}>Add Exception</Button>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-2">Current Exceptions</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          These sites will connect directly, bypassing the proxy
                        </p>
                        
                        {exceptions.length > 0 ? (
                          <div className="space-y-2">
                            {exceptions.map(site => (
                              <div key={site} className="flex justify-between items-center p-2 rounded-md border border-accent/30">
                                <span>{site}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removeException(site)}
                                  className="h-8 w-8"
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 border border-dashed rounded-md border-accent/30">
                            <p className="text-muted-foreground">No exceptions added</p>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg mb-2">Blocked Access Attempts</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Recent attempts to access blocked sites
                        </p>
                        
                        {blockedSites.length > 0 ? (
                          <div className="space-y-2">
                            {blockedSites.map(({site, timestamp}) => (
                              <div key={site} className="flex justify-between items-center p-2 rounded-md border border-accent/30">
                                <span>{site}</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 border border-dashed rounded-md border-accent/30">
                            <p className="text-muted-foreground">No blocked access attempts</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-4">
                <Card className="bg-card/30 backdrop-blur-sm border-accent/20">
                  <CardHeader>
                    <CardTitle>Proxy Analytics</CardTitle>
                    <CardDescription>Usage statistics and performance data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-md border border-accent/30 text-center">
                          <p className="text-2xl font-bold text-primary">{networkStats.blockedAttempts}</p>
                          <p className="text-sm text-muted-foreground">Blocked Tracking Attempts</p>
                        </div>
                        <div className="p-4 rounded-md border border-accent/30 text-center">
                          <p className="text-2xl font-bold text-primary">{networkStats.bypassedGeoRestrictions}</p>
                          <p className="text-sm text-muted-foreground">Bypassed Geo-Restrictions</p>
                        </div>
                        <div className="p-4 rounded-md border border-accent/30 text-center">
                          <p className="text-2xl font-bold text-primary">{networkStats.totalTraffic}</p>
                          <p className="text-sm text-muted-foreground">Total Traffic</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg mb-4">Data Usage</h3>
                        <Progress 
                          value={(dataUsage.used / dataUsage.total) * 100} 
                          className="h-2 mb-2"
                        />
                        <div className="flex justify-between text-sm">
                          <span>{(dataUsage.used / 1000).toFixed(2)} GB Used</span>
                          <span>{((dataUsage.total - dataUsage.used) / 1000).toFixed(2)} GB Remaining</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg mb-4">Connection History</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 rounded-md border border-accent/30">
                            <div>
                              <p className="font-medium">🇺🇸 United States (East Coast)</p>
                              <p className="text-sm text-muted-foreground">Duration: 1h 23m</p>
                            </div>
                            <span className="text-sm text-muted-foreground">Today, 14:32</span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-md border border-accent/30">
                            <div>
                              <p className="font-medium">🇯🇵 Japan (East Asia)</p>
                              <p className="text-sm text-muted-foreground">Duration: 45m</p>
                            </div>
                            <span className="text-sm text-muted-foreground">Today, 11:15</span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-md border border-accent/30">
                            <div>
                              <p className="font-medium">🇩🇪 Germany (Central Europe)</p>
                              <p className="text-sm text-muted-foreground">Duration: 2h 10m</p>
                            </div>
                            <span className="text-sm text-muted-foreground">Yesterday, 20:45</span>
                          </div>
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