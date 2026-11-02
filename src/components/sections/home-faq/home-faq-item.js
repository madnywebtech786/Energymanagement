"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { Text } from "@/components/ui/text";
import { DURATION, EASE } from "@/lib/motion";

// A plain divided-list row (hairline above, no card border or rounded
// corners), not FaqItem's bordered-panel look — a different visual register
// for the home page's new "common questions" section, matching the
// client's reference exactly (a dense right-column list beside a static
// left-column heading, not a column of separate cards). Shares FaqItem's
// underlying mechanics rather than reinventing them: native
// <details>/<summary> (works with zero JavaScript, answer text
// unconditionally present in server HTML for an AEO crawler that doesn't
// execute clicks), with the same Motion-mirrors-the-browser's-toggle-event
// technique for a smooth open/close instead of <details>'s native instant
// snap.
export function HomeFaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="group border-t border-border"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-5 py-5 text-left marker:content-none sm:py-6 [&::-webkit-details-marker]:hidden">
        <Text variant="small" as="span" className="flex-1 font-bold text-foreground">
          {question}
        </Text>
        <span className="relative size-3 shrink-0 text-accent-graphic before:absolute before:inset-x-0 before:top-1/2 before:h-px before:-translate-y-1/2 before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-(--duration-base) after:ease-out-quart group-open:after:rotate-90" />
      </summary>

      <m.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: DURATION.base, ease: EASE.outSoft }}
        className="overflow-hidden"
      >
        <div className="pb-6">
          <Text variant="small" muted className="max-w-[58ch]">
            {answer}
          </Text>
        </div>
      </m.div>
    </details>
  );
}
