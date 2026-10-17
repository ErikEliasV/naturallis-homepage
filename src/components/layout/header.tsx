"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import {
  ACCOUNT_LINKS,
  FORMULA_CTA,
  HEADER_COMPACT_TOP,
  HEADER_HIDE_AFTER,
  HEADER_SCROLLED_AFTER,
  NAV_LINKS,
} from "@/constants/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

import { Container } from "./container";
import { Logo } from "./logo";
import { MenuToggle } from "./menu-toggle";
import { MOBILE_MENU_ID, MobileMenu } from "./mobile-menu";

export type HeaderTheme = "light" | "dark";

/**
 * Fixed site header.
 * - Theme follows the section under it: sections declare `data-header-theme="dark"`.
 * - Once the page scrolls, it compacts and gains a translucent bar.
 * - Hides while scrolling down and comes back on scroll up.
 */
export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      let triggers: ScrollTrigger[] = [];
      const applyTheme = () => {
        const active = triggers.find((trigger) => trigger.isActive)?.trigger;
        const theme = active instanceof HTMLElement ? active.dataset.headerTheme : undefined;
        header.dataset.theme = theme === "dark" ? "dark" : "light";
      };

      const probe = () => header.offsetHeight / 2;
      triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]")).map(
        (section) =>
          ScrollTrigger.create({
            trigger: section,
            start: () => `top top+=${probe()}`,
            end: () => `bottom top+=${probe()}`,
            onToggle: applyTheme,
          }),
      );
      applyTheme();

      const inner = header.querySelector<HTMLElement>("[data-header-inner]");
      const compactY = () =>
        inner ? -(parseFloat(getComputedStyle(inner).paddingTop) - HEADER_COMPACT_TOP) : 0;

      let scrolled = false;
      let hidden = false;
      let moves = false;
      const sync = (scrollY: number, direction: number) => {
        const nextScrolled = scrollY > HEADER_SCROLLED_AFTER;
        const nextHidden =
          moves && header.dataset.menu !== "open" && scrollY > HEADER_HIDE_AFTER && direction === 1;

        header.dataset.scrolled = String(nextScrolled);
        if (nextScrolled !== scrolled) {
          scrolled = nextScrolled;
          if (moves) {
            gsap.to(header, {
              y: scrolled ? compactY() : 0,
              duration: DURATION.interactionLong,
              ease: EASE.out,
              overwrite: "auto",
            });
          }
        }

        if (nextHidden !== hidden) {
          hidden = nextHidden;
          gsap.to(header, {
            yPercent: hidden ? -100 : 0,
            duration: DURATION.interactionLong,
            ease: EASE.out,
            overwrite: "auto",
          });
        }
      };

      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        moves = true;
        return () => {
          moves = false;
        };
      });

      const scrollTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => sync(self.scroll(), self.direction),
      });
      sync(scrollTrigger.scroll(), -1);

      return () => mm.revert();
    },
    { dependencies: [pathname], scope: headerRef, revertOnUpdate: true },
  );

  return (
    <>
      <header
        ref={headerRef}
        data-theme={isHome ? "dark" : "light"}
        data-menu={menuOpen ? "open" : "closed"}
        data-scrolled="false"
        className="group/header fixed inset-x-0 top-0 z-50"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-white/85 opacity-0 backdrop-blur-glass transition-[opacity,background-color] duration-300 ease-power3-out group-data-[scrolled=true]/header:opacity-100 group-data-[theme=dark]/header:bg-forest/85"
        />
        <Container
          data-header-inner
          className={cn(
            "flex items-center justify-between gap-4 pb-4",
            isHome ? "pt-header-offset-home" : "pt-header-offset",
          )}
        >
          <Link
            href="/"
            aria-label="Naturallis, página inicial"
            className="relative block w-logo shrink-0"
          >
            <Logo
              tone="dark"
              preload
              className="transition-opacity duration-300 ease-power3-out group-data-[menu=open]/header:opacity-0 group-data-[theme=dark]/header:opacity-0"
            />
            <Logo
              tone="light"
              preload
              className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-power3-out group-data-[menu=open]/header:opacity-100 group-data-[theme=dark]/header:opacity-100"
            />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex h-nav-pill items-center gap-nav-gap rounded-pill bg-glass px-nav-pad text-nav font-medium text-ink-soft backdrop-blur-glass transition-colors duration-300 ease-power3-out group-data-[theme=dark]/header:text-white">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="whitespace-nowrap transition-opacity duration-300 ease-power3-out hover:opacity-60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-header-actions">
            <div className="hidden lg:flex">
              <Button href={FORMULA_CTA.href} variant="mist" size="md" className="uppercase">
                {FORMULA_CTA.label}
              </Button>
            </div>
            <IconButton href={ACCOUNT_LINKS.cart.href} label={ACCOUNT_LINKS.cart.label}>
              <Image src="/icons/cart.svg" alt="" width={34} height={32} className="w-[60%]" />
            </IconButton>
            <div className="hidden lg:flex">
              <IconButton href={ACCOUNT_LINKS.account.href} label={ACCOUNT_LINKS.account.label}>
                <Image src="/icons/user.svg" alt="" width={38} height={38} className="w-[72%]" />
              </IconButton>
            </div>
            <div className="flex lg:hidden">
              <MenuToggle open={menuOpen} controls={MOBILE_MENU_ID} onToggle={toggleMenu} />
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} pathname={pathname} onClose={closeMenu} />
    </>
  );
}
