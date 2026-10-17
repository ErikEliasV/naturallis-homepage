import { type IconLayer } from "@/components/ui/layered-icon";

/* Layer boxes copied from the Figma product page ("Pure Balance") icon frames. */

export const ICON_ZOOM: readonly IconLayer[] = [
  {
    src: "/icons/pdp/zoom-lens.svg",
    box: "top-[12.5%] right-1/4 bottom-1/4 left-[12.5%]",
    bleed: "inset-[-8%]",
  },
  {
    src: "/icons/pdp/zoom-handle.svg",
    box: "inset-[65.85%_12.5%_12.5%_65.85%]",
    bleed: "inset-[-23.09%]",
  },
];

export const ICON_STOCK: readonly IconLayer[] = [
  {
    src: "/icons/pdp/stock.svg",
    box: "inset-[28.13%_12.5%_21.88%_15.63%]",
    bleed: "inset-[-0.78%_-0.54%]",
  },
];

export const ICON_SHIPPING: readonly IconLayer[] = [
  {
    src: "/icons/pdp/shipping-a.svg",
    box: "inset-[30.05%_12.77%_9.39%_12.77%]",
    bleed: "inset-[-0.65%_-0.52%_-0.64%_-0.52%]",
  },
  {
    src: "/icons/pdp/shipping-b.svg",
    box: "inset-[9.38%_12.5%_9.37%_12.5%]",
    bleed: "inset-[-0.48%_-0.52%]",
  },
  {
    src: "/icons/pdp/shipping-c.svg",
    box: "inset-[18.87%_31.25%_40.62%_31.86%]",
    bleed: "inset-[-0.96%_-1.06%]",
  },
];

export const ICON_RETURN: readonly IconLayer[] = [
  {
    src: "/icons/pdp/return-a.svg",
    box: "inset-[68.75%_46.88%_12.5%_15.63%]",
    bleed: "inset-[-2.08%_-1.04%]",
  },
  {
    src: "/icons/pdp/return-b.svg",
    box: "inset-[12.5%_21.88%_12.5%_34.38%]",
    bleed: "inset-[-0.52%_-0.89%]",
  },
];

export const ICON_SECURE: readonly IconLayer[] = [
  { src: "/icons/pdp/secure-a.svg", box: "inset-[21.88%_9.38%]", bleed: "inset-[-0.69%_-0.48%]" },
  {
    src: "/icons/pdp/secure-b.svg",
    box: "inset-[37.5%_9.38%_34.38%_9.38%]",
    bleed: "inset-[-1.39%_-0.48%]",
  },
];

export const ICON_STORE: readonly IconLayer[] = [
  { src: "/icons/pdp/store-a.svg", box: "inset-[15.63%_12.5%]", bleed: "inset-[-4.55%_-4.17%]" },
  {
    src: "/icons/pdp/store-b.svg",
    box: "inset-[37.5%_12.5%_43.75%_12.5%]",
    bleed: "inset-[-16.67%_-4.17%]",
  },
];

export const ICON_CHEVRON_SMALL: readonly IconLayer[] = [
  {
    src: "/icons/pdp/chevron-small.svg",
    box: "inset-[18.75%_31.25%_18.75%_37.5%]",
    bleed: "inset-[-8%_-16%]",
  },
];

export const ICON_CART_WHITE: readonly IconLayer[] = [
  { src: "/icons/pdp/cart-wheel-left.svg", box: "inset-[78.13%_59.38%_9.38%_28.13%]" },
  { src: "/icons/pdp/cart-wheel-right.svg", box: "inset-[78.13%_18.75%_9.38%_68.75%]" },
  {
    src: "/icons/pdp/cart-body.svg",
    box: "inset-[12.5%_9.38%_31.25%_6.25%]",
    bleed: "inset-[-8.89%_-5.93%]",
  },
];
