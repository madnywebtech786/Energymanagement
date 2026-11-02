import { ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cx } from "@/lib/cx";

// One row in the grouped services list: an optional tabular index number
// (continuous across the groups that use one, not restarted per group,
// passed in from the parent — the client's explicit choice is that
// "Subsurface & reservoir" shows no number at all, while the other two
// groups count 1-6 between them), the service name and its short
// index-only description. Reuses the tabular-numeral idiom ServicesDropdown
// already uses for its own numbered list (same muted colour), scaled up for
// a denser row that also carries a description line, not just a name. With
// no `number`, the number column is dropped entirely (not rendered empty),
// so the name/description start flush left rather than leaving a blank
// gutter where a numeral would otherwise sit.
export function ServiceIndexRow({ service, number }) {
  return (
    <a
      href={`/services/${service.slug}`}
      className={cx(
        "group/row grid gap-4 py-5 transition-colors duration-(--duration-fast) sm:gap-5 sm:py-6",
        number ? "grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr]" : "grid-cols-1",
      )}
    >
      {number && (
        <span className="pt-0.5 font-serif text-lead tabular-nums text-accent-graphic">
          {number}
        </span>
      )}

      <div>
        <Heading level={3} size="h4" className="relative inline-block w-fit">
          {service.name}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-(--duration-base) ease-out-expo group-hover/row:scale-x-100"
          />
        </Heading>
        <Text variant="small" muted className="mt-2 max-w-[62ch]">
          {service.indexDescription}
        </Text>
        <span className="mt-3 flex items-center gap-1.5 text-small font-medium text-accent opacity-0 transition-opacity duration-(--duration-fast) group-hover/row:opacity-100 group-focus-visible/row:opacity-100">
          View detail
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-3.5 transition-transform duration-(--duration-base) ease-out-expo group-hover/row:translate-x-0.5"
          />
        </span>
      </div>
    </a>
  );
}
