import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText = ({ text, className = '', delay = 0 }: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const characters = text.split('');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            isVisible
              ? 'opacity-100 blur-0 translate-y-0'
              : 'opacity-0 blur-sm translate-y-3'
          }`}
          style={{
            transitionDelay: isVisible ? `${index * 30}ms` : '0ms',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
