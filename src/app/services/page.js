import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { ServiceIndexCard } from "@/components/sections/services-index/service-index-card";
import { services } from "@/content/services";
import { images } from "@/content/images";
import { site } from "@/content/site";

export const metadata = {
  title: `Services | ${site.brand.name}`,
  description: services.lead,
};

// The same compact intro band ContactPage uses, then all 10 services as
// cards in one grid — unlike the home page's services panel (which only
// shows the first 4, with a "View all services" link to here), this page
// is the full list, so no scope cut needed.
export default function ServicesPage() {
  return (
    <main>
      <Section as="div" tone="paper" className="pb-0 pt-[calc(var(--spacing-section)*0.6)]">
        <Container>
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <Heading level={1} size="h2" className="mt-5 max-w-[20ch]">
            {services.heading}
          </Heading>
          <Text variant="lead" muted className="mt-6 max-w-[48ch]">
            {services.lead}
          </Text>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service, index) => (
              <Reveal key={service.slug} as="li" y={0} delay={(index % 3) * 0.06}>
                <ServiceIndexCard service={service} index={index} image={images.services[service.slug]} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
