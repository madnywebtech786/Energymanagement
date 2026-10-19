"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { Photo } from "@/components/ui/photo";
import { HeroContent } from "./hero-content";
import { HeroFrame } from "./hero-frame";
import { HeroIndicators } from "./hero-indicators";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DURATION, EASE } from "@/lib/motion";

const AUTOPLAY_MS = 7000;

// Full-bleed slider: state, autoplay, and every input the plan's Phase 3a
// checklist asks for — pause on hover, focus, touch, hidden tab, off-screen;
// swipe; arrow keys; a pause control; no autoplay under reduced motion.
//
// Before the first navigation, <HeroContent> renders with `animated={false}`
// (see that file): plain server HTML, the page's one <h1> present on first
// paint with no client JavaScript required, and no <AnimatePresence> mounting
// to fade in content that was already server-rendered. That resting state is
// shown until the user actually triggers the first navigation
// (`hasNavigated`); from then on every slide, 0 included if they loop back to
// it, goes through the animated path. Hydration, hover, focus and visibility
// changes never flip this — only an actual slide change does.
export function HeroSlider({ slides }) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  // Bumped by autoplay-affecting events (hover, focus, tab visibility,
  // viewport intersection) purely to re-run the autoplay-timer effect below;
  // it carries no meaning on its own and must never gate what renders.
  const [autoplayNudge, setAutoplayNudge] = useState(0);
  const rootRef = useRef(null);
  const timerRef = useRef(null);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const visibleRef = useRef(true);
  const idBase = useId();
  const ids = {
    tab: (i) => `${idBase}-tab-${i}`,
    panel: (i) => `${idBase}-panel-${i}`,
  };

  const effectivelyPaused =
    paused || reducedMotion || hoverRef.current || focusRef.current || !visibleRef.current;

  const goTo = useCallback((index) => {
    setHasNavigated(true);
    setActive((current) => {
      const next = (index + slides.length) % slides.length;
      return next === current ? current : next;
    });
  }, [slides.length]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay timer. Re-armed on every dependency change (slide change,
  // pause state, reduced motion) and always cleaned up — a single timer
  // alive at once, never stacked.
  useEffect(() => {
    if (effectivelyPaused) return undefined;
    timerRef.current = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-derives `effectivelyPaused` each render from refs; `active` retriggers the timer per slide.
  }, [active, paused, reducedMotion, autoplayNudge]);

  // Tab visibility: stop burning the timer in a background tab.
  useEffect(() => {
    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
      setAutoplayNudge((n) => n + 1);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Off-screen: an IntersectionObserver pauses autoplay once the hero has
  // scrolled well out of view, so it isn't silently cycling behind the rest
  // of the page.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting && document.visibilityState === "visible";
        setAutoplayNudge((n) => n + 1);
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const setHover = (value) => () => {
    hoverRef.current = value;
    setAutoplayNudge((n) => n + 1);
  };
  const onFocus = () => {
    focusRef.current = true;
    setAutoplayNudge((n) => n + 1);
  };
  const onBlur = (event) => {
    if (rootRef.current?.contains(event.relatedTarget)) return;
    focusRef.current = false;
    setAutoplayNudge((n) => n + 1);
  };

  // Swipe: a plain touch delta, no gesture library. 40px is a deliberate
  // threshold so an intended vertical scroll on a touch device never
  // registers as a horizontal swipe.
  const touchStartX = useRef(null);
  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) next();
    else prev();
  };

  const slide = slides[active];

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Introduction"
      className="relative isolate min-h-dvh overflow-hidden bg-foreground"
      onMouseEnter={setHover(true)}
      onMouseLeave={setHover(false)}
      onFocus={onFocus}
      onBlur={onBlur}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Every photo is in the DOM from the start (not just the active one):
          slide 0 is the LCP candidate and needs fetchPriority="high" before
          any client code runs, and the inactive photos warm in behind it so
          the first autoplay swap never pops in a half-loaded image. */}
      {slides.map((item, index) => (
        <div
          key={item.key}
          aria-hidden={index !== active}
          className="absolute inset-0 transition-opacity duration-(--duration-slow) ease-out-expo"
          style={{ opacity: index === active ? 1 : 0 }}
        >
          <Photo
            image={item.image}
            alt=""
            sizes="100vw"
            fetchPriority={index === 0 ? "high" : undefined}
            className="absolute inset-0"
          />
          <div
            aria-hidden="true"
            className="veil absolute inset-0 z-veil"
            style={{ "--veil-core": `${item.image.veil.core}%`, "--veil-edge": `${item.image.veil.edge}%` }}
          />
        </div>
      ))}

      <HeroFrame index={active + 1} total={slides.length} />

      {/* Content is vertically centered at every width, in a box that is
          always a full dynamic-viewport-height tall (min-h-dvh, no
          px-based floor underneath it) — an earlier fixed-height floor
          below the sm breakpoint was shorter than most real phones in
          portrait, leaving a visible gap below the content instead of
          actually centering it on-screen.
          Right padding is the page's normal `pr-gutter`, same as every
          other section. Left padding is `pl-gutter-mark`/
          `sm:pl-gutter-mark-sm` — the gutter plus HeroFrame's corner mark,
          added once in globals.css and read here as a plain responsive
          utility, not a one-off calc(). */}
      <div
        role="tabpanel"
        id={ids.panel(active)}
        aria-labelledby={ids.tab(active)}
        aria-live={effectivelyPaused ? "polite" : "off"}
        className="relative z-hero-content flex min-h-dvh items-center py-20 pr-gutter pl-gutter-mark sm:py-24 sm:pl-gutter-mark-sm"
      >
        <div className="w-full max-w-page">
          {hasNavigated ? (
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={slide.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: DURATION.fast, ease: EASE.outSoft } }}
              >
                <HeroContent slide={slide} isPageHeading={active === 0} />
              </m.div>
            </AnimatePresence>
          ) : (
            // Before the first navigation, `active` is always 0 (only
            // `goTo` moves it, and `goTo` always sets `hasNavigated` too):
            // the same component, with every entrance transition dropped so
            // it renders already at rest — the exact markup the server
            // sends, which is also all a no-JS visitor ever sees.
            <HeroContent slide={slide} isPageHeading={active === 0} animated={false} />
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-hero-controls flex items-center justify-between px-gutter py-6 sm:py-8">
        <HeroIndicators
          slides={slides}
          activeIndex={active}
          playingKey={active}
          duration={AUTOPLAY_MS}
          paused={effectivelyPaused}
          onSelect={goTo}
          ids={ids}
        />
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-border-strong/60 text-foreground transition-colors hover:border-border-strong"
        >
          {paused ? (
            <Play aria-hidden="true" strokeWidth={1.5} className="size-4 translate-x-px" />
          ) : (
            <Pause aria-hidden="true" strokeWidth={1.5} className="size-4" />
          )}
          <span className="sr-only">{paused ? "Play slideshow" : "Pause slideshow"}</span>
        </button>
      </div>
    </section>
  );
}
