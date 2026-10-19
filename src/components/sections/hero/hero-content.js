"use client";

import * as m from "motion/react-m";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { typeset } from "@/lib/typeset";
import { DURATION, EASE } from "@/lib/motion";

// Choreography for the text block: eyebrow, then the headline (clipped
// upward reveal, by line), then the lead, then the actions — each a beat
// after the last. Keyed by slide index from the parent, so it replays on
// every change, forward or back. This is deliberately not <TextReveal> or
// <Reveal>: those start hidden pending a scroll observer, which is wrong for
// a slide that must render complete and visible without JavaScript.
//
// `animated={false}` (the slider's pre-navigation resting state for slide 0)
// drops every `initial`/`animate` prop, so the markup renders at its final,
// settled visual state with nothing to transition from — the same JSX the
// server sends is what a no-JS visitor keeps seeing, with no separate eager
// copy of this layout to keep in sync by hand.
//
// Every slide is left-aligned; there is no right-aligned variant.
const STEP = 0.11;

const rise = (delay, animated, distance = "0.6em") =>
  animated
    ? {
        initial: { opacity: 0, y: distance },
        animate: { opacity: 1, y: 0, transition: { duration: DURATION.slow, delay, ease: EASE.out } },
      }
    : {};

const clip = (delay, animated) =>
  animated
    ? {
        initial: { clipPath: "inset(0 0 100% 0)" },
        animate: {
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: DURATION.hero, delay, ease: EASE.out },
        },
      }
    : {};

export function HeroContent({ slide, isPageHeading, animated = true }) {
  // Exactly one <h1> may exist on the page at a time. Slide 0's headline is
  // it; the other slides' headlines are the same visual size but a <p>, the
  // same way the current single-page site has only one H1 regardless of
  // which section is in view. <m.h1>/<m.p> are both valid LazyMotion `m`
  // components — picking the tag doesn't change which animation runs.
  const HeadingTag = isPageHeading ? m.h1 : m.p;

  return (
    <div>
      <m.div key={`eyebrow-${slide.key}`} {...rise(0, animated)}>
        <Eyebrow rule={false} tone="ink">
          {slide.eyebrow}
        </Eyebrow>
      </m.div>

      <HeadingTag
        key={`heading-${slide.key}`}
        {...clip(STEP, animated)}
        className="mt-hero-eyebrow max-w-[20ch] text-balance text-display"
      >
        {typeset(slide.heading)}
      </HeadingTag>

      <m.div key={`lead-${slide.key}`} {...rise(STEP * 2.3, animated)}>
        <p className="mt-hero-heading max-w-[42ch] border-border-strong/60 font-serif text-lead lg:border-l lg:pl-6">
          {typeset(slide.lead)}
        </p>
        {slide.note && (
          // Navy, not muted-foreground: this sits over a hero photo, where
          // only navy text clears 4.5:1 (see .veil in globals.css).
          <p className="mt-4 max-w-[48ch] text-small text-foreground">{slide.note}</p>
        )}
      </m.div>

      <m.div key={`actions-${slide.key}`} {...rise(STEP * 3.6, animated)} className="mt-hero-actions flex flex-wrap gap-3">
        {slide.actions.map((label, index) => (
          <Button key={label} href={slide.hrefs[index]} variant={index === 0 ? "primary" : "secondary"}>
            {label}
          </Button>
        ))}
      </m.div>
    </div>
  );
}
