"use client";

import { useRef } from "react";

// Progress indicators doubling as tabs (WAI-ARIA tabs pattern: role="tablist"
// on the group, role="tab" + aria-selected on each, roving tabindex, and
// arrow-key navigation owned by the tablist itself per the pattern — not by
// the panel, which nothing ever focuses directly). Each bar fills over the
// autoplay interval; `playingKey` remounts the active bar's fill animation so
// it restarts cleanly on every slide change, including a manual jump. Width
// is a CSS custom property so the fill duration lives in one place (the
// parent) instead of being hardcoded here.
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
      className="flex items-center gap-3"
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
            className="group/ind relative h-6 w-10 shrink-0"
          >
            <span className="sr-only">
              Slide {index + 1}: {slide.eyebrow}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border-strong/50 transition-colors group-hover/ind:bg-border-strong"
            />
            {active && (
              <span
                aria-hidden="true"
                key={playingKey}
                style={{ "--hero-duration": `${duration}ms` }}
                className={
                  "absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 scale-x-0 bg-accent-graphic " +
                  (paused ? "" : "animate-[hero-fill_var(--hero-duration)_linear_forwards]")
                }
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
