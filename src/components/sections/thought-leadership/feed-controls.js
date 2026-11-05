"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Search, Check, ChevronDown, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/controls";
import { cx } from "@/lib/cx";
import { DURATION, EASE } from "@/lib/motion";

// The search box plus the category select, shared verbatim by the desktop
// single row (rendered directly) and the mobile bottom sheet's drawer
// (MobileFilterSheet) — one implementation of the actual controls, not two
// near-copies that could drift out of sync.
//
// The category control is a genuine select-style dropdown (a closed
// trigger showing the current selection, opening a checklist panel on
// click) — not the always-expanded toggle row an earlier version built,
// which the client explicitly corrected: "i specifically mentioned to
// create a select input to select the category... with multiple select
// option". Modelled on this site's own ServicesDropdown panel (position,
// animation, rounded surface) but click-triggered and click-outside-to-
// close rather than hover-triggered, since selecting multiple checkboxes
// needs the panel to stay open through several clicks, not close the
// moment the pointer leaves the trigger.
//
// `isFiltering` drives a brief, honest loading affordance: filtering
// itself is instant client-side array work (no network, no real
// asynchrony to wait on), but typing into the debounced search box has a
// genuine ~300ms window between a keystroke and the URL/results actually
// updating — this state is true during exactly that window, not a fake
// spinner dressed over an operation that already finished.
export function FeedControlsBody({
  query,
  onQueryChange,
  categories,
  selected,
  onToggleCategory,
  onClearAll,
  counts,
  isFiltering,
}) {
  const [selectOpen, setSelectOpen] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!selectOpen) return undefined;

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setSelectOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === "Escape") setSelectOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectOpen]);

  const summary =
    selected.length === 0
      ? "All categories"
      : selected.length === 1
        ? categories.find((category) => category.id === selected[0])?.label
        : `${selected.length} categories`;

  const hasActiveFilters = query.trim().length > 0 || selected.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            strokeWidth={1.5}
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search posts"
            aria-label="Search posts"
            // Input's own base classes (ui/controls.js) already set
            // rounded-sm/border/bg-surface — a same-specificity utility
            // appended after them in the class string does NOT reliably
            // override them (Tailwind's generated CSS order, not the
            // className string's own order, decides which wins), confirmed
            // directly from a screenshot showing square corners despite
            // rounded-full being present in the markup. The ! modifier is
            // this site's own established escape hatch for exactly this
            // conflict (see Button's primary-variant teal-hover override).
            //
            // rounded-[0.625rem], not rounded-2xl/3xl: this theme resets
            // Tailwind's whole radius scale (--radius-*: initial in
            // globals.css) and defines only --radius-sm (2px, the sharp
            // structural default), --radius-xl (1rem) and --radius-full —
            // rounded-2xl/3xl have no matching theme key at all, so they
            // silently generated no rule (confirmed from a screenshot where
            // the corners read as barely rounded, not a sizing judgement
            // call but invalid classes doing nothing). rounded-xl itself
            // was then confirmed working but read as more rounded than
            // wanted here; this arbitrary value (10px, between --radius-sm
            // and --radius-xl) is a real, deliberately smaller radius —
            // there's no named token between the two to reach for instead.
            //
            // bg-surface (true white, #ffffff) against the page's own
            // paper background (#f6f8fa) needs a real border to read as a
            // distinct control rather than a borderless white rectangle
            // blending into the lighter section at its own edges — the
            // same border-border recipe FaqItem already uses for a white
            // surface on a paper section.
            //
            // !h-12, not Input's own min-h-12: a min-height lets this
            // field's taller text-body line-height grow it past 48px while
            // the category trigger's shorter text-small clamps exactly at
            // the floor — a small but real gap between two controls meant
            // to match exactly. A fixed height removes that font-size
            // dependency on both sides (see the trigger's own comment).
            className="!h-12 !rounded-[0.625rem] !border !border-border !bg-surface pl-11 pr-11"
          />
          <AnimatePresence>
            {isFiltering && (
              <m.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.fast }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Loader2 aria-hidden="true" strokeWidth={2} className="size-4 animate-spin text-accent" />
              </m.span>
            )}
          </AnimatePresence>
          <span className="sr-only" role="status" aria-live="polite">
            {isFiltering ? "Filtering posts" : ""}
          </span>
        </div>

        <div ref={rootRef} className="relative shrink-0 lg:w-64">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={selectOpen}
            aria-controls={panelId}
            onClick={() => setSelectOpen((value) => !value)}
            className={cx(
              // h-12 (a fixed height, not min-h-12) so this trigger matches
              // Input's rendered height exactly regardless of font size.
              // min-h-12 on both was tried first and still came out
              // visibly uneven: Input's own CONTROL class (ui/controls.js)
              // pairs min-h-12 with text-body (1rem/1.6 line-height, ~25.6px
              // of text) while this trigger used text-small (0.875rem/1.5,
              // ~21px) — with identical py-3 padding, Input's real content
              // height (~49.6px) exceeds the 48px floor and grows past it,
              // while the button's (~45px) sits clamped exactly at 48px, a
              // ~1.6px gap that read as a real mismatch in a screenshot. A
              // fixed h-12 on both removes the font-size dependency
              // entirely instead of relying on two different intrinsic
              // heights coincidentally landing on the same floor.
              "flex h-12 w-full items-center justify-between gap-3 rounded-[0.625rem] border border-border bg-surface px-5 text-small font-medium text-foreground transition-colors duration-(--duration-fast)",
              selectOpen && "text-accent",
            )}
          >
            <span className="truncate">{summary}</span>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.5}
              className={cx(
                "size-4 shrink-0 text-muted-foreground transition-transform duration-(--duration-base) ease-out-quart",
                selectOpen && "-rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {selectOpen && (
              <m.div
                id={panelId}
                role="listbox"
                aria-label="Filter by category"
                aria-multiselectable="true"
                initial={{ opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: DURATION.fast, ease: EASE.outSoft }}
                // z-menu (not a bare z-10): the same named layer
                // ServicesDropdown's own panel uses, so this reliably sits
                // above the feed cards below it rather than relying on an
                // arbitrary low number that could lose a stacking fight.
                // A real border, not just a shadow, gives the panel a
                // visible edge against the page's own near-white
                // background (#f6f8fa) — the screenshot that prompted this
                // fix showed a shadow-only white panel reading as
                // indistinguishable from the page and the white card
                // directly behind it.
                //
                // Shadow now matches feed-entry.js's own card exactly
                // (0.04/0.12 opacity) rather than the earlier 0.06/0.18 —
                // the stronger pair was never aligned to this codebase's
                // established weight for a white surface on the paper
                // section, and on a panel this size and this close to white
                // it painted as a visible grey wash across the whole
                // surface, not a subtle edge shadow, confirmed from a
                // screenshot.
                className="absolute left-0 right-0 top-full z-menu mt-2 overflow-hidden rounded-[0.875rem] border border-border bg-surface shadow-[0_1px_2px_rgb(11_37_69/0.04),0_8px_24px_-12px_rgb(11_37_69/0.12)]"
              >
                <ul className="max-h-72 overflow-y-auto p-2">
                  {categories.map((category) => {
                    const isActive = selected.includes(category.id);
                    const count = counts.get(category.id) ?? 0;
                    return (
                      <li key={category.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => onToggleCategory(category.id)}
                          className="flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left text-small text-foreground transition-colors duration-(--duration-fast) hover:bg-background"
                        >
                          {/* A square checkbox, not a circle — this is a
                              multi-select (any number of categories can be
                              active at once), and a round indicator reads as
                              a radio button's "pick exactly one" affordance,
                              which is the wrong signal here. */}
                          <span
                            aria-hidden="true"
                            className={cx(
                              "grid size-[1.1rem] shrink-0 place-items-center rounded-sm border transition-colors duration-(--duration-fast)",
                              isActive
                                ? "border-accent-graphic bg-accent-graphic text-deep"
                                : "border-border-strong/60 bg-surface",
                            )}
                          >
                            {isActive && <Check strokeWidth={3} className="size-3" />}
                          </span>
                          <span className="flex-1">{category.label}</span>
                          <span className="tabular-nums text-muted-foreground">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {hasActiveFilters && (
          <m.button
            type="button"
            onClick={onClearAll}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: DURATION.fast, ease: EASE.outSoft }}
            // self-end (not self-start/lg:self-auto): this button now
            // sits on its own line below the search+select row — see the
            // client's screenshot asking for it "on the next line, right
            // side of the bar and select" rather than inline on the same
            // row, which it used to share with them. self-end right-
            // aligns it against this column's own width at every
            // breakpoint, not just lg.
            className="flex shrink-0 items-center gap-1.5 self-end text-small font-medium text-muted-foreground transition-colors duration-(--duration-fast) hover:text-foreground"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
            Clear all filters
          </m.button>
        )}
      </AnimatePresence>
    </div>
  );
}
