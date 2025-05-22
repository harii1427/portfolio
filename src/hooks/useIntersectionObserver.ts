import { useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  target: RefObject<HTMLElement>;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
  enabled = true
}: UseIntersectionObserverProps) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const element = target.current;
    if (!element) return;

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [target, onIntersect, threshold, rootMargin, enabled]);
};