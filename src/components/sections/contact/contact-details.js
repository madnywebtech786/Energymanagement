import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/animations/reveal";

// The three direct details as a divided list (label over value), the same
// pattern WhyUsPanel uses for its five qualities and GuaranteeSection uses
// for its proof points — reused here rather than invented as a new card,
// since this is label/value content, not a sequence and not a feature set.
export function ContactDetails({ details, className }) {
  const rows = [details.email, details.phone, details.office];

  return (
    <ul className={className ?? "divide-y divide-border"}>
      {rows.map((row, index) => (
        <Reveal key={row.label} as="li" delay={index * 0.06} className="py-5 first:pt-0 sm:py-6 sm:first:pt-0">
          <Text variant="label" muted>
            {row.label}
          </Text>
          {row.href ? (
            <Link href={row.href} variant="quiet" className="mt-2 block text-h4 font-medium text-foreground">
              {row.value}
            </Link>
          ) : (
            <Text variant="body" className="mt-2 text-h4 font-medium">
              {row.value}
            </Text>
          )}
        </Reveal>
      ))}
    </ul>
  );
}
