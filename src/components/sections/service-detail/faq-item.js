"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { Text } from "@/components/ui/text";
import { DURATION, EASE } from "@/lib/motion";

// A native <details>/<summary> — real semantics, works with zero
// JavaScript, keyboard and screen readers handle it natively, and the
// answer text is unconditionally present in the server HTML (confirmed via
// a raw fetch with no browser JS) — with a Motion height animation layered
// on top so the open/close transition is smooth for JS-enabled visitors
// instead of <details>'s native instant snap. Exactly one copy of the
// answer exists; nothing is duplicated and nothing is conditionally
// un-mounted, so there is no "JS version vs no-JS version" to keep in
// sync — only the content wrapper's animated height differs.
//
// <details>'s own `open` attribute stays the real toggle (clicking
// `<summary>` natively opens/closes it, including with JS disabled); this
// component listens for the browser's `toggle` event to mirror that state
// into a Motion `animate` prop, so the two never fight over who is in
// charge — the browser always is. `initial={false}` on the motion div
// means the very first render (which must match the server's closed
// markup to avoid a hydration mismatch) applies the closed state directly
// with no entrance animation.
export function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="group overflow-hidden rounded-xl border border-border bg-surface open:border-border-strong/60"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-5 px-6 py-5 text-left marker:content-none sm:px-8 sm:py-6 [&::-webkit-details-marker]:hidden">
        <Text variant="reading" as="span" className="flex-1 text-[1rem] font-medium text-foreground sm:text-[1.125rem]">
          {question}
        </Text>
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border-strong/50 text-accent-graphic transition-colors duration-(--duration-base) ease-out-quart group-open:border-accent-graphic group-open:bg-accent-graphic group-open:text-deep">
          <span
            aria-hidden="true"
            className="relative size-3 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:-translate-y-1/2 before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-(--duration-base) after:ease-out-quart group-open:after:rotate-90"
          />
        </span>
      </summary>

      <m.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: DURATION.base, ease: EASE.outSoft }}
        className="overflow-hidden"
      >
        <div className="border-t border-border px-6 pb-6 pt-5 sm:px-8 sm:pb-8">
          <Text variant="reading" muted>
            {answer}
          </Text>
        </div>
      </m.div>
    </details>
  );
}
