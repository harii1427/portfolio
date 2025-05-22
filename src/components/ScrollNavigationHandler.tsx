// src/components/ScrollNavigationHandler.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNextPage, getPreviousPage } from '../utils/pageSequence';
import { throttle } from 'lodash';

const SCROLL_THRESHOLD = 75;
const NAVIGATION_THROTTLE_MS = 1200;

const ScrollNavigationHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);
  const accumulatedDeltaY = useRef(0);
  const previousPathRef = useRef<string | null>(null);

  // Scroll to top on ANY route change
  useEffect(() => {
    if (previousPathRef.current !== location.pathname) {
      console.log('Scrolling to top for new page:', location.pathname);
      window.scrollTo(0, 0);
    }
    previousPathRef.current = location.pathname;
  }, [location.pathname]);

  const handleNavigation = useCallback((targetPath: string) => {
    if (isNavigatingRef.current || location.pathname === targetPath) {
      accumulatedDeltaY.current = 0;
      return;
    }

    console.log(`Attempting to navigate from ${location.pathname} to ${targetPath}`);
    isNavigatingRef.current = true;
    accumulatedDeltaY.current = 0;
    navigate(targetPath);

    setTimeout(() => {
      isNavigatingRef.current = false;
      console.log('Navigation lock released.');
    }, NAVIGATION_THROTTLE_MS);
  }, [navigate, location.pathname]);

  const throttledNavigate = useRef(
    throttle(handleNavigation, NAVIGATION_THROTTLE_MS, { leading: true, trailing: false })
  ).current;

  // Check if we're near the bottom of the page (includes footer)
  const isNearBottom = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const padding = 50; // buffer zone
    return scrollPosition + padding >= documentHeight;
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isNavigatingRef.current) {
        return;
      }

      accumulatedDeltaY.current += event.deltaY;

      // --- SCROLL DOWN LOGIC ---
      if (accumulatedDeltaY.current > SCROLL_THRESHOLD) {
        if (location.pathname === '/') {
          // On Home ('/'), HeroAnimation handles scroll-down to /about
          if (!isNavigatingRef.current) accumulatedDeltaY.current = 0;
        } else if (isNearBottom()) {
          const nextPage = getNextPage(location.pathname);
          if (nextPage) {
            console.log('Global: Near Bottom, Scrolling Down detected, navigating to next page:', nextPage);
            throttledNavigate(nextPage);
          } else {
            accumulatedDeltaY.current = 0;
          }
        } else {
          accumulatedDeltaY.current = 0;
        }
      }

      // --- SCROLL UP LOGIC ---
      else if (accumulatedDeltaY.current < -SCROLL_THRESHOLD) {
        const prevPage = getPreviousPage(location.pathname);
        if (prevPage) {
          console.log('Global: Scroll Up detected, navigating to previous page:', prevPage);
          throttledNavigate(prevPage);
        } else {
          accumulatedDeltaY.current = 0;
        }
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      throttledNavigate.cancel();
    };
  }, [location.pathname, throttledNavigate, isNearBottom, handleNavigation]);

  return null;
};

export default ScrollNavigationHandler;
