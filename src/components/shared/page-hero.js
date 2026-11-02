import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { cx } from "@/lib/cx";

// The compact intro band every secondary page opens with (not the full
// slide hero, which is / only): eyebrow, a level-1 heading sized down from
// display scale, a lead paragraph. Shared so every page gets the same
// entrance choreography and the same vertical rhythm, rather than each page
// hand-duplicating the same five elements with small drifts between them.
// `pad` controls the bottom: "even" (default) matches the band's own top
// padding, correct when the band sits alone before a different tone
// transitions in; "tight" zeroes it for a page whose very next section is
// the same tone, where the two bands' padding would otherwise double up.
export function PageHero({ eyebrow, heading, lead, headingWidth = "max-w-[26ch]", leadWidth = "max-w-[56ch]", pad = "even" }) {
  return (
    <Section
      as="div"
      tone="paper"
      className={cx(
        "pt-[calc(var(--spacing-section)*0.6)]",
        pad === "even" ? "pb-[calc(var(--spacing-section)*0.6)]" : "pb-0",
      )}
    >
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Heading level={1} size="h2" className={cx("mt-5", headingWidth)}>
          <TextReveal>{heading}</TextReveal>
        </Heading>
        <Reveal delay={0.1}>
          <Text variant="lead" muted className={cx("mt-6", leadWidth)}>
            {lead}
          </Text>
        </Reveal>
      </Container>
    </Section>
  );
}
