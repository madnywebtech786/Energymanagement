import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/animations/reveal";
import { ImageMask } from "@/components/animations/image-mask";
import { TextReveal } from "@/components/animations/text-reveal";

// One of the first four services, as its own content+image block: heading,
// description and a "View detail" button on one side, the service photo on
// the other, alternating sides by index for an editorial rhythm rather than
// a single repeated composition. Each panel triggers its own entrance the
// moment it scrolls into view (TextReveal/Reveal/ImageMask all use
// `whileInView` independently) — not a shared "active index" race against
// the other panels, so service 1 animates in as soon as it is reached,
// without waiting on anything above or below it.
export function ServiceDetailPanel({ service, index, image }) {
  const imageOnRight = index % 2 === 0;

  const content = (
    <div className="flex flex-col justify-center">
      <Reveal>
        <span className="text-label tabular-nums text-accent-graphic">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Reveal>
      <Heading level={3} size="h2" className="mt-4 max-w-[16ch]">
        <TextReveal>{service.name}</TextReveal>
      </Heading>
      <Reveal delay={0.1}>
        <Text variant="reading" muted className="mt-6 max-w-[54ch]">
          {service.description ?? service.tagline}
        </Text>
      </Reveal>
      <Reveal delay={0.18}>
        <Button href={`/services/${service.slug}`} variant="secondary" className="mt-8 w-fit">
          View detail
        </Button>
      </Reveal>
    </div>
  );

  const picture = (
    <ImageMask direction={imageOnRight ? "left" : "right"} className="aspect-portrait rounded-xl">
      {image ? (
        <Photo image={image} sizes="(min-width: 1024px) 42vw, 90vw" className="size-full rounded-xl" />
      ) : (
        <div className="flex size-full items-center justify-center bg-surface">
          <Text variant="small" muted className="max-w-[20ch] text-center">
            Diagram in development
          </Text>
        </div>
      )}
    </ImageMask>
  );

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {imageOnRight ? (
        <>
          {content}
          {picture}
        </>
      ) : (
        <>
          <div className="lg:order-2">{content}</div>
          <div className="lg:order-1">{picture}</div>
        </>
      )}
    </div>
  );
}
