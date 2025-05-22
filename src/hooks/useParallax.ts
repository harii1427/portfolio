import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  start?: string;
  end?: string;
}

export const useParallax = (
  elementRef: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const {
    speed = 0.5,
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top'
  } = options;

  const triggerRef = useRef<ScrollTrigger>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const movement = direction === 'vertical' ? 'y' : 'x';
    const distance = direction === 'vertical' ? 
      element.offsetHeight * speed :
      element.offsetWidth * speed;

    triggerRef.current = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub: true,
      onUpdate: (self) => {
        gsap.to(element, {
          [movement]: -distance * self.progress,
          ease: 'none',
          duration: 0.5
        });
      }
    });

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [speed, direction, start, end]);
};