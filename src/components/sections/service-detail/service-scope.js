import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { legal } from "@/content/legal";

// Redesigned from a plain numbered list (too close to the approach
// narrative above it) into a set of individual item panels on the
// surface-elevated system already used for the contact form/details
// cards: a large outline numeral breaking the panel's own top edge (the
// same "break the frame" move HeroFrame and the mobile service card's
// index numeral already make elsewhere), the bullet as its own heading,
// and the "why it matters" note as supporting text beneath a hairline —
// each item now reads as a distinct deliverable, not one line in a list.
export function ServiceScope({ bullets, scopeNotes }) {
  return (
    <Section tone="paper">
      <Container>
        <div className="max-w-[48ch]">
          <Reveal>
            <Eyebrow>Scope of work</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading level={2} className="mt-5">
              What's included
            </Heading>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:mt-20 sm:grid-cols-2">
          {bullets.map((bullet, index) => (
            <Reveal
              key={bullet}
              as="li"
              delay={index * 0.05}
              y={16}
              className="relative overflow-hidden bg-surface p-7 sm:p-8"
            >
              {/* The numeral sits inline with the bullet title, not
                  absolutely positioned over it — pinning it to the
                  panel's outer corner read ambiguous next to the grid's
                  own divider line (it looked like it belonged to the
                  neighbouring column). A quiet inline mark beside the
                  title keeps the "numbered deliverable" idea without
                  competing with the layout's own structural lines. */}
              <div className="flex items-start justify-between gap-4">
                <Text variant="reading" className="max-w-[32ch] font-medium text-foreground">
                  {bullet}
                </Text>
                <span
                  aria-hidden="true"
                  className="shrink-0 select-none font-serif text-[1.75rem] leading-none text-border-strong/70 sm:text-[2rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {scopeNotes?.[bullet] && (
                <Text variant="small" muted className="mt-4 max-w-[36ch] border-t border-border pt-4">
                  {scopeNotes[bullet]}
                </Text>
              )}
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-10 rounded-sm border-l-2 border-accent-graphic bg-surface px-6 py-5 text-body text-muted-foreground">
            <span className="font-medium text-foreground">{legal.responsibility.label}</span>{" "}
            {legal.responsibility.text}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
