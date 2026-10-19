"use client";

import { useLayoutEffect } from "react";

// Measures the header's real rendered height and writes it to --header-height
// on the root element, which body's top padding (globals.css) reads from.
// A hand-picked spacing token drifted out of sync with the header's actual
// height the moment its content changed (logo line height, button size at a
// breakpoint...), leaving a visible gap or overlap between the fixed header
// and the page content below it — measuring it directly removes that class
// of bug instead of re-guessing a static number a second time.
export function useHeaderHeight(ref) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const root = document.documentElement;
    const apply = () => {
      root.style.setProperty("--header-height", `${node.getBoundingClientRect().height}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
}
