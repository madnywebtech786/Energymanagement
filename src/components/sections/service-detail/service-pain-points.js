import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";

// Each row pairs the cost of the problem (left, quiet/muted) with the
// outcome of addressing it (right, teal-accented) — the before/after made
// explicit rather than implied, instead of a generic icon grid.
export function ServicePainPoints({ points }) {
  return (
    <Section tone="paper">
      <Container>
        <div className="max-w-[48ch]">
          <Reveal>
            <Eyebrow>The cost of waiting</Eyebrow>
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <Heading level={2} className="mt-5 max-w-[30ch] lg:max-w-[34ch]">
            What this looks like, with and without the right support
          </Heading>
        </Reveal>

        <div className="mt-16 border-t border-border sm:mt-20">
          {points.map((point, index) => (
            <Reveal key={point.without} delay={index * 0.06} as="div" className="grid gap-6 border-b border-border py-8 sm:grid-cols-2 sm:gap-12 sm:py-10">
              <div className="flex gap-4">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-border-strong/60" />
                <div>
                  <Text variant="label" muted>
                    Without it
                  </Text>
                  <Text variant="reading" className="mt-2 max-w-[42ch] text-muted-foreground">
                    {point.without}
                  </Text>
                </div>
              </div>
              <div className="flex gap-4">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent-graphic" />
                <div>
                  <Text variant="label" className="text-accent">
                    With it
                  </Text>
                  <Text variant="reading" className="mt-2 max-w-[42ch] text-foreground">
                    {point.with}
                  </Text>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
