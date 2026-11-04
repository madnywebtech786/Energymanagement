import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { cx } from "@/lib/cx";

// Five qualities (client-supplied copy, 2026-11-02; a 6th, "Licensed expert
// network", was cut at the client's request the same day), not a process —
// no step numbers of their own (the diagram's 1-4 pins supply the only
// numbering this section needs; see below).
//
// Redesigned 2026-11-05, third pass ("Direction 1" from a 3-way mockup
// comparison, chosen by the client over a full-width image band and an
// edge-bleed split). The second pass's bordered `rounded-xl border
// bg-surface` card around the diagram was rejected on the image framing
// specifically ("the img is too big... i dont like the design") — a card
// frame reads as "decorative object", but this diagram
// (public/12_field_development.webp, a clean isometric illustration with
// its own near-white background and four numbered pins) is already a
// finished technical drawing; boxing it a second time doubled the frame
// and made it read as stock clip-art. This pass drops the card entirely:
// the diagram runs at real size, unboxed, and the heading moves above both
// columns as a short wide statement instead of fighting the image for
// column width. The 5 points become a numbered list (01-05) that echoes
// the diagram's own numbered-pin idiom — the same "number marks a stage"
// device used once instead of two unrelated numbering systems competing
// on one section.
const DIAGRAM_WIDTH = 1511;
const DIAGRAM_HEIGHT = 998;

const DIAGRAM_STAGES = ["Well pad", "Gathering line", "Central processing", "Pipeline export"];

// `tight` collapses this section's own top padding to a short, borderless
// gap instead, for the one place on the site it follows another
// `tone="paper"` section with nothing to separate them (the home page,
// directly after StatsStrip, also `tone="paper"`): back to back, two full
// `py-section` paddings stack into dead air with no visual break between
// same-tone bands. No border here — the two bands read as one continuous
// paper surface, not two sections joined at a seam. Defaults to false so
// every other mount (e.g. /about, where this panel follows LeadershipTeaser's
// `tone="surface"`) is unaffected.
export function WhyUsPanel({ whyUs, tight = false }) {
  return (
    <Section tone="paper" className={cx(tight && "pt-4 sm:pt-6 lg:pt-8")}>
      <Container>
        <Reveal>
          <Eyebrow>{whyUs.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <Heading level={2} className="max-w-[26ch]">
            <TextReveal>{whyUs.heading}</TextReveal>
          </Heading>
          <Reveal delay={0.1}>
            <Text variant="lead" muted className="max-w-[46ch] lg:max-w-[40ch]">
              {whyUs.lead}
            </Text>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-12 lg:gap-x-16">
          <Reveal y={16} delay={0.1}>
            <Image
              src="/12_field_development.webp"
              alt="Isometric diagram of an integrated field: a well pad feeds a gathering line into a central processing facility, which exports by pipeline"
              width={DIAGRAM_WIDTH}
              height={DIAGRAM_HEIGHT}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full"
            />
            <ol className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {DIAGRAM_STAGES.map((stage, index) => (
                <li key={stage} className="flex items-center gap-1.5 text-small text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="grid size-4 shrink-0 place-items-center rounded-full bg-accent-graphic text-[0.625rem] font-semibold tabular-nums text-deep"
                  >
                    {index + 1}
                  </span>
                  {stage}
                </li>
              ))}
            </ol>
          </Reveal>

          <ol className="divide-y divide-border border-t border-border lg:mt-2">
            {whyUs.points.map((point, index) => (
              <Reveal key={point.title} as="li" delay={0.16 + index * 0.05} className="flex gap-4 py-5 sm:py-6">
                <span
                  aria-hidden="true"
                  className="shrink-0 pt-1 font-serif text-small text-accent tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <Heading level={3} size="h4">
                    {point.title}
                  </Heading>
                  <Text variant="small" muted className="mt-2 max-w-[42ch]">
                    {point.text}
                  </Text>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
