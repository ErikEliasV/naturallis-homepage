import { type IconLayer } from "@/components/ui/layered-icon";
import { type GalleryImage } from "@/features/product/types";

import { ICON_RETURN, ICON_SECURE, ICON_SHIPPING } from "./icons";

/** Product bottle followed by the lifestyle photos from the Figma product page. */
export const PRODUCT_GALLERY: readonly GalleryImage[] = [
  { kind: "bottle" },
  { kind: "photo", src: "/images/product/bolhas.jpg", alt: "Textura de gel com bolhas" },
  {
    kind: "photo",
    src: "/images/product/movimento.jpg",
    alt: "Mulher se alongando em um fundo verde-claro",
  },
  { kind: "photo", src: "/images/product/folha.jpg", alt: "Folhas verdes de babosa" },
];

export const PURCHASE_PERKS: readonly { label: string; icon: readonly IconLayer[] }[] = [
  { label: "Frete grátis", icon: ICON_SHIPPING },
  { label: "Troca fácil", icon: ICON_RETURN },
  { label: "Compra segura", icon: ICON_SECURE },
];

/** Comparison table (Figma bottom section); the first column is always the product. */
export const COMPARISON = {
  title: "Por que escolher a Naturallis?",
  description:
    "Fórmulas pensadas para a sua rotina, com ingredientes selecionados e orientação farmacêutica.",
  alternatives: ["Bebidas energéticas", "Suplementos comuns"],
  rows: [
    { label: "Energia que dura o dia todo", values: [true, true, false] },
    { label: "Ingredientes selecionados", values: [true, true, true] },
    { label: "Apoio ao equilíbrio intestinal", values: [true, false, false] },
    { label: "Sem cafeína", values: [true, false, true] },
    { label: "Menos de R$ 1,50 por dose", values: [true, false, false] },
  ],
} as const;
