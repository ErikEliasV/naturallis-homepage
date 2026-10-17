"use client";

import "lenis/dist/lenis.css";

import { type LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";

import { GsapLenisSync } from "./gsap-lenis-sync";

const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
  lerp: 0.1,
  anchors: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
};

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/** Global Lenis instance, driven by the GSAP ticker (see GsapLenisSync). */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
