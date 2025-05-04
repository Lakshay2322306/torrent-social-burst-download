
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { 
  Share, 
  Upload, 
  Download, 
  File, 
  Settings, 
  Pause, 
  Play, 
  Trash2 
} from "lucide-react";

interface TorrentFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  selected: boolean;
}

interface TorrentItem {
  id: string;
  name: string;
  size: string;
  downloaded: string;
  progress: number;
  status: 'downloading' | 'paused' | 'completed' | 'seeding';
  peers: number;
  seeds: number;
  uploadSpeed: string;
  downloadSpeed: string;
  files: TorrentFile[];
}

const sampleTorrents: TorrentItem[] = [
  {
    id: 't1',
    name: 'Ubuntu 23.04 Desktop',
    size: '4.2 GB',
    downloaded: '1.2 GB',
    progress: 28,
    status: 'downloading',
    peers: 15,
    seeds: 42,
    uploadSpeed: '0 KB/s',
    downloadSpeed: '3.5 MB/s',
    files: [
      { id: 'f1', name: 'ubuntu-23.04-desktop-amd64.iso', size: '4.2 GB', progress: 28, selected: true },
      { id: 'f2', name: 'readme.txt', size: '12 KB', progress: 100, selected: true },
    ]
  },
  {
    id: 't2',
    name: 'Big Buck Bunny Movie',
    size: '320 MB',
    downloaded: '320 MB',
    progress: 100,
    status: 'seeding',
    peers: 3,
    seeds: 2,
    uploadSpeed: '250 KB/s',
    downloadSpeed: '0 KB/s',
    files: [
      { id: 'f3', name: 'big_buck_bunny_1080p.mp4', size: '320 MB', progress: 100, selected: true },
    ]
  },
  {
    id: 't3',
    name: 'Open Source Design Resources',
    size: '1.8 GB',
    downloaded: '650 MB',
    progress: 36,
    status: 'paused',
    peers: 0,
    seeds: 0,
    uploadSpeed: '0 KB/s',
    downloadSpeed: '0 KB/s',
    files: [
      { id: 'f4', name: 'icons.zip', size: '350 MB', progress: 100, selected: true },
      { id: 'f5', name: 'fonts.zip', size: '450 MB', progress: 45, selected: true },
      { id: 'f6', name: 'templates.zip', size: '1 GB', progress: 0, selected: false },
    ]
  }
];

const Torrents = () => {
  const [torrents, setTorrents] = useState(sampleTorrents);
  const [magnetUrl, setMagnetUrl] = useState('');
  const [selectedTorrent, setSelectedTorrent] = useState<TorrentItem | null>(null);
  const { toast } = useToast();

  const handleAddTorrent = () => {
    if (!magnetUrl) {
      toast({
        title: "Magnet URL Required",
        description: "Please enter a valid magnet URL or upload a torrent file",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Torrent Added",
      description: "Your torrent has been added to the queue",
    });
    
    // Reset input
    setMagnetUrl('');
  };

  const handleTorrentAction = (id: string, action: 'pause' | 'resume' | 'delete') => {
    if (action === 'delete') {
      setTorrents(torrents.filter(t => t.id !== id));
      if (selectedTorrent && selectedTorrent.id === id) {
        setSelectedTorrent(null);
      }
      toast({
        title: "Torrent Removed",
        description: "The torrent has been removed from your list",
      });
      return;
    }

    setTorrents(torrents.map(t => {
      if (t.id === id) {
        if (action === 'pause' && t.status === 'downloading') {
          return { ...t, status: 'paused' };
        } else if (action === 'resume' && t.status === 'paused') {
          return { ...t, status: 'downloading' };
        }
      }
      return t;
    }));
  };

  const handleTorrentSelect = (torrent: TorrentItem) => {
    setSelectedTorrent(selectedTorrent?.id === torrent.id ? null : torrent);
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Torrent Downloader</h1>
          <p className="text-muted-foreground">
            Manage your torrent downloads with advanced features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share className="h-5 w-5 text-primary" />
                  Add New Torrent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="magnet">
                  <TabsList className="mb-4">
                    <TabsTrigger value="magnet">Magnet URL</TabsTrigger>
                    <TabsTrigger value="file">Torrent File</TabsTrigger>
                  </TabsList>

                  <TabsContent value="magnet">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="magnet:?xt=urn:btih:..."
                        value={magnetUrl}
                        onChange={(e) => setMagnetUrl(e.target.value)}
                      />
                      <Button onClick={handleAddTorrent} className="download-button">
                        Add
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="file">
                    <div className="space-y-4">
                      <Input type="file" accept=".torrent" />
                      <Button className="download-button">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Torrent
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Torrents</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {torrents.length > 0 ? (
                  <div className="divide-y divide-border">
                    {torrents.map((torrent) => (
                      <div 
                        key={torrent.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${selectedTorrent?.id === torrent.id ? 'bg-muted' : ''}`}
                        onClick={() => handleTorrentSelect(torrent)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate mb-1">{torrent.name}</h3>
                            
                            <div className="mb-2">
                              <Progress value={torrent.progress} className="h-2" />
                            </div>
                            
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span>
                                {torrent.downloaded} / {torrent.size} ({torrent.progress}%)
                              </span>
                              <span>
                                ↓ {torrent.downloadSpeed}
                              </span>
                              <span>
                                ↑ {torrent.uploadSpeed}
                              </span>
                              <span>
                                Seeds: {torrent.seeds} | Peers: {torrent.peers}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex ml-4 gap-1">
                            {torrent.status !== 'completed' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTorrentAction(
                                    torrent.id, 
                                    torrent.status === 'paused' ? 'resume' : 'pause'
                                  );
                                }}
                              >
                                {torrent.status === 'paused' ? (
                                  <Play className="h-4 w-4" />
                                ) : (
                                  <Pause className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTorrentAction(torrent.id, 'delete');
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Share className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Torrents</h3>
                    <p className="text-muted-foreground mb-6">
                      Add a magnet link or upload a torrent file to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Torrent Details</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTorrent ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">{selectedTorrent.name}</h3>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="capitalize">{selectedTorrent.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span>{selectedTorrent.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Downloaded:</span>
                          <span>{selectedTorrent.downloaded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Progress:</span>
                          <span>{selectedTorrent.progress}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Seeds:</span>
                          <span>{selectedTorrent.seeds}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Peers:</span>
                          <span>{selectedTorrent.peers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Download Speed:</span>
                          <span>{selectedTorrent.downloadSpeed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Upload Speed:</span>
                          <span>{selectedTorrent.uploadSpeed}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Files</h4>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {selectedTorrent.files.map((file) => (
                          <div key={file.id} className="text-sm">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center">
                                <File className="h-4 w-4 mr-2 text-primary" />
                                <span className="truncate max-w-[200px]">{file.name}</span>
                              </div>
                              <span>{file.size}</span>
                            </div>
                            <Progress value={file.progress} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTorrentAction(
                          selectedTorrent.id, 
                          selectedTorrent.status === 'paused' ? 'resume' : 'pause'
                        )}
                      >
                        {selectedTorrent.status === 'paused' ? (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Resume
                          </>
                        ) : (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleTorrentAction(selectedTorrent.id, 'delete')}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <File className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Torrent Selected</h3>
                    <p className="text-muted-foreground text-sm">
                      Select a torrent to view its details
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Torrents;
