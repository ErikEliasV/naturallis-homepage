"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Runs Lenis and ScrollTrigger on a single loop: the GSAP ticker drives
 * `lenis.raf`, and every Lenis scroll event updates ScrollTrigger.
 */
export function GsapLenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const unsubscribe = lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      unsubscribe();
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}
