'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, type Transition } from 'framer-motion';

export interface TextRollProps {
  children: string;
  className?: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  transition?: Transition;
  onAnimationComplete?: () => void;
}

export function TextRoll({
  children,
  className = '',
  duration = 0.75,
  getEnterDelay = (i) => i * 0.04,
  getExitDelay = (i) => i * 0.04,
  transition = { ease: [0.16, 1, 0.3, 1] },
  onAnimationComplete,
}: TextRollProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const [isHovered, setIsHovered] = useState(false);

  // Split into words so words wrap cleanly on mobile without breaking letters
  const words = children.split(' ');
  let letterCounter = 0;

  return (
    <span
      ref={containerRef}
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="text"
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap items-baseline">
        {words.map((word, wordIndex) => {
          const wordLetters = word.split('');
          const wordStartIdx = letterCounter;
          letterCounter += wordLetters.length;

          return (
            <React.Fragment key={wordIndex}>
              <span className="inline-block whitespace-nowrap">
                {wordLetters.map((char, charIdx) => {
                  const globalIdx = wordStartIdx + charIdx;
                  const delay = isHovered ? getExitDelay(globalIdx) : getEnterDelay(globalIdx);

                  return (
                    <span
                      key={charIdx}
                      className="relative inline-block overflow-hidden [perspective:1000px] [transform-style:preserve-3d] py-0.5"
                    >
                      {/* Primary letter (starts at 90deg below before in-view, rolls up to 0deg on in-view, rolls away on hover) */}
                      <motion.span
                        className="inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
                        initial={{ y: '100%', rotateX: 90, opacity: 0 }}
                        animate={
                          isInView
                            ? {
                                y: isHovered ? '-120%' : '0%',
                                rotateX: isHovered ? -90 : 0,
                                opacity: isHovered ? 0 : 1,
                              }
                            : { y: '100%', rotateX: 90, opacity: 0 }
                        }
                        transition={{
                          duration,
                          delay,
                          ...transition,
                        }}
                      >
                        {char}
                      </motion.span>

                      {/* Duplicate letter (rolls in from bottom on hover) */}
                      <motion.span
                        className="absolute inset-0 inline-block [backface-visibility:hidden] [transform-origin:50%_0%] py-0.5"
                        initial={{ y: '120%', rotateX: 90, opacity: 0 }}
                        animate={{
                          y: isHovered ? '0%' : '120%',
                          rotateX: isHovered ? 0 : 90,
                          opacity: isHovered ? 1 : 0,
                        }}
                        transition={{
                          duration,
                          delay: isHovered ? getEnterDelay(globalIdx) : getExitDelay(globalIdx),
                          ...transition,
                        }}
                        onAnimationComplete={
                          globalIdx === children.length - 1 ? onAnimationComplete : undefined
                        }
                      >
                        {char}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
              {/* Space between words */}
              {wordIndex < words.length - 1 && (
                <span className="inline-block whitespace-pre">&nbsp;</span>
              )}
            </React.Fragment>
          );
        })}
      </span>
    </span>
  );
}
