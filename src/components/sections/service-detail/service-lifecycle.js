"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/animations/reveal";
import { useScrollActiveIndex } from "@/hooks/use-scroll-active-index";
import { cx } from "@/lib/cx";

// The same timeline as the home page's ApproachStory — same scroll-driven
// behaviour (the stage whose top edge has most recently crossed a band
// near the top of the viewport fills teal, one at a time as you scroll
// through this section), same desktop alternating-spine layout, same
// mobile single-column layout — reused here deliberately, not adapted.
//
// That scroll-active highlight is a generic "progress through this list"
// indicator, though, and says nothing about which stage(s) this specific
// service actually belongs to. So a second, independent marker — a solid
// ring around the node, plus a small "This service" label — points at
// this service's own stage(s) regardless of which node the scroll
// position currently has active; the two signals read on separate visual
// channels (fill colour vs. ring) so neither one erases the other.
export function ServiceLifecycle({ stages, activeIndexes }) {
  const [activeIndexMobile, registerStepRefMobile] = useScrollActiveIndex(stages.length);
  const [activeIndexDesktop, registerStepRefDesktop] = useScrollActiveIndex(stages.length);

  return (
    <Section tone="surface">
      <Container>
        <div className="max-w-[48ch]">
          <Reveal>
            <Eyebrow>Where this fits</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading level={2} className="mt-5">
              One integrated asset lifecycle
            </Heading>
          </Reveal>
          <Reveal delay={0.14}>
            <Text variant="lead" muted className="mt-5">
              Decisions in one discipline account for their impact on the rest.{" "}
              <Link href="/approach">See the full approach</Link>
            </Text>
          </Reveal>
        </div>

        {/* Mobile and tablet (below lg): single column. */}
        <ol className="mt-16 flex flex-col sm:mt-20 lg:hidden">
          {stages.map((stage, index) => (
            <TimelineStep
              key={stage.name}
              stage={stage}
              index={index}
              total={stages.length}
              active={index === activeIndexMobile}
              lineDone={index <= activeIndexMobile}
              isService={activeIndexes.includes(index)}
              ref={registerStepRefMobile(index)}
            />
          ))}
        </ol>

        {/* Desktop (lg and up): alternating spine, same as ApproachStory. */}
        <ol className="mt-20 hidden lg:flex lg:flex-col">
          {stages.map((stage, index) => (
            <TimelineStepDesktop
              key={stage.name}
              stage={stage}
              index={index}
              total={stages.length}
              active={index === activeIndexDesktop}
              lineDone={index <= activeIndexDesktop}
              isService={activeIndexes.includes(index)}
              ref={registerStepRefDesktop(index)}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function TimelineStep({ stage, index, total, active, lineDone, isService, ref }) {
  const isLast = index === total - 1;
  return (
    <li ref={ref} data-index={index} className="flex min-h-[25vh] gap-6 sm:gap-10">
      <div className="flex flex-col items-center">
        <StepNode index={index} active={active} isService={isService} />
        {!isLast && <StepLine done={lineDone} />}
      </div>
      <Reveal delay={index * 0.04} className={cx("min-w-0 flex-1", isLast ? "pb-2" : "pb-12 sm:pb-16")}>
        {isService && <ServiceTag />}
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

function TimelineStepDesktop({ stage, index, total, active, lineDone, isService, ref }) {
  const isLast = index === total - 1;
  const onRight = index % 2 === 1;
  const content = (
    <Reveal delay={index * 0.04} className={onRight ? "pl-14" : "pr-14 text-right"}>
      {isService && <ServiceTag align={onRight ? "left" : "right"} />}
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
        <StepNode index={index} active={active} isService={isService} size="lg" />
        {!isLast && <StepLine done={lineDone} className="min-h-20" />}
      </div>
      {onRight ? content : <span />}
    </li>
  );
}

// A small label marking this as the service's own stage, independent of
// the scroll-active state — align lets it sit flush with the content's
// own text alignment on the desktop alternating layout.
function ServiceTag({ align = "left" }) {
  return (
    <p className={cx("mb-2 flex items-center gap-2 text-label uppercase text-accent", align === "right" && "justify-end")}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-graphic" />
      This service
    </p>
  );
}

function StepNode({ index, active, isService, size = "md" }) {
  return (
    <span
      className={cx(
        "flex shrink-0 items-center justify-center rounded-full border text-label tabular-nums transition-colors duration-(--duration-slow) ease-out-quart",
        size === "lg" ? "size-14" : "size-10 sm:size-12",
        active ? "border-accent-graphic bg-accent-graphic text-deep" : "border-border-strong/60 text-muted-foreground",
        isService && !active && "ring-2 ring-accent-graphic ring-offset-2 ring-offset-background",
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
