"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { useScrollActiveIndex } from "@/hooks/use-scroll-active-index";
import { ServiceDetailPanel } from "./service-detail-panel";
import { ServiceCardMobile } from "./service-card-mobile";

// Home page services section: four featured services, each shown in full,
// then a "View all services" link to the rest — not all ten inline, which
// made for a very long, same-weight list either as a scroll or as a sticky
// panel. `previewItems` is the client's explicit choice of which four and
// in what order (the "Subsurface & reservoir" group from
// src/content/services.js's `serviceGroups`, resolved by the caller — see
// src/app/page.js) — this component only renders what it is given, it does
// not pick the four itself. Desktop (lg and up): each service is its own
// two-column text panel, stacked vertically, each one animating in
// independently the moment it scrolls into view (see ServiceDetailPanel).
// Below lg: the same four as text-only cards (see ServiceCardMobile), each
// one's own card highlighting on scroll via useScrollActiveIndex. No photos
// anywhere in this section — removed sitewide at the client's request.
export function ServicesPanel({ services, previewItems }) {
  const [activeCardIndex, registerCardRef] = useScrollActiveIndex(previewItems.length);

  return (
    <Section id="services">
      <Container>
        <div>
          <Reveal>
            <Eyebrow>{services.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading level={2} className="mt-5 max-w-[22ch] sm:max-w-[26ch] lg:max-w-[34ch]">
              {services.heading}
            </Heading>
          </Reveal>
          <Reveal delay={0.14}>
            <Text variant="lead" muted className="mt-5 max-w-[60ch]">
              {services.lead}
            </Text>
          </Reveal>
        </div>

        {/* Desktop: each of the four services as its own two-column text
            panel, stacked with generous vertical rhythm so each one
            animates in on its own as it is reached, rather than racing a
            shared "active" index against the others. */}
        <div className="mt-20 hidden flex-col gap-20 lg:flex">
          {previewItems.map((service, index) => (
            <ServiceDetailPanel key={service.slug} service={service} index={index} />
          ))}
        </div>

        {/* Below lg: the same four as text-only cards. */}
        <ul className="mt-12 flex flex-col gap-5 lg:hidden">
          {previewItems.map((service, index) => (
            <ServiceCardMobile
              key={service.slug}
              ref={registerCardRef(index)}
              index={index}
              service={service}
              active={index === activeCardIndex}
            />
          ))}
        </ul>

        <div className="mt-12 flex justify-center lg:mt-20">
          <Button href="/services" variant="primary">
            View all services
          </Button>
        </div>
      </Container>
    </Section>
  );
}
