"use client";

import { useId, useRef, useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { DURATION, EASE } from "@/lib/motion";

const OPEN_DELAY_MS = 60;
const CLOSE_DELAY_MS = 150;

// The desktop "Services" nav item: a button that also links to /services,
// plus a hover-activated panel listing all ten. Opens on hover or focus,
// closes on blur/leave/Escape/route change. A short open delay avoids
// flashing the panel on a pointer that is only passing over the trigger;
// a slightly longer close delay lets the pointer travel from the trigger
// down into the panel without the gap between them closing it.
//
// Hover/focus panels are transient UI, not persisted view state (see
// node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md,
// "Expandable UI" — Activity would otherwise keep this open across a
// back/forward navigation), so it force-closes on pathname change via a
// useLayoutEffect cleanup, the pattern that guide specifically calls for.
export function ServicesDropdown({ label, href, items }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const timerRef = useRef(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    return () => setOpen(false);
  }, [pathname]);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const openPanel = () => {
    clearTimer();
    timerRef.current = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  };

  const closePanel = () => {
    clearTimer();
    timerRef.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  const onBlur = (event) => {
    if (rootRef.current?.contains(event.relatedTarget)) return;
    clearTimer();
    setOpen(false);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      clearTimer();
      setOpen(false);
      rootRef.current?.querySelector("a,button")?.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openPanel}
      onMouseLeave={closePanel}
      onFocus={openPanel}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <a
        href={href}
        aria-expanded={open}
        aria-controls={panelId}
        className={cx(
          "group/trigger flex items-center gap-1.5 text-nav font-medium transition-colors duration-(--duration-fast) hover:text-accent",
          open ? "text-accent" : "text-foreground",
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={cx(
            "size-3.5 transition-transform duration-(--duration-base) ease-out-quart",
            open && "-rotate-180",
          )}
        />
      </a>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: DURATION.fast, ease: EASE.outSoft }}
            className="absolute left-1/2 top-full z-menu w-[min(22rem,calc(100vw-2*var(--spacing-gutter)))] -translate-x-1/2 pt-4"
          >
            <div className="overflow-hidden rounded-xl border border-border-strong/60 bg-surface">
              <ul className="p-2">
                {items.map((service, index) => (
                  <li key={service.slug}>
                    <a
                      role="menuitem"
                      href={`/services/${service.slug}`}
                      className="group/item relative flex items-baseline gap-3 rounded-sm px-3 py-2.5 text-small text-foreground transition-colors duration-(--duration-fast) hover:text-accent"
                    >
                      <span className="tabular-nums text-[0.6875rem] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="relative">
                        {service.name}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-(--duration-base) ease-out-expo group-hover/item:scale-x-100"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={href}
                className="group/all flex items-center justify-between border-t border-border px-5 py-4 text-small font-medium text-foreground transition-colors duration-(--duration-fast) hover:text-accent"
              >
                View all services
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-(--duration-base) ease-out-expo group-hover/all:translate-x-0.5"
                />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
