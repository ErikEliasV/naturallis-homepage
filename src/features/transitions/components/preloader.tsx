"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

import { Logo } from "@/components/layout/logo";
import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { SITE } from "@/constants/site";
import { gsap, useGSAP } from "@/lib/gsap";

import { PRELOADER_DONE_EVENT, setPageReady } from "../page-ready";

/** Minimum time (s) the counter takes, so the intro never flashes by. */
const COUNT_DURATION = 1.4;

/** Intro overlay shown on every full page load; lifts to uncover the first screen. */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (!doneRef.current) lenis.stop();
  }, [lenis]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const finish = () => {
        doneRef.current = true;
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
      };

      window.scrollTo(0, 0);

      if (window.matchMedia(MEDIA_QUERY.reducedMotion).matches) {
        gsap.to(root, {
          autoAlpha: 0,
          duration: DURATION.interaction,
          ease: EASE.out,
          onStart: () => setPageReady(true),
          onComplete: finish,
        });
        return;
      }

      const counter = { value: 0 };
      const countEl = root.querySelector("[data-preloader-count]");
      const fontsReady = document.fonts.ready;

      const intro = gsap
        .timeline()
        .fromTo(
          "[data-preloader-logo]",
          { y: 0, yPercent: 100 },
          { yPercent: 0, duration: DURATION.enterLong, ease: EASE.expo },
        )
        .to(
          counter,
          {
            value: 100,
            duration: COUNT_DURATION,
            ease: EASE.inOut,
            onUpdate: () => {
              if (countEl) countEl.textContent = String(Math.round(counter.value));
            },
          },
          0,
        )
        .to("[data-preloader-bar]", { scaleX: 1, duration: COUNT_DURATION, ease: EASE.inOut }, 0);

      const outro = gsap
        .timeline({ paused: true, onComplete: finish })
        .to("[data-preloader-logo]", {
          yPercent: -100,
          duration: DURATION.enterShort,
          ease: EASE.out,
        })
        .to(
          "[data-preloader-meta]",
          { autoAlpha: 0, duration: DURATION.interaction, ease: EASE.out },
          0,
        )
        .to(root, {
          yPercent: -100,
          duration: DURATION.enterLong,
          ease: EASE.inOut,
          onStart: () => setPageReady(true),
        });

      let cancelled = false;
      void Promise.all([intro.then(), fontsReady]).then(() => {
        if (!cancelled) outro.play();
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const onDone = () => lenis?.start();
    window.addEventListener(PRELOADER_DONE_EVENT, onDone);
    return () => window.removeEventListener(PRELOADER_DONE_EVENT, onDone);
  }, [lenis]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-100 flex items-center justify-center bg-forest text-white noscript:hidden"
    >
      <div className="overflow-hidden">
        <div
          data-preloader-logo
          className="w-[min(60vw,32rem)]"
          style={{ transform: "translateY(100%)" }}
        >
          <Logo tone="light" preload />
        </div>
      </div>

      <div
        data-preloader-meta
        className="absolute inset-x-gutter bottom-section-sm flex items-end justify-between gap-8"
      >
        <p className="max-w-[24ch] text-body-lg">{SITE.tagline}</p>
        <p className="font-display text-display-md tabular-nums">
          <span data-preloader-count>0</span>%
        </p>
      </div>

      <div
        data-preloader-bar
        className="absolute inset-x-0 bottom-0 h-1 origin-left bg-lime"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
