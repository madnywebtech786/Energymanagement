import { cx } from "@/lib/cx";
import { typeset } from "@/lib/typeset";

const VARIANTS = {
  body: { tag: "p", classes: "text-body" },
  lead: { tag: "p", classes: "font-serif text-lead" },
  reading: { tag: "p", classes: "font-serif text-reading" },
  small: { tag: "p", classes: "text-small" },
  label: { tag: "span", classes: "text-label uppercase" },
};

export function Text({ variant = "body", as, muted = false, className, children, ...props }) {
  const { tag, classes } = VARIANTS[variant];
  const Tag = as ?? tag;
  return (
    <Tag className={cx(classes, muted && "text-muted-foreground", className)} {...props}>
      {typeset(children)}
    </Tag>
  );
}
