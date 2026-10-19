"use client";

import { useEffect, useRef, useState } from "react";

// Tracks which item in a list is "current" as the page scrolls: the last
// item whose top edge has crossed a trigger line near the top of the
// viewport is active, one at a time, in order. If the user scrolls past the
// last item (nothing left below the trigger line), the last item stays
// active instead of falling back to an earlier one.
//
// Returns [activeIndex, registerRef]; call registerRef(index) as an item's
// ref callback.
export function useScrollActiveIndex(count, { triggerFromTop = 0.3 } = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const nodesRef = useRef(new Map());
  const frameRef = useRef(null);

  useEffect(() => {
    const recompute = () => {
      frameRef.current = null;

      const triggerY = window.innerHeight * triggerFromTop;
      let bestIndex = 0;
      for (const [index, node] of nodesRef.current) {
        if (!node) continue;
        if (node.getBoundingClientRect().top <= triggerY && index > bestIndex) bestIndex = index;
      }
      setActiveIndex(bestIndex);
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(recompute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    recompute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-attaches when `count` changes the node map; triggerFromTop is static per call site.
  }, [count]);

  const registerRef = (index) => (node) => {
    if (node) nodesRef.current.set(index, node);
    else nodesRef.current.delete(index);
  };

  return [activeIndex, registerRef];
}
