import { cx } from "@/lib/cx";

const TONES = {
  surface: "border-border bg-surface",
  deep: "theme-deep border-transparent bg-background",
};

// A bordered specimen box with its label in the top-left corner.
export function Cell({ label, tone = "surface", className, children }) {
  return (
    <div className={cx("relative border p-6 pt-12", TONES[tone], className)}>
      <span className="absolute left-4 top-4 text-label uppercase text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}
