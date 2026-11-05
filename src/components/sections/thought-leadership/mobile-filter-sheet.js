"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DURATION, EASE } from "@/lib/motion";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { FeedControlsBody } from "./feed-controls";

// Below lg: a fixed "Filter" button, bottom-right, opening a bottom-anchored
// drawer with the same search/category controls FeedControls renders in a
// single row on larger screens — one shared FeedControlsBody, not two
// implementations of the actual filtering UI. Structurally this is
// MobileMenu's own backdrop+panel+focus-trap pattern (see
// src/components/navigation/mobile-menu.js), y-animated from the bottom
// instead of x-animated from the right, reusing the same two hooks that
// pattern already built (useFocusTrap, useBodyScrollLock) rather than a
// third ad hoc drawer implementation.
//
// An active-filter count badge on the trigger button tells someone a
// filter is applied even while the sheet itself is closed — without it,
// a closed drawer with filters silently active inside it would be easy to
// forget about.
export function MobileFilterSheet({
  query,
  onQueryChange,
  categories,
  selected,
  onToggleCategory,
  onClearAll,
  counts,
  resultCount,
  isFiltering,
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const titleId = useId();

  const close = () => setOpen(false);
  const activeCount = (query.trim() ? 1 : 0) + selected.length;

  useFocusTrap(panelRef, open, close);
  useBodyScrollLock(open);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-menu flex items-center gap-2 rounded-sm border border-border-strong bg-foreground px-5 py-3.5 text-small font-semibold text-background shadow-[0_8px_24px_-8px_rgb(11_37_69/0.35)] lg:hidden"
      >
        <SlidersHorizontal aria-hidden="true" strokeWidth={1.5} className="size-4" />
        Filter
        {activeCount > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-accent-graphic text-[0.7rem] font-semibold text-deep">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              aria-hidden="true"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.outSoft }}
              className="fixed inset-0 z-menu bg-foreground/40 backdrop-blur-xs lg:hidden"
            />

            <m.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: DURATION.base, ease: EASE.out }}
              className="fixed inset-x-0 bottom-0 z-menu flex max-h-[85svh] flex-col rounded-t-xl bg-surface lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-gutter py-5">
                <span id={titleId} className="text-label uppercase text-muted-foreground">
                  Filter posts
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="grid size-10 shrink-0 place-items-center text-foreground"
                >
                  <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  <span className="sr-only">Close filters</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-gutter py-6">
                <FeedControlsBody
                  query={query}
                  onQueryChange={onQueryChange}
                  categories={categories}
                  selected={selected}
                  onToggleCategory={onToggleCategory}
                  onClearAll={onClearAll}
                  counts={counts}
                  isFiltering={isFiltering}
                />
              </div>

              <div className="border-t border-border px-gutter py-5">
                <Button onClick={close} className="w-full justify-center" icon={null}>
                  Show {resultCount} {resultCount === 1 ? "post" : "posts"}
                </Button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
