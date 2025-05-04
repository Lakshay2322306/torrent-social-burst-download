
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const handleQuickDownload = () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to download",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Download Added",
      description: "Your download has been added to the queue",
    });
    
    // Reset input
    setUrl('');
  };

  return (
    <nav className="bg-card shadow-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="text-download-primary" size={24} />
            <Link to="/" className="text-xl font-bold text-foreground">
              MultiDownloader
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl px-6">
            <div className="relative w-full flex items-center">
              <Input
                type="text"
                placeholder="Enter URL to download..."
                className="w-full pr-24 bg-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickDownload()}
              />
              <Button 
                className="absolute right-1 download-button"
                size="sm"
                onClick={handleQuickDownload}
              >
                Download
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="md:hidden mt-3">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Enter URL to download..."
              className="w-full pr-24"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button 
              className="absolute right-1 download-button"
              size="sm"
              onClick={handleQuickDownload}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
