"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Share2, Check } from "lucide-react";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { leadership } from "@/content/leadership";
import { cx } from "@/lib/cx";
import { DURATION, EASE } from "@/lib/motion";

// One post. body[0] (the lead paragraph) is always visible, directly under
// the image — matching how a LinkedIn post always shows some real text
// before any "see more" boundary, never just a bare opening line with
// nothing under it. body.slice(1), when present, is what "See more"
// reveals: hidden by default (height: 0) and animated open to its natural
// height, mirroring FaqItem's exact mechanism — a native toggle driving a
// Motion height/opacity animation, initial={false} so the very first
// render matches the server's collapsed markup with no hydration
// mismatch.
//
// Share copies a link to this specific post (the page's own path plus
// #slug) to the clipboard, falling back from navigator.share() where the
// browser supports the native share sheet. There is no per-post route to
// link to (see the design spec's "no detail route" decision), so the hash
// fragment is the only honest unit smaller than the whole feed to share.
//
// The button communicates "copied" by swapping its own icon/label in
// place (Share2 "Share" -> Check "Link copied") rather than a separate
// floating toast above it — a toast needs a sighted user to look in two
// places at once (the button they just pressed, then up at a tooltip);
// an in-place swap keeps the confirmation exactly where attention
// already is. A sr-only sibling span still carries role="status"/
// aria-live so screen readers hear the state change too (see the
// button's own comment for why the live region isn't on the button
// itself).
export function FeedEntry({ post }) {
  const [expanded, setExpanded] = useState(false);
  const [shareState, setShareState] = useState("idle"); // "idle" | "copied"
  // A sections post (see thought-leadership.js) has no body array at all
  // and is always shown in full — hasMore stays false so the "See more"
  // toggle and the collapsible body.slice(1) block below neither render.
  const hasSections = Boolean(post.sections);
  const hasMore = !hasSections && post.body.length > 1;
  const hasImage = Boolean(post.image?.src);

  async function handleShare() {
    const url = `${window.location.origin}${window.location.pathname}#${post.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ url, title: post.opening });
      } else {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
        setTimeout(() => setShareState("idle"), 1600);
      }
    } catch {
      // The person cancelled the native share sheet, or clipboard access
      // was denied — either way there is nothing useful to surface as an
      // error; the button simply stays idle, as if share was never opened.
    }
  }

  return (
    <li
      id={post.slug}
      // data-slug/data-category are read by ThoughtLeadershipFeed's own
      // DOM-visibility effect (see thought-leadership-feed.js) to decide
      // which already-rendered posts stay visible under the current
      // search/category filter — this element's own React rendering is
      // otherwise completely unaware of filtering.
      data-slug={post.slug}
      data-category={post.category}
      className="rounded-xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgb(11_37_69/0.04),0_8px_24px_-12px_rgb(11_37_69/0.12)] sm:p-8"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-border">
            <Image src="/leader.jpeg" alt={leadership.name} fill sizes="44px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            {/* Text's own variant="small" base class (text-small, 0.875rem)
                and this size override are the same specificity — Tailwind's
                generated CSS order, not the className string's own order,
                decides which wins on a same-specificity collision like this
                (confirmed elsewhere in this codebase: the search box's own
                !rounded-[...] override exists for the exact same reason),
                so the ! modifier is needed here too, not optional polish. */}
            <Text variant="small" className="!text-[1rem] font-semibold text-foreground sm:!text-[1.125rem]">
              {leadership.name}
            </Text>
            {/* A smaller size than the name (text-[0.7rem] vs. the default
                text-small/14px), not Text's own "label" variant — that
                variant's uppercase/letter-spaced/semibold styling is built
                for a section eyebrow, not a plain small caption under a
                name. A modest size bump from sm: up only, per the client's
                explicit "a bit, on large screens" — unprefixed stays at the
                original 0.7rem. */}
            <Text variant="small" muted className="text-[0.7rem] sm:!text-[0.8125rem]">
              {leadership.credential}
            </Text>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06} className="mt-6">
        <Text
          variant="reading"
          className="font-serif text-[1.5rem] font-semibold leading-snug text-foreground sm:text-[1.85rem]"
        >
          {post.opening}
        </Text>
      </Reveal>

      {hasImage && post.image.fit === "contain" ? (
        // "contain" is for a diagram whose full content must stay visible
        // (nothing cropped off an edge) rather than a photograph that can
        // safely be cropped to fill a frame — same precedent WhyUsPanel
        // already set for this exact file: intrinsic width/height, no
        // fill/object-cover, shown at its own real aspect ratio.
        <Reveal delay={0.1} className="mt-5">
          {/* max-h is a breakage guard, not a visual downsize: w-full/h-auto
              keeps the image at its real width (the card's own full
              content width, unchanged), but an unusually tall intrinsic
              aspect ratio (a portrait diagram, say) could otherwise make
              the rendered image far taller than the card around it —
              max-h caps that without touching width or normal-aspect
              images at all; overflow-hidden on the wrapper clips cleanly
              rather than letting a capped-height image distort. */}
          <div className="max-h-[32rem] overflow-hidden rounded-xl bg-border">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              sizes="(min-width: 1024px) 680px, 90vw"
              className="h-auto w-full"
            />
          </div>
          {post.image.tag && (
            <Text variant="small" muted className="mt-2">
              {post.image.tag}
            </Text>
          )}
        </Reveal>
      ) : (
        hasImage && (
          <Reveal delay={0.1} className="mt-5">
            {/* aspect-video already is this branch's own overflow guard —
                a fixed ratio box that fill/object-cover always exactly
                fits inside, regardless of the source image's real
                dimensions — so no separate max-h is needed here the way
                the width/height "contain" branch above needs one. */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-border">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                sizes="(min-width: 1024px) 680px, 90vw"
                className="object-cover"
              />
              {post.image.tag && (
                <span className="absolute bottom-3 left-3 rounded-sm bg-deep/60 px-2.5 py-1 text-small font-medium text-deep-foreground backdrop-blur-sm">
                  {post.image.tag}
                </span>
              )}
            </div>
          </Reveal>
        )
      )}

      {hasSections ? (
        // Every section shown in full, each its own heading (sans-serif,
        // bold, full-strength foreground — distinct from the serif muted
        // prose below it, the same sans/serif split this site already
        // uses elsewhere for structural text vs. reading text) plus its
        // paragraph. No collapse: these are co-equal named findings, not
        // a lead idea with supporting elaboration, so there is no single
        // "first paragraph" to privilege the way body[0] is below.
        <div className="mt-5 flex flex-col gap-5">
          {post.sections.map((section, index) => (
            <Reveal key={section.heading} delay={0.14 + index * 0.04}>
              <Text variant="body" className="font-semibold text-foreground">
                {section.heading}
              </Text>
              <Text variant="reading" muted className="mt-1.5">
                {section.text}
              </Text>
            </Reveal>
          ))}
        </div>
      ) : (
        <>
          <Reveal delay={0.14} className="mt-5">
            <Text variant="reading" muted>
              {post.body[0]}
            </Text>
          </Reveal>

          {hasMore && (
            <m.div
              initial={false}
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: DURATION.base, ease: EASE.outSoft }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                {post.body.slice(1).map((paragraph) => (
                  <Text key={paragraph} variant="reading" muted className="mb-4 last:mb-0">
                    {paragraph}
                  </Text>
                ))}
              </div>
            </m.div>
          )}
        </>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        {hasMore ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="text-small font-semibold text-accent underline-offset-4 hover:underline"
          >
            {expanded ? "Show less" : "See more"}
          </button>
        ) : (
          <span />
        )}

        {/* A compact pill, not the sitewide Button component: Button's
            divided label+icon-cell look is this site's CTA pattern
            ("Discuss your asset", "View all services"...) — too heavy a
            treatment for a lightweight per-post action sitting beside a
            plain text link on the same row. overflow-hidden plus a fixed
            min-w keeps the pill's own width stable while its inner
            content cross-fades between states, so the button doesn't
            visibly resize or make the "See more" link beside it jump.
            The live region announcing the state change is a separate
            sr-only span, not role="status" on the button itself — a live
            region on the interactive element whose own accessible name
            just changed on click/focus reads inconsistently across screen
            readers; a plain-text sibling announces the result once
            without fighting the button's native semantics or the
            animated child's own transient DOM presence. */}
        <button
          type="button"
          onClick={handleShare}
          className={cx(
            "flex min-w-[8.5rem] items-center justify-center gap-2 overflow-hidden rounded-sm border px-4 py-2.5 text-small font-semibold transition-colors duration-(--duration-fast)",
            shareState === "copied"
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-border-strong text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {shareState === "copied" ? (
              <m.span
                key="copied"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: DURATION.fast, ease: EASE.outSoft }}
                className="flex items-center gap-2"
              >
                <Check aria-hidden="true" strokeWidth={2} className="size-4" />
                Link copied
              </m.span>
            ) : (
              <m.span
                key="share"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: DURATION.fast, ease: EASE.outSoft }}
                className="flex items-center gap-2"
              >
                <Share2 aria-hidden="true" strokeWidth={1.5} className="size-4" />
                Share
              </m.span>
            )}
          </AnimatePresence>
          <span role="status" aria-live="polite" className="sr-only">
            {shareState === "copied" ? "Link copied" : ""}
          </span>
        </button>
      </div>
    </li>
  );
}
