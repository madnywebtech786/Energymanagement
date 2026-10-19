import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

// The site's second deep-navy moment (the first is GuaranteeSection), set
// right before the contact section as a short, one-idea turn rather than
// another content panel: a single centred column, not the asymmetric split
// every section above it uses, so it reads as a distinct beat. Centred is
// deliberate here, not the generic default — one short line and one button,
// not the brief's "heading + paragraph + two buttons" pattern.
export function ContactCta({ cta }) {
  return (
    <Section tone="deep">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow tone="ink" rule={false}>
            {cta.eyebrow}
          </Eyebrow>
        </Reveal>
        <Heading level={2} className="mt-6 max-w-[18ch]">
          <TextReveal>{cta.heading}</TextReveal>
        </Heading>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mt-5 text-deep-muted">
            {cta.lead}
          </Text>
        </Reveal>
        <Reveal delay={0.18} className="mt-9">
          <Button href="#contact-form">Send a message</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
