import { cx } from "@/lib/cx";

// `deep` re-themes everything inside it (see .theme-deep in globals.css).
const TONES = {
  paper: "",
  surface: "bg-surface",
  deep: "theme-deep bg-background",
};

// A full-width band with the site's vertical rhythm. Put a Container inside.
export function Section({ as: Tag = "section", tone = "paper", ruled = false, className, ...props }) {
  return (
    <Tag
      className={cx("py-section", TONES[tone], ruled && "border-t border-border", className)}
      {...props}
    />
  );
}
