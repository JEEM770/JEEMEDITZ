import { useState } from 'react';
import { useAllReels, useDeleteReel, useUpdateReel, useUpdateReelPositions, Reel } from '@/hooks/useReels';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Trash2, 
  Loader2, 
  GripVertical, 
  Eye, 
  EyeOff, 
  Film,
  ExternalLink,
  Edit2,
  Check,
  X
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ReelsList = () => {
  const { data: reels, isLoading, error } = useAllReels();
  const deleteReel = useDeleteReel();
  const updateReel = useUpdateReel();
  const updatePositions = useUpdateReelPositions();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editViews, setEditViews] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteReel.mutateAsync(id);
      toast({
        title: 'Reel Deleted',
        description: 'The reel has been removed.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete reel',
        variant: 'destructive',
      });
    }
  };

  const handleToggleActive = async (reel: Reel) => {
    try {
      await updateReel.mutateAsync({
        id: reel.id,
        updates: { is_active: !reel.is_active },
      });
      toast({
        title: reel.is_active ? 'Reel Hidden' : 'Reel Visible',
        description: reel.is_active 
          ? 'The reel is now hidden from the portfolio' 
          : 'The reel is now visible in the portfolio',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update reel',
        variant: 'destructive',
      });
    }
  };

  const handleEditViews = async (id: string) => {
    try {
      await updateReel.mutateAsync({
        id,
        updates: { views: editViews },
      });
      setEditingId(null);
      toast({
        title: 'Views Updated',
        description: 'The view count has been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update views',
        variant: 'destructive',
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId || !reels) return;

    const draggedIndex = reels.findIndex(r => r.id === draggedId);
    const targetIndex = reels.findIndex(r => r.id === targetId);

    const newReels = [...reels];
    const [draggedItem] = newReels.splice(draggedIndex, 1);
    newReels.splice(targetIndex, 0, draggedItem);

    const updates = newReels.map((reel, index) => ({
      id: reel.id,
      position: index,
    }));

    try {
      await updatePositions.mutateAsync(updates);
      toast({
        title: 'Order Updated',
        description: 'The reel order has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order',
        variant: 'destructive',
      });
    }

    setDraggedId(null);
  };

  if (isLoading) {
    return (
      <Card className="card-glass">
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="card-glass">
        <CardContent className="py-12 text-center">
          <p className="text-destructive">Failed to load reels</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Film className="w-5 h-5 text-primary" />
          Manage Reels ({reels?.length || 0})
        </CardTitle>
        <CardDescription>
          Drag to reorder, toggle visibility, or delete reels
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!reels || reels.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No reels yet. Add your first reel above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reels.map((reel) => (
              <div
                key={reel.id}
                draggable
                onDragStart={(e) => handleDragStart(e, reel.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, reel.id)}
                className={`flex items-center gap-4 p-3 rounded-lg border border-border bg-card/50 transition-all ${
                  draggedId === reel.id ? 'opacity-50 scale-95' : ''
                } ${!reel.is_active ? 'opacity-60' : ''}`}
              >
                {/* Drag Handle */}
                <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Thumbnail */}
                <div className="w-16 h-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={reel.thumbnail}
                    alt={`Reel ${reel.video_id}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${reel.video_id}/hqdefault.jpg`;
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm truncate">{reel.video_id}</p>
                  
                  {/* Views */}
                  <div className="flex items-center gap-2 mt-1">
                    {editingId === reel.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={editViews}
                          onChange={(e) => setEditViews(e.target.value)}
                          className="h-7 w-20 text-xs"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEditViews(reel.id)}
                          className="p-1 hover:text-primary"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(reel.id);
                          setEditViews(reel.views);
                        }}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-3 h-3" />
                        <span>{reel.views}</span>
                        <Edit2 className="w-3 h-3 ml-1" />
                      </button>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="mt-2">
                    {reel.is_active ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                        Active
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Hidden
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Open in YouTube */}
                  <GlowButton
                    size="icon"
                    variant="ghost"
                    onClick={() => window.open(reel.youtube_url, '_blank')}
                    title="Open in YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </GlowButton>

                  {/* Toggle Visibility */}
                  <div className="flex items-center gap-2" title={reel.is_active ? 'Hide reel' : 'Show reel'}>
                    <Switch
                      checked={reel.is_active}
                      onCheckedChange={() => handleToggleActive(reel)}
                    />
                    {reel.is_active ? (
                      <Eye className="w-4 h-4 text-primary" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>

                  {/* Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <GlowButton size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </GlowButton>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Reel?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The reel will be permanently removed from your portfolio.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(reel.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReelsList;
