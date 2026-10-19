"use client";

import * as m from "motion/react-m";
import { DURATION, EASE } from "@/lib/motion";

const MASKS = {
  up: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
  down: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
  left: ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
  right: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
};

// Uncovers its content with a clip-path wipe while the content settles from a
// slight zoom. Give it a size (for example "aspect-banner"); the child should
// fill it. Below the first screen only, like Reveal.
export function ImageMask({ direction = "up", delay = 0, className, children }) {
  const [from, to] = MASKS[direction];

  return (
    <m.div
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: { clipPath: from },
        shown: { clipPath: to, transition: { duration: DURATION.hero, delay, ease: EASE.inOut } },
      }}
    >
      <m.div
        className="size-full"
        variants={{
          hidden: { scale: 1.14 },
          shown: { scale: 1, transition: { duration: 1.6, delay, ease: EASE.out } },
        }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
