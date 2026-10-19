"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import * as m from "motion/react-m";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Photo } from "@/components/ui/photo";
import { Text } from "@/components/ui/text";
import { cx } from "@/lib/cx";
import { DURATION, EASE } from "@/lib/motion";

// Built in the site's own drawing-sheet idiom (corner brackets, a crosshair
// mark, tabular numerals — see HeroFrame and Eyebrow) rather than a generic
// rounded photo-card with a gradient scrim, which is what the first two
// passes at this card were. The photo keeps its own clean edge, framed by
// four corner hairlines instead of rounded corners; the index number
// overlaps the photo's bottom edge as a large tabular numeral, breaking the
// card's own bounding box (real layering, not a faint watermark drowned in
// an overlay); and name/tagline/bullets sit on plain paper below, so no
// text-over-photo contrast is ever in play.
//
// `active` (driven by scroll position, see useScrollActiveIndex in the
// parent) draws the active card's corner brackets and crosshair in teal and
// nudges the whole card up a touch; inactive cards sit back down with
// muted-navy brackets — depth and state both expressed through the site's
// existing motif, not a borrowed scale/opacity trick. "View scope" is a
// real link to the service's own detail page, not an in-place accordion:
// the full scope lives there (with pain points, approach, FAQ and more),
// so a card-level preview of the bullets duplicated content the detail
// page already covers better. `image` is undefined for Well Intervention,
// which falls back to a plain panel.
const corner = "absolute size-5 transition-colors duration-(--duration-slow) ease-out-quart";

export const ServiceCardMobile = forwardRef(function ServiceCardMobile(
  { service, index, image, active },
  ref,
) {
  const cornerTone = active ? "border-accent-graphic" : "border-border-strong/60";

  return (
    <m.li
      ref={ref}
      data-index={index}
      animate={{ y: active ? -4 : 0 }}
      transition={{ duration: DURATION.base, ease: EASE.outSoft }}
    >
      <div className="relative px-5 pt-5">
        <div className="relative aspect-4/3">
          {image ? (
            // Not 100vw: the card sits inside Container's gutter padding, so
            // the photo is always narrower than the full viewport.
            <Photo image={image} sizes="calc(100vw - 2.5rem)" className="absolute inset-0" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-surface">
              <Text variant="small" muted>
                Diagram in development
              </Text>
            </div>
          )}

          <span className={cx(corner, "left-0 top-0 border-l border-t", cornerTone)} />
          <span className={cx(corner, "right-0 top-0 border-r border-t", cornerTone)} />
          <span className={cx(corner, "bottom-0 left-0 border-b border-l", cornerTone)} />
          <span className={cx(corner, "bottom-0 right-0 border-b border-r", cornerTone)} />

          {/* The numeral sits below the photo's own bottom edge, clear of
              the corner brackets entirely (not overlapping the left bracket
              the way an earlier version did) — it breaks the card's
              bounding box the same way HeroFrame's own index counter sits
              outside the frame, translate-y-full past its bottom-right. */}
          <span
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute -bottom-3 right-0 translate-y-full select-none font-serif text-[3.5rem] leading-none transition-colors duration-(--duration-slow) ease-out-quart",
              active ? "text-accent-graphic" : "text-border-strong",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5 pt-11">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cx(
              "relative size-2.5 shrink-0 transition-colors duration-(--duration-slow) ease-out-quart before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current",
              active ? "text-accent-graphic" : "text-border-strong",
            )}
          />
          <span className="text-label uppercase text-muted-foreground">Service</span>
        </div>

        <Heading level={3} size="h4" className="mt-3">
          {service.name}
        </Heading>
        <Text variant="small" muted className="mt-2">
          {service.tagline}
        </Text>

        <Link
          href={`/services/${service.slug}`}
          variant="bare"
          className="group/link mt-5 flex w-full items-center justify-between gap-2 border-t border-border pt-4 text-small font-medium text-accent"
        >
          View scope
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 transition-transform duration-(--duration-base) ease-out-expo group-hover/link:translate-x-0.5"
          />
        </Link>
      </div>
    </m.li>
  );
});
