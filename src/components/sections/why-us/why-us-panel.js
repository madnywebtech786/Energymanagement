import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Parallax } from "@/components/animations/parallax";

// Five qualities, not a process — no step numbers. The photo sits once on
// the left (not alternating; this section has one idea, not a sequence of
// panels like ServicesPanel), and the points run as a divided list beside
// it rather than five identical icon-cards. The photo drifts at scroll
// (Parallax) rather than only revealing once on entry (ImageMask, used by
// the services panels) — a genuinely different motion character for the
// site's one single-photo section, not a retuned copy of the services wipe.
export function WhyUsPanel({ whyUs, image }) {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal y={0} className="aspect-portrait overflow-hidden rounded-xl lg:aspect-auto lg:h-full">
            <Parallax distance={0.08} className="size-full">
              <Photo
                image={image}
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="size-full"
              />
            </Parallax>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>{whyUs.eyebrow}</Eyebrow>
            </Reveal>
            <Heading level={2} className="mt-5 max-w-[22ch]">
              <TextReveal>{whyUs.heading}</TextReveal>
            </Heading>
            <Reveal delay={0.1}>
              <Text variant="lead" muted className="mt-5 max-w-[48ch]">
                {whyUs.lead}
              </Text>
            </Reveal>

            <ul className="mt-10 divide-y divide-border border-t border-border sm:mt-12">
              {whyUs.points.map((point, index) => (
                <Reveal key={point.title} as="li" delay={0.08 + index * 0.05} className="py-5 sm:py-6">
                  <Heading level={3} size="h4">
                    {point.title}
                  </Heading>
                  <Text variant="small" muted className="mt-2 max-w-[46ch]">
                    {point.text}
                  </Text>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
