import { cx } from "@/lib/cx";

// A small crosshair, like the registration marks on a drawing sheet.
const MARK =
  "relative size-2.5 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-accent-graphic after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-accent-graphic";

// Teal text needs a plain paper or surface behind it. Over a photograph, even
// under the veil, teal falls below 4.5:1, so use tone="ink" there.
const TONES = {
  accent: "text-accent",
  ink: "text-foreground",
};

// The label that opens a section: a mark, an optional index, the label and a
// hairline that runs to the edge of the column.
export function Eyebrow({ index, rule = true, tone = "accent", className, children }) {
  return (
    <p className={cx("flex items-center gap-3 text-label uppercase", TONES[tone], className)}>
      <span aria-hidden="true" className={MARK} />
      {index && <span className="tabular-nums text-muted-foreground">{index}</span>}
      <span>{children}</span>
      {rule && <span aria-hidden="true" className="h-px flex-1 bg-border" />}
    </p>
  );
}
