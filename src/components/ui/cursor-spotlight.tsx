import React, { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CursorSpotlightProps {
  children: React.ReactNode;
  className?: string;
  spotlightSize?: number;
  spotlightColor?: string;
  spotlightOpacity?: number;
}

export const CursorSpotlight = ({
  children,
  className,
  spotlightSize = 600,
  spotlightColor = 'hsl(var(--primary))',
  spotlightOpacity = 0.15,
}: CursorSpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isInView, setIsInView] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 50, y: 50 })}
    >
      {/* Ambient spotlight that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: isInView ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}% ${mousePosition.y}%, ${spotlightColor} / ${spotlightOpacity}, transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CursorSpotlight;
