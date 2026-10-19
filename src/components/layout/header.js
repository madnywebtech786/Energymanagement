"use client";

import { Suspense, useRef } from "react";
import { Logo } from "@/components/shared/logo";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/navigation/nav-link";
import { ServicesDropdown } from "@/components/navigation/services-dropdown";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { useHeaderHeight } from "@/hooks/use-header-height";

const CONTACT = { label: "Contact", href: "/contact" };

// Fixed header, always visible and always a solid light surface (not
// transparent over the hero, and not hidden on scroll down either — both
// tried earlier, both reverted: a transparent bar read safely only
// against the hero's lightest photo, and a hide-on-scroll-down header
// disappeared when the user wanted it to always stay put). `usePathname`
// (inside NavLink and the two menus) needs a Suspense boundary per the
// plan's Cache Components rules, supplied here once for the whole header
// rather than in each leaf.
export function Header() {
  const headerRef = useRef(null);
  useHeaderHeight(headerRef);

  return (
    <Suspense fallback={null}>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-header border-b border-border bg-surface"
      >
        <div className="flex items-center justify-between px-gutter py-4">
          <Link href="/" variant="bare" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {site.nav
              .filter((item) => item.href !== CONTACT.href)
              .map((item) =>
                item.href === "/services" ? (
                  <ServicesDropdown key={item.href} label={item.label} href={item.href} items={services.items} />
                ) : (
                  <NavLink key={item.href} href={item.href}>
                    {item.label}
                  </NavLink>
                ),
              )}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Button href={CONTACT.href} size="md">
              {CONTACT.label}
            </Button>
          </div>

          <MobileMenu services={services.items} nav={site.nav} contact={CONTACT} />
        </div>
      </header>
    </Suspense>
  );
}
