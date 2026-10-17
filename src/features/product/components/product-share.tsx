"use client";

import Image from "next/image";

import { CONTACT } from "@/constants/contact";

const NETWORKS = [
  {
    label: "Facebook",
    icon: "/icons/pdp/facebook.svg",
    width: 11,
    height: 19,
    url: (page: string) => `https://www.facebook.com/sharer/sharer.php?u=${page}`,
  },
  {
    label: "Pinterest",
    icon: "/icons/pdp/pinterest.svg",
    width: 18,
    height: 18,
    url: (page: string) => `https://www.pinterest.com/pin/create/button/?url=${page}`,
  },
  {
    label: "X",
    icon: "/icons/pdp/x.svg",
    width: 16,
    height: 15,
    url: (page: string) => `https://x.com/intent/post?url=${page}`,
  },
] as const;

/** Share links and help shortcut (Figma "ProductShare"). */
export function ProductShare({ productName }: { productName: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <p>Compartilhar:</p>
        <ul className="flex items-center gap-4">
          {NETWORKS.map((network) => (
            <li key={network.label}>
              <button
                type="button"
                aria-label={`Compartilhar ${productName} no ${network.label}`}
                onClick={() =>
                  window.open(
                    network.url(encodeURIComponent(window.location.href)),
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="flex size-6 items-center justify-center transition-opacity duration-300 ease-power3-out hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <Image src={network.icon} alt="" width={network.width} height={network.height} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <a
        href={CONTACT.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 items-center rounded-pill border border-black/10 px-3.75 transition-colors duration-300 ease-power3-out hover:bg-black/5"
      >
        Precisa de ajuda?
      </a>
    </div>
  );
}
