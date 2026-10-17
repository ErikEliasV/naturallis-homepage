import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/sections/shop/product-page";
import { CATEGORIES } from "@/constants/categories";
import { findProduct, PRODUCTS } from "@/constants/products";
import { withBasePath } from "@/utils/base-path";

async function resolve(params: PageProps<"/produtos/[categoria]/[produto]">["params"]) {
  const { categoria, produto } = await params;
  const product = findProduct(categoria, produto);
  const category = CATEGORIES.find((item) => item.slug === categoria);
  return product && category ? { product, category } : undefined;
}

/** Only the generated pages exist in the static export. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ categoria: product.category, produto: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produtos/[categoria]/[produto]">): Promise<Metadata> {
  const resolved = await resolve(params);
  if (!resolved) return {};
  return {
    title: resolved.product.name,
    description: resolved.product.description,
    openGraph: {
      title: resolved.product.name,
      description: resolved.product.description,
      images: [{ url: withBasePath("/opengraph-image.png"), width: 1200, height: 630 }],
    },
  };
}

export default async function ProductRoute({
  params,
}: PageProps<"/produtos/[categoria]/[produto]">) {
  const resolved = await resolve(params);
  if (!resolved) notFound();
  return <ProductPage product={resolved.product} category={resolved.category} />;
}
