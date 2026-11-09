"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import * as m from "motion/react-m";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

// The source paragraph is one sentence of legal boilerplate, but it is
// actually two distinct claims: what this team does directly (confident,
// first-person) and where it hands off to a licensed specialist (a
// boundary, not an apology). Split into two columns instead of one dense
// disclaimer paragraph in a bordered card — the card read as a generic
// notice box with nothing of its own to say; this reads as an operating
// model, which for regulated advisory work is closer to the truth and a
// stronger trust signal than hiding the distinction in small print. The
// connecting rule uses the same scroll-drawn-line technique LeadershipTeaser
// already uses under the founder's name, not a new graphic.
export function ProfessionalResponsibility({ responsibility }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 45%"] });

  return (
    <Section tone="surface" ruled>
      <Container>
        <div ref={ref} className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_1px_minmax(0,6fr)] lg:gap-0">
          <div className="lg:pr-14">
            <Reveal>
              <Text variant="label" muted>
                How we work
              </Text>
            </Reveal>
            <Heading level={2} size="h3" className="mt-3 max-w-[20ch] font-serif">
              <TextReveal>We handle the business. Not every seal.</TextReveal>
            </Heading>
            <Reveal delay={0.1}>
              <Text variant="reading" muted className="mt-5 max-w-[42ch]">
                {responsibility.scope}
              </Text>
            </Reveal>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-0 w-px bg-border" />
            <m.div
              data-reveal=""
              className="absolute inset-x-0 top-0 w-px origin-top bg-accent-graphic"
              style={{ scaleY: scrollYProgress, height: "100%" }}
            />
          </div>

          <div className="mt-10 border-t border-border pt-8 lg:mt-0 lg:border-t-0 lg:pl-14 lg:pt-0">
            <Reveal delay={0.08}>
              <Text variant="label" muted>
                The boundary
              </Text>
            </Reveal>
            <Reveal delay={0.15}>
              <Text variant="reading" muted className="mt-3 max-w-[48ch]">
                {responsibility.text}
              </Text>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
