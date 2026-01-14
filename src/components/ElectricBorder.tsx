import { ReactNode } from 'react';

interface ElectricBorderProps {
  children: ReactNode;
  className?: string;
}

const ElectricBorder = ({ children, className = '' }: ElectricBorderProps) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary via-glow-secondary to-primary opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow" />
      
      {/* Glow layer */}
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/30 via-glow-secondary/30 to-primary/30 opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative bg-card rounded-lg">
        {children}
      </div>

      {/* Corner sparks */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-glow-secondary rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-glow-secondary rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default ElectricBorder;
