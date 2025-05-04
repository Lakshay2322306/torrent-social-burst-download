
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Download, Link, Share, Bot } from "lucide-react";

interface AddDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDownload: (downloadData: any) => void;
}

const AddDownloadDialog = ({
  open,
  onOpenChange,
  onAddDownload,
}: AddDownloadDialogProps) => {
  const [url, setUrl] = useState('');
  const [downloadType, setDownloadType] = useState('standard');
  const [torrentFile, setTorrentFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url && !torrentFile) {
      toast({
        title: 'Input Required',
        description: 'Please enter a URL or select a torrent file',
        variant: 'destructive',
      });
      return;
    }
    
    // Simulate adding a download
    const newDownload = {
      id: Math.random().toString(36).substring(2, 9),
      url: url || 'Torrent file',
      type: downloadType,
      filename: url ? url.split('/').pop() || 'Unknown file' : torrentFile?.name || 'Unknown torrent',
      source: downloadType === 'torrent' ? 'BitTorrent' : downloadType === 'social' ? 'Social Media' : 'Direct Link',
      status: 'queued',
      progress: 0,
      size: '0 MB',
      speed: '0 KB/s',
    };
    
    onAddDownload(newDownload);
    toast({
      title: 'Download Added',
      description: 'Your download has been added to the queue',
    });
    
    // Reset form
    setUrl('');
    setTorrentFile(null);
    setDownloadType('standard');
    onOpenChange(false);
  };

  const handleTorrentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTorrentFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Add New Download
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="standard" className="w-full" onValueChange={setDownloadType}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="standard" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">Standard</span>
            </TabsTrigger>
            <TabsTrigger value="torrent" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">Torrent</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Social Media</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="standard">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="standard-url">URL</Label>
                  <Input
                    id="standard-url"
                    placeholder="https://example.com/file.zip"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="torrent">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="magnet-url">Magnet URL or Torrent File</Label>
                  <Input
                    id="magnet-url"
                    placeholder="magnet:?xt=urn:btih:..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="torrent-file">Or upload a .torrent file</Label>
                  <Input
                    id="torrent-file"
                    type="file"
                    accept=".torrent"
                    onChange={handleTorrentFileChange}
                  />
                </div>
                {torrentFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {torrentFile.name}
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="social">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="social-url">Social Media URL</Label>
                  <Input
                    id="social-url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Supports YouTube, Twitter, Instagram, TikTok, and more
                </p>
              </div>
            </TabsContent>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="download-button">
                <Download className="mr-2 h-4 w-4" />
                Add Download
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddDownloadDialog;
