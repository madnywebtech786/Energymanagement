"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cx } from "@/lib/cx";

// Moves its content slower than the page. `distance` is how far it travels each
// way, as a share of its own height (0.1 is 10%). The content is drawn a little
// larger than the box so no gap shows at either end. The box needs a size.
export function Parallax({ distance = 0.1, className, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-distance * 100}%`, `${distance * 100}%`]);
  const overscan = (distance / (1 - 2 * distance)) * 100;

  return (
    <div ref={ref} className={cx("relative overflow-hidden", className)}>
      <m.div
        data-parallax=""
        style={{ y, insetBlock: `${-overscan}%` }}
        className="absolute inset-x-0 will-change-transform"
      >
        {children}
      </m.div>
    </div>
  );
}
