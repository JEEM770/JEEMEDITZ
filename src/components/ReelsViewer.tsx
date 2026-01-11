import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronUp, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Reel {
  id: number;
  thumbnail: string;
  videoUrl: string;
  views: string;
  platform: string;
  link: string;
}

interface ReelsViewerProps {
  reels: Reel[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

// Extract YouTube video ID from shorts URL
const getYouTubeId = (url: string) => {
  const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

// Format time in mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Default duration for YouTube Shorts (typically 15-60 seconds)
const DEFAULT_DURATION = 60;

const ReelsViewer = ({ reels, initialIndex, isOpen, onClose }: ReelsViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentReel = reels[currentIndex];
  const videoId = getYouTubeId(currentReel?.videoUrl || '');

  // Clear interval helper
  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Reset state when viewer opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setProgress(0);
      setCurrentTime(0);
      setIsLoading(true);
    } else {
      clearProgressInterval();
    }
  }, [isOpen, initialIndex, clearProgressInterval]);

  // Reset progress when switching reels
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsLoading(true);
    clearProgressInterval();
    
    // Start progress after loading delay
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
      startTimeRef.current = Date.now();
      
      progressIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        
        if (elapsed >= DEFAULT_DURATION) {
          // Auto-advance to next reel
          setCurrentIndex((prev) => (prev + 1) % reels.length);
        } else {
          setCurrentTime(elapsed);
          setProgress((elapsed / DEFAULT_DURATION) * 100);
        }
      }, 100);
    }, 1500);

    return () => {
      clearTimeout(loadTimeout);
      clearProgressInterval();
    };
  }, [currentIndex, reels.length, clearProgressInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearProgressInterval();
  }, [clearProgressInterval]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  }, [reels.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  }, [reels.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          goToPrev();
          break;
        case 'ArrowDown':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
        case 'm':
        case 'M':
          setIsMuted((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goToNext, goToPrev, onClose]);

  // Touch/swipe gestures - improved for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevent default to stop page scrolling
    e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = touchStartY.current - touchEndY;
    const diffX = touchStartX.current - touchEndX;
    const threshold = 50;

    // Check if it's primarily a vertical swipe
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
      if (diffY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  }, [goToNext, goToPrev]);

  // Mouse wheel navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      goToNext();
    } else {
      goToPrev();
    }
  }, [goToNext, goToPrev]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && isOpen) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [isOpen, handleWheel]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  if (!isOpen || !videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4 safe-area-inset-top">
        <div className="max-w-md mx-auto">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/70 text-xs mt-1.5 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(DEFAULT_DURATION)}</span>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-16 right-4 z-30 text-white hover:bg-white/20 h-12 w-12"
        onClick={onClose}
      >
        <X className="w-7 h-7" />
      </Button>

      {/* Mute Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-16 left-4 z-30 text-white hover:bg-white/20 h-12 w-12"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
      </Button>

      {/* Navigation Arrows - Larger for mobile */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 h-14 w-14 rounded-full bg-white/10"
          onClick={goToPrev}
        >
          <ChevronUp className="w-8 h-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 h-14 w-14 rounded-full bg-white/10"
          onClick={goToNext}
        >
          <ChevronDown className="w-8 h-8" />
        </Button>
      </div>

      {/* Reel Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/90 text-base font-medium bg-black/40 px-4 py-2 rounded-full">
        {currentIndex + 1} / {reels.length}
      </div>

      {/* Keyboard Hints - Desktop only */}
      <div className="absolute bottom-8 right-4 z-30 text-white/50 text-xs hidden md:block">
        ↑↓ Navigate • M Mute • Esc Close
      </div>

      {/* Mobile Swipe Hint - Shows briefly */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 text-white/50 text-sm md:hidden animate-pulse">
        ↕ Swipe to navigate
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-md h-full max-h-[85vh] aspect-[9/16] mx-auto">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10 rounded-2xl">
            <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <iframe
          key={`${videoId}-${currentIndex}`}
          src={embedUrl}
          className="w-full h-full rounded-2xl pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Touch overlay for swipe gestures - covers iframe */}
        <div 
          className="absolute inset-0 z-10 md:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
    </div>
  );
};

export default ReelsViewer;
