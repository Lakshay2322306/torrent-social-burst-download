
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Youtube, Twitter, Instagram, TikTok, Facebook, Share } from "lucide-react";
import { useState } from 'react';

const socialPlatforms = [
  {
    name: 'YouTube',
    icon: Youtube,
    color: 'text-red-500',
    placeholder: 'https://youtube.com/watch?v=...'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'text-blue-400',
    placeholder: 'https://twitter.com/username/status/...'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    color: 'text-purple-500',
    placeholder: 'https://instagram.com/p/...'
  },
  {
    name: 'TikTok',
    icon: TikTok,
    color: 'text-black',
    placeholder: 'https://tiktok.com/@username/video/...'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600',
    placeholder: 'https://facebook.com/watch/?v=...'
  },
];

const Social = () => {
  const [socialUrl, setSocialUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDownload = () => {
    if (!socialUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to download",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Download Started",
      description: `Downloading from ${selectedPlatform || 'social media'}`,
    });
    
    // Reset input
    setSocialUrl('');
    setSelectedPlatform(null);
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Social Media Downloader</h1>
          <p className="text-muted-foreground">
            Download videos, images, and audio from popular social media platforms
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5 text-primary" />
              Download from Social Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder={selectedPlatform ? 
                    socialPlatforms.find(p => p.name === selectedPlatform)?.placeholder :
                    "Enter social media URL..."}
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                  className="pr-28"
                />
                <Button 
                  className="absolute right-1 top-1 download-button"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {socialPlatforms.map((platform) => (
                  <Button
                    key={platform.name}
                    variant={selectedPlatform === platform.name ? "secondary" : "outline"}
                    className={`flex items-center justify-center gap-2 ${selectedPlatform === platform.name ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handlePlatformSelect(platform.name)}
                  >
                    <platform.icon className={`h-4 w-4 ${platform.color}`} />
                    <span>{platform.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
            <p className="mb-2">Supported platforms: YouTube, Twitter, Instagram, TikTok, Facebook</p>
            <p>Downloaded content will be saved to your downloads folder</p>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                YouTube Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                <li>Download videos in multiple resolutions (4K, 1080p, 720p)</li>
                <li>Extract audio in MP3 format</li>
                <li>Download entire playlists</li>
                <li>Support for Short videos</li>
                <li>Chapter extraction</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-purple-500" />
                Instagram Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                <li>Download photos and videos from posts</li>
                <li>Save Instagram Stories</li>
                <li>Download Reels in high quality</li>
                <li>Save carousel posts (multiple images)</li>
                <li>Profile picture download</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Social;
