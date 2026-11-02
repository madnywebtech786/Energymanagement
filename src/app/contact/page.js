import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { PageHero } from "@/components/shared/page-hero";
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
// continuous rather than landing on an unrelated page. PageHero (own
// eyebrow/heading/lead, unchanged) still opens the page with its own
// distinct copy ("Let's discuss your asset" — kept deliberately separate
// from the home page's own ContactSection heading, see contact.js); the
// grid below it was then restyled to match ContactSection's open layout
// (2026-11-02): no bordered cards around the form or the details, details
// run plainly beside the form the same way they do on the home page,
// rather than each sitting in its own box.
export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow={contact.eyebrow}
        heading={contact.heading}
        lead={contact.lead}
        headingWidth="max-w-[20ch]"
        leadWidth="max-w-[48ch]"
        pad="tight"
      />

      <Section tone="paper">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <ContactDetails details={contact.details} />
              <Reveal delay={0.18}>
                <Text variant="small" muted className="mt-8 border-t border-border pt-6">
                  We respond to every enquiry within one business day. Conversations are confidential.
                </Text>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <ContactForm copy={contact.form} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
