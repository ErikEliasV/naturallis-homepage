import Image from "next/image";

import { ProductBottle } from "@/features/catalog/components/product-bottle";
import { type Product } from "@/features/catalog/types";

import { type GalleryImage } from "../types";

/** One gallery picture: the product bottle on a soft background, or a photo. */
export function GallerySlide({
  image,
  product,
  sizes,
  bottleWidth,
}: {
  image: GalleryImage;
  product: Product;
  sizes: string;
  bottleWidth: string;
}) {
  if (image.kind === "bottle") {
    return (
      <div className="flex size-full items-center justify-center bg-surface">
        <ProductBottle product={product} sizes={sizes} className={bottleWidth} />
      </div>
    );
  }
  return <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />;
}
