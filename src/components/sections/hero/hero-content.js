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
      {slide.eyebrow && (
        <m.div key={`eyebrow-${slide.key}`} {...rise(0, animated)}>
          <Eyebrow rule={false} tone="ink">
            {slide.eyebrow}
          </Eyebrow>
        </m.div>
      )}

      <HeadingTag
        key={`heading-${slide.key}`}
        {...clip(STEP, animated)}
        className="mt-hero-eyebrow max-w-[18ch] text-balance text-hero-heading"
      >
        {typeset(slide.heading)}
      </HeadingTag>

      <m.div key={`lead-${slide.key}`} {...rise(STEP * 2.3, animated)}>
        {/* Sans-serif, flush-left, no border: matches the client's exact
            reference for this hero. Every other page's lead/reading text
            keeps the site's established serif pairing unchanged — this is a
            scoped exception for this one component, confirmed with the
            client after an earlier answer (keep serif) was superseded by a
            closer look at their actual reference screenshot. One merged
            paragraph (the client's two sentences joined, not a new one
            invented), at the hero's own scoped text-hero-lead size (see
            globals.css), widened to max-w-[56ch] (was 42ch) to use more of
            the available column now that the text itself is bigger. */}
        <p className="mt-hero-heading max-w-[56ch] text-hero-lead">
          {slide.lead.map(typeset).join(" ")}
        </p>
        {slide.note && (
          // text-foreground resolves through .theme-deep to the light
          // deep-foreground token (15.6:1 on the deep background, well past
          // the 4.5:1 floor) — kept from the photo-hero version of this
          // slide, where the same class was required for the same reason
          // against a photo veil instead of this flat dark background.
          // Plain, not italic: matches the client's reference screenshot.
          <p className="mt-4 max-w-[48ch] text-small text-foreground">{slide.note}</p>
        )}
      </m.div>

      <m.div key={`actions-${slide.key}`} {...rise(STEP * 3.6, animated)} className="mt-hero-actions flex flex-wrap gap-3">
        {slide.actions.map((label, index) => (
          // icon={null}: the reference shows plain text buttons, no arrow
          // cell — a scoped exception for this hero; every other button
          // sitewide keeps its arrow unchanged. The primary button's fill is
          // also overridden here to the site's existing accent-graphic teal
          // (#14b8a6, already defined in globals.css — not a new colour)
          // instead of Button's own default navy/white, matching the
          // reference; text stays dark (text-deep) on that fill rather than
          // white, reusing the same contrast-safe pairing Button's own
          // primary variant already uses on hover (white on this teal
          // measures 2.49:1, below the site's 4.5:1 floor — documented on
          // Button itself). Scoped to these two hero buttons only; every
          // other primary button sitewide keeps Button's own default look.
          <Button
            key={label}
            href={slide.hrefs[index]}
            variant={index === 0 ? "primary" : "secondary"}
            icon={null}
            className={
              index === 0
                ? "!border-accent-graphic !bg-accent-graphic !text-deep hover:!border-primary hover:!bg-primary hover:!text-primary-foreground focus-visible:!border-primary focus-visible:!bg-primary focus-visible:!text-primary-foreground"
                : undefined
            }
          >
            {label}
          </Button>
        ))}
      </m.div>
    </div>
  );
}
