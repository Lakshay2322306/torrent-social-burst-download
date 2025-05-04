
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Download, Save, Plus, Trash2, Edit } from "lucide-react";

interface DownloadBot {
  id: string;
  name: string;
  type: 'youtube' | 'social' | 'torrent' | 'general';
  active: boolean;
  rules: string[];
  downloadsCount: number;
  maxConcurrent: number;
  destinations: string[];
}

const initialBots: DownloadBot[] = [
  {
    id: 'bot1',
    name: 'YouTube Music Bot',
    type: 'youtube',
    active: true,
    rules: [
      'Channel: @OfficialPlaylist',
      'Format: MP3 audio only',
      'Quality: 320kbps'
    ],
    downloadsCount: 47,
    maxConcurrent: 2,
    destinations: ['/Music/YouTube']
  },
  {
    id: 'bot2',
    name: 'Linux ISO Tracker',
    type: 'torrent',
    active: false,
    rules: [
      'Match: "Linux" AND "ISO"',
      'Min seeders: 10'
    ],
    downloadsCount: 8,
    maxConcurrent: 1,
    destinations: ['/Downloads/Linux']
  },
  {
    id: 'bot3',
    name: 'Instagram Reels Collector',
    type: 'social',
    active: true,
    rules: [
      'Follow accounts: @design, @art',
      'Contains: #tutorial OR #howto',
      'Min length: 30 seconds'
    ],
    downloadsCount: 124,
    maxConcurrent: 3,
    destinations: ['/Videos/Reels', '/Media/Instagram']
  }
];

