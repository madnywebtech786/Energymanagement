"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import * as m from "motion/react-m";

// A circular seal that draws itself in on scroll, the same pathLength
// technique as DrawPath (a hairline route underneath, a teal stroke on top
// tied to scroll progress) adapted to a closed ring with the figure and
// label set inside it. Echoes the circular step-nodes in ApproachStory
// rather than introducing a new mark.
export function GuaranteeSeal({ seal }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 45%"] });

  return (
    <div ref={ref} className="relative size-48 shrink-0 sm:size-56">
      <svg viewBox="0 0 200 200" aria-hidden="true" className="size-full -rotate-90">
        <circle cx="100" cy="100" r="92" className="stroke-deep-muted/25" strokeWidth="1" fill="none" />
        <m.circle
          data-draw=""
          cx="100"
          cy="100"
          r="92"
          className="stroke-accent-graphic"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          pathLength={1}
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
        <span className="font-serif text-h2 text-deep-foreground">{seal.figure}</span>
        {seal.lines.map((line) => (
          <span key={line} className="text-label text-deep-muted">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
