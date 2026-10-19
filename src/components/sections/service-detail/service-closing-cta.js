import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

// The site's deep-navy closing-CTA pattern (see ContactCta on the home
// page), reused here with service-specific copy instead of a generic
// sitewide line.
export function ServiceClosingCta({ serviceName }) {
  return (
    <Section tone="deep">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow tone="ink" rule={false}>
            Ready when you are
          </Eyebrow>
        </Reveal>
        <Heading level={2} className="mt-6 max-w-[26ch]">
          <TextReveal>{`Talk to us about ${serviceName.replace(/\s*Advisory$/, "")}`}</TextReveal>
        </Heading>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mt-5 max-w-[48ch] text-deep-muted">
            A confidential conversation about your asset, no obligation.
          </Text>
        </Reveal>
        <Reveal delay={0.18} className="mt-9">
          <Button href="/contact">Discuss your asset</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
