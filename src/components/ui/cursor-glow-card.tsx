import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CursorGlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  tiltEffect?: boolean;
}

export const CursorGlowCard = ({
  children,
  className,
  glowColor = 'hsl(var(--primary))',
  glowIntensity = 'medium',
  tiltEffect = true,
}: CursorGlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const intensityMap = {
    low: { glow: 0.1, blur: 100 },
    medium: { glow: 0.2, blur: 150 },
    high: { glow: 0.35, blur: 200 },
  };

  const { glow, blur } = intensityMap[glowIntensity];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  }, []);

  const calculateTilt = () => {
    if (!tiltEffect || !isHovered) return { rotateX: 0, rotateY: 0 };
    
    const rotateX = (mousePosition.y - 50) * -0.1;
    const rotateY = (mousePosition.x - 50) * 0.1;
    
    return { rotateX, rotateY };
  };

  const { rotateX, rotateY } = calculateTilt();

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl transition-all duration-300',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 50, y: 50 });
      }}
      style={{
        transform: tiltEffect
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : undefined,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cursor-following glow effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${blur}px circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor} / ${glow}, transparent 40%)`,
        }}
      />
      
      {/* Animated border glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${glowColor} / 0.3`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
};

export default CursorGlowCard;
