import NextLink from "next/link";
import { cx } from "@/lib/cx";

// `underline` rests as a hairline; on hover a teal line sweeps across it.
// `quiet` has no underline. `bare` adds no styles (Button uses it).
const VARIANTS = {
  underline:
    "relative inline-block border-b border-current/35 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-(--duration-base) after:ease-out-expo hover:after:scale-x-100 focus-visible:after:scale-x-100 active:after:scale-x-100",
  quiet: "transition-colors duration-(--duration-fast) hover:text-accent active:text-accent",
  bare: "",
};

const isInternal = (href) => href.startsWith("/") || href.startsWith("#");
const isWeb = (href) => /^https?:/.test(href);

// Internal links use next/link; mailto, tel and external links are plain
// anchors, and external web links open in a new tab.
export function Link({ href, variant = "underline", className, children, ...props }) {
  const classes = cx(VARIANTS[variant], className);

  if (isInternal(href)) {
    return (
      <NextLink href={href} className={classes} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(isWeb(href) && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      {children}
    </a>
  );
}
