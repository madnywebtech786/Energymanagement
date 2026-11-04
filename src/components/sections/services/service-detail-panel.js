import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

// One of the first four services, as a two-column text grid: a large
// tabular numeral on its own in the left column, heading/description/button
// in the right — the same asymmetric split the content+image version used,
// now with the numeral standing in for the photo's visual weight instead of
// a second text column repeating the heading's own job (the client removed
// service photos sitewide). Each panel triggers its own entrance the moment
// it scrolls into view (TextReveal/Reveal use `whileInView` independently)
// — not a shared "active index" race against the other panels, so service 1
// animates in as soon as it is reached, without waiting on anything above
// or below it.
export function ServiceDetailPanel({ service, index }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,10rem)_1fr] lg:gap-16">
      <Reveal>
        <span className="font-serif text-[4.5rem] leading-none tabular-nums text-accent-graphic lg:text-[5.5rem]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Reveal>

      <div>
        <Heading level={3} size="h2" className="max-w-[20ch]">
          <TextReveal>{service.homeDisplayName ?? service.name}</TextReveal>
        </Heading>
        <Reveal delay={0.1}>
          <Text variant="reading" muted className="mt-6 max-w-[60ch]">
            {service.description ?? service.tagline}
          </Text>
        </Reveal>
        <Reveal delay={0.18}>
          <Button href={`/services/${service.slug}`} variant="secondary" className="mt-8 w-fit">
            View detail
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
