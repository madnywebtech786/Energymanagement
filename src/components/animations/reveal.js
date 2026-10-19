"use client";

import * as m from "motion/react-m";
import { DURATION, EASE } from "@/lib/motion";

const TAGS = { div: m.div, p: m.p, span: m.span, li: m.li, section: m.section };

// Fades and lifts its content into place the first time it scrolls into view.
// It starts hidden in the server HTML, so use it below the first screen only.
// Things in the first screen use the CSS entrance animations (animate-rise),
// which run before any JavaScript has loaded.
export function Reveal({ as = "div", delay = 0, y = 24, className, children }) {
  const Tag = TAGS[as];

  return (
    <Tag
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: DURATION.slow, delay, ease: EASE.out }}
      className={className}
    >
      {children}
    </Tag>
  );
}
