import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { GuaranteeSeal } from "./guarantee-seal";

// The brief's one deep-navy moment (see docs/redesign-plan.md, Decisions):
// a different register for a different kind of claim — a risk-reversal
// promise, not another content section. The claim sits left, the seal
// draws itself in beside it as the section's one deliberate motion moment,
// the four proof points run underneath as a plain list, and the scope note
// sits small at the foot like a footnote on a contract.
export function GuaranteeSection({ guarantee }) {
  return (
    <Section tone="deep">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow tone="ink">{guarantee.eyebrow}</Eyebrow>
            </Reveal>
            <Heading level={2} className="mt-5 max-w-[20ch]">
              <TextReveal>{guarantee.heading}</TextReveal>
            </Heading>
            <Reveal delay={0.1}>
              <Text variant="lead" className="mt-6 max-w-[46ch] text-deep-muted">
                {guarantee.summary} {guarantee.detail}
              </Text>
            </Reveal>

            <ul className="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2 sm:gap-6">
              {guarantee.points.map((point, index) => (
                <Reveal key={point} delay={0.2 + index * 0.05} as="li" className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="h-px w-4 shrink-0 bg-accent-graphic" />
                  <Text variant="small" className="text-deep-foreground">
                    {point}
                  </Text>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.35}>
              <Text variant="small" className="mt-10 max-w-[56ch] text-deep-muted">
                {guarantee.scope}
              </Text>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mx-auto lg:mx-0 lg:ml-auto">
            <GuaranteeSeal seal={guarantee.seal} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
