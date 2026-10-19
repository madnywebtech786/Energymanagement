"use client";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Photo } from "@/components/ui/photo";
import { ImageMask } from "@/components/animations/image-mask";
import { ArrowRight } from "lucide-react";

// A large-format editorial card: a tall photo (ImageMask reveal, the same
// wipe the home page's desktop service panels use) carrying the name,
// tagline and "View detail" link directly over its lower portion on a
// gradient scrim, rather than a thumbnail with caption text below it. The
// whole card is one photo-contained unit — nothing sits on plain paper
// beneath the image — which is what the brief calls a genuinely different
// composition, not generic icon-plus-caption cards.
export function ServiceIndexCard({ service, index, image }) {
  return (
    <ImageMask
      direction={index % 3 === 1 ? "down" : "up"}
      className="group/card relative aspect-portrait overflow-hidden rounded-xl"
    >
      <a href={`/services/${service.slug}`} className="relative block size-full">
        {image ? (
          <Photo
            image={image}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="size-full transition-transform duration-(--duration-slow) ease-out-quart group-hover/card:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-surface">
            <Text variant="small" muted>
              Diagram in development
            </Text>
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-deep/95 via-deep/60 to-transparent"
        />

        <span className="absolute left-6 top-6 font-serif text-label tabular-nums text-deep-foreground/80 sm:left-7 sm:top-7">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-6 bottom-6 sm:inset-x-7 sm:bottom-7">
          <Heading level={3} size="h4" className="text-deep-foreground">
            {service.name}
          </Heading>
          <Text variant="small" className="mt-2 max-w-[32ch] text-deep-muted">
            {service.tagline}
          </Text>
          <span className="mt-4 flex items-center gap-2 text-small font-medium text-accent-graphic">
            View detail
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 transition-transform duration-(--duration-base) ease-out-expo group-hover/card:translate-x-0.5"
            />
          </span>
        </div>
      </a>
    </ImageMask>
  );
}
