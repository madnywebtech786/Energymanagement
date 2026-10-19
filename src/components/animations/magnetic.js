"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { cx } from "@/lib/cx";

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

// Pulls its content toward the pointer, a few pixels at most. `strength` is the
// share of the pointer's offset from the centre that the content follows.
// Mouse and pen only: a touch never triggers it. Switched off for reduced
// motion in globals.css.
export function Magnetic({ strength = 0.3, className, children }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const follow = (event) => {
    if (event.pointerType === "touch") return;
    const box = ref.current.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      data-magnetic=""
      style={{ x, y }}
      onPointerMove={follow}
      onPointerLeave={release}
      className={cx("inline-block", className)}
    >
      {children}
    </m.div>
  );
}
