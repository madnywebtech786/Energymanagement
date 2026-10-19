import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

// Short narrative on how the engagement actually runs, building trust
// before the scope breakdown below it names the individual line items.
export function ServiceApproach({ paragraphs }) {
  return (
    <Section tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Our approach</Eyebrow>
            </Reveal>
            <Heading level={2} className="mt-5 max-w-[18ch]">
              <TextReveal>How this engagement actually runs</TextReveal>
            </Heading>
          </div>

          <div className="flex flex-col gap-6">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.1 + index * 0.08} as="p">
                <Text variant="reading" className="max-w-[62ch] text-foreground">
                  {paragraph}
                </Text>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
