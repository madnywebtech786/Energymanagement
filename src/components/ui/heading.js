import { cx } from "@/lib/cx";
import { typeset } from "@/lib/typeset";

const SIZES = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

// `level` is the place in the document outline; `size` is how it looks.
export function Heading({ level = 2, size, className, children, ...props }) {
  const Tag = `h${level}`;
  return (
    <Tag className={cx(SIZES[size ?? `h${level}`], className)} {...props}>
      {typeset(children)}
    </Tag>
  );
}
