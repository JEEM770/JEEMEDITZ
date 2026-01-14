import { useRef, useState, ReactNode, MouseEvent } from 'react';

interface HoverCard3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const HoverCard3D = ({ children, className = '', intensity = 10 }: HoverCard3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * intensity;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * intensity;

    setTransform({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-300 ease-smooth ${className}`}
      style={{
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-lg bg-primary/20 blur-xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translateZ(-20px)' }}
      />
      <div style={{ transform: 'translateZ(0)' }}>{children}</div>
    </div>
  );
};

export default HoverCard3D;
