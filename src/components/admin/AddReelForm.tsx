import { useState } from 'react';
import { useAddReel, extractYouTubeId, generateThumbnail } from '@/hooks/useReels';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2, Play, X } from 'lucide-react';

const AddReelForm = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [views, setViews] = useState('');
  const [preview, setPreview] = useState<{ videoId: string; thumbnail: string } | null>(null);
  const addReel = useAddReel();
  const { toast } = useToast();

  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url);
    
    const videoId = extractYouTubeId(url);
    if (videoId) {
      setPreview({
        videoId,
        thumbnail: generateThumbnail(videoId),
      });
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!preview) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid YouTube Shorts URL',
        variant: 'destructive',
      });
      return;
    }

    try {
      await addReel.mutateAsync({ youtubeUrl, views: views || '0' });
      toast({
        title: 'Reel Added!',
        description: 'The reel has been added successfully.',
      });
      setYoutubeUrl('');
      setViews('');
      setPreview(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add reel',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="card-glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Add New Reel
        </CardTitle>
        <CardDescription>
          Paste a YouTube Shorts URL to add it to your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="youtube-url">YouTube Shorts URL</Label>
                <Input
                  id="youtube-url"
                  type="url"
                  placeholder="https://youtube.com/shorts/xxxxxxx"
                  value={youtubeUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  required
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground">
                  Supports: youtube.com/shorts/xxx, youtu.be/xxx
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="views">Views Count (optional)</Label>
                <Input
                  id="views"
                  type="text"
                  placeholder="e.g., 12.5K"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <GlowButton 
                type="submit" 
                disabled={!preview || addReel.isPending}
                className="w-full"
              >
                {addReel.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Reel
                  </>
                )}
              </GlowButton>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              {preview ? (
                <div className="relative aspect-[9/16] max-w-[200px] rounded-xl overflow-hidden bg-muted border border-border group">
                  <img 
                    src={preview.thumbnail} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${preview.videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setYoutubeUrl('');
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs text-foreground bg-background/80 rounded px-2 py-1 font-mono truncate">
                      {preview.videoId}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="aspect-[9/16] max-w-[200px] rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
                  <p className="text-sm text-muted-foreground text-center px-4">
                    Enter a YouTube URL to see preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddReelForm;
