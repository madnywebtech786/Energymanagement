import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactDetails } from "@/components/sections/contact/contact-details";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

export const metadata = {
  title: `Contact | ${site.brand.name}`,
  description: contact.lead,
};

// The same asymmetric 7fr/5fr frame the home page's closing ContactCta and
// GuaranteeSection already use, so arriving here from that section feels
// continuous rather than landing on an unrelated page.
export default function ContactPage() {
  return (
    <main>
      <Section as="div" tone="paper" className="pb-0 pt-[calc(var(--spacing-section)*0.6)]">
        <Container>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <Heading level={1} size="h2" className="mt-5 max-w-[20ch]">
            {contact.heading}
          </Heading>
          <Text variant="lead" muted className="mt-6 max-w-[48ch]">
            {contact.lead}
          </Text>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
            <Reveal className="h-full">
              <ContactForm copy={contact.form} />
            </Reveal>

            <Reveal delay={0.1} className="flex rounded-xl border border-border bg-surface p-6 sm:p-10">
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
    </main>
  );
}
