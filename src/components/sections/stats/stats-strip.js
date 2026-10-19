import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/animations/reveal";
import { CountUp } from "@/components/animations/count-up";
import { cx } from "@/lib/cx";

// The four hero stats, moved under the slider (see docs/redesign-plan.md,
// "reference: hero slides"). Only the first stat is a number ("35+"): the
// other three are short phrases ("End-to-end", "Multi-discipline", "Global"),
// so CountUp only wraps stats[0] and the rest render as plain text.
//
// Redesigned from a flat, divider-less grid (the weakest piece of visual
// craft on the page next to everything else) into cells on the site's own
// hairline-and-tabular-numeral language: a thin index mark per stat, a
// rule between every cell (computed per-position below, not fought for
// with nth-child selectors), each cell's value given real serif weight
// instead of sitting at the same visual register as its own label.
//
// Grid is 2 columns under `lg`, 4 columns from `lg` up. A cell gets a
// right rule unless it's the last column in its row, and a bottom rule
// unless it's the last row — computed from `index` against the active
// column count at each breakpoint, since that's genuinely two different
// grids, not one grid reflowing.
export function StatsStrip({ stats }) {
  const count = stats.length;

  return (
    <section className="border-t border-border">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const isLastColMobile = index % 2 === 1;
            const isLastRowMobile = index >= count - (count % 2 === 0 ? 2 : 1);
            const isLastColDesktop = index === count - 1;

            return (
              <Reveal
                key={stat.label}
                as="div"
                delay={index * 0.06}
                className={cx(
                  "py-8 pr-6 lg:py-10 lg:pr-8",
                  !isLastColMobile && "border-r border-border pr-6",
                  !isLastRowMobile && "border-b border-border",
                  isLastColMobile && "pl-6",
                  "lg:border-b-0 lg:pl-0",
                  !isLastColDesktop && "lg:border-r lg:pr-8",
                  index > 0 && "lg:border-l lg:pl-8",
                )}
              >
                <span className="text-label tabular-nums text-accent-graphic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <dd className="mt-3 font-serif text-h3 text-foreground">
                  {index === 0 ? <CountUp to={35} suffix="+" /> : stat.value}
                </dd>
                <dt className="mt-2 max-w-[22ch] text-small text-muted-foreground">{stat.label}</dt>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
