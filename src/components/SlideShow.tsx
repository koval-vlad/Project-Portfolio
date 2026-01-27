"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useCallback, useRef, type ComponentProps } from 'react';
import { TransitionType, transitionVariants } from '@/lib/slideshow-transitions';

const SWIPE_THRESHOLD_PX = 50;

function getTouchDistance(touches: TouchList): number {
  if (touches.length < 2) return 0;
  const a = touches.item(0);
  const b = touches.item(1);
  if (!a || !b) return 0;
  return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
}

interface SlideShowProps {
  currentSlide: number;
  imageSrc: string;
  transitionType?: TransitionType;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  scale?: number;
  onPinchZoom?: (scale: number) => void;
  onPan?: (deltaX: number, deltaY: number) => void;
}

export default function SlideShow({
  currentSlide,
  imageSrc,
  transitionType = 'random',
  className = '',
  onSwipeLeft,
  onSwipeRight,
  scale = 1,
  onPinchZoom,
  onPan,
}: SlideShowProps) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const lastTouchX = useRef<number>(0);
  const lastTouchY = useRef<number>(0);
  const pinchStartDistance = useRef<number>(0);
  const pinchStartScale = useRef<number>(1);
  const isPinching = useRef<boolean>(false);
  const isPanning = useRef<boolean>(false);
  const [previousSlide, setPreviousSlide] = useState<number>(currentSlide);
  const [lastUsedTransition, setLastUsedTransition] = useState<string>('');
  const [activeTransition, setActiveTransition] = useState(() => {
    if (transitionType === 'random') {
      const allTransitions = transitionVariants.filter((t) => t.name !== 'random');
      const randomIndex = Math.floor(Math.random() * allTransitions.length);
      return allTransitions[randomIndex];
    }
    return transitionVariants[1];
  });
  const hasInitializedRandom = useRef(transitionType === 'random');

  const getRandomTransition = useCallback(
    (_isForward: boolean = true) => {
      const allTransitions = transitionVariants.filter((t) => t.name !== 'random');
      const availableTransitions = allTransitions.filter((t) => t.name !== lastUsedTransition);
      const transitionsToChooseFrom =
        availableTransitions.length > 0 ? availableTransitions : allTransitions;
      const randomIndex = Math.floor(Math.random() * transitionsToChooseFrom.length);
      const selectedTransition = transitionsToChooseFrom[randomIndex];
      setLastUsedTransition(selectedTransition.name);
      return selectedTransition;
    },
    [lastUsedTransition]
  );

  useEffect(() => {
    if (transitionType === 'random') {
      const isSlideChange = currentSlide !== previousSlide;
      const shouldPickRandom = isSlideChange || !hasInitializedRandom.current;

      if (shouldPickRandom) {
        const newTransition = getRandomTransition(currentSlide > previousSlide);
        setActiveTransition(newTransition);
        hasInitializedRandom.current = true;
      }
    } else {
      const selectedVariant = transitionVariants.find((v) => v.name === transitionType);
      if (selectedVariant) {
        setActiveTransition(selectedVariant);
      }
      hasInitializedRandom.current = false;
    }

    setPreviousSlide(currentSlide);
  }, [currentSlide, transitionType, previousSlide, getRandomTransition]);

  const transitionConfig = {
    initial: activeTransition.initial,
    animate: activeTransition.animate,
    exit: activeTransition.exit,
    transition: { duration: 0.6, ease: 'easeInOut' as const },
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        touchStartX.current = x;
        touchStartY.current = y;
        lastTouchX.current = x;
        lastTouchY.current = y;
        isPinching.current = false;
        isPanning.current = false;
      } else if (e.touches.length === 2) {
        isPinching.current = true;
        isPanning.current = false;
        pinchStartDistance.current = getTouchDistance(e.nativeEvent.touches);
        pinchStartScale.current = scale;
      }
    },
    [scale]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && isPinching.current && onPinchZoom) {
        e.preventDefault();
        const dist = getTouchDistance(e.nativeEvent.touches);
        if (pinchStartDistance.current > 0) {
          const ratio = dist / pinchStartDistance.current;
          const newScale = Math.min(3, Math.max(0.5, pinchStartScale.current * ratio));
          onPinchZoom(newScale);
        }
        return;
      }
      if (e.touches.length === 1 && onPan) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const deltaX = x - lastTouchX.current;
        const deltaY = y - lastTouchY.current;
        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
          isPanning.current = true;
          onPan(deltaX, deltaY);
        }
        lastTouchX.current = x;
        lastTouchY.current = y;
      }
    },
    [onPinchZoom, onPan]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length < 2) {
        isPinching.current = false;
      }
      if (e.changedTouches.length !== 1 || isPinching.current || isPanning.current) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;
      if (deltaX < 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    },
    [onSwipeLeft, onSwipeRight]
  );

  return (
    <div
      className={`relative w-full h-full overflow-hidden touch-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }}
    >
      <AnimatePresence>
        <motion.div
          key={`${currentSlide}-${activeTransition.name}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={transitionConfig.initial as ComponentProps<typeof motion.div>['initial']}
          animate={transitionConfig.animate as ComponentProps<typeof motion.div>['animate']}
          exit={transitionConfig.exit as ComponentProps<typeof motion.div>['exit']}
          transition={transitionConfig.transition}
          style={{ willChange: 'transform, opacity, clip-path' }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full max-w-full max-h-full object-contain object-top"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-muted-foreground">Loading slide...</div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
