"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const FlipWords = ({ words, duration = 3000, className }) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timeout = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <div className={twMerge("relative overflow-hidden", className)}>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.div
          key={currentWord}
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 1.05,
          }}
          transition={{
            type: "tween",
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="inline-block"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)", // Force hardware acceleration
          }}
        >
          {currentWord}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
