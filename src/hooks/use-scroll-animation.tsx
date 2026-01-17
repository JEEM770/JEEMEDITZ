import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// Hook for scroll-based reveal animations
export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Hook for parallax scrolling effect
export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return { ref, y: smoothY };
};

// Hook for scroll progress indicator
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return smoothProgress;
};

// Hook for section-based scroll progress
export const useSectionProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return { ref, progress: scrollYProgress };
};

// Hook for scale on scroll
export const useScrollScale = (start = 0.8, end = 1) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [start, end]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return { ref, scale: smoothScale };
};

// Hook for opacity on scroll
export const useScrollOpacity = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return { ref, opacity: smoothOpacity };
};

// Hook for blur on scroll
export const useScrollBlur = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const blur = useTransform(scrollYProgress, [0, 1], [10, 0]);

  return { ref, blur };
};

// Hook for rotation on scroll
export const useScrollRotate = (degrees = 10) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-degrees, degrees]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return { ref, rotate: smoothRotate };
};

// Hook for horizontal scroll animation
export const useHorizontalScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return { ref, x: smoothX };
};

// Hook for combined scroll animations
export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return { 
    ref, 
    y: smoothY, 
    opacity: smoothOpacity, 
    scale: smoothScale,
    progress: scrollYProgress,
  };
};

// Hook for counter animation
export const useCounterAnimation = (
  end: number,
  duration = 2,
  trigger = true
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth counting
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);

  return count;
};

export default {
  useScrollReveal,
  useParallax,
  useScrollProgress,
  useSectionProgress,
  useScrollScale,
  useScrollOpacity,
  useScrollBlur,
  useScrollRotate,
  useHorizontalScroll,
  useScrollAnimation,
  useCounterAnimation,
};
