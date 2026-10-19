import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { ContactForm } from "./contact-form";
import { ContactDetails } from "./contact-details";

// The landing page's closing section: the real form sits left in a dark
// card (not a link out to /contact — the form itself is the destination the
// ContactCta band above points to), the three direct details run right in a
// matching light card, both the same height so the pair reads as one
// composed unit rather than a tall form beside a short list trailing off —
// the details card's own content is vertically centred, and a closing
// reassurance line fills what would otherwise be empty space beneath it.
export function ContactSection({ contact }) {
  return (
    <Section id="contact-form" tone="paper" ruled>
      <Container>
        <div className="max-w-[48ch]">
          <Reveal>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
          </Reveal>
          <Heading level={2} className="mt-5">
            <TextReveal>{contact.heading}</TextReveal>
          </Heading>
          <Reveal delay={0.1}>
            <Text variant="lead" muted className="mt-5">
              {contact.lead}
            </Text>
          </Reveal>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Reveal delay={0.1} className="h-full">
            <ContactForm copy={contact.form} />
          </Reveal>

          <Reveal delay={0.16} className="flex rounded-xl border border-border bg-surface p-6 sm:p-10">
            <div className="flex flex-1 flex-col justify-center">
              <ContactDetails details={contact.details} />
              <Text variant="small" muted className="mt-8 border-t border-border pt-6">
                We respond to every enquiry within one business day. Conversations are confidential.
              </Text>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
