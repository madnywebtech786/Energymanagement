"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";
import { DURATION, EASE } from "@/lib/motion";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

// The burger trigger plus the right-to-left drawer it opens. Services sits
// in the link list as its own accordion item, open state local to the
// drawer so it never fights the desktop hover panel.
//
// The drawer is transient UI like the desktop dropdown (see the comment in
// services-dropdown.js): it force-closes on pathname change, restores
// background scroll and interaction on close, and is removed from the tab
// order with `inert` while shut rather than only hidden visually.
export function MobileMenu({ services, nav, contact }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef(null);
  const titleId = useId();
  const servicesPanelId = useId();

  const close = () => setOpen(false);

  useLayoutEffect(() => {
    return () => setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  useFocusTrap(panelRef, open, close);
  useBodyScrollLock(open);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="grid size-11 shrink-0 place-items-center text-foreground lg:hidden"
      >
        <Menu aria-hidden="true" strokeWidth={1.5} className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              aria-hidden="true"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.outSoft }}
              className="fixed inset-0 z-menu bg-foreground/40 backdrop-blur-xs lg:hidden"
            />

            <m.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: DURATION.base, ease: EASE.out }}
              className="fixed inset-y-0 right-0 z-menu flex w-[min(22rem,88vw)] flex-col bg-surface lg:hidden"
            >
              <div className="flex items-center justify-between px-gutter py-6">
                <span id={titleId} className="text-label uppercase text-muted-foreground">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="grid size-11 shrink-0 place-items-center text-foreground"
                >
                  <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>

              <nav aria-label="Primary" className="flex-1 overflow-y-auto px-gutter pb-8">
                <ul className="flex flex-col divide-y divide-border">
                  {nav
                    .filter((item) => item.href !== contact.href)
                    .map((item) =>
                      item.href === "/services" ? (
                        <li key={item.href}>
                          <button
                            type="button"
                            aria-expanded={servicesOpen}
                            aria-controls={servicesPanelId}
                            onClick={() => setServicesOpen((value) => !value)}
                            className="flex w-full items-center justify-between py-4 text-left text-h4"
                          >
                            {item.label}
                            <ChevronDown
                              aria-hidden="true"
                              strokeWidth={1.5}
                              className={cx(
                                "size-5 shrink-0 text-muted-foreground transition-transform duration-(--duration-base) ease-out-quart",
                                servicesOpen && "rotate-180",
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {servicesOpen && (
                              <m.div
                                id={servicesPanelId}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: DURATION.base, ease: EASE.outSoft }}
                                className="overflow-hidden"
                              >
                                <ul className="flex flex-col gap-1 pb-4">
                                  {services.map((service) => (
                                    <li key={service.slug}>
                                      <NextLink
                                        href={`/services/${service.slug}`}
                                        onClick={close}
                                        className="flex items-center gap-3 py-2 text-small text-muted-foreground transition-colors duration-(--duration-fast) hover:text-accent"
                                      >
                                        <span aria-hidden="true" className="h-px w-3 shrink-0 bg-accent-graphic" />
                                        {service.name}
                                      </NextLink>
                                    </li>
                                  ))}
                                  <li>
                                    <NextLink
                                      href="/services"
                                      onClick={close}
                                      className="mt-1 inline-block py-2 text-small font-medium text-accent"
                                    >
                                      View all services →
                                    </NextLink>
                                  </li>
                                </ul>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </li>
                      ) : (
                        <li key={item.href}>
                          <NextLink href={item.href} onClick={close} className="block py-4 text-h4">
                            {item.label}
                          </NextLink>
                        </li>
                      ),
                    )}
                </ul>
              </nav>

              <div className="border-t border-border px-gutter py-6">
                <Button href={contact.href} className="w-full justify-center" onClick={close}>
                  {contact.label}
                </Button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
