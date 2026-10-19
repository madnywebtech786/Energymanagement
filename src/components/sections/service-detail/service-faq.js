import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/animations/reveal";
import { FaqItem } from "./faq-item";

// Centred (a deliberate compositional break from the page's left-aligned
// rhythm, the same move ContactCta already makes elsewhere) over a column
// of FaqItem panels — see that file for how each one gets a smooth
// open/close animation on top of a native <details>/<summary>, instead of
// the browser's instant snap, without losing the no-JS/AEO-crawler case.
export function ServiceFaq({ faq }) {
  return (
    <Section tone="paper">
      <Container>
        <div className="mx-auto max-w-[46ch] text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow rule={false}>Questions</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading level={2} className="mt-5 whitespace-nowrap">
              Common questions
            </Heading>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-3 sm:mt-20">
          {faq.map((item, index) => (
            <Reveal key={item.q} delay={index * 0.04} y={16}>
              <FaqItem question={item.q} answer={item.a} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
