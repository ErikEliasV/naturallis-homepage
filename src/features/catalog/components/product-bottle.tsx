import Image from "next/image";

import { cn } from "@/utils/cn";

import { type Product } from "../types";

type ProductBottleProps = {
  product: Pick<Product, "label" | "capsules">;
  /** `sizes` for the bottle photo; it renders at roughly 40% of the card width. */
  sizes?: string;
  className?: string;
};

/**
 * Naturallis capsule bottle rebuilt from the Figma mockup layers: blank bottle photo,
 * wordmark, product label and capsule count. Text scales with the bottle (container units).
 */
export function ProductBottle({ product, sizes = "12vw", className }: ProductBottleProps) {
  return (
    <div className={cn("@container relative aspect-[156/281]", className)}>
      <Image
        src="/images/products/frasco-sombra.svg"
        alt=""
        width={391}
        height={15}
        className="absolute top-[96%] left-1/2 w-[250.6%] max-w-none -translate-x-1/2"
      />
      <div className="absolute top-[-1.53%] left-[-45.49%] aspect-square w-[188.58%]">
        <Image src="/images/products/frasco-naturallis.png" alt="" fill sizes={sizes} />
      </div>
      <Image
        src="/images/products/frasco-logo.svg"
        alt=""
        width={51}
        height={18}
        className="absolute top-[28.5%] left-1/2 w-[33%] -translate-x-1/2"
      />
      <p
        aria-hidden
        className="absolute inset-x-[4%] top-[47.5%] text-center font-label text-[11.73cqw] leading-[0.976] text-white"
      >
        {product.label.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      <p
        aria-hidden
        className="absolute inset-x-0 top-[79.5%] flex items-center justify-center gap-[2.5cqw] font-label leading-none text-white"
      >
        <span className="text-[3.25cqw]">CONTÉM</span>
        <span className="text-[15.5cqw]">{product.capsules}</span>
        <span className="text-[3.06cqw]">CÁPSULAS</span>
      </p>
    </div>
  );
}
