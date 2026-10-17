"use client";

import Image from "next/image";
import { type ReactNode, useId, useRef, useState } from "react";

import { DURATION, EASE } from "@/constants/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

type AccordionProps = {
  title: ReactNode;
  defaultOpen?: boolean;
  headingLevel?: "h2" | "h3" | "h4";
  /** `plus` (collection filters) or `chevron` (product details). */
  icon?: "plus" | "chevron";
  className?: string;
  /** Classes for the trigger row (typography, padding). */
  triggerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
};

/** Disclosure section with an animated height and a plus/minus icon (Figma "Details"). */
export function Accordion({
  title,
  defaultOpen = false,
  headingLevel = "h3",
  icon = "plus",
  className,
  triggerClassName,
  contentClassName,
  children,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const contentId = useId();
  const Heading = headingLevel;

  useGSAP(
    () => {
      const content = rootRef.current?.querySelector<HTMLElement>("[data-accordion-content]");
      const vertical = rootRef.current?.querySelector<HTMLElement>("[data-accordion-vertical]");
      const chevron = rootRef.current?.querySelector<HTMLElement>("[data-accordion-chevron]");
      if (!content) return;
      const duration = firstRender.current ? 0 : DURATION.interactionLong;
      firstRender.current = false;
      gsap.to(content, { height: open ? "auto" : 0, duration, ease: EASE.inOut });
      if (vertical) {
        gsap.to(vertical, {
          rotate: open ? 90 : 0,
          opacity: open ? 0 : 1,
          duration,
          ease: EASE.out,
        });
      }
      if (chevron) gsap.to(chevron, { rotate: open ? 180 : 0, duration, ease: EASE.out });
    },
    { dependencies: [open], scope: rootRef },
  );

  return (
    <div ref={rootRef} className={cn("border-b border-black/10", className)}>
      <Heading>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "flex w-full items-center justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
            triggerClassName,
          )}
        >
          {title}
          {icon === "plus" ? (
            <span aria-hidden className="relative flex size-4 shrink-0 items-center justify-center">
              <Image
                src="/icons/plus-horizontal.svg"
                alt=""
                width={13}
                height={2}
                className="w-[69%]"
              />
              <span
                data-accordion-vertical
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src="/icons/plus-vertical.svg"
                  alt=""
                  width={2}
                  height={13}
                  className="h-[69%] w-auto"
                />
              </span>
            </span>
          ) : (
            <span
              aria-hidden
              data-accordion-chevron
              className="flex size-4 shrink-0 items-center justify-center"
            >
              <Image
                src="/icons/pdp/chevron-down.svg"
                alt=""
                width={12}
                height={7}
                className="w-[72%]"
              />
            </span>
          )}
        </button>
      </Heading>
      <div
        id={contentId}
        data-accordion-content
        inert={!open}
        className={cn("overflow-hidden", !defaultOpen && "h-0")}
      >
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
