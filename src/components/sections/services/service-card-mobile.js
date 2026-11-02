"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import * as m from "motion/react-m";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { cx } from "@/lib/cx";
import { DURATION, EASE } from "@/lib/motion";

// Text-only now (the client removed service photos sitewide). The
// drawing-sheet corner brackets frame the whole card directly — name,
// description and link all sit inside the bracketed area — rather than a
// separate bracketed region that used to hold the photo above the text.
// The numeral sits inside the top-right corner, inset from the bracket by
// the same padding as the rest of the content (not floating above the
// card's own top edge, which read as disconnected from the frame around
// it — the previous version of this fix). Description falls back to the
// service's longer `description` field (the same 3-4 line copy the
// desktop panel already shows) rather than the single-sentence `tagline`,
// which read as noticeably thinner content than the desktop version of
// the same card once photos stopped filling the rest of the space.
//
// `active` (driven by scroll position, see useScrollActiveIndex in the
// parent) draws the active card's corner brackets and numeral in teal and
// nudges the whole card up a touch; inactive cards sit back down with
// muted-navy brackets — depth and state both expressed through the site's
// existing motif, not a borrowed scale/opacity trick. "View scope" is a
// real link to the service's own detail page, not an in-place accordion:
// the full scope lives there (with pain points, approach, FAQ and more),
// so a card-level preview of the bullets duplicated content the detail
// page already covers better.
const corner = "absolute size-5 transition-colors duration-(--duration-slow) ease-out-quart";

export const ServiceCardMobile = forwardRef(function ServiceCardMobile(
  { service, index, active },
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
      <div className="relative px-7 py-8">
        <span className={cx(corner, "left-0 top-0 border-l border-t", cornerTone)} />
        <span className={cx(corner, "right-0 top-0 border-r border-t", cornerTone)} />
        <span className={cx(corner, "bottom-0 left-0 border-b border-l", cornerTone)} />
        <span className={cx(corner, "bottom-0 right-0 border-b border-r", cornerTone)} />

        <div className="flex items-start justify-between gap-4">
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

          <span
            aria-hidden="true"
            className={cx(
              "select-none font-serif text-[1.75rem] leading-none transition-colors duration-(--duration-slow) ease-out-quart",
              active ? "text-accent-graphic" : "text-border-strong",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <Heading level={3} size="h4" className="mt-4 max-w-[22ch]">
          {service.name}
        </Heading>
        <Text variant="small" muted className="mt-3">
          {service.description ?? service.tagline}
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
