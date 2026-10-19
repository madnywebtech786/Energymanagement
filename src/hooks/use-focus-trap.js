"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Traps focus inside `containerRef` while `active`: Tab/Shift+Tab cycle
// within it instead of escaping to the page behind, and Escape calls
// `onEscape` (closing the mobile drawer). Moves focus into the container on
// activation and restores it to whatever had focus beforehand on
// deactivation, so closing the drawer with Escape or a link click returns
// focus to the element that opened it rather than resetting to <body>.
//
// The initial-focus/restore-focus pair runs only on the false→true/true→false
// edge (tracked with a ref, not the effect's own dependency array), so a
// caller re-render while the drawer stays open — `onEscape` is rarely a
// stable reference, and a sibling state update like an accordion toggling
// still re-renders the component that owns this hook — can't re-capture
// "previously focused" from inside the drawer itself and strand focus on
// close. The keydown listener itself is free to rebind on every dependency
// change; only the focus side effects are edge-triggered.
export function useFocusTrap(containerRef, active, onEscape) {
  const wasActiveRef = useRef(false);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!active) {
      wasActiveRef.current = false;
      return undefined;
    }

    const container = containerRef.current;
    if (!container) return undefined;

    const focusables = () => Array.from(container.querySelectorAll(FOCUSABLE));

    if (!wasActiveRef.current) {
      wasActiveRef.current = true;
      previouslyFocusedRef.current = document.activeElement;
      focusables()[0]?.focus();
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscape();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [containerRef, active, onEscape]);

  // Separate effect, keyed only on `active`, so the restore runs exactly
  // once on the true→false edge and is never deferred by a cleanup timing
  // quirk or re-triggered by the keydown listener's own rebinds.
  useEffect(() => {
    if (active) return;
    const target = previouslyFocusedRef.current;
    previouslyFocusedRef.current = null;
    if (target instanceof HTMLElement) target.focus();
  }, [active]);
}
