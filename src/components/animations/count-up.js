"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cx } from "@/lib/cx";
import { EASE } from "@/lib/motion";

// Counts from 0 up to `to` when it scrolls into view. The server HTML carries
// the final number, so nothing is lost without JavaScript or with reduced
// motion. The number is written straight into the DOM: no React re-render.
export function CountUp({ to, suffix = "", duration = 1.6, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const value = useMotionValue(to);
  const text = useTransform(value, (current) => `${Math.round(current)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    value.set(0);
    const controls = animate(value, to, { duration, ease: EASE.out });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  return (
    <m.span ref={ref} className={cx("tabular-nums", className)}>
      {text}
    </m.span>
  );
}
