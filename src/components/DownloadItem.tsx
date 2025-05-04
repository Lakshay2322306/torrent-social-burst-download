
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Pause, Play, Trash2, FileType, X, Check } from "lucide-react";

interface DownloadItemProps {
  id: string;
  filename: string;
  source: string;
  type: string;
  size: string;
  progress: number;
  speed: string;
  status: 'downloading' | 'paused' | 'completed' | 'error' | 'queued';
  onDelete: (id: string) => void;
  onPauseResume: (id: string) => void;
}

const DownloadItem = ({
  id,
  filename,
  source,
  type,
  size,
  progress,
  speed,
  status,
  onDelete,
  onPauseResume,
}: DownloadItemProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'downloading': return 'text-download-primary';
      case 'paused': return 'text-download-warning';
      case 'completed': return 'text-download-success';
      case 'error': return 'text-download-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'downloading': return `Downloading • ${speed}`;
      case 'paused': return 'Paused';
      case 'completed': return 'Completed';
      case 'error': return 'Error';
      case 'queued': return 'Queued';
      default: return '';
    }
  };

  return (
    <div className="download-card mb-4 relative">
      <div className="flex items-start">
        <div className="p-3 rounded-lg bg-muted flex items-center justify-center mr-4">
          <FileType className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium truncate">{filename}</h3>
          <p className="text-sm text-muted-foreground truncate">{source}</p>
          
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-3 text-sm">
              <span className={getStatusColor()}>{getStatusText()}</span>
              <span className="text-muted-foreground">{size}</span>
            </div>
            
            <div className="flex gap-2">
              {!showConfirmDelete ? (
                <>
                  {status !== 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPauseResume(id)}
                      className="h-8 w-8 p-0"
                    >
                      {status === 'paused' || status === 'queued' ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Pause className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => setShowConfirmDelete(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => {
                      onDelete(id);
                      setShowConfirmDelete(false);
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setShowConfirmDelete(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadItem;
