"use client";

import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef } from "react";

import { Logo } from "@/components/layout/logo";
import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { setPageReady } from "../page-ready";

/** Safety net: uncover the page even if the route never commits. */
const COVER_TIMEOUT_MS = 6000;

function internalTarget(event: MouseEvent): URL | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
  if (!(event.target instanceof Element)) return null;

  const anchor = event.target.closest("a");
  if (!anchor || anchor.hasAttribute("download") || "noTransition" in anchor.dataset) return null;
  if (anchor.target && anchor.target !== "_self") return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;

  const samePage =
    url.pathname === window.location.pathname && url.search === window.location.search;
  return samePage ? null : url;
}

/**
 * Curtain transition between routes: covers the screen, swaps the route underneath,
 * resets the scroll and uncovers the new page. Intercepts internal link clicks.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const pendingHashRef = useRef<string | null>(null);
  const coveringRef = useRef(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const uncover = useEffectEvent(() => {
    const panel = panelRef.current;
    if (!panel || !coveringRef.current) return;
    window.clearTimeout(timeoutRef.current);

    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const reduced = window.matchMedia(MEDIA_QUERY.reducedMotion).matches;
    gsap.to(panel, {
      yPercent: -100,
      duration: reduced ? 0 : DURATION.enter,
      ease: EASE.inOut,
      onStart: () => setPageReady(true),
      onComplete: () => {
        coveringRef.current = false;
        gsap.set(panel, { visibility: "hidden" });
        lenis?.start();
        const hash = pendingHashRef.current;
        pendingHashRef.current = null;
        if (hash) lenis?.scrollTo(hash);
      },
    });
  });

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const url = internalTarget(event);
      const panel = panelRef.current;
      if (!url || !panel) return;

      event.preventDefault();
      if (coveringRef.current) return;
      coveringRef.current = true;
      pendingHashRef.current = url.hash || null;

      setPageReady(false);
      lenis?.stop();

      const reduced = window.matchMedia(MEDIA_QUERY.reducedMotion).matches;
      gsap
        .timeline()
        .set(panel, { visibility: "visible", yPercent: 100 })
        .to(panel, {
          yPercent: 0,
          duration: reduced ? 0 : DURATION.enter,
          ease: EASE.inOut,
          onComplete: () => {
            router.push(url.pathname + url.search, { scroll: false });
            timeoutRef.current = window.setTimeout(() => uncover(), COVER_TIMEOUT_MS);
          },
        });
    };

    window.addEventListener("click", onClick, { capture: true });
    return () => window.removeEventListener("click", onClick, { capture: true });
  }, [lenis, router]);

  useEffect(() => {
    if (coveringRef.current) uncover();
  }, [pathname]);

  return (
    <div
      ref={panelRef}
      aria-hidden
      className="invisible fixed inset-0 z-90 flex items-center justify-center bg-forest"
    >
      <div className="w-[min(40vw,16rem)]">
        <Logo tone="light" />
      </div>
    </div>
  );
}
