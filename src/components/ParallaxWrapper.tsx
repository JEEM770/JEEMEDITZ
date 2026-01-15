import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxWrapperProps {
  children?: ReactNode;
  speed?: number; // Negative = slower (background), Positive = faster (foreground)
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

const ParallaxWrapper = ({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'vertical'
}: ParallaxWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const movement = speed * 100;
    const prop = direction === 'vertical' ? 'y' : 'x';

    gsap.fromTo(
      element,
      { [prop]: -movement },
      {
        [prop]: movement,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ParallaxWrapper;
