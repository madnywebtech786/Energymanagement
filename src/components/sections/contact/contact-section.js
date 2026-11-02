import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { ContactForm } from "./contact-form";
import { ContactDetails } from "./contact-details";

// The landing page's closing section, rebuilt to match the client's
// reference screenshot (2026-11-02): a plain light left column (eyebrow,
// heading, lead, a supporting line on who the firm works with, then the
// three direct details) beside the real form on the right. This replaces
// the previous dark-card-form-left / light-card-details-right split —
// ContactDetails is reused unchanged (same component /contact's own page
// uses) rather than hand-duplicating a lone email line, since the client
// confirmed phone and office should stay visible here too, not just the
// email the reference's own crop happened to show.
export function ContactSection({ contact }) {
  const { section, details } = contact;

  return (
    <Section id="contact-form" tone="paper" ruled>
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{contact.eyebrow}</Eyebrow>
            </Reveal>
            <Heading level={2} className="mt-5 max-w-[16ch]">
              <TextReveal>{section.heading}</TextReveal>
            </Heading>
            <Reveal delay={0.1}>
              <Text variant="lead" muted className="mt-5 max-w-[42ch]">
                {section.lead}
              </Text>
            </Reveal>
            <Reveal delay={0.16}>
              <Text variant="small" muted className="mt-6 max-w-[48ch]">
                {section.supportingText}
              </Text>
            </Reveal>
            <div className="mt-8 border-t border-border">
              <ContactDetails details={details} />
            </div>
          </div>

          <Reveal delay={0.1}>
            <ContactForm copy={contact.form} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
