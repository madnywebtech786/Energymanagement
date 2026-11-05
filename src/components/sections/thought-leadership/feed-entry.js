"use client";

import { useId, useState } from "react";
import Image from "next/image";
import * as m from "motion/react-m";
import { Share2 } from "lucide-react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { leadership } from "@/content/leadership";
import { DURATION, EASE } from "@/lib/motion";

// Deterministic, locale-fixed formatting — never relies on the request's
// own timezone/locale or on Date.now(), both of which would make this
// prerendered route non-deterministic under Cache Components. "date" is
// always the fixed "YYYY-MM-DD" string from thought-leadership.js.
function formatPostDate(date, month = "long") {
  const [year, monthNum, day] = date.split("-").map(Number);
  // New Date(year, monthIndex, day) with explicit numeric parts, not
  // new Date(dateString), parses as local time with no UTC/timezone
  // ambiguity — the moment itself is never read, only used to format.
  const parsed = new Date(year, monthNum - 1, day);
  return parsed.toLocaleDateString("en-CA", { year: "numeric", month, day: "numeric" });
}

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
export function FeedEntry({ post }) {
  const [expanded, setExpanded] = useState(false);
  const [shareState, setShareState] = useState("idle"); // "idle" | "copied"
  const toastId = useId();
  const hasMore = post.body.length > 1;
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
    <li id={post.slug} className="border-t border-border py-12 first:border-t-0 sm:py-14">
      <Reveal>
        <div className="flex items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-border">
            <Image src="/leader.jpeg" alt={leadership.name} fill sizes="44px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <Text variant="small" className="font-semibold text-foreground">
              {leadership.name}
            </Text>
            {/* A smaller size than the name (text-[0.7rem] vs. the default
                text-small/14px), not Text's own "label" variant — that
                variant's uppercase/letter-spaced/semibold styling is built
                for a section eyebrow, not a plain small caption under a
                name. Shown at every width now (an earlier version hid this
                below sm: on a mistaken assumption that it competed with
                the date for horizontal room on the same row — it doesn't:
                credential sits on its own line under the name, so the
                date column's width budget was never actually affected by
                it; items-center on the row simply grows to match this
                column's new two-line height). */}
            <Text variant="small" muted className="text-[0.7rem]">
              {leadership.credential}
            </Text>
          </div>
          <Text variant="small" muted className="shrink-0 whitespace-nowrap text-right tabular-nums">
            {/* Short month on mobile ("Mar 2, 2026") so the date and read
                time comfortably share the row with the avatar and name at
                narrow widths; full month name from sm: up, where there is
                room for it. */}
            <span className="sm:hidden">{formatPostDate(post.date, "short")}</span>
            <span className="hidden sm:inline">{formatPostDate(post.date)}</span>
            {" "}· {post.readingMinutes} min read
          </Text>
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
          <div className="overflow-hidden rounded-sm bg-border">
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
            <div className="relative aspect-video overflow-hidden rounded-sm bg-border">
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

        <div className="relative">
          <Button variant="secondary" size="md" icon={Share2} onClick={handleShare}>
            Share
          </Button>
          <span
            id={toastId}
            role="status"
            aria-live="polite"
            className={`pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-sm bg-deep px-3 py-1.5 text-small text-deep-foreground transition-opacity duration-(--duration-base) ${
              shareState === "copied" ? "opacity-100" : "opacity-0"
            }`}
          >
            Link copied
          </span>
        </div>
      </div>
    </li>
  );
}
