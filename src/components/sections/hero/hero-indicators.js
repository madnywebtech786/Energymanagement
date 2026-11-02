"use client";

import { useRef } from "react";

// Progress indicators doubling as tabs (WAI-ARIA tabs pattern: role="tablist"
// on the group, role="tab" + aria-selected on each, roving tabindex, and
// arrow-key navigation owned by the tablist itself per the pattern — not by
// the panel, which nothing ever focuses directly). Round dots, at the
// client's direct request ("add dots for the slides so that user can also
// manually change it") — the click/keyboard-navigation behaviour already
// existed before this change; only the visual treatment (a thin progress bar)
// is what changed, since it apparently didn't read as "dots" a user could
// recognise as slide controls. The active dot still fills over the autoplay
// interval via a ring that scales in, not a bar; `playingKey` remounts the
// active ring's animation so it restarts cleanly on every slide change,
// including a manual jump. Duration is a CSS custom property so the fill
// timing lives in one place (the parent) instead of being hardcoded here.
export function HeroIndicators({ slides, activeIndex, playingKey, duration, paused, onSelect, ids }) {
  const tabRefs = useRef([]);

  const onKeyDown = (event) => {
    const last = slides.length - 1;
    const target =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (activeIndex + 1) % slides.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (activeIndex - 1 + slides.length) % slides.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    onSelect(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Hero slides"
      onKeyDown={onKeyDown}
      className="flex items-center gap-4"
    >
      {slides.map((slide, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={slide.key}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            id={ids.tab(index)}
            aria-selected={active}
            aria-controls={ids.panel(index)}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(index)}
            className="group/ind relative grid size-6 shrink-0 place-items-center"
          >
            <span className="sr-only">
              Slide {index + 1}: {slide.eyebrow || slide.heading}
            </span>
            {/* The dot itself: dim outline when inactive, solid teal when
                active (an instant colour swap — the ring below carries the
                time-based motion, so the dot doesn't need to animate too). */}
            <span
              aria-hidden="true"
              className={
                "size-2.5 rounded-full transition-colors duration-(--duration-base) " +
                (active
                  ? "bg-accent-graphic"
                  : "bg-transparent ring-1 ring-inset ring-border-strong/60 group-hover/ind:ring-border-strong")
              }
            />
            {/* The active dot's progress ring: a conic-gradient that sweeps
                from 0% to 100% over the autoplay interval, giving the same
                "time remaining" signal the old bar gave, now read as a dot
                filling in rather than a line filling across. */}
            {active && (
              <span
                aria-hidden="true"
                key={playingKey}
                style={{ "--hero-duration": `${duration}ms` }}
                className={
                  "absolute inset-0 rounded-full border border-accent-graphic/30 " +
                  (paused ? "" : "animate-[hero-ring_var(--hero-duration)_linear_forwards]")
                }
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
