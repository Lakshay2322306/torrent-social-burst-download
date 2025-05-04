
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Bot, Share } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">MultiDownloader Pro</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A powerful multi-source downloader with advanced features for torrents, social media, and more.
          </p>
        </div>

        <Tabs defaultValue="features" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="howto">How to Use</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Parallel Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>Break downloads into multiple chunks</li>
                    <li>Resume interrupted downloads</li>
                    <li>Set bandwidth limits per download</li>
                    <li>Queue management with priority settings</li>
                    <li>Schedule downloads for off-peak hours</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share className="h-5 w-5 text-primary" />
                    Torrent Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>Support for magnet links and .torrent files</li>
                    <li>DHT, PEX and LSD for trackerless torrents</li>
                    <li>Sequential downloading for streaming</li>
                    <li>Selective file downloading</li>
                    <li>Advanced seeding options</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    Automation Bots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>Create rules for automated downloading</li>
                    <li>Monitor websites for new content</li>
                    <li>Filter downloads based on criteria</li>
                    <li>Organize files automatically</li>
                    <li>Customizable notification system</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="howto">
            <div className="space-y-8 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
                <ol className="space-y-4 list-decimal list-inside">
                  <li>
                    <span className="font-medium">Add a new download:</span>
                    <p className="pl-6 mt-1 text-muted-foreground">
                      Click the "New Download" button and paste your URL. You can also drag and drop links into the application.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">For torrent downloads:</span>
                    <p className="pl-6 mt-1 text-muted-foreground">
                      Go to the Torrents tab and paste a magnet link or upload a .torrent file. You can select which files to download from the torrent.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Social media downloads:</span>
                    <p className="pl-6 mt-1 text-muted-foreground">
                      Go to the Social Media tab and paste the URL of the video or content you want to download. Select your preferred quality and format.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium">Setting up a Bot:</span>
                    <p className="pl-6 mt-1 text-muted-foreground">
                      Navigate to the Bots section and click "New Bot". Define your rules and let the bot automatically find and download content that matches.
                    </p>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Optimizing Your Downloads</h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <span className="font-medium">Control bandwidth usage</span> by setting speed limits in the settings menu
                  </li>
                  <li>
                    <span className="font-medium">Use the scheduler</span> to automatically pause downloads during high-usage hours
                  </li>
                  <li>
                    <span className="font-medium">Enable parallel downloading</span> to increase speed by creating multiple connections
                  </li>
                  <li>
                    <span className="font-medium">For large files</span>, consider using the chunked downloading feature
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="space-y-6 mt-6">
              <div>
                <h4 className="font-semibold mb-2">Is downloading content from social media legal?</h4>
                <p className="text-muted-foreground">
                  The legality varies by country and the specific content being downloaded. Always respect copyright laws and terms of service for the platforms you're downloading from. Our app is designed for downloading content you have the right to access.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">How do chunked downloads work?</h4>
                <p className="text-muted-foreground">
                  Chunked downloading splits a file into multiple parts that are downloaded simultaneously. This can significantly increase download speeds, especially on servers that limit bandwidth per connection. Our app automatically recombines the chunks into a complete file.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Can I download entire YouTube playlists?</h4>
                <p className="text-muted-foreground">
                  Yes, you can paste a YouTube playlist URL and choose to download all videos or select specific ones from the list. You can also choose your preferred quality and format.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">How do the download bots work?</h4>
                <p className="text-muted-foreground">
                  Bots use intelligent rules you define to automatically find and download content. For example, you can create a bot that monitors specific YouTube channels for new videos, or one that downloads torrents matching certain criteria.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Is there a limit to how many downloads I can have?</h4>
                <p className="text-muted-foreground">
                  There's no built-in limit to the number of downloads you can queue. However, running too many concurrent downloads might impact performance depending on your network and system capabilities.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center py-6">
          <h2 className="text-2xl font-bold mb-4">Powerful. Flexible. Fast.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MultiDownloader Pro combines advanced downloading technologies with an intuitive interface to provide the best downloading experience possible. Whether you're downloading large files, torrents, or social media content, our app has you covered with its powerful features and customizable options.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
