"use client";

import { LazyMotion, MotionConfig } from "motion/react";

// The animation features load in their own chunk after the first paint.
// `strict` makes a stray full `motion` component throw, so only the lighter
// `m` components get used. reducedMotion="user" turns transform animations
// into instant changes for people who ask for less motion.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
