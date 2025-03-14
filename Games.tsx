import { useState } from 'react';
import { StarBackground } from '@/components/StarBackground';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, X, Maximize2, Volume2, Settings } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iframeUrl: string;
  source: 'OnlineGames.io' | 'PlayClassic' | 'AstraClient';
  category: string[];
}

export default function Games() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample games data
  const games: Game[] = [
    {
      id: '1',
      title: 'Sonic the Hedgehog 3',
      description: 'Classic Sonic platformer where you race through multiple zones collecting rings and defeating Dr. Robotnik.',
      imageUrl: 'https://playclassic.games/wp-content/uploads/sonic-the-hedgehog-3-complete.jpg',
      iframeUrl: 'https://playclassic.games/games/run-and-gun-genesis-games-online/sonic-the-hedgehog-3-complete/play/',
      source: 'PlayClassic',
      category: ['Platformer', 'Retro', 'Action']
    },
    {
      id: '2',
      title: 'Minecraft (Eaglercraft)',
      description: 'Classic Minecraft experience playable directly in your browser through Astra Client.',
      imageUrl: 'https://astraclient.com/img/logo.png',
      iframeUrl: 'https://astraclient.com/play/',
      source: 'AstraClient',
      category: ['Sandbox', 'Adventure', 'Multiplayer']
    },
    {
      id: '3',
      title: 'OnlineGames.io Hub',
      description: 'Access hundreds of free online games from puzzle to action, all playable within MoonLight GX.',
      imageUrl: 'https://placehold.co/400x240/252525/FFFFFF/?text=OnlineGames.io',
      iframeUrl: 'https://www.onlinegames.io/',
      source: 'OnlineGames.io',
      category: ['Various', 'Collection', 'Multiple']
    },
    {
      id: '4',
      title: 'Tetris',
      description: 'The classic puzzle game where you arrange falling blocks to create complete lines.',
      imageUrl: 'https://placehold.co/400x240/252525/FFFFFF/?text=Tetris',
      iframeUrl: 'https://playclassic.games/games/puzzle-solving-dos-games-online/play-tetris-online/',
      source: 'PlayClassic',
      category: ['Puzzle', 'Retro', 'Strategy']
    },
    {
      id: '5',
      title: 'Doom',
      description: 'The iconic first-person shooter that defined a genre. Battle demons from hell across sci-fi bases.',
      imageUrl: 'https://placehold.co/400x240/252525/FFFFFF/?text=Doom',
      iframeUrl: 'https://playclassic.games/games/first-person-shooter-dos-games-online/play-doom-online/',
      source: 'PlayClassic',
      category: ['FPS', 'Retro', 'Action']
    },
    {
      id: '6',
      title: 'Space Invaders',
      description: 'Classic arcade shooter where you defend Earth from descending alien invaders.',
      imageUrl: 'https://placehold.co/400x240/252525/FFFFFF/?text=Space+Invaders',
      iframeUrl: 'https://playclassic.games/games/shooter-arcade-games-online/play-space-invaders-online/',
      source: 'PlayClassic',
      category: ['Arcade', 'Retro', 'Shooter']
    }
  ];
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter games based on search query and active tab
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'onlinegames' && game.source === 'OnlineGames.io') ||
                       (activeTab === 'playclassic' && game.source === 'PlayClassic') ||
                       (activeTab === 'astraclient' && game.source === 'AstraClient');
    
    return matchesSearch && matchesTab;
  });
  
  // Start a game (set selected game)
  const startGame = (game: Game) => {
    setSelectedGame(game);
  };
  
  // Exit current game
  const exitGame = () => {
    setSelectedGame(null);
  };
  
  return (
    <div className="min-h-screen">
      <StarBackground />
      
      <div className="min-h-screen flex">
        <Sidebar />
        
        <div className="flex-1 pl-16 md:pl-20">
          <div className="container mx-auto px-4 py-8">
            <div className="py-6 mb-6">
              <h1 className="font-orbitron text-3xl font-bold text-gradient mb-2">
                Game Center
              </h1>
              <p className="text-foreground/70">
                Play your favorite games without leaving MoonLight GX
              </p>
            </div>
            
            {selectedGame ? (
              // Game playing view
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{selectedGame.title}</h2>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      title="Fullscreen"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      title="Volume"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      title="Settings"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={exitGame}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Exit Game
                    </Button>
                  </div>
                </div>
                
                <div className="w-full h-[80vh] rounded-lg overflow-hidden border border-border relative bg-black/20">
                  <iframe 
                    src={selectedGame.iframeUrl} 
                    title={selectedGame.title}
                    className="w-full h-full"
                    allow="fullscreen; gamepad; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
                
                <div className="p-4 border border-accent/20 rounded-lg bg-card/30 backdrop-blur-sm">
                  <h3 className="font-medium mb-2">Game Source: {selectedGame.source}</h3>
                  <p className="text-sm text-muted-foreground">{selectedGame.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedGame.category.map((cat, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Games selection view
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="relative w-full sm:w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search games..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  
                  <Tabs 
                    defaultValue="all" 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="w-full sm:w-auto"
                  >
                    <TabsList className="w-full sm:w-auto bg-card/50">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="playclassic">PlayClassic</TabsTrigger>
                      <TabsTrigger value="astraclient">Astra Client</TabsTrigger>
                      <TabsTrigger value="onlinegames">OnlineGames.io</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGames.map((game) => (
                    <Card key={game.id} className="bg-card/30 backdrop-blur-sm border-border overflow-hidden h-full flex flex-col transition-all hover:shadow-md hover:shadow-primary/10 hover:border-primary/50">
                      <div className="aspect-video w-full overflow-hidden bg-accent/10">
                        <img 
                          src={game.imageUrl} 
                          alt={game.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x240/252525/FFFFFF/?text=MoonLight+GX+Game';
                          }}
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{game.title}</CardTitle>
                          <Badge variant="outline" className="bg-secondary/10 text-xs">
                            {game.source}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {game.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {game.category.map((cat, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-2 py-0 h-5">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => startGame(game)}
                        >
                          Play Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {filteredGames.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No games found matching your search criteria.</p>
                  </div>
                )}
              </div>
            )}
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}