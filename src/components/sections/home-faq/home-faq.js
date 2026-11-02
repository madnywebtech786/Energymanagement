import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { HomeFaqItem } from "./home-faq-item";

// New home-page section (2026-11-02, matching the client's reference
// exactly): a left-aligned eyebrow/heading column beside a right-column
// divided list of questions — distinct from AboutFaq/ServiceFaq's centred
// column of bordered cards, which this section deliberately does not
// reuse, since the reference's own composition is this asymmetric split,
// not a centred one. Static left column (no per-question content there),
// so it does not scroll or change as questions open on the right.
export function HomeFaq({ faq }) {
  return (
    <Section tone="paper" ruled>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{faq.eyebrow}</Eyebrow>
            </Reveal>
            <Heading level={2} className="mt-5 max-w-[20ch]">
              <TextReveal>{faq.heading}</TextReveal>
            </Heading>
          </div>

          <div className="border-b border-border">
            {faq.items.map((item, index) => (
              <Reveal key={item.q} delay={index * 0.04} y={16}>
                <HomeFaqItem question={item.q} answer={item.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
