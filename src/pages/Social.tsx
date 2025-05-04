
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Youtube, Twitter, Instagram, Video, Facebook, Share, Download, FileVideo, FileAudio, Subtitles, Image } from "lucide-react";
import { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
    icon: Video,
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

// Video quality options
const videoQualities = [
  { value: "best", label: "Best Quality" },
  { value: "2160p", label: "4K (2160p)" },
  { value: "1440p", label: "2K (1440p)" },
  { value: "1080p", label: "Full HD (1080p)" },
  { value: "720p", label: "HD (720p)" },
  { value: "480p", label: "SD (480p)" },
  { value: "360p", label: "Low (360p)" },
  { value: "240p", label: "Very Low (240p)" },
];

// Audio quality options
const audioQualities = [
  { value: "best", label: "Best Quality" },
  { value: "320k", label: "320 kbps" },
  { value: "256k", label: "256 kbps" },
  { value: "192k", label: "192 kbps" },
  { value: "128k", label: "128 kbps" },
  { value: "96k", label: "96 kbps" },
  { value: "64k", label: "64 kbps" },
];

// Supported platforms by yt-dlp
const supportedPlatforms = [
  "YouTube", "Twitter", "Instagram", "TikTok", "Facebook", 
  "Vimeo", "Dailymotion", "SoundCloud", "Twitch", "Reddit",
  "PornHub", "YouPorn", "XVideos", "xHamster", "XNXX",
  "Bilibili", "Niconico", "Rutube", "VK", "XHamster"
];

const Social = () => {
  const [socialUrl, setSocialUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video');
  const [videoQuality, setVideoQuality] = useState("best");
  const [audioQuality, setAudioQuality] = useState("best");
  const [downloadThumbnail, setDownloadThumbnail] = useState(false);
  const [downloadSubtitles, setDownloadSubtitles] = useState(false);
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

    // Prepare download configuration message
    let downloadConfig = `${selectedPlatform || 'URL'}`;
    
    if (advancedOptions) {
      downloadConfig += ` as ${downloadType}`;
      if (downloadType === 'video') {
        downloadConfig += ` in ${videoQuality}`;
      } else {
        downloadConfig += ` in ${audioQuality}`;
      }
      if (downloadThumbnail) downloadConfig += ' with thumbnail';
      if (downloadSubtitles) downloadConfig += ' with subtitles';
    }

    toast({
      title: "Download Started",
      description: `Downloading from ${downloadConfig}`,
    });
    
    console.log("Download configuration:", {
      url: socialUrl,
      platform: selectedPlatform,
      downloadType,
      videoQuality,
      audioQuality,
      downloadThumbnail,
      downloadSubtitles
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
            Download videos, images, and audio from popular social media platforms using yt-dlp
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

              <div className="flex items-center space-x-2">
                <Switch 
                  id="advanced-options" 
                  checked={advancedOptions}
                  onCheckedChange={setAdvancedOptions}
                />
                <Label htmlFor="advanced-options">Advanced Options (yt-dlp)</Label>
              </div>

              {advancedOptions && (
                <div className="space-y-4 border rounded-md p-4 bg-secondary/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="download-type" className="mb-2 block">Download Type</Label>
                      <div className="flex space-x-2">
                        <Button 
                          variant={downloadType === 'video' ? "default" : "outline"}
                          className="flex-1 flex items-center justify-center gap-2"
                          onClick={() => setDownloadType('video')}
                        >
                          <FileVideo className="h-4 w-4" />
                          Video
                        </Button>
                        <Button 
                          variant={downloadType === 'audio' ? "default" : "outline"}
                          className="flex-1 flex items-center justify-center gap-2"
                          onClick={() => setDownloadType('audio')}
                        >
                          <FileAudio className="h-4 w-4" />
                          Audio Only
                        </Button>
                      </div>
                    </div>

                    {downloadType === 'video' ? (
                      <div>
                        <Label htmlFor="video-quality" className="mb-2 block">Video Quality</Label>
                        <Select value={videoQuality} onValueChange={setVideoQuality}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Video Quality</SelectLabel>
                              {videoQualities.map((quality) => (
                                <SelectItem key={quality.value} value={quality.value}>
                                  {quality.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="audio-quality" className="mb-2 block">Audio Quality</Label>
                        <Select value={audioQuality} onValueChange={setAudioQuality}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Audio Quality</SelectLabel>
                              {audioQualities.map((quality) => (
                                <SelectItem key={quality.value} value={quality.value}>
                                  {quality.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="download-thumbnail" 
                        checked={downloadThumbnail}
                        onCheckedChange={setDownloadThumbnail}
                      />
                      <Label htmlFor="download-thumbnail" className="flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        Download Thumbnail
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="download-subtitles" 
                        checked={downloadSubtitles}
                        onCheckedChange={setDownloadSubtitles}
                      />
                      <Label htmlFor="download-subtitles" className="flex items-center gap-2">
                        <Subtitles className="h-4 w-4" />
                        Download Subtitles
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
            <p className="mb-2">Powered by yt-dlp with support for {supportedPlatforms.slice(0, 5).join(', ')} and many more</p>
            <p>Downloaded content will be saved to your downloads folder</p>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                yt-dlp Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                <li>Support for 1000+ websites and platforms</li>
                <li>Subtitle download and embedding</li>
                <li>Custom output templates</li>
                <li>Thumbnail extraction</li>
                <li>Geo-restriction bypassing</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Supported Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {supportedPlatforms.map((platform) => (
                <div key={platform} className="bg-secondary/20 rounded-md p-2 text-center text-sm">
                  {platform}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Social;
