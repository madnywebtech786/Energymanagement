import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import { Link } from "./link";

// A rectangle with a separate arrow cell, like a cell in a drawing's title
// block. On hover or focus the whole button fills with teal and the arrow
// moves; the cell's own divider stays visible as an internal seam.
const BASE =
  "group/button relative inline-flex select-none items-stretch overflow-hidden rounded-sm border text-nav transition-[color,background-color,border-color,opacity] duration-(--duration-base) ease-out-quart active:opacity-85 disabled:pointer-events-none disabled:opacity-50";

const SIZES = {
  md: { root: "min-h-12", label: "px-5", cell: "min-w-12" },
  lg: { root: "min-h-14", label: "px-7", cell: "min-w-14" },
};

const VARIANTS = {
  // Primary's hover text stays dark (not white): white on the teal hover
  // fill (#14b8a6) measures 2.49:1, below the site's 4.5:1 floor. The
  // current dark text measures 7.0:1. Confirmed with the user as the one
  // deliberate exception rather than a missed case.
  primary: {
    root: "border-primary bg-primary text-primary-foreground hover:border-accent-graphic hover:bg-accent-graphic hover:text-deep focus-visible:border-accent-graphic focus-visible:bg-accent-graphic focus-visible:text-deep",
    cell: "border-primary-foreground/25 group-hover/button:border-deep/20 group-focus-visible/button:border-deep/20",
  },
  secondary: {
    root: "border-border-strong text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground",
    cell: "border-border-strong group-hover/button:border-primary-foreground/25 group-focus-visible/button:border-primary-foreground/25",
  },
};

// With an href it renders a link, otherwise a <button>. Pass `icon={null}`
// for no arrow cell, or another lucide icon to replace the arrow.
export function Button({
  href,
  variant = "primary",
  size = "md",
  icon: Icon = ArrowRight,
  className,
  children,
  ...props
}) {
  const look = VARIANTS[variant];
  const scale = SIZES[size];
  const classes = cx(BASE, scale.root, look.root, className);

  const content = (
    <>
      <span className={cx("flex items-center", scale.label)}>{children}</span>
      {Icon && (
        <span
          aria-hidden="true"
          className={cx(
            "grid place-items-center border-l transition-colors duration-(--duration-base) ease-out-quart",
            scale.cell,
            look.cell,
          )}
        >
          <Icon
            strokeWidth={1.5}
            className="size-4 transition-transform duration-(--duration-base) ease-out-expo group-hover/button:translate-x-0.5"
          />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} variant="bare" className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
