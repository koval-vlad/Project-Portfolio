"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { TransitionType, transitionVariants } from './SVGSpriteSlideshow';

interface SlideShowProps {
  currentSlide: number;
  imageSrc: string;
  transitionType?: TransitionType;
  className?: string;
}

export default function SlideShow({
  currentSlide,
  imageSrc,
  transitionType = 'random',
  className = '',
}: SlideShowProps) {
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
    (isForward: boolean = true) => {
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
        const isForward = isSlideChange ? currentSlide > previousSlide : true;
        const newTransition = getRandomTransition(isForward);
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

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence>
        <motion.div
          key={`${currentSlide}-${activeTransition.name}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={transitionConfig.initial}
          animate={transitionConfig.animate}
          exit={transitionConfig.exit}
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
