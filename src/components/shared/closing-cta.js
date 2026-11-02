import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

// The site's deep-navy closing-CTA pattern: a single centred column, not
// the asymmetric split every section above it uses, so it reads as a
// distinct closing beat rather than another content panel. Shared by every
// page that ends on this pattern (service detail pages, /about) with
// page-specific copy passed in, rather than one copy per page.
export function ClosingCta({ eyebrow = "Ready when you are", heading, lead, action }) {
  return (
    <Section tone="deep">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow tone="ink" rule={false}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <Heading level={2} className="mt-6 max-w-[26ch]">
          <TextReveal>{heading}</TextReveal>
        </Heading>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mt-5 max-w-[48ch] text-deep-muted">
            {lead}
          </Text>
        </Reveal>
        <Reveal delay={0.18} className="mt-9">
          <Button href={action.href}>{action.label}</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
