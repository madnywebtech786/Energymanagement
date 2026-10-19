"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { cx } from "@/lib/cx";

// A nav item that knows if it is the current page. `usePathname` needs a
// Suspense boundary above it (see AGENTS.md / the plan's Cache Components
// rules), so this file stays a thin client leaf and the header supplies
// the boundary.
export function NavLink({ href, className, children, ...props }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <NextLink
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cx(
        "relative text-nav font-medium transition-colors duration-(--duration-fast) hover:text-accent",
        isActive ? "text-accent" : "text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
