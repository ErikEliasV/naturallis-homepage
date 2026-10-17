"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { DURATION, EASE, MEDIA_QUERY, STAGGER } from "@/constants/motion";
import { FORMULA_CTA, NAV_LINKS } from "@/constants/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

export const MOBILE_MENU_ID = "mobile-menu";

type MobileMenuProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

/** Full-screen navigation for small viewports. Pauses smooth scroll while open. */
export function MobileMenu({ open, pathname, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const items = panel.querySelectorAll("[data-menu-item]");
      const reduced = window.matchMedia(MEDIA_QUERY.reducedMotion).matches;

      if (open) {
        gsap
          .timeline({
            onComplete: () => panel.querySelector<HTMLElement>("a")?.focus(),
          })
          .set(panel, { visibility: "visible" })
          .fromTo(
            panel,
            { yPercent: -100 },
            { yPercent: 0, duration: reduced ? 0 : DURATION.enter, ease: EASE.expo },
          )
          .fromTo(
            items,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: reduced ? 0 : DURATION.enterShort,
              ease: EASE.out,
              stagger: reduced ? 0 : STAGGER.items,
            },
            reduced ? 0 : "-=0.4",
          );
      } else {
        gsap.to(panel, {
          yPercent: -100,
          duration: reduced ? 0 : DURATION.enterShort,
          ease: EASE.inOut,
          onComplete: () => {
            gsap.set(panel, { visibility: "hidden" });
          },
        });
      }
    },
    { dependencies: [open], scope: panelRef },
  );

  return (
    <div
      ref={panelRef}
      id={MOBILE_MENU_ID}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className="invisible fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-forest px-gutter pt-[calc(var(--spacing-header-space)+1rem)] pb-section-sm text-white lg:hidden"
    >
      <nav aria-label="Menu principal">
        <ul className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={pathname === link.href ? "page" : undefined}
                data-menu-item
                className="block font-display text-display-md aria-[current=page]:text-lime"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="overflow-hidden pt-section-sm">
        <div data-menu-item>
          <Button href={FORMULA_CTA.href} variant="light" size="lg" onClick={onClose}>
            {FORMULA_CTA.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