const Bots = () => {
  const [bots, setBots] = useState(initialBots);
  const [editingBot, setEditingBot] = useState<DownloadBot | null>(null);
  const [newBotName, setNewBotName] = useState('');
  const [newBotRule, setNewBotRule] = useState('');
  const [newBotSpeed, setNewBotSpeed] = useState(2);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleBotToggle = (id: string, active: boolean) => {
    setBots(prevBots => 
      prevBots.map(bot => 
        bot.id === id ? { ...bot, active } : bot
      )
    );
    
    toast({
      title: `Bot ${active ? 'Activated' : 'Deactivated'}`,
      description: `${bots.find(b => b.id === id)?.name} is now ${active ? 'running' : 'paused'}`,
    });
  };

  const handleDeleteBot = (id: string) => {
    setBots(prevBots => prevBots.filter(bot => bot.id !== id));
    
    toast({
      title: "Bot Deleted",
      description: `${bots.find(b => b.id === id)?.name} has been removed`,
    });
  };

  const handleAddRule = () => {
    if (!newBotRule) return;
    
    if (editingBot) {
      setEditingBot({
        ...editingBot,
        rules: [...editingBot.rules, newBotRule]
      });
    }
    
    setNewBotRule('');
  };

  const handleRemoveRule = (index: number) => {
    if (editingBot) {
      setEditingBot({
        ...editingBot,
        rules: editingBot.rules.filter((_, i) => i !== index)
      });
    }
  };

  const handleSaveBot = () => {
    if (editingBot) {
      setBots(prevBots =>
        prevBots.map(bot =>
          bot.id === editingBot.id ? editingBot : bot
        )
      );
      
      toast({
        title: "Bot Updated",
        description: `${editingBot.name} has been updated successfully`,
      });
      
      setEditingBot(null);
    } else if (isCreating && newBotName) {
      const newBot: DownloadBot = {
        id: `bot${Date.now()}`,
        name: newBotName,
        type: 'general',
        active: false,
        rules: [],
        downloadsCount: 0,
        maxConcurrent: newBotSpeed,
        destinations: ['/Downloads']
      };
      
      setBots(prevBots => [...prevBots, newBot]);
      
      toast({
        title: "Bot Created",
        description: `${newBotName} has been created successfully`,
      });
      
      setNewBotName('');
      setIsCreating(false);
    }
  };

  const renderBotTypeIcon = (type: string) => {
    switch (type) {
      case 'youtube': return '🎬';
      case 'social': return '📱';
      case 'torrent': return '🔄';
      default: return '🤖';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Download Bots</h1>
          <p className="text-muted-foreground">
            Automate your downloads with intelligent bots that work for you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Active Bots</h2>
              <Button 
                onClick={() => setIsCreating(!isCreating)} 
                variant={isCreating ? "secondary" : "outline"}
                className={isCreating ? "bg-primary/10" : ""}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Bot
              </Button>
            </div>

            {isCreating && (
              <Card className="mb-6 border-primary/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Create New Bot</CardTitle>
                  <CardDescription>
                    Configure your automated download assistant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bot-name">Bot Name</Label>
                      <Input 
                        id="bot-name" 
                        placeholder="e.g., YouTube Music Downloader"
                        value={newBotName}
                        onChange={(e) => setNewBotName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bot-speed">Concurrent Downloads</Label>
                      <div className="flex items-center space-x-2">
                        <Slider 
                          id="bot-speed"
                          min={1} 
                          max={5} 
                          step={1}
                          value={[newBotSpeed]}
                          onValueChange={(value) => setNewBotSpeed(value[0])}
                          className="flex-1" 
                        />
                        <span className="w-8 text-center">{newBotSpeed}</span>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsCreating(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        disabled={!newBotName}
                        onClick={handleSaveBot}
                        className="download-button"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Create Bot
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {bots.map(bot => (
                <Card key={bot.id} className={`${bot.active ? 'border-primary/30' : 'opacity-80'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">{renderBotTypeIcon(bot.type)}</div>
                        <CardTitle>{bot.name}</CardTitle>
                      </div>
                      <Switch 
                        checked={bot.active} 
                        onCheckedChange={(checked) => handleBotToggle(bot.id, checked)}
                      />
                    </div>
                    <CardDescription>
                      Downloaded {bot.downloadsCount} files • {bot.maxConcurrent} concurrent max
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Rules</h4>
                        <ul className="text-sm space-y-1 pl-5 list-disc">
                          {bot.rules.map((rule, index) => (
                            <li key={index}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Save Locations</h4>
                        <div className="text-sm space-y-1">
                          {bot.destinations.map((dest, index) => (
                            <div key={index} className="flex items-center">
                              <Download className="mr-2 h-3 w-3 text-muted-foreground" />
                              {dest}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingBot(bot)}
                        >
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteBot(bot.id)}
                        >
                          <Trash2 className="mr-2 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {bots.length === 0 && !isCreating && (
                <Card className="py-12">
                  <CardContent className="text-center">
                    <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Bots Created</h3>
                    <p className="text-muted-foreground mb-6">
                      Create your first download bot to automate your downloads
                    </p>
                    <Button onClick={() => setIsCreating(true)} className="download-button">
                      <Plus className="mr-2 h-5 w-5" />
                      Create New Bot
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Bot Editor</CardTitle>
                <CardDescription>
                  {editingBot ? `Edit ${editingBot.name}` : 'Select a bot to edit'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editingBot ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-bot-name">Bot Name</Label>
                      <Input 
                        id="edit-bot-name" 
                        value={editingBot.name}
                        onChange={(e) => setEditingBot({...editingBot, name: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-bot-concurrent">Concurrent Downloads</Label>
                      <div className="flex items-center space-x-2">
                        <Slider 
                          id="edit-bot-concurrent"
                          min={1} 
                          max={5} 
                          step={1}
                          value={[editingBot.maxConcurrent]}
                          onValueChange={(value) => setEditingBot({
                            ...editingBot, 
                            maxConcurrent: value[0]
                          })}
                          className="flex-1" 
                        />
                        <span className="w-8 text-center">{editingBot.maxConcurrent}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Rules</Label>
                      <div className="space-y-2">
                        {editingBot.rules.map((rule, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted rounded-md px-3 py-2">
                            <span className="text-sm truncate">{rule}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-destructive hover:text-destructive"
                              onClick={() => handleRemoveRule(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Add a new rule..."
                          value={newBotRule}
                          onChange={(e) => setNewBotRule(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddRule()}
                        />
                        <Button onClick={handleAddRule} className="shrink-0">Add</Button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setEditingBot(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveBot}
                        className="download-button"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Select a bot from the list to edit its settings
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Bot Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Automated Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Bots can monitor websites, RSS feeds, and social media accounts for new content
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Smart Filtering</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up rules to only download content that matches specific criteria
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Scheduled Downloads</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure bots to operate only during specific times to save bandwidth
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Custom Organizing</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically organize downloads into folders based on content type
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bots;
