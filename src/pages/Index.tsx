
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Link, Share, Bot } from "lucide-react";
import AddDownloadDialog from '@/components/AddDownloadDialog';
import DownloadItem from '@/components/DownloadItem';

// Sample download data
const initialDownloads = [
  {
    id: '1',
    filename: 'Ubuntu 23.04.iso',
    source: 'https://ubuntu.com/download',
    type: 'standard',
    size: '4.2 GB',
    progress: 75,
    speed: '3.2 MB/s',
    status: 'downloading' as const,
  },
  {
    id: '2',
    filename: 'Big Buck Bunny.mp4',
    source: 'YouTube',
    type: 'social',
    size: '320 MB',
    progress: 100,
    speed: '0 KB/s',
    status: 'completed' as const,
  },
  {
    id: '3',
    filename: 'React Documentation.pdf',
    source: 'https://reactjs.org',
    type: 'standard',
    size: '15 MB',
    progress: 0,
    speed: '0 KB/s',
    status: 'queued' as const,
  },
  {
    id: '4',
    filename: 'Sintel Movie.mp4',
    source: 'BitTorrent',
    type: 'torrent',
    size: '1.8 GB',
    progress: 35,
    speed: '1.5 MB/s',
    status: 'downloading' as const,
  },
  {
    id: '5',
    filename: 'Design Resources.zip',
    source: 'https://designresources.io',
    type: 'standard',
    size: '450 MB',
    progress: 60,
    speed: '0 KB/s',
    status: 'paused' as const,
  },
];

const Index = () => {
  const [downloads, setDownloads] = useState(initialDownloads);
  const [activeTab, setActiveTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter downloads based on the active tab
  const filteredDownloads = downloads.filter((download) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['downloading', 'queued'].includes(download.status);
    if (activeTab === 'completed') return download.status === 'completed';
    if (activeTab === 'paused') return download.status === 'paused';
    return download.type === activeTab;
  });

  const handleAddDownload = (newDownload: any) => {
    setDownloads([newDownload, ...downloads]);
  };

  const handleDeleteDownload = (id: string) => {
    setDownloads(downloads.filter(download => download.id !== id));
  };

  const handlePauseResumeDownload = (id: string) => {
    setDownloads(downloads.map(download => {
      if (download.id === id) {
        if (download.status === 'downloading') {
          return { ...download, status: 'paused' };
        } else if (download.status === 'paused' || download.status === 'queued') {
          return { ...download, status: 'downloading' };
        }
      }
      return download;
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Downloads</h1>
          <Button onClick={() => setDialogOpen(true)} className="download-button">
            <Download className="mr-2 h-5 w-5" />
            New Download
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="standard" className="hidden md:flex">
              <Link className="mr-2 h-4 w-4" />
              Standard
            </TabsTrigger>
            <TabsTrigger value="torrent" className="hidden md:flex">
              <Share className="mr-2 h-4 w-4" />
              Torrent
            </TabsTrigger>
            <TabsTrigger value="social" className="hidden md:flex">
              <Bot className="mr-2 h-4 w-4" />
              Social
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredDownloads.length > 0 ? (
              filteredDownloads.map((download) => (
                <DownloadItem
                  key={download.id}
                  {...download}
                  onDelete={handleDeleteDownload}
                  onPauseResume={handlePauseResumeDownload}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <Download className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Downloads</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any {activeTab !== 'all' ? activeTab : ''} downloads yet
                </p>
                <Button onClick={() => setDialogOpen(true)} className="download-button">
                  <Download className="mr-2 h-5 w-5" />
                  Add New Download
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AddDownloadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddDownload={handleAddDownload}
      />
    </Layout>
  );
};

export default Index;
