"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ACCOUNT_LINKS } from "@/constants/navigation";
import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { gsap, useGSAP } from "@/lib/gsap";

import { CART_ADDED_EVENT, type CartAddedDetail } from "../actions";

/** Seconds the confirmation stays on screen. */
const VISIBLE_FOR = 3.2;

type Notice = CartAddedDetail & { id: number };

/** Confirmation shown after adding to the cart, with a shortcut to the cart page. */
export function CartToast() {
  const [notice, setNotice] = useState<Notice | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onAdded = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail = event.detail as CartAddedDetail;
      setNotice({ ...detail, id: Date.now() });
    };
    window.addEventListener(CART_ADDED_EVENT, onAdded);
    return () => window.removeEventListener(CART_ADDED_EVENT, onAdded);
  }, []);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !notice) return;
      const reduced = window.matchMedia(MEDIA_QUERY.reducedMotion).matches;
      gsap
        .timeline()
        .fromTo(
          element,
          { autoAlpha: 0, y: reduced ? 0 : 24 },
          { autoAlpha: 1, y: 0, duration: DURATION.enterShort, ease: EASE.expo },
        )
        .to(element, {
          autoAlpha: 0,
          y: reduced ? 0 : 12,
          duration: DURATION.interactionLong,
          ease: EASE.inOut,
          delay: VISIBLE_FOR,
        });
    },
    { dependencies: [notice], scope: ref },
  );

  return (
    <div
      ref={ref}
      role="status"
      className="invisible fixed right-gutter bottom-6 z-70 flex max-w-[calc(100vw-2*var(--spacing-gutter))] items-center gap-4 rounded-tile bg-ink p-4 pr-6 font-geist text-body text-white shadow-handle"
    >
      {notice ? (
        <>
          <span aria-hidden className="size-2.5 shrink-0 rounded-pill bg-lime" />
          <p>
            <span className="block font-medium">Adicionado ao carrinho</span>
            <span className="text-white/70">
              {notice.quantity}× {notice.name}
            </span>
          </p>
          <Link
            href={ACCOUNT_LINKS.cart.href}
            className="shrink-0 font-medium text-lime underline-offset-4 hover:underline"
          >
            Ver carrinho
          </Link>
        </>
      ) : null}
    </div>
  );
}
