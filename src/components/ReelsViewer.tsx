import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Volume2, VolumeX, X } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";

interface Reel {
  id: string | number;
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

const getYouTubeId = (url: string) => {
  const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
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
  const videoId = getYouTubeId(currentReel?.videoUrl || "");

  // Reset state when viewer opens
  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(initialIndex);
    setProgress(0);
    setCurrentTime(0);
    setDuration(60);
    setIsLoading(true);
  }, [isOpen, initialIndex]);

  // Reset when switching reels
  useEffect(() => {
    if (!isOpen) return;
    setProgress(0);
    setCurrentTime(0);
    setDuration(60);
    setIsLoading(true);
  }, [currentIndex, isOpen]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  }, [reels.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  }, [reels.length]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowDown":
          e.preventDefault();
          goToNext();
          break;
        case "Escape":
          onClose();
          break;
        case "m":
        case "M":
          setIsMuted((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, isOpen, onClose]);

  // Touch/swipe gestures
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
    if (!container || !isOpen) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel, isOpen]);

  // YouTube postMessage events for progress
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.event === "infoDelivery" && data.info) {
          if (typeof data.info.currentTime === "number") {
            setCurrentTime(data.info.currentTime);
            setIsLoading(false);
          }

          if (typeof data.info.duration === "number" && data.info.duration > 0) {
            setDuration(data.info.duration);
          }

          if (
            typeof data.info.currentTime === "number" &&
            typeof data.info.duration === "number" &&
            data.info.duration > 0
          ) {
            setProgress((data.info.currentTime / data.info.duration) * 100);

            // Auto-advance at end
            if (data.info.duration - data.info.currentTime < 0.5 && data.info.currentTime > 1) {
              setCurrentIndex((prev) => (prev + 1) % reels.length);
            }
          }

          if (typeof data.info.playerState === "number" && data.info.playerState === 0) {
            setCurrentIndex((prev) => (prev + 1) % reels.length);
          }
        }

        if (data.event === "onReady" || data.event === "onStateChange") {
          setIsLoading(false);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isOpen, reels.length]);

  // Ask YouTube for info periodically (needed for consistent updates)
  useEffect(() => {
    if (!isOpen || !iframeRef.current) return;

    const requestInfo = () => {
      iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), "https://www.youtube.com");
    };

    const t = window.setTimeout(requestInfo, 800);
    const i = window.setInterval(requestInfo, 500);

    return () => {
      window.clearTimeout(t);
      window.clearInterval(i);
    };
  }, [isOpen, currentIndex]);

  // Fallback loading timeout
  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => setIsLoading(false), 3500);
    return () => window.clearTimeout(t);
  }, [isOpen, currentIndex]);

  if (!isOpen || !videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;

  // NOTE: We render in a portal to avoid any parent transforms breaking `position: fixed`.
  // This is the root cause of "video stuck at bottom" issues.
  const ui = (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Reels viewer"
    >
      {/* Centered Video */}
      <div className="absolute inset-0 flex items-center justify-center px-4 py-20">
        <div className="relative w-[min(88vw,360px)] aspect-[9/16]">
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border/50 bg-card shadow-lg">
            {isLoading && (
              <div className="absolute inset-0 z-20 grid place-items-center bg-background/80">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <iframe
              ref={iframeRef}
              key={`${videoId}-${currentIndex}`}
              src={embedUrl}
              title={`Reel ${currentIndex + 1}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="max-w-sm mx-auto">
          <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-muted-foreground text-xs mt-1 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Close */}
      <GlowButton
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-30 text-foreground"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </GlowButton>

      {/* Mute */}
      <GlowButton
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-30 text-foreground"
        onClick={() => setIsMuted((v) => !v)}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </GlowButton>

      {/* Navigation */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        <GlowButton
          variant="ghost"
          size="icon"
          className="text-foreground"
          onClick={goToPrev}
          aria-label="Previous reel"
        >
          <ChevronUp className="w-6 h-6" />
        </GlowButton>
        <GlowButton
          variant="ghost"
          size="icon"
          className="text-foreground"
          onClick={goToNext}
          aria-label="Next reel"
        >
          <ChevronDown className="w-6 h-6" />
        </GlowButton>
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-muted-foreground text-sm font-mono">
        {currentIndex + 1} / {reels.length}
      </div>

      {/* Hints */}
      <div className="absolute bottom-6 right-4 z-30 text-muted-foreground/70 text-xs hidden md:block">
        ↑↓ Navigate • M Mute • Esc Close
      </div>
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 text-muted-foreground/70 text-xs md:hidden animate-pulse">
        Swipe up/down to navigate
      </div>
    </div>
  );

  return createPortal(ui, document.body);
};

export default ReelsViewer;
