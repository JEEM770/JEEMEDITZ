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

const ReelsViewer = ({ reels, initialIndex, isOpen, onClose }: ReelsViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const touchStartY = useRef<number>(0);

  const currentReel = reels[currentIndex];
  const videoId = getYouTubeId(currentReel?.videoUrl || '');

  // Reset state when reel changes or viewer opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setProgress(0);
      setCurrentTime(0);
      setIsLoading(true);
      setIsPlaying(false);
    }
  }, [isOpen, initialIndex]);

  // Reset progress when switching reels
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsLoading(true);
    setIsPlaying(false);
    setDuration(60); // Reset to default
  }, [currentIndex]);

  // Listen for YouTube postMessage events for real-time progress
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from YouTube
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data.event === 'infoDelivery' && data.info) {
          // Update current time
          if (typeof data.info.currentTime === 'number') {
            setCurrentTime(data.info.currentTime);
            setIsLoading(false);
          }
          
          // Update duration
          if (typeof data.info.duration === 'number' && data.info.duration > 0) {
            setDuration(data.info.duration);
          }
          
          // Calculate progress
          if (typeof data.info.currentTime === 'number' && typeof data.info.duration === 'number' && data.info.duration > 0) {
            const progressPercent = (data.info.currentTime / data.info.duration) * 100;
            setProgress(progressPercent);
            
            // Auto-advance when video ends (within 0.5 seconds of end)
            if (data.info.duration - data.info.currentTime < 0.5 && data.info.currentTime > 1) {
              setCurrentIndex((prev) => (prev + 1) % reels.length);
            }
          }
          
          // Check player state
          if (typeof data.info.playerState === 'number') {
            // 1 = playing, 2 = paused, 0 = ended
            setIsPlaying(data.info.playerState === 1);
            if (data.info.playerState === 0) {
              // Video ended, go to next
              setCurrentIndex((prev) => (prev + 1) % reels.length);
            }
          }
        }
        
        // Handle onStateChange event
        if (data.event === 'onStateChange') {
          setIsLoading(false);
        }
        
        // Initial ready event
        if (data.event === 'onReady') {
          setIsLoading(false);
        }
      } catch {
        // Ignore parsing errors from non-YouTube messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen, reels.length]);

  // Request video info periodically to ensure we get updates
  useEffect(() => {
    if (!isOpen || !iframeRef.current) return;

    const requestInfo = () => {
      if (iframeRef.current?.contentWindow) {
        // Request current time and duration info
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'listening' }),
          'https://www.youtube.com'
        );
      }
    };

    // Initial request after iframe loads
    const initialTimeout = setTimeout(requestInfo, 1000);
    
    // Request periodically for updates
    const interval = setInterval(requestInfo, 500);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isOpen, currentIndex]);

  // Fallback loading timeout
  useEffect(() => {
    if (!isOpen) return;
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isOpen, currentIndex]);

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

  // Enable JS API for postMessage communication
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Container - Absolute Center */}
      <div 
        className="absolute rounded-xl overflow-hidden border border-white/10"
        style={{ 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 360px)', 
          height: 'min(80vh, 640px)',
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          key={`${videoId}-${currentIndex}`}
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/80 text-sm">
        {currentIndex + 1} / {reels.length}
      </div>

      {/* Keyboard Hints */}
      <div className="absolute bottom-4 right-4 z-20 text-white/40 text-xs hidden md:block">
        ↑↓ Navigate • M Mute • Esc Close
      </div>

      {/* Mobile Swipe Hint */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 text-white/40 text-xs md:hidden animate-pulse">
        Swipe up/down to navigate
      </div>
    </div>
  );
};

export default ReelsViewer;
