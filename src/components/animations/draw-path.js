"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import * as m from "motion/react-m";

// A line that draws itself as the graphic scrolls through the viewport. The
// hairline underneath is the whole route; the teal line on top is the part
// covered so far. Size it with `className`; the drawing keeps its proportions.
// `offset` is when the drawing starts and finishes, as in Motion's useScroll:
// the default starts when the top is 80% down the screen and finishes when the
// bottom is 55% down. A graphic at the very end of a page needs a later finish.
export function DrawPath({ d, viewBox, offset = ["start 80%", "end 55%"], className, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  return (
    <svg ref={ref} viewBox={viewBox} fill="none" aria-hidden="true" className={className} style={style}>
      <path d={d} className="stroke-border-strong/40" strokeWidth="1" />
      <m.path
        data-draw=""
        d={d}
        className="stroke-accent-graphic"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: scrollYProgress }}
      />
    </svg>
  );
}
