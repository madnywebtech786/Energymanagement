"use client";

import { useEffect } from "react";

// Locks page scroll while `locked` is true (the mobile drawer open state).
// Compensates for the vanished scrollbar with right padding so the page
// does not shift width, then restores both on unlock/unmount.
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { style } = document.body;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = style.overflow;
    const previousPaddingRight = style.paddingRight;

    style.overflow = "hidden";
    if (scrollbarWidth > 0) style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      style.overflow = previousOverflow;
      style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
