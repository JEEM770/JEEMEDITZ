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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
    }
  }, [isOpen, initialIndex]);

  // Reset progress when switching reels
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsLoading(true);
    setDuration(60);
  }, [currentIndex]);

  // YouTube postMessage events
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.currentTime === 'number') {
            setCurrentTime(data.info.currentTime);
            setIsLoading(false);
          }
          
          if (typeof data.info.duration === 'number' && data.info.duration > 0) {
            setDuration(data.info.duration);
          }
          
          if (typeof data.info.currentTime === 'number' && typeof data.info.duration === 'number' && data.info.duration > 0) {
            const progressPercent = (data.info.currentTime / data.info.duration) * 100;
            setProgress(progressPercent);
            
            if (data.info.duration - data.info.currentTime < 0.5 && data.info.currentTime > 1) {
              setCurrentIndex((prev) => (prev + 1) % reels.length);
            }
          }
          
          if (typeof data.info.playerState === 'number') {
            if (data.info.playerState === 0) {
              setCurrentIndex((prev) => (prev + 1) % reels.length);
            }
          }
        }
        
        if (data.event === 'onStateChange' || data.event === 'onReady') {
          setIsLoading(false);
        }
      } catch {
        // Ignore parsing errors
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen, reels.length]);

  // Fallback loading timeout
  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => setIsLoading(false), 3000);
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

  // Touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  // Mouse wheel navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) goToNext();
    else goToPrev();
  }, [goToNext, goToPrev]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && isOpen) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [isOpen, handleWheel]);

  // Prevent body scroll
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

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black"
      style={{ zIndex: 9999 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar - Top */}
      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="max-w-sm mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/60 text-xs mt-1 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-30 text-white hover:bg-white/20 w-10 h-10"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Mute Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-30 text-white hover:bg-white/20 w-10 h-10"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </Button>

      {/* Navigation Arrows - Right Side */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 w-10 h-10"
          onClick={goToPrev}
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 w-10 h-10"
          onClick={goToNext}
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>

      {/* Counter - Bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/80 text-sm font-mono">
        {currentIndex + 1} / {reels.length}
      </div>

      {/* Keyboard Hints */}
      <div className="absolute bottom-6 right-4 z-30 text-white/40 text-xs hidden md:block">
        ↑↓ Navigate • M Mute • Esc Close
      </div>

      {/* Mobile Swipe Hint */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 text-white/40 text-xs md:hidden animate-pulse">
        Swipe up/down to navigate
      </div>

      {/* Video Container - TRUE CENTER */}
      <div 
        className="absolute z-10"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(340px, 85vw)',
          height: 'min(604px, 75vh)',
          maxWidth: '340px',
          maxHeight: '604px',
        }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
              <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
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
      </div>
    </div>
  );
};

export default ReelsViewer;