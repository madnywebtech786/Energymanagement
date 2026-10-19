"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { useScrollActiveIndex } from "@/hooks/use-scroll-active-index";
import { cx } from "@/lib/cx";

// The six lifecycle stages, Assess through Sustain. Mobile: one vertical
// column, each stage's number circle linked to the next by a hairline.
// Desktop (`lg` and up): a classic alternating timeline — a central spine
// with each stage's content on alternating sides (odd stages left, even
// stages right), connected to its own node on the spine. This is a
// simplified, self-contained preview of the idea, not the full page-wide
// well-path rail the plan's /design sheet 07 specimen sketches (DrawPath, a
// depth-chart rail beside the content, starting below the hero) — that rail
// is Phase 2 infrastructure and isn't built yet.
//
// The stage whose top edge has most recently crossed a band near the top of
// the viewport is "active" (see useScrollActiveIndex): its node fills teal
// and the spine segment above it fills in too, so stage 0 activates as soon
// as the timeline itself scrolls into view (not after it reaches the
// screen's centre), and each later stage takes over the moment it, in
// turn, is reached — one at a time, in order.
export function ApproachStory({ approach }) {
  // Two separate instances: the mobile and desktop lists are both present
  // in the DOM at once (one hidden via CSS, per breakpoint), so sharing one
  // hook instance would mean both layouts' refs for the same index collide
  // in its node map — whichever registered last would silently win, and the
  // hidden layout's zero-size, display:none nodes would be the ones
  // actually observed on screens where that layout isn't even showing.
  const [activeIndexMobile, registerStepRefMobile] = useScrollActiveIndex(approach.stages.length);
  const [activeIndexDesktop, registerStepRefDesktop] = useScrollActiveIndex(approach.stages.length);

  return (
    <Section id="approach" tone="surface">
      <Container>
        <div className="max-w-[48ch]">
          <Reveal>
            <Eyebrow>{approach.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading level={2} className="mt-5">
              {approach.heading}
            </Heading>
          </Reveal>
          <Reveal delay={0.14}>
            <Text variant="lead" muted className="mt-5">
              {approach.lead}
            </Text>
          </Reveal>
        </div>

        {/* Mobile and tablet (below lg): single column, content always to
            the right of the spine. */}
        <ol className="mt-16 flex flex-col sm:mt-20 lg:hidden">
          {approach.stages.map((stage, index) => (
            <TimelineStep
              key={stage.name}
              stage={stage}
              index={index}
              total={approach.stages.length}
              active={index === activeIndexMobile}
              lineDone={index <= activeIndexMobile}
              ref={registerStepRefMobile(index)}
            />
          ))}
        </ol>

        {/* Desktop (lg and up): the spine runs down the centre; content
            alternates left/right by stage index. Each row is a 2-column
            grid with the node centred on the shared middle line, so left
            and right rows' nodes land on the same spine regardless of which
            side their content sits — content columns are empty on the
            unused side rather than the row changing width. */}
        <ol className="mt-20 hidden lg:flex lg:flex-col">
          {approach.stages.map((stage, index) => (
            <TimelineStepDesktop
              key={stage.name}
              stage={stage}
              index={index}
              total={approach.stages.length}
              active={index === activeIndexDesktop}
              lineDone={index <= activeIndexDesktop}
              ref={registerStepRefDesktop(index)}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function TimelineStep({ stage, index, total, active, lineDone, ref }) {
  const isLast = index === total - 1;
  return (
    <li ref={ref} data-index={index} className="flex min-h-[25vh] gap-6 sm:gap-10">
      <div className="flex flex-col items-center">
        <StepNode index={index} active={active} />
        {!isLast && <StepLine done={lineDone} />}
      </div>
      <Reveal delay={index * 0.04} className={cx("min-w-0 flex-1", isLast ? "pb-2" : "pb-12 sm:pb-16")}>
        <Heading level={3} size="h4" className="pt-1.5 sm:pt-2">
          {stage.name}
        </Heading>
        <Text variant="small" muted className="mt-2 max-w-[42ch]">
          {stage.text}
        </Text>
      </Reveal>
    </li>
  );
}

function TimelineStepDesktop({ stage, index, total, active, lineDone, ref }) {
  const isLast = index === total - 1;
  const onRight = index % 2 === 1;
  const content = (
    <Reveal delay={index * 0.04} className={onRight ? "pl-14" : "pr-14 text-right"}>
      <Heading level={3} size="h3">
        {stage.name}
      </Heading>
      <Text variant="small" muted className={cx("mt-3 max-w-[36ch]", onRight ? "" : "ml-auto")}>
        {stage.text}
      </Text>
    </Reveal>
  );

  return (
    <li ref={ref} data-index={index} className="grid min-h-[25vh] grid-cols-[1fr_auto_1fr] items-start">
      {onRight ? <span /> : content}
      <div className="flex h-full flex-col items-center">
        <StepNode index={index} active={active} size="lg" />
        {!isLast && <StepLine done={lineDone} className="min-h-20" />}
      </div>
      {onRight ? content : <span />}
    </li>
  );
}

function StepNode({ index, active, size = "md" }) {
  return (
    <span
      className={cx(
        "flex shrink-0 items-center justify-center rounded-full border text-label tabular-nums transition-colors duration-(--duration-slow) ease-out-quart",
        size === "lg" ? "size-14" : "size-10 sm:size-12",
        active ? "border-accent-graphic bg-accent-graphic text-deep" : "border-border-strong/60 text-muted-foreground",
      )}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function StepLine({ done, className }) {
  return (
    <span aria-hidden="true" className={cx("relative mt-1 w-px flex-1 overflow-hidden bg-border", className)}>
      <span
        className={cx(
          "absolute inset-x-0 top-0 bg-accent-graphic transition-[height] duration-(--duration-slow) ease-out-quart",
          done ? "h-full" : "h-0",
        )}
      />
    </span>
  );
}
