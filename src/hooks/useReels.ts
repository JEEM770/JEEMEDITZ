import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Reel {
  id: string;
  youtube_url: string;
  video_id: string;
  thumbnail: string;
  views: string;
  platform: string;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

// Helper to extract YouTube video ID from URL
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Generate thumbnail URL from video ID
export const generateThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Fetch active reels (public)
export const useReels = () => {
  return useQuery({
    queryKey: ['reels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reels')
        .select('*')
        .eq('is_active', true)
        .order('position', { ascending: true });
      
      if (error) throw error;
      return data as Reel[];
    },
  });
};

// Fetch all reels (admin only)
export const useAllReels = () => {
  return useQuery({
    queryKey: ['reels', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reels')
        .select('*')
        .order('position', { ascending: true });
      
      if (error) throw error;
      return data as Reel[];
    },
  });
};

// Add a new reel
export const useAddReel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ youtubeUrl, views = '0' }: { youtubeUrl: string; views?: string }) => {
      const videoId = extractYouTubeId(youtubeUrl);
      if (!videoId) throw new Error('Invalid YouTube URL');
      
      const thumbnail = generateThumbnail(videoId);
      
      // Get current max position
      const { data: existingReels } = await supabase
        .from('reels')
        .select('position')
        .order('position', { ascending: false })
        .limit(1);
      
      const maxPosition = existingReels?.[0]?.position ?? -1;
      
      const { data, error } = await supabase
        .from('reels')
        .insert({
          youtube_url: youtubeUrl,
          video_id: videoId,
          thumbnail,
          views,
          platform: 'youtube',
          position: maxPosition + 1,
          is_active: true,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reels'] });
    },
  });
};

// Update a reel
export const useUpdateReel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Reel> }) => {
      const { data, error } = await supabase
        .from('reels')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reels'] });
    },
  });
};

// Delete a reel
export const useDeleteReel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('reels')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reels'] });
    },
  });
};

// Update positions (for drag & drop)
export const useUpdateReelPositions = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reels: { id: string; position: number }[]) => {
      const updates = reels.map(({ id, position }) => 
        supabase.from('reels').update({ position }).eq('id', id)
      );
      
      await Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reels'] });
    },
  });
};
