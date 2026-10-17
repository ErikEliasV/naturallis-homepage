"use client";

import { useEffect, useRef } from "react";

import { DURATION, EASE } from "@/constants/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

type MenuToggleProps = {
  open: boolean;
  controls: string;
  onToggle: () => void;
  className?: string;
};

/** Hamburger button that morphs into a close icon. */
export function MenuToggle({ open, controls, onToggle, className }: MenuToggleProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (wasOpen.current && !open) ref.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useGSAP(
    () => {
      const [top, bottom] = gsap.utils.toArray<HTMLElement>("[data-line]");
      const vars = { duration: DURATION.interaction, ease: EASE.out };
      gsap.to(top, { y: open ? 0 : "-0.25em", rotate: open ? 45 : 0, ...vars });
      gsap.to(bottom, { y: open ? 0 : "0.25em", rotate: open ? -45 : 0, ...vars });
    },
    { dependencies: [open], scope: ref },
  );

  return (
    <button
      ref={ref}
      type="button"
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className={cn(
        "relative inline-flex size-icon-button shrink-0 items-center justify-center rounded-icon bg-forest text-[1rem] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      <span data-line className="absolute h-0.5 w-[45%] rounded-pill bg-current" />
      <span data-line className="absolute h-0.5 w-[45%] rounded-pill bg-current" />
    </button>
  );
}
