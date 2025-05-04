
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Share, 
  Link as LinkIcon,
  Bot, 
  MessageSquare,
  ChevronLeft, 
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: Download, label: 'Downloads', path: '/' },
    { icon: Share, label: 'Social Media', path: '/social' },
    { icon: LinkIcon, label: 'Torrents', path: '/torrents' },
    { icon: Bot, label: 'Bots', path: '/bots' },
    { icon: MessageSquare, label: 'About', path: '/about' },
  ];

  return (
    <div className={`h-screen flex flex-col bg-sidebar transition-all duration-300 border-r border-border ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && <h2 className="text-lg font-semibold">MultiDownloader</h2>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)} 
          className={collapsed ? "mx-auto" : ""}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 py-6 px-2 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="flex items-center px-4 py-3 rounded-md hover:bg-sidebar-accent transition-colors"
            >
              <item.icon className="text-primary h-5 w-5" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <Button className={`${collapsed ? 'p-2' : 'w-full'} download-button`}>
          <Download className="h-5 w-5" />
          {!collapsed && <span className="ml-2">New Download</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
