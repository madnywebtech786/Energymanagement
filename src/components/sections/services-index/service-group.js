import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { ServiceIndexRow } from "./service-index-row";

// One category block on /services: a left-aligned heading/lead column
// beside a right-column 2-up grid of services, matching the client's
// reference image exactly — the same asymmetric split HomeFaq already uses
// for a label-column-beside-a-list layout, extended here to a 2-column
// grid on the right instead of a single list, since the reference shows
// pairs of services side by side within each group. A group with only one
// service (Management) still renders in the same 2-column grid track, so
// its row doesn't stretch to the full row width the other groups establish.
export function ServiceGroup({ group }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <div>
        <Reveal>
          <Heading level={2} size="h3" className="max-w-[18ch]">
            <TextReveal>{group.heading}</TextReveal>
          </Heading>
        </Reveal>
        {group.lead && (
          <Reveal delay={0.08}>
            <Text variant="small" muted className="mt-3 max-w-[32ch]">
              {group.lead}
            </Text>
          </Reveal>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-x-10 divide-y divide-border border-t border-border sm:grid-cols-2 sm:gap-x-12 sm:divide-y-0 sm:border-t-0">
        {group.items.map((item, index) => (
          <Reveal key={item.slug} as="li" y={16} delay={0.04 + index * 0.05}>
            <ServiceIndexRow
              service={item}
              number={item.number != null ? String(item.number).padStart(2, "0") : undefined}
            />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
