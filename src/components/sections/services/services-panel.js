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

const PREVIEW_COUNT = 4;

// Home page services section: the first four services only (see
// PREVIEW_COUNT), each shown in full, then a "View all services" link to
// the rest (Phase 4) — not all ten inline, which made for a very long,
// same-weight list either as a scroll or as a sticky panel. Desktop (lg and
// up): each service is its own content+image panel, stacked vertically,
// each one animating in independently the moment it scrolls into view (see
// ServiceDetailPanel). Below lg: the same four as photo-background cards
// (see ServiceCardMobile), each one's own card highlighting on scroll via
// useScrollActiveIndex.
export function ServicesPanel({ services, images }) {
  const previewItems = services.items.slice(0, PREVIEW_COUNT);
  const [activeCardIndex, registerCardRef] = useScrollActiveIndex(previewItems.length);

  return (
    <Section id="services">
      <Container>
        <div className="max-w-[48ch]">
          <Reveal>
            <Eyebrow>{services.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading level={2} className="mt-5">
              {services.heading}
            </Heading>
          </Reveal>
          <Reveal delay={0.14}>
            <Text variant="lead" muted className="mt-5">
              {services.lead}
            </Text>
          </Reveal>
        </div>

        {/* Desktop: each of the four services as its own content+image
            panel, stacked with generous vertical rhythm so each one
            animates in on its own as it is reached, rather than racing a
            shared "active" index against the others. */}
        <div className="mt-20 hidden flex-col gap-24 lg:flex xl:gap-28">
          {previewItems.map((service, index) => (
            <ServiceDetailPanel
              key={service.slug}
              service={service}
              index={index}
              image={images[service.slug]}
            />
          ))}
        </div>

        {/* Below lg: the same four as photo-background cards. */}
        <ul className="mt-12 flex flex-col gap-5 lg:hidden">
          {previewItems.map((service, index) => (
            <ServiceCardMobile
              key={service.slug}
              ref={registerCardRef(index)}
              index={index}
              service={service}
              image={images[service.slug]}
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
