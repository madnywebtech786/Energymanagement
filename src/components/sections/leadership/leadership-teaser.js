"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import * as m from "motion/react-m";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { CountUp } from "@/components/animations/count-up";

// An editorial profile spread, not a stat card: the founder's own name
// carries the section's typographic weight (large serif display, the way a
// magazine profile leads with its subject), the years figure stands alone
// as one quiet, isolated numeral rather than boxed in with three other
// captions, and prior employers read as a confident credential line — plain
// text with hairline dividers, not numbered rows in a bordered table (the
// numbered-register version mistook a flat list of companies for a
// sequence, which the brief itself warns against). No founder headshot
// exists yet (docs/redesign-plan.md, Needed from the client); this
// composition does not need one — type and a scroll-drawn rule under the
// name are the section's visual substance.
export function LeadershipTeaser({ leadership }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 45%"] });

  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <Eyebrow>{leadership.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-8 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end">
          <div ref={ref}>
            <Text variant="label" muted>
              {leadership.heading}
            </Text>
            <Heading level={2} size="h1" className="mt-3 font-serif">
              <TextReveal>{leadership.name}</TextReveal>
            </Heading>
            <div className="relative mt-5 h-px w-full overflow-hidden bg-border">
              <m.div
                data-reveal=""
                className="absolute inset-y-0 left-0 w-full origin-left bg-accent-graphic"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <Reveal delay={0.1}>
              <Text variant="small" muted className="mt-4">
                {leadership.role}
              </Text>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:text-right">
            <span className="font-serif text-[clamp(4rem,7vw,6rem)] leading-none text-foreground">
              <CountUp to={leadership.yearsExperience} suffix="+" />
            </span>
            <Text variant="small" muted className="mt-2">
              Years leading E&amp;P operations
            </Text>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <div>
            {leadership.bio.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.1 + index * 0.08} className="not-first:mt-5">
                <Text variant="reading" muted className="max-w-[62ch]">
                  {paragraph}
                </Text>
              </Reveal>
            ))}

            <Reveal delay={0.3} className="mt-8">
              <Button href="/services" variant="secondary">
                View our services
              </Button>
            </Reveal>
          </div>

          <div className="border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <Reveal delay={0.2}>
              <Text variant="label" muted>
                {leadership.experience.label}
              </Text>
            </Reveal>
            <ul className="mt-4 divide-y divide-border">
              {leadership.experience.employers.map((employer, index) => (
                <Reveal key={employer} as="li" delay={0.24 + index * 0.04} className="py-3 first:pt-0">
                  <Text variant="reading" className="font-serif text-foreground">
                    {employer}
                  </Text>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
