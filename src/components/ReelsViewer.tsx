import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Volume2, VolumeX, X } from 'lucide-react';
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

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youTubeIframeApiPromise: Promise<void> | null = null;

const ensureYouTubeIframeApi = () => {
  if (youTubeIframeApiPromise) return youTubeIframeApiPromise;

  youTubeIframeApiPromise = new Promise<void>((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }

    // If script already exists, just wait for ready
    const existing = document.querySelector('script[data-youtube-iframe-api="true"]');
    if (existing) {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    tag.dataset.youtubeIframeApi = 'true';

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };

    document.head.appendChild(tag);
  });

  return youTubeIframeApiPromise;
};

// Extract YouTube video ID from shorts URL
const getYouTubeId = (url: string) => {
  const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

// Format time in mm:ss
const formatTime = (seconds: number) => {
  const safe = Number.isFinite(seconds) ? seconds : 0;
  const mins = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ReelsViewer = ({ reels, initialIndex, isOpen, onClose }: ReelsViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const progressTimerRef = useRef<number | null>(null);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const currentReel = reels[currentIndex];
  const videoId = getYouTubeId(currentReel?.videoUrl || '');

  const stopProgressTimer = useCallback(() => {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  const destroyPlayer = useCallback(() => {
    try {
      playerRef.current?.destroy?.();
    } catch {
      // ignore
    }
    playerRef.current = null;
    if (playerHostRef.current) playerHostRef.current.innerHTML = '';
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  }, [reels.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  }, [reels.length]);

  // Reset index when opened
  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  // Prevent body scroll when open (mobile friendly)
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

  // Create/destroy YouTube player (real-time progress)
  useEffect(() => {
    if (!isOpen || !videoId) return;

    let cancelled = false;

    // reset UI state for this reel
    setIsLoading(true);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    stopProgressTimer();
    destroyPlayer();

    (async () => {
      await ensureYouTubeIframeApi();
      if (cancelled) return;
      if (!playerHostRef.current) return;

      // IMPORTANT: React owns this div, but never its children.
      // We let the YT API inject an iframe inside.
      playerRef.current = new window.YT.Player(playerHostRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          // looping a single video requires playlist param
          loop: 1,
          playlist: videoId,
          mute: isMuted ? 1 : 0,
        },
        events: {
          onReady: (e: any) => {
            if (cancelled) return;

            try {
              const iframe = e.target?.getIframe?.() as HTMLIFrameElement | undefined;
              if (iframe) {
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = '0';
                // Allow our swipe overlay to always work (TikTok-like)
                iframe.style.pointerEvents = 'none';
              }
            } catch {
              // ignore
            }

            try {
              if (isMuted) e.target.mute();
              else e.target.unMute();
            } catch {
              // ignore
            }

            try {
              e.target.playVideo();
            } catch {
              // ignore
            }

            setIsLoading(false);

            // Poll real-time progress from the player
            progressTimerRef.current = window.setInterval(() => {
              try {
                const t = playerRef.current?.getCurrentTime?.() ?? 0;
                const d = playerRef.current?.getDuration?.() ?? 0;

                if (typeof t === 'number') setCurrentTime(t);
                if (typeof d === 'number' && d > 0) setDuration(d);

                if (typeof t === 'number' && typeof d === 'number' && d > 0) {
                  const p = Math.min(100, Math.max(0, (t / d) * 100));
                  setProgress(p);
                }
              } catch {
                // ignore
              }
            }, 200);
          },
          onStateChange: (e: any) => {
            if (cancelled) return;
            // 0 = ended
            if (e?.data === 0) {
              goToNext();
            }
          },
        },
      });
    })();

    return () => {
      cancelled = true;
      stopProgressTimer();
      destroyPlayer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, videoId, goToNext]);

  // Keep mute state in sync with the player
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (isMuted) p.mute();
      else p.unMute();
    } catch {
      // ignore
    }
  }, [isMuted]);

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

  // Touch/swipe gestures (vertical) - mobile friendly
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const diffY = touchStartY.current - endY;
      const diffX = touchStartX.current - endX;
      const threshold = 50;

      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
        if (diffY > 0) goToNext();
        else goToPrev();
      }
    },
    [goToNext, goToPrev]
  );

  // Mouse wheel navigation
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) goToNext();
      else goToPrev();
    },
    [goToNext, goToPrev]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container && isOpen) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [isOpen, handleWheel]);

  if (!isOpen || !videoId) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4">
        <div className="max-w-md mx-auto">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/70 text-xs mt-1.5 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-30 text-white hover:bg-white/20 h-12 w-12"
        onClick={onClose}
      >
        <X className="w-7 h-7" />
      </Button>

      {/* Mute Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-30 text-white hover:bg-white/20 h-12 w-12"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
      </Button>

      {/* Navigation Arrows */}
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

      {/* Video Container */}
      <div className="relative w-full max-w-md h-full max-h-[85vh] aspect-[9/16] mx-auto">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20 rounded-2xl">
            <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* YT injects an iframe in here */}
        <div ref={playerHostRef} className="w-full h-full rounded-2xl overflow-hidden" />

        {/* Touch overlay (ensures swipe works even over the video) */}
        <div className="absolute inset-0 z-10 md:hidden" />
      </div>
    </div>
  );
};

export default ReelsViewer;
