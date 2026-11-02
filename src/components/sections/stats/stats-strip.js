import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/animations/reveal";
import { CountUp } from "@/components/animations/count-up";

// Relocated from directly under the hero slider to a quiet transitional
// band between ApproachStory (tone="surface") and WhyUsPanel (tone="paper")
// — it now reads as a lead-in to the "why work with us" case right after it,
// rather than competing with the hero for attention before a visitor has
// seen anything else. `tone="paper"` matches WhyUsPanel so the two feel
// like one continuous beat, not two separate bands.
//
// Redesigned from four identical cells (each forced into the same large
// serif "value" treatment regardless of whether it held a real number) into
// an honest split: only `stats[0]` ("35+ years") is an actual metric, so it
// stands alone with real visual weight (CountUp, serif, large), while the
// other three ("End-to-end", "Multi-discipline", "Global") are short
// capability phrases, not numbers — they now read as a compact divided
// list beside the figure instead of three more oversized "stat" boxes
// pretending to be numbers they aren't.
export function StatsStrip({ stats }) {
  const [headline, ...facts] = stats;

  return (
    <Section tone="paper" ruled>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <span className="font-serif text-[clamp(3.5rem,6vw,5rem)] leading-none text-foreground">
              <CountUp to={35} suffix="+" />
            </span>
            <p className="mt-3 max-w-[26ch] text-small text-muted-foreground">{headline.label}</p>
          </Reveal>

          <dl className="grid grid-cols-1 gap-x-10 gap-y-6 border-t border-border pt-8 sm:grid-cols-3 sm:gap-y-0 sm:border-t-0 sm:pt-0 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            {facts.map((fact, index) => (
              <Reveal
                key={fact.label}
                as="div"
                delay={0.08 + index * 0.06}
                className="sm:border-l sm:border-border sm:first:border-l-0 sm:pl-8 sm:first:pl-0"
              >
                <dt className="font-serif text-h4 text-foreground">{fact.value}</dt>
                <dd className="mt-1.5 max-w-[22ch] text-small text-muted-foreground">{fact.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
