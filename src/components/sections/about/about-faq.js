import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/animations/reveal";
import { FaqItem } from "@/components/sections/service-detail/faq-item";

// Same centred-FAQ pattern as ServiceFaq (service detail pages) — a
// deliberate compositional break from the page's left-aligned rhythm —
// reusing the same FaqItem primitive so both pages share one accordion
// implementation.
export function AboutFaq({ faq }) {
  return (
    <Section tone="paper">
      <Container>
        <div className="mx-auto max-w-[46ch] text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow rule={false}>{faq.eyebrow}</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading level={2} className="mt-5 whitespace-nowrap">
              {faq.heading}
            </Heading>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-3 sm:mt-20">
          {faq.items.map((item, index) => (
            <Reveal key={item.q} delay={index * 0.04} y={16}>
              <FaqItem question={item.q} answer={item.a} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
