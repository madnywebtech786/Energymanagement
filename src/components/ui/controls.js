import { cx } from "@/lib/cx";

// The edge uses --color-border-strong so the control meets the 3:1 contrast
// that WCAG asks of a form field's boundary.
const CONTROL =
  "w-full rounded-sm border border-border-strong bg-surface px-4 py-3 text-body text-foreground transition-colors duration-(--duration-fast) placeholder:text-muted-foreground hover:border-foreground focus-visible:border-foreground aria-[invalid=true]:border-danger disabled:cursor-not-allowed disabled:opacity-55";

export function Input({ className, ...props }) {
  return <input className={cx(CONTROL, "min-h-12", className)} {...props} />;
}

export function Textarea({ rows = 5, className, ...props }) {
  return <textarea rows={rows} className={cx(CONTROL, "min-h-32 resize-y", className)} {...props} />;
}
