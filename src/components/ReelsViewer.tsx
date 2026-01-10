import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronUp, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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

const ReelsViewer = ({ reels, initialIndex, isOpen, onClose }: ReelsViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [isLoading, setIsLoading] = useState(true);
  const [playerState, setPlayerState] = useState<number>(-1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef<number>(0);

  const currentReel = reels[currentIndex];
  const videoId = getYouTubeId(currentReel?.videoUrl || '');

  // Reset state when viewer opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setProgress(0);
      setCurrentTime(0);
      setIsLoading(true);
      setPlayerState(-1);
    }
  }, [isOpen, initialIndex]);

  // Reset progress when switching reels
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsLoading(true);
    setPlayerState(-1);
    setDuration(60);
    
    // Scroll thumbnail strip to show current reel
    if (thumbnailStripRef.current) {
      const thumbnail = thumbnailStripRef.current.querySelector(`[data-index="${currentIndex}"]`);
      thumbnail?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentIndex]);

  // Listen for YouTube postMessage events
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data.event === 'infoDelivery' && data.info) {
          // Update current time and duration
          if (typeof data.info.currentTime === 'number') {
            setCurrentTime(data.info.currentTime);
            setIsLoading(false);
          }
          if (typeof data.info.duration === 'number' && data.info.duration > 0) {
            setDuration(data.info.duration);
          }
          if (typeof data.info.playerState === 'number') {
            setPlayerState(data.info.playerState);
            // playerState 0 = ended, auto-advance
            if (data.info.playerState === 0) {
              setCurrentIndex((prev) => (prev + 1) % reels.length);
            }
            // playerState 1 = playing
            if (data.info.playerState === 1) {
              setIsLoading(false);
            }
          }
        }
        
        if (data.event === 'onReady') {
          setIsLoading(false);
        }
      } catch (e) {
        // Ignore parse errors from non-YouTube messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen, reels.length]);

  // Update progress based on currentTime and duration
  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  // Fallback progress simulation if YouTube doesn't send events
  useEffect(() => {
    if (!isOpen || playerState === 1) return; // Don't use fallback if playing state detected

    const fallbackTimeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 2000);

    // Fallback progress if no YouTube events received
    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      if (playerState === -1) { // No YouTube events received
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed >= duration) {
          setCurrentIndex((prev) => (prev + 1) % reels.length);
        } else {
          setCurrentTime(elapsed);
          setProgress((elapsed / duration) * 100);
        }
      }
    }, 100);

    return () => {
      clearTimeout(fallbackTimeout);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isOpen, currentIndex, duration, reels.length, playerState, isLoading]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  }, [reels.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  }, [reels.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

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
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
        case 'ArrowRight':
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

  // Touch/swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

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
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !videoId) return null;

  // Enable JS API with enablejsapi=1 and origin for postMessage
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-4">
        <div className="max-w-md mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/60 text-xs mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-20 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Mute Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-20 text-white hover:bg-white/20"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </Button>

      {/* Navigation Arrows */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={goToPrev}
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={goToNext}
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>

      {/* Reel Counter */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 text-white/80 text-sm">
        {currentIndex + 1} / {reels.length}
      </div>

      {/* Keyboard Hints */}
      <div className="absolute bottom-28 right-4 z-20 text-white/40 text-xs hidden md:block">
        ←→↑↓ Navigate • M Mute • Esc Close
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-md flex-1 max-h-[70vh] aspect-[9/16] mx-auto mb-24">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10 rounded-lg">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          key={`${videoId}-${currentIndex}-${isMuted}`}
          src={embedUrl}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-8 pb-4">
        <div 
          ref={thumbnailStripRef}
          className="flex gap-2 px-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reels.map((reel, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={reel.id}
                data-index={index}
                onClick={() => goToIndex(index)}
                className={`relative flex-shrink-0 w-14 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? 'ring-2 ring-primary scale-110 z-10' 
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={reel.thumbnail}
                  alt={`Reel ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-primary/20" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReelsViewer;
